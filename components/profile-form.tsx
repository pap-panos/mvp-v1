"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Avatar from "./avatar";
import LogoutButton from "./logout-button";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/useTranslation";
import {
  preferredThemeToDaisyTheme,
  type PreferredLanguage,
  type PreferredTheme,
  type UserProfile,
} from "@/lib/profile";

type ProfileFormProps = {
  user: Pick<User, "id" | "email">;
  profile: UserProfile;
};

type ProfileFormState = {
  full_name: string;
  phone: string;
  avatar_url: string | null;
  preferred_language: PreferredLanguage;
  preferred_theme: PreferredTheme;
};

const allowedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarSize = 5 * 1024 * 1024;

function avatarExtension(file: File) {
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

function getAvatarStoragePath(avatarUrl: string | null) {
  if (!avatarUrl) return null;

  const marker = "/storage/v1/object/public/avatars/";
  const markerIndex = avatarUrl.indexOf(marker);
  if (markerIndex === -1) return null;

  return decodeURIComponent(
    avatarUrl.slice(markerIndex + marker.length).split("?")[0],
  );
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const router = useRouter();
  const t = useTranslation();
  const { setLanguage } = useLanguage();
  const { setTheme } = useTheme();
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<ProfileFormState>({
    full_name: profile.full_name ?? "",
    phone: profile.phone ?? "",
    avatar_url: profile.avatar_url,
    preferred_language: profile.preferred_language,
    preferred_theme: profile.preferred_theme,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(profile.preferred_language);
    setTheme(preferredThemeToDaisyTheme[profile.preferred_theme]);
  }, [profile.preferred_language, profile.preferred_theme, setLanguage, setTheme]);

  const saveProfile = async (nextForm: ProfileFormState) => {
    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: nextForm.full_name.trim() || null,
      phone: nextForm.phone.trim() || null,
      avatar_url: nextForm.avatar_url,
      preferred_language: nextForm.preferred_language,
      preferred_theme: nextForm.preferred_theme,
    });

    if (upsertError) throw upsertError;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setMessage(null);

    try {
      await saveProfile(form);
      setLanguage(form.preferred_language);
      setTheme(preferredThemeToDaisyTheme[form.preferred_theme]);
      setMessage("Profile updated.");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Profile update failed.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setMessage(null);

    try {
      if (!allowedAvatarTypes.includes(file.type)) {
        throw new Error("Upload a JPG, PNG, or WebP image.");
      }

      if (file.size > maxAvatarSize) {
        throw new Error("Avatar image must be 5MB or smaller.");
      }

      const filePath = `${user.id}/avatar-${Date.now()}.${avatarExtension(file)}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const nextForm = {
        ...form,
        avatar_url: publicUrl,
      };

      setForm(nextForm);
      await saveProfile(nextForm);

      const previousAvatarPath = getAvatarStoragePath(form.avatar_url);
      if (previousAvatarPath && previousAvatarPath !== filePath) {
        await supabase.storage.from("avatars").remove([previousAvatarPath]);
      }

      setMessage("Avatar updated.");
      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Avatar upload failed.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleThemeChange = (preferredTheme: PreferredTheme) => {
    setForm((current) => ({
      ...current,
      preferred_theme: preferredTheme,
    }));
    setTheme(preferredThemeToDaisyTheme[preferredTheme]);
  };

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-lg font-bold">{t.profile}</h1>

      <Avatar
        avatarUrl={form.avatar_url}
        fullName={form.full_name}
        email={user.email ?? null}
        isUploading={isUploading}
        onUpload={handleAvatarUpload}
      />

      <label className="fieldset">
        <span className="label">Email</span>
        <input
          className="input w-full"
          type="email"
          value={user.email ?? ""}
          disabled
        />
      </label>

      <label className="fieldset">
        <span className="label">Full name</span>
        <input
          className="input w-full"
          type="text"
          value={form.full_name}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              full_name: event.target.value,
            }))
          }
          autoComplete="name"
        />
      </label>

      <label className="fieldset">
        <span className="label">Mobile phone</span>
        <input
          className="input w-full"
          type="tel"
          value={form.phone}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              phone: event.target.value,
            }))
          }
          placeholder="+30 6900000000"
          autoComplete="tel"
        />
      </label>

      <label className="fieldset">
        <span className="label">Language</span>
        <select
          className="select w-full"
          value={form.preferred_language}
          onChange={(event) => {
            const preferredLanguage = event.target.value as PreferredLanguage;
            setForm((current) => ({
              ...current,
              preferred_language: preferredLanguage,
            }));
            setLanguage(preferredLanguage);
          }}
        >
          <option value="el">Ελληνικά</option>
          <option value="en">English</option>
        </select>
      </label>

      <label className="fieldset">
        <span className="label">Theme</span>
        <select
          className="select w-full"
          value={form.preferred_theme}
          onChange={(event) =>
            handleThemeChange(event.target.value as PreferredTheme)
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      {error && <p className="text-sm text-error">{error}</p>}
      {message && <p className="text-sm text-success">{message}</p>}

      <div className="flex items-center gap-2">
        <button
          className="btn btn-primary rounded-full text-white"
          type="submit"
          disabled={isSaving || isUploading}
        >
          {isSaving ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Saving...
            </>
          ) : (
            "Update"
          )}
        </button>
        <LogoutButton />
      </div>
    </form>
  );
}
