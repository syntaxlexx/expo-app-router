import { View, Text, Image } from "react-native";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Post } from "@/types";
import { ThemedText } from "./ui/themed-text";
import Entypo from "@expo/vector-icons/Entypo";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Card>
      <CardContent className="p-2">
        <View className="flex flex-row gap-2">
          <View className="w-[90px]">
            <Image
              src={post.image}
              alt={post.title}
              className="h-20 bg-cover rounded"
            />
          </View>
          <View className="flex-1">
            <View className="w-full max-w-full">
              <ThemedText
                type="defaultSemiBold"
                className="text-ellipsis overflow-hidden line-clamp-2">
                {post.title}
              </ThemedText>
              <ThemedText className="text-ellipsis overflow-hidden line-clamp-1">
                {post.body}
              </ThemedText>
            </View>
          </View>
          <View className="flex items-center justify-center">
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
