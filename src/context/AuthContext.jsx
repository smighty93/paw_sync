import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // LOAD PROFILE
  // --------------------------------------------------

  const loadProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error(
        "Error loading profile:",
        error
      );

      setProfile(null);
      return null;
    }

    setProfile(data ?? null);

    return data ?? null;
  };

  // --------------------------------------------------
  // INITIAL AUTH LOAD
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Error getting session:",
            error
          );
        }

        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error(
          "Error loading authentication:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    // --------------------------------------------------
    // AUTH STATE LISTENER
    // --------------------------------------------------

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (!currentUser) {
          setProfile(null);
          setLoading(false);
          return;
        }

        await loadProfile(currentUser.id);

        if (mounted) {
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // --------------------------------------------------
  // SIGN UP
  // --------------------------------------------------

  const signUp = async ({
    email,
    password,
    fullName,
    phone,
    role = "pet_owner",
    specialization = null,
    experience = null,
  }) => {
    // ----------------------------------------------
    // Create Supabase Auth account
    // ----------------------------------------------

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
          phone,
          role,
          specialization,
          experience,
        },
      },
    });

    if (error) {
      return {
        data: null,
        error,
      };
    }

    // ----------------------------------------------
    // Create / update profile
    // ----------------------------------------------

    if (data.user) {
      const profileData = {
        id: data.user.id,
        full_name: fullName?.trim() || "",
        email: email?.trim() || "",
        phone: phone?.trim() || "",
        role,

        // Veterinarian-specific information
        specialization:
          role === "veterinarian"
            ? specialization?.trim() || null
            : null,

        experience:
          role === "veterinarian"
            ? experience !== null &&
              experience !== ""
              ? Number(experience)
              : null
            : null,

        updated_at: new Date().toISOString(),
      };

      const {
        data: createdProfile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .upsert(profileData, {
          onConflict: "id",
        })
        .select()
        .single();

      if (profileError) {
        console.error(
          "Error creating profile:",
          profileError
        );

        return {
          data,
          error: profileError,
        };
      }

      // Keep React state synchronized
      setProfile(createdProfile);
    }

    return {
      data,
      error: null,
    };
  };

  // --------------------------------------------------
  // SIGN IN
  // --------------------------------------------------

  const signIn = async (
    email,
    password
  ) => {
    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // --------------------------------------------------
  // LOGIN ALIAS
  // --------------------------------------------------

  const login = async (
    email,
    password
  ) => {
    return await signIn(
      email,
      password
    );
  };

  // --------------------------------------------------
  // SIGN OUT
  // --------------------------------------------------

  const signOut = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
    setProfile(null);
  };

  // --------------------------------------------------
  // CONTEXT
  // --------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        login,
        signOut,
        loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --------------------------------------------------
// USE AUTH
// --------------------------------------------------

export function useAuth() {
  return useContext(AuthContext);
}