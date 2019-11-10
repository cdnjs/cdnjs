(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function(window, vjs){
'use strict';
vjs.utils = vjs.utils||{};

function local_storage_init(){
    // Cookie functions from
    // https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    function get_cookie_item(key){
        if (!key || !has_cookie_item(key))
            return null;
        var reg_ex = new RegExp('(?:^|.*;\\s*)'
        +window.escape(key).replace(/[\-\.\+\*]/g, '\\$&')
        +'\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*');
        return window.unescape(document.cookie.replace(reg_ex, '$1'));
    }
    function set_cookie_item(key, value, end, path, domain, secure){
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key))
            return;
        var expires = '';
        if (end)
        {
            switch (end.constructor)
            {
            case Number:
                expires = end===Infinity
                    ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT'
                    : '; max-age=' + end;
                break;
            case String:
                expires = '; expires=' + end;
                break;
            case Date:
                expires = '; expires=' + end.toGMTString();
                break;
            }
        }
        document.cookie = window.escape(key)+'='+window.escape(value)+
            expires+(domain ? '; domain='+domain : '')+
            (path ? '; path=' + path : '')+
            (secure ? '; secure' : '');
    }
    function has_cookie_item(key){
        return (new RegExp('(?:^|;\\s*)'
            +window.escape(key).replace(/[\-\.\+\*]/g, '\\$&')+'\\s*\\=')
        ).test(document.cookie);
    }
    function has_local_storage(){
        try {
            window.localStorage.setItem('vjs-storage-test', 'value');
            window.localStorage.removeItem('vjs-storage-test');
            return true;
        } catch(e){ return false; }
    }
    vjs.utils.localStorage = has_local_storage() ? window.localStorage : {
        getItem: get_cookie_item,
        setItem: function(key, value){
            set_cookie_item(key, value, Infinity, '/');
        }
    };
}
local_storage_init();

})(window, window.videojs);

},{}],2:[function(_dereq_,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'select'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, _dereq_('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.addEventListener('focus', window.scrollTo(0, yPosition));
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.target) {
                    this.target.blur();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});
},{"select":8}],3:[function(_dereq_,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, _dereq_('./clipboard-action'), _dereq_('tiny-emitter'), _dereq_('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});
},{"./clipboard-action":2,"good-listener":7,"tiny-emitter":9}],4:[function(_dereq_,module,exports){
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],5:[function(_dereq_,module,exports){
var closest = _dereq_('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":4}],6:[function(_dereq_,module,exports){
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};

},{}],7:[function(_dereq_,module,exports){
var is = _dereq_('./is');
var delegate = _dereq_('delegate');

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;

},{"./is":6,"delegate":5}],8:[function(_dereq_,module,exports){
function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;

},{}],9:[function(_dereq_,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],10:[function(_dereq_,module,exports){
(function(window, vjs){
'use strict';
_dereq_('@hola.org/videojs-utils');
var Clipboard = _dereq_('clipboard');
// XXX michaelg remove when vjs5.1 exposes this interface
var vjs_merge = function(obj1, obj2){
    if (!obj2) { return obj1; }
    for (var key in obj2){
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
};
var settings_icon_svg = '<svg height="100%" width="100%" viewBox="0 0 16 16">'
        +'<path class="st0" d="M16,9.4V6.6h-2.2c-0.2-0.6-0.4-1.3-0.8-1.8l1.5-1.5l-1.9-1.9l-1.5,1.5C10.6,2.6,10,2.3,9.4,2.2V0H6.6v2.2'
        +'C6,2.3,5.4,2.6,4.8,2.9L3.3,1.4L1.4,3.3l1.5,1.5C2.6,5.4,2.3,6,2.2,6.6H0v2.7h2.2c0.2,0.6,0.4,1.3,0.8,1.8l-1.5,1.5l1.9,1.9l1.5-1.5'
        +'c0.5,0.3,1.2,0.6,1.8,0.8V16h2.7v-2.2c0.6-0.2,1.3-0.4,1.8-0.8l1.5,1.5l1.9-1.9l-1.5-1.5c0.3-0.5,0.6-1.2,0.8-1.8H16z M8,11'
        +'c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S9.7,11,8,11z"/>'
    +'</svg>';
var Menu = vjs.getComponent('Menu');
vjs.registerComponent('PopupMenu', vjs.extend(Menu, {
    className: 'vjs-rightclick-popup',
    popped: false,
    constructor: function(player, options){
        Menu.call(this, player, options);
        var player_ = player;
        this.addClass(this.className);
        this.hide();
        var _this = this;
        var opt = this.options_;
        var offset = opt.offset||5;
        this.addChild(new LogButton(player, {label: 'Download log'}));
        this.addChild(new CopyLogButton(player, {label: 'Copy debug info'}));
        if (opt.report)
        {
            opt.report = vjs.mergeOptions({label: 'Report playback issue'},
                opt.report);
            this.addChild(new ReportButton(player, opt.report));
        }
        if (opt.info)
        {
            opt.info = vjs.mergeOptions({label: 'Stats for nerds'}, opt.info);
            this.addChild(new InfoButton(player, opt.info));
        }
        if (opt.graph)
        {
            opt.graph = vjs.mergeOptions({label: 'CDN overlay'}, opt.graph);
            this.addChild(new GraphButton(player, opt.graph));
        }
        this.addChild(new MenuItemLink(player, {
            href: 'https://holacdn.com/player',
            label: 'About Hola Player',
        }));
        player_.on('contextmenu', function(evt){
            evt.preventDefault();
            if (_this.popped)
            {
                _this.hide();
                _this.popped = false;
            }
            else
            {
                _this.show();
                var oX = evt.offsetX;
                var oY = evt.offsetY;
                var left_shift =
                    _this.el_.offsetWidth+oX+offset-player_.el_.offsetWidth;
                left_shift = Math.max(0, left_shift);
                var top_shift =
                    _this.el_.offsetHeight+oY+offset-player_.el_.offsetHeight;
                top_shift = Math.max(0, top_shift);
                oX = oX-left_shift;
                oY = oY-top_shift;
                _this.el_.style.top=oY+'px';
                _this.el_.style.left=oX+'px';
                _this.popped = true;
                _this.check_items();
            }
        });
        player_.on('click', function(evt){
            if (_this.popped)
            {
                _this.hide();
                _this.popped = false;
                evt.stopPropagation();
                evt.preventDefault();
                return false;
            }
        });
        this.children().forEach(function(item){
            item.on('click', function(evt){
                _this.hide();
                _this.popped = false;
            });
        });
    },
    check_items: function(){
        this.children().forEach(function(item){
            if (item.is_visible)
                item.toggleClass('vjs-hidden', !item.is_visible());
        });
    },
}));
var MenuButton = vjs.getComponent('MenuButton');
vjs.registerComponent('SettingsButton', vjs.extend(MenuButton, {
    controlText_: 'Settings',
    constructor: function(player, options){
        MenuButton.call(this, player, options);
        player.one('play', vjs.bind(this, this.updateSelected));
        player.on('resolutionchange', vjs.bind(this, this.updateSelected));
        this.updateSelected();
    },
    createEl: function(){
        var settings_button = MenuButton.prototype.createEl.call(this);
        var icon = this.icon_ = document.createElement('div');
        icon.setAttribute('class', 'vjs-button-icon');
        icon.innerHTML = settings_icon_svg;
        settings_button.insertBefore(icon, settings_button.firstChild);
        return settings_button;
    },
    buildCSSClass: function(){
        var className = MenuButton.prototype.buildCSSClass.call(this);
        return className+' vjs-settings-button';
    },
    createItems: function(){
        var items = [];
        var player = this.player_;
        var quality = this.options_.quality;
        var sources = quality && quality.sources ? quality.sources :
            player.options_.sources;
        if (!sources || !sources.length)
            return [];
        var label;
        for (var i=0; i<sources.length; i+=1)
        {
            label = sources[i].label || (sources.length==1 ?
                'Auto' : ('Source '+(i+1)));
            items.push(new QualityButton(player, vjs_merge(sources[i], {
                label: label})));
        }
        return items;
    },
    createMenu: function(){
        var _this = this;
        var menu = MenuButton.prototype.createMenu.call(this);
        menu.addClass('vjs-menu-popup-on-click');
        // videojs removes the locking state on menu item click that causes
        // settings button to hide without updating buttonPressed state
        menu.children().forEach(function(component){
            component.on('click', function(){ _this.handleClick(); });
        });
        return menu;
    },
    handleClick: function(){
        var expanded_classname = 'vjs-settings-expanded';
        if (this.buttonPressed_)
        {
            this.player_.removeClass(expanded_classname);
            this.unpressButton();
        }
        else
        {
            this.player_.addClass(expanded_classname);
            this.pressButton();
        }
    },
    tooltipHandler: function(){
        return this.icon_;
    },
    updateSelected: function(){
        var selected = this.selectedLevel;
        this.menu.children().forEach(function(item){
            if (item.options_.src)
                item.selected(item.is_current_src());
            else
                item.selected(item.options_.level_id==selected);
        });
    },
    levelsChanged: function(levels){
        var current = (this.options_.quality||{}).sources||[];
        if (current.length!=levels.length)
            return true;
        for (var i=0; i<levels.length; i++)
        {
            if (current[i].level_id!=levels[i].id)
                return true;
        }
        return false;
    },
    updateQuality: function(data){
        var sources = [];
        var callback = data.callback;
        var levels = data.quality.list;
        // XXX bahaa/alexeym: highlight 'current' somehow especially if
        // selected==-1
        // var current = data.quality.current;
        this.selectedLevel = data.quality.selected;
        if (this.levelsChanged(levels))
        {
            levels.forEach(function(item){
                sources.push({level_id: item.id, label: item.label,
                    callback: callback});
            });
            this.options_.quality = this.options_.quality||{};
            this.options_.quality.sources = sources;
            this.update();
        }
        this.updateSelected();
    }
}));
var Component = vjs.getComponent('Component');
vjs.registerComponent('Overlay', vjs.extend(Component, {
    createEl: function(type, props){
        var custom_class = this.options_['class'];
        custom_class = custom_class ? ' '+custom_class : '';
        var proto_component = Component.prototype;
        var container = proto_component.createEl.call(this, 'div', vjs_merge({
            className: 'vjs-info-overlay'+custom_class,
        }, props));
        this.createContent(container);
        return container;
    },
    createContent: function(container){},
}));
function round(val){
    if (typeof val!='number')
        return val;
    return val.toFixed(3);
}
function is_wrapper_attached(check_bws){
    var hola = window.hola_cdn;
    return hola && hola.get_wrapper() && (!check_bws || !!hola._get_bws());
}
var Overlay = vjs.getComponent('Overlay');
vjs.registerComponent('InfoOverlay', vjs.extend(Overlay, {
    constructor: function(player, options){
        this.info_data = {
            duration: {
                units: 'sec',
                title: 'Duration',
                get: function(p){ return round(p.duration()); },
            },
            position: {
                units: 'sec',
                title: 'Position',
                get: function(p){
                    return round(p.currentTime());
                },
            },
            buffered: {
                units: 'sec',
                title: 'Current buffer',
                get: function(p){
                    var range = p.buffered();
                    var pos = p.currentTime();
                    if (range && range.length)
                    {
                        for (var i=0; i<range.length; i+=1)
                        {
                            if (range.start(i)<=pos && range.end(i)>=pos)
                                return round(range.end(i)-pos);
                        }
                    }
                    return '--';
                },
            },
            downloaded: {
                units: 'sec',
                title: 'Downloaded',
                get: function(p){
                    var range = p.buffered();
                    var buf_sec = 0;
                    if (range && range.length)
                    {
                        for (var i=0; i<range.length; i+=1)
                            buf_sec += range.end(i)-range.start(i);
                    }
                    return round(buf_sec);
                },
            },
        };
        Overlay.call(this, player, options);
    },
    createContent: function(container){
        var _this = this;
        var player = this.player_;
        function create_el(el, opt){
            opt = opt ? vjs_merge(opt) : opt;
            var proto_component = Component.prototype;
            return proto_component.createEl.call(_this, el, opt);
        }
        var title = create_el('div', {
            className: 'vjs-info-overlay-title',
            innerHTML: 'Technical info',
        });
        var close_btn = create_el('div', {className: 'vjs-info-overlay-x'});
        close_btn.addEventListener('click', function(){ _this.toggle(); });
        var content = create_el('div', {
            className: 'vjs-info-overlay-content'});
        var list = create_el('ul', {className: 'vjs-info-overlay-list'});
        var item;
        var title_text;
        for (var i in this.info_data)
        {
            item = create_el('li', {className: 'vjs-info-overlay-list-item'});
            title_text = this.info_data[i].title;
            if (this.info_data[i].units)
                title_text += ' ['+this.info_data[i].units+']';
            title_text += ': ';
            item.appendChild(create_el('strong', {
                innerHTML: title_text}));
            this.info_data[i].el = create_el('span');
            item.appendChild(this.info_data[i].el);
            list.appendChild(item);
        }
        content.appendChild(list);
        container.appendChild(title);
        container.appendChild(close_btn);
        container.appendChild(content);
        this.update();
        player.on('timeupdate', function(){ _this.update(); });
        // force updates when player is paused
        setInterval(function(){ _this.update(); }, 1000);
    },
    update: function(){
        var player = this.player_;
        var info = this.info_data;
        for (var i in info)
            info[i].el.innerHTML = info[i].get(player);
    },
    toggle: function(caller){
        if (caller)
            this.last_caller = caller;
        if (this.visible)
        {
            this.visible = false;
            if (this.last_caller)
                this.last_caller.selected(false);
            this.addClass('vjs-hidden');
            return;
        }
        this.update();
        this.visible = true;
        this.removeClass('vjs-hidden');
    },
}));
vjs.registerComponent('NotifyOverlay', vjs.extend(Overlay, {
    createContent: function(container){
        var _this = this;
        function create_el(el, opt){
            opt = opt ? vjs_merge(opt) : opt;
            var proto_component = Component.prototype;
            return proto_component.createEl.call(_this, el, opt);
        }
        var title = create_el('div', {
            className: 'vjs-notify-overlay-title',
            innerHTML: 'Issue report sent.',
        });
        var content = create_el('div', {
            className: 'vjs-notify-overlay-content',
            innerHTML: 'Thank you!',
        });
        container.appendChild(title);
        container.appendChild(content);
    },
    flash: function(){
        if (this.visible)
            return;
        this.visible = true;
        this.removeClass('vjs-hidden');
        var _this = this;
        setTimeout(function(){
            _this.addClass('vjs-notify-flash');
        }, 50);
        setTimeout(function(){
            _this.visible = false;
            _this.removeClass('vjs-notify-flash');
            _this.addClass('vjs-hidden');
        }, 3500);
    },
}));
var MenuItem = vjs.getComponent('MenuItem');
vjs.registerComponent('MenuItemLink', vjs.extend(MenuItem, {
    createEl: function(type, props){
        var prot = MenuItem.prototype;
        var label = this.localize(this.options_.label);
        var el = prot.createEl.call(this, 'li', vjs_merge({
            className: 'vjs-menu-item vjs-menu-item-link',
            innerHTML: '',
        }, props));
        this.link = Component.prototype.createEl('a', {
            className: 'vjs-menu-link',
            innerHTML: label,
        }, {
            target: '_blank',
            href: this.options_.href||'#',
        });
        el.appendChild(this.link);
        return el;
    },
    handleClick: function(e){ e.stopPropagation(); },
}));
var MenuItemLink = vjs.getComponent('MenuItemLink');
vjs.registerComponent('ReportButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        MenuItem.call(this, player, options);
        var player_ = player;
        this.on('click', function(){
            player_.trigger({type: 'problem_report'});
            var overlay;
            if (overlay = player.getChild('NotifyOverlay'))
                overlay.flash();
            this.selected(false);
        });
    },
    is_visible: is_wrapper_attached,
}));
var ReportButton = vjs.getComponent('ReportButton');
vjs.registerComponent('LogButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        MenuItem.call(this, player, options);
        var player_ = player;
        this.on('click', function(){
            player_.trigger({type: 'save_logs'});
            this.selected(false);
        });
    },
    is_visible: is_wrapper_attached,
}));
var LogButton = vjs.getComponent('LogButton');
vjs.registerComponent('GraphButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        MenuItem.call(this, player, options);
        var player_ = player;
        this.on('click', function(){
            player_.trigger({type: 'cdn_graph_overlay'});
            this.selected(false);
        });
    },
    is_visible: is_wrapper_attached.bind(null, true),
}));
var GraphButton = vjs.getComponent('GraphButton');
vjs.registerComponent('CopyLogButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        MenuItem.call(this, player, options);
        var player_ = player;
        this.clipboard = new Clipboard(this.el_, {
            text: function(){
                if (!player_.hola_logs)
                    return 'Can\'t find hola_logs method!';
                return player_.hola_logs();
            },
        });
    },
    dispose: function(){
        this.clipboard.destroy();
        MenuItem.prototype.dispose.call(this);
    },
    is_visible: is_wrapper_attached,
}));
var CopyLogButton = vjs.getComponent('CopyLogButton');
vjs.registerComponent('InfoButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        MenuItem.call(this, player, options);
        this.on('click', function(){
            var overlay;
            if (overlay = player.getChild('InfoOverlay'))
                overlay.toggle(this);
        });
    }
}));
var InfoButton = vjs.getComponent('InfoButton');
vjs.registerComponent('MenuLabel', vjs.extend(Component, {
    createEl: function(type, props){
        var prot = Component.prototype;
        return prot.createEl.call(this, 'li', vjs_merge({
            className: 'vjs-menu-item vjs-menu-label',
            innerHTML: this.options_.label,
        }, props));
    },
}));
var MenuLabel = vjs.getComponent('MenuLabel');
vjs.registerComponent('QualityButton', vjs.extend(MenuItem, {
    constructor: function(player, options){
        options = vjs_merge({selectable: true}, options);
        MenuItem.call(this, player, options);
        if (options['default'])
            this.player_.src(options.src);
    },
    is_current_src: function(){
        var player = this.player_;
        var current_src = player.cache_.src;
        var hola = window.hola_cdn;
        var hola_player = hola && hola.get_player ? hola.get_player() : null;
        // in case of hola_cdn attached get origin video url insteab of blob
        if (hola_player && hola_player.vjs===player)
            current_src = hola_player.get_url();
        return this.options_.src==current_src;
    },
    handleClick: function(){
        var player = this.player_;
        var quality = this.options_;
        var level_id = this.options_.level_id;
        // XXX volodymyr: implemented for html5 and adaptive only, flash
        // requires extra additions, check
        // https://github.com/vidcaster/video-js-resolutions
        if (player.techName_!=='Html5' && level_id===undefined)
            return;
        var event = new window.CustomEvent('beforeresolutionchange');
        player.trigger(event, quality);
        if (event.defaultPrevented)
            return;
        if (level_id!==undefined)
        {
            if (this.options_.callback)
                this.options_.callback(level_id);
            player.trigger('resolutionchange');
            return this;
        }
        if (this.is_current_src())
        {
            player.trigger('resolutionchange');
            return this; // basically a no-op
        }
        var current_time = player.currentTime();
        var remain_paused = player.paused();
        player.pause();
        player.src(quality.src);
        player.ready(function(){
            player.one('loadeddata', vjs.bind(this, function(){
                this.currentTime(current_time);
            }));
            player.trigger('resolutionchange');
            if (!remain_paused)
            {
                player.load();
                player.play();
            }
        });
    },
}));
var QualityButton = vjs.getComponent('QualityButton');

