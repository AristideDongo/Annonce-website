import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaBaby, FaCar, FaHome, FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { IoDuplicateOutline, IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdComputer, MdOutlineOtherHouses } from 'react-icons/md';
import { TbRazorElectric } from 'react-icons/tb';
import { SlUser, SlUserFemale } from 'react-icons/sl';
import { CiLogout } from 'react-icons/ci';
import { AiOutlineDown, AiOutlineSearch } from 'react-icons/ai';
import { useOutsideClick } from './navbarhookperso'

const Navbar = ({ setSearchQuery }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Nouveau état pour le sidebar
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false); // État pour les catégories dans le sidebar mobile
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

   // Références pour les menus
   const categoriesRef = useOutsideClick(() => setIsCategoriesOpen(false));
   const accountMenuRef = useOutsideClick(() => setIsAccountMenuOpen(false));

   useEffect(() => {
    // Vérifiez l'état de connexion lors du chargement du composant
    const token = localStorage.getItem('authToken');
    setIsUserLoggedIn(!!token);
  }, []);

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
    localStorage.removeItem('authToken'); // Supprimer le token de localStorage
    setIsUserLoggedIn(false);
    setIsLogoutPopupOpen(false);
  };

  const handlePostAd = () => {
    if (isUserLoggedIn) {
      navigate("Annonce/annonce");
    } else {
      setIsInfoPopupOpen(true);
    }
  };

  const handleCloseInfoPopup = () => {
    setIsInfoPopupOpen(false);
  };

  const handleLoginRedirect = () => {
    handleCloseInfoPopup();
    navigate("User/sing-in");
  };

  // Fonction pour ouvrir et fermer le sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fonction pour ouvrir et fermer les catégories dans le sidebar mobile
  const handleToggleMobileCategories = () => {
    setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
  };

  return (
    <>
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
              <FaHome className="mr-2" /> Accueil
            </Link>
            <div className="relative" ref={categoriesRef}>
              <button 
                className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
                onClick={handleToggleCategories}
              >
                <BiCategory className="mr-2" /> Catégories <AiOutlineDown className="ml-1" />
              </button>
              {isCategoriesOpen && (
                <ul className="absolute bg-white mt-2 rounded-md shadow-lg z-10">
                  <li><Link to="Category/immobilier" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoIosHome className="mr-2" /> IMMOBILIER</Link></li>
                  <li><Link to="Category/vehicule" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaCar className="mr-2" /> VEHICULE</Link></li>
                  <li><Link to="Category/electromenager" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><TbRazorElectric className="mr-2" /> ELECTROMENAGER</Link></li>
                  <li><Link to="Category/electronique" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdComputer className="mr-2" /> ELECTRONIQUE</Link></li>
                  <li><Link to="Category/mode-home" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUser className="mr-2" /> MODE HOMME</Link></li>
                  <li><Link to="Category/mode-femme" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><SlUserFemale className="mr-2" /> MODE FEMME</Link></li>
                  <li><Link to="Category/mode-enfant" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaBaby className="mr-2" /> MODE ENFANT</Link></li>
                  <li><Link to="Category/autres" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><MdOutlineOtherHouses className="mr-2" /> AUTRES</Link></li>
                </ul>
              )}
            </div>
            <div className="relative" ref={accountMenuRef}>
              <button 
                className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
                onClick={handleToggleAccount}
              >
                <FaRegUserCircle className="mr-2" /> Mon Compte <AiOutlineDown className="ml-1" />
              </button>
              {isAccountMenuOpen && (
                <ul className="absolute bg-white mt-2 rounded-md shadow-lg z-10">
                  <li><Link to="User/profile" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><FaRegUser className="mr-2" /> Profile</Link></li>
                  <li><Link to="User/setting" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoSettingsOutline className="mr-2" /> Paramètres</Link></li>
                  <li><Link to="User/sing-in" className="block px-4 py-2 text-sm text-blue-500 hover:text-orange-500 flex items-center transition duration-300" onClick={handleCloseMenus}><IoLogInOutline className="mr-2" /> Connexion</Link></li>
                  {isUserLoggedIn && (
                    <li>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center transition duration-300"
                        onClick={() => setIsLogoutPopupOpen(true)}
                      >
                        <CiLogout className="mr-2" /> Déconnexion
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-neon-green hover:text-black flex items-center transition duration-300"
              onClick={handlePostAd}
            >
              <IoDuplicateOutline className="mr-2" /> Déposer une annonce
            </button>
          </div>
          {/* Icône pour ouvrir la sidebar sur mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-white" onClick={handleToggleSidebar}>
              <FaRegUserCircle className="text-2xl"/>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar pour mobile */}
      <div className={`fixed inset-0 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-gray-800 bg-opacity-75 w-full h-full" onClick={handleToggleSidebar}></div>
        <div className="absolute left-0 top-0 h-full w-64 bg-gray-100 shadow-lg p-4">
          <button onClick={handleToggleSidebar} className="text-black">
            <AiOutlineDown className="text-2xl" />
          </button>
          <div className="mt-4">
            {/* Éléments du menu dans le sidebar */}
            <ul>
              <li><Link to="/" className="block text-black hover:text-orange-500 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-300" onClick={handleToggleSidebar}><FaHome className="mr-2"/> Accueil</Link></li>
              {/* Catégories pour le sidebar mobile */}
              <li>
                <button 
                  className="block w-full text-left text-black hover:text-orange-500 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
                  onClick={handleToggleMobileCategories}
                >
                  <BiCategory className="mr-2" /> Catégories <AiOutlineDown className={`ml-1 transform ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileCategoriesOpen && (
                  <ul className="ml-4 mt-2">
                    <li><Link to="Category/immobilier" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><IoIosHome className="mr-2" /> IMMOBILIER</Link></li>
                    <li><Link to="Category/vehicule" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><FaCar className="mr-2" /> VEHICULE</Link></li>
                    <li><Link to="Category/electromenager" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><TbRazorElectric className="mr-2" /> ELECTROMENAGER</Link></li>
                    <li><Link to="Category/electronique" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><MdComputer className="mr-2" /> ELECTRONIQUE</Link></li>
                    <li><Link to="Category/mode-home" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><SlUser className="mr-2" /> MODE HOMME</Link></li>
                    <li><Link to="Category/mode-femme" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><SlUserFemale className="mr-2" /> MODE FEMME</Link></li>
                    <li><Link to="Category/mode-enfant" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><FaBaby className="mr-2" /> MODE ENFANT</Link></li>
                    <li><Link to="Category/autres" className="block text-black hover:text-orange-500 px-4 py-2 text-sm flex items-center transition duration-300" onClick={handleToggleSidebar}><MdOutlineOtherHouses className="mr-2" /> AUTRES</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="User/profile" className="block text-black hover:text-orange-500 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-300" onClick={handleToggleSidebar}><FaRegUser className="mr-2"/> Profile</Link></li>
              <li><Link to="User/setting" className="block text-black hover:text-orange-500 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-300" onClick={handleToggleSidebar}><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
              <li><Link to="User/sing-in" className="block text-black hover:text-orange-500 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-300" onClick={handleToggleSidebar}><IoLogInOutline className="mr-2"/> Connexion</Link></li>
              {isUserLoggedIn && (
                <li>
                  <button 
                    className="block w-full text-left text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center transition duration-300"
                    onClick={() => {
                      handleLogout();
                      handleToggleSidebar();
                    }}
                  >
                    <CiLogout className="mr-2"/> Déconnexion
                  </button>
                </li>
              )}
              <button 
                className="block w-full text-left text-white px-3 py-2 rounded-md bg-orange-600 text-sm font-medium hover:bg-orange-700 flex items-center transition duration-300 mt-4"
                onClick={() => {
                  handlePostAd();
                  handleToggleSidebar();
                }}
              >
                <IoDuplicateOutline className="mr-2"/> Déposer une annonce
              </button>
            </ul>
          </div>
        </div>
      </div>

      {/* Popup de déconnexion */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Êtes-vous sûr de vouloir vous déconnecter ?</h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleLogout}
              >
                Oui
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setIsLogoutPopupOpen(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'information */}
      {isInfoPopupOpen && (
  <div className="fixed bg-gray-800 bg-opacity-75 inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Vous devez être connecté pour déposer une annonce.
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleLoginRedirect}
        >
          Se connecter
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          onClick={handleCloseInfoPopup}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
