import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Printer = () => {
  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Printer Testing</ThemedText>
        <Button label="Click Me"></Button>
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
