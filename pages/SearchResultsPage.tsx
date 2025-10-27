import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import BackButton from '../components/ui/BackButton';
import { useProductModal } from './hooks/useProductModal';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, isLoading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { selectedProduct, animatingProductId, animationState, handleViewProduct, handleCloseModal } = useProductModal();

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.id.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 py-20 bg-red-50 rounded-md">{error}</div>;
    }

    if (filteredProducts.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
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
      );
    }
    
    return (
      <div className="text-center p-10 bg-mks-light-gray rounded-lg">
        <p className="text-xl text-mks-dark font-semibold">No products found.</p>
        <p className="text-mks-gray mt-2">
          We couldn't find any products matching your search for "{query}".<br />
          Try searching for something else or browse our <Link to="/products" className="text-mks-red hover:underline">product categories</Link>.
        </p>
      </div>
    );
  };

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
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-mks-red mb-2">Search Results</h1>
          {query ? (
            <p className="text-lg text-mks-gray">Showing results for: <span className="font-semibold text-mks-dark">"{query}"</span></p>
          ) : (
            <p className="text-lg text-mks-gray">Please enter a search term to find products.</p>
          )}
        </header>

        <main>
          {renderContent()}
        </main>
      </div>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default SearchResultsPage;