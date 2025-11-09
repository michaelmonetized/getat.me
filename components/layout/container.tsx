import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva(
  "px-4 sm:px-6 lg:px-8 w-full flex flex-col items-stretch justify-start gap-4",
  {
    variants: {
      size: {
        full: "min-w-full",
        boxed: "max-w-7xl mx-auto",
      },
    },
    defaultVariants: {
      size: "boxed",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

export function Container({
  children,
  size,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </div>
  );
}
