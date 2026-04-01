// TAB: Wheel — The Living Wheel with board game visual
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import SacredLogo from '../../components/SacredLogo';
import WheelOfYear from '../../components/WheelOfYear';

const S = COLORS.samhain;

export default function WheelTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SacredLogo size={40} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* The Wheel */}
        <WheelOfYear
          activeSeason="samhain"
          size={280}
          onSeasonPress={(key) => router.push(`/wheel/samhain`)}
        />

        <Text style={styles.title}>Samhain</Text>
        <Text style={styles.subtitle}>Step Into the Unknown</Text>

        <Text style={styles.body}>
          Before the light returns there is the dark.{'\n'}
          Before rebirth there is dissolution.{'\n'}
          Samhain is the exhale of the year.{'\n\n'}
          The fields lie bare. The leaves fall.{'\n'}
          The ancestors draw near.{'\n'}
          The veil thins.
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
  container: { flex: 1, backgroundColor: S.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 100, alignItems: 'center' },
  title: {
    fontFamily: FONTS.heading, fontSize: 26, color: S.text, textAlign: 'center', marginTop: 24,
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.5,
    textAlign: 'center', marginTop: 6, marginBottom: 28,
  },
  body: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.8,
    lineHeight: 28, textAlign: 'center', marginBottom: 32,
  },
  cta: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, paddingVertical: 16, paddingHorizontal: 32,
    backgroundColor: 'rgba(155,89,182,0.08)',
  },
  ctaText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1 },
});
