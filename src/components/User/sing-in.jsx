import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 

const Singin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false); // État pour gérer la visibilité du popup de succès
  const [errorPopupVisible, setErrorPopupVisible] = useState(false); // État pour gérer la visibilité du popup d'erreur
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Logique de validation du formulaire ici...
    const isSuccess = Math.random() > 0.5; // Simuler un succès ou un échec (remplacez ceci par votre logique réelle)

    if (isSuccess) {
      setPopupVisible(true); 
      setTimeout(() => {
        setPopupVisible(false); 
        navigate("/"); 
      }, 2000); 
    } else {
      setErrorPopupVisible(true); 
      setTimeout(() => {
        setErrorPopupVisible(false); 
      }, 2000); 
    }
  };

  return (
    <>
      <div className="min-h-screen font-custom flex items-center justify-center bg-[#F4F6F9]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl font-bold mb-6 text-center">CONNEXION</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pt-6 px-3 flex items-center justify-center"
              >
                {passwordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              CONNEXION
            </button>
          </form>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-400 hover:text-blue-700 transition duration-200">
              <ImFacebook2 size={24} />
            </button>
            <button className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-green-400 transition duration-200">
              <FcGoogle size={24} />
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to="/src/components/User/mdpoublie.jsx" className="text-blue-500 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/src/components/User/sing-up.jsx" className="text-blue-500 hover:underline">
              Inscription
            </Link>
          </div>
        </div>

        {/* Popup de succès */}
        {popupVisible && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-center text-green-500">Connexion réussie!</h3>
            </div>
          </div>
        )}

        {/* Popup d'erreur */}
        {errorPopupVisible && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-center text-red-500">Connexion échouée!</h3>
              <p className="text-lg font-bold text-center text-red-500">Verifiez votre email ou votre mot de passe puis ressayer</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Singin;