import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ annonces }) => {
  const navigate = useNavigate();

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Liste des annonces</h1>
        
        {/* Section de tri */}
        <div className="absolute left-0 top-0 mt-4 ml-4 bg-white p-4 rounded-lg shadow-lg">
          <button className="bg-blue-500 text-white w-40 px-4 py-2 rounded-lg mb-2 hover:bg-blue-600">Trier par Date</button>
          <button className="bg-blue-500 text-white w-40 px-4 py-2 rounded-lg mb-2 hover:bg-blue-600">Trier par Prix</button>
          <button className="bg-blue-500 text-white w-40 px-4 py-2 rounded-lg mb-2 hover:bg-blue-600">Trier par Catégorie</button>
        </div>

        {/* Liste des annonces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-56">
          {annonces && annonces.length > 0 ? (
            annonces.map((annonce) => (
              <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {annonce.photos && annonce.photos[0] ? (
                  <img src={annonce.photos[0]} alt="Preview" className="w-full h-48 object-cover rounded-t-lg" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">Pas d'image</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{annonce.title}</h2>
                  <p className="text-gray-700 mb-2">{annonce.description}</p>
                  <p className="text-green-500 font-bold">{annonce.price} FCFA</p>
                  <button 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => handleDetailClick(annonce)}
                  >
                    Détails
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-right text-gray-500 text-2xl">Aucune annonce disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;