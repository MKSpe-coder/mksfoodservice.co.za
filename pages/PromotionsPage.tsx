import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BackButton from '../components/ui/BackButton';
import { IMAGE_PLACEHOLDER } from '../constants';

const PromotionsPage: React.FC = () => {
  const { promotions } = mksData;
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-mks-red mb-2">Promotions & Offers</h1>
        <p className="text-lg text-mks-gray">Contact us for the latest deals and special offers.</p>
      </header>

      {promotions && promotions.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {promotions.map((promo, index) => {
            if (promo.id === 'promo_contact') {
              return (
                <Card key={promo.id} className="overflow-hidden group relative text-white">
                  {/* Single image container */}
                  <img
                    src='https://i.postimg.cc/fbwLwmYb/20250829-1117-South-Africa-Map-remix-01k3thq4edesnrbmc6b0v2wp2g.png'
                    alt="Special Offer Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="relative p-6 flex flex-col justify-between min-h-[350px]">
                    <div>
                      <div className="bg-mks-red px-3 py-1 text-sm font-semibold inline-block mb-4">
                        Special Offer
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{promo.title}</h2>
                      <p className="text-mks-light-gray mb-4 drop-shadow-sm">{promo.description}</p>
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="primary"
                        onClick={() => navigate('/contact')}
                      >
                        Contact Sales
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            }
            
            return (
              <Card key={promo.id} className="overflow-hidden group flex flex-col">
                <div className="relative">
                  <img 
                    src={promo.imageUrl} 
                    alt={promo.title} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                  />
                  <div className="absolute top-0 left-0 bg-mks-red text-white px-3 py-1 text-sm font-semibold">
                    Special Offer
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-mks-dark group-hover:text-mks-red mb-2">{promo.title}</h2>
                  <p className="text-mks-gray mb-4 flex-grow">{promo.description}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/concepts')}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <img 
            src="https://i.postimg.cc/WbHqDscV/20250526-1154-Kitchen-Equipment-Display-remix-01jw605bm8fnvayharazawrta1-Copy.png" 
            alt="Contact us for special offers" 
            className="mx-auto mb-6 rounded-lg w-full max-w-sm h-auto object-cover" 
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
          />
          <h2 className="text-2xl font-semibold text-mks-dark mb-2">No Specific Online Promotions Currently Listed</h2>
          <p className="text-mks-gray">We are always working to bring you the best value. Please <Link to="/contact" className="text-mks-red hover:underline">contact our sales team</Link> for information on current specials, bulk purchase deals, or tailored offers for your business.</p>
        </div>
      )}
       <section className="mt-16 text-center bg-mks-light-gray p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-mks-dark mb-3">Stay Updated!</h2>
          <p className="text-mks-gray max-w-xl mx-auto mb-5">
            Subscribe to our newsletter or get in touch to hear about the latest product arrivals and offers.
          </p>
          <form className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-4 py-2 bg-white text-mks-dark border border-mks-gray rounded-l-md focus:outline-none focus:ring-2 focus:ring-mks-red"
              required
            />
            <Button type="submit" variant="primary" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        </section>
    </div>
  );
};

export default PromotionsPage;