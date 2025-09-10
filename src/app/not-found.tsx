"use client";

import { Button } from "@/componets/shared";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFound = ({ error }: any) => {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return <NotFoundContent />;
};

const NotFoundContent = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 space-y-8 text-center">
        <h1 className="relative bg-gradient-to-b from-[var(--color-light-blue)] to-[var(--color-dark-navy)] bg-clip-text text-8xl font-bold tracking-tighter text-transparent md:text-9xl">
          404
          <span className="absolute inset-0 -z-10 text-[var(--color-light-blue)] opacity-20">
            404
          </span>
        </h1>

        <div className="space-y-4">
          <h2 className="md:text-text-2xl text-text-lg font-semibold text-[var(--color-dark-navy)]">
            Oops, Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-[var(--color-dark-navy)]">
            The page you&apos;re looking for seems to have vanished. Let&apos;s
            get you back on track!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="rounded-full bg-[var(--color-dark-grey)]/[0.1] p-4">
            <AlertTriangle className="h-12 w-12 text-[var(--color-dark-red)]" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="sm"
            onClick={() => router.push("/")}
            className="rounded-full px-8 font-semibold text-[var(--color-dark-grey)] shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <Button
            size="sm"
            onClick={() => router.back()}
            className="rounded-full border px-8 font-semibold shadow-sm transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
