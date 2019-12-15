/*!
 * @copyright Copyright (c) 2016 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.1.7
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
    'use strict';
    if (window && window.addEventListener) {
        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
        var checkUseElems,
            tid; // timeout id
        var debouncedCheck = function () {
            clearTimeout(tid);
            tid = setTimeout(checkUseElems, 100);
        };
        var unobserveChanges = function () {
            return;
        };
        var observeChanges = function () {
            var observer;
            if (window.MutationObserver) {
                observer = new MutationObserver(debouncedCheck);
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
                unobserveChanges = function () {
                    try {
                        observer.disconnect();
                    } catch (ignore) {}
                };
            } else {
                document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false);
                unobserveChanges = function () {
                    document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false);
                };
            }
        };
        var xlinkNS = 'http://www.w3.org/1999/xlink';
        checkUseElems = function () {
            var base,
                bcr,
                fallback = '', // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
                hash,
                i,
                Request,
                inProgressCount = 0,
                isHidden,
                url,
                uses,
                xhr;
            if (window.XMLHttpRequest) {
                Request = new XMLHttpRequest();
                if (Request.withCredentials !== undefined) {
                    Request = XMLHttpRequest;
                } else {
                    Request = XDomainRequest || undefined;
                }
            }
            if (Request === undefined) {
                return;
            }
            function observeIfDone() {
                // If done with making changes, start watching for chagnes in DOM again
                inProgressCount -= 1;
                if (inProgressCount === 0) { // if all xhrs were resolved
                    observeChanges(); // watch for changes to DOM
                }
            }
            function onload(xhr) {
                return function () {
                    var body = document.body;
                    var x = document.createElement('x');
                    var svg;
                    xhr.onload = null;
                    x.innerHTML = xhr.responseText;
                    svg = x.getElementsByTagName('svg')[0];
                    if (svg) {
                        svg.style.position = 'absolute';
                        svg.style.width = 0;
                        svg.style.height = 0;
                        body.insertBefore(svg, body.firstChild);
                    }
                    observeIfDone();
                };
            }
            function onErrorTimeout(xhr) {
                return function () {
                    xhr.onerror = null;
                    xhr.ontimeout = null;
                    observeIfDone();
                };
            }
            unobserveChanges(); // stop watching for changes to DOM
            // find all use elements
            uses = document.getElementsByTagName('use');
            for (i = 0; i < uses.length; i += 1) {
                try {
                    bcr = uses[i].getBoundingClientRect();
                } catch (ignore) {
                    // failed to get bounding rectangle of the use element
                    bcr = false;
                }
                url = uses[i].getAttributeNS(xlinkNS, 'href').split('#');
                base = url[0];
                hash = url[1];
                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                    // the use element is empty
                    // if there is a reference to an external SVG, try to fetch it
                    // use the optional fallback URL if there is no reference to an external SVG
                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
                        base = fallback;
                    }
                    if (base.length) {
                        xhr = cache[base];
                        if (xhr !== true) {
                            uses[i].setAttributeNS(xlinkNS, 'xlink:href', '#' + hash);
                        }
                        if (xhr === undefined) {
                            xhr = new Request();
                            cache[base] = xhr;
                            xhr.onload = onload(xhr);
                            xhr.onerror = onErrorTimeout(xhr);
                            xhr.ontimeout = onErrorTimeout(xhr);
                            xhr.open('GET', base);
                            xhr.send();
                            inProgressCount += 1;
                        }
                    }
                } else {
                    // remember this URL if the use element was not empty and no request was sent
                    if (!isHidden && cache[base] === undefined) {
                        cache[base] = true;
                    }
                }
            }
            uses = '';
            inProgressCount += 1;
            observeIfDone();
        };
        // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
        window.addEventListener('load', function winLoad() {
            window.removeEventListener('load', winLoad, false); // to prevent memory leaks
            checkUseElems();
        }, false);
    }
}());

