import React from 'react';

export interface NavLinkItem {
  label: string;
  path: string;
  subLinks?: NavLinkItem[];
}

export interface ProductCategory {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export interface Product {
  id: string; // Product Code
  name: string;
  category: string; // Original category from CSV
  categoryId: string; // Maps to a ProductCategory id
  brandName?: string; // Explicit brand name for filtering
  description: string;
  price: string;
  inStock: number;
  imageUrl: string;
  subCategory?: 'Utensils' | 'Containers & Storage' | 'Tools & Gadgets' | 'Baskets & Racks';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ServiceItem {
  id:string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string | React.FC<{ className?: string }>;
}

export interface PromotionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ContactInfo {
  phone: string[];
  email: string[];
  addresses: string[];
  operatingHours: string[];
}

export interface BrandPartner {
  name: string;
  logoUrl: string;
  path?: string;
  page?: {
    logoUrl?: string;
    description: string;
    videoUrl?: string;
    imageSlides?: string[];
    bannerImageUrl?: string;
    additionalContent?: {
      heading: string;
      paragraphs: string[];
    };
  }
}

export interface MKSData {
  companyName: string;
  tagline: string;
  logoUrl?: string; 
  partnerLogoUrl?: string;
  heroImageUrl?: string;
  heroSlides?: string[];
  navigation: NavLinkItem[];
  aboutUs: {
    short: string;
    detailed: string;
    mission?: string;
    vision?: string;
  };
  whyChooseUs: WhyChooseUsItem[];
  productCategories: ProductCategory[];
  services: ServiceItem[];
  promotions: PromotionItem[];
  contactInfo: ContactInfo;
  socialMedia: { name: string; url: string; icon?: React.ReactNode }[];
  brandPartners?: BrandPartner[];
  companyLinks: NavLinkItem[];
}

export interface MksSparePart {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}
