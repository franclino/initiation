// SCREEN 2 — HOME SCREEN
// Spinning wheel stays, sacred cards with symbols stagger in
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { COLORS, FONTS, LOGO } from '../constants/theme';
import { useThemeMode } from '../constants/ThemeContext';

const STARFIELD = require('../assets/images/starfield.jpg');

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;

function SacredCard({ symbol, title, subtitle, onPress, delay, glowColor, muted }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Subtle border glow pulse
    if (!muted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowPulse, { toValue: 0.6, duration: 3000, delay: delay + 800, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
          Animated.timing(glowPulse, { toValue: 0.3, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        ]),
      ).start();
    }
  }, []);

  const borderColor = muted
    ? 'rgba(200,169,96,0.15)'
    : glowPulse.interpolate({
        inputRange: [0.3, 0.6],
        outputRange: [`rgba(200,169,96,0.25)`, glowColor || 'rgba(200,169,96,0.5)'],
      });

  return (
    <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Animated.View style={[styles.card, muted && styles.cardMuted, { borderColor }]}>
          {/* Ornamental top line */}
          <View style={[styles.ornamentLine, { backgroundColor: muted ? 'rgba(200,169,96,0.1)' : 'rgba(200,169,96,0.2)' }]} />

          {/* Symbol */}
          <Text style={[styles.cardSymbol, muted && { opacity: 0.3 }]}>{symbol}</Text>

          {/* Text */}
          <Text style={[styles.cardTitle, muted && styles.mutedText]}>{title}</Text>
          <Text style={[styles.cardSub, muted && styles.mutedText]}>{subtitle}</Text>

          {/* Ornamental bottom line */}
          <View style={[styles.ornamentLine, styles.ornamentBottom, { backgroundColor: muted ? 'rgba(200,169,96,0.1)' : 'rgba(200,169,96,0.2)' }]} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const theme = useThemeMode();
  const rotation = useRef(new Animated.Value(0)).current;
  const titleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 38000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Title fades in
    Animated.timing(titleFade, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Starfield */}
      <Animated.Image source={STARFIELD} style={[styles.starfield, { opacity: theme.starfieldOpacity }]} resizeMode="cover" />

      {/* Spinning wheel */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={theme.wheelImage}
          style={[styles.wheelImage, { transform: [{ rotate: spin }], opacity: theme.wheelOpacity }]}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.Text style={[styles.title, { opacity: titleFade, color: theme.text }]}>
          Where would you like to begin?
        </Animated.Text>

        <SacredCard
          symbol="⊛"
          title="Walk the Living Wheel"
          subtitle="Enter the current season and its mysteries"
          onPress={() => router.push('/(tabs)/wheel')}
          delay={300}
          glowColor="rgba(155,89,182,0.5)"
        />

        <SacredCard
          symbol="◇"
          title="Look Within"
          subtitle="Sacred Archetypal Journey"
          onPress={() => router.push('/look-within')}
          delay={600}
          glowColor="rgba(200,169,96,0.5)"
        />

        <SacredCard
          symbol="☽"
          title="Re-Enter your INITIATION Path"
          subtitle="Log in to your personal profile"
          onPress={() => router.push('/(tabs)/profile')}
          delay={900}
          muted
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  starfield: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.5,
  },
  wheelWrap: {
    position: 'absolute',
    top: -(WHEEL_SIZE * 0.45),
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
    position: 'absolute',
    bottom: 50,
    left: 24,
    right: 24,
  },
  title: {
    fontFamily: FONTS.headingLight,
    fontSize: 20,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 2,
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 14,
    backgroundColor: 'rgba(200,169,96,0.03)',
  },
  cardMuted: {
    backgroundColor: 'transparent',
  },
  ornamentLine: {
    height: 1,
    width: 40,
    alignSelf: 'center',
    borderRadius: 1,
    marginBottom: 14,
  },
  ornamentBottom: {
    marginBottom: 0,
    marginTop: 14,
  },
  cardSymbol: {
    fontFamily: FONTS.body,
    fontSize: 20,
    color: '#c8a960',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.6,
  },
  cardTitle: {
    fontFamily: FONTS.heading,
    fontSize: 17,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSub: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.general.text,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  mutedText: {
    opacity: 0.4,
  },
});
