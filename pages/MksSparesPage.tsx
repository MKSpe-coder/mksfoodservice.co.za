

import React from 'react';
import { Link } from 'react-router-dom';
import { mksBunToasterSpares } from '../data/mksSpares';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { IMAGE_PLACEHOLDER } from '../constants';

const MksSparesPage: React.FC = () => {
    return (
        <div className="bg-mks-light-gray min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <BackButton />
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-mks-dark mb-2">MKS-SMT20 Bun Toaster Spares</h1>
                    <p className="text-lg text-mks-gray">Find genuine replacement parts to keep your toaster in top condition.</p>
                </header>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mksBunToasterSpares.map(part => (
                        <Card key={part.id} className="flex flex-col text-center">
                            <div className="relative h-48 flex items-center justify-center p-4 bg-white">
                                <img
                                    src={part.imageUrl}
                                    alt={part.name}
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
                                />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-semibold text-mks-dark">{part.name}</h3>
                                <p className="text-xs text-mks-gray mt-1 mb-2">Part #: {part.id}</p>
                                <p className="text-sm text-mks-gray flex-grow">{part.description}</p>
                                <div className="mt-4">
                                     <Link to="/contact">
                                        <Button variant="outline" size="sm" className="w-full">Request Info</Button>
                                     </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <section className="mt-16 text-center bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-mks-dark mb-3">Can't Find Your Part?</h2>
                    <p className="text-mks-gray max-w-xl mx-auto mb-5">
                        If you can't find the specific spare part you need, please contact our support team. We can source a wide range of components for all our equipment.
                    </p>
                    <Link to="/contact">
                        <Button variant="primary" size="lg">Contact Support</Button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default MksSparesPage;