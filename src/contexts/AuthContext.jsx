import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Load or clear user profile
  const profileOperations = {
    async load(userId) {
      if (!userId) return;
      setProfileLoading(true);
      try {
        // ✅ changed 'user_profiles' → 'Users'
        const { data, error } = await supabase
          ?.from('Users')
          ?.select('*')
          ?.eq('id', userId)
          ?.single();
        if (!error) setUserProfile(data);
      } catch (error) {
        console.error('Profile load error:', error);
      } finally {
        setProfileLoading(false);
      }
    },

    clear() {
      setUserProfile(null);
      setProfileLoading(false);
    },
  };

  // Handle Supabase auth session
  const authStateHandlers = {
    onChange: (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        profileOperations?.load(session?.user?.id); // Fire-and-forget
      } else {
        profileOperations?.clear();
      }
    },
  };

  useEffect(() => {
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      authStateHandlers?.onChange(null, session);
    });

    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Sign in method
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  };

  // Sign out method
  const signOut = async () => {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (!error) {
        setUser(null);
        profileOperations?.clear();
      }
      return { error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  };

  // Update profile method
  const updateProfile = async (updates) => {
    if (!user) return { error: { message: 'No user logged in' } };

    try {
      // ✅ changed 'user_profiles' → 'Users'
      const { data, error } = await supabase
        ?.from('Users')
        ?.update(updates)
        ?.eq('id', user?.id)
        ?.select()
        ?.single();
      if (!error) setUserProfile(data);
      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
