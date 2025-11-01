import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PersonalInfoSection from './components/PersonalInfoSection';
import LearningHistorySection from './components/LearningHistorySection';
import AccountSettingsSection from './components/AccountSettingsSection';
import ProgressStatsSection from './components/ProgressStatsSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and bio'
    },
    {
      id: 'learning',
      label: 'Learning History',
      icon: 'BookOpen',
      description: 'Completed courses and progress'
    },
    {
      id: 'progress',
      label: 'Progress & Stats',
      icon: 'TrendingUp',
      description: 'Learning analytics and achievements'
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'Settings',
      description: 'Security and preferences'
    }
  ];

  const customBreadcrumbs = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'Home'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      isLast: true
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs customBreadcrumbs={customBreadcrumbs} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your account settings and view your learning progress
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => navigate('/student-dashboard')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {tabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'profile' && <PersonalInfoSection />}
            {activeTab === 'learning' && <LearningHistorySection />}
            {activeTab === 'progress' && <ProgressStatsSection />}
            {activeTab === 'settings' && <AccountSettingsSection />}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-12 bg-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                fullWidth
                iconName="BookOpen"
                iconPosition="left"
                onClick={() => navigate('/course-catalog')}
              >
                Browse Courses
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Play"
                iconPosition="left"
                onClick={() => navigate('/student-dashboard')}
              >
                Continue Learning
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Download certificates')}
              >
                Download Certificates
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => console.log('Contact support')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;