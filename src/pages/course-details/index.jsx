import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import CourseHero from './components/CourseHero';
import CourseCurriculum from './components/CourseCurriculum';
import CourseDescription from './components/CourseDescription';
import InstructorProfile from './components/InstructorProfile';
import StudentReviews from './components/StudentReviews';
import ProgressTracker from './components/ProgressTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CourseDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams?.get('id') || '1';

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Check enrollment status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setIsEnrolled(token && enrolledCourses?.includes(courseId));
  }, [courseId]);

  // Mock course data
  const courseData = {
    id: courseId,
    title: "Complete React Developer Course 2024: From Zero to Hero",
    shortDescription: "Master React.js with hands-on projects, hooks, context API, and modern development practices. Build real-world applications and become job-ready.",
    description: `This comprehensive React course takes you from complete beginner to advanced developer. You'll learn modern React development including functional components, hooks, context API, and state management.\n\nThe course includes 15+ real-world projects, covering everything from basic components to complex applications with authentication, API integration, and deployment.\n\nBy the end of this course, you'll have the skills and confidence to build production-ready React applications and land your dream job as a React developer.`,
    thumbnail: "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66",
    thumbnailAlt: "Modern laptop displaying React code editor with colorful syntax highlighting on dark background",
    category: "Web Development",
    level: "Beginner to Advanced",
    rating: 4.8,
    reviewCount: 12847,
    enrolledCount: 89234,
    duration: "42 hours",
    lastUpdated: "October 2024",
    price: 89.99,
    originalPrice: 199.99,
    isPreviewAvailable: true,
    instructor: {
      id: "inst_001",
      name: "Sarah Johnson",
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
      avatarAlt: "Professional headshot of Sarah Johnson, a woman with shoulder-length brown hair wearing a navy blazer",
      rating: 4.9,
      reviewCount: 45623,
      studentCount: 234567,
      courseCount: 12,
      bio: "Sarah is a senior full-stack developer with over 8 years of experience building scalable web applications. She has worked with companies like Google, Microsoft, and several successful startups. Sarah is passionate about teaching and has helped thousands of students transition into tech careers.",
      expertise: ["React", "JavaScript", "Node.js", "TypeScript", "AWS", "MongoDB"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahcodes",
        website: "https://sarahjohnson.dev"
      },
      otherCourses: [
      {
        id: "course_002",
        title: "Advanced JavaScript Patterns and Best Practices",
        thumbnail: "https://images.unsplash.com/photo-1516101922849-2bf0be616449",
        thumbnailAlt: "JavaScript code on computer screen with modern IDE interface",
        rating: 4.7,
        reviewCount: 8934,
        studentCount: 45678,
        price: 79.99
      },
      {
        id: "course_003",
        title: "Full-Stack Web Development with MERN Stack",
        thumbnail: "https://images.unsplash.com/photo-1651990892631-723da6447d7d",
        thumbnailAlt: "Multiple computer monitors showing full-stack development environment with code editors",
        rating: 4.9,
        reviewCount: 15672,
        studentCount: 67890,
        price: 129.99
      }]

    },
    learningObjectives: [
    "Build modern React applications using functional components and hooks",
    "Master state management with useState, useEffect, and Context API",
    "Create responsive and interactive user interfaces with React",
    "Implement routing and navigation with React Router",
    "Connect React apps to REST APIs and handle asynchronous data",
    "Deploy React applications to production environments",
    "Write clean, maintainable, and testable React code",
    "Understand React performance optimization techniques"],

    prerequisites: [
    "Basic knowledge of HTML, CSS, and JavaScript",
    "Familiarity with ES6+ JavaScript features",
    "Understanding of web development fundamentals",
    "No prior React experience required"],

    features: [
    { icon: "Video", text: "42 hours of video content" },
    { icon: "FileText", text: "15+ coding exercises" },
    { icon: "Award", text: "Certificate of completion" },
    { icon: "Smartphone", text: "Mobile and desktop access" },
    { icon: "Clock", text: "Lifetime access" },
    { icon: "Users", text: "Community support" }],

    targetAudience: [
    "Beginners who want to learn React from scratch",
    "JavaScript developers looking to add React to their skillset",
    "Frontend developers wanting to advance their career",
    "Students preparing for React developer interviews",
    "Anyone interested in modern web development"]

  };

  // Mock curriculum data
  const curriculumData = [
  {
    id: "section_1",
    title: "Getting Started with React",
    lessons: [
    {
      id: "lesson_1_1",
      title: "Introduction to React and Modern JavaScript",
      type: "video",
      duration: 720,
      isPreview: true
    },
    {
      id: "lesson_1_2",
      title: "Setting up Development Environment",
      type: "video",
      duration: 480
    },
    {
      id: "lesson_1_3",
      title: "Your First React Component",
      type: "video",
      duration: 600
    },
    {
      id: "lesson_1_4",
      title: "Knowledge Check: React Basics",
      type: "quiz",
      questionCount: 5
    }]

  },
  {
    id: "section_2",
    title: "React Components and JSX",
    lessons: [
    {
      id: "lesson_2_1",
      title: "Understanding JSX Syntax",
      type: "video",
      duration: 540
    },
    {
      id: "lesson_2_2",
      title: "Functional vs Class Components",
      type: "video",
      duration: 660
    },
    {
      id: "lesson_2_3",
      title: "Props and Component Communication",
      type: "video",
      duration: 780
    },
    {
      id: "lesson_2_4",
      title: "Building a Todo List Component",
      type: "video",
      duration: 900
    }]

  },
  {
    id: "section_3",
    title: "State Management and Hooks",
    lessons: [
    {
      id: "lesson_3_1",
      title: "Introduction to React Hooks",
      type: "video",
      duration: 600
    },
    {
      id: "lesson_3_2",
      title: "useState Hook Deep Dive",
      type: "video",
      duration: 720
    },
    {
      id: "lesson_3_3",
      title: "useEffect Hook and Side Effects",
      type: "video",
      duration: 840
    },
    {
      id: "lesson_3_4",
      title: "Custom Hooks Creation",
      type: "video",
      duration: 960
    }]

  }];


  // Mock user progress (only if enrolled)
  const userProgress = isEnrolled ? {
    lesson_1_1: 'completed',
    lesson_1_2: 'completed',
    lesson_1_3: 'in-progress',
    lesson_2_1: 'available'
  } : {};

  const progressData = isEnrolled ? {
    percentage: 35,
    completedLessons: 4,
    totalLessons: 12,
    startDate: "2024-10-15",
    totalWatchTime: "8h 32m",
    streakDays: 7,
    achievements: [
    {
      title: "First Steps",
      description: "Completed your first lesson",
      earnedAt: "2024-10-15"
    },
    {
      title: "Week Warrior",
      description: "7-day learning streak",
      earnedAt: "2024-10-22"
    }]

  } : null;

  const nextLesson = isEnrolled ? {
    id: "lesson_1_4",
    title: "Knowledge Check: React Basics",
    sectionNumber: 1,
    lessonNumber: 4
  } : null;

  const lastWatched = isEnrolled ? {
    id: "lesson_1_3",
    title: "Your First React Component",
    watchedAt: "2024-10-29"
  } : null;

  // Mock reviews data
  const reviewsData = [
  {
    id: "review_1",
    student: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1537107041341-713aaa2a234c",
      avatarAlt: "Professional headshot of Michael Chen, an Asian man with short black hair wearing a white shirt"
    },
    rating: 5,
    date: "2024-10-25",
    comment: "Absolutely fantastic course! Sarah explains complex concepts in a very clear and understandable way. The projects are practical and really help solidify the learning. I went from knowing nothing about React to building my own applications. Highly recommended!",
    isVerifiedPurchase: true,
    helpfulCount: 23,
    instructorReply: "Thank you so much, Michael! I'm thrilled to hear about your progress. Keep building and experimenting with React!"
  },
  {
    id: "review_2",
    student: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1734521992144-5a4d0ea55952",
      avatarAlt: "Professional headshot of Emily Rodriguez, a Latina woman with long dark hair wearing a blue blazer"
    },
    rating: 5,
    date: "2024-10-20",
    comment: "This course exceeded my expectations. The curriculum is well-structured, starting from basics and gradually building up to advanced topics. The hands-on projects were particularly valuable for my portfolio.",
    isVerifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: "review_3",
    student: {
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1630257202782-ae7fbd64bd02",
      avatarAlt: "Professional headshot of David Thompson, a Caucasian man with brown hair and beard wearing a gray sweater"
    },
    rating: 4,
    date: "2024-10-18",
    comment: "Great course overall. Sarah is an excellent instructor and the content is up-to-date. My only suggestion would be to include more advanced state management patterns, but that's a minor point.",
    isVerifiedPurchase: true,
    helpfulCount: 12
  },
  {
    id: "review_4",
    student: {
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1692243096801-e69acb2ea669",
      avatarAlt: "Professional headshot of Priya Patel, an Indian woman with long black hair wearing a white blouse"
    },
    rating: 5,
    date: "2024-10-15",
    comment: "Perfect for beginners! I had no prior React experience and now I feel confident building React applications. The step-by-step approach and real-world examples made all the difference.",
    isVerifiedPurchase: true,
    helpfulCount: 31
  }];


  const ratingBreakdown = {
    5: 156,
    4: 23,
    3: 8,
    2: 2,
    1: 1
  };

  const handleEnroll = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);

    // Simulate enrollment process
    setTimeout(() => {
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      enrolledCourses?.push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setIsEnrolled(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleStartLearning = () => {
    // Navigate to first lesson or continue from where left off
    navigate(`/student-dashboard?tab=courses&course=${courseId}`);
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'BookOpen' },
  { id: 'curriculum', label: 'Curriculum', icon: 'List' },
  { id: 'instructor', label: 'Instructor', icon: 'User' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' }];


  const breadcrumbs = [
  { label: 'Course Catalog', path: '/course-catalog', icon: 'BookOpen' },
  { label: courseData?.title, path: `/course-details?id=${courseId}`, isLast: true }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs customBreadcrumbs={breadcrumbs} />
          
          {/* Course Hero Section */}
          <div className="mb-8">
            <CourseHero
              course={courseData}
              isEnrolled={isEnrolled}
              onEnroll={handleEnroll}
              onStartLearning={handleStartLearning} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg shadow-card">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Course sections">
                    {tabs?.map((tab) =>
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id ?
                      'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`
                      }>

                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    )}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' &&
                  <CourseDescription course={courseData} />
                  }
                  
                  {activeTab === 'curriculum' &&
                  <CourseCurriculum
                    curriculum={curriculumData}
                    isEnrolled={isEnrolled}
                    userProgress={userProgress} />

                  }
                  
                  {activeTab === 'instructor' &&
                  <InstructorProfile instructor={courseData?.instructor} />
                  }
                  
                  {activeTab === 'reviews' &&
                  <StudentReviews
                    reviews={reviewsData}
                    overallRating={courseData?.rating}
                    ratingBreakdown={ratingBreakdown} />

                  }
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress Tracker (only for enrolled students) */}
              {isEnrolled && progressData &&
              <ProgressTracker
                progress={progressData}
                nextLesson={nextLesson}
                lastWatched={lastWatched} />

              }

              {/* Sticky Enrollment Card (for non-enrolled users) */}
              {!isEnrolled &&
              <div className="sticky top-24 bg-card border border-border rounded-lg shadow-card p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Play" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Start Learning Today
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Join {courseData?.enrolledCount?.toLocaleString()} students already enrolled
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {courseData?.originalPrice &&
                      <span className="text-lg text-muted-foreground line-through">
                            ${courseData?.originalPrice}
                          </span>
                      }
                        <span className="text-2xl font-bold text-foreground">
                          ${courseData?.price}
                        </span>
                      </div>
                      {courseData?.originalPrice &&
                    <span className="bg-error/10 text-error px-2 py-1 rounded text-sm font-medium">
                          Limited Time Offer
                        </span>
                    }
                    </div>

                    <Button
                    variant="default"
                    fullWidth
                    size="lg"
                    onClick={handleEnroll}
                    loading={isLoading}
                    iconName="ShoppingCart"
                    iconPosition="left">

                      Enroll Now
                    </Button>

                    <div className="text-center text-xs text-muted-foreground">
                      30-day money-back guarantee
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      This course includes:
                    </h4>
                    <div className="space-y-2">
                      {courseData?.features?.slice(0, 4)?.map((feature, index) =>
                    <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name={feature?.icon} size={14} className="text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature?.text}</span>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              }

              {/* Related Courses */}
              <div className="bg-card border border-border rounded-lg shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Students Also Bought
                </h3>
                <div className="space-y-4">
                  {courseData?.instructor?.otherCourses?.map((course, index) =>
                  <div key={index} className="flex space-x-3 p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                      <img
                      src={course?.thumbnail}
                      alt={course?.thumbnailAlt}
                      className="w-16 h-12 rounded object-cover flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground line-clamp-2">
                          {course?.title}
                        </h4>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) =>
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < Math.floor(course?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'} />

                          )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({course?.reviewCount})
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground mt-1">
                          ${course?.price}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default CourseDetails;