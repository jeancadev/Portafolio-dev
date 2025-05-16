import { createContext, useContext } from 'react';

export const MenuContext = createContext<{ isMenuOpen: boolean }>({ isMenuOpen: false });

export const useMenuState = () => useContext(MenuContext);