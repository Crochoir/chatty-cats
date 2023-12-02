// Frontend
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'cookies-js';
import Nav from './Nav';
import '../ChatStyles.css';

const ChatComponent = () => {
  const [message, setMessage] = useState({ user: Cookies.get('user'), recipient: '', content: '' });
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://192.168.1.8:3001');
    setSocket(socketInstance);

    socketInstance.on('userList', (users) => {
      console.log('User list updated:', users);
    });

    socketInstance.on('initMessages', (data) => {
      setChatHistory(data);
    });

    socketInstance.on('message', (data) => {
      setChatHistory((prevHistory) => [...prevHistory, data]);
    });

    socketInstance.emit('init', Cookies.get('user'));

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { user: message.user, recipient: message.recipient, content: message.content });
      setMessage({ user: message.user, recipient: message.recipient, content: '' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <Nav />
      <div className="chat-container">
        <main>
          <h1>Welcome to the Chat</h1>
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.user === message.user ? (
                  <span style={{ color: 'blue' }}>{chat.user}: </span>
                ) : (
                  <span>{chat.user} {chat.recipient ? `to ${chat.recipient}` : ''}: </span>
                )}
                {chat.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="chat-input"
            placeholder="Recipient"
            value={message.recipient}
            onChange={(e) => setMessage({ ...message, recipient: e.target.value })}
          />
          <input
            type="text"
            className="chat-input"
            placeholder="Message"
            value={message.content}
            onChange={(e) => setMessage({ ...message, content: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <button className="chat-button" onClick={sendMessage}>
            Send Message
          </button>
        </main>
      </div>
    </div>
  );
};

export default ChatComponent;
