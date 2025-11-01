import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const AuthFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 space-y-6">
      {/* Sign Up Prompt */}
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">
          Don't have an account yet?
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/register')}
          className="w-full sm:w-auto"
        >
          Create Account
        </Button>
      </div>
      {/* Additional Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
        <button
          onClick={() => navigate('/course-catalog')}
          className="text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:underline"
        >
          Browse Courses
        </button>
        <span className="hidden sm:inline text-muted-foreground">•</span>
        <button
          onClick={() => console.log('Help clicked')}
          className="text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:underline"
        >
          Need Help?
        </button>
        <span className="hidden sm:inline text-muted-foreground">•</span>
        <button
          onClick={() => console.log('Privacy clicked')}
          className="text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:underline"
        >
          Privacy Policy
        </button>
      </div>
      {/* Copyright */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} EduPlatform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;