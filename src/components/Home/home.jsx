import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSortAmountDown,
  faSortAmountUp,
  faDollarSign,
  faFilter,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FadeLoader } from "react-spinners";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useOutsideClick } from "../Navbar/navbarhookperso";
import { locationOptions } from "../locations/locations";

const Home = ({ searchQuery }) => {
  const navigate = useNavigate(); // Pour la navigation entre les pages

  // États locaux
  const [sortOrder, setSortOrder] = useState("recent"); // Ordre de tri des annonces
  const [selectedCategory, setSelectedCategory] = useState(""); // Catégorie sélectionnée
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const [query, setQuery] = useState(searchQuery); // Requête de recherche
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Affichage du menu de filtrage
  const [currentPage, setCurrentPage] = useState(1); // Page courante pour la pagination
  const [itemsPerPage] = useState(88); // Nombre d'annonces par page
  const [favorites, setFavorites] = useState([]); // Liste des annonces favorites
  const [selectedCity, setSelectedCity] = useState(""); // Ville sélectionnée
  const [annonces, setAnnonces] = useState([]); // Liste des annonces

  // Référence pour le composant de filtrage
  const categoriesRef = useOutsideClick(() => setIsFilterVisible(false));

  // Chargement des annonces et des favoris
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
        setIsLoading(false); // Assurez-vous de désactiver le chargement même en cas d'erreur
      }
    };

    fetchAnnonces();

    setQuery(searchQuery); // Mettre à jour la requête de recherche si nécessaire
  }, [searchQuery]);

  // Gestionnaire de clic pour afficher les détails d'une annonce
  const handleDetailClick = (annonce) => {
    navigate("Detail/detail", { state: annonce });
  };

  // Gestionnaire de changement d'ordre de tri
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Gestionnaire de changement de ville sélectionnée
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Gestionnaire de changement de catégorie sélectionnée
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Gestionnaire de changement de la requête de recherche
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Fonction pour tronquer le texte trop long
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Fonction pour calculer le temps écoulé depuis la publication d'une annonce
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
  

  // Gestionnaire de clic pour ajouter/supprimer une annonce des favoris
  const handleFavoriteClick = async (annonce) => {
    const isFavorite = favorites.some((fav) => fav.uniqueId === annonce.uniqueId);
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:3000/api/favoris/${isFavorite ? "delete" : "add"}/${annonce.uniqueId}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ annonceId: annonce.uniqueId }),
      });
  
      if (response.ok) {
        const updatedFavorites = isFavorite
          ? favorites.filter((fav) => fav.uniqueId !== annonce.uniqueId)
          : [...favorites, annonce];
  
        setFavorites(updatedFavorites);
      } else {
        console.error("Erreur lors de la mise à jour des favoris");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };
  

  // Filtrer les annonces en fonction de la requête de recherche et des filtres sélectionnés
  const filteredAnnonces = (Array.isArray(annonces) ? annonces : []).filter(
    (annonce) =>
      annonce.title.toLowerCase().includes(query.toLowerCase()) &&
      (!selectedCity || annonce.location.value === selectedCity)
  );

  // Trier les annonces filtrées en fonction de l'ordre de tri sélectionné
  const sortedAnnonces = filteredAnnonces
    .filter(
      (annonce) => !selectedCategory || annonce.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return b.timestamp - a.timestamp;
      } else if (sortOrder === "oldest") {
        return a.timestamp - b.timestamp;
      } else if (sortOrder === "priceHigh") {
        return b.price - a.price;
      } else if (sortOrder === "priceLow") {
        return a.price - b.price;
      }
      return 0;
    });

  // Calcul du nombre total de pages pour la pagination
  const totalPages = Math.ceil(sortedAnnonces.length / itemsPerPage);
  // Sélection des annonces à afficher sur la page courante
  const currentItems = sortedAnnonces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gestionnaire de changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 relative font-custom">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center mt-16 mb-8 capitalize text-[#333333]">
          Annonce Récente
        </h1>
        <button
          ref={categoriesRef}
          className="absolute top-16 left-0 ml-4 bg-black text-white p-3 rounded-b-lg shadow-lg flex items-center"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filtrer
        </button>

        <div
          ref={categoriesRef}
          className={`absolute z-40 mt-32 top-16 left-0 bg-gray-300 p-6 rounded-lg shadow-lg flex flex-col space-y-4 transition-transform duration-300 ${
            isFilterVisible ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            transform: isFilterVisible ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange("recent")}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Plus Récente
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange("oldest")}
          >
            <FontAwesomeIcon icon={faSortAmountUp} className="mr-2" />
            Plus Ancienne
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange("priceHigh")}
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Prix Haut
          </button>
          <button
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
            onClick={() => handleSortChange("priceLow")}
          >
            <FontAwesomeIcon icon={faSortAmountDown} className="mr-2" />
            Prix Bas
          </button>
          <select
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Tous</option>
            <option value="immobilier">Immobilier</option>
            <option value="vehicule">Véhicule</option>
            <option value="electromenager">Électroménager</option>
            <option value="electronique">Électronique</option>
            <option value="mode-homme">Mode Homme</option>
            <option value="mode-femme">Mode Femme</option>
            <option value="mode-enfant">Mode Enfant</option>
            <option value="autres">Autres</option>
          </select>
          <select
            className="bg-white text-blue-500 w-40 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">Villes</option>
            {locationOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FadeLoader color="#F4511E" size={100} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {currentItems.length > 0 ? (
                currentItems.map((annonce) => (
                  <div
                    key={annonce.uniqueId}
                    className="bg-white p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                  >
                    {annonce.photos && annonce.photos[0] ? (
                      <div className="relative">
                        <img
                          src={`http://localhost:3000/uploads/annonce/${annonce.photos[0]}`}
                          alt="Annonce"
                          onClick={() => handleDetailClick(annonce)}
                          className="cursor-pointer w-full h-48 object-cover object-center rounded-t-lg"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 rounded-full p-1">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-gray-500"
                          />
                          <span className="text-white ml-1 text-xs">
                            {getElapsedTime(annonce.timestamp)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <span className="text-red-500">Pas d'image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3
                        className="text-lg break-words cursor-pointer font-semibold text-blue-600 mb-2 hover:text-orange-600"
                        onClick={() => handleDetailClick(annonce)}
                      >
                        {truncateText(annonce.title, 50)}
                      </h3>
                      <p className="text-black mt-auto blue-500 text-xl font-semibold">
                        {annonce.price} FCFA
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <FaMapMarkerAlt className="text-gray-500" />
                        <span className="text-gray-700 font-medium">
                          {annonce.location && annonce.location.label ? (
                            annonce.location.label
                          ) : (
                            <span className="text-red-500">
                              Localisation non définie
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 cursor-pointer transition-transform duration-300 ${
                        favorites.some((fav) => fav.uniqueId === annonce.uniqueId)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleFavoriteClick(annonce)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-2xl w-full mt-40">
                  Aucune annonce disponible.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === page + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      } transition-colors duration-300`}
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

export default Home;
