
import React from 'react';
import BackButton from '../components/ui/BackButton';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-mks-dark mb-6 border-b pb-4">Terms & Conditions</h1>
        <div className="prose max-w-none text-mks-gray space-y-4">
          <h2 className="text-xl font-semibold text-mks-dark">1. Introduction</h2>
          <p>
            Welcome to M.K.S Foodservice. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website we assume you accept these terms and conditions. Do not continue to use M.K.S Foodservice if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold text-mks-dark">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, M.K.S Foodservice and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-xl font-semibold text-mks-dark">3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc list-inside">
            <li>Publishing any website material in any other media.</li>
            <li>Selling, sublicensing and/or otherwise commercializing any website material.</li>
            <li>Publicly performing and/or showing any website material.</li>
            <li>Using this website in any way that is or may be damaging to this website.</li>
          </ul>

          <h2 className="text-xl font-semibold text-mks-dark">4. Your Content</h2>
          <p>
            In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant M.K.S Foodservice a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>
          
          <h2 className="text-xl font-semibold text-mks-dark">5. No warranties</h2>
          <p>This Website is provided "as is," with all faults, and M.K.S Foodservice express no representations or warranties, of any kind related to this Website or the materials contained on this Website.</p>

          <h2 className="text-xl font-semibold text-mks-dark">6. Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the Republic of South Africa, and you submit to the non-exclusive jurisdiction of the state and federal courts located in South Africa for the resolution of any disputes.
          </p>
          <p className="pt-4 text-xs">This is a template. Please consult with a legal professional to create your official Terms & Conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
