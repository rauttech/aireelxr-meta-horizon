import { useState } from 'react';
import { VideoGrid } from './VideoGrid';
import { ControlPanel } from './ControlPanel';
import { ChatBubble } from './ChatBubble';
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

interface Message {
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [spatialAudioEnabled, setSpatialAudioEnabled] = useState(false);
    const [pushToTalkMode, setPushToTalkMode] = useState(false);
    const [connectionQuality] = useState<'good' | 'fair' | 'poor'>('good');

    // Mock participants for chat
    const participants = [
        { id: 'user1', name: 'You' },
        ...Array.from(remoteStreams.keys()).map((id, index) => ({
            id,
            name: `Participant ${index + 1}`,
        })),
    ];

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'You',
            text,
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);

        // TODO: Send message via WebRTC data channel
        console.log('Sending message:', text);
    };

    const handleToggleSpatialAudio = () => {
        setSpatialAudioEnabled(!spatialAudioEnabled);
        // TODO: Implement spatial audio logic
        console.log('Spatial audio:', !spatialAudioEnabled);
    };

    const handleTogglePushToTalk = () => {
        setPushToTalkMode(!pushToTalkMode);
        console.log('Push-to-talk mode:', !pushToTalkMode);
    };

    return (
        <div className="presence-mode">
            <div className="room-info-header">
                <div className="room-badge">
                    <span className="room-label">Room:</span>
                    <span className="room-code">{roomId}</span>
                </div>
                <div className="participant-count">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <span>{remoteStreams.size + 1}</span>
                </div>
            </div>

            <div className="video-section">
                <VideoGrid
                    localStream={localStream}
                    remoteStreams={remoteStreams}
                    localMuted={!audioEnabled}
                    localVideoOff={!videoEnabled}
                />
            </div>

            <ControlPanel
                onToggleAudio={onToggleAudio}
                onToggleVideo={onToggleVideo}
                onToggleSpatialAudio={handleToggleSpatialAudio}
                onLeave={onLeave}
                audioEnabled={audioEnabled}
                videoEnabled={videoEnabled}
                spatialAudioEnabled={spatialAudioEnabled}
                pushToTalkMode={pushToTalkMode}
                onTogglePushToTalk={handleTogglePushToTalk}
                connectionQuality={connectionQuality}
            />

            <ChatBubble
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUserId="user1"
                participants={participants}
                blurUnknown={false}
            />
        </div>
    );
}
