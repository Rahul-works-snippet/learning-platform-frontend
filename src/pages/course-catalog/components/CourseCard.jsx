import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, isEnrolled = false }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate('/course-details', { state: { courseId: course?.id } });
  };

  const handleEnrollClick = (e) => {
    e?.stopPropagation();
    if (isEnrolled) {
      navigate('/student-dashboard');
    } else {
      navigate('/course-details', { state: { courseId: course?.id } });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer group"
      onClick={handleCourseClick}
    >
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={course?.thumbnail}
          alt={course?.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {isEnrolled && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
            <Icon name="CheckCircle" size={12} className="inline mr-1" />
            Enrolled
          </div>
        )}
        {course?.isBestseller && (
          <div className="absolute top-3 left-3 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
            Bestseller
          </div>
        )}
        {course?.level && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            {course?.level}
          </div>
        )}
      </div>
      {/* Course Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">
            {course?.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {course?.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course?.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-muted-foreground mb-3">
          by {course?.instructor}
        </p>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {renderStars(course?.rating)}
            </div>
            <span className="text-sm font-medium text-foreground ml-1">
              {course?.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({course?.studentsCount?.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{course?.studentsCount?.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{course?.lessonsCount} lessons</span>
          </div>
        </div>

        {/* Price and Enroll Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course?.originalPrice && course?.originalPrice !== course?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${course?.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              {course?.price === 0 ? 'Free' : `$${course?.price}`}
            </span>
          </div>
          
          <Button
            variant={isEnrolled ? "outline" : "default"}
            size="sm"
            onClick={handleEnrollClick}
            className="min-w-[80px]"
          >
            {isEnrolled ? 'Continue' : course?.price === 0 ? 'Enroll Free' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;