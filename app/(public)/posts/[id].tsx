import { api } from "@/app/api";
import AlertError from "@/components/alert-error";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Wrapper } from "@/components/wrapper";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import Animated from "react-native-reanimated";

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
          <AlertError
            message={error.message}
            hasRetry
            isLoading={isLoading}
            onPressRetry={refetch}
          />
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
