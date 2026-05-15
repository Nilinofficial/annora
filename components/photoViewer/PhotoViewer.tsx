import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

import ViewerFooter from './ViewerFooter';
import ViewerHeader from './ViewerHeader';

type Props = {
  photos: any[];
  selectedPhoto: any;
  onClose: () => void;
  onDelete: () => void;
  onShare: () => void;
};

const PhotoViewer = ({
  photos,
  selectedPhoto,
  onClose,
  onDelete,
  onShare,
}: Props) => {
  const selectedIndex = photos.findIndex(
    (p) => p.id === selectedPhoto?.id
  );

  const currentPhoto =
    selectedIndex >= 0
      ? photos[selectedIndex]
      : null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <ImageViewing
        images={photos.map((photo: any) => ({
          uri: photo.uri,
        }))}
        imageIndex={selectedIndex}
        visible={!!selectedPhoto}
        onRequestClose={onClose}
        HeaderComponent={() => (
          <ViewerHeader photo={currentPhoto} />
        )}
        FooterComponent={() => (
          <ViewerFooter
            onDelete={onDelete}
            onShare={onShare}
          />
        )}
      />
    </View>
  );
};

export default PhotoViewer;