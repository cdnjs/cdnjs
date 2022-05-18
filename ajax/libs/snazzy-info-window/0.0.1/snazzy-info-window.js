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

    // Global variables
    var _classPrefix = 'si-';
    var _root2 = 1.41421356237;
    var _inverseRoot2 = 0.7071067811865474;
    var _defaultShadow = {
        h: '0px',
        v: '3px',
        blur: '6px',
        spread: '0px',
        color: '#000'
    };

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

    var SnazzyInfoWindow = function (_google$maps$OverlayV) {
        _inherits(SnazzyInfoWindow, _google$maps$OverlayV);

        function SnazzyInfoWindow(opts) {
            _classCallCheck(this, SnazzyInfoWindow);

            var _this = _possibleConstructorReturn(this, (SnazzyInfoWindow.__proto__ || Object.getPrototypeOf(SnazzyInfoWindow)).call(this, opts));

            // Private properties
            _this._marker = null;
            _this._floatWrapper = null;
            _this._opts = opts || {};

            // Validate the options
            var p = _this._opts.position;
            if (p) {
                p = p.toLowerCase();
            }
            if (p !== 'top' && p !== 'bottom' && p !== 'left' && p !== 'right') {
                _this._opts.position = 'top';
            }
            if (_this._opts.border === undefined) {
                _this._opts.border = {};
            }
            if (_this._opts.pointer === undefined) {
                _this._opts.pointer = true;
            }
            if (_this._opts.shadow === undefined) {
                _this._opts.shadow = {};
            }
            return _this;
        }

        // Go through each element under the wrapper with the provided class name


        _createClass(SnazzyInfoWindow, [{
            key: 'eachByClassName',
            value: function eachByClassName(className, lambda) {
                if (this._floatWrapper) {
                    var elements = this._floatWrapper.getElementsByClassName(_classPrefix + className);
                    for (var i = 0; i < elements.length; i++) {
                        if (lambda) {
                            lambda.apply(this, [elements[i]]);
                        }
                    }
                }
            }
        }, {
            key: 'attach',
            value: function attach(marker) {
                var _this2 = this;

                if (google && marker !== undefined) {
                    this._marker = marker;
                    google.maps.event.addListener(this._marker, 'click', function () {
                        _this2.open();
                    });
                }
            }
        }, {
            key: 'open',
            value: function open() {
                if (this._marker) {
                    this.setMap(this._marker.getMap());
                }
            }
        }, {
            key: 'close',
            value: function close() {
                this.setMap(null);
            }
        }, {
            key: 'draw',
            value: function draw() {
                var _this3 = this;

                if (!this._marker || !this._floatWrapper) {
                    return;
                }

                // Returns a capitalized position for assigning styles
                var p = this._opts.position;
                p = p.charAt(0).toUpperCase() + p.slice(1);
                var capitalizedPosition = p;

                // 1. Assign offset
                var offset = this._opts.offset;
                if (offset) {
                    if (offset.left) {
                        this.eachByClassName('wrapper-' + this._opts.position, function (e) {
                            e.style.marginLeft = offset.left;
                        });
                    }
                    if (offset.top) {
                        this.eachByClassName('wrapper-' + this._opts.position, function (e) {
                            e.style.marginTop = offset.top;
                        });
                    }
                }
                // 2. Set the background color
                var bg = this._opts.backgroundColor;
                if (bg) {
                    this.eachByClassName('content', function (e) {
                        e.style.backgroundColor = bg;
                    });
                    if (this._opts.pointer) {
                        this.eachByClassName('pointer-bg-' + this._opts.position, function (e) {
                            e.style['border' + capitalizedPosition + 'Color'] = bg;
                        });
                    }
                }
                // 3. Padding
                if (this._opts.padding) {
                    this.eachByClassName('frame', function (e) {
                        e.style.padding = _this3._opts.padding;
                    });
                }
                // 4. Border radius
                if (this._opts.borderRadius) {
                    this.eachByClassName('frame', function (e) {
                        e.style.borderRadius = _this3._opts.borderRadius;
                    });
                }
                // 5. Font Color
                if (this._opts.fontColor) {
                    this.eachByClassName('wrapper-' + this._opts.position, function (e) {
                        e.style.color = _this3._opts.fontColor;
                    });
                }
                // 6. Font Size
                if (this._opts.fontSize) {
                    this.eachByClassName('wrapper-' + this._opts.position, function (e) {
                        e.style.fontSize = _this3._opts.fontSize;
                    });
                }
                // 7. Border
                if (this._opts.border) {
                    (function () {
                        if (_this3._opts.border.width !== undefined) {
                            (function () {
                                var bWidth = parseAttribute(_this3._opts.border.width, '0px');
                                _this3.eachByClassName('content', function (e) {
                                    e.style.borderWidth = bWidth.value + bWidth.units;
                                });
                                if (_this3._opts.pointer) {
                                    _this3.eachByClassName('pointer-bg-' + _this3._opts.position, function (e) {
                                        e.style[_this3._opts.position] = Math.round(-bWidth.value * _root2) + bWidth.units;
                                    });
                                }
                            })();
                        }
                        var color = _this3._opts.border.color;
                        if (color) {
                            _this3.eachByClassName('content', function (e) {
                                e.style.borderColor = color;
                            });
                            if (_this3._opts.pointer) {
                                _this3.eachByClassName('pointer-border-' + _this3._opts.position, function (e) {
                                    e.style['border' + capitalizedPosition + 'Color'] = color;
                                });
                            }
                        }
                    })();
                } else {
                    // Hide the border when border is set to false
                    this.eachByClassName('content', function (e) {
                        e.style.borderWidth = 0;
                    });
                    if (this._opts.pointer) {
                        this.eachByClassName('pointer-bg-' + this._opts.position, function (e) {
                            e.style[_this3._opts.position] = 0;
                        });
                    }
                }
                // 8. Pointer
                // Check if the pointer is enabled. Also make sure the value isn't just the boolean true.
                if (this._opts.pointer && this._opts.pointer !== true) {
                    if (this._opts.shadow) {
                        this.eachByClassName('shadow-pointer-' + this._opts.position, function (e) {
                            e.style.width = _this3._opts.pointer;
                            e.style.height = _this3._opts.pointer;
                        });
                    }
                    this.eachByClassName('pointer-' + this._opts.position, function (e) {
                        e.style.borderWidth = _this3._opts.pointer;
                    });
                }

                // 9. Shadow
                if (this._opts.shadow) {
                    (function () {
                        // Check if any of the shadow settings have actually been set
                        var shadow = _this3._opts.shadow;
                        var isSet = function isSet(attribute) {
                            var v = shadow[attribute];
                            return v !== undefined && v != null;
                        };

                        if (isSet('h') || isSet('v') || isSet('blur') || isSet('spread') || isSet('color')) {
                            (function () {
                                var hOffset = parseAttribute(shadow.h, _defaultShadow.h);
                                var vOffset = parseAttribute(shadow.v, _defaultShadow.v);
                                var blur = parseAttribute(shadow.blur, _defaultShadow.blur);
                                var spread = parseAttribute(shadow.spread, _defaultShadow.spread);
                                var color = shadow.color || _defaultShadow.color;
                                var formatBoxShadow = function formatBoxShadow(h, v) {
                                    return h + ' ' + v + ' ' + blur.original + ' ' + spread.original + ' ' + color;
                                };

                                _this3.eachByClassName('shadow-frame', function (e) {
                                    e.style.boxShadow = formatBoxShadow(hOffset.original, vOffset.original);
                                });
                                // Correctly rotate the shadows before the css transform
                                var hRotated = _inverseRoot2 * (hOffset.value - vOffset.value) + hOffset.units;
                                var vRotated = _inverseRoot2 * (hOffset.value + vOffset.value) + vOffset.units;
                                _this3.eachByClassName('shadow-inner-pointer-' + _this3._opts.position, function (e) {
                                    e.style.boxShadow = formatBoxShadow(hRotated, vRotated);
                                });
                            })();
                        }
                        if (_this3._opts.shadow.opacity) {
                            _this3.eachByClassName('shadow-wrapper-' + _this3._opts.position, function (e) {
                                e.style.opacity = _this3._opts.shadow.opacity;
                            });
                        }
                    })();
                }

                var markerPos = this.getProjection().fromLatLngToDivPixel(this._marker.position);
                this._floatWrapper.style.top = Math.floor(markerPos.y) + 'px';
                this._floatWrapper.style.left = Math.floor(markerPos.x) + 'px';
            }
        }, {
            key: 'onAdd',
            value: function onAdd() {
                if (this._floatWrapper) {
                    return;
                }
                // Used for creating new elements
                var newElement = function newElement() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var element = document.createElement('div');
                    if (args) {
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
                    return element;
                };

                // 1. Create the wrapper
                var wrapper = newElement('wrapper-' + this._opts.position);
                if (this._opts.wrapperClass) {
                    wrapper.className += ' ' + this._opts.wrapperClass;
                }

                // 2. Create the shadow
                if (this._opts.shadow) {
                    var shadowWrapper = newElement('shadow-wrapper-' + this._opts.position);
                    var shadowFrame = newElement('frame', 'shadow-frame');
                    shadowWrapper.appendChild(shadowFrame);

                    if (this._opts.pointer) {
                        var shadowPointer = newElement('shadow-pointer-' + this._opts.position);
                        var shadowPointerInner = newElement('shadow-inner-pointer-' + this._opts.position);
                        shadowPointer.appendChild(shadowPointerInner);
                        shadowWrapper.appendChild(shadowPointer);
                    }

                    wrapper.appendChild(shadowWrapper);
                }

                // 3. Create the content
                var contentWrapper = newElement('frame', 'content-wrapper');
                var content = newElement('content');
                if (this._opts.content) {
                    content.innerHTML = this._opts.content;
                }
                contentWrapper.appendChild(content);
                wrapper.appendChild(contentWrapper);

                // 4. Create the pointer
                if (this._opts.pointer) {
                    var pointerBorder = newElement('pointer-' + this._opts.position, 'pointer-border-' + this._opts.position);
                    var pointerBg = newElement('pointer-' + this._opts.position, 'pointer-bg-' + this._opts.position);
                    wrapper.appendChild(pointerBorder);
                    wrapper.appendChild(pointerBg);
                }

                // Create an outer wrapper
                var floatWrapper = newElement('float-wrapper');
                floatWrapper.appendChild(wrapper);
                this._floatWrapper = floatWrapper;

                // Add the wrapper to the Google Maps float pane
                this.getPanes().floatPane.appendChild(this._floatWrapper);
            }
        }, {
            key: 'onRemove',
            value: function onRemove() {
                if (this._floatWrapper) {
                    var parent = this._floatWrapper.parentElement;
                    if (parent) {
                        parent.removeChild(this._floatWrapper);
                    }
                    this._floatWrapper = null;
                }
            }
        }]);

        return SnazzyInfoWindow;
    }(google.maps.OverlayView);

    exports.default = SnazzyInfoWindow;
    module.exports = exports['default'];
});