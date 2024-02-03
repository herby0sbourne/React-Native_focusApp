import { useState } from "react";
import { ProgressBar } from "react-native-paper";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
// import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";

import Timing from "./Timing";
import CountDown from "../../components/CountDown";
import RoundButton from "../../components/RoundButton";

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setminutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    if (isNaN(progress)) return;

    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }

    if (Platform.OS === "android") {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setminutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (mins) => {
    setminutes(mins);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <ProgressBar
          progress={progress}
          color="#5e84e2"
          style={{ height: 5, marginTop: spacing.sm }}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.btnWrapper}>
        {isStarted ? (
          <RoundButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearBtn}>
        <RoundButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
  },
  title: {
    color: colors.textPrimary,
    textAlign: "center",
  },
  task: {
    color: colors.textPrimary,
    fontWeight: "bold",
    textAlign: "center",
  },
  countDown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtn: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});

export default Timer;

{
  /* {isStarted && <RoundButton title="pause" onPress={() => setIsStarted(false)} />}
      {!isStarted && <RoundButton title="start" onPress={() => setIsStarted(true)} />} */
}
