// REPRESENTATIVE CHAMBER — Unlocked after 18 tokens + both moon gates
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';
import AtmosphericBackground from '../../components/AtmosphericBackground';

const S = COLORS.samhain;

const REPRESENTATIVES = [
  {
    key: 'knife',
    name: 'The Knife',
    cost: 18,
    symbol: '🗡',
    description:
      'The blade that severs illusion. The Knife does not wound — it frees. It is the courage to cut away what no longer serves, to name what is true, to act without hesitation.',
  },
  {
    key: 'hecate',
    name: 'Hecate',
    cost: 25,
    symbol: '🔥',
    description:
      'Keeper of the crossroads. Hecate holds the torch at the threshold between worlds. She sees what others cannot — the paths that branch in the dark, the wisdom in choosing.',
  },
  {
    key: 'cauldron',
    name: 'The Cauldron',
    cost: 30,
    symbol: '⚱',
    description:
      'The vessel of transformation. Everything enters the Cauldron — grief, memory, identity. What emerges is not what went in. The Cauldron does not destroy. It transmutes.',
  },
  {
    key: 'kali',
    name: 'Kali',
    cost: 33,
    symbol: '🌑',
    description:
      'The Dark Mother. Kali is the force of dissolution itself. She dances on the ashes of the false self. To meet Kali is to meet the part of you that fears nothing — because nothing false remains.',
  },
];

export default function Chamber() {
  const router = useRouter();
  const [tokens, setTokens] = useState(20); // Placeholder — would come from state
  const [chosen, setChosen] = useState(null);

  const handleChoose = (rep) => {
    if (tokens < rep.cost) {
      Alert.alert(
        'Not enough tokens',
        `${rep.name} requires ${rep.cost} Wisdom Tokens. You have ${tokens}.`,
      );
      return;
    }
    setChosen(rep);
  };

  const handleExchange = () => {
    if (!chosen) return;
    setTokens(tokens - chosen.cost);
    router.push(`/initiation/level2?representative=${chosen.key}`);
  };

  return (
    <AtmosphericBackground season="samhain">

      <Text style={styles.heading}>The Chamber</Text>
      <Text style={styles.subheading}>
        Four archetypal allies await.{'\n'}Choose with resonance, not ambition.
      </Text>

      <View style={styles.tokenRow}>
        <Text style={styles.tokenLabel}>Wisdom Tokens:</Text>
        <Text style={styles.tokenCount}>{tokens}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {REPRESENTATIVES.map((rep) => {
          const affordable = tokens >= rep.cost;
          const isChosen = chosen?.key === rep.key;
          return (
            <TouchableOpacity
              key={rep.key}
              style={[
                styles.repCard,
                !affordable && styles.repLocked,
                isChosen && styles.repChosen,
              ]}
              onPress={() => handleChoose(rep)}
              activeOpacity={0.7}
              disabled={!affordable}
            >
              <View style={styles.repHeader}>
                <Text style={styles.repSymbol}>{rep.symbol}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.repName, !affordable && styles.lockedText]}>{rep.name}</Text>
                  <Text style={[styles.repCost, !affordable && styles.lockedText]}>
                    {rep.cost} Tokens
                  </Text>
                </View>
                {isChosen && <Text style={styles.chosenMark}>✦</Text>}
              </View>
              <Text style={[styles.repDesc, !affordable && styles.lockedText]}>
                {rep.description}
              </Text>
            </TouchableOpacity>
          );
        })}

        {chosen && (
          <View style={styles.exchangeBox}>
            <Text style={styles.exchangeText}>
              Exchange {chosen.cost} tokens to enter the path of {chosen.name}?
            </Text>
            <TouchableOpacity style={styles.exchangeButton} onPress={handleExchange}>
              <Text style={styles.exchangeButtonText}>Begin the Exchange</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: S.background },
  logo: { alignSelf: 'center', paddingTop: 60, paddingBottom: 4 },
  logoText: { fontSize: 24, color: S.accent, opacity: 0.8 },
  heading: {
    fontFamily: FONTS.heading, fontSize: 22, color: S.text, textAlign: 'center',
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8,
  },
  subheading: {
    fontFamily: FONTS.body, fontSize: 13, color: S.text, opacity: 0.8,
    textAlign: 'center', lineHeight: 20, marginTop: 8, marginBottom: 16,
  },
  tokenRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 24,
  },
  tokenLabel: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.85 },
  tokenCount: { fontFamily: FONTS.heading, fontSize: 22, color: S.glow },
  scroll: { paddingHorizontal: 24, paddingBottom: 60 },
  repCard: {
    borderWidth: 1, borderColor: S.accent, borderRadius: 4, padding: 20, marginBottom: 16,
    backgroundColor: 'rgba(139,105,20,0.06)',
  },
  repLocked: { borderColor: 'rgba(139,105,20,0.15)', opacity: 0.4 },
  repChosen: { borderColor: S.glow, backgroundColor: 'rgba(155,89,182,0.1)' },
  repHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  repSymbol: { fontSize: 28 },
  repName: { fontFamily: FONTS.heading, fontSize: 16, color: S.text },
  repCost: { fontFamily: FONTS.bodyMedium, fontSize: 12, color: S.glow, marginTop: 2 },
  lockedText: { opacity: 0.8 },
  chosenMark: { fontSize: 18, color: S.glow },
  repDesc: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.9, lineHeight: 22 },
  exchangeBox: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, padding: 24, marginTop: 8,
    backgroundColor: 'rgba(155,89,182,0.1)', alignItems: 'center',
  },
  exchangeText: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, textAlign: 'center',
    lineHeight: 24, marginBottom: 20,
  },
  exchangeButton: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4,
    paddingVertical: 14, paddingHorizontal: 28, backgroundColor: 'rgba(155,89,182,0.15)',
  },
  exchangeButtonText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1 },
});
