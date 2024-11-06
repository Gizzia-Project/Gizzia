"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, Instagram, Twitter, Youtube } from "lucide-react";

export default function Component() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1B2E20] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Section */}
          <div className="space-y-6">
            {" "}
            {/* Kurangi atau hapus `space-y` */}
            <Link href="/" className="inline-block mb-1">
              {" "}
              {/* Gunakan margin yang lebih kecil */}
              <img src="/logo 3.png" className="w-32" />
            </Link>
            <div className="space-y-0.5">
              {" "}
              {/* Perkecil jarak antar elemen di dalam div */}
              <p className="text-gray-300">Copyright © 2024 Gizzia.</p>
              <p className="text-gray-300">All rights reserved</p>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/food-check" className="hover:text-gray-300">
                  Food Check
                </Link>
              </li>
              <li>
                <Link href="/health-check" className="hover:text-gray-300">
                  Health Check
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-gray-300">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support Us!</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/donation" className="hover:text-gray-300">
                  Donate now
                </Link>
              </li>
            </ul>
          </div>
          {/* Chatbot and Go to Top Section */}
          <div className="flex flex-col items-end justify-between">
            <div className="space-y-8">
              <Button
                onClick={scrollToTop}
                className="bg-[#2C472F] hover:bg-[#3A5A3E] text-white rounded-full px-6"
              >
                Go To Top
                <ArrowUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
