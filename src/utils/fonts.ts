import { Roboto, Roboto_Condensed } from "next/font/google";

const RobotoFont = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["200", "300", "400", "500"],
});

const RobotoCondensedFont = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
  weight: ["200", "300", "400", "700", "900"],
});

const fonts = [RobotoFont, RobotoCondensedFont];
export const fontsClassName = fonts.map((font) => font.variable).join(" ");
