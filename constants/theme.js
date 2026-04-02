// INITIATION — Global Theme Constants

export const COLORS = {
  // General palette
  general: {
    background: '#1a1a1a',       // Deep charcoal
    text: '#f5f0e8',             // Bone white
    overlay: '#9e9e9e80',        // Mist grey
    accent: '#c8a960',           // Antique gold lines
  },

  // Samhain
  samhain: {
    background: '#000000',       // Black
    text: '#eeeeee',             // Bright white-grey
    overlay: '#9e9e9e80',        // Mist grey
    accent: '#8b6914',           // Antique brown lines
    glow: '#b874d6',             // Brighter purple glow
  },

  // Yule
  yule: {
    background: '#d4d4d4',       // Light grey
    text: '#ffffff',             // White
    overlay: '#9e9e9e80',
    accent: '#c0c0c0',           // Silver lines
    glow: '#c0c0c0',             // Silver glow
  },

  // Imbolc
  imbolc: {
    background: '#2d2d2d',       // Dark grey
    text: '#f5e6a3',             // Light yellow
    overlay: '#d4d4d480',
    accent: '#d4c98e',           // Beige/yellow lines
    glow: '#ffffff',             // White glow
  },

  // Ostara
  ostara: {
    background: '#556b2f',       // Olive green
    text: '#e8a857',             // Light orange/brown
    overlay: '#ff8c0060',        // Flame orange
    accent: '#4a7c4a',           // Green lines
    glow: '#d4c98e',             // Beige/yellow glow
  },

  // Beltane
  beltane: {
    background: '#8b0000',       // Dark red
    text: '#ffb6c1',             // Light pink
    overlay: '#ff69b460',        // Rose
    accent: '#c8a960',           // Gold/brown lines
    glow: '#ffffff',             // White glow
  },

  // Litha
  litha: {
    background: '#2c3e50',       // Dark blue/grey
    text: '#ffffff',
    overlay: '#40e0d060',        // Turquoise
    accent: '#c0c0c0',           // Silver lines
    glow: '#4a90d9',             // Blue glow
  },

  // Lammas
  lammas: {
    background: '#3e2723',       // Deep brown
    text: '#f5e6c8',             // Light beige
    overlay: '#ffd70060',        // Yellow
    accent: '#c8a960',           // Golden lines
    glow: '#f5e6a3',             // Light yellow glow
  },

  // Mabon
  mabon: {
    background: '#3e3530',       // Dark brown/grey
    text: '#ffffff',
    overlay: '#d4c98e60',        // Beige
    accent: '#4a7c4a',           // Green lines
    glow: '#a0522d',             // Bright brown glow
  },
};

export const FONTS = {
  heading: 'Montserrat_700Bold',
  headingLight: 'Montserrat_300Light',
  body: 'Quicksand_400Regular',
  bodyMedium: 'Quicksand_500Medium',
  bodyBold: 'Quicksand_700Bold',
};

export const WHEEL = {
  rotationDuration: 1750, // 1.5–2s
  // Seasons in clockwise order, North at top
  seasons: [
    { key: 'yule',    name: 'Yule',    position: 'N',  angle: 0 },
    { key: 'imbolc',  name: 'Imbolc',  position: 'NE', angle: 45 },
    { key: 'ostara',  name: 'Ostara',  position: 'E',  angle: 90 },
    { key: 'beltane', name: 'Beltane', position: 'SE', angle: 135 },
    { key: 'litha',   name: 'Litha',   position: 'S',  angle: 180 },
    { key: 'lammas',  name: 'Lammas',  position: 'SW', angle: 225 },
    { key: 'mabon',   name: 'Mabon',   position: 'W',  angle: 270 },
    { key: 'samhain', name: 'Samhain', position: 'NW', angle: 315 },
  ],
};

// Goddess images mapped to seasons
export const GODDESS_IMAGES = {
  samhain: require('../assets/images/goddesses/samhain-crone.jpg'),
  yule: require('../assets/images/goddesses/yule-air.jpg'),
  imbolc: require('../assets/images/goddesses/imbolc-brigid.jpg'),
  ostara: require('../assets/images/goddesses/ostara-fire.jpg'),
  beltane: require('../assets/images/goddesses/beltane-lover.jpg'),
  litha: require('../assets/images/goddesses/litha-water.jpg'),
  lammas: require('../assets/images/goddesses/lammas-earth.jpg'),
  mabon: require('../assets/images/goddesses/mabon-mother.jpg'),
};

// Logo
export const LOGO = {
  dark: require('../assets/images/logo/logo-dark.png'),
  light: require('../assets/images/logo/logo-light.jpg'),
  wheelOnly: require('../assets/images/logo/wheel-only.png'),
  wheelOnlyLight: require('../assets/images/logo/wheel-only-light.png'),
};

// Board
export const BOARD_IMAGE = require('../assets/images/board/wheel-board.jpg');

// Archetype names per season
export const ARCHETYPES = {
  samhain: { name: 'Crone / Magician', element: 'Earth, cold' },
  yule: { name: 'Sage / Mystic', element: 'Air, cold' },
  imbolc: { name: 'Maiden / Warrior', element: 'Fire, cold' },
  ostara: { name: 'Youth / Explorer', element: 'Fire, warm' },
  beltane: { name: 'Lover / Artist', element: 'Flowers, warm' },
  litha: { name: 'Sovereign / Guardian', element: 'Water, cold' },
  lammas: { name: 'Mother / Provider', element: 'Earth, warm' },
  mabon: { name: 'Harvest Keeper', element: 'Earth, warm' },
};

export const PRICING = {
  singleArchetype: 36,
  fullWheel: 222,
  deepening: 19,
  currency: '€',
};
