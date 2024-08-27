import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';

const Favoris = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  const fetchFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };

  fetchFavorites();

  // Écouter les changements dans localStorage
  const handleStorageChange = () => {
    fetchFavorites();
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleDetailClick = (annonce) => {
    navigate('/Detail/detail', { state: annonce });
  };

  const getElapsedMinutes = (timestamp) => {
    const annonceTime = new Date(timestamp * 1000);
    const now = new Date();

    if (isNaN(annonceTime.getTime())) {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid date';
    }

    const elapsedTime = Math.floor((now - annonceTime) / 60000);
    return elapsedTime;
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-6 font-custom">
      <div className="container mx-auto">
        <h2 className="text-3xl font-extrabold text-center mt-16 text-[#333333] mb-8">Mes Favoris</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(fav => (
              <div key={fav.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative group">
                {fav.photos && fav.photos[0] ? (
                  <div className="relative">
                    <img
                      src={fav.photos[0]}
                      alt="Annonce"
                      onClick={() => handleDetailClick(fav)}
                      className="cursor-pointer w-full h-48 object-cover object-center rounded-t-lg"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-1">
                      <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                      <span className="text-white ml-1 text-xs">{getElapsedMinutes(fav.timestamp)} minutes</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-red-500">Pas d'image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg break-words font-semibold text-blue-600 mb-2 hover:text-orange-600" 
                    onClick={() => handleDetailClick(fav)}>{truncateText(fav.title, 50)}</h3>
                  <p className="text-black text-xl font-semibold mb-2">Prix: {fav.price} FCFA</p>
                </div>
                <button 
                  onClick={() => handleRemoveFavorite(fav.id)} 
                  className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 group-hover:bg-red-500 group-hover:text-white cursor-pointer transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 group-hover:text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">Aucune annonce mise en favorie.</p>
        )}
      </div>
    </div>
  );
};

export default Favoris;
