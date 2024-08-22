import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPhone } from '@fortawesome/free-solid-svg-icons';


const Detail = ({ profile }) => {
  const location = useLocation();
  const { title, description, price, photos, phone } = location.state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buttonText, setButtonText] = useState('Voir le numero');


  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleButtonClick = () => {
    if (buttonText === 'Voir le numero') {
      setButtonText(phone);
      const popupShown = localStorage.getItem('securityPopupShown');
      if (!popupShown) {
      }
    } else {
      setButtonText('Voir le numero');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-4">
      <div className="container mx-auto flex">
        {/* Images et boutons de navigation à gauche (50%) */}
        <div className="w-1/2 relative">
          {photos && photos.length > 0 && (
            <>
              <img 
                src={photos[currentImageIndex]} 
                alt="Annonce" 
                className="w-full h-96 object-contain rounded-lg mb-4" 
                loading='lazy'
              />
              <button 
                onClick={handlePrevImage} 
                disabled={handlePrevImage.length === 0}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button 
                onClick={handleNextImage} 
                disabled={handleNextImage.length === 5}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}

          {/* Aperçus des images en bas, limitées à 3 */}
          <div className="flex overflow-x-auto mt-2 space-x-2">
            {photos && photos.slice(0,6).map((photo, index) => (
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
        <div className="w-1/2 bg-white h-auto p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            {/* Photo de profil de l'utilisateur */}
            <img 
              src={profile.photoURL} 
              alt="Profile utilisateur" 
              className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md object-cover hover:scale-105"
              loading='lazy'
            />
            {/* Nom de l'utilisateur */}
            <h2 className=" ml-5 text-xl font-bold text-gray-700">{profile.name}</h2>
          </div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-2xl text-gray-400 font-semibold underline">Description de l'annonce: </p><br />
          <p className="text-[#7F8C8D] mb-4">{description}</p>
          <p className="text-[#27AE60] font-bold text-xl mb-4">Prix: {price} FCFA</p>
          {/* Nouveau bouton avec icône de téléphone et texte dynamique */}
          <button 
            onClick={handleButtonClick} 
            className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition duration-300 mt-4 flex items-center"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
