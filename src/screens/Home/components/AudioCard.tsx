
import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { IconButton } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { styles } from './AudioCard.styles';
import { Audio } from 'expo-av';
import Button from '../../../core/components/Button/ButtonIcon';
import AudioPlayer from '../../../core/components/AudioPlayer/AudioPlayer';
import PlayIcon from '../../../assets/icons/play_arrow_white_24dp.svg'; // Assuming you have a play icon
import PauseIcon from '../../../assets/icons/pause_white_24dp.svg';
import DownloadIcon from '../../../assets/icons/file_download_black_24dp.svg';
const tracks = [
    {
      id: '1',
      title: 'Digging the Grave',
      url: require('../../../assets/audio/DiggingtheGrave.mp3'),
    },
    {
      id: '2',
      title: 'Digging the Grave also',
      url: require('../../../assets/audio/DiggingtheGrave.mp3'),
    },
    // Add more tracks as needed
  ];

  


const AudioCard: React.FC<AudioCardProps> = () => {
    const audioTitle = 'Audio Tracks';
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const playPauseTrack = async (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    // Stop the current sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setCurrentPlaying(null);
    }

    if (currentPlaying === trackId) {
      // If the track is currently playing, stop it
      setCurrentPlaying(null);
    } else {
      // Play the new track
      const { sound: newSound } = await Audio.Sound.createAsync(track.url);
      setSound(newSound);
      await newSound.playAsync();
      setCurrentPlaying(trackId);
    }
  };
  const askDownloadPermission = async () => {
    // Ask for permission to download
  }

  const renderItem = ({ item }: { item: Track }) => (
    <View style={styles.itemContainer}>
       <Button 
        title={item.title}
        onPress={() => playPauseTrack(item.id)}
        icon={() => currentPlaying === item.id ? <PauseIcon /> : <PlayIcon />} // Pass a function that returns the icon component
        mode="contained" 
      />
      <Button 
        onPress={askDownloadPermission} // Replace with actual download function
        icon={() => <DownloadIcon />} // Replace with actual music note icon component
        mode="text" 
        
      />
    </View>
  );

  return (
    <Card style={styles.card}>
        <Text style={styles.title}>Audio Tracks</Text>
       
          <FlatList
            data={tracks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
       
     
    </Card>
  );
};

export default AudioCard;

interface AudioCardProps {
    isExpanded?: boolean; 
    onToggle?: (songTitle: string) => void;
  }

  interface Track {
    id: string;
    title: string;
    url: any; // Use appropriate type for your URL
  }