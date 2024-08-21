import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ annonces, deleteAnnonce, updateAnnonce }) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/150');
  const [sortedAnnonces, setSortedAnnonces] = useState(annonces);
  const [userInfo, setUserInfo] = useState({
    name: 'Nom d\'utilisateur',
    email: 'email@example.com',
    phone: '0000000000'
  });
  const [selectedAnnonces, setSelectedAnnonces] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [editAnnonce, setEditAnnonce] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  const handleEditClick = (annonce) => {
    setFormData({
      title: annonce.title,
      description: annonce.description,
      price: annonce.price,
    });
    setEditAnnonce(annonce);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setEditAnnonce(null);
  };

  const handleConfirmEdit = () => {
    if (editAnnonce) {
      const updatedAnnonce = {
        ...editAnnonce,
        ...formData,
      };
      updateAnnonce(updatedAnnonce);
      console.log("Modification de l'annonce:", updatedAnnonce);
      handleCloseEditPopup();
    }
  };

  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
  };

  const handlePhotoClick = () => {
    if (photoURL) {
      setShowPhotoPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPhotoPopup(false);
  };

  useEffect(() => {
    const savedPhotoURL = localStorage.getItem('photoURL');
    if (savedPhotoURL) {
      setPhotoURL(savedPhotoURL);
    }

    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  useEffect(() => {
    let sorted = [...annonces];
    switch (sortOption) {
      case 'immobilier':
        sorted = sorted.filter(annonce => annonce.category === 'immobilier');
        break;
      case 'vehicule':
        sorted = sorted.filter(annonce => annonce.category === 'vehicule');
        break;
      case 'electronique':
        sorted = sorted.filter(annonce => annonce.category === 'electronique');
        break;
      case 'electromenager':
        sorted = sorted.filter(annonce => annonce.category === 'electromenager');
        break;
      case 'mode-homme':
        sorted = sorted.filter(annonce => annonce.category === 'mode-homme');
        break;
      case 'mode-femme':
        sorted = sorted.filter(annonce => annonce.category === 'mode-femme');
        break;
      case 'mode-enfant':
        sorted = sorted.filter(annonce => annonce.category === 'mode-enfant');
        break;
      case 'autres':
        sorted = sorted.filter(annonce => annonce.category === 'autres');
        break;
      default:
        sorted = annonces;
    }
    setSortedAnnonces(sorted);
  }, [sortOption, annonces]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
    const newPhotoURL = URL.createObjectURL(file);
    setPhotoURL(newPhotoURL);
    localStorage.setItem('photoURL', newPhotoURL);
  };

  const handlePhotoUpload = () => {
    console.log('Profile photo uploaded:', profilePhoto);
  };

  const handleSelectAnnonce = (annonceId) => {
    if (selectedAnnonces.includes(annonceId)) {
      setSelectedAnnonces(selectedAnnonces.filter(id => id !== annonceId));
    } else {
      setSelectedAnnonces([...selectedAnnonces, annonceId]);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    console.log("Annonces sélectionnées pour suppression:", selectedAnnonces);
    selectedAnnonces.forEach(id => {
      console.log("Suppression de l'annonce avec l'id:", id);
      deleteAnnonce(id);
    });
    setSelectedAnnonces([]); // Réinitialiser les annonces sélectionnées après suppression
    setShowDeleteConfirmation(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 mt-10 w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg transform transition duration-500 hover:scale-105"
            src={photoURL}
            alt="Profile"
            onClick={handlePhotoClick}
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">{userInfo.name}</h2>
            <p className="text-lg text-gray-600">{userInfo.phone}</p>
            <p className="text-lg text-gray-600">{userInfo.email}</p>
          </div>
        </div>
        {showPhotoPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-[90%] max-h-[90%] overflow-auto">
              <img
                src={photoURL}
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
        <div className="mt-6">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <button
            onClick={handlePhotoUpload}
            className="mt-4 px-5 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition-transform duration-300 transform hover:scale-105"
          >
            Télécharger la photo de profil
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800">Mes annonces</h3>
          <div className="mt-4">
            <label htmlFor="sort" className="block text-gray-700 font-semibold">Trier par:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Sélectionner une option</option>
              <option value="immobilier">IMMOBILIER</option>
              <option value="vehicule">VEHICULE</option>
              <option value="electronique">ELECTRONIQUE</option>
              <option value="electromenager">ELECTROMENAGER</option>
              <option value="mode-homme">MODE HOMME</option>
              <option value="mode-femme">MODE FEMME</option>
              <option value="mode-enfant">MODE ENFANT</option>
              <option value="autres">AUTRES</option>
            </select>
          </div>
          <ul className="mt-6 space-y-4">
            {sortedAnnonces.map((annonce) => (
              <li key={annonce.id} className="bg-gray-50 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-800">{annonce.title}</h4>
                <p className="text-gray-600">{annonce.description}</p>
                <p className="text-green-600 font-semibold">{annonce.price} FCFA</p>
                <button
                  onClick={() => handleDetailClick(annonce)}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Détail
                </button>
                <button
                  onClick={() => handleEditClick(annonce)}
                  className="mt-3 px-4 py-2 ml-5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Modifier
                </button>
                <input
                  type="checkbox"
                  checked={selectedAnnonces.includes(annonce.id)}
                  onChange={() => handleSelectAnnonce(annonce.id)}
                  className="ml-4 transform scale-125"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={handleDeleteConfirmation}
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-transform duration-300 transform hover:scale-105"
          >
            Supprimer
          </button>
          {showDeleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">Confirmation de suppression</h2>
                <p className="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer les annonces sélectionnées?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleConfirmDelete}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Oui
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>
          )}
          {showEditPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Modifier l'annonce</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-black">Titre:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                      />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-black">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                      />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-black">Prix:</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                      />
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleConfirmEdit}
                      type="button"
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={handleCloseEditPopup}
                      type="button"
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
