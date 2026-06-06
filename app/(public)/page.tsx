"use client";
import { useTranslation } from "@/hooks/useTranslation";

export default function LandingPage() {
  const t = useTranslation();

  return (
    <main className="mb-auto w-xl mt-5 p-4 font-bold text-xl text-center bg-base-100 rounded shadow h-screen">
      <span>{t.landingPage}</span>
    </main>
  );
}
