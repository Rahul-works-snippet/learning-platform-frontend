import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const LearningHistorySection = () => {
  const [activeTab, setActiveTab] = useState('completed');

  const completedCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    instructor: "John Smith",
    completedDate: "2024-10-15",
    duration: "12 hours",
    rating: 5,
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66",
    thumbnailAlt: "Computer screen displaying React code with colorful syntax highlighting"
  },
  {
    id: 2,
    title: "JavaScript Advanced Concepts",
    instructor: "Emily Davis",
    completedDate: "2024-09-28",
    duration: "18 hours",
    rating: 4,
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1587023263472-2ac90f42b060",
    thumbnailAlt: "JavaScript code on dark background with golden syntax highlighting"
  },
  {
    id: 3,
    title: "CSS Grid & Flexbox Mastery",
    instructor: "Michael Chen",
    completedDate: "2024-09-10",
    duration: "8 hours",
    rating: 5,
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1720980741441-b00ae54be18a",
    thumbnailAlt: "CSS code snippet showing grid layout properties on computer monitor"
  }];


  const inProgressCourses = [
  {
    id: 4,
    title: "Node.js Backend Development",
    instructor: "Sarah Wilson",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    lastAccessed: "2024-10-29",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    thumbnailAlt: "Node.js logo and server code displayed on laptop screen"
  },
  {
    id: 5,
    title: "Database Design Principles",
    instructor: "Robert Taylor",
    progress: 30,
    totalLessons: 20,
    completedLessons: 6,
    lastAccessed: "2024-10-25",
    thumbnail: "https://images.unsplash.com/photo-1695070541574-10881ada30ba",
    thumbnailAlt: "Database schema diagram with connected tables on computer screen"
  }];


  const achievements = [
  {
    id: 1,
    title: "Fast Learner",
    description: "Completed 3 courses in one month",
    icon: "Zap",
    earnedDate: "2024-10-15",
    color: "text-warning"
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Achieved 100% on 5 quizzes",
    icon: "Star",
    earnedDate: "2024-09-28",
    color: "text-success"
  },
  {
    id: 3,
    title: "Dedicated Student",
    description: "7-day learning streak",
    icon: "Calendar",
    earnedDate: "2024-09-20",
    color: "text-primary"
  }];


  const tabs = [
  { id: 'completed', label: 'Completed Courses', count: completedCourses?.length },
  { id: 'progress', label: 'In Progress', count: inProgressCourses?.length },
  { id: 'achievements', label: 'Achievements', count: achievements?.length }];


  const handleDownloadCertificate = (courseId) => {
    console.log(`Downloading certificate for course ${courseId}`);
    // Mock certificate download
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="Star"
      size={14}
      className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'} />

    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6">Learning History</h2>
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-border mb-6">
        {tabs?.map((tab) =>
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.id)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-smooth ${
          activeTab === tab?.id ?
          'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`
          }>

            {tab?.label}
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
              {tab?.count}
            </span>
          </button>
        )}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'completed' &&
        <div className="space-y-4">
            {completedCourses?.map((course) =>
          <div key={course?.id} className="flex flex-col sm:flex-row sm:items-center p-4 border border-border rounded-lg hover:shadow-card transition-smooth">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                  src={course?.thumbnail}
                  alt={course?.thumbnailAlt}
                  className="w-full h-full object-cover" />

                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{course?.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course?.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(course?.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">{course?.duration}</span>
                      <span className="text-xs text-muted-foreground">
                        Completed {new Date(course.completedDate)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  {course?.certificate &&
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleDownloadCertificate(course?.id)}>

                      Certificate
                    </Button>
              }
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View Course
                  </Button>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'progress' &&
        <div className="space-y-4">
            {inProgressCourses?.map((course) =>
          <div key={course?.id} className="flex flex-col sm:flex-row sm:items-center p-4 border border-border rounded-lg hover:shadow-card transition-smooth">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                  src={course?.thumbnail}
                  alt={course?.thumbnailAlt}
                  className="w-full h-full object-cover" />

                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{course?.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course?.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <ProgressIndicator progress={course?.progress} size="sm" />
                        <span className="text-sm text-muted-foreground">
                          {course?.completedLessons}/{course?.totalLessons} lessons
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last accessed {new Date(course.lastAccessed)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Button variant="default" size="sm">
                    Continue Learning
                  </Button>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'achievements' &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements?.map((achievement) =>
          <div key={achievement?.id} className="p-4 border border-border rounded-lg text-center hover:shadow-card transition-smooth">
                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 ${achievement?.color}`}>
                  <Icon name={achievement?.icon} size={24} />
                </div>
                <h3 className="font-medium text-foreground mb-1">{achievement?.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement?.description}</p>
                <p className="text-xs text-muted-foreground">
                  Earned {new Date(achievement.earnedDate)?.toLocaleDateString()}
                </p>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

};

export default LearningHistorySection;