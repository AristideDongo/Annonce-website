import React from 'react';

const Conditions = () => {
  return (
    <div className="mx-auto p-4 font-custom bg-[#F4F6F9]">
      <h1 className="text-3xl font-bold mb-4">Conditions d'utilisation</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-base leading-6">
          Bienvenue sur notre site d'annonce. En utilisant notre site, vous acceptez les conditions d'utilisation suivantes.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Utilisation du site</h2>
        <p className="text-base leading-6">
          Vous acceptez d'utiliser notre site uniquement à des fins légales et de manière à ne pas enfreindre les droits de tiers.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Contenu utilisateur</h2>
        <p className="text-base leading-6">
          Vous êtes responsable du contenu que vous publiez sur notre site. Vous garantissez que vous possédez tous les droits nécessaires pour publier ce contenu.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Modifications des conditions</h2>
        <p className="text-base leading-6">
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur le site.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Contact</h2>
        <p className="text-base leading-6">
          Si vous avez des questions concernant ces conditions, veuillez nous contacter à l'adresse suivante : contact@site.com.
        </p>
      </section>
    </div>
  );
};

export default Conditions;