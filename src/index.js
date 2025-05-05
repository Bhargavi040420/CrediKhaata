import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DarkModeProvider } from './contexts/DarkModeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <DarkModeProvider> {/* 👈 Add this wrapper */}
        <App />
      </DarkModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);






