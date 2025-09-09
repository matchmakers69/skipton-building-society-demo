import { forwardRef, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-dark-navy text-white",
        secondary: "bg-light-blue text-white",
        link: "text-white",
      },
      size: {
        default: "h-[44px] text-sm min-w-[17rem]",
        full: "h-[44px] px-6 py-2 text-sm w-full",
        sm: "px-7 text-sm min-w-[10rem] h-[44px]",
        lg: "h-[44px] px-8 text-md min-w-[18rem]",
        xl: "h-[44px] px-8 text-md",
      },
    },
  },
);

type ButtonProps = Readonly<{
  asChild?: boolean;
}> &
  VariantProps<typeof buttonVariants> &
  ComponentProps<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, children, variant, size, className, ...props },
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
export default Button;
