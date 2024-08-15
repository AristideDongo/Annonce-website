import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";

const Singin = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">CONNEXION</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre mot de passe"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              CONNEXION
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              <ImFacebook2 />
            </button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              <FcGoogle />
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