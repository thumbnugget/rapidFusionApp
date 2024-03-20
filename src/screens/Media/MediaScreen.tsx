import React from 'react';
import { View, ScrollView } from 'react-native';
import AudioPlayer from '../../core/components/AudioPlayer/AudioPlayer';
import AudioCard from '../Home/components/AudioCard'; // Update the path if necessary
import AppHeader from '../../core/components/Header/AppHeader';
import { styles } from './MediaScreen.styles';
import { useNavigation } from '@react-navigation/native';

const MediaScreen: React.FC = () => {
  const navigation = useNavigation(); // Hook to get navigation object

  return (
    <View style={{ flex: 1 }}>
      {/* Updated AppHeader with useNavigation hook */}
      <AppHeader title="Media" onBackPress={() => navigation.goBack()} />
      <View style={styles.container} >
        <AudioCard />
    
      </View>
    </View>
  );
};

export default MediaScreen;


