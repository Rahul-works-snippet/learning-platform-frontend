import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ courses, viewMode = 'grid', enrolledCourses = [] }) => {
  if (courses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search criteria or filters to find the courses you're looking for.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4';

  return (
    <div className={gridClasses}>
      {courses?.map((course) => {
        const isEnrolled = enrolledCourses?.includes(course?.id);
        
        return (
          <CourseCard
            key={course?.id}
            course={course}
            isEnrolled={isEnrolled}
          />
        );
      })}
    </div>
  );
};

export default CourseGrid;