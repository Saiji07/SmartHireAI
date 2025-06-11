"use client";

import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  // 🔁 Initial session fetch
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = session.user;

        const { data: existingUsers, error } = await supabase
          .from("Users")
          .select("*")
          .eq("email", user.email);

        if (!error && existingUsers?.length === 0) {
          const { data: inserted, error: insertError } = await supabase
            .from("Users")
            .insert([
              {
                name: user.user_metadata?.name,
                email: user.email,
                picture: user.user_metadata?.picture,
              },
            ]);

          if (insertError) {
            console.error("❌ Error inserting user:", insertError.message);
          } else {
            console.log("✅ New user inserted:", inserted);
            setUser(inserted?.[0]);
          }
        } else {
          console.log("👤 User already exists.");
          setUser(existingUsers?.[0]);
        }
      }
    };

    getSession();

    // 🔁 Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}
