import React, { useState, useEffect } from "react";
import { Menu, X, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking on a link
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Check if current path matches the link
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white shadow-lg' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className={`transition-colors duration-300 ${
                        isScrolled ? 'text-black' : 'text-white'
                    }`}>
                        <h1 className="text-2xl font-light tracking-wider uppercase">Farouk et cie</h1>
                        <p className="text-xs tracking-widest opacity-80 uppercase">Carreleur professionnel</p>
                    </Link>

                    <div className="flex items-center">
                        {/* Desktop Menu */}
                        <div className={`hidden md:flex space-x-8 transition-colors duration-300 ${
                            isScrolled ? 'text-black' : 'text-white'
                        }`}>
                            <Link 
                                to="/" 
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/') 
                                        ? `opacity-100 border-b pb-1 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                HOME
                            </Link>
                            <Link 
                                to="/projects" 
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/projects') 
                                        ? `opacity-100 border-b pb-1 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                PROJETS 
                            </Link>
                            <Link 
                                to="/services" 
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/services') 
                                        ? `opacity-100 border-b pb-1 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                SERVICES
                            </Link>
                            <Link 
                                to="/contact" 
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/contact') 
                                        ? `opacity-100 border-b pb-1 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                CONTACT
                            </Link>
                        </div>

                        {/* Admin Login Icon - Only visible when scrolled */}
                            <Link 
                                to="/admin/dashboard" 
                              className={` p-2 transition-colors duration-300 ml-4 ${
                                isScrolled ? 'text-black' : 'text-white'
                            }`}
                                title="Admin Dashboard"
                            >
                                <Lock size={18} />
                            </Link>
                        

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden p-2 transition-colors duration-300 ml-4 ${
                                isScrolled ? 'text-black' : 'text-white'
                            }`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`md:hidden mt-6 rounded-lg p-6 transition-colors duration-300 ${
                        isScrolled 
                            ? 'bg-white border border-gray-200' 
                            : 'bg-black bg-opacity-90'
                    }`}>
                        <div className={`flex flex-col space-y-4 transition-colors duration-300 ${
                            isScrolled ? 'text-black' : 'text-white'
                        }`}>
                            <Link 
                                to="/" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/') 
                                        ? `opacity-100 border-l-2 pl-2 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                HOME
                            </Link>
                            <Link 
                                to="/projects" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/projects') 
                                        ? `opacity-100 border-l-2 pl-2 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                PORTFOLIO
                            </Link>
                            <Link 
                                to="/services" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/services') 
                                        ? `opacity-100 border-l-2 pl-2 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                SERVICES
                            </Link>
                            <Link 
                                to="/contact" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 ${
                                    isActive('/contact') 
                                        ? `opacity-100 border-l-2 pl-2 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                CONTACT
                            </Link>
                            {/* Admin Login in Mobile Menu */}
                            <Link 
                                to="/admin/login" 
                                onClick={handleLinkClick}
                                className={`text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300 flex items-center ${
                                    isActive('/admin/login') 
                                        ? `opacity-100 border-l-2 pl-2 ${isScrolled ? 'border-black' : 'border-white'}` 
                                        : ''
                                }`}
                            >
                                <Lock size={16} className="mr-2" />
                                ADMIN LOGIN
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;