import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
};

export type PostModel = {
  _id: ObjectId;
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  user?: User; // Add this to represent the user who created the post
  isLiked?: boolean; // Add this to represent whether the current user liked the post
  likesCount?: number; // Add this to represent the number of likes
  comments?: CommentModel[]; // Add this to represent the comments on the post
};

export type LikeModel = {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
};

export type CommentModel = {
  _id: ObjectId;
  content: string;
  userId: ObjectId;
  postId: ObjectId;
  username?: string;
  createdAt: Date;
};

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type ErrorResponse = {
  statusCode: number;
  message?: string;
  error?: string;
};
