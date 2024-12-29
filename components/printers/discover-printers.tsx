import React, { memo } from "react";
import { Text, View } from "react-native";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";

const DiscoverPrinters = memo(() => {
  const { start, printerError, isDiscovering, printers } =
    usePrintersDiscovery();

  return (
    <View>
      <Text>Printers</Text>
    </View>
  );
});

export default DiscoverPrinters;
