import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { easeInOut } from 'framer-motion';

// Define the interface for a section to ensure type safety
interface Section {
  id: number;
  title: string;
  content: JSX.Element;
  color: string;
}

// The main component that renders the "Our Story" section
const AboutSection: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const sections: Section[] = [
    {
      id: 1,
      title: "Our Humble Beginnings",
      content: (
        <p className="text-lg text-gray-800 leading-relaxed">
          Our journey began with small projects in schools, colleges and NGOs — from slum adoption to awareness drives and consultancy work. At every step, one cause stood out: <span className="text-blue-900 font-semibold">education</span> — for students, parents and teachers.
        </p>
      ),
      color: 'blue-900',
    },
    {
      id: 2,
      title: "The Seeds of Growth",
      content: (
        <p className="text-lg text-gray-800 leading-relaxed">
          What started as projects grew into startups and organizations. Yet the need for something bigger and more impactful remained. Inspired by these words we knew it was time for <span className="text-orange-400 font-semibold">the big leap</span>.
        </p>
      ),
      color: 'orange-400',
    },
    {
      id: 3,
      title: "A Guiding Philosophy",
      content: (
        <blockquote className="border-l-4 border-blue-900 pl-6 py-2 italic text-gray-700 my-8 text-lg font-medium relative">
          <p className="mb-2">
            “My life belongs to the whole community, and as long as I live it is my privilege to do for it whatever I can.”
          </p>
          <span className="block mt-1 text-right text-gray-600 font-semibold">— George Bernard Shaw</span>
          {/* Animated accent using a subtle pulse effect */}
          <div className="absolute top-0 -left-2 w-2 h-full bg-orange-400 rounded-full animate-pulse-slow"></div>
        </blockquote>
      ),
      color: 'blue-900',
    },
    {
      id: 4,
      title: "Sāṅkhya: More Than an Academy",
      content: (
        <p className="text-lg text-gray-800 leading-relaxed">
          That leap became <span className="text-blue-900 font-bold">Sāṅkhya Academy</span> — not just a tuition centre, but a <span className="text-orange-400 font-bold">movement to make learning meaningful</span>.
        </p>
      ),
      color: 'orange-400',
    },
    {
      id: 5,
      title: "A Community Awakens",
      content: (
        <p className="text-lg text-gray-800 leading-relaxed">
          We started building Sāṅkhya, but soon realized it was a <span className="text-blue-900 font-semibold">community waiting to come alive</span>. Founded by us, but truly belonging to <span className="text-blue-900 font-semibold">students, parents and teachers</span>.
        </p>
      ),
      color: 'blue-900',
    },
  ];

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1 < sections.length ? prevIndex + 1 : prevIndex));
  };
  
  const handleTimelineClick = (index: number) => {
    setCurrentCardIndex(index);
  };
  
  const currentCard = sections[currentCardIndex];

  // Variants for the card animation
  const cardVariants: Variants = {
    initial: { 
      opacity: 0, 
      x: "100%", 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: easeInOut // Use the imported easing function
      } 
    },
    exit: { 
      opacity: 0, 
      x: "-100%", 
      scale: 0.8,
      transition: { 
        duration: 0.3, 
        ease: easeInOut 
      } 
    }
  };

  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-white via-blue-50 to-orange-50 py-8 sm:py-16 flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "unset", height: "100%" }} // Remove min-h-screen
    >
      {/* Watermark background image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/assets/logos/Black Trans no word.png"
          alt="Watermark"
          className="w-full max-w-xs sm:max-w-sm opacity-5 sm:opacity-7 object-contain mx-auto animate-pulse-slow"
          style={{ filter: "blur(2px)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg sm:max-w-2xl mx-auto px-2 sm:px-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-8 text-center font-serif leading-tight tracking-wide drop-shadow-md">
          <span className="text-blue-900">Our</span> <span className="text-blue-900">Journey</span>
        </h2>

        <div className="relative w-full h-[320px] sm:h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full h-full p-1 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out"
            >
              <div className={`bg-white p-3 sm:p-6 rounded-lg border-t-8 border-${currentCard.color} w-full h-full flex flex-col justify-between`}>
                <div className="flex-grow">
                  <h3 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 ${currentCard.color === 'blue-900' ? 'text-blue-900' : 'text-orange-400'}`}>
                    {currentCard.title}
                  </h3>
                  <div className="text-sm sm:text-base leading-relaxed">
                    {currentCard.content}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2 sm:mt-4 space-x-2 sm:space-x-4 pb-1 sm:pb-0">
                  {sections.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-125
                        ${index === currentCardIndex ? 'bg-blue-900 scale-125' : 'bg-gray-300'}`}
                      onClick={() => handleTimelineClick(index)}
                      title={sections[index].title}
                    ></div>
                  ))}
                </div>
              </div>
              {currentCardIndex < sections.length - 1 && (
                <button
                  onClick={handleNextCard}
                  className="absolute bottom-3 right-3 p-2 sm:p-3 rounded-full bg-blue-900 text-white shadow-lg transition-transform duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                  aria-label="Next Card"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;