import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
  const location = useLocation();
  const { title, description, price, photos } = location.state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-4">
  <div className="container mx-auto flex">
    {/* Images et boutons de navigation à gauche (50%) */}
    <div className="w-1/2 relative">
      {photos && photos.length > 0 && (
        <>
          <img src={photos[currentImageIndex]} alt="Annonce" className="w-full h-96 object-contain rounded-lg mb-4" loading='lazy'/>
          <button 
            onClick={handlePrevImage} 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            onClick={handleNextImage} 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
    </div>

    {/* Contenu principal à droite (50%) */}
    <div className="w-1/2 bg-white h-auto p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-2xl text-gray-400 font-semibold underline">Description de l'annonce: </p><br />
      <p className="text-[#7F8C8D] mb-4">{description}</p>
      <p className="text-[#27AE60] font-bold text-xl mb-4">Prix: {price} FCFA</p>
    </div>
  </div>
</div>

  );
};

export default Detail;
