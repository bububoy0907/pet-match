import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Header from '../../components/Header';
import './Profile.css';

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="profile-container">
      <div className="profile-box">
          <h2>User Profile</h2>

          <div className="profile-item">
            <span className="label">Account Type:</span>
            <span className="value">
              {auth.accountType?.charAt(0).toUpperCase() + auth.accountType?.slice(1)}
            </span>
            <span className="fixed-link">Fixed</span>
          </div>

          <div className="profile-item">
            <span className="label">Username:</span>
            <span className="value">{auth.username}</span>
            <span className="change-link">Change</span>
          </div>

          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{auth.email}</span>
            <span className="change-link">Change</span>
          </div>

          {auth.accountType === 'customer' && auth.dateOfBirth && (
            <div className="profile-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{new Date(auth.dateOfBirth).toISOString().slice(0, 10)}</span>
              <span className="change-link">Change</span>
            </div>
          )}

          <div className="profile-item">
            <span className="label">Password:</span>
            <span className="value">********</span>
            <span className="change-link">Change</span>
          </div>

          <button className="return-button" onClick={() => navigate('/')}>
            Return
          </button>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
