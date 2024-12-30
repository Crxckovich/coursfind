export interface Category {
  id: string;
  name: string;
  slug_type: string;
  created_at: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug_type: string;
  category_id: string;
  created_at: string;
}

export interface SubcategoryDesc {
  id: string;
  subcategory_id: string;
  description: string;
  created_at: string;
}

export interface ProfessionalAdvantage {
  id: string;
  subcategory_id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface VacancyStatistics {
  id: string;
  subcategory_id: string;
  total_count: number;
  junior_salary: number;
  middle_salary: number;
  senior_salary: number;
  created_at: string;
}

export interface NavItem {
  title: string;
  url: string;
  iconName?: string;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

export interface ProgramType {
  id: string;
  name: string;
  subcategory_id: string;
  course_count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug_id: string;
  created_at: string;
}

export interface CourseTag {
  course_id: string;
  tag_id: string;
  created_at: string;
}

export interface CourseProsAndCons {
  id: string;
  course_id: string;
  content: string;
  is_pro: boolean;
  created_at: string;
}

export interface DifficultyLevel {
  id: string;
  name: string;
  created_at: string;
}

export interface CompletionDocument {
  id: string;
  name: string;
  created_at: string;
}

export interface OnlineSchool {
  id: string;
  name: string;
  school_avatar: string;
  url: string;
  created_at: string;
}

export interface CourseWithDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  credit_price: number;
  discount_percentage: number;
  avatar_url: string;
  header_image_url: string;
  average_rating: number;
  duration_months: number;
  tags: Array<{ id: string; name: string }>;
  pros: string[];
  cons: string[];
  difficulty_level: { id: string; name: string };
  completion_document: { id: string; name: string };
  reviews?: Review[];
  school_id: string;
  school: OnlineSchool;
}

export interface Review {
  id: string;
  course_id: string;
  author_name: string;
  title: string;
  content: string;
  rating: number;
  created_at: string;
  is_moderated: boolean;
}