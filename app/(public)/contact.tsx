import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <Wrapper>
      <Text>Contact US</Text>

      <Link href={"/about"} asChild>
        <Button label="Go to About Us" />
      </Link>
    </Wrapper>
  );
}
