(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _bind = Function.prototype.bind;

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _Component = require('./components/Component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _Register = require('./components/Register.js');

var _Register2 = _interopRequireWildcard(_Register);

(function main($window, $document) {

    'use strict';

    /**
     * @module Maple
     * @link https://github.com/Wildhoney/Maple.js
     * @author Adam Timberlake
     */

    var Maple =

    /**
     * @constructor
     * @param {Array} modules
     * @return {void}
     */
    function Maple() {
        for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
            modules[_key] = arguments[_key];
        }

        _classCallCheck(this, Maple);

        $document.addEventListener('DOMContentLoaded', function () {
            new (_bind.apply(_Register2['default'], [null].concat(_toConsumableArray(modules))))();
        });
    };

    $window.Maple = Maple;
    $window.Maple.Component = _Component2['default'];
})(window, document);

},{"./components/Component.js":2,"./components/Register.js":4}],2:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @module Maple
 * @submodule Component
 * @link https://github.com/Wildhoney/Maple.js
 * @author Adam Timberlake
 */

var Component = (function (_React$Component) {
    function Component() {
        _classCallCheck(this, Component);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(Component, _React$Component);

    _createClass(Component, [{
        key: "addEventListener",

        /**
         * @constructor
         * @param {String} name
         * @return {Component}
         */
        value: function addEventListener(name) {

            this.props.dispatcher.addEventListener(name, { reference: this, callback: function callback(event) {
                    return event;
                } });
        }
    }, {
        key: "removeEventListener",

        /**
         * @method removeEventListener
         * @param {String} name
         * @return {void}
         */
        value: function removeEventListener(name) {
            this.props.dispatcher.removeEventListener(name, this);
        }
    }]);

    return Component;
})(React.Component);

exports["default"] = Component;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @module Maple
 * @submodule Dispatcher
 * @link https://github.com/Wildhoney/Maple.js
 * @author Adam Timberlake
 */

var Dispatcher = (function () {

    /**
     * @constructor
     * @return {Dispatcher}
     */

    function Dispatcher() {
        var _this = this;

        _classCallCheck(this, Dispatcher);

        this.events = [];

        setTimeout(function () {
            return _this.fireEvent('people');
        }, 5500);
    }

    _createClass(Dispatcher, [{
        key: 'fireEvent',

        /**
         * @method fireEvent
         * @param {String} name
         * @return {void}
         */
        value: function fireEvent(name) {

            var eventFns = this.events.filter(function (event) {
                return event.name === name;
            }),
                people = ['Buster', 'Miss Kittens', 'Kipper', 'Splodge', 'Mango'];

            eventFns.forEach(function (event) {
                event.reference.setState({ names: people.join(',') });
            });
        }
    }, {
        key: 'addEventListener',

        /**
         * @method addEventListener
         * @param {String} name
         * @param {Object} [options={}]
         * @return {void}
         */
        value: function addEventListener(name) {
            var options = arguments[1] === undefined ? { reference: null, callback: function callback() {} } : arguments[1];

            this.events.push({
                name: name,
                reference: options.reference,
                callback: options.callback
            });
        }
    }, {
        key: 'removeEventListener',

        /**
         * @method removeEventListener
         * @param {String} name
         * @param {Object} reference
         * @return {void}
         */
        value: function removeEventListener(name, reference) {
            return void { name: name, reference: reference };
        }
    }]);

    return Dispatcher;
})();

exports['default'] = Dispatcher;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _events = require('./../helpers/Events.js');

var _events2 = _interopRequireWildcard(_events);

var _css = require('./../helpers/Stylesheets.js');

var _css2 = _interopRequireWildcard(_css);

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _logger = require('./../helpers/Logger.js');

var _logger2 = _interopRequireWildcard(_logger);

var _Dispatcher = require('./Dispatcher.js');

var _Dispatcher2 = _interopRequireWildcard(_Dispatcher);

/**
 * @module Maple
 * @submodule Register
 * @link https://github.com/Wildhoney/Maple.js
 * @author Adam Timberlake
 */

var Register = (function () {

    /**
     * @constructor
     * @param {Array} modules
     * @return {Register}
     */

    function Register() {
        for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
            modules[_key] = arguments[_key];
        }

        _classCallCheck(this, Register);

        this.components = [];
        this.dispatcher = new _Dispatcher2['default']();
        this.debug = true;

        this.register.apply(this, modules);
    }

    _createClass(Register, [{
        key: 'getImports',

        /**
         * Responsible for finding all of the HTML imports and returning a promise when each of the
         * HTML imports have been successfully imported. This allows us to access the `ownerDocument`
         * on each of the link elements knowing that it isn't null.
         *
         * @method getImports
         * @return {Array}
         */
        value: function getImports() {

            var importDocuments = document.querySelectorAll('link[rel="import"]');

            return _utility2['default'].toArray(importDocuments).map(function (importDocument) {

                return new Promise(function (resolve) {
                    importDocument.addEventListener('load', function (event) {
                        return resolve(event.path[0]);
                    });
                });
            });
        }
    }, {
        key: 'findModules',

        /**
         * Responsible for finding all of the HTML imports in the current document. It will be invoked if
         * the developer doesn't explicitly pass in an array of modules to load via the Maple constructor when
         * instantiating a new application.
         *
         * @method findModules
         * @return {Array}
         */
        value: function findModules() {

            return _utility2['default'].toArray(document.querySelectorAll('link[rel="import"]')).map(function (importDocument) {

                var importPath = _utility2['default'].getImportPath(importDocument.getAttribute('href'));
                return void importPath;
            });
        }
    }, {
        key: 'findScripts',

        /**
         * @method findScripts
         * @param {Object} importDocument
         * @return {Array}
         */
        value: function findScripts(importDocument) {
            var templateElement = importDocument.querySelector('template');
            return _utility2['default'].toArray(templateElement.content.querySelectorAll('script[type="text/javascript"]'));
        }
    }, {
        key: 'registerCustomElement',

        /**
         * Responsible for creating the custom element using document.registerElement, and then appending
         * the associated React.js component.
         *
         * @method registerCustomElement
         * @param {String} className
         * @param {Object} component
         * @param {String} modulePath
         * @return {void}
         */
        value: function registerCustomElement(className, component, modulePath) {

            var elementName = _utility2['default'].toSnakeCase(className),
                dispatcher = this.dispatcher;

            _logger2['default'].send('Registered Component: ' + elementName, _logger2['default'].type.component);
            var prototype = Object.create(HTMLElement.prototype, {

                /**
                 * @property attachedCallback
                 * @type {Object}
                 */
                attachedCallback: {

                    /**
                     * @method value
                     * @return {void}
                     */
                    value: function value() {
                        var _this = this;

                        component.defaultProps = {
                            path: modulePath,
                            element: this.cloneNode(true),
                            dispatcher: dispatcher
                        };

                        this.innerHTML = '';

                        // Import attributes from the element and transfer to the React.js class.
                        for (var index = 0, attributes = this.attributes; index < attributes.length; index++) {

                            var attribute = attributes.item(index);

                            if (attribute.value) {
                                var _name = attribute.name.replace(/^data-/i, '');
                                component.defaultProps[_name] = attribute.value;
                            }
                        }

                        var renderedElement = React.createElement(component),
                            contentElement = document.createElement('content'),
                            shadowRoot = this.createShadowRoot();

                        shadowRoot.appendChild(contentElement);
                        _events2['default'].delegate(contentElement, React.render(renderedElement, contentElement));

                        Promise.all(_css2['default'].associate(modulePath, shadowRoot)).then(function () {
                            _this.removeAttribute('unresolved');
                            _this.setAttribute('resolved', '');
                        });
                    }

                }

            });

            document.registerElement(elementName, {
                prototype: prototype
            });
        }
    }, {
        key: 'register',

        /**
         * Entry point for the component initialisation. It accepts an optional parameter to initialise
         * modules explicitly, otherwise this.findModules will be invoked, and modules will be found
         * automatically from the current HTML imports of the document.
         *
         * @method delegate
         * @param {Array} modules
         * @return {void}
         */
        value: function register() {
            var _this2 = this;

            for (var _len2 = arguments.length, modules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                modules[_key2] = arguments[_key2];
            }

            this.getImports().forEach(function (promise) {

                promise.then(function (linkElement) {

                    var scriptElements = _this2.findScripts(linkElement['import']),
                        modulePath = _utility2['default'].getModulePath(linkElement.getAttribute('href')),
                        moduleName = _utility2['default'].getModuleName(linkElement.getAttribute('href'));

                    if (modules.length && ! ~modules.indexOf(moduleName)) {
                        return;
                    }

                    _logger2['default'].send(moduleName, _logger2['default'].type.module);

                    scriptElements.forEach(function (scriptElement) {

                        var scriptSrc = scriptElement.getAttribute('src').split('.').slice(0, -1).join('/'),
                            scriptPath = '' + modulePath + '/' + scriptSrc;

                        System['import'](scriptPath).then(function (Register) {

                            var className = Register['default'].toString().match(/(?:function|class)\s*([a-z]+)/i)[1],
                                component = _this2.components[className] = Register['default'];

                            _this2.registerCustomElement(className, component, modulePath);
                        });
                    });
                });
            });
        }
    }]);

    return Register;
})();

