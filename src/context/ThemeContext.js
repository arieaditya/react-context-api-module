import React, { createContext, useState } from 'react';

// 1. Buat Context baru
// Nilai default (opsional) hanya digunakan jika komponen tidak memiliki Provider di atasnya.
export const ThemeContext = createContext();

// 2. Buat komponen Provider
// Komponen ini akan menyediakan 'value' ke semua komponen di dalamnya.
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // State yang akan dibagikan

  // Fungsi untuk mengubah state, juga akan dibagikan.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. Sediakan state dan fungsi melalui prop 'value'
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};