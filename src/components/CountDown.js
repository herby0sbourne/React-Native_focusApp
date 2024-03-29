import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../utils/colors";
import { fontSize, spacing } from "../utils/sizes";

const minutesToMills = (minutes) => minutes * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const CountDown = ({ minutes = 0.2, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMills(null));
  const interval = React.useRef(null);

  const countDownTimer = () => {
    let count;

    setMillis((currentTime) => {
      if (currentTime === 0) {
        // onEnd();
        clearInterval(interval.current);
        return currentTime;
      }

      const timeLeft = currentTime - 1000;
      count = currentTime - 1000;

      return timeLeft;
    });

    // onProgress(count / minutesToMills(minutes));
    // !count && clearInterval(interval.current);
  };

  useEffect(() => {
    onProgress(millis / minutesToMills(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMills(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }

    interval.current = setInterval(countDownTimer, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    color: colors.textPrimary,
    padding: spacing.lg,
    backgroundColor: "rgba(94,132,226,0.3)",
  },
});

export default CountDown;
