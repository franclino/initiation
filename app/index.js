// SCREEN 1 — APP OPEN — The threshold
// Spinning wheel, half-moon arc with orbiting circle above INITIATION
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FONTS, LOGO } from '../constants/theme';
import { playBackgroundMusic, playIntroVoice } from '../components/AudioManager';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;

// Inverted crescent arc — pointy edges, long and thin
const ARC_WIDTH = SCREEN_W * 0.75;
const ARC_HEIGHT = 45;
const ORB_SIZE = 7;

export default function AppOpen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const orbProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start background music low + voice overlay
    playBackgroundMusic();
    playIntroVoice();

    // Spin to a huge number so it never loops back
    Animated.timing(rotation, {
      toValue: 100,
      duration: 38000 * 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Orb traces the half-moon arc: left → up → center → up → right, then back
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbProgress, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(orbProgress, {
          toValue: 0,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Orb X: left to right across the arc
  const orbX = orbProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-(ARC_WIDTH / 2), ARC_WIDTH / 2],
  });

  // Orb Y: dips down into the horn
  const orbY = orbProgress.interpolate({
    inputRange: [0, 0.15, 0.5, 0.85, 1],
    outputRange: [0, ARC_HEIGHT * 0.6, ARC_HEIGHT * 1.35, ARC_HEIGHT * 0.6, 0],
  });

  // Orb glow pulses as it moves
  const orbOpacity = orbProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  return (
    <View style={styles.container}>
      {/* Sacred geometry wheel — slow spin */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={LOGO.wheelOnly}
          style={[styles.wheelImage, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>

      {/* Moon phases along the arc + golden orb passing through */}
      <View style={styles.arcContainer}>
        {/* Moon phase symbols along the arc path */}
        {['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌑'].map((moon, i) => {
          const t = i / 7; // 0 to 1 across the arc
          const x = (t - 0.5) * ARC_WIDTH;
          const y = Math.sin(t * Math.PI) * ARC_HEIGHT * 1.35;
          return (
            <Animated.Text
              key={i}
              style={[
                styles.moonPhase,
                {
                  left: ARC_WIDTH / 2 + x - 8,
                  top: y - 2,
                  // Pulse: each moon glows when the orb is near it
                  opacity: orbProgress.interpolate({
                    inputRange: [
                      Math.max(0, t - 0.1),
                      t,
                      Math.min(1, t + 0.1),
                    ].sort((a, b) => a - b),
                    outputRange: [0.15, 0.7, 0.15],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            >
              {moon}
            </Animated.Text>
          );
        })}
        {/* The golden orb */}
        <Animated.View
          style={[
            styles.orb,
            {
              transform: [
                { translateX: orbX },
                { translateY: orbY },
              ],
              opacity: orbOpacity,
            },
          ]}
        />
      </View>

      {/* Text */}
      <Text style={styles.title}>INITIATION</Text>
      <Text style={styles.subtitle}>A Journey to Self-Discovery</Text>

      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => router.push('/home')}
        activeOpacity={0.7}
      >
        <Text style={styles.enterText}>ENTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingBottom: 140,
  },
  wheelWrap: {
    position: 'absolute',
    top: -(WHEEL_SIZE * 0.37),
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
  arcContainer: {
    width: ARC_WIDTH,
    height: ARC_HEIGHT * 1.5 + ORB_SIZE + 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 70,
    position: 'relative',
  },
  moonPhase: {
    position: 'absolute',
    fontSize: 16,
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
    fontSize: 32,
    color: '#f5f0e8',
    letterSpacing: 12,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: '#f5f0e8',
    opacity: 0.8,
    marginBottom: 60,
  },
  enterButton: {
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.3)',
    paddingVertical: 16,
    paddingHorizontal: 52,
    borderRadius: 2,
    backgroundColor: 'rgba(155,89,182,0.05)',
  },
  enterText: {
    fontFamily: FONTS.headingLight,
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: 8,
  },
});
