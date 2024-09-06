import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 

const Singin = ({ updateProfile }) => {
   // États pour gérer la visibilité du mot de passe, les popups et les champs de formulaire
   const [passwordVisible, setPasswordVisible] = useState(false);
   const [popupVisible, setPopupVisible] = useState(false);
   const [errorPopupVisible, setErrorPopupVisible] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const navigate = useNavigate(); // Hook pour la navigation programmatique
 
   // Fonction pour basculer la visibilité du mot de passe
   const togglePasswordVisibility = () => {
     setPasswordVisible(!passwordVisible);
   };
 
   // Fonction pour gérer la soumission du formulaire
   const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
  
    // Validation simple pour s'assurer que les champs ne sont pas vides
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setErrorPopupVisible(true);
      setTimeout(() => setErrorPopupVisible(false), 2000); // Masque le popup après 2 secondes
      return;
    }
  
    try {
      // Envoi de la requête de connexion au serveur
      const response = await fetch('http://localhost:3000/api/auth/login', { // Remplacez '/api/auth/login' par votre URL d'API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // Analyse la réponse JSON
  
      if (response.ok) { // Si la réponse est OK, c'est-à-dire que la connexion a réussi
        // Stocker le token et les informations de l'utilisateur dans le localStorage
        localStorage.setItem('authToken', data.token); // Utilisation de 'authToken' pour stocker le token
        localStorage.setItem('user', JSON.stringify(data.user)); // Supposons que l'API renvoie un objet utilisateur
  
        // Mise à jour du profil utilisateur via la fonction passée en props
        updateProfile(data.user);
  
        // Afficher le popup de succès et rediriger vers la page d'accueil
        setPopupVisible(true); 
        setTimeout(() => {
          setPopupVisible(false); 
          navigate("/"); 
        }, 2000); 
      } else {
        // Afficher un message d'erreur si la réponse n'est pas OK
        setErrorMessage(data.message || "Connexion échouée.");
        setErrorPopupVisible(true);
        setTimeout(() => setErrorPopupVisible(false), 2000);
      }
    } catch (error) {
      // Gérer les erreurs de la requête
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      setErrorPopupVisible(true);
      setTimeout(() => setErrorPopupVisible(false), 2000);
    }
  };
  

  return (
    <>
      <div className="min-h-screen font-custom flex items-center justify-center bg-gray-200 ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl font-bold mb-6 text-center">CONNEXION</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="mt-4 text-center">
              <p className="text-gray-600">Ou connectez vous avec</p>
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring"
                >
                  <FcGoogle className="mr-2" size={20} />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring ml-2"
                >
                  <ImFacebook2 className="mr-2 text-blue-600 " size={20} />
                  Facebook
                </button>
              </div>
          <div className="mt-6 text-center">
            <Link to="/User/mdpoublie" className="text-blue-500 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/User/sing-up" className="text-blue-500 hover:underline">
              Inscription
            </Link>
          </div>              
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
              <h3 className="text-lg font-bold text-center text-red-500">Erreur!</h3>
              <p className="text-lg font-bold text-center text-red-500">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Singin;
