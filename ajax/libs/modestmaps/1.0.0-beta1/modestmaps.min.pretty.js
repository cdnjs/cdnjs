/*
 * Modest Maps JS v1.0.0-beta1
 * http://modestmaps.com/
 *
 * Copyright (c) 2011 Stamen Design, All Rights Reserved.
 *
 * Open source under the BSD License.
 * http://creativecommons.org/licenses/BSD/
 *
 * Versioned using Semantic Versioning (v.major.minor.patch)
 * See CHANGELOG and http://semver.org/ for more details.
 *
 */var previousMM = MM;

if (!com) {
    var com = {};
    com.modestmaps || (com.modestmaps = {});
}

var MM = com.modestmaps = {
    noConflict: function() {
        return MM = previousMM, this;
    }
};

(function(a) {
    a.extend = function(a, b) {
        for (var c in b.prototype) typeof a.prototype[c] == "undefined" && (a.prototype[c] = b.prototype[c]);
        return a;
    }, a.getFrame = function() {
        return function(a) {
            (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                window.setTimeout(function() {
                    a(+(new Date));
                }, 10);
            })(a);
        };
    }(), a.transformProperty = function(a) {
        if (!this.document) return;
        var b = document.documentElement.style;
        for (var c = 0; c < a.length; c++) if (a[c] in b) return a[c];
        return !1;
    }([ "transformProperty", "WebkitTransform", "OTransform", "MozTransform", "msTransform" ]), a.matrixString = function(b) {
        b.scale * b.width % 1 && (b.scale += (1 - b.scale * b.width % 1) / b.width);
        var c = b.scale || 1;
        return a._browser.webkit3d ? "scale3d(" + c + "," + c + ", 1) translate3d(" + b.x.toFixed(0) + "px," + b.y.toFixed(0) + "px, 0px)" : "scale(" + c + "," + c + ") translate(" + b.x.toFixed(6) + "px," + b.y.toFixed(6) + "px)";
    }, a._browser = function(a) {
        return {
            webkit: "WebKitCSSMatrix" in a,
            webkit3d: "WebKitCSSMatrix" in a && "m11" in new WebKitCSSMatrix
        };
    }(this), a.moveElement = function(b, c) {
        if (a.transformProperty) {
            c.scale || (c.scale = 1), c.width || (c.width = 0), c.height || (c.height = 0);
            var d = a.matrixString(c);
            b[a.transformProperty] !== d && (b.style[a.transformProperty] = b[a.transformProperty] = d);
        } else b.style.left = c.x + "px", b.style.top = c.y + "px", c.width && c.height && c.scale && (b.style.width = Math.ceil(c.width * c.scale) + "px", b.style.height = Math.ceil(c.height * c.scale) + "px");
    }, a.cancelEvent = function(a) {
        return a.cancelBubble = !0, a.cancel = !0, a.returnValue = !1, a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), !1;
    }, a.bind = function(a, b) {
        var c = Array.prototype.slice, d = Function.prototype.bind;
        if (a.bind === d && d) return d.apply(a, c.call(arguments, 1));
        var e = c.call(arguments, 2);
        return function() {
            return a.apply(b, e.concat(c.call(arguments)));
        };
    }, a.coerceLayer = function(b) {
        return typeof b == "string" ? new a.Layer(new a.TemplatedMapProvider(b)) : "draw" in b && typeof b.draw == "function" ? b : new a.Layer(b);
    }, a.addEvent = function(a, b, c) {
        a.addEventListener ? (a.addEventListener(b, c, !1), b == "mousewheel" && a.addEventListener("DOMMouseScroll", c, !1)) : a.attachEvent && (a["e" + b + c] = c, a[b + c] = function() {
            a["e" + b + c](window.event);
        }, a.attachEvent("on" + b, a[b + c]));
    }, a.removeEvent = function(a, b, c) {
        a.removeEventListener ? (a.removeEventListener(b, c, !1), b == "mousewheel" && a.removeEventListener("DOMMouseScroll", c, !1)) : a.detachEvent && (a.detachEvent("on" + b, a[b + c]), a[b + c] = null);
    }, a.getStyle = function(a, b) {
        if (a.currentStyle) return a.currentStyle[b];
        if (window.getComputedStyle) return document.defaultView.getComputedStyle(a, null).getPropertyValue(b);
    }, a.Point = function(a, b) {
        this.x = parseFloat(a), this.y = parseFloat(b);
    }, a.Point.prototype = {
        x: 0,
        y: 0,
        toString: function() {
            return "(" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ")";
        },
        copy: function() {
            return new a.Point(this.x, this.y);
        }
    }, a.Point.distance = function(a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }, a.Point.interpolate = function(b, c, d) {
        return new a.Point(b.x + (c.x - b.x) * d, b.y + (c.y - b.y) * d);
    }, a.Coordinate = function(a, b, c) {
        this.row = a, this.column = b, this.zoom = c;
    }, a.Coordinate.prototype = {
        row: 0,
        column: 0,
        zoom: 0,
        toString: function() {
            return "(" + this.row.toFixed(3) + ", " + this.column.toFixed(3) + " @" + this.zoom.toFixed(3) + ")";
        },
        toKey: function() {
            return this.zoom + "," + this.row + "," + this.column;
        },
        copy: function() {
            return new a.Coordinate(this.row, this.column, this.zoom);
        },
        container: function() {
            return new a.Coordinate(Math.floor(this.row), Math.floor(this.column), Math.floor(this.zoom));
        },
        zoomTo: function(b) {
            var c = Math.pow(2, b - this.zoom);
            return new a.Coordinate(this.row * c, this.column * c, b);
        },
        zoomBy: function(b) {
            var c = Math.pow(2, b);
            return new a.Coordinate(this.row * c, this.column * c, this.zoom + b);
        },
        up: function(b) {
            return b === undefined && (b = 1), new a.Coordinate(this.row - b, this.column, this.zoom);
        },
        right: function(b) {
            return b === undefined && (b = 1), new a.Coordinate(this.row, this.column + b, this.zoom);
        },
        down: function(b) {
            return b === undefined && (b = 1), new a.Coordinate(this.row + b, this.column, this.zoom);
        },
        left: function(b) {
            return b === undefined && (b = 1), new a.Coordinate(this.row, this.column - b, this.zoom);
        }
    }, a.Location = function(a, b) {
        this.lat = parseFloat(a), this.lon = parseFloat(b);
    }, a.Location.prototype = {
        lat: 0,
        lon: 0,
        toString: function() {
            return "(" + this.lat.toFixed(3) + ", " + this.lon.toFixed(3) + ")";
        },
        copy: function() {
            return new a.Location(this.lat, this.lon);
        }
    }, a.Location.distance = function(a, b, c) {
        c || (c = 6378e3);
        var d = Math.PI / 180, e = a.lat * d, f = a.lon * d, g = b.lat * d, h = b.lon * d, i = Math.cos(e) * Math.cos(f) * Math.cos(g) * Math.cos(h), j = Math.cos(e) * Math.sin(f) * Math.cos(g) * Math.sin(h), k = Math.sin(e) * Math.sin(g);
        return Math.acos(i + j + k) * c;
    }, a.Location.interpolate = function(b, c, d) {
        if (b.lat === c.lat && b.lon === c.lon) return new a.Location(b.lat, b.lon);
        var e = Math.PI / 180, f = b.lat * e, g = b.lon * e, h = c.lat * e, i = c.lon * e, j = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((f - h) / 2), 2) + Math.cos(f) * Math.cos(h) * Math.pow(Math.sin((g - i) / 2), 2))), k = Math.atan2(Math.sin(g - i) * Math.cos(h), Math.cos(f) * Math.sin(h) - Math.sin(f) * Math.cos(h) * Math.cos(g - i)) / -(Math.PI / 180);
        k = k < 0 ? 360 + k : k;
        var l = Math.sin((1 - d) * j) / Math.sin(j), m = Math.sin(d * j) / Math.sin(j), n = l * Math.cos(f) * Math.cos(g) + m * Math.cos(h) * Math.cos(i), o = l * Math.cos(f) * Math.sin(g) + m * Math.cos(h) * Math.sin(i), p = l * Math.sin(f) + m * Math.sin(h), q = Math.atan2(p, Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2))), r = Math.atan2(o, n);
        return new a.Location(q / e, r / e);
    }, a.Extent = function(b, c, d, e) {
        if (b instanceof a.Location && c instanceof a.Location) {
            var f = b, g = c;
            b = f.lat, c = f.lon, d = g.lat, e = g.lon;
        }
        isNaN(d) && (d = b), isNaN(e) && (e = c), this.north = Math.max(b, d), this.south = Math.min(b, d), this.east = Math.max(e, c), this.west = Math.min(e, c);
    }, a.Extent.prototype = {
        north: 0,
        south: 0,
        east: 0,
        west: 0,
        copy: function() {
            return new a.Extent(this.north, this.west, this.south, this.east);
        },
        toString: function(a) {
            return isNaN(a) && (a = 3), [ this.north.toFixed(a), this.west.toFixed(a), this.south.toFixed(a), this.east.toFixed(a) ].join(", ");
        },
        northWest: function() {
            return new a.Location(this.north, this.west);
        },
        southEast: function() {
            return new a.Location(this.south, this.east);
        },
        northEast: function() {
            return new a.Location(this.north, this.east);
        },
        southWest: function() {
            return new a.Location(this.south, this.west);
        },
        center: function() {
            return new a.Location(this.south + (this.north - this.south) / 2, this.east + (this.west - this.east) / 2);
        },
        encloseLocation: function(a) {
            a.lat > this.north && (this.north = a.lat), a.lat < this.south && (this.south = a.lat), a.lon > this.east && (this.east = a.lon), a.lon < this.west && (this.west = a.lon);
        },
        encloseLocations: function(a) {
            var b = a.length;
            for (var c = 0; c < b; c++) this.encloseLocation(a[c]);
        },
        setFromLocations: function(a) {
            var b = a.length, c = a[0];
            this.north = this.south = c.lat, this.east = this.west = c.lon;
            for (var d = 1; d < b; d++) this.encloseLocation(a[d]);
        },
        encloseExtent: function(a) {
            a.north > this.north && (this.north = a.north), a.south < this.south && (this.south = a.south), a.east > this.east && (this.east = a.east), a.west < this.west && (this.west = a.west);
        },
        containsLocation: function(a) {
            return a.lat >= this.south && a.lat <= this.north && a.lon >= this.west && a.lon <= this.east;
        },
        toArray: function() {
            return [ this.northWest(), this.southEast() ];
        }
    }, a.Extent.fromString = function(b) {
        var c = b.split(/\s*,\s*/);
        if (c.length != 4) throw "Invalid extent string (expecting 4 comma-separated numbers)";
        return new a.Extent(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]), parseFloat(c[3]));
    }, a.Extent.fromArray = function(b) {
        var c = new a.Extent;
        return c.setFromLocations(b), c;
    }, a.Transformation = function(a, b, c, d, e, f) {
        this.ax = a, this.bx = b, this.cx = c, this.ay = d, this.by = e, this.cy = f;
    }, a.Transformation.prototype = {
        ax: 0,
        bx: 0,
        cx: 0,
        ay: 0,
        by: 0,
        cy: 0,
        transform: function(b) {
            return new a.Point(this.ax * b.x + this.bx * b.y + this.cx, this.ay * b.x + this.by * b.y + this.cy);
        },
        untransform: function(b) {
            return new a.Point((b.x * this.by - b.y * this.bx - this.cx * this.by + this.cy * this.bx) / (this.ax * this.by - this.ay * this.bx), (b.x * this.ay - b.y * this.ax - this.cx * this.ay + this.cy * this.ax) / (this.bx * this.ay - this.by * this.ax));
        }
    }, a.deriveTransformation = function(b, c, d, e, f, g, h, i, j, k, l, m) {
        var n = a.linearSolution(b, c, d, f, g, h, j, k, l), o = a.linearSolution(b, c, e, f, g, i, j, k, m);
        return new a.Transformation(n[0], n[1], n[2], o[0], o[1], o[2]);
    }, a.linearSolution = function(a, b, c, d, e, f, g, h, i) {
        a = parseFloat(a), b = parseFloat(b), c = parseFloat(c), d = parseFloat(d), e = parseFloat(e), f = parseFloat(f), g = parseFloat(g), h = parseFloat(h), i = parseFloat(i);
        var j = ((f - i) * (b - e) - (c - f) * (e - h)) / ((d - g) * (b - e) - (a - d) * (e - h)), k = ((f - i) * (a - d) - (c - f) * (d - g)) / ((e - h) * (a - d) - (b - e) * (d - g)), l = c - a * j - b * k;
        return [ j, k, l ];
    }, a.Projection = function(b, c) {
        c || (c = new a.Transformation(1, 0, 0, 0, 1, 0)), this.zoom = b, this.transformation = c;
    }, a.Projection.prototype = {
        zoom: 0,
        transformation: null,
        rawProject: function(a) {
            throw "Abstract method not implemented by subclass.";
        },
        rawUnproject: function(a) {
            throw "Abstract method not implemented by subclass.";
        },
        project: function(a) {
            return a = this.rawProject(a), this.transformation && (a = this.transformation.transform(a)), a;
        },
        unproject: function(a) {
            return this.transformation && (a = this.transformation.untransform(a)), a = this.rawUnproject(a), a;
        },
        locationCoordinate: function(b) {
            var c = new a.Point(Math.PI * b.lon / 180, Math.PI * b.lat / 180);
            return c = this.project(c), new a.Coordinate(c.y, c.x, this.zoom);
        },
        coordinateLocation: function(b) {
            b = b.zoomTo(this.zoom);
            var c = new a.Point(b.column, b.row);
            return c = this.unproject(c), new a.Location(180 * c.y / Math.PI, 180 * c.x / Math.PI);
        }
    }, a.LinearProjection = function(b, c) {
        a.Projection.call(this, b, c);
    }, a.LinearProjection.prototype = {
        rawProject: function(b) {
            return new a.Point(b.x, b.y);
        },
        rawUnproject: function(b) {
            return new a.Point(b.x, b.y);
        }
    }, a.extend(a.LinearProjection, a.Projection), a.MercatorProjection = function(b, c) {
        a.Projection.call(this, b, c);
    }, a.MercatorProjection.prototype = {
        rawProject: function(b) {
            return new a.Point(b.x, Math.log(Math.tan(.25 * Math.PI + .5 * b.y)));
        },
        rawUnproject: function(b) {
            return new a.Point(b.x, 2 * Math.atan(Math.pow(Math.E, b.y)) - .5 * Math.PI);
        }
    }, a.extend(a.MercatorProjection, a.Projection), a.MapProvider = function(a) {
        a && (this.getTile = a);
    }, a.MapProvider.prototype = {
        tileLimits: [ new a.Coordinate(0, 0, 0), (new a.Coordinate(1, 1, 0)).zoomTo(18) ],
        getTileUrl: function(a) {
            throw "Abstract method not implemented by subclass.";
        },
        getTile: function(a) {
            throw "Abstract method not implemented by subclass.";
        },
        releaseTile: function(a) {},
        setZoomRange: function(a, b) {
            this.tileLimits[0] = this.tileLimits[0].zoomTo(a), this.tileLimits[1] = this.tileLimits[1].zoomTo(b);
        },
        sourceCoordinate: function(b) {
            var c = this.tileLimits[0].zoomTo(b.zoom), d = this.tileLimits[1].zoomTo(b.zoom), e = Math.pow(2, b.zoom), f;
            return b.column < 0 ? f = (b.column + e) % e : f = b.column % e, b.row < c.row || b.row >= d.row ? null : f < c.column || f >= d.column ? null : new a.Coordinate(b.row, f, b.zoom);
        }
    }, a.TemplatedMapProvider = function(b, c) {
        var d = b.match(/{(Q|quadkey)}/);
        d && (b = b.replace("{subdomains}", "{S}").replace("{zoom}", "{Z}").replace("{quadkey}", "{Q}"));
        var e = c && c.length && b.indexOf("{S}") >= 0, f = function(a) {
            var f = this.sourceCoordinate(a);
            if (!f) return null;
            var g = b;
            if (e) {
                var h = parseInt(f.zoom + f.row + f.column, 10) % c.length;
                g = g.replace("{S}", c[h]);
            }
            return d ? g.replace("{Z}", f.zoom.toFixed(0)).replace("{Q}", this.quadKey(f.row, f.column, f.zoom)) : g.replace("{Z}", f.zoom.toFixed(0)).replace("{X}", f.column.toFixed(0)).replace("{Y}", f.row.toFixed(0));
        };
        a.MapProvider.call(this, f);
    }, a.TemplatedMapProvider.prototype = {
        quadKey: function(a, b, c) {
            var d = "";
            for (var e = 1; e <= c; e++) d += (a >> c - e & 1) << 1 | b >> c - e & 1;
            return d || "0";
        },
        getTile: function(a) {
            return this.getTileUrl(a);
        }
    }, a.extend(a.TemplatedMapProvider, a.MapProvider), a.TemplatedLayer = function(b, c) {
        return new a.Layer(new a.TemplatedMapProvider(b, c));
    }, a.getMousePoint = function(b, c) {
        var d = new a.Point(b.clientX, b.clientY);
        d.x += document.body.scrollLeft + document.documentElement.scrollLeft, d.y += document.body.scrollTop + document.documentElement.scrollTop;
        for (var e = c.parent; e; e = e.offsetParent) d.x -= e.offsetLeft, d.y -= e.offsetTop;
        return d;
    }, a.MouseWheelHandler = function() {
        function g(b) {
            var g = 0;
            e = e || (new Date).getTime();
            try {
                d.scrollTop = 1e3, d.dispatchEvent(b), g = 1e3 - d.scrollTop;
            } catch (i) {
                g = b.wheelDelta || -b.detail * 5;
            }
            var j = (new Date).getTime() - e, k = a.getMousePoint(b, c);
            return Math.abs(g) > 0 && j > 200 && !f ? (c.zoomByAbout(g > 0 ? 1 : -1, k), e = (new Date).getTime()) : f && c.zoomByAbout(g * .001, k), a.cancelEvent(b);
        }
        var b = {}, c, d, e, f = !1;
        return b.add = function(e) {
            c = e, d = document.body.appendChild(document.createElement("div")), d.style.cssText = "visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";
            var f = d.appendChild(document.createElement("div"));
            return f.style.height = "2000px", a.addEvent(c.parent, "mousewheel", g), b;
        }, b.precise = function(a) {
            return arguments.length ? (f = !!a, b) : f;
        }, b.remove = function() {
            a.removeEvent(c.parent, "mousewheel", g), d.parentNode.removeChild(d);
        }, b;
    }, a.DoubleClickHandler = function() {
        function d(b) {
            var d = a.getMousePoint(b, c);
            return c.zoomByAbout(b.shiftKey ? -1 : 1, d), a.cancelEvent(b);
        }
        var b = {}, c;
        return b.add = function(f) {
            return c = f, a.addEvent(c.parent, "dblclick", d), b;
        }, b.remove = function() {
            a.removeEvent(c.parent, "dblclick", d);
        }, b;
    }, a.DragHandler = function() {
        function e(b) {
            return a.addEvent(document, "mouseup", f), a.addEvent(document, "mousemove", g), c = new a.Point(b.clientX, b.clientY), d.parent.style.cursor = "move", a.cancelEvent(b);
        }
        function f(b) {
            return a.removeEvent(document, "mouseup", f), a.removeEvent(document, "mousemove", g), c = null, d.parent.style.cursor = "", a.cancelEvent(b);
        }
        function g(b) {
            return c && (d.panBy(b.clientX - c.x, b.clientY - c.y), c.x = b.clientX, c.y = b.clientY, c.t = +(new Date)), a.cancelEvent(b);
        }
        var b = {}, c, d;
        return b.add = function(c) {
            return d = c, a.addEvent(d.parent, "mousedown", e), b;
        }, b.remove = function() {
            a.removeEvent(d.parent, "mousedown", e);
        }, b;
    }, a.MouseHandler = function() {
        var b = {}, c;
        return b.add = function(e) {
            return map = e, c = [ a.DragHandler().add(map), a.DoubleClickHandler().add(map), a.MouseWheelHandler().add(map) ], b;
        }, b.remove = function() {
            for (var a = 0; a < c.length; a++) c[a].remove();
            return b;
        }, b;
    };
    var b = function() {
        var a = window.documentMode;
        return "onhashchange" in window && (a === undefined || a > 7);
    }();
    a.Hash = function(b) {
        this.onMapMove = a.bind(this.onMapMove, this), this.onHashChange = a.bind(this.onHashChange, this), b && this.init(b);
    }, a.Hash.prototype = {
        map: null,
        lastHash: null,
        parseHash: function(b) {
            var c = b.split("/");
            if (c.length == 3) {
                var d = parseInt(c[0], 10), e = parseFloat(c[1]), f = parseFloat(c[2]);
                return isNaN(d) || isNaN(e) || isNaN(f) ? !1 : {
                    center: new a.Location(e, f),
                    zoom: d
                };
            }
            return !1;
        },
        formatHash: function(a) {
            var b = a.getCenter(), c = a.getZoom(), d = Math.max(0, Math.ceil(Math.log(c) / Math.LN2));
            return "#" + [ c, b.lat.toFixed(d), b.lon.toFixed(d) ].join("/");
        },
        init: function(a) {
            this.map = a, this.map.addCallback("drawn", this.onMapMove), this.lastHash = null, this.onHashChange(), this.isListening || this.startListening();
        },
        remove: function() {
            this.map = null, this.isListening && this.stopListening();
        },
        onMapMove: function(a) {
            if (this.movingMap || this.map.zoom === 0) return !1;
            var b = this.formatHash(a);
            this.lastHash != b && (location.replace(b), this.lastHash = b);
        },
        movingMap: !1,
        update: function() {
            var a = location.hash;
            if (a === this.lastHash) return;
            var b = a.substr(1), c = this.parseHash(b);
            c ? (this.movingMap = !0, this.map.setCenterZoom(c.center, c.zoom), this.movingMap = !1) : this.onMapMove(this.map);
        },
        changeDefer: 100,
        changeTimeout: null,
        onHashChange: function() {
            if (!this.changeTimeout) {
                var a = this;
                this.changeTimeout = setTimeout(function() {
                    a.update(), a.changeTimeout = null;
                }, this.changeDefer);
            }
        },
        isListening: !1,
        hashChangeInterval: null,
        startListening: function() {
            b ? window.addEventListener("hashchange", this.onHashChange, !1) : (clearInterval(this.hashChangeInterval), this.hashChangeInterval = setInterval(this.onHashChange, 50)), this.isListening = !0;
        },
        stopListening: function() {
            b ? window.removeEventListener("hashchange", this.onHashChange) : clearInterval(this.hashChangeInterval), this.isListening = !1;
        }
    }, a.TouchHandler = function() {
        function k() {
            var a = document.createElement("div");
            return a.setAttribute("ongesturestart", "return;"), typeof a.ongesturestart == "function";
        }
        function l(a) {
            for (var b = 0; b < a.touches.length; b += 1) {
                var c = a.touches[b];
                if (c.identifier in f) {
                    var d = this.locations[c.identifier];
                    d.x = c.screenX, d.y = c.screenY, d.scale = a.scale;
                } else f[c.identifier] = {
                    scale: a.scale,
                    startPos: {
                        x: c.screenX,
                        y: c.screenY
                    },
                    x: c.screenX,
                    y: c.screenY,
                    time: (new Date).getTime()
                };
            }
        }
        function m(a, b) {
            return a && a.touch && b.identifier == a.touch.identifier;
        }
        function n(b) {
            return l(b), a.cancelEvent(b);
        }
        function o(b) {
            switch (b.touches.length) {
              case 1:
                t(b.touches[0]);
                break;
              case 2:
                u(b);
            }
            return l(b), a.cancelEvent(b);
        }
        function p(b) {
            var e = (new Date).getTime();
            b.touches.length === 0 && i && v(j);
            for (var g = 0; g < b.changedTouches.length; g += 1) {
                var h = b.changedTouches[g], k = f[h.identifier];
                if (!k || k.wasPinch) continue;
                var l = {
                    x: h.screenX,
                    y: h.screenY
                }, m = e - k.time, n = a.Point.distance(l, k.startPos);
                n > d || (m > c ? (l.end = e, l.duration = m, q(l)) : (l.time = e, r(l)));
            }
            var o = {};
            for (var p = 0; p < b.touches.length; p++) o[b.touches[p].identifier] = !0;
            for (var s in f) s in o || delete o[s];
            return a.cancelEvent(b);
        }
        function q(a) {}
        function r(a) {
            if (g.length && a.time - g[0].time < e) {
                s(a), g = [];
                return;
            }
            g = [ a ];
        }
        function s(b) {
            var c = map.getZoom(), d = Math.round(c) + 1, e = d - c, f = new a.Point(b.x, b.y);
            map.zoomByAbout(e, f);
        }
        function t(a) {
            var b = {
                x: a.screenX,
                y: a.screenY
            }, c = f[a.identifier];
            map.panBy(b.x - c.x, b.y - c.y);
        }
        function u(b) {
            var c = b.touches[0], d = b.touches[1], e = new a.Point(c.screenX, c.screenY), g = new a.Point(d.screenX, d.screenY), h = f[c.identifier], k = f[d.identifier];
            h.wasPinch = !0, k.wasPinch = !0;
            var l = a.Point.interpolate(e, g, .5);
            map.zoomByAbout(Math.log(b.scale) / Math.LN2 - Math.log(h.scale) / Math.LN2, l);
            var m = a.Point.interpolate(h, k, .5);
            map.panBy(l.x - m.x, l.y - m.y), i = !0, j = l;
        }
        function v(a) {
            if (h) {
                var b = map.getZoom(), c = Math.round(b);
                map.zoomByAbout(c - b, a);
            }
            i = !1;
        }
        var b = {}, c = 250, d = 30, e = 350, f = {}, g = [], h = !0, i = !1, j = null;
        return b.add = function(c) {
            return map = c, k() ? (a.addEvent(map.parent, "touchstart", n), a.addEvent(map.parent, "touchmove", o), a.addEvent(map.parent, "touchend", p), b) : b;
        }, b.remove = function() {
            return k() ? (a.removeEvent(map.parent, "touchstart", n), a.removeEvent(map.parent, "touchmove", o), a.removeEvent(map.parent, "touchend", p), b) : b;
        }, b;
    }, a.CallbackManager = function(a, b) {
        this.owner = a, this.callbacks = {};
        for (var c = 0; c < b.length; c++) this.callbacks[b[c]] = [];
    }, a.CallbackManager.prototype = {
        owner: null,
        callbacks: null,
        addCallback: function(a, b) {
            typeof b == "function" && this.callbacks[a] && this.callbacks[a].push(b);
        },
        removeCallback: function(a, b) {
            if (typeof b == "function" && this.callbacks[a]) {
                var c = this.callbacks[a], d = c.length;
                for (var e = 0; e < d; e++) if (c[e] === b) {
                    c.splice(e, 1);
                    break;
                }
            }
        },
        dispatchCallback: function(a, b) {
            if (this.callbacks[a]) for (var c = 0; c < this.callbacks[a].length; c += 1) try {
                this.callbacks[a][c](this.owner, b);
            } catch (d) {}
        }
    }, a.RequestManager = function() {
        this.loadingBay = document.createDocumentFragment(), this.requestsById = {}, this.openRequestCount = 0, this.maxOpenRequests = 4, this.requestQueue = [], this.callbackManager = new a.CallbackManager(this, [ "requestcomplete", "requesterror" ]);
    }, a.RequestManager.prototype = {
        loadingBay: null,
        requestsById: null,
        requestQueue: null,
        openRequestCount: null,
        maxOpenRequests: null,
        callbackManager: null,
        addCallback: function(a, b) {
            this.callbackManager.addCallback(a, b);
        },
        removeCallback: function(a, b) {
            this.callbackManager.removeCallback(a, b);
        },
        dispatchCallback: function(a, b) {
            this.callbackManager.dispatchCallback(a, b);
        },
        clear: function() {
            this.clearExcept({});
        },
        clearRequest: function(a) {
            a in this.requestsById && delete this.requestsById[a];
            for (var b = 0; b < this.requestQueue.length; b++) {
                var c = this.requestQueue[b];
                c && c.id == a && (this.requestQueue[b] = null);
            }
        },
        clearExcept: function(a) {
            for (var b = 0; b < this.requestQueue.length; b++) {
                var c = this.requestQueue[b];
                c && !(c.id in a) && (this.requestQueue[b] = null);
            }
            var d = this.loadingBay.childNodes;
            for (var e = d.length - 1; e >= 0; e--) {
                var f = d[e];
                f.id in a || (this.loadingBay.removeChild(f), this.openRequestCount--, f.src = f.coord = f.onload = f.onerror = null);
            }
            for (var g in this.requestsById) if (!(g in a) && this.requestsById.hasOwnProperty(g)) {
                var h = this.requestsById[g];
                delete this.requestsById[g], h !== null && (h = h.id = h.coord = h.url = null);
            }
        },
        hasRequest: function(a) {
            return a in this.requestsById;
        },
        requestTile: function(a, b, c) {
            if (!(a in this.requestsById)) {
                var d = {
                    id: a,
                    coord: b.copy(),
                    url: c
                };
                this.requestsById[a] = d, c && this.requestQueue.push(d);
            }
        },
        getProcessQueue: function() {
            if (!this._processQueue) {
                var a = this;
                this._processQueue = function() {
                    a.processQueue();
                };
            }
            return this._processQueue;
        },
        processQueue: function(a) {
            a && this.requestQueue.length > 8 && this.requestQueue.sort(a);
            while (this.openRequestCount < this.maxOpenRequests && this.requestQueue.length > 0) {
                var b = this.requestQueue.pop();
                if (b) {
                    this.openRequestCount++;
                    var c = document.createElement("img");
                    c.id = b.id, c.style.position = "absolute", c.coord = b.coord, this.loadingBay.appendChild(c), c.onload = c.onerror = this.getLoadComplete(), c.src = b.url, b = b.id = b.coord = b.url = null;
                }
            }
        },
        _loadComplete: null,
        getLoadComplete: function() {
            if (!this._loadComplete) {
                var a = this;
                this._loadComplete = function(b) {
                    b = b || window.event;
                    var d = b.srcElement || b.target;
                    d.onload = d.onerror = null, a.loadingBay.removeChild(d), a.openRequestCount--, delete a.requestsById[d.id], b.type === "load" && (d.complete || d.readyState && d.readyState == "complete") ? a.dispatchCallback("requestcomplete", d) : (a.dispatchCallback("requesterror", d.src), d.src = null), setTimeout(a.getProcessQueue(), 0);
                };
            }
            return this._loadComplete;
        }
    }, a.Layer = function(b, c) {
        this.parent = c || document.createElement("div"), this.parent.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0", this.levels = {}, this.requestManager = new a.RequestManager, this.requestManager.addCallback("requestcomplete", this.getTileComplete()), b && this.setProvider(b);
    }, a.Layer.prototype = {
        map: null,
        parent: null,
        tiles: null,
        levels: null,
        requestManager: null,
        provider: null,
        enablePyramidLoading: !1,
        _tileComplete: null,
        getTileComplete: function() {
            if (!this._tileComplete) {
                var a = this;
                this._tileComplete = function(b, d) {
                    a.tiles[d.id] = d, a.positionTile(d);
                };
            }
            return this._tileComplete;
        },
        draw: function() {
            var b = Math.round(this.map.coordinate.zoom), c = this.map.pointCoordinate(new a.Point(0, 0)).zoomTo(b).container(), d = this.map.pointCoordinate(this.map.dimensions).zoomTo(b).container().right().down(), e = {}, f = this.createOrGetLevel(c.zoom), g = c.copy();
            for (g.column = c.column; g.column <= d.column; g.column++) for (g.row = c.row; g.row <= d.row; g.row++) {
                var h = this.inventoryVisibleTile(f, g);
                while (h.length) e[h.pop()] = !0;
            }
            for (var i in this.levels) if (this.levels.hasOwnProperty(i)) {
                var j = parseInt(i, 10);
                if (j >= c.zoom - 5 && j < c.zoom + 2) continue;
                var k = this.levels[i];
                k.style.display = "none";
                var l = this.tileElementsInLevel(k);
                while (l.length) this.provider.releaseTile(l[0].coord), this.requestManager.clearRequest(l[0].coord.toKey()), k.removeChild(l[0]), l.shift();
            }
            var m = c.zoom - 5, n = c.zoom + 2;
            for (var o = m; o < n; o++) this.adjustVisibleLevel(this.levels[o], o, e);
            this.requestManager.clearExcept(e), this.requestManager.processQueue(this.getCenterDistanceCompare());
        },
        inventoryVisibleTile: function(a, b) {
            var c = b.toKey(), d = [ c ];
            if (c in this.tiles) {
                var e = this.tiles[c];
                return e.parentNode != a && (a.appendChild(e), "reAddTile" in this.provider && this.provider.reAddTile(c, b, e)), d;
            }
            if (!this.requestManager.hasRequest(c)) {
                var f = this.provider.getTile(b);
                typeof f == "string" ? this.addTileImage(c, b, f) : f && this.addTileElement(c, b, f);
            }
            var g = !1, h = b.zoom;
            for (var i = 1; i <= h; i++) {
                var j = b.zoomBy(-i).container(), k = j.toKey();
                if (this.enablePyramidLoading) {
                    d.push(k);
                    var l = this.createOrGetLevel(j.zoom);
                    if (k in this.tiles) {
                        var m = this.tiles[k];
                        m.parentNode != l && l.appendChild(m);
                    } else if (!this.requestManager.hasRequest(k)) {
                        var n = this.provider.getTile(j);
                        typeof n == "string" ? this.addTileImage(k, j, n) : this.addTileElement(k, j, n);
                    }
                } else if (k in this.tiles) {
                    d.push(k), g = !0;
                    break;
                }
            }
            if (!g && !this.enablePyramidLoading) {
                var o = b.zoomBy(1);
                d.push(o.toKey()), o.column += 1, d.push(o.toKey()), o.row += 1, d.push(o.toKey()), o.column -= 1, d.push(o.toKey());
            }
            return d;
        },
        tileElementsInLevel: function(a) {
            var b = [];
            for (var c = a.firstChild; c; c = c.nextSibling) c.nodeType == 1 && b.push(c);
            return b;
        },
        adjustVisibleLevel: function(b, c, d) {
            if (!b) return;
            var e = 1, f = this.map.coordinate.copy();
            b.childNodes.length > 0 ? (b.style.display = "block", e = Math.pow(2, this.map.coordinate.zoom - c), f = f.zoomTo(c)) : b.style.display = "none";
            var g = this.map.tileSize.x * e, h = this.map.tileSize.y * e, i = new a.Point(this.map.dimensions.x / 2, this.map.dimensions.y / 2), j = this.tileElementsInLevel(b);
            while (j.length) {
                var k = j.pop();
                d[k.id] || (this.provider.releaseTile(k.coord), this.requestManager.clearRequest(k.coord.toKey()), b.removeChild(k));
            }
            a.moveElement(b, {
                x: -(f.column * 256) + i.x,
                y: -(f.row * 256) + i.y,
                scale: e
            });
        },
        createOrGetLevel: function(a) {
            if (a in this.levels) return this.levels[a];
            var b = document.createElement("div");
            return b.id = this.parent.id + "-zoom-" + a, b.style.cssText = this.parent.style.cssText, b.style.zIndex = a, this.parent.appendChild(b), this.levels[a] = b, b;
        },
        addTileImage: function(a, b, c) {
            this.requestManager.requestTile(a, b, c);
        },
        addTileElement: function(a, b, c) {
            c.id = a, c.coord = b.copy(), this.positionTile(c);
        },
        positionTile: function(b) {
            var c = this.map.coordinate.zoomTo(b.coord.zoom);
            b.style.cssText = "position:absolute;-webkit-user-select:none;-webkit-user-drag:none;-moz-user-drag:none;", b.ondragstart = function() {
                return !1;
            };
            var d = b.coord.column * this.map.tileSize.x, e = b.coord.row * this.map.tileSize.y;
            a.moveElement(b, {
                x: Math.round(d),
                y: Math.round(e),
                width: this.map.tileSize.x,
                height: this.map.tileSize.y
            });
            var f = this.levels[b.coord.zoom];
            f.appendChild(b), b.className = "map-tile-loaded", Math.round(this.map.coordinate.zoom) == b.coord.zoom && (f.style.display = "block"), this.requestRedraw();
        },
        _redrawTimer: undefined,
        requestRedraw: function() {
            this._redrawTimer || (this._redrawTimer = setTimeout(this.getRedraw(), 1e3));
        },
        _redraw: null,
        getRedraw: function() {
            if (!this._redraw) {
                var a = this;
                this._redraw = function() {
                    a.draw(), a._redrawTimer = 0;
                };
            }
            return this._redraw;
        },
        setProvider: function(a) {
            var b = this.provider === null;
            if (!b) {
                this.requestManager.clear();
                for (var c in this.levels) if (this.levels.hasOwnProperty(c)) {
                    var d = this.levels[c];
                    while (d.firstChild) this.provider.releaseTile(d.firstChild.coord), d.removeChild(d.firstChild);
                }
            }
            this.tiles = {}, this.provider = a, b || this.draw();
        },
        getCenterDistanceCompare: function() {
            var a = this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom));
            return function(b, d) {
                if (b && d) {
                    var e = b.coord, f = d.coord;
                    if (e.zoom == f.zoom) {
                        var g = Math.abs(a.row - e.row - .5) + Math.abs(a.column - e.column - .5), h = Math.abs(a.row - f.row - .5) + Math.abs(a.column - f.column - .5);
                        return g < h ? 1 : g > h ? -1 : 0;
                    }
                    return e.zoom < f.zoom ? 1 : e.zoom > f.zoom ? -1 : 0;
                }
                return b ? 1 : d ? -1 : 0;
            };
        },
        destroy: function() {
            this.requestManager.clear(), this.requestManager.removeCallback("requestcomplete", this.getTileComplete()), this.provider = null, this.parent.parentNode && this.parent.parentNode.removeChild(this.parent), this.map = null;
        }
    }, a.Map = function(b, c, d, e) {
        if (typeof b == "string") {
            b = document.getElementById(b);
            if (!b) throw "The ID provided to modest maps could not be found.";
        }
        this.parent = b, this.parent.style.padding = "0", this.parent.style.overflow = "hidden";
        var f = a.getStyle(this.parent, "position");
        f != "relative" && f != "absolute" && (this.parent.style.position = "relative"), this.layers = [], c instanceof Array || (c = [ c ]);
        for (var g = 0; g < c.length; g++) this.addLayer(c[g]);
        this.projection = new a.MercatorProjection(0, a.deriveTransformation(-Math.PI, Math.PI, 0, 0, Math.PI, Math.PI, 1, 0, -Math.PI, -Math.PI, 0, 1)), this.tileSize = new a.Point(256, 256), this.coordLimits = [ new a.Coordinate(0, -Infinity, 0), (new a.Coordinate(1, Infinity, 0)).zoomTo(18) ], this.coordinate = new a.Coordinate(.5, .5, 0), d ? (this.autoSize = !1, this.parent.style.width = Math.round(d.x) + "px", this.parent.style.height = Math.round(d.y) + "px") : (d = new a.Point(this.parent.offsetWidth, this.parent.offsetHeight), this.autoSize = !0, a.addEvent(window, "resize", this.windowResize())), this.dimensions = d, this.callbackManager = new a.CallbackManager(this, [ "zoomed", "panned", "centered", "extentset", "resized", "drawn" ]);
        if (e === undefined) this.eventHandlers = [ a.MouseHandler().add(this), a.TouchHandler().add(this) ]; else {
            this.eventHandlers = e;
            if (e instanceof Array) for (var h = 0; h < e.length; h++) e[h].add(this);
        }
    }, a.Map.prototype = {
        parent: null,
        dimensions: null,
        projection: null,
        coordinate: null,
        tileSize: null,
        coordLimits: null,
        layers: null,
        callbackManager: null,
        eventHandlers: null,
        autoSize: null,
        toString: function() {
            return "Map(#" + this.parent.id + ")";
        },
        addCallback: function(a, b) {
            return this.callbackManager.addCallback(a, b), this;
        },
        removeCallback: function(a, b) {
            return this.callbackManager.removeCallback(a, b), this;
        },
        dispatchCallback: function(a, b) {
            return this.callbackManager.dispatchCallback(a, b), this;
        },
        windowResize: function() {
            if (!this._windowResize) {
                var b = this;
                this._windowResize = function(d) {
                    b.dimensions = new a.Point(b.parent.offsetWidth, b.parent.offsetHeight), b.draw(), b.dispatchCallback("resized", [ b.dimensions ]);
                };
            }
            return this._windowResize;
        },
        setZoomRange: function(a, b) {
            this.coordLimits[0] = this.coordLimits[0].zoomTo(a), this.coordLimits[1] = this.coordLimits[1].zoomTo(b);
        },
        zoomBy: function(b) {
            return this.coordinate = this.enforceLimits(this.coordinate.zoomBy(b)), a.getFrame(this.getRedraw()), this.dispatchCallback("zoomed", b), this;
        },
        zoomIn: function() {
            return this.zoomBy(1);
        },
        zoomOut: function() {
            return this.zoomBy(-1);
        },
        setZoom: function(a) {
            return this.zoomBy(a - this.coordinate.zoom);
        },
        zoomByAbout: function(a, b) {
            var c = this.pointLocation(b);
            this.coordinate = this.enforceLimits(this.coordinate.zoomBy(a));
            var d = this.locationPoint(c);
            return this.dispatchCallback("zoomed", a), this.panBy(b.x - d.x, b.y - d.y);
        },
        panBy: function(b, c) {
            return this.coordinate.column -= b / this.tileSize.x, this.coordinate.row -= c / this.tileSize.y, this.coordinate = this.enforceLimits(this.coordinate), a.getFrame(this.getRedraw()), this.dispatchCallback("panned", [ b, c ]), this;
        },
        panLeft: function() {
            return this.panBy(100, 0);
        },
        panRight: function() {
            return this.panBy(-100, 0);
        },
        panDown: function() {
            return this.panBy(0, -100);
        },
        panUp: function() {
            return this.panBy(0, 100);
        },
        setCenter: function(a) {
            return this.setCenterZoom(a, this.coordinate.zoom);
        },
        setCenterZoom: function(b, c) {
            return this.coordinate = this.projection.locationCoordinate(b).zoomTo(parseFloat(c) || 0), a.getFrame(this.getRedraw()), this.dispatchCallback("centered", [ b, c ]), this;
        },
        setExtent: function(b, c) {
            b instanceof a.Extent && (b = b.toArray());
            var d, e;
            for (var f = 0; f < b.length; f++) {
                var g = this.projection.locationCoordinate(b[f]);
                d ? (d.row = Math.min(d.row, g.row), d.column = Math.min(d.column, g.column), d.zoom = Math.min(d.zoom, g.zoom), e.row = Math.max(e.row, g.row), e.column = Math.max(e.column, g.column), e.zoom = Math.max(e.zoom, g.zoom)) : (d = g.copy(), e = g.copy());
            }
            var h = this.dimensions.x + 1, i = this.dimensions.y + 1, j = (e.column - d.column) / (h / this.tileSize.x), k = Math.log(j) / Math.log(2), l = d.zoom - (c ? k : Math.ceil(k)), m = (e.row - d.row) / (i / this.tileSize.y), n = Math.log(m) / Math.log(2), o = d.zoom - (c ? n : Math.ceil(n)), p = Math.min(l, o);
            p = Math.min(p, this.coordLimits[1].zoom), p = Math.max(p, this.coordLimits[0].zoom);
            var q = (d.row + e.row) / 2, r = (d.column + e.column) / 2, s = d.zoom;
            return this.coordinate = (new a.Coordinate(q, r, s)).zoomTo(p), this.draw(), this.dispatchCallback("extentset", b), this;
        },
        setSize: function(b) {
            return this.dimensions = new a.Point(b.x, b.y), this.parent.style.width = Math.round(this.dimensions.x) + "px", this.parent.style.height = Math.round(this.dimensions.y) + "px", this.autoSize && (a.removeEvent(window, "resize", this.windowResize()), this.autoSize = !1), this.draw(), this.dispatchCallback("resized", this.dimensions), this;
        },
        coordinatePoint: function(b) {
            b.zoom != this.coordinate.zoom && (b = b.zoomTo(this.coordinate.zoom));
            var c = new a.Point(this.dimensions.x / 2, this.dimensions.y / 2);
            return c.x += this.tileSize.x * (b.column - this.coordinate.column), c.y += this.tileSize.y * (b.row - this.coordinate.row), c;
        },
        pointCoordinate: function(a) {
            var b = this.coordinate.copy();
            return b.column += (a.x - this.dimensions.x / 2) / this.tileSize.x, b.row += (a.y - this.dimensions.y / 2) / this.tileSize.y, b;
        },
        locationCoordinate: function(a) {
            return this.projection.locationCoordinate(a);
        },
        coordinateLocation: function(a) {
            return this.projection.coordinateLocation(a);
        },
        locationPoint: function(a) {
            return this.coordinatePoint(this.locationCoordinate(a));
        },
        pointLocation: function(a) {
            return this.coordinateLocation(this.pointCoordinate(a));
        },
        getExtent: function() {
            return new a.Extent(this.pointLocation(new a.Point(0, 0)), this.pointLocation(this.dimensions));
        },
        extent: function(a, b) {
            return a ? this.setExtent(a, b) : this.getExtent();
        },
        getCenter: function() {
            return this.projection.coordinateLocation(this.coordinate);
        },
        center: function(a) {
            return a ? this.setCenter(a) : this.getCenter();
        },
        getZoom: function() {
            return this.coordinate.zoom;
        },
        zoom: function(a) {
            return a !== undefined ? this.setZoom(a) : this.getZoom();
        },
        getLayers: function() {
            return this.layers.slice();
        },
        getLayerAt: function(a) {
            return this.layers[a];
        },
        addLayer: function(a) {
            return this.layers.push(a), this.parent.appendChild(a.parent), a.map = this, this;
        },
        removeLayer: function(a) {
            for (var b = 0; b < this.layers.length; b++) if (a == this.layers[b]) {
                this.removeLayerAt(b);
                break;
            }
            return this;
        },
        setLayerAt: function(b, c) {
            if (b < 0 || b >= this.layers.length) throw new Error("invalid index in setLayerAt(): " + b);
            return this.layers[b] != c && (b < this.layers.length && this.layers[b].destroy(), this.layers[b] = c, this.parent.appendChild(c.parent), c.map = this, a.getFrame(this.getRedraw())), this;
        },
        insertLayerAt: function(b, c) {
            if (b < 0 || b > this.layers.length) throw new Error("invalid index in insertLayerAt(): " + b);
            if (b == this.layers.length) this.layers.push(c), this.parent.appendChild(c.parent); else {
                var d = this.layers[b];
                this.parent.insertBefore(c.parent, d.parent), this.layers.splice(b, 0, c);
            }
            return c.map = this, a.getFrame(this.getRedraw()), this;
        },
        removeLayerAt: function(a) {
            if (a < 0 || a >= this.layers.length) throw new Error("invalid index in removeLayer(): " + a);
            var b = this.layers[a];
            return this.layers.splice(a, 1), b.destroy(), this;
        },
        swapLayersAt: function(a, b) {
            if (a < 0 || a >= this.layers.length || b < 0 || b >= this.layers.length) throw new Error("invalid index in swapLayersAt(): " + index);
            var c = this.layers[a], d = this.layers[b], e = document.createElement("div");
            return this.parent.replaceChild(e, d.parent), this.parent.replaceChild(d.parent, c.parent), this.parent.replaceChild(c.parent, e), this.layers[a] = d, this.layers[b] = c, this;
        },
        enforceZoomLimits: function(a) {
            var b = this.coordLimits;
            if (b) {
                var c = b[0].zoom, d = b[1].zoom;
                a.zoom < c ? a = a.zoomTo(c) : a.zoom > d && (a = a.zoomTo(d));
            }
            return a;
        },
        enforcePanLimits: function(b) {
            if (this.coordLimits) {
                b = b.copy();
                var c = this.coordLimits[0].zoomTo(b.zoom), d = this.coordLimits[1].zoomTo(b.zoom), e = this.pointCoordinate(new a.Point(0, 0)).zoomTo(b.zoom), f = this.pointCoordinate(this.dimensions).zoomTo(b.zoom);
                d.row - c.row < f.row - e.row ? b.row = (d.row + c.row) / 2 : e.row < c.row ? b.row += c.row - e.row : f.row > d.row && (b.row -= f.row - d.row), d.column - c.column < f.column - e.column ? b.column = (d.column + c.column) / 2 : e.column < c.column ? b.column += c.column - e.column : f.column > d.column && (b.column -= f.column - d.column);
            }
            return b;
        },
        enforceLimits: function(a) {
            return this.enforcePanLimits(this.enforceZoomLimits(a));
        },
        draw: function() {
            this.coordinate = this.enforceLimits(this.coordinate);
            if (this.dimensions.x <= 0 || this.dimensions.y <= 0) {
                if (!this.autoSize) return;
                var b = this.parent.offsetWidth, c = this.parent.offsetHeight;
                this.dimensions = new a.Point(b, c);
                if (b <= 0 || c <= 0) return;
            }
            for (var d = 0; d < this.layers.length; d++) this.layers[d].draw();
            this.dispatchCallback("drawn");
        },
        _redrawTimer: undefined,
        requestRedraw: function() {
            this._redrawTimer || (this._redrawTimer = setTimeout(this.getRedraw(), 1e3));
        },
        _redraw: null,
        getRedraw: function() {
            if (!this._redraw) {
                var a = this;
                this._redraw = function() {
                    a.draw(), a._redrawTimer = 0;
                };
            }
            return this._redraw;
        },
        destroy: function() {
            for (var b = 0; b < this.layers.length; b++) this.layers[b].destroy();
            this.layers = [], this.projection = null;
            for (var c = 0; c < this.eventHandlers.length; c++) this.eventHandlers[c].remove();
            this.autoSize && a.removeEvent(window, "resize", this.windowResize());
        }
    }, a.mapByCenterZoom = function(b, c, d, e) {
        var f = a.coerceLayer(c), g = new a.Map(b, f, !1);
        return g.setCenterZoom(d, e).draw(), g;
    }, a.mapByExtent = function(b, c, d, e) {
        var f = a.coerceLayer(c), g = new a.Map(b, f, !1);
        return g.setExtent([ d, e ]).draw(), g;
    }, typeof module != "undefined" && module.exports && (module.exports = {
        Point: a.Point,
        Projection: a.Projection,
        MercatorProjection: a.MercatorProjection,
        LinearProjection: a.LinearProjection,
        Transformation: a.Transformation,
        Location: a.Location,
        MapProvider: a.MapProvider,
        TemplatedMapProvider: a.TemplatedMapProvider,
        Coordinate: a.Coordinate,
        deriveTransformation: a.deriveTransformation
    });
})(MM);