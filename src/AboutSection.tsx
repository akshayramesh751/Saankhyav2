import React from "react";

const AboutSection: React.FC = () => (
  <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center font-serif">Our Story</h2>
      <p className="text-lg text-gray-700 mb-6">
        Our journey began with small projects in schools, colleges, and NGOs — from slum adoption to awareness drives and consultancy work. At every step, one cause stood out: education — for students, parents, and teachers.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        What started as projects grew into startups and organizations. Yet the need for something bigger and more impactful remained. Inspired by these words we knew it was time for the big leap.
      </p>
      <blockquote className="border-l-4 border-blue-900 pl-4 italic text-gray-600 my-8">
        “My life belongs to the whole community, and as long as I live it is my privilege to do for it whatever I can.”<br />
        <span className="block mt-2 text-right text-gray-500">— George Bernard Shaw</span>
      </blockquote>
      <p className="text-lg text-gray-700 mb-6">
        That leap became Sāṅkhya Academy — not just a tuition centre, but a movement to make learning meaningful.
      </p>
      <p className="text-lg text-gray-700">
        We started building Sāṅkhya, but soon realized it was a community waiting to come alive. Founded by us, but truly belonging to students, parents, and teachers.
      </p>
    </div>
  </section>
);

export default AboutSection;