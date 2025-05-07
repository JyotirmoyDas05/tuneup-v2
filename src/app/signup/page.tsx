"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AtSign, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/appwrite/auth-service";
import toast, { Toaster } from "react-hot-toast";
import { AppwriteException } from 'appwrite';

const authService = new AuthService();

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.createAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response) {
        toast.success("Account created successfully! Redirecting to login...", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4CAF50",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      const message = error instanceof AppwriteException 
        ? error.message 
        : "Failed to create account";
      
      toast.error(message, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#f44336",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await authService.signInWithGoogle();
      // The page will be redirected by Appwrite OAuth
    } catch (error) {
      const message = error instanceof AppwriteException 
        ? error.message 
        : "Failed to sign up with Google. Please try again.";
      toast.error(message);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <Toaster />
      {/* Gradient Vector Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5" />
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[140px] opacity-10" />

      {/* Signup Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Create your account
        </h1>

        {/* Social Sign Up */}
        <div className="space-y-4 mb-6">
          <button 
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl border border-gray-300 shadow-sm transition-colors"
            type="button"
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]/50"
              required
            />
          </div>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]/50"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password"
              className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]/50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3674B5] hover:bg-[#2A5C91] text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login Option */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-[#3674B5] hover:text-[#2A5C91] font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}