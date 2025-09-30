import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemedButton from './components/ThemedButton';

function App() {
  return (
    <ThemeProvider>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>React Context API Example</h1>
          <p>Click the button to toggle between light and dark themes</p>
          <ThemedButton />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
