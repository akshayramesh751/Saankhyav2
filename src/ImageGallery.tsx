import React, { useRef } from 'react';

// Use public folder paths for images
const galleryItems = [
  { id: '1', imagePath: '/assets/images/Saankhya team 2.png', title: 'Team 2' },
  { id: '2', imagePath: '/assets/images/saankhya team1.png', title: 'Team 1' },
  { id: '3', imagePath: '/assets/images/Saankhya gallery 2.png', title: 'Gallery 2' },
  { id: '4', imagePath: '/assets/images/saankhya gallery.png', title: 'Gallery' }, 
];

const ImageGallerySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.98;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-2">
        <h2 className="text-4xl font-bold text-black-900 mb-4 font-serif drop-shadow-lg text-center">Our Gallery</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto mb-2"></div>
        <div className="relative">
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-blue-900 rounded-full p-2 shadow-lg hover:bg-blue-900 hover:text-white transition-all duration-300"
            onClick={() => scrollGallery('left')}
            aria-label="Scroll Left"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Gallery */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-10 px-12"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE 10+
            }}
          >
            {galleryItems.map(item => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[50vw] max-w-[680px] h-[380px] rounded-2xl overflow-hidden shadow-xl bg-white relative
                  sm:w-[50vw] sm:max-w-[680px] sm:h-[380px]
                  w-[90vw] max-w-[95vw] h-[220px]  // mobile: one image at a time"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ userSelect: 'none' }}
                />
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-blue-900 rounded-full p-2 shadow-lg hover:bg-blue-900 hover:text-white transition-all duration-300"
            onClick={() => scrollGallery('right')}
            aria-label="Scroll Right"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageGallerySection;