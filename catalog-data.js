(function () {
    const digitalProducts = [
        {
            id: "legend-star-bot",
            group: "Digital",
            title: "Legend Star Bot",
            type: "Discord security bot",
            badge: "Best Seller",
            originalPrice: 150,
            price: 100,
            summary: "A protection and command bot with firewall layers, study tools, and temp voice controls.",
            features: [
                "12 active firewall layers for server safety",
                "Study and activity commands for student servers",
                "Temp voice creation and owner controls"
            ],
            keywords: [
                "legend",
                "star",
                "bot",
                "discord",
                "security",
                "firewall",
                "temp voice",
                "study"
            ],
            visual: {
                type: "image",
                src: "legendstar.png",
                alt: "Legend Star Bot"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>What you get</h3>",
                "<p>Legend Star Bot is built for communities that want protection, moderation control, and daily utility inside one bot.</p>",
                "<ul class=\"detail-list\">",
                "<li>Defense stack with anti-spam, anti-raid, anti-webhook, anti-nuke, and recovery-focused layers.</li>",
                "<li>Study-side commands such as rank, personal status, leaderboard checks, and yesterday insights.</li>",
                "<li>Temp voice automation with lock, unlock, rename, limit, permit, deny, and owner controls.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Best fit</h3>",
                "<p>Good for student communities, managed Discord servers, and spaces that need one product to cover security and utility at the same time.</p>",
                "</section>"
            ].join("")
        },
        {
            id: "legendbot",
            group: "Digital",
            title: "LegendBot",
            type: "Study tracker bot",
            badge: "Quick Start",
            originalPrice: 50,
            price: 30,
            summary: "A lightweight study-stat bot for status checks, leaderboards, and yesterday reports.",
            features: [
                "Daily study time tracking",
                "Current and previous leaderboard views",
                "Simple command-first setup"
            ],
            keywords: [
                "legendbot",
                "study",
                "tracker",
                "leaderboard",
                "discord",
                "mystatus",
                "lb",
                "ylb",
                "yst"
            ],
            visual: {
                type: "image",
                src: "legendstar.png",
                alt: "LegendBot"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Core commands</h3>",
                "<ul class=\"detail-list\">",
                "<li>/mystatus for your daily study time.</li>",
                "<li>/lb for the current leaderboard.</li>",
                "<li>/ylb for the previous day leaderboard.</li>",
                "<li>/yst for your yesterday study report.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Why people use it</h3>",
                "<p>LegendBot keeps student communities focused because the commands are fast, easy to read, and centered on daily accountability.</p>",
                "</section>"
            ].join("")
        },
        {
            id: "legend-meta-super-legend-combo",
            group: "Digital",
            title: "Legend Meta + Super Legend Combo",
            type: "Security combo pack",
            badge: "Combo",
            originalPrice: 150,
            price: 100,
            summary: "A combo-focused protection package for communities that want an always-on security stack.",
            features: [
                "12-layer zero-trust protection setup",
                "Raid, nuke, malware, and webhook protection",
                "Built for high-risk or fast-growing servers"
            ],
            keywords: [
                "legend meta",
                "super legend",
                "combo",
                "security",
                "discord",
                "anti raid",
                "anti nuke"
            ],
            visual: {
                type: "image",
                src: "legendstar.png",
                alt: "Legend Meta plus Super Legend Combo"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Security focus</h3>",
                "<p>This combo is designed for server owners who want layered protection instead of a single narrow moderation tool.</p>",
                "<ul class=\"detail-list\">",
                "<li>Anti-spam, anti-ping, anti-raid, anti-webhook, and anti-nuke style protection.</li>",
                "<li>Recovery-minded coverage so damaged channels and server structure can be restored faster.</li>",
                "<li>A strong fit for communities that cannot afford noisy downtime or trust issues.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "custom-bot",
            group: "Digital",
            title: "Custom Bot",
            type: "On-demand build",
            badge: "Custom",
            originalPrice: 650,
            price: 500,
            summary: "A custom bot build for your workflow, moderation logic, commands, and automation needs.",
            features: [
                "Tailored feature planning",
                "Command and permission design",
                "Scope discussion before delivery"
            ],
            keywords: [
                "custom bot",
                "bot development",
                "discord bot",
                "automation",
                "custom build"
            ],
            visual: {
                type: "text",
                value: "BOT"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Build scope</h3>",
                "<p>Use this for a bot that needs to match your exact rules, commands, workflows, or community behavior.</p>",
                "<ul class=\"detail-list\">",
                "<li>Custom slash commands, moderation flows, utility actions, ticket systems, or role logic.</li>",
                "<li>Planned around your server instead of forcing your server to fit a generic tool.</li>",
                "<li>The order handoff is used to start the feature and delivery conversation quickly.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "custom-website",
            group: "Digital",
            title: "Custom Website",
            type: "On-demand build",
            badge: "Responsive",
            originalPrice: 1400,
            price: 1000,
            summary: "A branded responsive website for business, portfolio, community, or product launch goals.",
            features: [
                "Modern landing pages or multi-section sites",
                "Responsive layout for desktop and mobile",
                "Custom planning and revision flow"
            ],
            keywords: [
                "custom website",
                "web design",
                "landing page",
                "responsive site",
                "website build"
            ],
            visual: {
                type: "text",
                value: "WEB"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Website direction</h3>",
                "<p>This option is for clients who want a cleaner public presence with custom layout, branding, and structured content.</p>",
                "<ul class=\"detail-list\">",
                "<li>Landing pages, business pages, product showcases, study portals, or portfolio websites.</li>",
                "<li>Built to look polished across PC, tablet, and phone screens.</li>",
                "<li>Order submission opens the same contact path so scope and delivery can be confirmed fast.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "custom-webapp",
            group: "Digital",
            title: "Custom WebApp",
            type: "On-demand build",
            badge: "App Build",
            originalPrice: 1500,
            price: 1000,
            summary: "Interactive tools, dashboards, admin panels, and workflow systems that need more than a static site.",
            features: [
                "App-style forms, tools, and dashboards",
                "Practical UX for internal or customer-facing work",
                "Feature planning before development starts"
            ],
            keywords: [
                "custom webapp",
                "web app",
                "dashboard",
                "admin panel",
                "software",
                "portal"
            ],
            visual: {
                type: "text",
                value: "APP"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>What this covers</h3>",
                "<p>Choose this when you need real screens, roles, logic, and workflow behavior instead of a brochure-style website.</p>",
                "<ul class=\"detail-list\">",
                "<li>Dashboards, admin tools, internal panels, forms, and customer-facing web systems.</li>",
                "<li>Planned for future growth instead of a single fixed page.</li>",
                "<li>Fast order handoff so the conversation can move into features and delivery timing.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "self-hypnosis-by-ronald-shone",
            group: "Digital",
            title: "Self-hypnosis by Ronald Shone",
            type: "Digital book",
            badge: "New Arrival",
            originalPrice: 180,
            price: 10,
            summary: "A digital reading product for calm focus, self-conditioning, and guided inner practice.",
            features: [
                "Digital delivery",
                "Mindset and self-guidance topic",
                "Easy add-on item in the digital catalog"
            ],
            keywords: [
                "self hypnosis",
                "ronald shone",
                "digital book",
                "ebook",
                "mindset",
                "focus",
                "relaxation"
            ],
            visual: {
                type: "image",
                src: "Self-hypnosis by Ronald Shone.png",
                alt: "Self-hypnosis by Ronald Shone"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Reading focus</h3>",
                "<p>This catalog item is presented as a digital reading product centered on self-hypnosis, guided focus, and inner conditioning themes.</p>",
                "<ul class=\"detail-list\">",
                "<li>Good for buyers looking for a mindset-oriented digital item inside the same storefront.</li>",
                "<li>Delivered as part of the digital products flow with the standard details and order handoff.</li>",
                "<li>Added at the end of the digital lineup as requested.</li>",
                "</ul>",
                "</section>"
            ].join("")
        }
    ];

    const realProducts = [
        {
            id: "m19-wireless-earbuds",
            group: "Real",
            title: "M19 Wireless Earbuds",
            type: "Bluetooth 5.1 earbuds",
            badge: "Hot Deal",
            originalPrice: 2000,
            price: 290,
            summary: "Wireless earbuds with LED display, Bluetooth 5.1, 9D HiFi sound, touch control, and IPX7 waterproof support.",
            features: [
                "LED battery display on the charging case",
                "Touch control with wireless charging case",
                "IPX7 waterproof support"
            ],
            keywords: [
                "m19",
                "wireless earbuds",
                "bluetooth 5.1",
                "led display",
                "9d hifi",
                "waterproof",
                "touch control",
                "charging case"
            ],
            visual: {
                type: "image",
                src: "m 19 earbud.webp",
                alt: "M19 Wireless Earbuds"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Offer snapshot</h3>",
                "<p>The M19 is the value-led option in the real products section, built around display visibility, waterproof support, and day-to-day ease.</p>",
                "<ul class=\"detail-list\">",
                "<li>LED digital display helps show battery status quickly.</li>",
                "<li>Bluetooth 5.1 and touch control support regular mobile use.</li>",
                "<li>IPX7 waterproof positioning adds confidence for active use.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "m88-plus-tws",
            group: "Real",
            title: "M88 Plus TWS True Wireless Earbuds",
            type: "Gaming and ENC earbuds",
            badge: "60Hr Playtime",
            originalPrice: 5000,
            price: 500,
            summary: "In-ear earbuds with digital display, Bluetooth 5.3, ENC calling mics, Type-C fast charging, and 45ms low latency mode.",
            features: [
                "Up to 60 hours playtime",
                "Bluetooth 5.3 with instant pairing",
                "ENC calling mics and low-latency gaming mode"
            ],
            keywords: [
                "m88",
                "m88 plus",
                "tws",
                "bluetooth 5.3",
                "enc",
                "gaming",
                "45ms",
                "60 hours",
                "type c"
            ],
            visual: {
                type: "image",
                src: "m88-plus-wireless-earbud-1000x1000.webp",
                alt: "M88 Plus TWS True Wireless Earbuds"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Performance focus</h3>",
                "<p>The M88 Plus is the strongest feature-heavy real product in the current lineup, aimed at battery life, calling clarity, and gaming response.</p>",
                "<ul class=\"detail-list\">",
                "<li>Up to 60 hours playtime makes this the long-session pick.</li>",
                "<li>Bluetooth 5.3 and instant pairing push it toward a newer wireless profile.</li>",
                "<li>ENC mics and 45ms low latency make it better suited for calls and gaming.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "m10-true-wireless-earbuds",
            group: "Real",
            title: "M10 True Wireless Earbuds",
            type: "Noise-cancelling earbuds",
            badge: "Waterproof",
            originalPrice: 1500,
            price: 600,
            summary: "True wireless Bluetooth 5.1 earbuds with mic, waterproof design, noise cancellation, auto pairing, and a black finish.",
            features: [
                "Bluetooth 5.1 connection",
                "Waterproof design with mic",
                "Noise-cancelling positioning and auto pairing"
            ],
            keywords: [
                "m10",
                "true wireless",
                "bluetooth 5.1",
                "noise cancellation",
                "waterproof",
                "auto pairing",
                "mic",
                "black earbuds"
            ],
            visual: {
                type: "image",
                src: "m10 earbud.webp",
                alt: "M10 True Wireless Earbuds"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>Everyday profile</h3>",
                "<p>The M10 keeps the offer simple: wireless pairing, waterproof positioning, a built-in mic, and a familiar black in-ear look.</p>",
                "<ul class=\"detail-list\">",
                "<li>Bluetooth 5.1 is aimed at stable daily wireless use.</li>",
                "<li>Auto pairing speeds up repeat connections after first setup.</li>",
                "<li>Waterproof positioning and noise-cancelling claims shape the main selling story.</li>",
                "</ul>",
                "</section>"
            ].join("")
        }
    ];

    function enrichProducts(source, groupKey) {
        return source.map(function (product) {
            const originalPrice = Number(product.originalPrice || product.price || 0);
            const price = Number(product.price || 0);
            const discountPercent = originalPrice > price && originalPrice > 0
                ? Math.round(((originalPrice - price) / originalPrice) * 100)
                : 0;

            return {
                ...product,
                groupKey: groupKey,
                originalPrice: originalPrice,
                price: price,
                discountPercent: discountPercent
            };
        });
    }

    const digital = enrichProducts(digitalProducts, "digital");
    const real = enrichProducts(realProducts, "real");
    const allProducts = digital.concat(real);

    window.ADYAANANT_CATALOG = {
        digitalProducts: digital,
        realProducts: real,
        allProducts: allProducts
    };
})();
