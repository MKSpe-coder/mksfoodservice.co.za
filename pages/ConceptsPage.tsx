



import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import { IMAGE_PLACEHOLDER } from '../constants';

// Icons for the process steps
const IconClipboard: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);
const IconCube: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);
const IconTag: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
);
const IconWrench: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const processSteps = [
    {
        icon: <IconClipboard className="w-10 h-10 text-mks-red" />,
        title: "Consultation & Planning",
        description: "We start by understanding your vision, operational needs, and budget to create a detailed project brief."
    },
    {
        icon: <IconCube className="w-10 h-10 text-mks-red" />,
        title: "Layout & 3D Design",
        description: "Our experts design an efficient kitchen layout, providing 3D models to help you visualize the space and workflow."
    },
    {
        icon: <IconTag className="w-10 h-10 text-mks-red" />,
        title: "Equipment Sourcing",
        description: "We help you select the best equipment from world-class brands, ensuring quality, reliability, and performance."
    },
    {
        icon: <IconWrench className="w-10 h-10 text-mks-red" />,
        title: "Installation & Training",
        description: "Our technical team handles the complete installation and provides training to ensure your staff operates everything efficiently."
    }
];

const galleryImages = [
    { src: 'https://i.postimg.cc/BPv1cLbG/20250604-1528-Innovative-Food-Container-remix-01jwxhy08peza9bbvnbxhntf9v-Copy.png', alt: 'Innovative Food Container' },
    { src: 'https://i.postimg.cc/V5sMcTRH/20250604-1528-Innovative-Food-Container-remix-01jwxhy08qepnvfc9jeyc8vjar-Copy.png', alt: 'Innovative Food Container Lid' },
    { src: 'https://i.postimg.cc/c6D31mk1/20250604-1528-Innovative-Food-Container-remix-01jwxhy08rehw9seymgxktbqv2.png', alt: 'Innovative Food Container Set' },
    { src: 'https://i.postimg.cc/xcczXzBv/20250604-1528-Innovative-Food-Container-remix-01jwxhy08rehw9seymgxktbqv2-Copy.png', alt: 'Innovative Food Container Stacked' },
];

const ConceptsPage: React.FC = () => {
  return (
    <div className="bg-mks-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://i.postimg.cc/vmwbTYQ6/20250825-1346-Commercial-Kitchen-Design-simple-compose-01k3ggpwgvfx0tfqfpsppj1y7j.png')" }}>
        <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Kitchen Concepts & Design</h1>
          <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">From vision to reality. We design and build efficient, high-performance commercial kitchens tailored to your needs.</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <BackButton />
        
        {/* Our Process Section */}
        <section className="my-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-mks-dark">Our Turnkey Process</h2>
                <p className="mt-2 text-lg text-mks-gray">A collaborative four-step approach to bring your ideal kitchen to life.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                    <div key={index} className="text-center p-6 bg-mks-light-gray rounded-lg shadow-sm">
                        <div className="flex justify-center items-center h-20 w-20 mx-auto mb-4 bg-white rounded-full shadow-md">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-mks-dark mb-2">{step.title}</h3>
                        <p className="text-mks-gray">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Gallery Section */}
        <section className="my-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-mks-dark">Concept Gallery</h2>
                <p className="mt-2 text-lg text-mks-gray">Get inspired by some of our past projects and designs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryImages.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <section className="my-16 text-center bg-mks-dark text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Kitchen?</h2>
            <p className="max-w-2xl mx-auto text-mks-light-gray mb-8">
                Our team is ready to help you design a kitchen that meets your exact specifications and exceeds your expectations. Let's start the conversation.
            </p>
            <Link to="/contact">
                <Button variant="primary" size="lg" className="transform hover:scale-105">
                    Request a Consultation
                </Button>
            </Link>
        </section>
      </div>
    </div>
  );
};

export default ConceptsPage;