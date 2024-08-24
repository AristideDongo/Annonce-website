// Rout.jsx
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home/home";
import Profile from "./User/profile";
import Setting from "./User/setting";
import Singin from "./User/sing-in";
import Singup from "./User/sing-up";
import Mdpoublie from "./User/mdpoublie";
import Annonce from "./Annonce/annonce";
import Conditions from "./Confidentilite/conditions";
import Politique from "./Confidentilite/Politique";
import Faq from "./Confidentilite/faq";
import About from "./Confidentilite/about";
import Autres from "./Category/autres";
import Electromenager from "./Category/electromenager";
import Electronique from "./Category/electronique";
import Immobilier from "./Category/immobilier";
import Menfant from "./Category/mode-enfant";
import Mfemme from "./Category/mode-femme";
import Mhomme from "./Category/mode-home";
import Vehicule from "./Category/vehicule";
import Detail from "./Detail/detail";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/Footer";

const Rout = () => {
  const Navigate = useNavigate()
  const [annonces, setAnnonces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const updateAnnonce = (updatedAnnonce) => {
    setAnnonces(prevAnnonces => 
      prevAnnonces.map(annonce =>
        annonce.id === updatedAnnonce.id ? updatedAnnonce : annonce
      )
    );
  };

  const deleteAnnonce = (id) => {
    console.log("Suppression d'annonce ID:", id);
    setAnnonces(prevAnnonces => {
      const newAnnonces = prevAnnonces.filter(annonce => annonce.id !== id);
      console.log("Annonces après suppression:", newAnnonces);
      return newAnnonces;
    });
  };
  
  const [profile, setProfile] = useState({
    photoURL: 'https://via.placeholder.com/150',
    name: 'Nom d\'utilisateur',
    phone: '0000000000',
  });

  const updateProfile = (newProfile) => {
    setProfile(prevProfile => ({ ...prevProfile, ...newProfile }));
  };

  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="User/profile" element={<Profile annonces={annonces} deleteAnnonce={deleteAnnonce} updateAnnonce={updateAnnonce} profile={profile} updateProfile={updateProfile}/>} />
        <Route path="User/setting" element={<Setting />} />
        <Route path="User/sing-in" element={<Singin />} />
        <Route path="User/sing-up" element={<Singup />} />
        <Route path="User/mdpoublie" element={<Mdpoublie />} />
        <Route path="Annonce/annonce" element={ <Annonce setAnnonces={setAnnonces} annonces={annonces} profile={profile} />} />
        <Route path="Confidentilite/conditions" element={<Conditions />} />
        <Route path="Confidentilite/Politique" element={<Politique />} />
        <Route path="Confidentilite/faq" element={<Faq />} />
        <Route path="Confidentilite/about" element={<About />} />
        <Route path="Category/autres" element={<Autres annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/electromenager" element={<Electromenager annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/electronique" element={<Electronique annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/immobilier" element={<Immobilier annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/mode-enfant" element={<Menfant annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/mode-femme" element={<Mfemme annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/mode-home" element={<Mhomme annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Category/vehicule" element={<Vehicule annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="Detail/detail" element={<Detail annonces={annonces} profile={profile}/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default Rout;
