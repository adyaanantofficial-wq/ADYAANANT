(function () {
    const DEFAULT_ORDER_PAGE = "order.html";
    const IMAGE_DIMENSION = 640;
    const MOBILE_CHUNK_SIZE = 4;
    const DESKTOP_CHUNK_SIZE = 12;
    const bootState = window.ADYAANANT_BOOT || {};
    const isPhoneMobile = !!bootState.isPhoneMobile;

    function toArray(value) {
        return Array.isArray(value) ? value : [];
    }

    function formatCurrency(value) {
        return "Rs " + Number(value || 0);
    }

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function scheduleFrame(callback) {
        if (typeof callback !== "function") {
            return;
        }

        if (typeof window.requestAnimationFrame === "function") {
            let completed = false;
            const fallbackId = window.setTimeout(function () {
                if (completed) {
                    return;
                }

                completed = true;
                callback();
            }, 64);

            window.requestAnimationFrame(function () {
                if (completed) {
                    return;
                }

                completed = true;
                window.clearTimeout(fallbackId);
                callback();
            });
            return;
        }

        window.setTimeout(callback, 16);
    }

    function scheduleIdle(callback, timeout) {
        if (typeof callback !== "function") {
            return;
        }

        const waitTime = typeof timeout === "number" ? timeout : 240;

        if (typeof window.requestIdleCallback === "function") {
            let completed = false;
            const fallbackId = window.setTimeout(function () {
                if (completed) {
                    return;
                }

                completed = true;
                callback({
                    didTimeout: true,
                    timeRemaining: function () {
                        return 0;
                    }
                });
            }, waitTime);

            window.requestIdleCallback(function (deadline) {
                if (completed) {
                    return;
                }

                completed = true;
                window.clearTimeout(fallbackId);
                callback(deadline);
            }, {
                timeout: waitTime
            });
            return;
        }

        window.setTimeout(function () {
            callback({
                didTimeout: true,
                timeRemaining: function () {
                    return 0;
                }
            });
        }, Math.min(waitTime, 120));
    }

    function getVisibleColumnCount() {
        if (typeof window.matchMedia === "function" && window.matchMedia("(max-width: 560px)").matches) {
            return 2;
        }

        if (typeof window.matchMedia === "function" && window.matchMedia("(max-width: 960px)").matches) {
            return 3;
        }

        return 5;
    }

    function createFallbackDetailHtml(product) {
        const features = toArray(product.features);
        const listItems = features.length
            ? features.map(function (feature) {
                return "<li>" + escapeHtml(feature) + "</li>";
            }).join("")
            : "<li>More product information will be shared during the order handoff.</li>";

        return [
            "<section class=\"detail-section\">",
            "<h3>Overview</h3>",
            "<p>" + escapeHtml(product.summary || "Details are available for this product.") + "</p>",
            "</section>",
            "<section class=\"detail-section\">",
            "<h3>Highlights</h3>",
            "<ul class=\"detail-list\">",
            listItems,
            "</ul>",
            "</section>"
        ].join("");
    }

    function getDiscount(product) {
        return product.discountPercent > 0 ? product.discountPercent + "%" : "0%";
    }

    function getCatalogProducts(scope) {
        const catalog = window.ADYAANANT_CATALOG || {};

        if (scope === "digital") {
            return toArray(catalog.digitalProducts).slice();
        }

        if (scope === "real") {
            return toArray(catalog.realProducts).slice();
        }

        return toArray(catalog.allProducts).slice();
    }

    function getOrderHref(product, orderPage) {
        if (product.externalLink) {
            return product.externalLink;
        }

        return orderPage + "?product=" + encodeURIComponent(product.title) + "&price=" + encodeURIComponent(product.price);
    }

    function normalizeProduct(product, orderPage) {
        const normalized = Object.assign({}, product);
        normalized.group = normalized.group || "Product";
        normalized.title = normalized.title || "Untitled Product";
        normalized.type = normalized.type || "Catalog item";
        normalized.badge = normalized.badge || "Available";
        normalized.summary = normalized.summary || "More details are available on the product page.";
        normalized.features = toArray(normalized.features);
        normalized.keywords = toArray(normalized.keywords);
        normalized.detailHtml = typeof normalized.detailHtml === "string" && normalized.detailHtml.trim()
            ? normalized.detailHtml
            : createFallbackDetailHtml(normalized);
        normalized.visual = normalized.visual && typeof normalized.visual === "object"
            ? normalized.visual
            : { type: "text", value: normalized.group.slice(0, 3).toUpperCase() || "ITEM" };
        normalized.detailsHref = (normalized.id || "product") + "-details.html";
        normalized.orderHref = getOrderHref(normalized, orderPage);
        return normalized;
    }

    function getVisualMarkup(product, priorityImage) {
        if (product.visual.type === "image" && product.visual.src) {
            return "<img src=\"" + escapeHtml(product.visual.src) + "\" alt=\"" + escapeHtml(product.visual.alt || product.title) + "\" width=\"" + IMAGE_DIMENSION + "\" height=\"" + IMAGE_DIMENSION + "\" loading=\"" + (priorityImage ? "eager" : "lazy") + "\" decoding=\"async\" fetchpriority=\"" + (priorityImage ? "high" : "low") + "\">";
        }

        return "<div class=\"thumb-fallback\" aria-hidden=\"true\">" + escapeHtml(product.visual.value || "ITEM") + "</div>";
    }

    function getOrderLinkAttrs(product) {
        let attrs = "href=\"" + escapeHtml(product.orderHref) + "\"";

        if (product.externalLink) {
            attrs += " target=\"_blank\" rel=\"noopener noreferrer\"";
        }

        return attrs;
    }

    function getSearchBlob(product) {
        return normalizeText([
            product.group,
            product.title,
            product.type,
            product.summary,
            toArray(product.features).join(" "),
            toArray(product.keywords).join(" "),
            String(product.detailHtml || "").replace(/<[^>]+>/g, " ")
        ].join(" "));
    }

    function scoreProduct(product, normalizedQuery, tokens) {
        if (!normalizedQuery) {
            return 1;
        }

        let score = 0;
        let matchedTerms = 0;

        if (product.searchBlob.includes(normalizedQuery)) {
            score += 12;
        }

        tokens.forEach(function (token) {
            if (product.searchWords.has(token)) {
                score += 6;
                matchedTerms += 1;
            } else if (product.searchWordList.some(function (word) { return word.indexOf(token) === 0; })) {
                score += 4;
                matchedTerms += 1;
            } else if (product.searchBlob.includes(token)) {
                score += 2;
                matchedTerms += 1;
            }
        });

        if (tokens.length > 1 && matchedTerms < Math.ceil(tokens.length * 0.6) && !product.searchBlob.includes(normalizedQuery)) {
            return 0;
        }

        return score;
    }

    function getRenderSignature(list) {
        return list.map(function (product) {
            return product.id;
        }).join("|");
    }

    function getProductCardMarkup(product, priorityImage) {
        return [
            "<article class=\"product-card\" role=\"listitem\" aria-label=\"" + escapeHtml(product.title) + "\">",
            "<div class=\"product-thumb\">",
            "<span class=\"product-badge\">" + escapeHtml(product.badge) + "</span>",
            "<span class=\"product-group\">" + escapeHtml(product.group) + "</span>",
            getVisualMarkup(product, priorityImage),
            "</div>",
            "<div class=\"product-copy\">",
            "<h2 class=\"product-title\">" + escapeHtml(product.title) + "</h2>",
            "<div class=\"product-type\">" + escapeHtml(product.type) + "</div>",
            "</div>",
            "<div class=\"price-grid\">",
            "<div class=\"price-cell\"><span class=\"price-label\">Price</span><span class=\"price-value\">" + formatCurrency(product.originalPrice) + "</span></div>",
            "<div class=\"price-cell\"><span class=\"price-label\">Off</span><span class=\"price-value\">" + escapeHtml(getDiscount(product)) + "</span></div>",
            "<div class=\"price-cell\"><span class=\"price-label\">Sell</span><span class=\"price-value is-accent\">" + formatCurrency(product.price) + "</span></div>",
            "</div>",
            "<div class=\"card-actions\">",
            "<a class=\"action-btn\" href=\"" + escapeHtml(product.detailsHref) + "\">Details</a>",
            "<a class=\"action-btn action-btn--primary\" " + getOrderLinkAttrs(product) + ">GIVE ORDER</a>",
            "</div>",
            "</article>"
        ].join("");
    }

    function syncEnhancedGrid(productGrid) {
        if (window.ADYAANANT_PREMIUM && typeof window.ADYAANANT_PREMIUM.enhanceCatalogGrid === "function") {
            window.ADYAANANT_PREMIUM.enhanceCatalogGrid(productGrid);
        }
    }

    function initCatalogPage() {
        if (!document.body || document.body.dataset.catalogReady === "true") {
            return;
        }

        const scope = document.body.getAttribute("data-catalog-scope");
        if (!scope) {
            return;
        }

        const searchInput = document.getElementById("searchInput");
        const resultCount = document.getElementById("resultCount");
        const productGrid = document.getElementById("productGrid");
        const noResults = document.getElementById("noResults");

        if (!productGrid || !resultCount || !noResults) {
            return;
        }

        document.body.dataset.catalogReady = "true";

        const orderPage = document.body.getAttribute("data-order-page") || DEFAULT_ORDER_PAGE;
        const products = getCatalogProducts(scope).map(function (product) {
            return normalizeProduct(product, orderPage);
        });
        const indexedProducts = products.map(function (product) {
            return Object.assign({}, product, {
                priorityMarkup: getProductCardMarkup(product, true),
                lazyMarkup: getProductCardMarkup(product, false),
                searchBlob: "",
                searchWords: null,
                searchWordList: null
            });
        });
        const searchState = {
            ready: false,
            building: false,
            warming: false,
            callbacks: []
        };
        let pendingQuery = "";
        let filterFrame = 0;
        let lastRenderSignature = "";
        let renderToken = 0;
        let initialRenderBroadcasted = false;

        function notifyCatalogRendered(listLength) {
            let renderEvent = null;

            if (initialRenderBroadcasted) {
                return;
            }

            initialRenderBroadcasted = true;
            document.body.dataset.catalogRendered = "true";

            if (typeof window.CustomEvent === "function") {
                renderEvent = new CustomEvent("adyaanant:catalog-rendered", {
                    detail: {
                        count: listLength,
                        scope: scope
                    }
                });
            } else {
                renderEvent = document.createEvent("CustomEvent");
                renderEvent.initCustomEvent("adyaanant:catalog-rendered", false, false, {
                    count: listLength,
                    scope: scope
                });
            }

            window.dispatchEvent(renderEvent);
        }

        function warmSearchIndex() {
            if (searchState.warming || searchState.ready) {
                return;
            }

            searchState.warming = true;
            scheduleIdle(function () {
                ensureSearchIndex();
            }, 900);
        }

        function ensureSearchIndex(callback) {
            if (typeof callback === "function") {
                searchState.callbacks.push(callback);
            }

            if (searchState.ready) {
                while (searchState.callbacks.length) {
                    searchState.callbacks.shift()();
                }
                return;
            }

            if (searchState.building) {
                return;
            }

            searchState.building = true;
            let cursor = 0;

            function step(deadline) {
                const start = Date.now();

                while (cursor < indexedProducts.length) {
                    const product = indexedProducts[cursor];
                    const searchBlob = getSearchBlob(product);
                    const searchWordList = searchBlob.split(/\s+/).filter(Boolean);

                    product.searchBlob = searchBlob;
                    product.searchWords = new Set(searchWordList);
                    product.searchWordList = searchWordList;
                    cursor += 1;

                    if ((Date.now() - start) >= 18) {
                        break;
                    }

                    if (deadline && typeof deadline.timeRemaining === "function" && deadline.timeRemaining() < 3) {
                        break;
                    }
                }

                if (cursor < indexedProducts.length) {
                    scheduleIdle(step, 240);
                    return;
                }

                searchState.ready = true;
                searchState.building = false;

                while (searchState.callbacks.length) {
                    searchState.callbacks.shift()();
                }
            }

            scheduleIdle(step, 180);
        }

        function renderProducts(list) {
            renderToken += 1;
            const token = renderToken;
            const renderSignature = getRenderSignature(list);
            resultCount.textContent = String(list.length);

            if (!list.length) {
                lastRenderSignature = "";
                productGrid.textContent = "";
                noResults.hidden = false;
                notifyCatalogRendered(0);
                return;
            }

            noResults.hidden = true;

            if (renderSignature === lastRenderSignature) {
                return;
            }

            lastRenderSignature = renderSignature;
            productGrid.textContent = "";
            productGrid.dataset.rendering = "true";

            const priorityCount = getVisibleColumnCount();
            const chunkSize = isPhoneMobile ? MOBILE_CHUNK_SIZE : DESKTOP_CHUNK_SIZE;
            let cursor = 0;

            function appendChunk() {
                if (token !== renderToken) {
                    return;
                }

                const chunkStart = Date.now();
                const chunkLimit = cursor === 0 ? Math.max(priorityCount, chunkSize) : chunkSize;
                const markup = [];
                let appended = 0;

                while (cursor < list.length && appended < chunkLimit) {
                    const product = list[cursor];
                    markup.push(cursor < priorityCount ? product.priorityMarkup : product.lazyMarkup);
                    cursor += 1;
                    appended += 1;

                    if (isPhoneMobile && appended >= 2 && (Date.now() - chunkStart) >= 18) {
                        break;
                    }
                }

                if (markup.length) {
                    productGrid.insertAdjacentHTML("beforeend", markup.join(""));
                }

                if (cursor < list.length) {
                    scheduleFrame(appendChunk);
                    return;
                }

                productGrid.dataset.rendering = "false";
                syncEnhancedGrid(productGrid);
                notifyCatalogRendered(list.length);
                warmSearchIndex();
            }

            appendChunk();
        }

        function runFilter(normalizedQuery) {
            const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

            const filtered = indexedProducts
                .map(function (product) {
                    return {
                        product: product,
                        score: scoreProduct(product, normalizedQuery, tokens)
                    };
                })
                .filter(function (entry) {
                    return entry.score > 0;
                })
                .sort(function (left, right) {
                    return right.score - left.score || left.product.price - right.product.price || left.product.title.localeCompare(right.product.title);
                })
                .map(function (entry) {
                    return entry.product;
                });

            renderProducts(filtered);
        }

        function filterProducts(query) {
            const normalizedQuery = normalizeText(query);

            if (!normalizedQuery) {
                renderProducts(indexedProducts);
                return;
            }

            ensureSearchIndex(function () {
                runFilter(normalizedQuery);
            });
        }

        function scheduleFilter(query) {
            pendingQuery = query;

            if (filterFrame) {
                return;
            }

            scheduleFrame(function () {
                filterFrame = 0;
                filterProducts(pendingQuery);
            });
            filterFrame = 1;
        }

        if (searchInput) {
            searchInput.addEventListener("input", function (event) {
                scheduleFilter(event.target.value);
            });
        }

        renderProducts(indexedProducts);
    }

    window.ADYAANANT_CATALOG_PAGE = {
        init: initCatalogPage
    };

    initCatalogPage();
}());
