
const AboutMe = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
         
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-2">
                AHMED BENNOUR
              </h1>
              <p className="text-lg font-light tracking-wider text-gray-600 mb-8">
                Master Craftsman & Tile Installation Specialist
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-light">
                Ahmed Bennour is a master tile craftsman and installation specialist with over 15 years of experience 
                transforming spaces across Mahdia and throughout Tunisia. He specializes in creating stunning 
                tile installations that blend traditional Tunisian craftsmanship with contemporary design excellence.
              </p>

              <p className="text-lg font-light">
                Based in the historic coastal city of Mahdia, Ahmed's work reflects the rich Mediterranean heritage 
                of the region. His expertise spans from intricate mosaic work and traditional zellige tiles to 
                modern porcelain and natural stone installations for homes, hotels, and commercial spaces.
              </p>


              <p className="text-lg font-light">
                With deep roots in traditional Tunisian tile-making techniques and continuous learning of modern 
                installation methods, Ahmed delivers exceptional craftsmanship that honors both heritage and 
                innovation. Every project reflects his passion for creating spaces that inspire and endure.
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="pt-4">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 text-sm font-light tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105 rounded-sm">
                View My Work
              </button>
            </div>
          </div>
           {/* Left Side - Image */}
          <div className="relative">
            <div className="aspect-[4/4] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop&q=80"
                alt="Professional tiler at work in Mahdia"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative element - Mediterranean tiles pattern */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 opacity-10 rounded-sm"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-blue-600 opacity-20 rounded-sm"></div>
          </div>

        </div>

   

       
      </div>
    </div>
  );
};

export default AboutMe;