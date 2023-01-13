import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Pressable onPress={pickImage}>
        <Text>Upload Image</Text>
      </Pressable>
    </View>
  );
}
