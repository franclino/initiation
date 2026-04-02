// Goddess background — starfield base, goddess as subtle outline/hint
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { GODDESS_IMAGES, COLORS } from '../constants/theme';
import { useThemeMode } from '../constants/ThemeContext';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const STARFIELD = require('../assets/images/starfield.jpg');

export default function PsychedelicBackground({ season = 'samhain', children }) {
  const image = GODDESS_IMAGES[season];
  const bgColor = COLORS[season]?.background || '#000000';
  const glowColor = COLORS[season]?.glow || '#9b59b6';

  const scale = useRef(new Animated.Value(1.02)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.02, duration: 8000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const theme = useThemeMode();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Starfield base — always visible */}
      <Image source={STARFIELD} style={[styles.starfield, { opacity: theme.starfieldOpacity }]} resizeMode="cover" />

      {/* Goddess image — very subtle, just a hint/outline */}
      <Animated.Image
        source={image}
        style={[styles.goddessHint, { transform: [{ scale }] }]}
        resizeMode="cover"
        blurRadius={4}
      />

      {/* Mirrored goddess — even more subtle */}
      <Animated.Image
        source={image}
        style={[styles.goddessMirror, { transform: [{ scale }, { scaleX: -1 }] }]}
        resizeMode="cover"
        blurRadius={6}
      />

      {/* Heavy dark overlay — keeps it mostly black, goddess is just a trace */}
      <View style={styles.darkOverlay} />

      {/* Tiny colored glow from the season */}
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
  starfield: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.5,
  },
  goddessHint: {
    position: 'absolute',
    width: SCREEN_W,
    height: SCREEN_H,
    opacity: 0.12,
  },
  goddessMirror: {
    position: 'absolute',
    width: SCREEN_W,
    height: SCREEN_H,
    opacity: 0.06,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.05,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});
