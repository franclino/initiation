// LEVEL 2 — REPRESENTATIVE INITIATION + DEEPENING THRESHOLD
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { COLORS, FONTS, PRICING } from '../../constants/theme';

const S = COLORS.samhain;

const REP_DATA = {
  knife: {
    name: 'The Knife',
    symbol: '🗡',
    intro:
      'The Knife does not ask permission.\nIt severs. It clarifies. It liberates.\n\nYou have chosen the path of precision.\nTo wield the Knife is to name what is true\nand act without flinching.\n\nThe false falls away.\nWhat remains is yours.',
    ritual:
      'Sit in silence. Bring to mind one thing you have been avoiding — a truth, a conversation, a decision.\n\nName it aloud.\n\nFeel the weight of it. Then say:\n"I choose clarity over comfort."\n\nWrite down the single most honest sentence you can about your current life.\n\nThis is your first cut.',
  },
  hecate: {
    name: 'Hecate',
    symbol: '🔥',
    intro:
      'Hecate stands at the crossroads.\nThree paths. Three faces. One choice.\n\nShe does not tell you which way to go.\nShe illuminates what each path costs.\n\nTo walk with Hecate is to trust\nthat darkness has its own intelligence.',
    ritual:
      'At twilight, or in a dimly lit room, light a single candle.\n\nClose your eyes. Imagine yourself at a crossroads — three paths before you.\n\nDo not choose yet. Simply look down each one.\n\nWhat do you see? What do you feel?\n\nWrite what each path whispers to you.\n\nThe crossroads do not rush.',
  },
  cauldron: {
    name: 'The Cauldron',
    symbol: '⚱',
    intro:
      'Everything enters the Cauldron.\nGrief. Memory. Identity.\n\nWhat emerges is not what went in.\n\nThe Cauldron does not destroy.\nIt transmutes.\n\nTo enter here is to surrender the old form\nand trust the alchemy of becoming.',
    ritual:
      'Fill a bowl with water. Place it before you.\n\nOne by one, name the things you are ready to release — old stories, worn-out identities, stale beliefs.\n\nWith each naming, dip your fingers into the water.\n\nWhen you are done, pour the water onto the earth.\n\nYou are not the same as when you began.',
  },
  kali: {
    name: 'Kali',
    symbol: '🌑',
    intro:
      'Kali dances on the ashes of the false self.\nShe wears a garland of severed illusions.\n\nShe is not cruel.\nShe is complete.\n\nTo meet Kali is to meet the part of you\nthat fears nothing —\nbecause nothing false remains.',
    ritual:
      'Stand barefoot. Close your eyes.\n\nBring to mind the version of yourself\nthat you have been performing for others.\n\nSee it clearly. Thank it.\n\nThen let it dissolve.\n\nFeel the ground beneath you.\nYou are still here.\n\nYou were always here.\n\nWrite: "What remains when I stop performing?"',
  },
};

