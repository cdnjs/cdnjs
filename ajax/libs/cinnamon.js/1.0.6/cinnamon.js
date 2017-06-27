// Cinnamon.js
// Version: 1.0.6
// Author: Thomas Park
// License: MIT

(function () {

    // Add styles
    var overflow = 'hidden',
        fontsize = '999px',
        browser;

    if ((navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1)) {
        overflow = 'visible';
        fontsize = 'inherit';
        browser = 'safari';
    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        browser = 'firefox';
        fontsize = 'inherit';
    }

    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = '[data-cinnamon] { position: relative; display: inline-block; z-index: 1; } \
.cinnamon { z-index: -1; position: absolute; top: 0; left: 0; display: inline-block; height: 100%; width: 100%; overflow: ' + overflow + '; color: transparent; font-size: ' + fontsize + '; } \
@media all and (device-width: 768px) and (device-height: 1024px) { .cinnamon { z-index: 1; opacity: 0.25; } }';

    style.type = 'text/css';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    // Add elements
    var cinnamons = document.querySelectorAll('[data-cinnamon]');

    for (var i = 0; i < cinnamons.length; i++) {

        var cinnamon = cinnamons[i],
            synonyms = cinnamon.getAttribute('data-cinnamon').split(','),
            image = cinnamon.getElementsByTagName('img')[0];

        if (image && image.getAttribute('alt')) {
            synonyms.push(image.getAttribute('alt'));
        }

        for (var j = 0; j < synonyms.length; j++) {
            var e = document.createElement('span');
            e.className = 'cinnamon';
            e.setAttribute('aria-hidden', 'true');

            if (image && browser == 'firefox') {
                e.style.fontSize = image.height + 20 + 'px';
            }

            if (typeof (e.textContent) !== "undefined") {
                e.textContent = synonyms[j] + ' ';
            } else {
                e.innerText = synonyms[j] + ' ';
            }

            cinnamon.insertBefore(e, cinnamon.firstChild);
        }
    }

})();