
// import React, { useState, useCallback, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity ,Platform, PermissionsAndroid} from 'react-native';
// // import { IconButton } from 'react-native-paper';
// import { Card } from 'react-native-paper';
// import { styles } from './AudioCard.styles';
// import { Audio } from 'expo-av';
// import Button from '../../../core/components/Button/ButtonIcon';
// import AudioPlayer from '../../../core/components/AudioPlayer/AudioPlayer';
// import PlayIcon from '../../../assets/icons/play_arrow_white_24dp.svg'; // Assuming you have a play icon
// import PauseIcon from '../../../assets/icons/pause_white_24dp.svg';
// import DownloadIcon from '../../../assets/icons/file_download_black_24dp.svg';
// import downloadAndSaveFile from '../../../hooks/downloadAndSaveFile';
// import {requestPermission} from '../../../services/permissions';
// import * as MediaLibrary from 'expo-media-library';
// import { Asset } from 'expo-asset';
// import * as FileSystem from 'expo-file-system';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import trackFile from '../../../assets/audio/DiggingtheGrave.mp3';
// const tracks = [
//     {
//       id: '1',
//       title: 'Digging the Grave',
//       asset: Asset.fromModule(trackFile),
//     },
//     {
//       id: '2',
//       title: 'Digging the Grave also',
//       asset: Asset.fromModule(trackFile),
//     },
//     // Add more tracks as needed
//   ];

  


// const AudioCard: React.FC<AudioCardProps> = () => {
//     const audioTitle = 'Audio Tracks';
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync(); 
//         }
//       : undefined;
//   }, [sound]);

//   const handlePress = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const playPauseTrack = async (trackId: string) => {
//     const track = tracks.find(t => t.id === trackId);
//     if (!track) return;

//     // Stop the current sound
//     if (sound) {
//       await sound.unloadAsync();
//       setSound(null);
//       setCurrentPlaying(null);
//     }

//     if (currentPlaying === trackId) {
//       // If the track is currently playing, stop it
//       setCurrentPlaying(null);
//     } else {
//       // Play the new track
//       const { sound: newSound } = await Audio.Sound.createAsync(track.asset);
//       setSound(newSound);
//       await newSound.playAsync();
//       setCurrentPlaying(trackId);
//     }
//   };
 

//   // const downloadAndSaveFile = async (asset: Asset, fileName: string): Promise<void> => {
//   //   try {
//   //     // Ensure the asset is loaded
//   //     await asset.downloadAsync();
  
//   //     // Check if localUri is not null
//   //     if (asset.localUri) {
//   //       // Save the asset to the media library; this will convert it to a type the MediaLibrary understands
//   //       const mediaLibraryAsset = await MediaLibrary.createAssetAsync(asset.localUri);
  
//   //       // Create or get the album and add the media library asset to it
//   //       const album = await MediaLibrary.getAlbumAsync('YourAlbumName');
//   //       if (album) {
//   //         await MediaLibrary.addAssetsToAlbumAsync([mediaLibraryAsset], album, false);
//   //       } else {
//   //         await MediaLibrary.createAlbumAsync('YourAlbumName', mediaLibraryAsset, false);
//   //       }
  
//   //       console.log('File saved to album:', 'YourAlbumName');
//   //     } else {
//   //       // Handle the case where localUri is null
//   //       console.error('Asset localUri is null, cannot save to album');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error downloading or saving file:', error);
//   //   }
//   // };

  
//   const downloadAndSaveFile = async (asset: Asset, fileName: string): Promise<void> => {
//     try {
//       // Ensure the asset is loaded
//       await asset.downloadAsync();
  
//       // Check if localUri is not null
//       if (asset.localUri) {
//         if (Platform.OS === 'android') {
//           const permission: PermissionsAndroid.PermissionStatus = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//             {
//               title: 'Storage Permission Required',
//               message: 'This app needs access to your storage to download and save files.',
//               buttonPositive: 'OK', // Required for Rationale type
//             },
//           );
  
//           if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Storage permission not granted');
//             return;
//           }
//         }
  
//         // Use the correct method for saving the image/video
//         const savedUri: string | undefined = await (CameraRoll as any).save(asset.localUri, { type: 'photo', album: 'YourAlbumName' });

//         if (savedUri) {
//           console.log('File saved to album:', savedUri);
//         }
//       } else {
//         // Handle the case where localUri is null
//         console.error('Asset localUri is null, cannot save to album');
//       }
//     } catch (error) {
//       console.error('Error downloading or saving file:', error);
//     }
//   };

//   const handleDownload = async (trackId: string) => {
//     const track = tracks.find(t => t.id === trackId);
//     if (!track) return;

//     // Request permissions via Expo's MediaLibrary
//     const permissionResponse = await MediaLibrary.requestPermissionsAsync();
//     if (permissionResponse.status !== 'granted') {
//       console.log('Permission denied');
//       return;
//     }

//     // Download and save the file
//     await downloadAndSaveFile(track.asset, `${track.title}.mp3`);
//   };
//   const renderItem = ({ item }: { item: Track }) => (
//     <View style={styles.itemContainer}>
//        <Button 
//         title={item.title}
//         onPress={() => playPauseTrack(item.id)}
//         icon={() => currentPlaying === item.id ? <PauseIcon /> : <PlayIcon />} // Pass a function that returns the icon component
//         mode="contained" 
//       />
//       <Button 
//         onPress={() => handleDownload(item.id)} // Replace with actual download function
//         icon={() => <DownloadIcon />} // Replace with actual music note icon component
//         mode="text" 
        
//       />
//     </View>
//   );

//   return (
//     <Card style={styles.card}>
//         <Text style={styles.title}>Audio Tracks</Text>
       
//           <FlatList
//             data={tracks}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//           />
       
     
//     </Card>
//   );
// };

// export default AudioCard;

// interface AudioCardProps {
//     isExpanded?: boolean; 
//     onToggle?: (songTitle: string) => void;
//   }

//   interface Track {
//     id: string;
//     title: string;
//     asset?: Asset;  // Make asset optional if some tracks don't have it
//     url?: any;      // Consider using a more specific type here if possible
//   }