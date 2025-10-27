import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import { ProductCategory, Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import { useProductModal } from './hooks/useProductModal';
import KitchenwareShowcase from '../components/products/KitchenwareShowcase';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { selectedProduct, animatingProductId, animationState, handleViewProduct, handleCloseModal } = useProductModal();
  const { productCategories } = mksData;

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      const foundCategory = productCategories.find(cat => cat.id === categoryId);
      setSelectedCategory(foundCategory || null);
      setFilteredProducts(products.filter(p => p.categoryId === categoryId));
    } else {
      setSelectedCategory(null);
      setFilteredProducts(products);
    }
    // Scroll to top on category change
    window.scrollTo(0, 0);
  }, [searchParams, productCategories, products]);

  const renderKitchenwareProducts = () => {
    const subCategoryOrder: NonNullable<Product['subCategory']>[] = ['Utensils', 'Containers & Storage', 'Tools & Gadgets', 'Baskets & Racks'];
    
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const subCat = product.subCategory || 'Other';
        if (!acc[subCat]) {
            acc[subCat] = [];
        }
        acc[subCat].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const allCategories = [...subCategoryOrder.filter(cat => groupedProducts[cat]), ...('Other' in groupedProducts ? ['Other'] : [])];
    
    let productIndex = 0;

    return (
        <div>
            {allCategories.map(subCategory => (
                <div 
                    key={subCategory} 
                    id={subCategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')} 
                    className="mb-12 scroll-mt-40"
                >
                    <h3 className="text-2xl font-bold text-mks-dark mb-4 border-b-2 pb-2 border-mks-red">{subCategory}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProducts[subCategory].map(product => {
                            const delay = `${productIndex * 50}ms`;
                            productIndex++;
                            return (
                                <div
                                    key={product.id}
                                    className="animate-cardFadeInUp"
                                    style={{ animationDelay: delay }}
                                >
                                    <ProductCard 
                                      product={product} 
                                      onView={handleViewProduct}
                                      animationState={animatingProductId === product.id ? animationState : 'idle'}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
  };

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

    if (selectedCategory?.id === 'smalls_kfc') {
      return renderKitchenwareProducts();
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          opacity: 0; /* Start hidden for animation */
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-mks-red mb-2">Our Products</h1>
          <p className="text-lg text-mks-dark">Explore our wide range of quality commercial equipment and supplies.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Categories */}
          <aside className="md:w-1/4">
            <h2 className="text-xl font-semibold mb-4 text-mks-dark border-b pb-2 border-mks-gray/30">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products"
                  className={`block p-2 rounded-md hover:bg-mks-light-gray ${!selectedCategory ? 'bg-mks-red text-white font-semibold' : 'text-mks-dark hover:text-mks-red'}`}
                >
                  All Products
                </Link>
              </li>
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className={`block p-2 rounded-md hover:bg-mks-light-gray ${selectedCategory?.id === cat.id ? 'bg-mks-red text-white font-semibold' : 'text-mks-dark hover:text-mks-red'}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content Area */}
          <main key={selectedCategory?.id || 'all'} className="md:w-3/4">
            <div className="mb-6">
                <h2 className="text-3xl font-semibold text-mks-dark">{selectedCategory ? selectedCategory.name : 'All Products'}</h2>
                <p className="text-mks-dark mt-1 whitespace-pre-line">{selectedCategory ? selectedCategory.description : 'Browse our extensive product catalog.'}</p>
            </div>
            
            {selectedCategory?.id === 'smalls_kfc' && <KitchenwareShowcase />}
            
            {selectedCategory?.id === 'mks_spares' && (
              <div className="bg-mks-light-gray p-6 rounded-lg mb-8 text-center border-2 border-mks-red/50">
                <h3 className="text-xl font-semibold text-mks-dark mb-3">Looking for MKS-SMT20 Bun Toaster Parts?</h3>
                <p className="text-mks-gray mb-4">Find specific spare parts for the MKS Bun Toaster on our dedicated spares page.</p>
                <Link to="/products/mks-spares">
                    <Button variant="primary">View Toaster Spares</Button>
                </Link>
              </div>
            )}
            
            {renderContent()}

          </main>
        </div>
      </div>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default ProductsPage;