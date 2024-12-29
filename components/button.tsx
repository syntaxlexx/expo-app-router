import { type VariantProps, cva } from "class-variance-authority";
import { Text, TouchableOpacity } from "react-native";

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
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      <Text
        className={cn(
          buttonTextVariants({ variant, size, className: labelClasses })
        )}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
