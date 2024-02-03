import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Focus from "./src/features/focus/Focus";
import Timer from "./src/features/timer/Timer";

import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
import FocusHistory from "./src/features/focus/FocusHistory";

const STATUSES = {
  COMPLETED: 1,
  CANCELED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const focusHistoryWithState = (subject, status) => {
    setFocusHistory((prevFocus) => {
      return [...prevFocus, { subject, status }];
    });
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const getFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              focusHistoryWithState(focusSubject, STATUSES.COMPLETED);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              focusHistoryWithState(focusSubject, STATUSES.CANCELED);
              setFocusSubject(null);
            }}
          />
        ) : (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={() => setFocusHistory([])} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.select({ android: spacing.md, ios: spacing.lg }),
  },
});
