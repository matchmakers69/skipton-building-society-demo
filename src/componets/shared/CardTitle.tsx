import { cn } from "@/utils";
import { forwardRef, HTMLAttributes } from "react";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadElement> {
  subtitle?: string;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, subtitle, ...props }, ref) => (
    <header className={cn("card-title-header", className)}>
      <h2 ref={ref} className={cn("font-semibold", className)} {...props}>
        {props.children}
      </h2>
      {subtitle && <p className="text-text-grey text-sm">{subtitle}</p>}
    </header>
  ),
);

CardTitle.displayName = "Card";
