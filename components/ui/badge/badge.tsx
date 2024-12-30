import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from './badge.module.css';
import {BadgeProps} from "@/components/ui/badge/badge.props";

const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      default: styles['badge--default'],
      secondary: styles['badge--secondary'],
      destructive: styles['badge--destructive'],
      outline: styles['badge--outline'],
      green: styles['badge--green'],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };