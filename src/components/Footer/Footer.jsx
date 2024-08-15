import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl font-bold">SITE ANNNONCE</h1>
              <p className="text-sm">
                © 2024 IvoitAgence. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-400 hover:text-white">
                Acceuil
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white">
                Politique de confidentialité
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-white">
                Conditions d'utilisation
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="text-sm">1234 Street Name, City, State, ZIP Code</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@company.com</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
