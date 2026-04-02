// Atmospheric background — season-specific floating particles and ambient effects
// Uses built-in React Native Animated (no reanimated dependency)
import { View, StyleSheet, Dimensions, Animated, Easing, Image } from 'react-native';
import { useEffect, useRef, useMemo } from 'react';
import { COLORS, LOGO } from '../constants/theme';
import { useThemeMode } from '../constants/ThemeContext';

const STARFIELD = require('../assets/images/starfield.jpg');
const WHEEL_SIZE = SCREEN_W * 1.5;

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const SEASON_PARTICLES = {
  samhain: {
    count: 24,
    colors: ['rgba(155,89,182,0.5)', 'rgba(155,89,182,0.35)', 'rgba(220,220,220,0.2)'],
    sizeRange: [3, 12],
    speedRange: [15000, 35000],
    direction: 'down',
    drift: 25,
    glow: 'rgba(155,89,182,0.15)',
  },
  yule: {
    count: 20,
    colors: ['rgba(192,192,192,0.4)', 'rgba(255,255,255,0.3)', 'rgba(189,195,199,0.35)'],
    sizeRange: [2, 7],
    speedRange: [20000, 40000],
    direction: 'down',
    drift: 30,
    glow: 'rgba(192,192,192,0.12)',
  },
  imbolc: {
    count: 22,
    colors: ['rgba(247,220,111,0.5)', 'rgba(255,255,255,0.35)', 'rgba(245,230,163,0.3)'],
    sizeRange: [2, 6],
    speedRange: [12000, 25000],
    direction: 'up',
    drift: 18,
    glow: 'rgba(247,220,111,0.15)',
  },
  ostara: {
    count: 24,
    colors: ['rgba(245,176,65,0.4)', 'rgba(74,124,74,0.35)', 'rgba(249,231,159,0.3)'],
    sizeRange: [3, 8],
    speedRange: [10000, 22000],
    direction: 'up',
    drift: 35,
    glow: 'rgba(245,176,65,0.15)',
  },
  beltane: {
    count: 18,
    colors: ['rgba(250,219,216,0.5)', 'rgba(255,105,180,0.3)', 'rgba(255,255,255,0.2)'],
    sizeRange: [4, 14],
    speedRange: [18000, 35000],
    direction: 'down',
    drift: 40,
    glow: 'rgba(255,105,180,0.12)',
  },
  litha: {
    count: 20,
    colors: ['rgba(93,173,226,0.4)', 'rgba(64,224,208,0.3)', 'rgba(255,255,255,0.2)'],
    sizeRange: [3, 8],
    speedRange: [16000, 30000],
    direction: 'down',
    drift: 25,
    glow: 'rgba(93,173,226,0.15)',
  },
  lammas: {
    count: 22,
    colors: ['rgba(245,230,163,0.5)', 'rgba(200,169,96,0.35)', 'rgba(255,215,0,0.2)'],
    sizeRange: [2, 7],
    speedRange: [20000, 38000],
    direction: 'down',
    drift: 20,
    glow: 'rgba(200,169,96,0.15)',
  },
  mabon: {
    count: 16,
    colors: ['rgba(160,82,45,0.5)', 'rgba(211,84,0,0.35)', 'rgba(74,124,74,0.3)'],
    sizeRange: [5, 16],
    speedRange: [14000, 28000],
    direction: 'down',
    drift: 45,
    glow: 'rgba(160,82,45,0.15)',
  },
};

function Particle({ config }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const startX = useMemo(() => Math.random() * SCREEN_W, []);
  const startY = useMemo(() => (config.direction === 'up' ? SCREEN_H + 20 : -20), []);
  const endY = config.direction === 'up' ? -(SCREEN_H + 40) : SCREEN_H + 40;
  const size = useMemo(() => config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]), []);
  const color = useMemo(() => config.colors[Math.floor(Math.random() * config.colors.length)], []);
  const speed = useMemo(() => config.speedRange[0] + Math.random() * (config.speedRange[1] - config.speedRange[0]), []);
  const delay = useMemo(() => Math.random() * 8000, []);
  const driftAmount = useMemo(() => (Math.random() - 0.5) * 2 * config.drift, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Vertical fall/rise
      Animated.loop(
        Animated.timing(translateY, {
          toValue: endY,
          duration: speed,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Horizontal drift
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: driftAmount,
            duration: speed / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -driftAmount,
            duration: speed / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Fade in/out
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: speed * 0.15, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: speed * 0.6, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: speed * 0.25, useNativeDriver: true }),
        ]),
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        transform: [{ translateX }, { translateY }],
        opacity,
      }}
    />
  );
}

function AmbientGlow({ color }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.ambientGlow, { backgroundColor: color, opacity }]} />
  );
}

function SpinningWheel({ theme }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 90000,
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
    <Animated.Image
      source={theme?.wheelImage || LOGO.wheelOnly}
      style={[
        styles.spinningWheel,
        {
          width: WHEEL_SIZE,
          height: WHEEL_SIZE,
          transform: [{ rotate: spin }],
        },
      ]}
      resizeMode="contain"
    />
  );
}

export default function AtmosphericBackground({ season = 'samhain', children }) {
  const config = SEASON_PARTICLES[season] || SEASON_PARTICLES.samhain;
  const theme = useThemeMode();
  const bgColor = theme.isDark ? (COLORS[season]?.background || '#000000') : theme.bg;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Starfield everywhere */}
      <Image source={STARFIELD} style={[styles.starfield, { opacity: theme.starfieldOpacity }]} resizeMode="cover" />

      {/* Big spinning sacred geometry wheel in background */}
      <SpinningWheel theme={theme} />

      {/* Particles disabled for now — uncomment to re-enable
      <AmbientGlow color={config.glow} />
      {Array.from({ length: config.count }).map((_, i) => (
        <Particle key={i} config={config} />
      ))}
      */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  starfield: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.5,
  },
  spinningWheel: {
    position: 'absolute',
    top: (SCREEN_H - WHEEL_SIZE) / 2,
    left: (SCREEN_W - WHEEL_SIZE) / 2,
    opacity: 0.3,
  },
  ambientGlow: {
    position: 'absolute', bottom: -100, left: -50, right: -50,
    height: 300, borderRadius: 150,
  },
  content: { flex: 1, zIndex: 1 },
});
