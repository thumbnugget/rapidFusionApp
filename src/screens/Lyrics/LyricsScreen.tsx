// LyricsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { styles } from './LyricsScreen.styles';
import LyricsCard from '../Home/components/LyricsCard';
import { albumsLyrics } from './data/lyricsData';


const LyricsScreen: React.FC<LyricsScreenProps> = ({ route }) => {
  const { albumTitle} = route.params;
  

  // Get the lyrics for the current album
  const currentAlbumLyrics = albumsLyrics[albumTitle] || {};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{albumTitle}</Text>
      {Object.entries(currentAlbumLyrics).map(([songTitle, lyrics]) => (
        <LyricsCard key={songTitle} songTitle={songTitle} lyrics={lyrics} />
      ))}
    </ScrollView>
  );
};


export default LyricsScreen;
type AlbumTitle = keyof typeof albumsLyrics;

interface LyricsScreenProps {
  route: {
    params: {
      albumTitle: AlbumTitle;
    };
  };
  }