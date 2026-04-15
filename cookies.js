// ===== Gestion du bandeau cookies StadiumCompany =====
(function() {
    const COOKIE_NAME = 'stadiumcompany_cookie_consent';
    const COOKIE_DAYS = 365;

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

    function showBanner() {
        if (document.getElementById('cookie-banner')) return;
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <div class="cookie-text">
                    <strong>🍪 Cookies & vie privée</strong>
                    <p>Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer son audience de manière anonymisée. Vous pouvez accepter ou refuser les cookies de mesure d'audience. <a href="cookies.html">En savoir plus</a></p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-refuse" onclick="cookieConsent('refused')">Refuser</button>
                    <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent('accepted')">Accepter</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        // animation d'entrée
        setTimeout(() => banner.classList.add('show'), 50);
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    }

    window.cookieConsent = function(choice) {
        setCookie(COOKIE_NAME, choice, COOKIE_DAYS);
        hideBanner();
        if (choice === 'accepted') {
            console.log('Cookies de mesure d\'audience activés');
            // Ici on activerait Matomo en production
        } else {
            console.log('Cookies de mesure refusés');
        }
    };

    window.resetCookieConsent = function() {
        deleteCookie(COOKIE_NAME);
        alert('Vos préférences cookies ont été réinitialisées. Le bandeau va réapparaître.');
        showBanner();
    };

    // Affichage automatique si pas encore de choix enregistré
    document.addEventListener('DOMContentLoaded', function() {
        if (!getCookie(COOKIE_NAME)) {
            showBanner();
        }
    });
})();
