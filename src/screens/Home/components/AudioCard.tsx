
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, PermissionsAndroid,Platform, Alert} from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from './AudioCard.styles';
import { Audio } from 'expo-av';
import Button from '../../../core/components/Button/ButtonIcon';
import PlayIcon from '../../../assets/icons/play_arrow_white_24dp.svg'; 
import PauseIcon from '../../../assets/icons/pause_white_24dp.svg';
import DownloadIcon from '../../../assets/icons/file_download_black_24dp.svg';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import forAppImage from '../../../assets/forApp.png';
import trackFile from '../../../assets/audio/DiggingtheGrave.mp3';
const tracks = [
    {
      id: '1',
      title: 'Digging the Grave',
      asset: Asset.fromModule(trackFile),
    },
    {
      id: '2',
      title: 'Digging the Grave also',
      asset: Asset.fromModule(trackFile),
    },
    // Add more tracks as needed
  ];

const AudioCard: React.FC<AudioCardProps> = () => {
    const audioTitle = 'Audio Tracks';
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

// ** Play/Pause Functionality **

  const playPauseTrack = async (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    // Stop the current sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setCurrentPlaying(null);
    }

    if (currentPlaying === trackId) {
      // If the track is currently playing, stop it
      setCurrentPlaying(null);
    } else {
      // Play the new track
      const { sound: newSound } = await Audio.Sound.createAsync(track.asset);
      setSound(newSound);
      await newSound.playAsync();
      setCurrentPlaying(trackId);
    }
  };
//!! Download Functionality
// const handleDownload = async (trackId: string) => {
//   const track = tracks.find((t) => t.id === trackId);
//   if (!track?.asset?.uri) {
//     console.error('Track or track URI not found');
//     return;
//   }

//   // Simplified permission request logic
//   const hasPermission = await requestPermission();

//   if (!hasPermission) {
//     console.log('Storage permission denied');
//     return;
//   }

//   try {
//     const fileUri = `${FileSystem.documentDirectory}${track.title.replace(/\s/g, '')}.mp3`;
//     const { uri } = await FileSystem.downloadAsync(track.asset.uri, fileUri);
//     console.log('Downloaded to', uri);
//   } catch (error) {
//     console.error('Error downloading the file:', error);
//   }
// };

// const requestPermission = async (): Promise<boolean> => {
//   let permission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//   if (permission === RESULTS.GRANTED) {
//     return true;
//   }

//   // Request permission if not already granted
//   permission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//   return permission === RESULTS.GRANTED;
// };

 
//!! Download Functionality
const checkPermissionAndDownload = async () => {
  let hasPermission = true;
  // For Android, request permission at runtime.
  if (Platform.OS === 'android') {
    hasPermission = await requestStoragePermission();
  }

  if (hasPermission) {
    onDownloadPress();
  } else {
    Alert.alert("Storage Permission Denied", "You need to grant storage permissions to download photos.");
  }
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "This app needs access to your storage to save images.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  // No need to request permission for iOS
  return true;
};

const onDownloadPress = async () => {
  try {
    const asset = Asset.fromModule(forAppImage);
    await asset.downloadAsync();

    const localUri = asset.localUri;
    if (!localUri) {
      throw new Error('Asset is not available locally');
    }

    const savedUri = await CameraRoll.save(localUri, { type: 'photo' });
    console.log('Image saved to gallery:', savedUri);

    Alert.alert("Download Success", "Image has been saved to your gallery.");
  } catch (error) {
    console.error('Error saving the image to gallery:', error);
    Alert.alert("Download Error", "There was an error saving the image.");
  }
};




  //**Render item below here */
  const renderItem = ({ item }: { item: Track }) => (
    <View style={styles.itemContainer}>
       <Button 
        title={item.title}
        onPress={() => playPauseTrack(item.id)}
        icon={() => currentPlaying === item.id ? <PauseIcon /> : <PlayIcon />}  
        mode="contained" 
      />
      {/* <Button 
        onPress={() => handleDownload(item.id)} // Replace with actual download function
        icon={() => <DownloadIcon />} 
        mode="text" 
        
      /> */}
      <Button
        onPress={checkPermissionAndDownload}
        icon={() => <DownloadIcon />}
        mode="text"
      />
    </View>
  );

  return (
    <Card style={styles.card}>
        <Text style={styles.title}>Audio Tracks</Text>
       
          <FlatList
            data={tracks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            
          />
       
     
    </Card>
  );
};

export default AudioCard;

interface AudioCardProps {
    isExpanded?: boolean; 
    onToggle?: (songTitle: string) => void;
  }

  interface Track {
    id: string;
    title: string;
    asset?: Asset;  // Make asset optional if some tracks don't have it
    url?: any;      // Consider using a more specific type here if possible
  }