"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User2Icon, CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullname,
            username,
            email,
            password,
            gender,
            dateOfBirth,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/gizi-seimbang.jpg"
          alt="Balanced nutrition foods"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Registration Form with semi-transparent background */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 bg-black bg-opacity-60">
        <div className="w-full max-w-lg space-y-10 bg-opacity-60 rounded-xl p-8 shadow-md backdrop-blur-sm">
          {/* Header */}
          <div className="space-y-4 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#95dfb5] to-[#cbcccb]">
              Get Started Now
            </h1>
            <p className="text-gray-300">
              Please fill in the details to create your account
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Fullname Input */}
              <div className="relative">
                <Input
                  className="pl-12 h-14 text-white bg-[#0f1c0f] border-2 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 transition-all"
                  placeholder="Fullname"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                {/* Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#939292]">
                  <CircleUserRound className="h-6 w-6" />
                </div>
              </div>
              {/* Username Input */}
              <div className="relative">
                <Input
                  className="pl-12 h-14 text-white bg-[#0f1c0f] border-2 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 transition-all"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {/* Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#939292]">
                  <User2Icon className="h-6 w-6" />
                </div>
              </div>
              {/* Email Input */}
              <div className="relative">
                <Input
                  className="pl-12 h-14 text-white bg-[#0f1c0f] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 transition-all"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Input
                  className="pl-12 h-14 text-white bg-[#0f1c0f] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 transition-all"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {/* Gender Dropdown */}
              <select
                className={`h-14 pl-4 bg-[#0f1c0f] border-2 border-[#f8f6f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 w-full ${
                  gender === "male"
                    ? "text-white"
                    : gender === "female"
                    ? "text-white"
                    : "text-[#4e524b]"
                }`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              {/* Date of Birth Input */}
              <Input
                className="pl-12 h-14 text-[#939292] bg-[#0f1c0f] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#95dfb5] placeholder-gray-400 transition-all valid:text-white"
                placeholder="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#95dfb5] to-[#0e2518] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition duration-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>

            {/* Error message */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Already have an account */}
            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 transition duration-300"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
