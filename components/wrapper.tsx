import { cn } from "@/lib/utils";
import { View, type ViewProps } from "react-native";

interface Props extends ViewProps {}

function Wrapper({ style, className, ...otherProps }: Props) {
  return (
    <View
      className={cn("container py-4 overflow-hidden flex gap-y-3", className)}
      style={[style]}
      {...otherProps}
    />
  );
}

export { Wrapper };
