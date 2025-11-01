import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ role, isSelected, onSelect }) => {
  const roleConfig = {
    student: {
      icon: 'GraduationCap',
      title: 'Student',
      description: 'Access courses, track progress, and earn certificates',
      features: ['Enroll in courses', 'Track learning progress', 'Earn certificates', 'Join discussions']
    },
    instructor: {
      icon: 'Users',
      title: 'Instructor',
      description: 'Create and manage courses, engage with students',
      features: ['Create courses', 'Upload content', 'Manage students', 'Analytics dashboard']
    },
    administrator: {
      icon: 'Shield',
      title: 'Administrator',
      description: 'Manage platform operations and user accounts',
      features: ['User management', 'Platform analytics', 'Content moderation', 'System settings']
    }
  };

  const config = roleConfig?.[role];

  return (
    <div
      onClick={() => onSelect(role)}
      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-elevated'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
      }`}
    >
      {/* Selection indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          isSelected
            ? 'border-primary bg-primary' :'border-muted-foreground'
        }`}>
          {isSelected && (
            <Icon name="Check" size={12} color="white" />
          )}
        </div>
      </div>
      {/* Role icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
      }`}>
        <Icon name={config?.icon} size={24} />
      </div>
      {/* Role info */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {config?.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {config?.description}
      </p>
      {/* Features list */}
      <ul className="space-y-2">
        {config?.features?.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Check" size={14} className="text-success flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleSelectionCard;