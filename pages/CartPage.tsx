



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import BackButton from '../components/ui/BackButton';
import QuantityInput from '../components/ui/QuantityInput';
import { IconTrash, IconCart, IMAGE_PLACEHOLDER } from '../constants';

const CartPage: React.FC = () => {
  const { cart, removeItem, updateItemQuantity, clearCart } = useCart();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalProducts = cart.length;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateItemQuantity(id, newQuantity);
    }
  };

  const branchEmails: { [key: string]: string } = {
    'JHB': 'salesjhb@mksfoodservice.co.za',
    'CPT': 'salescpt@mksfoodservice.co.za',
    'PE': 'salespe@mksfoodservice.co.za',
    'DBN': 'salesdbn@mksfoodservice.co.za',
    'ZAM': 'saleszambia@mksfoodservice.co.za',
  };

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranch) {
      setError('Please select a branch before submitting.');
      return;
    }
    setError('');

    const recipientEmail = branchEmails[selectedBranch];
    if (!recipientEmail) {
        setError('Invalid branch selected. Please try again.');
        return;
    }
    
    const subject = encodeURIComponent('Quote Request from MKS Website');
    const bodyLines = [
        'Hello MKS Team,',
        '',
        'I would like to request a quote for the following items:',
        '',
        ...cart.map(item => `- ${item.name} (#${item.id}) - Quantity: ${item.quantity}`),
        '',
        'Please provide a quote for the items listed above.',
        '',
        'Thank you,',
        '[Your Name & Contact Details]'
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // This will open the user's default email client
    window.location.href = mailtoLink;

    // We assume the user sends the email, so we clear the cart and show a success message.
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <div className="text-center py-24 bg-white rounded-lg shadow-md mt-4">
          <h1 className="text-3xl font-bold text-green-600 mt-4 mb-2">Quote Request Prepared!</h1>
          <p className="text-mks-gray mb-6 max-w-md mx-auto">
            Your email application has been opened with the quote details. Please review and send the email to finalize your request.
          </p>
          <p className="text-mks-gray mb-6 max-w-md mx-auto">
            Your cart has now been cleared.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">Continue Browsing</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <div className="relative text-center py-24 bg-white rounded-lg shadow-md mt-4 overflow-hidden">
            <img 
                src="https://i.postimg.cc/WbHqDscV/20250526-1154-Kitchen-Equipment-Display-remix-01jw605bm8fnvayharazawrta1-Copy.png"
                alt="Showcase of professional kitchen equipment"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
            />
            <div className="relative">
                <IconCart className="w-16 h-16 mx-auto text-mks-gray/80" />
                <h1 className="text-3xl font-bold text-mks-dark mt-4 mb-2">Your Quote Cart is Empty</h1>
                <p className="text-mks-gray mb-6 max-w-md mx-auto">It’s the perfect time to start exploring our top-quality kitchen solutions.</p>
                <Link to="/products">
                    <Button variant="primary" size="lg">Browse Products</Button>
                </Link>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mks-light-gray min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BackButton />
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-mks-dark">Your Quote Cart</h1>
                <p className="text-mks-gray mt-1">Review your items and request a quote from your nearest branch.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Cart Items */}
                <main className="w-full lg:w-2/3 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-mks-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-24 h-24 object-contain rounded-md bg-mks-light-gray flex-shrink-0"
                              loading="lazy"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-mks-dark">{item.name}</p>
                                <p className="text-xs text-mks-gray">#{item.id}</p>
                                <span className={`mt-2 inline-block text-xs font-bold px-2 py-1 rounded-full ${item.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-mks-red'}`}>
                                    {item.inStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                                <QuantityInput
                                    quantity={item.quantity}
                                    onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                    min={0}
                                />
                                <button onClick={() => removeItem(item.id)} className="text-mks-gray hover:text-mks-red transition-colors" aria-label="Remove item">
                                    <IconTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right mt-4">
                        <Button variant="outline" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </main>

                {/* Quote Summary */}
                <aside className="w-full lg:w-1/3 lg:sticky lg:top-8 bg-mks-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-mks-dark border-b pb-3 mb-4">Quote Summary</h2>
                    <div className="space-y-3 text-mks-dark">
                        <div className="flex justify-between">
                            <span>Total Products:</span>
                            <span className="font-semibold">{totalProducts}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Items:</span>
                            <span className="font-semibold">{totalItems}</span>
                        </div>
                    </div>

                    <form onSubmit={handleRequestQuote} className="mt-6">
                        <label htmlFor="branch" className="block text-sm font-medium text-mks-dark mb-2">
                            Nearest Branch for Quote
                        </label>
                        <div className="relative">
                            <select
                                id="branch"
                                name="branch"
                                value={selectedBranch}
                                onChange={(e) => {
                                    setSelectedBranch(e.target.value);
                                    if (error) setError('');
                                }}
                                required
                                className="appearance-none w-full bg-white border border-mks-gray/50 text-mks-dark py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-mks-red focus:ring-1 focus:ring-mks-red"
                            >
                                <option value="">Select a branch...</option>
                                <option value="JHB">Johannesburg (JHB)</option>
                                <option value="CPT">Cape Town (CPT)</option>
                                <option value="PE">Port Elizabeth (P.E)</option>
                                <option value="DBN">Durban (DBN)</option>
                                <option value="ZAM">Zambia (ZAM)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-mks-gray">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                        <p className="text-xs text-mks-gray mt-2">Our team will contact you with a personalized quote.</p>
                        <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                            Request a Quote
                        </Button>
                    </form>
                </aside>
            </div>
        </div>
    </div>
  );
};

export default CartPage;