import { Post } from "@/types";
import { fetcher } from "./fetcher";
import { API_URL } from "@/lib/constants";

export const posts = {
  fetchPosts: async () => {
    try {
      const data = await fetcher(`${API_URL}/posts`);

      return {
        posts: data as Post[],
      };
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error fetching posts");
    }
  },
};
