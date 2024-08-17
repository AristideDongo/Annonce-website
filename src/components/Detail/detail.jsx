import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  const location = useLocation();
  const { titre, description, prix, images } = location.state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden pt-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{titre}</h1>
          <p className="text-gray-700 mb-4 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">{description}</p>
          <p className="text-lg font-semibold mb-4 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Prix: {prix}€</p>
          <div className="relative">
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="w-full h-48 object-cover rounded-t-lg" />
            <button onClick={handlePrevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">Prev</button>
            <button onClick={handleNextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;