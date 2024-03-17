import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
      // Center title for Android
      ...(Platform.OS === 'android' && {
        justifyContent: 'center',
        alignItems: 'center',
      }),
    },
    title: {
        textAlign: 'center',
      },
    
    placeholder: {
        width: 48, // Adjust this width to match the size of your icons
        height: '100%',
        opacity: 0, // Make the placeholder invisible
      },
   
  });