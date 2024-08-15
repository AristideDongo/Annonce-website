import React, { useState } from 'react';

const Profile = () => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Ajoutez ici la logique de tri en fonction de l'option sélectionnée
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 mt-10 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">John Doe</h2>
              <p className="text-gray-600">+225 0102030405</p>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
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
                <option value="date">IMMOBILIER</option>
                <option value="title">VEHICULE</option>
                <option value="title">ELECTRONIQUE</option>
                <option value="title">ELECTROMENAGER</option>
                <option value="title">MODE HOMME</option>
                <option value="title">MODE FEMME</option>
                <option value="title">MODE ENFANT</option>
                <option value="title">AUTRES</option>
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

export default Profile;