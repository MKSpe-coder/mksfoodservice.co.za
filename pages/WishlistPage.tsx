import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import Button from '../components/ui/Button';
import BackButton from '../components/ui/BackButton';
import { IconHeart, IconTrash, IMAGE_PLACEHOLDER } from '../constants';

const WishlistItem: React.FC<{ product: Product }> = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addItem, cart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 1500);
  };
  
  return (
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-24 h-24 object-contain rounded-md bg-mks-light-gray flex-shrink-0"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
          />
          <div className="flex-grow">
              <p className="font-semibold text-mks-dark">{product.name}</p>
              <p className="text-xs text-mks-gray">#{product.id}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleAddToCart}
                disabled={isInCart || isAdded}
              >
                  {isInCart ? 'In Cart' : (isAdded ? 'Added!' : 'Add to Cart')}
              </Button>
              <button onClick={() => removeFromWishlist(product.id)} className="text-mks-gray hover:text-mks-red transition-colors" aria-label="Remove from wishlist">
                  <IconTrash className="w-5 h-5" />
              </button>
          </div>
      </div>
  );
};


const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <div className="text-center py-16 bg-white rounded-lg shadow-md mt-4">
          <IconHeart className="w-16 h-16 mx-auto text-mks-gray/50" />
          <h1 className="text-3xl font-bold text-mks-dark mt-4 mb-2">Your Wishlist is Empty</h1>
          <p className="text-mks-gray mb-6">Explore our products and save your favorites here for later.</p>
          <Link to="/products">
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mks-light-gray min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BackButton />
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-mks-dark">My Wishlist ({wishlist.length})</h1>
                <p className="text-mks-gray mt-1">Here are the products you've saved for later.</p>
            </header>

            <main className="w-full space-y-4">
                {wishlist.map(product => (
                    <WishlistItem key={product.id} product={product} />
                ))}
            </main>
        </div>
    </div>
  );
};

export default WishlistPage;