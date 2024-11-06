"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  AtSign,
  Mail,
  Cake,
  MessageCircle,
  Activity,
  LogOut,
  Heart,
  ThumbsUp,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

type Post = {
  _id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  likes: { length: number };
  comments: { length: number };
};

type UserProfile = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  imageProfileUrl?: string;
  posts: Post[];
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        </header>

        <Card className="relative shadow-lg rounded-lg bg-white border border-gray-200 mb-8">
          <Link href="/profile/edit" passHref>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 relative overflow-hidden rounded-full shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500 transition-transform transform hover:scale-105">
              <AvatarImage
                src={profile.imageProfileUrl || "/placeholder.svg"}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                {profile.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {profile.name || profile.username}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Name:</span>
              <span className="text-gray-700">{profile.name || "Not set"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <AtSign className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Username:</span>
              <span className="text-gray-700">{profile.username}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Email:</span>
              <span className="text-gray-700">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Gender:</span>
              <span className="text-gray-700">
                {profile.gender || "Not set"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Cake className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">
                Date of Birth:
              </span>
              <span className="text-gray-700">
                {profile.dateOfBirth || "Not set"}
              </span>
            </div>
          </CardContent>
        </Card>

        <main className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
          <div className="grid gap-6">
            {profile.posts.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                No posts yet
              </Card>
            ) : (
              profile.posts.map((post) => (
                <Link href={`/forum/${post._id}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow bg-white">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            profile?.imageProfileUrl ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt="Profile picture"
                          className="object-cover"
                        />
                        <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                          {profile?.username ? profile.username[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-black">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Posted by {profile.username} •{" "}
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

                    <p className="mb-4 line-clamp-3 text-gray-600">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center text-gray-500">
                        <Heart className={`mr-2 h-4 w-4`} />
                        {post.likes.length}
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
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
