import React from "react";

type ButtonProps = {
  isLoading: boolean;
  label: string;
  action?: () => void;
  type: "submit" | "button";
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  isLoading,
  type,
  action,
  label,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`w-full h-[2.2rem] bg-theme-primary rounded text-theme-light ${className} disabled:bg-theme-primary/60 disabled:cursor-not-allowed`}
      onClick={action}
    >
      {isLoading ? (
        <div className="spinner scale-[.3] mx-auto " />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};
export default Button;
