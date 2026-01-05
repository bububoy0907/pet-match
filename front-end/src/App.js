/*
  File: src/App.js
  Explanation:
    1) This routes "/" → Home.jsx
    2) We have "/chat" → Chat.jsx as placeholder
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'; // ensure correct path
import ChatHome from './pages/chat/ChatPage'; // if you have a Chat folder, or just Chat.jsx
import Account from './pages/account/Account';
import Register from './pages/account/Register';
import Profile from './pages/profile/Profile';
import NameCard from './pages/pet/NameCard';
import PetShop from './pages/pet/PetShop';
import Blog from './pages/pet/Blog';
import { AuthProvider } from './context/auth-context';
import { ChatContextProvider } from './context/chat-context';
import { PetProvider } from "./context/pet-context";
import PostPetCard from "./pages/PostPetCard";
import PostPetBlog from "./pages/PostPetBlog";

function App() {
  return (
    <AuthProvider>
    <ChatContextProvider>
    <PetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatHome />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/pet/:petName" element={<NameCard />} />
        <Route path="/petshop" element={<PetShop />} />
        <Route path='/blog/:petName/:postId' element={<Blog />} />
        <Route path="/chatbox" element={<ChatHome />} />
        <Route path="/post-card" element={<PostPetCard />} />
        <Route path="/post-blog" element={<PostPetBlog />} />
      </Routes>
    </BrowserRouter>
    </PetProvider>
    </ChatContextProvider>
    </AuthProvider>
  );
}

export default App;
