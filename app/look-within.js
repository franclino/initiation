// SCREEN 3B — LOOK WITHIN
// Spinning wheel upper portion, cards pinned to bottom
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { COLORS, FONTS, LOGO } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_W * 1.95;

export default function LookWithin() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 45000,
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
      {/* Spinning wheel upper portion */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={LOGO.wheelOnly}
          style={[styles.wheelImage, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>

      {/* Content pinned to bottom */}
      <View style={styles.content}>
        <Text style={styles.title}>Look Within</Text>
        <Text style={styles.subtitle}>Sacred Archetypal Journey</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/archetype/choose')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>Choose an Archetype</Text>
            <Text style={styles.cardSub}>
              Select directly from the Wheel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/attunement/start')}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>Take the Archetypal Attunement</Text>
            <Text style={styles.cardSub}>
              Discover which archetype is most present
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  wheelWrap: {
    position: 'absolute',
    top: -(WHEEL_SIZE * 0.45),
    left: (SCREEN_W - WHEEL_SIZE) / 2,
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
  content: {
    position: 'absolute',
    bottom: 80,
    left: 24,
    right: 24,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.general.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.general.text,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 32,
  },
  options: {
    gap: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.general.accent,
    borderRadius: 4,
    padding: 28,
    backgroundColor: 'rgba(200,169,96,0.05)',
  },
  cardTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: COLORS.general.text,
    marginBottom: 8,
  },
  cardSub: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.general.text,
    opacity: 0.85,
  },
});
