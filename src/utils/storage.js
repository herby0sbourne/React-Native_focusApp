import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFocusHistory = async () => {
  try {
    await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
  } catch (err) {
    console.log(err);
  }
};

export const getFocusHistory = async () => {
  try {
    const history = await AsyncStorage.getItem("focusHistory");

    if (history && JSON.parse(history).length) {
      setFocusHistory(JSON.parse(history));
    }
  } catch (err) {
    console.log(err);
  }
};
