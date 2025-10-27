import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

// Icons for benefits
const IconTrendingUp: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const IconUsers: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 13a5.995 5.995 0 01-3 5.197" />
    </svg>
);
const IconSparkles: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 17.657l-2.828-2.828m11.314 0l-2.828 2.828m-2.828-11.314l2.828-2.828m0 11.314l2.828 2.828M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

const benefits = [
    { icon: <IconTrendingUp className="w-10 h-10 text-mks-red" />, title: 'Growth Opportunities', description: 'We invest in our team members with training and development programs to help you advance your career.' },
    { icon: <IconUsers className="w-10 h-10 text-mks-red" />, title: 'Supportive Culture', description: 'Join a collaborative and inclusive team that values every member’s contribution and fosters a positive work environment.' },
    { icon: <IconSparkles className="w-10 h-10 text-mks-red" />, title: 'Impactful Work', description: 'Be part of a company that’s shaping the future of the foodservice industry in Southern Africa with innovative solutions.' }
];

const jobOpenings = [
    { title: 'Senior Sales Executive', location: 'Johannesburg, Gauteng', description: 'Drive sales growth by developing and maintaining relationships with key clients in the commercial catering industry. Proven track record required.' },
    { title: 'Service Technician', location: 'Cape Town, Western Cape', description: 'Install, maintain, and repair commercial kitchen equipment. Must have strong technical skills and experience with foodservice machinery.' },
];

const CareersPage: React.FC = () => {
    return (
        <div className="bg-mks-white">
            {/* Hero Section */}
            <section
                className="relative py-24 md:py-32 bg-cover bg-center text-white"
                style={{ backgroundImage: "url('https://i.postimg.cc/jSYRfNpz/Whats-App-Image-2025-09-13-at-10-59-16-743f0fc1.jpg')" }}
            >
                <div className="absolute inset-0 bg-mks-dark bg-opacity-70"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Join Our Team</h1>
                    <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">Help us innovate the future of the foodservice industry. Your journey starts here.</p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <BackButton />

                {/* Why Work With Us Section */}
                <section className="my-8 text-center">
                    <h2 className="text-3xl font-bold text-mks-dark mb-4">Why Work at MKS?</h2>
                    <p className="text-lg text-mks-gray max-w-3xl mx-auto mb-12">We are more than just a company; we are a team of passionate individuals dedicated to excellence, innovation, and customer success.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-6 bg-mks-light-gray rounded-lg shadow-sm text-center">
                                <div className="flex justify-center items-center h-20 w-20 mx-auto mb-4 bg-white rounded-full shadow-md">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-mks-dark mb-2">{benefit.title}</h3>
                                <p className="text-mks-dark/80 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Current Openings Section */}
                <section className="my-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-mks-dark">Current Openings</h2>
                        <p className="mt-2 text-lg text-mks-gray">We're looking for talented people to join our growing team.</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {jobOpenings.map((job, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-mks-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-mks-dark">{job.title}</h3>
                                    <p className="text-mks-red font-semibold mt-1">{job.location}</p>
                                    <p className="text-mks-gray mt-2 text-sm max-w-2xl">{job.description}</p>
                                </div>
                                <div className="flex-shrink-0 mt-4 sm:mt-0">
                                    <a href={`mailto:operations@mksfoodservice.co.za?subject=Application for ${encodeURIComponent(job.title)}`}>
                                        <Button variant="outline">
                                            Apply Now
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="my-16 text-center bg-mks-dark text-white p-12 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">Don't See a Fit?</h2>
                    <p className="max-w-2xl mx-auto text-mks-light-gray mb-8">
                        We are always on the lookout for exceptional talent. If you believe you have what it takes to contribute to our team, send us your resume.
                    </p>
                    <a href="mailto:operations@mksfoodservice.co.za?subject=General Career Inquiry">
                        <Button variant="primary" size="lg" className="transform hover:scale-105">
                            Submit Your CV
                        </Button>
                    </a>
                </section>

            </div>
        </div>
    );
};

export default CareersPage;