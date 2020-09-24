import React, { createContext, useState, useContext, useEffect, Fragment } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingPage from '../components/LoadingPage';
import { simpleHash } from '../utils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userStorage = await AsyncStorage.getItem('@gotask:userStorage');
      if (userStorage) {
        setUserId(userStorage);
        return setLoading(false);
      }
      const userHash = simpleHash();
      setUserId(userHash);
      setLoading(false);
      AsyncStorage.setItem('@gotask:userStorage', userHash);
    })();
  }, []);


  return (
    <Fragment>
      {
        (loading) && <LoadingPage />
      }
      {
        (!loading) &&
        <AuthContext.Provider value={{ userId }}>
          {children}
        </AuthContext.Provider>
      }
    </Fragment>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthProvider;