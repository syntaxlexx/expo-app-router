import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive bg-destructive/20 text-destructive dark:border-destructive",
        success:
          "border-success bg-success/20 text-success dark:border-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof alertVariants>) {
  return (
    <View
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

Alert.displayName = "Alert";

function AlertTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

AlertTitle.displayName = "AlertTitle";

function AlertDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
