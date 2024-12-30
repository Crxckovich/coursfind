'use client';

import { CourseWithDetails } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useSortContext } from "@/contexts/SortContext/SortContext";
import { motion, AnimatePresence } from "framer-motion";

interface CourseListProps {
  courses: CourseWithDetails[];
}

export function CourseList({ courses }: CourseListProps) {
  const { sortType, sortDirection } = useSortContext();

  const sortedCourses = [...courses].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    if (sortType === 'rating') {
      return (a.average_rating - b.average_rating) * multiplier;
    } else {
      return (a.price - b.price) * multiplier;
    }
  });

  return (
    <motion.div layout className="w-full h-full flex flex-col gap-y-8">
      <AnimatePresence>
        {sortedCourses.map((course) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard {...course} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

