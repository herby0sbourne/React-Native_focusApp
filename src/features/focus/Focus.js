import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";

import RoundButton from "../../components/RoundButton";
import { fontSize, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

const Focus = ({ addSubject }) => {
  const [textChange, setTextChange] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would like to focus on?</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={({ nativeEvent }) => {
              setTextChange(nativeEvent.text);
            }}
            style={{ flex: 1, marginRight: 20 }}
          />
          <RoundButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(textChange);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: "center",
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "bold",
    fontSize: fontSize.lg,
  },
  inputWrapper: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Focus;

Focus.propTypes = {
  addSubject: PropTypes.func.isRequired,
};
