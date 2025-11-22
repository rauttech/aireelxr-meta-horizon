import { VideoGrid } from './VideoGrid';
import './PresenceMode.css';

interface PresenceModeProps {
    localStream: MediaStream | null;
    remoteStreams: Map<string, MediaStream>;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onLeave: () => void;
    audioEnabled: boolean;
    videoEnabled: boolean;
    roomId: string;
}

export function PresenceMode({
    localStream,
    remoteStreams,
    onToggleAudio,
    onToggleVideo,
    onLeave,
    audioEnabled,
    videoEnabled,
    roomId,
}: PresenceModeProps) {
    return (
        <div className="presence-mode">
            <div className="video-section">
                <VideoGrid
                    localStream={localStream}
                    remoteStreams={remoteStreams}
                    localMuted={!audioEnabled}
                    localVideoOff={!videoEnabled}
                />
            </div>

            <div className="controls-section">
                <div className="room-info">
                    <span className="room-label">Room:</span>
                    <span className="room-code">{roomId}</span>
                </div>

                <div className="controls">
                    <button
                        className={`control-btn ${!audioEnabled ? 'off' : ''}`}
                        onClick={onToggleAudio}
                        title={audioEnabled ? 'Mute' : 'Unmute'}
                    >
                        {audioEnabled ? '🎤' : '🔇'}
                    </button>

                    <button
                        className={`control-btn ${!videoEnabled ? 'off' : ''}`}
                        onClick={onToggleVideo}
                        title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
                    >
                        {videoEnabled ? '📹' : '📷'}
                    </button>

                    <button
                        className="control-btn leave-btn"
                        onClick={onLeave}
                        title="Leave call"
                    >
                        📞
                    </button>
                </div>
            </div>
        </div>
    );
}
