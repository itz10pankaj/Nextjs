// src/utils/metadata.ts
import { Metadata } from 'next';

type RouteMetadata = {
  [key: string]: Metadata;
};

const metadataConfig: RouteMetadata = {
  '/': {
    title: 'Home | MyApp',
    description: 'Welcome to MyApp - the best solution for your needs',
    keywords: ['home', 'main', 'landing'],
  },
  '/about': {
    title: 'About Us | MyApp',
    description: 'Learn more about our company and mission',
    keywords: ['about', 'company', 'mission'],
  },
  '/contact': {
    title: 'Contact Us | MyApp',
    description: 'Get in touch with our team',
    keywords: ['contact', 'email', 'support'],
  },
};

export const getMetadata = (pathname: string): Metadata => {
  const defaultMetadata: Metadata = {
    title: 'MyApp',
    description: 'The best solution for your needs',
  };

  const route = Object.keys(metadataConfig).find((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  return route ? metadataConfig[route] : defaultMetadata;
};