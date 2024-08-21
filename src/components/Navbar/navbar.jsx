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

const Navbar = ({ setSearchQuery }) => {
  // États pour gérer l'ouverture des menus et popup
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

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
    <nav className="bg-[#2C3E50] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-wide">
          <Link to="/" className="hover:text-neon-green transition-colors duration-300">Annonces<span className="text-orange-600">360°</span></Link>
        </div>
        <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={handleChange}
         className="p-1 rounded-lg border border-gray-300 bg-transparent text-white"

      />
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white hover:bg-[#2980B9] px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300">
            <FaHome className="mr-2"/> Accueil
          </Link>
          <div className="relative">
            <button 
              className="text-gray-300 hover:text-white hover:bg-[#2980B9] px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
              onClick={handleToggleCategories}
            >
              <BiCategory className="mr-2"/> Catégories
            </button>
            {isCategoriesOpen && (
              <ul className="absolute bg-[#2980B9] mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
                <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
                <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
                <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
                <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
                <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
                <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
                <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
              </ul>
            )}
          </div>
          <div className="relative">
            <button 
              className="text-gray-300 hover:text-white hover:bg-[#2980B9] px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
              onClick={handleToggleAccount}
            >
              <FaRegUserCircle className="mr-2"/> Mon Compte
            </button>
            {isAccountMenuOpen && (
              <ul className="absolute bg-[#2980B9] mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
                <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
                <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
                {isUserLoggedIn && (
                  <li>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300"
                      onClick={() => setIsLogoutPopupOpen(true)}
                    >
                      <CiLogout className="mr-2"/> Déconnexion
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
          <Link to="/src/components/Annonce/annonce.jsx" className="bg-neon-blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#FF6F61] flex items-center transition duration-300">
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

      {isCategoriesOpen && (
        <div className="md:hidden mt-2">
          <ul className="bg-gray-900 p-4 rounded-md shadow-lg">
            <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
            <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
            <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
            <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
            <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
            <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
            <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
            <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
          </ul>
        </div>
      )}

      {isAccountMenuOpen && (
        <div className="md:hidden mt-2">
          <ul className="bg-gray-900 p-4 rounded-md shadow-lg">
            <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
            <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
            <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
            {isUserLoggedIn && (
              <li>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300"
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-20">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Êtes-vous sûr de vouloir vous déconnecter?</h3>
            <div className="flex space-x-4">
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                onClick={handleLogout}
              >
                Oui
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
                onClick={() => setIsLogoutPopupOpen(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;