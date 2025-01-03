import React from "react";
import type { DeviceInfo } from "react-native-esc-pos-printer";
import { FlatList, Pressable, Text, View } from "react-native";

export const PrintersList = ({ printers, onPress }) => {
  const renderItem = ({ item }) => {
    return <PrinterItem printer={item} onPress={onPress} />;
  };

  return (
    <View className="overflow-hidden border">
      <FlatList data={printers} renderItem={renderItem} />
    </View>
  );
};

interface PrinterItemProps {
  printer: DeviceInfo;
  onPress: (printer: DeviceInfo) => void;
}

const PrinterItem = ({ printer, onPress }: PrinterItemProps) => {
  return (
    <Pressable
      className="border border-b px-4 py-2"
      onPress={() => onPress(printer)}>
      <Text className="font-semibold">{printer.deviceName}</Text>
      <Text className="font-medium">Target: {printer.target}</Text>
      <Text className="">IP: {printer.ipAddress}</Text>
    </Pressable>
  );
};
