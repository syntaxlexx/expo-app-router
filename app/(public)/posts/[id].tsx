import { api } from "@/app/api";
import AlertError from "@/components/alert-error";
import { AnimatedPressable } from "@/components/animated-pressable";
import { BackButton } from "@/components/back-button";
import { Button as ThemedButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Wrapper } from "@/components/wrapper";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useMemo, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Toast from "react-native-toast-message";

const backgroundColor = "rgba(255,255,255,0.2)";
const borderColor = "rgba(255,255,255,0.5)";

const hero = {
  height: 250,
};

export default function Page() {
  const { id, image } = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [title, setTitle] = React.useState("");
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const queryClient = useQueryClient();

  const showToast = (message: string) => {
    Toast.show({
      type: "info",
      text1: message,
    });
  };

  const {
    data: post,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post", { id }],
    queryFn: () => api.posts.show(Number(id)),
  });

  const {
    mutate: updatePost,
    data: updatedPost,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationKey: ["post", { id }],
    mutationFn: () =>
      api.posts.update({
        id: Number(id),
        input: {
          ...post!,
          title: title,
        },
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["post", { id }], data);
      bottomSheetRef.current?.close();
    },
  });

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
                    onPress={() => showToast("Share Button Clicked")}>
                    <EvilIcons name="share-apple" size={24} color="white" />
                  </AnimatedPressable>
                </View>

                <View
                  className="rounded-full flex items-center justify-center border"
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor,
                    borderColor,
                  }}>
                  <AnimatedPressable
                    onPress={() => showToast("Favorite Button Clicked")}>
                    <EvilIcons name="heart" size={24} color="white" />
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
              <AnimatedPressable
                onPress={() => {
                  setTitle(post.title);
                  bottomSheetRef.current?.expand();
                }}>
                <ThemedText>Edit</ThemedText>
              </AnimatedPressable>
            </Wrapper>
          </View>
        )}
      </ThemedView>

      <GestureHandlerRootView className="flex-1 bg-gray-200">
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={-1}
          snapPoints={snapPoints}
          keyboardBehavior="fillParent"
          enableDynamicSizing={false}>
          <BottomSheetView className="flex-1">
            <Wrapper>
              <View className="flex flex-row gap-2 items-center justify-between">
                <View className="flex-grow">
                  <ThemedText>Update Post</ThemedText>
                </View>
                <View className="flex-shrink">
                  <AnimatedPressable
                    onPress={() => bottomSheetRef.current?.close()}>
                    <ThemedText>Close</ThemedText>
                  </AnimatedPressable>
                </View>
              </View>

              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="Post Title"
                multiline={true}
                numberOfLines={4}
                onSubmitEditing={(event) => updatePost()}
              />

              {updateError && (
                <Wrapper>
                  <AlertError
                    message={updateError.message}
                    hasRetry
                    isLoading={isUpdating}
                    onPressRetry={refetch}
                  />
                </Wrapper>
              )}

              <ThemedButton
                label="Save"
                isLoading={isUpdating}
                onPress={(_) => updatePost()}
              />
            </Wrapper>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}
