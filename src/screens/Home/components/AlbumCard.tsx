import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './AlbumCard.styles';
import Card from '../../../core/components/Card/Card';
import Button from '../../../core/components/Button/Button';
import { NavigationProp } from '@react-navigation/native';

const AlbumCard: React.FC<AlbumCardProps> = ({ title, content, imageUrl, songTitles, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to control expansion
  const handleDetailsPress = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
    // Additional logic for onDetailsPress if needed
  };
  const handleLyricsPress = () => {
    // Use navigation.navigate to go to the Lyrics screen
    // Pass any parameters you need for the Lyrics screen, such as the album title
    navigation.navigate('Lyrics', { albumTitle: title });
  };
  return (
    <Card title={title} content={content} imageUrl={imageUrl}>
    
      {isExpanded && songTitles && (
    <View style={{ padding: 10 }}> 
      {songTitles.map((title, index) => (
        <Text key={index} style={{ marginVertical: 2 }}>{title}</Text>
      ))}
    </View>
      )}
     
      <Button title="Songs" onPress={() => setIsExpanded(!isExpanded)} icon="information" mode="outlined" />
      <Button title="Lyrics" onPress={handleLyricsPress} icon="music-note" mode="contained" />
    </Card>
  );
};

export default AlbumCard;

interface AlbumCardProps {
  title: string;
  content: string;
  imageUrl: string | number;  // Allow for local image resources
  onPlayPress?: () => void;  // Renaming for clarity
  onDetailsPress?: () => void;
  songTitles: string[];
  navigation: NavigationProp<any>;
  }