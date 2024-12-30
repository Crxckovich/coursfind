'use server'

import { supabase } from "@/lib/supabaseClient";

export async function submitReview(formData: FormData) {
  try {
    const courseId = formData.get('courseId') as string;
    const authorName = formData.get('authorName') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string);

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        course_id: courseId,
        author_name: authorName,
        title,
        content,
        rating,
        is_moderated: false
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to submit review' };
  }
}

