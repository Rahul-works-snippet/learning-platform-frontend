import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressStatsSection = () => {
  const stats = [
    {
      id: 1,
      title: "Total Learning Hours",
      value: "127",
      unit: "hours",
      icon: "Clock",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Courses Completed",
      value: "12",
      unit: "courses",
      icon: "GraduationCap",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Current Streak",
      value: "7",
      unit: "days",
      icon: "Flame",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Certificates Earned",
      value: "8",
      unit: "certificates",
      icon: "Award",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const skillProgress = [
    {
      skill: "JavaScript",
      level: "Advanced",
      progress: 85,
      courses: 5
    },
    {
      skill: "React",
      level: "Intermediate",
      progress: 70,
      courses: 3
    },
    {
      skill: "Node.js",
      level: "Beginner",
      progress: 35,
      courses: 2
    },
    {
      skill: "CSS",
      level: "Advanced",
      progress: 90,
      courses: 4
    }
  ];

  const monthlyActivity = [
    { month: "Jun", hours: 15 },
    { month: "Jul", hours: 22 },
    { month: "Aug", hours: 18 },
    { month: "Sep", hours: 28 },
    { month: "Oct", hours: 32 }
  ];

  const maxHours = Math.max(...monthlyActivity?.map(item => item?.hours));

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'text-warning bg-warning/10';
      case 'Intermediate':
        return 'text-primary bg-primary/10';
      case 'Advanced':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-6">Learning Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className={`w-16 h-16 rounded-full ${stat?.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.unit}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat?.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Skill Progress */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Skill Development</h3>
        <div className="space-y-4">
          {skillProgress?.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{skill?.skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSkillLevelColor(skill?.level)}`}>
                      {skill?.level}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {skill?.courses} courses
                    </span>
                  </div>
                </div>
                <ProgressIndicator 
                  progress={skill?.progress} 
                  variant="linear" 
                  showPercentage={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Activity */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Learning Activity</h3>
        <div className="flex items-end justify-between space-x-2 h-32">
          {monthlyActivity?.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-muted rounded-t-md relative overflow-hidden">
                <div
                  className="bg-primary rounded-t-md transition-all duration-300"
                  style={{
                    height: `${(item?.hours / maxHours) * 100}px`,
                    minHeight: '4px'
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{item?.month}</div>
              <div className="text-xs font-medium text-foreground">{item?.hours}h</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Total learning time this month: <span className="font-medium text-foreground">32 hours</span>
          </p>
        </div>
      </div>
      {/* Learning Streak */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Learning Streak</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={20} className="text-warning" />
            <span className="text-xl font-bold text-warning">7 days</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Keep up the great work! You're on a 7-day learning streak. Complete a lesson today to continue.
        </p>
        <div className="flex space-x-1">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                index < 7 ? 'bg-warning text-warning-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStatsSection;