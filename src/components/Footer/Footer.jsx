import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8">
        {/* À propos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">À propos</h3>
          <p className="text-sm">
            Nous sommes une plateforme dédiée à la publication d'annonces pour divers produits et services. Notre mission est de connecter les acheteurs et les vendeurs de manière efficace et sécurisée.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm">
            <li>Email: contact@siteannonce.com</li>
            <li>Téléphone: +33 1 23 45 67 89</li>
            <li>Adresse: 123 Rue de l'Annonce, Paris, France</li>
          </ul>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
          <ul className="text-sm">
            <li><Link to="/src/components/Confidentilite/about.jsx" className="hover:underline">À propos de nous</Link></li>
            <li><Link to="/src/components/Confidentilite/conditions.jsx" className="hover:underline">Conditions d'utilisation</Link></li>
            <li><Link to="/src/components/Confidentilite/Politique.jsx" className="hover:underline">Politique de confidentialité</Link></li>
            <li><Link to="/src/components/Confidentilite/faq.jsx" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Suivez-nous */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
          <ul className="flex flex-col space-y-4">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                <FaFacebook className="inline-block mr-2" /> Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                <FaXTwitter className="inline-block mr-2" /> X
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                <FaInstagram className="inline-block mr-2" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                <FaLinkedin className="inline-block mr-2" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        &copy; {new Date().getFullYear()} Site d'Annonce. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;