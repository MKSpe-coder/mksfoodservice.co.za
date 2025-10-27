

import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

const ImageGalleryPage: React.FC = () => {
  return (
    <>
      <div className="bg-mks-light-gray">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://i.postimg.cc/SKxhPQdk/screenshot-204.png')" }}>
          <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Project Gallery</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">A showcase of our finest installations and kitchen solutions.</p>
          </div>
        </section>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <BackButton />
          
          {/* Featured Video Section */}
          <section className="my-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-mks-dark">Featured Video</h2>
                <p className="mt-2 text-lg text-mks-gray">MKS Innovation is making waves &#128227; Tune in to Algoa FM.</p>
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl mx-auto">
                <div style={{position: 'relative', width: '100%', height: '0px', paddingBottom: '56.604%'}}>
                    <iframe 
                        allow="fullscreen;autoplay" 
                        allowFullScreen 
                        height="100%" 
                        src="https://streamable.com/e/k94lzt?autoplay=1&muted=1" 
                        width="100%" 
                        style={{border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden'}}
                        title="Gallery Video Showcase"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-mks-dark text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Let's Build Your Next Project</h2>
            <p className="max-w-2xl mx-auto text-mks-light-gray mb-8">
              Inspired by our work? Contact our design and consultation team to start planning your state-of-the-art kitchen today.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="transform hover:scale-105">
                Get in Touch
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default ImageGalleryPage;