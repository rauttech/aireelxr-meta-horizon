import * as hz from 'horizon/core';
import { PropTypes, WebSurface } from 'horizon/core';

/**
 * Video Presence System
 * Integrates Horizon World with WebRTC video calling web app
 */

const WEB_SURFACE_URL = 'https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app';
const ROOM_PREFIX = 'HOLORoom-';

class VideoPresence extends hz.Component<typeof VideoPresence> {
    static propsDefinition = {
        // Reference to the Web Surface object
        webSurface: PropTypes.Entity,
        // Current room ID
        currentRoomId: PropTypes.String,
        // Auto-connect on start
        autoConnect: PropTypes.Boolean
    };

    preStart() {
        this.props.currentRoomId = '';
        this.props.autoConnect = false;

        // Listen for network events
        this.connectNetworkBroadcastEvent('videoPresence.emotion', this.onEmotionReceived.bind(this));
        this.connectNetworkBroadcastEvent('videoPresence.join', this.onJoinRoomReceived.bind(this));
    }

    start() {
        console.log('[VideoPresence] System initialized');

        // Auto-connect if configured
        if (this.props.autoConnect) {
            this.createRoom();
        }
    }

    /**
     * Create a new video room
     */
    public createRoom() {
        const roomId = this.generateRoomId();
        this.joinRoom(roomId);
    }

    /**
     * Join a specific room
     */
    public joinRoom(roomId: string) {
        if (!roomId) return;

        this.props.currentRoomId = roomId;
        this.updateWebSurface(roomId);

        // Notify others execution
        this.sendNetworkBroadcastEvent('videoPresence.join', {
            roomId,
            playerId: hz.World.getLocalPlayer()?.id.toString()
        });

        console.log(`[VideoPresence] Joined room: ${roomId}`);
    }

    /**
     * Leave current room
     */
    public leaveRoom() {
        this.props.currentRoomId = '';

        if (this.props.webSurface) {
            const webSurface = this.props.webSurface.as(WebSurface);
            if (webSurface) {
                webSurface.url = 'about:blank';
            }
        }
    }

    /**
     * Update Web Surface URL
     */
    private updateWebSurface(roomId: string) {
        if (!this.props.webSurface) {
            console.warn('[VideoPresence] No Web Surface assigned!');
            return;
        }

        const webSurface = this.props.webSurface.as(WebSurface);
        if (webSurface) {
            // Construct full URL with room parameter
            const fullUrl = `${WEB_SURFACE_URL}?room=${roomId}&source=horizon_world`;
            webSurface.url = fullUrl;
            console.log(`[VideoPresence] Loading URL: ${fullUrl}`);
        }
    }

    /**
     * Generate a unique room ID
     */
    private generateRoomId(): string {
        const timestamp = Date.now().toString(36);
        const random = Math.floor(Math.random() * 1000).toString(36);
        return `${ROOM_PREFIX}${timestamp}${random}`.toUpperCase();
    }

    /**
     * Handle emotion events from other players
     * For syncing with web app (optional implementation)
     */
    private onEmotionReceived(event: { emotion: string; playerId: string }) {
        // Could forward to web app via URL parameters or postMessage if supported
        console.log(`[VideoPresence] Emotion received: ${event.emotion} from ${event.playerId}`);
    }

    private onJoinRoomReceived(event: { roomId: string; playerId: string }) {
        console.log(`[VideoPresence] Player ${event.playerId} joined room ${event.roomId}`);
    }
}

// Register component
hz.Component.register(VideoPresence);
