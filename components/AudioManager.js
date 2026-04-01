// Audio manager — handles background music, voice, and sound effects
import { Audio } from 'expo-av';

let bgMusic = null;
let voiceSound = null;

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
      { isLooping: true, volume: 0.3 },
    );
    bgMusic = sound;
    await bgMusic.playAsync();
  } catch (e) {
    console.log('BG music error:', e);
  }
}

export async function stopBackgroundMusic() {
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
    if (voiceSound) {
      await voiceSound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/intro-voice.m4a'),
      { volume: 0.9 },
    );
    voiceSound = sound;
    await voiceSound.playAsync();
  } catch (e) {
    console.log('Voice error:', e);
  }
}

export async function playWheelTick() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/wheel-tick.m4a'),
      { volume: 0.6 },
    );
    await sound.playAsync();
    // Auto-cleanup after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (e) {}
}
