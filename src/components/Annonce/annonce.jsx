import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { locationOptions } from '../locations/locations'
const Annonce = ({ setAnnonces, annonces, profile }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photos: ['', '', '', '', '', ''],
    category: '',
    price: '',
    phone: '',
    location: null
  });

  const [errors, setErrors] = useState({});
  const [photoPreviews, setPhotoPreviews] = useState(['', '', '', '', '']);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

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

    if (!formData.location) {
      newErrors.location = 'La localisation est requise';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const newAnnonce = {
        ...formData,
        id: annonces.length + 1,
        photos: photoPreviews,
        location: formData.location,  // Ajout de la localisation ici
      };
      setAnnonces([...annonces, newAnnonce]);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 2000);
    }
  };
  

  return (
    <>  
      <div className="min-h-screen pt-16 font-custom flex items-center justify-center bg-[#F4F6F9]">
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
              <label className="block mt-5 text-gray-700 font-medium">Titre</label>
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
              <label className="block text-gray-700 font-medium">Description</label>
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
              <label className="block text-gray-700 font-medium">Photos</label>
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
              <label className="block text-gray-700 font-medium">Catégorie</label>
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
              <label className="block text-gray-700 font-medium">Prix</label>
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
              <label className="block text-gray-700 font-medium">Numéro de téléphone</label>
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
              <label className="block text-gray-700 font-medium">Localisation</label>
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
