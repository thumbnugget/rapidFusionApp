import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import LyricsScreen from '../screens/Lyrics/LyricsScreen';
// Import other screens as needed

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Lyrics" component={LyricsScreen} />
    
     
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
