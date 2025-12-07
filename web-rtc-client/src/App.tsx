import { useState, useEffect } from 'react';
import { RoomJoin } from './components/RoomJoin';
import { PresenceMode } from './components/PresenceMode';
import { ConnectionManager } from './services/ConnectionManager';
import './App.css';


type AppState = 'join' | 'connecting' | 'connected';

function App() {
    const [state, setState] = useState<AppState>('join');
    const [roomId, setRoomId] = useState('');
    const [connectionManager, setConnectionManager] = useState<ConnectionManager | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    // New state for Horizon controls
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for URL parameters (for Web Surface embedding)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlRoomId = params.get('room');
        const urlToken = params.get('token');

        // Parse Horizon params
        if (params.has('chat')) {
            setIsChatVisible(params.get('chat') === 'true');
        }
        if (params.has('theme')) {
            setIsDarkMode(params.get('theme') !== 'light');
        }

        if (urlRoomId) {
            handleJoinRoom(urlRoomId, urlToken || undefined);
        }
    }, []);

    const handleJoinRoom = async (roomId: string, token?: string) => {
        setState('connecting');
        setRoomId(roomId);
        setError(null);

        try {
            // Get signaling server URL from environment or default
            const signalingUrl = import.meta.env.VITE_SIGNALING_URL || 'http://localhost:3001';

            // Create connection manager
            const manager = new ConnectionManager({
                signalingUrl,
                roomId,
                token,
            });

            // Capture local media
            const stream = await manager.captureLocalMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: true,
            });
            setLocalStream(stream);

            // Setup remote stream handler
            manager.onRemoteStream((peerId, stream) => {
                setRemoteStreams((prev) => {
                    const updated = new Map(prev);
                    updated.set(peerId, stream);
                    return updated;
                });
            });

            // Setup peer disconnection handler
            manager.onPeerDisconnected((peerId) => {
                setRemoteStreams((prev) => {
                    const updated = new Map(prev);
                    updated.delete(peerId);
                    return updated;
                });
            });

            // Connect to signaling server
            await manager.connect();

            // Join room
            await manager.joinRoom();

            setConnectionManager(manager);
            setState('connected');
        } catch (err) {
            console.error('Failed to join room:', err);
            setError(err instanceof Error ? err.message : 'Failed to join room');
            setState('join');
        }
    };

    const handleToggleAudio = () => {
        if (connectionManager) {
            const newState = !audioEnabled;
            connectionManager.toggleAudio(newState);
            setAudioEnabled(newState);
        }
    };

    const handleToggleVideo = () => {
        if (connectionManager) {
            const newState = !videoEnabled;
            connectionManager.toggleVideo(newState);
            setVideoEnabled(newState);
        }
    };

    const handleLeave = () => {
        if (connectionManager) {
            connectionManager.disconnect();
            setConnectionManager(null);
        }
        setLocalStream(null);
        setRemoteStreams(new Map());
        setState('join');
        setRoomId('');
    };

    return (
        <div className="app">
            {state === 'join' && (
                <>
                    <RoomJoin onJoinRoom={handleJoinRoom} />
                    {error && (
                        <div className="error-toast">
                            <span>❌ {error}</span>
                            <button onClick={() => setError(null)}>✕</button>
                        </div>
                    )}
                </>
            )}

            {state === 'connecting' && (
                <div className="loading-screen">
                    <div className="spinner"></div>
                    <p>Connecting to room {roomId}...</p>
                </div>
            )}

            {state === 'connected' && (
                <PresenceMode
                    localStream={localStream}
                    remoteStreams={remoteStreams}
                    onToggleAudio={handleToggleAudio}
                    onToggleVideo={handleToggleVideo}
                    onLeave={handleLeave}
                    audioEnabled={audioEnabled}
                    videoEnabled={videoEnabled}
                    roomId={roomId}
                    isChatVisible={isChatVisible}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
}

export default App;
