// Rout.jsx
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
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
  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/User/profile.jsx" element={<Profile annonces={annonces} deleteAnnonce={deleteAnnonce} updateAnnonce={updateAnnonce} profile={profile} updateProfile={updateProfile}/>} />
        <Route path="/src/components/User/setting.jsx" element={<Setting />} />
        <Route path="/src/components/User/sing-in.jsx" element={<Singin />} />
        <Route path="/src/components/User/sing-up.jsx" element={<Singup />} />
        <Route path="/src/components/User/mdpoublie.jsx" element={<Mdpoublie />} />
        <Route path="/src/components/Annonce/annonce.jsx" element={<Annonce setAnnonces={setAnnonces} annonces={annonces} profile={profile} />} />
        <Route path="/src/components/Confidentilite/conditions.jsx" element={<Conditions />} />
        <Route path="/src/components/Confidentilite/Politique.jsx" element={<Politique />} />
        <Route path="/src/components/Confidentilite/faq.jsx" element={<Faq />} />
        <Route path="/src/components/Confidentilite/about.jsx" element={<About />} />
        <Route path="/src/components/Category/autres.jsx" element={<Autres annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/electromenager.jsx" element={<Electromenager annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/electronique.jsx" element={<Electronique annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/immobilier.jsx" element={<Immobilier annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/mode-enfant.jsx" element={<Menfant annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/mode-femme.jsx" element={<Mfemme annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/mode-home.jsx" element={<Mhomme annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Category/vehicule.jsx" element={<Vehicule annonces={annonces} searchQuery={searchQuery} />} />
        <Route path="/src/components/Detail/detail.jsx" element={<Detail annonces={annonces} profile={profile}/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default Rout;
