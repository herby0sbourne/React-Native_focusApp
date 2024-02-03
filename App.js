import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

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
