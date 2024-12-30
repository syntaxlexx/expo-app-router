import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ThemedText } from "@/components/themed-text";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <Wrapper>
          <ThemedText type="title">Overview Page</ThemedText>
          <ThemedText type="subtitle">This is crazy!</ThemedText>

          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                A simple card with a title and description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-base">Select an action below</Text>
            </CardContent>
            <CardFooter>
              <Link href="/about" asChild>
                <Button label="About Us" />
              </Link>
            </CardFooter>
          </Card>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
}
