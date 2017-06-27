(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelsModuleJs = require('./models/Module.js');

var _modelsModuleJs2 = _interopRequireDefault(_modelsModuleJs);

var _modelsComponentJs = require('./models/Component.js');

var _modelsComponentJs2 = _interopRequireDefault(_modelsComponentJs);

var _helpersSelectorsJs = require('./helpers/Selectors.js');

var _helpersSelectorsJs2 = _interopRequireDefault(_helpersSelectorsJs);

var _helpersUtilityJs = require('./helpers/Utility.js');

var _helpersUtilityJs2 = _interopRequireDefault(_helpersUtilityJs);

var _helpersLoggerJs = require('./helpers/Logger.js');

var _helpersLoggerJs2 = _interopRequireDefault(_helpersLoggerJs);

var _helpersEventsJs = require('./helpers/Events.js');

var _helpersEventsJs2 = _interopRequireDefault(_helpersEventsJs);

var _helpersOptionsJs = require('./helpers/Options.js');

var _helpersOptionsJs2 = _interopRequireDefault(_helpersOptionsJs);

(function main($window, $document) {

    'use strict';

    if (typeof System !== 'undefined') {
        System.transpiler = 'babel';
        System.babelOptions = { blacklist: [] };
    }

    /**
     * @constant HAS_INITIATED
     * @type {Boolean}
     */
    var HAS_INITIATED = false;

    /**
     * @module Maple
     * @link https://github.com/Wildhoney/Maple.js
     * @author Adam Timberlake
     */

    var Maple = (function () {

        /**
         * @constructor
         * @return {void}
         */

        function Maple() {
            _classCallCheck(this, Maple);

            this.findLinks();
            this.findTemplates();

            // Configure the event delegation mappings.
            _helpersEventsJs2['default'].setupDelegation();

            // Listen for any changes to the DOM where HTML imports can be dynamically imported
            // into the document.
            this.observeMutations();
        }

        _createClass(Maple, [{
            key: 'findLinks',

            /**
             * Responsible for finding all of the external link elements, as well as the inline template elements
             * that can be handcrafted, or baked into the HTML document when compiling a project.
             *
             * @method findLinks
             * @return {void}
             */
            value: function findLinks() {
                var _this = this;

                _helpersSelectorsJs2['default'].getImports($document).forEach(function (linkElement) {
                    return _this.waitForLinkElement(linkElement);
                });
            }
        }, {
            key: 'findTemplates',

            /**
             * Responsible for finding all of the template HTML elements that contain the `ref` attribute which
             * is the component's original path before Mapleify.
             *
             * @method findTemplates
             * @return {void}
             */
            value: function findTemplates() {

                _helpersSelectorsJs2['default'].getTemplates($document).forEach(function (templateElement) {

                    var scriptElements = _helpersSelectorsJs2['default'].getAllScripts(templateElement.content);
                    var ref = templateElement.getAttribute('ref');
                    var path = _helpersUtilityJs2['default'].resolver(ref, null).production;

                    scriptElements.forEach(function (scriptElement) {

                        if (path.isLocalPath(scriptElement.getAttribute('src'))) {
                            new _modelsComponentJs2['default'](path, templateElement, scriptElement);
                        }
                    });
                });
            }
        }, {
            key: 'waitForLinkElement',

            /**
             * @method waitForLinkElement
             * @param {HTMLLinkElement} linkElement
             * @return {void}
             */
            value: function waitForLinkElement(linkElement) {

                if (linkElement['import']) {
                    return void new _modelsModuleJs2['default'](linkElement);
                }

                new Promise(function (resolve, reject) {

                    linkElement.addEventListener('load', function () {
                        return resolve(linkElement);
                    });

                    var href = linkElement.getAttribute('href'),
                        errorMessage = 'Timeout of ' + _helpersOptionsJs2['default'].RESOLVE_TIMEOUT / 1000 + ' seconds exceeded whilst waiting for HTML import: "' + href + '"';
                    _helpersUtilityJs2['default'].resolveTimeout(errorMessage, reject);
                }).then(function (linkElement) {
                    return new _modelsModuleJs2['default'](linkElement);
                }, function (message) {
                    return _helpersLoggerJs2['default'].error(message);
                });
            }
        }, {
            key: 'observeMutations',

            /**
             * Listens for changes to the `HTMLHeadElement` node and registers any new imports that are
             * dynamically imported into the document.
             *
             * @method observeMutations
             * @return {void}
             */
            value: function observeMutations() {
                var _this2 = this;

                var observer = new MutationObserver(function (mutations) {

                    mutations.forEach(function (mutation) {

                        var addedNodes = _helpersUtilityJs2['default'].toArray(mutation.addedNodes);

                        addedNodes.forEach(function (node) {

                            if (_helpersUtilityJs2['default'].isHTMLImport(node)) {
                                _this2.waitForLinkElement(node);
                            }
                        });
                    });
                });

                observer.observe($document.head, { childList: true });
            }
        }]);

        return Maple;
    })();

    /**
     * @method initialise
     * @return {Boolean}
     */
    function initialise() {

        var state = $document.readyState,
            readyStates = ['interactive', 'complete'];

        if (!HAS_INITIATED && ~readyStates.indexOf(state)) {

            HAS_INITIATED = true;

            // No documents, no person.
            new Maple();
        }
    }

    // Support for async, defer, and normal inclusion.
    initialise();
    $document.addEventListener('DOMContentLoaded', initialise);
})(window, document);

},{"./helpers/Events.js":3,"./helpers/Logger.js":4,"./helpers/Options.js":5,"./helpers/Selectors.js":6,"./helpers/Utility.js":7,"./models/Component.js":8,"./models/Module.js":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = (function main($window) {

    "use strict";

    /**
     * @property cache
     * @type {Object}
     */
    var cache = {};

    return {

        /**
         * Responsible for delegating to the native `fetch` function (polyfill provided), but will cache the
         * initial promise in order for other invocations to the same URL to yield the same promise.
         *
         * @method fetch
         * @param url {String}
         * @return {Promise}
         */
        fetch: function fetch(url) {

            if (cache[url]) {
                return cache[url];
            }

            cache[url] = new Promise(function (resolve) {

                $window.fetch(url).then(function (response) {
                    return response.text();
                }).then(function (body) {
                    resolve(body);
                });
            });

            return cache[url];
        }

    };
})(window);

module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _UtilityJs = require("./Utility.js");

var _UtilityJs2 = _interopRequireDefault(_UtilityJs);

/**
 * @method overrideStopPropagation
 * @see: http://bit.ly/1dPpxHl
 * @return {void}
 */
(function overrideStopPropagation() {

    "use strict";

    var overriddenStop = Event.prototype.stopPropagation;

    Event.prototype.stopPropagation = function stopPropagation() {
        this.isPropagationStopped = true;
        overriddenStop.apply(this, arguments);
    };
})();

exports["default"] = (function main($document) {

    "use strict";

    /**
     * @property components
     * @type {Array}
     */
    var components = [];

    /**
     * @property eventNames
     * @type {Array|null}
     */
    var eventNames = null;

    return {

        /**
         * Recursively discover a component via its React ID that is set as a data attribute
         * on each React element.
         *
         * @method findById
         * @param id {String}
         * @return {Object}
         */
        findById: function findById(id) {

            var model = undefined;

            /**
             * @method find
             * @param {Object} renderedComponent
             * @param {Object} currentComponent
             * @return {void}
             */
            function find(renderedComponent, currentComponent) {

                if (renderedComponent._rootNodeID === id) {

                    /**
                     * @method bindModel
                     * @return {void}
                     */
                    (function bindModel() {

                        model = {
                            properties: this._currentElement.props,
                            component: currentComponent
                        };
                    }).bind(renderedComponent)();

                    return;
                }

                if (renderedComponent._renderedComponent) {
                    (function () {

                        var children = renderedComponent._renderedComponent._renderedChildren;

                        if (children) {
                            Object.keys(children).forEach(function (index) {
                                find(children[index], currentComponent);
                            });
                        }
                    })();
                }
            }

            components.forEach(function (component) {
                find(component._reactInternalInstance._renderedComponent, component);
            });

            return model;
        },

        /**
         * @method transformKeys
         * @param {Object} map
         * @param {String} [transformer='toLowerCase']
         * @return {Object}
         */
        transformKeys: function transformKeys(map) {
            var transformer = arguments[1] === undefined ? "toLowerCase" : arguments[1];

            var transformedMap = {};

            Object.keys(map).forEach(function forEach(key) {
                transformedMap[key[transformer]()] = map[key];
            });

            return transformedMap;
        },

        /**
         * @method registerComponent
         * @param {Object} component
         * @return {void}
         */
        registerComponent: function registerComponent(component) {
            components.push(component);
        },

        /**
         * @method setupDelegation
         * @return {void}
         */
        setupDelegation: function setupDelegation() {
            var _this = this;

            /**
             * Determines all of the event types supported by the current browser. Will cache the results
             * of this discovery for performance benefits.
             *
             * @property events
             * @type {Array}
             */
            var events = eventNames || (function () {

                var aElement = $document.createElement("a"),
                    matcher = /^on/i,
                    eventNames = [];

                for (var key in aElement) {

                    if (key.match(matcher)) {
                        eventNames.push(key.replace(matcher, ""));
                    }
                }

                return eventNames;
            })();

            events.forEach(function (eventType) {

                $document.addEventListener(eventType, function (event) {

                    var eventName = "on" + event.type,
                        eventList = [];

                    _UtilityJs2["default"].toArray(event.path).forEach(function (item) {

                        if (event.isPropagationStopped) {

                            // Method `stopPropagation` was invoked on the current event, which prevents
                            // us from propagating any further.
                            return;
                        }

                        if (!item.getAttribute || !item.hasAttribute(_UtilityJs2["default"].ATTRIBUTE_REACTID)) {

                            // Current element is not a valid React element because it doesn't have a
                            // React ID data attribute.
                            return;
                        }

                        // Attempt to field the component by the associated React ID.
                        var model = _this.findById(item.getAttribute(_UtilityJs2["default"].ATTRIBUTE_REACTID));

                        if (model && model.properties) {

                            // Transform the current React events into lower case keys, so that we can pair them
                            // up with the event types.
                            var transformed = _this.transformKeys(model.properties);

                            if (eventName in transformed) {

                                // We defer the invocation of the event method, because otherwise React.js
                                // will re-render, and the React IDs will then be "out of sync" for this event.
                                eventList.push(transformed[eventName].bind(model.component, event));
                            }
                        }
                    });

                    // Invoke each found event for the event type.
                    eventList.forEach(function (eventInvocation) {
                        return eventInvocation();
                    });
                });
            });
        }

    };
})(window.document);

module.exports = exports["default"];

},{"./Utility.js":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main($console) {

    'use strict';

    return {

        /**
         * @method warn
         * @param {String} message
         * @return {void}
         */
        warn: function warn(message) {
            $console.log('%cMaple.js: %c' + message + '.', 'color: rgba(0, 0, 0, .5)', 'color: #5F9EA0');
        },

        /**
         * @method info
         * @param {String} message
         * @return {void}
         */
        info: function info(message) {
            $console.log('%cMaple.js: %c' + message + '.', 'color: rgba(0, 0, 0, .5)', 'color: #008DDB');
        },

        /**
         * @method error
         * @param {String} message
         * @return {void}
         */
        error: function error(message) {
            $console.log('%cMaple.js: %c' + message + '.', 'color: rgba(0, 0, 0, .5)', 'color: #CD6090');
        }

    };
})(window.console);

module.exports = exports['default'];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = (function main() {

    "use strict";

    return {

        /**
         * @constant RESOLVE_TIMEOUT
         * @type {Number}
         * @default 60000
         */
        RESOLVE_TIMEOUT: 60000

    };
})();

module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _UtilityJs = require("./Utility.js");

var _UtilityJs2 = _interopRequireDefault(_UtilityJs);

/**
 * @method queryAll
 * @param {String} expression
 * @return {Array}
 */
var queryAll = function queryAll(expression) {
    "use strict";
    return _UtilityJs2["default"].toArray(this.querySelectorAll(expression));
};

