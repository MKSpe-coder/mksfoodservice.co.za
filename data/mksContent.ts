

import React from 'react';
import { MKSData, BrandPartner, ProductCategory, ServiceItem, WhyChooseUsItem, PromotionItem, NavLinkItem, ContactInfo } from '../types';
import { 
    IconDeliveryTruck, IconQuality, IconFacebook, IconLinkedIn, 
    IconWrenchScrewdriver, IconClipboardList, IconShieldCheck, IconBolt, IconTag, 
    IconUser, IconSearch 
} from '../constants';

const productCategoriesData: ProductCategory[] = [
  { id: "new_equipment", name: "Foods Processing", imageUrl: "https://i.postimg.cc/d3Z5Twtx/SE14-Right-B-Up-1220-Web.jpg", description: "Efficient solutions and equipment for food preparation and processing."},
  { id: "cooking_equipment", name: "Cooking Equipment & Accessories", imageUrl: "https://i.postimg.cc/wTqTKfM2/Photo-arrangement-with-chicken-food-on-w.jpg", description: "A wide range of cooking equipment and essential accessories for a professional kitchen."},
  { id: "beverage_refrigeration", name: "Beverage/ Refrigeration", imageUrl: "https://i.postimg.cc/tJW7vLmN/Desmon-Reach-in-Fridge-01.webp", description: "Professional refrigerators, freezers, ice machines, and beverage dispensers." },
  { id: "holding_solutions", name: "Holding Solutions", imageUrl: "https://i.postimg.cc/4NKkJvQ3/hov3-14uv-composite-square-web.jpg", description: "Advanced holding cabinets and solutions to maintain food quality and temperature." },
  { id: "smalls_kfc", name: "Kitchenware", imageUrl: "https://i.postimg.cc/pTbtWWYN/CC-Nylon-basting-brush-1.jpg", description: "A range of essential kitchenware and smalls for professional use."},
  { id: "fryer_baskets_scoops", name: "Fryer Baskets/Scoops", imageUrl: "https://i.postimg.cc/cCc2bzVt/Whats-App-Image-2025-08-13-at-16-06-10_74fc4187.jpg", description: "A variety of durable fryer baskets and scoops for commercial kitchen use."},
  { id: "filters", name: "Filters", imageUrl: "https://i.postimg.cc/4ypJkRzS/smart-filter.jpg", description: "Oil and shortening filter papers, envelopes, and systems."},
  { id: "repairs_services", name: "Repairs & Services", imageUrl: "https://i.postimg.cc/gJWz7k1v/repairing-services-1600145129-4246595.jpg", description: `Ensure optimal performance and longevity of your equipment with our comprehensive repair, maintenance, and servicing solutions.`},
  { id: "mks_spares", name: "MKS Spares", imageUrl: "https://i.postimg.cc/BbvKgD2x/20250522-1524-OEM-HVAC-Parts-remix-01jvw2hp02e9yb11r3xsm5pv3x.png", description: "We offer a wide range of genuine spare parts for our equipment to ensure longevity and performance. Find parts for MKS equipment and other leading brands." },
];

