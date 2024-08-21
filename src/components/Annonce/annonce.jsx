import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Annonce = ({ setAnnonces, annonces }) => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photos: ['', ''],
    category: '',
    price: ''
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = useState({});
  // État pour les aperçus des photos
  const [photoPreviews, setPhotoPreviews] = useState(['', '']); 
  // État pour gérer la visibilité du popup
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // Gestion du changement des champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur pour le champ modifié
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  // Gestion du changement des photos
  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    const newPhotos = [...formData.photos];
    newPhotos[index] = file;
    setFormData({
      ...formData,
      photos: newPhotos
    });

    // Lire le fichier et mettre à jour l'aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...photoPreviews];
      newPreviews[index] = reader.result;
      setPhotoPreviews(newPreviews);
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    // Effacer l'erreur pour les photos si une photo est modifiée
    setErrors({
      ...errors,
      photos: ''
    });
  };

  // Gestion du changement de la sélection de catégorie
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur pour le champ modifié
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 100 ) {
      newErrors.title = 'Le titre ne doit pas dépasser 100 caractères';
    }

    if (!formData.description) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'La description ne doit pas dépasser 2000 caractères';
    }

    if (!formData.photos[1]) {
      newErrors.photos = 'Deux photos requise';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!formData.price) {
      newErrors.price = 'Le prix est requis';
    } else if (isNaN(formData.price)) {
      newErrors.price = 'Le prix doit être un nombre';
    }

    return newErrors;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const newAnnonce = {
        ...formData,
        id: annonces.length + 1,
        photos: photoPreviews // Utilisez les aperçus des photos comme URLs
      };
      setAnnonces([...annonces, newAnnonce]);
      setShowPopup(true); // Afficher le popup
      setTimeout(() => {
        setShowPopup(false);
        if (formData.category === 'electromenager') {
          navigate('/');
          return;
        } else if (formData.category === 'immobilier') {
          navigate('/');
          return;
        } else if (formData.category === 'electronique') {
          navigate('/');
          return;
        } else if (formData.category === 'mode-enfant') {
          navigate('/');
          return;
        } else if (formData.category === 'mode-femme') {
          navigate('/');
          return;
        } else if (formData.category === 'mode-homme') { 
          navigate('/');
          return;
        } else if (formData.category === 'vehicule') {
           navigate('/');
        return;
      } else if (formData.category === 'autres') {
        navigate('/');
        return;
      }
      }, 2000); // Le popup disparaît après 2 secondes
    }
  };

  return (
    <>  
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9]">
        <div className="bg-white mt-5 mb-5 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Ajouter une annonce</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
                placeholder="Titre de l'annonce"
              />
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
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Photos</label>
              {formData.photos.map((photo, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="file"
                    onChange={(e) => handlePhotoChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-400 mb-2"
                  />
                  {photoPreviews[index] && (
                    <img
                      src={photoPreviews[index]}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover mt-2 rounded-lg"
                    />
                  )}
                </div>
              ))}
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
            <button
              type="submit"
              className="w-full bg-[#F39C12] text-white py-2 rounded-lg hover:bg-[#E67E22] transition duration-200"
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
