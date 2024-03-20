import React, { ReactNode } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { styles } from './ButtonIcon.styles';


const ButtonIcon: React.FC<ButtonIconProps> = ({ title, onPress, mode = 'contained', style, icon }) => {
    return (
    <PaperButton
    mode={mode} 
    onPress={() => onPress && onPress()} // Only call onPress if it's defined
    style={[styles.button, style]} 
    icon={icon}
    labelStyle={mode === 'contained' ? { color: '#FFF' } : { color: '#000' }} 
   
    >
    {title}
     </PaperButton>
  );
};

export default ButtonIcon;

interface ButtonIconProps {
    title?: string;
    onPress?: () => void; // Make onPress optional
    mode?: 'text' | 'outlined' | 'contained';
    style?: object;
    icon?: () => ReactNode;
  }