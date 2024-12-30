'use client';

import React, { createContext, useContext, useState } from 'react';
import { ArrowUpWideNarrow, ArrowDownWideNarrow, ArrowUp01, ArrowDown10 } from 'lucide-react';
import { SortContextType, SortType, SortDirection, SortProviderProps } from './SortContext.props';

const SortContext = createContext<SortContextType | undefined>(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSortContext must be used within a SortProvider');
  }
  return context;
};

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
  const [sortType, setSortType] = useState<SortType>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const toggleSort = (type: SortType) => {
    if (sortType === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (type: SortType) => {
    if (sortType !== type) {
      return type === 'rating' ? <ArrowUpWideNarrow /> : <ArrowUp01 />;
    }
    return sortDirection === 'desc'
      ? (type === 'rating' ? <ArrowUpWideNarrow /> : <ArrowDown10 />)
      : (type === 'rating' ? <ArrowDownWideNarrow /> : <ArrowUp01 />);
  };

  return (
    <SortContext.Provider value={{ sortType, sortDirection, toggleSort, getSortIcon }}>
      {children}
    </SortContext.Provider>
  );
};

