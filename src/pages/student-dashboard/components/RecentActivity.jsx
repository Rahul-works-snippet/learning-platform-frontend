import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';

const RecentActivity = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await userService?.getLearningActivity(user?.id, 5);
        if (!error && data) {
          setActivities(data);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-xl font-semibold text-text mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {Array?.from({ length: 3 })?.map((_, index) => (
            <div key={index} className="flex items-center space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return activityTime?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson_completed':
        return 'CheckCircle';
      case 'course_enrolled':
        return 'BookOpen';
      case 'quiz_completed':
        return 'Award';
      default:
        return 'Activity';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'lesson_completed':
        return 'text-green-600 bg-green-50';
      case 'course_enrolled':
        return 'text-blue-600 bg-blue-50';
      case 'quiz_completed':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">Recent Activity</h2>
        <Icon name="Activity" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities?.map((activity, index) => (
            <div key={activity?.id || index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-smooth">
              <div className={`p-2 rounded-lg ${getIconColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text line-clamp-1">
                  {activity?.title}
                </p>
                {activity?.description && (
                  <p className="text-xs text-text-secondary mt-1 line-clamp-1">
                    {activity?.description}
                  </p>
                )}
                <p className="text-xs text-text-secondary mt-2">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>

              {activity?.thumbnail && (
                <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0">
                  <img
                    src={activity?.thumbnail}
                    alt=""
                    className="w-full h-full rounded object-cover"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-secondary/40 mx-auto mb-4" />
            <p className="text-text-secondary">No recent activity</p>
            <p className="text-sm text-text-secondary mt-1">
              Start learning to see your progress here
            </p>
          </div>
        )}
      </div>

      {activities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary-dark font-medium transition-smooth">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;