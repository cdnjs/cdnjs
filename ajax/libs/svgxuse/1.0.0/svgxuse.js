/*!
 * @copyright Copyright (c) 2015 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.0.0
 */
/*jslint browser: true*/
/*global XDomainRequest*/
if (window && window.addEventListener) {
    // The load event fires when all resources have finished loading; which allows detecting whether SVG use elements are empty.
    window.addEventListener('load', function () {
        'use strict';
        var base,
            bcr,
            fallback = '', // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
            cache = {}, // holds xhr objects to prevent multiple requests
            hash,
            i,
            request,
            url,
            uses,
            xhr;
        if (XMLHttpRequest) {
            request = new XMLHttpRequest();
            if (request.withCredentials !== undefined) {
                request = XMLHttpRequest;
            } else {
                request = XDomainRequest || false;
            }
        }
        if (request === undefined) {
            return;
        }
        function onload(xhr) {
            return function () {
                var body = document.body,
                    x = document.createElement('x');
                x.innerHTML = xhr.responseText;
                body.insertBefore(x.firstChild, body.firstChild);
            };
        }
        // find all use elements
        uses = document.getElementsByTagName('use');
        for (i = 0; i < uses.length; i += 1) {
            try {
                bcr = uses[i].getBoundingClientRect();
            } catch (e) {
                // failed to get bounding rectangle of the use element
                bcr = false;
            }
            if (bcr && bcr.width === 0 && bcr.height === 0) {
                // the use element is empty
                // if there is a reference to an external SVG, try to fetch it
                url = uses[i].getAttribute('xlink:href').split('#');
                base = url[0];
                hash = url[1];
                // use the optional fallback URL if there is no reference to an external SVG
                if (fallback && !base.length && hash && !document.getElementById(hash)) {
                    base = fallback;
                }
                if (base.length) {
                    uses[i].setAttribute('xlink:href', '#' + hash);
                    cache[base] = cache.hasOwnProperty(base) ? cache[base] : new request();
                    xhr = cache[base];
                    if (!xhr.onload) {
                        xhr.onload = onload(xhr);
                        xhr.open('GET', base);
                        xhr.send();
                    }
                }
            }
        }
    }, false);
}

