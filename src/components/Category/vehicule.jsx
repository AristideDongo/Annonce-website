import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Vehicule = ({ searchQuery }) => {
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState('recent');
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [annonces, setAnnonces] = useState([]); // État pour les annonces
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(88);

  const handleDetailClick = (annonce) => {
    navigate('/Detail/detail', { state: annonce });
  };

  const sortAnnonces = (annonces, option) => {
    switch (option) {
      case 'recent':
        return annonces.sort((a, b) => b.timestamp - a.timestamp); // Utilisation du timestamp
      case 'oldest':
        return annonces.sort((a, b) => a.timestamp - b.timestamp);
      case 'price-high':
        return annonces.sort((a, b) => b.price - a.price);
      case 'price-low':
        return annonces.sort((a, b) => a.price - b.price);
      default:
        return annonces;
    }
  };

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // Récupération des annonces
        const annoncesResponse = await fetch(
          "http://localhost:3000/api/annonces/getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!annoncesResponse.ok) {
          throw new Error("Erreur lors de la récupération des annonces");
        }
        const annoncesData = await annoncesResponse.json();
        setAnnonces(annoncesData);

        console.log(annoncesData);

      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        // Gérez l'erreur ici, par exemple en affichant un message d'erreur
      } finally {
        setLoading(false); // Assurez-vous de désactiver le chargement même en cas d'erreur
      }
    };

    fetchAnnonces();

  }, []);

  useEffect(() => {
    if (annonces.length === 0) return;

    // Filtrer les annonces par catégorie et recherche
    const filteredByCategory = annonces.filter(annonce => annonce.category === 'vehicule');
    const filteredBySearch = filteredByCategory.filter(annonce =>
      annonce.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Trier les annonces filtrées
    const sorted = sortAnnonces(filteredBySearch, sortOption);
    
    setFilteredAnnonces(sorted);
  }, [annonces, searchQuery, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const getElapsedTime = (timestampInMilliseconds) => {
    const annonceTime = new Date(timestampInMilliseconds);
    const now = new Date();
    const elapsedTimeInMinutes = Math.floor((now - annonceTime) / 60000); // Calculer le temps écoulé en minutes
  
    // Déterminer le format du temps écoulé
    const years = Math.floor(elapsedTimeInMinutes / 525600); // Nombre de minutes dans une année (approximation)
    const months = Math.floor((elapsedTimeInMinutes % 525600) / 43800); // Nombre de minutes dans un mois (approximation)
    const days = Math.floor((elapsedTimeInMinutes % 43800) / 1440); // Nombre de minutes dans un jour
    const hours = Math.floor((elapsedTimeInMinutes % 1440) / 60); // Nombre de minutes dans une heure
    const minutes = elapsedTimeInMinutes % 60; // Minutes restantes
  
    if (years > 0) {
      return `${years} année${years > 1 ? 's' : ''} ago`; // Afficher en années
    } else if (months > 0) {
      return `${months} mois ago`; // Afficher en mois
    } else if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''} ago`; // Afficher en jours
    } else if (hours > 0) {
      return `${hours} heure${hours > 1 ? 's' : ''} ago`; // Afficher en heures
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`; // Afficher en minutes
    }
  };

  const totalPages = Math.ceil(filteredAnnonces.length / itemsPerPage);
  const currentItems = filteredAnnonces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen font-custom bg-gray-200 p-6 relative">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 mt-16 text-[#333333]">VEHICULE</h1>
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
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <FadeLoader color="#F4511E" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {currentItems.length > 0 ? (
                currentItems.map((annonce) => (
                  <div key={annonce.id} className="bg-white p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {annonce.photos && annonce.photos[0] ? (
                      <div className="relative">
                        <img
                          src={`http://localhost:3000/uploads/annonce/${annonce.photos[0]}`}
                          onClick={() => handleDetailClick(annonce)}
                          alt="Photo de l'annonce"
                          className="cursor-pointer w-full h-48 object-cover object-center rounded-t-lg"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-1">
                          <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                          <span className="text-white ml-1 text-xs">{getElapsedTime(annonce.timestamp)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <span className="text-red-500">Pas d'image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h2
                        onClick={() => handleDetailClick(annonce)}
                        className="text-lg font-bold mb-2 text-blue-600 hover:text-orange-500 break-words cursor-pointer"
                        style={{ maxHeight: '3em' }}
                      >
                        {truncateText(annonce.title, 50)}
                      </h2>
                      <p className="text-black text-lg mt-9 font-bold">{annonce.price} FCFA</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-2xl w-full mt-40">Aucune annonce disponible.</p>
              )}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default Vehicule;
