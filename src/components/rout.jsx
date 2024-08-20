import { Route, Routes } from "react-router-dom";
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
import { useState } from "react";

const Rout = () => {
 const [annonces, setAnnonces] = useState([]);
 return(
  <>
  <Routes>
  <Route path="/" element={<Home  annonces={annonces}/>}/> 
  <Route path="/src/components/User/profile.jsx" element={<Profile annonces={annonces}/>}/>
  <Route path="/src/components/User/setting.jsx" element={<Setting/>}/>
  <Route path="/src/components/User/sing-in.jsx" element={<Singin/>}/>
  <Route path="/src/components/User/sing-up.jsx" element={<Singup/>}/>
  <Route path="/src/components/User/mdpoublie.jsx" element={<Mdpoublie/>}/>
  <Route path="/src/components/Annonce/annonce.jsx" element={<Annonce setAnnonces={setAnnonces} annonces={annonces}/>} />
  <Route path="/src/components/Confidentilite/conditions.jsx" element= {<Conditions/>}/>
  <Route path="/src/components/Confidentilite/Politique.jsx" element={ <Politique/>}/>
  <Route path="/src/components/Confidentilite/faq.jsx" element={<Faq/>}/> 
  <Route path="/src/components/Confidentilite/about.jsx" element={<About/>} />
  <Route path="/src/components/Category/autres.jsx" element={<Autres annonces={annonces}/>} />
  <Route path="/src/components/Category/electromenager.jsx" element={<Electromenager annonces={annonces}/>} />
  <Route path="/src/components/Category/electronique.jsx" element={<Electronique annonces={annonces}/>} />
  <Route path="/src/components/Category/immobilier.jsx" element={<Immobilier annonces={annonces}/>} />
  <Route path="/src/components/Category/mode-enfant.jsx" element={<Menfant annonces={annonces}/>} />
  <Route path="/src/components/Category/mode-femme.jsx" element={<Mfemme annonces={annonces}/>}/>
  <Route path="/src/components/Category/mode-home.jsx" element={<Mhomme annonces={annonces}/>} />
  <Route path="/src/components/Category/vehicule.jsx" element={<Vehicule annonces={annonces}/>} />
  <Route path="/src/components/Detail/detail.jsx/" element={<Detail annonces={annonces}/>}/>
  </Routes>
  </>
 )
}

export default Rout