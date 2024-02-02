import { StyleSheet, View } from "react-native";
import RoundButton from "../../components/RoundButton";

const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingBtn}>
        <RoundButton title="10" size={75} onPress={() => onChangeTime(10)} />
      </View>
      <View style={styles.timingBtn}>
        <RoundButton title="15" size={75} onPress={() => onChangeTime(15)} />
      </View>
      <View style={styles.timingBtn}>
        <RoundButton title="20" size={75} onPress={() => onChangeTime(20)} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  timingBtn: {
    flex: 1,
    alignItems: "center",
  },
});

export default Timing;
