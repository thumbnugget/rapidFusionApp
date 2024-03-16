// src/themes/theme.ts
import { DefaultTheme } from 'react-native-paper';
import colors from './colors';
import fonts from './fonts';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,  // Your custom colors
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...fonts,  // Your custom fonts
  },
};

export default theme;
