import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [sortOption, setSortOption] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/150');

  useEffect(() => {
    const savedPhotoURL = localStorage.getItem('photoURL');
    if (savedPhotoURL) {
      setPhotoURL(savedPhotoURL);
    }
  }, []);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Ajoutez ici la logique de tri en fonction de l'option sélectionnée
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
    const newPhotoURL = URL.createObjectURL(file);
    setPhotoURL(newPhotoURL);
    localStorage.setItem('photoURL', newPhotoURL);
  };

  const handlePhotoUpload = () => {
    // Ajoutez ici la logique pour télécharger la photo de profil
    console.log('Photo de profil téléchargée:', profilePhoto);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 mt-10 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              src={photoURL}
              alt="Profile"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">John Doe</h2>
              <p className="text-gray-600">+225 0102030405</p>
              <p className="text-gray-600">john.doe@example.com</p>
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
              <li className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg sm:text-xl font-bold">Annonce 1</h4>
                <p className="text-gray-600">Description de l'annonce 1...</p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg sm:text-xl font-bold">Annonce 2</h4>
                <p className="text-gray-600">Description de l'annonce 2...</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile