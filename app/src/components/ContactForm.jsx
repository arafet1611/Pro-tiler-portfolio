import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    projectLocation: "",
    budgetRange: "",
    projectDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2 tracking-wide">
            Meilleur Carreleur de Luxe{" "}
          </h1>
          <div className="text-sm font-medium text-gray-800 tracking-widest uppercase mb-6">
            NOUS CONTACTER
          </div>
          <p className="text-gray-600 text-lg font-light">
            Nous serions ravis d'avoir de vos nouvelles !
          </p>
        </div>

        {/* Contact Form */}
        <div className="space-y-8">
          {/* First Row - Name and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
                PRÉNOM *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
                NOM *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
                TÉLÉPHONE *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          {/* Second Row - Email, Location, Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
                LIEU DU PROJET *
              </label>
              <input
                type="text"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
                BUDGET ESTIMÉ *
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">Sélectionner le budget</option>
                <option value="2k-6k">sous 2 000 €</option>
                <option value="2k-6k">2 000 € - 6 000 €</option>
                <option value="6k-12k">6 000 € - 12 000 €</option>
                <option value="12k-20k">12 000 € - 20 000 €</option>
                <option value="20k-40k">20 000 € - 40 000 €</option>
                <option value="40k+">40 000 € +</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 tracking-widest uppercase mb-3">
              DESCRIPTION DU PROJET *
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full px-4 py-4 bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all duration-300 resize-none"
              placeholder="Parlez-nous de votre vision du projet, vos préférences de style, calendrier et toute exigence spécifique..."
            />
          </div>

          {/* Contact Info */}
          <div className="text-center py-6">
            <p className="text-sm text-gray-600 tracking-wider">
              username@exemple.com | +216 20 123 456
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gray-800 text-white py-4 px-8 text-sm font-medium tracking-widest uppercase hover:bg-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-[1.02]"
            >
              ENVOYER VOTRE MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
