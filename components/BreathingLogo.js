// Sacred geometry logo with slow breathing/pulsing animation
// Represents the interconnected living energy of the wheel
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LOGO } from '../constants/theme';

export default function BreathingLogo({ size = 48, glowColor = 'rgba(200,169,96,0.3)', onPress, style }) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Subtle breathing pulse
    scale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.97, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );

    // Gentle opacity pulse
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.7, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );

    // Very slow rotation — the wheel turns
    rotation.value = withRepeat(
      withTiming(360, { duration: 120000, easing: Easing.linear }), // 2 min full rotation
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const handlePress = onPress || (() => router.push('/home'));

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]} activeOpacity={0.7}>
      <Animated.Image
        source={LOGO.dark}
        style={[
          { width: size, height: size },
          animatedStyle,
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
