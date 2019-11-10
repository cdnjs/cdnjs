/*!
 * Modest Maps JS v3.3.5
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
 */

var previousMM = MM;

// namespacing for backwards-compatibility
if (!com) {
    var com = {};
    if (!com.modestmaps) com.modestmaps = {};
}

var MM = com.modestmaps = {
  noConflict: function() {
    MM = previousMM;
    return this;
  }
};

(function(MM) {
    // Make inheritance bearable: clone one level of properties
    MM.extend = function(child, parent) {
        for (var property in parent.prototype) {
            if (typeof child.prototype[property] == "undefined") {
                child.prototype[property] = parent.prototype[property];
            }
        }
        return child;
    };

    MM.getFrame = function () {
        // native animation frames
        // http://webstuff.nfshost.com/anim-timing/Overview.html
        // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // can't apply these directly to MM because Chrome needs window
        // to own webkitRequestAnimationFrame (for example)
        // perhaps we should namespace an alias onto window instead? 
        // e.g. window.mmRequestAnimationFrame?
        return function(callback) {
            (window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(function () {
                    callback(+new Date());
                }, 10);
            })(callback);
        };
    }();

    // Inspired by LeafletJS
    MM.transformProperty = (function(props) {
        if (!this.document) return; // node.js safety
        var style = document.documentElement.style;
        for (var i = 0; i < props.length; i++) {
            if (props[i] in style) {
                return props[i];
            }
        }
        return false;
    })(['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

    MM.matrixString = function(point) {
        // Make the result of point.scale * point.width a whole number.
        if (point.scale * point.width % 1) {
            point.scale += (1 - point.scale * point.width % 1) / point.width;
        }

        var scale = point.scale || 1;
        if (MM._browser.webkit3d) {
            return  'translate3d(' +
                point.x.toFixed(0) + 'px,' + point.y.toFixed(0) + 'px, 0px)' +
                'scale3d(' + scale + ',' + scale + ', 1)';
        } else {
            return  'translate(' +
                point.x.toFixed(6) + 'px,' + point.y.toFixed(6) + 'px)' +
                'scale(' + scale + ',' + scale + ')';
        }
    };

    MM._browser = (function(window) {
        return {
            webkit: ('WebKitCSSMatrix' in window),
            webkit3d: ('WebKitCSSMatrix' in window) && ('m11' in new WebKitCSSMatrix())
        };
    })(this); // use this for node.js global

    MM.moveElement = function(el, point) {
        if (MM.transformProperty) {
            // Optimize for identity transforms, where you don't actually
            // need to change this element's string. Browsers can optimize for
            // the .style.left case but not for this CSS case.
            if (!point.scale) point.scale = 1;
            if (!point.width) point.width = 0;
            if (!point.height) point.height = 0;
            var ms = MM.matrixString(point);
            if (el[MM.transformProperty] !== ms) {
                el.style[MM.transformProperty] =
                    el[MM.transformProperty] = ms;
            }
        } else {
            el.style.left = point.x + 'px';
            el.style.top = point.y + 'px';
            // Don't set width unless asked to: this is performance-intensive
            // and not always necessary
            if (point.width && point.height && point.scale) {
                el.style.width =  Math.ceil(point.width  * point.scale) + 'px';
                el.style.height = Math.ceil(point.height * point.scale) + 'px';
            }
        }
    };

    // Events
    // Cancel an event: prevent it from bubbling
    MM.cancelEvent = function(e) {
        // there's more than one way to skin this cat
        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        if (e.stopPropagation) { e.stopPropagation(); }
        if (e.preventDefault) { e.preventDefault(); }
        return false;
    };

    MM.coerceLayer = function(layerish) {
        if (typeof layerish == 'string') {
            // Probably a template string
            return new MM.Layer(new MM.TemplatedLayer(layerish));
        } else if ('draw' in layerish && typeof layerish.draw == 'function') {
            // good enough, though we should probably enforce .parent and .destroy() too
            return layerish;
        } else {
            // probably a MapProvider
            return new MM.Layer(layerish);
        }
    };

    // see http://ejohn.org/apps/jselect/event.html for the originals
    MM.addEvent = function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
            if (type == 'mousewheel') {
                obj.addEventListener('DOMMouseScroll', fn, false);
            }
        } else if (obj.attachEvent) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){ obj['e'+type+fn](window.event); };
            obj.attachEvent('on'+type, obj[type+fn]);
        }
    };

    MM.removeEvent = function( obj, type, fn ) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn, false);
            if (type == 'mousewheel') {
                obj.removeEventListener('DOMMouseScroll', fn, false);
            }
        } else if (obj.detachEvent) {
            obj.detachEvent('on'+type, obj[type+fn]);
            obj[type+fn] = null;
        }
    };

    // Cross-browser function to get current element style property
    MM.getStyle = function(el,styleProp) {
        if (el.currentStyle)
            return el.currentStyle[styleProp];
        else if (window.getComputedStyle)
            return document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
    };
    // Point
    MM.Point = function(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    };

    MM.Point.prototype = {
        x: 0,
        y: 0,
        toString: function() {
            return "(" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ")";
        },
        copy: function() {
            return new MM.Point(this.x, this.y);
        }
    };

    // Get the euclidean distance between two points
    MM.Point.distance = function(p1, p2) {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2));
    };

    // Get a point between two other points, biased by `t`.
    MM.Point.interpolate = function(p1, p2, t) {
        return new MM.Point(
            p1.x + (p2.x - p1.x) * t,
            p1.y + (p2.y - p1.y) * t);
    };
    // Coordinate
    // ----------
    // An object representing a tile position, at as specified zoom level.
    // This is not necessarily a precise tile - `row`, `column`, and
    // `zoom` can be floating-point numbers, and the `container()` function
    // can be used to find the actual tile that contains the point.
    MM.Coordinate = function(row, column, zoom) {
        this.row = row;
        this.column = column;
        this.zoom = zoom;
    };

    MM.Coordinate.prototype = {

        row: 0,
        column: 0,
        zoom: 0,

        toString: function() {
            return "("  + this.row.toFixed(3) +
                   ", " + this.column.toFixed(3) +
                   " @" + this.zoom.toFixed(3) + ")";
        },
        // Quickly generate a string representation of this coordinate to
        // index it in hashes. 
        toKey: function() {
            // We've tried to use efficient hash functions here before but we took
            // them out. Contributions welcome but watch out for collisions when the
            // row or column are negative and check thoroughly (exhaustively) before
            // committing.
            return this.zoom + ',' + this.row + ',' + this.column;
        },
        // Clone this object.
        copy: function() {
            return new MM.Coordinate(this.row, this.column, this.zoom);
        },
        // Get the actual, rounded-number tile that contains this point.
        container: function() {
            // using floor here (not parseInt, ~~) because we want -0.56 --> -1
            return new MM.Coordinate(Math.floor(this.row),
                                     Math.floor(this.column),
                                     Math.floor(this.zoom));
        },
        // Recalculate this Coordinate at a different zoom level and return the
        // new object.
        zoomTo: function(destination) {
            var power = Math.pow(2, destination - this.zoom);
            return new MM.Coordinate(this.row * power,
                                     this.column * power,
                                     destination);
        },
        // Recalculate this Coordinate at a different relative zoom level and return the
        // new object.
        zoomBy: function(distance) {
            var power = Math.pow(2, distance);
            return new MM.Coordinate(this.row * power,
                                     this.column * power,
                                     this.zoom + distance);
        },
        // Move this coordinate up by `dist` coordinates
        up: function(dist) {
            if (dist === undefined) dist = 1;
            return new MM.Coordinate(this.row - dist, this.column, this.zoom);
        },
        // Move this coordinate right by `dist` coordinates
        right: function(dist) {
            if (dist === undefined) dist = 1;
            return new MM.Coordinate(this.row, this.column + dist, this.zoom);
        },
        // Move this coordinate down by `dist` coordinates
        down: function(dist) {
            if (dist === undefined) dist = 1;
            return new MM.Coordinate(this.row + dist, this.column, this.zoom);
        },
        // Move this coordinate left by `dist` coordinates
        left: function(dist) {
            if (dist === undefined) dist = 1;
            return new MM.Coordinate(this.row, this.column - dist, this.zoom);
        }
    };
    // Location
    // --------
    MM.Location = function(lat, lon) {
        this.lat = parseFloat(lat);
        this.lon = parseFloat(lon);
    };

    MM.Location.prototype = {
        lat: 0,
        lon: 0,
        toString: function() {
            return "(" + this.lat.toFixed(3) + ", " + this.lon.toFixed(3) + ")";
        },
        copy: function() {
            return new MM.Location(this.lat, this.lon);
        }
    };

    // returns approximate distance between start and end locations
    //
    // default unit is meters
    //
    // you can specify different units by optionally providing the
    // earth's radius in the units you desire
    //
    // Default is 6,378,000 metres, suggested values are:
    //
    // * 3963.1 statute miles
    // * 3443.9 nautical miles
    // * 6378 km
    //
    // see [Formula and code for calculating distance based on two lat/lon locations](http://jan.ucc.nau.edu/~cvm/latlon_formula.html)
    MM.Location.distance = function(l1, l2, r) {
        if (!r) {
            // default to meters
            r = 6378000;
        }
        var deg2rad = Math.PI / 180.0,
            a1 = l1.lat * deg2rad,
            b1 = l1.lon * deg2rad,
            a2 = l2.lat * deg2rad,
            b2 = l2.lon * deg2rad,
            c = Math.cos(a1) * Math.cos(b1) * Math.cos(a2) * Math.cos(b2),
            d = Math.cos(a1) * Math.sin(b1) * Math.cos(a2) * Math.sin(b2),
            e = Math.sin(a1) * Math.sin(a2);
        return Math.acos(c + d + e) * r;
    };

    // Interpolates along a great circle, f between 0 and 1
    //
    // * FIXME: could be heavily optimized (lots of trig calls to cache)
    // * FIXME: could be inmproved for calculating a full path
    MM.Location.interpolate = function(l1, l2, f) {
        if (l1.lat === l2.lat && l1.lon === l2.lon) {
            return new MM.Location(l1.lat, l1.lon);
        }
        var deg2rad = Math.PI / 180.0,
            lat1 = l1.lat * deg2rad,
            lon1 = l1.lon * deg2rad,
            lat2 = l2.lat * deg2rad,
            lon2 = l2.lon * deg2rad;

        var d = 2 * Math.asin(
            Math.sqrt(
              Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.pow(Math.sin((lon1 - lon2) / 2), 2)));

        var A = Math.sin((1-f)*d)/Math.sin(d);
        var B = Math.sin(f*d)/Math.sin(d);
        var x = A * Math.cos(lat1) * Math.cos(lon1) +
          B * Math.cos(lat2) * Math.cos(lon2);
        var y = A * Math.cos(lat1) * Math.sin(lon1) +
          B * Math.cos(lat2) * Math.sin(lon2);
        var z = A * Math.sin(lat1) + B * Math.sin(lat2);

        var latN = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        var lonN = Math.atan2(y,x);

        return new MM.Location(latN / deg2rad, lonN / deg2rad);
    };
    
    // Returns bearing from one point to another
    //
    // * FIXME: bearing is not constant along significant great circle arcs.
    MM.Location.bearing = function(l1, l2) {
        var deg2rad = Math.PI / 180.0,
            lat1 = l1.lat * deg2rad,
            lon1 = l1.lon * deg2rad,
            lat2 = l2.lat * deg2rad,
            lon2 = l2.lon * deg2rad;
        var result = Math.atan2(
            Math.sin(lon1 - lon2) *
            Math.cos(lat2),
            Math.cos(lat1) *
            Math.sin(lat2) -
            Math.sin(lat1) *
            Math.cos(lat2) *
            Math.cos(lon1 - lon2)
        )  / -(Math.PI / 180);

        // map it into 0-360 range
        return (result < 0) ? result + 360 : result;
    };
    // Extent
    // ----------
    // An object representing a map's rectangular extent, defined by its north,
    // south, east and west bounds.

    MM.Extent = function(north, west, south, east) {
        if (north instanceof MM.Location &&
            west instanceof MM.Location) {
            var northwest = north,
                southeast = west;

            north = northwest.lat;
            west = northwest.lon;
            south = southeast.lat;
            east = southeast.lon;
        }
        if (isNaN(south)) south = north;
        if (isNaN(east)) east = west;
        this.north = Math.max(north, south);
        this.south = Math.min(north, south);
        this.east = Math.max(east, west);
        this.west = Math.min(east, west);
    };

    MM.Extent.prototype = {
        // boundary attributes
        north: 0,
        south: 0,
        east: 0,
        west: 0,

        copy: function() {
            return new MM.Extent(this.north, this.west, this.south, this.east);
        },

        toString: function(precision) {
            if (isNaN(precision)) precision = 3;
            return [
                this.north.toFixed(precision),
                this.west.toFixed(precision),
                this.south.toFixed(precision),
                this.east.toFixed(precision)
            ].join(", ");
        },

        // getters for the corner locations
        northWest: function() {
            return new MM.Location(this.north, this.west);
        },
        southEast: function() {
            return new MM.Location(this.south, this.east);
        },
        northEast: function() {
            return new MM.Location(this.north, this.east);
        },
        southWest: function() {
            return new MM.Location(this.south, this.west);
        },
        // getter for the center location
        center: function() {
            return new MM.Location(
                this.south + (this.north - this.south) / 2,
                this.east + (this.west - this.east) / 2
            );
        },

        // extend the bounds to include a location's latitude and longitude
        encloseLocation: function(loc) {
            if (loc.lat > this.north) this.north = loc.lat;
            if (loc.lat < this.south) this.south = loc.lat;
            if (loc.lon > this.east) this.east = loc.lon;
            if (loc.lon < this.west) this.west = loc.lon;
        },

        // extend the bounds to include multiple locations
        encloseLocations: function(locations) {
            var len = locations.length;
            for (var i = 0; i < len; i++) {
                this.encloseLocation(locations[i]);
            }
        },

        // reset bounds from a list of locations
        setFromLocations: function(locations) {
            var len = locations.length,
                first = locations[0];
            this.north = this.south = first.lat;
            this.east = this.west = first.lon;
            for (var i = 1; i < len; i++) {
                this.encloseLocation(locations[i]);
            }
        },

        // extend the bounds to include another extent
        encloseExtent: function(extent) {
            if (extent.north > this.north) this.north = extent.north;
            if (extent.south < this.south) this.south = extent.south;
            if (extent.east > this.east) this.east = extent.east;
            if (extent.west < this.west) this.west = extent.west;
        },

        // determine if a location is within this extent
        containsLocation: function(loc) {
            return loc.lat >= this.south &&
                loc.lat <= this.north &&
                loc.lon >= this.west &&
                loc.lon <= this.east;
        },

        // turn an extent into an array of locations containing its northwest
        // and southeast corners (used in MM.Map.setExtent())
        toArray: function() {
            return [this.northWest(), this.southEast()];
        }
    };

    MM.Extent.fromString = function(str) {
        var parts = str.split(/\s*,\s*/);
        if (parts.length != 4) {
            throw "Invalid extent string (expecting 4 comma-separated numbers)";
        }
        return new MM.Extent(
            parseFloat(parts[0]),
            parseFloat(parts[1]),
            parseFloat(parts[2]),
            parseFloat(parts[3])
        );
    };

    MM.Extent.fromArray = function(locations) {
        var extent = new MM.Extent();
        extent.setFromLocations(locations);
        return extent;
    };

    // Transformation
    // --------------
    MM.Transformation = function(ax, bx, cx, ay, by, cy) {
        this.ax = ax;
        this.bx = bx;
        this.cx = cx;
        this.ay = ay;
        this.by = by;
        this.cy = cy;
    };

    MM.Transformation.prototype = {

        ax: 0,
        bx: 0,
        cx: 0,
        ay: 0,
        by: 0,
        cy: 0,

        transform: function(point) {
            return new MM.Point(this.ax * point.x + this.bx * point.y + this.cx,
                                this.ay * point.x + this.by * point.y + this.cy);
        },

        untransform: function(point) {
            return new MM.Point((point.x * this.by - point.y * this.bx -
                               this.cx * this.by + this.cy * this.bx) /
                              (this.ax * this.by - this.ay * this.bx),
                              (point.x * this.ay - point.y * this.ax -
                               this.cx * this.ay + this.cy * this.ax) /
                              (this.bx * this.ay - this.by * this.ax));
        }

    };


    // Generates a transform based on three pairs of points,
    // a1 -> a2, b1 -> b2, c1 -> c2.
    MM.deriveTransformation = function(a1x, a1y, a2x, a2y,
                                       b1x, b1y, b2x, b2y,
                                       c1x, c1y, c2x, c2y) {
        var x = MM.linearSolution(a1x, a1y, a2x,
                                  b1x, b1y, b2x,
                                  c1x, c1y, c2x);
        var y = MM.linearSolution(a1x, a1y, a2y,
                                  b1x, b1y, b2y,
                                  c1x, c1y, c2y);
        return new MM.Transformation(x[0], x[1], x[2], y[0], y[1], y[2]);
    };

    // Solves a system of linear equations.
    //
    //     t1 = (a * r1) + (b + s1) + c
    //     t2 = (a * r2) + (b + s2) + c
    //     t3 = (a * r3) + (b + s3) + c
    //
    // r1 - t3 are the known values.
    // a, b, c are the unknowns to be solved.
    // returns the a, b, c coefficients.
    MM.linearSolution = function(r1, s1, t1, r2, s2, t2, r3, s3, t3) {
        // make them all floats
        r1 = parseFloat(r1);
        s1 = parseFloat(s1);
        t1 = parseFloat(t1);
        r2 = parseFloat(r2);
        s2 = parseFloat(s2);
        t2 = parseFloat(t2);
        r3 = parseFloat(r3);
        s3 = parseFloat(s3);
        t3 = parseFloat(t3);

        var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3))) /
              (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3)));

        var b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3))) /
              (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));

        var c = t1 - (r1 * a) - (s1 * b);
        return [ a, b, c ];
    };
    // Projection
    // ----------

    // An abstract class / interface for projections
    MM.Projection = function(zoom, transformation) {
        if (!transformation) {
            transformation = new MM.Transformation(1, 0, 0, 0, 1, 0);
        }
        this.zoom = zoom;
        this.transformation = transformation;
    };

    MM.Projection.prototype = {

        zoom: 0,
        transformation: null,

        rawProject: function(point) {
            throw "Abstract method not implemented by subclass.";
        },

        rawUnproject: function(point) {
            throw "Abstract method not implemented by subclass.";
        },

        project: function(point) {
            point = this.rawProject(point);
            if(this.transformation) {
                point = this.transformation.transform(point);
            }
            return point;
        },

        unproject: function(point) {
            if(this.transformation) {
                point = this.transformation.untransform(point);
            }
            point = this.rawUnproject(point);
            return point;
        },

        locationCoordinate: function(location) {
            var point = new MM.Point(Math.PI * location.lon / 180.0,
                                     Math.PI * location.lat / 180.0);
            point = this.project(point);
            return new MM.Coordinate(point.y, point.x, this.zoom);
        },

        coordinateLocation: function(coordinate) {
            coordinate = coordinate.zoomTo(this.zoom);
            var point = new MM.Point(coordinate.column, coordinate.row);
            point = this.unproject(point);
            return new MM.Location(180.0 * point.y / Math.PI,
                                   180.0 * point.x / Math.PI);
        }
    };

    // A projection for equilateral maps, based on longitude and latitude
    MM.LinearProjection = function(zoom, transformation) {
        MM.Projection.call(this, zoom, transformation);
    };

    // The Linear projection doesn't reproject points
    MM.LinearProjection.prototype = {
        rawProject: function(point) {
            return new MM.Point(point.x, point.y);
        },
        rawUnproject: function(point) {
            return new MM.Point(point.x, point.y);
        }
    };

    MM.extend(MM.LinearProjection, MM.Projection);

    MM.MercatorProjection = function(zoom, transformation) {
        // super!
        MM.Projection.call(this, zoom, transformation);
    };

    // Project lon/lat points into meters required for Mercator
    MM.MercatorProjection.prototype = {
        rawProject: function(point) {
            return new MM.Point(point.x,
                         Math.log(Math.tan(0.25 * Math.PI + 0.5 * point.y)));
        },

        rawUnproject: function(point) {
            return new MM.Point(point.x,
                    2 * Math.atan(Math.pow(Math.E, point.y)) - 0.5 * Math.PI);
        }
    };

    MM.extend(MM.MercatorProjection, MM.Projection);
    // Providers
    // ---------
    // Providers provide tile URLs and possibly elements for layers.
    //
    // MapProvider ->
    //   Template
    //
    MM.MapProvider = function(getTile) {
        if (getTile) {
            this.getTile = getTile;
        }
    };

    MM.MapProvider.prototype = {

        // these are limits for available *tiles*
        // panning limits will be different (since you can wrap around columns)
        // but if you put Infinity in here it will screw up sourceCoordinate
        tileLimits: [
            new MM.Coordinate(0,0,0),             // top left outer
            new MM.Coordinate(1,1,0).zoomTo(18)   // bottom right inner
        ],

        getTileUrl: function(coordinate) {
            throw "Abstract method not implemented by subclass.";
        },

        getTile: function(coordinate) {
            throw "Abstract method not implemented by subclass.";
        },

        // releaseTile is not required
        releaseTile: function(element) { },

        // use this to tell MapProvider that tiles only exist between certain zoom levels.
        // should be set separately on Map to restrict interactive zoom/pan ranges
        setZoomRange: function(minZoom, maxZoom) {
            this.tileLimits[0] = this.tileLimits[0].zoomTo(minZoom);
            this.tileLimits[1] = this.tileLimits[1].zoomTo(maxZoom);
        },

        // wrap column around the world if necessary
        // return null if wrapped coordinate is outside of the tile limits
        sourceCoordinate: function(coord) {
            var TL = this.tileLimits[0].zoomTo(coord.zoom).container(),
                BR = this.tileLimits[1].zoomTo(coord.zoom),
                columnSize = Math.pow(2, coord.zoom),
                wrappedColumn;

            BR = new MM.Coordinate(Math.ceil(BR.row), Math.ceil(BR.column), Math.floor(BR.zoom));

            if (coord.column < 0) {
                wrappedColumn = ((coord.column % columnSize) + columnSize) % columnSize;
            } else {
                wrappedColumn = coord.column % columnSize;
            }

            if (coord.row < TL.row || coord.row >= BR.row) {
                return null;
            } else if (wrappedColumn < TL.column || wrappedColumn >= BR.column) {
                return null;
            } else {
                return new MM.Coordinate(coord.row, wrappedColumn, coord.zoom);
            }
        }
    };

    /**
     * FIXME: need a better explanation here! This is a pretty crucial part of
     * understanding how to use ModestMaps.
     *
     * TemplatedMapProvider is a tile provider that generates tile URLs from a
     * template string by replacing the following bits for each tile
     * coordinate:
     *
     * {Z}: the tile's zoom level (from 1 to ~20)
     * {X}: the tile's X, or column (from 0 to a very large number at higher
     * zooms)
     * {Y}: the tile's Y, or row (from 0 to a very large number at higher
     * zooms)
     *
     * E.g.:
     *
     * var osm = new MM.TemplatedMapProvider("http://tile.openstreetmap.org/{Z}/{X}/{Y}.png");
     *
     * Or:
     *
     * var placeholder = new MM.TemplatedMapProvider("http://placehold.it/256/f0f/fff.png&text={Z}/{X}/{Y}");
     *
     */
    MM.Template = function(template, subdomains) {
        var isQuadKey = template.match(/{(Q|quadkey)}/);
        // replace Microsoft style substitution strings
        if (isQuadKey) template = template
            .replace('{subdomains}', '{S}')
            .replace('{zoom}', '{Z}')
            .replace('{quadkey}', '{Q}');

        var hasSubdomains = (subdomains &&
            subdomains.length && template.indexOf("{S}") >= 0);

        function quadKey (row, column, zoom) {
            var key = '';
            for (var i = 1; i <= zoom; i++) {
                key += (((row >> zoom - i) & 1) << 1) | ((column >> zoom - i) & 1);
            }
            return key || '0';
        }

        var getTileUrl = function(coordinate) {
            var coord = this.sourceCoordinate(coordinate);
            if (!coord) {
                return null;
            }
            var base = template;
            if (hasSubdomains) {
                var index = parseInt(coord.zoom + coord.row + coord.column, 10) %
                    subdomains.length;
                base = base.replace('{S}', subdomains[index]);
            }
            if (isQuadKey) {
                return base
                    .replace('{Z}', coord.zoom.toFixed(0))
                    .replace('{Q}', quadKey(coord.row,
                        coord.column,
                        coord.zoom));
            } else {
                return base
                    .replace('{Z}', coord.zoom.toFixed(0))
                    .replace('{X}', coord.column.toFixed(0))
                    .replace('{Y}', coord.row.toFixed(0));
            }
        };

        MM.MapProvider.call(this, getTileUrl);
    };

    MM.Template.prototype = {
        // quadKey generator
        getTile: function(coord) {
          return this.getTileUrl(coord);
        }
    };

    MM.extend(MM.Template, MM.MapProvider);

    MM.TemplatedLayer = function(template, subdomains, name) {
      return new MM.Layer(new MM.Template(template, subdomains), null, name);
    };
    // Event Handlers
    // --------------

    // A utility function for finding the offset of the
    // mouse from the top-left of the page
    MM.getMousePoint = function(e, map) {
        // start with just the mouse (x, y)
        var point = new MM.Point(e.clientX, e.clientY);

        // correct for scrolled document
        point.x += document.body.scrollLeft + document.documentElement.scrollLeft;
        point.y += document.body.scrollTop + document.documentElement.scrollTop;

        // correct for nested offsets in DOM
        for (var node = map.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        return point;
    };

    MM.MouseWheelHandler = function() {
        var handler = {},
            map,
            _zoomDiv,
            prevTime,
            precise = false;

        function mouseWheel(e) {
            var delta = 0;
            prevTime = prevTime || new Date().getTime();

            try {
                _zoomDiv.scrollTop = 1000;
                _zoomDiv.dispatchEvent(e);
                delta = 1000 - _zoomDiv.scrollTop;
            } catch (error) {
                delta = e.wheelDelta || (-e.detail * 5);
            }

            // limit mousewheeling to once every 200ms
            var timeSince = new Date().getTime() - prevTime;
            var point = MM.getMousePoint(e, map);

            if (Math.abs(delta) > 0 && (timeSince > 200) && !precise) {
                map.zoomByAbout(delta > 0 ? 1 : -1, point);
                prevTime = new Date().getTime();
            } else if (precise) {
                map.zoomByAbout(delta * 0.001, point);
            }

            // Cancel the event so that the page doesn't scroll
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            _zoomDiv = document.body.appendChild(document.createElement('div'));
            _zoomDiv.style.cssText = 'visibility:hidden;top:0;height:0;width:0;overflow-y:scroll';
            var innerDiv = _zoomDiv.appendChild(document.createElement('div'));
            innerDiv.style.height = '2000px';
            MM.addEvent(map.parent, 'mousewheel', mouseWheel);
            return handler;
        };

        handler.precise = function(x) {
            if (!arguments.length) return precise;
            precise = x;
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'mousewheel', mouseWheel);
            _zoomDiv.parentNode.removeChild(_zoomDiv);
        };

        return handler;
    };

    MM.DoubleClickHandler = function() {
        var handler = {},
            map;

        function doubleClick(e) {
            // Ensure that this handler is attached once.
            // Get the point on the map that was double-clicked
            var point = MM.getMousePoint(e, map);
            // use shift-double-click to zoom out
            map.zoomByAbout(e.shiftKey ? -1 : 1, point);
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'dblclick', doubleClick);
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'dblclick', doubleClick);
        };

        return handler;
    };

    // Handle the use of mouse dragging to pan the map.
    MM.DragHandler = function() {
        var handler = {},
            prevMouse,
            map;

        function mouseDown(e) {
            if (e.shiftKey || e.button == 2) return;
            MM.addEvent(document, 'mouseup', mouseUp);
            MM.addEvent(document, 'mousemove', mouseMove);

            prevMouse = new MM.Point(e.clientX, e.clientY);
            map.parent.style.cursor = 'move';

            return MM.cancelEvent(e);
        }

        function mouseUp(e) {
            MM.removeEvent(document, 'mouseup', mouseUp);
            MM.removeEvent(document, 'mousemove', mouseMove);

            prevMouse = null;
            map.parent.style.cursor = '';

            return MM.cancelEvent(e);
        }

        function mouseMove(e) {
            if (prevMouse) {
                map.panBy(
                    e.clientX - prevMouse.x,
                    e.clientY - prevMouse.y);
                prevMouse.x = e.clientX;
                prevMouse.y = e.clientY;
                prevMouse.t = +new Date();
            }

            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'mousedown', mouseDown);
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'mousedown', mouseDown);
        };

        return handler;
    };

    MM.MouseHandler = function() {
        var handler = {},
            map,
            handlers;

        handler.init = function(x) {
            map = x;
            handlers = [
                MM.DragHandler().init(map),
                MM.DoubleClickHandler().init(map),
                MM.MouseWheelHandler().init(map)
            ];
            return handler;
        };

        handler.remove = function() {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].remove();
            }
            return handler;
        };

        return handler;
    };
    MM.TouchHandler = function() {
        var handler = {},
            map,
            maxTapTime = 250,
            maxTapDistance = 30,
            maxDoubleTapDelay = 350,
            locations = {},
            taps = [],
            snapToZoom = true,
            wasPinching = false,
            lastPinchCenter = null;

        function isTouchable () {
             var el = document.createElement('div');
             el.setAttribute('ongesturestart', 'return;');
             return (typeof el.ongesturestart === 'function');
        }

        function updateTouches(e) {
            for (var i = 0; i < e.touches.length; i += 1) {
                var t = e.touches[i];
                if (t.identifier in locations) {
                    var l = locations[t.identifier];
                    l.x = t.clientX;
                    l.y = t.clientY;
                    l.scale = e.scale;
                }
                else {
                    locations[t.identifier] = {
                        scale: e.scale,
                        startPos: { x: t.clientX, y: t.clientY },
                        x: t.clientX,
                        y: t.clientY,
                        time: new Date().getTime()
                    };
                }
            }
        }

        // Test whether touches are from the same source -
        // whether this is the same touchmove event.
        function sameTouch (event, touch) {
            return (event && event.touch) &&
                (touch.identifier == event.touch.identifier);
        }

        function touchStart(e) {
            updateTouches(e);
        }

        function touchMove(e) {
            switch (e.touches.length) {
                case 1:
                    onPanning(e.touches[0]);
                    break;
                case 2:
                    onPinching(e);
                    break;
            }
            updateTouches(e);
            return MM.cancelEvent(e);
        }

        function touchEnd(e) {
            var now = new Date().getTime();
            // round zoom if we're done pinching
            if (e.touches.length === 0 && wasPinching) {
                onPinched(lastPinchCenter);
            }

            // Look at each changed touch in turn.
            for (var i = 0; i < e.changedTouches.length; i += 1) {
                var t = e.changedTouches[i],
                    loc = locations[t.identifier];
                // if we didn't see this one (bug?)
                // or if it was consumed by pinching already
                // just skip to the next one
                if (!loc || loc.wasPinch) {
                    continue;
                }

                // we now know we have an event object and a
                // matching touch that's just ended. Let's see
                // what kind of event it is based on how long it
                // lasted and how far it moved.
                var pos = { x: t.clientX, y: t.clientY },
                    time = now - loc.time,
                    travel = MM.Point.distance(pos, loc.startPos);
                if (travel > maxTapDistance) {
                    // we will to assume that the drag has been handled separately
                } else if (time > maxTapTime) {
                    // close in space, but not in time: a hold
                    pos.end = now;
                    pos.duration = time;
                    onHold(pos);
                } else {
                    // close in both time and space: a tap
                    pos.time = now;
                    onTap(pos);
                }
            }

            // Weird, sometimes an end event doesn't get thrown
            // for a touch that nevertheless has disappeared.
            // Still, this will eventually catch those ids:

            var validTouchIds = {};
            for (var j = 0; j < e.touches.length; j++) {
                validTouchIds[e.touches[j].identifier] = true;
            }
            for (var id in locations) {
                if (!(id in validTouchIds)) {
                    delete validTouchIds[id];
                }
            }

            return MM.cancelEvent(e);
        }

        function onHold (hold) {
            // TODO
        }

        // Handle a tap event - mainly watch for a doubleTap
        function onTap(tap) {
            if (taps.length &&
                (tap.time - taps[0].time) < maxDoubleTapDelay) {
                onDoubleTap(tap);
                taps = [];
                return;
            }
            taps = [tap];
        }

        // Handle a double tap by zooming in a single zoom level to a
        // round zoom.
        function onDoubleTap(tap) {
            var z = map.getZoom(), // current zoom
                tz = Math.round(z) + 1, // target zoom
                dz = tz - z;            // desired delate

            // zoom in to a round number
            var p = new MM.Point(tap.x, tap.y);
            map.zoomByAbout(dz, p);
        }

        // Re-transform the actual map parent's CSS transformation
        function onPanning (touch) {
            var pos = { x: touch.clientX, y: touch.clientY },
                prev = locations[touch.identifier];
            map.panBy(pos.x - prev.x, pos.y - prev.y);
        }

        function onPinching(e) {
            // use the first two touches and their previous positions
            var t0 = e.touches[0],
                t1 = e.touches[1],
                p0 = new MM.Point(t0.clientX, t0.clientY),
                p1 = new MM.Point(t1.clientX, t1.clientY),
                l0 = locations[t0.identifier],
                l1 = locations[t1.identifier];

            // mark these touches so they aren't used as taps/holds
            l0.wasPinch = true;
            l1.wasPinch = true;

            // scale about the center of these touches
            var center = MM.Point.interpolate(p0, p1, 0.5);

            map.zoomByAbout(
                Math.log(e.scale) / Math.LN2 -
                Math.log(l0.scale) / Math.LN2,
                center );

            // pan from the previous center of these touches
            var prevCenter = MM.Point.interpolate(l0, l1, 0.5);

            map.panBy(center.x - prevCenter.x,
                           center.y - prevCenter.y);
            wasPinching = true;
            lastPinchCenter = center;
        }

        // When a pinch event ends, round the zoom of the map.
        function onPinched(p) {
            // TODO: easing
            if (snapToZoom) {
                var z = map.getZoom(), // current zoom
                    tz =Math.round(z);     // target zoom
                map.zoomByAbout(tz - z, p);
            }
            wasPinching = false;
        }

        handler.init = function(x) {
            map = x;

            // Fail early if this isn't a touch device.
            if (!isTouchable()) return handler;

            MM.addEvent(map.parent, 'touchstart', touchStart);
            MM.addEvent(map.parent, 'touchmove', touchMove);
            MM.addEvent(map.parent, 'touchend', touchEnd);
            return handler;
        };

        handler.remove = function() {
            // Fail early if this isn't a touch device.
            if (!isTouchable()) return handler;

            MM.removeEvent(map.parent, 'touchstart', touchStart);
            MM.removeEvent(map.parent, 'touchmove', touchMove);
            MM.removeEvent(map.parent, 'touchend', touchEnd);
            return handler;
        };

        return handler;
    };
    // CallbackManager
    // ---------------
    // A general-purpose event binding manager used by `Map`
    // and `RequestManager`

    // Construct a new CallbackManager, with an list of
    // supported events.
    MM.CallbackManager = function(owner, events) {
        this.owner = owner;
        this.callbacks = {};
        for (var i = 0; i < events.length; i++) {
            this.callbacks[events[i]] = [];
        }
    };

    // CallbackManager does simple event management for modestmaps
    MM.CallbackManager.prototype = {
        // The element on which callbacks will be triggered.
        owner: null,

        // An object of callbacks in the form
        //
        //     { event: function }
        callbacks: null,

        // Add a callback to this object - where the `event` is a string of
        // the event name and `callback` is a function.
        addCallback: function(event, callback) {
            if (typeof(callback) == 'function' && this.callbacks[event]) {
                this.callbacks[event].push(callback);
            }
        },

        // Remove a callback. The given function needs to be equal (`===`) to
        // the callback added in `addCallback`, so named functions should be
        // used as callbacks.
        removeCallback: function(event, callback) {
            if (typeof(callback) == 'function' && this.callbacks[event]) {
                var cbs = this.callbacks[event],
                    len = cbs.length;
                for (var i = 0; i < len; i++) {
                  if (cbs[i] === callback) {
                    cbs.splice(i,1);
                    break;
                  }
                }
            }
        },

        // Trigger a callback, passing it an object or string from the second
        // argument.
        dispatchCallback: function(event, message) {
            if(this.callbacks[event]) {
                for (var i = 0; i < this.callbacks[event].length; i += 1) {
                    try {
                        this.callbacks[event][i](this.owner, message);
                    } catch(e) {
                        //console.log(e);
                        // meh
                    }
                }
            }
        }
    };
    // RequestManager
    // --------------
    // an image loading queue
    MM.RequestManager = function() {

        // The loading bay is a document fragment to optimize appending, since
        // the elements within are invisible. See
        //  [this blog post](http://ejohn.org/blog/dom-documentfragments/).
        this.loadingBay = document.createDocumentFragment();

        this.requestsById = {};
        this.openRequestCount = 0;

        this.maxOpenRequests = 4;
        this.requestQueue = [];

        this.callbackManager = new MM.CallbackManager(this, [
            'requestcomplete', 'requesterror']);
    };

    MM.RequestManager.prototype = {

        // DOM element, hidden, for making sure images dispatch complete events
        loadingBay: null,

        // all known requests, by ID
        requestsById: null,

        // current pending requests
        requestQueue: null,

        // current open requests (children of loadingBay)
        openRequestCount: null,

        // the number of open requests permitted at one time, clamped down
        // because of domain-connection limits.
        maxOpenRequests: null,

        // for dispatching 'requestcomplete'
        callbackManager: null,

        addCallback: function(event, callback) {
            this.callbackManager.addCallback(event,callback);
        },

        removeCallback: function(event, callback) {
            this.callbackManager.removeCallback(event,callback);
        },

        dispatchCallback: function(event, message) {
            this.callbackManager.dispatchCallback(event,message);
        },

        // Clear everything in the queue by excluding nothing
        clear: function() {
            this.clearExcept({});
        },

        clearRequest: function(id) {
            if(id in this.requestsById) {
                delete this.requestsById[id];
            }

            for(var i = 0; i < this.requestQueue.length; i++) {
                var request = this.requestQueue[i];
                if(request && request.id == id) {
                    this.requestQueue[i] = null;
                }
            }
        },

        // Clear everything in the queue except for certain keys, specified
        // by an object of the form
        //
        //     { key: throwawayvalue }
        clearExcept: function(validIds) {

            // clear things from the queue first...
            for (var i = 0; i < this.requestQueue.length; i++) {
                var request = this.requestQueue[i];
                if (request && !(request.id in validIds)) {
                    this.requestQueue[i] = null;
                }
            }

            // then check the loadingBay...
            var openRequests = this.loadingBay.childNodes;
            for (var j = openRequests.length-1; j >= 0; j--) {
                var img = openRequests[j];
                if (!(img.id in validIds)) {
                    this.loadingBay.removeChild(img);
                    this.openRequestCount--;
                    /* console.log(this.openRequestCount + " open requests"); */
                    img.src = img.coord = img.onload = img.onerror = null;
                }
            }

            // hasOwnProperty protects against prototype additions
            // > "The standard describes an augmentable Object.prototype.
            //  Ignore standards at your own peril."
            // -- http://www.yuiblog.com/blog/2006/09/26/for-in-intrigue/
            for (var id in this.requestsById) {
                if (!(id in validIds)) {
                    if (this.requestsById.hasOwnProperty(id)) {
                        var requestToRemove = this.requestsById[id];
                        // whether we've done the request or not...
                        delete this.requestsById[id];
                        if (requestToRemove !== null) {
                            requestToRemove =
                                requestToRemove.id =
                                requestToRemove.coord =
                                requestToRemove.url = null;
                        }
                    }
                }
            }
        },

        // Given a tile id, check whether the RequestManager is currently
        // requesting it and waiting for the result.
        hasRequest: function(id) {
            return (id in this.requestsById);
        },

        // * TODO: remove dependency on coord (it's for sorting, maybe call it data?)
        // * TODO: rename to requestImage once it's not tile specific
        requestTile: function(id, coord, url) {
            if (!(id in this.requestsById)) {
                var request = { id: id, coord: coord.copy(), url: url };
                // if there's no url just make sure we don't request this image again
                this.requestsById[id] = request;
                if (url) {
                    this.requestQueue.push(request);
                    /* console.log(this.requestQueue.length + ' pending requests'); */
                }
            }
        },

        getProcessQueue: function() {
            // let's only create this closure once...
            if (!this._processQueue) {
                var theManager = this;
                this._processQueue = function() {
                    theManager.processQueue();
                };
            }
            return this._processQueue;
        },

        // Select images from the `requestQueue` and create image elements for
        // them, attaching their load events to the function returned by
        // `this.getLoadComplete()` so that they can be added to the map.
        processQueue: function(sortFunc) {
            // When the request queue fills up beyond 8, start sorting the
            // requests so that spiral-loading or another pattern can be used.
            if (sortFunc && this.requestQueue.length > 8) {
                this.requestQueue.sort(sortFunc);
            }
            while (this.openRequestCount < this.maxOpenRequests && this.requestQueue.length > 0) {
                var request = this.requestQueue.pop();
                if (request) {
                    this.openRequestCount++;
                    /* console.log(this.openRequestCount + ' open requests'); */

                    // JSLitmus benchmark shows createElement is a little faster than
                    // new Image() in Firefox and roughly the same in Safari:
                    // http://tinyurl.com/y9wz2jj http://tinyurl.com/yes6rrt
                    var img = document.createElement('img');

                    // FIXME: id is technically not unique in document if there
                    // are two Maps but toKey is supposed to be fast so we're trying
                    // to avoid a prefix ... hence we can't use any calls to
                    // `document.getElementById()` to retrieve images
                    img.id = request.id;
                    img.style.position = 'absolute';
                    // * FIXME: store this elsewhere to avoid scary memory leaks?
                    // * FIXME: call this 'data' not 'coord' so that RequestManager is less Tile-centric?
                    img.coord = request.coord;
                    // add it to the DOM in a hidden layer, this is a bit of a hack, but it's
                    // so that the event we get in image.onload has srcElement assigned in IE6
                    this.loadingBay.appendChild(img);
                    // set these before img.src to avoid missing an img that's already cached
                    img.onload = img.onerror = this.getLoadComplete();
                    img.src = request.url;

                    // keep things tidy
                    request = request.id = request.coord = request.url = null;
                }
            }
        },

        _loadComplete: null,

        // Get the singleton `_loadComplete` function that is called on image
        // load events, either removing them from the queue and dispatching an
        // event to add them to the map, or deleting them if the image failed
        // to load.
        getLoadComplete: function() {
            // let's only create this closure once...
            if (!this._loadComplete) {
                var theManager = this;
                this._loadComplete = function(e) {
                    // this is needed because we don't use MM.addEvent for images
                    e = e || window.event;

                    // srcElement for IE, target for FF, Safari etc.
                    var img = e.srcElement || e.target;

                    // unset these straight away so we don't call this twice
                    img.onload = img.onerror = null;

                    // pull it back out of the (hidden) DOM
                    // so that draw will add it correctly later
                    theManager.loadingBay.removeChild(img);
                    theManager.openRequestCount--;
                    delete theManager.requestsById[img.id];

                    /* console.log(theManager.openRequestCount + ' open requests'); */

                    // NB:- complete is also true onerror if we got a 404
                    if (e.type === 'load' && (img.complete ||
                        (img.readyState && img.readyState == 'complete'))) {
                        theManager.dispatchCallback('requestcomplete', img);
                    } else {
                        // if it didn't finish clear its src to make sure it
                        // really stops loading
                        // FIXME: we'll never retry because this id is still
                        // in requestsById - is that right?
                        theManager.dispatchCallback('requesterror', {
                            element: img,
                            url: ('' + img.src)
                        });
                        img.src = null;
                    }

                    // keep going in the same order
                    // use `setTimeout()` to avoid the IE recursion limit, see
                    // http://cappuccino.org/discuss/2010/03/01/internet-explorer-global-variables-and-stack-overflows/
                    // and https://github.com/stamen/modestmaps-js/issues/12
                    setTimeout(theManager.getProcessQueue(), 0);

                };
            }
            return this._loadComplete;
        }

    };

    // Layer
    MM.Layer = function(provider, parent, name) {
        this.parent = parent || document.createElement('div');
        this.parent.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0';
        this.name = name;
        this.levels = {};
        this.requestManager = new MM.RequestManager();
        this.requestManager.addCallback('requestcomplete', this.getTileComplete());
        this.requestManager.addCallback('requesterror', this.getTileError());
        if (provider) this.setProvider(provider);
    };

    MM.Layer.prototype = {

        map: null, // TODO: remove
        parent: null,
        name: null,
        enabled: true,
        tiles: null,
        levels: null,
        requestManager: null,
        provider: null,
        _tileComplete: null,

        getTileComplete: function() {
            if (!this._tileComplete) {
                var theLayer = this;
                this._tileComplete = function(manager, tile) {
                    theLayer.tiles[tile.id] = tile;
                    theLayer.positionTile(tile);
                };
            }
            return this._tileComplete;
        },

        getTileError: function() {
            if (!this._tileError) {
                var theLayer = this;
                this._tileError = function(manager, tile) {
                    tile.element.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                    theLayer.tiles[tile.element.id] = tile.element;
                    theLayer.positionTile(tile.element);
                };
            }
            return this._tileError;
        },

        draw: function() {
            if (!this.enabled || !this.map) return;
            // compares manhattan distance from center of
            // requested tiles to current map center
            // NB:- requested tiles are *popped* from queue, so we do a descending sort
            var theCoord = this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom));

            function centerDistanceCompare(r1, r2) {
                if (r1 && r2) {
                    var c1 = r1.coord;
                    var c2 = r2.coord;
                    if (c1.zoom == c2.zoom) {
                        var ds1 = Math.abs(theCoord.row - c1.row - 0.5) +
                                  Math.abs(theCoord.column - c1.column - 0.5);
                        var ds2 = Math.abs(theCoord.row - c2.row - 0.5) +
                                  Math.abs(theCoord.column - c2.column - 0.5);
                        return ds1 < ds2 ? 1 : ds1 > ds2 ? -1 : 0;
                    } else {
                        return c1.zoom < c2.zoom ? 1 : c1.zoom > c2.zoom ? -1 : 0;
                    }
                }
                return r1 ? 1 : r2 ? -1 : 0;
            }

            // if we're in between zoom levels, we need to choose the nearest:
            var baseZoom = Math.round(this.map.coordinate.zoom);

            // these are the top left and bottom right tile coordinates
            // we'll be loading everything in between:
            var startCoord = this.map.pointCoordinate(new MM.Point(0,0))
                .zoomTo(baseZoom).container();
            var endCoord = this.map.pointCoordinate(this.map.dimensions)
                .zoomTo(baseZoom).container().right().down();

            // tiles with invalid keys will be removed from visible levels
            // requests for tiles with invalid keys will be canceled
            // (this object maps from a tile key to a boolean)
            var validTileKeys = { };

            // make sure we have a container for tiles in the current level
            var levelElement = this.createOrGetLevel(startCoord.zoom);

            // use this coordinate for generating keys, parents and children:
            var tileCoord = startCoord.copy();

            for (tileCoord.column = startCoord.column;
                 tileCoord.column <= endCoord.column; tileCoord.column++) {
                for (tileCoord.row = startCoord.row;
                     tileCoord.row <= endCoord.row; tileCoord.row++) {
                    var validKeys = this.inventoryVisibleTile(levelElement, tileCoord);

                    while (validKeys.length) {
                        validTileKeys[validKeys.pop()] = true;
                    }
                }
            }

            // i from i to zoom-5 are levels that would be scaled too big,
            // i from zoom + 2 to levels. length are levels that would be
            // scaled too small (and tiles would be too numerous)
            for (var name in this.levels) {
                if (this.levels.hasOwnProperty(name)) {
                    var zoom = parseInt(name,10);

                    if (zoom >= startCoord.zoom - 5 && zoom < startCoord.zoom + 2) {
                        continue;
                    }

                    var level = this.levels[name];
                    level.style.display = 'none';
                    var visibleTiles = this.tileElementsInLevel(level);

                    while (visibleTiles.length) {
                        this.provider.releaseTile(visibleTiles[0].coord);
                        this.requestManager.clearRequest(visibleTiles[0].coord.toKey());
                        level.removeChild(visibleTiles[0]);
                        visibleTiles.shift();
                    }
                }
            }

            // levels we want to see, if they have tiles in validTileKeys
            var minLevel = startCoord.zoom - 5;
            var maxLevel = startCoord.zoom + 2;

            for (var z = minLevel; z < maxLevel; z++) {
                this.adjustVisibleLevel(this.levels[z], z, validTileKeys);
            }

            // cancel requests that aren't visible:
            this.requestManager.clearExcept(validTileKeys);

            // get newly requested tiles, sort according to current view:
            this.requestManager.processQueue(centerDistanceCompare);
        },

        // For a given tile coordinate in a given level element, ensure that it's
        // correctly represented in the DOM including potentially-overlapping
        // parent and child tiles for pyramid loading.
        //
        // Return a list of valid (i.e. loadable?) tile keys.
        inventoryVisibleTile: function(layer_element, tile_coord) {
            var tile_key = tile_coord.toKey(),
                valid_tile_keys = [tile_key];

            // Check that the needed tile already exists someplace - add it to the DOM if it does.
            if (tile_key in this.tiles) {
                var tile = this.tiles[tile_key];

                // ensure it's in the DOM:
                if (tile.parentNode != layer_element) {
                    layer_element.appendChild(tile);
                    // if the provider implements reAddTile(), call it
                    if ("reAddTile" in this.provider) {
                        this.provider.reAddTile(tile_key, tile_coord, tile);
                    }
                }

                return valid_tile_keys;
            }

            // Check that the needed tile has even been requested at all.
            if (!this.requestManager.hasRequest(tile_key)) {
                var tileToRequest = this.provider.getTile(tile_coord);
                if (typeof tileToRequest == 'string') {
                    this.addTileImage(tile_key, tile_coord, tileToRequest);
                // tile must be truish
                } else if (tileToRequest) {
                    this.addTileElement(tile_key, tile_coord, tileToRequest);
                }
            }

            // look for a parent tile in our image cache
            var tileCovered = false;
            var maxStepsOut = tile_coord.zoom;

            for (var pz = 1; pz <= maxStepsOut; pz++) {
                var parent_coord = tile_coord.zoomBy(-pz).container();
                var parent_key = parent_coord.toKey();

                // only mark it valid if we have it already
                if (parent_key in this.tiles) {
                    valid_tile_keys.push(parent_key);
                    tileCovered = true;
                    break;
                }
            }

            // if we didn't find a parent, look at the children:
            if (!tileCovered) {
                var child_coord = tile_coord.zoomBy(1);

                // mark everything valid whether or not we have it:
                valid_tile_keys.push(child_coord.toKey());
                child_coord.column += 1;
                valid_tile_keys.push(child_coord.toKey());
                child_coord.row += 1;
                valid_tile_keys.push(child_coord.toKey());
                child_coord.column -= 1;
                valid_tile_keys.push(child_coord.toKey());
            }

            return valid_tile_keys;
        },

        tileElementsInLevel: function(level) {
            // this is somewhat future proof, we're looking for DOM elements
            // not necessarily <img> elements
            var tiles = [];
            for (var tile = level.firstChild; tile; tile = tile.nextSibling) {
                if (tile.nodeType == 1) {
                    tiles.push(tile);
                }
            }
            return tiles;
        },

        /**
         * For a given level, adjust visibility as a whole and discard individual
         * tiles based on values in valid_tile_keys from inventoryVisibleTile().
         */
        adjustVisibleLevel: function(level, zoom, valid_tile_keys) {
            // no tiles for this level yet
            if (!level) return;

            var scale = 1;
            var theCoord = this.map.coordinate.copy();

            if (level.childNodes.length > 0) {
                level.style.display = 'block';
                scale = Math.pow(2, this.map.coordinate.zoom - zoom);
                theCoord = theCoord.zoomTo(zoom);
            } else {
                level.style.display = 'none';
                return false;
            }

            var tileWidth = this.map.tileSize.x * scale;
            var tileHeight = this.map.tileSize.y * scale;
            var center = new MM.Point(this.map.dimensions.x/2, this.map.dimensions.y/2);
            var tiles = this.tileElementsInLevel(level);

            while (tiles.length) {
                var tile = tiles.pop();

                if (!valid_tile_keys[tile.id]) {
                    this.provider.releaseTile(tile.coord);
                    this.requestManager.clearRequest(tile.coord.toKey());
                    level.removeChild(tile);
                } else {
                    // position tiles
                    MM.moveElement(tile, {
                        x: Math.round(center.x +
                            (tile.coord.column - theCoord.column) * tileWidth),
                        y: Math.round(center.y +
                            (tile.coord.row - theCoord.row) * tileHeight),
                        scale: scale,
                        // TODO: pass only scale or only w/h
                        width: this.map.tileSize.x,
                        height: this.map.tileSize.y
                    });
                }
            }
        },

        createOrGetLevel: function(zoom) {
            if (zoom in this.levels) {
                return this.levels[zoom];
            }

            var level = document.createElement('div');
            level.id = this.parent.id + '-zoom-' + zoom;
            level.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0;';
            level.style.zIndex = zoom;

            this.parent.appendChild(level);
            this.levels[zoom] = level;

            return level;
        },

        addTileImage: function(key, coord, url) {
            this.requestManager.requestTile(key, coord, url);
        },

        addTileElement: function(key, coordinate, element) {
            // Expected in draw()
            element.id = key;
            element.coord = coordinate.copy();
            this.positionTile(element);
        },

        positionTile: function(tile) {
            // position this tile (avoids a full draw() call):
            var theCoord = this.map.coordinate.zoomTo(tile.coord.zoom);

            // Start tile positioning and prevent drag for modern browsers
            tile.style.cssText = 'position:absolute;-webkit-user-select:none;' +
                '-webkit-user-drag:none;-moz-user-drag:none;-webkit-transform-origin:0 0;' +
                '-moz-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;' +
                'width:' + this.map.tileSize.x + 'px; height: ' + this.map.tileSize.y + 'px;';

            // Prevent drag for IE
            tile.ondragstart = function() { return false; };

            var scale = Math.pow(2, this.map.coordinate.zoom - tile.coord.zoom);

            MM.moveElement(tile, {
                x: Math.round((this.map.dimensions.x/2) +
                    (tile.coord.column - theCoord.column) * this.map.tileSize.x),
                y: Math.round((this.map.dimensions.y/2) +
                    (tile.coord.row - theCoord.row) * this.map.tileSize.y),
                scale: scale,
                // TODO: pass only scale or only w/h
                width: this.map.tileSize.x,
                height: this.map.tileSize.y
            });

            // add tile to its level
            var theLevel = this.levels[tile.coord.zoom];
            theLevel.appendChild(tile);

            // Support style transition if available.
            tile.className = 'map-tile-loaded';

            // ensure the level is visible if it's still the current level
            if (Math.round(this.map.coordinate.zoom) == tile.coord.zoom) {
                theLevel.style.display = 'block';
            }

            // request a lazy redraw of all levels
            // this will remove tiles that were only visible
            // to cover this tile while it loaded:
            this.requestRedraw();
        },

        _redrawTimer: undefined,

        requestRedraw: function() {
            // we'll always draw within 1 second of this request,
            // sometimes faster if there's already a pending redraw
            // this is used when a new tile arrives so that we clear
            // any parent/child tiles that were only being displayed
            // until the tile loads at the right zoom level
            if (!this._redrawTimer) {
                this._redrawTimer = setTimeout(this.getRedraw(), 1000);
            }
        },

        _redraw: null,

        getRedraw: function() {
            // let's only create this closure once...
            if (!this._redraw) {
                var theLayer = this;
                this._redraw = function() {
                    theLayer.draw();
                    theLayer._redrawTimer = 0;
                };
            }
            return this._redraw;
        },

        setProvider: function(newProvider) {
            var firstProvider = (this.provider === null);

            // if we already have a provider the we'll need to
            // clear the DOM, cancel requests and redraw
            if (!firstProvider) {
                this.requestManager.clear();

                for (var name in this.levels) {
                    if (this.levels.hasOwnProperty(name)) {
                        var level = this.levels[name];

                        while (level.firstChild) {
                            this.provider.releaseTile(level.firstChild.coord);
                            level.removeChild(level.firstChild);
                        }
                    }
                }
            }

            // first provider or not we'll init/reset some values...
            this.tiles = {};

            // for later: check geometry of old provider and set a new coordinate center
            // if needed (now? or when?)
            this.provider = newProvider;

            if (!firstProvider) {
                this.draw();
            }
        },

        // Enable a layer and show its dom element
        enable: function() {
            this.enabled = true;
            this.parent.style.display = '';
            this.draw();
        },

        // Disable a layer, don't display in DOM, clear all requests
        disable: function() {
            this.enabled = false;
            this.requestManager.clear();
            this.parent.style.display = 'none';
        },

        // Remove this layer from the DOM, cancel all of its requests
        // and unbind any callbacks that are bound to it.
        destroy: function() {
            this.requestManager.clear();
            this.requestManager.removeCallback('requestcomplete', this.getTileComplete());
            this.requestManager.removeCallback('requesterror', this.getTileError());
            // TODO: does requestManager need a destroy function too?
            this.provider = null;
            // If this layer was ever attached to the DOM, detach it.
            if (this.parent.parentNode) {
              this.parent.parentNode.removeChild(this.parent);
            }
            this.map = null;
        }
    };

    // Map

    // Instance of a map intended for drawing to a div.
    //
    //  * `parent` (required DOM element)
    //      Can also be an ID of a DOM element
    //  * `layerOrLayers` (required MM.Layer or Array of MM.Layers)
    //      each one must implement draw(), destroy(), have a .parent DOM element and a .map property
    //      (an array of URL templates or MM.MapProviders is also acceptable)
    //  * `dimensions` (optional Point)
    //      Size of map to create
    //  * `eventHandlers` (optional Array)
    //      If empty or null MouseHandler will be used
    //      Otherwise, each handler will be called with init(map)
    MM.Map = function(parent, layerOrLayers, dimensions, eventHandlers) {

        if (typeof parent == 'string') {
            parent = document.getElementById(parent);
            if (!parent) {
                throw 'The ID provided to modest maps could not be found.';
            }
        }
        this.parent = parent;

        // we're no longer adding width and height to parent.style but we still
        // need to enforce padding, overflow and position otherwise everything screws up
        // TODO: maybe console.warn if the current values are bad?
        this.parent.style.padding = '0';
        this.parent.style.overflow = 'hidden';

        var position = MM.getStyle(this.parent, 'position');
        if (position != 'relative' && position != 'absolute') {
            this.parent.style.position = 'relative';
        }

        this.layers = [];

        if (!layerOrLayers) {
            layerOrLayers = [];
        }

        if (!(layerOrLayers instanceof Array)) {
            layerOrLayers = [ layerOrLayers ];
        }

        for (var i = 0; i < layerOrLayers.length; i++) {
            this.addLayer(layerOrLayers[i]);
        }

        // default to Google-y Mercator style maps
        this.projection = new MM.MercatorProjection(0,
            MM.deriveTransformation(-Math.PI,  Math.PI, 0, 0,
                                     Math.PI,  Math.PI, 1, 0,
                                    -Math.PI, -Math.PI, 0, 1));
        this.tileSize = new MM.Point(256, 256);

        // default 0-18 zoom level
        // with infinite horizontal pan and clamped vertical pan
        this.coordLimits = [
            new MM.Coordinate(0,-Infinity,0),           // top left outer
            new MM.Coordinate(1,Infinity,0).zoomTo(18) // bottom right inner
        ];

        // eyes towards null island
        this.coordinate = new MM.Coordinate(0.5, 0.5, 0);

        // if you don't specify dimensions we assume you want to fill the parent
        // unless the parent has no w/h, in which case we'll still use a default
        if (!dimensions) {
            dimensions = new MM.Point(this.parent.offsetWidth,
                                      this.parent.offsetHeight);
            this.autoSize = true;
            // use destroy to get rid of this handler from the DOM
            MM.addEvent(window, 'resize', this.windowResize());
        } else {
            this.autoSize = false;
            // don't call setSize here because it calls draw()
            this.parent.style.width = Math.round(dimensions.x) + 'px';
            this.parent.style.height = Math.round(dimensions.y) + 'px';
        }
        this.dimensions = dimensions;

        this.callbackManager = new MM.CallbackManager(this, [
            'zoomed',
            'panned',
            'centered',
            'extentset',
            'resized',
            'drawn'
        ]);

        // set up handlers last so that all required attributes/functions are in place if needed
        if (eventHandlers === undefined) {
            this.eventHandlers = [
                MM.MouseHandler().init(this),
                MM.TouchHandler().init(this)
            ];
        } else {
            this.eventHandlers = eventHandlers;
            if (eventHandlers instanceof Array) {
                for (var j = 0; j < eventHandlers.length; j++) {
                    eventHandlers[j].init(this);
                }
            }
        }

    };

    MM.Map.prototype = {

        parent: null,          // DOM Element
        dimensions: null,      // MM.Point with x/y size of parent element

        projection: null,      // MM.Projection of first known layer
        coordinate: null,      // Center of map MM.Coordinate with row/column/zoom
        tileSize: null,        // MM.Point with x/y size of tiles

        coordLimits: null,     // Array of [ topLeftOuter, bottomLeftInner ] MM.Coordinates

        layers: null,          // Array of MM.Layer (interface = .draw(), .destroy(), .parent and .map)

        callbackManager: null, // MM.CallbackManager, handles map events

        eventHandlers: null,   // Array of interaction handlers, just a MM.MouseHandler by default

        autoSize: null,        // Boolean, true if we have a window resize listener

        toString: function() {
            return 'Map(#' + this.parent.id + ')';
        },

        // callbacks...

        addCallback: function(event, callback) {
            this.callbackManager.addCallback(event, callback);
            return this;
        },

        removeCallback: function(event, callback) {
            this.callbackManager.removeCallback(event, callback);
            return this;
        },

        dispatchCallback: function(event, message) {
            this.callbackManager.dispatchCallback(event, message);
            return this;
        },

        windowResize: function() {
            if (!this._windowResize) {
                var theMap = this;
                this._windowResize = function(event) {
                    // don't call setSize here because it sets parent.style.width/height
                    // and setting the height breaks percentages and default styles
                    theMap.dimensions = new MM.Point(theMap.parent.offsetWidth, theMap.parent.offsetHeight);
                    theMap.draw();
                    theMap.dispatchCallback('resized', [theMap.dimensions]);
                };
            }
            return this._windowResize;
        },

        // A convenience function to restrict interactive zoom ranges.
        // (you should also adjust map provider to restrict which tiles get loaded,
        // or modify map.coordLimits and provider.tileLimits for finer control)
        setZoomRange: function(minZoom, maxZoom) {
            this.coordLimits[0] = this.coordLimits[0].zoomTo(minZoom);
            this.coordLimits[1] = this.coordLimits[1].zoomTo(maxZoom);
            return this;
        },

        // zooming
        zoomBy: function(zoomOffset) {
            this.coordinate = this.enforceLimits(this.coordinate.zoomBy(zoomOffset));
            MM.getFrame(this.getRedraw());
            this.dispatchCallback('zoomed', zoomOffset);
            return this;
        },

        zoomIn: function()  { return this.zoomBy(1); },
        zoomOut: function()  { return this.zoomBy(-1); },
        setZoom: function(z) { return this.zoomBy(z - this.coordinate.zoom); },

        zoomByAbout: function(zoomOffset, point) {
            var location = this.pointLocation(point);

            this.coordinate = this.enforceLimits(this.coordinate.zoomBy(zoomOffset));
            var newPoint = this.locationPoint(location);

            this.dispatchCallback('zoomed', zoomOffset);
            return this.panBy(point.x - newPoint.x, point.y - newPoint.y);
        },

        // panning
        panBy: function(dx, dy) {
            this.coordinate.column -= dx / this.tileSize.x;
            this.coordinate.row -= dy / this.tileSize.y;

            this.coordinate = this.enforceLimits(this.coordinate);

            // Defer until the browser is ready to draw.
            MM.getFrame(this.getRedraw());
            this.dispatchCallback('panned', [dx, dy]);
            return this;
        },

        panLeft: function() { return this.panBy(100, 0); },
        panRight: function() { return this.panBy(-100, 0); },
        panDown: function() { return this.panBy(0, -100); },
        panUp: function() { return this.panBy(0, 100); },

        // positioning
        setCenter: function(location) {
            return this.setCenterZoom(location, this.coordinate.zoom);
        },

        setCenterZoom: function(location, zoom) {
            this.coordinate = this.projection.locationCoordinate(location).zoomTo(parseFloat(zoom) || 0);
            MM.getFrame(this.getRedraw());
            this.dispatchCallback('centered', [location, zoom]);
            return this;
        },

        extentCoordinate: function(locations, precise) {
            // coerce locations to an array if it's a Extent instance
            if (locations instanceof MM.Extent) {
                locations = locations.toArray();
            }

            var TL, BR;
            for (var i = 0; i < locations.length; i++) {
                var coordinate = this.projection.locationCoordinate(locations[i]);
                if (TL) {
                    TL.row = Math.min(TL.row, coordinate.row);
                    TL.column = Math.min(TL.column, coordinate.column);
                    TL.zoom = Math.min(TL.zoom, coordinate.zoom);
                    BR.row = Math.max(BR.row, coordinate.row);
                    BR.column = Math.max(BR.column, coordinate.column);
                    BR.zoom = Math.max(BR.zoom, coordinate.zoom);
                }
                else {
                    TL = coordinate.copy();
                    BR = coordinate.copy();
                }
            }

            var width = this.dimensions.x + 1;
            var height = this.dimensions.y + 1;

            // multiplication factor between horizontal span and map width
            var hFactor = (BR.column - TL.column) / (width / this.tileSize.x);

            // multiplication factor expressed as base-2 logarithm, for zoom difference
            var hZoomDiff = Math.log(hFactor) / Math.log(2);

            // possible horizontal zoom to fit geographical extent in map width
            var hPossibleZoom = TL.zoom - (precise ? hZoomDiff : Math.ceil(hZoomDiff));

            // multiplication factor between vertical span and map height
            var vFactor = (BR.row - TL.row) / (height / this.tileSize.y);

            // multiplication factor expressed as base-2 logarithm, for zoom difference
            var vZoomDiff = Math.log(vFactor) / Math.log(2);

            // possible vertical zoom to fit geographical extent in map height
            var vPossibleZoom = TL.zoom - (precise ? vZoomDiff : Math.ceil(vZoomDiff));

            // initial zoom to fit extent vertically and horizontally
            var initZoom = Math.min(hPossibleZoom, vPossibleZoom);

            // additionally, make sure it's not outside the boundaries set by map limits
            initZoom = Math.min(initZoom, this.coordLimits[1].zoom);
            initZoom = Math.max(initZoom, this.coordLimits[0].zoom);

            // coordinate of extent center
            var centerRow = (TL.row + BR.row) / 2;
            var centerColumn = (TL.column + BR.column) / 2;
            var centerZoom = TL.zoom;
            return new MM.Coordinate(centerRow, centerColumn, centerZoom).zoomTo(initZoom);
        },

        setExtent: function(locations, precise) {
            this.coordinate = this.extentCoordinate(locations, precise);
            this.draw(); // draw calls enforceLimits
            // (if you switch to getFrame, call enforceLimits first)

            this.dispatchCallback('extentset', locations);
            return this;
        },

        // Resize the map's container `<div>`, redrawing the map and triggering
        // `resized` to make sure that the map's presentation is still correct.
        setSize: function(dimensions) {
            // Ensure that, whether a raw object or a Point object is passed,
            // this.dimensions will be a Point.
            this.dimensions = new MM.Point(dimensions.x, dimensions.y);
            this.parent.style.width = Math.round(this.dimensions.x) + 'px';
            this.parent.style.height = Math.round(this.dimensions.y) + 'px';
            if (this.autoSize) {
                MM.removeEvent(window, 'resize', this.windowResize());
                this.autoSize = false;
            }
            this.draw(); // draw calls enforceLimits
            // (if you switch to getFrame, call enforceLimits first)
            this.dispatchCallback('resized', this.dimensions);
            return this;
        },

        // projecting points on and off screen
        coordinatePoint: function(coord) {
            // Return an x, y point on the map image for a given coordinate.
            if (coord.zoom != this.coordinate.zoom) {
                coord = coord.zoomTo(this.coordinate.zoom);
            }

            // distance from the center of the map
            var point = new MM.Point(this.dimensions.x / 2, this.dimensions.y / 2);
            point.x += this.tileSize.x * (coord.column - this.coordinate.column);
            point.y += this.tileSize.y * (coord.row - this.coordinate.row);

            return point;
        },

        // Get a `MM.Coordinate` from an `MM.Point` - returns a new tile-like object
        // from a screen point.
        pointCoordinate: function(point) {
            // new point coordinate reflecting distance from map center, in tile widths
            var coord = this.coordinate.copy();
            coord.column += (point.x - this.dimensions.x / 2) / this.tileSize.x;
            coord.row += (point.y - this.dimensions.y / 2) / this.tileSize.y;

            return coord;
        },

        // Return an MM.Coordinate (row,col,zoom) for an MM.Location (lat,lon).
        locationCoordinate: function(location) {
            return this.projection.locationCoordinate(location);
        },

        // Return an MM.Location (lat,lon) for an MM.Coordinate (row,col,zoom).
        coordinateLocation: function(coordinate) {
            return this.projection.coordinateLocation(coordinate);
        },

        // Return an x, y point on the map image for a given geographical location.
        locationPoint: function(location) {
            return this.coordinatePoint(this.locationCoordinate(location));
        },

        // Return a geographical location on the map image for a given x, y point.
        pointLocation: function(point) {
            return this.coordinateLocation(this.pointCoordinate(point));
        },

        // inspecting
        getExtent: function() {
            return new MM.Extent(
                this.pointLocation(new MM.Point(0, 0)),
                this.pointLocation(this.dimensions)
            );
        },

        extent: function(locations, precise) {
            if (locations) {
                return this.setExtent(locations, precise);
            } else {
                return this.getExtent();
            }
        },

        // Get the current centerpoint of the map, returning a `Location`
        getCenter: function() {
            return this.projection.coordinateLocation(this.coordinate);
        },

        center: function(location) {
            if (location) {
                return this.setCenter(location);
            } else {
                return this.getCenter();
            }
        },

        // Get the current zoom level of the map, returning a number
        getZoom: function() {
            return this.coordinate.zoom;
        },

        zoom: function(zoom) {
            if (zoom !== undefined) {
                return this.setZoom(zoom);
            } else {
                return this.getZoom();
            }
        },

        // return a copy of the layers array
        getLayers: function() {
            return this.layers.slice();
        },

        // return the first layer with given name
        getLayer: function(name) {
            for (var i = 0; i < this.layers.length; i++) {
                if (name == this.layers[i].name)
                    return this.layers[i];
            }
        },

        // return the layer at the given index
        getLayerAt: function(index) {
            return this.layers[index];
        },

        // put the given layer on top of all the others
        // Since this is called for the first layer, which is by definition
        // added before the map has a valid `coordinate`, we request
        // a redraw only if the map has a center coordinate.
        addLayer: function(layer) {
            this.layers.push(layer);
            this.parent.appendChild(layer.parent);
            layer.map = this; // TODO: remove map property from MM.Layer?
            if (this.coordinate) {
              MM.getFrame(this.getRedraw());
            }
            return this;
        },

        // find the given layer and remove it
        removeLayer: function(layer) {
            for (var i = 0; i < this.layers.length; i++) {
                if (layer == this.layers[i] || layer == this.layers[i].name) {
                    this.removeLayerAt(i);
                    break;
                }
            }
            return this;
        },

        // replace the current layer at the given index with the given layer
        setLayerAt: function(index, layer) {

            if (index < 0 || index >= this.layers.length) {
                throw new Error('invalid index in setLayerAt(): ' + index);
            }

            if (this.layers[index] != layer) {

                // clear existing layer at this index
                if (index < this.layers.length) {
                    var other = this.layers[index];
                    this.parent.insertBefore(layer.parent, other.parent);
                    other.destroy();
                } else {
                // Or if this will be the last layer, it can be simply appended
                    this.parent.appendChild(layer.parent);
                }

                this.layers[index] = layer;
                layer.map = this; // TODO: remove map property from MM.Layer

                MM.getFrame(this.getRedraw());
            }

            return this;
        },

        // put the given layer at the given index, moving others if necessary
        insertLayerAt: function(index, layer) {

            if (index < 0 || index > this.layers.length) {
                throw new Error('invalid index in insertLayerAt(): ' + index);
            }

            if (index == this.layers.length) {
                // it just gets tacked on to the end
                this.layers.push(layer);
                this.parent.appendChild(layer.parent);
            } else {
                // it needs to get slipped in amongst the others
                var other = this.layers[index];
                this.parent.insertBefore(layer.parent, other.parent);
                this.layers.splice(index, 0, layer);
            }

            layer.map = this; // TODO: remove map property from MM.Layer

            MM.getFrame(this.getRedraw());

            return this;
        },

        // remove the layer at the given index, call .destroy() on the layer
        removeLayerAt: function(index) {
            if (index < 0 || index >= this.layers.length) {
                throw new Error('invalid index in removeLayer(): ' + index);
            }

            // gone baby gone.
            var old = this.layers[index];
            this.layers.splice(index, 1);
            old.destroy();

            return this;
        },

        // switch the stacking order of two layers, by index
        swapLayersAt: function(i, j) {

            if (i < 0 || i >= this.layers.length || j < 0 || j >= this.layers.length) {
                throw new Error('invalid index in swapLayersAt(): ' + index);
            }

            var layer1 = this.layers[i],
                layer2 = this.layers[j],
                dummy = document.createElement('div');

            // kick layer2 out, replace it with the dummy.
            this.parent.replaceChild(dummy, layer2.parent);

            // put layer2 back in and kick layer1 out
            this.parent.replaceChild(layer2.parent, layer1.parent);

            // put layer1 back in and ditch the dummy
            this.parent.replaceChild(layer1.parent, dummy);

            // now do it to the layers array
            this.layers[i] = layer2;
            this.layers[j] = layer1;

            return this;
        },

        // Enable and disable layers.
        // Disabled layers are not displayed, are not drawn, and do not request
        // tiles. They do maintain their layer index on the map.
        enableLayer: function(name) {
            var l = this.getLayer(name);
            if (l) l.enable();
            return this;
        },

        enableLayerAt: function(index) {
            var l = this.getLayerAt(index);
            if (l) l.enable();
            return this;
        },

        disableLayer: function(name) {
            var l = this.getLayer(name);
            if (l) l.disable();
            return this;
        },

        disableLayerAt: function(index) {
            var l = this.getLayerAt(index);
            if (l) l.disable();
            return this;
        },


        // limits

        enforceZoomLimits: function(coord) {
            var limits = this.coordLimits;
            if (limits) {
                // clamp zoom level:
                var minZoom = limits[0].zoom;
                var maxZoom = limits[1].zoom;
                if (coord.zoom < minZoom) {
                    coord = coord.zoomTo(minZoom);
                }
                else if (coord.zoom > maxZoom) {
                    coord = coord.zoomTo(maxZoom);
                }
            }
            return coord;
        },

        enforcePanLimits: function(coord) {

            if (this.coordLimits) {

                coord = coord.copy();

                // clamp pan:
                var topLeftLimit = this.coordLimits[0].zoomTo(coord.zoom);
                var bottomRightLimit = this.coordLimits[1].zoomTo(coord.zoom);
                var currentTopLeft = this.pointCoordinate(new MM.Point(0, 0))
                    .zoomTo(coord.zoom);
                var currentBottomRight = this.pointCoordinate(this.dimensions)
                    .zoomTo(coord.zoom);

                // this handles infinite limits:
                // (Infinity - Infinity) is Nan
                // NaN is never less than anything
                if (bottomRightLimit.row - topLeftLimit.row <
                    currentBottomRight.row - currentTopLeft.row) {
                    // if the limit is smaller than the current view center it
                    coord.row = (bottomRightLimit.row + topLeftLimit.row) / 2;
                } else {
                    if (currentTopLeft.row < topLeftLimit.row) {
                        coord.row += topLeftLimit.row - currentTopLeft.row;
                    } else if (currentBottomRight.row > bottomRightLimit.row) {
                        coord.row -= currentBottomRight.row - bottomRightLimit.row;
                    }
                }
                if (bottomRightLimit.column - topLeftLimit.column <
                    currentBottomRight.column - currentTopLeft.column) {
                    // if the limit is smaller than the current view, center it
                    coord.column = (bottomRightLimit.column + topLeftLimit.column) / 2;
                } else {
                    if (currentTopLeft.column < topLeftLimit.column) {
                        coord.column += topLeftLimit.column - currentTopLeft.column;
                    } else if (currentBottomRight.column > bottomRightLimit.column) {
                        coord.column -= currentBottomRight.column - bottomRightLimit.column;
                    }
                }
            }

            return coord;
        },

        // Prevent accidentally navigating outside the `coordLimits` of the map.
        enforceLimits: function(coord) {
            return this.enforcePanLimits(this.enforceZoomLimits(coord));
        },

        // rendering

        // Redraw the tiles on the map, reusing existing tiles.
        draw: function() {
            // make sure we're not too far in or out:
            this.coordinate = this.enforceLimits(this.coordinate);

            // if we don't have dimensions, check the parent size
            if (this.dimensions.x <= 0 || this.dimensions.y <= 0) {
                if (this.autoSize) {
                    // maybe the parent size has changed?
                    var w = this.parent.offsetWidth,
                        h = this.parent.offsetHeight;
                    this.dimensions = new MM.Point(w,h);
                    if (w <= 0 || h <= 0) {
                        return;
                    }
                } else {
                    // the issue can only be corrected with setSize
                    return;
                }
            }

            // draw layers one by one
            for(var i = 0; i < this.layers.length; i++) {
                this.layers[i].draw();
            }

            this.dispatchCallback('drawn');
        },

        _redrawTimer: undefined,

        requestRedraw: function() {
            // we'll always draw within 1 second of this request,
            // sometimes faster if there's already a pending redraw
            // this is used when a new tile arrives so that we clear
            // any parent/child tiles that were only being displayed
            // until the tile loads at the right zoom level
            if (!this._redrawTimer) {
                this._redrawTimer = setTimeout(this.getRedraw(), 1000);
            }
        },

        _redraw: null,

        getRedraw: function() {
            // let's only create this closure once...
            if (!this._redraw) {
                var theMap = this;
                this._redraw = function() {
                    theMap.draw();
                    theMap._redrawTimer = 0;
                };
            }
            return this._redraw;
        },

        // Attempts to destroy all attachment a map has to a page
        // and clear its memory usage.
        destroy: function() {
            for (var j = 0; j < this.layers.length; j++) {
                this.layers[j].destroy();
            }
            this.layers = [];
            this.projection = null;
            for (var i = 0; i < this.eventHandlers.length; i++) {
                this.eventHandlers[i].remove();
            }
            if (this.autoSize) {
                MM.removeEvent(window, 'resize', this.windowResize());
            }
        }
    };
    // Instance of a map intended for drawing to a div.
    //
    //  * `parent` (required DOM element)
    //      Can also be an ID of a DOM element
    //  * `provider` (required MM.MapProvider or URL template)
    //  * `location` (required MM.Location)
    //      Location for map to show
    //  * `zoom` (required number)
    MM.mapByCenterZoom = function(parent, layerish, location, zoom) {
        var layer = MM.coerceLayer(layerish),
            map = new MM.Map(parent, layer, false);
        map.setCenterZoom(location, zoom).draw();
        return map;
    };

    // Instance of a map intended for drawing to a div.
    //
    //  * `parent` (required DOM element)
    //      Can also be an ID of a DOM element
    //  * `provider` (required MM.MapProvider or URL template)
    //  * `locationA` (required MM.Location)
    //      Location of one map corner
    //  * `locationB` (required MM.Location)
    //      Location of other map corner
    MM.mapByExtent = function(parent, layerish, locationA, locationB) {
        var layer = MM.coerceLayer(layerish),
            map = new MM.Map(parent, layer, false);
        map.setExtent([locationA, locationB]).draw();
        return map;
    };
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
          Point: MM.Point,
          Projection: MM.Projection,
          MercatorProjection: MM.MercatorProjection,
          LinearProjection: MM.LinearProjection,
          Transformation: MM.Transformation,
          Location: MM.Location,
          MapProvider: MM.MapProvider,
          Template: MM.Template,
          Coordinate: MM.Coordinate,
          deriveTransformation: MM.deriveTransformation
      };
    }
})(MM);
