import { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactDrawer = () => setIsOpen(true);
  const closeContactDrawer = () => setIsOpen(false);
  const toggleContactDrawer = () => setIsOpen((prev) => !prev);

  return (
    <ContactContext.Provider
      value={{
        isOpen,
        openContactDrawer,
        closeContactDrawer,
        toggleContactDrawer,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactDrawer = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactDrawer must be used within a ContactProvider');
  }
  return context;
};
