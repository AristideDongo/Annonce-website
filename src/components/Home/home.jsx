import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSortAmountDown, faSortAmountUp, faDollarSign, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FadeLoader } from 'react-spinners';
import {useOutsideClick} from '../Navbar/navbarhookperso'

const Home = ({ annonces, searchQuery }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(searchQuery);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Nouvel état pour contrôler la visibilité

  const categoriesRef = useOutsideClick(() => setIsFilterVisible(false));

  useEffect(() => {
    if (annonces) {
      setIsLoading(false);
    }
    setQuery(searchQuery);
  }, [annonces, searchQuery]);

  const handleDetailClick = (annonce) => {
    navigate('Detail/detail', { state: annonce });
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Fonction pour tronquer le texte
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  // Filtrage et tri des annonces
  const filteredAnnonces = annonces.filter((annonce) =>
    annonce.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortedAnnonces = filteredAnnonces
    .filter((annonce) => !selectedCategory || annonce.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'priceHigh') {
        return b.price - a.price;
      } else if (sortOrder === 'priceLow') {
        return a.price - b.price;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-6 relative font-custom">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center mt-16 mb-8 text-[#333333]">Nouvelle Annonce</h1>

        {/* Bouton pour afficher/masquer la section de tri */}
        <button
          ref={categoriesRef}
          className="absolute top-16 left-0 ml-4 bg-gray-300 p-3 rounded-r-lg shadow-lg flex items-center"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filtrer
        </button>

        {/* Section de filtrage et tri */}
        <div  className={`absolute mt-28 top-16 left-0 bg-gray-300 p-6 rounded-lg shadow-lg flex flex-col space-y-4 transition-transform duration-300 ${isFilterVisible ? 'translate-x-0' : '-translate-x-80'}`}>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('recent')}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Plus Récente
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('oldest')}
          >
            <FontAwesomeIcon icon={faSortAmountUp} className="mr-2" />
            Plus Ancienne
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceHigh')}
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Prix Haut
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceLow')}
          >
            <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" />
            Prix Bas
          </button>
          <select
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Catégorie</option>
            <option value="immobilier">Immobilier</option>
            <option value="vehicule">Véhicule</option>
            <option value="electromenager">Électroménager</option>
            <option value="electronique">Électronique</option>
            <option value="mode-homme">Mode Homme</option>
            <option value="mode-femme">Mode Femme</option>
            <option value="mode-enfant">Mode Enfant</option>
            <option value="autres">Autres</option>
          </select>
        </div>

        {/* Affichage du loader ou des annonces */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FadeLoader color="#F4511E" size={100} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ml-56">
            {sortedAnnonces && sortedAnnonces.length > 0 ? (
              sortedAnnonces.map((annonce) => (
                <div
                  key={annonce.id}
                  className="bg-white p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {annonce.photos && annonce.photos[0] ? (
                    <img
                      src={annonce.photos[0]}
                      alt="Annonce"
                      onClick={() => handleDetailClick(annonce)}
                      className="cursor-pointer w-full h-48 object-cover object-center rounded-t-lg"
                      loading="lazy"
                    />
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
                    <p className="text-black mt-14 blue-500 text-xl font-semibold">{annonce.price} FCFA</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-2xl w-full mt-40">Aucune annonce disponible.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
