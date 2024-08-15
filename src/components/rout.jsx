import { Route, Routes } from "react-router-dom";
import Home from "./Home/home";
import Profile from "./User/profile";
import Setting from "./User/setting";
 import Singin from "./User/sing-in";
import Singup from "./User/sing-up";
import Mdpoublie from "./User/mdpoublie";

const Rout = () =>{
 return(
  <>
  <Routes>
  <Route path="/" element={<Home />}/> 
  <Route path="/src/components/User/profile.jsx" element={<Profile/>}/>
  <Route path="/src/components/User/setting.jsx" element={<Setting/>}/>
  <Route path="/src/components/User/sing-in.jsx" element={<Singin/>}/>
  <Route path="/src/components/User/sing-up.jsx" element={<Singup/>}/>
  <Route path="/src/components/User/mdpoublie.jsx" element={<Mdpoublie/>} />
  </Routes>
  </>
 )
}

export default Rout