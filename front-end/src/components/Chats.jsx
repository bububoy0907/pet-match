import React, { useEffect, useState, useContext } from 'react';
import Avatar from '../img/default-avatar.png';
import AuthContext from '../context/auth-context';
import { ChatContext } from '../context/chat-context';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chats/${currentUser.userId}`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error('Failed to fetch chats:', err);
      }
    };

    if (currentUser?.userId) fetchChats();
  }, [currentUser?.userId]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className='chats'>
      {chats
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((chat) => (
          <div key={chat._id} className="userChat" onClick={() => handleSelect(chat.receiver)}>
            <img src={chat.receiver.photoURL || Avatar} alt="" />
            <div className="userChatInfo">
              <span>{chat.receiver.username}</span>
              <p>{chat.lastMessage?.text || 'Say hi!'}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
