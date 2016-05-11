!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
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
    function createSvgElement(xhr) {
        var xElement;
        "undefined" == typeof xhr._elementCache && (xhr._elementCache = {}), "undefined" == typeof xhr._elementCache[xhr.responseURL] ? (xElement = document.createElement("x"), 
        xElement.innerHTML = xhr.responseText, xhr._elementCache[xhr.responseURL] = xElement) : xElement = xhr._elementCache[xhr.responseURL], 
        xhr.s.splice(0).map(function(array) {
            embed(array[0], xElement.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
        });
    }
    function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
            4 === xhr.readyState && createSvgElement(xhr);
        }, xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            for (var use, svg, i = 0; i < uses.length; ) {
                if (use = uses[i], svg = use.parentNode, svg && /svg/i.test(svg.nodeName)) {
                    var src = use.getAttribute("xlink:href");
                    if (polyfill && (!validate || validate(src, svg, use))) {
                        var url = src.split("#"), urlRoot = url[0], urlHash = url[1];
                        if (svg.removeChild(use), urlRoot.length) {
                            var xhr = svgCache[urlRoot] = svgCache[urlRoot] || new XMLHttpRequest();
                            xhr.s || (xhr.s = [], xhr.open("GET", urlRoot), xhr.send()), xhr.s.push([ svg, urlHash ]), 
                            loadreadystatechange(xhr);
                        } else {
                            embed(svg, document.getElementById(urlHash));
                        }
                    }
                } else {
                    // increase it only if the previous value was not "valid"
                    i += 1;
                }
            }
            requestAnimationFrame(oninterval, 67);
        }
        var opts = rawopts || {}, uses = document.getElementsByTagName("use"), polyfill = "polyfill" in opts ? opts.polyfill : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, validate = opts.validate, requestAnimationFrame = window.requestAnimationFrame || setTimeout, svgCache = {};
        polyfill && oninterval();
    }
    return svg4everybody;
});