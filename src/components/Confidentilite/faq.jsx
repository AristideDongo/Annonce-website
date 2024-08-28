import React, {useState} from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';


const Faq = () => {
 const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Comment puis-je publier une annonce ?",
      answer: "Pour publier une annonce, cliquez sur le bouton 'Publier une annonce' sur la page d'accueil et suivez les instructions."
    },
    {
      question: "Quels types d'annonces puis-je publier ?",
      answer: "Vous pouvez publier des annonces pour des biens immobiliers, des véhicules, des objets de seconde main, des services, et bien plus encore."
    },
    {
      question: "Comment modifier ou supprimer mon annonce ?",
      answer: "Pour modifier ou supprimer votre annonce, accédez à 'Mon Compte', puis allez dans 'Mes annonces' et sélectionnez l'annonce que vous souhaitez modifier ou supprimer."
    },
    {
      question: "Combien coûte la publication d'une annonce ?",
      answer: "La publication d'une annonce est gratuite. Cependant, nous proposons des options de mise en avant payantes pour augmenter la visibilité de votre annonce."
    },
    {
      question: "Comment puis-je contacter le vendeur d'une annonce ?",
      answer: "Pour contacter un vendeur, cliquez sur l'annonce qui vous intéresse, puis utilisez le formulaire de contact ou appelez le numéro fourni par le vendeur."
    },
    {
      question: "Que faire si je rencontre un problème avec un vendeur ou un acheteur ?",
      answer: "Si vous avez un problème avec un vendeur ou un acheteur, vous pouvez nous contacter via le formulaire de contact ou par email à support@example.com. Nous ferons de notre mieux pour vous aider."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="mx-auto mt-16 font-custom p-4 bg-gray-200">
       <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            {activeIndex === index ? (
              <FaChevronDown className="ml-2" />
            ) : (
              <FaChevronRight className="ml-2" />
            )}
          </div>
          {activeIndex === index && (
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;