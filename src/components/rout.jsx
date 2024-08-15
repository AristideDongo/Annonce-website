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

const Rout = () => {
 return(
  <>
  <Routes>
  <Route path="/" element={<Home />}/> 
  <Route path="/src/components/User/profile.jsx" element={<Profile/>}/>
  <Route path="/src/components/User/setting.jsx" element={<Setting/>}/>
  <Route path="/src/components/User/sing-in.jsx" element={<Singin/>}/>
  <Route path="/src/components/User/sing-up.jsx" element={<Singup/>}/>
  <Route path="/src/components/User/mdpoublie.jsx" element={<Mdpoublie/>}/>
  <Route path="/src/components/Annonce/annonce.jsx" element={<Annonce/>} />
  <Route path="/src/components/Confidentilite/conditions.jsx" element= {<Conditions/>}/>
  <Route path="/src/components/Confidentilite/Politique.jsx" element={ <Politique/>}/>
  <Route path="/src/components/Confidentilite/faq.jsx" element={<Faq/>}/> 
  <Route path="/src/components/Confidentilite/about.jsx" element={<About/>} />
  </Routes>
  </>
 )
}

export default Rout