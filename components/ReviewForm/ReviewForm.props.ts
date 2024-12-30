import { Review } from "@/lib/types";

export interface ReviewFormProps {
  courseId: string;
  onSubmitSuccess: (newReview: Review) => void;
}

export interface FormData {
  authorName: string;
  title: string;
  content: string;
  rating: number;
}