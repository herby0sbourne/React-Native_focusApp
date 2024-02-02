import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

import Focus from "./src/features/focus/Focus";
import Timer from "./src/features/timer/Timer";

import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState("grading");

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} />
        ) : (
          <Focus addSubject={setFocusSubject} />
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
