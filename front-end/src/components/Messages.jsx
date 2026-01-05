import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import { ChatContext } from '../context/chat-context';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages/latest/${currentUser.userId}/${data.user._id}`);
        const fetchedMessages = await res.json(); // Rename the variable to avoid shadowing `data`
        setMessages(fetchedMessages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (currentUser?.userId && data.user?._id) fetchMessages();
  }, [currentUser?.userId, data.user?._id]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <div key={msg._id} className={`message ${msg.sender === currentUser.userId ? 'owner' : ''}`}>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
