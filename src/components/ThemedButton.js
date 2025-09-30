import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import context

const ThemedButton = () => {
  // 4. Gunakan hook useContext untuk mengakses 'value' dari Provider
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buttonStyle = {
    background: theme === 'light' ? '#FFF' : '#333',
    color: theme === 'light' ? '#333' : '#FFF',
    border: `2px solid ${theme === 'light' ? '#333' : '#FFF'}`,
    padding: '12px 24px',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: theme === 'light' 
      ? '0 4px 8px rgba(0,0,0,0.1)' 
      : '0 4px 8px rgba(255,255,255,0.1)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme === 'light' 
        ? '0 6px 12px rgba(0,0,0,0.15)' 
        : '0 6px 12px rgba(255,255,255,0.15)'
    }
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemedButton;