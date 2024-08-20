import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importer les icônes pour afficher/masquer le mot de passe
import { Link } from "react-router-dom";
import { useState } from "react"; // Importer useState pour gérer l'état

const Singin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour gérer la visibilité du mot de passe

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire
    // Ajoutez ici la logique de soumission du formulaire
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">CONNEXION</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type={passwordVisible ? "text" : "password"} // Changer le type en fonction de la visibilité
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre mot de passe"
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
          <button className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200">
              <ImFacebook2 size={24} />
            </button>
            <button className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-200">
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
      </div>
    </>
  );
};

export default Singin;