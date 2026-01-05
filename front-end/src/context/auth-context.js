import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Initial authentication state
const initialAuthState = {
  isLoggedIn: false,
  token: null,
  username: null,
  userId: null,
  email: null,
  dateOfBirth: null,
  accountType: null, // ✅ new
};

export function AuthProvider(props) {
  const [authState, setAuthState] = useState(initialAuthState);

  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem("authState"));
    if (storedAuthState?.isLoggedIn) {
      setAuthState(storedAuthState);
      console.log("🟢 AuthContext restored:", storedAuthState);
    }
  }, []);

  const login = (authData) => {
    setAuthState(authData);
    localStorage.setItem("authState", JSON.stringify(authData));
  };

  const logout = () => {
    setAuthState(initialAuthState);
    localStorage.removeItem("authState");
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    token: authState.token,
    username: authState.username,
    userId: authState.userId,
    email: authState.email,
    dateOfBirth: authState.dateOfBirth,
    accountType: authState.accountType,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
