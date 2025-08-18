import React , {useState} from "react";

export default function BeforeAfterGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

const [originalData] = useState({
    title: "Rénovation complète d'une villa moderne",
    description: "Projet de rénovation complète incluant la cuisine, le salon, et les espaces extérieurs. Design contemporain avec matériaux nobles et finitions haut de gamme. Intégration de solutions domotiques et optimisation énergétique.",
    location: "Sidi Bou Said, Tunis",
    date: "2024-03-15",
    mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop&crop=center",
 beforeAndAfterGallery: [
    {
      before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center",
      after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center",
    },
    {
      before: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
      after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
    },
    {
      before: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&crop=center",
      after: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&crop=center",
    },
  ],

  });
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
  <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
  <img
    src={originalData.mainImage}
    alt="Luxury modern interior design"
    className="w-full h-full object-cover"
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Text overlay */}
  <div className="absolute inset-0 flex items-center sm:px-4 pr-4 md:pr-12">
    <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 max-w-xl text-left md:mt-20 mt-12 ">
      <h1 className="text-2xl md:text-4xl font-light tracking-wide mb-4 text-gray-800 uppercase">
        BEFORE & AFTER Transformations
      </h1>
      <h2 className="text-lg md:text-2xl font-light tracking-wide mb-6 text-gray-800">
                      {originalData.title}

      </h2>
       
             <p className="text-gray-700 leading-relaxed mb-4">
                  {originalData.description}
                </p>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mr-4 w-20">Location:</span>
                  <span className="text-gray-800">{originalData.location}</span>
                  
    </div>
  </div>
</div>

   

     <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {originalData.beforeAndAfterGallery.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-6 mb-6">
            {/* Before */}
            <div className="relative group">
              <div className="relative overflow-hidden bg-white aspect-[4/3]">
                <img
                  src={item.before}
                  alt={`Before Renovation ${i + 1}`}
                  className="w-full cursor-pointer md:cursor-default"
                  onClick={() => window.innerWidth < 768 && setSelectedImage(item.before)}
                />
                <div className="absolute top-4 left-4">
                  <h2 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide bg-black bg-opacity-30 px-3 py-1 sm:px-4 sm:py-2 rounded">
                    Before
                  </h2>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="relative group">
              <div className="relative overflow-hidden bg-white aspect-[4/3]">
                <img
                  src={item.after}
                  alt={`After Renovation ${i + 1}`}
                  className="w-full cursor-pointer md:cursor-default"
                  onClick={() => window.innerWidth < 768 && setSelectedImage(item.after)}
                />
                <div className="absolute top-4 right-4">
                  <h2 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide bg-black bg-opacity-30 px-3 py-1 sm:px-4 sm:py-2 rounded">
                    After
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (only when an image is clicked) */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-w-3xl w-full px-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-1 right-6 text-gray-950 text-2xl font-bold"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
}