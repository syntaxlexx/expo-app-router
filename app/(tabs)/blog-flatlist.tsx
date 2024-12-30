import IndeterminateProgressBar from "@/components/indeterminate-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { INDETERMINATE_PROGRESS_BAR_HEIGHT } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { api } from "../api";

const hero = {
  height: 100,
  image: "https://picsum.photos/seed/picsum/800/600",
};

export default function Page() {
  const [limit, setLimit] = React.useState(10);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["paginatedPosts"],
    queryFn: ({ pageParam }) =>
      api.posts.fetchPosts({
        page: pageParam ?? 1,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevPage,
  });

  const posts = data?.pages.flatMap((page) => page.data) || [];

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
            Blog (Endless Scroll)
          </ThemedText>
        </View>
      </View>

      <View style={{ height: INDETERMINATE_PROGRESS_BAR_HEIGHT }}>
        {(isLoading || isFetchingNextPage) && <IndeterminateProgressBar />}
      </View>

      <Wrapper>{error && <Text>Error: {error.message}</Text>}</Wrapper>

      {!error && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Wrapper key={item.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text>{item.body}</Text>
                </CardContent>
              </Card>
            </Wrapper>
          )}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator />
            ) : !hasNextPage ? (
              <View>
                <ThemedText type="default" className="text-center">
                  No more posts
                </ThemedText>
              </View>
            ) : null
          }
        />
      )}

      <View style={{ height: 24 }}></View>

      {data?.pageParams && (
        <Wrapper className="flex flex-row gap-4 py-2 bg-background">
          <View className="flex-1">
            <ThemedText type="default" className="text-left">
              Pages: {(data.pageParams as string[])?.pop()}
            </ThemedText>
          </View>
          <View className="flex-grow">
            <ThemedText className="text-right">Per page: {limit}</ThemedText>
          </View>
        </Wrapper>
      )}
    </View>
  );
}
