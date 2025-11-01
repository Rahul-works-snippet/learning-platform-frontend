import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstructorProfile = ({ instructor }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Meet Your Instructor</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Instructor Avatar and Basic Info */}
        <div className="flex-shrink-0">
          <Image
            src={instructor?.avatar}
            alt={instructor?.avatarAlt}
            className="w-24 h-24 rounded-full object-cover mx-auto sm:mx-0"
          />
        </div>

        {/* Instructor Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{instructor?.name}</h3>
            <p className="text-primary font-medium">{instructor?.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{instructor?.company}</p>
          </div>

          {/* Instructor Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                {renderStars(instructor?.rating)}
              </div>
              <p className="text-muted-foreground mt-1">{instructor?.rating} Instructor Rating</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{instructor?.reviewCount}</span>
              </div>
              <p className="text-muted-foreground mt-1">Reviews</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{instructor?.studentCount?.toLocaleString()}</span>
              </div>
              <p className="text-muted-foreground mt-1">Students</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{instructor?.courseCount}</span>
              </div>
              <p className="text-muted-foreground mt-1">Courses</p>
            </div>
          </div>

          {/* Instructor Bio */}
          <div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {instructor?.bio}
            </p>
          </div>

          {/* Expertise Tags */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {instructor?.expertise?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          {instructor?.socialLinks && (
            <div className="flex items-center space-x-3 pt-2">
              {instructor?.socialLinks?.linkedin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary"
                >
                  <Icon name="Linkedin" size={16} />
                </Button>
              )}
              {instructor?.socialLinks?.twitter && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary"
                >
                  <Icon name="Twitter" size={16} />
                </Button>
              )}
              {instructor?.socialLinks?.website && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary"
                >
                  <Icon name="Globe" size={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Other Courses by Instructor */}
      {instructor?.otherCourses && instructor?.otherCourses?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">
            More courses by {instructor?.name}
          </h4>
          <div className="space-y-3">
            {instructor?.otherCourses?.slice(0, 2)?.map((course, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <Image
                  src={course?.thumbnail}
                  alt={course?.thumbnailAlt}
                  className="w-16 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-foreground truncate">{course?.title}</h5>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(course?.rating)}
                      <span className="text-xs text-muted-foreground">({course?.reviewCount})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{course?.studentCount} students</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {course?.price === 0 ? 'Free' : `$${course?.price}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorProfile;