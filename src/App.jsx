import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Rout from './components/rout';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Rout />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
