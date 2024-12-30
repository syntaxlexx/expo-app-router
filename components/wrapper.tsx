import { cn } from "@/lib/utils";
import { View, type ViewProps } from "react-native";

interface Props extends ViewProps {
  bg?: boolean;
}

function Wrapper({ bg, style, className, ...otherProps }: Props) {
  return (
    <View
      className={cn(
        "container py-4 overflow-hidden flex gap-y-3",
        {
          "bg-background": bg,
        },
        className
      )}
      style={[style]}
      {...otherProps}
    />
  );
}

export { Wrapper };
