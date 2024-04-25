"use client";

import { useState, useEffect } from "react";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const [SUPABASE_URL, SUPABASE_KEY] = [
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
];

if (SUPABASE_URL && SUPABASE_KEY) {
  // Good to go!
} else {
  throw new Error("Missing env variables");
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function LogIn() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        providers={["google", "github"]} // Facebook elegibility requires privase policy, user data deletion, category, app icon etc..
        onlyThirdPartyProviders={true}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        // redirectTo={`${window.location.origin}/`}
      />
    );
  } else {
    return (
      <button
        onClick={async () => await supabase.auth.signOut()}
        className="rounded-md bg-neutral text-neutral-content btn mb-3"
      >
        Sign Out
      </button>
    );
  }
}
