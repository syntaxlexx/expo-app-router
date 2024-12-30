import { Post } from "@/types";
import { fetcher } from "./fetcher";
import { API_URL } from "@/lib/constants";
import queryString from "query-string";

export const posts = {
  fetchPosts: async ({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }) => {
    try {
      const url = queryString.stringifyUrl(
        {
          url: `posts`,
          query: {
            _limit: limit,
            _start: (page - 1) * limit,
          },
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );

      console.log("url: ", url);

      const data = await fetcher(url);

      return {
        posts: data as Post[],
      };
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error fetching posts");
    }
  },
};
