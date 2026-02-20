import React, { useState } from 'react';
import './SocialInbox.css';

function SocialInbox() {
    const [conversations, setConversations] = useState([
        { id: 1, platform: 'instagram', name: 'John Doe', message: 'Love your content!', avatar: '👤', unread: true, timestamp: '2m ago' },
        { id: 2, platform: 'facebook', name: 'Jane Smith', message: 'Can you tell me more?', avatar: '👤', unread: true, timestamp: '15m ago' },
        { id: 3, platform: 'twitter', name: 'Tech News', message: 'Great post about...', avatar: '👤', unread: false, timestamp: '1h ago' },
    ]);

    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John Doe', content: 'Love your content!', timestamp: '2m ago', isReply: false },
        { id: 2, sender: 'You', content: 'Thanks! Check out our new post.', timestamp: '1m ago', isReply: true },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                sender: 'You',
                content: newMessage,
                timestamp: 'now',
                isReply: true
            }]);
            setNewMessage('');
        }
    };

    return (
        <div className="social-inbox-page">
            <div className="inbox-header">
                <h2>Social Inbox</h2>
                <div className="inbox-controls">
                    <input type="text" placeholder="Search conversations..." className="search-input" />
                    <select className="filter-select">
                        <option>All Platforms</option>
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                    </select>
                </div>
            </div>

            <div className="inbox-container">
                <div className="conversations-list">
                    <div className="list-header">
                        <h3>Messages</h3>
                        <span className="unread-badge">{conversations.filter(c => c.unread).length}</span>
                    </div>
                    {conversations.map(conv => (
                        <div
                            key={conv.id}
                            className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
                            onClick={() => setSelectedConversation(conv)}
                        >
                            <div className="conv-avatar">{conv.avatar}</div>
                            <div className="conv-content">
                                <div className="conv-header">
                                    <span className="conv-name">{conv.name}</span>
                                    <span className="conv-platform">{conv.platform}</span>
                                </div>
                                <div className="conv-message">{conv.message}</div>
                            </div>
                            <div className="conv-time">{conv.timestamp}</div>
                        </div>
                    ))}
                </div>

                <div className="chat-area">
                    {selectedConversation && (
                        <>
                            <div className="chat-header">
                                <div className="chat-user-info">
                                    <div className="chat-avatar">{selectedConversation.avatar}</div>
                                    <div>
                                        <h3>{selectedConversation.name}</h3>
                                        <p>@{selectedConversation.name.toLowerCase().replace(' ', '')}</p>
                                    </div>
                                </div>
                                <button className="btn-action">⋮</button>
                            </div>

                            <div className="messages-container">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.isReply ? 'sent' : 'received'}`}>
                                        <div className="message-bubble">
                                            <p>{msg.content}</p>
                                            <span className="message-time">{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="chat-input"
                                />
                                <button className="btn-send" onClick={handleSendMessage}>Send</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SocialInbox;
