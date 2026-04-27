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
                "<h3>Product Overview</h3>",
                "<p>Legend Star Bot is a comprehensive Discord bot designed to enhance server security, facilitate study tracking, and provide advanced voice channel management. Perfect for educational communities, gaming groups, and professional servers that require robust protection and utility features.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Security Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>12-Layer Firewall:</strong> Advanced protection system with anti-spam, anti-raid, anti-webhook, and anti-nuke capabilities to safeguard your server from malicious activities.</li>",
                "<li><strong>Automated Moderation:</strong> Intelligent moderation tools that detect and prevent harmful content, ensuring a safe environment for all members.</li>",
                "<li><strong>Recovery Systems:</strong> Built-in recovery mechanisms to restore server integrity in case of security breaches.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Study & Activity Tracking</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Personal Status:</strong> Track individual study hours and activity levels with detailed reports.</li>",
                "<li><strong>Leaderboards:</strong> Competitive rankings to motivate community members and foster healthy study habits.</li>",
                "<li><strong>Daily Insights:</strong> Comprehensive analytics on yesterday's activities and progress tracking.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Voice Channel Management</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Temp Voice Creation:</strong> Dynamically create temporary voice channels as needed.</li>",
                "<li><strong>Advanced Controls:</strong> Lock, unlock, rename, set user limits, and manage permissions for voice channels.</li>",
                "<li><strong>Owner Permissions:</strong> Granular control over voice channel settings for server administrators.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Setup & Support</h3>",
                "<p>Easy installation with step-by-step guides. Includes 24/7 support for setup assistance and ongoing maintenance. Regular updates ensure compatibility with the latest Discord features.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Best For</h3>",
                "<p>Ideal for student communities, educational servers, gaming groups, and professional Discord spaces that prioritize security, productivity, and community engagement.</p>",
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
                "<h3>Product Overview</h3>",
                "<p>LegendBot is a streamlined Discord bot focused on study tracking and community motivation. It provides essential tools for monitoring daily study habits, viewing leaderboards, and maintaining accountability in educational servers.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Commands</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>/mystatus:</strong> Check your personal daily study time and progress.</li>",
                "<li><strong>/lb:</strong> View the current leaderboard ranking all active members.</li>",
                "<li><strong>/ylb:</strong> Access yesterday's leaderboard for comparison and motivation.</li>",
                "<li><strong>/yst:</strong> Get a detailed report of your study activity from the previous day.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Daily Tracking:</strong> Automatic monitoring of study sessions and time spent.</li>",
                "<li><strong>Real-time Updates:</strong> Live leaderboard updates to keep competition engaging.</li>",
                "<li><strong>Historical Data:</strong> Access to previous days' data for progress tracking.</li>",
                "<li><strong>Simple Setup:</strong> Quick installation with minimal configuration required.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Benefits</h3>",
                "<p>LegendBot fosters a productive study environment by promoting accountability and friendly competition. Its lightweight design ensures fast response times and minimal server impact.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Perfect For</h3>",
                "<p>Student study groups, academic Discord servers, and communities focused on personal development and learning goals.</p>",
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
                "<h3>Custom Bot Development</h3>",
                "<p>Get a fully customized Discord bot tailored to your server's unique needs. From moderation systems to entertainment features, we build bots that perfectly match your community's requirements and workflows.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>What's Included</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Custom Commands:</strong> Slash commands and text commands designed specifically for your use cases.</li>",
                "<li><strong>Moderation Logic:</strong> Advanced moderation features including auto-moderation, warning systems, and ban management.</li>",
                "<li><strong>Utility Features:</strong> Server utilities like welcome messages, role management, and custom notifications.</li>",
                "<li><strong>Automation:</strong> Workflow automation for repetitive tasks and server management.</li>",
                "<li><strong>Ticket Systems:</strong> Support ticket creation and management for user assistance.</li>",
                "<li><strong>Role Logic:</strong> Complex role assignment and permission systems.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Development Process</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Requirement Gathering:</strong> Detailed discussion of your needs and server structure.</li>",
                "<li><strong>Feature Planning:</strong> Collaborative design of bot features and user experience.</li>",
                "<li><strong>Custom Development:</strong> Code written specifically for your requirements.</li>",
                "<li><strong>Testing & Deployment:</strong> Thorough testing followed by smooth deployment to your server.</li>",
                "<li><strong>Support & Updates:</strong> Ongoing support and feature updates as needed.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Technical Specifications</h3>",
                "<p>Built with modern Discord.js framework, hosted on reliable infrastructure with 99.9% uptime. Includes source code delivery and full documentation.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Perfect For</h3>",
                "<p>Communities with unique requirements, businesses needing branded bots, gaming servers with custom features, and any server that needs more than off-the-shelf solutions.</p>",
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
                "<h3>Custom Website Development</h3>",
                "<p>Create a professional, responsive website that perfectly represents your brand and meets your specific business goals. From simple landing pages to complex multi-section sites, we build websites that engage visitors and drive results.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Website Types</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Landing Pages:</strong> High-converting single-page sites for product launches or campaigns.</li>",
                "<li><strong>Business Websites:</strong> Multi-page sites with services, about, contact, and blog sections.</li>",
                "<li><strong>Portfolio Sites:</strong> Showcase work, skills, and achievements with elegant design.</li>",
                "<li><strong>Product Showcases:</strong> Display products with galleries, descriptions, and purchase options.</li>",
                "<li><strong>Study Portals:</strong> Educational platforms with course listings and student resources.</li>",
                "<li><strong>Community Sites:</strong> Hub for online communities with forums and member areas.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Features Included</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Responsive Design:</strong> Optimized for desktop, tablet, and mobile devices.</li>",
                "<li><strong>Modern UI/UX:</strong> Clean, professional design with intuitive navigation.</li>",
                "<li><strong>SEO Optimization:</strong> Built with search engines in mind for better visibility.</li>",
                "<li><strong>Fast Loading:</strong> Optimized performance for quick page loads.</li>",
                "<li><strong>Custom Branding:</strong> Incorporates your colors, fonts, and brand identity.</li>",
                "<li><strong>Contact Forms:</strong> Integrated forms for lead generation and inquiries.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Development Process</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Discovery:</strong> Understand your goals, audience, and requirements.</li>",
                "<li><strong>Design:</strong> Create wireframes and mockups for your approval.</li>",
                "<li><strong>Development:</strong> Build with modern technologies and best practices.</li>",
                "<li><strong>Testing:</strong> Comprehensive testing across devices and browsers.</li>",
                "<li><strong>Launch:</strong> Deploy to your domain with ongoing support.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Technical Details</h3>",
                "<p>Built with HTML5, CSS3, and JavaScript. Includes content management system if needed. Hosted on reliable servers with SSL security.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Perfect For</h3>",
                "<p>Businesses, freelancers, educators, product creators, and anyone needing a professional online presence that stands out.</p>",
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
                "<h3>Custom Web Application Development</h3>",
                "<p>Build powerful, interactive web applications with complex functionality, user authentication, databases, and dynamic features. Perfect for businesses needing more than static websites - dashboards, portals, tools, and full-fledged software solutions.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Application Types</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Dashboards:</strong> Real-time data visualization and analytics platforms.</li>",
                "<li><strong>Admin Panels:</strong> Comprehensive management systems for content and users.</li>",
                "<li><strong>Customer Portals:</strong> Secure client areas with account management and services.</li>",
                "<li><strong>Workflow Systems:</strong> Automated business processes and task management.</li>",
                "<li><strong>E-commerce Platforms:</strong> Full online stores with inventory and payment integration.</li>",
                "<li><strong>Internal Tools:</strong> Custom software for team productivity and operations.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Advanced Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>User Authentication:</strong> Secure login systems with role-based access control.</li>",
                "<li><strong>Database Integration:</strong> Robust data storage and management solutions.</li>",
                "<li><strong>API Development:</strong> RESTful APIs for third-party integrations.</li>",
                "<li><strong>Real-time Updates:</strong> Live data synchronization and notifications.</li>",
                "<li><strong>Interactive Forms:</strong> Dynamic forms with validation and conditional logic.</li>",
                "<li><strong>Data Analytics:</strong> Charts, reports, and business intelligence tools.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Technical Stack</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Frontend:</strong> React, Vue.js, or Angular for modern, responsive interfaces.</li>",
                "<li><strong>Backend:</strong> Node.js, Python, or PHP for server-side logic.</li>",
                "<li><strong>Database:</strong> PostgreSQL, MySQL, or MongoDB for data storage.</li>",
                "<li><strong>Hosting:</strong> Cloud deployment on AWS, Google Cloud, or Azure.</li>",
                "<li><strong>Security:</strong> SSL encryption, data protection, and compliance features.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Development Process</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Requirements Analysis:</strong> Detailed specification of features and user stories.</li>",
                "<li><strong>Architecture Design:</strong> System design and technology selection.</li>",
                "<li><strong>Agile Development:</strong> Iterative development with regular client feedback.</li>",
                "<li><strong>Quality Assurance:</strong> Comprehensive testing and performance optimization.</li>",
                "<li><strong>Deployment & Support:</strong> Launch and ongoing maintenance services.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Scalability & Future-Proofing</h3>",
                "<p>Built with scalability in mind, using modern architectures that can grow with your business. Includes documentation, source code, and training for seamless future updates.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Ideal For</h3>",
                "<p>Businesses needing custom software solutions, startups building MVPs, enterprises requiring internal tools, and organizations with complex workflow requirements.</p>",
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
            price: 10,
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
            price: 10,
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
            price: 5,
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
            price: 10,
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
            price: 9,
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
            price: 10,
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
            price: 10,
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
            originalPrice: 500,
            price: 5,
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
                "<p>Medico AI Home is a cutting-edge AI-powered medical information platform designed to provide accessible, accurate health insights and medical knowledge to users worldwide.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>AI-Powered Diagnostics:</strong> Advanced artificial intelligence algorithms for preliminary health assessments and symptom analysis.</li>",
                "<li><strong>Medical Database:</strong> Comprehensive collection of medical information, treatments, and health tips.</li>",
                "<li><strong>Personalized Health Insights:</strong> Tailored recommendations based on user input and health history.</li>",
                "<li><strong>User-Friendly Interface:</strong> Intuitive design making complex medical information easy to understand.</li>",
                "<li><strong>24/7 Accessibility:</strong> Available anytime for health queries and information.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>How It Works</h3>",
                "<p>Simply visit the platform and input your health concerns or questions. The AI system analyzes the information and provides relevant medical insights, potential causes, and general guidance. Always consult with healthcare professionals for medical advice.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Benefits</h3>",
                "<ul class=\"detail-list\">",
                "<li>Educational resource for health awareness</li>",
                "<li>Quick access to medical information</li>",
                "<li>Supports informed decision-making about health</li>",
                "<li>Available in multiple languages</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Important Note</h3>",
                "<p>This platform is designed for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. For medical emergencies, contact qualified healthcare providers immediately.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Access Information</h3>",
                "<p>Visit the external platform at https://sites.google.com/view/medicoaihome/home to explore the full range of AI-powered medical tools and resources.</p>",
                "</section>"
            ].join("")
        },
        {
            id: "imagetools",
            group: "Digital",
            title: "Compress Image Super Fast",
            type: "Image compression tool",
            badge: "Tool",
            originalPrice: 10,
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
                "<p>Compress Image Super Fast is a powerful online image optimization tool that helps users reduce image file sizes without compromising quality. Perfect for web developers, photographers, bloggers, and anyone working with digital images.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Lightning Fast Compression:</strong> Advanced algorithms compress images in seconds, not minutes.</li>",
                "<li><strong>Multiple Format Support:</strong> Works with JPEG, PNG, GIF, WebP, and other popular image formats.</li>",
                "<li><strong>Quality Preservation:</strong> Intelligent compression maintains visual quality while reducing file size.</li>",
                "<li><strong>Batch Processing:</strong> Compress multiple images simultaneously for efficiency.</li>",
                "<li><strong>No Installation Required:</strong> Completely web-based tool accessible from any device.</li>",
                "<li><strong>Free to Use:</strong> No hidden costs or premium features locked behind paywalls.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>How It Works</h3>",
                "<p>Simply upload your images to the platform, choose your compression settings, and let the tool do the work. Download your optimized images instantly, ready for web use, email, or storage.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Benefits</h3>",
                "<ul class=\"detail-list\">",
                "<li>Faster website loading times</li>",
                "<li>Reduced bandwidth usage</li>",
                "<li>Improved SEO performance</li>",
                "<li>Easier file sharing and storage</li>",
                "<li>Better user experience on mobile devices</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Technical Specifications</h3>",
                "<ul class=\"detail-list\">",
                "<li>Maximum file size: 10MB per image</li>",
                "<li>Supported formats: JPEG, PNG, GIF, WebP, BMP</li>",
                "<li>Compression ratio: Up to 90% size reduction</li>",
                "<li>Processing speed: Under 5 seconds per image</li>",
                "<li>Privacy: Images are processed securely and not stored</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Access the Tool</h3>",
                "<p>Visit https://sites.google.com/view/compressimagesuperfast/home to start compressing your images instantly. No registration required - just upload and optimize!</p>",
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
                "<h3>Product Overview</h3>",
                "<p>The M19 Wireless Earbuds are designed for everyday use, offering a perfect blend of style, functionality, and affordability. With advanced Bluetooth 5.1 technology, these earbuds provide seamless connectivity and high-quality audio for music lovers, gamers, and commuters alike.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>LED Battery Display:</strong> The charging case features an intuitive LED display that shows the battery level at a glance, ensuring you're always aware of your earbuds' power status.</li>",
                "<li><strong>9D HiFi Sound:</strong> Experience immersive audio with 9D HiFi sound technology that delivers rich, clear sound across all frequencies, making every beat and melody come alive.</li>",
                "<li><strong>Touch Controls:</strong> Intuitive touch controls allow you to play/pause music, answer calls, skip tracks, and adjust volume with simple taps and gestures.</li>",
                "<li><strong>IPX7 Waterproof:</strong> Rated IPX7, these earbuds are fully resistant to water and sweat, making them ideal for workouts, running in the rain, or daily commutes without worry.</li>",
                "<li><strong>Wireless Charging:</strong> The charging case supports wireless charging for added convenience, compatible with Qi-enabled charging pads.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Specifications</h3>",
                "<ul class=\"detail-list\">",
                "<li>Bluetooth Version: 5.1 for stable and fast connections</li>",
                "<li>Battery Life: Up to 4 hours of playtime per charge, extended to 20 hours with the charging case</li>",
                "<li>Charging Time: Quick 1.5-hour full charge via USB-C</li>",
                "<li>Driver Size: 13mm dynamic drivers for balanced sound</li>",
                "<li>Frequency Response: 20Hz - 20kHz for full-range audio</li>",
                "<li>Impedance: 32Ω for optimal performance</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>What's in the Box</h3>",
                "<ul class=\"detail-list\">",
                "<li>M19 Wireless Earbuds (Left and Right)</li>",
                "<li>Charging Case with LED display</li>",
                "<li>USB-C Charging Cable</li>",
                "<li>User Manual and Warranty Card</li>",
                "<li>Earbud Tips in multiple sizes (S/M/L) for comfortable fit</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Compatibility & Usage</h3>",
                "<p>Compatible with all Bluetooth-enabled devices including smartphones, tablets, laptops, and computers running iOS, Android, Windows, and macOS. Perfect for calls, music streaming, podcasts, and light gaming.</p>",
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
                "<h3>Product Overview</h3>",
                "<p>The M88 Plus TWS True Wireless Earbuds are engineered for gamers, professionals, and audiophiles who demand exceptional performance. Featuring cutting-edge Bluetooth 5.3 technology, advanced ENC noise cancellation, and ultra-low latency, these earbuds deliver an unparalleled audio experience for gaming, calls, and music.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Extended Battery Life:</strong> Enjoy up to 60 hours of continuous playtime, making these earbuds perfect for long gaming sessions, workdays, or travel without frequent recharging.</li>",
                "<li><strong>Bluetooth 5.3:</strong> Latest Bluetooth technology ensures instant pairing, stable connections, and reduced power consumption for optimal performance.</li>",
                "<li><strong>ENC Calling Mics:</strong> Environment Noise Cancellation (ENC) technology filters out background noise during calls, ensuring crystal-clear voice communication in noisy environments.</li>",
                "<li><strong>45ms Low Latency Mode:</strong> Ultra-low latency of just 45ms eliminates audio lag, providing synchronized sound for competitive gaming and video playback.</li>",
                "<li><strong>Type-C Fast Charging:</strong> Quick charge capability allows you to get hours of playtime from just a few minutes of charging.</li>",
                "<li><strong>Digital Display:</strong> The charging case features a digital display showing battery levels for both earbuds and case.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Specifications</h3>",
                "<ul class=\"detail-list\">",
                "<li>Bluetooth Version: 5.3 with advanced codecs support</li>",
                "<li>Battery Life: Up to 8 hours per bud, 60 hours total with case</li>",
                "<li>Charging Time: 10 minutes for 2 hours, full charge in 1 hour</li>",
                "<li>Driver Size: 10mm graphene drivers for enhanced bass</li>",
                "<li>Frequency Response: 20Hz - 40kHz for immersive sound</li>",
                "<li>Mic Type: Dual ENC microphones per earbud</li>",
                "<li>Water Resistance: IPX4 splash proof</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>What's in the Box</h3>",
                "<ul class=\"detail-list\">",
                "<li>M88 Plus TWS Earbuds (Left and Right)</li>",
                "<li>Charging Case with digital display</li>",
                "<li>Type-C Charging Cable</li>",
                "<li>User Manual and Warranty Information</li>",
                "<li>3 pairs of ear tips (S/M/L) for secure fit</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Ideal For</h3>",
                "<p>Perfect for gamers seeking low-latency audio, professionals requiring clear calls, and music enthusiasts wanting rich sound. Compatible with PC, consoles, smartphones, and tablets.</p>",
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
                "<h3>Product Overview</h3>",
                "<p>The M10 True Wireless Earbuds combine sleek design with powerful features for everyday audio needs. These compact earbuds offer active noise cancellation, waterproof protection, and seamless connectivity, making them perfect for commuting, workouts, and daily use.</p>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Key Features</h3>",
                "<ul class=\"detail-list\">",
                "<li><strong>Active Noise Cancellation:</strong> Advanced ANC technology blocks out ambient noise, allowing you to focus on your music or calls in noisy environments.</li>",
                "<li><strong>Waterproof Design:</strong> IPX7 rated waterproof construction protects against sweat and water splashes, ideal for exercise and outdoor activities.</li>",
                "<li><strong>Bluetooth 5.1:</strong> Reliable wireless connection with improved range and stability for uninterrupted audio streaming.</li>",
                "<li><strong>Auto Pairing:</strong> One-touch pairing remembers your device and connects instantly when removed from the case.</li>",
                "<li><strong>Built-in Microphone:</strong> High-quality mic with noise reduction for clear calls and voice commands.</li>",
                "<li><strong>Sleek Black Finish:</strong> Elegant matte black design that looks great and feels premium.</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Specifications</h3>",
                "<ul class=\"detail-list\">",
                "<li>Bluetooth Version: 5.1 for stable connections</li>",
                "<li>Battery Life: Up to 5 hours per charge, 25 hours with case</li>",
                "<li>Charging Time: 1.5 hours for full charge</li>",
                "<li>Driver Size: 8mm drivers for balanced audio</li>",
                "<li>Frequency Response: 20Hz - 20kHz</li>",
                "<li>Noise Cancellation: Active ANC with transparency mode</li>",
                "<li>Water Resistance: IPX7 waterproof</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>What's in the Box</h3>",
                "<ul class=\"detail-list\">",
                "<li>M10 True Wireless Earbuds</li>",
                "<li>Charging Case</li>",
                "<li>USB-C Charging Cable</li>",
                "<li>User Manual</li>",
                "<li>3 pairs of silicone ear tips (S/M/L)</li>",
                "</ul>",
                "</section>",
                "<section class=\"detail-section\">",
                "<h3>Compatibility</h3>",
                "<p>Works seamlessly with iOS and Android devices, supporting voice assistants like Siri and Google Assistant. Perfect for music, podcasts, calls, and hands-free use.</p>",
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