const brandPartnersData: BrandPartner[] = [
  { 
    name: 'MKS Innovation', 
    logoUrl: 'https://i.postimg.cc/qM54ycGn/ei-1741703726769-removebg-preview-3.png',
    path: '/innovation',
    page: {
      logoUrl: 'https://i.postimg.cc/qM54ycGn/ei-1741703726769-removebg-preview-3.png',
      description: 'Our in-house brand, MKS Innovation, focuses on delivering quality and value in essential kitchen equipment and supplies.',
      imageSlides: [
        'https://i.postimg.cc/y8yZ1J1c/mks-air-curtain.jpg',
        'https://i.postimg.cc/cCc2bzVt/Whats-App-Image-2025-08-13-at-16-06-10_74fc4187.jpg',
        'https://i.postimg.cc/NFmg2stJ/INH2150.png',
        'https://i.postimg.cc/4ypJkRzS/smart-filter.jpg'
      ]
    }
  },
  { 
    name: 'Pitco', 
    logoUrl: 'https://i.postimg.cc/ryR4k3mY/pitco-logo-1.png', 
    path: '/brand/pitco',
    page: {
      logoUrl: 'https://i.postimg.cc/ryR4k3mY/pitco-logo-1.png',
      description: 'A leader in commercial fryers, known for durability and efficiency.',
      imageSlides: [
        'https://i.postimg.cc/d3Z5Twtx/SE14-Right-B-Up-1220-Web.jpg',
        'https://i.postimg.cc/SK53q7xK/8-HD-RACK-FRYER-PITCO.jpg',
        'https://i.postimg.cc/j2NcRprM/PITCO-Frialator-SSH60-W-Gas-Fryer.jpg',
        'https://i.postimg.cc/VLfTLWKj/pitco.jpg'
      ],
      additionalContent: {
        heading: 'Mastering Culinary Precision: Pitco’s Cutting-Edge Fryer Technology',
        paragraphs: [
          'When you choose Pitco, you’re choosing innovation and efficiency for your commercial kitchen. Our fryers stand out with cutting-edge features that guarantee top-notch results, even with frozen foods. Prioritizing labor efficiency, our fryers come with industry-leading drain lines, easy serviceability, and safe filtration. With a reputation for reliability and quality, Pitco fryers are the trusted choice in the foodservice industry.'
        ]
      }
    } 
  },
  { 
    name: 'APW Wyott', 
    logoUrl: 'https://i.postimg.cc/3JHNGwFs/apw.png', 
    path: '/brand/apw-wyott',
    page: {
      logoUrl: 'https://i.postimg.cc/3JHNGwFs/apw.png',
      description: 'APW Wyott is a leading manufacturer of high-quality foodservice equipment, offering a wide range of solutions for cooking, toasting, heating, and holding.',
      imageSlides: [
        'https://i.postimg.cc/50t0V9N7/apw-wyott-toaster.jpg',
        'https://i.postimg.cc/GpdW75bB/apw-hfw.jpg',
        'https://i.postimg.cc/k47Z69R5/apw-griddle.jpg',
        'https://i.postimg.cc/J0vHw2yN/apw-roller-grill.jpg'
      ]
    }
  },
  { 
    name: 'Antunes', 
    logoUrl: 'https://i.postimg.cc/7h0N2yNq/antunes-logo.png', 
    path: '/brand/antunes',
    page: {
      logoUrl: 'https://i.postimg.cc/7h0N2yNq/antunes-logo.png',
      description: 'Antunes is a leading provider of innovative countertop cooking equipment and water filtration systems for the global foodservice industry. Renowned for their reliability and efficiency, Antunes products help operators improve food quality and consistency.',
      videoUrl: 'https://streamable.com/e/5zrotr?autoplay=1&nocontrols=1',
      imageSlides: [ 'https://i.postimg.cc/L40W9Z18/images.png' ]
    }
  },
  { 
    name: 'Houno', 
    logoUrl: 'https://i.postimg.cc/k5YGHTSw/houn.png', 
    path: '/brand/houno',
    page: {
      logoUrl: 'https://i.postimg.cc/k5YGHTSw/houn.png',
      description: 'Houno provides flexible combi ovens for every need, from high-volume production to fine dining.',
      imageSlides: [ 'https://i.postimg.cc/4dJ89tpt/HOUNO-AMBIENTE-072-scaled-752x519.jpg' ]
    }
  },
  {
    name: 'Desmon',
    logoUrl: 'https://i.postimg.cc/K8L9W5zt/desmon-logo.png',
    path: '/brand/desmon',
    page: {
        logoUrl: 'https://i.postimg.cc/K8L9W5zt/desmon-logo.png',
        description: 'Italian excellence in professional refrigeration, offering a wide range of reliable and energy-efficient solutions including refrigerators, freezers, and blast chillers.',
        imageSlides: [
            'https://i.postimg.cc/tJW7vLmN/Desmon-Reach-in-Fridge-01.webp',
            'https://i.postimg.cc/hG12Y8Ld/Prince-Castle-DHB2-33-SS-Extended-Modular-Holding-Bin.jpg'
        ]
    }
  }
];

