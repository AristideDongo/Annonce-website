import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { TbSwipe } from 'react-icons/tb';

const Detail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://via.placeholder.com/400x300?text=Photo+1',
    'https://via.placeholder.com/400x300?text=Photo+2',
  ];

  const profileImage = 'https://via.placeholder.com/100x100?text=Profile';
  const userName = 'Nom de l\'utilisateur';

  const handleImageSwipe = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden pt-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="relative">
          <img src={images[currentImage]} alt="Product" className="w-full h-64 object-cover sm:h-72 md:h-80 lg:h-96 xl:h-112" />
          <button
            onClick={handleImageSwipe}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            <TbSwipe />
          </button>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Titre du Produit</h1>
          <p className="text-gray-700 mb-4 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Description du produit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="text-lg font-semibold mb-4 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Prix: 100€</p>
          <button className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded-md sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5">
            <FaPhone className="mr-2" />
            Contact Moi
          </button>
        </div>
        <div className="p-4 flex items-center">
          <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full mr-4 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32" />
          <div>
            <p className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{userName}</p>
            <p className="text-gray-600 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Annonceur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;