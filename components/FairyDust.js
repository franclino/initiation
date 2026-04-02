// Fairy dust sparkles — little glints that pop up randomly across the screen
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef, useMemo } from 'react';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function Sparkle({ color }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const x = useMemo(() => Math.random() * SCREEN_W, []);
  const y = useMemo(() => Math.random() * SCREEN_H, []);
  const size = useMemo(() => 2 + Math.random() * 4, []);
  const delay = useMemo(() => Math.random() * 8000, []);
  const lifespan = useMemo(() => 1500 + Math.random() * 2000, []);

  useEffect(() => {
    const sparkle = () => {
      // Random new position each time
      opacity.setValue(0);
      scale.setValue(0);

      Animated.sequence([
        Animated.delay(delay + Math.random() * 6000),
        // Pop in
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 3, tension: 80, useNativeDriver: true }),
        ]),
        // Hold
        Animated.delay(lifespan * 0.3),
        // Twinkle
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.3, duration: 150, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.4, duration: 100, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]),
        // Fade out
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
      ]).start(() => sparkle()); // Loop forever
    };

    sparkle();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ scale }],
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: size * 2,
      }}
    />
  );
}

export default function FairyDust({ count = 12, color = '#c8a960' }) {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <Sparkle key={i} color={i % 3 === 0 ? '#ffffff' : color} />
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
