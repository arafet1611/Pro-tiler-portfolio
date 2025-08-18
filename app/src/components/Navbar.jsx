import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when clicking on a link
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Check if current path matches the link
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-white">
                        <h1 className="text-2xl font-light tracking-wider uppercase">Farouk et cie</h1>
                        <p className="text-xs tracking-widest opacity-80 uppercase">Carreleur professionnel</p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-white">
                        <Link 
                            to="/" 
                            className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                isActive('/') ? 'opacity-100 border-b border-white pb-1' : ''
                            }`}
                        >
                            HOME
                        </Link>
                        <Link 
                            to="/projects" 
                            className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                isActive('/projects') ? 'opacity-100 border-b border-white pb-1' : ''
                            }`}
                        >
                            PORTFOLIO
                        </Link>
                        <Link 
                            to="/services" 
                            className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                isActive('/services') ? 'opacity-100 border-b border-white pb-1' : ''
                            }`}
                        >
                            SERVICES
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                isActive('/contact') ? 'opacity-100 border-b border-white pb-1' : ''
                            }`}
                        >
                            CONTACT
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-6 bg-black bg-opacity-90 rounded-lg p-6">
                        <div className="flex flex-col space-y-4 text-white">
                            <Link 
                                to="/" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                    isActive('/') ? 'opacity-100 border-l-2 border-white pl-2' : ''
                                }`}
                            >
                                HOME
                            </Link>
                            <Link 
                                to="/projects" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                    isActive('/projects') ? 'opacity-100 border-l-2 border-white pl-2' : ''
                                }`}
                            >
                                Projects
                            </Link>
                            <Link 
                                to="/services" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                    isActive('/services') ? 'opacity-100 border-l-2 border-white pl-2' : ''
                                }`}
                            >
                                SERVICES
                            </Link>
                            <Link 
                                to="/contact" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-opacity duration-300 ${
                                    isActive('/contact') ? 'opacity-100 border-l-2 border-white pl-2' : ''
                                }`}
                            >
                                CONTACT
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;