// SCREEN 4A — Choose an Archetype — Spinning Wheel
// Board-game style wheel. Portraits stay upright. Names below.
import { View, Text, StyleSheet, PanResponder, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, WHEEL, GODDESS_IMAGES, ARCHETYPES } from '../../constants/theme';
import { useThemeMode } from '../../constants/ThemeContext';
import { playWheelTick } from '../../components/AudioManager';

const { width: SCREEN_W } = Dimensions.get('window');
const WHEEL_RADIUS = SCREEN_W * 0.3;
const NODE_SIZE = 68;
const STEP = 45; // 360 / 8

export default function ChooseArchetype() {
  const router = useRouter();
  const theme = useThemeMode();
  const [angleDeg, setAngleDeg] = useState(0);
  const angleRef = useRef(0);
  const lastY = useRef(0);
  const velRef = useRef(0);
  const animFrame = useRef(null);
  const lastTickIdx = useRef(0);

  const getSelected = useCallback((a) => {
    const norm = (((-a) % 360) + 360) % 360;
    return Math.round(norm / STEP) % 8;
  }, []);

  const tick = useCallback((a) => {
    const idx = getSelected(a);
    if (idx !== lastTickIdx.current) {
      lastTickIdx.current = idx;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      playWheelTick();
    }
  }, []);

  // Deceleration loop
  const startDecel = useCallback(() => {
    const loop = () => {
      velRef.current *= 0.96; // friction
      if (Math.abs(velRef.current) < 0.12) {
        // Smooth swoop to nearest position
        const idx = getSelected(angleRef.current);
        const target = -(idx * STEP);
        const diff = target - angleRef.current;
        // Ease into the snap over multiple frames
        if (Math.abs(diff) < 0.3) {
          angleRef.current = target;
          setAngleDeg(target);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          return;
        }
        angleRef.current += diff * 0.12;
        setAngleDeg(angleRef.current);
        animFrame.current = requestAnimationFrame(loop);
        return;
      }
      angleRef.current += velRef.current;
      tick(angleRef.current);
      setAngleDeg(angleRef.current);
      animFrame.current = requestAnimationFrame(loop);
    };
    animFrame.current = requestAnimationFrame(loop);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4,
      onPanResponderGrant: () => {
        if (animFrame.current) cancelAnimationFrame(animFrame.current);
        lastY.current = 0;
        velRef.current = 0;
      },
      onPanResponderMove: (_, gesture) => {
        const dy = gesture.dy - lastY.current;
        lastY.current = gesture.dy;
        const delta = dy * 0.35; // sensitivity
        angleRef.current += delta;
        velRef.current = delta;
        tick(angleRef.current);
        setAngleDeg(angleRef.current);
      },
      onPanResponderRelease: () => {
        // Clamp velocity
        velRef.current = Math.max(-6, Math.min(6, velRef.current));
        startDecel();
      },
    }),
  ).current;

  const selectedIdx = getSelected(angleDeg);
  const selected = WHEEL.seasons[selectedIdx];
  const selectedColor = COLORS[selected.key] || COLORS.samhain;
  const selectedArchetype = ARCHETYPES[selected.key];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Choose an Archetype</Text>
      <Text style={[styles.subtitle, { color: theme.textSoft }]}>Spin the Wheel</Text>

      {/* Wheel */}
      <View style={styles.wheelArea} {...panResponder.panHandlers}>
        {/* Connection lines */}
        <View style={styles.wheelCenter}>
          <View style={[styles.centerRing, { borderColor: selectedColor.glow }]}>
            <Text style={[styles.centerText, { color: selectedColor.glow }]}>⊛</Text>
          </View>
        </View>

        {/* Season nodes — portraits stay upright */}
        {WHEEL.seasons.map((season, i) => {
          const nodeAngle = ((i * STEP + angleDeg - 90) * Math.PI) / 180;
          const x = Math.cos(nodeAngle) * WHEEL_RADIUS;
          const y = Math.sin(nodeAngle) * WHEEL_RADIUS;
          const isSelected = i === selectedIdx;
          const seasonColor = COLORS[season.key] || COLORS.samhain;
          const image = GODDESS_IMAGES[season.key];

          return (
            <View
              key={season.key}
              style={[
                styles.seasonNode,
                {
                  left: SCREEN_W / 2 - NODE_SIZE / 2 + x,
                  top: WHEEL_RADIUS + 20 + y,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  const target = -(i * STEP);
                  angleRef.current = target;
                  setAngleDeg(target);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.portraitRing,
                  { borderColor: isSelected ? seasonColor.glow : 'rgba(200,169,96,0.2)' },
                  isSelected && styles.portraitSelected,
                ]}>
                  <Image source={image} style={styles.portrait} resizeMode="cover" />
                </View>
              </TouchableOpacity>
              <Text style={[
                styles.seasonName,
                { color: isSelected ? seasonColor.glow : 'rgba(245,240,232,0.4)' },
                isSelected && styles.seasonNameSelected,
              ]}>
                {season.name}
              </Text>
            </View>
          );
        })}

        {/* Top indicator */}
        <View style={styles.indicator}>
          <Text style={[styles.indicatorArrow, { color: selectedColor.glow }]}>▽</Text>
        </View>
      </View>

      {/* Selected info */}
      <View style={styles.selectedInfo}>
        <Text style={[styles.selectedSeason, { color: selectedColor.glow }]}>
          {selected.name}
        </Text>
        <Text style={[styles.selectedArchetype, { color: theme.textSoft }]}>
          {selectedArchetype?.name}
        </Text>
        <Text style={[styles.selectedElement, { color: theme.textSoft }]}>
          {selectedArchetype?.element}
        </Text>

        <TouchableOpacity
          style={[styles.enterButton, { borderColor: selectedColor.glow, backgroundColor: `${selectedColor.glow}15` }]}
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
    marginBottom: 8,
  },
  wheelArea: {
    width: SCREEN_W,
    height: WHEEL_RADIUS * 2 + NODE_SIZE + 60,
    position: 'relative',
  },
  wheelCenter: {
    position: 'absolute',
    left: SCREEN_W / 2 - 20,
    top: WHEEL_RADIUS + 20 - 20,
    zIndex: 5,
  },
  centerRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 18,
  },
  seasonNode: {
    position: 'absolute',
    width: NODE_SIZE,
    alignItems: 'center',
    zIndex: 2,
  },
  portraitRing: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  portraitSelected: {
    width: NODE_SIZE + 8,
    height: NODE_SIZE + 8,
    borderRadius: (NODE_SIZE + 8) / 2,
    borderWidth: 3,
    marginLeft: -4,
  },
  portrait: {
    width: '100%',
    height: '100%',
  },
  seasonName: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  seasonNameSelected: {
    fontSize: 12,
    fontFamily: FONTS.bodyBold,
  },
  indicator: {
    position: 'absolute',
    top: -8,
    left: SCREEN_W / 2 - 12,
    zIndex: 10,
  },
  indicatorArrow: {
    fontSize: 24,
  },
  selectedInfo: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  selectedSeason: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    textAlign: 'center',
  },
  selectedArchetype: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: '#f5f0e8',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  selectedElement: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: '#f5f0e8',
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 24,
  },
  enterButton: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 36,
  },
  enterText: {
    fontFamily: FONTS.heading,
    fontSize: 15,
    letterSpacing: 1,
  },
});
