// ===== Gestion du bandeau cookies + Matomo (RGPD) =====
(function() {
    const COOKIE_NAME = 'stadiumcompany_cookie_consent';
    const COOKIE_DAYS = 365;

    // ===== MATOMO =====
    // Script chargé uniquement après consentement explicite de l'utilisateur
    function loadMatomo() {
        if (window._matomoLoaded) return;
        window._matomoLoaded = true;

        var _paq = window._paq = window._paq || [];
        _paq.push(['setDoNotTrack', true]);
        _paq.push(['disableCookies']);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u = "https://sofianb78.matomo.cloud/";
            _paq.push(['setTrackerUrl', u + 'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
            g.async = true;
            g.src = 'https://cdn.matomo.cloud/sofianb78.matomo.cloud/matomo.js';
            s.parentNode.insertBefore(g, s);
        })();
    }

    // ===== UTILITAIRES COOKIES =====
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCookie(name) {
        const cname = name + '=';
        const parts = document.cookie.split(';');
        for (let c of parts) {
            c = c.trim();
            if (c.indexOf(cname) === 0) return c.substring(cname.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }

    // ===== BANDEAU =====
    function showBanner() {
        if (document.getElementById('cookie-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <div class="cookie-text">
                    <strong>🍪 Cookies & vie privée</strong>
                    <p>Nous utilisons Matomo (outil d'analyse open source, hébergé en Europe) pour mesurer la fréquentation du site de façon anonymisée. Vous pouvez accepter ou refuser. <a href="cookies.html">En savoir plus</a></p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-refuse" onclick="cookieConsent('refused')">Refuser</button>
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent('accepted')">Accepter</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('show'), 50);
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // ===== API PUBLIQUE =====
    window.cookieConsent = function(choice) {
        setCookie(COOKIE_NAME, choice, COOKIE_DAYS);
        hideBanner();
        if (choice === 'accepted') {
            loadMatomo();
        }
    };

    window.resetCookieConsent = function() {
        deleteCookie(COOKIE_NAME);
        alert('Vos préférences cookies ont été réinitialisées. Le bandeau va réapparaître.');
        showBanner();
    };

    // ===== DÉMARRAGE =====
    document.addEventListener('DOMContentLoaded', function() {
        const choice = getCookie(COOKIE_NAME);
        if (!choice) {
            showBanner();
        } else if (choice === 'accepted') {
            loadMatomo();
        }
    });
})();
