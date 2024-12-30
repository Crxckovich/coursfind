import { Review } from "@/lib/types";

export interface ReviewCardProps {
  courseId: string;
  initialReviews?: Review[];
  pageSize?: number;
}

