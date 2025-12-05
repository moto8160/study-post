export type Post = {
  id: number;
  title: string;
  content: string;
  date: string; // DateTimeは JSON で文字列になる
  studyTime: number;
  createdAt: string;
  updatedAt: string;
};

export type PostResponse = {
  id: number;
  title: string;
  content: string;
  date: string;
  studyTime: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  };
};