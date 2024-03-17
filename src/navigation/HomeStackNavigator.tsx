// HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import LyricsScreen from '../screens/Lyrics/LyricsScreen';
import { HomeStackParamList } from './NavigationTypes';



const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="Lyrics" component={LyricsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
