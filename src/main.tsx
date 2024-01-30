import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'reactjs-popup/dist/index.css';
import './index.css';
import './mediaQueries.css';
import { ThemeProvider } from './contexts/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
