import * as React from "react";

import { cn } from "@/core/helpers/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-[#333333] vercel-card ",
          className,
        )}

        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
