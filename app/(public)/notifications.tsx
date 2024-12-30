import { Wrapper } from "@/components/wrapper";
import React from "react";
import { Text } from "react-native";
import * as Notifications from "expo-notifications";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemedText } from "@/components/ui/themed-text";
import { Button } from "@/components/ui/button";

export default function Page() {
  const showNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
  };

  return (
    <Wrapper bg className="h-full">
      <ThemedText type="title">Notifications</ThemedText>

      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemedText>Trigger a notification</ThemedText>
        </CardContent>
        <CardFooter>
          <Button label="Send Notification" onPress={showNotification}></Button>
        </CardFooter>
      </Card>
    </Wrapper>
  );
}
