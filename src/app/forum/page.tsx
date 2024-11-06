"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search, MessageSquare, ArrowUp } from "lucide-react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useDebounce } from "@/hooks/useDebounce";
import { PostModel } from "@/@types/types.def";
import Banner from "./components/BannerForum";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const categories = [
  "Health",
  "Nutrition",
  "Fitness",
  "Lifestyle",
  "Recipe",
  "Other",
];

export default function ForumPage() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchPosts = async () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("title", debouncedSearch);
    if (category && category !== "all") params.append("category", category);

    const response = await fetch(`/api/posts?${params.toString()}`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [debouncedSearch, category]);

  return (
    <>
      <Banner />
      <div className="min-h-screen bg-[#fcfcfc] text-slate-200">
        <div className="container mx-auto px-4 py-8">
          {/* Header section with search and category filter */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search posts..."
                className="pl-10 bg-white border border-[#1B2E20] rounded-lg text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-white text-black border border-slate-300 rounded-lg">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-slate-300 rounded-lg">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    className="cursor-pointer hover:text-gray-600"
                    value={cat}
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/forum/create">
              <Button className="bg-[#1B2E20] hover:bg-[#33533c] flex items-center text-white border border-indigo-600 rounded-lg">
                <PlusCircle className="mr-2" /> Create Post
              </Button>
            </Link>
          </div>

          {/* Display the posts in a grid layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - main posts */}
            <div className="lg:col-span-2 space-y-4">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} onLikeToggle={fetchPosts} />
              ))}
            </div>

            {/* Right column - recent discussions */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-md">
                <h3 className="text-sm font-medium text-black mb-4">
                  NEW DISCUSSIONS
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex items-start gap-3">
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
                        <span className="text-indigo-400 text-sm">
                          {post.user?.username}
                        </span>
                        <h4 className="text-sm font-medium text-black">
                          {post.title}
                        </h4>
                        <div className="text-xs text-black">
                          <span>
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                          </span>
                          <span className="mx-2">·</span>
                          <span>{post.comments?.length} Comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
