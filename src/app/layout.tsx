import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientLottieReact from "@/components/lottie-client/ClientLottieReact";
import Chat from "../../public/Animation - 1730805186441.json";
const inter = Inter({ subsets: ["latin"] });

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Chatbot } from "@/components/Chatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gizzia",
  description: "Your nutrition helper",
  icons: {
    icon: "/logo 3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie ? tokenCookie.value : undefined; // Ekstraksi nilai string

  async function handleFormLogout() {
    "use server";
    if (token) {
      cookies().delete("token");
      redirect("/login");
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* UPDATE */}
          <Dialog.Root>
            <Navbar token={token} handleFormLogout={handleFormLogout} />
            {children}
            {token && (
              <>
                <Dialog.Trigger asChild>
                  <div className="fixed bottom-5 right-1 z-50 flex flex-col items-center cursor-pointer transition-transform hover:scale-125">
                    <ClientLottieReact
                      animationData={Chat}
                      style={{ width: "150px", height: "150px" }}
                    />
                    <p className="absolute bottom-0 m-0 p-0 text-[#77aca4] font-extrabold text-lg text-center">
                      Mr. Gizz
                    </p>
                  </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[95vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-b from-[#1B2E20] to-[#2A4530] p-6 shadow-2xl focus:outline-none data-[state=open]:animate-contentShow">
                    <div className="relative">
                      <Dialog.Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                          <img
                            src="/ai-white.png"
                            alt="AI"
                            className="w-5 h-5"
                          />
                        </div>
                        Chat with Mr. Gizz
                      </Dialog.Title>
                      <div className="bg-white/5 rounded-lg backdrop-blur overflow-hidden">
                        <Chatbot />
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="absolute right-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                          aria-label="Close"
                        >
                          <Cross2Icon className="h-4 w-4 text-white" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </>
            )}
            <Toaster />
            <Footer />
          </Dialog.Root>
          {/* UPDATE */}
        </ThemeProvider>
      </body>
    </html>
  );
}
