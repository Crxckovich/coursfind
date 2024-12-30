'use client';

import { Button } from "@/components/ui/button/button";
import { useSortContext } from "@/contexts/SortContext/SortContext";

export function SortButtons() {
  const { toggleSort, getSortIcon } = useSortContext();

  return (
    <div className="flex flex-wrap gap-5 items-center">
        <Button variant='ghost' onClick={() => toggleSort('rating')}>
          {getSortIcon('rating')}
          По рейтингу
        </Button>
        <Button variant='ghost' onClick={() => toggleSort('price')}>
          {getSortIcon('price')}
          По цене
        </Button>
    </div>
  );
}

