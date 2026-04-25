(() => {
    const widgetId = 'adyaanant-help-widget';
    const styleId = 'adyaanant-help-widget-style';
    const helpVideoUrl = 'https://youtu.be/wXGXQgKTCQI';

    function injectStyles() {
        if (document.getElementById(styleId) || !document.head) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .adyaanant-help-widget {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 1100;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                text-decoration: none;
                font-family: Arial, Helvetica, sans-serif;
            }

            .adyaanant-help-widget__label {
                padding: 6px 12px;
                border-radius: 999px;
                background: rgba(10, 15, 24, 0.92);
                color: #ffffff;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.04em;
                box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.14);
            }

            .adyaanant-help-widget__icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: grid;
                place-items: center;
                background: linear-gradient(135deg, #00c3ff 0%, #111827 100%);
                color: #ffffff;
                font-size: 30px;
                box-shadow: 0 14px 32px rgba(0, 195, 255, 0.28);
                border: 2px solid rgba(255, 255, 255, 0.18);
                transition: transform 180ms ease, box-shadow 180ms ease;
            }

            .adyaanant-help-widget:hover .adyaanant-help-widget__icon,
            .adyaanant-help-widget:focus-visible .adyaanant-help-widget__icon {
                transform: translateY(-2px) scale(1.04);
                box-shadow: 0 18px 40px rgba(0, 195, 255, 0.38);
            }

            .adyaanant-help-widget:focus-visible {
                outline: none;
            }

            .adyaanant-help-widget:focus-visible .adyaanant-help-widget__label {
                border-color: rgba(0, 195, 255, 0.65);
            }

            @media (max-width: 640px) {
                .adyaanant-help-widget {
                    right: 16px;
                    bottom: 16px;
                    gap: 6px;
                }

                .adyaanant-help-widget__label {
                    padding: 5px 10px;
                    font-size: 11px;
                }

                .adyaanant-help-widget__icon {
                    width: 54px;
                    height: 54px;
                    font-size: 27px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function injectWidget() {
        if (document.getElementById(widgetId) || !document.body) {
            return;
        }

        const link = document.createElement('a');
        link.id = widgetId;
        link.className = 'adyaanant-help-widget';
        link.href = helpVideoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'Open the help video on YouTube');
        link.title = 'Help';

        const label = document.createElement('span');
        label.className = 'adyaanant-help-widget__label';
        label.textContent = 'Help';

        const icon = document.createElement('span');
        icon.className = 'adyaanant-help-widget__icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = String.fromCodePoint(0x1f916);

        link.appendChild(label);
        link.appendChild(icon);
        document.body.appendChild(link);
    }

    function init() {
        injectStyles();
        injectWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
