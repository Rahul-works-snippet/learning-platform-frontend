import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import CourseGrid from './components/CourseGrid';
import LoadingSkeleton from './components/LoadingSkeleton';

const CourseCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    duration: 'all',
    priceRange: 'all',
    rating: 'all',
    features: {
      subtitles: false,
      quizzes: false,
      codingExercises: false,
      practiceTests: false
    }
  });

  // Mock enrolled courses
  const enrolledCourses = [1, 5, 8];

  // Mock courses data
  const mockCourses = [
  {
    id: 1,
    title: "Complete React Developer Course with Redux, Hooks, and GraphQL",
    instructor: "Sarah Johnson",
    category: "Programming",
    level: "Intermediate",
    rating: 4.8,
    studentsCount: 45230,
    price: 89.99,
    originalPrice: 199.99,
    duration: "42 hours",
    lessonsCount: 156,
    thumbnail: "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66",
    thumbnailAlt: "Modern laptop displaying React code on screen with colorful syntax highlighting",
    isBestseller: true
  },
  {
    id: 2,
    title: "Python for Data Science and Machine Learning Bootcamp",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
    level: "Beginner",
    rating: 4.7,
    studentsCount: 32100,
    price: 94.99,
    originalPrice: 179.99,
    duration: "38 hours",
    lessonsCount: 142,
    thumbnail: "https://images.unsplash.com/photo-1618422168439-4b03d3a05b15",
    thumbnailAlt: "Python programming code displayed on dark computer screen with data visualization charts",
    isBestseller: false
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals: From Wireframes to Prototypes",
    instructor: "Emma Rodriguez",
    category: "Design",
    level: "Beginner",
    rating: 4.9,
    studentsCount: 28750,
    price: 79.99,
    originalPrice: 149.99,
    duration: "28 hours",
    lessonsCount: 98,
    thumbnail: "https://images.unsplash.com/photo-1603975711481-18b7aaca4caa",
    thumbnailAlt: "Designer working on UI mockups with colorful sticky notes and wireframe sketches on desk",
    isBestseller: true
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass: SEO, Social Media & Analytics",
    instructor: "James Wilson",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.6,
    studentsCount: 19850,
    price: 69.99,
    originalPrice: 129.99,
    duration: "32 hours",
    lessonsCount: 124,
    thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    thumbnailAlt: "Marketing analytics dashboard showing colorful graphs and social media metrics on computer screen",
    isBestseller: false
  },
  {
    id: 5,
    title: "JavaScript ES6+ Complete Guide with Modern Development",
    instructor: "Alex Thompson",
    category: "Programming",
    level: "Advanced",
    rating: 4.8,
    studentsCount: 41200,
    price: 84.99,
    originalPrice: 164.99,
    duration: "35 hours",
    lessonsCount: 128,
    thumbnail: "https://images.unsplash.com/photo-1724166551426-77aa7328d053",
    thumbnailAlt: "JavaScript code editor showing ES6 syntax with multiple browser tabs open for testing",
    isBestseller: true
  },
  {
    id: 6,
    title: "Photography Basics: Composition, Lighting & Post-Processing",
    instructor: "Lisa Park",
    category: "Photography",
    level: "Beginner",
    rating: 4.7,
    studentsCount: 15600,
    price: 59.99,
    originalPrice: 119.99,
    duration: "24 hours",
    lessonsCount: 86,
    thumbnail: "https://images.unsplash.com/photo-1696273340885-7576961a61b5",
    thumbnailAlt: "Professional DSLR camera with various lenses and photography equipment arranged on wooden table",
    isBestseller: false
  },
  {
    id: 7,
    title: "Business Strategy and Entrepreneurship Fundamentals",
    instructor: "Robert Davis",
    category: "Business",
    level: "Intermediate",
    rating: 4.5,
    studentsCount: 22400,
    price: 74.99,
    originalPrice: 139.99,
    duration: "30 hours",
    lessonsCount: 112,
    thumbnail: "https://images.unsplash.com/photo-1719765868011-68a88e7db83d",
    thumbnailAlt: "Business meeting with professionals discussing strategy around conference table with charts and laptops",
    isBestseller: false
  },
  {
    id: 8,
    title: "Complete Web Development Bootcamp: HTML, CSS, JavaScript",
    instructor: "Maria Garcia",
    category: "Programming",
    level: "Beginner",
    rating: 4.9,
    studentsCount: 67800,
    price: 0,
    originalPrice: 0,
    duration: "45 hours",
    lessonsCount: 178,
    thumbnail: "https://images.unsplash.com/photo-1607266424522-ccef52eb95ac",
    thumbnailAlt: "Web developer coding on laptop with multiple monitors showing HTML CSS and JavaScript code",
    isBestseller: true
  },
  {
    id: 9,
    title: "Fitness Training Certification: Personal Trainer Course",
    instructor: "David Kim",
    category: "Fitness",
    level: "Intermediate",
    rating: 4.6,
    studentsCount: 12300,
    price: 99.99,
    originalPrice: 199.99,
    duration: "26 hours",
    lessonsCount: 94,
    thumbnail: "https://images.unsplash.com/photo-1728486883968-359e26fc3122",
    thumbnailAlt: "Fitness trainer demonstrating exercise techniques in modern gym with equipment and mirrors",
    isBestseller: false
  },
  {
    id: 10,
    title: "Music Production Masterclass: Beat Making & Audio Engineering",
    instructor: "Chris Martinez",
    category: "Music",
    level: "Advanced",
    rating: 4.7,
    studentsCount: 18900,
    price: 89.99,
    originalPrice: 169.99,
    duration: "33 hours",
    lessonsCount: 118,
    thumbnail: "https://images.unsplash.com/photo-1625017134591-7b7db7bcd640",
    thumbnailAlt: "Professional music studio setup with mixing console, monitors, and audio production software on screens",
    isBestseller: false
  },
  {
    id: 11,
    title: "Advanced Excel for Data Analysis and Business Intelligence",
    instructor: "Jennifer Lee",
    category: "Business",
    level: "Advanced",
    rating: 4.8,
    studentsCount: 25600,
    price: 79.99,
    originalPrice: 149.99,
    duration: "29 hours",
    lessonsCount: 106,
    thumbnail: "https://images.unsplash.com/photo-1698304861261-1f7c58f0653a",
    thumbnailAlt: "Excel spreadsheet with complex data analysis charts and pivot tables displayed on computer monitor",
    isBestseller: true
  },
  {
    id: 12,
    title: "Graphic Design Essentials: Adobe Creative Suite Mastery",
    instructor: "Tom Anderson",
    category: "Design",
    level: "Intermediate",
    rating: 4.6,
    studentsCount: 31200,
    price: 94.99,
    originalPrice: 184.99,
    duration: "36 hours",
    lessonsCount: 134,
    thumbnail: "https://images.unsplash.com/photo-1544477027-20ee7ebcfcef",
    thumbnailAlt: "Graphic designer working on creative project using Adobe software with colorful design elements on screen",
    isBestseller: false
  }];


  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...mockCourses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter((course) =>
      course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      course?.instructor?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      course?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((course) =>
      course?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    // Apply level filter
    if (filters?.level !== 'all') {
      filtered = filtered?.filter((course) =>
      course?.level?.toLowerCase() === filters?.level?.toLowerCase()
      );
    }

    // Apply price range filter
    if (filters?.priceRange !== 'all') {
      switch (filters?.priceRange) {
        case 'free':
          filtered = filtered?.filter((course) => course?.price === 0);
          break;
        case 'paid':
          filtered = filtered?.filter((course) => course?.price > 0);
          break;
        case 'under-50':
          filtered = filtered?.filter((course) => course?.price > 0 && course?.price < 50);
          break;
        case 'under-100':
          filtered = filtered?.filter((course) => course?.price > 0 && course?.price < 100);
          break;
        case 'over-100':
          filtered = filtered?.filter((course) => course?.price >= 100);
          break;
      }
    }

    // Apply rating filter
    if (filters?.rating !== 'all') {
      const minRating = parseFloat(filters?.rating);
      filtered = filtered?.filter((course) => course?.rating >= minRating);
    }

    // Apply duration filter
    if (filters?.duration !== 'all') {
      switch (filters?.duration) {
        case 'short':
          filtered = filtered?.filter((course) => parseInt(course?.duration) <= 2);
          break;
        case 'medium':
          filtered = filtered?.filter((course) => {
            const hours = parseInt(course?.duration);
            return hours >= 3 && hours <= 6;
          });
          break;
        case 'long':
          filtered = filtered?.filter((course) => parseInt(course?.duration) >= 7);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.studentsCount - a?.studentsCount);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
    }

    setFilteredCourses(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      level: 'all',
      duration: 'all',
      priceRange: 'all',
      rating: 'all',
      features: {
        subtitles: false,
        quizzes: false,
        codingExercises: false,
        practiceTests: false
      }
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <NavigationBreadcrumbs />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Discover Your Next Course
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore thousands of courses from expert instructors and advance your skills
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch} />

          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterPanelOpen}
              onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              courseCount={filteredCourses?.length}
              onClearFilters={handleClearFilters} />


            {/* Course Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredCourses?.length} />


              {/* Course Grid */}
              {isLoading ?
              <LoadingSkeleton viewMode={viewMode} /> :

              <CourseGrid
                courses={filteredCourses}
                viewMode={viewMode}
                enrolledCourses={enrolledCourses} />

              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default CourseCatalog;