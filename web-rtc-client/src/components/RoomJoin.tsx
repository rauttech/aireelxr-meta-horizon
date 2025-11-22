import { useState } from 'react';
import './RoomJoin.css';

interface RoomJoinProps {
    onJoinRoom: (roomId: string, token?: string) => void;
}

export function RoomJoin({ onJoinRoom }: RoomJoinProps) {
    const [roomId, setRoomId] = useState('');
    const [isCreating, setIsCreating] = useState(false);

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
            <div className="room-join-container">
                <h1>AaireelXR Video Presence</h1>
                <p className="subtitle">Connect with family and friends in Horizon Worlds</p>

                <div className="join-options">
                    <div className="option-card">
                        <h2>Create Room</h2>
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleCreateRoom}
                        >
                            Create New Room
                        </button>
                        {isCreating && roomId && (
                            <div className="room-code">
                                <p>Share this code:</p>
                                <div className="code-display">{roomId}</div>
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleJoinRoom}
                                >
                                    Start Call
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="divider">OR</div>

                    <div className="option-card">
                        <h2>Join Room</h2>
                        <input
                            type="text"
                            placeholder="Enter room code"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                            className="room-input"
                            maxLength={6}
                        />
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleJoinRoom}
                            disabled={!roomId.trim()}
                        >
                            Join Room
                        </button>
                    </div>
                </div>

                <div className="info-section">
                    <p className="info-text">
                        This app is optimized for Horizon Web Surface embedding.
                        For best experience, use within Horizon Worlds on Quest or mobile.
                    </p>
                </div>
            </div>
        </div>
    );
}
