import Link from "next/link";
import { Button } from "../shared";

export const Footer = () => {
  return (
    <footer
      id="skipton-footer"
      className="bg-dark-navy w-full px-[3rem] py-[6rem] text-white"
    >
      <div className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2">
        <div className="flex items-center gap-4">
          <p>Skipton Building Society</p>
          <p>All rights reserved &copy; {new Date().getFullYear()}</p>
        </div>

        <nav className="flex flex-nowrap items-center justify-end gap-[2.5rem]">
          <Button
            className="flex-start min-w-[auto] px-0"
            asChild
            variant="link"
            size="sm"
          >
            <Link href="#">Terms and conditions</Link>
          </Button>

          <Button
            className="flex-start min-w-[auto] px-0"
            asChild
            variant="link"
            size="sm"
          >
            <Link href="#">Privacy policy</Link>
          </Button>

          <Button
            className="flex-start min-w-[auto] px-0"
            asChild
            variant="link"
            size="sm"
          >
            <Link href="#">Copyright</Link>
          </Button>
        </nav>
      </div>
    </footer>
  );
};
