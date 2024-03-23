import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, ScrollView  } from 'react-native';
// If you're using react-native-paper or another UI library, import Card from there
import { Card } from 'react-native-paper';
import { styles } from './GalleryCard.styles';
import GalleryComponent from '../../../core/components/Gallery/GalleryComponent';
import Image1 from '../../../assets/wallpapers/DiegressCoverScan1400.png';
import Image2 from '../../../assets/wallpapers/SanitysHelperCoverScan1400.png';
import Image3 from '../../../assets/wallpapers/forApp.png';
import Image4 from '../../../assets/wallpapers/ic_launcher.png';
import Image5 from '../../../assets/wallpapers/wall1.png';
import Image6 from '../../../assets/wallpapers/wall2.png';
import Image7 from '../../../assets/wallpapers/wall3.png';
import Image8 from '../../../assets/wallpapers/wall4.png';
import { Wallpaper } from '../../../constants/globalTypes';


const GalleryCard: React.FC<GalleryCardProps> = ({ 
    onToggle}) => {
  const galleryName = 'Wallpapers';
  const [isExpanded, setIsExpanded] = useState(false);
//   const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  // const [internalIsExpanded, setInternalIsExpanded] = useState(isExpanded);

  


  const wallpapers: Wallpaper[] = [
    { id: '1', source: Image1 },
    { id: '2', source: Image6 },
    { id: '3', source: Image7 },
    { id: '4', source: Image8 },
    { id: '5', source: Image1 },
    { id: '6', source: Image2 },
    { id: '7', source: Image5 },
    { id: '8', source: Image4 },
    { id: '9', source: Image1 },
   
    // Add more wallpapers as needed
  ];

  const handlePress = () => {
    // Toggle the expanded state
    setIsExpanded(!isExpanded);
  
    // Call the onToggle prop, if provided
    if (onToggle) {
      onToggle(galleryName);
    }
  };

 
  return (
    
    <Card style={styles.card}>
    <TouchableOpacity onPress={handlePress} style={styles.titleContainer}>
      <Text style={styles.title}>{galleryName}</Text>
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.lyricsContainer}>
        
       
       <GalleryComponent wallpapers={wallpapers} />
     
      </View>
    )}
  </Card>
  );
};

export default GalleryCard;

interface GalleryCardProps {

    onToggle?: (galleryName: string) => void;
  }

//   interface Wallpaper {
//     id: string;
//     source: ImageSourcePropType;
//   }
