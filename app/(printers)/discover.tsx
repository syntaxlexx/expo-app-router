import { Button } from "@/components/button";
import DiscoverPrinters from "@/components/printers/discover-printers";
import { Wrapper } from "@/components/wrapper";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <Wrapper>
      <Text>Discover</Text>

      <DiscoverPrinters />
    </Wrapper>
  );
}
