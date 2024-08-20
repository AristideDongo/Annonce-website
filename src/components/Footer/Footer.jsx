import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          {/* <img src="/path/to/logo.png" alt="Logo" className="h-12" /> */}
          <Link to="/" className="text-white text-4xl font-bold text-center">Annonces<span className="text-orange-600">360°</span></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">À propos</h3>
            <p className="text-sm leading-relaxed">
              Nous sommes une plateforme dédiée à la publication d'annonces pour divers produits et services. Notre mission est de connecter les acheteurs et les vendeurs de manière efficace et sécurisée.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="text-sm leading-relaxed">
              <li>Email: <a href="mailto:contact@siteannonce.com" className="hover:underline">contact@siteannonce.com</a></li>
              <li>Téléphone: <a href="tel:+33123456789" className="hover:underline">+33 1 23 45 67 89</a></li>
              <li>Adresse: 123 Rue de l'Annonce, Paris, France</li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens utiles</h3>
            <ul className="text-sm leading-relaxed space-y-2">
              <li><Link to="/src/components/Confidentilite/about.jsx" className="hover:text-white">À propos de nous</Link></li>
              <li><Link to="/src/components/Confidentilite/conditions.jsx" className="hover:text-white">Conditions d'utilisation</Link></li>
              <li><Link to="/src/components/Confidentilite/Politique.jsx" className="hover:text-white">Politique de confidentialité</Link></li>
              <li><Link to="/src/components/Confidentilite/faq.jsx" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Suivez-nous</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                  <FaFacebook className="inline-block text-xl text-white hover:text-blue-800" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                  <FaXTwitter className="inline-block text-xl text-white hover:text-black" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                  <FaInstagram className="inline-block text-xl text-white hover:text-pink-700" />
                </a>
              </li>
              <li>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                  <FaWhatsapp className="inline-block text-xl text-white hover:text-green-700" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Annonces360°. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
