import clsx from "clsx";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

enum InputType {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  EMAIL = "email",
}

type Input = `${InputType}`;

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: Input;
  label?: string;
  name: string;
  required?: boolean;
  defaultValue: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line complexity
export const TextInput = ({
  type,
  label,
  required,
  defaultValue,
  onChange,
  onBlur,
  ...props
}: TextInputProps): JSX.Element => {
  const [touched, setTouched] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // with the :has selector there is no need to check for invalidity with js 🤯
  // sadly it is not supported in firefox yet.
  const validateField = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const validity = e.currentTarget.validity.valid;
    if (isInvalid === validity) {
      setIsInvalid(!validity);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    touched && validateField(e);
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    validateField(e);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onBlur?.(e);
    }
  };

  const isTouchedAndInvalid = touched && isInvalid;

  return (
    <div>
      <div
        className={twMerge(
          clsx(
            "focus-within:shadow-text-input relative flex max-w-[200px] flex-col-reverse justify-center rounded border border-slate-700 bg-white px-3 py-2 transition-shadow",
            isTouchedAndInvalid
              ? "[&:not(:focus-within)]:border-primary [&:not(:focus-within)]:bg-primary-dimmed [&:not(:focus-within)]:shadow-text-input-invalid"
              : ""
          )
        )}
      >
        <input
          className={clsx(
            `peer block appearance-none border-0 bg-transparent p-0 text-2xl  font-semibold  placeholder-gray-500 focus:ring-0 focus-visible:outline-none`,
            isTouchedAndInvalid ? "[&:not(:focus)]:bg-primary-dimmed" : ""
          )}
          ref={inputRef}
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          aria-label={label}
          required={required}
          aria-required={required}
          inputMode={type === InputType.NUMBER ? "numeric" : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          {...props}
        />

        <label
          className={`transition-opacity,transform block text-xs font-bold uppercase
        text-gray-700 duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};
