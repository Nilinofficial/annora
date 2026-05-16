
import AllPhotos from "@/components/gallery/AllPhotos";
import PhotoViewer from "@/components/photoViewer/PhotoViewer";
import { useThemeColor } from "@/hooks/use-theme-color";
import { deletePhoto, sharePhoto } from "@/utils/photoActions";
import { Image } from 'expo-image';
import * as MediaLibrary from "expo-media-library";
import { MoreVertical } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState<any>([]);
  const [after, setAfter] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const textColor = useThemeColor({}, "text");

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
        <View style={styles.leftSection}>
          <Image
            contentFit="contain"
            source={require("../../assets/images/Annora.png")}
            style={styles.logo}
          />

          <Text
            style={{
              color: textColor,
              fontSize: 28,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            Annora
          </Text>
        </View>

        <MoreVertical color={textColor} size={24} />
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
    padding: 4,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 50,
    height: 40,
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
