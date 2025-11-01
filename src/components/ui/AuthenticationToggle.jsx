import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

const AuthenticationToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location?.pathname === '/login';
  const isRegisterPage = location?.pathname === '/register';

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  // If we're on auth pages, show toggle between login/register
  if (isLoginPage || isRegisterPage) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </span>
        <Button
          variant="link"
          size="sm"
          onClick={isLoginPage ? handleSignUp : handleSignIn}
          className="p-0 h-auto font-medium"
        >
          {isLoginPage ? 'Sign up' : 'Sign in'}
        </Button>
      </div>
    );
  }

  // Default header auth buttons
  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignIn}
        className="text-muted-foreground hover:text-foreground"
      >
        Sign In
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthenticationToggle;