import { AnimatedPressable } from "@/components/animated-pressable";
import IndeterminateProgressBar from "@/components/indeterminate-progress-bar";
import PostCard from "@/components/posts/post-card";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { INDETERMINATE_PROGRESS_BAR_HEIGHT } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { api } from "../api";
import { Link } from "expo-router";

const hero = {
  height: 130,
  image: "https://picsum.photos/seed/picsum/800/600",
};

export default function Page() {
  const queryClient = useQueryClient();

  const [limit, setLimit] = React.useState(10);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["paginatedPosts"],
    queryFn: ({ pageParam }) =>
      api.posts.index({
        page: pageParam ?? 1,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevPage,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Clear the cache for this query
    queryClient.removeQueries({ queryKey: "paginatedPosts", exact: true });
    // Reset the pageParams to their initial state
    queryClient.setQueryData(["paginatedPosts"], () => ({
      pages: [],
      pageParams: [],
    }));

    await refetch();
    setIsRefreshing(false);
  };

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
            <Wrapper key={item.id} className="py-1">
              <Link
                key={item.id}
                href={{
                  pathname: "/posts/[id]",
                  params: {
                    id: item.id,
                    image: item.image,
                  },
                }}
                asChild>
                <AnimatedPressable>
                  <PostCard post={item} />
                </AnimatedPressable>
              </Link>
            </Wrapper>
          )}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isLoading || isFetchingNextPage ? (
              <ActivityIndicator />
            ) : !hasNextPage ? (
              <View>
                <ThemedText type="default" className="text-center">
                  No more posts
                </ThemedText>
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#ff6347"]} // Android specific
              tintColor="#ff6347" // iOS specific
            />
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
