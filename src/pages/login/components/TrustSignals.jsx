import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by 50K+ users'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Trusted & Secure Platform</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={badge?.icon} size={16} className="text-success" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {badge?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with industry-standard security measures
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;