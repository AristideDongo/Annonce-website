import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSortAmountDown, faSortAmountUp, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const Home = ({ annonces }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('recent'); // État pour l'ordre de tri
  const [selectedCategory, setSelectedCategory] = useState(''); // État pour la catégorie sélectionnée

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const sortedAnnonces = annonces
    .filter((annonce) => !selectedCategory || annonce.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.date) - new Date(a.date); // Tri par date décroissante
      } else if (sortOrder === 'oldest') {
        return new Date(a.date) - new Date(b.date); // Tri par date croissante
      } else if (sortOrder === 'priceHigh') {
        return b.price - a.price; // Tri par prix décroissant
      } else if (sortOrder === 'priceLow') {
        return a.price - b.price; // Tri par prix croissant
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 relative">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Liste des annonces</h1>
        
        {/* Section de tri */}
        <div className="absolute left-0 top-0 mt-40 ml-4 bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
          <button 
            className="bg-indigo-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('recent')}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Plus Récente
          </button>
          <button 
            className="bg-indigo-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('oldest')}
          >
            <FontAwesomeIcon icon={faSortAmountUp} className="mr-2" />
            Plus Ancienne
          </button>
          <button 
            className="bg-indigo-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceHigh')}
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Prix Haut
          </button>
          <button 
            className="bg-indigo-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange('priceLow')}
          >
            <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" />
            Prix Bas
          </button>
          <select 
            className="bg-indigo-500 text-white w-40 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
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
            {/* Ajoutez d'autres options de catégorie ici */}
          </select>
        </div>

        {/* Liste des annonces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-56">
          {sortedAnnonces && sortedAnnonces.length > 0 ? (
            sortedAnnonces.map((annonce) => (
              <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {annonce.photos && annonce.photos[0] ? (
                  <img src={annonce.photos[0]} alt="Annonce" className="w-full h-40 object-cover object-center rounded-t-lg" loading='lazy'/>
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-red-500">Pas d'image</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-indigo-700">{annonce.title}</h2>
                  <p className="text-gray-700 mb-2">{annonce.description}</p>
                  <p className="text-green-500 font-bold">{annonce.price} FCFA</p>
                  <button 
                    className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
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
      </div>
    </div>
  );
};

export default Home;