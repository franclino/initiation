// SCREEN 1 — APP OPEN
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, LOGO } from '../constants/theme';

export default function AppOpen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Sacred geometry logo */}
      <Image source={LOGO.dark} style={styles.logo} resizeMode="contain" />

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
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 40,
    opacity: 0.9,
  },
  title: {
    fontFamily: FONTS.headingLight,
    fontSize: 32,
    color: '#f5f0e8',
    letterSpacing: 12,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: '#f5f0e8',
    opacity: 0.5,
    marginBottom: 60,
  },
  enterButton: {
    borderWidth: 1,
    borderColor: 'rgba(200,169,96,0.4)',
    paddingVertical: 16,
    paddingHorizontal: 52,
    borderRadius: 2,
  },
  enterText: {
    fontFamily: FONTS.headingLight,
    fontSize: 14,
    color: '#f5f0e8',
    letterSpacing: 8,
    opacity: 0.8,
  },
});
