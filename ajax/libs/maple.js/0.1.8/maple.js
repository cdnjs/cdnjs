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

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @module Maple
 * @submodule Component
 * @link https://github.com/Wildhoney/Maple.js
 * @author Adam Timberlake
 */

var Component = (function () {
    function Component() {
        _classCallCheck(this, Component);
    }

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
})();

exports["default"] = Component;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
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
        _classCallCheck(this, Dispatcher);

        this.events = {};
    }

    _createClass(Dispatcher, [{
        key: "addEventListener",

        /**
         * @method addEventListener
         * @param {String} name
         * @param {Object} [options={}]
         * @return {void}
         */
        value: function addEventListener(name) {
            var options = arguments[1] === undefined ? { reference: null, callback: function callback() {} } : arguments[1];

            if (this.events[name]) {
                this.events[name] = [];
            }

            this.events[name].push(options);
        }
    }, {
        key: "removeEventListener",

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

exports["default"] = Dispatcher;
module.exports = exports["default"];

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
        key: 'findImport',

        /**
         * Responsible for finding the import link that pertains to the class that we're currently dealing
         * with.
         *
         * @method findImport
         * @param {String} className
         * @return {Object}
         */
        value: function findImport(className) {

            return this.linkElements.filter(function (linkElement) {

                var regExp = new RegExp('' + className + '/(?:.+?).html', 'i');

                if (linkElement.href.match(regExp)) {
                    return true;
                }
            })[0];
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

            this.log('Adding custom element "' + elementName + '"');
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

                        component.defaultProps = {
                            element: this.cloneNode(true),
                            dispatcher: dispatcher
                        };

                        this.innerHTML = '';
                        this.removeAttribute('unresolved');
                        this.setAttribute('resolved', '');

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

                        _css2['default'].associate(modulePath, shadowRoot);
                        shadowRoot.appendChild(contentElement);
                        _events2['default'].delegate(contentElement, React.render(renderedElement, contentElement));
                    }

                }

            });

            document.registerElement(elementName, {
                prototype: prototype
            });
        }
    }, {
        key: 'log',

        /**
         * @method log
         * @param {String} message
         * @return {void}
         */
        value: function log(message) {

            if (this.debug) {
                console.info('Maple.js: ' + message + '.');
            }
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
            var _this = this;

            for (var _len2 = arguments.length, modules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                modules[_key2] = arguments[_key2];
            }

            modules = modules || this.findModules();

            Promise.all(this.getImports()).then(function (linkElements) {

                _this.linkElements = linkElements;

                modules.forEach(function (name) {

                    name = {
                        camelcase: name,
                        underscore: _utility2['default'].toSnakeCase(name)
                    };

                    var importDocument = _this.findImport(name.underscore),
                        scriptElements = _this.findScripts(importDocument['import']),
                        modulePath = _utility2['default'].getImportPath(importDocument.getAttribute('href'));

                    _this.log('Registering module "' + name.camelcase + '" with path "' + modulePath + '"');

                    scriptElements.forEach(function (scriptElement) {

                        var scriptSrc = scriptElement.getAttribute('src').split('.').slice(0, -1).join('/'),
                            scriptPath = '' + modulePath + '/' + scriptSrc;

                        System['import'](scriptPath).then(function (Register) {

                            var className = Register['default'].toString().match(/(?:function|class)\s*([a-z]+)/i)[1];
                            var component = _this.components[className] = Register['default'];
                            _this.registerCustomElement(className, component, modulePath);
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

},{"./../helpers/Events.js":5,"./../helpers/Stylesheets.js":6,"./../helpers/Utility.js":7,"./Dispatcher.js":3}],5:[function(require,module,exports){
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
         * @return {void}
         */
        associate: function associate(componentPath, shadowRoot) {

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
                        styleElement.innerHTML = '@import url(' + cssDocument + ')';
                        shadowRoot.appendChild(styleElement);
                    });
                }
            });
        }

    };
})(document);

module.exports = exports['default'];

},{"./../helpers/Utility.js":7}],7:[function(require,module,exports){
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
            return Array.prototype.slice.apply(arrayLike);
        },

        /**
         * @method getImportPath
         * @param {String} importPath
         * @return {String}
         */
        getImportPath: function getImportPath(importPath) {
            return importPath.split('/').slice(0, -1).join('/');
        }

    };
})();

