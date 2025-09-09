"use client";

import { Button } from "@/componets/shared";
import { formatNowString } from "@/utils/dates";
import { AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorStateProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [errorCode] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReset = () => {
    setIsRotating(true);
    setTimeout(() => {
      reset();
      setIsRotating(false);
    }, 600);
  };

  return (
    <div
      className={`flex w-full items-center justify-center p-20 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ease-in-out">
        <div className="flex justify-center bg-gradient-to-b from-[var(--color-light-blue)] to-[var(--color-dark-navy)] p-6">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-20"></div>
            <AlertCircle size={80} className="relative z-10 text-white" />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-md mb-2 text-center font-bold text-gray-800 md:text-lg">
            Oh no! Something went wrong
          </h2>

          <div className="my-4 rounded border-l-4 border-[var(--color-dark-red)] bg-red-50 p-4">
            <p className="text-sm font-medium text-[var(--color-dark-red)] md:text-base">
              {error.message ||
                "We couldn't process your request at this time."}
            </p>
          </div>

          <p className="mb-6 text-center text-gray-600">
            No worries, we have logged this error and our team is working on it.
          </p>

          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Button onClick={handleReset} variant="secondary" size="sm">
              <RefreshCw
                size={18}
                className={`${isRotating ? "animate-spin" : ""}`}
              />
              Try Again
            </Button>

            <Button
              size="sm"
              onClick={() => (window.location.href = "/")}
              className="gap-2 border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              Go Home
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-500">Error Code: {errorCode}</p>
          <p className="text-sm text-gray-500">{formatNowString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
