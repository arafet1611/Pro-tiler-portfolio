
export default function SerivcesPage() {
    
   
  
    
 return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=800&fit=crop"
          alt="Luxury modern interior design with piano, kitchen, and living area"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Page Content with Open Effect */}
      <div className="relative -mt-16 bg-white rounded-t-3xl shadow-2xl z-10">
        <div className="py-20 px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-gray-800 font-syne uppercase">
            Interior Design, Build & Decor Services
          </h1>
        </div>
        
        <div className="text-center mb-16">
          <p className="text-gray-600 font-rubik text-sm">
            From Our Denver, Miami, & Montecito Design Studios
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                alt="Modern interior design with blue patterned wallpaper and elegant lighting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Ultimate Client Experience Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-800 font-syne uppercase mb-8">
                Ultimate Client Experience
              </h2>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-6 text-gray-700 font-rubik leading-relaxed">
              <p className="text-sm md:text-base">
                <span className="font-semibold">MARGARITA BRAVO</span> is a{' '}
                <span className="underline decoration-1 underline-offset-2">full-service boutique interior design firm</span>{' '}
                specializing in residential and commercial interiors.
              </p>

              <p className="text-sm md:text-base">
                We are client-centric. Our approach is simple: we listen. We design, build, and decorate{' '}
                <span className="underline decoration-1 underline-offset-2">homes and spaces</span>{' '}
                that are suitable to your personality and your lifestyle. At{' '}
                <span className="font-semibold">MARGARITA BRAVO</span>, we are known for our exquisite taste and creative value that can be{' '}
                <span className="underline decoration-1 underline-offset-2">reflected in designs</span>{' '}
                customized to your taste and style.
              </p>

              <p className="text-sm md:text-base">
                At our core, we bring a project management approach to the{' '}
                <span className="underline decoration-1 underline-offset-2">process</span> of{' '}
                <span className="underline decoration-1 underline-offset-2">making your home beautiful and functional</span>.{' '}
                Stress free, loving spaces, and fun sounds good but also we are all about executing your home project ahead of time and within budget!{' '}
                <span className="underline decoration-1 underline-offset-2">Our team</span>{' '}
                knows a thing or two about active expense management and control measures to ensure that your project is completed efficiently with a personal touch. This is how we bring value to you once we embark in this journey together.
              </p>
            </div>
          </div>
        </div>

        {/* White Glove Offerings Section */}
        <div className="mt-32">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-800 font-syne uppercase mb-6">
              White Glove Offerings
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 font-rubik text-sm md:text-base leading-relaxed">
                The idea is straightforward. You can centralize your home project through us and we take care of the entire process. 
                During our full cycle approach – Design, Procure, Build, and Install, <span className="font-semibold">MARGARITA BRAVO</span> tends to all of the details 
                of your project, that way you can enjoy life while we do what we love the most,{' '}
                <span className="underline decoration-1 underline-offset-2">making stunning spaces</span>.
              </p>
            </div>
          </div>

          {/* Three Service Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Designing */}
            <div className="text-center">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
                  alt="Modern kitchen design"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] text-gray-800 font-syne uppercase mb-6">
                Designing
              </h3>
              <ul className="space-y-2 text-gray-700 font-rubik text-sm">
                <li>Space Planning</li>
                <li>Architectural Review</li>
                <li className="underline decoration-1 underline-offset-2">Custom Furniture Design</li>
                <li className="underline decoration-1 underline-offset-2">Custom Cabinetry Design</li>
                <li className="underline decoration-1 underline-offset-2">Kitchen Design & Renovations</li>
                <li className="underline decoration-1 underline-offset-2">Bath Design & Renovations</li>
                <li>Full-Service Residential Interior Design</li>
                <li>Full-Service Commercial Interior Design</li>
              </ul>
            </div>

            {/* Specifications */}
            <div className="text-center">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop"
                  alt="Modern dining room with blue chairs"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] text-gray-800 font-syne uppercase mb-6">
                Specifications
              </h3>
              <ul className="space-y-2 text-gray-700 font-rubik text-sm">
                <li>Paint/Pallette/Wall Covering Selection</li>
                <li>Art Curating and Selection</li>
                <li>Materials & Fabric Selection</li>
                <li>Accessory Placement & Selection</li>
                <li>Lighting Plan & Fixture Selection</li>
                <li>Window Treatment and Related Finishes</li>
                <li>Selection and Sourcing of Furniture, and Architectural Fixtures</li>
              </ul>
            </div>

            {/* Project Management */}
            <div className="text-center">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop"
                  alt="Luxurious bathroom design"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] text-gray-800 font-syne uppercase mb-6">
                Project Management
              </h3>
              <ul className="space-y-2 text-gray-700 font-rubik text-sm">
                <li>Budgeting</li>
                <li>Purchasing</li>
                <li>Order Tracking</li>
                <li>Site Inspections</li>
                <li>Vendor Management</li>
                <li>Delivery Coordination</li>
                <li>Construction Coordination</li>
                <li>Millwork Documents</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
      </div>
  );
}