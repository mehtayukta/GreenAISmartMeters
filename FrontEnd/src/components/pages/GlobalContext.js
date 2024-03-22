import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [globalVariable, setGlobalVariable] = useState('/monitor-tracking-options');
  const [globalVariable_2, setGlobalVariable_2] = useState('');


  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 }}>
      {children}
    </GlobalContext.Provider>
  );
};