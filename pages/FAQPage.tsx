
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import AccordionItem from '../components/ui/Accordion';
import { IconSearch } from '../constants';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "What kind of warranty comes with your products?",
    answer: "All our new equipment comes with a standard manufacturer's warranty, which typically covers parts and labor for one year. Reconditioned equipment comes with a 3-month MKS warranty. For specific warranty details on a product, please check the product page or contact our sales team.",
  },
  {
    question: "Do you offer shipping nationwide?",
    answer: "Yes, we offer delivery services across all of South Africa. We also serve neighboring regions. Shipping costs and delivery times vary based on your location and the size of the order. You can get a shipping estimate by contacting us with your delivery address.",
  },
  {
    question: "Can you ship to countries outside of South Africa?",
    answer: "We regularly export to neighboring countries, including Zambia, Botswana, Zimbabwe, and Mozambique. For other international destinations, please contact our export department to discuss logistics and feasibility.",
  },
  {
    question: "What services do you provide besides selling equipment?",
    answer: "We offer a comprehensive range of services including professional installation, preventative maintenance plans, and emergency repair services. Our team of skilled technicians is equipped to service all major brands we supply.",
  },
  {
    question: "How do I request a repair or service for my equipment?",
    answer: <>You can request a service by calling our support line at +27 10 824 1000 or by filling out the service request form on our <Link to="/contact" className="text-mks-red hover:underline">Contact Us page</Link>. Please have your equipment's model and serial number ready for faster assistance.</>,
  },
  {
    question: "How does the quoting process work?",
    answer: "Simply add the products you're interested in to your quote cart. Once you're ready, proceed to the cart, select your nearest branch, and submit your request. Our sales team for that region will contact you shortly with a personalized quote and to discuss your needs further.",
  },
  {
    question: "Do you help with kitchen design and layout?",
    answer: <>Absolutely! We offer full turnkey kitchen design services, from initial consultation and 3D modeling to equipment sourcing and installation. Visit our <Link to="/concepts" className="text-mks-red hover:underline">Kitchen Concepts page</Link> to learn more about our process.</>,
  },
];

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://i.postimg.cc/Kjw27q59/customer-retention-strategies-01.jpg')" }}>
        <div className="absolute inset-0 bg-mks-dark bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">Find answers to common questions about our products and services.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-mks-dark border border-mks-gray/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-mks-red"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <IconSearch className="w-5 h-5 text-mks-gray" />
            </div>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  title={faq.question}
                  isOpen={openItem === index}
                  onClick={() => handleToggle(index)}
                >
                  <p>{faq.answer}</p>
                </AccordionItem>
              ))
            ) : (
              <div className="p-8 text-center text-mks-gray">
                <p>No questions found matching your search. Please try another term.</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-mks-light-gray p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-mks-dark mb-3">Can't find your answer?</h2>
            <p className="text-mks-gray max-w-xl mx-auto mb-5">
              Our team is here to help. Contact us for any specific inquiries or support needs.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg">Contact Support</Button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default FAQPage;