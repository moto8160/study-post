export type PostResponse = {
  id: number;
  title: string;
  content: string;
  date: Date;
  studyTime: number;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
  };
};
