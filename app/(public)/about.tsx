import { Button } from "@/components/button";
import { Wrapper } from "@/components/wrapper";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <Wrapper>
      <Text>About Us</Text>
      <Link href={"/contact"} asChild>
        <Button label=" Go to Contact Us" />
      </Link>
    </Wrapper>
  );
}
