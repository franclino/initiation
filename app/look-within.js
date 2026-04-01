// SCREEN 3B — LOOK WITHIN
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';

export default function LookWithin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Look Within</Text>
      <Text style={styles.subtitle}>Sacred Archetypal Journey</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/archetype/choose')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardTitle}>Choose an Archetype</Text>
          <Text style={styles.cardSub}>
            Select directly from the Wheel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/attunement/start')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardTitle}>Take the Archetypal Attunement</Text>
          <Text style={styles.cardSub}>
            Discover which archetype is most present
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.general.background,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    color: COLORS.general.accent,
    opacity: 0.8,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.general.text,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 48,
  },
  options: {
    gap: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.general.accent,
    borderRadius: 4,
    padding: 28,
    backgroundColor: 'rgba(200,169,96,0.05)',
  },
  cardTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: COLORS.general.text,
    marginBottom: 8,
  },
  cardSub: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.general.text,
    opacity: 0.7,
  },
});
