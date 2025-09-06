import React from "react";

const philosophyCards = [
  {
    icon: "👥",
    title: "Low Student–Teacher Ratio",
    desc: "Every student gets personal attention. Our small groups ensure no one is left behind and every question is valued.",
  },
  {
    icon: "🏆",
    title: "Assured Marks, Beyond Grades",
    desc: "We focus on deep understanding, not just exam scores. Success is measured by growth, confidence, and curiosity.",
  },
  {
    icon: "🚀",
    title: "Foundation for the Future",
    desc: "We build strong basics and critical thinking skills, preparing students for higher studies and real-world challenges.",
  },
  {
    icon: "🤝",
    title: "Friends Who Can Teach",
    desc: "Learning is collaborative. Our mentors and peers support each other, making education a shared journey.",
  },
  {
    icon: "🌱",
    title: "Growth-First Approach",
    desc: "We nurture every aspect of a student’s development—academic, emotional, and social—for lifelong success.",
  },
  {
    icon: "🦸",
    title: "A Hero's Journey",
    desc: "Every student is the hero of their own story. We guide, encourage, and celebrate each unique path to achievement.",
  },
];

const FeaturesSection: React.FC = () => (
  <section id="features" className="py-24 bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-black-900 mb-4 font-serif drop-shadow-lg">What We Believe</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto mb-2"></div>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
          We believe in an education that nurtures the whole person. Here’s what makes our approach unique.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {philosophyCards.map((card) => (
          <div
            key={card.title}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition-all duration-400 flex flex-col items-center border border-blue-100"
          >
            <div className="text-6xl mb-6">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-black-900 font-serif">{card.title}</h3>
            <p className="text-gray-700 text-lg">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;