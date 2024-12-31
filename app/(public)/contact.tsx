import { Button } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";
import React from "react";

export default function Page() {
  return (
    <Wrapper>
      <ThemedText type="title">Contact US</ThemedText>

      <Link href={"/about"} asChild>
        <Button label="Go to About Us" />
      </Link>
    </Wrapper>
  );
}