// FIX: Replaced JSX syntax with React.createElement to avoid errors in a .ts file.
const servicesData: ServiceItem[] = [
    { id: 'delivery', name: 'Nationwide Delivery & Service', description: 'Reliable delivery and expert technical support across Southern Africa.', icon: React.createElement(IconDeliveryTruck, { className: "w-10 h-10 text-mks-red" }) },
    { id: 'supply', name: 'Kitchen Equipment Supply', description: 'A vast inventory of new and reconditioned equipment from leading brands.', icon: React.createElement(IconClipboardList, { className: "w-10 h-10 text-mks-red" }) },
    { id: 'sourcing', name: 'Special Product Sourcing', description: 'Access to a global network for sourcing specialized equipment and parts.', icon: React.createElement(IconSearch, { className: "w-10 h-10 text-mks-red" }) },
    { id: 'support', name: 'Dedicated Customer Support', description: 'Expert advice and long-term partnership to ensure your success.', icon: React.createElement(IconUser, { className: "w-10 h-10 text-mks-red" }) },
    { id: 'design', name: 'QSR Design', description: 'Optimized workflow for speed and efficiency.' },
    { id: 'restaurant', name: 'Restaurant & Cafe Kitchens', description: 'Custom layouts for any culinary style.' },
    { id: 'fabrication', name: 'Custom Fabrication', description: 'Bespoke stainless steel tables, sinks, and shelves.' }
];

const whyChooseUsData: WhyChooseUsItem[] = [
    { title: 'Nationwide Footprint', description: 'With branches in all major hubs, we provide prompt and efficient service across Southern Africa, ensuring you get the support you need, when you need it.', icon: IconDeliveryTruck },
    { title: 'Quality Assurance', description: 'We partner with the world\'s leading brands and offer our own line of MKS Innovation products, guaranteeing high standards of quality, durability, and performance.', icon: IconQuality },
    { title: 'Expert Technical Support', description: 'Our team of highly skilled technicians provides installation, maintenance, and repair services to keep your kitchen running smoothly and efficiently.', icon: IconWrenchScrewdriver },
];

const promotionsData: PromotionItem[] = [
    { id: 'promo_contact', title: 'Custom Quotes & Bulk Discounts', description: 'Planning a large project or need multiple items? Contact our sales team directly for personalized quotes, package deals, and exclusive bulk purchase discounts tailored to your business needs.', imageUrl: 'https://i.postimg.cc/fbwLwmYb/20250829-1117-South-Africa-Map-remix-01k3thq4edesnrbmc6b0v2wp2g.png' },
    { id: 'promo_design', title: 'Free Kitchen Design Consultation', description: 'Embarking on a new venture? Get a free, no-obligation consultation with our kitchen design experts to plan your optimal workflow and equipment layout.', imageUrl: 'https://i.postimg.cc/vmwbTYQ6/20250825-1346-Commercial-Kitchen-Design-simple-compose-01k3ggpwgvfx0tfqfpsppj1y7j.png' },
];

