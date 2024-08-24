import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';  // Importez FadeLoader

const Electromenager = ({ annonces, searchQuery }) => {
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState('recent');
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement

  const handleDetailClick = (annonce) => {
    navigate('Detail/detail/', { state: annonce });
  };

  const sortAnnonces = (annonces, option) => {
    switch (option) {
      case 'recent':
        return annonces.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return annonces.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'price-high':
        return annonces.sort((a, b) => b.price - a.price);
      case 'price-low':
        return annonces.sort((a, b) => a.price - b.price);
      default:
        return annonces;
    }
  };

  useEffect(() => {
    setLoading(true);  // Commencez le chargement

    // Filtrer les annonces par catégorie "autres" et recherche
    const filteredByCategory = annonces.filter(annonce => annonce.category === 'electromenager');
    const filteredBySearch = filteredByCategory.filter(annonce =>
      annonce.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sorted = sortAnnonces(filteredBySearch, sortOption);

    setFilteredAnnonces(sorted);
    setLoading(false);  // Arrêtez le chargement après la mise à jour des annonces
  }, [annonces, searchQuery, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Fonction pour tronquer le texte
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <> 
      <div className="min-h-screen font-custom bg-[#F4F6F9] p-6 relative">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-extrabold text-center mb-8 mt-16 text-[#333333]">ELECTROMENAGER</h1>
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
          
          {/* Affichez le loader si l'état de chargement est true */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <FadeLoader color="#F4511E" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAnnonces.length > 0 ? (
                filteredAnnonces.map((annonce) => (
                  <div key={annonce.id} className="bg-white cursor-pointer p-2 rounded-lg shadow-lg">
                    <img src={annonce.photos[0]} onClick={() => handleDetailClick(annonce)} alt="Photo de l'annonce" className="w-full h-48 object-cover rounded-lg mb-4" loading='lazy'/>
                    <h2
                      onClick={() => handleDetailClick(annonce)}
                      className="text-lg font-bold mb-2 text-blue-600 hover:text-orange-500 break-words cursor-pointer"
                      style={{ maxHeight: '3em' }}
                    >
                      {truncateText(annonce.title, 50)}
                    </h2>
                    <p className="text-[#27AE60] font-bold">{annonce.price} FCFA</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-2xl w-full mt-40">Aucune annonce disponible.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Electromenager
