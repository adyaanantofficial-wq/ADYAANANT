(function () {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverCapableQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let revealObserver = null;

    function consumeQueuedReveals() {
        const queued = window.ADYAANANT_EFFECTS_QUEUE || [];
        window.ADYAANANT_EFFECTS_QUEUE = [];
        queued.forEach(observeTree);
    }

    function observeTree(root) {
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
        if (!document.body || document.body.dataset.aaEffectsReady === "true") {
            return;
        }

        document.body.dataset.aaEffectsReady = "true";
        window.ADYAANANT_EFFECTS_READY = true;
        window.ADYAANANT_EFFECTS = {
            observeTree: observeTree
        };

        injectBackgroundEffects();
        observeTree(document);
        consumeQueuedReveals();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
