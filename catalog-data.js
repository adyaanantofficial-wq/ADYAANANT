(function () {
    function createDetailSection(title, description, items) {
        const section = [
            "<section class=\"detail-section\">",
            "<h3>" + title + "</h3>",
            "<p>" + description + "</p>"
        ];

        if (Array.isArray(items) && items.length) {
            section.push("<ul class=\"detail-list\">");
            items.forEach(function (item) {
                section.push("<li>" + item + "</li>");
            });
            section.push("</ul>");
        }

        section.push("</section>");
        return section.join("");
    }

    function createDigitalBookProduct(config) {
        return {
            id: config.id,
            group: "Digital",
            title: config.title,
            type: config.type,
            badge: config.badge,
            originalPrice: config.originalPrice,
            price: config.price,
            summary: config.summary,
            features: config.features,
            keywords: config.keywords,
            visual: {
                type: "image",
                src: config.imageSrc,
                alt: config.title + " cover"
            },
            detailHtml: [
                createDetailSection(config.primaryHeading, config.overview, config.detailPoints),
                createDetailSection(config.secondaryHeading, config.audience)
            ].join("")
        };
    }

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
        },
        createDigitalBookProduct({
            id: "byabostha-sorbosyo",
            title: "Byabostha Sorbosyo",
            type: "Ritual reference e-book",
            badge: "Ritual Guide",
            originalPrice: 249,
            price: 89,
            summary: "A traditional ritual-reference style digital book presented for readers who want procedural guidance around ceremonies and observances.",
            features: [
                "Procedure-oriented ritual reference",
                "Useful for repeat consultation during planning",
                "Strong fit for household and priestly study shelves"
            ],
            keywords: [
                "byabostha sorbosyo",
                "ritual guide",
                "hindu rites",
                "sanskar",
                "ceremony reference",
                "purohit book"
            ],
            imageSrc: "digital-book-covers/byabostha-sorbosyo.png",
            primaryHeading: "Overview",
            overview: "This AI-generated catalog summary presents Byabostha Sorbosyo as a structured reference volume for readers interested in ritual order, ceremonial preparation, and classical step-based observance guidance.",
            detailPoints: [
                "The cover positioning suggests a practical book meant to be consulted during ceremonies rather than read like a continuous story.",
                "It suits buyers who want a digital copy they can reopen quickly while reviewing rites, duties, or household observances.",
                "The topic profile makes it a natural addition beside puja, sanskar, and priestly support texts."
            ],
            secondaryHeading: "Who it suits",
            audience: "Best for readers building a ritual reference library, learners exploring traditional procedure texts, and families who prefer keeping important guidance accessible in digital form."
        }),
        createDigitalBookProduct({
            id: "hindu-sanrbsya",
            title: "Hindu Sanrbsya",
            type: "Cultural reference e-book",
            badge: "Classic",
            originalPrice: 199,
            price: 79,
            summary: "A broad Hindu reference-style digital title suited to readers looking for customs, beliefs, and foundational cultural context in one place.",
            features: [
                "General Hindu reference positioning",
                "Compact choice for beginner reading stacks",
                "Useful as a quick-access digital library item"
            ],
            keywords: [
                "hindu sanrbsya",
                "hindu sarbasya",
                "hindu reference",
                "hindu culture",
                "customs",
                "beliefs"
            ],
            imageSrc: "digital-book-covers/hindu-sanrbsya.png",
            primaryHeading: "Overview",
            overview: "This AI-written storefront description frames Hindu Sanrbsya as a wide-angle Hindu knowledge title, likely intended to give readers a concise orientation to tradition, values, and practical cultural understanding.",
            detailPoints: [
                "It reads like the kind of book someone keeps nearby for clarification instead of only for one-time reading.",
                "The broad theme makes it approachable for buyers who want an entry point before moving into more specialized scriptures.",
                "As a digital product, it fits well inside a personal study archive focused on religion, culture, and inherited practice."
            ],
            secondaryHeading: "Who it suits",
            audience: "A good fit for curious readers, beginners assembling a spiritual reading collection, and anyone who wants a general Hindu reference book in portable form."
        }),
        createDigitalBookProduct({
            id: "chanakya-niti",
            title: "Chanakya Niti",
            type: "Wisdom and ethics e-book",
            badge: "Wisdom",
            originalPrice: 149,
            price: 59,
            summary: "A digital wisdom text centered on practical ethics, strategy, restraint, leadership, and observation-driven life advice.",
            features: [
                "Short-form wisdom and policy reflections",
                "Useful for repeated reading and note-taking",
                "Strong appeal for strategy and ethics readers"
            ],
            keywords: [
                "chanakya niti",
                "chanakya",
                "niti",
                "wisdom",
                "ethics",
                "strategy",
                "leadership"
            ],
            imageSrc: "digital-book-covers/chanakya-niti.png",
            primaryHeading: "Overview",
            overview: "This AI-generated catalog note presents Chanakya Niti as a classic reading choice for people drawn to sharp observations about conduct, discipline, leadership, and practical decision-making.",
            detailPoints: [
                "Its reputation as an aphoristic text makes it especially useful for slow reading, reflection, and daily quotation-style study.",
                "Readers often value this kind of title for mindset building, self-control, and strategic thinking rather than devotional reading alone.",
                "The digital format makes it easier to revisit individual teachings without flipping through a physical copy."
            ],
            secondaryHeading: "Who it suits",
            audience: "Best for readers interested in classical statecraft, self-discipline, personal growth, and concise teachings that stay relevant across different stages of life."
        }),
        createDigitalBookProduct({
            id: "bigyan-bhairav-tantra",
            title: "Bigyan Bhairav Tantra",
            type: "Meditation text e-book",
            badge: "Tantra Text",
            originalPrice: 299,
            price: 129,
            summary: "A contemplative digital text presented for readers exploring inner awareness, meditative depth, and Shiva-Shakti oriented spiritual reflection.",
            features: [
                "Meditation-centered classical reading",
                "Useful for reflective and non-rushed study",
                "Pairs well with spiritual practice libraries"
            ],
            keywords: [
                "bigyan bhairav tantra",
                "vigyan bhairav tantra",
                "vijnana bhairava",
                "tantra",
                "meditation",
                "shiva shakti"
            ],
            imageSrc: "digital-book-covers/bigyan-bhairav-tantra.png",
            primaryHeading: "Overview",
            overview: "This AI-generated storefront summary positions Bigyan Bhairav Tantra as a meditation-oriented spiritual text associated with awareness practices, subtle contemplation, and inward experiential inquiry.",
            detailPoints: [
                "It is best approached as a reflective work where readers spend time with individual methods instead of rushing through chapters.",
                "The subject profile makes it attractive to people already interested in meditation, non-dual thought, or tantric philosophy.",
                "Keeping it in digital format helps with revisiting passages during regular practice or study sessions."
            ],
            secondaryHeading: "Who it suits",
            audience: "A strong match for mature readers exploring contemplative traditions, meditation practitioners, and students of Shiva-centered spiritual literature."
        }),
        createDigitalBookProduct({
            id: "markyondo-puran",
            title: "Markyondo Puran",
            type: "Puranic scripture e-book",
            badge: "Purana",
            originalPrice: 249,
            price: 99,
            summary: "A puranic digital reading product for those interested in sacred storytelling, devotional imagination, and traditional narrative cosmology.",
            features: [
                "Mythic and devotional reading profile",
                "Suitable for scripture-focused digital shelves",
                "Good companion to broader purana study"
            ],
            keywords: [
                "markyondo puran",
                "markandeya purana",
                "puran",
                "purana",
                "mythology",
                "devotional text"
            ],
            imageSrc: "digital-book-covers/markyondo-puran.png",
            primaryHeading: "Overview",
            overview: "This AI-written catalog summary presents Markyondo Puran as a traditional puranic title meant for readers who appreciate sacred narrative, layered symbolism, and classical devotional storytelling.",
            detailPoints: [
                "Puranic works are often valued for blending myth, teaching, worldview, and memory-rich storytelling in one stream.",
                "The book works well for readers who want to deepen a personal scripture library beyond short manuals or quote collections.",
                "A digital edition is especially helpful for casual revisits, topic browsing, and portable reading."
            ],
            secondaryHeading: "Who it suits",
            audience: "Best for readers of Hindu mythology, students of puranic literature, and devotees who like keeping narrative scripture close at hand."
        }),
        createDigitalBookProduct({
            id: "purohit-dorpon",
            title: "Purohit Dorpon",
            type: "Priestly guide e-book",
            badge: "Priest Guide",
            originalPrice: 279,
            price: 109,
            summary: "A working-reference style digital guide aimed at ceremonial flow, priestly preparation, and practical ritual handling.",
            features: [
                "Priestly and ceremony-support orientation",
                "Reference-friendly for repeated consultation",
                "Useful for organized ritual preparation"
            ],
            keywords: [
                "purohit dorpon",
                "purohit darpan",
                "priest guide",
                "ritual manual",
                "purohit",
                "ceremony"
            ],
            imageSrc: "digital-book-covers/purohit-dorpon.png",
            primaryHeading: "Overview",
            overview: "This AI-generated storefront note frames Purohit Dorpon as a practical support text for those who need ceremonial structure, priestly sequencing, and accessible ritual reference material.",
            detailPoints: [
                "It appears designed more for use and consultation than for casual cover-to-cover reading.",
                "That makes it especially useful for people who prepare for rites, assist in ceremonies, or keep a functional religious study archive.",
                "The digital format adds convenience when cross-checking portions of a process quickly."
            ],
            secondaryHeading: "Who it suits",
            audience: "A strong fit for purohits, ritual assistants, household organizers of ceremonies, and readers who want a practical guidebook instead of only a theoretical text."
        }),
        createDigitalBookProduct({
            id: "devi-puranam",
            title: "Devi Puranam",
            type: "Devotional scripture e-book",
            badge: "Devi Text",
            originalPrice: 229,
            price: 89,
            summary: "A devotional digital scripture centered on the Divine Feminine, sacred narrative, reverence, and tradition-rich reading.",
            features: [
                "Devi-focused devotional reading",
                "Suitable for spiritual library collections",
                "Portable format for regular revisits"
            ],
            keywords: [
                "devi puranam",
                "devi puran",
                "goddess scripture",
                "devi",
                "shakti",
                "devotional text"
            ],
            imageSrc: "digital-book-covers/devi-puranam.png",
            primaryHeading: "Overview",
            overview: "This AI-generated catalog summary presents Devi Puranam as a reverential scripture-oriented reading choice for those drawn to goddess traditions, sacred narration, and devotional study.",
            detailPoints: [
                "The theme makes it especially appealing to readers interested in Shakti-focused literature and spiritual storytelling.",
                "It can serve both as a devotional reading companion and as part of a broader classical scripture collection.",
                "Digital access makes it easier to return to selected sections during personal study or observance."
            ],
            secondaryHeading: "Who it suits",
            audience: "Best for devotees of the Divine Feminine, scripture readers expanding a goddess-centered collection, and learners who want a convenient devotional text in digital form."
        }),
        {
            id: "docterhome",
            group: "Digital",
            title: "Medico AI Home",
            type: "Medical AI platform",
            badge: "External",
            originalPrice: 0,
            price: 0,
            externalLink: "https://sites.google.com/view/medicoaihome/home",
            summary: "Access Medico AI Home - an AI-powered medical information platform.",
            features: [
                "AI-powered medical insights",
                "Easy to access and navigate",
                "External platform access"
            ],
            keywords: [
                "medico",
                "ai",
                "medical",
                "health",
                "doctor",
                "home"
            ],
            visual: {
                type: "text",
                value: "DOC"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>About Medico AI Home</h3>",
                "<p>Medico AI Home is an external platform providing AI-powered medical information and insights.</p>",
                "<ul class=\"detail-list\">",
                "<li>Access to medical information powered by AI.</li>",
                "<li>User-friendly interface for easy navigation.</li>",
                "<li>Visit the platform directly for more details.</li>",
                "</ul>",
                "</section>"
            ].join("")
        },
        {
            id: "imagetools",
            group: "Digital",
            title: "Compress Image Super Fast",
            type: "Image compression tool",
            badge: "Tool",
            originalPrice: 0,
            price: 0,
            externalLink: "https://sites.google.com/view/compressimagesuperfast/home",
            summary: "Compress images super fast with this online image optimization tool.",
            features: [
                "Fast image compression",
                "Easy to use online tool",
                "Optimize images instantly"
            ],
            keywords: [
                "image",
                "compress",
                "tool",
                "optimization",
                "fast",
                "image compression"
            ],
            visual: {
                type: "text",
                value: "IMG"
            },
            detailHtml: [
                "<section class=\"detail-section\">",
                "<h3>About Compress Image Super Fast</h3>",
                "<p>A fast and efficient online tool for compressing and optimizing images.</p>",
                "<ul class=\"detail-list\">",
                "<li>Compress images to smaller file sizes instantly.</li>",
                "<li>Simple web-based interface requires no installation.</li>",
                "<li>Maintain image quality while reducing file size.</li>",
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
