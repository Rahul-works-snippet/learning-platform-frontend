import { supabase } from '../lib/supabase';

export const courseService = {
  // Get all published courses with instructor and category info
  async getAllCourses(filters = {}) {
    try {
      let query = supabase?.from('courses')?.select(`
          *,
          instructor:user_profiles!instructor_id(id, full_name, avatar_url),
          category:categories(id, name, icon_name),
          enrollments(count)
        `)?.eq('is_published', true)?.order('created_at', { ascending: false });

      // Apply filters
      if (filters?.category) {
        query = query?.eq('category_id', filters?.category);
      }
      
      if (filters?.level) {
        query = query?.eq('level', filters?.level);
      }
      
      if (filters?.search) {
        query = query?.or(`title.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get course by ID with full details
  async getCourseById(courseId) {
    try {
      const { data, error } = await supabase?.from('courses')?.select(`
          *,
          instructor:user_profiles!instructor_id(id, full_name, bio, avatar_url),
          category:categories(id, name),
          course_sections(
            id, title, description, order_index,
            lessons(id, title, duration_minutes, lesson_type, order_index, is_preview)
          ),
          course_reviews(
            id, rating, review_text, created_at,
            student:user_profiles!student_id(full_name, avatar_url)
          )
        `)?.eq('id', courseId)?.eq('is_published', true)?.single();
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get categories
  async getCategories() {
    try {
      const { data, error } = await supabase?.from('categories')?.select('*')?.order('name');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Enroll in a course
  async enrollInCourse(courseId) {
    try {
      const { data, error } = await supabase?.from('enrollments')?.insert([
          {
            course_id: courseId,
            student_id: (await supabase?.auth?.getUser())?.data?.user?.id
          }
        ])?.select()?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get user's enrollments
  async getUserEnrollments(userId = null) {
    try {
      const currentUserId = userId || (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('enrollments')?.select(`
          *,
          course:courses(
            id, title, short_description, thumbnail_url, level,
            instructor:user_profiles!instructor_id(full_name)
          )
        `)?.eq('student_id', currentUserId)?.order('enrolled_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Update lesson progress
  async updateLessonProgress(lessonId, isCompleted = true, timeSpent = 0) {
    try {
      const userId = (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('lesson_progress')?.upsert([
          {
            student_id: userId,
            lesson_id: lessonId,
            is_completed: isCompleted,
            time_spent_minutes: timeSpent,
            completed_at: isCompleted ? new Date()?.toISOString() : null
          }
        ])?.select()?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get user's lesson progress for a course
  async getUserCourseProgress(courseId) {
    try {
      const userId = (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('lesson_progress')?.select(`
          *,
          lesson:lessons(
            id, section_id,
            section:course_sections(course_id)
          )
        `)?.eq('student_id', userId)?.eq('lesson.section.course_id', courseId);
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Add course review
  async addCourseReview(courseId, rating, reviewText) {
    try {
      const userId = (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('course_reviews')?.insert([
          {
            student_id: userId,
            course_id: courseId,
            rating,
            review_text: reviewText
          }
        ])?.select()?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  }
};