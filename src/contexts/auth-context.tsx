'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, account } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { LoginUser, NewUser, UpdateUserData } from '@/lib/appwrite/auth-service';

// Define authentication state type
type AuthState = {
  user: {
    account: Models.User<Models.Preferences> | null;
    profile: any | null;
  } | null;
  isLoading: boolean;
  error: string | null;
};

// Define context type
interface AuthContextType extends AuthState {
  signUp: (userData: NewUser) => Promise<any>;
  signIn: (userData: LoginUser) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (userId: string, userData: UpdateUserData) => Promise<any>;
  googleSignIn: () => Promise<any>;
  githubSignIn: () => Promise<any>;
  checkAuthStatus: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
  googleSignIn: async () => {},
  githubSignIn: async () => {},
  checkAuthStatus: async () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const currentUser = await authService.getCurrentUser();
      setState({
        user: currentUser,
        isLoading: false,
        error: null,
      });
      return currentUser;
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: "Not authenticated",
      });
      return null;
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Sign up a new user
  const signUp = async (userData: NewUser) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newUser = await authService.createAccount(userData);
      await checkAuthStatus();
      return newUser;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error during sign up",
      }));
      throw error;
    }
  };

  // Sign in existing user
  const signIn = async (userData: LoginUser) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const session = await authService.login(userData);
      await checkAuthStatus();
      return session;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error during sign in",
      }));
      throw error;
    }
  };

  // Sign out user
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.logout();
      setState({
        user: null,
        isLoading: false,
        error: null,
      });
      router.push('/login');
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error during sign out",
      }));
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (userId: string, userData: UpdateUserData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedProfile = await authService.updateUserProfile(userId, userData);
      
      if (state.user) {
        setState({
          user: {
            account: state.user.account,
            profile: updatedProfile,
          },
          isLoading: false,
          error: null,
        });
      }
      
      return updatedProfile;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error updating profile",
      }));
      throw error;
    }
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const session = await authService.signInWithGoogle();
      await checkAuthStatus();
      return session;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error during Google sign in",
      }));
      throw error;
    }
  };

  // Sign in with GitHub
  const githubSignIn = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const session = await authService.signInWithGitHub();
      await checkAuthStatus();
      return session;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error during GitHub sign in",
      }));
      throw error;
    }
  };

  const value = {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    googleSignIn,
    githubSignIn,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 