import React, { useState, useEffect } from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import LearningStats from './components/LearningStats';
import EnrolledCourseCard from './components/EnrolledCourseCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import CourseSearch from './components/CourseSearch';
import Header from '../../components/ui/Header';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await courseService?.getUserEnrollments(user?.id);
        if (!error && data) {
          setEnrollments(data);
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <WelcomeHeader />

          {/* Learning Statistics */}
          <LearningStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Enrolled Courses */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Search */}
              <CourseSearch 
                onSearch={(query) => {
                  // Handle search functionality
                  console.log('Search query:', query);
                }}
                enrolledCourses={enrollments || []}
              />

              {/* Enrolled Courses */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text">My Courses</h2>
                  <span className="text-sm text-text-secondary">
                    {enrollments?.length} {enrollments?.length === 1 ? 'course' : 'courses'}
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array?.from({ length: 4 })?.map((_, index) => (
                      <div key={index} className="bg-surface rounded-xl border border-border animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                        <div className="p-6 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : enrollments?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrollments?.map((enrollment) => (
                      <EnrolledCourseCard 
                        key={enrollment?.id} 
                        enrollment={enrollment} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-surface rounded-xl border border-border">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-lg font-medium text-text mb-2">No courses enrolled yet</h3>
                    <p className="text-text-secondary mb-6">
                      Start your learning journey by enrolling in a course
                    </p>
                    <button 
                      onClick={() => window.location.href = '/course-catalog'}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-smooth"
                    >
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Quick Actions & Activity */}
            <div className="space-y-6">
              <QuickActions />
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;