exports['default'] = Register;
module.exports = exports['default'];

},{"./../helpers/Events.js":5,"./../helpers/Logger.js":6,"./../helpers/Stylesheets.js":7,"./../helpers/Utility.js":8,"./Dispatcher.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @method delegate
         * @param {HTMLElement} contentElement
         * @param {ReactClass.createClass.Constructor} component
         * @return {void}
         */
        delegate: function delegate(contentElement, component) {

            var aElement = document.createElement('a'),
                events = [],
                eventEsque = /on[a-z]+/i;

            Object.keys(aElement).forEach(function (key) {

                if (key.match(eventEsque)) {
                    events.push(key.replace(/^on/, ''));
                }
            });

            /**
             * @method getEvent
             * @param {String} eventName
             * @param {Object} properties
             * @return {Boolean}
             */
            function getEvent(eventName, properties) {

                var matchName = new RegExp(eventName, 'i'),
                    eventFn = null;

                Object.keys(properties).forEach(function (property) {

                    var propertyName = property.match(matchName);

                    if (propertyName) {
                        eventFn = properties[propertyName];
                    }
                });

                return eventFn;
            }

            /**
             * @method findEvents
             * @param {Object} node
             * @param {String} reactId
             * @param {String} eventName
             * @return {Array}
             */
            function findEvents(_x, _x2, _x3) {
                var _again = true;

                _function: while (_again) {
                    events = rootEventFn = children = id = item = childEventFn = undefined;
                    _again = false;
                    var node = _x,
                        reactId = _x2,
                        eventName = _x3;

                    var events = [],
                        rootEventFn = getEvent(eventName, node._currentElement._store.props);

                    if (rootEventFn) {

                        // Found event in root!
                        events.push(rootEventFn);
                    }

                    if (node._rootNodeID === reactId) {
                        return events;
                    }

                    var children = node._renderedChildren;

                    for (var id in children) {

                        if (children.hasOwnProperty(id)) {

                            var item = children[id];

                            if (item._rootNodeID === reactId) {

                                var childEventFn = getEvent(eventName, item._instance.props);

                                if (childEventFn) {

                                    // Found event in children!
                                    events.push(childEventFn);
                                }

                                return events;
                            }

                            if (item._renderedChildren) {
                                _x = item;
                                _x2 = reactId;
                                _x3 = eventName;
                                _again = true;
                                continue _function;
                            }
                        }
                    }
                }
            }

            /**
             * @method createEvent
             * @return {void}
             */
            function createEvent(eventName) {

                contentElement.addEventListener(eventName, function onClick(event) {

                    if (!(event.target instanceof HTMLElement)) {
                        return;
                    }

                    var components = component._reactInternalInstance._renderedComponent._renderedComponent,
                        eventFn = 'on' + event.type,
                        events = findEvents(components, event.target.getAttribute('data-reactid'), eventFn);

                    events.forEach(function (eventFn) {
                        eventFn.apply(component);
                    });
                });
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var eventName = _step.value;

                    createEvent(eventName);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

    };
})();

