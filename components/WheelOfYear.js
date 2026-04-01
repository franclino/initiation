// Wheel of the Year — 8 goddess segments with sacred geometry center
// Mirrors the physical INITIATION board game
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, WHEEL, GODDESS_IMAGES, BOARD_IMAGE } from '../constants/theme';

export default function WheelOfYear({ activeSeason = 'samhain', onSeasonPress, size = 300 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Board game wheel as background */}
      <Image
        source={BOARD_IMAGE}
        style={[styles.boardImage, { width: size, height: size, borderRadius: size / 2 }]}
        resizeMode="cover"
      />

      {/* Overlay to dim inactive and highlight active */}
      <View style={[styles.overlay, { width: size, height: size, borderRadius: size / 2 }]} />

      {/* Season labels around the wheel */}
      {WHEEL.seasons.map((season) => {
        const isActive = season.key === activeSeason;
        const rad = ((season.angle - 90) * Math.PI) / 180;
        const r = size * 0.38;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        const seasonColor = COLORS[season.key]?.glow || '#c8a960';

        return (
          <TouchableOpacity
            key={season.key}
            style={[
              styles.seasonNode,
              {
                transform: [{ translateX: x }, { translateY: y }],
              },
            ]}
            onPress={() => onSeasonPress?.(season.key)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.dot,
              isActive && { backgroundColor: seasonColor, shadowColor: seasonColor, shadowRadius: 12, shadowOpacity: 0.8 },
            ]} />
            <Text style={[
              styles.seasonName,
              isActive && { color: seasonColor, opacity: 1, fontFamily: FONTS.bodyBold },
            ]}>
              {season.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Center sacred geometry */}
      <View style={styles.centerCircle}>
        <Text style={styles.centerSymbol}>⊛</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boardImage: {
    position: 'absolute',
    opacity: 0.6,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  seasonNode: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(200,169,96,0.4)',
    marginBottom: 4,
  },
  seasonName: {
    fontFamily: FONTS.body,
    fontSize: 10,
    color: '#f5f0e8',
    opacity: 0.4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  centerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(200,169,96,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  centerSymbol: {
    fontSize: 18,
    color: '#c8a960',
    opacity: 0.8,
  },
});
