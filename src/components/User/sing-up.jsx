import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { countries } from "../countries/countries";

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

const Singup = ({ profile, updateProfile }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");
      setPhoneNumber(profile.phone || "");
      setSelectedCountryCode(profile.countryCode || "+225");
    }
  }, [profile]);

  const validateForm = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formErrors.email = "L'email n'est pas valide.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("https://example.com/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            phoneNumber: `${selectedCountryCode}${phoneNumber}`,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        const result = await response.json();
        console.log("Inscription réussie", result);
        updateProfile({ email, phone: phoneNumber, countryCode: selectedCountryCode });
        // Rediriger ou afficher un message de succès
      } catch (error) {
        console.error("Erreur d'inscription", error);
        // Afficher un message d'erreur à l'utilisateur
      }
    }
  };

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return strength;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen pt-16 font-custom flex items-center justify-center bg-gray-200 ">
        <div className="bg-white mt-5 mb-5 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">INSCRIPTION</h2>
          <form onSubmit={validateForm}>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre nom"
                defaultValue={""}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Votre email"
                 defaultValue={""}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
              <div className="w-3/4 ml-4">
                <label className="block text-gray-700">Numéro</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Votre numéro"
                  defaultValue={""}
                  onChange={handlePhoneNumberChange}
                  pattern="\d*"
                  title="Le numéro doit contenir uniquement des chiffres."
                  required
                />
              </div>
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
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-2.5"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {isPasswordFocused && <PasswordRequirements requirements={passwordRequirements} />}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              S'inscrire
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Ou inscrivez-vous avec</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
                <FcGoogle size={24} />
              </button>
              <button className="p-2 rounded-full border border-gray-300 text-blue-600 hover:bg-gray-100">
                <ImFacebook2 size={24} />
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ? <Link to="/User/sing-in" className="text-blue-500 hover:underline">Connectez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;
