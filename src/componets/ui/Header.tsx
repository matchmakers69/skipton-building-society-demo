import Link from "next/link";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-10 h-[70px] w-[100vw] bg-white px-[3rem]">
      <div className="header-logo flex h-full flex-col justify-center">
        <Link
          className="logo-link font-roboto-condensed font-thin-text text-light-blue text-md inline-block sm:text-lg md:text-xl"
          href="/"
        >
          <span className="logo-text">Skipton Building Society</span>
        </Link>
      </div>
    </div>
  );
};
