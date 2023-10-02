import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

const Button = ({ children, className, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded bg-accent px-6 py-2 capitalize text-white transition-all hover:opacity-90 disabled:cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
