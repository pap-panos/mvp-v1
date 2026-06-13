import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { useTranslation } from "@/hooks/useTranslation";
import no_image from "@/public/no_image.png";

export default function Avatar() {
  const t = useTranslation();

  return (
    <>
      <h1 className="text-lg text-center font-bold p-2">{t.profile}</h1>

      <div className=" flex p-2 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <Image
              alt="Tailwind CSS Navbar component"
              src={no_image}
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
            <>
              <span className="loading loading-spinner"></span>
              {t.uploading}
            </>

            <>
              <MdOutlineFileUpload className="size-5" />
              {t.upload}
            </>
          </label>

          <input type="file" id="single" className="hidden" accept="image/*" />
        </div>
      </div>
    </>
  );
}
