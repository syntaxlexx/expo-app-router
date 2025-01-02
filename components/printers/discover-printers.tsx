import React, { memo } from "react";
import { Text, View } from "react-native";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";
import { Button } from "../button";
import { PrintersList } from "./printers-list";

const DiscoverPrinters = memo(() => {
  const { start, printerError, isDiscovering, printers } =
    usePrintersDiscovery();

  return (
    <View>
      <Text>Printers</Text>

      {isDiscovering && <Text>Discovering printers...</Text>}
      {printerError && <Text>ERROR!! {printerError} </Text>}

      <Text>
        {printers?.length} {printers?.length === 1 ? "printer" : "printers"}{" "}
        found.
      </Text>

      <Button
        label={isDiscovering ? "Stop Discovering" : "Start Discovering"}
        onPress={start}
      />

      <PrintersList
        printers={printers}
        onPress={(v) => {
          console.log("onPress: ", v);
        }}
      />
    </View>
  );
});

export default DiscoverPrinters;
