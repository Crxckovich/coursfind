import { supabase } from "@/lib/supabaseClient";
import { Category, NavItem, Subcategory } from "@/lib/types";

export function getCourseImageUrl(path: string | null): string {
  if (!path) return "/placeholder.svg";

  const { data } = supabase.storage
    .from('course-images')
    .getPublicUrl(path);

  return data.publicUrl;
}

const iconMap: { [key: string]: string } = {
  courses: 'GraduationCap',
  books: 'BookMarked',
  services: 'HandHeart',
  products: 'Boxes',
};

export async function getNavigationData(): Promise<NavItem[]> {
  const { data: categories } = await supabase.from('categories').select('*');
  const { data: subcategories } = await supabase.from('subcategories').select('*');

  if (!categories || !subcategories) {
    throw new Error('Failed to fetch data');
  }

  const navItems = categories.map((category: Category) => ({
    title: category.name,
    url: `/${category.slug_type}`,
    iconName: iconMap[category.slug_type as keyof typeof iconMap],
    items: subcategories
      .filter((subcategory: Subcategory) => subcategory.category_id === category.id)
      .map((subcategory: Subcategory) => ({
        title: subcategory.name,
        url: `/${category.slug_type}/${subcategory.slug_type}`,
      })),
  }));

  return navItems;
}

