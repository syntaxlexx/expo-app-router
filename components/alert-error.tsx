import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Text, View } from "react-native";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface Props {
  title?: string;
  message: string;
  hasRetry?: boolean;
  isLoading?: boolean;
  onPressRetry?: () => void;
}

const AlertError = ({
  title,
  message,
  hasRetry = false,
  isLoading = false,
  onPressRetry,
}: Props) => {
  const formatted = message.replaceAll("'", "").split(/\r?\n/);

  return (
    <Alert
      variant={"destructive"}
      className="flex flex-row gap-4 items-center justify-start">
      <View className="flex-shrink" style={{ width: 24, height: 24 }}>
        <Feather name="alert-triangle" size={24} color="red" />
      </View>
      <View className="flex-grow">
        <View className="flex flex-col gap-2 items-start justify-start">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>
            <View className="flex flex-col gap-4 items-start justify-start">
              <View>
                {formatted.map((line, index) => (
                  <Text key={index}>{line}</Text>
                ))}
              </View>

              {hasRetry && (
                <Button
                  label="Retry"
                  size={"sm"}
                  isLoading={isLoading}
                  onPress={onPressRetry}
                  icon={
                    <SimpleLineIcons
                      name="refresh"
                      size={16}
                      className="mr-2"
                      color="white"
                    />
                  }
                />
              )}
            </View>
          </AlertDescription>
        </View>
      </View>
    </Alert>
  );
};

export default AlertError;
