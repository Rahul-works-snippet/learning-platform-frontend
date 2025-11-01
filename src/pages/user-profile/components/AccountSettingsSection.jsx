import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettingsSection = () => {
  const [activeSection, setActiveSection] = useState('password');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    newCourses: true,
    achievements: true,
    marketing: false,
    weeklyDigest: true,
    instructorMessages: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    dataCollection: false
  });

  const sections = [
    { id: 'password', label: 'Password & Security', icon: 'Lock' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy Settings', icon: 'Shield' }
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (passwordErrors?.[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordData?.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordData?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePassword()) {
      console.log('Updating password...');
      // Mock password update
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  const handlePrivacyChange = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Account Settings</h2>
            <nav className="space-y-1">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeSection === 'password' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Change Password</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showPasswords?.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData?.currentPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors?.currentPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={showPasswords?.current ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPasswords?.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData?.newPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors?.newPassword}
                    description="Must be at least 8 characters with uppercase, lowercase, and number"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={showPasswords?.new ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm New Password"
                    type={showPasswords?.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData?.confirmPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors?.confirmPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name={showPasswords?.confirm ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>

                <Button
                  variant="default"
                  onClick={handlePasswordSubmit}
                  iconName="Save"
                  iconPosition="left"
                >
                  Update Password
                </Button>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-medium text-foreground mb-3">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline" iconName="Shield" iconPosition="left">
                  Enable 2FA
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose what notifications you'd like to receive and how you'd like to receive them.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-4">Course Notifications</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Course updates and announcements"
                      description="Get notified when instructors post updates or announcements"
                      checked={notificationSettings?.courseUpdates}
                      onChange={() => handleNotificationChange('courseUpdates')}
                    />
                    <Checkbox
                      label="New course recommendations"
                      description="Receive personalized course suggestions based on your interests"
                      checked={notificationSettings?.newCourses}
                      onChange={() => handleNotificationChange('newCourses')}
                    />
                    <Checkbox
                      label="Achievement notifications"
                      description="Get notified when you earn badges or complete milestones"
                      checked={notificationSettings?.achievements}
                      onChange={() => handleNotificationChange('achievements')}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">Communication</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Messages from instructors"
                      description="Receive direct messages and feedback from course instructors"
                      checked={notificationSettings?.instructorMessages}
                      onChange={() => handleNotificationChange('instructorMessages')}
                    />
                    <Checkbox
                      label="Weekly learning digest"
                      description="Get a summary of your learning progress and recommendations"
                      checked={notificationSettings?.weeklyDigest}
                      onChange={() => handleNotificationChange('weeklyDigest')}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">Marketing</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Promotional emails"
                      description="Receive information about sales, new features, and special offers"
                      checked={notificationSettings?.marketing}
                      onChange={() => handleNotificationChange('marketing')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Control how your information is displayed and shared on the platform.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-4">Profile Visibility</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Show learning progress publicly"
                      description="Allow others to see your course completion and progress"
                      checked={privacySettings?.showProgress}
                      onChange={() => handlePrivacyChange('showProgress')}
                    />
                    <Checkbox
                      label="Display achievements and badges"
                      description="Show your earned certificates and achievements on your profile"
                      checked={privacySettings?.showAchievements}
                      onChange={() => handlePrivacyChange('showAchievements')}
                    />
                    <Checkbox
                      label="Allow direct messages"
                      description="Let other students and instructors send you messages"
                      checked={privacySettings?.allowMessages}
                      onChange={() => handlePrivacyChange('allowMessages')}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">Data & Analytics</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Allow data collection for personalization"
                      description="Help us improve your experience by analyzing your learning patterns"
                      checked={privacySettings?.dataCollection}
                      onChange={() => handlePrivacyChange('dataCollection')}
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-foreground mb-3">Account Actions</h4>
                  <div className="space-y-3">
                    <Button variant="outline" iconName="Download" iconPosition="left">
                      Download My Data
                    </Button>
                    <Button variant="destructive" iconName="Trash2" iconPosition="left">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;