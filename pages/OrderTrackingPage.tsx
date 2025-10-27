import React, { useState } from 'react';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

// Icons for tracking stages
const IconPackage: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);
const IconCog: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const IconTruck: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" />
    </svg>
);
const IconCheckCircle: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const stageIcons: { [key: string]: React.FC<{ className?: string }> } = {
    'Confirmed': IconPackage,
    'Processing': IconCog,
    'Shipped': IconTruck,
    'Delivered': IconCheckCircle,
};

interface TrackingStage {
    name: string;
    date: string;
    completed: boolean;
}

interface TrackingInfo {
    status: string;
    summary: string;
    stages: TrackingStage[];
}

const OrderTrackingPage: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) return;
        
        setIsLoading(true);
        setTrackingInfo(null);
        setError(null);

        // Simulate an API call with different order scenarios
        setTimeout(() => {
            const trimmedOrder = orderNumber.trim().toUpperCase();
            if (trimmedOrder === 'MKS12345') {
                setTrackingInfo({
                    status: 'Shipped',
                    summary: 'Your order is on its way. Expected delivery within 2-3 business days.',
                    stages: [
                        { name: 'Confirmed', date: 'Oct 10, 2024', completed: true },
                        { name: 'Processing', date: 'Oct 11, 2024', completed: true },
                        { name: 'Shipped', date: 'Oct 12, 2024', completed: true },
                        { name: 'Delivered', date: '', completed: false },
                    ]
                });
            } else if (trimmedOrder === 'MKS54321') {
                 setTrackingInfo({
                    status: 'Delivered',
                    summary: 'Your order was successfully delivered. Thank you for choosing MKS!',
                    stages: [
                        { name: 'Confirmed', date: 'Oct 08, 2024', completed: true },
                        { name: 'Processing', date: 'Oct 08, 2024', completed: true },
                        { name: 'Shipped', date: 'Oct 09, 2024', completed: true },
                        { name: 'Delivered', date: 'Oct 11, 2024', completed: true },
                    ]
                });
            } else {
                setError('Order not found. Please check the number and try again.');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-mks-light-gray min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <BackButton />
                    <header className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-mks-dark mb-2">Track Your Order</h1>
                        <p className="text-lg text-mks-gray">Enter your order number to see its status.</p>
                    </header>

                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => {
                                    setOrderNumber(e.target.value);
                                    if(error) setError(null);
                                    if(trackingInfo) setTrackingInfo(null);
                                }}
                                placeholder="Enter your order number (e.g., MKS12345)"
                                className="w-full px-4 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"
                                required
                            />
                            <Button type="submit" variant="primary" size="md" className="sm:w-32 justify-center" disabled={isLoading}>
                                {isLoading ? 'Tracking...' : 'Track'}
                            </Button>
                        </form>

                        {error && (
                            <div className="mt-6 text-center bg-red-100 text-red-700 p-4 rounded-md">
                                {error}
                            </div>
                        )}

                        {trackingInfo && (
                            <div className="mt-8 pt-6 border-t border-mks-gray/20">
                                <h2 className="text-2xl font-semibold text-mks-dark mb-2">Order Status for #{orderNumber.trim().toUpperCase()}</h2>
                                <p className={`mb-6 font-semibold ${trackingInfo.status === 'Delivered' ? 'text-green-600' : 'text-mks-navy'}`}>{trackingInfo.status}</p>

                                {/* Progress Bar */}
                                <div className="relative mb-8">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-mks-gray/20 rounded-full -translate-y-1/2"></div>
                                    <div 
                                        className="absolute top-1/2 left-0 h-1 bg-mks-red rounded-full -translate-y-1/2 transition-all duration-500"
                                        style={{ width: `${((trackingInfo.stages.filter(s => s.completed).length - 1) / (trackingInfo.stages.length - 1)) * 100}%` }}
                                    ></div>
                                    <div className="relative flex justify-between">
                                        {trackingInfo.stages.map((stage) => {
                                            const Icon = stageIcons[stage.name];
                                            return (
                                                <div key={stage.name} className="flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-mks-light-gray transition-colors ${stage.completed ? 'bg-mks-red text-white' : 'bg-mks-gray/20 text-mks-gray'}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                {/* Timeline View */}
                                <div className="space-y-4">
                                    {trackingInfo.stages.map((stage) => (
                                        <div key={stage.name} className={`flex items-center gap-4 p-3 rounded-md ${stage.completed ? 'bg-mks-light-gray' : ''}`}>
                                            <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center ${stage.completed ? 'bg-mks-red text-white' : 'bg-mks-gray/20 text-mks-gray'}`}>
                                                {stage.completed ? '✓' : '•'}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${stage.completed ? 'text-mks-dark' : 'text-mks-gray'}`}>{stage.name}</p>
                                                {stage.date && <p className="text-sm text-mks-gray">{stage.date}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center bg-blue-50 text-blue-800 p-4 rounded-md">
                                    {trackingInfo.summary}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
