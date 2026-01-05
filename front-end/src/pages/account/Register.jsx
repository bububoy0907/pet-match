import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialType = state?.accountType || 'customer';
  const [accountType, setAccountType] = useState(initialType);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        accountType: accountType,
      };
  
      if (accountType === 'customer') {
        payload.dateOfBirth = form.dateOfBirth;
      }
  
      await axios.post('http://localhost:5000/api/users/register', payload);
  
      alert('Register successful!');
      navigate('/account');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Header />
      <div className="account-container">
        <h1 className="register-page-title">Register Customer / Business Account</h1>
  
        <div className="account-tabs-container">
          <div className="account-tabs">
            <button
              onClick={() => setAccountType('customer')}
              className={`tab-btn ${accountType === 'customer' ? 'active' : ''}`}
            >
              Customer
            </button>
            <button
              onClick={() => setAccountType('business')}
              className={`tab-btn ${accountType === 'business' ? 'active' : ''} business-btn`}
            >
              Business
            </button>
          </div>
  
          <div className="register-account-box">
            <form onSubmit={handleRegister}>
              <label className="input-label">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
              />
  
              <label className="input-label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
  
              <label className="input-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
  
              <label className="input-label">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
  
              {accountType === 'customer' && (
                <>
                  <label className="input-label">Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                </>
              )}
  
              <div className="btn-group">
                <button type="submit">Register</button>
              </div>
  
              <div className="register-link">
                Already have an account?{" "}
                <span onClick={() => navigate('/account')} className="clickable-link">
                  Login here
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
