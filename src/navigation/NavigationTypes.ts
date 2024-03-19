// NavigationTypes.ts
export type HomeStackParamList = {
  HomeScreen: undefined;  // The main screen showing albums
  Lyrics: {
    albumTitle: string;
   
  };
};

export type BottomTabParamList = {
  HomeTab: undefined;  
  Media: undefined; 
  
};
export type RootStackParamList = {
  BottomTabs: undefined; 
};
