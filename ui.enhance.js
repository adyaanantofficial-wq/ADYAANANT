(function () {
    const hoverCapableQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const bootState = window.ADYAANANT_BOOT || {};

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

    function queueRevealTarget(element) {
        if (!element) {
            return;
        }

        if (window.ADYAANANT_EFFECTS && typeof window.ADYAANANT_EFFECTS.observeTree === "function") {
            window.ADYAANANT_EFFECTS.observeTree(element);
            return;
        }

        window.ADYAANANT_EFFECTS_QUEUE = window.ADYAANANT_EFFECTS_QUEUE || [];
        window.ADYAANANT_EFFECTS_QUEUE.push(element);
    }

    function markReveal(element, delay) {
        if (!element || !element.classList) {
            return;
        }

        element.classList.add("aa-reveal");

        if (typeof delay === "number") {
            element.style.setProperty("--aa-reveal-delay", String(delay) + "ms");
        }

        if (bootState.deferEffects && !window.ADYAANANT_EFFECTS_READY) {
            element.classList.add("is-visible");
            return;
        }

        queueRevealTarget(element);
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
            "    <p class=\"aa-masthead__tag\">INNOVATION &#8226; STRENGTH &#8226; INFINITE POSSIBILITIES</p>",
            "</div>"
        ].join("");

        insertBeforeFirstContent(masthead);
    }

    function injectBottomShowcase() {
        if (document.querySelector(".aa-bottom-showcase")) {
            return;
        }

        const section = document.createElement("section");
        section.className = "aa-bottom-showcase";
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
            "        <article class=\"aa-value-card\">",
            "            <h3>Global Vision</h3>",
            "            <p>ADYAANANT builds innovative solutions for the future, breaking boundaries and redefining industry standards globally.</p>",
            "        </article>",
            "        <article class=\"aa-value-card\">",
            "            <h3>Secure Services</h3>",
            "            <p>Trusted systems designed for reliability. Experience enterprise-grade security architecture protecting your digital assets.</p>",
            "        </article>",
            "        <article class=\"aa-value-card\">",
            "            <h3>Customer First</h3>",
            "            <p>Focused on long-term trust and satisfaction. We prioritize seamless user experiences and dedicated client support.</p>",
            "        </article>",
            "    </div>",
            "    <div class=\"aa-contact-block\">",
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

        const footer = document.querySelector("footer, .page-footer, .store-footer");
        if (footer && footer.parentElement) {
            footer.parentElement.insertBefore(section, footer);
        } else {
            document.body.appendChild(section);
        }

        markReveal(section, 0);
        enhanceSurfaces(section);
        enhanceButtons(section);
        markReveal(section.querySelector(".aa-contact-block"), 120);
        addReflection(section.querySelector(".aa-bottom-showcase__shell"));
        section.querySelectorAll(".aa-value-card").forEach(addReflection);
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
            element.classList.add("aa-surface", "aa-card-lift");
            markReveal(element, Math.min((index % 6) * 40, 180));
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
            markReveal(element, Math.min((index % 4) * 60, 180));
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

    function enhanceCatalogGrid(root) {
        if (!root) {
            return;
        }

        enhanceSurfaces(root);
        enhanceButtons(root);
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

        injectMasthead();
        enhanceNavs();
        enhanceSurfaces();
        enhanceButtons();
        scheduleNonCriticalWork(injectBottomShowcase);

        window.ADYAANANT_PREMIUM = {
            enhanceCatalogGrid: enhanceCatalogGrid
        };
        window.ADYAANANT_UI = {
            enhanceCatalogGrid: enhanceCatalogGrid,
            init: init
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
