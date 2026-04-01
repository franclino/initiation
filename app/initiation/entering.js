// SCREEN 5 — YOU ARE ENTERING SAMHAIN
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import AtmosphericBackground from '../../components/AtmosphericBackground';

const S = COLORS.samhain;

export default function EnteringInitiation() {
  const router = useRouter();

  return (
    <AtmosphericBackground season="samhain">

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.poetry}>
          {`You have chosen to walk the INITIATION.

This path does not unfold all at once.
It moves in cycles.
Each cycle contains three movements:
Reflection.
Embodiment.
Action.

You will be given one task per day.
No more.
Wisdom is not gathered by speed.

Each completed task earns a token of wisdom.
When you complete an entire cycle,
an additional token is granted.
Not as reward —
but as recognition of coherence.

To complete this archetype,
a minimum number of wisdom tokens must be embodied.

The New Moon and the Full Moon portals
are not optional.
They are thresholds.
Without passing through them,
the deeper gates remain closed.

You may repeat cycles.
Not to accumulate —
but to deepen.

Repetition reveals layers
that first contact cannot reach.

This is not content.
It is initiation.

The Crone will show you what must end.
The Magician will show you how to walk through it.

Move slowly.
The dark is not empty.
It is listening.`}
        </Text>

        <TouchableOpacity
          style={styles.enterButton}
          onPress={() => router.push('/initiation/dashboard')}
          activeOpacity={0.7}
        >
          <Text style={styles.enterText}>
            Enter the Path of the Crone / the Magician
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AtmosphericBackground>
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
    paddingHorizontal: 28,
    paddingBottom: 60,
  },
  poetry: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    lineHeight: 28,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 40,
  },
  enterButton: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 22,
    alignItems: 'center',
    backgroundColor: 'rgba(155,89,182,0.1)',
  },
  enterText: {
    fontFamily: FONTS.heading,
    fontSize: 15,
    color: S.text,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
