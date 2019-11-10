/*!
 * Modest Maps JS v0.17.0
 * http://modestmaps.com/
 *
 * Copyright (c) 2010 Stamen Design, All Rights Reserved.
 *
 * Open source under the BSD License.
 * http://creativecommons.org/licenses/BSD/
 *
 * Versioned using Semantic Versioning (v.major.minor.patch)
 * See CHANGELOG and http://semver.org/ for more details.
 * 
 */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = {};
    }
}

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

    // see http://ejohn.org/apps/jselect/event.html for the originals
    MM.addEvent = function(obj, type, fn) {
        if (obj.attachEvent) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){ obj['e'+type+fn](window.event); };
            obj.attachEvent('on'+type, obj[type+fn]);
        }
        else {
            obj.addEventListener(type, fn, false);
            if (type == 'mousewheel') {
                obj.addEventListener('DOMMouseScroll', fn, false);
            }
        }
    };

    MM.removeEvent = function( obj, type, fn ) {
        if ( obj.detachEvent ) {
            obj.detachEvent('on'+type, obj[type+fn]);
            obj[type+fn] = null;
        }
        else {
            obj.removeEventListener(type, fn, false);
            if (type == 'mousewheel') {
                obj.removeEventListener('DOMMouseScroll', fn, false);
            }
        }
    };

    // Cross-browser function to get current element style property
    MM.getStyle = function(el,styleProp) {
        if (el.currentStyle)
            var y = el.currentStyle[styleProp];
        else if (window.getComputedStyle)
            var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
        return y;
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
        }
    };

    // Get the euclidean distance between two points
    MM.Point.distance = function(p1, p2) {
        var dx = (p2.x - p1.x);
        var dy = (p2.y - p1.y);
        return Math.sqrt(dx*dx + dy*dy);
    };

    // Get a point between two other points, biased by `t`.
    MM.Point.interpolate = function(p1, p2, t) {
        var px = p1.x + (p2.x - p1.x) * t;
        var py = p1.y + (p2.y - p1.y) * t;
        return new MM.Point(px, py);
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
            return "(" + this.row.toFixed(3) + ", "
                       + this.column.toFixed(3) + " @"
                       + this.zoom.toFixed(3) + ")";
        },
        // Quickly generate a string representation of this coordinate to
        // index it in hashes.
        toKey: function() {
            /* there used to be a clever hash function here but there were collisions.
               TODO: optimize, but test for collisions properly :) */
            return [ Math.floor(this.zoom), Math.floor(this.column), Math.floor(this.row) ].join(',');
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
        var bearing = Math.atan2(
            Math.sin(lon1 - lon2) *
            Math.cos(lat2),
            Math.cos(lat1) *
            Math.sin(lat2) -
            Math.sin(lat1) *
            Math.cos(lat2) *
            Math.cos(lon1 - lon2)
        )  / -(Math.PI / 180);

        bearing = bearing < 0 ? 360 + bearing : bearing;

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
            return new MM.Point(this.ax*point.x + this.bx*point.y + this.cx,
                                this.ay*point.x + this.by*point.y + this.cy);
        },

        untransform: function(point) {
            return new MM.Point((point.x*this.by - point.y*this.bx
                               - this.cx*this.by + this.cy*this.bx)
                              / (this.ax*this.by - this.ay*this.bx),
                                (point.x*this.ay - point.y*this.ax
                               - this.cx*this.ay + this.cy*this.ax)
                              / (this.bx*this.ay - this.by*this.ax));
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

        var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3)))
              / (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3)));

        var b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3)))
              / (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));

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
    MM.MapProvider = function(getTileUrl) {
        if (getTileUrl) {
            this.getTileUrl = getTileUrl;
        }
    };

    MM.MapProvider.prototype = {
        // defaults to Google-y Mercator style maps
        projection: new MM.MercatorProjection( 0, 
                        MM.deriveTransformation(-Math.PI,  Math.PI, 0, 0, 
                                                 Math.PI,  Math.PI, 1, 0, 
                                                -Math.PI, -Math.PI, 0, 1) ),
                    
        tileWidth: 256,
        tileHeight: 256,
        
        // these are limits for available *tiles*
        // panning limits will be different (since you can wrap around columns)
        // but if you put Infinity in here it will screw up sourceCoordinate
        topLeftOuterLimit: new MM.Coordinate(0,0,0),
        bottomRightInnerLimit: new MM.Coordinate(1,1,0).zoomTo(18),
        
        getTileUrl: function(coordinate) {
            throw "Abstract method not implemented by subclass.";
        },
        
        locationCoordinate: function(location) {
            return this.projection.locationCoordinate(location);
        },
    
        coordinateLocation: function(location) {
            return this.projection.coordinateLocation(location);
        },
        
        outerLimits: function() {
            return [ this.topLeftOuterLimit.copy(),
                     this.bottomRightInnerLimit.copy() ];
        },

        // use this to tell MapProvider  that tiles only exist between certain zoom levels.
        // Map will respect thse zoom limits and not allow zooming outside this range
        setZoomRange: function(minZoom, maxZoom) {
            this.topLeftOuterLimit = this.topLeftOuterLimit.zoomTo(minZoom);
            this.bottomRightInnerLimit = this.bottomRightInnerLimit.zoomTo(maxZoom);
        },
    
        sourceCoordinate: function(coord) {
            var TL = this.topLeftOuterLimit.zoomTo(coord.zoom);
            var BR = this.bottomRightInnerLimit.zoomTo(coord.zoom);
            var vSize = BR.row - TL.row;
            if (coord.row < 0 | coord.row >= vSize) {
                // it's too high or too low:
                return null;
            }
            var hSize = BR.column - TL.column;
            // assume infinite horizontal scrolling
            var wrappedColumn = coord.column % hSize;
            while (wrappedColumn < 0) {
                wrappedColumn += hSize;
            }
            return new MM.Coordinate(coord.row, wrappedColumn, coord.zoom);
        }
    };

    // A simple tileprovider builder that supports `XYZ`-style tiles.
    MM.TemplatedMapProvider = function(template, subdomains) {
        MM.MapProvider.call(this, function(coordinate) {
            coordinate = this.sourceCoordinate(coordinate);
            if (!coordinate) {
                return null;
            }
            var base = template;
            if (subdomains && subdomains.length && base.indexOf("{S}") >= 0) {
                var subdomain = parseInt(coordinate.zoom + coordinate.row + coordinate.column, 10) % subdomains.length;
                base = base.replace('{S}', subdomains[subdomain]);
            }
            return base.replace('{Z}', coordinate.zoom.toFixed(0))
                .replace('{X}', coordinate.column.toFixed(0))
                .replace('{Y}', coordinate.row.toFixed(0));
        });
    };

    MM.extend(MM.TemplatedMapProvider, MM.MapProvider);
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

    // A handler that allows mouse-wheel zooming - zooming in
    // when page would scroll up, and out when the page would scroll down.
    MM.MouseWheelHandler = function(map) {
        if (map !== undefined) {
            this.init(map);
        }
    };

    MM.MouseWheelHandler.prototype = {

        init: function(map) {
            this.map = map;
            MM.addEvent(map.parent, 'mousewheel', this.getMouseWheel());
        },

        mouseWheelHandler: null,

        getMouseWheel: function() {
            // Ensure that this handler is attached once.
            if (!this.mouseWheelHandler) {
                var theHandler = this;
                var prevTime = new Date().getTime();
                this.mouseWheelHandler = function(e) {

                    var delta = 0;
                    if (e.wheelDelta) {
                        delta = e.wheelDelta;
                    } else if (e.detail) {
                        delta = -e.detail;
                    }

                    // limit mousewheeling to once every 200ms
                    var timeSince = new Date().getTime() - prevTime;

                    if (Math.abs(delta) > 0 && (timeSince > 200)) {
                        var point = MM.getMousePoint(e, theHandler.map);
                        theHandler.map.zoomByAbout(delta > 0 ? 1 : -1, point);

                        prevTime = new Date().getTime();
                    }

                    // Cancel the event so that the page doesn't scroll
                    return MM.cancelEvent(e);
                };
            }
            return this.mouseWheelHandler;
        }
    };

    // Handle double clicks, that zoom the map in one zoom level.
    MM.DoubleClickHandler = function(map) {
        if (map !== undefined) {
            this.init(map);
        }
    };

    MM.DoubleClickHandler.prototype = {

        init: function(map) {
            this.map = map;
            MM.addEvent(map.parent, 'dblclick', this.getDoubleClick());
        },

        doubleClickHandler: null,

        getDoubleClick: function() {
            // Ensure that this handler is attached once.
            if (!this.doubleClickHandler) {
                var theHandler = this;
                this.doubleClickHandler = function(e) {
                    // Get the point on the map that was double-clicked
                    var point = MM.getMousePoint(e, theHandler.map);

                    // use shift-double-click to zoom out
                    theHandler.map.zoomByAbout(e.shiftKey ? -1 : 1, point);

                    return MM.cancelEvent(e);
                };
            }
            return this.doubleClickHandler;
        }
    };

    // Handle the use of mouse dragging to pan the map.
    MM.DragHandler = function(map) {
        if (map !== undefined) {
            this.init(map);
        }
    };

    MM.DragHandler.prototype = {

        init: function(map) {
            this.map = map;
            MM.addEvent(map.parent, 'mousedown', this.getMouseDown());
        },

        mouseDownHandler: null,

        getMouseDown: function() {
            // Ensure that this handler is attached once.
            if (!this.mouseDownHandler) {
                var theHandler = this;
                this.mouseDownHandler = function(e) {

                    MM.addEvent(document, 'mouseup', theHandler.getMouseUp());
                    MM.addEvent(document, 'mousemove', theHandler.getMouseMove());

                    theHandler.prevMouse = new MM.Point(e.clientX, e.clientY);
                    theHandler.map.parent.style.cursor = 'move';

                    return MM.cancelEvent(e);
                };
            }
            return this.mouseDownHandler;
        },

        mouseMoveHandler: null,

        getMouseMove: function() {
            // Ensure that this handler is attached once.
            if (!this.mouseMoveHandler) {
                var theHandler = this;
                this.mouseMoveHandler = function(e) {

                    if (theHandler.prevMouse) {
                        theHandler.map.panBy(
                            e.clientX - theHandler.prevMouse.x,
                            e.clientY - theHandler.prevMouse.y);
                        theHandler.prevMouse.x = e.clientX;
                        theHandler.prevMouse.y = e.clientY;
                    }

                    return MM.cancelEvent(e);
                };
            }
            return this.mouseMoveHandler;
        },

        mouseUpHandler: null,

        getMouseUp: function() {
            // Ensure that this handler is attached once.
            if (!this.mouseUpHandler) {
                var theHandler = this;
                this.mouseUpHandler = function(e) {

                    MM.removeEvent(document, 'mouseup', theHandler.getMouseUp());
                    MM.removeEvent(document, 'mousemove', theHandler.getMouseMove());

                    theHandler.prevMouse = null;
                    theHandler.map.parent.style.cursor = '';

                    return MM.cancelEvent(e);
                };
            }
            return this.mouseUpHandler;
        }
    };

    // A shortcut for adding drag, double click,
    // and mouse wheel events to the map. This is the default
    // handler attached to a map if the handlers argument isn't given.
    MM.MouseHandler = function(map) {
        if (map !== undefined) {
            this.init(map);
        }
    };

    MM.MouseHandler.prototype = {
        init: function(map) {
            this.map = map;
            new MM.DragHandler(map);
            new MM.DoubleClickHandler(map);
            new MM.MouseWheelHandler(map);
        }
    };
    MM.TouchHandler = function() { };

    MM.TouchHandler.prototype = {

        maxTapTime: 150,
        maxTapDistance: 10,
        maxDoubleTapDelay: 350,
        events: [],
        taps: [],

        init: function(map) {
            this.map = map;
            MM.addEvent(map.parent, 'touchstart', this.getTouchStartMachine());
            MM.addEvent(map.parent, 'touchmove', this.getTouchMoveMachine());
            MM.addEvent(map.parent, 'touchend', this.getTouchEndMachine());
        },

        // Essentially the entry point for touches to this control -
        // on an event, store the touches in the `events` array, one per touch.
        //
        // * TODO: this may be storing `events` as a global
        interruptTouches: function(events) {
            var now = new Date().getTime();
            for (var i = 0; i < events.length; i += 1) {
                var touch = events[i].touch;
                events[i] = {
                    screenX: touch.screenX,
                    screenY: touch.screenY,
                    touch: touch,
                    time: now,
                    start: null,
                    count: 0,
                    travel: 0
                };
                events[i].start = events[i];
            }
        },

        // Test whether touches are from the same source -
        // whether this is the same touchmove event.
        sameTouch: function(event, touch) {
            return (event && event.touch) &&
                (touch.identifier == event.touch.identifier);
        },

        // Quick euclidean distance between two points
        distance: function(t1, t2) {
            return Math.sqrt(
                Math.pow(t1.screenX - t2.screenX, 2) +
                Math.pow(t1.screenY - t2.screenY, 2));
        },

        // Generate a CSS transformation matrix from
        // one touch event.
        oneTouchMatrix: function(touch) {
            var start = touch.start;
            var x = touch.screenX - start.screenX;
            var y = touch.screenY - start.screenY;

            return [1, 0, 0, 1, x, y];
        },

        // Generate a CSS transformation matrix from
        // two touch events.
        twoTouchMatrix: function(t1, t2) {
            var t1_ = t1.start,
                t2_ = t2.start;

            var span =  this.distance(t1, t2),
                span_ = this.distance(t1_, t2_);

            var s = span / span_;

            var x = (t1.screenX + t2.screenX) / 2,
                y = (t1.screenY + t2.screenY) / 2;

            var x_ = (t1_.screenX + t2_.screenX) / 2,
                y_ = (t1_.screenY + t2_.screenY) / 2;

            var tx = s * -x_ + x,
                ty = s * -y_ + y;

            return [s, 0, 0, s, tx, ty];
        },

        getTouchStartMachineHandler: null,

        getTouchStartMachine: function() {
            if (!this.getTouchStartMachineHandler) {
                var theHandler = this;
                var events = this.events;

                this.getTouchStartMachineHandler = function(e) {
                    theHandler.interruptTouches(events);

                    for (var i = 0; i < e.changedTouches.length; i += 1) {
                        var touch = e.changedTouches[i];
                        var newEvent = {
                            screenX: touch.screenX,
                            screenY: touch.screenY,
                            touch: touch,
                            time: new Date().getTime(),
                            start: null,
                            count: 0,
                            travel: 0
                        };
                        newEvent.start = newEvent;
                        events.push(newEvent);
                    }
                    return MM.cancelEvent(e);
                };
            }
            return this.getTouchStartMachineHandler;
        },

        getTouchStartMachineHandler: null,

        getTouchMoveMachine: function() {
            if (!this.getTouchMoveMachineHandler) {
                var theHandler = this;
                var events = this.events;

                this.getTouchMoveMachineHandler = function(e) {
                    var now = new Date().getTime();

                    // Look at each changed touch in turn.
                    for (var i = 0, touch = e.changedTouches[i];
                        i < e.changedTouches.length; i += 1) {
                        for (var j = 0; j < events.length; j += 1) {
                            if (theHandler.sameTouch(events[j], touch)) {
                                var newEvent = {
                                    screenX: touch.screenX,
                                    screenY: touch.screenY,
                                    touch: touch,
                                    time: now,
                                    start: null,
                                    count: events[j].count + 1,
                                    travel: events[j].travel +
                                        theHandler.distance(touch, events[j])
                                };
                                // Set a reference to the previous touch
                                newEvent.start = events[j].start;
                                events[j] = newEvent;
                            }
                        }
                    }

                    if (events.length === 1) {
                        theHandler.onPanning(events[0]);
                    } else if (events.length === 2) {
                        theHandler.onPinching(events[0], events[1]);
                    }

                    return MM.cancelEvent(e);
                };
            }
            return this.getTouchMoveMachineHandler;
        },

        getTouchEndMachineHandler: null,

        getTouchEndMachine: function() {
            if (!this.getTouchEndMachineHandler) {
                var theHandler = this;
                var events = this.events;

                this.getTouchEndMachineHandler = function(e) {
                    var now = new Date().getTime();

                    if (events.length === 1) {
                        theHandler.onPanned(events[0]);
                    } else if (events.length === 2) {
                        theHandler.onPinched(events[0], events[1]);
                    }

                    // Look at each changed touch in turn.
                    for (var i = 0; i < e.changedTouches.length; i += 1) {
                        var touch = e.changedTouches[i];

                        for (var j = 0; j < events.length; j += 1) {
                            if (theHandler.sameTouch(events[j], touch)) {
                                var event = {
                                    screenX: touch.screenX,
                                    screenY: touch.screenY,
                                    touch: touch,
                                    time: now,
                                    // pointer chase
                                    start: events[j].start,
                                    count: events[j].count + 1,
                                    travel: events[j].travel +
                                        theHandler.distance(touch, events[j]),
                                    last: events[j]
                                };
                                // Remove the event
                                events.splice(j, 1);
                                j -= 1;

                                // we now know we have an event object and a
                                // matching touch that's just ended. Let's see
                                // what kind of event it is based on how long it
                                // lasted and how far it moved.
                                var time = now - event.start.time;
                                if (event.travel > theHandler.maxTapDistance) {
                                    // we will to assume that the drag has been handled separately
                                } else if (time > theHandler.maxTapTime) {
                                    // close in time, but not in space: a hold
                                    theHandler.onHold({
                                        x: touch.screenX,
                                        y: touch.screenY,
                                        end: now,
                                        duration: time
                                    });
                                } else {
                                    // close in both time and space: a tap
                                    theHandler.onTap({
                                        x: touch.screenX,
                                        y: touch.screenY,
                                        time: now
                                    });
                                }
                            }
                        }
                    }

                    theHandler.interruptTouches(events);

                    if (e.touches.length === 0 && events.length >= 1) {
                        // Weird, sometimes an end event doesn't get thrown
                        // for a touch that nevertheless has disappeared.
                        events.splice(0, events.length);
                    }
                    return MM.cancelEvent(e);
                };
            }
            return this.getTouchEndMachineHandler;
        },

        onHold: function(hold) {
            // TODO
        },

        // Handle a tap event - mainly watch for a doubleTap
        onTap: function(tap) {
            if (this.taps.length &&
                (tap.time - this.taps[0].time) < this.maxDoubleTapDelay) {
                this.onDoubleTap(tap);
                return;
            }
            this.taps = [tap];
        },

        // Handle a double tap by zooming in a single zoom level to a
        // round zoom.
        onDoubleTap: function(tap) {
            // zoom in to a round number
            var z = Math.floor(this.map.getZoom() + 2);
            z = z - this.map.getZoom();

            var p = new MM.Point(tap.x, tap.y);
            this.map.zoomByAbout(z, p);
        },

        // Re-transform the actual map parent's CSS transformation
        onPanning: function(touch) {
            var m = this.oneTouchMatrix(touch);
            // http://www.w3.org/TR/css3-3d-transforms/#transform-functions
            // `matrix(a,b,c,d,e,f)` is equivalent to
            // `matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, e, f, 0, 1)`
            m = [
                '1', '0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0',
                m[4].toFixed(0), m[5].toFixed(0), '0', '1'
            ];
            m = 'matrix3d(' + m.join(', ') + ')';

            this.map.parent.style.webkitTransformOrigin = '0px 0px';
            this.map.parent.style.webkitTransform = m;
        },

        onPanned: function(touch) {
            var m = this.oneTouchMatrix(touch);
            this.map.panBy(m[4], m[5]);
            this.map.parent.style.webkitTransform = '';
        },

        // During a pinch event, don't recalculate zooms and centers,
        // but recalculate the CSS transformation
        onPinching: function(touch1, touch2) {
            var m = this.twoTouchMatrix(touch1, touch2);
            // http://www.w3.org/TR/css3-3d-transforms/#transform-functions
            // `matrix(a,b,c,d,e,f)` is equivalent to
            // `matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, e, f, 0, 1)`
            m = [
                m[0].toFixed(3), '0', '0', '0', '0', m[3].toFixed(3),
                '0', '0', '0', '0', '1', '0',
                m[4].toFixed(0), m[5].toFixed(0),
                '0', '1'
            ];
            m = 'matrix3d(' + m.join(', ') + ')';

            this.map.parent.style.webkitTransformOrigin = '0px 0px';
            this.map.parent.style.webkitTransform = m;
        },

        // When a pinch event ends, recalculate the zoom and center
        // of the map.
        onPinched: function(touch1, touch2) {
            var m = this.twoTouchMatrix(touch1, touch2);
            var z = Math.log(m[0]) / Math.log(2);
            var p = new MM.Point(0, 0);
            this.map.zoomByAbout(z, p).panBy(m[4], m[5]);
            this.map.parent.style.webkitTransform = '';
        }
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
    MM.RequestManager = function(parent) {

        // The loading bay is a document fragment to optimize appending, since
        // the elements within are invisible. See
        //  [this blog post](http://ejohn.org/blog/dom-documentfragments/).
        this.loadingBay = document.createDocumentFragment();

        this.requestsById = {};
        this.openRequestCount = 0;

        this.maxOpenRequests = 4;
        this.requestQueue = [];

        this.callbackManager = new MM.CallbackManager(this, [ 'requestcomplete' ]);
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

        // Clear everything in the queue except for certain keys, speciied
        // by an object of the form
        //
        //     { key: throwawayvalue }
        clearExcept: function(validKeys) {

            // clear things from the queue first...
            for (var i = 0; i < this.requestQueue.length; i++) {
                var request = this.requestQueue[i];
                if (request && !(request.key in validKeys)) {
                    this.requestQueue[i] = null;
                }
            }

            // then check the loadingBay...
            var openRequests = this.loadingBay.childNodes;
            for (var j = openRequests.length-1; j >= 0; j--) {
                var img = openRequests[j];
                if (!(img.id in validKeys)) {
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
                if (this.requestsById.hasOwnProperty(id)) {
                    if (!(id in validKeys)) {
                        var request = this.requestsById[id];
                        // whether we've done the request or not...
                        delete this.requestsById[id];
                        if (request !== null) {
                            request = request.key = request.coord = request.url = null;
                        }
                    }
                }
            }
        },

        // Given a tile key, check whether the RequestManager is currently
        // requesting it and waiting for the result.
        hasRequest: function(id) {
            return (id in this.requestsById);
        },

        // * TODO: remove dependency on coord (it's for sorting, maybe call it data?)
        // * TODO: rename to requestImage once it's not tile specific
        requestTile: function(key, coord, url) {
            if (!(key in this.requestsById)) {
                var request = { key: key, coord: coord.copy(), url: url };
                // if there's no url just make sure we don't request this image again
                this.requestsById[key] = request;
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

                    // FIXME: key is technically not unique in document if there
                    // are two Maps but toKey is supposed to be fast so we're trying
                    // to avoid a prefix ... hence we can't use any calls to
                    // `document.getElementById()` to retrieve images
                    img.id = request.key;
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
                    request = request.key = request.coord = request.url = null;
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

    // Map

    // Instance of a map intended for drawing to a div.
    //
    //  * `parent` (required DOM element)
    //      Can also be an ID of a DOM element
    //  * `provider` (required MapProvider)
    //      Provides tile URLs and map projections
    //  * `dimensions` (optional Point)
    //      Size of map to create
    //  * `eventHandlers` (optional Array)
    //      If empty or null MouseHandler will be used
    //      Otherwise, each handler will be called with init(map)
    MM.Map = function(parent, provider, dimensions, eventHandlers) {

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
        if (position != "relative" && position != "absolute") {
            this.parent.style.position = 'relative';
        }

        // if you don't specify dimensions we assume you want to fill the parent
        // unless the parent has no w/h, in which case we'll still use a default
        if (!dimensions) {
            var w = this.parent.offsetWidth;
            var h = this.parent.offsetHeight;
            if (!w) {
                w = 640;
                this.parent.style.width = w+'px';
            }
            if (!h) {
                h = 480;
                this.parent.style.height = h+'px';
            }
            dimensions = new MM.Point(w, h);
            // FIXME: listeners like this will stop the map being removed cleanly?
            // when does removeEvent get called?
            var theMap = this;
            MM.addEvent(window, 'resize', function(event) {
                // don't call setSize here because it sets parent.style.width/height
                // and setting the height breaks percentages and default styles
                theMap.dimensions = new MM.Point(theMap.parent.offsetWidth, theMap.parent.offsetHeight);
                theMap.draw();
                theMap.dispatchCallback('resized', [ theMap.dimensions ]);
            });
        }
        else {
            this.parent.style.width = Math.round(dimensions.x)+'px';
            this.parent.style.height = Math.round(dimensions.y)+'px';
        }

        this.dimensions = dimensions;

        // TODO: is it sensible to do this (could be more than one map on a page)
        /*
        // add a style element so layer/tile styles can be class-based
        // thanks to http://www.phpied.com/dynamic-script-and-style-elements-in-ie/
        var css = document.createElement('style');
        css.setAttribute("type", "text/css");
        var def = "div.modestmaps-layer {"
            + "position: absolute;"
            + "top: 0px; left: 0px;"
            + "width: 100%; height: 100%;"
            + "margin: 0; padding: 0; border: 0;"
        + "}";
        if (css.styleSheet) { // IE
            css.styleSheet.cssText = def;
        } else { // the world
            css.appendChild(document.createTextNode(def));
        }
        document.getElementsByTagName('head')[0].appendChild(ss1);
        this.parent.appendChild(css);
        */

        this.requestManager = new MM.RequestManager(this.parent);
        this.requestManager.addCallback('requestcomplete', this.getTileComplete());

        this.layers = {};

        this.layerParent = document.createElement('div');
        this.layerParent.id = this.parent.id+'-layers';
        // this text is also used in createOrGetLayer
        this.layerParent.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0';

        this.parent.appendChild(this.layerParent);

        this.coordinate = new MM.Coordinate(0.5,0.5,0);

        this.setProvider(provider);

        this.enablePyramidLoading = false;

        this.callbackManager = new MM.CallbackManager(this, [ 'zoomed', 'panned', 'centered', 'extentset', 'resized', 'drawn' ]);

        // set up handlers last so that all required attributes/functions are in place if needed
        if (eventHandlers === undefined) {
            this.eventHandlers = [];
            this.eventHandlers.push(new MM.MouseHandler(this));
        }
        else {
            this.eventHandlers = eventHandlers;
            if (eventHandlers instanceof Array) {
                for (var i = 0; i < eventHandlers.length; i++) {
                    eventHandlers[i].init(this);
                }
            }
        }
        
    };
    
    MM.Map.prototype = {
    
        parent: null,
        provider: null,
        dimensions: null,
        coordinate: null,
    
        tiles: null,
        layers: null,
        layerParent: null,
    
        requestManager: null,
    
        tileCacheSize: null,
        
        maxTileCacheSize: null,
        recentTiles: null,
        recentTilesById: null,

        callbackManager: null,        
        eventHandlers: null,
    
        toString: function() {
            return 'Map(#' + this.parent.id + ')';
        },
        
        // callbacks...
        
        addCallback: function(event, callback) {
            this.callbackManager.addCallback(event,callback);
        },

        removeCallback: function(event, callback) {
            this.callbackManager.removeCallback(event,callback);
        },
        
        dispatchCallback: function(event, message) {
            this.callbackManager.dispatchCallback(event,message);
        },
    
        // zooming
        
        zoomBy: function(zoomOffset) {
            this.coordinate = this.coordinate.zoomBy(zoomOffset);
            this.draw();
            this.dispatchCallback('zoomed', zoomOffset);
            return this;
        },

        zoomIn:  function()  { return this.zoomBy(1); },
        zoomOut: function()  { return this.zoomBy(-1); },
        setZoom: function(z) { return this.zoomBy(z - this.coordinate.zoom); },

        zoomByAbout: function(zoomOffset, point) {
            var location = this.pointLocation(point);
            this.zoomBy(zoomOffset);
            var newPoint = this.locationPoint(location);
            return this.panBy(point.x - newPoint.x, point.y - newPoint.y);
        },

        // panning

        panBy: function(dx, dy) {
            this.coordinate.column -= dx / this.provider.tileWidth;
            this.coordinate.row -= dy / this.provider.tileHeight;
            this.draw();
            this.dispatchCallback('panned', [dx, dy]);
            return this;
        },

        panLeft:  function() { return this.panBy(100,0); },
        panRight: function() { return this.panBy(-100,0); },
        panDown:  function() { return this.panBy(0,-100); },
        panUp:    function() { return this.panBy(0,100); },

        // positioning
        setCenter: function(location) {
            return this.setCenterZoom(location, this.coordinate.zoom);
        },

        setCenterZoom: function(location, zoom) {
            this.coordinate = this.provider.locationCoordinate(location).zoomTo(parseFloat(zoom) || 0);
            this.draw();
            this.dispatchCallback('centered', [location, zoom]);
            return this;
        },

        setExtent: function(locations) {

            var TL, BR;
            for (var i = 0; i < locations.length; i++) {
                var coordinate = this.provider.locationCoordinate(locations[i]);
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
            var hFactor = (BR.column - TL.column) / (width / this.provider.tileWidth);
        
            // multiplication factor expressed as base-2 logarithm, for zoom difference
            var hZoomDiff = Math.log(hFactor) / Math.log(2);
                
            // possible horizontal zoom to fit geographical extent in map width
            var hPossibleZoom = TL.zoom - Math.ceil(hZoomDiff);
                
            // multiplication factor between vertical span and map height
            var vFactor = (BR.row - TL.row) / (height / this.provider.tileHeight);
                
            // multiplication factor expressed as base-2 logarithm, for zoom difference
            var vZoomDiff = Math.log(vFactor) / Math.log(2);
                
            // possible vertical zoom to fit geographical extent in map height
            var vPossibleZoom = TL.zoom - Math.ceil(vZoomDiff);
                
            // initial zoom to fit extent vertically and horizontally
            var initZoom = Math.min(hPossibleZoom, vPossibleZoom);
        
            // additionally, make sure it's not outside the boundaries set by provider limits
            // this also catches Infinity stuff
            initZoom = Math.min(initZoom, this.provider.outerLimits()[1].zoom);
            initZoom = Math.max(initZoom, this.provider.outerLimits()[0].zoom);
        
            // coordinate of extent center
            var centerRow = (TL.row + BR.row) / 2;
            var centerColumn = (TL.column + BR.column) / 2;
            var centerZoom = TL.zoom;
            
            this.coordinate = new MM.Coordinate(centerRow, centerColumn, centerZoom).zoomTo(initZoom);
            this.draw();
    
            this.dispatchCallback('extentset', locations);
            return this;
        },

        // Resize the map's container `<div>`, redrawing the map and triggering
        // `resized` to make sure that the map's presentation is still correct.
        setSize: function(dimensionsOrX, orY) {
            if (dimensionsOrX.hasOwnProperty('x') && dimensionsOrX.hasOwnProperty('y')) {
                this.dimensions = dimensionsOrX;
            }
            else if (orY !== undefined && !isNaN(orY)) {
                this.dimensions = new MM.Point(dimensionsOrX, orY);
            }
            this.parent.style.width = Math.round(this.dimensions.x) + 'px';
            this.parent.style.height = Math.round(this.dimensions.y) + 'px';
            this.draw();
            this.dispatchCallback('resized', [ this.dimensions ]);
            return this;
        },

        // projecting points on and off screen
        coordinatePoint: function(coord) {
            // Return an x, y point on the map image for a given coordinate.
            if(coord.zoom != this.coordinate.zoom) {
                coord = coord.zoomTo(this.coordinate.zoom);
            }

            // distance from the center of the map
            var point = new MM.Point(this.dimensions.x/2, this.dimensions.y/2);
            point.x += this.provider.tileWidth * (coord.column - this.coordinate.column);
            point.y += this.provider.tileHeight * (coord.row - this.coordinate.row);
            
            return point;
        },

        // Get a `MM.Coordinate` from an `MM.Point` - returns a new tile-like object
        // from a screen point.
        pointCoordinate: function(point) {
            // new point coordinate reflecting distance from map center, in tile widths
            var coord = this.coordinate.copy();
            coord.column += (point.x - this.dimensions.x/2) / this.provider.tileWidth;
            coord.row += (point.y - this.dimensions.y/2) / this.provider.tileHeight;

            return coord;
        },

        // Return an x, y point on the map image for a given geographical location.
        locationPoint: function(location) {
            return this.coordinatePoint(this.provider.locationCoordinate(location));
        },

        // Return a geographical location on the map image for a given x, y point.
        pointLocation: function(point) {
            return this.provider.coordinateLocation(this.pointCoordinate(point));
        },
        
        // inspecting
    
        getExtent: function() {
            var extent = [];
            extent.push(this.pointLocation(new MM.Point(0,0)));
            extent.push(this.pointLocation(this.dimensions));
            return extent;
        },

        // Get the current centerpoint of the map, returning a `Location`
        getCenter: function() {
            return this.provider.coordinateLocation(this.coordinate);
        },

        // Get the current zoom level of the map, returning a number
        getZoom: function() {
            return this.coordinate.zoom;
        },

        // Replace the existing provider or set a provider on the map, clearing
        // out existing tiles and requests.
        setProvider: function(newProvider) {

            var firstProvider = false;
            if (this.provider === null) {
                firstProvider = true;
            }
        
            // if we already have a provider the we'll need to
            // clear the DOM, cancel requests and redraw
            if (!firstProvider) {

                this.requestManager.clear();
                
                for (var name in this.layers) {
                    if (this.layers.hasOwnProperty(name)) {
                        var layer = this.layers[name];
                        while(layer.firstChild) {
                            layer.removeChild(layer.firstChild);
                        }
                    }
                }
            }

            // first provider or not we'll init/reset some values...

            this.tiles = {};
        
            this.tileCacheSize = 0;
            
            this.maxTileCacheSize = 64;
            this.recentTiles = [];
            this.recentTilesById = {};            

            // for later: check geometry of old provider and set a new coordinate center 
            // if needed (now? or when?)

            this.provider = newProvider;

            if (!firstProvider) {            
                this.draw();
            }
            return this;
        },

        // stats
        
        /*
        getStats: function() {
            return {
                'Request Queue Length': this.requestManager.requestQueue.length,
                'Open Request Count': this.requestManager.requestCount,
                'Tile Cache Size': this.tileCacheSize,
                'Tiles On Screen': this.parent.getElementsByTagName('img').length
            };        
        },*/
        
        // Prevent the user from navigating the map outside the `outerLimits`
        // of the map's provider.
        enforceLimits: function(coord) {
            coord = coord.copy();
            var limits = this.provider.outerLimits();
            if (limits) {
                var minZoom = limits[0].zoom;
                var maxZoom = limits[1].zoom;
                if (coord.zoom < minZoom) {
                    coord = coord.zoomTo(minZoom);
                }
                else if (coord.zoom > maxZoom) {
                    coord = coord.zoomTo(maxZoom);
                }
                
                /*                 
                // this generally does the *intended* thing,
                // but it's not always desired behavior so it's disabled for now
                
                var topLeftLimit = limits[0].zoomTo(coord.zoom);
                var bottomRightLimit = limits[1].zoomTo(coord.zoom);
                var currentTopLeft = this.pointCoordinate(new MM.Point(0,0));
                var currentBottomRight = this.pointCoordinate(this.dimensions);
                
                if (bottomRightLimit.row - topLeftLimit.row < currentBottomRight.row - currentTopLeft.row) {
                    // if the limit is smaller than the current view center it
                    coord.row = (bottomRightLimit.row + topLeftLimit.row) / 2;
                }
                else {
                    if (currentTopLeft.row < topLeftLimit.row) {
                        coord.row += topLeftLimit.row - currentTopLeft.row;
                    }
                    else if (currentBottomRight.row > bottomRightLimit.row) {
                        coord.row -= currentBottomRight.row - bottomRightLimit.row;
                    }
                }
                if (bottomRightLimit.column - topLeftLimit.column < currentBottomRight.column - currentTopLeft.column) {
                    // if the limit is smaller than the current view, center it
                    coord.column = (bottomRightLimit.column + topLeftLimit.column) / 2;                    
                }
                else {
                    if (currentTopLeft.column < topLeftLimit.column) {
                        coord.column += topLeftLimit.column - currentTopLeft.column;
                    }
                    else if (currentBottomRight.column > bottomRightLimit.column) {
                        coord.column -= currentBottomRight.column - bottomRightLimit.column;
                    }
                }
                */
                
            }
            return coord;
        },
        
        // Redraw the tiles on the map, reusing existing tiles.
        draw: function() {
    
            // make sure we're not too far in or out:
            this.coordinate = this.enforceLimits(this.coordinate);

            // if we're in between zoom levels, we need to choose the nearest:
            var baseZoom = Math.round(this.coordinate.zoom);

            // these are the top left and bottom right tile coordinates
            // we'll be loading everything in between:
            var startCoord = this.pointCoordinate(new MM.Point(0,0)).zoomTo(baseZoom).container();
            var endCoord = this.pointCoordinate(this.dimensions).zoomTo(baseZoom).container().right().down();

            var tilePadding = 0;
            if (tilePadding) {
                startCoord = startCoord.left(tilePadding).up(tilePadding);
                endCoord = endCoord.right(tilePadding).down(tilePadding);
            }

            // tiles with invalid keys will be removed from visible layers
            // requests for tiles with invalid keys will be canceled
            // (this object maps from a tile key to a boolean)
            var validTileKeys = { };

            // make sure we have a container for tiles in the current layer
            var thisLayer = this.createOrGetLayer(startCoord.zoom);

            // use this coordinate for generating keys, parents and children:
            var tileCoord = startCoord.copy();

            for (tileCoord.column = startCoord.column; tileCoord.column <= endCoord.column; tileCoord.column += 1) {
                for (tileCoord.row = startCoord.row; tileCoord.row <= endCoord.row; tileCoord.row += 1) {
                    var tileKey = tileCoord.toKey();
                    validTileKeys[tileKey] = true;
                    if (tileKey in this.tiles) {
                        var tile = this.tiles[tileKey];
                        // ensure it's in the DOM:
                        if (tile.parentNode != thisLayer) {
                            thisLayer.appendChild(tile);
                        }
                    }
                    else {
                        if (!this.requestManager.hasRequest(tileKey)) {
                            var tileURL = this.provider.getTileUrl(tileCoord);
                            this.requestManager.requestTile(tileKey, tileCoord, tileURL);
                        }
                        // look for a parent tile in our image cache
                        var tileCovered = false;
                        var maxStepsOut = tileCoord.zoom;
                        for (var pz = 1; pz <= maxStepsOut; pz++) {
                            var parentCoord = tileCoord.zoomBy(-pz).container();
                            var parentKey = parentCoord.toKey();
                            
                            if (this.enablePyramidLoading) {
                                // mark all parent tiles valid
                                validTileKeys[parentKey] = true;
                                var parentLayer = this.createOrGetLayer(parentCoord.zoom);
                                /* parentLayer.coordinate = parentCoord.copy(); */
                                if (parentKey in this.tiles) {
                                    var parentTile = this.tiles[parentKey];
                                    if (parentTile.parentNode != parentLayer) {
                                        parentLayer.appendChild(parentTile);
                                    }
                                }
                                else if (!this.requestManager.hasRequest(parentKey)) {
                                    // force load of parent tiles we don't already have
                                    var tileURL = this.provider.getTileUrl(parentCoord);
                                    this.requestManager.requestTile(parentKey, parentCoord, tileURL);
                                }
                            }
                            else {
                                // only mark it valid if we have it already
                                if (parentKey in this.tiles) {
                                    validTileKeys[parentKey] = true;
                                    tileCovered = true;
                                    break;
                                }
                            }
                            
                        }
                        // if we didn't find a parent, look at the children:
                        if (!tileCovered && !this.enablePyramidLoading) {
                            var childCoord = tileCoord.zoomBy(1);
                            // mark everything valid whether or not we have it:
                            validTileKeys[childCoord.toKey()] = true;
                            childCoord.column += 1;
                            validTileKeys[childCoord.toKey()] = true;
                            childCoord.row += 1;
                            validTileKeys[childCoord.toKey()] = true;
                            childCoord.column -= 1;
                            validTileKeys[childCoord.toKey()] = true;
                        }
                    }
                }
            }
            
            // i from i to zoom-5 are layers that would be scaled too big,
            // i from zoom+2 to layers.length are layers that would be
            // scaled too small (and tiles would be too numerous)
            for (var name in this.layers) {
                if (this.layers.hasOwnProperty(name)) {
                    var zoom = parseInt(name,10);
                    if (zoom >= startCoord.zoom-5 && zoom < startCoord.zoom+2) {
                        continue;
                    }
                    var layer = this.layers[name];
                    layer.style.display = 'none';
                    var visibleTiles = layer.getElementsByTagName('img');
                    for (var j = visibleTiles.length-1; j >= 0; j--) {
                        layer.removeChild(visibleTiles[j]);
                    }
                }
            }
        
            // for tracking time of tile usage:
            var now = new Date().getTime();
        
            // layers we want to see, if they have tiles in validTileKeys
            var minLayer = startCoord.zoom-5;
            var maxLayer = startCoord.zoom+2;
            for (var i = minLayer; i < maxLayer; i++) {

                var layer = this.layers[i];
                
                if (!layer) {
                    // no tiles for this layer yet
                    continue;
                }

                var scale = 1;
                var theCoord = this.coordinate.copy();

                if (layer.childNodes.length > 0) {
                    layer.style.display = 'block';
                    scale = Math.pow(2, this.coordinate.zoom - i);
                    theCoord = theCoord.zoomTo(i);
                }
                else {
                    layer.style.display = 'none';
                }
                
                var tileWidth = this.provider.tileWidth * scale;
                var tileHeight = this.provider.tileHeight * scale;
                var center = new MM.Point(this.dimensions.x/2, this.dimensions.y/2);

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    var tile = visibleTiles[j];
                    if (!validTileKeys[tile.id]) {
                        layer.removeChild(tile);
                    }
                    else {
                        // position tiles
                        var tx = center.x + (tile.coord.column - theCoord.column) * tileWidth;
                        var ty = center.y + (tile.coord.row - theCoord.row) * tileHeight;
                        tile.style.left = Math.round(tx) + 'px';
                        tile.style.top = Math.round(ty) + 'px';
                        // using style here and not raw width/height for ipad/iphone scaling
                        // see examples/touch/test.html
                        tile.style.width = Math.ceil(tileWidth) + 'px';
                        tile.style.height = Math.ceil(tileHeight) + 'px';
                        // log last-touched-time of currently cached tiles
                        this.recentTilesById[tile.id].lastTouchedTime = now;
                    }
                }
                
            }
    
            // cancel requests that aren't visible:
            this.requestManager.clearExcept(validTileKeys);
            
            // get newly requested tiles, sort according to current view:
            this.requestManager.processQueue(this.getCenterDistanceCompare());
            
            // make sure we don't have too much stuff:
            this.checkCache();

            this.dispatchCallback('drawn');
        },

        _tileComplete: null,

        getTileComplete: function() {
            if (!this._tileComplete) {
                var theMap = this;
                this._tileComplete = function(manager, tile) {

                    // cache the tile itself:
                    theMap.tiles[tile.id] = tile;
                    theMap.tileCacheSize++;

                    // also keep a record of when we last touched this tile:
                    var record = {
                        id: tile.id,
                        lastTouchedTime: new Date().getTime()
                    };
                    theMap.recentTilesById[tile.id] = record;
                    theMap.recentTiles.push(record);

                    // position this tile (avoids a full draw() call):
                    var theCoord = theMap.coordinate.zoomTo(tile.coord.zoom);
                    var scale = Math.pow(2, theMap.coordinate.zoom - tile.coord.zoom);
                    var tx = ((theMap.dimensions.x/2) + (tile.coord.column - theCoord.column) * theMap.provider.tileWidth * scale);
                    var ty = ((theMap.dimensions.y/2) + (tile.coord.row - theCoord.row) * theMap.provider.tileHeight * scale);

                    tile.style.left = Math.round(tx) + 'px';
                    tile.style.top = Math.round(ty) + 'px';
                    // using style here and not raw width/height for ipad/iphone scaling
                    // see examples/touch/test.html
                    tile.style.width = Math.ceil(theMap.provider.tileWidth * scale) + 'px';
                    tile.style.height = Math.ceil(theMap.provider.tileHeight * scale) + 'px';

                    // Support style transition if available.

                    // add tile to its layer
                    var theLayer = theMap.layers[tile.coord.zoom];
                    theLayer.appendChild(tile);
                    tile.className = 'map-tile-loaded';

                    // ensure the layer is visible if it's still the current layer
                    if (Math.round(theMap.coordinate.zoom) == tile.coord.zoom) {
                        theLayer.style.display = 'block';
                    }

                    // request a lazy redraw of all layers
                    // this will remove tiles that were only visible
                    // to cover this tile while it loaded:
                    theMap.requestRedraw();
                };
            }
            return this._tileComplete;
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
        
        createOrGetLayer: function(zoom) {
            if (zoom in this.layers) {
                return this.layers[zoom];
            }
            //console.log('creating layer ' + zoom);
            var layer = document.createElement('div');
            layer.id = this.parent.id+'-zoom-'+zoom;
            layer.style.cssText = this.layerParent.style.cssText;
            layer.style.zIndex = zoom;
            this.layerParent.appendChild(layer);
            this.layers[zoom] = layer;
            return layer;
        },

        // keeps cache below max size
        // (called every time we receive a new tile and add it to the cache)
        checkCache: function() {
            var numTilesOnScreen = this.parent.getElementsByTagName('img').length;
            var maxTiles = Math.max(numTilesOnScreen, this.maxTileCacheSize);
            if (this.tileCacheSize > maxTiles) {
                // sort from newest (highest) to oldest (lowest)
                this.recentTiles.sort(function(t1, t2) {
                    return t2.lastTouchedTime < t1.lastTouchedTime ? -1 : t2.lastTouchedTime > t1.lastTouchedTime ? 1 : 0;
                });
            }
            while (this.tileCacheSize > maxTiles) {
                // delete the oldest record
                var tileRecord = this.recentTiles.pop();
                var now = new Date().getTime();
                delete this.recentTilesById[tileRecord.id];
                /*window.console.log('removing ' + tileRecord.id +
                                   ' last seen ' + (now-tileRecord.lastTouchedTime) + 'ms ago'); */
                // now actually remove it from the cache...
                var tile = this.tiles[tileRecord.id];
                if (tile.parentNode) {
                    // I'm leaving this uncommented for now but you should never see it:
                    alert("Gah: trying to removing cached tile even though it's still in the DOM");
                }
                else {
                    delete this.tiles[tileRecord.id];
                    this.tileCacheSize--;
                }
            }
        },

        // Compares manhattan distance from center of
        // requested tiles to current map center
        // NB:- requested tiles are *popped* from queue, so we do a descending sort
        getCenterDistanceCompare: function() {
            var theCoord = this.coordinate.zoomTo(Math.round(this.coordinate.zoom));
            return function(r1, r2) {
                if (r1 && r2) {
                    var c1 = r1.coord;
                    var c2 = r2.coord;
                    if (c1.zoom == c2.zoom) {
                        var ds1 = Math.abs(theCoord.row - c1.row - 0.5) +
                                  Math.abs(theCoord.column - c1.column - 0.5);
                        var ds2 = Math.abs(theCoord.row - c2.row - 0.5) +
                                  Math.abs(theCoord.column - c2.column - 0.5);
                        return ds1 < ds2 ? 1 : ds1 > ds2 ? -1 : 0;
                    }
                    else {
                        return c1.zoom < c2.zoom ? 1 : c1.zoom > c2.zoom ? -1 : 0;
                    }
                }
                return r1 ? 1 : r2 ? -1 : 0;
            };
        }
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
          TemplatedMapProvider: MM.TemplatedMapProvider,
          Coordinate: MM.Coordinate
      };
    }
})(com.modestmaps);
