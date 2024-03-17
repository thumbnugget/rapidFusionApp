// LyricsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { styles } from './LyricsScreen.styles';
import LyricsCard from '../Home/components/LyricsCard';
import { albumsLyrics } from './data/lyricsData';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/NavigationTypes';
import AppHeader from '../../core/components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';
type LyricsScreenRouteProp = RouteProp<HomeStackParamList, 'Lyrics'>;

const LyricsScreen: React.FC<LyricsScreenProps> = ({ route }) => {
  const { albumTitle} = route.params;
  const navigation = useNavigation();
  type AlbumTitle = keyof typeof albumsLyrics;

  // Get the lyrics for the current album
  const currentAlbumLyrics = albumsLyrics[albumTitle] || {};


  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Lyrics" onBackPress={() => navigation.goBack()} />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{albumTitle}</Text>
      {Object.entries(currentAlbumLyrics).map(([songTitle, lyrics]) => (
        <LyricsCard key={songTitle} songTitle={songTitle} lyrics={lyrics} />
      ))}
    </ScrollView>
  </View>
  );
};


export default LyricsScreen;
type AlbumTitle = keyof typeof albumsLyrics;

interface LyricsScreenProps {
  route: LyricsScreenRouteProp;
  // route: {
  //   params: {
  //     albumTitle: AlbumTitle;
  //   };
  // };
  }