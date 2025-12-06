import { useState } from 'react';
import './ControlPanel.css';

interface ControlPanelProps {
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onToggleSpatialAudio?: () => void;
    onLeave: () => void;
    audioEnabled: boolean;
    videoEnabled: boolean;
    spatialAudioEnabled?: boolean;
    pushToTalkMode?: boolean;
    onTogglePushToTalk?: () => void;
    connectionQuality?: 'good' | 'fair' | 'poor';
}

export function ControlPanel({
    onToggleAudio,
    onToggleVideo,
    onToggleSpatialAudio,
    onLeave,
    audioEnabled,
    videoEnabled,
    spatialAudioEnabled = false,
    pushToTalkMode = false,
    onTogglePushToTalk,
    connectionQuality = 'good',
}: ControlPanelProps) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    if (isMinimized) {
        return (
            <div className="control-panel-minimized" onClick={() => setIsMinimized(false)}>
                <div className={`connection-indicator ${connectionQuality}`}></div>
                <span className="minimized-icon">⚙️</span>
            </div>
        );
    }

    return (
        <div className="control-panel">
            <div className="control-panel-header">
                <div className="connection-status">
                    <div className={`status-dot ${connectionQuality}`}></div>
                    <span className="status-text">
                        {connectionQuality === 'good'
                            ? 'Excellent'
                            : connectionQuality === 'fair'
                                ? 'Fair'
                                : 'Poor'}
                    </span>
                </div>
                <button
                    className="minimize-btn"
                    onClick={() => setIsMinimized(true)}
                    title="Minimize controls"
                >
                    −
                </button>
            </div>

            <div className="control-buttons">
                <button
                    className={`control-btn ${!audioEnabled ? 'off' : ''}`}
                    onClick={onToggleAudio}
                    title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {audioEnabled ? (
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" />
                        ) : (
                            <>
                                <line x1="1" y1="1" x2="23" y2="23" />
                                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                            </>
                        )}
                    </svg>
                    <span className="control-label">{audioEnabled ? 'Mute' : 'Unmute'}</span>
                </button>

                <button
                    className={`control-btn ${!videoEnabled ? 'off' : ''}`}
                    onClick={onToggleVideo}
                    title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {videoEnabled ? (
                            <path d="M23 7l-7 5 7 5V7z M16 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                        ) : (
                            <>
                                <line x1="1" y1="1" x2="23" y2="23" />
                                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
                            </>
                        )}
                    </svg>
                    <span className="control-label">{videoEnabled ? 'Camera' : 'Camera Off'}</span>
                </button>

                {onToggleSpatialAudio && (
                    <button
                        className={`control-btn ${spatialAudioEnabled ? 'active' : ''}`}
                        onClick={onToggleSpatialAudio}
                        title={
                            spatialAudioEnabled ? 'Disable spatial audio' : 'Enable spatial audio'
                        }
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                        <span className="control-label">Spatial</span>
                    </button>
                )}

                <button
                    className="control-btn settings-btn"
                    onClick={() => setShowSettings(!showSettings)}
                    title="Settings"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                    </svg>
                    <span className="control-label">Settings</span>
                </button>

                <button className="control-btn leave-btn" onClick={onLeave} title="Leave call">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                    >
                        <path d="M23 1L17 7l-5-5-6 6c-4 4-4 10 0 14l6-6-5-5 6-6z" />
                        <path d="M18.5 9C19.9 9 21 7.9 21 6.5S19.9 4 18.5 4 16 5.1 16 6.5 17.1 9 18.5 9z" />
                    </svg>
                    <span className="control-label">Leave</span>
                </button>
            </div>

            {showSettings && (
                <div className="settings-panel">
                    <div className="settings-section">
                        <h4>Audio Settings</h4>
                        {onTogglePushToTalk && (
                            <label className="setting-option">
                                <input
                                    type="checkbox"
                                    checked={pushToTalkMode}
                                    onChange={onTogglePushToTalk}
                                />
                                <span>Push-to-talk mode</span>
                            </label>
                        )}
                        <div className="setting-info">
                            Hold spacebar to speak in push-to-talk mode
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
