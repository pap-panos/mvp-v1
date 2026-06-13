"use client";

import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { useTranslation } from "@/hooks/useTranslation";
import { getInitials } from "@/lib/profile";

type AvatarProps = {
  avatarUrl: string | null;
  fullName: string | null;
  email: string | null;
  isUploading: boolean;
  onUpload: (file: File) => void;
};

export default function Avatar({
  avatarUrl,
  fullName,
  email,
  isUploading,
  onUpload,
}: AvatarProps) {
  const t = useTranslation();
  const initials = getInitials(fullName, email);

  return (
    <div className="flex items-center gap-4">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-base-200 ring-2 ring-offset-2">
          {avatarUrl ? (
            <Image
              alt={fullName || email || t.profile}
              src={avatarUrl}
              fill
              sizes="96px"
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-base-content">
              {initials}
            </span>
          )}
        </div>
      </div>

      <div>
        <label
          className="btn btn-primary btn-soft rounded-full btn-sm hover:text-white"
          htmlFor="avatar-upload"
        >
          {isUploading ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              {t.uploading}
            </>
          ) : (
            <>
              <MdOutlineFileUpload className="size-5" />
              {t.upload}
            </>
          )}
        </label>

        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
          disabled={isUploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
