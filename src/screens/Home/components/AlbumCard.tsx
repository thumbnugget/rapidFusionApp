import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './AlbumCard.styles';
import Card from '../../../core/components/Card/Card';
import Button from '../../../core/components/Button/Button';
import { NavigationProp } from '@react-navigation/native';
import DetailsIcon from '../../../assets/icons/chevron_right_black_24dp.svg';
import DetailsIcon2 from '../../../assets/icons/expand_more_black_24dp.svg';
import LyricsIcon from '../../../assets/icons/collections_black_24dp.svg';
const AlbumCard: React.FC<AlbumCardProps> = ({ title, content, imageUrl, songTitles, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to control expansion
 
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLyricsPress = () => {
    
    navigation.navigate('Lyrics', { albumTitle: title });
  };
  return (
    <Card title={title} content={content} imageUrl={imageUrl}>
    
      {isExpanded && songTitles && (
    <View style={{ paddingLeft: 15 }}> 
      {songTitles.map((title, index) => (
        <Text key={index} style={{ marginVertical: 2, color:'#000'}}>{title}</Text>
      ))}
    </View>
      )}
     
     <Button 
        title="Songs" 
        onPress={toggleExpand} 
        icon={() => isExpanded ? <DetailsIcon2 /> : <DetailsIcon />} // Pass a function that returns the icon component
        mode="outlined" 
        
      />
      <Button 
        title="Lyrics" 
        onPress={() => navigation.navigate('Lyrics', { albumTitle: title })}
        icon={() => <LyricsIcon />} // Replace with actual music note icon component
        mode="outlined" 
      /></Card>
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