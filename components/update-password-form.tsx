"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
const UpdatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const supabase = createClient();

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
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
      onSubmit={handleUpdatePassword}
    >
      <div className="flex-col">
        <h1 className="text-3xl font-bold">Reset Your Password</h1>
        <p className="text-sm text-muted my-1">
          Please enter your new password below.
        </p>
      </div>
      <fieldset className="fieldset mt-3">
        <label className="label">New password</label>
        <input
          type="password"
          className="input validator"
          placeholder="Enter your new password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="validator-hint hidden">Required</p>
      </fieldset>

      {error && <p className="text-sm text-red-500 p-1">{error}</p>}
      <button
        className="btn btn-primary rounded-2xl mt-4 text-white"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save new password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
