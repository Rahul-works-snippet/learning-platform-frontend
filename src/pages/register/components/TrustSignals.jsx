import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
  {
    icon: 'Shield',
    title: 'SSL Encrypted',
    description: 'Your data is protected with 256-bit encryption'
  },
  {
    icon: 'Users',
    title: '50,000+ Students',
    description: 'Join thousands of learners worldwide'
  },
  {
    icon: 'Award',
    title: 'Certified Platform',
    description: 'Accredited by leading education bodies'
  },
  {
    icon: 'Clock',
    title: '24/7 Support',
    description: 'Get help whenever you need it'
  }];


  const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    avatar: "https://images.unsplash.com/photo-1730222168387-051038de25be",
    avatarAlt: 'Professional headshot of young woman with brown hair smiling at camera',
    quote: 'EduPlatform helped me transition into tech. The courses are comprehensive and the instructors are amazing!'
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    avatar: "https://images.unsplash.com/photo-1626788215369-3ba6c6ae88c0",
    avatarAlt: 'Professional headshot of Asian man in business attire with confident smile',
    quote: 'The flexibility to learn at my own pace while working full-time was exactly what I needed.'
  }];


  return (
    <div className="space-y-8">
      {/* Trust features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustFeatures?.map((feature, index) =>
        <div key={index} className="text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        )}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">
          What Our Students Say
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials?.map((testimonial, index) =>
          <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={12} className="text-yellow-500 fill-current" />
                  )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    "{testimonial?.quote}"
                  </p>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Security badges */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Shield" size={16} className="text-green-600" />
          <span className="text-xs font-medium">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Lock" size={16} className="text-blue-600" />
          <span className="text-xs font-medium">SOC 2 Certified</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="CheckCircle" size={16} className="text-purple-600" />
          <span className="text-xs font-medium">ISO 27001</span>
        </div>
      </div>
    </div>);

};

export default TrustSignals;