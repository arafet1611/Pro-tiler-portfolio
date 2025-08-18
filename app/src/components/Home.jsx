import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&q=80',
      subtitle: 'Redefining Luxury Living',
      title: "Let's Craft Your Design Story",
      description: 'Every MARGARITA BRAVO interior tells a unique story—one shaped by your lifestyle and brought to life by Margarita\'s team\'s expertise.',
      buttonText: 'Book A Consultation'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=80',
      subtitle: 'Timeless Elegance',
      title: 'Transform Your Space Into Art',
      description: 'Experience the perfect harmony of functionality and beauty, where every detail is meticulously crafted to reflect your personal style.',
      buttonText: 'Explore Our Work'
    },
  
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={currentHero.image}
            alt="Luxury Interior"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform scale-105"
            key={currentHero.id}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="opacity-0 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                <p className="text-white text-sm font-light tracking-widest mb-4 opacity-90">
                  {currentHero.subtitle}
                </p>
                <h1 className="text-white text-5xl md:text-7xl font-light leading-tight mb-6 tracking-wide">
                  {currentHero.title}
                </h1>
                <p className="text-white text-lg font-light leading-relaxed mb-8 opacity-90 max-w-xl">
                  {currentHero.description}
                </p>
                <button className="border-2 border-white text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  {currentHero.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-30"
          aria-label="Next slide"
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 text-white opacity-70 z-30">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-px h-12 bg-white opacity-50"></div>
            <p className="text-xs tracking-widest transform rotate-90 origin-center">SCROLL</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;