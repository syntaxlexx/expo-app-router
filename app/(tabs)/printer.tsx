import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet } from "react-native";

const Printer = () => {
  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Printer Testing</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Printer;
