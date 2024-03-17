import React from 'react';
import { View, Text, ScrollView, ImageSourcePropType, ImageURISource,} from 'react-native';
import { styles } from './Home.styles';
import AlbumCard from './components/AlbumCard';
import { useTheme } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AppHeader from '../../core/components/Header/AppHeader';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  const albumImage: ImageURISource | number = require('../../assets/forApp.png');
  const imageUrl: string | number = typeof albumImage === 'number' ? albumImage : albumImage.uri || '';
  
// Import local images
const forAppImage = require('../../assets/forApp.png');
const diegressImage = require('../../assets/DiegressCoverScan1400.png');
const sanityHelperImage = require('../../assets/SanitysHelperCoverScan1400.png');


  const getImageUrl = (image: any): string | number => {
    if (typeof image === 'number') {
      return image;
    } else if (typeof image === 'object' && image.uri) {
      return image.uri;
    }
    return '';
  };

 const lifeElusiveSongs = ['As the Sun', 'Solitude', 'Life Elusive', 'Just in Time / Nowhere to Go', 'Not So Much', 'A Manic Conversation with Myself'];
 const diegressSongs = ['Minus self', 'Between the lines', 'exit(prelude to pain)', 'Bury the pain', 'Diegress', 'A new device', 'Psychotic measure'];
  const sanityHelperSongs = ['Resist', 'Simple gestures', 'Reflection', 'A slow return', 'Fuels my hate', 'Gravitate', 'Darker shade of red', "Sanity's helper", 'Somber', 'To become', 'Tripwire', 'Fuels my hate (alt)']; 
 return (
  <View style={{ flex: 1 }}>
      <AppHeader title="Home" />
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
     
        <AlbumCard
          title="Life Elusive"
          content=""
          imageUrl={getImageUrl(forAppImage)}
          songTitles={lifeElusiveSongs}
          navigation={navigation}
        />
        <AlbumCard
          title="Diegress"
          content=""
          imageUrl={getImageUrl(diegressImage)}
          songTitles={diegressSongs}
          navigation={navigation}
        />
        <AlbumCard
          title="Sanity's Helper"
          content=""
          imageUrl={getImageUrl(sanityHelperImage)}
          songTitles={sanityHelperSongs}
          navigation={navigation}
        />
        </View>
    </ScrollView>
  </View>
  );
};


export default Home;
type HomeStackParamList = {
  Home: undefined; 
};
type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;