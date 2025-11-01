import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/course-catalog')}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <span className="text-2xl font-bold text-foreground">EduPlatform</span>
        </button>
      </div>
      
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Sign in to continue your learning journey
        </p>
      </div>
      
      {/* Demo Credentials Info */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-primary mb-1">Demo Credentials</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Student:</strong> student@eduplatform.com / Student123!</p>
              <p><strong>Instructor:</strong> instructor@eduplatform.com / Instructor123!</p>
              <p><strong>Admin:</strong> admin@eduplatform.com / Admin123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;