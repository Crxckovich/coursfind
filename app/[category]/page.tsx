import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Htag } from "@/components/Htag";
import Link from 'next/link';
import { Button } from "@/components/ui/button/button";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const { data: categories } = await supabase
    .from('categories')
    .select('slug_type');

  return categories?.map((category) => ({
    category: category.slug_type,
  })) || [];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const { data: categoryData } = await supabase
    .from('categories')
    .select('name')
    .eq('slug_type', category)
    .single();

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
    };
  }

  return {
    title: `Категория: ${categoryData.name}`,
  };
}

async function getCategoryData(category: string) {
  const { data: categoryData } = await supabase
    .from('categories')
    .select('*')
    .eq('slug_type', category)
    .single();

  if (!categoryData) {
    return null;
  }

  const { data: subcategoryData } = await supabase
    .from('subcategories')
    .select('id, name, slug_type')
    .eq('category_id', categoryData.id);

  return { categoryData, subcategoryData };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const data = await getCategoryData(category);

  if (!data) {
    notFound();
  }

  const { categoryData, subcategoryData } = data;

  return (
    <div className="mx-auto py-10 container">
      <div className="flex flex-col gap-6">
        <Htag tag="h1">{categoryData.name}</Htag>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subcategoryData && subcategoryData.length > 0 ? (
            subcategoryData.map((subcat) => (
              <Link
                key={subcat.id}
                href={`/${category}/${subcat.slug_type}`}
              >
                <Button
                  variant="secondary"
                  className="w-full h-full min-h-[80px]"
                >
                  {subcat.name}
                </Button>
              </Link>
            ))
          ) : (
            <p>Нет доступных подкатегорий.</p>
          )}
        </div>
      </div>
    </div>
  );
}

