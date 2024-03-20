import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Audio } from 'expo-av';
import Button from '../Button/Button';

const AudioPlayer: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Function to load and prepare the audio file
    async function loadAudio() {
      console.log('Loading audio...');
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../../assets/audio/DiggingtheGrave.mp3'), // Make sure the path is correct
        { shouldPlay: false }
      );
      setSound(newSound);
      console.log('Audio loaded successfully');
    }

    // Load the audio file when the component mounts
    loadAudio();

    // Clean up function to unload the sound
    return () => {
      if (sound) {
        console.log('Unloading sound');
        sound.unloadAsync().catch((error) => console.error('Error unloading sound:', error));
      }
    };
  }, []);

  // Function to handle play/pause toggle
  const handlePlayPause = async () => {
    if (!sound) {
      console.log('Sound object is null, unable to play or pause');
      return;
    }

    if (isPlaying) {
      console.log('Pausing...');
      await sound.pauseAsync();
      setIsPlaying(false);
      console.log('Paused');
    } else {
      console.log('Playing...');
      await sound.playAsync();
      setIsPlaying(true);
      console.log('Playing');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

export default AudioPlayer;
