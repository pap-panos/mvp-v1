"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const t = useTranslation();

  const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();

    setError(null);
    setIsLoading(true);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="fieldset mb-auto mt-20 bg-base-200 rounded-box w-80 border-base-200 p-4"
      onSubmit={handleSignup}
    >
      <div className="flex-col">
        <h1 className="text-3xl font-bold">{t.signup}</h1>
        <p className="text-sm text-muted my-1">{t.signupDescription}</p>
      </div>
      <fieldset className="fieldset mt-3">
        <label className="label">Email</label>
        <input
          id="email"
          type="email"
          className="input validator"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="validator-hint hidden">{t.required}</p>
      </fieldset>

      <label className="fieldset">
        <span className="label">{t.password}</span>
        <input
          id="password"
          type="password"
          className="input validator"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="validator-hint hidden">{t.required}</span>
      </label>
      <label className="fieldset">
        <span className="label">{t.repeatPassword}</span>
        <input
          id="repeat-password"
          type="password"
          className="input validator"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <span className="validator-hint hidden">{t.required}</span>
      </label>
      {error && <p className="text-sm text-red-500 p-1">{error}</p>}
      <button
        className="btn btn-primary rounded-2xl mt-4 text-white"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? t.creatingAccount : t.signup}
      </button>
      <span className="mt-1 text-sm text-muted text-center">
        {t.alreadyHaveAccount}
        <Link className="link  ml-1" href="/auth/login">
          {t.login}
        </Link>
      </span>
    </form>
  );
};

export default SignupForm;
