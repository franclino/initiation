// Theme context — dark/light mode with fully inverted colors
import { createContext, useContext, useState } from 'react';
import { LOGO } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark(!isDark);

  const t = {
    isDark,
    toggle,
    bg: isDark ? '#000000' : '#f5f0e8',
    text: isDark ? '#eeeeee' : '#1a1a1a',
    textSoft: isDark ? 'rgba(238,238,238,0.7)' : 'rgba(26,26,26,0.7)',
    accent: isDark ? '#c8a960' : '#5a4510',
    glow: isDark ? '#b874d6' : '#6a3d9a',
    card: isDark ? 'rgba(200,169,96,0.03)' : 'rgba(80,60,20,0.05)',
    cardBorder: isDark ? 'rgba(200,169,96,0.2)' : 'rgba(80,60,20,0.2)',
    ornament: isDark ? 'rgba(200,169,96,0.15)' : 'rgba(80,60,20,0.15)',
    enterBorder: isDark ? 'rgba(155,89,182,0.3)' : 'rgba(100,50,160,0.3)',
    enterBg: isDark ? 'rgba(155,89,182,0.05)' : 'rgba(100,50,160,0.05)',
    starfieldOpacity: isDark ? 0.5 : 0.06,
    wheelImage: isDark ? LOGO.wheelOnly : LOGO.wheelOnlyLight,
    wheelOpacity: isDark ? 0.4 : 0.15,
  };

  return (
    <ThemeContext.Provider value={t}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  // Fallback for when context isn't available yet
  if (!ctx) return {
    isDark: true, toggle: () => {},
    bg: '#000000', text: '#eeeeee', textSoft: 'rgba(238,238,238,0.7)',
    accent: '#c8a960', glow: '#b874d6',
    card: 'rgba(200,169,96,0.03)', cardBorder: 'rgba(200,169,96,0.2)',
    ornament: 'rgba(200,169,96,0.15)',
    enterBorder: 'rgba(155,89,182,0.3)', enterBg: 'rgba(155,89,182,0.05)',
    starfieldOpacity: 0.5, wheelImage: LOGO.wheelOnly, wheelOpacity: 0.4,
  };
  return ctx;
}
