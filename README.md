# Modul Pelatihan: State Management di React dengan Context API

<div align="center">
  <img src="https://raw.githubusercontent.com/arieaditya/react-context-api-module/master/sample_app.png" alt="React Context API Demo" width="800" />
  
  <br><br>
  
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Context%20API-Built--in-FF6B6B?style=for-the-badge" alt="Context API" />
  <img src="https://img.shields.io/badge/Theme-Light%20%2F%20Dark-4ECDC4?style=for-the-badge" alt="Theme Toggle" />
  
  <br><br>
</div>

Repositori ini berisi materi pelatihan singkat untuk memahami dan mengimplementasikan state management di React menggunakan Context API. Tujuannya adalah untuk mengelola state global tanpa _prop drilling_.

## 🎯 Demo Interaktif

<div align="center">
  <img src="https://raw.githubusercontent.com/arieaditya/react-context-api-module/master/dark-mode.gif" alt="Theme Toggle Demo" width="600" />
  <p><em>Lihat bagaimana tema berubah secara smooth dengan Context API!</em></p>
</div>

## 📚 Objektif Pembelajaran

- Memahami masalah _prop drilling_ dan bagaimana Context API menyelesaikannya.
- Mampu membuat **Context** dan **Provider** untuk menyediakan state.
- Mampu mengonsumsi (menggunakan) state dari **Context** di komponen mana pun.
- Mengimplementasikan _use case_ praktis seperti _Theme Toggler_.

## � Table of Contents

