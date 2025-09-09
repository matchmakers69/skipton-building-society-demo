import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="py-24">
          <div className="container">
            <Loader2 size={60} className="mx-auto animate-spin" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
