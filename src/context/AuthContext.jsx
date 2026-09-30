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

  // ============================================================
  // LOAD PROFILE FROM DATABASE
  // ============================================================

  const loadProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    try {
      const {
        data,
        error,
      } = await supabase
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

      if (!data) {
        console.warn(
          "No profile found for user:",
          userId
        );

        setProfile(null);
        return null;
      }

      console.log(
        "AUTH PROFILE:",
        data
      );

      console.log(
        "AUTH ROLE FROM DATABASE:",
        data.role
      );

      setProfile(data);

      return data;
    } catch (error) {
      console.error(
        "Unexpected profile loading error:",
        error
      );

      setProfile(null);

      return null;
    }
  };

  // ============================================================
  // INITIAL AUTH LOAD
  // ============================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: {
            session,
          },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Error getting session:",
            error
          );

          if (mounted) {
            setUser(null);
            setProfile(null);
          }

          return;
        }

        if (!mounted) return;

        const currentUser =
          session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadProfile(
            currentUser.id
          );
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error(
          "Error initializing authentication:",
          error
        );

        if (mounted) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // ==========================================================
    // AUTH STATE LISTENER
    // ==========================================================

    const {
      data: {
        subscription,
      },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const currentUser =
          session?.user ?? null;

        setUser(currentUser);

        if (!currentUser) {
          setProfile(null);
          setLoading(false);
          return;
        }

        /*
         * IMPORTANT:
         *
         * Always load the role from the
         * profiles table.
         *
         * Do NOT use:
         *
         * currentUser.user_metadata.role
         *
         * for dashboard authorization.
         */

        await loadProfile(
          currentUser.id
        );

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

  // ============================================================
  // SIGN UP
  // ============================================================

  const signUp = async ({
    email,
    password,
    fullName,
    phone,
    role = "pet_owner",
    specialization = null,
    experience = null,
  }) => {
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
        },
      },
    });

    if (error) {
      return {
        data: null,
        error,
      };
    }

    if (data.user) {
      const profileData = {
        id: data.user.id,

        full_name:
          fullName?.trim() || "",

        email:
          email?.trim() || "",

        phone:
          phone?.trim() || "",

        role,

        specialization:
          role === "veterinarian"
            ? specialization?.trim() || null
            : null,

        experience:
          role === "veterinarian" &&
          experience !== null &&
          experience !== ""
            ? Number(experience)
            : null,

        updated_at:
          new Date().toISOString(),
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

      setProfile(createdProfile);

      console.log(
        "NEW PROFILE CREATED:",
        createdProfile
      );
    }

    return {
      data,
      error: null,
    };
  };

  // ============================================================
  // SIGN IN
  // ============================================================

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

    /*
     * IMPORTANT:
     *
     * After login, immediately load the database
     * profile so the application knows the real role.
     */

    if (data?.user) {
      setUser(data.user);

      const databaseProfile =
        await loadProfile(
          data.user.id
        );

      console.log(
        "LOGIN USER:",
        data.user.email
      );

      console.log(
        "LOGIN DATABASE ROLE:",
        databaseProfile?.role
      );
    }

    return data;
  };

  // ============================================================
  // LOGIN ALIAS
  // ============================================================

  const login = async (
    email,
    password
  ) => {
    return await signIn(
      email,
      password
    );
  };

  // ============================================================
  // SIGN OUT
  // ============================================================

  const signOut = async () => {
    const {
      error,
    } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
    setProfile(null);
  };

  // ============================================================
  // DATABASE ROLE
  // ============================================================

  const role =
    profile?.role || null;

  // ============================================================
  // CONTEXT
  // ============================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
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

// ============================================================
// USE AUTH
// ============================================================

export function useAuth() {
  return useContext(AuthContext);
}