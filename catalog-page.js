(function () {
    const DEFAULT_ORDER_PAGE = "order.html";

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
        normalized.summary = normalized.summary || "More details are available in the popup.";
        normalized.features = toArray(normalized.features);
        normalized.keywords = toArray(normalized.keywords);
        normalized.detailHtml = typeof normalized.detailHtml === "string" && normalized.detailHtml.trim()
            ? normalized.detailHtml
            : createFallbackDetailHtml(normalized);
        normalized.visual = normalized.visual && typeof normalized.visual === "object"
            ? normalized.visual
            : { type: "text", value: normalized.group.slice(0, 3).toUpperCase() || "ITEM" };
        normalized.orderHref = getOrderHref(normalized, orderPage);
        return normalized;
    }

    function getVisualMarkup(product) {
        if (product.visual.type === "image" && product.visual.src) {
            return "<img src=\"" + escapeHtml(product.visual.src) + "\" alt=\"" + escapeHtml(product.visual.alt || product.title) + "\" loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\">";
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

    function getProductCardMarkup(product) {
        return [
            "<article class=\"product-card\" role=\"listitem\" aria-label=\"" + escapeHtml(product.title) + "\">",
            "<div class=\"product-thumb\">",
            "<span class=\"product-badge\">" + escapeHtml(product.badge) + "</span>",
            "<span class=\"product-group\">" + escapeHtml(product.group) + "</span>",
            getVisualMarkup(product),
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
            "<button class=\"action-btn\" type=\"button\" data-details-id=\"" + escapeHtml(product.id) + "\">Details</button>",
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
        const detailsModal = document.getElementById("detailsModal");
        const detailsDialog = detailsModal ? detailsModal.querySelector(".details-dialog") : null;
        const modalPill = document.getElementById("modalPill");
        const modalTitle = document.getElementById("modalTitle");
        const modalSummary = document.getElementById("modalSummary");
        const modalPrice = document.getElementById("modalPrice");
        const modalBody = document.getElementById("modalBody");
        const modalAction = document.getElementById("modalAction");
        const modalFooterNote = document.getElementById("modalFooterNote");
        const modalClose = document.getElementById("modalClose");

        if (!productGrid || !resultCount || !noResults || !detailsModal || !detailsDialog || !modalPill || !modalTitle || !modalSummary || !modalPrice || !modalBody || !modalAction || !modalFooterNote || !modalClose) {
            return;
        }

        document.body.dataset.catalogReady = "true";

        const orderPage = document.body.getAttribute("data-order-page") || DEFAULT_ORDER_PAGE;
        const products = getCatalogProducts(scope).map(function (product) {
            return normalizeProduct(product, orderPage);
        });

        const productIndex = new Map();
        const indexedProducts = products.map(function (product) {
            const searchBlob = getSearchBlob(product);
            const searchWordList = searchBlob.split(/\s+/).filter(Boolean);
            const indexedProduct = Object.assign({}, product, {
                searchBlob: searchBlob,
                searchWords: new Set(searchWordList),
                searchWordList: searchWordList
            });

            indexedProduct.cardMarkup = getProductCardMarkup(indexedProduct);
            productIndex.set(indexedProduct.id, indexedProduct);
            return indexedProduct;
        });

        let lastFocusedElement = null;
        let pendingQuery = "";
        let filterFrame = 0;
        let lastRenderSignature = "";
        let pointerActivatedProductId = "";
        let pointerActivatedAt = 0;
        let lockedScrollTop = 0;
        let bodyScrollLocked = false;
        const bodyScrollState = {
            position: "",
            top: "",
            width: "",
            overflow: "",
            paddingRight: ""
        };

        function updateModalViewportHeight() {
            const viewportHeight = window.visualViewport && window.visualViewport.height
                ? window.visualViewport.height
                : window.innerHeight;

            document.documentElement.style.setProperty("--modal-viewport-height", Math.round(viewportHeight) + "px");
        }

        function lockBodyScroll() {
            if (bodyScrollLocked) {
                return;
            }

            lockedScrollTop = window.scrollY || window.pageYOffset || 0;
            bodyScrollState.position = document.body.style.position;
            bodyScrollState.top = document.body.style.top;
            bodyScrollState.width = document.body.style.width;
            bodyScrollState.overflow = document.body.style.overflow;
            bodyScrollState.paddingRight = document.body.style.paddingRight;

            const scrollbarGap = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

            document.body.classList.add("modal-open");
            document.body.style.position = "fixed";
            document.body.style.top = "-" + lockedScrollTop + "px";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";

            if (scrollbarGap > 0) {
                document.body.style.paddingRight = scrollbarGap + "px";
            }

            bodyScrollLocked = true;
        }

        function unlockBodyScroll() {
            if (!bodyScrollLocked) {
                return;
            }

            const previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.body.classList.remove("modal-open");
            document.body.style.position = bodyScrollState.position;
            document.body.style.top = bodyScrollState.top;
            document.body.style.width = bodyScrollState.width;
            document.body.style.overflow = bodyScrollState.overflow;
            document.body.style.paddingRight = bodyScrollState.paddingRight;
            bodyScrollLocked = false;
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, lockedScrollTop);
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
        }

        function renderProducts(list) {
            resultCount.textContent = String(list.length);

            if (!list.length) {
                lastRenderSignature = "";
                productGrid.textContent = "";
                noResults.hidden = false;
                return;
            }

            noResults.hidden = true;

            const renderSignature = getRenderSignature(list);
            if (renderSignature === lastRenderSignature) {
                return;
            }

            lastRenderSignature = renderSignature;
            productGrid.innerHTML = list.map(function (product) {
                return product.cardMarkup;
            }).join("");
            syncEnhancedGrid(productGrid);
        }

        function openModal(productId) {
            const product = productIndex.get(productId);

            if (!product) {
                return;
            }

            lastFocusedElement = document.activeElement;
            modalPill.textContent = product.group + " Product";
            modalTitle.textContent = product.title;
            modalSummary.textContent = product.summary;
            modalPrice.textContent = "Price " + formatCurrency(product.originalPrice) + " | Discount " + getDiscount(product) + " | Sell " + formatCurrency(product.price);
            modalBody.innerHTML = product.detailHtml;

            if (product.externalLink) {
                modalFooterNote.textContent = "Details opens first. GIVE ORDER opens the external platform in a new tab.";
                modalAction.href = product.orderHref;
                modalAction.setAttribute("target", "_blank");
                modalAction.setAttribute("rel", "noopener noreferrer");
            } else {
                modalFooterNote.textContent = "Details opens first. GIVE ORDER sends " + product.title + " and the sell price into the order form.";
                modalAction.href = product.orderHref;
                modalAction.removeAttribute("target");
                modalAction.removeAttribute("rel");
            }

            detailsDialog.scrollTop = 0;
            modalBody.scrollTop = 0;
            updateModalViewportHeight();
            detailsModal.classList.add("is-open");
            detailsModal.setAttribute("aria-hidden", "false");
            detailsModal.setAttribute("data-active-product-id", product.id);
            lockBodyScroll();
            modalClose.focus();
        }

        function closeModal() {
            detailsModal.classList.remove("is-open");
            detailsModal.setAttribute("aria-hidden", "true");
            detailsModal.removeAttribute("data-active-product-id");
            unlockBodyScroll();

            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
        }

        function filterProducts(query) {
            const normalizedQuery = normalizeText(query);

            if (!normalizedQuery) {
                renderProducts(indexedProducts);
                return;
            }

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

        function scheduleFilter(query) {
            pendingQuery = query;

            if (filterFrame) {
                return;
            }

            filterFrame = window.requestAnimationFrame(function () {
                filterFrame = 0;
                filterProducts(pendingQuery);
            });
        }

        function getDetailButton(event) {
            if (!event.target || typeof event.target.closest !== "function") {
                return null;
            }

            return event.target.closest("[data-details-id]");
        }

        function handleDetailOpen(productId) {
            if (!productId) {
                return;
            }

            openModal(productId);
        }

        productGrid.addEventListener("pointerdown", function (event) {
            const detailButton = getDetailButton(event);

            if (!detailButton) {
                return;
            }

            if (typeof event.button === "number" && event.button !== 0) {
                return;
            }

            pointerActivatedProductId = detailButton.getAttribute("data-details-id") || "";
            pointerActivatedAt = Date.now();
            event.preventDefault();
            handleDetailOpen(pointerActivatedProductId);
        });

        productGrid.addEventListener("click", function (event) {
            const detailButton = getDetailButton(event);

            if (!detailButton) {
                return;
            }

            const productId = detailButton.getAttribute("data-details-id");
            const pointerActivatedRecently = pointerActivatedProductId === productId && Date.now() - pointerActivatedAt < 600;

            if (pointerActivatedRecently) {
                pointerActivatedProductId = "";
                pointerActivatedAt = 0;
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            handleDetailOpen(productId);
        });

        productGrid.addEventListener("keydown", function (event) {
            const detailButton = getDetailButton(event);

            if (!detailButton || (event.key !== "Enter" && event.key !== " ")) {
                return;
            }

            event.preventDefault();
            handleDetailOpen(detailButton.getAttribute("data-details-id"));
        });

        if (searchInput) {
            searchInput.addEventListener("input", function (event) {
                scheduleFilter(event.target.value);
            });
        }

        updateModalViewportHeight();
        window.addEventListener("resize", updateModalViewportHeight);

        if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
            window.visualViewport.addEventListener("resize", updateModalViewportHeight);
        }

        modalClose.addEventListener("click", closeModal);

        detailsModal.addEventListener("click", function (event) {
            if (event.target === detailsModal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && detailsModal.classList.contains("is-open")) {
                closeModal();
            }
        });

        renderProducts(indexedProducts);
    }

    window.ADYAANANT_CATALOG_PAGE = {
        init: initCatalogPage
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCatalogPage);
    } else {
        initCatalogPage();
    }
}());
