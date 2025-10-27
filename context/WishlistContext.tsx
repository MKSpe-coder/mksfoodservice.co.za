import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistState {
  wishlist: Product[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string } // payload is product id
  | { type: 'SET_WISHLIST'; payload: Product[] };

interface WishlistContextProps extends WishlistState {
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      // Avoid duplicates
      if (state.wishlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};

const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlist: [] });

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('mksWishlist');
      if (storedWishlist) {
        dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(storedWishlist) });
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mksWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addToWishlist = (item: Product) => dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  const removeFromWishlist = (id: string) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  const isInWishlist = (id: string) => state.wishlist.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ ...state, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export { WishlistProvider, useWishlist };
