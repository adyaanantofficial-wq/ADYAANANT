const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const detailArtDir = path.join(rootDir, "product-detail-art");

function readCatalog() {
    const source = fs.readFileSync(path.join(rootDir, "catalog-data.js"), "utf8");
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(source, context);
    return context.window.ADYAANANT_CATALOG || { allProducts: [] };
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeXml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function stripHtml(value) {
    return String(value || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function trimDescription(value) {
    const text = stripHtml(value);
    if (text.length <= 150) {
        return text;
    }

    return text.slice(0, 147).trimEnd() + "...";
}

function formatCurrency(value) {
    return "Rs " + Number(value || 0);
}

function getDiscount(product) {
    const original = Number(product.originalPrice || 0);
    const price = Number(product.price || 0);

    if (original > price && original > 0) {
        return Math.round(((original - price) / original) * 100) + "%";
    }

    return "0%";
}

function getOrderHref(product) {
    if (product.externalLink) {
        return product.externalLink;
    }

    return "order.html?product=" + encodeURIComponent(product.title) + "&price=" + encodeURIComponent(product.price);
}

function getDetailsFileName(product) {
    return product.id + "-details.html";
}

function getCatalogPage(product) {
    if (product.groupKey === "real") {
        return {
            href: "Real Products.html",
            label: "Real Products"
        };
    }

    return {
        href: "Digital Products.html",
        label: "Digital Products"
    };
}

function toArray(value) {
    return Array.isArray(value) ? value : [];
}

function toSentenceList(items) {
    const list = toArray(items).map(function (item) {
        return stripHtml(item);
    }).filter(Boolean);

    if (!list.length) {
        return "";
    }

    if (list.length === 1) {
        return list[0];
    }

    if (list.length === 2) {
        return list[0] + " and " + list[1];
    }

    return list.slice(0, -1).join(", ") + ", and " + list[list.length - 1];
}

function withArticle(phrase) {
    const value = stripHtml(phrase).trim();
    if (!value) {
        return "a product";
    }

    const article = /^[aeiou]/i.test(value) ? "an" : "a";
    return article + " " + value;
}

function wrapSvgText(text, maxChars) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let currentLine = "";

    words.forEach(function (word) {
        const candidate = currentLine ? currentLine + " " + word : word;
        if (candidate.length > maxChars && currentLine) {
            lines.push(currentLine);
            currentLine = word;
            return;
        }

        currentLine = candidate;
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines.slice(0, 4);
}

function createPosterSvg(product) {
    const badge = escapeXml((product.group || "Product").toUpperCase() + " PRODUCT");
    const marker = escapeXml((product.visual && product.visual.value) || product.badge || "ITEM");
    const titleLines = wrapSvgText(product.title, 16);
    const typeLines = wrapSvgText(product.type, 24);
    const titleMarkup = titleLines.map(function (line, index) {
        return "<text x=\"110\" y=\"" + (470 + (index * 88)) + "\" font-size=\"74\" font-weight=\"800\" fill=\"#f8fffb\">" + escapeXml(line) + "</text>";
    }).join("");
    const typeMarkup = typeLines.map(function (line, index) {
        return "<text x=\"110\" y=\"" + (920 + (index * 46)) + "\" font-size=\"34\" font-weight=\"600\" fill=\"#b7c8be\">" + escapeXml(line) + "</text>";
    }).join("");

    return [
        "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 1200\" role=\"img\" aria-labelledby=\"title desc\">",
        "<title id=\"title\">" + escapeXml(product.title) + "</title>",
        "<desc id=\"desc\">" + escapeXml(product.summary) + "</desc>",
        "<defs>",
        "<linearGradient id=\"bg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">",
        "<stop offset=\"0%\" stop-color=\"#0f1712\"/>",
        "<stop offset=\"55%\" stop-color=\"#13241a\"/>",
        "<stop offset=\"100%\" stop-color=\"#1a3321\"/>",
        "</linearGradient>",
        "<radialGradient id=\"glowA\" cx=\"20%\" cy=\"12%\" r=\"70%\">",
        "<stop offset=\"0%\" stop-color=\"#6ff4ff\" stop-opacity=\"0.22\"/>",
        "<stop offset=\"100%\" stop-color=\"#6ff4ff\" stop-opacity=\"0\"/>",
        "</radialGradient>",
        "<radialGradient id=\"glowB\" cx=\"85%\" cy=\"90%\" r=\"60%\">",
        "<stop offset=\"0%\" stop-color=\"#7cff9f\" stop-opacity=\"0.18\"/>",
        "<stop offset=\"100%\" stop-color=\"#7cff9f\" stop-opacity=\"0\"/>",
        "</radialGradient>",
        "</defs>",
        "<rect width=\"1200\" height=\"1200\" rx=\"72\" fill=\"url(#bg)\"/>",
        "<rect width=\"1200\" height=\"1200\" rx=\"72\" fill=\"url(#glowA)\"/>",
        "<rect width=\"1200\" height=\"1200\" rx=\"72\" fill=\"url(#glowB)\"/>",
        "<rect x=\"84\" y=\"84\" width=\"1032\" height=\"1032\" rx=\"56\" fill=\"none\" stroke=\"rgba(111,244,255,0.26)\" stroke-width=\"2\" opacity=\"0.85\"/>",
        "<rect x=\"110\" y=\"112\" width=\"340\" height=\"72\" rx=\"36\" fill=\"#173b28\" stroke=\"#2dd46f\" stroke-opacity=\"0.3\"/>",
        "<text x=\"150\" y=\"160\" font-size=\"28\" font-weight=\"800\" letter-spacing=\"4\" fill=\"#7cff9f\">" + badge + "</text>",
        "<text x=\"110\" y=\"320\" font-size=\"172\" font-weight=\"800\" fill=\"#6ff4ff\" opacity=\"0.16\">" + marker + "</text>",
        titleMarkup,
        typeMarkup,
        "<text x=\"110\" y=\"1062\" font-size=\"28\" font-weight=\"700\" letter-spacing=\"5\" fill=\"#e4f5eb\">ADYAANANT</text>",
        "</svg>"
    ].join("");
}

function ensureTextVisualImage(product) {
    if (!product.visual || product.visual.type === "image") {
        return product.visual && product.visual.src ? product.visual.src : "";
    }

    const outputPath = path.join(detailArtDir, product.id + ".svg");
    fs.writeFileSync(outputPath, createPosterSvg(product), "utf8");
    return "product-detail-art/" + product.id + ".svg";
}

function getVisual(product) {
    if (product.visual && product.visual.type === "image" && product.visual.src) {
        return {
            src: product.visual.src,
            alt: product.visual.alt || product.title
        };
    }

    return {
        src: ensureTextVisualImage(product),
        alt: product.title + " product visual"
    };
}

function renderBenefitSection(product) {
    const featureSentence = toSentenceList(product.features);
    const cleanSummary = stripHtml(product.summary).replace(/[.]+$/, "");
    const valueAngle = product.groupKey === "real"
        ? "It gives the buyer a clear hardware offer with practical daily value, strong savings, and a fast path from browsing to ordering."
        : "It gives the buyer a focused digital offer that is easy to understand, easy to revisit, and ready to act on without extra friction.";
    const audienceAngle = product.groupKey === "real"
        ? "This is a good fit for buyers who want a dependable product page with the full offer visible before they place an order."
        : "This is a good fit for buyers who want the complete explanation, offer pricing, and a direct order path on one lightweight page.";

    return [
        "<section class=\"detail-section\">",
        "<h3>Why this product is valuable</h3>",
        "<p>" + escapeHtml(product.title) + " is offered as " + escapeHtml(withArticle(product.type.toLowerCase())) + " for buyers who want " + escapeHtml(cleanSummary.toLowerCase()) + ".</p>",
        "<p>" + escapeHtml(valueAngle) + "</p>",
        featureSentence
            ? "<ul class=\"detail-list\">" + toArray(product.features).map(function (feature) {
                return "<li>" + escapeHtml(stripHtml(feature)) + "</li>";
            }).join("") + "</ul>"
            : "",
        "<p>" + escapeHtml(audienceAngle) + "</p>",
        "</section>"
    ].join("");
}

function renderOrderLinkAttributes(product) {
    let attrs = "href=\"" + escapeHtml(getOrderHref(product)) + "\"";

    if (product.externalLink) {
        attrs += " target=\"_blank\" rel=\"noopener noreferrer\"";
    }

    return attrs;
}

function renderNavigation(product) {
    const catalogPage = getCatalogPage(product);
    const digitalActive = product.groupKey === "digital" ? " class=\"is-active\"" : "";
    const realActive = product.groupKey === "real" ? " class=\"is-active\"" : "";

    return [
        "<nav class=\"store-nav\" aria-label=\"Primary navigation\">",
        "    <div class=\"store-page store-nav__inner\">",
        "        <a class=\"store-brand\" href=\"index.html\">",
        "            <img class=\"store-brand__logo\" src=\"logo.png\" alt=\"ADYAANANT logo\">",
        "            <span class=\"store-brand__copy\">",
        "                <span class=\"store-brand__eyebrow\">ADYAANANT</span>",
        "                <span class=\"store-brand__title\">Product Details</span>",
        "            </span>",
        "        </a>",
        "",
        "        <div class=\"store-nav__links\">",
        "            <a href=\"index.html\">Home</a>",
        "            <a href=\"Digital Products.html\"" + digitalActive + ">Digital Products</a>",
        "            <a href=\"Real Products.html\"" + realActive + ">Real Products</a>",
        "            <a href=\"order.html\">Order</a>",
        "        </div>",
        "    </div>",
        "</nav>",
        "",
        "<main class=\"store-page store-main\">",
        "    <section class=\"quick-actions\" aria-label=\"Detail page shortcuts\">",
        "        <a class=\"quick-action quick-action--primary\" href=\"" + catalogPage.href + "\">Back to " + escapeHtml(catalogPage.label) + "</a>",
        "        <a class=\"quick-action\" href=\"index.html\">All Products</a>",
        "        <a class=\"quick-action\" href=\"order.html\">Order Page</a>",
        "    </section>"
    ].join("\n");
}

function renderFooter(product) {
    return [
        "    <footer class=\"store-page store-footer\">",
        "        <div class=\"store-footer__card\">",
        "            <strong>ADYAANANT Product Details</strong>",
        "            <p>This page keeps the storefront visuals intact while giving " + escapeHtml(product.title) + " a dedicated fast-loading details experience.</p>",
        "            <div class=\"store-footer__links\">",
        "                <a href=\"index.html\">All Products</a>",
        "                <a href=\"Digital Products.html\">Digital Products</a>",
        "                <a href=\"Real Products.html\">Real Products</a>",
        "                <a href=\"contact.html\">Contact</a>",
        "            </div>",
        "        </div>",
        "    </footer>",
        "",
        "    <a class=\"help-fab\" href=\"https://youtu.be/wXGXQgKTCQI\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open the help video on YouTube\">",
        "        <span class=\"help-fab__label\">Help</span>",
        "        <span class=\"help-fab__button\" aria-hidden=\"true\">&#129302;</span>",
        "    </a>",
        "    <script src=\"product-detail-timer.js\"></script>",
        "    <script src=\"premium-site.js\"></script>",
        "</body>",
        "</html>"
    ].join("\n");
}

function renderPage(product) {
    const visual = getVisual(product);
    const catalogPage = getCatalogPage(product);
    const metaDescription = trimDescription(product.summary);
    const categoryLabel = product.groupKey === "real" ? "Real Product" : "Digital Product";
    const orderNote = product.externalLink
        ? "GIVE ORDER opens the external product platform in a new tab."
        : "GIVE ORDER sends this product and offer price into the order form.";

    return [
        "<!DOCTYPE html>",
        "<html lang=\"en\">",
        "<head>",
        "    <meta charset=\"UTF-8\">",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=5.0\">",
        "    <meta name=\"description\" content=\"" + escapeHtml(metaDescription) + "\">",
        "    <meta name=\"theme-color\" content=\"#15803d\">",
        "    <title>" + escapeHtml(product.title) + " Details | ADYAANANT</title>",
        "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">",
        "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>",
        "    <link href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap\" rel=\"stylesheet\">",
        "    <link rel=\"stylesheet\" href=\"catalog-store.css\">",
        "    <link rel=\"stylesheet\" href=\"help-widget.css\">",
        "    <link rel=\"stylesheet\" href=\"premium-theme.css\">",
        "</head>",
        "<body>",
        renderNavigation(product),
        "    <section class=\"section-card product-detail-shell\">",
        "        <div class=\"product-detail-grid\">",
        "            <figure class=\"product-detail-media\">",
        "                <img src=\"" + escapeHtml(visual.src) + "\" alt=\"" + escapeHtml(visual.alt) + "\" loading=\"lazy\" decoding=\"async\">",
        "            </figure>",
        "            <div class=\"product-detail-copy\">",
        "                <span class=\"modal-pill\">" + escapeHtml(categoryLabel) + "</span>",
        "                <h1 class=\"details-title\">" + escapeHtml(product.title) + "</h1>",
        "                <p class=\"product-detail-type\">" + escapeHtml(product.type) + "</p>",
        "                <p class=\"details-summary\">" + escapeHtml(product.summary) + "</p>",
        "                <div class=\"price-grid product-detail-pricing\">",
        "                    <div class=\"price-cell\"><span class=\"price-label\">Price</span><span class=\"price-value price-value--strike\">" + escapeHtml(formatCurrency(product.originalPrice)) + "</span></div>",
        "                    <div class=\"price-cell\"><span class=\"price-label\">Discount</span><span class=\"price-value\">" + escapeHtml(getDiscount(product)) + "</span></div>",
        "                    <div class=\"price-cell\"><span class=\"price-label\">Offer Price</span><span class=\"price-value price-value--offer\">" + escapeHtml(formatCurrency(product.price)) + "</span></div>",
        "                </div>",
        "                <div class=\"offer-timer\" data-countdown-seconds=\"600\" aria-live=\"polite\">",
        "                    <span class=\"offer-timer__label\">Buy within 10 minutes to get this offer</span>",
        "                    <strong class=\"offer-timer__value\" data-countdown-display>10:00</strong>",
        "                </div>",
        "                <p class=\"detail-footer-note\">" + escapeHtml(orderNote) + "</p>",
        "                <div class=\"card-actions product-detail-actions\">",
        "                    <a class=\"action-btn\" href=\"" + escapeHtml(catalogPage.href) + "\">Back to Catalog</a>",
        "                    <a class=\"action-btn action-btn--primary\" " + renderOrderLinkAttributes(product) + ">GIVE ORDER</a>",
        "                </div>",
        "            </div>",
        "        </div>",
        "    </section>",
        "",
        "    <section class=\"section-card product-detail-sections\">",
        "        <div class=\"section-head\">",
        "            <div class=\"section-copy\">",
        "                <span class=\"section-kicker\">Product Benefit</span>",
        "                <h2 class=\"section-title\">Why buyers choose " + escapeHtml(product.title) + "</h2>",
        "                <p>Everything important stays on one page: product identity, pricing clarity, benefits, and a direct path to order.</p>",
        "            </div>",
        "        </div>",
        "        <div class=\"product-detail-sections__body\">",
        renderBenefitSection(product),
        product.detailHtml,
        "        </div>",
        "    </section>",
        "</main>",
        "",
        renderFooter(product)
    ].join("\n");
}

function writeDetailPages() {
    const catalog = readCatalog();
    const products = toArray(catalog.allProducts);

    fs.mkdirSync(detailArtDir, { recursive: true });

    products.forEach(function (product) {
        const filePath = path.join(rootDir, getDetailsFileName(product));
        fs.writeFileSync(filePath, renderPage(product), "utf8");
    });

    console.log("Generated " + products.length + " product detail pages.");
}

writeDetailPages();
