import React, { useState ,useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProjectsCarousel = () => {
  // Project data matching the design
  const projects = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
      title: 'MODERN KITCHEN DESIGN',
      description: 'Contemporary kitchen with natural wood elements'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      title: 'LUXURY LIVING ROOM',
      description: 'Elegant living space with rich textures'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      title: 'MINIMALIST BEDROOM',
      description: 'Clean lines and serene atmosphere'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
      title: 'EXECUTIVE OFFICE',
      description: 'Professional workspace with modern aesthetics'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
      title: 'DINING ROOM ELEGANCE',
      description: 'Sophisticated dining experience'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      title: 'GOLDEN HOUR WINE BAR',
      description: 'Intimate wine tasting experience'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  // Infinite scroll functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 2 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (projects.length - 1)
    );
  };

  // Get current two projects to display
   const getCurrentProjects = () => {
    if (isMobile) {
      return [projects[currentIndex]];
    }
    return [
      projects[currentIndex],
      projects[(currentIndex + 1) % projects.length]
    ];
  };

  const currentProjects = getCurrentProjects();

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-light tracking-wider text-gray-800 text-center flex-1">
            FEATURED PROJECTS
          </h2>
          <button className="text-sm font-light tracking-wider text-gray-600 hover:text-gray-800 transition-colors duration-300 uppercase -mb-20">
            VIEW PORTFOLIO →
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex gap-6 transition-all duration-500 ease-in-out">
            {currentProjects.map((project, index) => (
              <div
                key={`${project.id}-${currentIndex}-${index}`}
                className="flex-1 group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-light tracking-wider text-gray-800 mb-2 group-hover:text-gray-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group z-10"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group z-10"
            aria-label="Next projects"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: projects.length - 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-800 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Current slide indicator */}
        <div className="text-center mt-6">
          <span className="text-xs text-gray-400 font-light tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length - 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;