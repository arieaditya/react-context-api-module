import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import ThemedButton from './components/ThemedButton';

function AppContent() {
  const { theme } = useContext(ThemeContext);
  
  const appStyle = {
    minHeight: '100vh',
    padding: '50px',
    textAlign: 'center',
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#333333' : '#ffffff',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={appStyle}>
      <h1>React Context API Demo</h1>
      <p>Klik tombol di bawah untuk mengubah tema.</p>
      <ThemedButton />
      <div style={{ marginTop: '30px', fontSize: '14px', opacity: 0.7 }}>
        Current theme: <strong>{theme}</strong>
      </div>
    </div>
  );
}

function App() {
  return (
    // 5. Bungkus komponen dengan Provider
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
