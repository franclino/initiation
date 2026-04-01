// SCREEN 4A — Choose an Archetype — Spinning Wheel of Fortune
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, WHEEL, GODDESS_IMAGES, ARCHETYPES } from '../../constants/theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const WHEEL_RADIUS = SCREEN_W * 0.36;
const CENTER_X = SCREEN_W / 2;
const CENTER_Y = SCREEN_H * 0.38;

export default function ChooseArchetype() {
  const router = useRouter();
  const rotationValue = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const velocity = useRef(0);
  const lastAngle = useRef(0);
  const lastTickIndex = useRef(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Calculate which season is at top based on rotation
  const getTopSeasonIndex = useCallback((rot) => {
    const normalized = ((rot % 360) + 360) % 360;
    const index = Math.round(normalized / 45) % 8;
    return index;
  }, []);

  // Haptic tick when passing a season
  const checkTick = useCallback((rot) => {
    const idx = getTopSeasonIndex(rot);
    if (idx !== lastTickIndex.current) {
      lastTickIndex.current = idx;
      setSelectedIndex(idx);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  // Snap to nearest season
  const snapToNearest = useCallback((currentRot) => {
    const nearest = Math.round(currentRot / 45) * 45;
    rotationValue.current = nearest;
    Animated.spring(rotation, {
      toValue: nearest,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      const idx = getTopSeasonIndex(nearest);
      setSelectedIndex(idx);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    });
  }, []);

  // Deceleration after release
  const decelerate = useCallback((vel) => {
    const target = rotationValue.current + vel * 800;
    const snappedTarget = Math.round(target / 45) * 45;
    rotationValue.current = snappedTarget;

    Animated.timing(rotation, {
      toValue: snappedTarget,
      duration: Math.min(Math.abs(vel) * 1500, 3000),
      useNativeDriver: true,
    }).start(() => {
      const idx = getTopSeasonIndex(snappedTarget);
      setSelectedIndex(idx);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gesture) => {
        rotation.stopAnimation((val) => {
          rotationValue.current = val;
          rotation.setValue(val);
        });
        lastAngle.current = Math.atan2(
          gesture.y0 - CENTER_Y,
          gesture.x0 - CENTER_X,
        );
      },
      onPanResponderMove: (_, gesture) => {
        const currentAngle = Math.atan2(
          gesture.moveY - CENTER_Y,
          gesture.moveX - CENTER_X,
        );
        const delta = (currentAngle - lastAngle.current) * (180 / Math.PI);
        lastAngle.current = currentAngle;
        rotationValue.current += delta;
        rotation.setValue(rotationValue.current);
        velocity.current = delta;
        checkTick(rotationValue.current);
      },
      onPanResponderRelease: () => {
        if (Math.abs(velocity.current) > 0.5) {
          decelerate(velocity.current);
        } else {
          snapToNearest(rotationValue.current);
        }
      },
    }),
  ).current;

  // Listen to rotation for tick sounds during deceleration
  rotation.addListener(({ value }) => {
    checkTick(value);
  });

  const spin = rotation.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  const selected = WHEEL.seasons[selectedIndex];
  const selectedColor = COLORS[selected.key] || COLORS.samhain;
  const selectedArchetype = ARCHETYPES[selected.key];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Archetype</Text>
      <Text style={styles.subtitle}>Spin the Wheel</Text>

      {/* The spinning wheel */}
      <View style={styles.wheelArea} {...panResponder.panHandlers}>
        <Animated.View style={[styles.wheelContainer, { transform: [{ rotate: spin }] }]}>
          {WHEEL.seasons.map((season, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * WHEEL_RADIUS;
            const y = Math.sin(angle) * WHEEL_RADIUS;
            const seasonColor = COLORS[season.key] || COLORS.samhain;
            const image = GODDESS_IMAGES[season.key];

            return (
              <View
                key={season.key}
                style={[
                  styles.seasonNode,
                  {
                    transform: [
                      { translateX: x },
                      { translateY: y },
                    ],
                  },
                ]}
              >
                <View style={[styles.seasonCircle, { borderColor: seasonColor.glow }]}>
                  <Image source={image} style={styles.seasonImage} resizeMode="cover" />
                </View>
                <Text style={[styles.seasonName, { color: seasonColor.text }]}>
                  {season.name}
                </Text>
              </View>
            );
          })}

          {/* Center */}
          <View style={styles.centerDot}>
            <Text style={styles.centerSymbol}>⊛</Text>
          </View>
        </Animated.View>

        {/* Selection indicator at top */}
        <View style={styles.indicator}>
          <Text style={styles.indicatorArrow}>▼</Text>
        </View>
      </View>

      {/* Selected archetype info */}
      <View style={styles.selectedInfo}>
        <Text style={[styles.selectedName, { color: selectedColor.glow }]}>
          {selected.name}
        </Text>
        <Text style={styles.selectedArchetype}>
          {selectedArchetype?.name}
        </Text>

        <TouchableOpacity
          style={[styles.enterButton, { borderColor: selectedColor.glow }]}
          onPress={() => router.push(`/attunement/result?archetype=${selected.key}`)}
          activeOpacity={0.7}
        >
          <Text style={[styles.enterText, { color: selectedColor.text }]}>
            Enter {selected.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    color: '#f5f0e8',
    textAlign: 'center',
    marginTop: 70,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: '#f5f0e8',
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  wheelArea: {
    width: SCREEN_W,
    height: SCREEN_W * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    width: WHEEL_RADIUS * 2 + 100,
    height: WHEEL_RADIUS * 2 + 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonNode: {
    position: 'absolute',
    alignItems: 'center',
  },
  seasonCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  seasonImage: {
    width: 64,
    height: 64,
  },
  seasonName: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  centerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(200,169,96,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200,169,96,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSymbol: {
    fontSize: 16,
    color: '#c8a960',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  indicatorArrow: {
    fontSize: 24,
    color: '#c8a960',
  },
  selectedInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  selectedName: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    textAlign: 'center',
  },
  selectedArchetype: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: '#f5f0e8',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  enterButton: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 36,
    backgroundColor: 'rgba(155,89,182,0.08)',
  },
  enterText: {
    fontFamily: FONTS.heading,
    fontSize: 15,
    letterSpacing: 1,
  },
});
