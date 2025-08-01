import React from "react";

const faqs = [
  {
    id: 1,
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    id: 2,
    question: "How often should I use it?",
    answer:
      "For best results, use Posture Pro 15–30 minutes a day consistently, and gradually increase as needed.",
  },
  {
    id: 3,
    question: "Is it comfortable to wear?",
    answer:
      "Yes! Posture Pro is made with soft, breathable materials that are lightweight and comfortable for all-day use.",
  },
  {
    id: 4,
    question: "Can I wear it under clothes?",
    answer:
      "Absolutely. Its slim design allows you to wear it discreetly under your clothing without being noticeable.",
  },
  {
    id: 5,
    question: "Is it suitable for all ages?",
    answer:
      "Posture Pro is suitable for teens, adults, and seniors — anyone who wants to improve their posture and reduce back pain.",
  },
];

const FAQs = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow bg-white shadow-md border border-gray-200 rounded-lg"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-medium text-primary">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-700">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
