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

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleToggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsAccountMenuOpen(false);
  };

  const handleToggleAccount = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
    setIsCategoriesOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">SITE ANNNONCE</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
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
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><IoIosHome className="mr-2"/> IMMOBILIER</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><FaCar className="mr-2"/> VEHICULE</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><TbRazorElectric className="mr-2"/> ELECTROMENAGER</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><MdComputer className="mr-2"/> ELECTRONIQUE</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><SlUser className="mr-2"/> MODE HOMME</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><SlUserFemale className="mr-2"/> MODE FEMME</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><FaBaby className="mr-2"/> MODE ENFANT</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><MdOutlineOtherHouses className="mr-2"/> AUTRES</Link></li>
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
                <li><Link to="/src/components/User/profile.jsx" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><FaRegUser className="mr-2"/> Profile</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><IoSettingsOutline className="mr-2"/> Paramètres</Link></li>
                <li><Link to="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"><IoLogInOutline className="mr-2"/> Connexion</Link></li>
              </ul>
            )}
          </div>
          <Link to="#" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
            <IoDuplicateOutline className="mr-2"/> Déposer une annonce
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;