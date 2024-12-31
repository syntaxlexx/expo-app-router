import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserHasOnboarded = async (value: boolean) => {
  try {
    await AsyncStorage.setItem("userHasOnboarded", JSON.stringify(value));
    console.log("Value saved successfully.");
  } catch (error) {
    console.error("Failed to save the value:", error);
  }
};

export const getUserHasOnboarded = async () => {
  try {
    const value = await AsyncStorage.getItem("userHasOnboarded");
    return value !== null ? JSON.parse(value) : null; // Parse the value back to a boolean
  } catch (error) {
    console.error("Failed to fetch the value:", error);
    return null;
  }
};
