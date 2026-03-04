import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./App.css"
import Vid from './assets/V1.mp4'
const App = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const videoRef = useRef(null);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const propertiesRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }

    // GSAP Entry Animations
    const tl = gsap.timeline();

    // Navbar animation
    tl.from(navbarRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Hero content animations
    tl.from(heroRef.current.querySelector(".hero-title"), {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.5");

    tl.from(heroRef.current.querySelector(".hero-subtitle"), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    tl.from(heroRef.current.querySelector(".hero-button"), {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    tl.from(heroRef.current.querySelector(".scroll-indicator"), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    // About section animations
    gsap.set(aboutRef.current.querySelectorAll(".about-animate"), {
      y: 50,
      opacity: 0
    });

    // Properties section animations
    gsap.set(propertiesRef.current.querySelectorAll(".property-card"), {
      y: 50,
      opacity: 0
    });

    // Contact section animations
    gsap.set(contactRef.current.querySelectorAll(".contact-animate"), {
      y: 50,
      opacity: 0
    });

    // Footer animations
    gsap.set(footerRef.current.querySelectorAll(".footer-animate"), {
      y: 30,
      opacity: 0
    });

    // Scroll trigger animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // About section
      if (aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop;
        if (scrollY > aboutTop - windowHeight + 200) {
          gsap.to(aboutRef.current.querySelectorAll(".about-animate"), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      }

      // Properties section
      if (propertiesRef.current) {
        const propertiesTop = propertiesRef.current.offsetTop;
        if (scrollY > propertiesTop - windowHeight + 200) {
          gsap.to(propertiesRef.current.querySelectorAll(".property-card"), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          });
        }
      }

      // Contact section
      if (contactRef.current) {
        const contactTop = contactRef.current.offsetTop;
        if (scrollY > contactTop - windowHeight + 200) {
          gsap.to(contactRef.current.querySelectorAll(".contact-animate"), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      }

      // Footer section
      if (footerRef.current) {
        const footerTop = footerRef.current.offsetTop;
        if (scrollY > footerTop - windowHeight + 200) {
          gsap.to(footerRef.current.querySelectorAll(".footer-animate"), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Animate hamburger to X
      gsap.to(".hamburger-line-1", {
        rotate: 45,
        y: 8,
        duration: 0.3
      });
      gsap.to(".hamburger-line-2", {
        opacity: 0,
        duration: 0.3
      });
      gsap.to(".hamburger-line-3", {
        rotate: -45,
        y: -8,
        duration: 0.3
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });
      
      // Animate X back to hamburger
      gsap.to(".hamburger-line-1", {
        rotate: 0,
        y: 0,
        duration: 0.3
      });
      gsap.to(".hamburger-line-2", {
        opacity: 1,
        duration: 0.3
      });
      gsap.to(".hamburger-line-3", {
        rotate: 0,
        y: 0,
        duration: 0.3
      });
    }
  }, [mobileMenuOpen]);

  // Contact popup animation
  useEffect(() => {
    if (showContactPopup && popupRef.current) {
      gsap.fromTo(popupRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  }, [showContactPopup]);

  const properties = [
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,950,000",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      floors: 2,
      area: "420 m²",
      views: ["Mountain view", "City view"],
      description: "Up for sale is a spacious modern villa in Beverly Hills, nestled in a picturesque setting! This exceptional eco-friendly residence is characterized by quality finishes, open floor plan, and stunning mountain views.",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-c94bf556816b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      type: "Houses",
      ecoFriendly: true,
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      location: "New York, NY",
      price: "$1,250,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      floors: 1,
      area: "210 m²",
      views: ["City view", "Skyline view"],
      description: "Luxurious downtown penthouse with floor-to-ceiling windows offering breathtaking city views. This modern space features high-end finishes and private rooftop access.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      type: "Condos",
      ecoFriendly: false,
    },
    {
      id: 3,
      title: "Lakefront Estate",
      location: "Lake Tahoe, NV",
      price: "$875,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      floors: 2,
      area: "320 m²",
      views: ["Lake view", "Forest view"],
      description: "Up for sale is a spacious home in Lake Tahoe, nestled in a picturesque setting! This exceptional eco-friendly residence is characterized by quality craftsmanship and stunning lake views.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      type: "Houses",
      ecoFriendly: true,
    },
    {
      id: 4,
      title: "Minimalist Penthouse",
      location: "Miami, FL",
      price: "$3,100,000",
      beds: 4,
      baths: 4,
      sqft: "3,800",
      floors: 2,
      area: "380 m²",
      views: ["Ocean view", "City view"],
      description: "Up for sale is a stunning penthouse in Miami Beach with panoramic ocean views! This exceptional eco-friendly residence is characterized by minimalist design and quality finishes.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-c94bf556816b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      type: "Condos",
      ecoFriendly: true,
    },
  ];

  const openPropertyDetail = (property) => {
    setSelectedProperty(property);
    setShowDetail(true);
    setActiveImage(0);
    document.body.style.overflow = 'hidden';
    
    // Animate modal opening
    setTimeout(() => {
      gsap.fromTo(".modal-content",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }, 10);
  };

  const closePropertyDetail = () => {
    gsap.to(".modal-content", {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setShowDetail(false);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const nextImage = () => {
    if (selectedProperty) {
      setActiveImage((prev) => (prev + 1) % selectedProperty.gallery.length);
      gsap.fromTo(".main-image",
        { opacity: 0.5 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      setActiveImage((prev) => (prev - 1 + selectedProperty.gallery.length) % selectedProperty.gallery.length);
      gsap.fromTo(".main-image",
        { opacity: 0.5 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  const openContactPopup = (property) => {
    setSelectedProperty(property);
    setShowContactPopup(true);
    setPhoneNumber("");
    setSubmitSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeContactPopup = () => {
    gsap.to(popupRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setShowContactPopup(false);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email sending (replace with actual API call)
    setTimeout(() => {
      console.log(`Property: ${selectedProperty.title}`);
      console.log(`Phone: ${phoneNumber}`);
      console.log(`Email sent to: ashi@realty.com`);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Close popup after success
      setTimeout(() => {
        closeContactPopup();
      }, 2000);
    }, 1500);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased relative overflow-x-hidden">
      {/* Floating Navbar - Mobile Friendly */}
      <nav ref={navbarRef} className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-full px-4 md:px-8 py-2 md:py-3 shadow-lg flex items-center justify-between md:justify-center text-gray-800 font-['Inter'] font-medium tracking-wide">
          {/* Logo/Brand for mobile */}
          <span className="md:hidden font-['Inter'] text-sm font-medium">ASHI</span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-gray-600 transition text-sm">Home</a>
            <a href="#about" className="hover:text-gray-600 transition text-sm">About</a>
            <a href="#properties" className="hover:text-gray-600 transition text-sm">Properties</a>
            <a href="#contact" className="hover:text-gray-600 transition text-sm">Contact</a>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col space-y-1.5 p-2"
          >
            <span className="hamburger-line-1 w-6 h-0.5 bg-gray-800 transition-all"></span>
            <span className="hamburger-line-2 w-6 h-0.5 bg-gray-800 transition-all"></span>
            <span className="hamburger-line-3 w-6 h-0.5 bg-gray-800 transition-all"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
        style={{ transform: 'translateX(100%)', opacity: 0 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a 
            href="#home" 
            onClick={closeMobileMenu}
            className="text-4xl text-white hover:text-gray-300 transition font-light"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={closeMobileMenu}
            className="text-4xl text-white hover:text-gray-300 transition font-light"
          >
            About
          </a>
          <a 
            href="#properties" 
            onClick={closeMobileMenu}
            className="text-4xl text-white hover:text-gray-300 transition font-light"
          >
            Properties
          </a>
          <a 
            href="#contact" 
            onClick={closeMobileMenu}
            className="text-4xl text-white hover:text-gray-300 transition font-light"
          >
            Contact
          </a>
          
          {/* Social Links in Mobile Menu */}
          <div className="flex space-x-6 mt-8">
            <a href="#" className="text-white/70 hover:text-white transition text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition text-2xl">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition text-2xl">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section with Video */}
      <section ref={heroRef} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          >
            <source src={Vid} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative text-center text-white max-w-5xl px-4 z-10">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light mb-4 md:mb-6 tracking-tight leading-none">
            FIND YOUR<br />SANCTUARY
          </h1>
          <p className="hero-subtitle text-base md:text-lg lg:text-xl mb-8 md:mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Curated luxury properties by Ashi
          </p>
          <a 
            href="#properties" 
            className="hero-button inline-block bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 md:px-12 py-3 md:py-4 text-xs md:text-sm font-light hover:bg-white/20 transition-all duration-300 tracking-wide"
          >
            EXPLORE COLLECTION
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-light animate-bounce">
          Scroll
        </div>
      </section>

      {/* About Section - Fixed Overflow */}
      <section ref={aboutRef} id="about" className="py-16 md:py-24 px-4 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Large Name Header - Reduced size */}
          <div className="mb-12 md:mb-16 about-animate">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-gray-900">
              ASHI
            </h2>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-gray-300 -mt-4 md:-mt-8">
              VERMA
            </h2>
          </div>

          {/* Two Column Layout - Better spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <div className="about-animate">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Ashi Verma"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Right Column - Bio */}
            <div className="about-animate space-y-6 md:space-y-8">
              <div className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                  With over a decade of experience in luxury real estate, I've built a reputation for discretion, expertise, and an unwavering commitment to architectural excellence.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-500">
                  Each property is carefully selected for its unique character, location, and potential. I don't just sell homes—I curate lifestyles.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-gray-200">
                <div>
                  <p className="text-4xl md:text-5xl font-light text-gray-900">500+</p>
                  <p className="text-xs text-gray-400 mt-1 tracking-wide">PROPERTIES SOLD</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-light text-gray-900">$250M+</p>
                  <p className="text-xs text-gray-400 mt-1 tracking-wide">IN SALES</p>
                </div>
              </div>

              {/* Recognition */}
              <div className="bg-gray-50 p-6">
                <p className="text-base font-light text-gray-900 mb-3">RECOGNITION</p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="text-xs text-gray-600">TOP 1% AGENT</span>
                  <span className="text-xs text-gray-400">—</span>
                  <span className="text-xs text-gray-600">5-STAR RATED</span>
                  <span className="text-xs text-gray-400">—</span>
                  <span className="text-xs text-gray-600">LUXURY SPECIALIST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section - REDESIGNED CARDS */}
      <section ref={propertiesRef} id="properties" className="py-16 md:py-24 px-4 w-full bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Reduced size */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-900">
              FEATURED
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#FFBF00] -mt-4 md:-mt-6">
              PROPERTIES
            </h2>
          </div>
          
          {/* MODERN CARD DESIGN */}
          <div className="space-y-6">
            {properties.map((property, index) => (
              <div 
                key={property.id} 
                className="property-card group cursor-pointer bg-white"
                onClick={() => openPropertyDetail(property)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden h-[250px] md:h-[350px]">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1.5">
                      <span className="text-xs font-light">{property.price}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:col-span-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-light mb-1">{property.title}</h3>
                      <p className="text-xs text-gray-400 mb-4">{property.location}</p>
                      
                      {/* Specs */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500">BEDS</span>
                          <span className="font-medium">{property.beds}</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500">BATHS</span>
                          <span className="font-medium">{property.baths}</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500">SQFT</span>
                          <span className="font-medium">{property.sqft}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">AREA</span>
                          <span className="font-medium">{property.area}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Details Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 tracking-wider">CLICK FOR DETAILS</span>
                      <svg className="w-4 h-4 group-hover:translate-x-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 md:mt-12">
            <button className=" text-gray-900 px-12 md:px-16 py-4 text-xs font-light  duration-300">
              VIEW ALL PROPERTIES 
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-16 md:py-24 px-4 w-full bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 md:mb-16 contact-animate">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-900">
              LET'S
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-300 -mt-4 md:-mt-6">
              CONNECT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 contact-animate">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs text-gray-400 mb-2 tracking-wider">VISIT</h3>
                <p className="text-xl font-light text-gray-900">9663 Santa Monica Boulevard</p>
                <p className="text-base text-gray-500 mt-1">Beverly Hills, CA 90210</p>
              </div>
              
              <div>
                <h3 className="text-xs text-gray-400 mb-2 tracking-wider">CONTACT</h3>
                <p className="text-xl font-light text-gray-900">ashi@realty.com</p>
                <p className="text-base text-gray-500 mt-1">+1 (310) 555-0123</p>
              </div>
              
              <div>
                <h3 className="text-xs text-gray-400 mb-3 tracking-wider">FOLLOW</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-900 transition text-lg">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-900 transition text-lg">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-900 transition text-lg">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <form className="space-y-6">
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-900 text-base font-light transition"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-900 text-base font-light transition"
                />
                <textarea 
                  rows="3" 
                  placeholder="MESSAGE"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-900 text-base font-light transition resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-gray-900 text-white py-4 text-xs font-light hover:bg-gray-800 transition-all duration-300 tracking-wide"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} id="footer" className="bg-white text-gray-900 w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 footer-animate">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-light mb-2">ASHI</h3>
              <p className="text-xs text-gray-400 leading-relaxed tracking-wide">
                LUXURY REAL ESTATE
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs text-gray-400 mb-3 tracking-wider">EXPLORE</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-sm text-gray-600 hover:text-gray-900 transition">Home</a></li>
                <li><a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition">About</a></li>
                <li><a href="#properties" className="text-sm text-gray-600 hover:text-gray-900 transition">Properties</a></li>
                <li><a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs text-gray-400 mb-3 tracking-wider">LEGAL</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Terms</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center footer-animate">
            <p className="text-xs text-gray-400">© 2025 ASHI REALTY. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-900 transition">PRIVACY POLICY</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-900 transition">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FULL SCREEN Property Detail Modal */}
      {showDetail && selectedProperty && (
        <div className="fixed inset-0 z-[100]">
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={closePropertyDetail}
          ></div>
          
          <div className="relative h-screen w-screen flex items-center justify-center p-2 md:p-4">
            <div className="modal-content relative w-full h-full opacity-0">
              
              {/* Close Button */}
              <button 
                onClick={closePropertyDetail}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 border border-white/20"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Screen Content */}
              <div className="h-full flex flex-col md:flex-row">
                {/* Left Side - Image Gallery */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative bg-black">
                  <img 
                    src={selectedProperty.gallery[activeImage]} 
                    alt={selectedProperty.title}
                    className="main-image w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 border border-white/20"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 border border-white/20"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-black/50 backdrop-blur-md text-white px-2 py-1 md:px-3 md:py-1.5 text-xs border border-white/20">
                    {activeImage + 1} / {selectedProperty.gallery.length}
                  </div>

                  {/* Thumbnails Strip */}
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex space-x-1 md:space-x-2">
                    {selectedProperty.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-10 h-10 md:w-14 md:h-14 overflow-hidden transition-all ${
                          activeImage === index 
                            ? 'border-2 border-white scale-110' 
                            : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side - Property Details */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full bg-white overflow-y-auto p-4 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light mb-2">{selectedProperty.title}</h2>
                      <p className="text-xs text-gray-400">{selectedProperty.location}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-light">{selectedProperty.price}</span>
                      <span className="text-xs text-gray-400 cursor-pointer underline decoration-dotted">
                        CALCULATE MORTGAGE
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "AREA", value: selectedProperty.area },
                        { label: "FLOORS", value: selectedProperty.floors },
                        { label: "BEDS", value: selectedProperty.beds },
                        { label: "BATHS", value: selectedProperty.baths },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-2 md:p-3 text-center">
                          <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                          <p className="text-sm md:text-base font-light">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {selectedProperty.views.map((view, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 md:px-3 md:py-1.5 text-xs">
                          {view}
                        </span>
                      ))}
                      {selectedProperty.ecoFriendly && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 md:px-3 md:py-1.5 text-xs flex items-center">
                          <span className="mr-1">🌱</span> ECO-FRIENDLY
                        </span>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-4 md:pt-6">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProperty.description}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => {
                          closePropertyDetail();
                          openContactPopup(selectedProperty);
                        }}
                        className="flex-1 bg-gray-900 text-white py-3 text-xs font-light hover:bg-gray-800 transition-all"
                      >
                        INQUIRE
                      </button>
                      <button className="flex-1 border border-gray-900 text-gray-900 py-3 text-xs font-light hover:bg-gray-900 hover:text-white transition-all">
                        SCHEDULE TOUR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Popup - Enter Number */}
      {showContactPopup && selectedProperty && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeContactPopup}
          ></div>
          
          <div 
            ref={popupRef}
            className="relative bg-white max-w-md w-full p-6 md:p-8"
          >
            <button 
              onClick={closeContactPopup}
              className="absolute top-3 right-3 w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-light mb-1">INQUIRE ABOUT</h3>
              <p className="text-xs text-gray-400">{selectedProperty.title}</p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base font-light mb-1">THANK YOU</p>
                <p className="text-xs text-gray-400">WE'LL CONTACT YOU SHORTLY</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4 md:mb-6">
                  <label className="block text-xs text-gray-400 mb-2 tracking-wider">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 focus:outline-none focus:border-gray-900 text-base font-light"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    PROPERTY DETAILS WILL BE SENT TO YOUR NUMBER
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 text-xs font-light hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND DETAILS'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;