import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Plus, X } from "lucide-react";
import TopNavigation from "../components/TopNavigation";
import Sidebar from "../components/Sidebar";
export default function ProjectForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    mainImage: null,
    date: "",
    beforeAndAfterGallery: [],
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageUpload = (file) => {
    console.log("Main image file:", file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
      }));
    }
  };

  const addGalleryItem = () => {
    setFormData((prev) => ({
      ...prev,
      beforeAndAfterGallery: [
        ...prev.beforeAndAfterGallery,
        { beforeImage: null, afterImage: null, caption: "" },
      ],
    }));
  };

  const removeGalleryItem = (i) => {
    setFormData((prev) => ({
      ...prev,
      beforeAndAfterGallery: prev.beforeAndAfterGallery.filter(
        (_, index) => index !== i
      ),
    }));
  };

  const updateGalleryItem = (i, field, value) => {
    console.log(`Updating gallery item ${i} field ${field} with value:`, value);
    setFormData((prev) => ({
      ...prev,
      beforeAndAfterGallery: prev.beforeAndAfterGallery.map((item, index) =>
        index === i ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleGalleryImageUpload = (i, field, file) => {
    console.log(`Gallery image ${field} for item ${i}:`, file);
    updateGalleryItem(i, field, file);
  };

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
  };

  const nextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const ImageUploadArea = ({
    onUpload,
    file,
    label,
    accept = "image/*",
    index,
    field,
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-gray-400 transition-colors">
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            console.log("File selected:", e.target.files[0]);
            onUpload(index, field, e.target.files[0]);
          }
        }}
        className="hidden"
        id={`upload-${label}-${index}`}
      />
      <label htmlFor={`upload-${label}-${index}`} className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          {file ? file.name : `Cliquer ou déposer ${label}`}
        </p>
        <p className="text-sm text-gray-500">
          Publiez une photo (taille max : 5 Mo)
        </p>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 ">
      <TopNavigation />
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-t-lg border-b">
              <div className="px-6 py-4">
                <h1 className="text-2xl font-medium text-red-600 border-b-2 border-red-600 inline-block pb-1">
                  Créer un projet
                </h1>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="bg-white px-6 py-2 border-b">
              <div className="flex items-center space-x-4">
                <div
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Page 1: Informations de base
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <div
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 2
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Page 2: Galerie avant/après
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-b-lg p-6">
              {currentPage === 1 && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quel est le titre de votre projet? *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Saisir le titre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Un titre percutant attirera davantage l'attention des
                      utilisateurs.
                    </p>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Localisation"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ajoutez la localisation détaillée .{" "}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description du projet *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre produit ou service en détail..."
                      rows="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Plus vous en dites, mieux c'est! Plus vous en dites sur
                      votre projet, plus les utilisateurs potentiels seront
                      informés.
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date du projet
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image principale *
                    </label>
                    <ImageUploadArea
                      onUpload={(index, field, file) =>
                        handleMainImageUpload(file)
                      }
                      file={formData.mainImage}
                      label="l'image principale"
                      index={0}
                      field="mainImage"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Choisissez une image qui représente le mieux votre projet.
                    </p>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Galerie avant/après
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Ajoutez des photos avant et après pour montrer la
                      transformation de votre projet.
                    </p>

                    {formData.beforeAndAfterGallery.map((item, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-4 mb-4"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Photo {i + 1}</h4>
                          <button
                            onClick={() => removeGalleryItem(i)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image Avant
                            </label>
                            <ImageUploadArea
                              onUpload={handleGalleryImageUpload}
                              file={item.beforeImage}
                              label="image avant"
                              index={i}
                              field="beforeImage"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image Après
                            </label>
                            <ImageUploadArea
                              onUpload={handleGalleryImageUpload}
                              file={item.afterImage}
                              label="image après"
                              index={i}
                              field="afterImage"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Légende (optionnel)
                          </label>
                          <input
                            type="text"
                            value={item.caption}
                            onChange={(e) =>
                              updateGalleryItem(i, "caption", e.target.value)
                            }
                            placeholder="Décrivez la transformation..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addGalleryItem}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                    >
                      <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-600">
                        Ajouter une nouvelle comparaison avant/après
                      </p>
                    </button>

                    <p className="text-xs text-gray-500 mt-2">
                      Choisissez une photo illustrative de votre projet.{" "}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Précédent
                </button>

                {currentPage === 1 ? (
                  <button
                    onClick={nextPage}
                    className="flex items-center px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Soumettre
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
