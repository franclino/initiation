// Video background — loops Blender-rendered atmospheric videos behind content
// Drop MP4 files into assets/videos/ and reference them here
// Fallback: shows AtmosphericBackground particle effects if no video available
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { COLORS } from '../constants/theme';

export default function VideoBackground({ source, season = 'samhain', children }) {
  const bgColor = COLORS[season]?.background || '#000000';

  if (!source) {
    // No video yet — just render children with dark background
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Video
        source={source}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        rate={0.8} // Slightly slowed for dreamlike feel
      />
      {/* Dark overlay for text readability */}
      <View style={styles.overlay} />
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
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});
