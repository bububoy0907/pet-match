import React, { useContext } from 'react';
import AuthContext from '../context/auth-context';
import Avatar from '../img/default-avatar.png';

const ChatNavbar = () => {
  const { username, photoURL, logout } = useContext(AuthContext);

  return (
    <div className='chatnavbar'>
      <div className="user">
        <img src={photoURL || Avatar} alt="" />
        <span>{username}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ChatNavbar;
