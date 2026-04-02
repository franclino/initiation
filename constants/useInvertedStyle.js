// Returns a style object that inverts the screen when light mode is on
import { useThemeMode } from './ThemeContext';

export function useInvertStyle() {
  const { isDark } = useThemeMode();
  if (isDark) return {};
  return {
    // Classic color invert filter via React Native
    // We apply this as a transform on the root view
    filter: 'invert(1)',
  };
}

// Simpler: just return the invert flag
export function useIsDark() {
  const { isDark } = useThemeMode();
  return isDark;
}
