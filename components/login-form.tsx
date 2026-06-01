"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="fieldset mb-auto mt-20 bg-base-200 rounded-box w-auto border-base-200 p-4"
      onSubmit={handleLogin}
    >
      <div className="flex-col">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-muted my-1">
          Enter your email below to login to your account
        </p>
      </div>
      <fieldset className="fieldset mt-3">
        <label className="label">Email</label>
        <input
          type="email"
          className="input validator"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="validator-hint hidden">Required</p>
      </fieldset>

      <label className="fieldset">
        <div className="join">
          <span className="label join-item">Password</span>
          <Link
            href="/auth/forgot-password"
            className="link link-hover join-item ml-auto"
          >
            Forgot your password?
          </Link>
        </div>

        <input
          type="password"
          className="input validator"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="validator-hint hidden">Required</span>
      </label>
      {error && <p className="text-sm text-red-500 p-1">{error}</p>}
      <button
        className="btn btn-primary rounded-2xl mt-4 text-white"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <span className="mt-1 text-sm text-muted text-center">
        Don&apos;t have an account?
        <Link className="link  ml-1" href="/auth/signup">
          Sign Up
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
