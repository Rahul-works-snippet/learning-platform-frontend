import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnrolledCourseCard = ({ enrollment }) => {
  const navigate = useNavigate();
  
  const course = enrollment?.course;
  const progress = enrollment?.progress_percentage || 0;
  const status = enrollment?.status || 'active';
  
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'active':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'active':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      case 'dropped':
        return 'Dropped';
      default:
        return 'Unknown';
    }
  };

  const handleContinueLearning = () => {
    navigate(`/course/${course?.id}`);
  };

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-smooth">
      {/* Course Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/30">
        {course?.thumbnail_url ? (
          <img
            src={course?.thumbnail_url}
            alt={course?.title || 'Course thumbnail'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="BookOpen" size={48} className="text-primary/40" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </div>
        
        {/* Progress Badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
          {progress}%
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
            {course?.title || 'Untitled Course'}
          </h3>
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {course?.short_description || 'No description available'}
          </p>
        </div>

        {/* Course Details */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>{course?.instructor?.full_name || 'Unknown Instructor'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="BarChart" size={14} />
              <span className="capitalize">{course?.level}</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text">{progress}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-smooth"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleContinueLearning}
          variant="default"
          fullWidth
          className="mt-4"
        >
          {status === 'completed' ? 'Review Course' : 'Continue Learning'}
        </Button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;