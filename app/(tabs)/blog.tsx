import { Wrapper } from "@/components/wrapper";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { ThemedText } from "@/components/themed-text";

const hero = {
  height: 100,
  image: "https://picsum.photos/seed/picsum/800/600",
};

export default function Page() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.posts.fetchPosts(),
  });

  return (
    <View style={{ flex: 1 }}>
      <View className="relative w-full" style={{ height: hero.height }}>
        <View className="absolute inset-0 top-0 bottom-0 right-0 left-0">
          <Image
            src={hero.image}
            className="w-full bg-cover bg-center"
            style={{ height: hero.height }}
            alt="Hero"
          />
        </View>

        <View className="w-full h-full flex items-center justify-center">
          <ThemedText type="title" className="text-center">
            Blog
          </ThemedText>
        </View>
      </View>

      <ScrollView>
        <Wrapper>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text>Error: {error.message}</Text>}

          {!error && (
            <View className="flex gap-4">
              {data?.posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text>{post.body}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          )}
        </Wrapper>
        <View style={{ height: 24 }}></View>
      </ScrollView>

      <View style={{ padding: 8 }}>
        <ThemedText type="default" className="text-center">
          Showing {data?.posts?.length} posts
        </ThemedText>
      </View>
    </View>
  );
}
