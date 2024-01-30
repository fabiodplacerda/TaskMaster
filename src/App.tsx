import { useContext } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { ThemeContext } from './contexts/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function App() {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <div className="app" style={{ ...theme }}>
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
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
