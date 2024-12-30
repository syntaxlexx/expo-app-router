import { Pressable, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import React from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  page: number;
  iconSize?: number;
  activeOpacity?: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
}

export default function Paginator({
  iconSize = 24,
  page,
  onNextPage,
  onPrevPage,
  hasPrevPage = true,
  hasNextPage = true,
  activeOpacity = 0.5,
}: Props) {
  const opacity = useSharedValue(1);
  const opacityNext = useSharedValue(1);

  const cannotGoPrev = hasPrevPage === false || page <= 1;
  const cannotGoNext = !hasNextPage;

  const handlePressIn = () => {
    opacity.value = withSpring(activeOpacity);
  };
  const handlePressInNext = () => {
    opacityNext.value = withSpring(activeOpacity);
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
  };

  const handlePressOutNext = () => {
    opacityNext.value = withSpring(1);
  };

  return (
    <View className="flex flex-row items-center gap-4">
      <AnimatedPressable
        onPress={() => {
          if (page - 1 > 0 && onPrevPage) {
            onPrevPage();
          }
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={cannotGoPrev}
        style={{ opacity }}>
        <View
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "ghost",
            })
          )}
          style={{ opacity: cannotGoPrev ? 0.5 : 1 }}>
          <MaterialIcons
            name="navigate-before"
            size={iconSize}
            className="text-primary"
          />
        </View>
      </AnimatedPressable>

      <AnimatedPressable
        onPress={onNextPage}
        onPressIn={handlePressInNext}
        onPressOut={handlePressOutNext}
        disabled={cannotGoNext}
        style={{ opacity: opacityNext }}>
        <View
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "ghost",
            })
          )}
          style={{ opacity: cannotGoNext ? 0.5 : 1 }}>
          <MaterialIcons
            name="navigate-next"
            size={iconSize}
            className="text-primary"
          />
        </View>
      </AnimatedPressable>
    </View>
  );
}
