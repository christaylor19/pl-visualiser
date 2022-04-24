import { createContext, ReactNode, useState } from 'react';

export type Mode = 'dark' | 'light';

type ContextProps = {
  mode: Mode;
  toggle: () => void;
};

export const ModeContext = createContext<ContextProps>({
  mode: 'light',
  toggle: () => {},
});

type ProviderProps = { children: ReactNode };

const ModeContextProvider = ({ children }: ProviderProps) => {
  const [currentMode, setCurrentMode] = useState<Mode>('light');

  const toggle = (): void => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode: currentMode, toggle }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
