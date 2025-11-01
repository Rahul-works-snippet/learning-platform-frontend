import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCurriculum = ({ curriculum, isEnrolled, userProgress = {} }) => {
  const [expandedSections, setExpandedSections] = useState(new Set([0])); // First section expanded by default

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionIndex)) {
      newExpanded?.delete(sectionIndex);
    } else {
      newExpanded?.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getLessonStatus = (lessonId) => {
    if (!isEnrolled) return 'locked';
    return userProgress?.[lessonId] || 'available';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'in-progress':
        return <Icon name="PlayCircle" size={16} className="text-primary" />;
      case 'locked':
        return <Icon name="Lock" size={16} className="text-muted-foreground" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getTotalStats = () => {
    let totalLessons = 0;
    let totalDuration = 0;
    let totalQuizzes = 0;

    curriculum?.forEach(section => {
      section?.lessons?.forEach(lesson => {
        totalLessons++;
        totalDuration += lesson?.duration;
        if (lesson?.type === 'quiz') totalQuizzes++;
      });
    });

    return { totalLessons, totalDuration, totalQuizzes };
  };

  const { totalLessons, totalDuration, totalQuizzes } = getTotalStats();

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Course Curriculum</h2>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={16} />
            <span>{curriculum?.length} sections</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Play" size={16} />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{Math.floor(totalDuration / 3600)}h {Math.floor((totalDuration % 3600) / 60)}m total</span>
          </div>
          {totalQuizzes > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="HelpCircle" size={16} />
              <span>{totalQuizzes} quizzes</span>
            </div>
          )}
        </div>
      </div>
      <div className="divide-y divide-border">
        {curriculum?.map((section, sectionIndex) => {
          const isExpanded = expandedSections?.has(sectionIndex);
          const sectionDuration = section?.lessons?.reduce((acc, lesson) => acc + lesson?.duration, 0);
          
          return (
            <div key={section?.id} className="bg-card">
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      Section {sectionIndex + 1}: {section?.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{section?.lessons?.length} lessons</span>
                      <span>{Math.floor(sectionDuration / 60)}m {sectionDuration % 60}s</span>
                    </div>
                  </div>
                  <Icon
                    name={isExpanded ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-muted-foreground"
                  />
                </div>
              </button>
              {isExpanded && (
                <div className="pb-2">
                  {section?.lessons?.map((lesson, lessonIndex) => {
                    const status = getLessonStatus(lesson?.id);
                    const isAccessible = isEnrolled || lesson?.isPreview;
                    
                    return (
                      <div
                        key={lesson?.id}
                        className={`flex items-center justify-between p-3 mx-4 mb-2 rounded-md border transition-colors ${
                          isAccessible
                            ? 'border-border hover:bg-muted/30 cursor-pointer' :'border-muted bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          {getStatusIcon(status)}
                          
                          <div className="flex items-center space-x-2">
                            <Icon
                              name={lesson?.type === 'video' ? 'Play' : lesson?.type === 'quiz' ? 'HelpCircle' : 'FileText'}
                              size={14}
                              className="text-muted-foreground"
                            />
                            <span className={`text-sm ${isAccessible ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {lessonIndex + 1}. {lesson?.title}
                            </span>
                          </div>

                          {lesson?.isPreview && !isEnrolled && (
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                              Preview
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          {lesson?.type === 'video' && (
                            <span>{formatDuration(lesson?.duration)}</span>
                          )}
                          {lesson?.type === 'quiz' && (
                            <span>{lesson?.questionCount} questions</span>
                          )}
                          {!isAccessible && (
                            <Icon name="Lock" size={14} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!isEnrolled && (
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Enroll in this course to access all {totalLessons} lessons and track your progress
            </p>
            <Button variant="default" size="sm">
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCurriculum;