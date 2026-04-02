// Theme context — dark/light mode with inverted colors
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark(!isDark);

  // Inverted color helpers
  const t = {
    isDark,
    toggle,
    bg: isDark ? '#000000' : '#f5f0e8',
    text: isDark ? '#eeeeee' : '#1a1a1a',
    textSoft: isDark ? 'rgba(238,238,238,0.7)' : 'rgba(26,26,26,0.7)',
    accent: isDark ? '#c8a960' : '#8b6914',
    glow: isDark ? '#b874d6' : '#6a3d9a',
    card: isDark ? 'rgba(200,169,96,0.03)' : 'rgba(100,80,40,0.06)',
    cardBorder: isDark ? 'rgba(200,169,96,0.2)' : 'rgba(100,80,40,0.25)',
    starfieldOpacity: isDark ? 0.5 : 0.08,
    wheelOpacity: isDark ? 0.4 : 0.12,
  };

  return (
    <ThemeContext.Provider value={t}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
