import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Rout from './components/rout';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Rout />
    </BrowserRouter>
    </>
  );
}

export default App;
