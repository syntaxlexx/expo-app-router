import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Printer = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <Wrapper>
          <ThemedText type="title">Printer Testing</ThemedText>
          <ThemedText type="subtitle">
            Let's test out the ECS/POS printer
          </ThemedText>

          <Card>
            <CardHeader>
              <CardTitle>Simple Printout</CardTitle>
              <CardDescription>
                Testing out POS Printer with simple printout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-base">Select an action below</Text>
            </CardContent>
            <CardFooter>
              <Link href="/discover" asChild>
                <Button label="View Printers" />
              </Link>
              <Link href="/about" asChild>
                <Button label="About Us" variant={"ghost"} />
              </Link>
            </CardFooter>
          </Card>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Printer;
