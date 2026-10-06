import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/* Split into two contexts so opening the drawer re-renders ONLY ContactDrawer:
   - Actions are memoized once → Navbar/MainSite/Portfolio never re-render on toggle.
   - isOpen lives in its own context → only the drawer subscribes to it. */
const ContactActionsContext = createContext(null);
const ContactIsOpenContext = createContext(false);

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactDrawer = useCallback(() => setIsOpen(true), []);
  const closeContactDrawer = useCallback(() => setIsOpen(false), []);
  const toggleContactDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  const actions = useMemo(
    () => ({ openContactDrawer, closeContactDrawer, toggleContactDrawer }),
    [openContactDrawer, closeContactDrawer, toggleContactDrawer]
  );

  return (
    <ContactActionsContext.Provider value={actions}>
      <ContactIsOpenContext.Provider value={isOpen}>
        {children}
      </ContactIsOpenContext.Provider>
    </ContactActionsContext.Provider>
  );
};

/* Stable actions only — safe for components that just trigger the drawer. */
export const useContactActions = () => {
  const context = useContext(ContactActionsContext);
  if (!context) {
    throw new Error('useContactActions must be used within a ContactProvider');
  }
  return context;
};

/* Full hook (actions + isOpen) — only the drawer itself needs isOpen. */
export const useContactDrawer = () => {
  const { openContactDrawer, closeContactDrawer, toggleContactDrawer } =
    useContactActions();
  const isOpen = useContext(ContactIsOpenContext);
  return { isOpen, openContactDrawer, closeContactDrawer, toggleContactDrawer };
};
