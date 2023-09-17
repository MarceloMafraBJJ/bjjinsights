import { Session } from "next-auth";

type User = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  posts: Post[];
  comments: Comment[];
};

type Category = {
  id: string;
  slug: string;
  title: string;
  color: string;
  img?: string | null;
  posts: Post[];
};

type Post = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  views: number;
  likesCount: number;
  catSlug: string;
  userEmail: string;

  cat: Category;
  user: User;
  comments: Comment[];
};

type Comment = {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;
  postSlug: string;
  user: User;
  post: Post;
};

export type { User, Category, Post, Comment };

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}
