import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseDescription = ({ course }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">About This Course</h2>
      {/* Course Description */}
      <div className="mb-6">
        <div className={`text-muted-foreground leading-relaxed ${!showFullDescription ? 'line-clamp-4' : ''}`}>
          {course?.description}
        </div>
        {course?.description?.length > 300 && (
          <Button
            variant="link"
            size="sm"
            onClick={toggleDescription}
            className="mt-2 p-0 h-auto text-primary"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>
      {/* Learning Objectives */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course?.learningObjectives?.map((objective, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{objective}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Prerequisites */}
      {course?.prerequisites && course?.prerequisites?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertCircle" size={20} className="mr-2 text-warning" />
            Prerequisites
          </h3>
          <div className="space-y-2">
            {course?.prerequisites?.map((prerequisite, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="Dot" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{prerequisite}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Course Features */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Course Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {course?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-md">
              <Icon name={feature?.icon} size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{feature?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Target Audience */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-primary" />
          Who This Course Is For
        </h3>
        <div className="space-y-2">
          {course?.targetAudience?.map((audience, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{audience}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;