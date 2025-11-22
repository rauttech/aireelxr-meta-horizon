import { io, Socket } from 'socket.io-client';

export interface ConnectionConfig {
    signalingUrl: string;
    roomId: string;
    token?: string;
    iceServers?: RTCIceServer[];
}

export interface PeerConnection {
    id: string;
    connection: RTCPeerConnection;
    stream?: MediaStream;
}

export class ConnectionManager {
    private socket: Socket | null = null;
    private localStream: MediaStream | null = null;
    private peerConnections: Map<string, PeerConnection> = new Map();
    private config: ConnectionConfig;
    private onRemoteStreamCallback?: (peerId: string, stream: MediaStream) => void;
    private onPeerDisconnectedCallback?: (peerId: string) => void;

    constructor(config: ConnectionConfig) {
        this.config = config;
    }

    /**
     * Initialize connection to signaling server
     */
    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket = io(this.config.signalingUrl, {
                auth: {
                    token: this.config.token,
                    roomId: this.config.roomId,
                },
            });

            this.socket.on('connect', () => {
                console.log('[ConnectionManager] Connected to signaling server');
                this.setupSocketListeners();
                resolve();
            });

            this.socket.on('connect_error', (error) => {
                console.error('[ConnectionManager] Connection error:', error);
                reject(error);
            });
        });
    }

    /**
     * Capture local media (camera + microphone)
     */
    async captureLocalMedia(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream> {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('[ConnectionManager] Local media captured');
            return this.localStream;
        } catch (error) {
            console.error('[ConnectionManager] Failed to capture local media:', error);
            throw error;
        }
    }

    /**
     * Join room and start peer connections
     */
    async joinRoom(): Promise<void> {
        if (!this.socket) {
            throw new Error('Not connected to signaling server');
        }

        this.socket.emit('join-room', this.config.roomId);
    }

    /**
     * Setup socket event listeners for signaling
     */
    private setupSocketListeners(): void {
        if (!this.socket) return;

        // Handle new peer joining
        this.socket.on('user-connected', async (peerId: string) => {
            console.log('[ConnectionManager] User connected:', peerId);
            await this.createPeerConnection(peerId, true);
        });

        // Handle receiving offer
        this.socket.on('offer', async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
            console.log('[ConnectionManager] Received offer from:', data.from);
            await this.handleOffer(data.from, data.offer);
        });

        // Handle receiving answer
        this.socket.on('answer', async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
            console.log('[ConnectionManager] Received answer from:', data.from);
            await this.handleAnswer(data.from, data.answer);
        });

        // Handle ICE candidates
        this.socket.on('ice-candidate', async (data: { from: string; candidate: RTCIceCandidateInit }) => {
            console.log('[ConnectionManager] Received ICE candidate from:', data.from);
            await this.handleIceCandidate(data.from, data.candidate);
        });

        // Handle peer disconnection
        this.socket.on('user-disconnected', (peerId: string) => {
            console.log('[ConnectionManager] User disconnected:', peerId);
            this.closePeerConnection(peerId);
            this.onPeerDisconnectedCallback?.(peerId);
        });
    }

    /**
     * Create peer connection for a specific peer
     */
    private async createPeerConnection(peerId: string, createOffer: boolean): Promise<void> {
        const iceServers = this.config.iceServers || [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ];

        const peerConnection = new RTCPeerConnection({ iceServers });

        // Add local tracks to peer connection
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, this.localStream!);
            });
        }

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate && this.socket) {
                this.socket.emit('ice-candidate', {
                    to: peerId,
                    candidate: event.candidate.toJSON(),
                });
            }
        };

        // Handle remote stream
        peerConnection.ontrack = (event) => {
            console.log('[ConnectionManager] Received remote track from:', peerId);
            const [remoteStream] = event.streams;
            const peer = this.peerConnections.get(peerId);
            if (peer) {
                peer.stream = remoteStream;
                this.onRemoteStreamCallback?.(peerId, remoteStream);
            }
        };

        // Handle connection state changes
        peerConnection.onconnectionstatechange = () => {
            console.log('[ConnectionManager] Connection state:', peerConnection.connectionState);
            if (peerConnection.connectionState === 'failed') {
                this.closePeerConnection(peerId);
            }
        };

        this.peerConnections.set(peerId, { id: peerId, connection: peerConnection });

        // Create offer if initiator
        if (createOffer) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            if (this.socket) {
                this.socket.emit('offer', {
                    to: peerId,
                    offer: peerConnection.localDescription,
                });
            }
        }
    }

    /**
     * Handle incoming offer
     */
    private async handleOffer(peerId: string, offer: RTCSessionDescriptionInit): Promise<void> {
        let peer = this.peerConnections.get(peerId);

        if (!peer) {
            await this.createPeerConnection(peerId, false);
            peer = this.peerConnections.get(peerId);
        }

        if (!peer) return;

        await peer.connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.connection.createAnswer();
        await peer.connection.setLocalDescription(answer);

        if (this.socket) {
            this.socket.emit('answer', {
                to: peerId,
                answer: peer.connection.localDescription,
            });
        }
    }

    /**
     * Handle incoming answer
     */
    private async handleAnswer(peerId: string, answer: RTCSessionDescriptionInit): Promise<void> {
        const peer = this.peerConnections.get(peerId);
        if (!peer) return;

        await peer.connection.setRemoteDescription(new RTCSessionDescription(answer));
    }

    /**
     * Handle incoming ICE candidate
     */
    private async handleIceCandidate(peerId: string, candidate: RTCIceCandidateInit): Promise<void> {
        const peer = this.peerConnections.get(peerId);
        if (!peer) return;

        await peer.connection.addIceCandidate(new RTCIceCandidate(candidate));
    }

    /**
     * Close peer connection
     */
    private closePeerConnection(peerId: string): void {
        const peer = this.peerConnections.get(peerId);
        if (peer) {
            peer.connection.close();
            this.peerConnections.delete(peerId);
        }
    }

    /**
     * Toggle local audio
     */
    toggleAudio(enabled: boolean): void {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach((track) => {
                track.enabled = enabled;
            });
        }
    }

    /**
     * Toggle local video
     */
    toggleVideo(enabled: boolean): void {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach((track) => {
                track.enabled = enabled;
            });
        }
    }

    /**
     * Register callback for remote streams
     */
    onRemoteStream(callback: (peerId: string, stream: MediaStream) => void): void {
        this.onRemoteStreamCallback = callback;
    }

    /**
     * Register callback for peer disconnection
     */
    onPeerDisconnected(callback: (peerId: string) => void): void {
        this.onPeerDisconnectedCallback = callback;
    }

    /**
     * Get local stream
     */
    getLocalStream(): MediaStream | null {
        return this.localStream;
    }

    /**
     * Disconnect and cleanup
     */
    disconnect(): void {
        // Close all peer connections
        this.peerConnections.forEach((peer) => {
            peer.connection.close();
        });
        this.peerConnections.clear();

        // Stop local media
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }

        // Disconnect socket
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        console.log('[ConnectionManager] Disconnected');
    }
}
