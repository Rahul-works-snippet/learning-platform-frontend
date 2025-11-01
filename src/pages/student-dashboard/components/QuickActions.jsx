import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'browse-courses',
      label: 'Browse Courses',
      description: 'Discover new learning opportunities',
      icon: 'Search',
      variant: 'default',
      action: () => navigate('/course-catalog')
    },
    {
      id: 'certificates',
      label: 'My Certificates',
      description: 'Download your earned certificates',
      icon: 'Award',
      variant: 'outline',
      action: () => console.log('Navigate to certificates')
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      description: 'Manage your account preferences',
      icon: 'Settings',
      variant: 'outline',
      action: () => navigate('/user-profile')
    },
    {
      id: 'support',
      label: 'Get Help',
      description: 'Contact support or browse FAQ',
      icon: 'HelpCircle',
      variant: 'ghost',
      action: () => console.log('Open support')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={action?.action}
            iconName={action?.icon}
            iconPosition="left"
            className="h-auto p-4 flex-col items-start text-left space-y-1"
          >
            <div className="flex items-center space-x-2 w-full">
              <span className="font-medium">{action?.label}</span>
            </div>
            <span className="text-xs text-muted-foreground font-normal">
              {action?.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;