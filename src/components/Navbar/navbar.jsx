import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaBaby, FaCar, FaHome, FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { IoIosHome, IoMdAlert } from 'react-icons/io';
import { IoDuplicateOutline, IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdComputer, MdOutlineOtherHouses } from 'react-icons/md';
import { TbRazorElectric } from "react-icons/tb";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { CiLogout } from 'react-icons/ci';
import { AiOutlineDown, AiOutlineSearch } from 'react-icons/ai';

const Navbar = ({ setSearchQuery }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleToggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsAccountMenuOpen(false);
  };

  const handleToggleAccount = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
    setIsCategoriesOpen(false);
  };

  const handleCloseMenus = () => {
    setIsCategoriesOpen(false);
    setIsAccountMenuOpen(false);
  };

  const handleLogout = () => {
    console.log("Déconnecté");
    setIsUserLoggedIn(false);
    setIsLogoutPopupOpen(false);
  };

  const handlePostAd = () => {
    if (isUserLoggedIn) {
      navigate("/src/components/Annonce/annonce.jsx");
    } else {
      setIsInfoPopupOpen(true);
    }
  };

  const handleCloseInfoPopup = () => {
    setIsInfoPopupOpen(false);
  };

  const handleLoginRedirect = () => {
    handleCloseInfoPopup();
    navigate("/src/components/User/sing-in.jsx");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black p-4 font-custom z-30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-wide">
          <Link to="/" className="hover:text-neon-green transition-colors duration-300">Annonces<span className="text-orange-600">360°</span></Link>
        </div>
        <div className="relative">
           <input
             type="text"
             placeholder="Rechercher..."
             value={query}
             onChange={handleChange}
             className="p-1 pl-8 rounded-lg border border-gray-300 bg-transparent text-white"
           />
              <AiOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white" />
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300">
            <FaHome className="mr-2"/> Accueil
          </Link>
          <div className="relative">
            <button 
              className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
              onClick={handleToggleCategories}
            >
              <BiCategory className="mr-2"/> Catégories <AiOutlineDown className="ml-1" />
            </button>
            {isCategoriesOpen && (
              <ul className="absolute bg-white mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
                <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
                <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
                <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
                <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
                <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
                <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
                <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
              </ul>
            )}
          </div>
          <div className="relative">
            <button 
              className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
              onClick={handleToggleAccount}
            >
              <FaRegUserCircle className="mr-2"/> Mon Compte <AiOutlineDown className="ml-1" />
            </button>
            {isAccountMenuOpen && (
              <ul className="absolute bg-white mt-2 rounded-md shadow-lg z-10">
                <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
                <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
                <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
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
          <button 
            className="bg-neon-blue text-white px-3 py-2 rounded-md bg-blue-600 text-sm font-medium hover:bg-blue-700 flex items-center transition duration-300"
            onClick={handlePostAd}
          >
            <IoDuplicateOutline className="mr-2"/> Déposer une annonce
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white" onClick={handleToggleCategories}>
            <BiCategory className="text-2xl"/>
          </button>
          <button className="text-white ml-4" onClick={handleToggleAccount}>
            <FaRegUserCircle className="text-2xl"/>
          </button>
        </div>
      </div>

      {isCategoriesOpen && (
        <div className="md:hidden mt-2">
          <ul className="bg-white p-4 rounded-md shadow-lg">
            <li><Link to="/src/components/Category/immobilier.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
            <li><Link to="/src/components/Category/vehicule.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaCar className="mr-2"/> VEHICULE</Link></li>
            <li><Link to="/src/components/Category/electromenager.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
            <li><Link to="/src/components/Category/electronique.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
            <li><Link to="/src/components/Category/mode-home.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUser className="mr-2"/> MODE HOMME</Link></li>
            <li><Link to="/src/components/Category/mode-femme.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
            <li><Link to="/src/components/Category/mode-enfant.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
            <li><Link to="/src/components/Category/autres.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
          </ul>
        </div>
      )}

      {isAccountMenuOpen && (
        <div className="md:hidden mt-2">
          <ul className="bg-white p-4 rounded-md shadow-lg">
            <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaRegUser className="mr-2"/> Profile</Link></li>
            <li><Link to="/src/components/User/setting.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
            <li><Link to="/src/components/User/sing-in.jsx" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
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

      {isInfoPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <div className="flex justify-center mb-4">
              <IoMdAlert className="text-red-500 text-4xl" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Vous devez vous connecter pour déposer une annonce.</h3>
            <div className="flex flex-col space-y-4">
              <button 
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handleLoginRedirect}
              >
                Se connecter
              </button>
              <button 
                className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
                onClick={handleCloseInfoPopup}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
