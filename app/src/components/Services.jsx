import React from 'react';

export default function FullServiceLuxury() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=800&fit=crop"
            alt="Luxury interior design with modern furniture and mountain view"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-2xl space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-800 font-syne uppercase leading-tight">
                Full Service<br />
                Luxury Interior Design
              </h1>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-6 text-gray-700 font-rubik leading-relaxed">
              <p className="text-sm md:text-base">
                <span className="font-semibold">MARGARITA BRAVO</span> provides luxury interior design services for homes and businesses 
                nationwide. We focus on you and listen carefully to your needs to create spaces that truly reflect 
                your personality and lifestyle.
              </p>

              <p className="text-sm md:text-base">
                Our team at <span className="font-semibold">MARGARITA BRAVO</span> has unmatched expertise in turning ordinary spaces into 
                extraordinary ones. We combine elegant design with personal touches to make each space unique.
              </p>

              <p className="text-sm md:text-base">
                We keep up with the latest trends while respecting timeless design principles to bring your vision to 
                life.
              </p>

              <p className="text-sm md:text-base">
                Whether you want to refresh a home or enhance a commercial space, you can trust <span className="font-semibold">MARGARITA 
                BRAVO</span> to make your dream a reality.
              </p>
            </div>

            {/* Design Services Section */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-800 font-rubik mb-6">
                Design Services Include:
              </h3>

              {/* Two Column Service Lists */}
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik underline decoration-1 underline-offset-2">Residential</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik underline decoration-1 underline-offset-2">Commercial</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik underline decoration-1 underline-offset-2">Kitchen Design & Renovations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik underline decoration-1 underline-offset-2">Bath Design & Renovations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Space Planning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik underline decoration-1 underline-offset-2">Custom Furniture Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Custom Cabinetry</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Furniture Selection & Sourcing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Architectural Reviews</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Lighting Plan & Installation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Art Curating & Sourcing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Remote Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Budgeting & Purchasing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-rubik">Construction Coordination</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Services Button */}
            <div className="pt-6">
              <button className="border border-gray-400 text-gray-700 px-6 py-3 text-sm font-rubik tracking-wide hover:bg-gray-100 transition-colors duration-300">
                View All Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
         <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=800&fit=crop"
            alt="Luxury interior design with modern furniture and mountain view"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-8 py-12 bg-white">
          
          <div className="max-w-lg mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-light tracking-[0.15em] text-gray-800 font-syne uppercase leading-tight">
                Full Service<br />
                Luxury Interior Design
              </h1>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-gray-700 font-light leading-relaxed text-sm">
              <p>
                <span className="font-semibold">MARGARITA BRAVO</span> provides luxury interior design services for homes and businesses 
                nationwide. We focus on you and listen carefully to your needs to create spaces that truly reflect 
                your personality and lifestyle.
              </p>

              <p>
                Our team at <span className="font-semibold">MARGARITA BRAVO</span> has unmatched expertise in turning ordinary spaces into 
                extraordinary ones. We combine elegant design with personal touches to make each space unique.
              </p>

              <p>
                We keep up with the latest trends while respecting timeless design principles to bring your vision to 
                life.
              </p>

              <p>
                Whether you want to refresh a home or enhance a commercial space, you can trust <span className="font-semibold">MARGARITA 
                BRAVO</span> to make your dream a reality.
              </p>
            </div>

            {/* Design Services Section */}
            <div className="pt-4">
              <h3 className="text-base font-semibold text-gray-800 font-rubik mb-6 text-center">
                Design Services Include:
              </h3>

              {/* Two Column Service Lists for Mobile */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik underline decoration-1 underline-offset-2 leading-tight">Residential</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik underline decoration-1 underline-offset-2 leading-tight">Commercial</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik underline decoration-1 underline-offset-2 leading-tight">Kitchen Design & Renovations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik underline decoration-1 underline-offset-2 leading-tight">Bath Design & Renovations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Space Planning</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik underline decoration-1 underline-offset-2 leading-tight">Custom Furniture Design</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Custom Cabinetry</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Furniture Selection & Sourcing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Architectural Reviews</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Lighting Plan & Installation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Art Curating & Sourcing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Remote Design</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Budgeting & Purchasing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 font-rubik leading-tight">Construction Coordination</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Services Button */}
            <div className="pt-6 w-full">
              <button className="w-full border border-gray-400 text-gray-700 py-3 text-sm font-rubik tracking-wide hover:bg-gray-100 transition-colors duration-300">
                View All Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}