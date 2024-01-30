import { ReactNode, createContext, useState } from 'react';

const themes = {
  dark: {
    backgroundColor: 'rgb(32, 38, 57)',
    backgroundImage:
      'linear-gradient(62deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',
    backgroundAttachment: 'fixed',
    color: 'white',
  },
  light: {
    backgroundColor: '#fbab7e',
    backgroundImage: 'linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%)',
    backgroundAttachment: 'fixed',
    color: 'black',
  },
};

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  console.log('hello');
  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
