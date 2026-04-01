// SCREEN 1 — APP OPEN — The threshold
// Spinning wheel, half-moon arc with orbiting circle above INITIATION
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FONTS, LOGO } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;

// Inverted crescent arc — pointy edges, long and thin
const ARC_WIDTH = SCREEN_W * 0.75;
const ARC_HEIGHT = 20;
const ORB_SIZE = 7;

export default function AppOpen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const orbProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Wheel spin
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 45000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

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

  // Orb Y: inverted arc — dips DOWN at center, pointy at edges
  const orbY = orbProgress.interpolate({
    inputRange: [0, 0.15, 0.5, 0.85, 1],
    outputRange: [0, ARC_HEIGHT * 0.4, ARC_HEIGHT, ARC_HEIGHT * 0.4, 0],
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

      {/* Half-moon arc + orb above INITIATION */}
      <View style={styles.arcContainer}>
        {/* The thin arc line */}
        <View style={styles.arcLine} />
        {/* The orbiting circle */}
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
    top: -(WHEEL_SIZE * 0.35),
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
    height: ARC_HEIGHT + ORB_SIZE + 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  arcLine: {
    position: 'absolute',
    top: 0,
    width: ARC_WIDTH,
    height: ARC_HEIGHT * 2.5,
    borderBottomLeftRadius: ARC_WIDTH / 1.6,
    borderBottomRightRadius: ARC_WIDTH / 1.6,
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
