

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import Button from '../components/ui/Button';

// Extended service data with images and key points for the new design
const servicesWithDetails = [
  {
    ...mksData.services[0], // Nationwide Delivery & Service
    imageUrl: 'https://i.postimg.cc/0j924Bgc/SABC-Heavy-congestion.jpg',
    points: [
      'Coverage across South Africa and neighboring regions.',
      'Professional on-site installation and setup.',
      'Scheduled preventative maintenance plans.',
      'Emergency repair services to minimize downtime.'
    ]
  },
  {
    ...mksData.services[1], // Kitchen Equipment Supply
    imageUrl: 'https://i.postimg.cc/SK53q7xK/8-HD-RACK-FRYER-PITCO.jpg',
    points: [
      'Vast catalog of new and reconditioned equipment.',
      'Partnerships with leading international brands.',
      'Consultation to find the perfect equipment for your needs.',
      'Competitive pricing and financing options.'
    ]
  },
  {
    ...mksData.services[2], // Special Product Sourcing
    imageUrl: 'https://i.postimg.cc/jjZBQ3xz/Image-3-1.png',
    points: [
      'Access to a global network of suppliers.',
      'Sourcing of rare and hard-to-find spare parts.',
      'Custom equipment solutions for unique requirements.',
      'Dedicated team to handle your sourcing requests.'
    ]
  },
  {
    ...mksData.services[3], // Dedicated Customer Support
    imageUrl: 'https://i.postimg.cc/Kjw27q59/customer-retention-strategies-01.jpg',
    points: [
      'Expert advice from industry professionals.',
      'Technical support for troubleshooting.',
      'Assistance with order placement and tracking.',
      'Long-term partnership and post-sale support.'
    ]
  },
   {
    ...mksData.services[4], // QSR Design
    imageUrl: 'https://i.postimg.cc/LXZHCfYD/screenshot-153.png',
    points: [
        'Optimized workflow for speed and efficiency.',
        'Durable equipment selections for high-volume use.',
        'Compliance with health and safety standards.',
        '3D modeling and visualization.'
    ]
  },
  {
    ...mksData.services[5], // Restaurant & Cafe Kitchens
    imageUrl: 'https://i.postimg.cc/7LM8px22/i.jpg',
    points: [
        'Custom layouts for any culinary style.',
        'Integration of front-of-house and back-of-house operations.',
        'Ergonomic designs to enhance staff productivity.',
        'Balance of aesthetics and functionality.'
    ]
  },
  {
    ...mksData.services[6], // Custom Fabrication
    imageUrl: 'https://i.postimg.cc/26MsWVpg/download-2fabrications.jpg',
    points: [
        'Bespoke stainless steel tables, sinks, and shelves.',
        'Custom extraction canopies and ventilation systems.',
        'Solutions designed to fit unique spaces.',
        'High-quality materials and craftsmanship.'
    ]
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-mks-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        .service-section {
          opacity: 0;
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* Hero Section */}
      <section 
        className="relative py-32 md:py-40 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://i.postimg.cc/rmvTxZjf/photodune-6221194-customer-service-team-s-e1468394369939-742x353.jpg')" }}
      >
        <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg animate-fadeInUp">Our Comprehensive Services</h1>
          <p className="text-lg md:text-xl text-mks-light-gray mt-4 max-w-3xl mx-auto drop-shadow-md animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            From nationwide delivery to expert technical support, we are your dedicated partner in achieving operational excellence.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-20">
          {servicesWithDetails.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-section grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Column */}
              <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="rounded-lg shadow-2xl w-full h-80 bg-mks-light-gray flex items-center justify-center p-4">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://picsum.photos/seed/service/400/400'; }}
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="flex items-center gap-4 mb-4">
                   {service.icon && (
                    <div className="flex-shrink-0 bg-mks-red/10 p-3 rounded-full">
                        {service.icon}
                    </div>
                   )}
                  <h2 className="text-3xl font-bold text-mks-dark">{service.name}</h2>
                </div>
                <p className="text-mks-gray leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-mks-dark">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="bg-mks-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Business?</h2>
          <p className="max-w-2xl mx-auto text-mks-light-gray mb-8">
            Let us be more than just a supplier; let us be your partner in success. Contact us today for a free consultation and discover how our services can be tailored to your unique needs.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/contact')}
            className="transform hover:scale-105"
          >
            Get a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
