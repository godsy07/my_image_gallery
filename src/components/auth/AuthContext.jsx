import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [removeCookie] = useCookies("my_api_token");

  const userLogin = (user) => {
    setAuthUser(user);
  };

  const userLogout = async () => {
    removeCookie("my_api_token")
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
