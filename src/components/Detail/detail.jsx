import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { TbSwipe } from 'react-icons/tb';


const Detail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://via.placeholder.com/400x300?text=Photo+1',
    'https://via.placeholder.com/400x300?text=Photo+2'
  ];

  const handleImageSwipe = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };
  return(
   <>
   <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden pt-4">
      <div className="relative">
        <img src={images[currentImage]} alt="Product" className="w-full h-64 object-cover" />
        <button
          onClick={handleImageSwipe}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          <TbSwipe/>
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Titre du Produit</h1>
        <p className="text-gray-700 mb-4">Description du produit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p className="text-xl font-semibold mb-4">Prix: 100€</p>
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md">
          <FaPhone className="mr-2" />
          Contact Moi
        </button>
      </div>
    </div>
   </>
  ) 
};

export default Detail;
