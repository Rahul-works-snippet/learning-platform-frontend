import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    acceptTerms: false
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
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
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
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email: formData?.email,
        password: formData?.password,
        options: {
          data: {
            full_name: formData?.fullName,
            role: formData?.role
          }
        }
      });
      
      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setErrors({
            general: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.'
          });
          return;
        }
        
        setErrors({
          general: error?.message || 'Registration failed'
        });
        return;
      }
      
      // Show success message
      setErrors({
        success: 'Registration successful! Please check your email for verification.'
      });
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        setErrors({
          general: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        });
        return;
      }
      
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      
      {errors?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">{errors?.success}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          disabled={isLoading}
        />
        
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
        
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            I am a
          </label>
          <select
            name="role"
            value={formData?.role}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        
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
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-4">
        <Checkbox
          label="I accept the Terms and Conditions and Privacy Policy"
          name="acceptTerms"
          checked={formData?.acceptTerms}
          onChange={handleInputChange}
          error={errors?.acceptTerms}
          disabled={isLoading}
        />
      </div>
      
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;