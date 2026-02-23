import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://checkascam.co.za';
  const routes = [
    '/',
    '/banking-fraud-south-africa',
    '/investment-scams',
    '/whatsapp-scams',
    '/medical-aid-fraud-south-afica',
    '/phone-number-check-south-africa',
    '/scam-psychology',
    '/how-scams-work',
    '/privacy-policy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
