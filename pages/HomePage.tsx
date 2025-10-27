import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import { Product } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import { IconJohannesburg, IconCapeTown, IconDurban, IconZambia, IconPortElizabeth, IMAGE_PLACEHOLDER } from '../constants';
import { useProductModal } from './hooks/useProductModal';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';


const angledPanelsData = [
  {
    title: 'Kitchenware',
    images: [
      'https://i.postimg.cc/NFLqdyny/1755615268422-1.png',
      'https://i.postimg.cc/Dwj9btgp/82338e6a-7267-48f4-b9cd-78345e7ddce0.jpg'
    ]
  },
  {
    title: 'Beverage & Refrigeration',
    images: [
      'https://i.postimg.cc/fRfDSmcV/20250614-1020-Ice-Cooled-Blue-Can-remix-01jxpranxde3htf5pr04ymypp7.png',
      'https://i.postimg.cc/NF70jmFk/8e3efd2ff5858e1559f2a2a2c59d5a7a-1.jpg',
      'https://i.postimg.cc/Y9ZT4Cjn/20250716-1051-Sleek-Industrial-Refrigerator-remix-01k096spp9ega9n1rbdwdng3wf-Copy.png',
      'https://i.postimg.cc/vBD85Th5/20250821-1409-Soft-Serve-Machine-remix-01k368d5wzf1cah7k2zhj0av7h.png'
    ]
  },
  {
    title: 'Pitco',
    images: [
      'https://i.postimg.cc/VLfTLWKj/pitco.jpg'
    ]
  },
  {
    title: 'Cooking Equipment',
    images: [
      'https://i.postimg.cc/wTqTKfM2/Photo-arrangement-with-chicken-food-on-w.jpg',
      'https://i.postimg.cc/sgMSpDpt/20250821-1432-Commercial-Pressure-Fryer-remix-01k369rq3re2r9rfwh0c33qwe2.png'
    ]
  },
  {
    title: 'Oven Equipment',
    images: [
      'https://i.postimg.cc/4dJ89tpt/HOUNO-AMBIENTE-072-scaled-752x519.jpg',
      'https://i.postimg.cc/1zdhdBTW/Invoq-7-RACKS-Filled-03.jpg'
    ]
  },
  {
    title: 'Holding Solutions',
    images: [
      'https://i.postimg.cc/qR0rHkLk/20250829-1242-Fried-Chicken-Holder-remix-01k3tpjpm2ekyah63cabc9gfg9.png'
    ]
  }
];