exports["default"] = (function main() {

    "use strict";

    return {

        /**
         * @method getCSSLinks
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getCSSLinks: function getCSSLinks(element) {
            return queryAll.call(element, "link[type=\"text/css\"],link[type=\"text/scss\"]");
        },

        /**
         * @method getCSSInlines
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getCSSInlines: function getCSSInlines(element) {
            return queryAll.call(element, "style[type=\"text/css\"]");
        },

        /**
         * @method getImports
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getImports: function getImports(element) {
            return queryAll.call(element, "link[rel=\"import\"]:not([data-ignore])");
        },

        /**
         * @method getTemplates
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getTemplates: function getTemplates(element) {
            return queryAll.call(element, "template[ref]");
        },

        /**
         * @method getScripts
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getScripts: function getScripts(element) {
            return queryAll.call(element, "script[type=\"text/javascript\"]");
        },

        /**
         * @method getAllScripts
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getAllScripts: function getAllScripts(element) {
            var jsxFiles = queryAll.call(element, "script[type=\"text/jsx\"]");
            return [].concat(_UtilityJs2["default"].toArray(this.getScripts(element)), _UtilityJs2["default"].toArray(jsxFiles));
        }

    };
})();

module.exports = exports["default"];

},{"./Utility.js":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _LoggerJs = require('./Logger.js');

var _LoggerJs2 = _interopRequireDefault(_LoggerJs);

var _OptionsJs = require('./Options.js');

var _OptionsJs2 = _interopRequireDefault(_OptionsJs);

exports['default'] = (function main($document) {

    'use strict';

    return {

        /**
         * @constant ATTRIBUTE_REACTID
         * @type {String}
         */
        ATTRIBUTE_REACTID: 'data-reactid',

        /**
         * @method resolver
         * @param {String} url
         * @param {HTMLDocument|null} ownerDocument
         * @return {Object}
         */
        resolver: function resolver(url, ownerDocument) {

            var componentPath = this.getPath(url),
                getPath = this.getPath.bind(this),
                getName = this.getName.bind(this);
            /**
             * @method resolvePath
             * @param {String} path
             * @param {HTMLDocument} overrideDocument
             * @return {String}
             */
            function resolvePath(path) {
                var overrideDocument = arguments[1] === undefined ? $document : arguments[1];

                var a = overrideDocument.createElement('a');
                a.href = path;
                return a.href;
            }

            return {

                /**
                 * @property production
                 * @type {Object}
                 */
                production: {

                    /**
                     * @method getPath
                     * @param {String} path
                     * @return {String}
                     */
                    getPath: function getPath(path) {

                        if (this.isLocalPath(path)) {
                            return '' + this.getAbsolutePath() + '/' + getName(path);
                        }

                        return resolvePath(path, $document);
                    },

                    /**
                     * @method getSrc
                     * @return {String}
                     */
                    getSrc: function getSrc(src) {
                        return getName(src);
                    },

                    /**
                     * @method getAbsolutePath
                     * @return {String}
                     */
                    getAbsolutePath: function getAbsolutePath() {
                        return resolvePath(url);
                    },

                    /**
                     * @method getRelativePath
                     * @return {String}
                     */
                    getRelativePath: function getRelativePath() {
                        return url;
                    },

                    /**
                     * @method isLocalPath
                     * @param {String} path
                     * @return {Boolean}
                     */
                    isLocalPath: function isLocalPath(path) {
                        return !! ~path.indexOf(url);
                    }

                },

                /**
                 * @property development
                 * @type {Object}
                 */
                development: {

                    /**
                     * @method getPath
                     * @param {String} path
                     * @return {String}
                     */
                    getPath: function getPath(path) {

                        if (this.isLocalPath(path)) {
                            return '' + this.getAbsolutePath() + '/' + path;
                        }

                        return resolvePath(path, $document);
                    },

                    /**
                     * @method getSrc
                     * @return {String}
                     */
                    getSrc: function getSrc(src) {
                        return src;
                    },

                    /**
                     * @method getAbsolutePath
                     * @return {String}
                     */
                    getAbsolutePath: function getAbsolutePath() {
                        return resolvePath(componentPath);
                    },

                    /**
                     * @method getRelativePath
                     * @return {String}
                     */
                    getRelativePath: function getRelativePath() {
                        return componentPath;
                    },

                    /**
                     * @method isLocalPath
                     * @param path {String}
                     * @return {Boolean}
                     */
                    isLocalPath: function isLocalPath(path) {
                        path = getPath(resolvePath(path, ownerDocument));
                        return !! ~resolvePath(componentPath).indexOf(path);
                    }

                }

            };
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
         * @method flattenArray
         * @param {Array} arr
         * @param {Array} [givenArr=[]]
         */
        flattenArray: function flattenArray(arr) {
            var _this = this;

            var givenArr = arguments[1] === undefined ? [] : arguments[1];

            /* jshint ignore:start */

            arr.forEach(function (item) {
                Array.isArray(item) && _this.flattenArray(item, givenArr);
                !Array.isArray(item) && givenArr.push(item);
            });

            /* jshint ignore:end */

            return givenArr;
        },

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
         * @method getName
         * @param {String} importPath
         * @return {String}
         */
        getName: function getName(importPath) {
            return importPath.split('/').slice(-1);
        },

        /**
         * @method getPath
         * @param {String} importPath
         * @return {String}
         */
        getPath: function getPath(importPath) {
            return importPath.split('/').slice(0, -1).join('/');
        },

        /**
         * @method removeExtension
         * @param {String} filePath
         * @return {String}
         */
        removeExtension: function removeExtension(filePath) {
            return filePath.split('.').slice(0, -1).join('.');
        },

        /**
         * @method isHTMLImport
         * @param {HTMLElement} htmlElement
         * @return {Boolean}
         */
        isHTMLImport: function isHTMLImport(htmlElement) {

            var isInstance = htmlElement instanceof HTMLLinkElement,
                isImport = String(htmlElement.getAttribute('rel')).toLowerCase() === 'import',
                hasHrefAttr = htmlElement.hasAttribute('href'),
                hasTypeHtml = String(htmlElement.getAttribute('type')).toLowerCase() === 'text/html';

            return isInstance && isImport && hasHrefAttr && hasTypeHtml;
        },

        /**
         * @method resolveTimeout
         * @param {String} errorMessage
         * @param {Function} reject
         * @return {void}
         */
        resolveTimeout: function resolveTimeout(errorMessage, reject) {
            setTimeout(function () {
                return reject(errorMessage);
            }, _OptionsJs2['default'].RESOLVE_TIMEOUT);
        },

        /**
         * Casts primitive values into their respective types. Ignores complex types, including JSON objects.
         * Currently supported are: booleans, integers, and floats.
         *
         * @method typecastProperty
         * @param {String} value
         * @return {*}
         */
        typecastProperty: function typecastProperty(value) {

            if (String(value).match(/^\d+$/)) {
                value = Number(value);
            }

            if (String(value).match(/^\d+\.\d+/i)) {
                value = parseFloat(value);
            }

            if (~['true', 'false'].indexOf(value)) {
                value = value === 'true';
            }

            return value;
        },

        /**
         * @method tryRegisterElement
         * @param {String} name
         * @param {Object} properties
         * @return {void}
         */
        tryRegisterElement: function tryRegisterElement(name, properties) {

            /**
             * @constant ERROR_MAP
             * @type {Object}
             */
            var ERROR_MAP = {
                'A type with that name is already registered': 'Custom element "' + name + '" has already been registered',
                'The type name is invalid': 'Element name ' + name + ' is invalid and must consist of at least one hyphen'
            };

            try {

                $document.registerElement(name, properties);
            } catch (e) {

                var errorData = Object.keys(ERROR_MAP).map(function (error) {

                    var regExp = new RegExp(error, 'i');

                    if (e.message.match(regExp)) {
                        _LoggerJs2['default'].error(ERROR_MAP[error]);
                        return true;
                    }

                    return false;
                });

                if (!errorData.some(function (model) {
                    return model;
                })) {
                    throw e;
                }
            }
        }

    };
})(window.document);

module.exports = exports['default'];

},{"./Logger.js":4,"./Options.js":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ElementJs = require('./Element.js');

var _ElementJs2 = _interopRequireDefault(_ElementJs);

var _helpersUtilityJs = require('./../helpers/Utility.js');

var _helpersUtilityJs2 = _interopRequireDefault(_helpersUtilityJs);

var _helpersLoggerJs = require('./../helpers/Logger.js');

var _helpersLoggerJs2 = _interopRequireDefault(_helpersLoggerJs);

var _helpersOptionsJs = require('./../helpers/Options.js');

var _helpersOptionsJs2 = _interopRequireDefault(_helpersOptionsJs);

var _StateManagerJs = require('./StateManager.js');

/**
 * @module Maple
 * @submodule Component
 * @extends StateManager
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Maple.js
 */

var Component = (function (_StateManager) {

    /**
     * Responsible for loading any prerequisites before the component is delegated to each `CustomElement`
     * object for creating a custom element, and lastly rendering the React component to the designated HTML element.
     *
     * @constructor
     * @param {String} path
     * @param {HTMLTemplateElement} templateElement
     * @param {HTMLScriptElement} scriptElement
     * @return {Module}
     */

    function Component(path, templateElement, scriptElement) {
        var _this = this;

        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this);
        this.path = path;
        this.elements = { script: scriptElement, template: templateElement };

        var src = scriptElement.getAttribute('src');
        this.setState(_StateManagerJs.State.RESOLVING);

        // Configure the URL of the component for ES6 `System.import`, which is also polyfilled in case the
        // current browser does not provide support for dynamic module loading.
        var url = '' + this.path.getRelativePath() + '/' + _helpersUtilityJs2['default'].removeExtension(src);

        if (src.split('.').pop().toLowerCase() === 'jsx') {
            return void _helpersLoggerJs2['default'].error('Use JS extension instead of JSX – JSX compilation will work as expected');
        }

        System['import']('' + url).then(function (imports) {

            if (!imports['default']) {

                // Components that do not have a default export (i.e: export default class...) will be ignored.
                return;
            }

            // Load all third-party scripts that are a prerequisite of resolving the custom element.
            Promise.all(_this.loadThirdPartyScripts()).then(function () {
                new _ElementJs2['default'](path, templateElement, scriptElement, imports['default']);
                _this.setState(_StateManagerJs.State.RESOLVED);
            }, function (message) {
                return _helpersLoggerJs2['default'].error(message);
            });
        });
    }

    _inherits(Component, _StateManager);

    _createClass(Component, [{
        key: 'loadThirdPartyScripts',

        /**
         * Discover all of the third party JavaScript dependencies that are required to have been loaded before
         * attempting to render the custom element.
         *
         * @method loadThirdPartyScripts
         * @return {Promise[]}
         */
        value: function loadThirdPartyScripts() {
            var _this2 = this;

            var scriptElements = _helpersUtilityJs2['default'].toArray(this.elements.template.content.querySelectorAll('script[type="text/javascript"]')),
                thirdPartyScripts = scriptElements.filter(function (scriptElement) {
                return !_this2.path.isLocalPath(scriptElement.getAttribute('src'));
            });

            return thirdPartyScripts.map(function (scriptElement) {

                var src = scriptElement.getAttribute('src');
                scriptElement = document.createElement('script');
                scriptElement.setAttribute('type', 'text/javascript');
                scriptElement.setAttribute('src', src);

                return new Promise(function (resolve, reject) {

                    scriptElement.addEventListener('load', function () {
                        return resolve();
                    });
                    document.head.appendChild(scriptElement);

                    var href = scriptElement.getAttribute('src'),
                        errorMessage = 'Timeout of ' + _helpersOptionsJs2['default'].RESOLVE_TIMEOUT / 1000 + ' seconds exceeded whilst waiting for third-party script: "' + href + '"';
                    _helpersUtilityJs2['default'].resolveTimeout(errorMessage, reject);
                });
            });
        }
    }]);

    return Component;
})(_StateManagerJs.StateManager);

exports['default'] = Component;
module.exports = exports['default'];

},{"./../helpers/Logger.js":4,"./../helpers/Options.js":5,"./../helpers/Utility.js":7,"./Element.js":9,"./StateManager.js":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _helpersEventsJs = require('./../helpers/Events.js');

var _helpersEventsJs2 = _interopRequireDefault(_helpersEventsJs);

var _helpersUtilityJs = require('./../helpers/Utility.js');

var _helpersUtilityJs2 = _interopRequireDefault(_helpersUtilityJs);

var _helpersLoggerJs = require('./../helpers/Logger.js');

var _helpersLoggerJs2 = _interopRequireDefault(_helpersLoggerJs);

var _helpersCacheFactoryJs = require('./../helpers/CacheFactory.js');

var _helpersCacheFactoryJs2 = _interopRequireDefault(_helpersCacheFactoryJs);

var _helpersSelectorsJs = require('./../helpers/Selectors.js');

var _helpersSelectorsJs2 = _interopRequireDefault(_helpersSelectorsJs);

var _StateManagerJs = require('./StateManager.js');

/**
 * @module Maple
 * @submodule CustomElement
 * @extends StateManager
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Maple.js
 */

var CustomElement = (function (_StateManager) {

    /**
     * @constructor
     * @param {String} path
     * @param {HTMLScriptElement} scriptElement
     * @param {HTMLTemplateElement} templateElement
     * @param {String} importScript
     * @return {Element}
     */

    function CustomElement(path, templateElement, scriptElement, importScript) {
        _classCallCheck(this, CustomElement);

        _get(Object.getPrototypeOf(CustomElement.prototype), 'constructor', this).call(this);
        this.path = path;
        this.sass = typeof Sass === 'undefined' ? null : new Sass();
        this.elements = { script: scriptElement, template: templateElement };
        this.script = importScript;

        var descriptor = this.getDescriptor();

        if (!descriptor.extend) {

            return void _helpersUtilityJs2['default'].tryRegisterElement(descriptor.name, {
                prototype: this.getElementPrototype()
            });
        }

        var prototype = 'HTML' + descriptor.extend + 'Element';

        _helpersUtilityJs2['default'].tryRegisterElement(descriptor.name, {
            prototype: this.getElementPrototype(window[prototype].prototype),
            'extends': descriptor.extend.toLowerCase()
        });
    }

    _inherits(CustomElement, _StateManager);

    _createClass(CustomElement, [{
        key: 'loadStyles',

        /**
         * Responsible for loading associated styles into either the shadow DOM, if the path is determined to be local
         * to the component, or globally if not.
         *
         * @method loadStyles
         * @param {ShadowRoot} shadowBoundary
         * @return {Promise[]}
         */
        value: function loadStyles(shadowBoundary) {
            var _this = this;

            /**
             * @method addCSS
             * @param {String} body
             * @return {void}
             */
            function addCSS(body) {
                var styleElement = document.createElement('style');
                styleElement.setAttribute('type', 'text/css');
                styleElement.innerHTML = body;
                shadowBoundary.appendChild(styleElement);
            }

            this.setState(_StateManagerJs.State.RESOLVING);

            var content = this.elements.template.content;
            var linkElements = _helpersSelectorsJs2['default'].getCSSLinks(content);
            var styleElements = _helpersSelectorsJs2['default'].getCSSInlines(content);
            var promises = [].concat(linkElements, styleElements).map(function (element) {
                return new Promise(function (resolve) {

                    if (element.nodeName.toLowerCase() === 'style') {
                        addCSS(element.innerHTML);
                        resolve(element.innerHTML);
                        return;
                    }

                    _helpersCacheFactoryJs2['default'].fetch(_this.path.getPath(element.getAttribute('href'))).then(function (body) {

                        if (element.getAttribute('type') === 'text/scss') {

                            if (!_this.sass) {
                                _helpersLoggerJs2['default'].error('You should include "sass.js" for development runtime SASS compilation');
                                return void reject();
                            }

                            _helpersLoggerJs2['default'].warn('All of your SASS documents should be compiled to CSS for production via your build process');

                            // Compile SCSS document into CSS prior to appending it to the body.
                            return void _this.sass.compile(body, function (response) {
                                addCSS(response.text);
                                resolve(response.text);
                            });
                        }

                        addCSS(body);
                        resolve(body);
                    });
                });
            });

            Promise.all(promises).then(function () {
                return _this.setState(_StateManagerJs.State.RESOLVED);
            });
            return promises;
        }
    }, {
        key: 'getDescriptor',

        /**
         * Extract the element name, and optionally the element extension, from converting the Function to a String via
         * the `toString` method. It's worth noting that this is probably the weakest part of the Maple system because it
         * relies on a regular expression to determine the name of the resulting custom HTML element.
         *
         * @method getDescriptor
         * @return {Object}
         */
        value: function getDescriptor() {

            // With ES6 the `Function.prototype.name` property is beginning to be standardised, which means
            // in many cases we won't have to resort to the feeble `toString` approach. Hoorah!
            var name = this.script.name || this.script.toString().match(/(?:function|class)\s*([a-z_]+)/i)[1],
                extend = null;

            if (~name.indexOf('_')) {

                // Does the element name reference an element to extend?
                var split = name.split('_');
                name = split[0];
                extend = split[1];
            }

            return { name: _helpersUtilityJs2['default'].toSnakeCase(name), extend: extend };
        }
    }, {
        key: 'getElementPrototype',

        /**
         * Yields the prototype for the custom HTML element that will be registered for our custom React component.
         * It listens for when the custom element has been inserted into the DOM, and then sets up the styles, applies
         * default React properties, etc...
         *
         * @method getElementPrototype
         * @param {Object} elementPrototype
         * @return {Object}
         */
        value: function getElementPrototype(elementPrototype) {

            var loadStyles = this.loadStyles.bind(this),
                script = this.script,
                path = this.path;

            return Object.create(elementPrototype || HTMLElement.prototype, {

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

                        /**
                         * @method setDefaultProps
                         * @param {Object} attributes
                         * @return {void}
                         */
                        function setDefaultProps(attributes) {

                            attributes = Array.prototype.slice.apply(attributes);
                            var replacer = /^data-/i;

                            attributes.forEach(function (attribute) {

                                if (attribute.name === _helpersUtilityJs2['default'].ATTRIBUTE_REACTID) {
                                    return;
                                }

                                // Typecast the value depending on the type.
                                var name = attribute.name.replace(replacer, '');
                                script.defaultProps[name] = _helpersUtilityJs2['default'].typecastProperty(attribute.value);
                            });
                        }

                        // Apply properties to the custom element.
                        script.defaultProps = { path: path, element: this.cloneNode(true) };
                        setDefaultProps.call(this, this.attributes);
                        this.innerHTML = '';

                        // Configure the React.js component, importing it under the shadow boundary.
                        var renderedElement = React.createElement(script),
                            contentElement = document.createElement('content'),
                            shadowRoot = this.createShadowRoot();

                        shadowRoot.appendChild(contentElement);
                        var component = React.render(renderedElement, contentElement);

                        // Configure the event delegation for the component.
                        _helpersEventsJs2['default'].registerComponent(component);

                        /**
                         * Import external CSS documents and resolve element.
                         *
                         * @method resolveElement
                         * @return {void}
                         */
                        function resolveElement() {
                            var _this2 = this;

                            Promise.all(loadStyles(shadowRoot)).then(function () {
                                _this2.removeAttribute('unresolved');
                                _this2.setAttribute('resolved', '');
                            });
                        }

                        resolveElement.apply(this);
                    }

                }

            });
        }
    }]);

    return CustomElement;
})(_StateManagerJs.StateManager);

