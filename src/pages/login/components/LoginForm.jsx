import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(formData?.email, formData?.password);
      
      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setErrors({
            general: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.'
          });
          return;
        }
        
        setErrors({
          general: error?.message || 'Invalid credentials'
        });
        return;
      }
      
      // Navigate based on user role - will be handled by auth state change
      navigate('/student-dashboard');
      
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        setErrors({
          general: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        });
        return;
      }
      
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:underline"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="h-12"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Demo Credentials Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">Demo Credentials</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-blue-700">Admin:</span>
            <div className="text-blue-600">
              <span className="font-mono">admin@eduplatform.com</span> / <span className="font-mono">Admin123!</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700">Instructor:</span>
            <div className="text-blue-600">
              <span className="font-mono">instructor@eduplatform.com</span> / <span className="font-mono">Instructor123!</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700">Student:</span>
            <div className="text-blue-600">
              <span className="font-mono">student@eduplatform.com</span> / <span className="font-mono">Student123!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;