// GalleryComponent.tsx
import React, { useState } from 'react';
import { View, Image, StyleSheet, Modal, TouchableOpacity, FlatList, ImageSourcePropType, Alert } from 'react-native';
import { styles } from './GalleryComponent.styles'; // Assuming you've created this
import Image1 from '../../../assets/wallpapers/DiegressCoverScan1400.png';
import Image2 from '../../../assets/wallpapers/SanitysHelperCoverScan1400.png';
import Image3 from '../../../assets/wallpapers/forApp.png';
import Image4 from '../../../assets/wallpapers/ic_launcher.png';
import CancelIcon from '../../../assets/icons/cancel_white_24dp.svg';
import DownloadIcon from '../../../assets/icons/file_download_white_24dp.svg';
import Svg, { SvgUri } from 'react-native-svg';
import Button from '../../../core/components/Button/ButtonIcon';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Asset } from 'expo-asset';
import { Wallpaper } from '../../../constants/globalTypes';


const GalleryComponent: React.FC<GalleryComponentProps> = ({ wallpapers }) => {
  const [selectedImage, setSelectedImage] = useState<Wallpaper | null>(null);

  
  const renderWallpaper = ({ item }: { item: Wallpaper }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item)}>
      <Image source={item.source} style={styles.wallpaper} />
    </TouchableOpacity>
  );

  const onDownloadPress = async (source: ImageSourcePropType) => {
    try {
      let localUri: string | undefined;
  
      // If 'source' is a number, it's a local image loaded via 'require'
      if (typeof source === 'number') {
        const asset = Asset.fromModule(source);
        await asset.downloadAsync();
        
        // Ensure asset.localUri is not null before assigning
        if (asset.localUri !== null) {
          localUri = asset.localUri;
        } else {
          throw new Error('Local URI for asset is null');
        }
      } else if ('uri' in source && typeof source.uri === 'string') {
        // If 'source' has a 'uri' property, it's a remote image
        localUri = source.uri;
      }
      
      if (!localUri) {
        throw new Error('Image source is not valid or not available locally');
      }
  
      const savedUri = await CameraRoll.save(localUri, { type: 'photo' });
      console.log('Image saved to gallery:', savedUri);
      Alert.alert("Download Success", "Image has been saved to your gallery.");
    } catch (error) {
      console.error('Error saving the image to gallery:', error);
      Alert.alert("Download Error", "There was an error saving the image.");
    }
  };
  return (
    <View style={styles.container}>
    <FlatList
      data={wallpapers}
      renderItem={renderWallpaper}
      keyExtractor={(item) => item.id}
      numColumns={3}
      nestedScrollEnabled={true} // Adjust based on your layout preference
    />
    {selectedImage && (
      <Modal visible={true} transparent={true}>
        <View style={styles.fullscreenContainer}>
         
          <Button style={styles.dismissButton}
       onPress={() => setSelectedImage(null)}
        icon={() => <CancelIcon width={30} height={30} />}
        mode="text"
      />
      <Button style={styles.downloadButton}
     onPress={() => selectedImage && onDownloadPress(selectedImage.source)}
        icon={() => <DownloadIcon width={30} height={30} />}
        mode="text"
      />
          <Image source={selectedImage.source} style={styles.fullscreenImage} />
        </View>
      </Modal>
    )}
  </View>
);
};

export default GalleryComponent;

interface GalleryComponentProps {
    wallpapers: Wallpaper[];
  }
