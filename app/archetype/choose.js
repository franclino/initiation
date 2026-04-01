// SCREEN 4A — Choose an Archetype (Wheel Selection)
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, WHEEL } from '../../constants/theme';

export default function ChooseArchetype() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Choose an Archetype</Text>
      <Text style={styles.subtitle}>Tap a season on the Wheel</Text>

      {/* Wheel — simplified list for now, will become visual wheel */}
      <View style={styles.wheel}>
        {WHEEL.seasons.map((season) => (
          <TouchableOpacity
            key={season.key}
            style={[
              styles.seasonButton,
              { borderColor: COLORS[season.key]?.glow || COLORS.general.accent },
            ]}
            onPress={() => router.push(`/attunement/result?archetype=${season.key}`)}
            activeOpacity={0.6}
          >
            <Text style={[styles.seasonText, { color: COLORS[season.key]?.text || COLORS.general.text }]}>
              {season.name}
            </Text>
            <Text style={styles.positionText}>{season.position}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 24,
  },
  logoText: {
    fontSize: 28,
    color: COLORS.general.accent,
    opacity: 0.8,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.general.text,
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 32,
  },
  wheel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  seasonButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'rgba(200,169,96,0.04)',
  },
  seasonText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
  },
  positionText: {
    fontFamily: FONTS.body,
    fontSize: 11,
    color: COLORS.general.text,
    opacity: 0.3,
    marginTop: 4,
  },
});
