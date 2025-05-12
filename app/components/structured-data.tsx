export default function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Gratilog",
        "description": "A social gratitude journaling platform that helps users cultivate mindfulness and positivity through daily gratitude practice.",
        "url": "https://gratilog.co.uk",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Any",
        "offers": {},
        "featureList": [
            "Daily gratitude journaling",
            "Social sharing of gratitude moments",
            "Community inspiration",
            "Streak tracking",
            "Private journaling option"
        ],
        "author": {
            "@type": "Organization",
            "name": "Gratilog",
            "url": "https://gratilog.co.uk"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
} 