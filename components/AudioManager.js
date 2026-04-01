// Audio manager — background music, voice, chime, wheel tick
import { Audio } from 'expo-av';

let bgMusic = null;
let voiceSound = null;
let lastTickTime = 0;

const TICK_COOLDOWN = 6000; // Only tick every 6 seconds

export async function playBackgroundMusic() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    if (bgMusic) {
      await bgMusic.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/bg-music-loop.m4a'),
      { isLooping: true, volume: 0 }, // Start silent
    );
    bgMusic = sound;
    await bgMusic.playAsync();

    // Smooth fade in over 3 seconds
    let vol = 0;
    const fadeIn = setInterval(async () => {
      vol += 0.01;
      if (vol >= 0.25) {
        clearInterval(fadeIn);
        vol = 0.25;
      }
      try { await bgMusic.setVolumeAsync(vol); } catch (e) {}
    }, 100); // 30 steps over 3 seconds
  } catch (e) {
    console.log('BG music error:', e);
  }
}

export async function stopBackgroundMusic() {
  try {
    if (bgMusic) {
      // Smooth fade out
      let vol = 0.25;
      const fadeOut = setInterval(async () => {
        vol -= 0.01;
        if (vol <= 0) {
          clearInterval(fadeOut);
          await bgMusic.stopAsync();
          await bgMusic.unloadAsync();
          bgMusic = null;
          return;
        }
        try { await bgMusic.setVolumeAsync(vol); } catch (e) {}
      }, 80);
    }
  } catch (e) {}
}

export async function playIntroVoice() {
  try {
    // Wait a moment for music to establish
    await new Promise((r) => setTimeout(r, 2000));

    if (voiceSound) {
      await voiceSound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/intro-voice.m4a'),
      { volume: 0.85 },
    );
    voiceSound = sound;

    // When voice finishes, play the chime
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        playChime();
        sound.unloadAsync();
        voiceSound = null;
      }
    });

    await voiceSound.playAsync();
  } catch (e) {
    console.log('Voice error:', e);
  }
}

export async function playChime() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/chime.m4a'),
      { volume: 0.5 },
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}

export async function playWheelTick() {
  // Throttle — only play every 6 seconds
  const now = Date.now();
  if (now - lastTickTime < TICK_COOLDOWN) return;
  lastTickTime = now;

  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/wheel-tick.m4a'),
      { volume: 0.4 },
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}
