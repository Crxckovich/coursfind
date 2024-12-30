import { Htag } from "@/components/Htag";
import { P } from "@/components/P/P";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
// import { ProgramTypes } from "@/components/ProgramTypes";
import { SortButtons } from "@/components/SortButtons";
import { VacancyStatisticsSection } from "@/components/VacancyStatisticsSection";
import { ProfessionalAdvantagesSection } from "@/components/ProfessionalAdvantagesSection";
import { Metadata } from 'next';
import {CourseList} from "@/components/CourseList";
import {CourseProsAndCons, CourseWithDetails} from "@/lib/types";
import { SortProvider } from "@/contexts/SortContext/SortContext";
import {SubcategoryDesc} from "@/components/SubcategoryDesc/SubcategoryDesc";

export async function generateStaticParams() {
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('slug_type, categories!inner(slug_type)') as { data: Array<{ slug_type: string, categories: { slug_type: string } }> };

  return subcategories?.map((subcategory) => ({
    category: subcategory.categories.slug_type,
    subcategory: subcategory.slug_type
  })) || [];
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; subcategory: string }> }
): Promise<Metadata> {
  const { category, subcategory } = await params;

  if (subcategory) {
    const { data: subcategoryData } = await supabase
      .from('subcategories')
      .select('name')
      .eq('slug_type', subcategory)
      .single();

    return subcategoryData ? { title: subcategoryData.name } : { title: 'Подкатегория не найдена' };
  } else {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('name')
      .eq('slug_type', category)
      .single();

    return categoryData ? { title: categoryData.name } : { title: 'Категория не найдена' };
  }
}

export default async function SubcategoryPage({
  params
}: {
  params: Promise<{ category: string; subcategory: string }>
}) {

  const { category, subcategory } = await params;

  const { data: categoryData } = await supabase
    .from('categories')
    .select('*')
    .eq('slug_type', category)
    .single();

  const { data: subcategoryData } = await supabase
    .from('subcategories')
    .select('*')
    .eq('slug_type', subcategory)
    .eq('category_id', categoryData?.id)
    .single();

  // const { data: programTypes } = await supabase
  //   .from('program_types')
  //   .select('*')
  //   .eq('subcategory_id', subcategoryData?.id);

  const { data: vacancyStatistics } = await supabase
    .from('vacancy_statistics')
    .select('*')
    .eq('subcategory_id', subcategoryData?.id)
    .single();

  const { data: professionalAdvantages } = await supabase
    .from('professional_advantages')
    .select('*')
    .eq('subcategory_id', subcategoryData?.id);

  const { data: subcategoryDescriptions, error: descError } = await supabase
    .from('subcategory_description')
    .select('*')
    .eq('subcategory_id', subcategoryData?.id);

  if (descError) {
    console.error('Error fetching subcategory descriptions:', descError);
  }

  const { data: coursesData, error } = await supabase
  .from('courses')
  .select(`
    *,
    difficulty_level:difficulty_level_id(id, name),
    completion_document:completion_document_id(id, name),
    course_tags!inner(
      tags(id, name)
    ),
    course_pros_cons(id, content, is_pro),
    reviews(*),
    online_schools:school_id(id, name, url, school_avatar)
  `)
  .eq('subcategory_id', subcategoryData?.id);

  if (error) {
    console.error('Error fetching courses:', error);
    // Handle the error appropriately
  }

  const coursesWithDetails = coursesData?.map(course => ({
    ...course,
    tags: course.course_tags.map((ct: CourseWithDetails) => ct.tags),
    pros: course.course_pros_cons
      .filter((item: CourseProsAndCons) => item.is_pro)
      .map((item: CourseProsAndCons) => item.content),
    cons: course.course_pros_cons
      .filter((item: CourseProsAndCons) => !item.is_pro)
      .map((item: CourseProsAndCons) => item.content),
    difficulty_level: course.difficulty_level,
    completion_document: course.completion_document,
    reviews: course.reviews || [],
    school: course.online_schools
  }));


  if (!categoryData || !subcategoryData) {
    notFound();
  }

  return (
    <SortProvider>
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 py-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <P>{categoryData.name}</P>
              <Htag tag="h1">{subcategoryData.name}</Htag>
            </div>
            {/*<div className="flex w-full justify-between">*/}
            {/*  <ProgramTypes programTypes={programTypes || []} />*/}
            {/*</div>*/}
            <SortButtons/>
          </div>
          <CourseList courses={coursesWithDetails || []}/>
          <VacancyStatisticsSection vacancyStatistics={vacancyStatistics || {}}/>
          <ProfessionalAdvantagesSection professionalAdvantages={professionalAdvantages || []}/>
          <SubcategoryDesc descriptions={subcategoryDescriptions || []}/>
        </div>
      </div>
    </SortProvider>
  );
}