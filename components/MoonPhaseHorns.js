// Moon phase bull horns — 🌑🌒🌓🌔🌕🌔🌓🌒🌑
// Reusable component with golden orb tracing through
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

const { width: SCREEN_W } = Dimensions.get('window');

export default function MoonPhaseHorns({ width = SCREEN_W * 0.75, height = 60 }) {
  const orbProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbProgress, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(orbProgress, { toValue: 0, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const orbX = orbProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-(width / 2), width / 2],
  });

  const orbY = orbProgress.interpolate({
    inputRange: [0, 0.15, 0.5, 0.85, 1],
    outputRange: [0, height * 0.6, height * 1.35, height * 0.6, 0],
  });

  const orbOpacity = orbProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  const moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌔', '🌓', '🌒', '🌑'];

  return (
    <View style={[styles.container, { width, height: height * 1.5 + 20 }]}>
      {moons.map((moon, i) => {
        const t = i / (moons.length - 1);
        const x = (t - 0.5) * width;
        const y = Math.sin(t * Math.PI) * height * 1.35;
        return (
          <Animated.Text
            key={i}
            style={[
              styles.moon,
              {
                left: width / 2 + x - 8,
                top: y - 2,
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  moon: {
    position: 'absolute',
    fontSize: 16,
  },
  orb: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#c8a960',
    shadowColor: '#c8a960',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
