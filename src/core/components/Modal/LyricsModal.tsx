import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { styles } from './LyricsModal.styles';



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
    }
  }, [visible, lyricsData]);

  const handleHintPress = () => {
    setShowHint(true); 
  };

  const resetModalState = () => {
    setSelectedSong(null);
    setShowHint(false);
    // Reset other state variables as needed
  };

  // Effect to reset state when modal is hidden
  React.useEffect(() => {
    if (!visible) {
      resetModalState();
    }
  }, [visible]);

  // Handle closing the modal and resetting state
  const handleNotNow = () => {
    resetModalState();
    onClose(); // Invoke onClose prop after state is reset
  };

  // Handle "Go" action and reset state
  const handleGo = () => {
    if (selectedSong) {
      resetModalState(); // Reset state before invoking onGo
      onGo(selectedSong.albumTitle, selectedSong.songTitle);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        <Text style={styles.questionText}>Do you know what song this line is from?</Text>
        {selectedSong && (
          <>
            <Text style={styles.lyricText}>{selectedSong.lyricLine}</Text>
            {showHint && <Text style={styles.songTitle}>{selectedSong.songTitle}</Text>} 
          </>
        )}
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleHintPress} style={styles.button}>
            <Text>Give up?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotNow} style={styles.button}>
            <Text>Not Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGo} style={styles.button}>
            <Text>Go</Text>
          </TouchableOpacity>
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