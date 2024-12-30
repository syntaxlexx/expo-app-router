import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";

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
