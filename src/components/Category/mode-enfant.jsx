import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Menfant = ({annonces}) => {
  const [sortOption, setSortOption] = useState('date');
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);

  useEffect(() => {
    // Filtrer les annonces par catégorie "electromenager"
    const filtered = annonces.filter(annonce => annonce.category === 'mode-enfant');
    setFilteredAnnonces(filtered);
  }, [annonces]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <> 
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Catégorie: MODE ENFANT</h1>
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="sort" className="block text-gray-700">Trier par:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="date">Date</option>
                <option value="price">Prix</option>
                <option value="popularity">Popularité</option>
              </select>
            </div>
            <Link to="/src/components/Annonce/annonce.jsx" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Créer une annonce
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAnnonces.map((annonce) => (
              <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={annonce.photos[0]} alt="Photo de l'annonce" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-2">{annonce.title}</h2>
                <p className="text-gray-700">{annonce.description}</p>
                <p className="text-gray-500 mt-2">Prix: {annonce.price}€</p>
                <Link to="/src/components/Detail/detail.jsx">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mt-2">
                    Détail
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
</>
 )
}

export default Menfant