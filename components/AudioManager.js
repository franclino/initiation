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
      { isLooping: false, volume: 0 },
    );
    bgMusic = sound;

    // Manual loop with 30s hypnotic pause between plays
    const loopWithPause = async () => {
      if (!bgMusic) return;
      try {
        await bgMusic.setPositionAsync(0);
        await bgMusic.playAsync();

        // Fade in
        let vol = 0;
        await new Promise((resolve) => {
          const fadeIn = setInterval(async () => {
            vol += 0.01;
            if (vol >= 0.15) {
              clearInterval(fadeIn);
              vol = 0.15;
              resolve();
            }
            try { await bgMusic.setVolumeAsync(vol); } catch (e) { clearInterval(fadeIn); resolve(); }
          }, 100);
        });

        // Wait for playback to finish
        await new Promise((resolve) => {
          bgMusic.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              bgMusic.setOnPlaybackStatusUpdate(null);
              resolve();
            }
          });
        });

        // 30 second hypnotic silence
        await new Promise((r) => setTimeout(r, 30000));

        // Loop again
        loopWithPause();
      } catch (e) {}
    };

    loopWithPause();
  } catch (e) {
    console.log('BG music error:', e);
  }
}

export async function stopBackgroundMusic() {
  try {
    if (bgMusic) {
      let vol = 0.15;
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
      { volume: 0.6 },
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
