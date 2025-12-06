import { useState } from 'react';
import './RoomJoin.css';

interface RoomJoinProps {
    onJoinRoom: (roomId: string, token?: string) => void;
}

export function RoomJoin({ onJoinRoom }: RoomJoinProps) {
    const [roomId, setRoomId] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    const handleCreateRoom = () => {
        const newRoomId = generateRoomId();
        setRoomId(newRoomId);
        setIsCreating(true);
    };

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            onJoinRoom(roomId.trim());
        }
    };

    const generateRoomId = (): string => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    return (
        <div className="room-join">
            <div className="room-join-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="room-join-container">
                <div className="brand-header">
                    <div className="logo-container">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="20" fill="url(#gradient)" />
                            <path
                                d="M24 12v24M12 24h24"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                                    <stop offset="0%" stopColor="#0081FB" />
                                    <stop offset="100%" stopColor="#0066CC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1>AaireelXR Video Presence</h1>
                    <p className="subtitle">Connect in Horizon Worlds</p>
                </div>

                <div className="join-options">
                    <div className="option-card">
                        <div className="card-icon">🎥</div>
                        <h2>Create Room</h2>
                        <p className="card-description">Start a new video presence session</p>
                        <button className="btn btn-primary btn-large" onClick={handleCreateRoom}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                            Create New Room
                        </button>
                        {isCreating && roomId && (
                            <div className="room-code-display">
                                <p className="code-label">Share this code:</p>
                                <div className="code-box">
                                    <span className="code-text">{roomId}</span>
                                    <button
                                        className="copy-btn"
                                        onClick={() => navigator.clipboard.writeText(roomId)}
                                        title="Copy code"
                                    >
                                        📋
                                    </button>
                                </div>
                                <button className="btn btn-secondary" onClick={handleJoinRoom}>
                                    Start Call
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="option-card">
                        <div className="card-icon">🔗</div>
                        <h2>Join Room</h2>
                        <p className="card-description">Enter a room code to join</p>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                className="room-input"
                                maxLength={6}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleJoinRoom}
                            disabled={!roomId.trim()}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                            Join Room
                        </button>
                    </div>
                </div>

                <div className="quick-settings">
                    <h3>Quick Settings</h3>
                    <div className="settings-toggles">
                        <button
                            className={`setting-toggle ${audioEnabled ? 'active' : ''}`}
                            onClick={() => setAudioEnabled(!audioEnabled)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                {audioEnabled ? (
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                                ) : (
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14zM4.27 3L21 19.73 19.73 21 3 4.27z" />
                                )}
                            </svg>
                            <span>{audioEnabled ? 'Microphone On' : 'Microphone Off'}</span>
                        </button>
                        <button
                            className={`setting-toggle ${videoEnabled ? 'active' : ''}`}
                            onClick={() => setVideoEnabled(!videoEnabled)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                {videoEnabled ? (
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                                ) : (
                                    <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z" />
                                )}
                            </svg>
                            <span>{videoEnabled ? 'Camera On' : 'Camera Off'}</span>
                        </button>
                    </div>
                </div>

                <div className="info-section">
                    <div className="info-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <span>Optimized for Meta Quest and Horizon Worlds</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
