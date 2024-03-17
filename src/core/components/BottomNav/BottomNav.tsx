// BottomNav.tsx
import React from 'react';
import { BottomNavigation, Icon } from 'react-native-paper';
import Home from '../../../screens/Home/Home';
import MediaScreen from '../../../screens/Media/MediaScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '../../../navigation/HomeStackNavigator';
import HomeIcon from '../../../assets/icons/home_black_24dp.svg';
import MediaIcon from '../../../assets/icons/perm_media_black_24dp.svg';
import { BottomTabParamList } from '../../../navigation/NavigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();


const BottomNav: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <HomeIcon width={24} height={24} fill={color} /> // Use the fill prop to apply the color
            ),
          }}
      />
   <Tab.Screen
        name="Media"
        component={MediaScreen} // Replace with your actual MediaScreen component when it's ready
        options={{
          tabBarLabel: 'Media',
          tabBarIcon: ({ color }) => <MediaIcon width={24} height={24} fill={color} />, // Use the fill prop for the SVG icon
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
