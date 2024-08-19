import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaBaby, FaCar, FaHome, FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { IoDuplicateOutline, IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { TbRazorElectric } from "react-icons/tb";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { MdOutlineOtherHouses } from "react-icons/md";
import { CiLogout } from 'react-icons/ci';

const Navbar = () => {
  // États pour gérer l'ouverture des menus et popup
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté

  // Fonction pour basculer l'affichage des catégories
  const handleToggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsAccountMenuOpen(false);
  };

  // Fonction pour basculer l'affichage du menu compte
  const handleToggleAccount = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
    setIsCategoriesOpen(false);
  };

  // Fonction pour fermer tous les menus
  const handleCloseMenus = () => {
    setIsCategoriesOpen(false);
    setIsAccountMenuOpen(false);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Logique de déconnexion ici
    console.log("Déconnecté");
    setIsUserLoggedIn(false); // Mettre à jour l'état de connexion de l'utilisateur
    setIsLogoutPopupOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">SITE ANNNONCE</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <FaHome className="mr-2"/> Acceuil
          </Link>
          <div className="relative">
            <button 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={handleToggleCategories}
            >
              <BiCategory className="mr-2"/> Catégories
            </button>
            {isCategoriesOpen && (
              <ul className="absolute bg-gray-800 mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
                <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
                <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
                <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
                <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
                <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
                <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
                <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
              </ul>
            )}
          </div>
          <div className="relative">
            <button 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={handleToggleAccount}
            >
              <FaRegUserCircle className="mr-2"/> Mon Compte
            </button>
            {isAccountMenuOpen && (
              <ul className="absolute bg-gray-800 mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
                <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
                <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
                {isUserLoggedIn && (
                  <li>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                      onClick={() => setIsLogoutPopupOpen(true)}
                    >
                      <CiLogout className="mr-2"/> Déconnexion
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
          <Link to="/src/components/Annonce/annonce.jsx" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
            <IoDuplicateOutline className="mr-2"/> Déposer une annonce
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white" onClick={() => {
            setIsCategoriesOpen(!isCategoriesOpen);
            setIsAccountMenuOpen(false);
          }}>
            <BiCategory className="text-2xl"/>
          </button>
          <button className="text-white ml-4" onClick={() => {
            setIsAccountMenuOpen(!isAccountMenuOpen);
            setIsCategoriesOpen(false);
          }}>
            <FaRegUserCircle className="text-2xl"/>
          </button>
        </div>
      </div>
      {/* Menu mobile */}
      {isCategoriesOpen && (
        <div className="md:hidden">
          <ul className="bg-gray-800 mt-2 rounded-md shadow-lg z-10">
            <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
            <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
            <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
            <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
            <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
            <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
            <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
            <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
          </ul>
        </div>
      )}
      {isAccountMenuOpen && (
        <div className="md:hidden">
          <ul className="bg-gray-800 mt-2 rounded-md shadow-lg z-10">
            <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
            <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
            <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
            {isUserLoggedIn && (
              <li>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                  onClick={() => setIsLogoutPopupOpen(true)}
                >
                  <CiLogout className="mr-2"/> Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsLogoutPopupOpen(false)}
              >
                Annuler
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;