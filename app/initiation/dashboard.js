// SCREEN 6 — ARCHETYPE DASHBOARD (Level 1 Home)
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';
import AtmosphericBackground from '../../components/AtmosphericBackground';

const S = COLORS.samhain;

export default function Dashboard() {
  const router = useRouter();

  // Placeholder state — will be connected to persistent storage
  const [tokens, setTokens] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [day, setDay] = useState(1);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [newMoon, setNewMoon] = useState(false);
  const [fullMoon, setFullMoon] = useState(false);

  const dayLabels = ['Reflection', 'Embodiment', 'Mini-Quest'];
  const isIntegration = day === 4;
  const movementType = isIntegration ? 'Integration' : dayLabels[day - 1];

  const handleComplete = () => {
    setTokens(tokens + 1);
    setTodayCompleted(true);
    // Check for cycle bonus
    if (day === 3) {
      setTokens((t) => t + 1); // Cycle bonus
    }
  };

  return (
    <AtmosphericBackground season="samhain">

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crone / Magician — Samhain</Text>
        <Text style={styles.headerSub}>Initiatory Journey</Text>
      </View>

      {/* Tokens */}
      <View style={styles.tokenRow}>
        <Text style={styles.tokenLabel}>Wisdom Tokens:</Text>
        <Text style={styles.tokenCount}>{tokens}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* TODAY'S MOVEMENT */}
        <Text style={styles.sectionTitle}>TODAY'S MOVEMENT</Text>

        {isIntegration ? (
          <View style={styles.card}>
            <Text style={styles.cardType}>Integration</Text>
            <Text style={styles.cardBody}>
              No new movement today.{'\n'}Let the work settle.
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.card, !todayCompleted && styles.cardGlow]}
            activeOpacity={0.8}
            disabled={todayCompleted}
          >
            <Text style={styles.cardType}>{movementType}</Text>
            <Text style={styles.cardTitle}>
              {day === 1 && 'What is ready to end?'}
              {day === 2 && 'Body of Release'}
              {day === 3 && 'Threshold Crossing'}
            </Text>
            <Text style={styles.cardInvitation}>
              {day === 1 && 'Sit with what no longer serves. Write what arises.'}
              {day === 2 && 'Move the body. Let the release be physical.'}
              {day === 3 && 'One act of conscious letting go today.'}
            </Text>
            {!todayCompleted ? (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleComplete}
              >
                <Text style={styles.completeText}>Mark as Complete</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.completedText}>✓ Completed</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          {/* Cycle indicator */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomLabel}>
              Cycle {cycle} of 8
            </Text>
            <Text style={styles.bottomDetail}>
              {isIntegration ? 'Integration' : `Day ${day} of 3`}
            </Text>
          </View>

          {/* Moon Gates */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomLabel}>Moon Gates</Text>
            <Text style={styles.bottomDetail}>
              🌑 {newMoon ? '✓' : 'Pending'}
            </Text>
            <Text style={styles.bottomDetail}>
              🌕 {fullMoon ? '✓' : 'Pending'}
            </Text>
          </View>

          {/* Storytelling */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomLabel}>Stories</Text>
            <Text style={styles.bottomDetail}>▶ Story 1</Text>
            <Text style={styles.bottomDetail}>▶ Story 2</Text>
          </View>
        </View>

        {/* Threshold message */}
        {tokens >= 18 && newMoon && fullMoon && (
          <View style={styles.thresholdBox}>
            <Text style={styles.thresholdText}>
              The required wisdom has been embodied.{'\n'}The Chamber opens.
            </Text>
            <TouchableOpacity
              style={styles.thresholdButton}
              onPress={() => router.push('/initiation/chamber')}
            >
              <Text style={styles.thresholdButtonText}>Cross the Threshold</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </AtmosphericBackground>
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
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: S.text,
    textShadowColor: S.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  headerSub: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: S.text,
    opacity: 0.8,
    marginTop: 2,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  tokenLabel: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
    opacity: 0.85,
  },
  tokenCount: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: S.glow,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontFamily: FONTS.heading,
    fontSize: 13,
    color: S.text,
    opacity: 0.8,
    letterSpacing: 3,
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: S.accent,
    borderRadius: 4,
    padding: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(139,105,20,0.06)',
  },
  cardGlow: {
    borderColor: S.glow,
    backgroundColor: 'rgba(155,89,182,0.08)',
  },
  cardType: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    color: S.glow,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: S.text,
    marginBottom: 8,
  },
  cardInvitation: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: S.text,
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: 20,
  },
  cardBody: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    opacity: 0.85,
    lineHeight: 24,
    textAlign: 'center',
  },
  completeButton: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(155,89,182,0.1)',
  },
  completeText: {
    fontFamily: FONTS.headingLight,
    fontSize: 14,
    color: S.text,
    letterSpacing: 1,
  },
  completedText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
    color: S.glow,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  bottomSection: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(139,105,20,0.3)',
    borderRadius: 4,
    padding: 12,
  },
  bottomLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: S.text,
    opacity: 0.85,
    marginBottom: 6,
  },
  bottomDetail: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: S.text,
    opacity: 0.8,
    marginBottom: 2,
  },
  thresholdBox: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    padding: 24,
    backgroundColor: 'rgba(155,89,182,0.1)',
    alignItems: 'center',
  },
  thresholdText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: S.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  thresholdButton: {
    borderWidth: 1,
    borderColor: S.glow,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(155,89,182,0.15)',
  },
  thresholdButtonText: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    color: S.text,
    letterSpacing: 1,
  },
});
