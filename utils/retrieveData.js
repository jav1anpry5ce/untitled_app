import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function retrieveData(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
}
