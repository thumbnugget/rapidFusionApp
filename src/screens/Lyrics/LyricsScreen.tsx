// LyricsScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { styles } from './LyricsScreen.styles';
import LyricsCard from '../Home/components/LyricsCard';
import { albumsLyrics } from './data/lyricsData';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/NavigationTypes';
import AppHeader from '../../core/components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { useLyricsContext } from '../../context/LyricsContext';


type LyricsScreenRouteProp = RouteProp<HomeStackParamList, 'Lyrics'>;

const LyricsScreen: React.FC<LyricsScreenProps> = ({ route }) => {
  const { albumTitle } = route.params;
  const [expandedSongTitle, setExpandedSongTitle] = useState<string | null>(null);
  

  const scrollViewRef = useRef<ScrollView>(null);

  const navigation = useNavigation();

  

  const { selectedSongTitle, setSelectedSongTitle } = useLyricsContext();
  // Get the lyrics for the current album
  const currentAlbumLyrics = albumsLyrics[albumTitle] || {};

  type LyricsRefs = { [key: string]: React.RefObject<View> };
  const lyricsRefs = useRef<LyricsRefs>(
    Object.keys(currentAlbumLyrics).reduce((acc: LyricsRefs, songTitle: string) => {
      acc[songTitle] = React.createRef<View>();
      return acc;
    }, {})
  );

  useEffect(() => {
    if (selectedSongTitle && lyricsRefs.current[selectedSongTitle]?.current && scrollViewRef.current) {
      setTimeout(() => {
        lyricsRefs.current[selectedSongTitle].current?.measureLayout(
          scrollViewRef.current as unknown as number,
          (x, y, width, height) => {
            scrollViewRef.current?.scrollTo({ y: y - 50, animated: true }); // Adjust y for header and padding
          },
          () => {} // Error callback, can be omitted or used for error handling
        );
      }, 300); // Adjust the timeout as needed
    }
  }, [selectedSongTitle]);
  
  const toggleCardExpansion = (songTitle: string) => {
  if (selectedSongTitle === songTitle) {
    setSelectedSongTitle(null); // Deselect if the same title is clicked
  } else {
    setSelectedSongTitle(songTitle); // Select the new title
  }
};


  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Lyrics" onBackPress={() => navigation.goBack()} />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}  ref={scrollViewRef}>
      <Text style={styles.title}>{albumTitle}</Text>
     {Object.entries(currentAlbumLyrics).map(([songTitle, lyrics]) => (
    <View ref={lyricsRefs.current[songTitle]} key={songTitle}>
      <LyricsCard songTitle={songTitle} 
      lyrics={lyrics} 
      isExpanded={selectedSongTitle === songTitle}
      onToggle={() => toggleCardExpansion(songTitle)}
     />
    </View>
  ))}
    </ScrollView>
  </View>
 
  );
};


export default LyricsScreen;
type AlbumTitle = keyof typeof albumsLyrics;

interface LyricsScreenProps {
  route: LyricsScreenRouteProp;
  
  }