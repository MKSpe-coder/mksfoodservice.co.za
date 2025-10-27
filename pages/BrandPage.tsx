import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import { BrandPartner, Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import BackButton from '../components/ui/BackButton';
import { useProductModal } from './hooks/useProductModal';
import { antunesSpares } from '../data/antunesSpares';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { IMAGE_PLACEHOLDER } from '../constants';

const BrandPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const { products: allProducts, isLoading, error } = useProducts();
  const [brand, setBrand] = useState<BrandPartner | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { selectedProduct, animatingProductId, animationState, handleViewProduct, handleCloseModal } = useProductModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (brandId && mksData.brandPartners) {
      const foundBrand = mksData.brandPartners.find(b => b.name.toLowerCase() === brandId.toLowerCase());
      if (foundBrand) {
        setBrand(foundBrand);
        // Use the new, more reliable brandName property for filtering
        const brandProducts = allProducts.filter(p => 
          p.brandName?.toLowerCase() === foundBrand.name.toLowerCase()
        );
        setProducts(brandProducts);
      } else {
        setBrand(null);
        setProducts([]);
      }
    }
  }, [brandId, allProducts]);
  
  const slides = brand?.page?.imageSlides || [];

  const nextSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrentSlide(current => (current === slides.length - 1 ? 0 : current + 1));
    }
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide(current => (current === 0 ? slides.length - 1 : current - 1));
    }
  };

  useEffect(() => {
    if (slides.length > 1) {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }
  }, [slides.length, nextSlide]);


  if (!brand) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <BackButton />
        <h1 className="text-3xl font-bold text-mks-red">Brand Not Found</h1>
        <p className="text-mks-gray mt-4">The brand you are looking for does not exist. Please check the URL or return to the <Link to="/" className="text-mks-red hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-cardFadeInUp {
          animation: cardFadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <header className="mb-10 p-6 bg-mks-light-gray rounded-lg flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {(brand.page?.logoUrl || brand.logoUrl) && (
              <img 
                src={brand.page?.logoUrl || brand.logoUrl} 
                alt={`${brand.name} Logo`} 
                className="h-20 w-auto object-contain flex-shrink-0"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-mks-dark mb-2">{brand.name}</h1>
              {brand.page?.description ? (
                  <p className="text-lg text-mks-gray">{brand.page.description}</p>
              ) : (
                  <p className="text-lg text-mks-gray">Explore our collection of products from {brand.name}.</p>
              )}
            </div>
          </div>
          
          {brand.page?.videoUrl && (
            <div className="mt-4 w-full max-w-4xl mx-auto aspect-video">
                <iframe
                    src={brand.page.videoUrl}
                    title={`${brand.name} Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
                    loading="lazy"
                ></iframe>
            </div>
          )}
        </header>
        
        <main>
          {brand.name.toLowerCase() === 'pitco' ? (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center text-mks-dark mb-8">Product Showcase</h2>
              <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
                <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
                  <iframe 
                    allow="fullscreen;autoplay" 
                    allowFullScreen 
                    height="100%" 
                    src="https://streamable.com/e/mwc3ag?autoplay=1" 
                    width="100%" 
                    style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
                    title="Pitco Product Showcase Video"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </section>
          ) : brand.name.toLowerCase() === 'desmon' && slides.length > 0 ? (
             <section className="mb-12">
                <h2 className="text-3xl font-bold text-center text-mks-dark mb-8">Product Showcase</h2>
                <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-xl bg-white">
                    <div className="relative h-72 flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, i) => (
                            <img 
                                key={i} src={slide} 
                                alt={`${brand.name} product showcase ${i + 1}`} 
                                className="w-full h-full object-contain flex-shrink-0"
                                loading={i === 0 ? 'eager' : 'lazy'}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                            />
                        ))}
                    </div>
                    {slides.length > 1 && (
                        <>
                            <button onClick={prevSlide} aria-label="Previous slide" className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none z-10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextSlide} aria-label="Next slide" className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none z-10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {slides.map((_, i) => (
                                    <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i + 1}`} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === i ? 'bg-white ring-2 ring-white/50' : 'bg-white/50'}`}></button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
          ) : slides.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center text-mks-dark mb-8">Product Showcase</h2>
              <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl bg-white">
                <div className="relative h-[400px] flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map((slide, i) => (
                    <img 
                      key={i} src={slide} 
                      alt={`${brand.name} product showcase ${i + 1}`} 
                      className="w-full h-full object-contain flex-shrink-0"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                    />
                  ))}
                </div>

                {slides.length > 1 && (
                  <>
                    <button onClick={prevSlide} aria-label="Previous slide" className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none z-10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextSlide} aria-label="Next slide" className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none z-10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {slides.map((_, i) => (
                            <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i + 1}`} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === i ? 'bg-white ring-2 ring-white/50' : 'bg-white/50'}`}></button>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {brand.page?.additionalContent && (
            <section className="my-12 max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-mks-dark mb-4">{brand.page.additionalContent.heading}</h3>
              <div className="space-y-4 text-mks-gray leading-relaxed">
                {brand.page.additionalContent.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {brand.page?.bannerImageUrl && (
            <section className="my-12">
              <img 
                src={brand.page.bannerImageUrl} 
                alt={`${brand.name} Promotion`}
                className="w-full rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
              />
            </section>
          )}

          <section>
            <h2 className="text-3xl font-bold text-center text-mks-dark mb-8">Products from {brand.name}</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-48"><LoadingSpinner /></div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-cardFadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard 
                      product={product} 
                      onView={handleViewProduct} 
                      animationState={animatingProductId === product.id ? animationState : 'idle'}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <p className="text-mks-gray">
                  We do not currently have specific products from {brand.name} listed online.
                  For inquiries, please <Link to="/contact" className="text-mks-red hover:underline">contact us</Link> for assistance.
                </p>
              </div>
            )}
          </section>

          {brand.name.toLowerCase() === 'antunes' && (
            <section className="mt-16">
                <h2 className="text-3xl font-bold text-center text-mks-dark mb-8">Antunes Spare Parts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {antunesSpares.map(part => (
                        <Card key={part.id} className="flex flex-col text-center">
                            <div className="relative h-48 flex items-center justify-center p-4 bg-white">
                                <img
                                    src={part.imageUrl}
                                    alt={part.name}
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                                />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-semibold text-mks-dark uppercase">{part.name}</h3>
                                <p className="text-xs text-mks-gray mt-1 mb-2 uppercase">Part #: {part.id}</p>
                                <p className="text-sm text-mks-gray flex-grow">{part.description}</p>
                                <div className="mt-4">
                                        <Link to="/contact">
                                        <Button variant="outline" size="sm" className="w-full">Request Info</Button>
                                        </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-mks-gray">Can't find the Antunes part you're looking for?</p>
                    <Link to="/contact">
                        <Button variant="primary" className="mt-2">Contact Us</Button>
                    </Link>
                </div>
            </section>
          )}

        </main>
      </div>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default BrandPage;