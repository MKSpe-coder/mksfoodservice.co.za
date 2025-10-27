import { useState, useCallback } from 'react';
import { Product } from '../../types';

export const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [animatingProductId, setAnimatingProductId] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'opening' | 'closing'>('idle');

  const handleViewProduct = useCallback((product: Product) => {
    setAnimatingProductId(product.id);
    setAnimationState('opening');

    // Open modal halfway through animation
    setTimeout(() => {
        setSelectedProduct(product);
    }, 250);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (selectedProduct) {
        setAnimatingProductId(selectedProduct.id);
        setAnimationState('closing');
        setSelectedProduct(null); // Close modal immediately

        // Reset animation state after it finishes
        setTimeout(() => {
            setAnimatingProductId(null);
            setAnimationState('idle');
        }, 500);
    } else {
         // Handle case where modal might be closed without a product selected (e.g., ESC key in future)
        setSelectedProduct(null);
        setAnimatingProductId(null);
        setAnimationState('idle');
    }
  }, [selectedProduct]);

  return {
    selectedProduct,
    animatingProductId,
    animationState,
    handleViewProduct,
    handleCloseModal,
  };
};