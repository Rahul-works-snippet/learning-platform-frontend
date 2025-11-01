import { supabase } from '../lib/supabase';

export const userService = {
  // Get user profile with stats
  async getUserProfile(userId = null) {
    try {
      const currentUserId = userId || (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', currentUserId)?.single();
      
      if (error) {
        return { data: null, error };
      }
      
      // Get additional stats based on role
      let stats = {};
      
      if (data?.role === 'student') {
        // Get enrollment stats
        const { data: enrollments } = await supabase?.from('enrollments')?.select('id, status, progress_percentage')?.eq('student_id', currentUserId);
        
        const { data: completedLessons } = await supabase?.from('lesson_progress')?.select('id')?.eq('student_id', currentUserId)?.eq('is_completed', true);
        
        stats = {
          totalEnrollments: enrollments?.length || 0,
          activeEnrollments: enrollments?.filter(e => e?.status === 'active')?.length || 0,
          completedLessons: completedLessons?.length || 0,
          averageProgress: enrollments?.length > 0 
            ? Math.round(enrollments?.reduce((sum, e) => sum + (e?.progress_percentage || 0), 0) / enrollments?.length)
            : 0
        };
      } else if (data?.role === 'instructor') {
        // Get instructor stats
        const { data: courses } = await supabase?.from('courses')?.select('id, student_count, rating')?.eq('instructor_id', currentUserId);
        
        stats = {
          totalCourses: courses?.length || 0,
          publishedCourses: courses?.filter(c => c?.is_published)?.length || 0,
          totalStudents: courses?.reduce((sum, c) => sum + (c?.student_count || 0), 0) || 0,
          averageRating: courses?.length > 0 
            ? (courses?.reduce((sum, c) => sum + (c?.rating || 0), 0) / courses?.length)?.toFixed(1)
            : '0.0'
        };
      }
      
      return { data: { ...data, stats }, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Update user profile
  async updateUserProfile(updates) {
    try {
      const userId = (await supabase?.auth?.getUser())?.data?.user?.id;
      
      const { data, error } = await supabase?.from('user_profiles')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', userId)?.select()?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get learning activity for dashboard
  async getLearningActivity(userId = null, limit = 10) {
    try {
      const currentUserId = userId || (await supabase?.auth?.getUser())?.data?.user?.id;
      
      // Get recent lesson completions
      const { data: recentProgress, error } = await supabase?.from('lesson_progress')?.select(`
          *,
          lesson:lessons(
            title,
            section:course_sections(
              title,
              course:courses(title, thumbnail_url)
            )
          )
        `)?.eq('student_id', currentUserId)?.eq('is_completed', true)?.order('completed_at', { ascending: false })?.limit(limit);
      
      if (error) {
        return { data: null, error };
      }
      
      // Transform data for activity feed
      const activities = recentProgress?.map(progress => ({
        id: progress?.id,
        type: 'lesson_completed',
        title: `Completed "${progress?.lesson?.title}"`,
        description: `in ${progress?.lesson?.section?.course?.title}`,
        timestamp: progress?.completed_at,
        thumbnail: progress?.lesson?.section?.course?.thumbnail_url
      })) || [];
      
      return { data: activities, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get dashboard statistics
  async getDashboardStats(userId = null) {
    try {
      const currentUserId = userId || (await supabase?.auth?.getUser())?.data?.user?.id;
      const user = await this.getUserProfile(currentUserId);
      
      if (!user?.data) {
        return { data: null, error: user?.error };
      }
      
      let dashboardData = {
        user: user?.data,
        stats: user?.data?.stats || {}
      };
      
      // Get role-specific data
      if (user?.data?.role === 'student') {
        // Get recent enrollments
        const { data: recentCourses } = await supabase?.from('enrollments')?.select(`
            *,
            course:courses(
              id, title, thumbnail_url, level,
              instructor:user_profiles!instructor_id(full_name)
            )
          `)?.eq('student_id', currentUserId)?.order('enrolled_at', { ascending: false })?.limit(4);
        
        dashboardData.recentCourses = recentCourses || [];
      }
      
      return { data: dashboardData, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  }
};