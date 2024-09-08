import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';

const Favoris = ({searchQuery}) => {
  const navigate = useNavigate();   // Hook pour naviguer vers d'autres routes
  // États pour gérer les favoris, options de tri, page actuelle, et favoris filtrés
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [filteredFavorites, setFilteredFavorites] = useState([]);


  // Effet pour charger les favoris depuis l'API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(' http://localhost:3000/api/favoris'); // Remplacez par l'URL de votre API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchFavorites();
  }, []);


  // Effet pour filtrer et trier les favoris en fonction de la recherche et des options de tri
  useEffect(() => {
    const filteredBySearch = favorites.filter(fav =>
      fav.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFavorites = sortFavorites(filteredBySearch, sortOption);
    setFilteredFavorites(sortedFavorites);
  }, [favorites, searchQuery, sortOption]);

  // Fonction pour trier les favoris en fonction de l'option sélectionnée
  const sortFavorites = (favorites, option) => {
    switch (option) {
      case 'recent':
        return favorites.sort((a, b) => b.timestamp - a.timestamp);
      case 'oldest':
        return favorites.sort((a, b) => a.timestamp - b.timestamp);
      case 'price-high':
        return favorites.sort((a, b) => b.price - a.price);
      case 'price-low':
        return favorites.sort((a, b) => a.price - b.price);
      default:
        return favorites;
    }
  };

  // Fonction pour naviguer vers la page de détails d'une annonce
  const handleDetailClick = (annonce) => {
    navigate('/Detail/detail', { state: annonce });
  };

  // Fonction pour calculer le temps écoulé depuis la publication de l'annonce
  const getElapsedTime = (timestamp) => {
    if (!timestamp || typeof timestamp !== 'number') {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid date';
    }

    const annonceTime = new Date(timestamp * 1000);
    const now = new Date();

    if (isNaN(annonceTime.getTime())) {
      console.error('Invalid date object:', annonceTime);
      return 'Invalid date';
    }

    const elapsedTimeInMinutes = Math.floor((now - annonceTime) / 60000);
    const days = Math.floor(elapsedTimeInMinutes / 1440);
    const hours = Math.floor((elapsedTimeInMinutes % 1440) / 60);
    const minutes = elapsedTimeInMinutes % 60;

    if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  // Fonction pour retirer un favori de la liste et du localStorage
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Fonction pour gérer le changement d'option de tri
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Fonction pour gérer le changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcul du nombre total de pages et des éléments de la page actuelle
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
  const currentItems = filteredFavorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Fonction pour tronquer le texte si nécessaire
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 font-custom">
      <div className="container mx-auto">
        <h2 className="text-3xl font-extrabold text-center mt-16 text-[#333333] mb-8">Mes Favoris</h2>

        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="sort" className="block text-gray-700">Trier par:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="recent">Plus Récente</option>
              <option value="oldest">Plus Ancienne</option>
              <option value="price-high">Prix Haut</option>
              <option value="price-low">Prix Bas</option>
            </select>
          </div>
        </div>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {currentItems.map(fav => (
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
                      <span className="text-white ml-1 text-xs">{getElapsedTime(fav.timestamp)} ago</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-red-500">Pas d'image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3
                    className="text-lg break-words font-semibold text-blue-600 mb-2 hover:text-orange-600"
                    onClick={() => handleDetailClick(fav)}
                  >
                    {truncateText(fav.title, 50)}
                  </h3>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg border ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition-colors duration-300`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;
