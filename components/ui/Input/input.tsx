import cn from "classnames";
import {InputProps} from "@/components/ui/Input/Input.props";
import {SearchIcon} from "lucide-react";
import React from "react";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 bg-secondary items-center border border-border rounded-md duration-150 pl-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[30px]" />
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 font-raleway font-normal bg-transparent placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };