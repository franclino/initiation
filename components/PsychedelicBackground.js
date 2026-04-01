// Psychedelic mirrored goddess background
// The archetype image is layered, mirrored, and slowly breathing/drifting
// Creates a mushroom-trip kaleidoscopic feel behind content
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { GODDESS_IMAGES, COLORS } from '../constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function AnimatedLayer({ source, initialRotation, scaleRange, durationScale, durationDrift, opacity, flip }) {
  const scale = useRef(new Animated.Value(scaleRange[0])).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Breathing scale
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: scaleRange[1], duration: durationScale, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: scaleRange[0], duration: durationScale, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Slow drift rotation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotate, { toValue: 1, duration: durationDrift, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(rotate, { toValue: -1, duration: durationDrift, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Subtle X drift
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, { toValue: 15, duration: durationDrift * 0.8, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -15, duration: durationDrift * 0.8, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();

    // Subtle Y drift
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: 10, duration: durationDrift * 1.2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -10, duration: durationDrift * 1.2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: [`${initialRotation - 3}deg`, `${initialRotation + 3}deg`],
  });

  return (
    <Animated.Image
      source={source}
      style={{
        position: 'absolute',
        width: SCREEN_W * 1.6,
        height: SCREEN_H * 1.2,
        opacity,
        transform: [
          { translateX },
          { translateY },
          { scale },
          { rotate: spin },
          { scaleX: flip ? -1 : 1 },
        ],
      }}
      resizeMode="cover"
      blurRadius={2}
    />
  );
}

export default function PsychedelicBackground({ season = 'samhain', children }) {
  const image = GODDESS_IMAGES[season];
  const bgColor = COLORS[season]?.background || '#000000';
  const glowColor = COLORS[season]?.glow || '#9b59b6';

  // Pulsing color overlay
  const overlayOpacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(overlayOpacity, { toValue: 0.5, duration: 5000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(overlayOpacity, { toValue: 0.3, duration: 5000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Layer 1: base image, large, slow breathing */}
      <AnimatedLayer
        source={image}
        initialRotation={0}
        scaleRange={[1.1, 1.2]}
        durationScale={8000}
        durationDrift={12000}
        opacity={0.25}
        flip={false}
      />

      {/* Layer 2: mirrored, offset rotation, different breathing speed */}
      <AnimatedLayer
        source={image}
        initialRotation={180}
        scaleRange={[1.15, 1.25]}
        durationScale={10000}
        durationDrift={15000}
        opacity={0.15}
        flip={true}
      />

      {/* Layer 3: another mirror, subtle, slower */}
      <AnimatedLayer
        source={image}
        initialRotation={90}
        scaleRange={[1.05, 1.18]}
        durationScale={12000}
        durationDrift={18000}
        opacity={0.1}
        flip={false}
      />

      {/* Dark overlay for readability */}
      <View style={[styles.darkOverlay, { backgroundColor: bgColor }]} />

      {/* Colored glow overlay that pulses */}
      <Animated.View style={[styles.glowOverlay, { backgroundColor: glowColor, opacity: overlayOpacity }]} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.45,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  content: {
    flex: 1,
    zIndex: 2,
    width: '100%',
  },
});
