import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts, Montserrat_300Light, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider, useThemeMode } from '../constants/ThemeContext';

SplashScreen.preventAutoHideAsync();

function AppStack() {
  const { isDark } = useThemeMode();

  // Classic invert: white becomes black, black becomes white
  const invertStyle = isDark ? {} : {
    flex: 1,
    // ColorMatrix invert — swap all colors
    backgroundColor: '#f5f0e8',
    // We use a wrapper View with inverted colors
  };

  return (
    <View style={[{ flex: 1 }, !isDark && {
      // React Native supports this on iOS
      transform: [{ scaleY: 1 }], // no-op but needed for the style to apply
    }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={[{ flex: 1 }, !isDark && {
        // Invert using color matrix — supported in newer RN
        experimental_filter: [{ invert: 1 }],
      }]}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: isDark ? '#000000' : '#f5f0e8' },
            animation: 'fade',
          }}
        />
      </View>
    </View>
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
