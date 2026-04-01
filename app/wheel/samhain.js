// SCREEN 3 — SEASONAL WHEEL / SAMHAIN — with goddess image and board game visuals
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import AtmosphericBackground from '../../components/AtmosphericBackground';
import BreathingLogo from '../../components/BreathingLogo';
import GoddessCard from '../../components/GoddessCard';

const S = COLORS.samhain;

export default function SamhainScreen() {
  const router = useRouter();

  return (
    <AtmosphericBackground season="samhain">
      <BreathingLogo size={40} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Goddess image */}
        <GoddessCard
          season="samhain"
          title="The Crone / The Magician"
          subtitle="Samhain — NW — Earth, cold"
        />

        <Text style={styles.heading}>Samhain</Text>
        <Text style={styles.subheading}>Step Into the Unknown</Text>

        {/* Seasonal Introduction */}
        <View style={styles.section}>
          <Text style={styles.poetry}>
            Before the light returns there is the dark.{'\n'}
            Before rebirth there is dissolution.{'\n'}
            Samhain is the exhale of the year.{'\n\n'}
            The fields lie bare. The leaves fall. The ancestors draw near.{'\n'}
            The veil thins.{'\n\n'}
            You stand at the edge of the Unknown.{'\n'}
            Here, identity loosens. Certainty fades. Masks fall.{'\n\n'}
            Kali walks here — blade in hand.{'\n'}
            Hecate waits at the crossroads — torch raised.{'\n'}
            La Loba collects bones.{'\n'}
            Ceridwen stirs the cauldron of becoming.{'\n\n'}
            They do not take from you.{'\n'}
            They reveal what was never yours to keep.{'\n\n'}
            Samhain is not about comfort.{'\n'}
            It is about courage.{'\n\n'}
            To descend willingly. To release consciously.{'\n'}
            To trust the unseen womb of the dark.{'\n\n'}
            If you step through, you do not return unchanged.
          </Text>
        </View>

        {/* Reflection box */}
        <View style={styles.reflectionBox}>
          <Text style={styles.reflectionTitle}>Reflection for this season</Text>
          <Text style={styles.reflectionText}>
            What is ending?{'\n'}
            What no longer serves you?{'\n'}
            What asks to be released?
          </Text>
          <Text style={styles.reflectionInvite}>
            Walk this season consciously.{'\n'}Journal daily with this reflection in mind.
          </Text>
        </View>

        {/* Daily Wisdom */}
        <View style={styles.wisdomCard}>
          <Text style={styles.wisdomLabel}>DAILY WISDOM</Text>
          <Text style={styles.wisdomText}>
            "The wound is the place where the Light enters you."
          </Text>
        </View>

        {/* Ritual Portals */}
        <Text style={styles.sectionTitle}>RITUAL PORTALS</Text>
        <View style={styles.portalRow}>
          <View style={styles.portal}>
            <Text style={styles.portalIcon}>🌑</Text>
            <Text style={styles.portalName}>New Moon</Text>
            <Text style={styles.portalStatus}>Date-locked</Text>
          </View>
          <View style={styles.portal}>
            <Text style={styles.portalIcon}>🌕</Text>
            <Text style={styles.portalName}>Full Moon</Text>
            <Text style={styles.portalStatus}>Date-locked</Text>
          </View>
          <View style={styles.portal}>
            <Text style={styles.portalIcon}>⊛</Text>
            <Text style={styles.portalName}>Samhain</Text>
            <Text style={styles.portalStatus}>31.10</Text>
          </View>
        </View>

        {/* Storytelling */}
        <View style={styles.lockedSection}>
          <Text style={styles.lockedText}>Storytelling unlocks on the festival date</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/archetype/samhain-threshold')}
          activeOpacity={0.7}
        >
          <Text style={styles.ctaText}>Explore the Archetype</Text>
        </TouchableOpacity>
      </ScrollView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingBottom: 60 },
  heading: {
    fontFamily: FONTS.heading, fontSize: 26, color: S.text, textAlign: 'center',
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10,
  },
  subheading: {
    fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.8,
    textAlign: 'center', marginTop: 4, marginBottom: 28,
  },
  section: { marginBottom: 28 },
  poetry: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 1,
    lineHeight: 28, textAlign: 'center',
  },
  reflectionBox: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, padding: 22,
    backgroundColor: 'rgba(155,89,182,0.06)', marginBottom: 28,
  },
  reflectionTitle: {
    fontFamily: FONTS.heading, fontSize: 14, color: S.glow,
    marginBottom: 12, textAlign: 'center',
  },
  reflectionText: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.95,
    lineHeight: 26, textAlign: 'center', marginBottom: 12,
  },
  reflectionInvite: {
    fontFamily: FONTS.body, fontSize: 13, color: S.text, opacity: 0.5,
    lineHeight: 22, textAlign: 'center', fontStyle: 'italic',
  },
  wisdomCard: {
    borderWidth: 1, borderColor: S.accent, borderRadius: 4, padding: 22,
    backgroundColor: 'rgba(139,105,20,0.06)', marginBottom: 28, alignItems: 'center',
  },
  wisdomLabel: {
    fontFamily: FONTS.bodyMedium, fontSize: 10, color: S.accent,
    letterSpacing: 3, marginBottom: 10,
  },
  wisdomText: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.9,
    lineHeight: 24, textAlign: 'center', fontStyle: 'italic',
  },
  sectionTitle: {
    fontFamily: FONTS.heading, fontSize: 12, color: S.text, opacity: 0.4,
    letterSpacing: 3, marginBottom: 12,
  },
  portalRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  portal: {
    flex: 1, borderWidth: 1, borderColor: 'rgba(139,105,20,0.2)', borderRadius: 4,
    padding: 14, alignItems: 'center',
  },
  portalIcon: { fontSize: 22, marginBottom: 8 },
  portalName: { fontFamily: FONTS.bodyMedium, fontSize: 12, color: S.text, opacity: 0.7 },
  portalStatus: { fontFamily: FONTS.body, fontSize: 10, color: S.text, opacity: 0.3, marginTop: 4 },
  lockedSection: {
    borderWidth: 1, borderColor: 'rgba(139,105,20,0.15)', borderRadius: 4,
    padding: 20, alignItems: 'center', marginBottom: 28, opacity: 0.4,
  },
  lockedText: { fontFamily: FONTS.body, fontSize: 13, color: S.text },
  cta: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, paddingVertical: 18,
    alignItems: 'center', backgroundColor: 'rgba(155,89,182,0.1)',
  },
  ctaText: {
    fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1,
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6,
  },
});
