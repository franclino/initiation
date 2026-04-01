// TAB: Wheel — Seasonal landing (redirects to current season)
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, WHEEL } from '../../constants/theme';

const S = COLORS.samhain;

export default function WheelTab() {
  const router = useRouter();

  // Current season detection — for now hardcoded to Samhain
  const currentSeason = WHEEL.seasons.find((s) => s.key === 'samhain');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Wheel placeholder */}
        <View style={styles.wheelContainer}>
          <View style={styles.wheel}>
            {WHEEL.seasons.map((season) => {
              const isCurrent = season.key === currentSeason.key;
              const rad = ((season.angle - 90) * Math.PI) / 180;
              const r = 90;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <View
                  key={season.key}
                  style={[
                    styles.seasonDot,
                    {
                      transform: [{ translateX: x }, { translateY: y }],
                    },
                    isCurrent && styles.seasonDotActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.seasonLabel,
                      isCurrent && styles.seasonLabelActive,
                    ]}
                  >
                    {season.name}
                  </Text>
                </View>
              );
            })}
            <Text style={styles.wheelCenter}>⊛</Text>
          </View>
        </View>

        <Text style={styles.title}>{currentSeason.name}</Text>
        <Text style={styles.subtitle}>Step Into the Unknown</Text>

        <Text style={styles.body}>
          Before the light returns there is the dark.{'\n'}
          Before rebirth there is dissolution.{'\n'}
          Samhain is the exhale of the year.
        </Text>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/wheel/samhain')}
          activeOpacity={0.7}
        >
          <Text style={styles.ctaText}>Explore This Season</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: S.background,
  },
  logo: {
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 4,
  },
  logoText: {
    fontSize: 24,
    color: S.accent,
    opacity: 0.8,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginBottom: 24,
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(139,105,20,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonDot: {
    position: 'absolute',
    alignItems: 'center',
  },
  seasonDotActive: {},
  seasonLabel: {
    fontFamily: FONTS.body,
    fontSize: 10,
    color: S.text,
    opacity: 0.3,
  },
  seasonLabelActive: {
    opacity: 1,
    color: S.glow,
    fontSize: 12,
    fontFamily: FONTS.bodyBold,
  },
  wheelCenter: {
    fontSize: 28,
    color: S.accent,
    opacity: 0.6,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: S.text,
    textAlign: 'center',
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    opacity: 0.8,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
  },
  cta: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(155,89,182,0.08)',
  },
  ctaText: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    color: S.text,
    letterSpacing: 1,
  },
});
