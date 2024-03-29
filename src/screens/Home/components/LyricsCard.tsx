import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// If you're using react-native-paper or another UI library, import Card from there
import { Card } from 'react-native-paper';
import { styles } from './LyricsCard.styles';



const LyricsCard: React.FC<LyricsCardProps> = ({ songTitle, lyrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lyricsLines = lyrics.split('\n');
  return (
    <Card style={styles.card}>
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.titleContainer}>
      <Text style={styles.title}>{songTitle}</Text>
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.lyricsContainer}>
        {lyricsLines.map((line, index) => (
          // Render each line of the lyrics with styles
          <Text key={index} style={styles.lyricsLine}>
            {line}
          </Text>
        ))}
      </View>
    )}
  </Card>
  );
};

export default LyricsCard;

interface LyricsCardProps {
    songTitle: string;
    lyrics: string;
  }