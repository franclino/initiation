import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Montserrat_300Light, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider, useThemeMode } from '../constants/ThemeContext';

SplashScreen.preventAutoHideAsync();

function AppStack() {
  const { isDark } = useThemeMode();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: isDark ? '#000000' : '#f5f0e8' },
          animation: 'fade',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}
