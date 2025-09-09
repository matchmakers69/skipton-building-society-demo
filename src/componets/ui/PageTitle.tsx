import { cn } from "@/utils";

type PageTitleProps = {
  readonly title: string;
  subtitle?: string;
  className?: string;
};

export const PageTitle = ({ title, subtitle, className }: PageTitleProps) => {
  return (
    <header
      className={cn("flex w-full flex-col px-[3rem] py-[5rem]", className)}
    >
      <div className={`${subtitle ? "mb-4" : "mb-0"} flex items-center gap-2`}>
        <h1 className="page-main-title">{title}</h1>
      </div>

      {subtitle && (
        <p className="md:text-md-xl text-text-grey text-sm font-normal">
          {subtitle}
        </p>
      )}
    </header>
  );
};
