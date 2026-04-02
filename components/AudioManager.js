// Audio manager
import { Audio } from 'expo-av';

let bgMusic = null;
let voiceSound = null;
let lastTickTime = 0;
let isPlaying = false;

const TICK_COOLDOWN = 6000;

export async function playBackgroundMusic() {
  if (isPlaying) return; // Prevent double calls
  isPlaying = true;

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    const loopWithPause = async () => {
      try {
        // Clean up previous
        if (bgMusic) {
          try { await bgMusic.unloadAsync(); } catch (e) {}
          bgMusic = null;
        }

        // Create fresh at volume 0
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/audio/bg-music-loop.mp3'),
          { isLooping: false, volume: 0 },
        );
        bgMusic = sound;
        await bgMusic.playAsync();

        // Slow fade in
        let vol = 0;
        await new Promise((resolve) => {
          const fadeIn = setInterval(async () => {
            vol += 0.005;
            if (vol >= 0.12) {
              clearInterval(fadeIn);
              vol = 0.12;
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

        // 30 second silence
        await new Promise((r) => setTimeout(r, 30000));

        // Voice comes back
        playIntroVoice();

        // Loop
        loopWithPause();
      } catch (e) {}
    };

    loopWithPause();
  } catch (e) {
    console.log('BG music error:', e);
    isPlaying = false;
  }
}

export async function stopBackgroundMusic() {
  isPlaying = false;
  try {
    if (bgMusic) {
      await bgMusic.stopAsync();
      await bgMusic.unloadAsync();
      bgMusic = null;
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
      { volume: 0.4 },
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
      { volume: 0.3 },
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
      { volume: 0.3 },
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}
