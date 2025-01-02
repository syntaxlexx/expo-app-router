import { api } from "@/app/api";
import AlertError from "@/components/alert-error";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Wrapper } from "@/components/wrapper";
import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { ActivityIndicator, Button, View } from "react-native";
import Animated from "react-native-reanimated";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AnimatedPressable } from "@/components/animated-pressable";
import { BackButton } from "@/components/back-button";

const backgroundColor = "rgba(255,255,255,0.2)";
const borderColor = "rgba(255,255,255,0.5)";

const hero = {
  height: 250,
};

export default function Page() {
  const { id, image } = useLocalSearchParams();

  const {
    data: post,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => api.posts.show(Number(id)),
  });

  return (
    <>
      <Stack.Screen
        name="posts/[id]"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: (props) => (
            <View
              className="rounded-full flex items-center justify-center border"
              style={{
                width: 30,
                height: 30,
                backgroundColor,
                borderColor,
              }}
              {...props}>
              <AnimatedPressable onPress={() => router.back()}>
                <BackButton color="white" />
              </AnimatedPressable>
            </View>
          ),
          headerRight: () => {
            return (
              <View className="flex flex-row gap-4 items-center justify-end">
                <View
                  className="rounded-full flex items-center justify-center border"
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor,
                    borderColor,
                  }}>
                  <AnimatedPressable
                    onPress={() => {
                      console.log("share");
                    }}>
                    <EvilIcons name="share-apple" size={24} color="white" />
                  </AnimatedPressable>
                </View>
              </View>
            );
          },
        }}
      />

      <ThemedView className="flex-1">
        <View className="relative w-full" style={{ height: hero.height }}>
          <View className="absolute inset-0 top-0 bottom-0 right-0 left-0">
            <Animated.Image
              src={String(post?.image ?? image)}
              className="w-full bg-cover bg-center"
              style={{ height: hero.height }}
              alt="Post Image"
              sharedTransitionTag="post-image"
            />
          </View>
        </View>

        {isLoading && (
          <View className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <ActivityIndicator size={40} />
          </View>
        )}

        {error && (
          <Wrapper>
            <AlertError
              message={error.message}
              hasRetry
              isLoading={isLoading}
              onPressRetry={refetch}
            />
          </Wrapper>
        )}

        {post && (
          <View>
            <Wrapper>
              <ThemedText type="subtitle">{post.title}</ThemedText>
            </Wrapper>
          </View>
        )}
      </ThemedView>
    </>
  );
}