1. [🎯 Demo Interaktif](#-demo-interaktif)
2. [📚 Objektif Pembelajaran](#-objektif-pembelajaran)
3. [🚀 Quick Start](#-quick-start)
4. [💡 Konsep Dasar](#1-konsep-dasar)
5. [📁 Struktur Repositori](#2-struktur-repositori)
6. [📝 Penjelasan Kode](#3-penjelasan-kode)
7. [✨ Fitur Aplikasi](#4-fitur-aplikasi)
8. [🛠️ Cara Menjalankan](#5-cara-menjalankan-aplikasi)
9. [🎓 Pembelajaran Kunci](#6-pembelajaran-kunci)
10. [🚀 Pengembangan Selanjutnya](#7-pengembangan-selanjutnya)
11. [🛠️ Teknologi](#8-teknologi-yang-digunakan)
12. [🤝 Kontribusi](#9-kontribusi)

## �🚀 Quick Start

```bash
git clone https://github.com/arieaditya/react-context-api-module.git
cd react-context-api-module
npm install
npm start
```

Buka `http://localhost:3000` dan mulai eksplorasi!

---

## 1. Konsep Dasar

**Context API** adalah fitur bawaan React untuk berbagi data (state) ke seluruh pohon komponen tanpa harus meneruskan _props_ secara manual di setiap level.

## 2. Struktur Repositori

```
react-context-api-module/
├── README.md
├── package.json
├── .gitignore
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── index.js
    ├── index.css
    ├── App.js
    ├── components/
    │   └── ThemedButton.js
    └── context/
        └── ThemeContext.js
```

---

## 3. Penjelasan Kode

### `src/context/ThemeContext.js`

File ini mendefinisikan Context dan komponen Provider-nya. Provider adalah komponen yang akan membungkus bagian dari aplikasi Anda yang membutuhkan akses ke state.

```javascript
import React, { createContext, useState } from "react";

// 1. Buat Context baru
// Nilai default (opsional) hanya digunakan jika komponen tidak memiliki Provider di atasnya.
export const ThemeContext = createContext();

// 2. Buat komponen Provider
// Komponen ini akan menyediakan 'value' ke semua komponen di dalamnya.
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // State yang akan dibagikan

  // Fungsi untuk mengubah state, juga akan dibagikan.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 3. Sediakan state dan fungsi melalui prop 'value'
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### `src/components/ThemedButton.js`

Komponen ini akan mengonsumsi state dari `ThemeContext` menggunakan _hook_ `useContext`. Komponen ini telah ditingkatkan dengan styling yang lebih menarik dan animasi.

```javascript
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemedButton = () => {
  // 4. Gunakan hook useContext untuk mengakses 'value' dari Provider
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buttonStyle = {
    background: theme === "light" ? "#FFF" : "#333",
    color: theme === "light" ? "#333" : "#FFF",
    border: `2px solid ${theme === "light" ? "#333" : "#FFF"}`,
    padding: "12px 24px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow:
      theme === "light"
        ? "0 4px 8px rgba(0,0,0,0.1)"
        : "0 4px 8px rgba(255,255,255,0.1)",
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      Toggle to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemedButton;
```

### `src/App.js`

Di sini kita menggunakan `ThemeProvider` untuk membungkus komponen yang membutuhkan akses ke _theme context_. Aplikasi ini juga memiliki background yang berubah sesuai tema.

```javascript
import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import ThemedButton from "./components/ThemedButton";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  const appStyle = {
    minHeight: "100vh",
    padding: "50px",
    textAlign: "center",
    backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
    color: theme === "light" ? "#333333" : "#ffffff",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      <h1>React Context API Demo</h1>
      <p>Klik tombol di bawah untuk mengubah tema.</p>
      <ThemedButton />
      <div style={{ marginTop: "30px", fontSize: "14px", opacity: 0.7 }}>
        Current theme: <strong>{theme}</strong>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
```

---

## 4. Fitur Aplikasi

<div align="center">
  <img src="https://raw.githubusercontent.com/arieaditya/react-context-api-module/master/dark-mode.gif" alt="Interactive Theme Demo" width="500" />
</div>

✨ **Fitur yang telah diimplementasikan:**

- **Theme Toggle**: Tombol untuk beralih antara tema light dan dark
- **Dynamic Background**: Background halaman berubah sesuai tema
- **Smooth Transitions**: Animasi yang halus saat pergantian tema
- **Enhanced Styling**: Button dengan shadow dan efek hover
- **Theme Indicator**: Menampilkan tema yang sedang aktif
- **Responsive Design**: Tampilan yang responsif di berbagai ukuran layar

---

## 5. Cara Menjalankan Aplikasi

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Langkah-langkah

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/arieaditya/react-context-api-module.git
   cd react-context-api-module
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan aplikasi:**
   ```bash
   npm start
   ```
4. **Buka browser dan kunjungi:**
   ```
   http://localhost:3000
   ```

Aplikasi akan menampilkan halaman dengan tombol untuk mengubah tema dari light ke dark mode dan sebaliknya.

### Scripts yang Tersedia

- `npm start` - Menjalankan aplikasi dalam mode development
- `npm run build` - Membuat build untuk production
- `npm test` - Menjalankan test suite
- `npm run eject` - Mengeluarkan konfigurasi webpack (tidak dapat diundur)

---

## 6. Pembelajaran Kunci

### Konsep yang Dipelajari:

1. **createContext()** - Membuat context baru
2. **Provider** - Komponen yang menyediakan value ke children
3. **useContext()** - Hook untuk mengonsumsi context value
4. **State Management** - Mengelola state global tanpa prop drilling

### Pola yang Diimplementasikan:

- Separation of concerns (context terpisah dari components)
- Reusable Provider pattern
- Custom styling dengan conditional rendering
- Smooth transitions untuk UX yang better

---

## 7. Pengembangan Selanjutnya

Anda dapat mengembangkan aplikasi ini lebih lanjut dengan:

- **Multiple Contexts**: Menambah context lain seperti UserContext, LanguageContext
- **Context Reducer**: Menggunakan useReducer untuk state management yang lebih kompleks
- **Persistent Storage**: Menyimpan tema preference di localStorage
- **TypeScript**: Menambahkan type safety
- **Testing**: Menambahkan unit tests untuk components dan context

---

## 8. Teknologi yang Digunakan

- **React 18.2.0** - Library JavaScript untuk building user interfaces
- **React Scripts 5.0.1** - Build tools dan configuration untuk React
- **Context API** - Built-in React feature untuk state management
- **CSS-in-JS** - Styling menggunakan JavaScript objects
- **ES6+ Features** - Arrow functions, destructuring, template literals

---

## 9. Kontribusi

Repositori ini dibuat untuk tujuan pembelajaran. Anda dapat:

1. Fork repositori ini
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

---

## 10. Lisensi

Proyek ini dibuat untuk tujuan edukasi dan dapat digunakan secara bebas untuk pembelajaran.
