import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  accentColor?: string;
};

const Button = ({ children, accentColor, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={`max-h-[50px] max-w-max rounded px-6 py-3 capitalize transition-all disabled:cursor-not-allowed ${
        accentColor || "bg-accent_secondary"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
