(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(this, function (exports, b) {
    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = document.createElement('div').style,
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');


    function deepExtend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend({}, obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    /* Image Drawing Functions */
    function getHtmlImage(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];
            // scale = data.zoom;

        div.classList.add('croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
            // transform: 'scale(' + scale + ')'
        })
        img.src = data.imgSrc;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function getCanvasImage(img, data) {
        var points = data.points,
            // scale = data.zoom,
            left = points[0],
            top = points[1],
            width = (points[2] - points[0]),
            height = (points[3] - points[1]),
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        if (circle) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
        }

        ctx.drawImage(img, left, top, width, height, 0, 0, width, height);

        return canvas.toDataURL();
    }

    /* Utilities */
    function loadImage(src) {
        var img = new Image(),
            prom;

        prom = new Promise(function (resolve, reject) {
            img.onload = function () {
                resolve(img);
            };
            img.src = src;
        });

        return prom;
    }

    /* CSS Transform Prototype */
    var _translate = 'translate3d',
        _translateSuffix = ', 0px';
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(parseInt(vals[4], 10), parseInt(vals[5], 10), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(_translate.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    }

    Transform.prototype.toString = function () {
        return _translate + '(' + this.x + 'px, ' + this.y + 'px' + _translateSuffix + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = ['croppie-container'],
            boundary = self.boundary = document.createElement('div'),
            viewport = self.viewport = document.createElement('div'),
            img = self.img = document.createElement('img'),
            overlay = self.overlay = document.createElement('div'),
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null;

        boundary.classList.add('cr-boundary');
        css(boundary, {
            width: self.options.boundary.width + 'px',
            height: self.options.boundary.height + 'px'
        });

        viewport.classList.add('cr-viewport');
        if (customViewportClass) {
          viewport.classList.add(customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });

        img.classList.add('cr-image');
        overlay.classList.add('cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(img);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        self.element.classList.add(contClass);
        if (self.options.customClass) {
          self.element.classList.add(self.options.customClass);
        }

        _initDraggable.call(this);

        if (self.options.showZoom) {
            _initializeZoom.call(self);
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = document.createElement('div'),
            zoomer = self.zoomer = document.createElement('input'),
            origin,
            viewportRect,
            transform;

        wrap.classList.add('cr-slider-wrap');
        zoomer.type = 'range';
        zoomer.classList.add('cr-slider');
        zoomer.step = '0.01';
        zoomer.value = 1;

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;
        function start() {
            _updateCenterPoint.call(self);
            origin = new TransformOrigin(self.img);
            viewportRect = self.viewport.getBoundingClientRect();
            transform = Transform.parse(self.img);
        }

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: origin || new TransformOrigin(self.img),
                viewportRect: viewportRect || self.viewport.getBoundingClientRect(),
                transform: transform || Transform.parse(self.img)
            });
        }

        function scroll(ev) {
            var delta = ev.deltaY / -2000, // denominator is arbitrary - might consider changing based on image size
                targetZoom = self._currentZoom + delta;

            ev.preventDefault();
            start();
            zoomer.value = targetZoom;
            change();
        }

        self.zoomer.addEventListener('mousedown', start);
        self.zoomer.addEventListener('touchstart', start);

        self.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.boundary.addEventListener('mousewheel', scroll);
            self.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui.transform,
            vpRect = ui.viewportRect,
            origin = ui.origin;

        self._currentZoom = ui.value;
        transform.scale = self._currentZoom;

        var boundaries = _getVirtualBoundaries.call(self, vpRect),
            transBoundaries = boundaries.translate,
            oBoundaries = boundaries.origin;

        if (transform.x >= transBoundaries.maxX) {
            origin.x = oBoundaries.minX;
            transform.x = transBoundaries.maxX;
        }

        if (transform.x <= transBoundaries.minX) {
            origin.x = oBoundaries.maxX;
            transform.x = transBoundaries.minX;
        }

        if (transform.y >= transBoundaries.maxY) {
            origin.y = oBoundaries.minY;
            transform.y = transBoundaries.maxY;
        }

        if (transform.y <= transBoundaries.minY) {
            origin.y = oBoundaries.maxY;
            transform.y = transBoundaries.minY;
        }

        var transCss = {};
        transCss[CSS_TRANSFORM] = transform.toString();
        transCss[CSS_TRANS_ORG] = origin.toString();
        css(self.img, transCss);

        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.options.boundary.width / 2,
            centerFromBoundaryY = self.options.boundary.height / 2,
            originalImgWidth = self._originalImageWidth,
            originalImgHeight = self._originalImageHeight,
            curImgWidth = originalImgWidth * scale,
            curImgHeight = originalImgHeight * scale,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;


        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint() {
        var self = this,
            scale = self._currentZoom,
            data = self.img.getBoundingClientRect(),
            vpData = self.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.img.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.img),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        center.y = top / scale;
        center.x = left / scale;

        adj.y = (center.y - pc.y) * (1 - scale);
        adj.x = (center.x - pc.x) * (1 - scale);

        transform.x -= adj.x;
        transform.y -= adj.y;

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.img, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect;

        function mouseDown(ev) {
            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            transform = Transform.parse(self.img);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX || ev.touches[0].pageX,
                pageY = ev.pageY || ev.touches[0].pageY,
                deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                imgRect = self.img.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX,
                newCss = {};

            if (ev.type == 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    self.zoomer.value = scale;
                    dispatchChange(self.zoomer);
                    // self.zoomer.dispatchEvent('change');
                    return;
                }
            }

            if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                transform.y = top;
            }

            if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                transform.x = left;
            }

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.img, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp(ev) {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.overlay.addEventListener('mousedown', mouseDown);
        self.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        var self = this,
            boundRect = self.boundary.getBoundingClientRect(),
            imgData = self.img.getBoundingClientRect();

        css(self.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this;
        self.options.update.call(self, self.get());
    }

    function _updatePropertiesFromImage() {
        var self = this,
            imgData = self.img.getBoundingClientRect(),
            vpData = self.viewport.getBoundingClientRect(),
            minZoom = 0,
            maxZoom = 1.5,
            initialZoom = 1,
            minW,
            minH;

        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;

        if (self.options.showZoom) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);
            if (minZoom > maxZoom) {
                maxZoom = minZoom + 1;
                initialZoom = minZoom + ((maxZoom - minZoom) / 2);
            }
            self.zoomer.min = minZoom;
            self.zoomer.max = maxZoom;
            self.zoomer.value = initialZoom;
            dispatchChange(self.zoomer);
            // self.zoomer.dispatchEvent('change');
        }
        _updateOverlay.call(self);
    }

    function _bindPoints(points) {
        if (points.length != 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.viewport.getBoundingClientRect(),
            boundRect = self.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.img, newCss);

        self.zoomer.value = scale;
        self._currentZoom = scale;
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [];

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else {
            url = options.url;
            points = options.points || [];
        }

        self.imgSrc = url;
        var prom = loadImage(url);
        prom.then(function () {
            self.img.src = url;
            _updatePropertiesFromImage.call(self);
            if (points.length) {
                _bindPoints.call(self, points);
            }
            _triggerUpdate.call(self);
            if (cb) {
                cb();
            }
        });
        return prom;
    }

    function _get() {
        var self = this,
            imgData = self.img.getBoundingClientRect(),
            vpData = self.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            x2 = x1 + vpData.width,
            y2 = y1 + vpData.height,
            scale = self._currentZoom;

        x1 /= scale;
        x2 /= scale;
        y1 /= scale;
        y2 /= scale;

        return {
            points: [x1, y1, x2, y2],
            zoom: scale
        };
    }

    function _result(type) {
        var self = this,
            data = _get.call(self),
            prom;

        data.circle = self.options.viewport.type === 'circle';
        data.imgSrc = self.imgSrc;
        type = type || 'html';

        prom = new Promise(function (resolve, reject) {
            if (type === 'canvas') {
                loadImage(self.imgSrc).then(function (img) {
                    resolve(getCanvasImage(img, data));
                });
            }
            else {
                resolve(getHtmlImage(data));
            }
        });
        return prom;
    }

    if (this.jQuery) {
        var $ = this.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        this.element = element;
        this.options = deepExtend({}, Croppie.defaults, opts);

        _create.call(this);
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: {
            width: 300,
            height: 300
        },
        customClass: '',
        showZoom: true,
        mouseWheelZoom: true,
        update: function () { }
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            return _get.call(this);
        },
        result: function (type) {
            return _result.call(this, type);
        }
    });

    exports.Croppie = window.Croppie = Croppie;
}));