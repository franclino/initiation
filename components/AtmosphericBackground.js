// Atmospheric background — season-specific floating particles and ambient effects
// Creates the dark, sacred, mystical atmosphere of the INITIATION board game
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';
import { COLORS } from '../constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Season-specific particle configs
const SEASON_PARTICLES = {
  samhain: {
    // Slow falling ash + purple mist wisps
    count: 18,
    colors: ['rgba(155,89,182,0.15)', 'rgba(155,89,182,0.08)', 'rgba(200,200,200,0.06)'],
    sizeRange: [2, 8],
    speedRange: [15000, 35000],
    direction: 'down', // ash falls
    drift: 20,
    glow: 'rgba(155,89,182,0.04)',
  },
  yule: {
    // Frost crystals drifting, silver shimmer
    count: 14,
    colors: ['rgba(192,192,192,0.12)', 'rgba(255,255,255,0.08)', 'rgba(189,195,199,0.1)'],
    sizeRange: [1, 5],
    speedRange: [20000, 40000],
    direction: 'down',
    drift: 30,
    glow: 'rgba(192,192,192,0.03)',
  },
  imbolc: {
    // Rising candlelight sparks, warm embers
    count: 16,
    colors: ['rgba(247,220,111,0.15)', 'rgba(255,255,255,0.1)', 'rgba(245,230,163,0.08)'],
    sizeRange: [1, 4],
    speedRange: [12000, 25000],
    direction: 'up', // sparks rise
    drift: 15,
    glow: 'rgba(247,220,111,0.04)',
  },
  ostara: {
    // Swirling fire energy, green-gold
    count: 20,
    colors: ['rgba(245,176,65,0.12)', 'rgba(74,124,74,0.1)', 'rgba(249,231,159,0.08)'],
    sizeRange: [2, 6],
    speedRange: [10000, 22000],
    direction: 'up',
    drift: 35,
    glow: 'rgba(245,176,65,0.04)',
  },
  beltane: {
    // Falling rose petals, warm glow
    count: 12,
    colors: ['rgba(250,219,216,0.15)', 'rgba(255,105,180,0.08)', 'rgba(255,255,255,0.06)'],
    sizeRange: [3, 10],
    speedRange: [18000, 35000],
    direction: 'down', // petals fall
    drift: 40,
    glow: 'rgba(255,105,180,0.03)',
  },
  litha: {
    // Floating water droplets, turquoise
    count: 15,
    colors: ['rgba(93,173,226,0.12)', 'rgba(64,224,208,0.08)', 'rgba(255,255,255,0.06)'],
    sizeRange: [2, 6],
    speedRange: [16000, 30000],
    direction: 'down',
    drift: 25,
    glow: 'rgba(93,173,226,0.04)',
  },
  lammas: {
    // Golden harvest dust
    count: 16,
    colors: ['rgba(245,230,163,0.15)', 'rgba(200,169,96,0.1)', 'rgba(255,215,0,0.06)'],
    sizeRange: [1, 5],
    speedRange: [20000, 38000],
    direction: 'down',
    drift: 20,
    glow: 'rgba(200,169,96,0.04)',
  },
  mabon: {
    // Falling leaves, earth tones
    count: 10,
    colors: ['rgba(160,82,45,0.15)', 'rgba(211,84,0,0.1)', 'rgba(74,124,74,0.08)'],
    sizeRange: [4, 12],
    speedRange: [14000, 28000],
    direction: 'down',
    drift: 45,
    glow: 'rgba(160,82,45,0.04)',
  },
};

function Particle({ config, index }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  const startX = useMemo(() => Math.random() * SCREEN_W, []);
  const startY = useMemo(
    () => (config.direction === 'up' ? SCREEN_H + 20 : -20),
    [config.direction],
  );
  const endY = config.direction === 'up' ? -40 : SCREEN_H + 40;
  const size = useMemo(
    () => config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
    [config.sizeRange],
  );
  const color = useMemo(
    () => config.colors[Math.floor(Math.random() * config.colors.length)],
    [config.colors],
  );
  const speed = useMemo(
    () => config.speedRange[0] + Math.random() * (config.speedRange[1] - config.speedRange[0]),
    [config.speedRange],
  );
  const delay = useMemo(() => Math.random() * 8000, []);
  const driftAmount = useMemo(
    () => (Math.random() - 0.5) * 2 * config.drift,
    [config.drift],
  );

  useEffect(() => {
    // Vertical movement
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(endY - startY, { duration: speed, easing: Easing.linear }),
        -1,
        false,
      ),
    );
    // Horizontal drift
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(driftAmount, { duration: speed / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(-driftAmount, { duration: speed / 2, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
    // Fade in/out
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: speed * 0.15 }),
          withTiming(1, { duration: speed * 0.6 }),
          withTiming(0, { duration: speed * 0.25 }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

function AmbientGlow({ color }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.3, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.ambientGlow,
        { backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
}

export default function AtmosphericBackground({ season = 'samhain', children }) {
  const config = SEASON_PARTICLES[season] || SEASON_PARTICLES.samhain;
  const bgColor = COLORS[season]?.background || '#000000';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Ambient glow at bottom */}
      <AmbientGlow color={config.glow} />

      {/* Floating particles */}
      {Array.from({ length: config.count }).map((_, i) => (
        <Particle key={i} config={config} index={i} />
      ))}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    bottom: -100,
    left: -50,
    right: -50,
    height: 300,
    borderRadius: 150,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
