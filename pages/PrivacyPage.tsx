import React from 'react';
import BackButton from '../components/ui/BackButton';

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-mks-dark mb-6 border-b pb-4">Privacy Policy</h1>
            <div className="prose max-w-none text-mks-gray space-y-4">
                <h2 className="text-xl font-semibold text-mks-dark">1. Information We Collect</h2>
                <p>
                    We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The information collected may include your name, e-mail address, mailing address, and phone number.
                </p>

                <h2 className="text-xl font-semibold text-mks-dark">2. How We Use Your Information</h2>
                <p>
                    Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, to process transactions, or to send periodic emails.
                </p>

                <h2 className="text-xl font-semibold text-mks-dark">3. How We Protect Your Information</h2>
                <p>
                    We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                </p>

                <h2 className="text-xl font-semibold text-mks-dark">4. Cookies</h2>
                <p>
                    We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
                </p>

                <h2 className="text-xl font-semibold text-mks-dark">5. Third-Party Disclosure</h2>
                <p>
                    We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>

                <h2 className="text-xl font-semibold text-mks-dark">6. Your Consent</h2>
                <p>
                    By using our site, you consent to our website's privacy policy.
                </p>
                
                <h2 className="text-xl font-semibold text-mks-dark">7. Changes to our Privacy Policy</h2>
                <p>
                    If we decide to change our privacy policy, we will post those changes on this page. This policy was last modified on 2019/07/01
                </p>
                <p className="pt-4 text-xs">This is a template. Please consult with a legal professional to create your official Privacy Policy.</p>
            </div>
        </div>
    </div>
  );
};

export default PrivacyPage;