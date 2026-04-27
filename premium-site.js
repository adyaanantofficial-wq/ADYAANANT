(function () {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverCapableQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let revealObserver = null;

    function scheduleNonCriticalWork(callback) {
        if (typeof callback !== "function") {
            return;
        }

        if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(function () {
                callback();
            }, {
                timeout: 1200
            });
            return;
        }

        window.setTimeout(callback, 90);
    }

    function uniqueElements(selectors, root) {
        const scope = root && typeof root.querySelectorAll === "function" ? root : document;
        const set = new Set();
        selectors.forEach(function (selector) {
            if (scope !== document && typeof scope.matches === "function" && scope.matches(selector)) {
                set.add(scope);
            }

            scope.querySelectorAll(selector).forEach(function (element) {
                set.add(element);
            });
        });
        return Array.from(set);
    }

    function addReflection(element) {
        const blockedTags = {
            AREA: true,
            BASE: true,
            BR: true,
            COL: true,
            EMBED: true,
            HR: true,
            IFRAME: true,
            IMG: true,
            INPUT: true,
            LINK: true,
            META: true,
            PARAM: true,
            SOURCE: true,
            TRACK: true,
            WBR: true
        };

        if (!element || blockedTags[element.tagName] || !hoverCapableQuery.matches) {
            return;
        }

        let hasReflection = false;
        for (let index = 0; index < element.children.length; index += 1) {
            const child = element.children[index];
            if (child.classList && child.classList.contains("aa-light-reflection")) {
                hasReflection = true;
                break;
            }
        }

        if (!hasReflection) {
            const reflection = document.createElement("span");
            reflection.className = "aa-light-reflection";
            reflection.setAttribute("aria-hidden", "true");
            element.appendChild(reflection);
        }
    }

    function insertBeforeFirstContent(node) {
        const body = document.body;
        const firstContent = Array.from(body.children).find(function (child) {
            return !child.classList.contains("aa-fixed-effect");
        });

        if (firstContent) {
            body.insertBefore(node, firstContent);
        } else {
            body.appendChild(node);
        }
    }

    function injectBackgroundEffects() {
        if (document.querySelector(".aa-gradient-field")) {
            return;
        }

        const gradient = document.createElement("div");
        gradient.className = "aa-gradient-field aa-fixed-effect";
        gradient.setAttribute("aria-hidden", "true");

        const canvas = document.createElement("canvas");
        canvas.className = "aa-particle-canvas aa-fixed-effect";
        canvas.setAttribute("aria-hidden", "true");

        const glow = document.createElement("div");
        glow.className = "aa-pointer-glow aa-fixed-effect";
        glow.setAttribute("aria-hidden", "true");

        const fragment = document.createDocumentFragment();
        fragment.appendChild(gradient);
        fragment.appendChild(canvas);
        fragment.appendChild(glow);
        document.body.prepend(fragment);

        if (!reduceMotionQuery.matches) {
            window.requestAnimationFrame(function () {
                startParticles(canvas);
                startPointerGlow(glow);
            });
        }
    }

    function injectMasthead() {
        if (document.querySelector(".aa-masthead")) {
            return;
        }

        const masthead = document.createElement("section");
        masthead.className = "aa-masthead aa-reveal is-visible";
        masthead.setAttribute("aria-label", "ADYAANANT brand header");
        masthead.innerHTML = [
            "<div class=\"aa-masthead__inner\">",
            "    <h1 class=\"aa-masthead__title\">ADYAANANT</h1>",
            "    <p class=\"aa-masthead__tag\">INNOVATION • STRENGTH • INFINITE POSSIBILITIES</p>",
            "</div>"
        ].join("");

        insertBeforeFirstContent(masthead);
    }

    function injectBottomShowcase() {
        if (document.querySelector(".aa-bottom-showcase")) {
            return;
        }

        const section = document.createElement("section");
        section.className = "aa-bottom-showcase aa-reveal";
        section.setAttribute("aria-label", "ADYAANANT support and contact section");
        section.innerHTML = [
            "<div class=\"aa-bottom-showcase__shell aa-surface\">",
            "    <div class=\"aa-bottom-bar\">",
            "        <a class=\"aa-bottom-brand\" href=\"index.html\">",
            "            <img src=\"logo.png\" alt=\"ADYAANANT logo\" width=\"48\" height=\"48\" loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\">",
            "            <span>ADYAANANT</span>",
            "        </a>",
            "        <nav class=\"aa-bottom-links\" aria-label=\"Footer navigation\">",
            "            <a href=\"index.html\">Home</a>",
            "            <a href=\"contact.html\">Contact</a>",
            "            <a href=\"discord.html\">Discord</a>",
            "            <a href=\"payment.html\">Payment</a>",
            "            <a href=\"shop.html\">Shop</a>",
            "        </nav>",
            "    </div>",
            "    <div class=\"aa-value-grid\">",
            "        <article class=\"aa-value-card aa-surface aa-card-lift aa-reveal\">",
            "            <h3>Global Vision</h3>",
            "            <p>ADYAANANT builds innovative solutions for the future, breaking boundaries and redefining industry standards globally.</p>",
            "        </article>",
            "        <article class=\"aa-value-card aa-surface aa-card-lift aa-reveal\">",
            "            <h3>Secure Services</h3>",
            "            <p>Trusted systems designed for reliability. Experience enterprise-grade security architecture protecting your digital assets.</p>",
            "        </article>",
            "        <article class=\"aa-value-card aa-surface aa-card-lift aa-reveal\">",
            "            <h3>Customer First</h3>",
            "            <p>Focused on long-term trust and satisfaction. We prioritize seamless user experiences and dedicated client support.</p>",
            "        </article>",
            "    </div>",
            "    <div class=\"aa-contact-block aa-reveal\">",
            "        <span class=\"aa-contact-block__eyebrow\">Direct Support</span>",
            "        <h2>Contact Us</h2>",
            "        <p>For full details and support, please visit our official contact page. Our team is ready to assist you with any inquiries.</p>",
            "        <div class=\"aa-contact-actions\">",
            "            <a class=\"aa-button aa-button--primary\" href=\"contact.html\">Open Contact</a>",
            "            <a class=\"aa-button aa-button--ghost\" href=\"discord.html\">Community Help</a>",
            "        </div>",
            "    </div>",
            "</div>"
        ].join("");

        addReflection(section.querySelector(".aa-bottom-showcase__shell"));
        section.querySelectorAll(".aa-value-card").forEach(addReflection);

        const footer = document.querySelector("footer, .page-footer, .store-footer");
        if (footer && footer.parentElement) {
            footer.parentElement.insertBefore(section, footer);
        } else {
            document.body.appendChild(section);
        }

        setupRevealObserver(section);
    }

    function enhanceNavs() {
        uniqueElements([
            ".store-nav",
            ".page-nav",
            ".navbar",
            ".nav-bar",
            "header .header-content"
        ]).forEach(function (element) {
            element.classList.add("aa-nav-shell");
        });

        uniqueElements([
            ".store-brand",
            ".page-brand",
            ".brand",
            ".nav-brand"
        ]).forEach(function (element) {
            element.classList.add("aa-brand-link");
        });

        uniqueElements([
            ".store-nav__links a",
            ".page-links a",
            ".nav-links a"
        ]).forEach(function (element) {
            element.classList.add("aa-nav-link");
        });
    }

    function enhanceSurfaces(root) {
        uniqueElements([
            ".hero-card",
            ".card",
            ".section-card",
            ".search-card",
            ".store-footer__card",
            ".product-card",
            ".details-dialog",
            ".order-panel",
            ".summary-row",
            ".contact-info",
            ".contact-form",
            ".payment-card",
            ".amount-section",
            ".verification-section",
            ".qr-showcase-section",
            ".discord-section",
            ".discord-widget",
            ".category-card",
            ".value-card",
            ".panel",
            ".callout",
            ".external-embed",
            ".external-embed__info",
            ".external-embed__viewer",
            ".list-item",
            ".product-thumb",
            ".price-cell",
            ".result-pill",
            ".quick-action",
            ".category-link",
            ".helper-link",
            ".store-brand__logo",
            ".page-brand__mark",
            ".brand-mark",
            ".nav-logo"
        ], root).forEach(function (element, index) {
            element.classList.add("aa-surface", "aa-card-lift", "aa-reveal");
            element.style.setProperty("--aa-reveal-delay", String(Math.min((index % 6) * 40, 180)) + "ms");
            addReflection(element);
        });

        uniqueElements([
            "main > section",
            ".section",
            ".hero",
            ".contact-wrapper",
            ".payment-grid",
            ".product-grid",
            ".card-grid",
            ".order-grid",
            ".split",
            ".split-panel",
            ".list-panel"
        ], root).forEach(function (element, index) {
            element.classList.add("aa-reveal");
            element.style.setProperty("--aa-reveal-delay", String(Math.min((index % 4) * 60, 180)) + "ms");
        });
    }

    function enhanceButtons(root) {
        uniqueElements([
            "button:not(.menu-toggle)",
            "input[type='submit']",
            "input[type='button']",
            "a.page-btn",
            "a.quick-action",
            "a.action-btn",
            "a.btn",
            ".btn-pay",
            ".btn-soft",
            ".btn-copy",
            ".btn-close",
            ".submit-btn",
            ".helper-link",
            ".quick-amount",
            ".store-footer__links a"
        ], root).forEach(function (element) {
            const source = ((element.className || "") + " " + (element.textContent || "")).toLowerCase();
            element.classList.add("aa-button");

            if (source.indexOf("modal-close") >= 0 || source.indexOf("btn-close") >= 0) {
                element.classList.add("aa-button--ghost", "aa-button--icon");
            } else if (
                source.indexOf("primary") >= 0 ||
                source.indexOf("submit") >= 0 ||
                source.indexOf("pay") >= 0 ||
                source.indexOf("order") >= 0 ||
                source.indexOf("join") >= 0 ||
                source.indexOf("confirm") >= 0
            ) {
                element.classList.add("aa-button--primary");
            } else if (
                source.indexOf("dark") >= 0 ||
                source.indexOf("discord") >= 0
            ) {
                element.classList.add("aa-button--dark");
            } else if (
                source.indexOf("secondary") >= 0 ||
                source.indexOf("ghost") >= 0 ||
                source.indexOf("soft") >= 0 ||
                source.indexOf("copy") >= 0 ||
                source.indexOf("details") >= 0 ||
                source.indexOf("back") >= 0 ||
                source.indexOf("close") >= 0
            ) {
                element.classList.add("aa-button--ghost");
            }
        });
    }

    function ensureRevealObserver() {
        if (reduceMotionQuery.matches || typeof IntersectionObserver !== "function") {
            return null;
        }

        if (!revealObserver) {
            revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.16,
                rootMargin: "0px 0px -8% 0px"
            });
        }

        return revealObserver;
    }

    function setupRevealObserver(root) {
        const scope = root && typeof root.querySelectorAll === "function" ? root : document;
        const targets = Array.from(scope.querySelectorAll(".aa-reveal"));

        if (scope !== document && scope.classList && scope.classList.contains("aa-reveal")) {
            targets.unshift(scope);
        }

        if (!targets.length) {
            return;
        }

        const observer = ensureRevealObserver();
        if (!observer) {
            targets.forEach(function (element) {
                element.classList.add("is-visible");
            });
            return;
        }

        targets.forEach(function (element) {
            if (element.classList.contains("is-visible")) {
                return;
            }

            observer.observe(element);
        });
    }

    function enhanceCatalogGrid(root) {
        if (!root) {
            return;
        }

        enhanceSurfaces(root);
        enhanceButtons(root);
        setupRevealObserver(root);
    }

    function startPointerGlow(glow) {
        if (!glow || !hoverCapableQuery.matches) {
            return;
        }

        let x = window.innerWidth / 2;
        let y = window.innerHeight * 0.35;
        let targetX = x;
        let targetY = y;
        let rafId = 0;

        function render() {
            x += (targetX - x) * 0.13;
            y += (targetY - y) * 0.13;
            glow.style.transform = "translate(" + x + "px, " + y + "px) translate(-50%, -50%)";

            if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
                rafId = window.requestAnimationFrame(render);
            } else {
                rafId = 0;
            }
        }

        window.addEventListener("pointermove", function (event) {
            targetX = event.clientX;
            targetY = event.clientY;
            if (!rafId) {
                rafId = window.requestAnimationFrame(render);
            }
        }, { passive: true });
    }

    function startParticles(canvas) {
        if (!canvas || typeof canvas.getContext !== "function") {
            return;
        }

        const context = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true
        }) || canvas.getContext("2d");
        if (!context) {
            return;
        }

        let width = 0;
        let height = 0;
        let dpr = 1;
        let particles = [];
        let animationFrame = 0;
        let resizeFrame = 0;
        const maxLinkDistance = 140;
        const maxLinkDistanceSq = maxLinkDistance * maxLinkDistance;

        function particleCount() {
            if (window.innerWidth <= 560) {
                return 16;
            }
            if (window.innerWidth <= 900) {
                return 24;
            }
            return 34;
        }

        function buildParticles(total) {
            return Array.from({ length: total }, function () {
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.6 + 0.7,
                    alpha: Math.random() * 0.5 + 0.18
                };
            });
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            particles = buildParticles(particleCount());
        }

        function draw() {
            context.clearRect(0, 0, width, height);

            particles.forEach(function (particle) {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x <= -20 || particle.x >= width + 20) {
                    particle.vx *= -1;
                }

                if (particle.y <= -20 || particle.y >= height + 20) {
                    particle.vy *= -1;
                }

                context.beginPath();
                context.fillStyle = "rgba(111, 232, 255, " + particle.alpha + ")";
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fill();
            });

            context.lineWidth = 0.7;
            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq < maxLinkDistanceSq) {
                        const distance = Math.sqrt(distanceSq);
                        context.beginPath();
                        context.strokeStyle = "rgba(102, 245, 194, " + ((1 - distance / maxLinkDistance) * 0.12) + ")";
                        context.moveTo(particles[i].x, particles[i].y);
                        context.lineTo(particles[j].x, particles[j].y);
                        context.stroke();
                    }
                }
            }

            animationFrame = window.requestAnimationFrame(draw);
        }

        function scheduleResize() {
            if (resizeFrame) {
                return;
            }

            resizeFrame = window.requestAnimationFrame(function () {
                resizeFrame = 0;
                resize();
            });
        }

        resize();
        draw();

        window.addEventListener("resize", scheduleResize, { passive: true });
        document.addEventListener("visibilitychange", function () {
            if (document.hidden && animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            } else if (!document.hidden && !animationFrame) {
                draw();
            }
        });
    }

    function init() {
        if (!document.body || document.body.dataset.aaPremiumReady === "true") {
            return;
        }

        document.body.dataset.aaPremiumReady = "true";
        document.body.classList.add("aa-premium-body");

        const themeColor = document.querySelector("meta[name='theme-color']");
        if (themeColor) {
            themeColor.setAttribute("content", "#120605");
        }

        injectBackgroundEffects();
        injectMasthead();
        enhanceNavs();
        enhanceSurfaces();
        enhanceButtons();
        setupRevealObserver();
        scheduleNonCriticalWork(injectBottomShowcase);
        window.ADYAANANT_PREMIUM = {
            enhanceCatalogGrid: enhanceCatalogGrid
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
