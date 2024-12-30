import { ReactNode } from 'react';

export type SortType = 'rating' | 'price';
export type SortDirection = 'asc' | 'desc';

export interface SortContextType {
  sortType: SortType;
  sortDirection: SortDirection;
  toggleSort: (type: SortType) => void;
  getSortIcon: (type: SortType) => ReactNode;
}

export interface SortProviderProps {
  children: ReactNode;
}

