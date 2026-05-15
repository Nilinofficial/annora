import { Image } from 'expo-image';
import React from "react";
import {
  Dimensions,
  FlatList,

  Pressable
} from "react-native";

const AllPhotos = ({ photos, onPressPhoto }: any) => {
  const gap = 4;
  const size = (Dimensions.get("window").width - gap * 4) / 3;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressPhoto(item)}>
          <Image
            source={{ uri: item.uri }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={100}
            style={{
              width: size,
              height: size,
              margin: gap / 2,
              borderRadius: 8,
            }}
          />
        </Pressable>
      )}
    />
  );
};

export default AllPhotos;


