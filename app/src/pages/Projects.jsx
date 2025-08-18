import Navbar from "../components/Navbar";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Transitional Foothills Home",
      image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Modern Ocean Elegance",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Modern Mediterranean Haven",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Contemporary Urban Retreat",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Scandinavian Minimalist Space",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Industrial Loft Design",
      image: "https://images.unsplash.com/photo-1560448204-444440f5e31a?w=800&h=600&fit=crop&crop=center"
    }
  ];
const navItems = [
    { name: 'ABOUT', id: 'about' },
    { name: 'SERVICES', id: 'services' },
    { name: 'PROCESS', id: 'process' },
    { name: 'CONTACT', id: 'contact' }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
         <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=800&fit=crop"
          alt="Luxury modern interior design with piano, kitchen, and living area"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    <div className="  min-h-screen bg-white py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-1xl font-light tracking-[0.2em] text-gray-600 mb-8 font-medium">
            OUR INTERIOR DESIGN PORTFOLIO
          </h1>
          <div className="max-w-1xl mx-auto">
            <p className="text-gray-700 text-base leading-relaxed">
              Trusting your design or renovation to our{' '} 
              <span className="underline cursor-pointer hover:text-gray-900 transition-colors">
                interior design team
              </span>{' '} <br />
              ensures you'll enjoy a spectacular environment custom fit to your lifestyle and priorities. <br />
              Browse our portfolio to see examples of our work and gather inspiration for your own project.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-800 text-lg font-light tracking-wide">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
<nav className="flex justify-center space-x-5 py-8">
      {navItems.map((item, ) => (
        <button
          key={item.id}
          onClick={() => {}}
          className="w-32 h-20 border border-gray-300 bg-white text-gray-800 font-medium text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-0"
          style={{
            borderRadius: '0px'
          }}
        >
          {item.name}
        </button>
      ))}
    </nav>
       
      </div>



    </div>
    </div>
    </div>
  );
}
