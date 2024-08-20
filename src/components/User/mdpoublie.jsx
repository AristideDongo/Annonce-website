import { Link } from "react-router-dom"

const Mdpoublie = ()  => {
 return(
  <> 
     <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Mot de passe oublié</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Réinitialiser le mot de passe
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/src/components/User/sing-in.jsx" className="text-blue-500 hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
  </>
 )
}

export default Mdpoublie