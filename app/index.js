// SCREEN 1 — APP OPEN — The threshold
// Black void. Sacred geometry breathes. Particles drift like ash.
// "INITIATION — A Journey to Self-Discovery"
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FONTS } from '../constants/theme';
import AtmosphericBackground from '../components/AtmosphericBackground';

export default function AppOpen() {
  const router = useRouter();

  return (
    <AtmosphericBackground season="samhain">
      <View style={styles.container}>
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
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
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
    opacity: 0.8,
    marginBottom: 60,
  },
  enterButton: {
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.3)',
    paddingVertical: 16,
    paddingHorizontal: 52,
    borderRadius: 2,
    backgroundColor: 'rgba(155,89,182,0.05)',
  },
  enterText: {
    fontFamily: FONTS.headingLight,
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: 8,
  },
});
