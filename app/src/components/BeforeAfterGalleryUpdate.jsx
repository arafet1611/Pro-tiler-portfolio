import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  X, 
  ArrowLeft,
  ArrowRight,
  Edit3,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function BeforeAfterGallery() {
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center",
      caption: "Rénovation complète de la cuisine avec îlot central moderne",
      isVisible: true
    },
    {
      id: 2,
      beforeImage: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&crop=center",
      afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=600&fit=crop&crop=center",
      caption: "Transformation du salon avec design contemporain",
      isVisible: true
    },
    {
      id: 3,
      beforeImage: "https://images.unsplash.com/photo-1560448204-444440f5e31a?w=400&h=300&fit=crop&crop=center",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center",
      caption: "Aménagement de la salle de bain moderne",
      isVisible: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedView, setSelectedView] = useState('all'); // 'all', 'visible', 'hidden'
  const [newItem, setNewItem] = useState({
    beforeImage: null,
    afterImage: null,
    caption: ''
  });

  // Filter items based on selected view
  const filteredItems = galleryItems.filter(item => {
    if (selectedView === 'visible') return item.isVisible;
    if (selectedView === 'hidden') return !item.isVisible;
    return true;
  });

  const addNewItem = () => {
    if (newItem.beforeImage && newItem.afterImage) {
      const item = {
        id: Date.now(),
        beforeImage: URL.createObjectURL(newItem.beforeImage),
        afterImage: URL.createObjectURL(newItem.afterImage),
        caption: newItem.caption,
        isVisible: true
      };
      setGalleryItems([...galleryItems, item]);
      setNewItem({ beforeImage: null, afterImage: null, caption: '' });
      setShowAddForm(false);
    }
  };

  const deleteItem = (id) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  const toggleVisibility = (id) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    ));
  };

  const updateCaption = (id, caption) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, caption } : item
    ));
    setEditingItem(null);
  };

  const handleFileUpload = (file, type) => {
    setNewItem(prev => ({ ...prev, [type]: file }));
  };

  const ImageUploadArea = ({ file, onUpload, label }) => (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        id={`upload-${label}`}
      />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:border-red-400 hover:bg-red-50 transition-colors">
        {file ? (
          <div className="space-y-2">
            <img 
              src={URL.createObjectURL(file)} 
              alt="Preview" 
              className="w-full h-32 object-cover rounded-md mx-auto"
            />
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">Image {label}</p>
            <p className="text-xs text-gray-500">Cliquer ou glisser</p>
          </>
        )}
      </div>
    </div>
  );

  const BeforeAfterSlider = ({ beforeImage, afterImage, caption, id, isVisible }) => {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {/* Before Image */}
          <div 
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={beforeImage} 
              alt="Avant" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              AVANT
            </div>
          </div>
          
          {/* After Image */}
          <div 
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <img 
              src={afterImage} 
              alt="Après" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              APRÈS
            </div>
          </div>
          
          {/* Slider */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              const handleMouseMove = (e) => {
                const x = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setSliderPosition(percentage);
              };
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ArrowLeft className="h-3 w-3 text-gray-600 -mr-1" />
              <ArrowRight className="h-3 w-3 text-gray-600 -ml-1" />
            </div>
          </div>

          {/* Visibility overlay */}
          {!isVisible && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <EyeOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Masqué</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Caption and Actions */}
        <div className="p-4">
          {editingItem === id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                defaultValue={caption}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    updateCaption(id, e.target.value);
                  }
                }}
              />
              <button
                onClick={(e) => updateCaption(id, e.target.previousElementSibling.value)}
                className="p-2 text-green-600 hover:bg-green-50 rounded"
              >
                <Save className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-gray-700 text-sm mb-3">{caption}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setEditingItem(editingItem === id ? null : id)}
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Modifier
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleVisibility(id)}
                className={`p-2 rounded transition-colors ${
                  isVisible 
                    ? 'text-green-600 hover:bg-green-50' 
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
                title={isVisible ? 'Masquer' : 'Afficher'}
              >
                {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              
              <button
                onClick={() => deleteItem(id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-medium text-gray-800 mb-2">
                  Galerie Avant/Après
                </h1>
                <p className="text-gray-600">
                  Gérez vos comparaisons avant/après pour montrer la transformation de vos projets
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Filter */}
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                >
                  <option value="all">Tout afficher ({galleryItems.length})</option>
                  <option value="visible">Visibles ({galleryItems.filter(i => i.isVisible).length})</option>
                  <option value="hidden">Masqués ({galleryItems.filter(i => !i.isVisible).length})</option>
                </select>
                
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-gray-800">
                    Ajouter une comparaison avant/après
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Avant *
                      </label>
                      <ImageUploadArea
                        file={newItem.beforeImage}
                        onUpload={(file) => handleFileUpload(file, 'beforeImage')}
                        label="avant"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Après *
                      </label>
                      <ImageUploadArea
                        file={newItem.afterImage}
                        onUpload={(file) => handleFileUpload(file, 'afterImage')}
                        label="après"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Légende
                    </label>
                    <input
                      type="text"
                      value={newItem.caption}
                      onChange={(e) => setNewItem(prev => ({ ...prev, caption: e.target.value }))}
                      placeholder="Décrivez la transformation..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={addNewItem}
                      disabled={!newItem.beforeImage || !newItem.afterImage}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <BeforeAfterSlider
              key={item.id}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              caption={item.caption}
              id={item.id}
              isVisible={item.isVisible}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Upload className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune comparaison trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedView === 'all' 
                ? "Commencez par ajouter votre première comparaison avant/après."
                : `Aucune image ${selectedView === 'visible' ? 'visible' : 'masquée'} pour le moment.`
              }
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une comparaison
            </button>
          </div>
        )}
      </div>
    </div>
  );
}