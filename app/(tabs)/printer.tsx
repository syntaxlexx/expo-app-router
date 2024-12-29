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
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Printer = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <ThemedText type="title">Printer Testing</ThemedText>
          <ThemedText type="subtitle">
            Let's test out the ECS/POS printer
          </ThemedText>

          {new Array(10).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Accelerate UI</CardTitle>
                <CardDescription>
                  Enter a new development experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-base">
                  Sleek, easy to use components to build your next app faster.
                </Text>
              </CardContent>
              <CardFooter>
                <Button label="Click Me" variant={"secondary"}></Button>
              </CardFooter>
            </Card>
          ))}
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Printer;
