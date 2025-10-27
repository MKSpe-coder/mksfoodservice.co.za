



import React from 'react';
import { mksData } from '../data/mksContent';
import BackButton from '../components/ui/BackButton';
import { 
  IconCapeTown,
  IconDurban, 
  IconJohannesburg, 
  IconPortElizabeth, 
  IconZambia,
  IMAGE_PLACEHOLDER
} from '../constants';

const AboutPage: React.FC = () => {
  const { companyName, aboutUs } = mksData;

  const locations = [
    { Icon: IconJohannesburg, label: 'Johannesburg', href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Johannesburg' },
    { Icon: IconCapeTown, label: 'Cape Town', href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Cape+Town' },
    { Icon: IconPortElizabeth, label: 'Port Elizabeth', href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Port+Elizabeth' },
    { Icon: IconDurban, label: 'Durban', href: 'https://www.google.com/maps/search/?api=1&query=MKS+Foodservice+Durban' },
    { Icon: IconZambia, label: 'Zambia', href: '/contact' }
  ];

  return (
    <div className="bg-mks-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://i.postimg.cc/LXZHCfYD/screenshot-153.png')" }}
      >
        <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold animate-fadeInUp">About {companyName}</h1>
          <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            Your trusted partner in commercial kitchen solutions since 2019.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <BackButton />
        
        {/* Main Content Section */}
        <section className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center my-8">
          <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <img 
              src="https://i.postimg.cc/jjPGRsHh/Whats-App-Image-2025-08-20-at-09-11-40-b4916512.jpg" 
              alt="The MKS Foodservice Team" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold text-mks-dark mb-4">Our Story</h2>
            <p className="text-mks-gray leading-relaxed">{aboutUs.detailed}</p>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="grid md:grid-cols-2 gap-8 my-16">
          <div className="bg-mks-light-gray p-8 rounded-lg shadow-md animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <h3 className="text-2xl font-semibold text-mks-red mb-3">Our Mission</h3>
            <p className="text-mks-dark">{aboutUs.mission}</p>
          </div>
          <div className="bg-mks-light-gray p-8 rounded-lg shadow-md animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-semibold text-mks-red mb-3">Our Vision</h3>
            <p className="text-mks-dark">{aboutUs.vision}</p>
          </div>
        </section>

        {/* B-BBEE Contributor Section */}
        <section className="my-16 text-center bg-mks-dark text-white p-12 rounded-lg animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <h2 className="text-3xl font-bold mb-4">Proud Level 1 B-BBEE Contributor</h2>
            <p className="max-w-3xl mx-auto text-mks-light-gray">
                We are committed to empowerment and transformation within the South African economy. Our Level 1 B-BBEE status reflects our dedication to creating opportunities and fostering inclusive growth in the foodservice industry.
            </p>
        </section>
        
        {/* Locations Section */}
        <section className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mks-dark animate-fadeInUp" style={{ animationDelay: '600ms' }}>Our Nationwide Branches</h2>
            <p className="mt-2 text-lg text-mks-gray animate-fadeInUp" style={{ animationDelay: '700ms' }}>Find us in major cities across Southern Africa.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {locations.map((loc, index) => (
              <a 
                key={loc.label} 
                href={loc.href} 
                target={loc.href.startsWith('http') ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                className="block text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${700 + (index + 1) * 100}ms` }}
              >
                <loc.Icon className="w-12 h-12 mx-auto text-mks-red" />
                <h3 className="mt-4 text-lg font-semibold text-mks-dark">{loc.label}</h3>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;