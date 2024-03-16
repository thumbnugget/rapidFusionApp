import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
   
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        elevation: 5, // Android
        margin: 16,
        width: '90%',
        
      },
      
      content: {
        marginVertical: 5,
        marginHorizontal: 5,
        
      },
      cardImage: {
        width: '100%',
        height: 340,
        borderRadius: 0,
        marginBottom: 5,
        
        
      },
  });