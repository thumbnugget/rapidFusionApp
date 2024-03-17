import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import LyricsScreen from '../screens/Lyrics/LyricsScreen';
import { RootStackParamList } from './NavigationTypes';
import BottomNav from '../core/components/BottomNav/BottomNav'
// Import other screens as needed

// const Stack = createStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomNav} />
      {/* <Stack.Screen name="Lyrics" component={LyricsScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
