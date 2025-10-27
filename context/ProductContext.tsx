import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product } from '../types';
import { productList as serverProductList } from '../data/products'; // Simulate fetching

interface ProductContextState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextState | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      setError(null);
      // Simulate API call
      setTimeout(() => {
        try {
          // In a real app, this would be:
          // const response = await fetch('/api/products');
          // const data = await response.json();
          // setProducts(data);
          setProducts(serverProductList);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load products. Please try again later.');
          setIsLoading(false);
          console.error(err);
        }
      }, 1500); // Simulate 1.5 second network delay
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextState => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
