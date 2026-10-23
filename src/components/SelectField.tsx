"use client";

import { useId } from "react";
import ReactSelect from "react-select";
import type { GroupBase, Props as ReactSelectProps } from "react-select";

export interface SelectFieldOption {
  label: string;
  value: string | number;
}

export type SelectFieldProps<
  Option extends SelectFieldOption = SelectFieldOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, "unstyled" | "classNames" | "classNamePrefix">;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Searchable, styled select built on `react-select`, matching this site's
 * `.in` field styling instead of the browser-default `<select>`. Uses
 * react-select's `unstyled` + `classNames` API (the supported way to skin it
 * without fighting its emotion-generated styles) against
 * styles/components/_react-select.scss, built from this repo's own design
 * tokens — see admin's Select2.tsx for the same technique applied there.
 */
export function SelectField<
  Option extends SelectFieldOption = SelectFieldOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ instanceId, inputId, ...props }: SelectFieldProps<Option, IsMulti, Group>) {
  // react-select falls back to an internal auto-incrementing counter for
  // its generated ids (aria-live region, input, etc.) when no instanceId is
  // given, which drifts between the server and client render passes under
  // Next.js SSR and trips a hydration mismatch. React's own `useId` is
  // deterministic across both passes, so it's used as a stable default.
  const generatedId = useId();

  return (
    <ReactSelect<Option, IsMulti, Group>
      instanceId={instanceId ?? generatedId}
      inputId={inputId ?? generatedId}
      unstyled
      classNames={{
        control: (state) =>
          cx(
            "rselect__control",
            state.isFocused && "rselect__control--is-focused",
            state.isDisabled && "rselect__control--is-disabled",
          ),
        valueContainer: () => "rselect__value-container",
        placeholder: () => "rselect__placeholder",
        singleValue: () => "rselect__single-value",
        input: () => "rselect__input",
        indicatorsContainer: () => "rselect__indicators",
        indicatorSeparator: () => "rselect__indicator-separator",
        dropdownIndicator: () => "rselect__dropdown-indicator",
        clearIndicator: () => "rselect__clear-indicator",
        loadingIndicator: () => "rselect__loading-indicator",
        menu: () => "rselect__menu",
        menuList: () => "rselect__menu-list",
        groupHeading: () => "rselect__group-heading",
        option: (state) =>
          cx("rselect__option", state.isFocused && "rselect__option--is-focused", state.isSelected && "rselect__option--is-selected"),
        noOptionsMessage: () => "rselect__no-options",
      }}
      {...props}
    />
  );
}
