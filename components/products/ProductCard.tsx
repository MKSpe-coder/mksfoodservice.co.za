

import React, { useState } from 'react';
import { Product } from '../../types';
import Card from '../ui/Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import QuantityInput from '../ui/QuantityInput';
import { IconHeart, IMAGE_PLACEHOLDER } from '../../constants';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  animationState?: 'idle' | 'opening' | 'closing';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, animationState = 'idle' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { cart, addItem, updateItemQuantity } = useCart();

  const [notifyState, setNotifyState] = useState<'idle' | 'notified'>('idle');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const cartItem = cart.find(item => item.id === product.id);
  const isWishlisted = isInWishlist(product.id);
  const isAvailable = product.inStock > 0;

  const handleCardClick = () => {
    // Parent now controls animation state, just notify it of the click.
    onView(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingWishlist(true);
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    // Reset animation trigger after it completes
    setTimeout(() => setIsTogglingWishlist(false), 300);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    addItem(product);
    // After adding, the component will re-render with the quantity input.
    // We'll reset the adding state in case the user removes it and wants to add again.
    setTimeout(() => setIsAddingToCart(false), 1500);
  };
  
  const handleQuantityChange = (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>, newQuantity: number) => {
    e.stopPropagation();
    if (newQuantity >= 0) {
      updateItemQuantity(product.id, newQuantity);
    }
  };

  const handleNotifyMe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifyState('notified');
    setTimeout(() => setNotifyState('idle'), 2000);
  };

  const renderActions = () => {
    if (!isAvailable) {
      return (
        <button
          onClick={handleNotifyMe}
          disabled={notifyState === 'notified'}
          className="w-full text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-150 bg-mks-gray text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-gray uppercase"
        >
          {notifyState === 'notified' ? 'We\'ll Notify You!' : 'Notify Me'}
        </button>
      );
    }

    if (cartItem) {
      return (
        <div className="w-full flex justify-center">
            <QuantityInput
                quantity={cartItem.quantity}
                onDecrease={(e) => handleQuantityChange(e, cartItem.quantity - 1)}
                onIncrease={(e) => handleQuantityChange(e, cartItem.quantity + 1)}
                onChange={(e) => handleQuantityChange(e, parseInt(e.target.value, 10) || 0)}
                min={0}
            />
        </div>
      );
    }
    
    return (
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className={`w-full text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isAddingToCart
            ? 'bg-green-500 text-white ring-green-500'
            : 'bg-white text-mks-navy border-2 border-mks-navy hover:bg-mks-navy hover:text-white ring-mks-navy'
        }`}
      >
        {isAddingToCart ? 'Added ✓' : 'Add to Cart'}
      </button>
    );
  };
  
  const animationClass =
    animationState === 'opening' ? 'card-is-flipping-open' :
    animationState === 'closing' ? 'card-is-flipping-close' : '';

  return (
    <>
      <style>{`
        @keyframes card-flip-open {
          0% {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: perspective(1000px) rotateY(90deg);
            opacity: 0;
          }
        }
        .card-is-flipping-open {
          transform-origin: center;
          animation: card-flip-open 0.5s ease-in forwards;
        }
        @keyframes card-flip-close {
          from {
            transform: perspective(1000px) rotateY(-90deg);
            opacity: 0;
          }
          to {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
        }
        .card-is-flipping-close {
          transform-origin: center;
          animation: card-flip-close 0.5s ease-out forwards;
        }
        @keyframes pop-in {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
        }
        .animate-pop-in {
            animation: pop-in 0.3s ease-out;
        }
      `}</style>
      <Card 
          className={`flex flex-col h-full group transition-shadow duration-300 hover:shadow-xl ${animationClass}`}
          onClick={handleCardClick}
      >
        <div className="relative overflow-hidden h-48 flex items-center justify-center bg-mks-light-gray/50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            width="200"
            height="200"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
          />
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-1.5 bg-white/70 rounded-full transition-colors duration-200 hover:bg-white ${isWishlisted ? 'text-mks-red' : 'text-mks-gray'}`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <IconHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''} ${isTogglingWishlist ? 'animate-pop-in' : ''}`} />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-md font-semibold text-mks-dark group-hover:text-mks-red transition-colors uppercase">{product.name}</h3>
            <p className="text-xs text-mks-gray mt-1 uppercase">#{product.id}</p>
          </div>
          <div className="mt-auto pt-2 space-y-2">
              <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-mks-red'}`}>
                      {isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
              </div>
              {renderActions()}
          </div>
        </div>
      </Card>
    </>
  );
};

export default React.memo(ProductCard);