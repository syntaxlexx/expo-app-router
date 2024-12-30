import IndeterminateProgressBar from "@/components/indeterminate-progress-bar";
import Paginator from "@/components/paginator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemedText } from "@/components/ui/themed-text";
import { Wrapper } from "@/components/wrapper";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { api } from "../api";
import { INDETERMINATE_PROGRESS_BAR_HEIGHT } from "@/lib/constants";
import { Post } from "@/types";

const hero = {
  height: 100,
  image: "https://picsum.photos/seed/picsum/800/600",
};

export default function Page() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [posts, setPosts] = React.useState<Post[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { page, limit }],
    queryFn: () =>
      api.posts.fetchPosts({
        page,
        limit,
      }),
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

      <View style={{ height: INDETERMINATE_PROGRESS_BAR_HEIGHT }}>
        {isLoading && <IndeterminateProgressBar />}
      </View>

      <ScrollView>
        <Wrapper>
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

      <Wrapper className="flex flex-row items-center gap-2 py-2 bg-background">
        <View className="flex-1">
          <ThemedText type="default">
            Page {page} &middot; {data?.posts?.length} posts
          </ThemedText>
        </View>
        <View className="flex-shrink">
          <Paginator
            onPrevPage={() => setPage(page - 1)}
            onNextPage={() => setPage(page + 1)}
            page={page}
            hasPrevPage={page > 1}
            hasNextPage={(data?.posts?.length || 1) > 0}
          />
        </View>
      </Wrapper>
    </View>
  );
}
