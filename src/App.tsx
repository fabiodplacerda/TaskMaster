import { useContext } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { ThemeContext } from './contexts/theme';
import ThemeButton from './components/ThemeButton';

function App() {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <div className="app" style={{ ...theme }}>
      <ThemeButton />
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
