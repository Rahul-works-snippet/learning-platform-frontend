-- Location: supabase/migrations/20250130055046_education_platform_with_auth.sql
-- Schema Analysis: Fresh project - no existing schema detected
-- Integration Type: Complete education platform with authentication
-- Dependencies: None - initial schema creation

-- 1. Types for Education Platform
CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE public.enrollment_status AS ENUM ('pending', 'active', 'completed', 'dropped');
CREATE TYPE public.course_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.lesson_type AS ENUM ('video', 'text', 'quiz', 'assignment');

-- 2. Core Tables

-- Critical intermediary table for auth integration
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'student'::public.user_role,
    bio TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Course categories
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    instructor_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    level public.course_level DEFAULT 'beginner'::public.course_level,
    price DECIMAL(10,2) DEFAULT 0.00,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    duration_hours INTEGER DEFAULT 0,
    student_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Course sections/modules
CREATE TABLE public.course_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Individual lessons
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.course_sections(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    lesson_type public.lesson_type DEFAULT 'text'::public.lesson_type,
    video_url TEXT,
    duration_minutes INTEGER DEFAULT 0,
    order_index INTEGER NOT NULL,
    is_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Student enrollments
CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    status public.enrollment_status DEFAULT 'active'::public.enrollment_status,
    progress_percentage INTEGER DEFAULT 0,
    enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

-- Lesson progress tracking
CREATE TABLE public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    time_spent_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, lesson_id)
);

-- Course reviews
CREATE TABLE public.course_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_courses_instructor_id ON public.courses(instructor_id);
CREATE INDEX idx_courses_category_id ON public.courses(category_id);
CREATE INDEX idx_courses_published ON public.courses(is_published);
CREATE INDEX idx_course_sections_course_id ON public.course_sections(course_id);
CREATE INDEX idx_lessons_section_id ON public.lessons(section_id);
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX idx_lesson_progress_student_id ON public.lesson_progress(student_id);
CREATE INDEX idx_course_reviews_course_id ON public.course_reviews(course_id);

-- 4. Functions for automatic user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 5. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Pattern 1: Core user table - Simple direct access
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read for categories
CREATE POLICY "public_can_read_categories"
ON public.categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_categories"
ON public.categories
FOR ALL
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
))
WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
));

-- Pattern 4: Public read for published courses, instructors manage own
CREATE POLICY "public_can_read_published_courses"
ON public.courses
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "instructors_manage_own_courses"
ON public.courses
FOR ALL
TO authenticated
USING (instructor_id = auth.uid())
WITH CHECK (instructor_id = auth.uid());

CREATE POLICY "admins_manage_all_courses"
ON public.courses
FOR ALL
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
))
WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
));

-- Course sections and lessons - accessible based on course access
CREATE POLICY "users_can_view_course_sections"
ON public.course_sections
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id 
        AND (c.is_published = true OR c.instructor_id = auth.uid())
    )
);

CREATE POLICY "instructors_manage_own_course_sections"
ON public.course_sections
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id AND c.instructor_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id AND c.instructor_id = auth.uid()
    )
);

CREATE POLICY "users_can_view_lessons"
ON public.lessons
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.course_sections cs
        JOIN public.courses c ON cs.course_id = c.id
        WHERE cs.id = section_id 
        AND (c.is_published = true OR c.instructor_id = auth.uid())
    )
);

CREATE POLICY "instructors_manage_own_lessons"
ON public.lessons
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.course_sections cs
        JOIN public.courses c ON cs.course_id = c.id
        WHERE cs.id = section_id AND c.instructor_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.course_sections cs
        JOIN public.courses c ON cs.course_id = c.id
        WHERE cs.id = section_id AND c.instructor_id = auth.uid()
    )
);

-- Pattern 2: Simple user ownership for enrollments and progress
CREATE POLICY "users_manage_own_enrollments"
ON public.enrollments
FOR ALL
TO authenticated
USING (student_id = auth.uid())
WITH CHECK (student_id = auth.uid());

CREATE POLICY "users_manage_own_lesson_progress"
ON public.lesson_progress
FOR ALL
TO authenticated
USING (student_id = auth.uid())
WITH CHECK (student_id = auth.uid());

CREATE POLICY "users_manage_own_course_reviews"
ON public.course_reviews
FOR ALL
TO authenticated
USING (student_id = auth.uid())
WITH CHECK (student_id = auth.uid());

CREATE POLICY "public_can_read_course_reviews"
ON public.course_reviews
FOR SELECT
TO public
USING (true);

-- 7. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Mock Data for Education Platform
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    instructor_uuid UUID := gen_random_uuid();
    student_uuid UUID := gen_random_uuid();
    category1_uuid UUID := gen_random_uuid();
    category2_uuid UUID := gen_random_uuid();
    course1_uuid UUID := gen_random_uuid();
    course2_uuid UUID := gen_random_uuid();
    section1_uuid UUID := gen_random_uuid();
    section2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@eduplatform.com', crypt('Admin123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (instructor_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'instructor@eduplatform.com', crypt('Instructor123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "instructor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'student@eduplatform.com', crypt('Student123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Jane Doe", "role": "student"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create categories
    INSERT INTO public.categories (id, name, description, icon_name) VALUES
        (category1_uuid, 'Web Development', 'Learn modern web development technologies', 'Code'),
        (category2_uuid, 'Data Science', 'Master data analysis and machine learning', 'BarChart');

    -- Create sample courses
    INSERT INTO public.courses (id, title, description, short_description, instructor_id, category_id, level, price, is_published, duration_hours, student_count, rating) VALUES
        (course1_uuid, 'Complete React Developer Course', 'Master React from basics to advanced concepts including hooks, context, and modern patterns', 'Learn React from scratch with hands-on projects', instructor_uuid, category1_uuid, 'intermediate'::public.course_level, 99.99, true, 40, 156, 4.8),
        (course2_uuid, 'Python Data Analysis Fundamentals', 'Learn data analysis with Python, pandas, and visualization libraries', 'Start your data science journey with Python', instructor_uuid, category2_uuid, 'beginner'::public.course_level, 79.99, true, 25, 89, 4.6);

    -- Create course sections
    INSERT INTO public.course_sections (id, course_id, title, description, order_index) VALUES
        (section1_uuid, course1_uuid, 'React Fundamentals', 'Learn the basics of React components and JSX', 1),
        (section2_uuid, course1_uuid, 'Advanced React Patterns', 'Master hooks, context, and advanced patterns', 2);

    -- Create sample lessons
    INSERT INTO public.lessons (id, section_id, title, content, lesson_type, duration_minutes, order_index, is_preview) VALUES
        (gen_random_uuid(), section1_uuid, 'Introduction to React', 'Welcome to React! In this lesson we will cover the basics.', 'video'::public.lesson_type, 15, 1, true),
        (gen_random_uuid(), section1_uuid, 'Your First Component', 'Learn how to create your first React component.', 'video'::public.lesson_type, 20, 2, false),
        (gen_random_uuid(), section2_uuid, 'Understanding Hooks', 'Deep dive into React hooks and when to use them.', 'video'::public.lesson_type, 25, 1, false);

    -- Create sample enrollment
    INSERT INTO public.enrollments (student_id, course_id, status, progress_percentage) VALUES
        (student_uuid, course1_uuid, 'active'::public.enrollment_status, 35);

    -- Create sample review
    INSERT INTO public.course_reviews (student_id, course_id, rating, review_text) VALUES
        (student_uuid, course1_uuid, 5, 'Excellent course! The instructor explains everything clearly and the projects are very practical.');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;