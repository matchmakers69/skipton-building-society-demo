import { cn } from "@/utils";
import { X } from "lucide-react";

export type AlertProps = {
  children: React.ReactNode;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  onClose?: () => void;
};

const baseClasses =
  "p-4 rounded-md flex items-start space-x-3 shadow-md text-sm";

const typeClasses = {
  success: "bg-green-100 text-green-700 border-l-4 border-green-600",
  error: "bg-red-100 text-red-700 border-l-4 border-red-600",
  warning: "bg-yellow-100 text-yellow-700 border-l-4 border-yellow-600",
  info: "bg-blue-100 text-blue-700 border-l-4 border-blue-600",
};

export const Alert = ({
  onClose,
  type = "info",
  className,
  children,
}: AlertProps) => {
  return (
    <div className={cn(baseClasses, typeClasses[type], className)}>
      <div className="flex-grow">
        <p className="text-md">{children}</p>
      </div>
      {onClose && (
        <button
          className="sidebar-close-menu flex h-[3rem] w-[3rem] cursor-pointer flex-col items-center justify-center border border-[rgb(175,175,175)] focus:ring-1 focus:outline-none focus-visible:ring-offset-1 md:hidden lg:p-[10px]"
          onClick={onClose}
          type="button"
          aria-label="close navigation sidebar"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};
