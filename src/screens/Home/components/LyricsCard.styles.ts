import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        // Add any additional styling for the card
      },
      container: {
        padding: 10,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
      },
      lyrics: {
        fontSize: 19,
        lineHeight: 24, // Adjust line height for readability
        // Any additional styling for the lyrics text
      },
      // Add more styles as needed, for example:
      verse: {
        marginBottom: 10,
      },
      chorus: {
        fontWeight: 'bold',
        // Additional chorus styling
      },
      lyricsContainer: {
        marginTop: 10,
        // Style the container that holds all lyrics lines
      },
      lyricsLine: {
        fontSize: 16,
        lineHeight: 24, // Adjust for readability
        // Additional styling for each lyrics line
      },
      titleContainer: {
        // Container for the title, might include padding or alignment
      },
  });