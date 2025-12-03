export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: 'https://josepmartinezboix.com/sitemap.xml',
        host: 'https://josepmartinezboix.com',
    };
}
