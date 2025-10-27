import React, { useState } from 'react';
import { Product } from '../../types';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuantityInput from '../ui/QuantityInput';
import { IconHeart, IMAGE_PLACEHOLDER } from '../../constants';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { cart, addItem, updateItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [notifyState, setNotifyState] = useState<'idle' | 'notified'>('idle');
  
  if (!product) return null;
  
  const cartItem = cart.find(item => item.id === product.id);
  const isAvailable = product.inStock > 0;
  const isWishlisted = isInWishlist(product.id);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleAddToCart = () => {
    addItem(product);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
      if (cartItem) {
          updateItemQuantity(cartItem.id, newQuantity);
      }
  };

  const handleNotifyMe = () => {
    setNotifyState('notified');
    setTimeout(() => setNotifyState('idle'), 2000);
  };
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderActions = () => {
    if (!isAvailable) {
        return (
            <Button size="lg" variant="secondary" className="w-full" onClick={handleNotifyMe} disabled={notifyState === 'notified'}>
                {notifyState === 'notified' ? 'We\'ll Notify You!' : 'Notify Me When In Stock'}
            </Button>
        );
    }

    if (cartItem) {
        return (
            <div className="w-full flex justify-center">
                <QuantityInput
                    quantity={cartItem.quantity}
                    onDecrease={() => handleQuantityChange(cartItem.quantity - 1)}
                    onIncrease={() => handleQuantityChange(cartItem.quantity + 1)}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 0)}
                    min={0}
                />
            </div>
        );
    }

    return (
        <Button size="lg" className="w-full" onClick={handleAddToCart}>
            Add to Cart
        </Button>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-mks-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-mks-gray hover:text-mks-dark z-10 bg-white/70 rounded-full p-1"
          aria-label="Close product preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-mks-light-gray flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full h-auto w-auto object-contain"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-mks-dark">{product.name}</h2>
          <p className="text-sm text-mks-gray mt-1 mb-4">Product Code: #{product.id}</p>
          
          <div className="flex-grow space-y-4 text-mks-dark">
            <p className="leading-relaxed">{product.description || 'No description available for this product.'}</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-mks-gray/20">
             <div className="flex justify-between items-center mb-4">
               {/* Stock Status */}
               <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-mks-red'}`}>
                  {isAvailable ? `In Stock (${product.inStock} available)` : 'Out of Stock'}
                </span>
             </div>
              <div className="flex items-stretch gap-2">
                <div className="w-full">
                  {renderActions()}
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border rounded-md transition-colors duration-200 flex-shrink-0 ${isWishlisted ? 'border-mks-red text-mks-red bg-mks-red/10' : 'border-mks-gray/50 text-mks-gray hover:border-mks-red hover:text-mks-red'}`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <IconHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
          </div>
        </div>
      </div>
       {/* Adding simple keyframe animations to the head for modal effect */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;