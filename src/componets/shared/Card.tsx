import { cn } from "@/utils";
import React, { forwardRef } from "react";

export type CardProps = { className?: string; children: React.ReactNode };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn("card dark-border", className)} {...rest}>
        <div className="flex h-full w-full flex-col sm:flex-wrap lg:flex-nowrap">
          <div className="flex h-full flex-col">{children}</div>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";
