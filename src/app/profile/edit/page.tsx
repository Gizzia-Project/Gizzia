"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

type UserProfile = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  imageProfileUrl?: string;
};

export default function EditProfile() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) =>
      prevProfile ? { ...prevProfile, [id]: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      router.push("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
        </header>

        <Card>
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 relative overflow-hidden rounded-full shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500 transition-transform transform hover:scale-105">
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

            <CardTitle className="text-2xl text-black font-bold">
              {profile?.name || "User"}
            </CardTitle>
            {/* <Button
              variant="outline"
              className="bg-[#fefefe] text-black border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
            >
              Change Profile Picture
            </Button> */}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Name</p>
                <Input
                  id="name"
                  value={profile?.name || ""}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Username</p>
                <Input
                  id="username"
                  value={profile?.username || ""}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Email</p>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Gender</p>
                <Input
                  id="gender"
                  value={profile?.gender || ""}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  Date of Birth
                </p>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile?.dateOfBirth || ""}
                  onChange={handleInputChange}
                  className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <Link href="/profile" passHref>
                <Button className="text-gray-900">Cancel</Button>
              </Link>
              <Button
                type="submit"
                variant="outline"
                className="bg-white text-black border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
