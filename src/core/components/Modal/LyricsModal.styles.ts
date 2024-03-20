import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 60,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
        songTitle: {
            fontSize: 20,
            marginBottom: 15,
            textAlign: "center",
            color: '#000',
        },
      lyricText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#000'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        // marginHorizontal: 10,
      },
      button: {
       
        // backgroundColor: "#2196F3",
        // marginHorizontal: 10,
      },
        questionText: {
            fontSize: 24,
            marginBottom: 15,
            textAlign: "center",
            color: '#000'
        },
        scrollView: {
          maxHeight: '80%', 
        },
  });