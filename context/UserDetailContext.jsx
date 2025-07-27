"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr';

export const UserDetailContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: userProfile, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', session.user.email) 
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching user profile:", error);
          setUser(null);
        } else if (userProfile) {
          setUser(userProfile);
        } else {
     
          const { data: newUser, error: insertError } = await supabase
            .from('Users')
            .insert({
              
              name: session.user.user_metadata?.name,
              email: session.user.email,
              picture: session.user.user_metadata?.picture,
              credits: 10
            })
            .select()
            .single();
          
          if (insertError) {
            console.error("Error inserting new user:", insertError);
          } else {
            setUser(newUser);
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
