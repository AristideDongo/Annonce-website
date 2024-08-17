import React, { useState, useEffect } from 'react';
import { BsTelephone, BsArrowUp, BsArrowDown, BsStar, BsStarHalf, BsClock } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const [annonces, setAnnonces] = useState([
    // Exemple d'annonces
    { id: 1, titre: "Annonce 1", description: "Description 1", prix: 100, popularite: 5, date: new Date('2023-01-01'), images: ["url_de_votre_image1", "url_de_votre_image2"] },
    { id: 2, titre: "Annonce 2", description: "Description 2", prix: 50, popularite: 3, date: new Date('2023-02-01'), images: ["url_de_votre_image3", "url_de_votre_image4"] },
    // Ajoutez plus d'annonces ici
  ]);
  const [sortedAnnonces, setSortedAnnonces] = useState([...annonces]);
  const navigate = useNavigate();

  const trierAnnonces = (critere) => {
    let sorted = [...annonces];
    switch (critere) {
      case 'prixHaut':
        sorted.sort((a, b) => b.prix - a.prix);
        break;
      case 'prixBas':
        sorted.sort((a, b) => a.prix - b.prix);
        break;
      case 'plusPopulaire':
        sorted.sort((a, b) => b.popularite - a.popularite);
        break;
      case 'moinsPopulaire':
        sorted.sort((a, b) => a.popularite - b.popularite);
        break;
      case 'plusRecente':
        sorted.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }
    setSortedAnnonces(sorted);
  };

  useEffect(() => {
    setSortedAnnonces([...annonces]);
  }, [annonces]);

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx', { state: annonce });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Section de tri des produits */}
          <aside className="bg-gray-100 p-2 rounded-s-lg shadow-md max-h-72 overflow-auto md:col-span-2">
            <h2 className="text-lg font-bold mb-2 text-center">Trier par</h2>
            <div className="flex flex-col space-y-1">
              <button onClick={() => trierAnnonces('prixHaut')} className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center">
                <BsArrowUp className="mr-2"/> Prix Haut
              </button>
              <button onClick={() => trierAnnonces('prixBas')} className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center">
                <BsArrowDown className="mr-2"/> Prix Bas
              </button>
              <button onClick={() => trierAnnonces('plusPopulaire')} className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center">
                <BsStar className="mr-2"/> Plus Populaire
              </button>
              <button onClick={() => trierAnnonces('moinsPopulaire')} className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center">
                <BsStarHalf className="mr-2"/> Moins Populaire
              </button>
              <button onClick={() => trierAnnonces('plusRecente')} className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100 flex items-center">
                <BsClock className="mr-2"/> Plus Récente
              </button>
            </div>
          </aside>

          {/* Section principale */}
          <main className="md:col-span-10">
            {/* Nouvelle annonce */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Nouvelle annonce</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedAnnonces.map((annonce) => (
                  <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img src={annonce.images[0]} alt="Description de l'image" className="w-full h-48 object-cover rounded-t-lg" />
                    <h3 className="text-xl font-semibold mt-4">{annonce.titre}</h3>
                    <p className="text-gray-600">{annonce.description}</p>
                    <p className="text-gray-800 font-bold">Prix: {annonce.prix} €</p>
                    <button onClick={() => handleDetailClick(annonce)} className="text-white bg-blue-500 p-2 rounded-lg shadow-md hover:bg-green-600 flex items-center">
                      Détails
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Top annonce */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Top annonce</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedAnnonces.map((annonce) => (
                  <div key={annonce.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img src={annonce.images[0]} alt="Description de l'image" className="w-full h-48 object-cover rounded-t-lg" />
                    <h3 className="text-xl font-semibold mt-4">{annonce.titre}</h3>
                    <p className="text-gray-600">{annonce.description}</p>
                    <p className="text-gray-800 font-bold">Prix: {annonce.prix} €</p>
                    <button onClick={() => handleDetailClick(annonce)} className="text-white bg-blue-500 p-2 rounded-lg shadow-md hover:bg-green-600 flex items-center">
                      Détails
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home