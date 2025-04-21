import { createContext, useContext, useState } from 'react';
import { User } from '../types/User';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;

    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    
}