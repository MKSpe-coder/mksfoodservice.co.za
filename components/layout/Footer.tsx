



import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinkItem, ContactInfo } from '../../types';
import { IconPhone, IconEmail, IconLocation, IMAGE_PLACEHOLDER } from '../../constants';

interface FooterProps {
  companyName: string;
  logoUrl?: string;
  navLinks: NavLinkItem[];
  companyLinks: NavLinkItem[];
  contactInfo: ContactInfo;
  socialMedia: { name: string; url: string; icon?: React.ReactNode }[];
}

const Footer: React.FC<FooterProps> = ({ companyName, logoUrl, navLinks, companyLinks, contactInfo, socialMedia }) => {
  const usefulLinks = navLinks.slice(0, 4); // Show a few key links

  return (
    <footer className="bg-mks-dark text-mks-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info / Contact */}
          <div>
            <Link to="/about" className="mb-4 inline-block">
              <img 
                src='https://i.postimg.cc/nVKwgw7n/Whats-App-Image-2025-09-13-at-10-59-16-743f0fc1.jpg'
                alt='B-BBEE Level 1 Contributor'
                className="h-16 bg-white p-2 rounded-md object-contain"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMAGE_PLACEHOLDER; }}
              />
            </Link>
            <address className="not-italic space-y-2 text-sm">
              <div className="flex items-start">
                <IconLocation className="w-5 h-5 mr-2 mt-0.5 text-mks-red flex-shrink-0" />
                <div className="space-y-1">
                  {contactInfo.addresses.map((addr, index) => (
                    <p key={index}>{addr}</p>
                  ))}
                </div>
              </div>
              {contactInfo.phone.map((p, index) => (
                <p key={`${p}-${index}`} className="flex items-center">
                  <IconPhone className="w-5 h-5 mr-2 text-mks-red flex-shrink-0" />
                  <a href={`tel:${p.replace(/[^0-9+]/g, '')}`} className="hover:text-mks-red">{p}</a>
                </p>
              ))}
              {contactInfo.email.map((e, index) => (
                 <p key={`${e}-${index}`} className="flex items-center">
                  <IconEmail className="w-5 h-5 mr-2 text-mks-red flex-shrink-0" />
                  <a href={`mailto:${e}`} className="hover:text-mks-red">{e}</a>
                </p>
              ))}
            </address>
            <div className="mt-4 flex space-x-3">
              {socialMedia.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-mks-gray hover:text-blue-500">
                  {social.icon || social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Useful Links</h5>
            <ul className="space-y-2 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-mks-red">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Our Company</h5>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-mks-red">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-mks-gray/50 pt-8 mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;