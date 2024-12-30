import { CourseWithDetails } from "@/lib/types";

export interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export interface SubcategoryData {
  categoryData: {
    id: string;
    name: string;
  };
  subcategoryData: {
    id: string;
    name: string;
  };
  programTypes: Array<{
    id: string;
    name: string;
  }>;
  vacancyStatistics: {
    [key: string]: string;
  };
  professionalAdvantages: Array<{
    id: string;
    content: string;
  }>;
  coursesWithDetails: CourseWithDetails[];
}

export interface GenerateMetadataProps {
  params: {
    category: string;
    subcategory: string;
  };
}

