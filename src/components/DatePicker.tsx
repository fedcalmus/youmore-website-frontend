"use client";

import Flatpickr from "react-flatpickr";
import type { DateTimePickerProps } from "react-flatpickr";

export type DatePickerProps = DateTimePickerProps;

/**
 * Thin `react-flatpickr` wrapper styled to sit inside this site's own form
 * markup — renders with the same `.in` class as every other field, so it
 * inherits the shared border/radius/focus-ring. The calendar popup itself is
 * themed in styles/components/_flatpickr.scss.
 */
export function DatePicker({ className, options, ...rest }: DatePickerProps) {
  return (
    <Flatpickr
      className={["in", className].filter(Boolean).join(" ")}
      options={{ altInputClass: "in", ...options }}
      {...rest}
    />
  );
}
