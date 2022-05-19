(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('SnazzyInfoWindow', ['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.SnazzyInfoWindow = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    // Global variables
    var _classPrefix = 'si-';
    var _root2 = 1.41421356237;
    var _inverseRoot2 = 0.7071067811865474;
    var _eventPrefix = 'snazzy-info-window-';
    var _defaultShadow = {
        h: '0px',
        v: '3px',
        blur: '6px',
        spread: '0px',
        color: '#000'
    };
    var _defaultOptions = {
        placement: 'top',
        pointer: true,
        openOnMarkerClick: true,
        closeOnMapClick: true,
        closeWhenOthersOpen: false,
        showCloseButton: true,
        panOnOpen: true,
        edgeOffset: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
    };

    // Copy keys from the source into the target
    function copyKeys(target, source) {
        if (target && source) {
            Object.keys(source).forEach(function (key) {
                target[key] = source[key];
            });
        }
    }

    // We need to safely merge options from the defaults. This will make
    // sure settings like edgeOffset are properly assigned.
    function mergeDefaultOptions(opts) {
        var copy = {};
        copyKeys(copy, _defaultOptions);
        copyKeys(copy, opts);
        Object.keys(_defaultOptions).forEach(function (key) {
            var obj = _defaultOptions[key];
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                var objCopy = {};
                copyKeys(objCopy, obj);
                copyKeys(objCopy, copy[key]);
                copy[key] = objCopy;
            }
        });
        return copy;
    }

    // Parse a css attribute into the numeric portion and the units
    function parseAttribute(attribute, defaultValue) {
        // 1em, 1.0em, 0.1em, .1em, 1.    em
        var re = /^(-{0,1}\.{0,1}\d+(\.\d+)?)[\s|\.]*(\w*)$/;
        if (attribute && re.test(attribute)) {
            var match = re.exec(attribute);
            var number = match[1];
            var units = match[3] || 'px';
            return { value: number * 1, units: units, original: attribute };
        }
        if (defaultValue) {
            return parseAttribute(defaultValue);
        }
        return { original: defaultValue };
    }

    // Set the html of a container. Should support both raw text and a single
    // DOM Element.
    function setHTML(container, content) {
        if (container) {
            // Clear out everything in the container
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            if (content) {
                if (typeof content === 'string') {
                    container.innerHTML = content;
                } else {
                    container.appendChild(content);
                }
            }
        }
    }

    // Get the opposite of a given placement
    function oppositePlacement(p) {
        if (p === 'top') {
            return 'bottom';
        } else if (p === 'bottom') {
            return 'top';
        } else if (p === 'left') {
            return 'right';
        } else if (p === 'right') {
            return 'left';
        }
        return p;
    }

    // Return the placement with the first letter capitalized
    function capitalizePlacement(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
    }

    // Convert the value into a Google Map LatLng
    function toLatLng(v) {
        if (v !== undefined && v !== null && google) {
            if (v instanceof google.maps.LatLng) {
                return v;
            } else if (v.lat !== undefined && v.lng !== undefined) {
                return new google.maps.LatLng(v);
            }
        }
        return null;
    }

    var SnazzyInfoWindow = function (_google$maps$OverlayV) {
        _inherits(SnazzyInfoWindow, _google$maps$OverlayV);

        function SnazzyInfoWindow(opts) {
            _classCallCheck(this, SnazzyInfoWindow);

            var _this = _possibleConstructorReturn(this, (SnazzyInfoWindow.__proto__ || Object.getPrototypeOf(SnazzyInfoWindow)).call(this, opts));

            // Private properties
            _this._html = null;
            _this._opts = mergeDefaultOptions(opts);
            _this._callbacks = _this._opts.callbacks || {};
            _this._marker = _this._opts.marker;
            _this._map = _this._opts.map;
            _this._position = toLatLng(_this._opts.position);
            _this._isOpen = false;
            _this._listeners = [];

            // This listener remains active when the info window is closed.
            if (google && _this._marker && _this._opts.openOnMarkerClick) {
                _this.trackListener(google.maps.event.addListener(_this._marker, 'click', function () {
                    if (!_this.getMap()) {
                        _this.open();
                    }
                }), true);
            }

            // When using a position the default option for the offset is 0
            if (_this._position && !_this._opts.offset) {
                _this._opts.offset = {
                    top: '0px',
                    left: '0px'
                };
            }

            // Validate the placement option
            var p = opts.placement || _this._opts.position;
            // The position variable was renamed to placement so we must type check
            if (typeof p === 'string' || p instanceof String) {
                p = p.toLowerCase();
            }
            if (p !== 'top' && p !== 'bottom' && p !== 'left' && p !== 'right') {
                _this._opts.placement = _defaultOptions.placement;
            } else {
                _this._opts.placement = p;
            }

            // Validate the position option
            p = _this._opts.position;
            if (p !== undefined && p !== null && typeof p !== 'string' && !(p instanceof String)) {
                _this._opts.position = p;
            }

            // Validate the other options
            if (_this._opts.border === undefined || _this._opts.border === true) {
                _this._opts.border = {};
            }
            if (_this._opts.pointer === undefined) {
                _this._opts.pointer = _defaultOptions.pointer;
            }
            if (_this._opts.shadow === undefined || _this._opts.shadow === true) {
                _this._opts.shadow = {};
            }
            return _this;
        }

        // Activate the specified callback and return the result


        _createClass(SnazzyInfoWindow, [{
            key: 'activateCallback',
            value: function activateCallback(callback) {
                var lambda = this._callbacks[callback];
                return lambda ? lambda.apply(this) : undefined;
            }
        }, {
            key: 'trackListener',
            value: function trackListener(listener, persistent) {
                this._listeners.push({ listener: listener, persistent: persistent });
            }
        }, {
            key: 'clearListeners',
            value: function clearListeners(clearPersistent) {
                if (google) {
                    if (this._listeners) {
                        this._listeners.forEach(function (e) {
                            if (clearPersistent || !e.persistent) {
                                google.maps.event.removeListener(e.listener);
                                e.listener = null;
                            }
                        });
                        this._listeners = this._listeners.filter(function (e) {
                            return e.listener != null;
                        });
                    }
                }
            }
        }, {
            key: 'isOpen',
            value: function isOpen() {
                return this._isOpen;
            }
        }, {
            key: 'open',
            value: function open() {
                var result = this.activateCallback('beforeOpen');
                if (result !== undefined && !result) {
                    return;
                }
                if (this._marker) {
                    this.setMap(this._marker.getMap());
                } else if (this._map && this._position) {
                    this.setMap(this._map);
                }
            }
        }, {
            key: 'close',
            value: function close() {
                var result = this.activateCallback('beforeClose');
                if (result !== undefined && !result) {
                    return;
                }
                this.clearListeners();
                this.setMap(null);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (this.getMap()) {
                    this.setMap(null);
                }
                // Make sure to clear all persistent listeners
                this.clearListeners(true);
            }
        }, {
            key: 'setContent',
            value: function setContent(content) {
                this._opts.content = content;
                if (this._html && this._html.content) {
                    setHTML(this._html.content, content);
                }
            }
        }, {
            key: 'setPosition',
            value: function setPosition(latLng) {
                this._position = toLatLng(latLng);
                if (this._isOpen && this._position) {
                    this.draw();
                    this.resize();
                    this.reposition();
                }
            }
        }, {
            key: 'getWrapper',
            value: function getWrapper() {
                if (this._html) {
                    return this._html.wrapper;
                }
                return null;
            }
        }, {
            key: 'draw',
            value: function draw() {
                if (!this.getMap() || !this._html) {
                    return;
                }
                if (!this._marker && !this._position) {
                    return;
                }

                // 1. Assign offset
                var offset = this._opts.offset;
                if (offset) {
                    if (offset.left) {
                        this._html.wrapper.style.marginLeft = offset.left;
                    }
                    if (offset.top) {
                        this._html.wrapper.style.marginTop = offset.top;
                    }
                }
                // 2. Set the background color
                var bg = this._opts.backgroundColor;
                if (bg) {
                    this._html.contentWrapper.style.backgroundColor = bg;
                    if (this._opts.pointer) {
                        this._html.pointerBg.style['border' + capitalizePlacement(this._opts.placement) + 'Color'] = bg;
                    }
                }
                // 3. Padding
                if (this._opts.padding) {
                    this._html.contentWrapper.style.padding = this._opts.padding;
                    if (this._opts.shadow) {
                        this._html.shadowFrame.style.padding = this._opts.padding;
                    }
                }
                // 4. Border radius
                if (this._opts.borderRadius) {
                    this._html.contentWrapper.style.borderRadius = this._opts.borderRadius;
                    if (this._opts.shadow) {
                        this._html.shadowFrame.style.borderRadius = this._opts.borderRadius;
                    }
                }
                // 5. Font Size
                if (this._opts.fontSize) {
                    this._html.wrapper.style.fontSize = this._opts.fontSize;
                }
                // 6. Font Color
                if (this._opts.fontColor) {
                    this._html.contentWrapper.style.color = this._opts.fontColor;
                }
                // 7. Pointer
                // Check if the pointer is enabled. Also make sure the value isn't just the boolean true.
                if (this._opts.pointer && this._opts.pointer !== true) {
                    if (this._opts.shadow) {
                        this._html.shadowPointer.style.width = this._opts.pointer;
                        this._html.shadowPointer.style.height = this._opts.pointer;
                    }
                    if (this._html.pointerBorder) {
                        this._html.pointerBorder.style.borderWidth = this._opts.pointer;
                    }
                    this._html.pointerBg.style.borderWidth = this._opts.pointer;
                }

                // 8. Border
                if (this._opts.border) {
                    // Calculate the border width
                    var bWidth = 0;
                    if (this._opts.border.width !== undefined) {
                        bWidth = parseAttribute(this._opts.border.width, '0px');
                        this._html.contentWrapper.style.borderWidth = bWidth.value + bWidth.units;
                    }
                    bWidth = Math.round((this._html.contentWrapper.offsetWidth - this._html.contentWrapper.clientWidth) / 2.0);
                    bWidth = parseAttribute(bWidth + 'px', '0px');

                    if (this._opts.pointer) {
                        // Calculate the pointer length
                        var pLength = Math.min(this._html.pointerBorder.offsetHeight, this._html.pointerBorder.offsetWidth);
                        pLength = parseAttribute(pLength + 'px', '0px');

                        var triangleDiff = Math.round(bWidth.value * (_root2 - 1));
                        triangleDiff = Math.min(triangleDiff, pLength.value);

                        this._html.pointerBg.style.borderWidth = pLength.value - triangleDiff + pLength.units;

                        var reverseP = capitalizePlacement(oppositePlacement(this._opts.placement));
                        this._html.pointerBg.style['margin' + reverseP] = triangleDiff + bWidth.units;
                        this._html.pointerBg.style[this._opts.placement] = -bWidth.value + bWidth.units;
                    }
                    var color = this._opts.border.color;
                    if (color) {
                        this._html.contentWrapper.style.borderColor = color;
                        if (this._html.pointerBorder) {
                            this._html.pointerBorder.style['border' + capitalizePlacement(this._opts.placement) + 'Color'] = color;
                        }
                    }
                }
                // 9. Shadow
                if (this._opts.shadow) {
                    // Check if any of the shadow settings have actually been set
                    var shadow = this._opts.shadow;
                    var isSet = function isSet(attribute) {
                        var v = shadow[attribute];
                        return v !== undefined && v != null;
                    };

                    if (isSet('h') || isSet('v') || isSet('blur') || isSet('spread') || isSet('color')) {
                        var hOffset = parseAttribute(shadow.h, _defaultShadow.h);
                        var vOffset = parseAttribute(shadow.v, _defaultShadow.v);
                        var blur = parseAttribute(shadow.blur, _defaultShadow.blur);
                        var spread = parseAttribute(shadow.spread, _defaultShadow.spread);
                        var _color = shadow.color || _defaultShadow.color;
                        var formatBoxShadow = function formatBoxShadow(h, v) {
                            return h + ' ' + v + ' ' + blur.original + ' ' + spread.original + ' ' + _color;
                        };

                        this._html.shadowFrame.style.boxShadow = formatBoxShadow(hOffset.original, vOffset.original);

                        // Correctly rotate the shadows before the css transform
                        var hRotated = _inverseRoot2 * (hOffset.value - vOffset.value) + hOffset.units;
                        var vRotated = _inverseRoot2 * (hOffset.value + vOffset.value) + vOffset.units;
                        this._html.shadowPointerInner.style.boxShadow = formatBoxShadow(hRotated, vRotated);
                    }
                    if (this._opts.shadow.opacity) {
                        this._html.shadowWrapper.style.opacity = this._opts.shadow.opacity;
                    }
                }

                var divPixel = this.getProjection().fromLatLngToDivPixel(this._position || this._marker.position);
                if (divPixel) {
                    this._html.floatWrapper.style.top = Math.floor(divPixel.y) + 'px';
                    this._html.floatWrapper.style.left = Math.floor(divPixel.x) + 'px';
                }
                if (!this._isOpen) {
                    this._isOpen = true;
                    this.resize();
                    this.reposition();
                    this.activateCallback('afterOpen');
                    if (google) {
                        google.maps.event.trigger(this.getMap(), _eventPrefix + 'opened', this);
                    }
                }
            }
        }, {
            key: 'onAdd',
            value: function onAdd() {
                var _this2 = this;

                if (this._html) {
                    return;
                }
                // Used for creating new elements
                var applyCss = function applyCss(element, args) {
                    if (element && args) {
                        for (var i = 0; i < args.length; i++) {
                            var className = args[i];
                            if (className) {
                                if (element.className) {
                                    element.className += ' ';
                                }
                                element.className += _classPrefix + className;
                            }
                        }
                    }
                };
                var newElement = function newElement() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var element = document.createElement('div');
                    applyCss(element, args);
                    return element;
                };

                this._html = {};

                // 1. Create the wrapper
                this._html.wrapper = newElement('wrapper-' + this._opts.placement);
                if (this._opts.wrapperClass) {
                    this._html.wrapper.className += ' ' + this._opts.wrapperClass;
                }
                if (this._opts.border) {
                    applyCss(this._html.wrapper, ['has-border']);
                }

                // 2. Create the shadow
                if (this._opts.shadow) {
                    this._html.shadowWrapper = newElement('shadow-wrapper-' + this._opts.placement);
                    this._html.shadowFrame = newElement('frame', 'shadow-frame');
                    this._html.shadowWrapper.appendChild(this._html.shadowFrame);

                    if (this._opts.pointer) {
                        this._html.shadowPointer = newElement('shadow-pointer-' + this._opts.placement);
                        this._html.shadowPointerInner = newElement('shadow-inner-pointer-' + this._opts.placement);
                        this._html.shadowPointer.appendChild(this._html.shadowPointerInner);
                        this._html.shadowWrapper.appendChild(this._html.shadowPointer);
                    }

                    this._html.wrapper.appendChild(this._html.shadowWrapper);
                }

                // 3. Create the content
                this._html.contentWrapper = newElement('frame', 'content-wrapper');
                this._html.content = newElement('content');
                if (this._opts.content) {
                    setHTML(this._html.content, this._opts.content);
                }

                // 4. Create the close button
                if (this._opts.showCloseButton) {
                    if (this._opts.closeButtonMarkup) {
                        var d = document.createElement('div');
                        setHTML(d, this._opts.closeButtonMarkup);
                        this._html.closeButton = d.firstChild;
                    } else {
                        this._html.closeButton = document.createElement('button');
                        this._html.closeButton.setAttribute('type', 'button');
                        this._html.closeButton.innerHTML = '&#215;';
                        applyCss(this._html.closeButton, ['close-button']);
                    }
                    this._html.contentWrapper.appendChild(this._html.closeButton);
                }
                this._html.contentWrapper.appendChild(this._html.content);
                this._html.wrapper.appendChild(this._html.contentWrapper);

                // 5. Create the pointer
                if (this._opts.pointer) {
                    if (this._opts.border) {
                        this._html.pointerBorder = newElement('pointer-' + this._opts.placement, 'pointer-border-' + this._opts.placement);
                        this._html.wrapper.appendChild(this._html.pointerBorder);
                    }
                    this._html.pointerBg = newElement('pointer-' + this._opts.placement, 'pointer-bg-' + this._opts.placement);
                    this._html.wrapper.appendChild(this._html.pointerBg);
                }

                // Create an outer wrapper
                this._html.floatWrapper = newElement('float-wrapper');
                this._html.floatWrapper.appendChild(this._html.wrapper);

                // Add the wrapper to the Google Maps float pane
                this.getPanes().floatPane.appendChild(this._html.floatWrapper);

                // Now add all the event listeners
                var map = this.getMap();
                this.clearListeners();
                if (this._opts.closeOnMapClick) {
                    this.trackListener(google.maps.event.addListener(map, 'click', function () {
                        _this2.close();
                    }));
                }
                if (this._opts.closeWhenOthersOpen) {
                    this.trackListener(google.maps.event.addListener(map, _eventPrefix + 'opened', function (other) {
                        if (_this2 !== other) {
                            _this2.close();
                        }
                    }));
                }
                if (google) {
                    // Clear out the previous map bounds
                    this._previousWidth = null;
                    this._previousHeight = null;
                    this.trackListener(google.maps.event.addListener(map, 'bounds_changed', function () {
                        var d = map.getDiv();
                        var ow = d.offsetWidth;
                        var oh = d.offsetHeight;
                        var pw = _this2._previousWidth;
                        var ph = _this2._previousHeight;
                        if (pw === null || ph === null || pw !== ow || ph !== oh) {
                            _this2._previousWidth = ow;
                            _this2._previousHeight = oh;
                            _this2.resize();
                        }
                    }));

                    // Marker moves
                    if (this._marker) {
                        this.trackListener(google.maps.event.addListener(this._marker, 'position_changed', function () {
                            _this2.draw();
                        }));
                    }

                    // Close button
                    if (this._opts.showCloseButton && !this._opts.closeButtonMarkup) {
                        this.trackListener(google.maps.event.addDomListener(this._html.closeButton, 'click', function (e) {
                            e.cancelBubble = true;
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            _this2.close();
                        }));
                    }

                    // Stop the mouse event propagation
                    var mouseEvents = ['click', 'dblclick', 'rightclick', 'contextmenu', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'touchstart', 'touchend', 'touchmove', 'wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
                    mouseEvents.forEach(function (event) {
                        _this2.trackListener(google.maps.event.addDomListener(_this2._html.wrapper, event, function (e) {
                            e.cancelBubble = true;
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                        }));
                    });
                }

                this.activateCallback('open');
            }
        }, {
            key: 'onRemove',
            value: function onRemove() {
                this.activateCallback('close');
                if (this._html) {
                    var parent = this._html.floatWrapper.parentElement;
                    if (parent) {
                        parent.removeChild(this._html.floatWrapper);
                    }
                    this._html = null;
                }
                this._isOpen = false;
                this.activateCallback('afterClose');
            }
        }, {
            key: 'getMapInnerBounds',
            value: function getMapInnerBounds() {
                var mb = this.getMap().getDiv().getBoundingClientRect();
                var mib = {
                    top: mb.top + this._opts.edgeOffset.top,
                    right: mb.right - this._opts.edgeOffset.right,
                    bottom: mb.bottom - this._opts.edgeOffset.bottom,
                    left: mb.left + this._opts.edgeOffset.left
                };
                mib.width = mib.right - mib.left;
                mib.height = mib.bottom - mib.top;
                return mib;
            }
        }, {
            key: 'reposition',
            value: function reposition() {
                if (!this._opts.panOnOpen || !this._html) {
                    return;
                }
                var mib = this.getMapInnerBounds();
                var wb = this._html.wrapper.getBoundingClientRect();
                var dx = 0;
                var dy = 0;
                if (mib.left >= wb.left) {
                    dx = wb.left - mib.left;
                } else if (mib.right <= wb.right) {
                    dx = wb.left - (mib.right - wb.width);
                }
                if (mib.top >= wb.top) {
                    dy = wb.top - mib.top;
                } else if (mib.bottom <= wb.bottom) {
                    dy = wb.top - (mib.bottom - wb.height);
                }
                if (dx !== 0 || dy !== 0) {
                    this.getMap().panBy(dx, dy);
                }
            }
        }, {
            key: 'resize',
            value: function resize() {
                if (!this._html) {
                    return;
                }
                var mib = this.getMapInnerBounds();
                // Handle the max width
                var maxWidth = mib.width;
                if (this._opts.maxWidth !== undefined) {
                    maxWidth = Math.min(maxWidth, this._opts.maxWidth);
                }
                maxWidth -= this._html.wrapper.offsetWidth - this._html.content.offsetWidth;
                this._html.content.style.maxWidth = maxWidth + 'px';

                // Handle the max height
                var maxHeight = mib.height;
                if (this._opts.maxHeight !== undefined) {
                    maxHeight = Math.min(maxHeight, this._opts.maxHeight);
                }
                maxHeight -= this._html.wrapper.offsetHeight - this._html.content.offsetHeight;
                this._html.content.style.maxHeight = maxHeight + 'px';
            }
        }]);

        return SnazzyInfoWindow;
    }(google.maps.OverlayView);

    exports.default = SnazzyInfoWindow;
    module.exports = exports['default'];
});