// SCREEN 4 — ARCHETYPE THRESHOLD (Paywall)
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, PRICING } from '../../constants/theme';
import PsychedelicBackground from '../../components/PsychedelicBackground';
import GoddessCard from '../../components/GoddessCard';

const S = COLORS.samhain;

export default function SamhainThreshold() {
  const router = useRouter();

  return (
    <PsychedelicBackground season="samhain">

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <GoddessCard season="samhain" title="The Crone / The Magician" subtitle="Samhain — NW — Earth, cold" />

        <Text style={styles.subheader}>
          Explore the Archetype of the Crone / The Magician
        </Text>

        <Text style={styles.body}>
          This is a personal initiation journey.{'\n'}
          Choosing to walk this path requires{'\n'}devotion and energetic exchange.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/initiation/entering')}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryText}>
              Walk the Path of the Crone / the Magician
            </Text>
            <Text style={styles.priceText}>
              {PRICING.singleArchetype}{PRICING.currency}
            </Text>
            <Text style={styles.priceDetail}>
              Lifetime access to this archetypal initiation.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryText}>Walk the Full Wheel</Text>
            <Text style={styles.priceText}>
              {PRICING.fullWheel}{PRICING.currency}
            </Text>
            <Text style={styles.priceDetail}>
              Lifetime access to all 8 archetypes and their deeper initiations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={() => router.push('/wheel/samhain')}
            activeOpacity={0.7}
          >
            <Text style={styles.tertiaryText}>
              Return to the current season within the Living Wheel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PsychedelicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 12,
  },
  logoText: {
    fontSize: 28,
    color: S.accent,
    opacity: 0.8,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  header: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: S.text,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subheader: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
    color: S.text,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 32,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 40,
  },
  buttons: {
    gap: 16,
  },
  primaryButton: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 24,
    backgroundColor: 'rgba(155,89,182,0.1)',
  },
  primaryText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: S.text,
    marginBottom: 8,
  },
  priceText: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    color: S.glow,
    marginBottom: 4,
  },
  priceDetail: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: S.text,
    opacity: 0.85,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: S.accent,
    borderRadius: 4,
    padding: 24,
    backgroundColor: 'rgba(139,105,20,0.08)',
  },
  secondaryText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: S.text,
    marginBottom: 8,
  },
  tertiaryButton: {
    padding: 20,
    alignItems: 'center',
  },
  tertiaryText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
    opacity: 0.8,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