vjs.plugin('settings', function(opt){
    var video = this;
    if (opt===undefined||opt===true)
        opt = {info: true, report: true, quality: false};
    opt = vjs.mergeOptions({}, opt);
    video.ready(function(){
        function local_storage_set(key, value){
            try { vjs.utils.localStorage.setItem(key, value); } catch(e){}
        }
        function local_storage_get(key){
            try { return vjs.utils.localStorage.getItem(key); }
            catch(e){ return null; }
        }
        function sources_normalize(sources, label_sav){
            var i, source_def, source_sav;
            sources = sources.filter(function(e){ return e.src; });
            for (i=0; i<sources.length; i+=1)
            {
                if (!sources[i].label)
                    sources[i].label = sources[i].type;
                if (!source_def && sources[i]['default']!==undefined)
                    source_def = sources[i];
                if (label_sav && label_sav==sources[i].label &&
                    sources[i]['prevent-default']===undefined)
                {
                    source_sav = sources[i];
                }
            }
            for (i=0; i<sources.length; i+=1)
            {
                sources[i]['default'] =
                    source_sav ? sources[i]===source_sav :
                    source_def ? sources[i]===source_def : !i;
            }
            return sources;
        }
        function add_settings_button(){
            return video.controlBar.addChild('SettingsButton',
                vjs.mergeOptions({}, opt));
        }
        // XXX bahaa/alexeym: make it an opt instead of detecting provider
        var is_hls_provider =
            video.tech_.flashlsProvider||video.tech_.hlsProvider;
        if (opt.quality && !is_hls_provider)
        {
            var quality_key = 'vjs5_quality';
            if (opt.quality===true)
                opt.quality = {sources: video.options_.sources};
            opt.quality.sources = sources_normalize(opt.quality.sources,
                local_storage_get(quality_key));
            video.on('resolutionchange', function(){
                var sources = opt.quality.sources;
                for (var i=0; i<sources.length; i++)
                {
                    if (video.currentSrc()!=sources[i].src)
                        continue;
                    local_storage_set(quality_key, sources[i].label);
                    break;
                }
            });
        }
        var settings_button;
        if (opt.quality && opt.quality.sources && opt.quality.sources.length>1)
            settings_button = add_settings_button();
        if (opt.quality && is_hls_provider)
        {
            video.tech_.on('loadedqualitydata', function(e, data){
                var sources = data && data.quality && data.quality.list || [];
                if (sources.length<2)
                    return;
                if (!settings_button)
                    settings_button = add_settings_button();
                settings_button.updateQuality(data);
            });
        }
        if (opt.info)
        {
            video.addChild('InfoOverlay', {})
            .addClass('vjs-hidden');
        }
        if (opt.report)
        {
            video.addChild('NotifyOverlay', {'class': 'vjs-notify-overlay'})
            .addClass('vjs-hidden');
        }
        if (opt.volume || opt.volume===undefined)
        {
            var volume_key = 'vjs5_volume', mute_key = 'vjs5_mute';
            var volume = vjs.mergeOptions({level: 1, mute: false}, opt.volume);
            // quality configuration above might have reset the source
            // thus make sure video is ready before changing the volume
            video.ready(function(){
                if (!volume.override_local_storage)
                {
                    var ls_level, ls_mute;
                    if ((ls_level = local_storage_get(volume_key))!=null)
                        volume.level = ls_level;
                    if ((ls_mute = local_storage_get(mute_key))!=null)
                        volume.mute = ls_mute=='true';
                }
                video.volume(volume.level);
                video.muted(volume.mute);
            });
            video.on('volumechange', function(){
                local_storage_set(volume_key, video.volume());
                local_storage_set(mute_key, video.muted());
            });
        }
        var menu = video.addChild('PopupMenu', vjs.mergeOptions({}, opt));
        video.on('hola.wrapper_attached', menu.check_items.bind(menu));
        video.on('hola.wrapper_detached', menu.check_items.bind(menu));
    });
});

}(window, window.videojs));

},{"@hola.org/videojs-utils":1,"clipboard":3}]},{},[10]);
