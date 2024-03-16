import React, { ReactNode } from 'react';
import { Card as PaperCard, useTheme, Text} from 'react-native-paper';
import  { styles } from './Card.styles';
import { ImageSourcePropType ,  Image, TextStyle} from 'react-native';
import fonts from '../../themes/fonts';
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageUrl,
  content,
  children,
  titleStyle,
  subtitleStyle,
  contentStyle,
}) => {
  const { colors } = useTheme();
  
  return (
    <PaperCard style={[styles.card, { backgroundColor: colors.surface }]}>
      <PaperCard.Title
        title={title}
        subtitle={subtitle}
        titleStyle={[fonts.bold, titleStyle]} 
        subtitleStyle={[fonts.bold, subtitleStyle]} 
      />
      {imageUrl && typeof imageUrl === 'string' ? (
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
      ) : imageUrl && typeof imageUrl === 'number' ? (
        <Image source={imageUrl} style={styles.cardImage} resizeMode="cover" />
      ) : null}
      <PaperCard.Content>
        <Text style={[fonts.bold, contentStyle]}>{content}</Text> 
      </PaperCard.Content>
      {children}
    </PaperCard>
  );
};

export default Card;
interface CardProps {
    title: string;
    subtitle?: string;  // Optional subtitle
    imageUrl?: string | number;  // Optional image URL for Card.Cover
    content: string;
    children?: ReactNode; 
    titleStyle?: TextStyle; // Custom style for the title
  subtitleStyle?: TextStyle; // Custom style for the subtitle
  contentStyle?: TextStyle; // Custom style for the content
  }