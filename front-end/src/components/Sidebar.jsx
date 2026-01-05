import React, { useContext } from "react";
import ChatNavbar from "./ChatNavbar";
import Search from "./Search";
import Chats from "./Chats";
import AuthContext from '../context/auth-context';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='sidebar'>
        <ChatNavbar />
        <Search currentUserId={currentUser?.userId} />
        <Chats />
        </div>
  )
}

export default Sidebar
