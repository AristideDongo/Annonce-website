import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Mhomme = ({annonces}) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('recent');
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
  };

  useEffect(() => {
    // Filtrer les annonces par catégorie "mode-homme"
    const filtered = annonces.filter(annonce => annonce.category === 'mode-homme');
    setFilteredAnnonces(filtered);
  }, [annonces]);

  useEffect(() => {
    // Trier les annonces chaque fois que l'option de tri change
    const sortedAnnonces = [...filteredAnnonces];
    switch (sortOption) {
      case 'recent':
        sortedAnnonces.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sortedAnnonces.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'price-high':
        sortedAnnonces.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sortedAnnonces.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setFilteredAnnonces(sortedAnnonces);
  }, [sortOption, filteredAnnonces]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <> 
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 relative">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Catégorie: MODE HOMME</h1>
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
            <Link to="/src/components/Annonce/annonce.jsx" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Créer une annonce
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAnnonces.map((annonce) => (
              <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={annonce.photos[0]} alt="Photo de l'annonce" className="w-full h-48 object-cover rounded-lg mb-4" loading='lazy'/>
                <h2 className="text-xl font-bold mb-2">{annonce.title}</h2>
                <p className="text-gray-700">{annonce.description}</p>
                <p className="text-green-500 font-bold">{annonce.price} FCFA</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mt-2" 
                   onClick={() => handleDetailClick(annonce)}>
                    Détail
                  </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
 )
}

export default Mhomme;