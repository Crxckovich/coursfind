import { VariantProps } from "class-variance-authority";
import {buttonVariants} from "@/components/ui/button/button";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  arrow?: 'right' | 'down' | 'none';
}