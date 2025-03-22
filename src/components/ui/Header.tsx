"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { useEffect, useState } from "react";

interface User {
  id?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for auth state changes
    const checkAuth = () => {
      // Safely get and parse user data from localStorage with proper error handling
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData) as User;
          
          // Ensure the user object has a name property
          if (!parsedUser.name && (parsedUser.firstName || parsedUser.lastName)) {
            parsedUser.name = `${parsedUser.firstName || ''} ${parsedUser.lastName || ''}`.trim();
          }
          
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
        setUser(null);
      }
    };

    // Initial check
    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    
    // Custom event listener for auth changes
    window.addEventListener('authStateChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authStateChange', checkAuth);
    };
  }, []);

  // Get initials from full name with null safety
  const getInitials = (name: string): string => {
    if (!name) return '?';
    
    return name
      .split(' ')
      .map(part => part?.[0] || '')
      .join('')
      .toUpperCase() || '?';
  };

  // Hide header elements on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isProfilePage = pathname === '/profile-selection';

  // Don't show anything on auth pages
  if (isAuthPage) return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <Link href="/" className="text-2xl font-bold text-[#3674B5]">
          TuneUp
        </Link>
      </div>
    </header>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#3674B5]">
          TuneUp
        </Link>
        
        {user ? (
          <div className="relative">
            <Avatar
              size="md"
              className="border-2 border-white shadow-md"
              alt={user.name || 'User'}
              fallback={<span className="text-lg">{getInitials(user.name)}</span>}
            />
            <Badge 
              size="sm" 
              className="absolute -bottom-1 -right-1 bg-[#3674B5] hover:bg-[#3674B5] text-white shadow-sm"
            >
              {user.name?.split(' ')?.[0] || 'User'}
            </Badge>
          </div>
        ) : !isProfilePage && (
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-[#3674B5] hover:bg-[#2A5C91] text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
} 