import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-green-500 font-bold text-xl mb-4">{price} FCFA</p>
          {photos && photos.length > 0 && (
            <div className="relative">
              <img src={photos[currentImageIndex]} alt="Annonce" className="w-full h-96 object-contain rounded-lg mb-4" loading='lazy'/>
              <button 
                onClick={handlePrevImage} 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
              >
                &lt;
              </button>
              <button 
                onClick={handleNextImage} 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;