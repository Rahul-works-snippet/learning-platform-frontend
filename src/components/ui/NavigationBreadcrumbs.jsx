import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBreadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Route mapping for breadcrumb generation
  const routeMap = {
    '/': 'Home',
    '/course-catalog': 'Course Catalog',
    '/course-details': 'Course Details',
    '/student-dashboard': 'My Learning',
    '/user-profile': 'Profile',
    '/login': 'Sign In',
    '/register': 'Sign Up'
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Add home/dashboard as first breadcrumb (except for auth pages)
    if (!['/login', '/register']?.includes(location?.pathname)) {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/student-dashboard',
        icon: 'Home'
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on auth pages or if only one item
  if (['/login', '/register']?.includes(location?.pathname) || breadcrumbs?.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-1 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {breadcrumb?.isLast ? (
              <span className="text-foreground font-medium flex items-center space-x-1">
                {breadcrumb?.icon && (
                  <Icon name={breadcrumb?.icon} size={14} />
                )}
                <span>{breadcrumb?.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
                className="text-muted-foreground hover:text-foreground p-1 h-auto font-normal flex items-center space-x-1"
              >
                {breadcrumb?.icon && (
                  <Icon name={breadcrumb?.icon} size={14} />
                )}
                <span>{breadcrumb?.label}</span>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;