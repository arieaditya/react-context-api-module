import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    padding: '10px 20px',
    border: `2px solid ${theme === 'light' ? '#333' : '#fff'}`,
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      Toggle Theme (Current: {theme})
    </button>
  );
};

export default ThemedButton;
