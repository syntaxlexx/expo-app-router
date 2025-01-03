import { Wrapper } from "@/components/wrapper";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function Page() {
  const { printer } = useLocalSearchParams();

  return (
    <Wrapper>
      <Text>View Printer</Text>

      <Text>Printer: {printer}</Text>
    </Wrapper>
  );
}
