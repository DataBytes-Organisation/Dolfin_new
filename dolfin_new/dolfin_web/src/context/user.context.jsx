import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});


export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
