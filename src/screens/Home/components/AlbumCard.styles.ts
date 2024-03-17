import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowOpacity: 0.25,
      shadowRadius: 5,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      elevation: 5, // for Android
      padding: 16,
      margin: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 4,
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    songList: {
      paddingTop: 10,
      // Add styles for the song list container
    },
    songTitle: {
      fontSize: 16,
      // Add styles for individual song titles
    },
    
  });