import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface Auth {
  userData: any | null;
  token: string | undefined;
  login: (response: any | null) => void;
  logout: () => any;
}

const UserAuthContext = createContext<Auth | null>(null);

interface UserAuthContextType {
  children: React.ReactNode;
}

export const UserAuthContextProvider: React.FC<UserAuthContextType> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const login = (response: any) => {
    if (response.data.token && response.data.data) {
      setToken(response.data.token);
      setUserData(response.data.data);
      navigate('/');
    }
  };

  const logout = () => {
    setToken(undefined);
  };

  return (
    <UserAuthContext.Provider value={{ login, logout, token, userData }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(UserAuthContext);
}
