import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">À propos de nous</h1>
        <p className="text-lg text-gray-800 mb-8 leading-relaxed">
          Bienvenue sur notre site d'annonces! Nous sommes une équipe dédiée à fournir une plateforme conviviale et efficace pour acheter et vendre des biens et services. Notre mission est de faciliter les transactions entre les utilisateurs en offrant une interface intuitive et des fonctionnalités avancées.
        </p>
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-900">Notre Équipe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="path/to/image1.jpg" alt="Membre de l'équipe" className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold text-center text-gray-900">Nom du Membre</h3>
            <p className="text-center text-gray-700">Poste</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="path/to/image2.jpg" alt="Membre de l'équipe" className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold text-center text-gray-900">Nom du Membre</h3>
            <p className="text-center text-gray-700">Poste</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="path/to/image2.jpg" alt="Membre de l'équipe" className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold text-center text-gray-900">Nom du Membre</h3>
            <p className="text-center text-gray-700">Poste</p>
          </div>
          {/* Ajoutez plus de membres de l'équipe ici */}
        </div>
      </div>
    </div>
  );
};

export default About;
