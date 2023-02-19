import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Highlighted = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode | string;
  className?: string;
}): JSX.Element => {
  return (
    <span
      className={twMerge(
        clsx(
          "text-bold inline-flex px-[6px] py-[2px] text-3xl font-extrabold text-teal-500 ",
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
