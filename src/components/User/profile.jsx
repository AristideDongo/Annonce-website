

const Profile = () => {
 return(
  <>
  <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            className="w-16 h-16 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div>
            <h2 className="text-xl font-semibold">Nom de l'utilisateur</h2>
            <p className="text-gray-600">email@example.com</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium">Informations personnelles</h3>
          <p className="text-gray-700 mt-2">Adresse: 123 Rue Exemple, Ville, Pays</p>
          <p className="text-gray-700 mt-2">Téléphone: +123 456 7890</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium">Annonces publiées</h3>
          <ul className="list-disc list-inside mt-2">
            <li className="text-gray-700">Annonce 1</li>
            <li className="text-gray-700">Annonce 2</li>
            <li className="text-gray-700">Annonce 3</li>
          </ul>
        </div>
      </div>
    </div>
  </>
 )
}

export default Profile