// Audio manager — uses expo-audio (SDK 54+)
import { useAudioPlayer } from 'expo-audio';

// We can't use hooks outside components, so use the imperative API
import { Audio } from 'expo-av';

let bgMusic = null;
let voiceSound = null;
let lastTickTime = 0;

const TICK_COOLDOWN = 6000;

export async function playBackgroundMusic() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    if (bgMusic) {
      try { await bgMusic.unloadAsync(); } catch (e) {}
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/bg-music-loop.mp3'),
      { isLooping: true, volume: 0 },
    );
    bgMusic = sound;
    await bgMusic.playAsync();

    // Smooth fade in
    let vol = 0;
    const fadeIn = setInterval(async () => {
      vol += 0.01;
      if (vol >= 0.25) {
        clearInterval(fadeIn);
        vol = 0.25;
      }
      try { await bgMusic.setVolumeAsync(vol); } catch (e) { clearInterval(fadeIn); }
    }, 100);
  } catch (e) {
    console.log('BG music error:', e);
  }
}

export async function stopBackgroundMusic() {
  try {
    if (bgMusic) {
      let vol = 0.25;
      const fadeOut = setInterval(async () => {
        vol -= 0.01;
        if (vol <= 0) {
          clearInterval(fadeOut);
          try {
            await bgMusic.stopAsync();
            await bgMusic.unloadAsync();
          } catch (e) {}
          bgMusic = null;
          return;
        }
        try { await bgMusic.setVolumeAsync(vol); } catch (e) { clearInterval(fadeOut); }
      }, 80);
    }
  } catch (e) {}
}

export async function playIntroVoice() {
  try {
    await new Promise((r) => setTimeout(r, 2000));

    if (voiceSound) {
      try { await voiceSound.unloadAsync(); } catch (e) {}
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/intro-voice.mp3'),
      { volume: 0.85 },
    );
    voiceSound = sound;

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
      require('../assets/audio/chime.mp3'),
      { volume: 0.5 },
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}

export async function playWheelTick() {
  const now = Date.now();
  if (now - lastTickTime < TICK_COOLDOWN) return;
  lastTickTime = now;

  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/wheel-tick.mp3'),
      { volume: 0.4 },
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}
