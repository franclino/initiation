// SCREEN 1 — APP OPEN — The threshold
// Big sacred geometry wheel slowly spinning. Text floats over it.
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FONTS, LOGO } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 0.75;

export default function AppOpen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 60000,
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
    <View style={styles.container}>
      {/* Sacred geometry wheel — steady, centered above text */}
      <Animated.Image
        source={LOGO.wheelOnly}
        style={styles.wheel}
        resizeMode="contain"
      />

      {/* Text on top */}
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
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    opacity: 0.4,
    marginBottom: 40,
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
