import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressableView = Animated.createAnimatedComponent(Pressable);

interface Props extends React.ComponentPropsWithoutRef<typeof Pressable> {
  activeOpacity?: number;
}

export const AnimatedPressable = forwardRef<View, Props>(
  ({ className, style, activeOpacity = 0.5, ...props }, ref) => {
    const opacity = useSharedValue(1);

    const handlePressIn = () => {
      opacity.value = withSpring(activeOpacity);
    };

    const handlePressOut = () => {
      opacity.value = withSpring(1);
    };

    return (
      <AnimatedPressableView
        className={cn("", className)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ opacity }}
        ref={ref}
        {...props}></AnimatedPressableView>
    );
  }
);
