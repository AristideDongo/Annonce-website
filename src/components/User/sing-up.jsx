import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { countries } from "../countries/countries";

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

// Composant principal d'inscription
const Singup = ({ profile, updateProfile }) => {
  // États pour gérer les données du formulaire et les erreurs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(""); // Nouveau champ
  const [birthDate, setBirthDate] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+225");
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
  const [showPassword, setShowPassword] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  // Fonction pour valider le formulaire
  const validateForm = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation des mots de passe
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    // Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formErrors.email = "L'email n'est pas valide.";
    }

    // Validation de la date de naissance
    if (!birthDate) {
      formErrors.birthDate = "La date de naissance est requise.";
    }

    // Validation de l'adresse
    if (!address) {
      formErrors.address = "L'adresse est requise.";
    }

    // Validation de l'acceptation des politiques
    if (!isPolicyAccepted) {
      formErrors.policy = "Vous devez accepter la politique du site.";
    }

    if (!areTermsAccepted) {
      formErrors.terms = "Vous devez accepter les termes et conditions.";
    }

    setErrors(formErrors);

    // Si aucune erreur, envoie des données au serveur
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("https://example.com/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email,
            password,
            phoneNumber: `${selectedCountryCode}${phoneNumber}`,
            birthDate,
            address,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        const result = await response.json();
        console.log("Inscription réussie", result);
        updateProfile({ name: username, email, phone: phoneNumber, countryCode: selectedCountryCode, birthDate, address });
        // Rediriger ou afficher un message de succès
      } catch (error) {
        console.error("Erreur d'inscription", error);
        // Afficher un message d'erreur à l'utilisateur
      }
    }
  };

  // Fonction pour gérer le changement de mot de passe et mettre à jour les exigences
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

  // Fonction pour gérer le changement du mot de passe de confirmation
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  // Fonction pour gérer le changement du nom d'utilisateur
  const handleUsernameChange = (e) => { // Nouveau gestionnaire
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  // Fonction pour gérer le changement de l'email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  // Fonction pour gérer le changement du numéro de téléphone
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Fonction pour gérer le changement du code de pays
  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  // Fonction pour gérer le changement de la date de naissance
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  // Fonction pour gérer le changement de l'adresse
  const handleAddressChange = (e) => { // Nouveau gestionnaire
    setAddress(e.target.value);
    if (errors.address) {
      setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
    }
  };

  // Fonction pour gérer l'acceptation de la politique de confidentialité
  const handlePolicyChange = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  };

  // Fonction pour gérer l'acceptation des termes et conditions
  const handleTermsChange = () => {
    setAreTermsAccepted(!areTermsAccepted);
  };

  // Fonction pour calculer la force du mot de passe
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return strength;
  };

  // Fonction pour basculer l'affichage du mot de passe
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen pt-16 font-custom flex items-center justify-center bg-gray-200">
        <div className="bg-white mt-5 mb-5 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">INSCRIPTION</h2>
          <form onSubmit={validateForm}>
            <div className="mb-4">
              <label className="block text-gray-700">Nom d'utilisateur</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={handleUsernameChange} // Nouveau gestionnaire
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date de naissance</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={birthDate}
                onChange={handleBirthDateChange}
                required
              />
              {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
            </div>
            <div className="mb-4 flex">
              <div className="w-1/4">
                <label className="block text-gray-700">Région</label>
                <select
                  value={selectedCountryCode}
                  onChange={handleCountryCodeChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-3/4 pl-4">
                <label className="block text-gray-700">Numéro de téléphone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Numéro de téléphone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Adresse</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre adresse"
                value={address}
                onChange={handleAddressChange}
                required
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {isPasswordFocused && (
              <PasswordRequirements requirements={passwordRequirements} />
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Confirmer le mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="policy"
                checked={isPolicyAccepted}
                onChange={handlePolicyChange}
                className="mr-2"
                required
              />
              <label htmlFor="policy" className="text-gray-700">
                J'accepte la <a href="../Confidentilite/Politique" className="text-blue-500">politique de confidentialité</a>
              </label>
            </div>
            {errors.policy && <p className="text-red-500 text-sm">{errors.policy}</p>}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={areTermsAccepted}
                onChange={handleTermsChange}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-gray-700">
                J'accepte les <a href="../Confidentilite/conditions" className="text-blue-500">termes et conditions</a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              S'inscrire
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Ou inscrivez-vous avec</p>
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
          </div>
          <div className="mt-4 text-center">
            <p>
              Vous avez déjà un compte ? <Link to="/User/sing-in" className="text-blue-500">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;
