/*!
 * leaflet-extra-markers
 * Custom Markers for Leaflet JS based on Awesome Markers
 * Leaflet ExtraMarkers
 * https://github.com/coryasilva/Leaflet.ExtraMarkers/
 * @author coryasilva <https://github.com/coryasilva>
 * @version 1.0.9
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.leaflet = global.leaflet || {}, global.leaflet['extra-markers'] = {})));
}(this, (function (exports) { 'use strict';

    var ExtraMarkers = L.ExtraMarkers = {};
    ExtraMarkers.version = L.ExtraMarkers.version = "1.0.8";
    ExtraMarkers.Icon = L.ExtraMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [ 35, 45 ],
            iconAnchor: [ 17, 42 ],
            popupAnchor: [ 1, -32 ],
            shadowAnchor: [ 10, 12 ],
            shadowSize: [ 36, 16 ],
            className: "",
            prefix: "",
            extraClasses: "",
            shape: "circle",
            icon: "",
            innerHTML: "",
            markerColor: "red",
            svgBorderColor: "#fff",
            svgOpacity: 1,
            iconColor: "#fff",
            number: "",
            svg: false
        },
        initialize: function(options) {
            options = L.Util.setOptions(this, options);
        },
        createIcon: function() {
            var div = document.createElement("div"), options = this.options;
            if (options.icon) {
                div.innerHTML = this._createInner();
            }
            if (options.innerHTML) {
                div.innerHTML = options.innerHTML;
            }
            if (options.bgPos) {
                div.style.backgroundPosition = -options.bgPos.x + "px " + -options.bgPos.y + "px";
            }
            if (!options.svg) {
                this._setIconStyles(div, options.shape + "-" + options.markerColor);
            } else {
                this._setIconStyles(div, "svg");
            }
            return div;
        },
        _createInner: function() {
            var iconColorStyle = "", iconNumber = "", options = this.options;
            if (options.iconColor) {
                iconColorStyle = "style='color: " + options.iconColor + "' ";
            }
            if (options.number) {
                iconNumber = "number='" + options.number + "' ";
            }
            if (options.svg) {
                var svg = '<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.529271 95.44922" style="fill:' + options.markerColor + ";stroke:" + options.svgBorderColor + ";fill-opacity:" + options.svgOpacity + ';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-139.52 -173.21)"><path d="m174.28 173.21c-19.199 0.00035-34.764 15.355-34.764 34.297 0.007 6.7035 1.5591 12.813 5.7461 18.854l0.0234 0.0371 28.979 42.262 28.754-42.107c3.1982-5.8558 5.9163-11.544 6.0275-19.045-0.0001-18.942-15.565-34.298-34.766-34.297z"/></g></svg>';
                if (options.shape === "square") {
                    svg = '<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.457038 96.523441" style="fill:' + options.markerColor + ";stroke:" + options.svgBorderColor + ";fill-opacity:" + options.svgOpacity + ';" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-545.27 -658.39)"><path d="m545.27 658.39v65.301h22.248l12.48 31.223 12.676-31.223h22.053v-65.301h-69.457z"/></g></svg>';
                }
                if (options.shape === "star") {
                    svg = '<svg style="top:0; fill:' + options.markerColor + ";stroke:" + options.svgBorderColor + ";fill-opacity:" + options.svgOpacity + ';" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 77.690999 101.4702"><g transform="translate(-101.15 -162.97)"><g transform="matrix(1 0 0 1.0165 -65.712 -150.28)"><path d="m205.97 308.16-11.561 11.561h-16.346v16.346l-11.197 11.197 11.197 11.197v15.83h15.744l11.615 33.693 11.467-33.568 0.125-0.125h16.346v-16.346l11.197-11.197-11.197-11.197v-15.83h-15.83l-11.561-11.561z"/></g></g></svg>';
                }
                if (options.shape === "penta") {
                    svg = '<svg style="fill:' + options.markerColor + ";stroke:" + options.svgBorderColor + ";fill-opacity:" + options.svgOpacity + ';"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.550368 96.362438" height="100%" width="100%" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><g transform="translate(-367.08 -289.9)"><path d="m367.08 322.5 17.236-32.604h36.151l18.164 32.25-35.665 64.112z"/></g></svg>';
                }
                return svg + "<i " + iconNumber + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + options.icon + "'></i>";
            }
            return "<i " + iconNumber + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + options.icon + "'></i>";
        },
        _setIconStyles: function(img, name) {
            var options = this.options, size = L.point(options[name === "shadow" ? "shadowSize" : "iconSize"]), anchor, leafletName;
            if (name === "shadow") {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
                leafletName = "shadow";
            } else {
                anchor = L.point(options.iconAnchor);
                leafletName = "icon";
            }
            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }
            img.className = "leaflet-marker-" + leafletName + " extra-marker extra-marker-" + name + " " + options.className;
            if (anchor) {
                img.style.marginLeft = -anchor.x + "px";
                img.style.marginTop = -anchor.y + "px";
            }
            if (size) {
                img.style.width = size.x + "px";
                img.style.height = size.y + "px";
            }
        },
        createShadow: function() {
            var div = document.createElement("div");
            this._setIconStyles(div, "shadow");
            return div;
        }
    });
    ExtraMarkers.icon = L.ExtraMarkers.icon = function(options) {
        return new L.ExtraMarkers.Icon(options);
    };

    exports.ExtraMarkers = ExtraMarkers;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=leaflet.extra-markers.js.map