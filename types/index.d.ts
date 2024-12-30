export type Timestamp = {
  created_at: Date | string;
  updated_at: Date | string;
};

export type Post = Timestamp & {
  id: number;
  userId: number;
  title: string;
  body: string;
};
