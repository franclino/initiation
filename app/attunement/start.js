// ARCHETYPAL ATTUNEMENT — 7-Slide Quiz
// Starfield background, sacred card styling, moon phase horns
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Easing, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS, LOGO } from '../../constants/theme';
import MoonPhaseHorns from '../../components/MoonPhaseHorns';

const { width: SCREEN_W } = Dimensions.get('window');
const STARFIELD = require('../../assets/images/starfield.jpg');
const WHEEL_SIZE = SCREEN_W * 1.95;

const SLIDES = [
  {
    prompt: 'Which words describe your current situation best?',
    options: [
      { label: 'Beginning', value: 1 },
      { label: 'Growing', value: 2 },
      { label: 'Loving', value: 3 },
      { label: 'Flowing', value: 4 },
      { label: 'Nurturing', value: 5 },
      { label: 'Grounding', value: 6 },
      { label: 'Ending', value: 7 },
      { label: 'Pausing', value: 8 },
    ],
  },
  {
    prompt: 'Choose the one that resonates most.',
    options: [
      { label: 'Playfulness', value: 1 },
      { label: 'Fertility', value: 2 },
      { label: 'Sensuality', value: 3 },
      { label: 'Emotion', value: 4 },
      { label: 'Leading', value: 5 },
      { label: 'Harvest', value: 6 },
      { label: 'Letting go', value: 7 },
      { label: 'Stillness', value: 8 },
    ],
  },
  {
    prompt: 'Choose the image that speaks to you most.',
    options: [
      { label: 'Snowdrops', value: 1 },
      { label: 'Bonfire', value: 2 },
      { label: 'Hands holding', value: 3 },
      { label: 'Mermaid', value: 4 },
      { label: 'Crown', value: 5 },
      { label: 'Crystals', value: 6 },
      { label: 'Cauldron', value: 7 },
      { label: 'Sky / Clouds', value: 8 },
    ],
  },
  {
    prompt: 'Choose one animal.',
    options: [
      { label: 'Wolf', value: 1 },
      { label: 'Hare', value: 2 },
      { label: 'Horse', value: 3 },
      { label: 'Dolphin', value: 4 },
      { label: 'Deer', value: 5 },
      { label: 'Badger', value: 6 },
      { label: 'Crow', value: 7 },
      { label: 'Eagle', value: 8 },
    ],
  },
  {
    prompt: 'If your life was a movie, which role would you currently play?',
    options: [
      { label: 'The Trickster', value: 1 },
      { label: 'The Dragonrider', value: 2 },
      { label: 'The Lover', value: 3 },
      { label: 'The Water-Bender', value: 4 },
      { label: 'The King / Queen', value: 5 },
      { label: 'The Guardian of the Threshold', value: 6 },
      { label: 'The Magician / Witch', value: 7 },
      { label: 'The Air-Bender', value: 8 },
    ],
  },
  {
    prompt: 'What do you need most right now?',
    options: [
      { label: 'Determination', value: 1 },
      { label: 'Passion', value: 2 },
      { label: 'Sex', value: 3 },
      { label: 'Surrender', value: 4 },
      { label: 'Responsibility', value: 5 },
      { label: 'Balance', value: 6 },
      { label: 'Change', value: 7 },
      { label: 'Perspective', value: 8 },
    ],
  },
  {
    prompt: 'Choose your Ally.',
    options: [
      { label: 'Brigid', value: 1 },
      { label: 'Ostara', value: 2 },
      { label: 'Aphrodite', value: 3 },
      { label: 'Lady of the Lake', value: 4 },
      { label: 'Isis', value: 5 },
      { label: 'Hulda / Holla', value: 6 },
      { label: 'Ceridwen', value: 7 },
      { label: 'Shiva', value: 8 },
    ],
  },
];

const ARCHETYPE_MAP = {
  1: 'imbolc',
  2: 'ostara',
  3: 'beltane',
  4: 'litha',
  5: 'lammas',
  6: 'mabon',
  7: 'samhain',
  8: 'yule',
};

function resolveArchetype(scores) {
  let maxScore = 0;
  let winners = [];
  for (let i = 1; i <= 8; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      winners = [i];
    } else if (scores[i] === maxScore) {
      winners.push(i);
    }
  }
  if (winners.length === 1) return ARCHETYPE_MAP[winners[0]];
  const pick = winners[Math.floor(Math.random() * winners.length)];
  return ARCHETYPE_MAP[pick];
}

export default function AttunementStart() {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState(0);
  const [scores, setScores] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: 100,
      duration: 38000 * 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const slide = SLIDES[slideIndex];

  const handleSelect = (value) => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);

    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      const result = resolveArchetype(newScores);
      router.push(`/attunement/result?archetype=${result}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Starfield */}
      <Image source={STARFIELD} style={styles.starfield} resizeMode="cover" />

      {/* Spinning wheel */}
      <View style={styles.wheelWrap}>
        <Animated.Image
          source={LOGO.wheelOnly}
          style={[styles.wheelImage, { transform: [{ rotate: spin }] }]}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Moon phase horns */}
        <MoonPhaseHorns />

        <Text style={styles.slideCount}>{slideIndex + 1} / 7</Text>
        <Text style={styles.prompt}>{slide.prompt}</Text>

        <ScrollView
          contentContainerStyle={styles.options}
          showsVerticalScrollIndicator={false}
        >
          {slide.options.map((opt, i) => (
            <TouchableOpacity
              key={opt.label}
              style={styles.optionCard}
              onPress={() => handleSelect(opt.value)}
              activeOpacity={0.7}
            >
              <View style={styles.ornamentLine} />
              <Text style={styles.optionText}>{opt.label}</Text>
              <View style={[styles.ornamentLine, styles.ornamentBottom]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  starfield: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.5,
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
    opacity: 0.3,
  },
  content: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    top: SCREEN_W * 0.35,
    alignItems: 'center',
  },
  slideCount: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: '#c8a960',
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 3,
  },
  prompt: {
    fontFamily: FONTS.headingLight,
    fontSize: 19,
    color: '#f5f0e8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
    letterSpacing: 1,
  },
  options: {
    gap: 10,
    paddingBottom: 20,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: 'rgba(200,169,96,0.2)',
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(200,169,96,0.03)',
    width: SCREEN_W - 48,
  },
  ornamentLine: {
    height: 1,
    width: 24,
    alignSelf: 'center',
    borderRadius: 1,
    marginBottom: 8,
    backgroundColor: 'rgba(200,169,96,0.15)',
  },
  ornamentBottom: {
    marginBottom: 0,
    marginTop: 8,
  },
  optionText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
    color: '#f5f0e8',
    textAlign: 'center',
  },
});
