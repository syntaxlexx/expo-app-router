import { Wrapper } from "@/components/wrapper";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import type { DeviceInfo } from "react-native-esc-pos-printer";

export default function Page() {
  const { printer }: { printer: DeviceInfo } = useLocalSearchParams();

  return (
    <Wrapper>
      <Text>View Printer</Text>

      <Text>Printer: {printer}</Text>
    </Wrapper>
  );
}
