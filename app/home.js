// SCREEN 2 — HOME SCREEN
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, LOGO } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Sacred logo */}
      <TouchableOpacity onPress={() => router.push('/')} style={styles.logoWrap}>
        <Image source={LOGO.dark} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>

      <Text style={styles.title}>Where would you like to begin?</Text>

      <ScrollView
        contentContainerStyle={styles.cards}
        showsVerticalScrollIndicator={false}
      >
        {/* Path A */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/wheel')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardTitle}>Walk the Living Wheel</Text>
          <Text style={styles.cardSub}>
            Enter the current season and its mysteries
          </Text>
        </TouchableOpacity>

        {/* Path B */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/look-within')}
          activeOpacity={0.7}
        >
          <Text style={styles.cardTitle}>Look Within</Text>
          <Text style={styles.cardSub}>Sacred Archetypal Journey</Text>
        </TouchableOpacity>

        {/* Re-enter */}
        <TouchableOpacity
          style={[styles.card, styles.cardMuted]}
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.cardTitle, styles.mutedText]}>
            Re-Enter your INITIATION Path
          </Text>
          <Text style={[styles.cardSub, styles.mutedText]}>
            Log in to your personal profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.general.background,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logoWrap: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 44,
    height: 44,
    opacity: 0.7,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  cards: {
    gap: 20,
    paddingBottom: 40,
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
  cardMuted: {
    borderColor: 'rgba(200,169,96,0.3)',
    backgroundColor: 'transparent',
  },
  mutedText: {
    opacity: 0.5,
  },
});
