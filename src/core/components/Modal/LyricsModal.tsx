import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { styles } from './LyricsModal.styles';
import Button from '../Button/Button';



const LyricsModal: React.FC<LyricsModalProps> = ({ visible, onClose, onGo, lyricsData }) => {
  const [selectedLine, setSelectedLine] = React.useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = React.useState<string | null>(null);
  const [showHint, setShowHint] = React.useState<boolean>(false);
  const [selectedSong, setSelectedSong] = React.useState<{ 
    albumTitle: string; 
    songTitle: string; 
    lyricLine: string; // Use 'lyricLine' instead of 'firstLine'
  } | null>(null);
  
  React.useEffect(() => {
    if (visible) {
        setShowHint(false);
      const albumTitles = Object.keys(lyricsData);
      const randomAlbumTitle = albumTitles[Math.floor(Math.random() * albumTitles.length)];
      const songTitles = Object.keys(lyricsData[randomAlbumTitle]);
      const randomSongTitle = songTitles[Math.floor(Math.random() * songTitles.length)];

      // Fetching the lyrics for the randomly selected song and splitting it into lines
      const lyricsLines = lyricsData[randomAlbumTitle][randomSongTitle].split('\n');
      // Selecting a random line from the lyrics lines
      const randomLine = lyricsLines[Math.floor(Math.random() * lyricsLines.length)];

      setSelectedSong({
        albumTitle: randomAlbumTitle,
        songTitle: randomSongTitle,
        lyricLine: randomLine, // Store the selected line
      });
      console.log(`Modal opened with song: ${randomSongTitle} from album: ${randomAlbumTitle}`);
   
    }
  }, [visible, lyricsData]);

  const handleHintPress = () => {
    setShowHint(true); 
    console.log('Hint button pressed.');
  };

  const resetModalState = () => {
    setSelectedSong(null);
    setShowHint(false);
    console.log('Modal state reset.');
  }

  // Effect to reset state when modal is hidden
  React.useEffect(() => {
    if (!visible) {
      resetModalState();
    }
  }, [visible]);

  // Handle closing the modal and resetting state
  const handleNotNow = () => {
    console.log('Not Now button pressed.');
    resetModalState();
    onClose(); 
  };

  // Handle "Go" action and reset state
  const handleGo = () => {
    console.log('Go button pressed with song: ' + (selectedSong ? selectedSong.songTitle : 'No song selected'));
    
    if (selectedSong) {
      onGo(selectedSong.albumTitle, selectedSong.songTitle);
      resetModalState(); 
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>Do you know what song this line is from?</Text>
        {selectedSong && (
          <>
            <Text style={styles.lyricText}>{selectedSong.lyricLine}</Text>
            {showHint && <Text style={styles.songTitle}>{selectedSong.songTitle}</Text>} 
          </>
        )}
 </ScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={handleHintPress} mode="contained"  title="Give up?" style={styles.button}/>
       
          <Button onPress={handleNotNow} title="Not Now" style={styles.button}/>
        
          <Button onPress={handleGo} title="Go" style={styles.button}/>
         
        </View>
      </View>
    </Modal>
  );
};
export default LyricsModal;


interface LyricsModalProps {
    visible: boolean;
    onClose: () => void;
    onGo: (albumTitle: string, songTitle?: string) => void; 
    lyricsData: AlbumLyrics;
  }

  type AlbumLyrics = {
    [albumTitle: string]: {
      [songTitle: string]: string; // Assuming each song is a string of lyrics
    };
  };