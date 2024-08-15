const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Section de tri des produits */}
          <aside className="col-span-2 bg-gray-100 p-2 rounded-s-lg shadow-md max-h-72 overflow-auto">
            <h2 className="text-lg font-bold mb-2 text-center">Trier par</h2>
            <div className="flex flex-col space-y-1">
              <button className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100">
                Prix Haut
              </button>
              <button className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100">
                Prix Bas
              </button>
              <button className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100">
                Plus Populaire
              </button>
              <button className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100">
                Moins Populaire
              </button>
              <button className="text-gray-900 bg-white p-1 rounded-lg shadow-md hover:bg-blue-100">
                Plus Récente
              </button>
            </div>
          </aside>

          {/* Section principale */}
          <main className="col-span-10">
            {/* Nouvelle annonce */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Nouvelle annonce</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Exemple d'annonce */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img src="url_de_votre_image" alt="Description de l'image" className="w-full h-48 object-cover rounded-t-lg" />
                  <h3 className="text-xl font-semibold mt-4">Titre de l'annonce</h3>
                  <p className="text-gray-600">Description de l'annonce...</p>
                  <button className="text-blue-500 bg-white p-2 rounded-lg shadow-md hover:bg-blue-100">
                    Contacter-Moi
                  </button>
                </div>
              </div>
            </section>

            {/* Top annonce */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Top annonce</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Exemple d'annonce */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img src="url_de_votre_image" alt="Description de l'image" className="w-full h-48 object-cover rounded-t-lg" />
                  <h3 className="text-xl font-semibold mt-4">Titre de l'annonce</h3>
                  <p className="text-gray-600">Description de l'annonce...</p>
                  <button className="text-blue-500 bg-white p-2 rounded-lg shadow-md hover:bg-blue-100">
                    Contacter-Moi
                  </button>
                </div>
                {/* Ajouter d'autres annonces ici */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};


export default Home