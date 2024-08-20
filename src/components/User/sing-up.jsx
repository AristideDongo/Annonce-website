import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importer les icônes pour afficher/masquer le mot de passe
import { Link } from "react-router-dom";
import { useState } from "react";

// Composant pour afficher les exigences du mot de passe
const PasswordRequirements = ({ requirements }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <input type="checkbox" checked={requirements.length} readOnly />
        <label className="ml-2">Au moins 8 caractères</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" checked={requirements.uppercase} readOnly />
        <label className="ml-2">Une majuscule</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" checked={requirements.lowercase} readOnly />
        <label className="ml-2">Une minuscule</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" checked={requirements.number} readOnly />
        <label className="ml-2">Un chiffre</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" checked={requirements.specialChar} readOnly />
        <label className="ml-2">Un caractère spécial</label>
      </div>
    </div>
  );
};

// Composant principal pour le formulaire d'inscription
const Singup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false); // État pour gérer l'affichage du mot de passe

  // Fonction pour valider le formulaire
  const validateForm = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    // Vérification de la validité de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formErrors.email = "L'email n'est pas valide.";
    }

    setErrors(formErrors);

    // Soumission du formulaire si aucune erreur
    if (Object.keys(formErrors).length === 0) {
      console.log("formulare soumis");
    }
  };

  // Gestion du changement de mot de passe
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
    setPasswordRequirements({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[@$!%*?&#]/.test(newPassword),
    });
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  // Gestion du changement de confirmation de mot de passe
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  // Gestion du changement d'email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return strength;
  };

  // Fonction pour gérer l'affichage du mot de passe
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">INSCRIPTION</h2>
          <form onSubmit={validateForm}>
            <div className="mb-4">
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Numéro</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre numéro"
                pattern="\d*"
                title="Le numéro doit contenir uniquement des chiffres."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Changement du type d'input pour afficher/masquer le mot de passe
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre."
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button type="button" onClick={toggleShowPassword} className="focus:outline-none">
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              {isPasswordFocused && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        passwordStrength <= 2 ? 'bg-red-500' : passwordStrength <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <PasswordRequirements requirements={passwordRequirements} />
                </>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirmation du mot de passe</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              INSCRIPTION
            </button>
          </form>
          <div className="mt-6 flex justify-center items-center space-x-4">
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
            <Link to="/src/components/User/sing-in.jsx" className="text-blue-500 hover:underline">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;