import { useState, useRef, useEffect } from 'react';
import './ChatBubble.css';

interface Message {
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
    isMention?: boolean;
}

interface ChatBubbleProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    currentUserId: string;
    participants: Array<{ id: string; name: string }>;
    blurUnknown?: boolean;
}

export function ChatBubble({
    messages,
    onSendMessage,
    currentUserId,
    participants,
    blurUnknown = false,
}: ChatBubbleProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [inputText, setInputText] = useState('');
    const [showMentionMenu, setShowMentionMenu] = useState(false);
    const [mentionFilter, setMentionFilter] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const latestMessage = messages[messages.length - 1];

    useEffect(() => {
        if (isExpanded && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isExpanded]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);

        // Check for @ mention
        const lastAtIndex = value.lastIndexOf('@');
        if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
            setShowMentionMenu(true);
            setMentionFilter('');
        } else if (lastAtIndex !== -1 && value[lastAtIndex] === '@') {
            const filter = value.substring(lastAtIndex + 1);
            setMentionFilter(filter);
            setShowMentionMenu(true);
        } else {
            setShowMentionMenu(false);
        }
    };

    const handleMentionSelect = (name: string) => {
        const lastAtIndex = inputText.lastIndexOf('@');
        const newText = inputText.substring(0, lastAtIndex) + `@${name} `;
        setInputText(newText);
        setShowMentionMenu(false);
        inputRef.current?.focus();
    };

    const handleSendMessage = () => {
        if (inputText.trim()) {
            onSendMessage(inputText.trim());
            setInputText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredParticipants = participants.filter((p) =>
        p.name.toLowerCase().includes(mentionFilter.toLowerCase())
    );

    if (isMinimized) {
        return (
            <div className="chat-minimized" onClick={() => setIsMinimized(false)}>
                💬
            </div>
        );
    }

    if (!isExpanded && latestMessage) {
        return (
            <div className="chat-bubble-collapsed" onClick={() => setIsExpanded(true)}>
                <div className="bubble-content">
                    <span className="bubble-sender">{latestMessage.sender}:</span>
                    <span className="bubble-text">{latestMessage.text}</span>
                </div>
                <div className="bubble-tail"></div>
            </div>
        );
    }

    return (
        <div className={`chat-bubble-expanded ${isExpanded ? 'expanded' : ''}`}>
            <div className="chat-header">
                <h3>World Chat</h3>
                <div className="chat-controls">
                    <button
                        className="chat-control-btn"
                        onClick={() => setIsExpanded(false)}
                        title="Collapse"
                    >
                        ▼
                    </button>
                    <button
                        className="chat-control-btn"
                        onClick={() => setIsMinimized(true)}
                        title="Minimize"
                    >
                        −
                    </button>
                </div>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="no-messages">No messages yet. Start the conversation!</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message ${msg.sender === currentUserId ? 'own-message' : ''} ${
                                blurUnknown && !participants.find((p) => p.id === msg.sender)
                                    ? 'blurred'
                                    : ''
                            }`}
                        >
                            <div className="message-header">
                                <span className="message-sender">{msg.sender}</span>
                                <span className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="message-text">
                                {msg.text.split(' ').map((word, i) =>
                                    word.startsWith('@') ? (
                                        <span key={i} className="mention">
                                            {word}{' '}
                                        </span>
                                    ) : (
                                        word + ' '
                                    )
                                )}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {showMentionMenu && filteredParticipants.length > 0 && (
                <div className="mention-menu">
                    {filteredParticipants.map((p) => (
                        <div
                            key={p.id}
                            className="mention-item"
                            onClick={() => handleMentionSelect(p.name)}
                        >
                            @{p.name}
                        </div>
                    ))}
                </div>
            )}

            <div className="chat-input-container">
                <input
                    ref={inputRef}
                    type="text"
                    className="chat-input"
                    placeholder="Type a message... (use @ to mention)"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button className="send-btn" onClick={handleSendMessage} disabled={!inputText.trim()}>
                    ➤
                </button>
            </div>

            <div className="quick-replies">
                <button className="quick-reply" onClick={() => onSendMessage('👋 Hello!')}>
                    👋 Hello!
                </button>
                <button className="quick-reply" onClick={() => onSendMessage('👍 Sounds good')}>
                    👍 Sounds good
                </button>
                <button className="quick-reply" onClick={() => onSendMessage('🎉 Amazing!')}>
                    🎉 Amazing!
                </button>
            </div>
        </div>
    );
}
