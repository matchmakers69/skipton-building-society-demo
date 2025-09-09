import { format, parse, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

export const DATE_GLOBAL_FORMAT = "dd/MM/yyyy";
export const DATE_GLOBAL_LOCALE = enGB;
const BACKEND_FORMAT = "dd/MM/yyyy HH:mm:ss";

export function formatDateString(
  date: Date | string | number,
  customFormat: string = DATE_GLOBAL_FORMAT,
): string {
  try {
    let parsedDate: Date;

    if (typeof date === "string") {
      parsedDate = parse(date, BACKEND_FORMAT, new Date(), {
        locale: DATE_GLOBAL_LOCALE,
      });
    } else if (typeof date === "number") {
      parsedDate = new Date(date);
    } else {
      parsedDate = date as Date;
    }

    if (!isValid(parsedDate)) {
      const err = new Error("Invalid date");
      console.error("Invalid date:", date, err);
      return "";
    }

    return format(parsedDate, customFormat, { locale: DATE_GLOBAL_LOCALE });
  } catch (error) {
    console.error("Invalid date:", date, error as Error);
    return "";
  }
}

export function formatNowString(
  customFormat: string = DATE_GLOBAL_FORMAT,
): string {
  try {
    const now = new Date();
    return format(now, customFormat, { locale: DATE_GLOBAL_LOCALE });
  } catch (error) {
    console.error("Invalid date:", "now", error as Error);
    return "";
  }
}
