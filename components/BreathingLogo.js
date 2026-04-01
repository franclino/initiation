// Sacred geometry logo with slow breathing/pulsing animation
// Uses built-in React Native Animated (no reanimated dependency)
import { TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { LOGO } from '../constants/theme';

export default function BreathingLogo({ size = 48, onPress, style }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Breathing pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.04, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.97, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Opacity pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 3500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.7, duration: 3500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Very slow rotation
    Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 120000, easing: Easing.linear, useNativeDriver: true }),
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePress = onPress || (() => router.push('/home'));

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]} activeOpacity={0.7}>
      <Animated.Image
        source={LOGO.dark}
        style={[
          { width: size, height: size },
          { transform: [{ scale }, { rotate: spin }], opacity },
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
});
