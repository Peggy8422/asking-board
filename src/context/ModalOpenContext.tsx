import React, { useState, createContext, useContext } from 'react';

export const ModalOpenContext = createContext({
  isModalClosed: true,
  setIsModalClosed: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});

export const useModalContext = () => useContext(ModalOpenContext);

export const ModalOpenOrCloseProvider = ({children}: React.PropsWithChildren) => {
  const [isModalClosed, setIsModalClosed] = useState(false);

  return (
    <ModalOpenContext.Provider value={{ isModalClosed, setIsModalClosed }}>
      {children}
    </ModalOpenContext.Provider>
  )
};


