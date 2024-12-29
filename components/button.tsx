import AntDesign from "@expo/vector-icons/AntDesign";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center whitespace-nowrap rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary shadow",
        secondary: "bg-secondary shadow-sm",
        destructive: "bg-destructive shadow-sm",
        outline: "border border-input bg-background",
        ghost: "bg-slate-200 dark:bg-slate-700",
        link: "",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-2",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      ghost: "text-foreground",
      outline: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = forwardRef<View, ButtonProps>(
  (
    {
      label,
      labelClasses,
      className,
      variant,
      size,
      style,
      activeOpacity = 0.5,
      loading,
      ...props
    },
    ref
  ) => {
    const opacity = useSharedValue(1);

    const handlePressIn = () => {
      opacity.value = withSpring(activeOpacity);
    };

    const handlePressOut = () => {
      opacity.value = withSpring(1);
    };

    return (
      <AnimatedPressable
        className={cn(buttonVariants({ variant, size, className }))}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ opacity }}
        {...props}
        ref={ref}>
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses })
          )}>
          {label}

          {loading ? (
            <AntDesign name="loading1" size={24} className="animate-spin" />
          ) : null}
        </Text>
      </AnimatedPressable>
    );
  }
);

export { Button, buttonTextVariants, buttonVariants };
