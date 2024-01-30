import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeButton() {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);
  return (
    <>
      <div id="theme-toggler-container" className={isDark ? 'dark' : 'light'}>
        <button
          id="theme-toggler"
          onClick={toggleTheme}
          className={isDark ? 'dark' : 'light'}
        >
          {isDark ? (
            <DarkModeIcon></DarkModeIcon>
          ) : (
            <LightModeIcon></LightModeIcon>
          )}
        </button>
      </div>
      <button
        onClick={toggleTheme}
        id="theme-toggler-mobile"
        className={isDark ? 'dark' : 'light'}
      >
        {isDark ? (
          <DarkModeIcon sx={{ fontSize: 35 }}></DarkModeIcon>
        ) : (
          <LightModeIcon sx={{ fontSize: 35 }}></LightModeIcon>
        )}
      </button>
    </>
  );
}
