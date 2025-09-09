import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, BookOpen, Users, Award, Lightbulb } from 'lucide-react';

import CoursesSection from './CoursesSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import Chatbot from './Chatbot'; // <-- Import the Chatbot component
import AboutApplyButton from './AdmnForm';
import ImageGallerySection from './ImageGallery';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true); // <-- New state for hero visibility

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'courses', 'features', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the useEffect for scroll locking
  useEffect(() => {
    // Only lock scrolling when hero is visible AND not transitioning
    const hero = document.getElementById('hero');
    if (hero && hero.style.display !== 'none' && !isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isTransitioning]);

  // Add this useEffect for handling page refresh
  useEffect(() => {
    // Reset scroll position to top
    window.scrollTo(0, 0);
    
    // Reset hero visibility
    const hero = document.getElementById('hero');
    if (hero) {
      hero.style.display = 'flex';
    }
    
    // Reset transitions and scroll lock
    setIsTransitioning(false);
    document.body.style.overflow = 'hidden';
    
    // Clear any existing scroll position from browser memory
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []); // Empty dependency array means this runs once on mount

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  // Update the handleExploreNow function
  const handleExploreNow = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }

      setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) {
          hero.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        setIsTransitioning(false);
        setIsHeroVisible(false); // <-- Hide chatbot when hero is hidden
      }, 700);
    }, 700);
  };

  const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-orange-400 ${
        isActive ? 'text-orange-400' : 'text-white'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-400 transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </button>
  );

  const featureImages = [
    "/assets/images/library.png",         // Quiet Study Space / Library
    "/assets/images/sciencelab.png",             // Experiential Learning Lab
    "/assets/images/campfire-removebg-preview.png",      // Out-Station Learning Experience
    "/assets/images/outdoor.png"        // Astronomy Club and Book Club
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      setFormStatus('sending');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
      });

      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setFormStatus('');
    }, 3000);
  };

  useEffect(() => {
    // On mount, hero is visible
    setIsHeroVisible(true);
  }, []);

  return (
    <div className="relative">
      {/* Navigation - Move it outside the main container */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-blue-900/95 backdrop-blur-sm shadow-lg" style={{ zIndex: 9999 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center h-16">
            <img 
              src="/assets/logos/output-onlinepngtools.png" 
              alt="Sāṅkhya Academy Logo"
              className="h-[6.25rem] w-auto max-h-16 md:max-h-[6.25rem] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ maxHeight: '6.25rem' }}
              onClick={() => scrollToSection('about')}
             />
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="about" isActive={activeSection === 'about'}>ABOUT</NavLink>
                <NavLink href="courses" isActive={activeSection === 'courses'}>COURSES</NavLink>
                <NavLink href="features" isActive={activeSection === 'features'}>RESOURCES</NavLink>
                <NavLink href="gallery" isActive={activeSection === 'gallery'}>GALLERY</NavLink>
                <NavLink href="contact" isActive={activeSection === 'contact'}>CONTACT</NavLink>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-orange-400 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-900/95 backdrop-blur-sm">
            <NavLink href="about" isActive={activeSection === 'about'}>ABOUT</NavLink>
            <NavLink href="courses" isActive={activeSection === 'courses'}>COURSES</NavLink>
            <NavLink href="features" isActive={activeSection === 'features'}>WHY US</NavLink>
            <NavLink href="gallery" isActive={activeSection === 'gallery'}>GALLERY</NavLink>
            <NavLink href="contact" isActive={activeSection === 'contact'}>CONTACT</NavLink>
          </div>
        </div>
      </nav>

      {/* Main container - Add padding-top to account for fixed nav */}
      <div className={`min-h-screen bg-white transition-all duration-700 ease-in-out pt-16 ${
        isTransitioning ? 'transform translate-y(-2rem)' : 'transform translate-y(0)'
      }`}>
        {/* Hero Section */}
        <section 
          id="hero" 
          className="fixed inset-0 flex flex-col z-[10000] bg-gradient-to-br from-blue-900/30 via-blue-800/30 to-blue-700/30 backdrop-blur-md transition-all duration-700 ease-in-out transform"
          style={{ 
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(-100%)' : 'translateY(0)',
            pointerEvents: isTransitioning ? 'none' : 'auto',
            height: '100vh'
          }}
        >
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <div className="mb-8 sm:mb-12 mt-4 sm:mt-8">
                <img 
                  src="/assets/logos/Black Trans no word.png" 
                  alt="Sāṅkhya Academy Logo" 
                  className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 animate-fade-in-down cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={handleExploreNow}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="animate-fade-in-up space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight px-2">
                  Welcome To{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 font-serif">
                    Sāṅkhya Academy
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 px-4">
                  Where education meets experiential learning
                </p>
                <button
                  onClick={handleExploreNow}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl border border-white/30"
                >
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section (main) */}
        <div className="relative">
          <section id="about" className="py-24 bg-gradient-to-b from-white to-blue-50">
            {/* 
            Marquee Announcement 
            <div className="overflow-hidden mb-8">
              <div className="relative w-full h-12 flex items-center">
              <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xl font-bold drop-shadow-lg">
                <span className="flex items-center gap-2">
                  <span className="animate-pulse text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.7)]">📢</span>
                  Admissions Open! Call Now
                  <a
                  href="tel:+919380738490"
                  className="animate-pulse text-blue-900 drop-shadow-[0_0_8px_rgba(30,64,175,0.7)] underline hover:text-orange-500 transition-colors"
                  style={{ textDecorationThickness: '2px' }}
                  >
                  <span className="ml-1">📞 +91 93807 38490</span>
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <span className="animate-pulse text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.7)]">✨</span>
                  Limited Seats Available
                  <span className="animate-pulse text-orange-500 drop-shadow-[0_0_8px_rgba(255,165,0,0.7)]">🚀</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="animate-pulse text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.7)]">🎓</span>
                  Join Sāṅkhya Academy Today!
                </span>
                </div>
              </div>
              </div>
            </div>
            */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in-left">
                  <img 
                    src="/assets/images/about.png"
                    alt="Academy Banner" 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
                <div className="animate-fade-in-right space-y-8">
                  <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    Empowering Minds, Shaping Futures at{' '}
                    <span className="text-blue-900 font-serif">Sāṅkhya Academy</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-10">
                    "What started as projects in schools and NGOs became Sāṅkhya Academy — not just a tuition centre, but a movement. Founded by us, but truly belonging to students, parents and teachers who built it together."
                  </p>
                  <button
                    onClick={() => setShowAboutPopup(true)}
                    className="bg-blue-900 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
              
            </div>
          </section>
          {/* Popup Modal for AboutSection */}
          {showAboutPopup && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[10000] bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in-up max-h-[80vh] overflow-y-auto mt-16">
                <button
                  onClick={() => setShowAboutPopup(false)}
                  className="absolute top-10 right-4 text-gray-500 hover:text-orange-500 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <AboutSection />
              </div>
            </div>
          )}
        </div>

        {/* Courses Section (main) */}
        <section id="courses" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">What Do We Offer</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto mb-2"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* All boards/courses in one row */}
              {[
          {
            title: 'ICSE',
            courses: ['Class 8: Math and Science', 'Class 9: Math and Science', 'Class 10: Math and Science']
          },
          {
            title: 'CBSE',
            courses: ['Class 8: Math and Science','Class 9: Math and Science', 'Class 10: Math and Science']
          },
          {
            title: 'PUC I',
            subtitle: 'Science',
            courses: ['KCET', 'JEE', 'Other competetive exams']
          },
          {
            title: 'PUC II',
            subtitle: 'Science',
            courses: ['KCET', 'JEE', 'Other competetive exams']
          }
              ].map((board, index) => (
          <div
            key={board.title}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up flex flex-col mx-auto"
            style={{ minWidth: '220px', maxWidth: '320px', width: '100%', animationDelay: `${index * 200}ms` }}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{board.title}</h3>
              {board.subtitle && (
                <h4 className="text-base font-semibold text-blue-700 mb-2">{board.subtitle}</h4>
              )}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <ul className="space-y-2 flex-grow">
              {board.courses.map((course, courseIndex) => (
                <li key={courseIndex} className="text-gray-700 font-medium text-center py-1 px-2 bg-white/50 rounded-lg text-sm">
            {course}
                </li>
              ))}
            </ul>
          </div>
              ))}
            </div>
          </div>
        </section>
        <CoursesSection />

        {/* Features Section (main) */}
        <section id="features" className="py-10 bg-gradient-to-b from-blue-50 to-white"> {/* Reduced py-20 to py-10 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6"> {/* Reduced mb-16 to mb-6 */}
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Why Choose Us</h2> {/* Reduced text-4xl to text-3xl and mb-4 to mb-2 */}
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto mb-1"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Quiet Study Space / Library', icon: BookOpen },
                { title: 'Experiential Learning Lab', icon: Lightbulb },
                { title: 'Out-Station Learning Experience', icon: Award },
                { title: 'Astronomy Club and Book Club', icon: Users }
              ].map((feature, index) => (
                // Find the Features section and update the image container div:

              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl group"
              >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm ">
               <img
                src={featureImages[index]}
                alt={feature.title}
                className="h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                style={{
                   transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              }}
              />
            </div>
            </div>
              ))}
            </div>
          </div>
        </section>
        <FeaturesSection />

        {/* Gallery Section */}
        <section id="gallery">
          <ImageGallerySection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Reach Out To Us</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto"></div>
            </div>
            
            {/* Map */}
            {/* Map */}
          <div className="mb-16">
          <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.0527844808507!2d77.56183577507703!3d13.006572887312027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xcebff8930bc97d7%3A0x978d4ea8614faee5!2sSaankhya%20Academy!5e1!3m2!1sen!2sin!4v1755021297820!5m2!1sen!2sin"
            className="w-full h-96 rounded-2xl"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <a 
                  href="https://maps.app.goo.gl/oHGUH5xEf4iQ1YdH8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">Second Floor, 52, 8th Main Rd, Malleshwaram</p>
                    <p className="text-gray-600">Bengaluru, Karnataka 560003</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+919380738490" 
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="text-blue-600 hover:text-orange-500 transition-colors">+91 93807 38490</p>
                    <p className="text-gray-600">Monday to Saturday, 10AM to 8PM</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:admin@saankhya.academy" 
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-blue-600 hover:text-orange-500 transition-colors">admin@saankhya.academy</p>
                    <p className="text-gray-600">Email us your queries</p>
                  </div>
                </a>
              </div>
              
              {/* Contact Form */}
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input 
                    type="hidden" 
                    name="access_key" 
                    value="59123046-13a5-4f6d-b4db-754756d3d7e3"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter your subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      formStatus === 'sending' 
                        ? 'bg-gray-500 text-white cursor-not-allowed' 
                        : 'bg-blue-900 text-white hover:bg-orange-500'
                    }`}
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="text-green-500 text-center">Message sent successfully!</div>
                  )}
                  {formStatus === 'error' && (
                    <div className="text-red-500 text-center">Failed to send message. Please try again.</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-r from-blue-900 to-blue-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Join Sāṅkhya Academy now and unlock your full potential with our expert guidance!
            </h2>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              CONTACT US
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-6">About Us</h3>
              <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
                At Sāṅkhya Academy, we are dedicated to shaping young minds with a nurturing environment that inspires curiosity and excellence. 
                Our expert tutors bring years of experience and a passion for teaching, ensuring every student receives personalized attention. 
                By focusing on experiential, application-based learning, we help students deeply understand concepts and connect them to real-world scenarios.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <a
              href="tel:+919380738490"
              className="flex items-center space-x-2 text-blue-400 hover:text-orange-400 transition-colors"
              >
              <Phone className="w-5 h-5" />
              <span>+91 93807 38490</span>
              </a>
              <a
              href="mailto:admin@saankhya.academy"
              className="flex items-center space-x-2 text-blue-400 hover:text-orange-400 transition-colors"
              >
              <Mail className="w-5 h-5" />
              <span>admin@saankhya.academy</span>
              </a>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: 'https://www.instagram.com/saankhyaacademy' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-900 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <div className="text-center text-gray-400">
              <p>
                Designed by{' '}
                <a
                  href="https://www.linkedin.com/in/akshay-ramesh-201371339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-orange-400 transition-colors"
                >
                  Akshay Ramesh
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
        {!isHeroVisible && <AboutApplyButton />} 
        {/* Floating Chatbot Widget - only show when hero is NOT visible */}
        {!isHeroVisible && <Chatbot />}
    </div>
  );
};

export default App;


