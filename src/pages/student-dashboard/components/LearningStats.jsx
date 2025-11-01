import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';

const LearningStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await userService?.getUserProfile(user?.id);
        if (!error && data?.stats) {
          setStats(data?.stats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array?.from({ length: 4 })?.map((_, index) => (
          <div key={index} className="bg-surface rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-16 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-12 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Enrolled Courses',
      value: stats?.totalEnrollments || 0,
      subtext: `${stats?.activeEnrollments || 0} active`,
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Completed Lessons',
      value: stats?.completedLessons || 0,
      subtext: 'lessons finished',
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Average Progress',
      value: `${stats?.averageProgress || 0}%`,
      subtext: 'across all courses',
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Study Streak',
      value: '7',
      subtext: 'days in a row',
      icon: 'Calendar',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-surface rounded-xl p-6 border border-border hover:shadow-lg transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-text-secondary">{stat?.title}</h3>
            <div className={`${stat?.bgColor} ${stat?.color} p-2 rounded-lg`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-text">{stat?.value}</p>
            <p className="text-sm text-text-secondary">{stat?.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningStats;