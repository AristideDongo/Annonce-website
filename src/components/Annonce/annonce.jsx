import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { locationOptions } from '../locations/locations'
import { countries } from '../countries/countries';

const Annonce = ({ setAnnonces, annonces, profile }) => {
 // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photos: ['', '', '', '', '', ''],
    category: '',
    price: '',
    phone: '',
    whatsapp: '',
    location: ''
  });

  // Code du pays pour Côte d'Ivoire
  const countryCode = countries.find(country => country.name === "Côte d'Ivoire").code;

  // État pour gérer les erreurs de validation du formulaire
  const [errors, setErrors] = useState({});
  
  // État pour les prévisualisations des photos
  const [photoPreviews, setPhotoPreviews] = useState(['', '', '', '', '']);

  // État pour afficher ou non le popup de succès
  const [showPopup, setShowPopup] = useState(false);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // Fonction pour gérer les changements dans les champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };
  
  // Fonction pour gérer les changements dans les champs de photos
  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    const newPhotos = [...formData.photos];
    newPhotos[index] = file;
    setFormData({
      ...formData,
      photos: newPhotos
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...photoPreviews];
      newPreviews[index] = reader.result;
      setPhotoPreviews(newPreviews);
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    setErrors({
      ...errors,
      photos: ''
    });
  };

  // Fonction pour gérer les changements dans les sélecteurs
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  // Fonction pour gérer les changements dans le sélecteur de localisation
  const handleLocationChange = (selectedOption) => {
    setFormData({
      ...formData,
      location: selectedOption
    });
    setErrors({
      ...errors,
      location: ''
    });
  };

  // Fonction pour valider les données du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 100 ) {
      newErrors.title = 'Le titre ne doit pas dépasser 100 caractères';
    }

    if (!formData.description) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length > 700) {
      newErrors.description = 'La description ne doit pas dépasser 700 caractères';
    }

    const filledPhotos = formData.photos.filter(photo => photo !== '');
    if (filledPhotos.length < 3) {
      newErrors.photos = 'Trois photos sont requises';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!formData.price) {
      newErrors.price = 'Le prix est requis';
    } else if (isNaN(formData.price)) {
      newErrors.price = 'Le prix doit être un nombre';
    }

    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Le numéro de téléphone doit comporter 10 chiffres';
    }

    if (!formData.location || !locationOptions.some(option => option.value === formData.location.value)) {
      newErrors.location = 'La localisation sélectionnée n\'est pas valide';
    }    

    return newErrors;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Valider le formulaire
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  // Créer un objet FormData pour l'envoi des données
  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('category', formData.category);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('whatsapp', formData.whatsapp);
  formDataToSend.append('location[value]', formData.location.value); // Envoyer la valeur de la localisation
  formDataToSend.append('location[label]', formData.location.label); // Envoyer le label de la localisation

  // Ajouter les photos au FormData
  formData.photos.forEach((photo, index) => {
    if (photo) {
      formDataToSend.append(`photos`, photo); // Utiliser le fichier réel
    }
  });

  // Ajouter le timestamp en millisecondes au FormData
  formDataToSend.append('timestamp', Date.now()); // Ajouter le timestamp en millisecondes


  try {
    const token = localStorage.getItem('token');

    // Effectuer la requête avec FormData
    const response = await fetch('http://localhost:3000/api/annonces/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend // Envoyer les données sous forme de FormData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la soumission de l\'annonce');
    }

    const updatedAnnonces = await response.json();
    setAnnonces(updatedAnnonces);

    // Afficher le popup de succès
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 2000);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'annonce:', error);
  }
};

  return (
    <>  
      <div className="min-h-screen pt-16 font-custom flex items-center justify-center bg-gray-200">
        <div className="bg-white mt-5 mb-5 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Redigez votre annonce</h2>
          <div className="flex items-center p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto mt-8">
            <img
              src={profile.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md object-cover"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {profile.name}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mt-5 text-gray-700 text-lg font-medium">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                placeholder="Titre de l'annonce"
                maxLength="100"
              />
              <p className="text-gray-500 text-sm">{formData.title.length}/100</p>
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                placeholder="Description de l'annonce"
                maxLength="700"
              />
              <p className="text-gray-500 text-sm">{formData.description.length}/700</p>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            {/* Bloc de Photos sous forme de grille */}
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-custom">Photos<span className='text-base' >(minimum trois (3) photos)</span> </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <label className="flex items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                      {photoPreviews[index] ? (
                        <img
                          src={photoPreviews[index]}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                      <input
                        type="file"
                        name="photos"
                        onChange={(e) => handlePhotoChange(index, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                ))}
              </div>
              {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="immobilier">Immobilier</option>
                <option value="vehicule">Véhicules</option>
                <option value="electronique">Electronique</option>
                <option value="electromenager">Electroménager</option>
                <option value="mode-homme">Mode Homme</option>
                <option value="mode-femme">Mode Femme</option>
                <option value="mode-enfant">Mode Enfant</option>
                <option value="autres">Autres</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Prix</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                placeholder="Prix de l'annonce"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Numéro de téléphone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                placeholder="Numéro de téléphone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Numéro de WhatsApp (optionnel)</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <span className="bg-gray-200 px-3 py-2 text-gray-700">{countryCode}</span> {/* Affichage de l'indicatif du pays */}
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0"
                    placeholder="Numéro de WhatsApp"
                  />
                </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium">Localisation</label>
              <Select
                name="location"
                value={formData.location}
                onChange={handleLocationChange}
                options={locationOptions}
                placeholder="Sélectionnez une localisation"
                className="basic-single"
                classNamePrefix="select"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Soumettre l'annonce
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-indigo-500 hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Youpi!</h2>
            <p className="text-gray-700">Votre annonce a été soumise avec succès.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Annonce;