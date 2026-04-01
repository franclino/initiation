// SCREEN 2 — HOME SCREEN
// Spinning wheel stays from intro, cards sit in lower portion
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { COLORS, FONTS, LOGO } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;

export default function HomeScreen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 45000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Spinning wheel in upper portion */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={LOGO.wheelOnly}
          style={[styles.wheelImage, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>

      {/* Content in lower portion */}
      <View style={styles.content}>
        <Text style={styles.title}>Where would you like to begin?</Text>

        <ScrollView
          contentContainerStyle={styles.cards}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/(tabs)/wheel')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>Walk the Living Wheel</Text>
            <Text style={styles.cardSub}>
              Enter the current season and its mysteries
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/look-within')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>Look Within</Text>
            <Text style={styles.cardSub}>Sacred Archetypal Journey</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardMuted]}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <Text style={[styles.cardTitle, styles.mutedText]}>
              Re-Enter your INITIATION Path
            </Text>
            <Text style={[styles.cardSub, styles.mutedText]}>
              Log in to your personal profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  wheelWrap: {
    position: 'absolute',
    top: -(WHEEL_SIZE * 0.35),
    left: (SCREEN_W - WHEEL_SIZE) / 2,
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelImage: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  cards: {
    gap: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.general.accent,
    borderRadius: 4,
    padding: 28,
    backgroundColor: 'rgba(200,169,96,0.05)',
  },
  cardTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: COLORS.general.text,
    marginBottom: 8,
  },
  cardSub: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.general.text,
    opacity: 0.85,
  },
  cardMuted: {
    borderColor: 'rgba(200,169,96,0.3)',
    backgroundColor: 'transparent',
  },
  mutedText: {
    opacity: 0.5,
  },
});
