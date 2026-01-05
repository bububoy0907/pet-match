// src/pages/ChatHome.jsx
import React from 'react';
import "./ChatHome.scss"
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import Header from '../../components/Header';

const ChatHome = () => {
  return (
    <div  className='chathome'>
      <Header />
      <div className='container'>
        <Sidebar/>
        <Chat/>

      </div>
    </div>
  )
}

export default ChatHome
