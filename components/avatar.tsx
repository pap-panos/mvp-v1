"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { useTranslation } from "@/hooks/useTranslation";
import no_image from "@/public/no_image.png";

export default function Avatar({
  uid,
  url,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center font-bold p-2">{t.profile}</h1>

      <div className=" flex p-2 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <Image
              alt="Tailwind CSS Navbar component"
              src={avatarUrl || no_image}
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className=" ml-2 ">
          <label
            className="btn btn-primary btn-soft rounded-full btn-sm hover:text-white"
            htmlFor="single"
          >
            {uploading ? (
              <>
                <span className="loading loading-spinner"></span>
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
            id="single"
            className="hidden"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
    </>
  );
}
