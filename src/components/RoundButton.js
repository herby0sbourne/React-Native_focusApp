import { StyleSheet, Text, TouchableOpacity } from "react-native";

const RoundButton = ({ extraStyle = {}, textStyle = {}, size = 125, ...props }) => {
  return (
    <TouchableOpacity style={[styles.radius(size), extraStyle]} onPress={props.onPress}>
      <Text style={[styles.text(size), textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radius: (size) => ({
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  }),
  text: (size) => ({
    color: "white",
    fontSize: size / 3,
  }),
});

export default RoundButton;
