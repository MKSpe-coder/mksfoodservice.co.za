import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NavLinkItem, ContactInfo } from '../../types';
import { IconPhone, IconSearch, IconUser, IconCart, IconChevronDown, IconHeart, IMAGE_PLACEHOLDER } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface HeaderProps {
  companyName: string;
  navLinks: NavLinkItem[];
  contactInfo: ContactInfo;
}

const Header: React.FC<HeaderProps> = ({ companyName, navLinks, contactInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setOpenDropdown(null);
        }
        if (phoneRef.current && !phoneRef.current.contains(event.target as Node)) {
            setPhoneDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear input after search
      setMobileMenuOpen(false); // Close mobile menu on search
    }
  };

  const activeLinkStyle = "text-mks-red";
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `relative py-2 px-3 text-base font-bold transition-colors duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mks-red ${isActive ? activeLinkStyle : 'hover:text-mks-red'}`;

  return (
    <header className="bg-mks-white sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-mks-dark text-mks-light-gray text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:flex items-center font-semibold">Innovating Tomorrow, Today.</span>
            <div ref={phoneRef} className="relative">
              <button
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                className="flex items-center hover:text-mks-red rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-mks-red focus:ring-offset-mks-dark"
                aria-haspopup="true"
                aria-expanded={phoneDropdownOpen}
              >
                <IconPhone className="w-4 h-4 mr-1" />
                <span>Contact Us</span>
                <IconChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${phoneDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {phoneDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-mks-dark shadow-lg rounded-md py-1 z-20 border border-mks-gray/50">
                  {contactInfo.phone.map((phone, index) => {
                    if (!phone) return null;
                    return (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="block px-3 py-2 text-mks-light-gray hover:bg-mks-gray/20 transition-colors"
                        onClick={() => setPhoneDropdownOpen(false)}
                      >
                        <span>{phone}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/" className="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red text-xl sm:text-2xl font-bold text-mks-dark hover:text-mks-red transition-colors">
              {companyName}
            </Link>
          </div>

          <form className="hidden lg:flex flex-grow max-w-xl mx-4" onSubmit={handleSearch}>
            <input 
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white text-mks-dark border border-mks-gray rounded-l-md focus:ring-2 focus:ring-mks-red focus:border-mks-red outline-none"
            />
            <button type="submit" className="bg-mks-red text-mks-white px-4 py-2 rounded-r-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red">
              <IconSearch className="w-5 h-5" />
            </button>
          </form>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/wishlist" className="relative text-mks-navy hover:text-mks-red transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red">
              <IconHeart className="w-6 h-6" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mks-red text-xs font-bold text-white">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-mks-navy hover:text-mks-red transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red">
              <IconCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mks-red text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/about" className="hidden lg:block">
              <img 
                src='https://i.postimg.cc/nVKwgw7n/Whats-App-Image-2025-09-13-at-10-59-16-743f0fc1.jpg' 
                alt='B-BBEE Level 1 Contributor'
                className="h-12 object-contain rounded-md"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
              />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-mks-navy hover:text-mks-red p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mks-red"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav ref={navRef} className="hidden lg:flex justify-center items-center border-t border-mks-gray/20">
        <ul className="flex items-center space-x-2">
          {navLinks.map((link) => (
            <li 
              key={link.label} 
              className="relative"
              onMouseEnter={link.subLinks ? () => setOpenDropdown(link.label) : undefined}
              onMouseLeave={link.subLinks ? () => setOpenDropdown(null) : undefined}
            >
              {link.subLinks ? (
                <>
                  <NavLink 
                    to={link.path}
                    className={`${navLinkClass({ isActive: location.pathname.startsWith(link.path) })} flex items-center gap-1`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.label}
                  >
                    <span>{link.label}</span>
                    <IconChevronDown className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                  </NavLink>
                  <ul className={`absolute left-0 top-full mt-1 w-56 bg-white shadow-lg rounded-md py-2 transition-all duration-300 z-10 ${openDropdown === link.label ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.label}>
                        <NavLink 
                          to={subLink.path} 
                          className="block px-4 py-2 text-sm text-mks-dark hover:bg-mks-light-gray"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subLink.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink to={link.path} className={navLinkClass}>
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-mks-gray/20">
          <ul className="flex flex-col p-4 space-y-2">
            <li className="mb-2">
              <form className="flex" onSubmit={handleSearch}>
                <input 
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white text-mks-dark border border-mks-gray rounded-l-md focus:ring-2 focus:ring-mks-red focus:border-mks-red outline-none"
                />
                <button type="submit" className="bg-mks-red text-mks-white px-4 py-2 rounded-r-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red">
                  <IconSearch className="w-5 h-5" />
                </button>
              </form>
            </li>
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.subLinks ? (
                  <>
                    <NavLink
                      to={link.path}
                      className={({isActive}) => `block py-2 px-3 text-base font-bold rounded-md ${isActive && !link.subLinks?.some(s => location.pathname === s.path) ? 'bg-mks-red/10 text-mks-red' : 'text-mks-dark hover:bg-mks-light-gray'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                    <ul className="pl-4 ml-3 border-l-2 border-mks-light-gray">
                        {link.subLinks.map(subLink => (
                            <li key={subLink.label}>
                                <NavLink
                                    to={subLink.path}
                                    className={({isActive}) => `block py-2 px-3 text-sm rounded-md ${isActive ? 'bg-mks-red/10 text-mks-red font-semibold' : 'text-mks-gray hover:bg-mks-light-gray'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {subLink.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({isActive}) => `block py-2 px-3 text-base font-bold rounded-md ${isActive ? 'bg-mks-red/10 text-mks-red' : 'text-mks-dark hover:bg-mks-light-gray'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;