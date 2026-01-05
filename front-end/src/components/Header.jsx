import React, { useContext, useState, useRef, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import hamburgerIcon from '../assets/icons/hamburger.svg';
import './Header.css';
const businessButtons = (auth, navigate, close) => (
    <>
     <div onClick={() => { navigate('/post-card'); close(); }}>
       📤 Post Pet Card
     </div>
     <div onClick={() => { navigate('/post-blog'); close(); }}>
       📝 Add Pet Blog Post
     </div>
     <div onClick={() => { navigate('/chatbox'); close(); }}>
      💬 Chat with Customers
    </div>
   </>
);
const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-bar">
      <div className="title" onClick={() => navigate('/')}>
        PetMatch
      </div>
      <img
        src={hamburgerIcon}
        alt="Menu"
        className="menu-icon"
        onClick={toggleMenu}
      />

      <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <div
          onClick={() => {
            navigate(auth.isLoggedIn ? '/profile' : '/account');
            setMenuOpen(false);
          }}
        >
          {auth.isLoggedIn ? `Account current: ${auth.username}` : 'Account'}
        </div>
        {auth.accountType === 'customer' && (
        <div
          onClick={() => {
            navigate('/chatbox');
            setMenuOpen(false);
          }}
        >
          Chat
        </div>
        )}
        
                {/* Blog visible only to business accounts */}
        {auth.accountType === 'business' && (
          <div onClick={() => { navigate('/petshop'); setMenuOpen(false); }}>
            🏪 My Pet‑shop Blog Page
          </div>
        )}

        {/* extra upload buttons for business */}
        {auth.accountType === 'business' &&
          businessButtons(auth, navigate, () => setMenuOpen(false))}
      </div>
    </header>
  );
};

export default Header;
