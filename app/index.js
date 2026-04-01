// SCREEN 1 — APP OPEN
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';

export default function AppOpen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo placeholder */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>✦</Text>
      </View>

      <Text style={styles.title}>INITIATION</Text>
      <Text style={styles.subtitle}>A Journey to Self-Discovery</Text>

      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => router.push('/home')}
        activeOpacity={0.7}
      >
        <Text style={styles.enterText}>ENTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.general.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    color: COLORS.general.accent,
    opacity: 0.8,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    color: COLORS.general.text,
    letterSpacing: 8,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.general.text,
    opacity: 0.7,
    marginBottom: 60,
  },
  enterButton: {
    borderWidth: 1,
    borderColor: COLORS.general.accent,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 2,
  },
  enterText: {
    fontFamily: FONTS.headingLight,
    fontSize: 14,
    color: COLORS.general.text,
    letterSpacing: 6,
  },
});
