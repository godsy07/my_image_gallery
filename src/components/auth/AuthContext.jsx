import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const userLogin = (user) => {
    setAuthUser(user);
  };

  const userLogout = async () => {
    setAuthUser(null);
  };

  const isUserAuthenticated = () => {
    return authUser !== null;
  };

  return (
    <AuthContext.Provider value={{ authUser, userLogin, userLogout, isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
