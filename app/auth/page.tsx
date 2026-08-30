"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured yet.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setError(result.error.message);
    } else if (mode === "signup") {
      setMessage("Account created. Check your email to confirm your address.");
    } else {
      setMessage("You are signed in.");
    }
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase?.auth.signOut();
    setMessage("You are signed out.");
  }

  return (
    <main className="auth-shell">
      <Link className="auth-back" href="/">&lt;- Back to Agriwerk</Link>
      <section className="auth-layout">
        <div className="auth-intro">
          <span className="eyebrow">Agriwerk LLP</span>
          <h1>Keep your work moving forward.</h1>
          <p>Sign in to stay connected with Agriwerk, or create an account to begin a conversation with our team.</p>
        </div>
        <div className="auth-panel">
          {user ? (
            <>
              <span className="eyebrow">Your account</span>
              <h2>You are signed in.</h2>
              <p className="auth-muted">{user.email}</p>
              <button className="button" type="button" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <div className="auth-tabs" role="tablist" aria-label="Account actions">
                <button className={mode === "login" ? "active" : ""} type="button" onClick={() => setMode("login")}>Log in</button>
                <button className={mode === "signup" ? "active" : ""} type="button" onClick={() => setMode("signup")}>Sign up</button>
              </div>
              <h2>{mode === "login" ? "Welcome back." : "Create your account."}</h2>
              <p className="auth-muted">{mode === "login" ? "Enter your details to continue." : "Use your email to get started."}</p>
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="auth-email">Email address</label>
                  <input id="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="auth-password">Password</label>
                  <input id="auth-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} />
                </div>
                <button className="button" type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}</button>
              </form>
              {message && <p className="success" role="status">{message}</p>}
              {error && <p className="form-error" role="alert">{error}</p>}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