const contactInfoData: ContactInfo = {
    phone: [
        'JHB: 061 510 4022',
        'CPT: 021 982 0036',
        'PE: +27 84 300 2730',
        'DURBAN: 084 300 2730',
        'ZAMBIA: +260 211 282 432'
    ],
    email: [
        'sales@mksfoodservice.co.za',
        'salesjhb@mksfoodservice.co.za',
        'salescpt@mksfoodservice.co.za',
        'salespe@mksfoodservice.co.za',
        'salesdbn@mksfoodservice.co.za',
        'saleszambia@mksfoodservice.co.za',
    ],
    addresses: [
        'JHB: MKS INNOVATION, 5 LATHE STREET, ISANDO, KEMPTON PARK, GAUTENG, 1600',
        'CPT: UNIT 5, 40 EAGLE STREET, OKAVANGO, BRACKENFELL, CAPE TOWN, WESTERN CAPE 7560',
        'PE: UNIT 2, ALDO PARK, BUSINESS PARK, GREENBUSHES INDUSTRIAL PARK, GATE 2, OLD CAPE ROAD, PORT ELIZABETH, EASTERN CAPE, 6001',
        'DURBAN: UNIT 9, 155 ROCHDALE ROAD, SPRINGFIELD, DURBAN, KWAZULU NATAL, 4001',
        'ZAMBIA: PLOT NO: 396 A, WAREHOUSE 3, SAAD COMPLEX, TEAGLES ROAD, LUSAKA',
    ],
    operatingHours: [
        'Mon - Thu: 8:00 AM - 4:30 PM',
        'Fri: 8:00 AM - 3:00 PM',
        'Sat - Sun: Closed'
    ]
};

const navigationData: NavLinkItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products', subLinks: [
        { label: 'All Products', path: '/products' },
        { label: 'Foods Processing', path: '/products?category=new_equipment' },
        { label: 'Cooking Equipment', path: '/products?category=cooking_equipment' },
        { label: 'Beverage/Refrigeration', path: '/products?category=beverage_refrigeration' },
        { label: 'Kitchenware', path: '/products?category=smalls_kfc' },
        { label: 'MKS Spares', path: '/products?category=mks_spares' }
    ]},
    { label: 'Brands', path: '/brands' },
    { label: 'Services', path: '/services' },
    { label: 'Concepts', path: '/concepts' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'Contact', path: '/contact' },
];

const companyLinksData: NavLinkItem[] = [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' }
];

// FIX: Replaced JSX syntax with React.createElement to avoid errors in a .ts file.
const socialMediaData = [
    { name: 'Facebook', url: 'https://www.facebook.com/mksfood/', icon: React.createElement(IconFacebook, { className: "w-6 h-6" }) },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/master-kitchen-solution/', icon: React.createElement(IconLinkedIn, { className: "w-6 h-6" }) },
];

export const mksData: MKSData = {
    companyName: 'MKS Food Service',
    tagline: 'Your Partner in Culinary Excellence',
    logoUrl: 'https://i.postimg.cc/qM54ycGn/ei-1741703726769-removebg-preview-3.png',
    navigation: navigationData,
    aboutUs: {
        short: 'Leading independent Commercial Catering Equipment distributor in South Africa since 2019 and a Proud Level 1 B-BBEE Contributor.',
        detailed: 'Since our establishment in 2019, Master Kitchen Solution (MKS) has rapidly grown to become a leading independent distributor of commercial catering equipment in South Africa. Our journey is built on a foundation of industry expertise, a passion for innovation, and an unwavering commitment to our clients. We understand the dynamic and demanding nature of the foodservice industry, and we pride ourselves on providing robust, efficient, and reliable solutions that empower chefs and businesses to excel. As a proudly Level 1 B-BBEE contributor, we are dedicated to fostering growth and transformation within our community and the broader economy.',
        mission: 'To provide the foodservice industry with superior quality equipment, innovative solutions, and exceptional service, ensuring our clients achieve operational excellence and culinary success.',
        vision: 'To be the most trusted and sought-after partner for commercial kitchen solutions in Southern Africa, renowned for our expertise, reliability, and commitment to customer satisfaction.',
    },
    whyChooseUs: whyChooseUsData,
    productCategories: productCategoriesData,
    services: servicesData,
    promotions: promotionsData,
    contactInfo: contactInfoData,
    socialMedia: socialMediaData,
    brandPartners: brandPartnersData,
    companyLinks: companyLinksData,
};