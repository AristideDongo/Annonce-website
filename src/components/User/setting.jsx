import { useState } from "react";

const Setting = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const updateUserSettings = async (userInfo) => {
    // Custom implementation to update user settings
    try {
      const response = await fetch('/api/updateUserSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      if (!response.ok) {
        throw new Error('Failed to update user settings');
      }
      alert('User settings updated successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating user settings');
    }
  };

  const updatePassword = async (password) => {
    // Custom implementation to update password
    try {
      const response = await fetch('/api/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
      });
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      alert('Password updated successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating password');
    }
  };

  const updateNotificationPreferences = async (notifications) => {
    // Custom implementation to update notification preferences
    try {
      const response = await fetch('/api/updateNotificationPreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notifications)
      });
      if (!response.ok) {
        throw new Error('Failed to update notification preferences');
      }
      alert('Notification preferences updated successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating notification preferences');
    }
  };

  const handleSubmitUserInfo = (e) => {
    e.preventDefault();
    updateUserSettings(userInfo);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password.newPassword === password.confirmPassword) {
      updatePassword(password);
    } else {
      alert('Les mots de passe ne correspondent pas');
    }
  };

  const handleSubmitNotifications = (e) => {
    e.preventDefault();
    updateNotificationPreferences(notifications);
  };

  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default Setting;