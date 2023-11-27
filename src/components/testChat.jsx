import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Cookies from 'cookies-js';
import Nav from './Nav';
import '../ChatStyles.css';


const UserList = ({ users, onSelectUser, currentUser }) => (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users
          .filter((user) => user.username !== currentUser)
          .map((user) => (
            <li key={user._id} onClick={() => onSelectUser(user)}>
              {user.username} <button onClick={() => 
              {
                onSelectUser(user)
                }}>Chat</button>
            </li>
          ))}
      </ul>
    </div>
  );

const ChatComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState({ user: Cookies.get('user'), recipient: '', content: '' });
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    const socketInstance = io('http://192.168.1.8:3001');
    setSocket(socketInstance);

    socketInstance.on('initMessages', (data) => {
      setChatHistory(data);
    });

    socketInstance.on('message', (data) => {
      setChatHistory((prevHistory) => [...prevHistory, data]);
    });



    // Emit the 'init' event to initialize the user
    socketInstance.emit('init', (Cookies.get('user'), message.recipient ));

/*
    socketInstance.on('userList', (data) => {
      setUsers(data);
    });
    */

    fetchUserList();

    return () => {
      socketInstance.disconnect();
    };
  }, [message.recipient]);

  const fetchUserList = async () => {
    try {
      const response = await fetch('http://192.168.1.8:3001/api/users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };


  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setMessage({...message, recipient: user.username });
  
    try {
      const response = await fetch(`http://192.168.1.8:3001/api/messages/${Cookies.get('user')}/${user.username}`);
      const data = await response.json();
      setChatHistory(data.messages.reverse());
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { user: message.user, recipient: message.recipient, content: message.content });
      setMessage({ user: message.user, recipient: message.recipient, content: '' });
      console.log(message)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };



  useEffect(() => {
    // Scroll to the bottom of the chat history when it changes
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  if (selectedUser) {
    // Redirect to the chat room with the selected user
    return (
      <div>
        <Nav />
        <main>
        <div className="chat-history" ref={chatHistoryRef}>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                {chat.user === message.user ? (
                  <div style={{textAlign: 'right'}}><div className={'right-message'}><span>{chat.content}</span></div></div>
                ) : (
                  <div style={{textAlign: 'left'}}><div className={'left-message'}><span>{chat.content}</span></div></div>
                )}
              </div>
            ))}
          </div>
          <div style={{display: "flex"}}>
          <input
            type="text"
            className="chat-input"
            placeholder="Message"
            value={message.content}
            onChange={(e) => setMessage({ ...message, content: e.target.value })}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-button"
            onClick={sendMessage}
            style={{
                borderRadius: '50%', // Makes the button circular
                width: '40px', // Adjust the width and height as needed
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
                    >
            Send
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="chat-container">
        <main>
          <UserList users={users} onSelectUser={handleSelectUser} currentUser={Cookies.get('user')}/>
        </main>
      </div>
    </div>
  );
};

export default ChatComponent;
