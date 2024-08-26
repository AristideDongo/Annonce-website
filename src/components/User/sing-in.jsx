import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 

const Singin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Validation simple
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setErrorPopupVisible(true);
      setTimeout(() => setErrorPopupVisible(false), 2000);
      return;
    }

    try {
      const response = await fetch('/api/login', { // Remplacez '/api/login' par votre URL d'API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token dans le localStorage
        setPopupVisible(true); 
        setTimeout(() => {
          setPopupVisible(false); 
          navigate("/"); 
        }, 2000); 
      } else {
        setErrorMessage(data.message || "Connexion échouée.");
        setErrorPopupVisible(true);
        setTimeout(() => setErrorPopupVisible(false), 2000);
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      setErrorPopupVisible(true);
      setTimeout(() => setErrorPopupVisible(false), 2000);
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
                  <ImFacebook2 className="mr-2" size={20} />
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
