import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rout from './components/rout';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <>
    <BrowserRouter>
      <Rout />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
