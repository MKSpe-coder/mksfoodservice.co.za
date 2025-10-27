import React from 'react';
import { Link } from 'react-router-dom';
import { mksData } from '../data/mksContent';
import BackButton from '../components/ui/BackButton';
import Card from '../components/ui/Card';
import { IMAGE_PLACEHOLDER } from '../constants';

const BrandsListPage: React.FC = () => {
  const { brandPartners } = mksData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />
      
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-mks-dark mb-2">Our Brand Partners</h1>
        <p className="text-lg text-mks-gray">We partner with the world's leading brands to bring you quality and reliability.</p>
      </header>

      <main>
        {brandPartners && brandPartners.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brandPartners.map((brand) => {
              const brandContent = (
                <Card className="group w-full h-32 flex items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                  />
                </Card>
              );

              if (brand.path) {
                return (
                  <Link to={brand.path} key={brand.name} className="w-full" title={brand.name}>
                    {brandContent}
                  </Link>
                );
              }

              return (
                <div key={brand.name} className="w-full" title={brand.name}>
                  {brandContent}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-10 bg-mks-light-gray rounded-lg">
            <p className="text-xl text-mks-dark font-semibold">No brands to display.</p>
            <p className="text-mks-gray mt-2">Please check back later.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandsListPage;