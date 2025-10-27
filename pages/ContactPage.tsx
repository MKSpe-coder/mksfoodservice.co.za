import React, { useState } from 'react';
import { mksData } from '../data/mksContent';
import { IconPhone, IconEmail, IconLocation } from '../constants';
import Button from '../components/ui/Button';
import BackButton from '../components/ui/BackButton';

const ContactPage: React.FC = () => {
  const { contactInfo } = mksData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic form submission simulation
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', branch: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-mks-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-mks-red mb-2">Contact Us</h1>
          <p className="text-xl text-mks-gray">We'd love to hear from you! Get in touch with our team.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-6 bg-mks-light-gray p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-mks-dark mb-4">Our Details</h2>
            <div className="flex items-start">
              <IconLocation className="w-6 h-6 text-mks-red mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-mks-dark">Our Locations</h3>
                <div className="space-y-1 mt-1">
                  {contactInfo.addresses.map((addr, index) => (
                    <p key={index} className="text-mks-gray">{addr}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <IconPhone className="w-6 h-6 text-mks-red mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-mks-dark">Phone</h3>
                {contactInfo.phone.map(p => <a key={p} href={`tel:${p.replace(/[^0-9+]/g, '')}`} className="block text-mks-gray hover:text-mks-red">{p}</a>)}
              </div>
            </div>
            <div className="flex items-start">
              <IconEmail className="w-6 h-6 text-mks-red mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-mks-dark">Email</h3>
                 {contactInfo.email.map(e => <a key={e} href={`mailto:${e}`} className="block text-mks-gray hover:text-mks-red">{e}</a>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-mks-dark mb-1">Operating Hours</h3>
              <ul className="text-mks-gray list-none space-y-1">
                {contactInfo.operatingHours.map(line => <li key={line}>{line}</li>)}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-mks-light-gray p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-mks-dark mb-6">Send us a Message</h2>
            {isSubmitted ? (
              <div className="text-center p-6 bg-green-100 text-green-700 rounded-md">
                <h3 className="font-semibold text-lg">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-mks-dark">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-mks-dark">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-mks-dark">Nearest Branch</label>
                  <div className="relative mt-1">
                      <select
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"
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
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-mks-dark">Subject</label>
                  <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-mks-dark">Message</label>
                  <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"></textarea>
                </div>
                <div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">Send Message</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;