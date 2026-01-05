import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/auth-context';
import { ChatContext } from '../context/chat-context';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.userId ? 'owner' : ''}`}>
      <div className="messageInfo">
        <img
          src={message.senderId === currentUser.userId ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
        <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
