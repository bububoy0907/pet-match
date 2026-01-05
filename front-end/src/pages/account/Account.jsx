import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/auth-context';
import Header from '../../components/Header';
import './Account.css';

function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      const userData = res.data;
  
      auth.login({
        isLoggedIn: true,
        token: userData.token,
        username: userData.username,
        userId: userData.userId,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth || null,   // ✅ optional
        accountType: userData.accountType || 'customer', // ✅ default fallback
      });
  
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Header />
      <div className="account-container">
        <div className="account-box">
          <h2 className="login-title">Welcome to PetMatch!</h2>
  
          <form onSubmit={handleLogin}>
            <label className="input-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
  
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
  
            <div className="btn-group">
              <button type="submit">Login</button>
            </div>
  
            <div className="register-link">
              Don't have an account?{" "}
              <span onClick={() => navigate('/register')} className="clickable-link">
                Register here
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
