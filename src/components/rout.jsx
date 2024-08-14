import { Route, Routes } from "react-router-dom";
import Home from "./Home/home";
import Profile from "./User/profile";

const Rout = () =>{
 return(
  <>
  <Routes>
  <Route path="/" element={<Home />}/> 
  <Route path="/src/components/User/profile.jsx" element={<Profile/>}/>
  </Routes>
  </>
 )
}

export default Rout