// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSortAmountDown, faSortAmountUp, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FadeLoader } from 'react-spinners';

const Home = ({ annonces, searchQuery }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
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

  const filteredAnnonces = annonces.filter(annonce =>
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 relative">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-600">Liste des annonces</h1>

        <div className="absolute left-0 top-0 mt-40 ml-4 bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
          <button
            className="bg-orange-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('recent')}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Plus Récente
          </button>
          <button
            className="bg-orange-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('oldest')}
          >
            <FontAwesomeIcon icon={faSortAmountUp} className="mr-2" />
            Plus Ancienne
          </button>
          <button
            className="bg-orange-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceHigh')}
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Prix Haut
          </button>
          <button
            className="bg-orange-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceLow')}
          >
            <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" />
            Prix Bas
          </button>
          <select
            className="bg-orange-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Catégorie</option>
            <option value="immobilier">Immobilier</option>
            <option value="vehicule">Vehicule</option>
            <option value="electromenager">Electromenager</option>
            <option value="electronique">Electronique</option>
            <option value="mode-homme">Mode Homme</option>
            <option value="mode-femme">Mode Femme</option>
            <option value="mode-enfant">Mode Enfant</option>
            <option value="autres">Autres</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FadeLoader color="#2E7D32" size={100} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ml-56">
            {sortedAnnonces && sortedAnnonces.length > 0 ? (
              sortedAnnonces.map((annonce) => (
                <div key={annonce.id} className="bg-white p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {annonce.photos && annonce.photos[0] ? (
                    <img src={annonce.photos[0]} alt="Annonce" className="w-full h-48 object-cover object-center rounded-t-lg" loading="lazy" />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-red-500">Pas d'image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-black">{annonce.title}</h2>
                    <p className="text-green-500 font-bold">{annonce.price} FCFA</p>
                    <button
                      className="mt-1 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                      onClick={() => handleDetailClick(annonce)}
                    >
                      Détails
                    </button>
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