module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @constant type
         * @type {Object}
         */
        type: {
            module: 'module',
            component: 'component'
        },

        /**
         * @method send
         * @param {String} message
         * @param {String} type
         * @return {void}
         */
        send: function send(message, type) {

            switch (type) {

                case this.type.module:
                    console.log('%c Module: ' + message + ' ', 'color: white; border-radius: 3px; padding: 2px 0; font-size: 9px; background: linear-gradient(to bottom,  #ef3232 0%,#d63a2c 100%)');
                    break;

                case this.type.component:
                    console.log('%c ' + message, 'font-size: 9px; color: rgba(0, 0, 0, .75)');
                    break;

                default:
                    console.log(message);

            }
        }

    };
})();

module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

exports['default'] = (function main($document) {

    'use strict';

    return {

        /**
         * @property linkSelector
         * @type {String}
         */
        linkSelector: 'link[type="text/css"]',

        /**
         * @method associate
         * @param {String} componentPath
         * @param {ShadowRoot} shadowRoot
         * @return {Array}
         */
        associate: function associate(componentPath, shadowRoot) {

            var promises = [];

            _utility2['default'].toArray(document.querySelectorAll('link')).forEach(function (link) {

                var href = link.getAttribute('href');

                if (href.match(componentPath)) {

                    var templateElement = link['import'].querySelector('template'),
                        templateContent = templateElement.content,
                        cssDocuments = _utility2['default'].toArray(templateContent.querySelectorAll('link')).map(function (linkElement) {
                        return '' + componentPath + '/' + linkElement.getAttribute('href');
                    });

                    cssDocuments.forEach(function (cssDocument) {

                        var styleElement = $document.createElement('style');
                        styleElement.setAttribute('type', 'text/css');

                        promises.push(new Promise(function (resolve) {

                            fetch(cssDocument).then(function (response) {
                                return response.text();
                            }).then(function (body) {
                                styleElement.innerHTML = body;
                                shadowRoot.appendChild(styleElement);
                                resolve(styleElement.innerHTML);
                            });
                        }));
                    });
                }
            });

            return promises;
        }

    };
})(document);

