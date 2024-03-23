import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
   
        container: {
          // Define your container styles
        },
        wallpaper: {
          // Styles for each wallpaper thumbnail
          width: 100, // Adjust to your preference
          height: 200, // Adjust to your preference
          margin: 5,
        },
        fullscreenContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent background
        },
        fullscreenImage: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        },
        
        dismissIcon: {
          // Styles for the dismiss icon
          width: 25, // Adjust to your preference
          height: 25, // Adjust to your preference
        },
        dismissButton: {
          position: 'absolute',
          top: 40, // Adjust based on your UI preferences
          right: 20, 
          zIndex: 10, // Ensure the button is above the image
          
        },
        downloadButton: {
          position: 'absolute',
          top: 120, // Adjust based on your UI preferences
          right: 20, 
          zIndex: 10, // Ensure the button is above the image
        },
    
  });