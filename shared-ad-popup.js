(function () {
    var ADS = [
        {
            url: 'https://www.profitablecpmratenetwork.com/y8ky78pi?key=4281ae9af8218801eeec7dac89fbc662',
            title: 'Sponsored Offer 01',
            caption: 'Open our featured partner link',
            accent: '#3ad8ff'
        },
        {
            url: 'https://www.profitablecpmratenetwork.com/s8n5nysw?key=5127cd2a6d1edb030c3b6fac2d8fa35c',
            title: 'Sponsored Offer 02',
            caption: 'Explore another promoted destination',
            accent: '#ffd36a'
        }
    ];

    function injectStyles() {
        if (document.getElementById('adyaanant-inline-ad-styles')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'adyaanant-inline-ad-styles';
        style.textContent = [
            '.adyaanant-inline-ads{margin:2rem 0 0;}',
            '.adyaanant-inline-ads__shell{border:1px solid rgba(255,255,255,0.12);border-radius:24px;background:rgba(255,255,255,0.04);padding:1.25rem;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 18px 40px rgba(0,0,0,0.18);}',
            '.adyaanant-inline-ads__head{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1rem;}',
            '.adyaanant-inline-ads__title{margin:0;font-size:0.95rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;font-family:inherit;}',
            '.adyaanant-inline-ads__meta{margin:0;color:rgba(255,255,255,0.72);font-size:0.88rem;}',
            '.adyaanant-inline-ads__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;}',
            '.adyaanant-inline-ads__frame{display:block;width:100%;height:92px;border:0;border-radius:18px;background:transparent;overflow:hidden;}',
            '@media (max-width: 640px){.adyaanant-inline-ads__shell{padding:1rem;}.adyaanant-inline-ads__frame{height:110px;}}'
        ].join('');
        document.head.appendChild(style);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function createBannerFrame(ad) {
        var frame = document.createElement('iframe');
        frame.className = 'adyaanant-inline-ads__frame';
        frame.loading = 'lazy';
        frame.referrerPolicy = 'no-referrer';
        frame.setAttribute('scrolling', 'no');
        frame.setAttribute('title', ad.title);
        frame.setAttribute('sandbox', 'allow-popups allow-popups-to-escape-sandbox');

        var safeUrl = escapeHtml(ad.url);
        var safeTitle = escapeHtml(ad.title);
        var safeCaption = escapeHtml(ad.caption);
        var safeAccent = escapeHtml(ad.accent);

        frame.srcdoc =
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
            '<body style="margin:0;font-family:Arial,sans-serif;background:transparent;">' +
            '<a href="' + safeUrl + '" target="_blank" rel="noopener noreferrer sponsored" ' +
            'style="display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;height:100%;padding:14px 16px;border-radius:18px;box-sizing:border-box;background:linear-gradient(135deg,rgba(8,12,20,0.96),rgba(16,22,36,0.92));border:1px solid rgba(255,255,255,0.08);color:#ffffff;text-decoration:none;">' +
            '<span style="display:flex;flex-direction:column;gap:6px;min-width:0;">' +
            '<span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:' + safeAccent + ';">Sponsored</span>' +
            '<span style="font-size:18px;font-weight:700;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + safeTitle + '</span>' +
            '<span style="font-size:12px;color:rgba(255,255,255,0.72);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + safeCaption + '</span>' +
            '</span>' +
            '<span style="display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:999px;background:' + safeAccent + ';color:#031018;font-size:12px;font-weight:700;text-transform:uppercase;white-space:nowrap;">Open Link</span>' +
            '</a></body></html>';

        return frame;
    }

    function buildAdsSection() {
        var section = document.createElement('section');
        section.className = 'adyaanant-inline-ads';

        var shell = document.createElement('div');
        shell.className = 'adyaanant-inline-ads__shell';

        var head = document.createElement('div');
        head.className = 'adyaanant-inline-ads__head';

        var title = document.createElement('p');
        title.className = 'adyaanant-inline-ads__title';
        title.textContent = 'Sponsor Banners';

        var meta = document.createElement('p');
        meta.className = 'adyaanant-inline-ads__meta';
        meta.textContent = 'Inline banner ads replaced the previous popup behavior.';

        var grid = document.createElement('div');
        grid.className = 'adyaanant-inline-ads__grid';

        ADS.forEach(function (ad) {
            grid.appendChild(createBannerFrame(ad));
        });

        head.appendChild(title);
        head.appendChild(meta);
        shell.appendChild(head);
        shell.appendChild(grid);
        section.appendChild(shell);
        return section;
    }

    function mountBanners() {
        injectStyles();

        var hosts = document.querySelectorAll('[data-inline-banner-ads]');
        if (hosts.length) {
            hosts.forEach(function (host) {
                if (!host.querySelector('.adyaanant-inline-ads')) {
                    host.appendChild(buildAdsSection());
                }
            });
            return;
        }

        var footer = document.querySelector('footer, .footer, .page-footer');
        var main = document.querySelector('main');
        var section = buildAdsSection();

        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(section, footer);
        } else if (main) {
            main.appendChild(section);
        } else {
            document.body.appendChild(section);
        }
    }

    window.addEventListener('DOMContentLoaded', mountBanners, { once: true });
})();
