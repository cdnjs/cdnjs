!function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof exports ? module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
    function embed(svg, g) {
        if (g) {
            var viewBox = !svg.getAttribute("viewBox") && g.getAttribute("viewBox"), fragment = document.createDocumentFragment(), clone = g.cloneNode(!0);
            for (viewBox && svg.setAttribute("viewBox", viewBox); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            svg.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                var x = document.createElement("x");
                x.innerHTML = xhr.responseText, xhr.s.splice(0).map(function(array) {
                    embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
                });
            }
        }, xhr.onreadystatechange();
    }
    function svg4everybody(opts) {
        function oninterval() {
            for (var use; use = uses[0]; ) {
                var svg = use.parentNode;
                if (svg && /svg/i.test(svg.nodeName)) {
                    var src = use.getAttribute("xlink:href");
                    if (nosvg) {
                        var img = new Image(), width = svg.getAttribute("width"), height = svg.getAttribute("height");
                        img.src = fallback(src, svg, use), width && img.setAttribute("width", width), height && img.setAttribute("height", height), 
                        svg.replaceChild(img, use);
                    } else {
                        if (polyfill && (!validate || validate(src, svg, use))) {
                            var url = src.split("#"), url_root = url[0], url_hash = url[1];
                            if (svg.removeChild(use), url_root.length) {
                                var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();
                                xhr.s || (xhr.s = [], xhr.open("GET", url_root), xhr.send()), xhr.s.push([ svg, url_hash ]), 
                                loadreadystatechange(xhr);
                            } else {
                                embed(svg, document.getElementById(url_hash));
                            }
                        }
                    }
                }
            }
            requestAnimationFrame(oninterval, 17);
        }
        opts = opts || {};
        var nosvg, uses = document.getElementsByTagName("use"), fallback = opts.fallback || function(src) {
            return src.replace(/\?[^#]+/, "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(src) || [ "" ])[0];
        };
        nosvg = "nosvg" in opts ? opts.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent), 
        nosvg && (document.createElement("svg"), document.createElement("use"));
        var polyfill = "polyfill" in opts ? opts.polyfill : nosvg || /\bEdge\/12\b|\bMSIE [1-8]\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, validate = opts.validate, requestAnimationFrame = window.requestAnimationFrame || setTimeout, svgCache = {};
        polyfill && oninterval();
    }
    return svg4everybody;
});