// Goddess background — full display mirrored + slightly blurred
// Shows the complete goddess image behind content, softened for readability
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { GODDESS_IMAGES, COLORS } from '../constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function PsychedelicBackground({ season = 'samhain', children }) {
  const image = GODDESS_IMAGES[season];
  const bgColor = COLORS[season]?.background || '#000000';
  const glowColor = COLORS[season]?.glow || '#9b59b6';

  // Subtle slow breathing on the background image
  const scale = useRef(new Animated.Value(1.02)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.02, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Full goddess image — slightly blurred, breathing */}
      <Animated.Image
        source={image}
        style={[styles.bgImage, { transform: [{ scale }] }]}
        resizeMode="cover"
        blurRadius={3}
      />

      {/* Mirrored copy flipped underneath, more transparent */}
      <Animated.Image
        source={image}
        style={[styles.bgImageMirror, { transform: [{ scale }, { scaleX: -1 }] }]}
        resizeMode="cover"
        blurRadius={5}
      />

      {/* Dark overlay for text readability */}
      <View style={[styles.overlay, { backgroundColor: bgColor }]} />

      {/* Subtle colored glow */}
      <View style={[styles.glowOverlay, { backgroundColor: glowColor }]} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    width: SCREEN_W,
    height: SCREEN_H,
    opacity: 0.5,
  },
  bgImageMirror: {
    position: 'absolute',
    width: SCREEN_W,
    height: SCREEN_H,
    opacity: 0.2,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.35,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.08,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});
