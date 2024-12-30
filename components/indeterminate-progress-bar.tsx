import { INDETERMINATE_PROGRESS_BAR_HEIGHT } from "@/lib/constants";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const HEIGHT = INDETERMINATE_PROGRESS_BAR_HEIGHT;
const PROGRESS_WIDTH = width / 2 + 100;
const DURATION = 1000;

type IndeterminateProgressBarProps = {
  style?: StyleProp<ViewStyle>;
};

const IndeterminateProgressBar = ({ style }: IndeterminateProgressBarProps) => {
  const translateX = useSharedValue(-PROGRESS_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withDelay(
        DURATION / 2,
        withTiming(width, {
          duration: DURATION,
          // easing: Easing.bezier(0, 0.5, 1, 0.5),
        })
      ),
      // Set number of repetitions to -1 to loop indefinitely
      -1
    );
  }, [translateX]);

  const progress = useAnimatedStyle(() => {
    return {
      width: PROGRESS_WIDTH,
      height: HEIGHT,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={[style, styles.container]} className="bg-primary">
      <Animated.View
        style={[progress, { opacity: 0.9 }]}
        className="bg-background"
      />
    </View>
  );
};

export default IndeterminateProgressBar;

const styles = StyleSheet.create({
  container: {
    width,
    height: HEIGHT,
  },
});
