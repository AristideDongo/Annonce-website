import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPhone, faMapMarkerAlt, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { countries } from '../countries/countries';
import { FaWhatsapp } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";


const Detail = ({ profile }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { id ,title, description, price, photos, phone, whatsapp, location: annonceLocation, timestamp } = location.state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buttonText, setButtonText] = useState('Voir le numéro');
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
 // État des favoris
 const [isFavorite, setIsFavorite] = useState(false);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePhoneButtonClick = () => {
    if (buttonText === 'Voir le numéro') {
      setButtonText(phone);
    } else {
      setButtonText('Voir le numéro');
    }
  };

  const handlePhotoClick = () => {
    if (profile.photoURL) {
      setShowPhotoPopup(true);
    }
  };

  const handleNameClick = () =>{
    navigate('/User/profile')
  }

  const handleClosePopup = () => {
    setShowPhotoPopup(false);
  };

  const handleReportClick = () => {
    setShowReportConfirm(true);
  };

  const handleReportConfirm = (confirm) => {
    if (confirm) {
      setShowReportConfirm(false);
      setShowReportForm(true);
    } else {
      setShowReportConfirm(false);
    }
  };

  const handleReportSubmit = () => {
    // Handle report submission logic here
    setShowReportForm(false);
    setShowReportSuccess(true);
  };

  const handleCloseSuccessPopup = () => {
    setShowReportSuccess(false);
  };

  const handleCloseReportForm = () => {
    setShowReportForm(false);
  };
  

  // Trouver le code du pays pour la Côte d'Ivoire
const countryCode = countries.find(country => country.name === "Côte d'Ivoire")?.code || '';

// Format du numéro de téléphone pour WhatsApp
const formattedPhoneNumber = `${countryCode}${whatsapp.replace(/\D/g, '')}`;

 // Fonction pour gérer les favoris
 const handleFavoriteToggle = () => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  const isCurrentlyFavorite = storedFavorites.some(fav => fav.id === id);
  const updatedFavorites = isCurrentlyFavorite
    ? storedFavorites.filter(fav => fav.id !== id)
    : [...storedFavorites, { id, title, description, price, photos, phone, whatsapp, location: annonceLocation, timestamp }];

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  setIsFavorite(!isCurrentlyFavorite);
};

