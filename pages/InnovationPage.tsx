import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import { Product } from '../types';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import { IconQuality, IconTag, IconShieldCheck, IMAGE_PLACEHOLDER } from '../constants';
import { useProductModal } from './hooks/useProductModal';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const InnovationPage: React.FC = () => {
    const { products, isLoading, error } = useProducts();
    const innovationBrand = mksData.brandPartners?.find(b => b.name === 'MKS Innovation');
    const innovationProducts = React.useMemo(() => {
        return products.filter(p => p.brandName === 'MKS Innovation');
    }, [products]);
    const { selectedProduct, animatingProductId, animationState, handleViewProduct, handleCloseModal } = useProductModal();

    if (!innovationBrand || !innovationBrand.page) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <BackButton />
                <h1 className="text-3xl font-bold text-mks-red">Content Not Found</h1>
                <p className="text-mks-gray mt-4">Information for MKS Innovation is currently unavailable.</p>
            </div>
        );
    }
    
    const { logoUrl, description, imageSlides = [] } = innovationBrand.page;
    
    const pillars = [
        { icon: <IconQuality className="w-10 h-10 text-mks-red" />, title: 'Uncompromising Quality', description: 'Our products are built with high-grade materials and rigorous testing to ensure durability and performance in demanding kitchen environments.' },
        { icon: <IconTag className="w-10 h-10 text-mks-red" />, title: 'Exceptional Value', description: 'We deliver professional-grade equipment at competitive prices, providing an excellent return on investment without sacrificing quality.' },
        { icon: <IconShieldCheck className="w-10 h-10 text-mks-red" />, title: 'Proven Reliability', description: 'Engineered for consistency and longevity, MKS Innovation products are trusted by chefs to perform day in and day out.' }
    ];

    const galleryCaptions = ['Air Curtain', 'Fryer Basket', 'Insert Pan', 'Filter Pad'];

    return (
        <>
            <div className="bg-mks-white">
                {/* Hero Section */}
                <section
                    className="relative py-24 md:py-32 bg-cover bg-center text-white"
                    style={{ backgroundImage: "url('https://i.postimg.cc/HxgVP3CD/20250826-1259-Commercial-Fryer-Innovation-remix-01k3k0c6v6fpmsq4egbpw7jwq0.png')" }}
                >
                    <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                        {logoUrl && <img src={logoUrl} alt="MKS Innovation Brand Logo" className="h-24 mb-4" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }} />}
                        <h1 className="text-4xl md:text-5xl font-bold">MKS Innovation</h1>
                        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto">Quality, Value, and Reliability by Design.</p>
                    </div>
                </section>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <BackButton />

                    {/* About Section */}
                    <section className="my-8 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-mks-dark mb-4">Engineered for the Modern Kitchen</h2>
                        <p className="text-lg text-mks-gray leading-relaxed">{description}</p>
                    </section>

                    {/* Pillars Section */}
                    <section className="my-16 grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar, index) => (
                            <div key={index} className="text-center p-6 bg-mks-light-gray rounded-lg shadow-sm">
                                <div className="flex justify-center items-center h-20 w-20 mx-auto mb-4 bg-white rounded-full shadow-md">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-mks-dark mb-2">{pillar.title}</h3>
                                <p className="text-mks-dark/80 text-sm">{pillar.description}</p>
                            </div>
                        ))}
                    </section>

                    {/* Product Showcase Gallery */}
                    {imageSlides.length > 0 && (
                        <section className="my-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-mks-dark">Product Showcase</h2>
                                <p className="mt-2 text-lg text-mks-gray">A glimpse into our innovative product line.</p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {imageSlides.map((src, index) => (
                                    <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                                        <img 
                                            src={src} 
                                            alt={galleryCaptions[index] || 'MKS Innovation Product'} 
                                            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">{galleryCaptions[index]}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Featured Products Section */}
                    <section className="my-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-mks-dark">Our Products</h2>
                            <p className="mt-2 text-lg text-mks-gray">Explore our range of MKS Innovation equipment.</p>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-48"><LoadingSpinner /></div>
                        ) : error ? (
                            <div className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</div>
                        ) : innovationProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {innovationProducts.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onView={handleViewProduct} 
                                        animationState={animatingProductId === product.id ? animationState : 'idle'}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-mks-gray">No MKS Innovation products are currently listed.</p>
                        )}
                    </section>
                    
                    {/* CTA Section */}
                    <section className="my-16 text-center bg-mks-dark text-white p-12 rounded-lg">
                        <h2 className="text-3xl font-bold mb-4">Equip Your Kitchen with MKS Innovation</h2>
                        <p className="max-w-2xl mx-auto text-mks-light-gray mb-8">
                            Experience the perfect blend of performance and value. Contact our team to learn more about our products and get a personalized quote.
                        </p>
                        <Link to="/contact">
                            <Button variant="primary" size="lg" className="transform hover:scale-105">
                                Contact Sales
                            </Button>
                        </Link>
                    </section>
                </div>
            </div>
            <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
        </>
    );
};

export default InnovationPage;