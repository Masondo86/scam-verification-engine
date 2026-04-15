import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://checkascam.co.za';
  const routes = [
    '/',
    '/scan',
    '/banking-fraud-south-africa',
    '/investment-scams',
    '/whatsapp-scams',
    '/medical-aid-fraud-south-africa',  // corrected spelling
    '/phone-number-check-south-africa',
    '/scam-psychology',
    '/how-scams-work',
    '/check-scam-message',
    '/privacy-policy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));
}
