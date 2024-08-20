import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ annonces, deleteAnnonce }) => {
  const navigate = useNavigate()
  const [sortOption, setSortOption] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/150');
  const [sortedAnnonces, setSortedAnnonces] = useState(annonces);
  const [userInfo, setUserInfo] = useState({
    name: 'Nom d\'utilisateur',
    email: 'email@example.com',
    phone: '0000000000'
  }); // État pour les informations utilisateur
  const [selectedAnnonces, setSelectedAnnonces] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const handleDetailClick = (annonce) => {
    navigate('/src/components/Detail/detail.jsx/', { state: annonce });
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

  const handleDeleteSelectedAnnonces = () => {
    const updatedAnnonces = sortedAnnonces.filter(annonce => !selectedAnnonces.includes(annonce.id));
    setSortedAnnonces(updatedAnnonces);
    setSelectedAnnonces([]);
  };

  
  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    selectedAnnonces.forEach(id => deleteAnnonce(id));
    setSelectedAnnonces([]);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="min-h-screen bg-indigo-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 mt-10 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              src={photoURL}
              alt="Profile"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">{userInfo.name}</h2>
              <p className="text-gray-600">{userInfo.phone}</p>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <button
              onClick={handlePhotoUpload}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Télécharger la photo de profil
            </button>
          </div>
          <div className="mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold">Mes annonces</h3>
            <div className="mt-4">
              <label htmlFor="sort" className="block text-gray-700">Trier par:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
            <ul className="mt-4 space-y-4">
              {sortedAnnonces.map((annonce) => (
                <li key={annonce.id} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 className="text-lg sm:text-xl font-bold">{annonce.title}</h4>
                  <p className="text-gray-600">{annonce.description}</p>
                  <p className="text-green-500 font-bold">{annonce.price} FCFA</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mt-2"  
                  onClick={() => handleDetailClick(annonce)}>
                    Détail
                </button>
                  <input
                    type="checkbox"
                    checked={selectedAnnonces.includes(annonce.id)}
                    onChange={() => handleSelectAnnonce(annonce.id)}
                    className="ml-96"
                  />
                </li>
              ))}
            </ul>
            <button
        onClick={handleDeleteConfirmation}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Supprimer
      </button>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-2 text-red-600">Confirmation de suppression</h2>
            <p className="text-gray-700">Êtes-vous sûr de vouloir supprimer les annonces sélectionnées?</p>
            <div className="mt-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
              >
                Oui
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;