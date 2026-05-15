
import AllPhotos from "@/components/gallery/AllPhotos";
import PhotoViewer from "@/components/photoViewer/PhotoViewer";
import { deletePhoto, sharePhoto } from "@/utils/photoActions";

import { Image } from 'expo-image';
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState<any>([]);
  const [after, setAfter] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const loadPhotos = async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }

    if (!hasNextPage) return;
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 100,
      after,
      sortBy: ["creationTime"],
    });

    setPhotos((prev: any) => [...prev, ...media.assets]);
    setAfter(media.endCursor);
    setHasNextPage(media.hasNextPage);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleDelete = async () => {
    await deletePhoto(selectedPhoto, () => {
      setPhotos((prev: any) =>
        prev.filter(
          (p: any) => p.id !== selectedPhoto.id
        )
      );

      setSelectedPhoto(null);
    });
  };

  const handleShare = async () => {
    await sharePhoto(selectedPhoto);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          contentFit="contain"
          source={require("../../assets/images/annora.png")}
          style={styles.logo}
        />
      </View>

      <AllPhotos photos={photos} onPressPhoto={setSelectedPhoto} />

      <PhotoViewer
        photos={photos}
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onDelete={handleDelete}
        onShare={handleShare}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  closeArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "100%",
    height: "80%",
  },
});
