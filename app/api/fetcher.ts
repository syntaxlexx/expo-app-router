import { API_URL } from "@/lib/constants";
import { RequestInit, HeadersInit } from "node-fetch";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  url = url.startsWith("/") ? url : `/${url}`;

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...((options.headers as HeadersInit) || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
