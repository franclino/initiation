// Art nouveau styled card — mirrors the Crone card aesthetic
// Ornate border, goddess image, text overlay
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, GODDESS_IMAGES } from '../constants/theme';

export default function GoddessCard({ season = 'samhain', title, subtitle, size = 'large' }) {
  const S = COLORS[season] || COLORS.samhain;
  const image = GODDESS_IMAGES[season];
  const isLarge = size === 'large';

  return (
    <View style={[styles.card, { borderColor: S.glow }]}>
      {/* Ornate top border line */}
      <View style={[styles.ornamentTop, { backgroundColor: S.accent }]} />

      {/* Goddess image */}
      <View style={[styles.imageFrame, { borderColor: S.accent }]}>
        <Image
          source={image}
          style={[styles.image, isLarge ? styles.imageLarge : styles.imageSmall]}
          resizeMode="cover"
        />
        {/* Gradient overlay for text readability */}
        <View style={styles.imageOverlay} />
      </View>

      {/* Title below image */}
      {title && (
        <View style={styles.textArea}>
          <Text style={[styles.title, { color: S.text, textShadowColor: S.glow }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: S.text }]}>{subtitle}</Text>
          )}
        </View>
      )}

      {/* Ornate bottom border line */}
      <View style={[styles.ornamentBottom, { backgroundColor: S.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 24,
  },
  ornamentTop: {
    height: 2,
    opacity: 0.4,
  },
  imageFrame: {
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
  imageLarge: {
    height: 320,
  },
  imageSmall: {
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
    // Simulated gradient via shadow
  },
  textArea: {
    padding: 18,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  ornamentBottom: {
    height: 2,
    opacity: 0.4,
  },
});
