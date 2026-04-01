// ATTUNEMENT RESULT SCREEN
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS, FONTS, PRICING } from '../../constants/theme';

const ARCHETYPE_INFO = {
  samhain: {
    name: 'The Crone & The Magician',
    season: 'Samhain',
    colors: COLORS.samhain,
    description: `Samhain is the season of endings.\nBut within endings, power gathers.\n\nHere lives the Crone —\nthe one who has seen through illusion.\nThe keeper of cycles.\nThe voice that says:\n"Enough."\n\nShe is not bitter.\nShe is clear.\nShe knows what must die\nso truth can live.\n\nBeside her stands the Magician —\nmaster of thresholds.\nWalker between worlds.\nHe understands that transformation\nrequires conscious participation.\n\nThe Crone cuts away the false.\nThe Magician directs the energy released.\nTogether they govern Samhain.\n\nThis archetype appears when:\nSomething in you is complete.\nA version of yourself has reached its end.\nYou are being asked to shed skin\nrather than gather more.\n\nThis is not a season of growth.\nIt is a season of transformation,\nreclaimed through surrender.\n\nTo walk this archetype\nis to face your own shadow\nand discover the wisdom hidden within it.\n\nThe question is not\n"What do I want?"\nThe question is\n"What is ready to die?"`,
  },
  // Placeholder entries for other archetypes
  imbolc: { name: 'The Maiden & The Spark', season: 'Imbolc', colors: COLORS.imbolc, description: 'Coming soon...' },
  ostara: { name: 'The Green Man & The Seed', season: 'Ostara', colors: COLORS.ostara, description: 'Coming soon...' },
  beltane: { name: 'The Lover & The Flame', season: 'Beltane', colors: COLORS.beltane, description: 'Coming soon...' },
  litha: { name: 'The Sun King & The Wave', season: 'Litha', colors: COLORS.litha, description: 'Coming soon...' },
  lammas: { name: 'The Harvest Queen & The Guardian', season: 'Lammas', colors: COLORS.lammas, description: 'Coming soon...' },
  mabon: { name: 'The Sage & The Balance Keeper', season: 'Mabon', colors: COLORS.mabon, description: 'Coming soon...' },
  yule: { name: 'The Dreamer & The Still Point', season: 'Yule', colors: COLORS.yule, description: 'Coming soon...' },
};

export default function AttunementResult() {
  const router = useRouter();
  const { archetype } = useLocalSearchParams();
  const info = ARCHETYPE_INFO[archetype] || ARCHETYPE_INFO.samhain;
  const C = info.colors;

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={[styles.logoText, { color: C.accent }]}>✦</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.season, { color: C.text, textShadowColor: C.glow }]}>
          {info.season}
        </Text>
        <Text style={[styles.archeName, { color: C.text }]}>
          The Archetype of {info.name}
        </Text>

        <Text style={[styles.description, { color: C.text }]}>
          {info.description}
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.primaryButton, { borderColor: C.glow, backgroundColor: `${C.glow}18` }]}
            onPress={() => router.push('/initiation/entering')}
            activeOpacity={0.7}
          >
            <Text style={[styles.primaryText, { color: C.text }]}>
              Walk the Path of the {info.name}
            </Text>
            <Text style={[styles.priceText, { color: C.glow }]}>
              {PRICING.singleArchetype}{PRICING.currency}
            </Text>
            <Text style={[styles.priceDetail, { color: C.text }]}>
              Lifetime access to this archetypal initiation.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: C.accent }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryText, { color: C.text }]}>
              Walk the Full Wheel
            </Text>
            <Text style={[styles.priceText, { color: C.glow }]}>
              {PRICING.fullWheel}{PRICING.currency}
            </Text>
            <Text style={[styles.priceDetail, { color: C.text }]}>
              Lifetime access to all 8 archetypes and their deeper initiations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={() => router.push('/wheel/samhain')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tertiaryText, { color: C.text }]}>
              Return to the current season of the Living Wheel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    opacity: 0.8,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  season: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  archeName: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 17,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 32,
  },
  description: {
    fontFamily: FONTS.body,
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 40,
  },
  buttons: {
    gap: 16,
  },
  primaryButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 24,
  },
  primaryText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    marginBottom: 8,
  },
  priceText: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    marginBottom: 4,
  },
  priceDetail: {
    fontFamily: FONTS.body,
    fontSize: 13,
    opacity: 0.6,
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 24,
    backgroundColor: 'rgba(139,105,20,0.08)',
  },
  secondaryText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    marginBottom: 8,
  },
  tertiaryButton: {
    padding: 20,
    alignItems: 'center',
  },
  tertiaryText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    opacity: 0.5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