exports['default'] = CustomElement;
module.exports = exports['default'];

},{"./../helpers/CacheFactory.js":2,"./../helpers/Events.js":3,"./../helpers/Logger.js":4,"./../helpers/Selectors.js":6,"./../helpers/Utility.js":7,"./StateManager.js":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ComponentJs = require('./Component.js');

var _ComponentJs2 = _interopRequireDefault(_ComponentJs);

var _helpersUtilityJs = require('./../helpers/Utility.js');

var _helpersUtilityJs2 = _interopRequireDefault(_helpersUtilityJs);

var _helpersLoggerJs = require('./../helpers/Logger.js');

var _helpersLoggerJs2 = _interopRequireDefault(_helpersLoggerJs);

var _helpersOptionsJs = require('./../helpers/Options.js');

var _helpersOptionsJs2 = _interopRequireDefault(_helpersOptionsJs);

var _helpersSelectorsJs = require('./../helpers/Selectors.js');

var _helpersSelectorsJs2 = _interopRequireDefault(_helpersSelectorsJs);

var _StateManagerJs = require('./StateManager.js');

var Module = (function (_StateManager) {

    /**
     * @constructor
     * @param {HTMLLinkElement} linkElement
     * @return {Component}
     */

    function Module(linkElement) {
        var _this = this;

        _classCallCheck(this, Module);

        _get(Object.getPrototypeOf(Module.prototype), 'constructor', this).call(this);
        this.path = _helpersUtilityJs2['default'].resolver(linkElement.getAttribute('href'), linkElement['import']).development;
        this.state = _StateManagerJs.State.UNRESOLVED;
        this.elements = { link: linkElement };
        this.components = [];

        this.loadModule(linkElement).then(function () {

            // Use only the first template, because otherwise Mapleify will have a difficult job attempting
            // to resolve the paths when there's a mismatch between template elements and link elements.
            // PREVIOUS: this.getTemplates().forEach((templateElement) => {

            var templateElements = _this.getTemplates();

            if (templateElements.length > 1) {
                _helpersLoggerJs2['default'].error('Component "' + linkElement.getAttribute('href') + '" is attempting to register two components');
                return;
            }

            [_this.getTemplates()[0]].forEach(function (templateElement) {

                var scriptElements = _helpersSelectorsJs2['default'].getAllScripts(templateElement.content);

                scriptElements.map(function (scriptElement) {

                    var src = scriptElement.getAttribute('src');

                    if (!_this.path.isLocalPath(src)) {
                        return;
                    }

                    var component = new _ComponentJs2['default'](_this.path, templateElement, scriptElement);
                    _this.components.push(component);
                });
            });

            _this.setState(_StateManagerJs.State.RESOLVED);
        }, function (message) {
            return _helpersLoggerJs2['default'].error(message);
        });
    }

    _inherits(Module, _StateManager);

    _createClass(Module, [{
        key: 'setState',

        /**
         * @method setState
         * @param {Number} state
         * @return {void}
         */
        value: function setState(state) {
            this.state = state;
        }
    }, {
        key: 'loadModule',

        /**
         * @method loadModule
         * @param {HTMLTemplateElement} linkElement
         * @return {Promise}
         */
        value: function loadModule(linkElement) {

            this.setState(_StateManagerJs.State.RESOLVING);

            return new Promise(function (resolve, reject) {

                if (linkElement.hasAttribute('ref')) {
                    return void resolve(linkElement);
                }

                if (linkElement['import']) {
                    return void resolve(linkElement);
                }

                linkElement.addEventListener('load', function () {
                    return resolve(linkElement);
                });

                var href = linkElement.getAttribute('href'),
                    errorMessage = 'Timeout of ' + _helpersOptionsJs2['default'].RESOLVE_TIMEOUT / 1000 + ' seconds exceeded whilst waiting for HTML import: "' + href + '"';
                _helpersUtilityJs2['default'].resolveTimeout(errorMessage, reject);
            });
        }
    }, {
        key: 'getTemplates',

        /**
         * @method getTemplates
         * @return {Array}
         */
        value: function getTemplates() {

            var ownerDocument = this.elements.link['import'];
            return _helpersUtilityJs2['default'].toArray(ownerDocument.querySelectorAll('template'));
        }
    }]);

    return Module;
})(_StateManagerJs.StateManager);

exports['default'] = Module;
module.exports = exports['default'];

},{"./../helpers/Logger.js":4,"./../helpers/Options.js":5,"./../helpers/Selectors.js":6,"./../helpers/Utility.js":7,"./Component.js":8,"./StateManager.js":11}],11:[function(require,module,exports){
/**
 * @constant State
 * @type {{UNRESOLVED: number, RESOLVING: number, RESOLVED: number}}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = { UNRESOLVED: 0, RESOLVING: 1, RESOLVED: 2 };

exports.State = State;
/**
 * @module Maple
 * @submodule StateManager
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Maple.js
 */

var StateManager = (function () {

  /**
   * @constructor
   * @return {Abstract}
   */

  function StateManager() {
    _classCallCheck(this, StateManager);

    this.state = State.UNRESOLVED;
  }

  _createClass(StateManager, [{
    key: "setState",

    /**
     * @method setState
     * @param {Number} state
     * @return {void}
     */
    value: function setState(state) {
      this.state = state;
    }
  }]);

  return StateManager;
})();

exports.StateManager = StateManager;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9DYWNoZUZhY3RvcnkuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2dnZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9PcHRpb25zLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2hlbHBlcnMvU2VsZWN0b3JzLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2hlbHBlcnMvVXRpbGl0eS5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9tb2RlbHMvQ29tcG9uZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9FbGVtZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Nb2R1bGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1N0YXRlTWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OzhCQ0FzQixvQkFBb0I7Ozs7aUNBQ3BCLHVCQUF1Qjs7OztrQ0FDdkIsd0JBQXdCOzs7O2dDQUN4QixzQkFBc0I7Ozs7K0JBQ3RCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2dDQUNyQixzQkFBc0I7Ozs7QUFFNUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFOztBQUUvQixnQkFBWSxDQUFDOztBQUViLFFBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQy9CLGNBQU0sQ0FBQyxVQUFVLEdBQUssT0FBTyxDQUFDO0FBQzlCLGNBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDM0M7Ozs7OztBQU1ELFFBQUksYUFBYSxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7UUFPcEIsS0FBSzs7Ozs7OztBQU1JLGlCQU5ULEtBQUssR0FNTztrQ0FOWixLQUFLOztBQVFILGdCQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDakIsZ0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7O0FBR3JCLHlDQUFPLGVBQWUsRUFBRSxDQUFDOzs7O0FBSXpCLGdCQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUUzQjs7cUJBbEJDLEtBQUs7Ozs7Ozs7Ozs7bUJBMkJFLHFCQUFHOzs7QUFFUixnREFBVSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBVzsyQkFBSyxNQUFLLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztpQkFBQSxDQUFDLENBQUM7YUFFbEc7Ozs7Ozs7Ozs7O21CQVNZLHlCQUFHOztBQUVaLGdEQUFVLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxlQUFlLEVBQUs7O0FBRTNELHdCQUFJLGNBQWMsR0FBRyxnQ0FBVSxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLHdCQUFJLEdBQUcsR0FBYyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pELHdCQUFJLElBQUksR0FBYSw4QkFBUSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQzs7QUFFNUQsa0NBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhLEVBQUs7O0FBRXRDLDRCQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3JELCtEQUFjLElBQUksRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7eUJBQ3ZEO3FCQUVKLENBQUMsQ0FBQztpQkFFTixDQUFDLENBQUM7YUFFTjs7Ozs7Ozs7O21CQU9pQiw0QkFBQyxXQUFXLEVBQUU7O0FBRTVCLG9CQUFJLFdBQVcsVUFBTyxFQUFFO0FBQ3BCLDJCQUFPLEtBQUssZ0NBQVcsV0FBVyxDQUFDLENBQUM7aUJBQ3ZDOztBQUVELG9CQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRTdCLCtCQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFOytCQUFNLE9BQU8sQ0FBQyxXQUFXLENBQUM7cUJBQUEsQ0FBQyxDQUFDOztBQUVqRSx3QkFBSSxJQUFJLEdBQVcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7d0JBQy9DLFlBQVksbUJBQWlCLDhCQUFRLGVBQWUsR0FBRyxJQUFJLDJEQUFzRCxJQUFJLE1BQUcsQ0FBQztBQUM3SCxrREFBUSxjQUFjLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUVoRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVzsyQkFBSyxnQ0FBVyxXQUFXLENBQUM7aUJBQUEsRUFBRSxVQUFDLE9BQU87MkJBQUssNkJBQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFBQSxDQUFDLENBQUM7YUFFekY7Ozs7Ozs7Ozs7O21CQVNlLDRCQUFHOzs7QUFFZixvQkFBSSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFDLFNBQVMsRUFBSzs7QUFFL0MsNkJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUs7O0FBRTVCLDRCQUFJLFVBQVUsR0FBRyw4QkFBUSxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV0RCxrQ0FBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSzs7QUFFekIsZ0NBQUksOEJBQVEsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVCLHVDQUFLLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNqQzt5QkFFSixDQUFDLENBQUM7cUJBRU4sQ0FBQyxDQUFDO2lCQUdOLENBQUMsQ0FBQzs7QUFFSCx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFFekQ7OztlQWpIQyxLQUFLOzs7Ozs7O0FBeUhYLGFBQVMsVUFBVSxHQUFHOztBQUVsQixZQUFJLEtBQUssR0FBUyxTQUFTLENBQUMsVUFBVTtZQUNsQyxXQUFXLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRTlDLFlBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOztBQUUvQyx5QkFBYSxHQUFHLElBQUksQ0FBQzs7O0FBR3JCLGdCQUFJLEtBQUssRUFBRSxDQUFDO1NBRWY7S0FFSjs7O0FBR0QsY0FBVSxFQUFFLENBQUM7QUFDYixhQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FFOUQsQ0FBQSxDQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7O3FCQ3pLTixDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7QUFFbkMsZ0JBQVksQ0FBQzs7Ozs7O0FBTWIsUUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVmLFdBQU87Ozs7Ozs7Ozs7QUFVSCxhQUFLLEVBQUEsZUFBQyxHQUFHLEVBQUU7O0FBRVAsZ0JBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ1osdUJBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCOztBQUVELGlCQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7O0FBRWxDLHVCQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7MkJBQUssUUFBUSxDQUFDLElBQUksRUFBRTtpQkFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2xFLDJCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCLENBQUMsQ0FBQzthQUVOLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFckI7O0tBRUosQ0FBQztDQUVMLENBQUEsQ0FBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7eUJDeENVLGNBQWM7Ozs7Ozs7OztBQU9sQyxDQUFDLFNBQVMsdUJBQXVCLEdBQUc7O0FBRWhDLGdCQUFZLENBQUM7O0FBRWIsUUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7O0FBRXJELFNBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFNBQVMsZUFBZSxHQUFHO0FBQ3pELFlBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDakMsc0JBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3pDLENBQUM7Q0FFTCxDQUFBLEVBQUcsQ0FBQzs7cUJBRVUsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUU7O0FBRXJDLGdCQUFZLENBQUM7Ozs7OztBQU1iLFFBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBTXBCLFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQzs7QUFFdEIsV0FBTzs7Ozs7Ozs7OztBQVVILGdCQUFRLEVBQUEsa0JBQUMsRUFBRSxFQUFFOztBQUVULGdCQUFJLEtBQUssWUFBQSxDQUFDOzs7Ozs7OztBQVFWLHFCQUFTLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRTs7QUFFL0Msb0JBQUksaUJBQWlCLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTs7Ozs7O0FBTXRDLEFBQUMscUJBQUEsU0FBUyxTQUFTLEdBQUc7O0FBRWxCLDZCQUFLLEdBQUc7QUFDSixzQ0FBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztBQUN0QyxxQ0FBUyxFQUFFLGdCQUFnQjt5QkFDOUIsQ0FBQztxQkFFTCxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUcsQ0FBQzs7QUFFN0IsMkJBQU87aUJBRVY7O0FBRUQsb0JBQUksaUJBQWlCLENBQUMsa0JBQWtCLEVBQUU7OztBQUV0Qyw0QkFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7O0FBRXRFLDRCQUFJLFFBQVEsRUFBRTtBQUNWLGtDQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztBQUNyQyxvQ0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzZCQUMzQyxDQUFDLENBQUM7eUJBQ047O2lCQUVKO2FBRUo7O0FBRUQsc0JBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUs7QUFDOUIsb0JBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEUsQ0FBQyxDQUFDOztBQUVILG1CQUFPLEtBQUssQ0FBQztTQUVoQjs7Ozs7Ozs7QUFRRCxxQkFBYSxFQUFBLHVCQUFDLEdBQUcsRUFBK0I7Z0JBQTdCLFdBQVcsZ0NBQUcsYUFBYTs7QUFFMUMsZ0JBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQzs7QUFFeEIsa0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzQyw4QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pELENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxjQUFjLENBQUM7U0FFekI7Ozs7Ozs7QUFPRCx5QkFBaUIsRUFBQSwyQkFBQyxTQUFTLEVBQUU7QUFDekIsc0JBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUI7Ozs7OztBQU1ELHVCQUFlLEVBQUEsMkJBQUc7Ozs7Ozs7Ozs7QUFTZCxnQkFBSSxNQUFNLEdBQUcsVUFBVSxJQUFJLENBQUMsWUFBTTs7QUFFOUIsb0JBQUksUUFBUSxHQUFLLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO29CQUN6QyxPQUFPLEdBQU0sTUFBTTtvQkFDbkIsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIscUJBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFOztBQUVyQix3QkFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BCLGtDQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzdDO2lCQUVKOztBQUVELHVCQUFPLFVBQVUsQ0FBQzthQUVyQixDQUFBLEVBQUcsQ0FBQzs7QUFFTCxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVMsRUFBSzs7QUFFMUIseUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFLLEVBQUs7O0FBRTdDLHdCQUFJLFNBQVMsVUFBUSxLQUFLLENBQUMsSUFBSSxBQUFFO3dCQUM3QixTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUVuQiwyQ0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSzs7QUFFMUMsNEJBQUksS0FBSyxDQUFDLG9CQUFvQixFQUFFOzs7O0FBSTVCLG1DQUFPO3lCQUVWOztBQUVELDRCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVEsaUJBQWlCLENBQUMsRUFBRTs7OztBQUlyRSxtQ0FBTzt5QkFFVjs7O0FBR0QsNEJBQUksS0FBSyxHQUFHLE1BQUssUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVEsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOztBQUV4RSw0QkFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTs7OztBQUkzQixnQ0FBSSxXQUFXLEdBQUcsTUFBSyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV2RCxnQ0FBSSxTQUFTLElBQUksV0FBVyxFQUFFOzs7O0FBSTFCLHlDQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOzZCQUV2RTt5QkFFSjtxQkFFSixDQUFDLENBQUM7OztBQUdILDZCQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsZUFBZTsrQkFBSyxlQUFlLEVBQUU7cUJBQUEsQ0FBQyxDQUFDO2lCQUU3RCxDQUFDLENBQUM7YUFFTixDQUFDLENBQUM7U0FFTjs7S0FFSixDQUFDO0NBRUwsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7O3FCQ3ROSixDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7QUFFcEMsZ0JBQVksQ0FBQzs7QUFFYixXQUFPOzs7Ozs7O0FBT0gsWUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1Ysb0JBQVEsQ0FBQyxHQUFHLG9CQUFrQixPQUFPLFFBQUssMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUMzRjs7Ozs7OztBQU9ELFlBQUksRUFBQSxjQUFDLE9BQU8sRUFBRTtBQUNWLG9CQUFRLENBQUMsR0FBRyxvQkFBa0IsT0FBTyxRQUFLLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDM0Y7Ozs7Ozs7QUFPRCxhQUFLLEVBQUEsZUFBQyxPQUFPLEVBQUU7QUFDWCxvQkFBUSxDQUFDLEdBQUcsb0JBQWtCLE9BQU8sUUFBSywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzNGOztLQUVKLENBQUM7Q0FFTCxDQUFBLENBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7cUJDbkNILENBQUMsU0FBUyxJQUFJLEdBQUc7O0FBRTVCLGdCQUFZLENBQUM7O0FBRWIsV0FBTzs7Ozs7OztBQU9ILHVCQUFlLEVBQUUsS0FBSzs7S0FFekIsQ0FBQztDQUVMLENBQUEsRUFBRzs7Ozs7Ozs7Ozs7Ozt5QkNmZ0IsY0FBYzs7Ozs7Ozs7O0FBT2xDLElBQUksUUFBUSxHQUFHLFNBQVMsUUFBUSxDQUFDLFVBQVUsRUFBRTtBQUN6QyxnQkFBWSxDQUFDO0FBQ2IsV0FBTyx1QkFBUSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDN0QsQ0FBQzs7cUJBRWEsQ0FBQyxTQUFTLElBQUksR0FBRzs7QUFFNUIsZ0JBQVksQ0FBQzs7QUFFYixXQUFPOzs7Ozs7O0FBT0gsbUJBQVcsRUFBQSxxQkFBQyxPQUFPLEVBQUU7QUFDakIsbUJBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsa0RBQThDLENBQUMsQ0FBQztTQUNqRjs7Ozs7OztBQU9ELHFCQUFhLEVBQUEsdUJBQUMsT0FBTyxFQUFFO0FBQ25CLG1CQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDBCQUF3QixDQUFDLENBQUM7U0FDM0Q7Ozs7Ozs7QUFPRCxrQkFBVSxFQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNoQixtQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSx5Q0FBdUMsQ0FBQyxDQUFDO1NBQzFFOzs7Ozs7O0FBT0Qsb0JBQVksRUFBQSxzQkFBQyxPQUFPLEVBQUU7QUFDbEIsbUJBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbEQ7Ozs7Ozs7QUFPRCxrQkFBVSxFQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNoQixtQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25FOzs7Ozs7O0FBT0QscUJBQWEsRUFBQSx1QkFBQyxPQUFPLEVBQUU7QUFDbkIsZ0JBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDJCQUF5QixDQUFDLENBQUM7QUFDakUsbUJBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBUSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLHVCQUFRLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzFGOztLQUVKLENBQUM7Q0FFTCxDQUFBLEVBQUc7Ozs7Ozs7Ozs7Ozs7d0JDM0VnQixhQUFhOzs7O3lCQUNiLGNBQWM7Ozs7cUJBRW5CLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxFQUFFOztBQUVyQyxnQkFBWSxDQUFDOztBQUViLFdBQU87Ozs7OztBQU1ILHlCQUFpQixFQUFFLGNBQWM7Ozs7Ozs7O0FBUWpDLGdCQUFRLEVBQUEsa0JBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRTs7QUFFekIsZ0JBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxPQUFPLEdBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QyxPQUFPLEdBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7QUFPNUMscUJBQVMsV0FBVyxDQUFDLElBQUksRUFBZ0M7b0JBQTlCLGdCQUFnQixnQ0FBRyxTQUFTOztBQUNuRCxvQkFBSSxDQUFDLEdBQUksZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLGlCQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNkLHVCQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDakI7O0FBRUQsbUJBQU87Ozs7OztBQU1ILDBCQUFVLEVBQUU7Ozs7Ozs7QUFPUiwyQkFBTyxFQUFBLGlCQUFDLElBQUksRUFBRTs7QUFFViw0QkFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hCLHdDQUFVLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUc7eUJBQ3ZEOztBQUVELCtCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7cUJBRXZDOzs7Ozs7QUFNRCwwQkFBTSxFQUFBLGdCQUFDLEdBQUcsRUFBRTtBQUNSLCtCQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdkI7Ozs7OztBQU1ELG1DQUFlLEVBQUEsMkJBQUc7QUFDZCwrQkFBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzNCOzs7Ozs7QUFNRCxtQ0FBZSxFQUFBLDJCQUFHO0FBQ2QsK0JBQU8sR0FBRyxDQUFDO3FCQUNkOzs7Ozs7O0FBT0QsK0JBQVcsRUFBQSxxQkFBQyxJQUFJLEVBQUU7QUFDZCwrQkFBTyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMvQjs7aUJBRUo7Ozs7OztBQU1ELDJCQUFXLEVBQUU7Ozs7Ozs7QUFPVCwyQkFBTyxFQUFBLGlCQUFDLElBQUksRUFBRTs7QUFFViw0QkFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hCLHdDQUFVLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBSSxJQUFJLENBQUc7eUJBQzlDOztBQUVELCtCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7cUJBRXZDOzs7Ozs7QUFNRCwwQkFBTSxFQUFBLGdCQUFDLEdBQUcsRUFBRTtBQUNSLCtCQUFPLEdBQUcsQ0FBQztxQkFDZDs7Ozs7O0FBTUQsbUNBQWUsRUFBQSwyQkFBRztBQUNkLCtCQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDckM7Ozs7OztBQU1ELG1DQUFlLEVBQUEsMkJBQUc7QUFDZCwrQkFBTyxhQUFhLENBQUM7cUJBQ3hCOzs7Ozs7O0FBT0QsK0JBQVcsRUFBQSxxQkFBQyxJQUFJLEVBQUU7QUFDZCw0QkFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDakQsK0JBQU8sQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdEQ7O2lCQUVKOzthQUVKLENBQUE7U0FFSjs7Ozs7OztBQU9ELGVBQU8sRUFBQSxpQkFBQyxTQUFTLEVBQUU7QUFDZixtQkFBTyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RGOzs7Ozs7O0FBT0Qsb0JBQVksRUFBQSxzQkFBQyxHQUFHLEVBQWlCOzs7Z0JBQWYsUUFBUSxnQ0FBRyxFQUFFOzs7O0FBSTNCLGVBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDbEIsQUFBQyxxQkFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBTSxNQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEFBQUMsQ0FBQztBQUM3RCxBQUFDLGlCQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQyxDQUFDO2FBQ25ELENBQUMsQ0FBQzs7OztBQUlILG1CQUFPLFFBQVEsQ0FBQztTQUVuQjs7Ozs7Ozs7QUFRRCxtQkFBVyxFQUFBLHFCQUFDLFNBQVMsRUFBZ0I7Z0JBQWQsTUFBTSxnQ0FBRyxHQUFHOztBQUMvQixtQkFBTyxTQUFTLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSzt1QkFBSSxLQUFLO2FBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqRzs7Ozs7OztBQU9ELGVBQU8sRUFBQSxpQkFBQyxVQUFVLEVBQUU7QUFDaEIsbUJBQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzs7Ozs7OztBQU9ELGVBQU8sRUFBQSxpQkFBQyxVQUFVLEVBQUU7QUFDaEIsbUJBQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEOzs7Ozs7O0FBT0QsdUJBQWUsRUFBQSx5QkFBQyxRQUFRLEVBQUU7QUFDdEIsbUJBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEOzs7Ozs7O0FBT0Qsb0JBQVksRUFBQSxzQkFBQyxXQUFXLEVBQUU7O0FBRXRCLGdCQUFJLFVBQVUsR0FBSSxXQUFXLFlBQVksZUFBZTtnQkFDcEQsUUFBUSxHQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUTtnQkFDaEYsV0FBVyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUM5QyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUM7O0FBRXpGLG1CQUFPLFVBQVUsSUFBSSxRQUFRLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQztTQUUvRDs7Ozs7Ozs7QUFRRCxzQkFBYyxFQUFBLHdCQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7QUFDakMsc0JBQVUsQ0FBQzt1QkFBTSxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQUEsRUFBRSx1QkFBUSxlQUFlLENBQUMsQ0FBQztTQUNuRTs7Ozs7Ozs7OztBQVVELHdCQUFnQixFQUFBLDBCQUFDLEtBQUssRUFBRTs7QUFFcEIsZ0JBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM5QixxQkFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6Qjs7QUFFRCxnQkFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ25DLHFCQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCOztBQUVELGdCQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25DLHFCQUFLLEdBQUcsS0FBSyxLQUFLLE1BQU0sQ0FBQzthQUM1Qjs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FFaEI7Ozs7Ozs7O0FBUUQsMEJBQWtCLEVBQUEsNEJBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTs7Ozs7O0FBTWpDLGdCQUFNLFNBQVMsR0FBRztBQUNkLDZEQUE2Qyx1QkFBcUIsSUFBSSxrQ0FBK0I7QUFDckcsMENBQTBCLG9CQUFrQixJQUFJLHdEQUFxRDthQUN4RyxDQUFDOztBQUVGLGdCQUFJOztBQUVBLHlCQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUUvQyxDQUFDLE9BQU8sQ0FBQyxFQUFFOztBQUVSLG9CQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBSzs7QUFFbEQsd0JBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFcEMsd0JBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDekIsOENBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQy9CLCtCQUFPLElBQUksQ0FBQztxQkFDZjs7QUFFRCwyQkFBTyxLQUFLLENBQUM7aUJBRWhCLENBQUMsQ0FBQzs7QUFFSCxvQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLOzJCQUFLLEtBQUs7aUJBQUEsQ0FBQyxFQUFFO0FBQ25DLDBCQUFNLENBQUMsQ0FBRTtpQkFDWjthQUVKO1NBRUo7O0tBRUosQ0FBQztDQUVMLENBQUEsQ0FBRSxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDalVPLGNBQWM7Ozs7Z0NBQ2QseUJBQXlCOzs7OytCQUN6Qix3QkFBd0I7Ozs7Z0NBQ3hCLHlCQUF5Qjs7Ozs4QkFDakIsbUJBQW1COzs7Ozs7Ozs7O0lBU2hDLFNBQVM7Ozs7Ozs7Ozs7Ozs7QUFZZixhQVpNLFNBQVMsQ0FZZCxJQUFJLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRTs7OzhCQVpqQyxTQUFTOztBQWN0QixtQ0FkYSxTQUFTLDZDQWNkO0FBQ1IsWUFBSSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7QUFDckIsWUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDOztBQUVyRSxZQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLFlBQUksQ0FBQyxRQUFRLENBQUMsZ0JBNUJBLEtBQUssQ0E0QkMsU0FBUyxDQUFDLENBQUM7Ozs7QUFJL0IsWUFBSSxHQUFHLFFBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBSSw4QkFBUSxlQUFlLENBQUMsR0FBRyxDQUFDLEFBQUUsQ0FBQzs7QUFFM0UsWUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtBQUM5QyxtQkFBTyxLQUFLLDZCQUFPLEtBQUssMkVBQTJFLENBQUM7U0FDdkc7O0FBRUQsY0FBTSxVQUFPLE1BQUksR0FBRyxDQUFHLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTyxFQUFLOztBQUV0QyxnQkFBSSxDQUFDLE9BQU8sV0FBUSxFQUFFOzs7QUFHbEIsdUJBQU87YUFFVjs7O0FBR0QsbUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBSyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDakQsMkNBQWtCLElBQUksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE9BQU8sV0FBUSxDQUFDLENBQUM7QUFDekUsc0JBQUssUUFBUSxDQUFDLGdCQWxEUixLQUFLLENBa0RTLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDLEVBQUUsVUFBQyxPQUFPO3VCQUFLLDZCQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFBQSxDQUFDLENBQUM7U0FFMUMsQ0FBQyxDQUFDO0tBRU47O2NBOUNnQixTQUFTOztpQkFBVCxTQUFTOzs7Ozs7Ozs7O2VBdURMLGlDQUFHOzs7QUFFcEIsZ0JBQUksY0FBYyxHQUFNLDhCQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDdEgsaUJBQWlCLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFDLGFBQWEsRUFBSztBQUN6RCx1QkFBTyxDQUFDLE9BQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDcEUsQ0FBQyxDQUFDOztBQUVQLG1CQUFPLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFDLGFBQWEsRUFBSzs7QUFFNUMsb0JBQUksR0FBRyxHQUFTLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsNkJBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELDZCQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RELDZCQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFdkMsdUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLOztBQUVwQyxpQ0FBYSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTsrQkFBTSxPQUFPLEVBQUU7cUJBQUEsQ0FBQyxDQUFDO0FBQ3hELDRCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFekMsd0JBQUksSUFBSSxHQUFXLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUNoRCxZQUFZLG1CQUFpQiw4QkFBUSxlQUFlLEdBQUcsSUFBSSxrRUFBNkQsSUFBSSxNQUFHLENBQUM7QUFDcEksa0RBQVEsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFFaEQsQ0FBQyxDQUFDO2FBRU4sQ0FBQyxDQUFDO1NBRU47OztXQWxGZ0IsU0FBUzttQkFUdEIsWUFBWTs7cUJBU0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JDYkwsd0JBQXdCOzs7O2dDQUN4Qix5QkFBeUI7Ozs7K0JBQ3pCLHdCQUF3Qjs7OztxQ0FDeEIsOEJBQThCOzs7O2tDQUM5QiwyQkFBMkI7Ozs7OEJBQ2xCLG1CQUFtQjs7Ozs7Ozs7OztJQVNoQyxhQUFhOzs7Ozs7Ozs7OztBQVVuQixhQVZNLGFBQWEsQ0FVbEIsSUFBSSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFOzhCQVYvQyxhQUFhOztBQVkxQixtQ0FaYSxhQUFhLDZDQVlsQjtBQUNSLFlBQUksQ0FBQyxJQUFJLEdBQU8sSUFBSSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxJQUFJLEdBQU8sQUFBQyxPQUFPLElBQUksS0FBSyxXQUFXLEdBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDbEUsWUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO0FBQ3JFLFlBQUksQ0FBQyxNQUFNLEdBQUssWUFBWSxDQUFDOztBQUU3QixZQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0FBRXRDLFlBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFOztBQUVwQixtQkFBTyxLQUFLLDhCQUFRLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDcEQseUJBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7YUFDeEMsQ0FBQyxDQUFDO1NBRU47O0FBRUQsWUFBSSxTQUFTLFlBQVUsVUFBVSxDQUFDLE1BQU0sWUFBUyxDQUFDOztBQUVsRCxzQ0FBUSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQ3hDLHFCQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDaEUsdUJBQVMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7U0FDM0MsQ0FBQyxDQUFDO0tBRU47O2NBbkNnQixhQUFhOztpQkFBYixhQUFhOzs7Ozs7Ozs7OztlQTZDcEIsb0JBQUMsY0FBYyxFQUFFOzs7Ozs7OztBQU92QixxQkFBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2xCLG9CQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELDRCQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5Qyw0QkFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDOUIsOEJBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUM7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsZ0JBcEVBLEtBQUssQ0FvRUMsU0FBUyxDQUFDLENBQUM7O0FBRS9CLGdCQUFJLE9BQU8sR0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFDbkQsZ0JBQUksWUFBWSxHQUFJLGdDQUFVLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxhQUFhLEdBQUcsZ0NBQVUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JELGdCQUFJLFFBQVEsR0FBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO3VCQUFLLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLOztBQUVqRyx3QkFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtBQUM1Qyw4QkFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQiwrQkFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQiwrQkFBTztxQkFDVjs7QUFFRCx1REFBYSxLQUFLLENBQUMsTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSzs7QUFFL0UsNEJBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7O0FBRTlDLGdDQUFJLENBQUMsTUFBSyxJQUFJLEVBQUU7QUFDWiw2REFBTyxLQUFLLENBQUMsdUVBQXVFLENBQUMsQ0FBQztBQUN0Rix1Q0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDOzZCQUN4Qjs7QUFFRCx5REFBTyxJQUFJLENBQUMsNEZBQTRGLENBQUMsQ0FBQzs7O0FBRzFHLG1DQUFPLEtBQUssTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFDLFFBQVEsRUFBSztBQUM5QyxzQ0FBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0Qix1Q0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDMUIsQ0FBQyxDQUFDO3lCQUVOOztBQUVELDhCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDYiwrQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUVqQixDQUFDLENBQUM7aUJBRU4sQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFSixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7dUJBQU0sTUFBSyxRQUFRLENBQUMsZ0JBM0dqQyxLQUFLLENBMkdrQyxRQUFRLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDaEUsbUJBQU8sUUFBUSxDQUFDO1NBRW5COzs7Ozs7Ozs7Ozs7ZUFVWSx5QkFBRzs7OztBQUlaLGdCQUFJLElBQUksR0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0YsTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7QUFHcEIsb0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsb0JBQUksR0FBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsc0JBQU0sR0FBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFeEI7O0FBRUQsbUJBQU8sRUFBRSxJQUFJLEVBQUUsOEJBQVEsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUU5RDs7Ozs7Ozs7Ozs7OztlQVdrQiw2QkFBQyxnQkFBZ0IsRUFBRTs7QUFFbEMsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkMsTUFBTSxHQUFNLElBQUksQ0FBQyxNQUFNO2dCQUN2QixJQUFJLEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFMUIsbUJBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFOzs7Ozs7QUFNNUQsZ0NBQWdCLEVBQUU7Ozs7OztBQU1kLHlCQUFLLEVBQUUsU0FBUyxLQUFLLEdBQUc7Ozs7Ozs7QUFPcEIsaUNBQVMsZUFBZSxDQUFDLFVBQVUsRUFBRTs7QUFFakMsc0NBQVUsR0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkQsZ0NBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQzs7QUFFekIsc0NBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUs7O0FBRTlCLG9DQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssOEJBQVEsaUJBQWlCLEVBQUU7QUFDOUMsMkNBQU87aUNBQ1Y7OztBQUdELG9DQUFJLElBQUksR0FBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakQsc0NBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsOEJBQVEsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUV6RSxDQUFDLENBQUM7eUJBRU47OztBQUdELDhCQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3BFLHVDQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUMsNEJBQUksQ0FBQyxTQUFTLEdBQVEsRUFBRSxDQUFDOzs7QUFHekIsNEJBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOzRCQUM3QyxjQUFjLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7NEJBQ25ELFVBQVUsR0FBUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7QUFFOUMsa0NBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdkMsNEJBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7QUFHOUQscURBQU8saUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0FBUXBDLGlDQUFTLGNBQWMsR0FBRzs7O0FBRXRCLG1DQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzNDLHVDQUFLLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyx1Q0FBSyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzZCQUNyQyxDQUFDLENBQUM7eUJBRU47O0FBRUQsc0NBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBRTlCOztpQkFFSjs7YUFFSixDQUFDLENBQUM7U0FFTjs7O1dBL05nQixhQUFhO21CQVQxQixZQUFZOztxQkFTQyxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkNkWixnQkFBZ0I7Ozs7Z0NBQ2hCLHlCQUF5Qjs7OzsrQkFDekIsd0JBQXdCOzs7O2dDQUN4Qix5QkFBeUI7Ozs7a0NBQ3pCLDJCQUEyQjs7Ozs4QkFDZixtQkFBbUI7O0lBRWhDLE1BQU07Ozs7Ozs7O0FBT1osYUFQTSxNQUFNLENBT1gsV0FBVyxFQUFFOzs7OEJBUFIsTUFBTTs7QUFTbkIsbUNBVGEsTUFBTSw2Q0FTWDtBQUNSLFlBQUksQ0FBQyxJQUFJLEdBQVMsOEJBQVEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxVQUFPLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFDckcsWUFBSSxDQUFDLEtBQUssR0FBUSxnQkFiSixLQUFLLENBYUssVUFBVSxDQUFDO0FBQ25DLFlBQUksQ0FBQyxRQUFRLEdBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDeEMsWUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07Ozs7OztBQU1wQyxnQkFBSSxnQkFBZ0IsR0FBRyxNQUFLLFlBQVksRUFBRSxDQUFDOztBQUUzQyxnQkFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLDZDQUFPLEtBQUssaUJBQWUsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsZ0RBQTZDLENBQUM7QUFDekcsdUJBQU87YUFDVjs7QUFFRCxhQUFDLE1BQUssWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxlQUFlLEVBQUs7O0FBRWxELG9CQUFJLGNBQWMsR0FBRyxnQ0FBVSxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUV0RSw4QkFBYyxDQUFDLEdBQUcsQ0FBQyxVQUFDLGFBQWEsRUFBSzs7QUFFbEMsd0JBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTVDLHdCQUFJLENBQUMsTUFBSyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLCtCQUFPO3FCQUNWOztBQUVELHdCQUFJLFNBQVMsR0FBRyw2QkFBYyxNQUFLLElBQUksRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekUsMEJBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFFbkMsQ0FBQyxDQUFDO2FBRU4sQ0FBQyxDQUFDOztBQUVILGtCQUFLLFFBQVEsQ0FBQyxnQkFqREosS0FBSyxDQWlESyxRQUFRLENBQUMsQ0FBQztTQUVqQyxFQUFFLFVBQUMsT0FBTzttQkFBSyw2QkFBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQUEsQ0FBQyxDQUFDO0tBRTFDOztjQW5EZ0IsTUFBTTs7aUJBQU4sTUFBTTs7Ozs7Ozs7ZUEwRGYsa0JBQUMsS0FBSyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3RCOzs7Ozs7Ozs7ZUFPUyxvQkFBQyxXQUFXLEVBQUU7O0FBRXBCLGdCQUFJLENBQUMsUUFBUSxDQUFDLGdCQXZFQSxLQUFLLENBdUVDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXBDLG9CQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDakMsMkJBQU8sS0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3BDOztBQUVELG9CQUFJLFdBQVcsVUFBTyxFQUFFO0FBQ3BCLDJCQUFPLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwQzs7QUFFRCwyQkFBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTsyQkFBTSxPQUFPLENBQUMsV0FBVyxDQUFDO2lCQUFBLENBQUMsQ0FBQzs7QUFFakUsb0JBQUksSUFBSSxHQUFXLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUMvQyxZQUFZLG1CQUFpQiw4QkFBUSxlQUFlLEdBQUcsSUFBSSwyREFBc0QsSUFBSSxNQUFHLENBQUM7QUFDN0gsOENBQVEsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUVoRCxDQUFDLENBQUM7U0FFTjs7Ozs7Ozs7ZUFNVyx3QkFBRzs7QUFFWCxnQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQU8sQ0FBQztBQUM5QyxtQkFBTyw4QkFBUSxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FFdEU7OztXQXBHZ0IsTUFBTTttQkFGbkIsWUFBWTs7cUJBRUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSHBCLElBQU0sS0FBSyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQzs7UUFBckQsS0FBSyxHQUFMLEtBQUs7Ozs7Ozs7O0lBUUwsWUFBWTs7Ozs7OztBQU1WLFdBTkYsWUFBWSxHQU1QOzBCQU5MLFlBQVk7O0FBT2pCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztHQUNqQzs7ZUFSUSxZQUFZOzs7Ozs7OztXQWViLGtCQUFDLEtBQUssRUFBRTtBQUNaLFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7U0FqQlEsWUFBWTs7O1FBQVosWUFBWSxHQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1vZHVsZSAgICBmcm9tICcuL21vZGVscy9Nb2R1bGUuanMnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL21vZGVscy9Db21wb25lbnQuanMnO1xuaW1wb3J0IHNlbGVjdG9ycyBmcm9tICcuL2hlbHBlcnMvU2VsZWN0b3JzLmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZ2dlciAgICBmcm9tICcuL2hlbHBlcnMvTG9nZ2VyLmpzJztcbmltcG9ydCBldmVudHMgICAgZnJvbSAnLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgb3B0aW9ucyAgIGZyb20gJy4vaGVscGVycy9PcHRpb25zLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciAgID0gJ2JhYmVsJztcbiAgICAgICAgU3lzdGVtLmJhYmVsT3B0aW9ucyA9IHsgYmxhY2tsaXN0OiBbXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBjb25zdGFudCBIQVNfSU5JVElBVEVEXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgbGV0IEhBU19JTklUSUFURUQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgTWFwbGVcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gICAgICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAgICAgKi9cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZmluZExpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLmZpbmRUZW1wbGF0ZXMoKTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBldmVudCBkZWxlZ2F0aW9uIG1hcHBpbmdzLlxuICAgICAgICAgICAgZXZlbnRzLnNldHVwRGVsZWdhdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGFueSBjaGFuZ2VzIHRvIHRoZSBET00gd2hlcmUgSFRNTCBpbXBvcnRzIGNhbiBiZSBkeW5hbWljYWxseSBpbXBvcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgZXh0ZXJuYWwgbGluayBlbGVtZW50cywgYXMgd2VsbCBhcyB0aGUgaW5saW5lIHRlbXBsYXRlIGVsZW1lbnRzXG4gICAgICAgICAqIHRoYXQgY2FuIGJlIGhhbmRjcmFmdGVkLCBvciBiYWtlZCBpbnRvIHRoZSBIVE1MIGRvY3VtZW50IHdoZW4gY29tcGlsaW5nIGEgcHJvamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmaW5kTGlua3NcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRMaW5rcygpIHtcblxuICAgICAgICAgICAgc2VsZWN0b3JzLmdldEltcG9ydHMoJGRvY3VtZW50KS5mb3JFYWNoKChsaW5rRWxlbWVudCkgPT4gdGhpcy53YWl0Rm9yTGlua0VsZW1lbnQobGlua0VsZW1lbnQpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgdGVtcGxhdGUgSFRNTCBlbGVtZW50cyB0aGF0IGNvbnRhaW4gdGhlIGByZWZgIGF0dHJpYnV0ZSB3aGljaFxuICAgICAgICAgKiBpcyB0aGUgY29tcG9uZW50J3Mgb3JpZ2luYWwgcGF0aCBiZWZvcmUgTWFwbGVpZnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmluZFRlbXBsYXRlc1xuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZFRlbXBsYXRlcygpIHtcblxuICAgICAgICAgICAgc2VsZWN0b3JzLmdldFRlbXBsYXRlcygkZG9jdW1lbnQpLmZvckVhY2goKHRlbXBsYXRlRWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdEVsZW1lbnRzID0gc2VsZWN0b3JzLmdldEFsbFNjcmlwdHModGVtcGxhdGVFbGVtZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGxldCByZWYgICAgICAgICAgICA9IHRlbXBsYXRlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JlZicpO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoICAgICAgICAgICA9IHV0aWxpdHkucmVzb2x2ZXIocmVmLCBudWxsKS5wcm9kdWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgc2NyaXB0RWxlbWVudHMuZm9yRWFjaCgoc2NyaXB0RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoLmlzTG9jYWxQYXRoKHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDb21wb25lbnQocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB3YWl0Rm9yTGlua0VsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtIVE1MTGlua0VsZW1lbnR9IGxpbmtFbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB3YWl0Rm9yTGlua0VsZW1lbnQobGlua0VsZW1lbnQpIHtcblxuICAgICAgICAgICAgaWYgKGxpbmtFbGVtZW50LmltcG9ydCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIG5ldyBNb2R1bGUobGlua0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gcmVzb2x2ZShsaW5rRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgICAgICAgICA9IGxpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVGltZW91dCBvZiAke29wdGlvbnMuUkVTT0xWRV9USU1FT1VUIC8gMTAwMH0gc2Vjb25kcyBleGNlZWRlZCB3aGlsc3Qgd2FpdGluZyBmb3IgSFRNTCBpbXBvcnQ6IFwiJHtocmVmfVwiYDtcbiAgICAgICAgICAgICAgICB1dGlsaXR5LnJlc29sdmVUaW1lb3V0KGVycm9yTWVzc2FnZSwgcmVqZWN0KTtcblxuICAgICAgICAgICAgfSkudGhlbigobGlua0VsZW1lbnQpID0+IG5ldyBNb2R1bGUobGlua0VsZW1lbnQpLCAobWVzc2FnZSkgPT4gbG9nZ2VyLmVycm9yKG1lc3NhZ2UpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExpc3RlbnMgZm9yIGNoYW5nZXMgdG8gdGhlIGBIVE1MSGVhZEVsZW1lbnRgIG5vZGUgYW5kIHJlZ2lzdGVycyBhbnkgbmV3IGltcG9ydHMgdGhhdCBhcmVcbiAgICAgICAgICogZHluYW1pY2FsbHkgaW1wb3J0ZWQgaW50byB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgb2JzZXJ2ZU11dGF0aW9uc1xuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2ZU11dGF0aW9ucygpIHtcblxuICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuXG4gICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZGVkTm9kZXMgPSB1dGlsaXR5LnRvQXJyYXkobXV0YXRpb24uYWRkZWROb2Rlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1dGlsaXR5LmlzSFRNTEltcG9ydChub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvckxpbmtFbGVtZW50KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJGRvY3VtZW50LmhlYWQsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgaW5pdGlhbGlzZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcblxuICAgICAgICBsZXQgc3RhdGUgICAgICAgPSAkZG9jdW1lbnQucmVhZHlTdGF0ZSxcbiAgICAgICAgICAgIHJlYWR5U3RhdGVzID0gWydpbnRlcmFjdGl2ZScsICdjb21wbGV0ZSddO1xuXG4gICAgICAgIGlmICghSEFTX0lOSVRJQVRFRCAmJiB+cmVhZHlTdGF0ZXMuaW5kZXhPZihzdGF0ZSkpIHtcblxuICAgICAgICAgICAgSEFTX0lOSVRJQVRFRCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIE5vIGRvY3VtZW50cywgbm8gcGVyc29uLlxuICAgICAgICAgICAgbmV3IE1hcGxlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydCBmb3IgYXN5bmMsIGRlZmVyLCBhbmQgbm9ybWFsIGluY2x1c2lvbi5cbiAgICBpbml0aWFsaXNlKCk7XG4gICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXNlKTtcblxufSkod2luZG93LCBkb2N1bWVudCk7IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJHdpbmRvdykge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgY2FjaGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxldCBjYWNoZSA9IHt9O1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzcG9uc2libGUgZm9yIGRlbGVnYXRpbmcgdG8gdGhlIG5hdGl2ZSBgZmV0Y2hgIGZ1bmN0aW9uIChwb2x5ZmlsbCBwcm92aWRlZCksIGJ1dCB3aWxsIGNhY2hlIHRoZVxuICAgICAgICAgKiBpbml0aWFsIHByb21pc2UgaW4gb3JkZXIgZm9yIG90aGVyIGludm9jYXRpb25zIHRvIHRoZSBzYW1lIFVSTCB0byB5aWVsZCB0aGUgc2FtZSBwcm9taXNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGZldGNoXG4gICAgICAgICAqIEBwYXJhbSB1cmwge1N0cmluZ31cbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgICAgICovXG4gICAgICAgIGZldGNoKHVybCkge1xuXG4gICAgICAgICAgICBpZiAoY2FjaGVbdXJsXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZVt1cmxdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZVt1cmxdID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgICAgICR3aW5kb3cuZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKS50aGVuKChib2R5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYm9keSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVbdXJsXTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSh3aW5kb3cpOyIsImltcG9ydCB1dGlsaXR5IGZyb20gJy4vVXRpbGl0eS5qcyc7XG5cbi8qKlxuICogQG1ldGhvZCBvdmVycmlkZVN0b3BQcm9wYWdhdGlvblxuICogQHNlZTogaHR0cDovL2JpdC5seS8xZFBweEhsXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG4oZnVuY3Rpb24gb3ZlcnJpZGVTdG9wUHJvcGFnYXRpb24oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGxldCBvdmVycmlkZGVuU3RvcCA9IEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb247XG5cbiAgICBFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKCkge1xuICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgb3ZlcnJpZGRlblN0b3AuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigkZG9jdW1lbnQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IGNvbXBvbmVudHNcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgbGV0IGNvbXBvbmVudHMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBldmVudE5hbWVzXG4gICAgICogQHR5cGUge0FycmF5fG51bGx9XG4gICAgICovXG4gICAgbGV0IGV2ZW50TmFtZXMgPSBudWxsO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVjdXJzaXZlbHkgZGlzY292ZXIgYSBjb21wb25lbnQgdmlhIGl0cyBSZWFjdCBJRCB0aGF0IGlzIHNldCBhcyBhIGRhdGEgYXR0cmlidXRlXG4gICAgICAgICAqIG9uIGVhY2ggUmVhY3QgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmaW5kQnlJZFxuICAgICAgICAgKiBAcGFyYW0gaWQge1N0cmluZ31cbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgbGV0IG1vZGVsO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgZmluZFxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHJlbmRlcmVkQ29tcG9uZW50XG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY3VycmVudENvbXBvbmVudFxuICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmluZChyZW5kZXJlZENvbXBvbmVudCwgY3VycmVudENvbXBvbmVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkQ29tcG9uZW50Ll9yb290Tm9kZUlEID09PSBpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGJpbmRNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGJpbmRNb2RlbCgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBjdXJyZW50Q29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZChyZW5kZXJlZENvbXBvbmVudCkpKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHJlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5fcmVuZGVyZWRDaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmQoY2hpbGRyZW5baW5kZXhdLCBjdXJyZW50Q29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBmaW5kKGNvbXBvbmVudC5fcmVhY3RJbnRlcm5hbEluc3RhbmNlLl9yZW5kZXJlZENvbXBvbmVudCwgY29tcG9uZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9kZWw7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0cmFuc2Zvcm1LZXlzXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFt0cmFuc2Zvcm1lcj0ndG9Mb3dlckNhc2UnXVxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB0cmFuc2Zvcm1LZXlzKG1hcCwgdHJhbnNmb3JtZXIgPSAndG9Mb3dlckNhc2UnKSB7XG5cbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZE1hcCA9IHt9O1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goZnVuY3Rpb24gZm9yRWFjaChrZXkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZE1hcFtrZXlbdHJhbnNmb3JtZXJdKCldID0gbWFwW2tleV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkTWFwO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVnaXN0ZXJDb21wb25lbnRcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBzZXR1cERlbGVnYXRpb25cbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHNldHVwRGVsZWdhdGlvbigpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZXRlcm1pbmVzIGFsbCBvZiB0aGUgZXZlbnQgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGJyb3dzZXIuIFdpbGwgY2FjaGUgdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICAqIG9mIHRoaXMgZGlzY292ZXJ5IGZvciBwZXJmb3JtYW5jZSBiZW5lZml0cy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgZXZlbnRzXG4gICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBldmVudHMgPSBldmVudE5hbWVzIHx8ICgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgYUVsZW1lbnQgICA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXIgICAgPSAvXm9uL2ksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGFFbGVtZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5tYXRjaChtYXRjaGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lcy5wdXNoKGtleS5yZXBsYWNlKG1hdGNoZXIsICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudE5hbWVzO1xuXG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBgb24ke2V2ZW50LnR5cGV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TGlzdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxpdHkudG9BcnJheShldmVudC5wYXRoKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWV0aG9kIGBzdG9wUHJvcGFnYXRpb25gIHdhcyBpbnZva2VkIG9uIHRoZSBjdXJyZW50IGV2ZW50LCB3aGljaCBwcmV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzIGZyb20gcHJvcGFnYXRpbmcgYW55IGZ1cnRoZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5nZXRBdHRyaWJ1dGUgfHwgIWl0ZW0uaGFzQXR0cmlidXRlKHV0aWxpdHkuQVRUUklCVVRFX1JFQUNUSUQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IGVsZW1lbnQgaXMgbm90IGEgdmFsaWQgUmVhY3QgZWxlbWVudCBiZWNhdXNlIGl0IGRvZXNuJ3QgaGF2ZSBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVhY3QgSUQgZGF0YSBhdHRyaWJ1dGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gZmllbGQgdGhlIGNvbXBvbmVudCBieSB0aGUgYXNzb2NpYXRlZCBSZWFjdCBJRC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb2RlbCA9IHRoaXMuZmluZEJ5SWQoaXRlbS5nZXRBdHRyaWJ1dGUodXRpbGl0eS5BVFRSSUJVVEVfUkVBQ1RJRCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwucHJvcGVydGllcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNmb3JtIHRoZSBjdXJyZW50IFJlYWN0IGV2ZW50cyBpbnRvIGxvd2VyIGNhc2Uga2V5cywgc28gdGhhdCB3ZSBjYW4gcGFpciB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXAgd2l0aCB0aGUgZXZlbnQgdHlwZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm1LZXlzKG1vZGVsLnByb3BlcnRpZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSBpbiB0cmFuc2Zvcm1lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGRlZmVyIHRoZSBpbnZvY2F0aW9uIG9mIHRoZSBldmVudCBtZXRob2QsIGJlY2F1c2Ugb3RoZXJ3aXNlIFJlYWN0LmpzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgcmUtcmVuZGVyLCBhbmQgdGhlIFJlYWN0IElEcyB3aWxsIHRoZW4gYmUgXCJvdXQgb2Ygc3luY1wiIGZvciB0aGlzIGV2ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudExpc3QucHVzaCh0cmFuc2Zvcm1lZFtldmVudE5hbWVdLmJpbmQobW9kZWwuY29tcG9uZW50LCBldmVudCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSW52b2tlIGVhY2ggZm91bmQgZXZlbnQgZm9yIHRoZSBldmVudCB0eXBlLlxuICAgICAgICAgICAgICAgICAgICBldmVudExpc3QuZm9yRWFjaCgoZXZlbnRJbnZvY2F0aW9uKSA9PiBldmVudEludm9jYXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkod2luZG93LmRvY3VtZW50KTsiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigkY29uc29sZSkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHdhcm5cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHdhcm4obWVzc2FnZSkge1xuICAgICAgICAgICAgJGNvbnNvbGUubG9nKGAlY01hcGxlLmpzOiAlYyR7bWVzc2FnZX0uYCwgJ2NvbG9yOiByZ2JhKDAsIDAsIDAsIC41KScsICdjb2xvcjogIzVGOUVBMCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGluZm8obWVzc2FnZSkge1xuICAgICAgICAgICAgJGNvbnNvbGUubG9nKGAlY01hcGxlLmpzOiAlYyR7bWVzc2FnZX0uYCwgJ2NvbG9yOiByZ2JhKDAsIDAsIDAsIC41KScsICdjb2xvcjogIzAwOEREQicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGVycm9yXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBlcnJvcihtZXNzYWdlKSB7XG4gICAgICAgICAgICAkY29uc29sZS5sb2coYCVjTWFwbGUuanM6ICVjJHttZXNzYWdlfS5gLCAnY29sb3I6IHJnYmEoMCwgMCwgMCwgLjUpJywgJ2NvbG9yOiAjQ0Q2MDkwJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKHdpbmRvdy5jb25zb2xlKTsiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0YW50IFJFU09MVkVfVElNRU9VVFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCA2MDAwMFxuICAgICAgICAgKi9cbiAgICAgICAgUkVTT0xWRV9USU1FT1VUOiA2MDAwMFxuXG4gICAgfTtcblxufSkoKTsiLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuL1V0aWxpdHkuanMnO1xuXG4vKipcbiAqIEBtZXRob2QgcXVlcnlBbGxcbiAqIEBwYXJhbSB7U3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xubGV0IHF1ZXJ5QWxsID0gZnVuY3Rpb24gcXVlcnlBbGwoZXhwcmVzc2lvbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkodGhpcy5xdWVyeVNlbGVjdG9yQWxsKGV4cHJlc3Npb24pKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENTU0xpbmtzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q1NTTGlua3MoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ2xpbmtbdHlwZT1cInRleHQvY3NzXCJdLGxpbmtbdHlwZT1cInRleHQvc2Nzc1wiXScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENTU0lubGluZXNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDU1NJbmxpbmVzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeUFsbC5jYWxsKGVsZW1lbnQsICdzdHlsZVt0eXBlPVwidGV4dC9jc3NcIl0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRJbXBvcnRzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0SW1wb3J0cyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAnbGlua1tyZWw9XCJpbXBvcnRcIl06bm90KFtkYXRhLWlnbm9yZV0pJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0VGVtcGxhdGVzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VGVtcGxhdGVzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeUFsbC5jYWxsKGVsZW1lbnQsICd0ZW1wbGF0ZVtyZWZdJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0U2NyaXB0c1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFNjcmlwdHMoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ3NjcmlwdFt0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCJdJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0QWxsU2NyaXB0c1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldEFsbFNjcmlwdHMoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGpzeEZpbGVzID0gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAnc2NyaXB0W3R5cGU9XCJ0ZXh0L2pzeFwiXScpO1xuICAgICAgICAgICAgcmV0dXJuIFtdLmNvbmNhdCh1dGlsaXR5LnRvQXJyYXkodGhpcy5nZXRTY3JpcHRzKGVsZW1lbnQpKSwgdXRpbGl0eS50b0FycmF5KGpzeEZpbGVzKSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IGxvZ2dlciAgZnJvbSAnLi9Mb2dnZXIuanMnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9PcHRpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdGFudCBBVFRSSUJVVEVfUkVBQ1RJRFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgQVRUUklCVVRFX1JFQUNUSUQ6ICdkYXRhLXJlYWN0aWQnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlc29sdmVyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRG9jdW1lbnR8bnVsbH0gb3duZXJEb2N1bWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICByZXNvbHZlcih1cmwsIG93bmVyRG9jdW1lbnQpIHtcblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFBhdGggPSB0aGlzLmdldFBhdGgodXJsKSxcbiAgICAgICAgICAgICAgICBnZXRQYXRoICAgICAgID0gdGhpcy5nZXRQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZ2V0TmFtZSAgICAgICA9IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWV0aG9kIHJlc29sdmVQYXRoXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICogQHBhcmFtIHtIVE1MRG9jdW1lbnR9IG92ZXJyaWRlRG9jdW1lbnRcbiAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZVBhdGgocGF0aCwgb3ZlcnJpZGVEb2N1bWVudCA9ICRkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBhICA9IG92ZXJyaWRlRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgIGEuaHJlZiA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaHJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0aW9uXG4gICAgICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBwcm9kdWN0aW9uOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXRoKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NhbFBhdGgocGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBYnNvbHV0ZVBhdGgoKX0vJHtnZXROYW1lKHBhdGgpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUGF0aChwYXRoLCAkZG9jdW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0U3JjXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFNyYyhzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXROYW1lKHNyYyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0QWJzb2x1dGVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldEFic29sdXRlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUGF0aCh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldFJlbGF0aXZlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRSZWxhdGl2ZVBhdGgoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGlzTG9jYWxQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpc0xvY2FsUGF0aChwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF+cGF0aC5pbmRleE9mKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkgZGV2ZWxvcG1lbnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGRldmVsb3BtZW50OiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXRoKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NhbFBhdGgocGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBYnNvbHV0ZVBhdGgoKX0vJHtwYXRofWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUGF0aChwYXRoLCAkZG9jdW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0U3JjXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFNyYyhzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzcmM7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0QWJzb2x1dGVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldEFic29sdXRlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUGF0aChjb21wb25lbnRQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRSZWxhdGl2ZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVsYXRpdmVQYXRoKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgaXNMb2NhbFBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHBhdGgge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlzTG9jYWxQYXRoKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggPSBnZXRQYXRoKHJlc29sdmVQYXRoKHBhdGgsIG93bmVyRG9jdW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIX5yZXNvbHZlUGF0aChjb21wb25lbnRQYXRoKS5pbmRleE9mKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHsqfSBhcnJheUxpa2VcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0b0FycmF5KGFycmF5TGlrZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20gPyBBcnJheS5mcm9tKGFycmF5TGlrZSkgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJyYXlMaWtlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBmbGF0dGVuQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtnaXZlbkFycj1bXV1cbiAgICAgICAgICovXG4gICAgICAgIGZsYXR0ZW5BcnJheShhcnIsIGdpdmVuQXJyID0gW10pIHtcblxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG4gICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGl0ZW0pKSAmJiAodGhpcy5mbGF0dGVuQXJyYXkoaXRlbSwgZ2l2ZW5BcnIpKTtcbiAgICAgICAgICAgICAgICAoIUFycmF5LmlzQXJyYXkoaXRlbSkpICYmIChnaXZlbkFyci5wdXNoKGl0ZW0pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4gICAgICAgICAgICByZXR1cm4gZ2l2ZW5BcnI7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b1NuYWtlQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FtZWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbam9pbmVyPSctJ11cbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TbmFrZUNhc2UoY2FtZWxDYXNlLCBqb2luZXIgPSAnLScpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW1lbENhc2Uuc3BsaXQoLyhbQS1aXVthLXpdezAsfSkvZykuZmlsdGVyKHBhcnRzID0+IHBhcnRzKS5qb2luKGpvaW5lcikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXROYW1lXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdldE5hbWUoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgtMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRQYXRoKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVFeHRlbnNpb25cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZUV4dGVuc2lvbihmaWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoLnNwbGl0KCcuJykuc2xpY2UoMCwgLTEpLmpvaW4oJy4nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBpc0hUTUxJbXBvcnRcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaHRtbEVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGlzSFRNTEltcG9ydChodG1sRWxlbWVudCkge1xuXG4gICAgICAgICAgICBsZXQgaXNJbnN0YW5jZSAgPSBodG1sRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxMaW5rRWxlbWVudCxcbiAgICAgICAgICAgICAgICBpc0ltcG9ydCAgICA9IFN0cmluZyhodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JlbCcpKS50b0xvd2VyQ2FzZSgpID09PSAnaW1wb3J0JyxcbiAgICAgICAgICAgICAgICBoYXNIcmVmQXR0ciA9IGh0bWxFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnaHJlZicpLFxuICAgICAgICAgICAgICAgIGhhc1R5cGVIdG1sID0gU3RyaW5nKGh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpKS50b0xvd2VyQ2FzZSgpID09PSAndGV4dC9odG1sJztcblxuICAgICAgICAgICAgcmV0dXJuIGlzSW5zdGFuY2UgJiYgaXNJbXBvcnQgJiYgaGFzSHJlZkF0dHIgJiYgaGFzVHlwZUh0bWw7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZXNvbHZlVGltZW91dFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVzb2x2ZVRpbWVvdXQoZXJyb3JNZXNzYWdlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KGVycm9yTWVzc2FnZSksIG9wdGlvbnMuUkVTT0xWRV9USU1FT1VUKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FzdHMgcHJpbWl0aXZlIHZhbHVlcyBpbnRvIHRoZWlyIHJlc3BlY3RpdmUgdHlwZXMuIElnbm9yZXMgY29tcGxleCB0eXBlcywgaW5jbHVkaW5nIEpTT04gb2JqZWN0cy5cbiAgICAgICAgICogQ3VycmVudGx5IHN1cHBvcnRlZCBhcmU6IGJvb2xlYW5zLCBpbnRlZ2VycywgYW5kIGZsb2F0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0eXBlY2FzdFByb3BlcnR5XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZWNhc3RQcm9wZXJ0eSh2YWx1ZSkge1xuXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChTdHJpbmcodmFsdWUpLm1hdGNoKC9eXFxkK1xcLlxcZCsvaSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoflsndHJ1ZScsICdmYWxzZSddLmluZGV4T2YodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0cnlSZWdpc3RlckVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHRyeVJlZ2lzdGVyRWxlbWVudChuYW1lLCBwcm9wZXJ0aWVzKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQGNvbnN0YW50IEVSUk9SX01BUFxuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgRVJST1JfTUFQID0ge1xuICAgICAgICAgICAgICAgICdBIHR5cGUgd2l0aCB0aGF0IG5hbWUgaXMgYWxyZWFkeSByZWdpc3RlcmVkJzogYEN1c3RvbSBlbGVtZW50IFwiJHtuYW1lfVwiIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZGAsXG4gICAgICAgICAgICAgICAgJ1RoZSB0eXBlIG5hbWUgaXMgaW52YWxpZCc6IGBFbGVtZW50IG5hbWUgJHtuYW1lfSBpcyBpbnZhbGlkIGFuZCBtdXN0IGNvbnNpc3Qgb2YgYXQgbGVhc3Qgb25lIGh5cGhlbmBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KG5hbWUsIHByb3BlcnRpZXMpO1xuXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JEYXRhID0gT2JqZWN0LmtleXMoRVJST1JfTUFQKS5tYXAoKGVycm9yKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoZXJyb3IsICdpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUubWVzc2FnZS5tYXRjaChyZWdFeHApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoRVJST1JfTUFQW2Vycm9yXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvckRhdGEuc29tZSgobW9kZWwpID0+IG1vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyhlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSh3aW5kb3cuZG9jdW1lbnQpOyIsImltcG9ydCBDdXN0b21FbGVtZW50IGZyb20gJy4vRWxlbWVudC5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgbG9nZ2VyICAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvTG9nZ2VyLmpzJztcbmltcG9ydCBvcHRpb25zICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9PcHRpb25zLmpzJztcbmltcG9ydCB7U3RhdGVNYW5hZ2VyLCBTdGF0ZX0gZnJvbSAnLi9TdGF0ZU1hbmFnZXIuanMnO1xuXG4vKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBTdGF0ZU1hbmFnZXJcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zaWJsZSBmb3IgbG9hZGluZyBhbnkgcHJlcmVxdWlzaXRlcyBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBkZWxlZ2F0ZWQgdG8gZWFjaCBgQ3VzdG9tRWxlbWVudGBcbiAgICAgKiBvYmplY3QgZm9yIGNyZWF0aW5nIGEgY3VzdG9tIGVsZW1lbnQsIGFuZCBsYXN0bHkgcmVuZGVyaW5nIHRoZSBSZWFjdCBjb21wb25lbnQgdG8gdGhlIGRlc2lnbmF0ZWQgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdEVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtNb2R1bGV9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50KSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXRoICAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7IHNjcmlwdDogc2NyaXB0RWxlbWVudCwgdGVtcGxhdGU6IHRlbXBsYXRlRWxlbWVudCB9O1xuXG4gICAgICAgIGxldCBzcmMgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWSU5HKTtcblxuICAgICAgICAvLyBDb25maWd1cmUgdGhlIFVSTCBvZiB0aGUgY29tcG9uZW50IGZvciBFUzYgYFN5c3RlbS5pbXBvcnRgLCB3aGljaCBpcyBhbHNvIHBvbHlmaWxsZWQgaW4gY2FzZSB0aGVcbiAgICAgICAgLy8gY3VycmVudCBicm93c2VyIGRvZXMgbm90IHByb3ZpZGUgc3VwcG9ydCBmb3IgZHluYW1pYyBtb2R1bGUgbG9hZGluZy5cbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMucGF0aC5nZXRSZWxhdGl2ZVBhdGgoKX0vJHt1dGlsaXR5LnJlbW92ZUV4dGVuc2lvbihzcmMpfWA7XG5cbiAgICAgICAgaWYgKHNyYy5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCkgPT09ICdqc3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBsb2dnZXIuZXJyb3IoYFVzZSBKUyBleHRlbnNpb24gaW5zdGVhZCBvZiBKU1gg4oCTIEpTWCBjb21waWxhdGlvbiB3aWxsIHdvcmsgYXMgZXhwZWN0ZWRgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFN5c3RlbS5pbXBvcnQoYCR7dXJsfWApLnRoZW4oKGltcG9ydHMpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFpbXBvcnRzLmRlZmF1bHQpIHtcblxuICAgICAgICAgICAgICAgIC8vIENvbXBvbmVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0IChpLmU6IGV4cG9ydCBkZWZhdWx0IGNsYXNzLi4uKSB3aWxsIGJlIGlnbm9yZWQuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgYWxsIHRoaXJkLXBhcnR5IHNjcmlwdHMgdGhhdCBhcmUgYSBwcmVyZXF1aXNpdGUgb2YgcmVzb2x2aW5nIHRoZSBjdXN0b20gZWxlbWVudC5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHRoaXMubG9hZFRoaXJkUGFydHlTY3JpcHRzKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FbGVtZW50KHBhdGgsIHRlbXBsYXRlRWxlbWVudCwgc2NyaXB0RWxlbWVudCwgaW1wb3J0cy5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVkVEKTtcbiAgICAgICAgICAgIH0sIChtZXNzYWdlKSA9PiBsb2dnZXIuZXJyb3IobWVzc2FnZSkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzY292ZXIgYWxsIG9mIHRoZSB0aGlyZCBwYXJ0eSBKYXZhU2NyaXB0IGRlcGVuZGVuY2llcyB0aGF0IGFyZSByZXF1aXJlZCB0byBoYXZlIGJlZW4gbG9hZGVkIGJlZm9yZVxuICAgICAqIGF0dGVtcHRpbmcgdG8gcmVuZGVyIHRoZSBjdXN0b20gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFRoaXJkUGFydHlTY3JpcHRzXG4gICAgICogQHJldHVybiB7UHJvbWlzZVtdfVxuICAgICAqL1xuICAgIGxvYWRUaGlyZFBhcnR5U2NyaXB0cygpIHtcblxuICAgICAgICBsZXQgc2NyaXB0RWxlbWVudHMgICAgPSB1dGlsaXR5LnRvQXJyYXkodGhpcy5lbGVtZW50cy50ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCJdJykpLFxuICAgICAgICAgICAgdGhpcmRQYXJ0eVNjcmlwdHMgPSBzY3JpcHRFbGVtZW50cy5maWx0ZXIoKHNjcmlwdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMucGF0aC5pc0xvY2FsUGF0aChzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXJkUGFydHlTY3JpcHRzLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgc3JjICAgICAgID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBocmVmICAgICAgICAgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBUaW1lb3V0IG9mICR7b3B0aW9ucy5SRVNPTFZFX1RJTUVPVVQgLyAxMDAwfSBzZWNvbmRzIGV4Y2VlZGVkIHdoaWxzdCB3YWl0aW5nIGZvciB0aGlyZC1wYXJ0eSBzY3JpcHQ6IFwiJHtocmVmfVwiYDtcbiAgICAgICAgICAgICAgICB1dGlsaXR5LnJlc29sdmVUaW1lb3V0KGVycm9yTWVzc2FnZSwgcmVqZWN0KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgZXZlbnRzICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9FdmVudHMuanMnO1xuaW1wb3J0IHV0aWxpdHkgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgbG9nZ2VyICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2dnZXIuanMnO1xuaW1wb3J0IGNhY2hlRmFjdG9yeSBmcm9tICcuLy4uL2hlbHBlcnMvQ2FjaGVGYWN0b3J5LmpzJztcbmltcG9ydCBzZWxlY3RvcnMgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5pbXBvcnQge1N0YXRlTWFuYWdlciwgU3RhdGV9IGZyb20gJy4vU3RhdGVNYW5hZ2VyLmpzJztcblxuLyoqXG4gKiBAbW9kdWxlIE1hcGxlXG4gKiBAc3VibW9kdWxlIEN1c3RvbUVsZW1lbnRcbiAqIEBleHRlbmRzIFN0YXRlTWFuYWdlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tRWxlbWVudCBleHRlbmRzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRTY3JpcHRcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhdGgsIHRlbXBsYXRlRWxlbWVudCwgc2NyaXB0RWxlbWVudCwgaW1wb3J0U2NyaXB0KSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXRoICAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuc2FzcyAgICAgPSAodHlwZW9mIFNhc3MgPT09ICd1bmRlZmluZWQnKSA/IG51bGwgOiBuZXcgU2FzcygpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0geyBzY3JpcHQ6IHNjcmlwdEVsZW1lbnQsIHRlbXBsYXRlOiB0ZW1wbGF0ZUVsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5zY3JpcHQgICA9IGltcG9ydFNjcmlwdDtcblxuICAgICAgICBsZXQgZGVzY3JpcHRvciA9IHRoaXMuZ2V0RGVzY3JpcHRvcigpO1xuXG4gICAgICAgIGlmICghZGVzY3JpcHRvci5leHRlbmQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHZvaWQgdXRpbGl0eS50cnlSZWdpc3RlckVsZW1lbnQoZGVzY3JpcHRvci5uYW1lLCB7XG4gICAgICAgICAgICAgICAgcHJvdG90eXBlOiB0aGlzLmdldEVsZW1lbnRQcm90b3R5cGUoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBgSFRNTCR7ZGVzY3JpcHRvci5leHRlbmR9RWxlbWVudGA7XG5cbiAgICAgICAgdXRpbGl0eS50cnlSZWdpc3RlckVsZW1lbnQoZGVzY3JpcHRvci5uYW1lLCB7XG4gICAgICAgICAgICBwcm90b3R5cGU6IHRoaXMuZ2V0RWxlbWVudFByb3RvdHlwZSh3aW5kb3dbcHJvdG90eXBlXS5wcm90b3R5cGUpLFxuICAgICAgICAgICAgZXh0ZW5kczogZGVzY3JpcHRvci5leHRlbmQudG9Mb3dlckNhc2UoKVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGFzc29jaWF0ZWQgc3R5bGVzIGludG8gZWl0aGVyIHRoZSBzaGFkb3cgRE9NLCBpZiB0aGUgcGF0aCBpcyBkZXRlcm1pbmVkIHRvIGJlIGxvY2FsXG4gICAgICogdG8gdGhlIGNvbXBvbmVudCwgb3IgZ2xvYmFsbHkgaWYgbm90LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBsb2FkU3R5bGVzXG4gICAgICogQHBhcmFtIHtTaGFkb3dSb290fSBzaGFkb3dCb3VuZGFyeVxuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgKi9cbiAgICBsb2FkU3R5bGVzKHNoYWRvd0JvdW5kYXJ5KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgYWRkQ1NTXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBhZGRDU1MoYm9keSkge1xuICAgICAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gYm9keTtcbiAgICAgICAgICAgIHNoYWRvd0JvdW5kYXJ5LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVklORyk7XG5cbiAgICAgICAgbGV0IGNvbnRlbnQgICAgICAgPSB0aGlzLmVsZW1lbnRzLnRlbXBsYXRlLmNvbnRlbnQ7XG4gICAgICAgIGxldCBsaW5rRWxlbWVudHMgID0gc2VsZWN0b3JzLmdldENTU0xpbmtzKGNvbnRlbnQpO1xuICAgICAgICBsZXQgc3R5bGVFbGVtZW50cyA9IHNlbGVjdG9ycy5nZXRDU1NJbmxpbmVzKGNvbnRlbnQpO1xuICAgICAgICBsZXQgcHJvbWlzZXMgICAgICA9IFtdLmNvbmNhdChsaW5rRWxlbWVudHMsIHN0eWxlRWxlbWVudHMpLm1hcCgoZWxlbWVudCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgIGFkZENTUyhlbGVtZW50LmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtZW50LmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWNoZUZhY3RvcnkuZmV0Y2godGhpcy5wYXRoLmdldFBhdGgoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpLnRoZW4oKGJvZHkpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAndGV4dC9zY3NzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1lvdSBzaG91bGQgaW5jbHVkZSBcInNhc3MuanNcIiBmb3IgZGV2ZWxvcG1lbnQgcnVudGltZSBTQVNTIGNvbXBpbGF0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKCdBbGwgb2YgeW91ciBTQVNTIGRvY3VtZW50cyBzaG91bGQgYmUgY29tcGlsZWQgdG8gQ1NTIGZvciBwcm9kdWN0aW9uIHZpYSB5b3VyIGJ1aWxkIHByb2Nlc3MnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb21waWxlIFNDU1MgZG9jdW1lbnQgaW50byBDU1MgcHJpb3IgdG8gYXBwZW5kaW5nIGl0IHRvIHRoZSBib2R5LlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLnNhc3MuY29tcGlsZShib2R5LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENTUyhyZXNwb25zZS50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWRkQ1NTKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYm9keSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pKTtcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVkVEKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgdGhlIGVsZW1lbnQgbmFtZSwgYW5kIG9wdGlvbmFsbHkgdGhlIGVsZW1lbnQgZXh0ZW5zaW9uLCBmcm9tIGNvbnZlcnRpbmcgdGhlIEZ1bmN0aW9uIHRvIGEgU3RyaW5nIHZpYVxuICAgICAqIHRoZSBgdG9TdHJpbmdgIG1ldGhvZC4gSXQncyB3b3J0aCBub3RpbmcgdGhhdCB0aGlzIGlzIHByb2JhYmx5IHRoZSB3ZWFrZXN0IHBhcnQgb2YgdGhlIE1hcGxlIHN5c3RlbSBiZWNhdXNlIGl0XG4gICAgICogcmVsaWVzIG9uIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGRldGVybWluZSB0aGUgbmFtZSBvZiB0aGUgcmVzdWx0aW5nIGN1c3RvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldERlc2NyaXB0b3JcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RGVzY3JpcHRvcigpIHtcblxuICAgICAgICAvLyBXaXRoIEVTNiB0aGUgYEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lYCBwcm9wZXJ0eSBpcyBiZWdpbm5pbmcgdG8gYmUgc3RhbmRhcmRpc2VkLCB3aGljaCBtZWFuc1xuICAgICAgICAvLyBpbiBtYW55IGNhc2VzIHdlIHdvbid0IGhhdmUgdG8gcmVzb3J0IHRvIHRoZSBmZWVibGUgYHRvU3RyaW5nYCBhcHByb2FjaC4gSG9vcmFoIVxuICAgICAgICBsZXQgbmFtZSAgID0gdGhpcy5zY3JpcHQubmFtZSB8fCB0aGlzLnNjcmlwdC50b1N0cmluZygpLm1hdGNoKC8oPzpmdW5jdGlvbnxjbGFzcylcXHMqKFthLXpfXSspL2kpWzFdLFxuICAgICAgICAgICAgZXh0ZW5kID0gbnVsbDtcblxuICAgICAgICBpZiAofm5hbWUuaW5kZXhPZignXycpKSB7XG5cbiAgICAgICAgICAgIC8vIERvZXMgdGhlIGVsZW1lbnQgbmFtZSByZWZlcmVuY2UgYW4gZWxlbWVudCB0byBleHRlbmQ/XG4gICAgICAgICAgICBsZXQgc3BsaXQgPSBuYW1lLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICBuYW1lICAgICAgPSBzcGxpdFswXTtcbiAgICAgICAgICAgIGV4dGVuZCAgICA9IHNwbGl0WzFdO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBuYW1lOiB1dGlsaXR5LnRvU25ha2VDYXNlKG5hbWUpLCBleHRlbmQ6IGV4dGVuZCB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogWWllbGRzIHRoZSBwcm90b3R5cGUgZm9yIHRoZSBjdXN0b20gSFRNTCBlbGVtZW50IHRoYXQgd2lsbCBiZSByZWdpc3RlcmVkIGZvciBvdXIgY3VzdG9tIFJlYWN0IGNvbXBvbmVudC5cbiAgICAgKiBJdCBsaXN0ZW5zIGZvciB3aGVuIHRoZSBjdXN0b20gZWxlbWVudCBoYXMgYmVlbiBpbnNlcnRlZCBpbnRvIHRoZSBET00sIGFuZCB0aGVuIHNldHMgdXAgdGhlIHN0eWxlcywgYXBwbGllc1xuICAgICAqIGRlZmF1bHQgUmVhY3QgcHJvcGVydGllcywgZXRjLi4uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldEVsZW1lbnRQcm90b3R5cGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFByb3RvdHlwZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50UHJvdG90eXBlKGVsZW1lbnRQcm90b3R5cGUpIHtcblxuICAgICAgICBsZXQgbG9hZFN0eWxlcyA9IHRoaXMubG9hZFN0eWxlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2NyaXB0ICAgID0gdGhpcy5zY3JpcHQsXG4gICAgICAgICAgICBwYXRoICAgICAgPSB0aGlzLnBhdGg7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoZWxlbWVudFByb3RvdHlwZSB8fCBIVE1MRWxlbWVudC5wcm90b3R5cGUsIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYXR0YWNoZWRDYWxsYmFja1xuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXR0YWNoZWRDYWxsYmFjazoge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHNldERlZmF1bHRQcm9wc1xuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0RGVmYXVsdFByb3BzKGF0dHJpYnV0ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcGxhY2VyID0gL15kYXRhLS9pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lID09PSB1dGlsaXR5LkFUVFJJQlVURV9SRUFDVElEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlY2FzdCB0aGUgdmFsdWUgZGVwZW5kaW5nIG9uIHRoZSB0eXBlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lICA9IGF0dHJpYnV0ZS5uYW1lLnJlcGxhY2UocmVwbGFjZXIsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQuZGVmYXVsdFByb3BzW25hbWVdID0gdXRpbGl0eS50eXBlY2FzdFByb3BlcnR5KGF0dHJpYnV0ZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBwcm9wZXJ0aWVzIHRvIHRoZSBjdXN0b20gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wcyA9IHsgcGF0aDogcGF0aCwgZWxlbWVudDogdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGVmYXVsdFByb3BzLmNhbGwodGhpcywgdGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgICAgICA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbmZpZ3VyZSB0aGUgUmVhY3QuanMgY29tcG9uZW50LCBpbXBvcnRpbmcgaXQgdW5kZXIgdGhlIHNoYWRvdyBib3VuZGFyeS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkRWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoc2NyaXB0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvbnRlbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgICAgICA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gUmVhY3QucmVuZGVyKHJlbmRlcmVkRWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbmZpZ3VyZSB0aGUgZXZlbnQgZGVsZWdhdGlvbiBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEltcG9ydCBleHRlcm5hbCBDU1MgZG9jdW1lbnRzIGFuZCByZXNvbHZlIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChsb2FkU3R5bGVzKHNoYWRvd1Jvb3QpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndW5yZXNvbHZlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyZXNvbHZlZCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlRWxlbWVudC5hcHBseSh0aGlzKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgIGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBsb2dnZXIgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0xvZ2dlci5qcyc7XG5pbXBvcnQgb3B0aW9ucyAgIGZyb20gJy4vLi4vaGVscGVycy9PcHRpb25zLmpzJztcbmltcG9ydCBzZWxlY3RvcnMgZnJvbSAnLi8uLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5pbXBvcnQge1N0YXRlTWFuYWdlciwgU3RhdGV9IGZyb20gJy4vU3RhdGVNYW5hZ2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlIGV4dGVuZHMgU3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SFRNTExpbmtFbGVtZW50fSBsaW5rRWxlbWVudFxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsaW5rRWxlbWVudCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGF0aCAgICAgICA9IHV0aWxpdHkucmVzb2x2ZXIobGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyksIGxpbmtFbGVtZW50LmltcG9ydCkuZGV2ZWxvcG1lbnQ7XG4gICAgICAgIHRoaXMuc3RhdGUgICAgICA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgICA9IHsgbGluazogbGlua0VsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG5cbiAgICAgICAgdGhpcy5sb2FkTW9kdWxlKGxpbmtFbGVtZW50KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gVXNlIG9ubHkgdGhlIGZpcnN0IHRlbXBsYXRlLCBiZWNhdXNlIG90aGVyd2lzZSBNYXBsZWlmeSB3aWxsIGhhdmUgYSBkaWZmaWN1bHQgam9iIGF0dGVtcHRpbmdcbiAgICAgICAgICAgIC8vIHRvIHJlc29sdmUgdGhlIHBhdGhzIHdoZW4gdGhlcmUncyBhIG1pc21hdGNoIGJldHdlZW4gdGVtcGxhdGUgZWxlbWVudHMgYW5kIGxpbmsgZWxlbWVudHMuXG4gICAgICAgICAgICAvLyBQUkVWSU9VUzogdGhpcy5nZXRUZW1wbGF0ZXMoKS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlRWxlbWVudHMgPSB0aGlzLmdldFRlbXBsYXRlcygpO1xuXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBDb21wb25lbnQgXCIke2xpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpfVwiIGlzIGF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgdHdvIGNvbXBvbmVudHNgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFt0aGlzLmdldFRlbXBsYXRlcygpWzBdXS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyA9IHNlbGVjdG9ycy5nZXRBbGxTY3JpcHRzKHRlbXBsYXRlRWxlbWVudC5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhdGguaXNMb2NhbFBhdGgoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQodGhpcy5wYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVkVEKTtcblxuICAgICAgICB9LCAobWVzc2FnZSkgPT4gbG9nZ2VyLmVycm9yKG1lc3NhZ2UpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2V0U3RhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvYWRNb2R1bGVcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IGxpbmtFbGVtZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBsb2FkTW9kdWxlKGxpbmtFbGVtZW50KSB7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZJTkcpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChsaW5rRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JlZicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVzb2x2ZShsaW5rRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsaW5rRWxlbWVudC5pbXBvcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCByZXNvbHZlKGxpbmtFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlua0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHJlc29sdmUobGlua0VsZW1lbnQpKTtcblxuICAgICAgICAgICAgbGV0IGhyZWYgICAgICAgICA9IGxpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBUaW1lb3V0IG9mICR7b3B0aW9ucy5SRVNPTFZFX1RJTUVPVVQgLyAxMDAwfSBzZWNvbmRzIGV4Y2VlZGVkIHdoaWxzdCB3YWl0aW5nIGZvciBIVE1MIGltcG9ydDogXCIke2hyZWZ9XCJgO1xuICAgICAgICAgICAgdXRpbGl0eS5yZXNvbHZlVGltZW91dChlcnJvck1lc3NhZ2UsIHJlamVjdCk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ2V0VGVtcGxhdGVzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VGVtcGxhdGVzKCkge1xuXG4gICAgICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5lbGVtZW50cy5saW5rLmltcG9ydDtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheShvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJykpO1xuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAY29uc3RhbnQgU3RhdGVcbiAqIEB0eXBlIHt7VU5SRVNPTFZFRDogbnVtYmVyLCBSRVNPTFZJTkc6IG51bWJlciwgUkVTT0xWRUQ6IG51bWJlcn19XG4gKi9cbmV4cG9ydCBjb25zdCBTdGF0ZSA9IHsgVU5SRVNPTFZFRDogMCwgUkVTT0xWSU5HOiAxLCBSRVNPTFZFRDogMiB9O1xuXG4vKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgU3RhdGVNYW5hZ2VyXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICovXG5leHBvcnQgY2xhc3MgU3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge0Fic3RyYWN0fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuVU5SRVNPTFZFRDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldFN0YXRlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXRlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG59Il19
