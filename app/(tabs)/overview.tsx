import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { Link, LinkProps, Router } from "expo-router";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AnimatedPressable } from "@/components/animated-pressable";

type PageItem = {
  title: string;
  href: LinkProps["href"];
};

const pages: PageItem[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Notifications",
    href: "/notifications",
  },
];

export default function Page() {
  return (
    <SafeAreaView className="bg-background h-full">
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

        <Card>
          <CardContent className="px-5 py-3">
            <FlatList
              data={pages}
              renderItem={({ item, index }) => (
                <View>
                  <Link href={item.href} asChild key={index}>
                    <AnimatedPressable className="flex flex-row justify-between items-center py-4">
                      <ThemedText type="defaultSemiBold">
                        {item.title}
                      </ThemedText>
                      <View className="flex-shrink">
                        <Ionicons
                          name="arrow-forward"
                          size={24}
                          color="black"
                        />
                      </View>
                    </AnimatedPressable>
                  </Link>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View className="h-px bg-secondary" />
              )}
            />
          </CardContent>
        </Card>
      </Wrapper>
    </SafeAreaView>
  );
}
