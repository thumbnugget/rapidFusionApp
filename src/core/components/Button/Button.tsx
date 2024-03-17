import React, { ReactNode } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { styles } from './Button.styles';

const Button: React.FC<ButtonProps> = ({ title, onPress, mode = 'contained', style, icon }) => {
    return (
        <PaperButton 
        mode={mode} 
        onPress={() => onPress && onPress()} // Only call onPress if it's defined
        style={[styles.button, style]} 
        icon={icon}
        labelStyle={{ color: '#000' }}
      >
        {title}
      </PaperButton>
    );
  };
  export default Button;



  interface ButtonProps {
    title: string;
    onPress?: () => void; // Make onPress optional
    mode?: 'text' | 'outlined' | 'contained';
    style?: object;
    icon?: () => ReactNode;
  }