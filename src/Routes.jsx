import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import StudentDashboard from './pages/student-dashboard';
import CourseCatalog from './pages/course-catalog';
import UserProfile from './pages/user-profile';
import CourseDetails from './pages/course-details';
import Register from './pages/register';
import InstructorDashboard from './pages/instructor-dashboard'; // ✅ NEW

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<CourseCatalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/course-catalog" element={<CourseCatalog />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<InstructorDashboard />} /> {/* ✅ NEW */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
