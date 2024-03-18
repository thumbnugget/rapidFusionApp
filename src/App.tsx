import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import theme from './core/themes/themes';
import { LyricsProvider } from './context/LyricsContext'

const App = () => {
  return (
    <LyricsProvider>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </PaperProvider>
    </LyricsProvider>
  );
};

export default App;
