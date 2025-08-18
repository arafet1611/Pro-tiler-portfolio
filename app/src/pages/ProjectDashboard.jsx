import React, { useState } from 'react';
import { 
  Home, 
  Edit3, 
  ChevronDown,
  MapPin,
  Clock,
  Trash2,
  Eye
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import TopNavigation from '../components/TopNavigation';

export default function ProjectDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('Nouveaux en premier');
  const navigate = useNavigate();

  const [projects] = useState([
    {
      id: 1,
      title: "Installation de carrelage en céramique",
      description: "Pose de carrelage haut de gamme dans une salle de bain de 15m² avec préparation du sol et joints étanches",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=250&fit=crop&crop=center",
      category: ["Carrelage", "Salle de bain"],
      location: "Tunis",
      date: "2023-05-15"
    },
  
    {
      id: 2,
      title: "Pose de mosaïque murale",
      description: "Création d'un motif mural en mosaïque de verre pour une cuisine contemporaine de 12m²",
      image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&h=250&fit=crop&crop=center",
      category: ["Mosaïque", "Murale"],
      location: "Bizerte",
      date: "2023-11-10"
    },
    {
      id: 3,
      title: "Carrelage antidérapant pour piscine",
      description: "Installation de carrelage spécial piscine avec traitement antidérapant sur 50m linéaires",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=250&fit=crop&crop=center",
      category: ["Piscine", "Antidérapant"],
      location: "Hammamet",
      date: "2023-02-28"
    }
  ]);

  const filterOptions = ['Nouveaux en premier', 'Anciens en premier'];

  const filteredProjects = [...projects].sort((a, b) => {
    if (selectedFilter === 'Nouveaux en premier') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays/7)} semaines`;
    if (diffInDays < 365) return `Il y a ${Math.floor(diffInDays/30)} mois`;
    return `Il y a ${Math.floor(diffInDays/365)} ans`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      <div className="sm:flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-medium text-gray-800 mb-1">
                Mes projets de carrelage
                <span className="text-blue-500 text-base ml-2 font-normal">
                  ({projects.length} projets trouvés)
                </span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/dashboard/project-form")}
                className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Nouveau projet
              </button>
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {filterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                {/* Project Image */}
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>

                {/* Project Content */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{timeAgo(project.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {formatDate(project.date)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit3 className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    {project.category.map((item, index) => (
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mx-1" key={index}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Home className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600">Vous n'avez aucun projet de carrelage enregistré pour le moment.</p>
            </div>
          )}
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}