import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontSize, spacing } from "../../utils/sizes";
import RoundButton from "../../components/RoundButton";

const HistoryItem = ({ item, idx }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

const FocusHistory = ({ focusHistory = [], onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}>Things we've focused on</Text>
          <FlatList
            // style={{ flex: 1 }}
            // contentContainerStyle={{ flex: 1, alignItems: "center" }}
            data={focusHistory}
            renderItem={HistoryItem}
            keyExtractor={(item) => item.subject}
          />
          <View style={styles.clearBtn}>
            <RoundButton size={75} title="Clear" onPress={clearHistory} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status === 1 ? "green" : "red",
    fontSize: 20,
    marginBottom: 5,
  }),
  title: {
    color: "white",
    fontSize: fontSize.lg,
    marginBottom: 10,
  },
  clearBtn: {
    alignItems: "center",
    padding: spacing.md,
  },
});
export default FocusHistory;