module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvY29tcG9uZW50cy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvY29tcG9uZW50cy9EaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2NvbXBvbmVudHMvUmVnaXN0ZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9TdHlsZXNoZWV0cy5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9oZWxwZXJzL1V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O3lCQ0FzQiwyQkFBMkI7Ozs7d0JBQzNCLDBCQUEwQjs7OztBQUVoRCxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7O0FBRS9CLGdCQUFZLENBQUM7Ozs7Ozs7O1FBT1AsS0FBSzs7Ozs7OztBQU9JLGFBUFQsS0FBSyxHQU9pQjswQ0FBVCxPQUFPO0FBQVAsbUJBQU87Ozs4QkFQcEIsS0FBSzs7QUFTSCxpQkFBUyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakQscUZBQWdCLE9BQU8sT0FBRTtTQUM1QixDQUFDLENBQUM7S0FFTjs7QUFJTCxXQUFPLENBQUMsS0FBSyxHQUFhLEtBQUssQ0FBQztBQUNoQyxXQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMseUJB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QUFDO0FBQzlDLG9DQUFZLENBQUMsU0FBUyxvQkFBa0IsV0FBVyxNQUFHLENBQUM7QUFDdkQsa0NBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBRXhDLENBQUMsQ0FBQztpQkFFTjthQUVKLENBQUMsQ0FBQztTQUVOOztLQUVKLENBQUM7Q0FFTCxDQUFBLENBQUUsUUFBUSxDQUFDOzs7Ozs7Ozs7OztxQkNuREcsQ0FBQyxTQUFTLElBQUksR0FBRzs7QUFFNUIsZ0JBQVksQ0FBQzs7QUFFYixXQUFPOzs7Ozs7OztBQVFILG1CQUFXLEVBQUEscUJBQUMsU0FBUyxFQUFnQjtnQkFBZCxNQUFNLGdDQUFHLEdBQUc7O0FBQy9CLG1CQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLO3VCQUFJLEtBQUs7YUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pHOzs7Ozs7O0FBT0QsZUFBTyxFQUFBLGlCQUFDLFNBQVMsRUFBRTtBQUNmLG1CQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqRDs7Ozs7OztBQU9ELHFCQUFhLEVBQUEsdUJBQUMsVUFBVSxFQUFFO0FBQ3RCLG1CQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDs7S0FFSixDQUFDO0NBRUwsQ0FBQSxFQUFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgUmVnaXN0ZXIgIGZyb20gJy4vY29tcG9uZW50cy9SZWdpc3Rlci5qcyc7XG5cbihmdW5jdGlvbiBtYWluKCR3aW5kb3csICRkb2N1bWVudCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBAbW9kdWxlIE1hcGxlXG4gICAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICAgICAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gICAgICovXG4gICAgY2xhc3MgTWFwbGUge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kdWxlc1xuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoLi4ubW9kdWxlcykge1xuXG4gICAgICAgICAgICAkZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgUmVnaXN0ZXIoLi4ubW9kdWxlcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAkd2luZG93Lk1hcGxlICAgICAgICAgICA9IE1hcGxlO1xuICAgICR3aW5kb3cuTWFwbGUuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuXG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCIvKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgQ29tcG9uZW50XG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihuYW1lKSB7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgeyByZWZlcmVuY2U6IHRoaXMsIGNhbGxiYWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgfX0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB0aGlzKTtcbiAgICB9XG5cbn0iLCIvKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgRGlzcGF0Y2hlclxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGF0Y2hlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtEaXNwYXRjaGVyfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBvcHRpb25zID0geyByZWZlcmVuY2U6IG51bGwsIGNhbGxiYWNrOiAoKSA9PiB7fSB9KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaChvcHRpb25zKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlZmVyZW5jZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCByZWZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgeyBuYW1lLCByZWZlcmVuY2UgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgZXZlbnRzICAgICBmcm9tICcuLy4uL2hlbHBlcnMvRXZlbnRzLmpzJztcbmltcG9ydCBjc3MgICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9TdHlsZXNoZWV0cy5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL0Rpc3BhdGNoZXIuanMnO1xuXG4vKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgUmVnaXN0ZXJcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdGVyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZHVsZXNcbiAgICAgKiBAcmV0dXJuIHtSZWdpc3Rlcn1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi5tb2R1bGVzKSB7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gICAgICAgIHRoaXMuZGVidWcgICAgICA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciguLi5tb2R1bGVzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgSFRNTCBpbXBvcnRzIGFuZCByZXR1cm5pbmcgYSBwcm9taXNlIHdoZW4gZWFjaCBvZiB0aGVcbiAgICAgKiBIVE1MIGltcG9ydHMgaGF2ZSBiZWVuIHN1Y2Nlc3NmdWxseSBpbXBvcnRlZC4gVGhpcyBhbGxvd3MgdXMgdG8gYWNjZXNzIHRoZSBgb3duZXJEb2N1bWVudGBcbiAgICAgKiBvbiBlYWNoIG9mIHRoZSBsaW5rIGVsZW1lbnRzIGtub3dpbmcgdGhhdCBpdCBpc24ndCBudWxsLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRJbXBvcnRzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0SW1wb3J0cygpIHtcblxuICAgICAgICBsZXQgaW1wb3J0RG9jdW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9XCJpbXBvcnRcIl0nKTtcblxuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGltcG9ydERvY3VtZW50cykubWFwKChpbXBvcnREb2N1bWVudCkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBpbXBvcnREb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4gcmVzb2x2ZShldmVudC5wYXRoWzBdKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIHRoZSBpbXBvcnQgbGluayB0aGF0IHBlcnRhaW5zIHRvIHRoZSBjbGFzcyB0aGF0IHdlJ3JlIGN1cnJlbnRseSBkZWFsaW5nXG4gICAgICogd2l0aC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZmluZEltcG9ydFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZmluZEltcG9ydChjbGFzc05hbWUpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5saW5rRWxlbWVudHMuZmlsdGVyKChsaW5rRWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFwvKD86Lis/KVxcLmh0bWxgLCAnaScpO1xuXG4gICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaHJlZi5tYXRjaChyZWdFeHApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zaWJsZSBmb3IgZmluZGluZyBhbGwgb2YgdGhlIEhUTUwgaW1wb3J0cyBpbiB0aGUgY3VycmVudCBkb2N1bWVudC4gSXQgd2lsbCBiZSBpbnZva2VkIGlmXG4gICAgICogdGhlIGRldmVsb3BlciBkb2Vzbid0IGV4cGxpY2l0bHkgcGFzcyBpbiBhbiBhcnJheSBvZiBtb2R1bGVzIHRvIGxvYWQgdmlhIHRoZSBNYXBsZSBjb25zdHJ1Y3RvciB3aGVuXG4gICAgICogaW5zdGFudGlhdGluZyBhIG5ldyBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZmluZE1vZHVsZXNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaW5kTW9kdWxlcygpIHtcblxuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPVwiaW1wb3J0XCJdJykpLm1hcCgoaW1wb3J0RG9jdW1lbnQpID0+IHtcblxuICAgICAgICAgICAgbGV0IGltcG9ydFBhdGggPSB1dGlsaXR5LmdldEltcG9ydFBhdGgoaW1wb3J0RG9jdW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgaW1wb3J0UGF0aDtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmluZFNjcmlwdHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW1wb3J0RG9jdW1lbnRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmaW5kU2NyaXB0cyhpbXBvcnREb2N1bWVudCkge1xuICAgICAgICBsZXQgdGVtcGxhdGVFbGVtZW50ID0gaW1wb3J0RG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKTtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheSh0ZW1wbGF0ZUVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGN1c3RvbSBlbGVtZW50IHVzaW5nIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCwgYW5kIHRoZW4gYXBwZW5kaW5nXG4gICAgICogdGhlIGFzc29jaWF0ZWQgUmVhY3QuanMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZWdpc3RlckN1c3RvbUVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb2R1bGVQYXRoXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICByZWdpc3RlckN1c3RvbUVsZW1lbnQoY2xhc3NOYW1lLCBjb21wb25lbnQsIG1vZHVsZVBhdGgpIHtcblxuICAgICAgICBsZXQgZWxlbWVudE5hbWUgPSB1dGlsaXR5LnRvU25ha2VDYXNlKGNsYXNzTmFtZSksXG4gICAgICAgICAgICBkaXNwYXRjaGVyICA9IHRoaXMuZGlzcGF0Y2hlcjtcblxuICAgICAgICB0aGlzLmxvZyhgQWRkaW5nIGN1c3RvbSBlbGVtZW50IFwiJHtlbGVtZW50TmFtZX1cImApO1xuICAgICAgICBsZXQgcHJvdG90eXBlICAgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhdHRhY2hlZENhbGxiYWNrXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhdHRhY2hlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICAgIHRoaXMuY2xvbmVOb2RlKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcjogZGlzcGF0Y2hlclxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd1bnJlc29sdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyZXNvbHZlZCcsICcnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbXBvcnQgYXR0cmlidXRlcyBmcm9tIHRoZSBlbGVtZW50IGFuZCB0cmFuc2ZlciB0byB0aGUgUmVhY3QuanMgY2xhc3MuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlczsgaW5kZXggPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlcy5pdGVtKGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gYXR0cmlidXRlLm5hbWUucmVwbGFjZSgvXmRhdGEtL2ksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGVmYXVsdFByb3BzW25hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzLmFzc29jaWF0ZShtb2R1bGVQYXRoLCBzaGFkb3dSb290KTtcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5kZWxlZ2F0ZShjb250ZW50RWxlbWVudCwgUmVhY3QucmVuZGVyKHJlbmRlcmVkRWxlbWVudCwgY29udGVudEVsZW1lbnQpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge1xuICAgICAgICAgICAgcHJvdG90eXBlOiBwcm90b3R5cGVcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBsb2cobWVzc2FnZSkge1xuXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYE1hcGxlLmpzOiAke21lc3NhZ2V9LmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbnRyeSBwb2ludCBmb3IgdGhlIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi4gSXQgYWNjZXB0cyBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgdG8gaW5pdGlhbGlzZVxuICAgICAqIG1vZHVsZXMgZXhwbGljaXRseSwgb3RoZXJ3aXNlIHRoaXMuZmluZE1vZHVsZXMgd2lsbCBiZSBpbnZva2VkLCBhbmQgbW9kdWxlcyB3aWxsIGJlIGZvdW5kXG4gICAgICogYXV0b21hdGljYWxseSBmcm9tIHRoZSBjdXJyZW50IEhUTUwgaW1wb3J0cyBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlbGVnYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kdWxlc1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgcmVnaXN0ZXIoLi4ubW9kdWxlcykge1xuXG4gICAgICAgIG1vZHVsZXMgPSBtb2R1bGVzIHx8IHRoaXMuZmluZE1vZHVsZXMoKTtcblxuICAgICAgICBQcm9taXNlLmFsbCh0aGlzLmdldEltcG9ydHMoKSkudGhlbigobGlua0VsZW1lbnRzKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMubGlua0VsZW1lbnRzID0gbGlua0VsZW1lbnRzO1xuXG4gICAgICAgICAgICBtb2R1bGVzLmZvckVhY2goKG5hbWUpID0+IHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbWVsY2FzZTogIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHVuZGVyc2NvcmU6IHV0aWxpdHkudG9TbmFrZUNhc2UobmFtZSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbGV0IGltcG9ydERvY3VtZW50ID0gdGhpcy5maW5kSW1wb3J0KG5hbWUudW5kZXJzY29yZSksXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzID0gdGhpcy5maW5kU2NyaXB0cyhpbXBvcnREb2N1bWVudC5pbXBvcnQpLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoICAgICA9IHV0aWxpdHkuZ2V0SW1wb3J0UGF0aChpbXBvcnREb2N1bWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhgUmVnaXN0ZXJpbmcgbW9kdWxlIFwiJHtuYW1lLmNhbWVsY2FzZX1cIiB3aXRoIHBhdGggXCIke21vZHVsZVBhdGh9XCJgKTtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzLmZvckVhY2goKHNjcmlwdEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NyaXB0U3JjICA9IHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKS5zcGxpdCgnLicpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRQYXRoID0gYCR7bW9kdWxlUGF0aH0vJHtzY3JpcHRTcmN9YDtcblxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uaW1wb3J0KHNjcmlwdFBhdGgpLnRoZW4oKFJlZ2lzdGVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBSZWdpc3Rlci5kZWZhdWx0LnRvU3RyaW5nKCkubWF0Y2goLyg/OmZ1bmN0aW9ufGNsYXNzKVxccyooW2Etel0rKS9pKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHNbY2xhc3NOYW1lXSA9IFJlZ2lzdGVyLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudChjbGFzc05hbWUsIGNvbXBvbmVudCwgbW9kdWxlUGF0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBkZWxlZ2F0ZVxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MuQ29uc3RydWN0b3J9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZGVsZWdhdGUoY29udGVudEVsZW1lbnQsIGNvbXBvbmVudCkge1xuXG4gICAgICAgICAgICBsZXQgYUVsZW1lbnQgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKSxcbiAgICAgICAgICAgICAgICBldmVudHMgICAgID0gW10sXG4gICAgICAgICAgICAgICAgZXZlbnRFc3F1ZSA9IC9vblthLXpdKy9pO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhRWxlbWVudCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5Lm1hdGNoKGV2ZW50RXNxdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGtleS5yZXBsYWNlKC9eb24vLCAnJykpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBnZXRFdmVudFxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEV2ZW50KGV2ZW50TmFtZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoTmFtZSA9IG5ldyBSZWdFeHAoZXZlbnROYW1lLCAnaScpLFxuICAgICAgICAgICAgICAgICAgICBldmVudEZuICAgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gcHJvcGVydHkubWF0Y2gobWF0Y2hOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEZuID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudEZuO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBmaW5kRXZlbnRzXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHJlYWN0SWRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBmaW5kRXZlbnRzKG5vZGUsIHJlYWN0SWQsIGV2ZW50TmFtZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50cyAgICAgID0gW10sXG4gICAgICAgICAgICAgICAgICAgIHJvb3RFdmVudEZuID0gZ2V0RXZlbnQoZXZlbnROYW1lLCBub2RlLl9jdXJyZW50RWxlbWVudC5fc3RvcmUucHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJvb3RFdmVudEZuKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRm91bmQgZXZlbnQgaW4gcm9vdCFcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2gocm9vdEV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX3Jvb3ROb2RlSUQgPT09IHJlYWN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBub2RlLl9yZW5kZXJlZENoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2hpbGRyZW5baWRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcm9vdE5vZGVJRCA9PT0gcmVhY3RJZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkRXZlbnRGbiA9IGdldEV2ZW50KGV2ZW50TmFtZSwgaXRlbS5faW5zdGFuY2UucHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkRXZlbnRGbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvdW5kIGV2ZW50IGluIGNoaWxkcmVuIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChjaGlsZEV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcmVuZGVyZWRDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kRXZlbnRzKGl0ZW0sIHJlYWN0SWQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBjcmVhdGVFdmVudFxuICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXZlbnQoZXZlbnROYW1lKSB7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBjb21wb25lbnQuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRGbiAgICA9IGBvbiR7ZXZlbnQudHlwZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzICAgICA9IGZpbmRFdmVudHMoY29tcG9uZW50cywgZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZWFjdGlkJyksIGV2ZW50Rm4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEZuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEZuLmFwcGx5KGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnROYW1lIG9mIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoKTsiLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCRkb2N1bWVudCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgbGlua1NlbGVjdG9yXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBsaW5rU2VsZWN0b3I6ICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgYXNzb2NpYXRlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRQYXRoXG4gICAgICAgICAqIEBwYXJhbSB7U2hhZG93Um9vdH0gc2hhZG93Um9vdFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgYXNzb2NpYXRlKGNvbXBvbmVudFBhdGgsIHNoYWRvd1Jvb3QpIHtcblxuICAgICAgICAgICAgdXRpbGl0eS50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmsnKSkuZm9yRWFjaCgobGluaykgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhyZWYubWF0Y2goY29tcG9uZW50UGF0aCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVFbGVtZW50ID0gbGluay5pbXBvcnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzICAgID0gdXRpbGl0eS50b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJykpLm1hcCgobGlua0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29tcG9uZW50UGF0aH0vJHtsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzLmZvckVhY2goKGNzc0RvY3VtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBgQGltcG9ydCB1cmwoJHtjc3NEb2N1bWVudH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU25ha2VDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYW1lbENhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtqb2luZXI9Jy0nXVxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1NuYWtlQ2FzZShjYW1lbENhc2UsIGpvaW5lciA9ICctJykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbWVsQ2FzZS5zcGxpdCgvKFtBLVpdW2Etel17MCx9KS9nKS5maWx0ZXIocGFydHMgPT4gcGFydHMpLmpvaW4oam9pbmVyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHsqfSBhcnJheUxpa2VcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0b0FycmF5KGFycmF5TGlrZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcnJheUxpa2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEltcG9ydFBhdGhcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0SW1wb3J0UGF0aChpbXBvcnRQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7Il19
