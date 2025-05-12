import { writeFileSync } from 'fs';
import { resolve } from 'path';

type PageConfig = {
    path: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

async function generateSitemap() {
    const pages: PageConfig[] = [
        {
            path: '',           // home
            changefreq: 'daily',
            priority: 1.0
        },
        {
            path: '/journal',
            changefreq: 'always',
            priority: 0.9
        },
        {
            path: '/social',
            changefreq: 'hourly',
            priority: 0.9
        },
        {
            path: '/login',
            changefreq: 'monthly',
            priority: 0.7
        },
        {
            path: '/signup',
            changefreq: 'monthly',
            priority: 0.7
        },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map(({ path, changefreq, priority }) => {
                return `
                    <url>
                        <loc>${`https://gratilog.co.uk${path}`}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        <changefreq>${changefreq}</changefreq>
                        <priority>${priority}</priority>
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