import { Post } from "@/types";
import qs from "qs";
import { fetcher } from "./fetcher";

export const posts = {
  index: async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
    try {
      const url = qs.stringify(
        {
          _limit: limit,
          _start: (page - 1) * limit,
        },
        {
          skipNulls: true,
        }
      );

      console.log("url: ", page, url);

      const data = (await fetcher(`/posts?${url}`)) as Post[];

      return {
        data: data.map((v) => ({
          ...v,
          image: `https://picsum.photos/id/${v.id}/800/600`,
        })),
        // nextPage: data.length === limit ? page + 1 : null,
        nextPage: page < 5 ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      };
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error fetching posts");
    }
  },

  show: async (id: number) => {
    try {
      const data = (await fetcher(`/posts/${id}`)) as Post;
      console.log("data", data);
      return {
        ...data,
        image: `https://picsum.photos/id/${id}/800/600`,
      };
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error fetching post");
    }
  },
};