export default function Level2() {
  const router = useRouter();
  const { representative = 'knife' } = useLocalSearchParams();
  const rep = REP_DATA[representative] || REP_DATA.knife;

  const [phase, setPhase] = useState('intro'); // intro → ritual → complete → deepening

  if (phase === 'intro') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.logo}>
          <Text style={styles.logoText}>✦</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.repSymbol}>{rep.symbol}</Text>
          <Text style={styles.repName}>{rep.name}</Text>
          <Text style={styles.poetry}>{rep.intro}</Text>
          <TouchableOpacity style={styles.cta} onPress={() => setPhase('ritual')}>
            <Text style={styles.ctaText}>Begin the Ritual</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (phase === 'ritual') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.logo}>
          <Text style={styles.logoText}>✦</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.ritualLabel}>CORE RITUAL</Text>
          <Text style={styles.repName}>{rep.name}</Text>
          <Text style={styles.ritualText}>{rep.ritual}</Text>
          <TouchableOpacity style={styles.cta} onPress={() => setPhase('complete')}>
            <Text style={styles.ctaText}>Mark as Complete</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (phase === 'complete') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.logo}>
          <Text style={styles.logoText}>✦</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.repSymbol}>{rep.symbol}</Text>
          <Text style={styles.completionText}>
            The ritual is complete.{'\n\n'}
            {rep.name} has been met.{'\n'}
            This encounter is now woven into your path.
          </Text>
          <TouchableOpacity style={styles.cta} onPress={() => setPhase('deepening')}>
            <Text style={styles.ctaText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Deepening threshold
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Deepen the Path of {rep.name}</Text>
        <Text style={styles.subheading}>
          Deepen the ritual path for all Samhain Representatives.
        </Text>

        <TouchableOpacity style={[styles.priceButton, styles.priceHighlight]} activeOpacity={0.7}>
          <Text style={styles.priceTitle}>Deepen the Ritual Path</Text>
          <Text style={styles.priceAmount}>{PRICING.deepening}{PRICING.currency}</Text>
          <Text style={styles.priceDetail}>
            3 additional rituals per representative{'\n'}
            Representative oracle{'\n'}
            Shared practice space{'\n'}
            Ritual partner matching
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.priceButton} activeOpacity={0.7}>
          <Text style={styles.priceTitle}>Walk the Full Wheel</Text>
          <Text style={styles.priceAmount}>{PRICING.fullWheel}{PRICING.currency}</Text>
          <Text style={styles.priceDetail}>
            Lifetime access to all 8 archetypes and their deeper initiations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.push('/(tabs)/archetype')}
          activeOpacity={0.7}
        >
          <Text style={styles.returnText}>Return to the Path of the Crone / the Magician</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.push('/(tabs)/wheel')}
          activeOpacity={0.7}
        >
          <Text style={styles.returnText}>Return to the Living Wheel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: S.background },
  logo: { alignSelf: 'center', paddingTop: 60, paddingBottom: 4 },
  logoText: { fontSize: 24, color: S.accent, opacity: 0.8 },
  scroll: { paddingHorizontal: 28, paddingBottom: 60, alignItems: 'center' },
  repSymbol: { fontSize: 48, textAlign: 'center', marginBottom: 16, marginTop: 20 },
  repName: {
    fontFamily: FONTS.heading, fontSize: 22, color: S.text, textAlign: 'center',
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8,
    marginBottom: 24,
  },
  poetry: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.9,
    lineHeight: 28, textAlign: 'center', marginBottom: 40,
  },
  ritualLabel: {
    fontFamily: FONTS.bodyMedium, fontSize: 12, color: S.glow,
    letterSpacing: 3, textAlign: 'center', marginBottom: 8, marginTop: 20,
  },
  ritualText: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.85,
    lineHeight: 28, textAlign: 'center', marginBottom: 40,
  },
  completionText: {
    fontFamily: FONTS.body, fontSize: 16, color: S.text, opacity: 0.9,
    lineHeight: 28, textAlign: 'center', marginBottom: 40,
  },
  cta: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, paddingVertical: 16,
    paddingHorizontal: 32, backgroundColor: 'rgba(155,89,182,0.1)', alignSelf: 'center',
  },
  ctaText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1 },
  heading: {
    fontFamily: FONTS.heading, fontSize: 20, color: S.text, textAlign: 'center',
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6,
    marginTop: 20, marginBottom: 8,
  },
  subheading: {
    fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.5,
    textAlign: 'center', marginBottom: 32,
  },
  priceButton: {
    borderWidth: 1, borderColor: S.accent, borderRadius: 4, padding: 22, width: '100%',
    marginBottom: 16, backgroundColor: 'rgba(139,105,20,0.06)',
  },
  priceHighlight: { borderColor: S.glow, backgroundColor: 'rgba(155,89,182,0.08)' },
  priceTitle: { fontFamily: FONTS.heading, fontSize: 16, color: S.text, marginBottom: 4 },
  priceAmount: { fontFamily: FONTS.heading, fontSize: 20, color: S.glow, marginBottom: 10 },
  priceDetail: { fontFamily: FONTS.body, fontSize: 13, color: S.text, opacity: 0.6, lineHeight: 20 },
  returnButton: {
    borderWidth: 1, borderColor: 'rgba(139,105,20,0.3)', borderRadius: 4,
    padding: 16, width: '100%', alignItems: 'center', marginBottom: 12,
  },
  returnText: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.5, textAlign: 'center' },
});
