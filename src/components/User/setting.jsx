import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto text-center">
        <p className="mb-4 text-lg">{message}</p>
        <button 
          onClick={onClose} 
          className="bg-red-500 text-white px-4 py-2 rounded">
          Fermer
        </button>
      </div>
    </div>
  );
};

const Setting = () => {
  // État pour les informations utilisateur
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // État pour les mots de passe
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // État pour les préférences de notification
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false
  });

  // État pour la gestion des erreurs
  const [error, setError] = useState({ isOpen: false, message: '' });

  const handleError = (message) => {
    setError({ isOpen: true, message });
  };

  const closeErrorModal = () => {
    setError({ isOpen: false, message: '' });
  };

  // Gestion du changement des informations utilisateur
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Gestion du changement des mots de passe
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  // Gestion du changement des préférences de notification
  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  // Mise à jour des paramètres utilisateur
  const updateUserSettings = async (userInfo) => {
    try {
      const response = await fetch('/api/updateUserSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      if (!response.ok) {
        throw new Error('Échec de la mise à jour des paramètres utilisateur');
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      alert('Paramètres utilisateur mis à jour avec succès');
    } catch (error) {
      console.error(error);
      handleError('Une erreur est survenue lors de la mise à jour des paramètres utilisateur');
    }
  };

  // Mise à jour du mot de passe
  const updatePassword = async (password) => {
    try {
      const response = await fetch('/api/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
      });
      if (!response.ok) {
        throw new Error('Échec de la mise à jour du mot de passe');
      }
      alert('Mot de passe mis à jour avec succès');
    } catch (error) {
      console.error(error);
      handleError('Une erreur est survenue lors de la mise à jour du mot de passe');
    }
  };

  // Mise à jour des préférences de notification
  const updateNotificationPreferences = async (notifications) => {
    try {
      const response = await fetch('/api/updateNotificationPreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notifications)
      });
      if (!response.ok) {
        throw new Error('Échec de la mise à jour des préférences de notification');
      }
      alert('Préférences de notification mises à jour avec succès');
    } catch (error) {
      console.error(error);
      handleError('Une erreur est survenue lors de la mise à jour des préférences de notification');
    }
  };

  // Gestion de la soumission du formulaire des informations utilisateur
  const handleSubmitUserInfo = (e) => {
    e.preventDefault();
    updateUserSettings(userInfo);
  };

  // Gestion de la soumission du formulaire des mots de passe
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password.newPassword === password.confirmPassword) {
      updatePassword(password);
    } else {
      handleError('Les mots de passe ne correspondent pas');
    }
  };

  // Gestion de la soumission du formulaire des préférences de notification
  const handleSubmitNotifications = (e) => {
    e.preventDefault();
    updateNotificationPreferences(notifications);
  };

  return (
    <div className="mx-auto font-custom p-4 mt-16 bg-[#F4F6F9]">
      <h1 className="text-2xl font-bold mb-4">Paramètres du compte</h1>
      
      <div className="flex flex-wrap -mx-2">
        <div className="w-full lg:w-1/2 px-2">
          <form onSubmit={handleSubmitUserInfo} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Informations personnelles</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mettre à jour</button>
          </form>

          <form onSubmit={handleSubmitNotifications} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Préférences de notification</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Notifications par email</label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationsChange}
                className="mr-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Notifications par SMS</label>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationsChange}
                className="mr-2"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mettre à jour les préférences</button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 px-2">
          <form onSubmit={handleSubmitPassword} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Changer le mot de passe</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mot de passe actuel</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Changer le mot de passe</button>
          </form>
        </div>
      </div>

      <Modal isOpen={error.isOpen} onClose={closeErrorModal} message={error.message} />
    </div>
  );
};

export default Setting;
