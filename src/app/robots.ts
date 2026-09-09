import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/stories/', '/api/stories/'],
        },
        sitemap: 'https://ganeshangadi.online/sitemap.xml',
    };
}
