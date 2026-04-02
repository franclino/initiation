// Egyptian star sparkles — like the stars painted in pyramid ceilings
// Five-pointed with slightly rounded, offset strokes
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef, useMemo, useState } from 'react';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Egyptian star — 3 ends only, like a Y radiating from center
function StarShape({ size, color }) {
  const rayWidth = size * 0.14;
  const rayLength = size * 0.5;
  const tilt = useMemo(() => Math.random() * 30 - 15, []);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={{ width: size, height: size, transform: [{ rotate: `${tilt}deg` }] }}>
      {/* Ray 1 — straight up */}
      <View style={{
        position: 'absolute',
        left: cx - rayWidth / 2,
        top: cy - rayLength,
        width: rayWidth,
        height: rayLength,
        borderRadius: rayWidth,
        backgroundColor: color,
      }} />
      {/* Ray 2 — down-left (120°) */}
      <View style={{
        position: 'absolute',
        left: cx - rayWidth / 2,
        top: cy,
        width: rayWidth,
        height: rayLength,
        borderRadius: rayWidth,
        backgroundColor: color,
        transformOrigin: 'top center',
        transform: [{ rotate: '120deg' }],
      }} />
      {/* Ray 3 — down-right (240°) */}
      <View style={{
        position: 'absolute',
        left: cx - rayWidth / 2,
        top: cy,
        width: rayWidth,
        height: rayLength,
        borderRadius: rayWidth,
        backgroundColor: color,
        transformOrigin: 'top center',
        transform: [{ rotate: '240deg' }],
      }} />
    </View>
  );
}

function Sparkle({ color }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const [pos, setPos] = useState({
    x: Math.random() * SCREEN_W,
    y: Math.random() * SCREEN_H,
  });

  const size = useMemo(() => 4 + Math.random() * 8, []);
  const delay = useMemo(() => Math.random() * 8000, []);

  useEffect(() => {
    const sparkle = () => {
      opacity.setValue(0);
      scale.setValue(0);
      // New random position each cycle
      setPos({ x: Math.random() * SCREEN_W, y: Math.random() * SCREEN_H });

      Animated.sequence([
        Animated.delay(delay + Math.random() * 6000),
        // Fade in slowly
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.9, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        ]),
        // Hold and twinkle
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.9, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.2, duration: 250, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.7, duration: 250, useNativeDriver: true }),
        ]),
        // Long slow fade out
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 2000, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.2, duration: 2000, useNativeDriver: true }),
        ]),
      ]).start(() => sparkle());
    };

    sparkle();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        opacity,
        transform: [{ scale }],
      }}
    >
      <StarShape size={size} color={color} />
    </Animated.View>
  );
}

export default function FairyDust({ count = 14, color = '#c8a960' }) {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <Sparkle key={i} color={i % 4 === 0 ? '#ffffff' : color} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});
