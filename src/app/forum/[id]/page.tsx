"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";
import { PostModel } from "@/@types/types.def";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostModel | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true); // Start loading
    const response = await fetch(`/api/posts/${params.id}`);
    const data = await response.json();
    setPost(data);
    setLoading(false); // End loading
  };

  const handleLike = async () => {
    await fetch(`/api/posts/${params.id}/likes`, { method: "POST" });
    fetchPost();
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${params.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    });
    setComment("");
    fetchPost();
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen bg-[#f8ffe6] p-10 px-4">
      <div className="container mx-auto px-4">
        <Link href="/forum">
          <Button variant="ghost" className="mb-4 text-gray-900">
            ← Back to Forum
          </Button>
        </Link>

        <Card className="p-6 mb-8 bg-white">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage
                src={"/placeholder.svg?height=96&width=96"}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                {post.user?.username ? post.user.username[0] : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl text-gray-900 font-semibold">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                Posted by {post.user?.username} •{" "}
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>
          </div>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-lg mb-4"
            />
          )}

          <p className="mb-4 whitespace-pre-wrap text-gray-700">
            {post.content}
          </p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleLike}
              className="text-gray-500"
            >
              <Heart
                className={`mr-2 h-4 w-4 text-gray-500 ${
                  post.isLiked ? "fill-red-500" : ""
                }`}
              />
              {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
            </Button>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">
              {post.comments?.length} comments
            </span>
          </div>
        </Card>

        <div className="mb-8">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">Comments</h3>
          <form onSubmit={handleComment} className="mb-6">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2 bg-gray-200 text-black border-gray-400"
            />
            <Button
              type="submit"
              className="bg-[#1B2E20] text-white"
              disabled={!comment.trim()}
            >
              Post Comment
            </Button>
          </form>

          <div className="space-y-4">
            {post.comments?.map((comment, index) => (
              <Card key={index} className="p-4 bg-white">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={"/placeholder.svg?height=96&width=96"}
                      alt="Profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                      {comment.username ? comment.username[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="whitespace-pre-wrap text-black font-bold">
                      {comment.username}
                    </p>
                    <p className="whitespace-pre-wrap text-black">
                      {comment.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
