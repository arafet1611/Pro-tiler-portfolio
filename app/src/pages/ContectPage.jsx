import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    projectLocation: '',
    budgetRange: '',
    projectType: '',
    selectLocation: '',
    projectDescription: '',
    howDidYouHear: '',
    comments: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Space */}
      <div className="h-20 bg-gray-800"></div>

      {/* Main Content */}
      <div className="flex items-center py-8">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Side - Contact Form */}
            <div className="lg:col-span-3">
              <div className="max-w-4xl">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-light tracking-wider text-gray-800 mb-2">
                    NOUS CONTACTER
                  </h1>
                  <p className="text-gray-600 font-light text-sm">
                    Nous serions ravis d'avoir de vos nouvelles !
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First Row - Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        PRÉNOM *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        NOM *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        DESCRIPTION DU PROJET *
                      </label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Second Row - Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        ADRESSE EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        TÉLÉPHONE *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Third Row - Subject and Comments */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        OBJET *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        COMMENTAIRES
                      </label>
                      <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Fourth Row - Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        LIEU DU PROJET *
                      </label>
                      <input
                        type="text"
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        BUDGET ESTIMÉ *
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      >
                        <option value="">Choisir le budget</option>
                        <option value="sous-200">Sous 200 €</option>
                        <option value="200-500">200 € - 500 €</option>
                        <option value="500-1000">500 € - 1 000 €</option>
                        <option value="1000-2000">1 000 € - 2 000 €</option>
                        <option value="over-2000">Plus de 2 000 €</option>
                      </select>
                    </div>
                  </div>

                  {/* Fifth Row - Project Type and Location Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        TYPE DE PROJET *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      >
                        <option value="">Sélectionner le type de projet</option>
                        <option value="residential">Résidentiel</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-light tracking-wide text-gray-700 mb-1">
                        LOCALISATION *
                      </label>
                      <select
                        name="selectLocation"
                        value={formData.selectLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm bg-gray-100 border-none focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                        required
                      >
                        <option value="">Sélectionner la localisation</option>
                        <option value="mahdia-city">Mahdia</option>
                        <option value="el-jem">El Jem</option>
                        <option value="sidi-alouane">Sidi Alouane</option>
                        <option value="chebba">Chebba</option>
                        <option value="ksour-essef">Ksour Essef</option>
                        <option value="souassi">Souassi</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info and Submit */}
                  <div className="pt-4">
                    <div className="mb-4">
                      <p className="text-xs font-light text-gray-600">
                        EMAIL | +216 20 123 456 | DEMANDES D'INSTALLATION DE CARRELAGE
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-3 px-6 text-xs font-light tracking-wider hover:bg-gray-800 transition-all duration-300"
                    >
                      ENVOYER VOTRE MESSAGE
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Map and Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 text-white p-6 h-full">
                
                {/* Logo/Brand */}
                <div className="flex justify-center mb-4 -mt-16">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>

                {/* Map Illustration */}
                <div className="mb-6">
                  <svg viewBox="0 0 400 200" className="w-full h-40 text-blue-400">
                    {/* Tunisia outline */}
                    <path
                      d="M120 60 L180 40 L220 50 L260 45 L280 60 L300 80 L290 120 L270 140 L240 150 L200 155 L160 150 L140 140 L120 120 L110 100 L115 80 Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {/* Mahdia marker */}
                    <circle cx="240" cy="120" r="3" fill="#3b82f6" />
                    <text x="250" y="125" className="text-[10px] fill-current">MAHDIA</text>
                    
                    {/* Other cities */}
                    <circle cx="200" cy="100" r="2" fill="#60a5fa" />
                    <text x="170" y="95" className="text-[10px] fill-current">SOUSSE</text>
                    
                    <circle cx="220" cy="90" r="2" fill="#60a5fa" />
                    <text x="225" y="85" className="text-[10px] fill-current">MONASTIR</text>
                  </svg>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  {/* Main Office */}
                  <div className="text-center">
                    <h3 className="text-lg font-light tracking-wide mb-2">MAHDIA (SIÈGE SOCIAL)</h3>
                    <div className="space-y-1 text-xs text-gray-300 font-light">
                      <p>Avenue Habib Bourguiba</p>
                      <p>Mahdia 5100</p>
                      <p>Tunisie</p>
                      <p className="mt-2 text-white">+216 20 123 456</p>
                    </div>
                  </div>

                  {/* Service Hours */}
                  <div className="text-center pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-light tracking-wide mb-1">HORAIRES DE SERVICE</h4>
                    <div className="space-y-1 text-xs text-gray-300 font-light">
                      <p>Lundi - Vendredi : 7h00 - 18h00</p>
                      <p>Samedi : 8h00 - 16h00</p>
                      <p>Dimanche : Sur rendez-vous</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Top Line */}
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase text-gray-300">
                POUR LES DEMANDES DE RENSEIGNEMENTS ET LES PARTENARIATS COMMERCIAUX, VEUILLEZ CONTACTER{' '}
                <span className="text-white font-medium">FAROUKCARRELAGE@GMAIL.COM</span>
              </p>
            </div>

            {/* Connect With Us */}
            <div className="mb-6">
              <h3 className="text-2xl font-light tracking-wide mb-4">Connectez-vous avec nous !</h3>
              
              {/* Social Media Icons */}
              <div className="flex justify-center space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                © 2024 Farouk et Cie - Carreleur Professionnel. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;