import Ionicons from "@expo/vector-icons/Ionicons";

export function BackButton({ color = "black" }: { color?: string }) {
  return <Ionicons name="arrow-back-sharp" size={24} color={color} />;
}