useEffect(() => {
  // Calculer le temps écoulé depuis la création de l'annonce
  const calculateElapsedTime = () => {
    const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    const secondsElapsed = now - timestamp; // Temps écoulé en secondes

    const minutes = Math.floor(secondsElapsed / 60); // Convertir en minutes
    const hours = Math.floor(minutes / 60); // Convertir en heures
    const days = Math.floor(hours / 24); // Convertir en jours
    const months = Math.floor(days / 30.42); // Convertir en mois (approximatif)
    const years = Math.floor(days / 365); // Convertir en années (approximatif)

    if (years > 0) {
      setElapsedTime(`${years} année${years > 1 ? 's' : ''} ago`);
    } else if (months > 0) {
      setElapsedTime(`${months} mois ago`);
    } else if (days > 0) {
      setElapsedTime(`${days} jour${days > 1 ? 's' : ''} ago`);
    } else if (hours > 0) {
      setElapsedTime(`${hours} heure${hours > 1 ? 's' : ''} ago`);
    } else {
      setElapsedTime(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
    }
  };

  calculateElapsedTime();
}, [timestamp]);

  
  return (
    <div className="min-h-screen mt-16 font-custom bg-gray-200 p-4">
      <div className="container mx-auto flex flex-col md:flex-row">
        {/* Images et boutons de navigation à gauche (50%) */}
        <div className="w-full md:w-1/2 relative mb-6 md:mb-0">
          {photos && photos.length > 0 && (
            <div className="relative">
              <img 
                src={photos[currentImageIndex]} 
                alt="Annonce" 
                className="w-full h-64 md:h-80 lg:h-96 object-contain rounded-lg mb-4" 
                loading='lazy'
              />
              {/* Icône de favoris */}
              <button
               onClick={handleFavoriteToggle}
               className={`absolute bg-white bg-opacity-50 rounded-full top-4 right-4 p-2 ${isFavorite ? 'text-red-500' : 'text-gray-500'} hover:text-red-700 transition-colors duration-300`}
              >
               {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              {/* Boutons de navigation centrés en dessous de l'image principale */}
              <div className="flex justify-center mt-4">
              <button 
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  className="bg-transparent border border-black text-black w-12 h-12 rounded-full hover:bg-gray-400 transition duration-300 flex items-center justify-center mx-2"
              >
                  <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button 
                  onClick={handleNextImage}
                  disabled={currentImageIndex === photos.length - 1}
                  className="bg-transparent border border-black text-black w-12 h-12 rounded-full hover:bg-gray-400 transition duration-300 flex items-center justify-center mx-2"
              >
                  <FontAwesomeIcon icon={faChevronRight} />
              </button>
              </div>
            </div>
          )}
          <div className="flex overflow-x-auto mt-4 space-x-2">
            {photos.map((photo, index) => (
              <img 
                key={index} 
                src={photo} 
                alt={`Aperçu ${index}`} 
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${index === currentImageIndex ? 'border-4 border-blue-500' : 'border-2 border-gray-300'}`} 
                onClick={() => handleImageClick(index)}
                loading='lazy'
              />
            ))}
          </div>
        </div>

        {/* Contenu principal à droite (50%) */}
        <div className="w-full md:w-1/2 bg-white h-auto p-4 md:p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <img 
              src={profile.photoURL} 
              alt="Profile utilisateur" 
              onClick={handlePhotoClick}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300 shadow-md object-cover hover:scale-105 transition-transform duration-300"
              loading='lazy'
            />
            <div className="mt-4 md:mt-0 md:ml-5 text-center md:text-left">
              <h2 className="text-xl cursor-pointer font-bold text-gray-700" onClick={handleNameClick}>{profile.name}</h2>
              {annonceLocation && (
                <div className="flex items-center justify-center md:justify-start text-gray-500 mt-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  <span className='text-xl'>{annonceLocation.label}</span>
                </div>
              )}
              <div className="flex items-center justify-center md:justify-start text-gray-500 mt-2">
                <CiClock2 className="mr-2" />
                <span className='text-xl'>{elapsedTime}</span>
              </div>
            </div>
          </div>

          {/* Popup de photo de profil */}
          {showPhotoPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-[90%] max-h-[90%] overflow-auto">
                <img
                  src={profile.photoURL}
                  alt="Profile Large"
                  className="max-w-full max-h-96 rounded-lg"
                />
                <button
                  onClick={handleClosePopup}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

          {/* Confirmation de signalement */}
          {showReportConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-bold mb-4">Confirmer le signalement</h3>
                <p>Êtes-vous sûr de vouloir signaler ce vendeur ?</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button 
                    onClick={() => handleReportConfirm(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Oui
                  </button>
                  <button 
                    onClick={() => handleReportConfirm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Formulaire de signalement */}
          {showReportForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-bold mb-4">Signaler l'annonceur</h3>
                <textarea
                  className="w-full p-5 border border-gray-300 rounded-md mb-4"
                  placeholder="Raison du signalement"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                />
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={handleReportSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Envoyer
                  </button>
                  <button 
                    onClick={handleCloseReportForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation de succès de signalement */}
          {showReportSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-bold mb-4">Signalement envoyé</h3>
                <p>Votre signalement a été envoyé avec succès.</p>
                <button 
                  onClick={handleCloseSuccessPopup}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-4xl font-bold text-black break-words ">{title}</h3>
            <h4 className="text-2xl font-semibold text-gray-500 underline mt-5 mb-5" >DESCRIPTION DE L'ANNONCE:</h4>
            <p className="text-gray-500 text-xl mt-2 break-words mb-5 ">{description}</p>
            <span className="text-xl font-bold mr-5 text-black">{price} FCFA</span>
          </div>

          {/* Conteneur des boutons "Voir le numéro" et "Contacter sur WhatsApp" */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-center gap-4 mb-4">
            {/* Bouton pour voir le numéro */}
            <button 
                onClick={handlePhoneButtonClick}
                className="bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                {buttonText}
            </button>

            {/* Bouton pour contacter sur WhatsApp */}
            <button
                onClick={() => window.open(`https://wa.me/${formattedPhoneNumber}`, '_blank')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
            >
                <FaWhatsapp className="mr-2" />
                WhatsApp
            </button>
      </div>

        {/* Conteneur du bouton "Signaler" */}
        <div className="flex justify-center mt-4">
            <button
                onClick={handleReportClick}
                className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
                Signaler
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
