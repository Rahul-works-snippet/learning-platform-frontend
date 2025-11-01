import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressTracker = ({ progress, nextLesson, lastWatched }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
        Your Progress
      </h2>
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Course Completion</span>
          <span className="text-sm text-muted-foreground">
            {progress?.completedLessons} of {progress?.totalLessons} lessons
          </span>
        </div>
        
        <ProgressIndicator
          progress={progress?.percentage}
          variant="linear"
          showPercentage={true}
          animated={true}
          className="mb-2"
        />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Started {formatDate(progress?.startDate)}</span>
          {progress?.percentage === 100 && (
            <span className="text-success font-medium">
              <Icon name="Trophy" size={12} className="inline mr-1" />
              Completed!
            </span>
          )}
        </div>
      </div>
      {/* Next Lesson */}
      {nextLesson && progress?.percentage < 100 && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="PlayCircle" size={16} className="mr-2 text-primary" />
            Continue Learning
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {nextLesson?.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Section {nextLesson?.sectionNumber} • Lesson {nextLesson?.lessonNumber}
              </p>
            </div>
            
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              className="ml-3 flex-shrink-0"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      {/* Last Watched */}
      {lastWatched && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2 text-muted-foreground" />
            Recently Watched
          </h3>
          
          <div className="p-3 bg-muted/30 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium truncate">
                  {lastWatched?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Watched {formatDate(lastWatched?.watchedAt)}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                className="ml-3 flex-shrink-0"
              >
                Rewatch
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Learning Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-md">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <p className="text-lg font-semibold text-foreground">{progress?.totalWatchTime}</p>
          <p className="text-xs text-muted-foreground">Watch Time</p>
        </div>
        
        <div className="text-center p-3 bg-muted/30 rounded-md">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Calendar" size={16} className="text-primary" />
          </div>
          <p className="text-lg font-semibold text-foreground">{progress?.streakDays}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>
      {/* Achievements */}
      {progress?.achievements && progress?.achievements?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Award" size={16} className="mr-2 text-warning" />
            Achievements
          </h3>
          
          <div className="space-y-2">
            {progress?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-warning/5 border border-warning/20 rounded-md">
                <Icon name="Trophy" size={16} className="text-warning flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                </div>
                <span className="text-xs text-warning font-medium">
                  {formatDate(achievement?.earnedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Certificate */}
      {progress?.percentage === 100 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <Icon name="Award" size={32} className="text-success mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Congratulations!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've completed this course. Download your certificate of completion.
            </p>
            <Button
              variant="success"
              iconName="Download"
              iconPosition="left"
            >
              Download Certificate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;