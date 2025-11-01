import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      const userRole = localStorage.getItem('userRole') || 'student';
      navigate('/student-dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - EduPlatform | Access Your Learning Dashboard</title>
        <meta name="description" content="Sign in to EduPlatform to access your courses, track progress, and continue your learning journey. Secure authentication with JWT-based login." />
        <meta name="keywords" content="login, sign in, education, online learning, courses, EduPlatform" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Auth Header */}
            <AuthHeader />
            
            {/* Login Form Card */}
            <div className="bg-card border border-border rounded-xl shadow-card p-6 sm:p-8">
              <LoginForm />
              
              {/* Trust Signals */}
              <TrustSignals />
            </div>
            
            {/* Auth Footer */}
            <AuthFooter />
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;