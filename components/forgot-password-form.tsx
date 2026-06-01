"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const supabase = createClient();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="fieldset mb-auto mt-20 bg-base-200 rounded-box w-sm border-base-200 p-4"
      onSubmit={handleForgotPassword}
    >
      {success ? (
        <>
          <div className="flex-col">
            <h1 className="text-3xl font-bold">Check Your Email</h1>
            <p className="text-sm text-muted my-1">
              Password reset instructions sent to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted my-5">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="btn btn-primary rounded-2xl mt-1 text-white"
          >
            Back to login
          </Link>
        </>
      ) : (
        <>
          <div className="flex-col">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-muted my-1">
              Type in your email and we&apos;ll send you a link to reset your
              password
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

          {error && <p className="text-sm text-red-500 p-1">{error}</p>}
          <button
            className="btn btn-primary rounded-2xl mt-4 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending reset email..." : "Send reset email"}
          </button>
          <span className="mt-1 text-sm text-muted text-center">
            Already have an account?
            <Link className="link  ml-1" href="/auth/login">
              Login
            </Link>
          </span>
        </>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
