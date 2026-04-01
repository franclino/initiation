// SCREEN 3 — SEASONAL WHEEL (SAMHAIN)
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';

const S = COLORS.samhain;

export default function SamhainSeason() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Wheel placeholder */}
        <View style={styles.wheelPlaceholder}>
          <Text style={[styles.wheelText, styles.glowText]}>⊛ Samhain</Text>
        </View>

        <Text style={styles.header}>Samhain</Text>
        <Text style={styles.subheader}>Step Into the Unknown</Text>

        {/* SECTION 1 — Seasonal Introduction */}
        <View style={styles.section}>
          <Text style={styles.poetry}>
            {`Before the light returns\nthere is the dark.\nBefore rebirth\nthere is dissolution.\n\nSamhain is the exhale of the year.\nThe fields lie bare.\nThe leaves fall.\nThe ancestors draw near.\nThe veil thins.\n\nYou stand at the edge\nof the Unknown.\n\nHere, identity loosens.\nCertainty fades.\nMasks fall.\n\nKali walks here — blade in hand.\nHecate waits at the crossroads — torch raised.\nLa Loba collects bones.\nCeridwen stirs the cauldron of becoming.\n\nThey do not take from you.\nThey reveal what was never yours to keep.\n\nSamhain is not about comfort.\nIt is about courage.\nTo descend willingly.\nTo release consciously.\nTo trust the unseen womb of the dark.\n\nIf you step through,\nyou do not return unchanged.`}
          </Text>
        </View>

        {/* Reflection */}
        <View style={styles.reflectionBox}>
          <Text style={styles.reflectionHeader}>Reflection for this season:</Text>
          <Text style={styles.reflectionText}>What is ending?</Text>
          <Text style={styles.reflectionText}>What no longer serves you?</Text>
          <Text style={styles.reflectionText}>What asks to be released?</Text>
          <Text style={styles.invitation}>
            Walk this season consciously.{'\n'}Journal daily with this reflection in mind.
          </Text>
        </View>

        {/* SECTION 2 — Daily Wisdom */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Wisdom</Text>
          <View style={styles.wisdomCard}>
            <Text style={styles.wisdomText}>
              "The dark is not the absence of light.{'\n'}It is the soil in which light is seeded."
            </Text>
          </View>
        </View>

        {/* SECTION 3 — Ritual Portals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ritual Portals</Text>
          <View style={styles.portalRow}>
            <View style={styles.portal}>
              <Text style={styles.portalIcon}>🌑</Text>
              <Text style={styles.portalLabel}>New Moon</Text>
              <Text style={styles.portalStatus}>Date-locked</Text>
            </View>
            <View style={styles.portal}>
              <Text style={styles.portalIcon}>🌕</Text>
              <Text style={styles.portalLabel}>Full Moon</Text>
              <Text style={styles.portalStatus}>Date-locked</Text>
            </View>
            <View style={styles.portal}>
              <Text style={styles.portalIcon}>🔮</Text>
              <Text style={styles.portalLabel}>Samhain Portal</Text>
              <Text style={styles.portalStatus}>31.10</Text>
            </View>
          </View>
        </View>

        {/* SECTION 4 — Storytelling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storytelling</Text>
          <View style={styles.lockedCard}>
            <Text style={styles.lockedText}>
              Unlocks on the festival date
            </Text>
          </View>
        </View>

        {/* SECTION 5 — CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/archetype/samhain-threshold')}
          activeOpacity={0.7}
        >
          <Text style={styles.ctaText}>Explore the Archetype</Text>
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
  wheelPlaceholder: {
    alignSelf: 'center',
    marginVertical: 24,
    padding: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: S.accent,
  },
  wheelText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: S.text,
  },
  glowText: {
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  header: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: S.text,
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subheader: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: S.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  poetry: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    lineHeight: 26,
    textAlign: 'center',
    opacity: 0.9,
  },
  reflectionBox: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(155,89,182,0.06)',
  },
  reflectionHeader: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: S.text,
    marginBottom: 12,
  },
  reflectionText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
    color: S.text,
    opacity: 0.85,
    marginBottom: 4,
  },
  invitation: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
    opacity: 0.6,
    marginTop: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: S.text,
    marginBottom: 16,
  },
  wisdomCard: {
    borderWidth: 1,
    borderColor: S.accent,
    borderRadius: 4,
    padding: 24,
    backgroundColor: 'rgba(139,105,20,0.08)',
  },
  wisdomText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  portalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  portal: {
    flex: 1,
    borderWidth: 1,
    borderColor: S.accent,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(139,105,20,0.05)',
  },
  portalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  portalLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    color: S.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  portalStatus: {
    fontFamily: FONTS.body,
    fontSize: 10,
    color: S.text,
    opacity: 0.5,
  },
  lockedCard: {
    borderWidth: 1,
    borderColor: S.accent,
    borderRadius: 4,
    padding: 24,
    alignItems: 'center',
    opacity: 0.4,
  },
  lockedText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
  },
  ctaButton: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(155,89,182,0.1)',
    marginTop: 8,
  },
  ctaText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    color: S.text,
    letterSpacing: 2,
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
