import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: "Comment puis-je m'inscrire?",
      answer: "Vous pouvez vous inscrire en cliquant sur le bouton 'Mon Compte' en haut à droite de la page d'accueil."
    },
    {
      question: "Comment puis-je contacter le support?",
      answer: "Vous pouvez contacter le support via notre formulaire de contact ou en envoyant un email à support@example.com."
    }
  ];

  return (
    <div className="mx-auto mt-16 font-custom p-4 bg-[#F4F6F9]">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold">{faq.question}</h2>
          <p className="mt-2 text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;