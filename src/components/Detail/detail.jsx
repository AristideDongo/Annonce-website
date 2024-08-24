import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPhone, faMapMarkerAlt, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const Detail = ({ profile }) => {
  const location = useLocation();
  const { title, description, price, photos, phone, location: annonceLocation } = location.state;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buttonText, setButtonText] = useState('Voir le numéro');
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [reportReason, setReportReason] = useState('');

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

  return (
    <div className="min-h-screen font-custom bg-[#F4F6F9] p-4">
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
              <div className="absolute mt-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
                <button 
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  className="bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-gray-700 transition duration-300 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  onClick={handleNextImage}
                  disabled={currentImageIndex === photos.length - 1}
                  className="bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-gray-700 transition duration-300 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </>
          )}
          <div className="flex overflow-x-auto mt-16 space-x-2">
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
        <div className="w-1/2 bg-white h-auto p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <img 
              src={profile.photoURL} 
              alt="Profile utilisateur" 
              onClick={handlePhotoClick}
              className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md object-cover hover:scale-105"
              loading='lazy'
            />
            <div className="ml-5">
              <h2 className="text-xl font-bold text-gray-700">{profile.name}</h2>
              {annonceLocation && (
                <div className="flex items-center text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  <span className='text-xl'>{annonceLocation.label}</span>
                </div>
              )}
            </div>
          </div>

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

          {showReportForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-bold mb-4">Formulaire de signalement</h3>
                <textarea 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Décrivez la raison du signalement"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <button
                  onClick={handleReportSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}

          {showReportSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-bold mb-4">Signalement reçu</h3>
                <p>Votre message de signalement a bien été envoyé. Merci de nous avoir alertés.</p>
                <button
                  onClick={handleCloseSuccessPopup}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-4 break-words">{title}</h1>
          <p className="text-2xl text-gray-400 font-semibold underline">Description de l'annonce:</p>
          <p className="text-[#7F8C8D] mb-4 break-words text-lg">{description}</p>
          <p className="text-[#27AE60] font-bold text-xl mb-4">Prix: {price} FCFA</p>
          <div className="flex space-x-80 mt-4">
            <button 
              onClick={handlePhoneButtonClick} 
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 hover:scale-105 transition duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {buttonText}
            </button>
            <button 
              onClick={handleReportClick}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-105 transition duration-300 flex items-center"
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
