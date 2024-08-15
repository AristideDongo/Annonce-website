import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Annonce = () =>{
 const [formData, setFormData] = useState({
  title: '',
  description: '',
  photos: ['', '']
});

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

const handleSubmit = (e) => {
  e.preventDefault();
  // Custom implementation to handle form submission
  console.log(formData);
  alert('Annonce soumise avec succès');
};
 return(
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
 )
}

export default Annonce