const HomePage: React.FC = () => {
  const { products, isLoading, error } = useProducts();
  const { productCategories, whyChooseUs, promotions, brandPartners, services } = mksData;
  const mainPromotion = (promotions && promotions.length > 0) ? promotions[0] : null;

  const [currentImageIndices, setCurrentImageIndices] = useState(angledPanelsData.map(() => 0));
  const { selectedProduct, animatingProductId, animationState, handleViewProduct, handleCloseModal } = useProductModal();


  const featuredProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    const hounoProducts = products.filter(p => p.brandName === 'Houno').slice(0, 4);
    const pitcoProducts = products.filter(p => p.brandName === 'Pitco').slice(0, 3);
    const otherProducts = products.filter(p => 
        p.brandName !== 'Houno' &&
        p.brandName !== 'Pitco' &&
        p.id !== 'INH1100' && // Explicitly exclude the product user mentioned
        p.id !== 'BBH1040' // Keep original exclusion
    ).slice(0, 1);
    return [...hounoProducts, ...pitcoProducts, ...otherProducts];
  }, [products]);
  
  const locations = [
    { name: 'Johannesburg', Icon: IconJohannesburg, href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Johannesburg' },
    { name: 'Cape Town', Icon: IconCapeTown, href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Cape+Town' },
    { name: 'Port Elizabeth', Icon: IconPortElizabeth, href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Port+Elizabeth' },
    { name: 'Durban', Icon: IconDurban, href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Durban' },
    { name: 'Zambia', Icon: IconZambia, href: '/contact' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndices(prevIndices => 
        prevIndices.map((index, panelIndex) => (index + 1) % angledPanelsData[panelIndex].images.length)
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-mks-white">
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            opacity: 0;
            animation: fadeInUp 0.5s ease-out forwards;
          }

          /* Custom scrollbar hiding */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          
          /* Logo Marquee Styles */
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee {
            overflow: hidden;
            position: relative;
            -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
            mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
          }
          .marquee-content {
            display: flex;
            animation: scroll 30s linear infinite;
          }
          .marquee:hover .marquee-content {
            animation-play-state: paused;
          }
          .marquee-item {
            flex-shrink: 0;
            padding: 0 2.5rem; /* 40px */
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .marquee-item img {
            height: 60px;
            width: auto;
            max-width: 150px;
            filter: grayscale(100%);
            opacity: 0.6;
            transition: all 0.3s ease-in-out;
          }
          .marquee-item:hover img {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.1);
          }
          
          /* Angled Panel Styles */
          .angled-pane-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          .angled-pane { /* This is the wrapper now */
            border-radius: 20px;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
          }
          .angled-pane:hover {
            transform: scale(1.05) translateY(-10px);
            filter: drop-shadow(0 20px 25px rgba(43, 45, 66, 0.25));
          }
          .angled-pane .image-container { /* Target the inner div */
              transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease;
          }
          .angled-pane:hover .image-container {
              transform: scale(1.1); /* Zoom image inside on hover */
              filter: blur(2px);
          }
          .angled-pane-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(20, 20, 30, 0.85) 0%, transparent 50%);
            opacity: 1; /* Always visible */
            display: flex;
            align-items: flex-end;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-align: center;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
            transition: opacity 0.3s ease;
            padding: 1.5rem 2.5rem;
            font-size: 1.1rem;
            line-height: 1.3;
          }

          @media (max-width: 768px) {
            .angled-pane-container {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            .angled-pane-overlay {
              background: linear-gradient(to top, rgba(20, 20, 30, 0.8) 0%, transparent 60%);
            }
          }
        `}</style>
        
        {/* New Banner Image */}
        <section className="bg-white">
          <img 
              src='https://i.postimg.cc/mDhmydqF/Google-AI-Studio-2025-08-18-T19-23-54-541-Z.png' 
              alt='MKS promotional banner' 
              className="w-full h-auto"
              loading="eager"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
          />
        </section>
        
        {/* Scrolling Text Divider */}
        <section className="bg-mks-dark text-mks-white py-3 overflow-hidden">
          <div className="marquee">
            <div className="marquee-content" style={{ animationDuration: '25s' }}>
              <span className="text-md font-semibold px-8 whitespace-nowrap">Welcome to MASTER KITCHEN SOLUTION – Leaders in Commercial Catering Equipment | Innovation • Quality • Reliability | Serving Nationwide & Across Borders | Your Partner in Professional Kitchen Solutions</span>
              <span className="text-md font-semibold px-8 whitespace-nowrap" aria-hidden="true">Welcome to MASTER KITCHEN SOLUTION – Leaders in Commercial Catering Equipment | Innovation • Quality • Reliability | Serving Nationwide & Across Borders | Your Partner in Professional Kitchen Solutions</span>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="w-full">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
              <iframe 
                  allow="fullscreen; autoplay" 
                  allowFullScreen 
                  height="100%" 
                  src="https://streamable.com/e/373xl3?autoplay=1&muted=1" 
                  width="100%" 
                  style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
                  title="MKS Foodservice Showcase Video"
              ></iframe>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 bg-white">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <img 
                src="https://i.postimg.cc/RFcdLXzM/ace0699c4445717bfbdab64319876c4d-1.png" 
                alt="Chef in a professional kitchen" 
                className="w-full h-auto object-cover"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
              />
            </div>
            <div className="animate-fadeInUp p-8 md:p-12 lg:p-16" style={{ animationDelay: '200ms' }}>
              <h3 className="text-md font-bold text-mks-red uppercase tracking-widest mb-2">Welcome To MASTER KITCHEN SOLUTION</h3>
              <h2 className="text-4xl font-bold text-mks-dark mb-4">
                Your Partner in Culinary Excellence
              </h2>
              <p className="text-mks-gray mb-6 leading-relaxed" style={{ fontSize: '21px' }}>
                Welcome to MASTER KITCHEN SOLUTION (MKS) – your trusted partner in professional culinary innovation and excellence. At MKS, we are passionate about transforming kitchens into spaces of efficiency, creativity, and reliability. With a commitment to delivering world-class catering equipment, tailored solutions, and unmatched customer support, we empower chefs, restaurants, and foodservice businesses to reach their full potential. Whether you are starting fresh, upgrading, or expanding, MASTER KITCHEN SOLUTION is here to provide the expertise, technology, and service you need to create culinary success. Leading independent Commercial Catering Equipment distributor in South Africa since 2019 and a Proud Level 1 B-BBEE Contributor. We provide top-tier commercial catering equipment, backed by expert service and a commitment to your success.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Core Services Section */}
        <section className="py-20 bg-mks-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-mks-dark">Our Core Services</h2>
              <p className="mt-2 text-lg text-mks-gray">Comprehensive solutions to build and maintain your perfect kitchen.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.slice(0, 4).map((service, index) => (
                <div key={service.id} className="animate-fadeInUp" style={{ animationDelay: `${100 + index * 100}ms` }}>
                  <Link to="/services" className="block text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className="flex justify-center items-center h-20 w-20 mx-auto mb-4 bg-mks-light-gray rounded-full shadow-inner">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-mks-dark mb-2 group-hover:text-mks-red">{service.name}</h3>
                    <p className="text-mks-gray text-sm">{service.description}</p>
                  </Link>
                </div>
              ))}
            </div>
             <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                <Link to="/services">
                    <Button variant="primary" size="lg">Explore All Services</Button>
                </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Upgraded */}
        <section 
          className="relative py-20 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://i.postimg.cc/Sx6tChc7/south-africa-flag-with-brush-paint-style-and-halftone-effect-south-africa-flag-background-with-grung.jpg')" }}
        >
          <div className="absolute inset-0 bg-mks-dark/80 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <h2 className="text-4xl font-bold text-white">Why Choose MKS?</h2>
              <p className="mt-3 text-lg text-mks-light-gray max-w-2xl mx-auto">Your trusted partner in commercial catering solutions, delivering excellence every step of the way.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => {
                const IconComponent = item.icon as React.FC<{className?: string}>;
                
                return (
                  <div 
                    key={item.title} 
                    className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border-2 border-blue-900 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp"
                    style={{ animationDelay: `${200 + index * 150}ms` }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border-2 border-white/30">
                        {typeof item.icon === 'string' ? (
                          <img 
                            src={item.icon} 
                            alt={item.title}
                            className="w-12 h-12 object-contain"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                          />
                        ) : (
                          <IconComponent className="w-10 h-10 text-mks-red" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-mks-light-gray leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Driven by Excellence Panels Section */}
        <section className="py-20 bg-mks-light-gray">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center mb-16 animate-fadeInUp border-2 border-blue-900">
                    <h2 className="text-4xl font-extrabold text-mks-dark">Driven by Excellence</h2>
                    <div className="mt-4 h-1.5 w-24 bg-mks-red mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-mks-gray max-w-3xl mx-auto">
                        We provide state-of-the-art equipment and unwavering support to help your business thrive in a competitive landscape.
                    </p>
                </div>
                
                <div className="angled-pane-container animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                {angledPanelsData.map((panel, panelIndex) => (
                    <div key={panel.title} className="relative overflow-hidden group angled-pane h-80 md:h-96">
                        <div className="relative w-full h-full bg-mks-dark image-container">
                            {panel.images.map((imageSrc, imageIndex) => (
                                <img
                                    key={imageSrc}
                                    src={imageSrc}
                                    alt={`Image for ${panel.title}`}
                                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentImageIndices[panelIndex] === imageIndex ? 'opacity-100' : 'opacity-0'} ${panel.title === 'Oven Equipment' ? 'object-cover scale-[1.2]' : 'object-cover'}`}
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                                />
                            ))}
                        </div>
                        <div className="angled-pane-overlay">{panel.title}</div>
                    </div>
                ))}
                </div>
            </div>
        </section>

        {/* Product Categories Section - UPGRADED */}
        <section className="py-16 bg-mks-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-mks-dark">Shop By Category</h2>
              <p className="mt-2 text-lg text-mks-gray">Find exactly what you need from our comprehensive range.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(productCategories && productCategories.length > 0) ? productCategories.map((category, index) => (
                  <div key={category.id} className="animate-fadeInUp" style={{ animationDelay: `${100 + index * 100}ms` }}>
                      <Link
                          to={`/products?category=${category.id}`}
                          className="block rounded-lg overflow-hidden group bg-white text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                          <div className="h-48 p-4 flex items-center justify-center overflow-hidden">
                              <img
                                  src={category.imageUrl}
                                  alt={category.name}
                                  className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                                  loading="lazy"
                                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                              />
                          </div>
                          <div className="p-4 border-t border-mks-light-gray">
                              <h3 className="text-md font-semibold text-mks-dark group-hover:text-mks-red transition-colors">{category.name}</h3>
                          </div>
                      </Link>
                  </div>
                )) : (
                  <p className="col-span-full text-center text-mks-gray">Product categories are not available at this time.</p>
                )}
            </div>
          </div>
        </section>
        
        {/* Brand Partners Marquee */}
        <section className="py-16 bg-mks-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-mks-dark">Our Brand Partners</h2>
               <p className="mt-4 text-lg text-mks-gray">Proudly working with industry-leading brands, including our featured partner:</p>
                <div className="mt-6 flex justify-center">
                  <Link to="/brand/pitco" className="inline-block p-2 rounded-md transition-all hover:bg-mks-light-gray">
                    <img 
                      src="https://i.postimg.cc/ryR4k3mY/pitco-logo-1.png" 
                      alt="Pitco Logo"
                      className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                    />
                  </Link>
                </div>
            </div>
            {(brandPartners && brandPartners.length > 0) && (
              <div className="marquee">
                <div className="marquee-content">
                  <div className="flex flex-shrink-0 items-center">
                    {brandPartners.map(brand => (
                      <div key={brand.name} className="marquee-item">
                        <Link to={brand.path || `/brands`} title={brand.name}>
                          <img 
                            src={brand.logoUrl} 
                            alt={brand.name}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                    {brandPartners.map(brand => (
                      <div key={`${brand.name}-clone`} className="marquee-item">
                        <Link to={brand.path || `/brands`} title={brand.name}>
                          <img 
                            src={brand.logoUrl} 
                            alt={brand.name}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-mks-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-mks-dark">Featured Products</h2>
              <p className="mt-2 text-lg text-mks-gray">A selection of our top-quality equipment.</p>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fadeInUp" style={{ animationDelay: `${100 + index * 50}ms` }}>
                    <ProductCard 
                      product={product} 
                      onView={handleViewProduct} 
                      animationState={animatingProductId === product.id ? animationState : 'idle'}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link to="/products">
                <Button variant="primary" size="lg">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Nationwide Presence Section */}
        <section 
          className="relative py-20 bg-gradient-to-r from-mks-dark via-mks-navy to-white"
        >
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fadeInUp">
              <h2 className="text-4xl font-bold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">Serving You Nationwide & Beyond</h2>
              <p className="mt-3 text-lg text-mks-light-gray max-w-2xl mx-auto [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
                With branches in major hubs, we provide expert service and support across Southern Africa.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8">
              {locations.map((loc, index) => (
                 <a 
                  key={loc.name} 
                  href={loc.href}
                  target={loc.href.startsWith('http') ? '_blank' : '_self'} 
                  rel="noopener noreferrer" 
                  className="block animate-fadeInUp"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 h-full transition-all duration-300 hover:bg-white/20 hover:-translate-y-2">
                    <loc.Icon className="w-12 h-12 mx-auto text-mks-red" />
                    <h3 className="mt-4 text-xl font-semibold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">{loc.name}</h3>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
              <Link to="/contact">
                <Button variant="primary" size="lg" className="transform hover:scale-105">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>

        {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default HomePage;