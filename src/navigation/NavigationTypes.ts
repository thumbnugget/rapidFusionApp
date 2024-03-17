// NavigationTypes.ts
export type HomeStackParamList = {
  HomeScreen: undefined;  // The main screen showing albums
  Lyrics: { albumTitle: string };  // The screen showing lyrics for a selected album
};

export type BottomTabParamList = {
  HomeTab: undefined;  // The tab that contains the HomeStackNavigator
  Media: undefined;  // The tab for the Media screen (or placeholder for now)
};
