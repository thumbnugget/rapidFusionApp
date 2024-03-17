import React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform, StyleSheet, View } from 'react-native';
import BackIcon from '../../../assets/icons/arrow_back_ios_new_black_24dp.svg';
import {styles} from './AppHeader.styles';

const AppHeader: React.FC<AppHeaderProps> = ({ title, onBackPress }) => {
    return (
      <Appbar.Header style={styles.header}>
      {onBackPress ? (
        <Appbar.Action icon={() => <BackIcon width={24} height={24} />} onPress={onBackPress} />
      ) : (
        
        <View style={styles.placeholder} />
      )}
      <Appbar.Content title={title} titleStyle={styles.title} />
     
      <View style={styles.placeholder} />
    </Appbar.Header>
  );
};
export default AppHeader;


interface AppHeaderProps {
  title: string;
  onBackPress?: () => void; 
}