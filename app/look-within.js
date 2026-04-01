// SCREEN 3B — LOOK WITHIN
// Spinning wheel + half-moon crescent + sacred cards
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { COLORS, FONTS, LOGO } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;
const ARC_WIDTH = SCREEN_W * 0.75;
const ARC_HEIGHT = 45;
const ORB_SIZE = 7;

function SacredCard({ symbol, title, subtitle, onPress, delay, glowColor }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.6, duration: 3000, delay: delay + 800, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(glowPulse, { toValue: 0.3, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ]),
    ).start();
  }, []);

  const borderColor = glowPulse.interpolate({
    inputRange: [0.3, 0.6],
    outputRange: ['rgba(200,169,96,0.25)', glowColor || 'rgba(200,169,96,0.5)'],
  });

  return (
    <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Animated.View style={[styles.card, { borderColor }]}>
          <View style={styles.ornamentLine} />
          <Text style={styles.cardSymbol}>{symbol}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
          <View style={[styles.ornamentLine, styles.ornamentBottom]} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function LookWithin() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const orbProgress = useRef(new Animated.Value(0)).current;
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

    Animated.loop(
      Animated.sequence([
        Animated.timing(orbProgress, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(orbProgress, { toValue: 0, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    Animated.timing(titleFade, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const orbX = orbProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-(ARC_WIDTH / 2), ARC_WIDTH / 2],
  });

  const orbY = orbProgress.interpolate({
    inputRange: [0, 0.15, 0.5, 0.85, 1],
    outputRange: [0, ARC_HEIGHT * 0.6, ARC_HEIGHT * 1.35, ARC_HEIGHT * 0.6, 0],
  });

  const orbOpacity = orbProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  return (
    <View style={styles.container}>
      {/* Spinning wheel */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={LOGO.wheelOnly}
          style={[styles.wheelImage, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Half-moon crescent */}
        <View style={styles.arcContainer}>
          <View style={styles.arcLine} />
          <Animated.View
            style={[
              styles.orb,
              {
                transform: [{ translateX: orbX }, { translateY: orbY }],
                opacity: orbOpacity,
              },
            ]}
          />
        </View>

        <Animated.Text style={[styles.title, { opacity: titleFade }]}>Look Within</Animated.Text>
        <Animated.Text style={[styles.subtitle, { opacity: titleFade }]}>Sacred Archetypal Journey</Animated.Text>

        <SacredCard
          symbol="⊛"
          title="Choose an Archetype"
          subtitle="Select directly from the Wheel"
          onPress={() => router.push('/archetype/choose')}
          delay={300}
          glowColor="rgba(155,89,182,0.5)"
        />

        <SacredCard
          symbol="◇"
          title="Take the Archetypal Attunement"
          subtitle="Discover which archetype is most present"
          onPress={() => router.push('/attunement/start')}
          delay={600}
          glowColor="rgba(200,169,96,0.5)"
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
    bottom: 80,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  arcContainer: {
    width: ARC_WIDTH,
    height: ARC_HEIGHT + ORB_SIZE + 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  arcLine: {
    position: 'absolute',
    top: 0,
    width: ARC_WIDTH,
    height: ARC_HEIGHT * 2,
    borderBottomLeftRadius: ARC_WIDTH / 2.5,
    borderBottomRightRadius: ARC_WIDTH / 2.5,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'rgba(200,169,96,0.18)',
    borderTopWidth: 0,
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: '#c8a960',
    shadowColor: '#c8a960',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  title: {
    fontFamily: FONTS.headingLight,
    fontSize: 24,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 3,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.general.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 14,
    backgroundColor: 'rgba(200,169,96,0.03)',
    width: SCREEN_W - 48,
  },
  ornamentLine: {
    height: 1,
    width: 40,
    alignSelf: 'center',
    borderRadius: 1,
    marginBottom: 14,
    backgroundColor: 'rgba(200,169,96,0.2)',
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
});
