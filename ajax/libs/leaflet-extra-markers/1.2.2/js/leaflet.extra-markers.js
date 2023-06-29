/*!
 * leaflet-extra-markers
 * Custom Markers for Leaflet JS based on Awesome Markers
 * Leaflet ExtraMarkers
 * https://github.com/coryasilva/Leaflet.ExtraMarkers/
 * @author coryasilva <https://github.com/coryasilva>
 * @version 1.2.1
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.leaflet = global.leaflet || {}, global.leaflet['extra-markers'] = {})));
}(this, (function (exports) { 'use strict';

    var ExtraMarkers = L.ExtraMarkers = {};
    ExtraMarkers.version = L.ExtraMarkers.version = "1.2.1";
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
            iconRotate: 0,
            number: "",
            svg: false,
            name: ""
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
        _getColorHex: function (color) {
            var colorMap = {
                red: "#a23337",
                "orange-dark": "#d73e29",
                orange: "#ef9227",
                yellow: "#f5bb39",
                "blue-dark": "#276273",
                cyan: "#32a9dd",
                purple: "#440444",
                violet: "#90278d",
                pink: "#c057a0",
                green: "#006838",
                white: "#e8e8e8",
                black: "#211c1d"
            };
            return colorMap[color] || color;
        },
        _createSvg: function (shape, markerColor) {
            var svgMap = {
                circle: '<svg width="32" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 2.746c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.439-17.863.056-.08a15.422 15.422 0 002.343-6.112c.123-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307" fill="' + markerColor + '" /><path d="M17.488 2.748c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.44-17.863.055-.08a15.422 15.422 0 002.343-6.112c.124-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307m0 1.071c7.68 0 13.929 6.386 13.929 14.236 0 .685-.064 1.423-.193 2.258-.325 2.075-1.059 3.99-2.164 5.667l-.055.078-11.557 16.595L6.032 26.14l-.12-.174a14.256 14.256 0 01-2.105-5.29 14.698 14.698 0 01-.247-2.62c0-7.851 6.249-14.237 13.928-14.237" fill="#231f20" opacity=".15" /></svg>',
                square: '<svg width="33" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M28.205 3.217H6.777c-2.367 0-4.286 1.87-4.286 4.179v19.847c0 2.308 1.919 4.179 4.286 4.179h5.357l5.337 13.58 5.377-13.58h5.357c2.366 0 4.285-1.87 4.285-4.179V7.396c0-2.308-1.919-4.179-4.285-4.179" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0714 0 0 -1.0714 -233.22 146.783)"><path d="M244 134h-20c-2.209 0-4-1.746-4-3.9v-18.525c0-2.154 1.791-3.9 4-3.9h5L233.982 95 239 107.675h5c2.209 0 4 1.746 4 3.9V130.1c0 2.154-1.791 3.9-4 3.9m0-1c1.654 0 3-1.301 3-2.9v-18.525c0-1.599-1.346-2.9-3-2.9h-5.68l-.25-.632-4.084-10.318-4.055 10.316-.249.634H224c-1.654 0-3 1.301-3 2.9V130.1c0 1.599 1.346 2.9 3 2.9h20" fill="#231f20" /></g></svg>',
                star:   '<svg width="34" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M32.92 16.93l-3.525-3.525V8.419a1.983 1.983 0 00-1.983-1.982h-4.985L18.9 2.91a1.984 1.984 0 00-2.803 0l-3.524 3.526H7.588a1.983 1.983 0 00-1.982 1.982v4.986L2.081 16.93a1.982 1.982 0 000 2.803l3.525 3.526v4.984c0 1.096.888 1.983 1.982 1.983h4.986L17.457 45l4.97-14.773h4.985a1.983 1.983 0 001.983-1.983V23.26l3.525-3.526a1.982 1.982 0 000-2.803" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0667 0 0 -1.0667 -347.3 97.26)"><path d="M342 89c-.476 0-.951-.181-1.314-.544l-3.305-3.305h-4.673a1.858 1.858 0 01-1.859-1.858v-4.674l-3.305-3.305a1.857 1.857 0 010-2.627l3.305-3.305v-4.674a1.86 1.86 0 011.859-1.859h4.673L341.959 49l4.659 13.849h4.674a1.86 1.86 0 011.859 1.859v4.674l3.305 3.305a1.858 1.858 0 010 2.627l-3.305 3.305v4.674a1.859 1.859 0 01-1.859 1.858h-4.674l-3.304 3.305A1.851 1.851 0 01342 89m0-1a.853.853 0 00.607-.251l3.304-3.305.293-.293h5.088a.86.86 0 00.859-.858v-5.088l3.598-3.598A.852.852 0 00356 74a.85.85 0 00-.251-.606l-3.598-3.598v-5.088a.86.86 0 00-.859-.859h-5.393l-.229-.681-3.702-11.006-3.637 11.001-.227.686h-5.396a.86.86 0 00-.859.859v5.088l-3.598 3.598c-.162.162-.251.377-.251.606s.089.445.251.607l3.598 3.598v5.088a.86.86 0 00.859.858h5.087l3.598 3.598A.853.853 0 00342 88" fill="#231f20" /></g></svg>',
                penta:  '<svg width="33" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M1.872 17.35L9.679 2.993h15.615L33.1 17.35 17.486 44.992z" fill="' + markerColor + '" /><g opacity=".15" transform="matrix(1.0769 0 0 -1.0769 -272.731 48.23)"><path d="M276.75 42h-14.5L255 28.668 269.5 3 284 28.668zm-.595-1l6.701-12.323L269.5 5.033l-13.356 23.644L262.845 41z" fill="#231f20" /></g></svg>'
            };
            return svgMap[shape];
        },
        _createInner: function() {
            var iconStyle = "", iconNumber = "", iconClass = "", result = "", options = this.options;
            if (options.iconColor) {
                iconStyle = "color: " + options.iconColor + ";";
            }
            if (options.iconRotate !== 0) {
                iconStyle += "-webkit-transform: rotate(" + options.iconRotate + "deg);";
                iconStyle += "-moz-transform: rotate(" + options.iconRotate + "deg);";
                iconStyle += "-o-transform: rotate(" + options.iconRotate + "deg);";
                iconStyle += "-ms-transform: rotate(" + options.iconRotate + "deg);";
                iconStyle += "transform: rotate(" + options.iconRotate + "deg);";
            }
            if (options.number) {
                iconNumber = 'number="' + options.number + '" ';
            }
            if (options.extraClasses.length) {
                iconClass += options.extraClasses + " ";
            }
            if (options.prefix.length) {
                iconClass += options.prefix + " ";
            }
            if (options.icon.length) {
                iconClass += options.icon + " ";
            }
            if (options.svg) {
                result += this._createSvg(options.shape, this._getColorHex(options.markerColor));
            }

            result += '<i ' + iconNumber + 'style="' + iconStyle + '" class="' + iconClass + '"></i>';

            if (options.name.length) {
                result += '<div class="' + (options.nameClasses !== undefined ? options.nameClasses : '') + '">' + options.name + '</div>';
            }

            return result;
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