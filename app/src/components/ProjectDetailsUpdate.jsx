import React, { useState } from 'react';
import { 
  Upload, 
  Save, 
  X, 
  Edit3, 
  MapPin, 
  Calendar, 
  FileText,
  AlertCircle,
  Check
} from 'lucide-react';

export default function ProjectDetailsUpdate() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Initial project data
  const [originalData] = useState({
    title: "Rénovation complète d'une villa moderne",
    description: "Projet de rénovation complète incluant la cuisine, le salon, et les espaces extérieurs. Design contemporain avec matériaux nobles et finitions haut de gamme. Intégration de solutions domotiques et optimisation énergétique.",
    location: "Sidi Bou Said, Tunis",
    date: "2024-03-15",
    mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop&crop=center"
  });

  const [formData, setFormData] = useState({ ...originalData });
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving project details:', {
        ...formData,
        newImage: newImage
      });
      
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setNewImage(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  const hasChanges = () => {
    return newImage || 
           formData.title !== originalData.title ||
           formData.description !== originalData.description ||
           formData.location !== originalData.location ||
           formData.date !== originalData.date;
  };

  const ImageUploadArea = () => (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        id="main-image-upload"
      />
      <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:border-red-400 hover:bg-red-50 transition-colors">
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Nouvel aperçu" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <Upload className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              NOUVELLE IMAGE
            </div>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={formData.mainImage} 
              alt="Image actuelle" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <Upload className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Cliquer pour changer</p>
                <p className="text-gray-500 text-sm">ou glisser une nouvelle image</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-medium text-gray-800 mb-2">
                  Modifier les détails du projet
                </h1>
                <p className="text-gray-600">
                  Mettez à jour les informations principales de votre projet
                </p>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Modifier
                </button>
              )}
            </div>
            
            {/* Success Message */}
            {saveSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 text-sm">Projet mis à jour avec succès!</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              {/* Main Image Section */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <Upload className="h-4 w-4 mr-2" />
                  Image principale
                </label>
                
                {isEditing ? (
                  <ImageUploadArea />
                ) : (
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={formData.mainImage} 
                      alt="Image du projet" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-2">
                    Formats acceptés: JPG, PNG, WebP (max. 5MB)
                  </p>
                )}
              </div>

              {/* Project Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 mr-2" />
                    Titre du projet *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Entrez le titre du projet"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900">{formData.title}</h3>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Localisation
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Ville, Région"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{formData.location || 'Non spécifiée'}</span>
                    </div>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date du projet
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">
                        {formData.date ? new Date(formData.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Description *
                </label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre projet en détail..."
                  />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formData.description}
                    </p>
                  </div>
                )}
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-1">
                    Une description détaillée améliore la visibilité de votre projet
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
              <div className="flex items-center">
                {hasChanges() && (
                  <div className="flex items-center text-orange-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Modifications non sauvegardées
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isSaving}
                >
                  Annuler
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving || !hasChanges()}
                  className="flex items-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}