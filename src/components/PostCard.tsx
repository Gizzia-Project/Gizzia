import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

type PostCardProps = {
  post: any;
  onLikeToggle: () => void;
};

export default function PostCard({ post, onLikeToggle }: PostCardProps) {
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${post._id}/likes`, { method: "POST" });
    onLikeToggle();
  };

  return (
    <Link href={`/forum/${post._id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow bg-white mb-5">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage
              src={
                post?.user.imageProfileUrl ||
                "/placeholder.svg?height=96&width=96"
              }
              alt="Profile picture"
              className="object-cover"
            />
            <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
              {post?.user.username ? post.user.username[0] : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-black">{post.title}</h2>
            <p className="text-sm text-gray-500">
              Posted by {post.user.username} •{" "}
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>
        </div>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <p className="mb-4 line-clamp-3 text-gray-600">{post.content}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <Heart
              className={`mr-2 h-4 w-4 ${post.isLiked ? "fill-red-500" : ""}`}
            />
            {post.likesCount}
          </button>
          <div className="flex items-center text-gray-500">
            <MessageSquare className="mr-2 h-4 w-4" />
            {post.comments.length}
          </div>
          <span className="text-sm text-gray-500 ml-auto rounded-full bg-[#113d1e] px-3 py-1 text-white">
            {post.category}
          </span>
        </div>
      </Card>
    </Link>
  );
}
