// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface DropdownSelectorProps {
  options?: number[] | string[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
}

const DropdownSelector = ({
  options = [],
  defaultValue,
  onChange,
}: DropdownSelectorProps) => (
  <Select.Root
    defaultValue={defaultValue ?? options[0]}
    onValueChange={onChange}
  >
    <Select.Trigger
      className=" text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 z-50 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white p-6 text-[13px] text-xl leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Food"
    >
      <Select.Value placeholder="Válassz évet" />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className=" z-50 overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="text-violet11  z-50 flex h-[25px] cursor-default items-center justify-center bg-white">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: {
      children: React.ReactNode | string;
      className?: string;
      value?: string;
    },
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={clsx(
          "text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pr-[35px] pl-[25px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-200 data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default DropdownSelector;
