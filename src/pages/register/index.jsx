import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - EduPlatform | Join Thousands of Learners</title>
        <meta name="description" content="Create your EduPlatform account and start learning today. Choose from student, instructor, or administrator roles. Join 50,000+ learners worldwide." />
        <meta name="keywords" content="register, signup, create account, online learning, education platform, courses" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Column - Hero Content */}
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="GraduationCap" size={24} color="white" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">
                      Join EduPlatform
                    </h1>
                  </div>
                  
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                    Start your learning journey today and unlock your potential with our comprehensive online courses.
                  </p>

                  {/* Key Benefits */}
                  <div className="grid gap-4 mb-8">
                    {[
                    {
                      icon: 'BookOpen',
                      title: 'Access 1000+ Courses',
                      description: 'Learn from industry experts across various fields'
                    },
                    {
                      icon: 'Award',
                      title: 'Earn Certificates',
                      description: 'Get recognized credentials for your achievements'
                    },
                    {
                      icon: 'Users',
                      title: 'Join Community',
                      description: 'Connect with learners and instructors worldwide'
                    },
                    {
                      icon: 'Clock',
                      title: 'Learn at Your Pace',
                      description: 'Flexible scheduling that fits your lifestyle'
                    }]?.
                    map((benefit, index) =>
                    <div key={index} className="flex items-start space-x-3 text-left">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon name={benefit?.icon} size={16} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {benefit?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {benefit?.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                  <Image
                    src="https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb"
                    alt="Diverse group of students collaborating on laptops in modern classroom setting"
                    className="w-full h-64 lg:h-80 object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          {[
                          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face']?.
                          map((avatar, i) =>
                          <img
                            key={i}
                            src={avatar}
                            alt={`Student ${i + 1} profile photo showing diverse learner community`}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            50,000+ Students
                          </p>
                          <p className="text-xs text-gray-600">
                            Already learning with us
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="hidden lg:block">
                  <TrustSignals />
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-muted-foreground">
                      Get started with your personalized learning experience
                    </p>
                  </div>

                  <RegistrationForm />
                </div>
              </div>
            </div>

            {/* Mobile Trust Signals */}
            <div className="lg:hidden mt-12">
              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default Register;