module.exports = exports['default'];

},{"./../helpers/Utility.js":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @method toSnakeCase
         * @param {String} camelCase
         * @param {String} [joiner='-']
         * @return {String}
         */
        toSnakeCase: function toSnakeCase(camelCase) {
            var joiner = arguments[1] === undefined ? '-' : arguments[1];

            return camelCase.split(/([A-Z][a-z]{0,})/g).filter(function (parts) {
                return parts;
            }).join(joiner).toLowerCase();
        },

        /**
         * @method toArray
         * @param {*} arrayLike
         * @return {Array}
         */
        toArray: function toArray(arrayLike) {
            return Array.from ? Array.from(arrayLike) : Array.prototype.slice.apply(arrayLike);
        },

        /**
         * @method getModulePath
         * @param {String} importPath
         * @return {String}
         */
        getModulePath: function getModulePath(importPath) {
            return importPath.split('/').slice(0, -1).join('/');
        },

        /**
         * @method getModuleName
         * @param {String} importPath
         * @return {String}
         */
        getModuleName: function getModuleName(importPath) {
            return importPath.split('/').slice(0, -1).pop();
        }

    };
})();

module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvY29tcG9uZW50cy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvY29tcG9uZW50cy9EaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2NvbXBvbmVudHMvUmVnaXN0ZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2dnZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9TdHlsZXNoZWV0cy5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9oZWxwZXJzL1V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O3lCQ0FzQiwyQkFBMkI7Ozs7d0JBQzNCLDBCQUEwQjs7OztBQUVoRCxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7O0FBRS9CLGdCQUFZLENBQUM7Ozs7Ozs7O1FBT1AsS0FBSzs7Ozs7OztBQU9JLGFBUFQsS0FBSyxHQU9pQjswQ0FBVCxPQUFPO0FBQVAsbUJBQU87Ozs4QkFQcEIsS0FBSzs7QUFTSCxpQkFBUyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakQscUZBQWdCLE9BQU8sT0FBRTtTQUM1QixDQUFDLENBQUM7S0FFTjs7QUFJTCxXQUFP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RUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ25EOztLQUVKLENBQUM7Q0FFTCxDQUFBLEVBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvQ29tcG9uZW50LmpzJztcbmltcG9ydCBSZWdpc3RlciAgZnJvbSAnLi9jb21wb25lbnRzL1JlZ2lzdGVyLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgTWFwbGVcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gICAgICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAgICAgKi9cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2R1bGVzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciguLi5tb2R1bGVzKSB7XG5cbiAgICAgICAgICAgICRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ldyBSZWdpc3RlciguLi5tb2R1bGVzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgICR3aW5kb3cuTWFwbGUgICAgICAgICAgID0gTWFwbGU7XG4gICAgJHdpbmRvdy5NYXBsZS5Db21wb25lbnQgPSBDb21wb25lbnQ7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8qKlxuICogQG1vZHVsZSBNYXBsZVxuICogQHN1Ym1vZHVsZSBDb21wb25lbnRcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKG5hbWUpIHtcblxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCB7IHJlZmVyZW5jZTogdGhpcywgY2FsbGJhY2s6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9fSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHRoaXMpO1xuICAgIH1cblxufSIsIi8qKlxuICogQG1vZHVsZSBNYXBsZVxuICogQHN1Ym1vZHVsZSBEaXNwYXRjaGVyXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwYXRjaGVyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge0Rpc3BhdGNoZXJ9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZmlyZUV2ZW50KCdwZW9wbGUnKSwgNTUwMCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGZpcmVFdmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBmaXJlRXZlbnQobmFtZSkge1xuXG4gICAgICAgIGxldCBldmVudEZucyA9IHRoaXMuZXZlbnRzLmZpbHRlcigoZXZlbnQpID0+IGV2ZW50Lm5hbWUgPT09IG5hbWUpLFxuICAgICAgICAgICAgcGVvcGxlICAgPSBbJ0J1c3RlcicsICdNaXNzIEtpdHRlbnMnLCAnS2lwcGVyJywgJ1NwbG9kZ2UnLCAnTWFuZ28nXTtcblxuICAgICAgICBldmVudEZucy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucmVmZXJlbmNlLnNldFN0YXRlKHsgbmFtZXM6IHBlb3BsZS5qb2luKCcsJykgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKG5hbWUsIG9wdGlvbnMgPSB7IHJlZmVyZW5jZTogbnVsbCwgY2FsbGJhY2s6ICgpID0+IHt9IH0pIHtcblxuICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICByZWZlcmVuY2U6IG9wdGlvbnMucmVmZXJlbmNlLFxuICAgICAgICAgICAgY2FsbGJhY2s6IG9wdGlvbnMuY2FsbGJhY2tcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgcmVmZXJlbmNlKSB7XG4gICAgICAgIHJldHVybiB2b2lkIHsgbmFtZSwgcmVmZXJlbmNlIH07XG4gICAgfVxuXG59IiwiaW1wb3J0IGV2ZW50cyAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgY3NzICAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvU3R5bGVzaGVldHMuanMnO1xuaW1wb3J0IHV0aWxpdHkgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZ2dlciAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0xvZ2dlci5qcyc7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL0Rpc3BhdGNoZXIuanMnO1xuXG4vKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgUmVnaXN0ZXJcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdGVyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZHVsZXNcbiAgICAgKiBAcmV0dXJuIHtSZWdpc3Rlcn1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5tb2R1bGVzKSB7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gICAgICAgIHRoaXMuZGVidWcgICAgICA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciguLi5tb2R1bGVzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgSFRNTCBpbXBvcnRzIGFuZCByZXR1cm5pbmcgYSBwcm9taXNlIHdoZW4gZWFjaCBvZiB0aGVcbiAgICAgKiBIVE1MIGltcG9ydHMgaGF2ZSBiZWVuIHN1Y2Nlc3NmdWxseSBpbXBvcnRlZC4gVGhpcyBhbGxvd3MgdXMgdG8gYWNjZXNzIHRoZSBgb3duZXJEb2N1bWVudGBcbiAgICAgKiBvbiBlYWNoIG9mIHRoZSBsaW5rIGVsZW1lbnRzIGtub3dpbmcgdGhhdCBpdCBpc24ndCBudWxsLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRJbXBvcnRzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SW1wb3J0cygpIHtcblxuICAgICAgICBsZXQgaW1wb3J0RG9jdW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9XCJpbXBvcnRcIl0nKTtcblxuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGltcG9ydERvY3VtZW50cykubWFwKChpbXBvcnREb2N1bWVudCkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBpbXBvcnREb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4gcmVzb2x2ZShldmVudC5wYXRoWzBdKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgSFRNTCBpbXBvcnRzIGluIHRoZSBjdXJyZW50IGRvY3VtZW50LiBJdCB3aWxsIGJlIGludm9rZWQgaWZcbiAgICAgKiB0aGUgZGV2ZWxvcGVyIGRvZXNuJ3QgZXhwbGljaXRseSBwYXNzIGluIGFuIGFycmF5IG9mIG1vZHVsZXMgdG8gbG9hZCB2aWEgdGhlIE1hcGxlIGNvbnN0cnVjdG9yIHdoZW5cbiAgICAgKiBpbnN0YW50aWF0aW5nIGEgbmV3IGFwcGxpY2F0aW9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBmaW5kTW9kdWxlc1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZpbmRNb2R1bGVzKCkge1xuXG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9XCJpbXBvcnRcIl0nKSkubWFwKChpbXBvcnREb2N1bWVudCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgaW1wb3J0UGF0aCA9IHV0aWxpdHkuZ2V0SW1wb3J0UGF0aChpbXBvcnREb2N1bWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBpbXBvcnRQYXRoO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmaW5kU2NyaXB0c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbXBvcnREb2N1bWVudFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZpbmRTY3JpcHRzKGltcG9ydERvY3VtZW50KSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUVsZW1lbnQgPSBpbXBvcnREb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZW1wbGF0ZScpO1xuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KHRlbXBsYXRlRWxlbWVudC5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCJdJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgY3VzdG9tIGVsZW1lbnQgdXNpbmcgZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50LCBhbmQgdGhlbiBhcHBlbmRpbmdcbiAgICAgKiB0aGUgYXNzb2NpYXRlZCBSZWFjdC5qcyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1vZHVsZVBhdGhcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3VzdG9tRWxlbWVudChjbGFzc05hbWUsIGNvbXBvbmVudCwgbW9kdWxlUGF0aCkge1xuXG4gICAgICAgIGxldCBlbGVtZW50TmFtZSA9IHV0aWxpdHkudG9TbmFrZUNhc2UoY2xhc3NOYW1lKSxcbiAgICAgICAgICAgIGRpc3BhdGNoZXIgID0gdGhpcy5kaXNwYXRjaGVyO1xuXG4gICAgICAgIGxvZ2dlci5zZW5kKGBSZWdpc3RlcmVkIENvbXBvbmVudDogJHtlbGVtZW50TmFtZX1gLCBsb2dnZXIudHlwZS5jb21wb25lbnQpO1xuICAgICAgICBsZXQgcHJvdG90eXBlICAgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhdHRhY2hlZENhbGxiYWNrXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhdHRhY2hlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiAgICB0aGlzLmNsb25lTm9kZSh0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZXI6IGRpc3BhdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltcG9ydCBhdHRyaWJ1dGVzIGZyb20gdGhlIGVsZW1lbnQgYW5kIHRyYW5zZmVyIHRvIHRoZSBSZWFjdC5qcyBjbGFzcy5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzOyBpbmRleCA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLml0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBhdHRyaWJ1dGUubmFtZS5yZXBsYWNlKC9eZGF0YS0vaSwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kZWZhdWx0UHJvcHNbbmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmRlbGVnYXRlKGNvbnRlbnRFbGVtZW50LCBSZWFjdC5yZW5kZXIocmVuZGVyZWRFbGVtZW50LCBjb250ZW50RWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGNzcy5hc3NvY2lhdGUobW9kdWxlUGF0aCwgc2hhZG93Um9vdCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3VucmVzb2x2ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyZXNvbHZlZCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtcbiAgICAgICAgICAgIHByb3RvdHlwZTogcHJvdG90eXBlXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW50cnkgcG9pbnQgZm9yIHRoZSBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uIEl0IGFjY2VwdHMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRvIGluaXRpYWxpc2VcbiAgICAgKiBtb2R1bGVzIGV4cGxpY2l0bHksIG90aGVyd2lzZSB0aGlzLmZpbmRNb2R1bGVzIHdpbGwgYmUgaW52b2tlZCwgYW5kIG1vZHVsZXMgd2lsbCBiZSBmb3VuZFxuICAgICAqIGF1dG9tYXRpY2FsbHkgZnJvbSB0aGUgY3VycmVudCBIVE1MIGltcG9ydHMgb2YgdGhlIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkZWxlZ2F0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZHVsZXNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlZ2lzdGVyKC4uLm1vZHVsZXMpIHtcblxuICAgICAgICB0aGlzLmdldEltcG9ydHMoKS5mb3JFYWNoKChwcm9taXNlKSA9PiB7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbigobGlua0VsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyA9IHRoaXMuZmluZFNjcmlwdHMobGlua0VsZW1lbnQuaW1wb3J0KSxcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCAgICAgPSB1dGlsaXR5LmdldE1vZHVsZVBhdGgobGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lICAgICA9IHV0aWxpdHkuZ2V0TW9kdWxlTmFtZShsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlcy5sZW5ndGggJiYgIX5tb2R1bGVzLmluZGV4T2YobW9kdWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxvZ2dlci5zZW5kKG1vZHVsZU5hbWUsIGxvZ2dlci50eXBlLm1vZHVsZSk7XG5cbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50cy5mb3JFYWNoKChzY3JpcHRFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcmlwdFNyYyAgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykuc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0UGF0aCA9IGAke21vZHVsZVBhdGh9LyR7c2NyaXB0U3JjfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLmltcG9ydChzY3JpcHRQYXRoKS50aGVuKChSZWdpc3RlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gUmVnaXN0ZXIuZGVmYXVsdC50b1N0cmluZygpLm1hdGNoKC8oPzpmdW5jdGlvbnxjbGFzcylcXHMqKFthLXpdKykvaSlbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzW2NsYXNzTmFtZV0gPSBSZWdpc3Rlci5kZWZhdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChjbGFzc05hbWUsIGNvbXBvbmVudCwgbW9kdWxlUGF0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBkZWxlZ2F0ZVxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MuQ29uc3RydWN0b3J9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZGVsZWdhdGUoY29udGVudEVsZW1lbnQsIGNvbXBvbmVudCkge1xuXG4gICAgICAgICAgICBsZXQgYUVsZW1lbnQgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKSxcbiAgICAgICAgICAgICAgICBldmVudHMgICAgID0gW10sXG4gICAgICAgICAgICAgICAgZXZlbnRFc3F1ZSA9IC9vblthLXpdKy9pO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhRWxlbWVudCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5Lm1hdGNoKGV2ZW50RXNxdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGtleS5yZXBsYWNlKC9eb24vLCAnJykpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBnZXRFdmVudFxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEV2ZW50KGV2ZW50TmFtZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoTmFtZSA9IG5ldyBSZWdFeHAoZXZlbnROYW1lLCAnaScpLFxuICAgICAgICAgICAgICAgICAgICBldmVudEZuICAgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gcHJvcGVydHkubWF0Y2gobWF0Y2hOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEZuID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudEZuO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBmaW5kRXZlbnRzXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHJlYWN0SWRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBmaW5kRXZlbnRzKG5vZGUsIHJlYWN0SWQsIGV2ZW50TmFtZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50cyAgICAgID0gW10sXG4gICAgICAgICAgICAgICAgICAgIHJvb3RFdmVudEZuID0gZ2V0RXZlbnQoZXZlbnROYW1lLCBub2RlLl9jdXJyZW50RWxlbWVudC5fc3RvcmUucHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJvb3RFdmVudEZuKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRm91bmQgZXZlbnQgaW4gcm9vdCFcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2gocm9vdEV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX3Jvb3ROb2RlSUQgPT09IHJlYWN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBub2RlLl9yZW5kZXJlZENoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2hpbGRyZW5baWRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcm9vdE5vZGVJRCA9PT0gcmVhY3RJZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkRXZlbnRGbiA9IGdldEV2ZW50KGV2ZW50TmFtZSwgaXRlbS5faW5zdGFuY2UucHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkRXZlbnRGbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvdW5kIGV2ZW50IGluIGNoaWxkcmVuIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChjaGlsZEV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcmVuZGVyZWRDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kRXZlbnRzKGl0ZW0sIHJlYWN0SWQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBjcmVhdGVFdmVudFxuICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXZlbnQoZXZlbnROYW1lKSB7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBjb21wb25lbnQuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRGbiAgICA9IGBvbiR7ZXZlbnQudHlwZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzICAgICA9IGZpbmRFdmVudHMoY29tcG9uZW50cywgZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZWFjdGlkJyksIGV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEZuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEZuLmFwcGx5KGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnROYW1lIG9mIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoKTsiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0YW50IHR5cGVcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIG1vZHVsZTogJ21vZHVsZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6ICdjb21wb25lbnQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2Qgc2VuZFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgc2VuZChtZXNzYWdlLCB0eXBlKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAodGhpcy50eXBlLm1vZHVsZSk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyBNb2R1bGU6ICR7bWVzc2FnZX0gYCwgJ2NvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogM3B4OyBwYWRkaW5nOiAycHggMDsgZm9udC1zaXplOiA5cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICAjZWYzMjMyIDAlLCNkNjNhMmMgMTAwJSknKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICh0aGlzLnR5cGUuY29tcG9uZW50KTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7bWVzc2FnZX1gLCAnZm9udC1zaXplOiA5cHg7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIC43NSknKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigkZG9jdW1lbnQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IGxpbmtTZWxlY3RvclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbGlua1NlbGVjdG9yOiAnbGlua1t0eXBlPVwidGV4dC9jc3NcIl0nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGFzc29jaWF0ZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50UGF0aFxuICAgICAgICAgKiBAcGFyYW0ge1NoYWRvd1Jvb3R9IHNoYWRvd1Jvb3RcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBhc3NvY2lhdGUoY29tcG9uZW50UGF0aCwgc2hhZG93Um9vdCkge1xuXG4gICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICAgICAgdXRpbGl0eS50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmsnKSkuZm9yRWFjaCgobGluaykgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhyZWYubWF0Y2goY29tcG9uZW50UGF0aCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVFbGVtZW50ID0gbGluay5pbXBvcnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzICAgID0gdXRpbGl0eS50b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJykpLm1hcCgobGlua0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29tcG9uZW50UGF0aH0vJHtsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzLmZvckVhY2goKGNzc0RvY3VtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goY3NzRG9jdW1lbnQpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLnRoZW4oKGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdHlsZUVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKGRvY3VtZW50KTsiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b1NuYWtlQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FtZWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbam9pbmVyPSctJ11cbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TbmFrZUNhc2UoY2FtZWxDYXNlLCBqb2luZXIgPSAnLScpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW1lbENhc2Uuc3BsaXQoLyhbQS1aXVthLXpdezAsfSkvZykuZmlsdGVyKHBhcnRzID0+IHBhcnRzKS5qb2luKGpvaW5lcikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gYXJyYXlMaWtlXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdG9BcnJheShhcnJheUxpa2UpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tID8gQXJyYXkuZnJvbShhcnJheUxpa2UpIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFycmF5TGlrZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0TW9kdWxlUGF0aFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb2R1bGVQYXRoKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRNb2R1bGVOYW1lXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdldE1vZHVsZU5hbWUoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkucG9wKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7Il19
