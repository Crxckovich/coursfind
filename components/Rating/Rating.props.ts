import type { LucideProps } from 'lucide-react';

export interface StarWrapperProps {
  numStars?: number;
  icon?: React.ComponentType<LucideProps>;
  value?: number;
  disabled?: boolean;
  showcase?: boolean;
  iconProps?: LucideProps;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onChange?: (value: number) => void;
}

