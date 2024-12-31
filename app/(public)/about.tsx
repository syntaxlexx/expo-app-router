import { Button } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";
import React from "react";

export default function Page() {
  return (
    <Wrapper>
      <ThemedText type="title">About US</ThemedText>

      <Link href={"/contact"} asChild>
        <Button label=" Go to Contact Us" />
      </Link>
    </Wrapper>
  );
}
