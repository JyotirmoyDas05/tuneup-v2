"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser, AuthError } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await loginUser(email, password);
      
      if (response.success) {
        toast.success("Login successful!");
        // Check if user has already completed their profile
        const profileData = localStorage.getItem('profileData');
        if (profileData) {
          try {
            const parsedProfile = JSON.parse(profileData);
            // Check if the profile belongs to the current user
            if (parsedProfile.userId === response.user.id) {
              router.push("/dashboard");
            } else {
              // If profile data exists but belongs to a different user, clear it
              localStorage.removeItem('profileData');
              router.push("/profile-selection");
            }
          } catch (error) {
            console.error('Error parsing profile data:', error);
            localStorage.removeItem('profileData');
            router.push("/profile-selection");
          }
        } else {
          router.push("/profile-selection");
        }
      }
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3674B5] focus:border-[#3674B5]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#3674B5] focus:border-[#3674B5]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3674B5] hover:bg-[#2A5C91] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3674B5] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-[#3674B5] hover:text-[#2A5C91]">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}