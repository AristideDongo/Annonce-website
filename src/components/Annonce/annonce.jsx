import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Annonce = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photos: ['', ''],
    category: '',
    price: '' // Ajout de l'état pour le prix
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = (index, e) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = e.target.files[0];
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 50 ) {
      newErrors.title = 'Le titre ne doit pas dépasser 50 caractères';
    }

    if (!formData.description) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length > 100) {
      newErrors.description = 'La description ne doit pas dépasser 100 caractères';
    }

    if (!formData.photos[0]) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Custom implementation to handle form submission
      console.log(formData);
      alert('Annonce soumise avec succès');
    }
  };

  return (
    <>  
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Ajouter une annonce</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Titre de l'annonce"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Description de l'annonce"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Photos</label>
              {formData.photos.map((photo, index) => (
                <input
                  key={index}
                  type="file"
                  onChange={(e) => handlePhotoChange(index, e)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2"
                />
              ))}
              {errors.photos && <p className="text-red-500 text-sm">{errors.photos}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="immobilier">Immobilier</option>
                <option value="vehicules">Véhicules</option>
                <option value="Electronique">Electronique</option>
                <option value="Electromenager">Electromenager</option>
                <option value="Mode Homme">Mode Homme</option>
                <option value="Mode Femme">Mode Femme</option>
                <option value="Mode Enfant">Mode Enfant</option>
                <option value="Autres">Autres</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Prix</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Prix de l'annonce"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Soumettre l'annonce
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-500 hover:underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Annonce;