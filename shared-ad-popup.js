(function () {
    var AD_URL = 'https://www.profitablecpmratenetwork.com/y8ky78pi?key=4281ae9af8218801eeec7dac89fbc662';
    var POPUP_NAME = 'adyaanant-ad-popup';
    var POPUP_FEATURES = 'popup=yes,width=980,height=720,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=yes,status=no,left=120,top=80';
    var adWindow = null;
    var syncTimer = null;

    function openAdPopup() {
        if (adWindow && !adWindow.closed) {
            try {
                adWindow.focus();
            } catch (error) {
                // Ignore focus errors for cross-origin popup windows.
            }
            return;
        }

        adWindow = window.open(AD_URL, POPUP_NAME, POPUP_FEATURES);

        if (adWindow) {
            try {
                adWindow.focus();
            } catch (error) {
                // Ignore focus errors for cross-origin popup windows.
            }
        }
    }

    function closeAdPopup() {
        if (adWindow && !adWindow.closed) {
            try {
                adWindow.close();
            } catch (error) {
                // Ignore close errors for cross-origin popup windows.
            }
        }
        adWindow = null;
    }

    function trackPopupState() {
        if (syncTimer) {
            clearInterval(syncTimer);
        }

        syncTimer = window.setInterval(function () {
            if (adWindow && adWindow.closed) {
                adWindow = null;
            }
        }, 1500);
    }

    window.addEventListener('load', function () {
        window.setTimeout(openAdPopup, 250);
        trackPopupState();
    }, { once: true });

    ['pointerdown', 'touchstart', 'keydown'].forEach(function (eventName) {
        window.addEventListener(eventName, function () {
            openAdPopup();
        }, { once: true, passive: eventName !== 'keydown' });
    });

    window.addEventListener('beforeunload', closeAdPopup);
    window.addEventListener('pagehide', closeAdPopup);
})();
