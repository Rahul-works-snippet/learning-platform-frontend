import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseHero = ({ course, isEnrolled, onEnroll, onStartLearning }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };


  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Course Thumbnail */}
        <div className="lg:col-span-1">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={course?.thumbnail}
              alt={course?.thumbnailAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Icon name="Play" size={24} className="text-primary ml-1" />
              </div>
            </div>
            {course?.isPreviewAvailable && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  Preview Available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Course Information */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                {course?.category}
              </span>
              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-sm font-medium">
                {course?.level}
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {course?.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {course?.shortDescription}
            </p>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center space-x-3">
            <Image
              src={course?.instructor?.avatar}
              alt={course?.instructor?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{course?.instructor?.name}</p>
              <p className="text-sm text-muted-foreground">{course?.instructor?.title}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center space-x-1">
              {renderStars(course?.rating)}
              <span className="font-medium text-foreground ml-2">{course?.rating}</span>
              <span className="text-muted-foreground">({course?.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>{course?.enrolledCount?.toLocaleString()} students</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Updated {course?.lastUpdated}</span>
            </div>
          </div>

          {/* Pricing and Enrollment */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              {course?.originalPrice && course?.originalPrice > course?.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(course?.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-foreground">
                {course?.price === 0 ? 'Free' : formatPrice(course?.price)}
              </span>
              {course?.originalPrice && course?.originalPrice > course?.price && (
                <span className="bg-error/10 text-error px-2 py-1 rounded text-sm font-medium">
                  {Math.round(((course?.originalPrice - course?.price) / course?.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              {isEnrolled ? (
                <Button
                  variant="default"
                  size="lg"
                  onClick={onStartLearning}
                  iconName="Play"
                  iconPosition="left"
                  className="min-w-[140px]"
                >
                  Continue Learning
                </Button>
              ) : (
                <>
                  {course?.isPreviewAvailable && (
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      Preview
                    </Button>
                  )}
                  <Button
                    variant="default"
                    size="lg"
                    onClick={onEnroll}
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="min-w-[140px]"
                  >
                    {course?.price === 0 ? 'Enroll Free' : 'Enroll Now'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;