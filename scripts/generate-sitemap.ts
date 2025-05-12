import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function generateSitemap() {
    const pages = [
        '',           // home
        '/journal',
        '/social',
        '/login',
        '/signup',
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map((page) => {
                return `
                    <url>
                        <loc>${`https://gratilog.co.uk${page}`}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>${page === '' ? '1.0' : '0.8'}</priority>
                    </url>
                `;
            })
            .join('')}
    </urlset>`;

    writeFileSync(resolve('./public/sitemap.xml'), sitemap.trim());
}

generateSitemap()
    .then(() => {
        console.log('Sitemap generated');
    })
    .catch((e) => {
        console.error('Failed to generate sitemap', e);
    }); 