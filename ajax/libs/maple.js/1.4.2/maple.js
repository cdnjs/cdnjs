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
                    var path = _helpersUtilityJs2['default'].resolver(templateElement, null).production;

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
     * @return {Function}
     */
    var initialise = (function initialise() {

        var hasInitiated = false;

        return function () {

            var state = $document.readyState,
                readyStates = ['interactive', 'complete'];

            if (!hasInitiated && ~readyStates.indexOf(state)) {

                hasInitiated = true;

                // No documents, no person.
                new Maple();
            }
        };
    })();

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

    /**
     * @property sass
     * @type {Sass|null}
     */
    var sass = null;

    return {

        /**
         * @method getSass
         * @return {Sass}
         */
        getSass: function getSass() {

            if (!sass && typeof $window.Sass !== "undefined") {
                sass = new $window.Sass();
            }

            return sass;
        },

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
    RESOLVE_TIMEOUT: 60000,

    /**
     * @constant NAMESPACE_SEPARATOR
     * @type {String}
     * @default '-'
     */
    NAMESPACE_SEPARATOR: "-"

  };
})();

module.exports = exports["default"];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _UtilityJs = require('./Utility.js');

var _UtilityJs2 = _interopRequireDefault(_UtilityJs);

/**
 * @method queryAll
 * @param {String} expression
 * @return {Array}
 */
var queryAll = function queryAll(expression) {

    'use strict';

    expression = Array.isArray(expression) ? expression.join(',') : expression;
    return _UtilityJs2['default'].toArray(this.querySelectorAll(expression));
};

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @method getCSSLinks
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getCSSLinks: function getCSSLinks(element) {
            return queryAll.call(element, 'link[rel="stylesheet"]');
        },

        /**
         * @method getCSSInlines
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getCSSInlines: function getCSSInlines(element) {
            return queryAll.call(element, ['style[type="text/css"]', 'style:not([type])']);
        },

        /**
         * @method getImports
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getImports: function getImports(element) {
            return queryAll.call(element, 'link[rel="import"]:not([data-ignore])');
        },

        /**
         * @method getTemplates
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getTemplates: function getTemplates(element) {
            return queryAll.call(element, 'template[ref]');
        },

        /**
         * @method getScripts
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getScripts: function getScripts(element) {

            var selectors = ['script[type="text/javascript"]', 'script[type="application/javascript"]', 'script[type="text/ecmascript"]', 'script[type="application/ecmascript"]', 'script:not([type])'];

            return queryAll.call(element, selectors);
        },

        /**
         * @method getAllScripts
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getAllScripts: function getAllScripts(element) {
            var jsxFiles = queryAll.call(element, 'script[type="text/jsx"]');
            return [].concat(_UtilityJs2['default'].toArray(this.getScripts(element)), _UtilityJs2['default'].toArray(jsxFiles));
        }

    };
})();

module.exports = exports['default'];

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
         * @param {HTMLElement} importElement
         * @param {HTMLDocument|null} ownerDocument
         * @return {Object}
         */
        resolver: function resolver(importElement, ownerDocument) {

            var url = importElement.getAttribute('href') || importElement.getAttribute('ref'),
                componentPath = this.getPath(url),
                getPath = this.getPath.bind(this),
                getName = this.getName.bind(this),
                removeExtension = this.removeExtension.bind(this);
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
                     * @method getImport
                     * @return {HTMLLinkElement}
                     */
                    getImport: function getImport() {
                        return importElement;
                    },

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
                     * @method resolveComponent
                     * @param {String} path
                     * @return {String}
                     */
                    resolveComponent: function resolveComponent(path) {
                        return removeExtension(path);
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
                     * @method getImport
                     * @return {HTMLLinkElement}
                     */
                    getImport: function getImport() {
                        return importElement;
                    },

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
                     * @method resolveComponent
                     * @param {String} path
                     * @return {String}
                     */
                    resolveComponent: function resolveComponent(path) {
                        return '' + this.getRelativePath() + '/' + removeExtension(path);
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
        var url = this.path.resolveComponent(src);

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

var _helpersOptionsJs = require('./../helpers/Options.js');

var _helpersOptionsJs2 = _interopRequireDefault(_helpersOptionsJs);

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
        this.sass = _helpersCacheFactoryJs2['default'].getSass();
        this.elements = { script: scriptElement, template: templateElement };
        this.script = importScript;

        var descriptor = this.getDescriptor();

        if (!descriptor.extend) {

            if (path.getImport().hasAttribute('data-namespace')) {

                var namespace = path.getImport().getAttribute('data-namespace');
                descriptor.name = '' + namespace + '' + _helpersOptionsJs2['default'].NAMESPACE_SEPARATOR + '' + descriptor.name;
            }

            return void _helpersUtilityJs2['default'].tryRegisterElement(descriptor.name, {
                prototype: this.getElementPrototype()
            });
        }

        _helpersLoggerJs2['default'].error('Extending native elements currently unsupported due to React – see pull request: https://github.com/facebook/react/pull/3930');

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

},{"./../helpers/CacheFactory.js":2,"./../helpers/Events.js":3,"./../helpers/Logger.js":4,"./../helpers/Options.js":5,"./../helpers/Selectors.js":6,"./../helpers/Utility.js":7,"./StateManager.js":11}],10:[function(require,module,exports){
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
        this.path = _helpersUtilityJs2['default'].resolver(linkElement, linkElement['import']).development;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9DYWNoZUZhY3RvcnkuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2dnZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9PcHRpb25zLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2hlbHBlcnMvU2VsZWN0b3JzLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2hlbHBlcnMvVXRpbGl0eS5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9tb2RlbHMvQ29tcG9uZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9FbGVtZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Nb2R1bGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1N0YXRlTWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OzhCQ0FzQixvQkFBb0I7Ozs7aUNBQ3BCLHVCQUF1Qjs7OztrQ0FDdkIsd0JBQXdCOzs7O2dDQUN4QixzQkFBc0I7Ozs7K0JBQ3RCLHFCQUFxQjs7OzsrQkFDckIscUJBQXFCOzs7O2dDQUNy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Q0FBQyxJQUFJLFVBQU8sQ0FBQztBQUM5QyxtQkFBTyw4QkFBUSxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FFdEU7OztXQXBHZ0IsTUFBTTttQkFGbkIsWUFBWTs7cUJBRUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSHBCLElBQU0sS0FBSyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQzs7UUFBckQsS0FBSyxHQUFMLEtBQUs7Ozs7Ozs7O0lBUUwsWUFBWTs7Ozs7OztBQU1WLFdBTkYsWUFBWSxHQU1QOzBCQU5MLFlBQVk7O0FBT2pCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztHQUNqQzs7ZUFSUSxZQUFZOzs7Ozs7OztXQWViLGtCQUFDLEtBQUssRUFBRTtBQUNaLFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7U0FqQlEsWUFBWTs7O1FBQVosWUFBWSxHQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1vZHVsZSAgICBmcm9tICcuL21vZGVscy9Nb2R1bGUuanMnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL21vZGVscy9Db21wb25lbnQuanMnO1xuaW1wb3J0IHNlbGVjdG9ycyBmcm9tICcuL2hlbHBlcnMvU2VsZWN0b3JzLmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZ2dlciAgICBmcm9tICcuL2hlbHBlcnMvTG9nZ2VyLmpzJztcbmltcG9ydCBldmVudHMgICAgZnJvbSAnLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgb3B0aW9ucyAgIGZyb20gJy4vaGVscGVycy9PcHRpb25zLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciAgID0gJ2JhYmVsJztcbiAgICAgICAgU3lzdGVtLmJhYmVsT3B0aW9ucyA9IHsgYmxhY2tsaXN0OiBbXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgTWFwbGVcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gICAgICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAgICAgKi9cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZmluZExpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLmZpbmRUZW1wbGF0ZXMoKTtcblxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBldmVudCBkZWxlZ2F0aW9uIG1hcHBpbmdzLlxuICAgICAgICAgICAgZXZlbnRzLnNldHVwRGVsZWdhdGlvbigpO1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGFueSBjaGFuZ2VzIHRvIHRoZSBET00gd2hlcmUgSFRNTCBpbXBvcnRzIGNhbiBiZSBkeW5hbWljYWxseSBpbXBvcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBmaW5kaW5nIGFsbCBvZiB0aGUgZXh0ZXJuYWwgbGluayBlbGVtZW50cywgYXMgd2VsbCBhcyB0aGUgaW5saW5lIHRlbXBsYXRlIGVsZW1lbnRzXG4gICAgICAgICAqIHRoYXQgY2FuIGJlIGhhbmRjcmFmdGVkLCBvciBiYWtlZCBpbnRvIHRoZSBIVE1MIGRvY3VtZW50IHdoZW4gY29tcGlsaW5nIGEgcHJvamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmaW5kTGlua3NcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRMaW5rcygpIHtcbiAgICAgICAgICAgIHNlbGVjdG9ycy5nZXRJbXBvcnRzKCRkb2N1bWVudCkuZm9yRWFjaCgobGlua0VsZW1lbnQpID0+IHRoaXMud2FpdEZvckxpbmtFbGVtZW50KGxpbmtFbGVtZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzcG9uc2libGUgZm9yIGZpbmRpbmcgYWxsIG9mIHRoZSB0ZW1wbGF0ZSBIVE1MIGVsZW1lbnRzIHRoYXQgY29udGFpbiB0aGUgYHJlZmAgYXR0cmlidXRlIHdoaWNoXG4gICAgICAgICAqIGlzIHRoZSBjb21wb25lbnQncyBvcmlnaW5hbCBwYXRoIGJlZm9yZSBNYXBsZWlmeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmaW5kVGVtcGxhdGVzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kVGVtcGxhdGVzKCkge1xuXG4gICAgICAgICAgICBzZWxlY3RvcnMuZ2V0VGVtcGxhdGVzKCRkb2N1bWVudCkuZm9yRWFjaCgodGVtcGxhdGVFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0RWxlbWVudHMgPSBzZWxlY3RvcnMuZ2V0QWxsU2NyaXB0cyh0ZW1wbGF0ZUVsZW1lbnQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggICAgICAgICAgID0gdXRpbGl0eS5yZXNvbHZlcih0ZW1wbGF0ZUVsZW1lbnQsIG51bGwpLnByb2R1Y3Rpb247XG5cbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50cy5mb3JFYWNoKChzY3JpcHRFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGguaXNMb2NhbFBhdGgoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENvbXBvbmVudChwYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHdhaXRGb3JMaW5rRWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxMaW5rRWxlbWVudH0gbGlua0VsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHdhaXRGb3JMaW5rRWxlbWVudChsaW5rRWxlbWVudCkge1xuXG4gICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaW1wb3J0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgbmV3IE1vZHVsZShsaW5rRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKGxpbmtFbGVtZW50KSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaHJlZiAgICAgICAgID0gbGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBUaW1lb3V0IG9mICR7b3B0aW9ucy5SRVNPTFZFX1RJTUVPVVQgLyAxMDAwfSBzZWNvbmRzIGV4Y2VlZGVkIHdoaWxzdCB3YWl0aW5nIGZvciBIVE1MIGltcG9ydDogXCIke2hyZWZ9XCJgO1xuICAgICAgICAgICAgICAgIHV0aWxpdHkucmVzb2x2ZVRpbWVvdXQoZXJyb3JNZXNzYWdlLCByZWplY3QpO1xuXG4gICAgICAgICAgICB9KS50aGVuKChsaW5rRWxlbWVudCkgPT4gbmV3IE1vZHVsZShsaW5rRWxlbWVudCksIChtZXNzYWdlKSA9PiBsb2dnZXIuZXJyb3IobWVzc2FnZSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTGlzdGVucyBmb3IgY2hhbmdlcyB0byB0aGUgYEhUTUxIZWFkRWxlbWVudGAgbm9kZSBhbmQgcmVnaXN0ZXJzIGFueSBuZXcgaW1wb3J0cyB0aGF0IGFyZVxuICAgICAgICAgKiBkeW5hbWljYWxseSBpbXBvcnRlZCBpbnRvIHRoZSBkb2N1bWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBvYnNlcnZlTXV0YXRpb25zXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBvYnNlcnZlTXV0YXRpb25zKCkge1xuXG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkZWROb2RlcyA9IHV0aWxpdHkudG9BcnJheShtdXRhdGlvbi5hZGRlZE5vZGVzKTtcblxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxpdHkuaXNIVE1MSW1wb3J0KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0Rm9yTGlua0VsZW1lbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkZG9jdW1lbnQuaGVhZCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpbml0aWFsaXNlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICovXG4gICAgbGV0IGluaXRpYWxpc2UgPSAoZnVuY3Rpb24gaW5pdGlhbGlzZSgpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBoYXNJbml0aWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXRlICAgICAgID0gJGRvY3VtZW50LnJlYWR5U3RhdGUsXG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZXMgPSBbJ2ludGVyYWN0aXZlJywgJ2NvbXBsZXRlJ107XG5cbiAgICAgICAgICAgIGlmICghaGFzSW5pdGlhdGVkICYmIH5yZWFkeVN0YXRlcy5pbmRleE9mKHN0YXRlKSkge1xuXG4gICAgICAgICAgICAgICAgaGFzSW5pdGlhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIE5vIGRvY3VtZW50cywgbm8gcGVyc29uLlxuICAgICAgICAgICAgICAgIG5ldyBNYXBsZSgpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfSkoKTtcblxuICAgIC8vIFN1cHBvcnQgZm9yIGFzeW5jLCBkZWZlciwgYW5kIG5vcm1hbCBpbmNsdXNpb24uXG4gICAgaW5pdGlhbGlzZSgpO1xuICAgICRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGlzZSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCR3aW5kb3cpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IGNhY2hlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgY2FjaGUgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBzYXNzXG4gICAgICogQHR5cGUge1Nhc3N8bnVsbH1cbiAgICAgKi9cbiAgICBsZXQgc2FzcyA9IG51bGw7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFNhc3NcbiAgICAgICAgICogQHJldHVybiB7U2Fzc31cbiAgICAgICAgICovXG4gICAgICAgIGdldFNhc3MoKSB7XG5cbiAgICAgICAgICAgIGlmICghc2FzcyAmJiB0eXBlb2YgJHdpbmRvdy5TYXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNhc3MgPSBuZXcgJHdpbmRvdy5TYXNzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzYXNzO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBkZWxlZ2F0aW5nIHRvIHRoZSBuYXRpdmUgYGZldGNoYCBmdW5jdGlvbiAocG9seWZpbGwgcHJvdmlkZWQpLCBidXQgd2lsbCBjYWNoZSB0aGVcbiAgICAgICAgICogaW5pdGlhbCBwcm9taXNlIGluIG9yZGVyIGZvciBvdGhlciBpbnZvY2F0aW9ucyB0byB0aGUgc2FtZSBVUkwgdG8geWllbGQgdGhlIHNhbWUgcHJvbWlzZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmZXRjaFxuICAgICAgICAgKiBAcGFyYW0gdXJsIHtTdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgICAqL1xuICAgICAgICBmZXRjaCh1cmwpIHtcblxuICAgICAgICAgICAgaWYgKGNhY2hlW3VybF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbdXJsXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbdXJsXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAkd2luZG93LmZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSkudGhlbigoYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3VybF07XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkod2luZG93KTsiLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuL1V0aWxpdHkuanMnO1xuXG4vKipcbiAqIEBtZXRob2Qgb3ZlcnJpZGVTdG9wUHJvcGFnYXRpb25cbiAqIEBzZWU6IGh0dHA6Ly9iaXQubHkvMWRQcHhIbFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuKGZ1bmN0aW9uIG92ZXJyaWRlU3RvcFByb3BhZ2F0aW9uKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBsZXQgb3ZlcnJpZGRlblN0b3AgPSBFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uO1xuXG4gICAgRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIG92ZXJyaWRkZW5TdG9wLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBjb21wb25lbnRzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGxldCBjb21wb25lbnRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgZXZlbnROYW1lc1xuICAgICAqIEB0eXBlIHtBcnJheXxudWxsfVxuICAgICAqL1xuICAgIGxldCBldmVudE5hbWVzID0gbnVsbDtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY3Vyc2l2ZWx5IGRpc2NvdmVyIGEgY29tcG9uZW50IHZpYSBpdHMgUmVhY3QgSUQgdGhhdCBpcyBzZXQgYXMgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgKiBvbiBlYWNoIFJlYWN0IGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmluZEJ5SWRcbiAgICAgICAgICogQHBhcmFtIGlkIHtTdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRCeUlkKGlkKSB7XG5cbiAgICAgICAgICAgIGxldCBtb2RlbDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWV0aG9kIGZpbmRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJlZENvbXBvbmVudFxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRDb21wb25lbnRcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmQocmVuZGVyZWRDb21wb25lbnQsIGN1cnJlbnRDb21wb25lbnQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudC5fcm9vdE5vZGVJRCA9PT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBiaW5kTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBiaW5kTW9kZWwoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogY3VycmVudENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQocmVuZGVyZWRDb21wb25lbnQpKSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSByZW5kZXJlZENvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuX3JlbmRlcmVkQ2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZHJlbikuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kKGNoaWxkcmVuW2luZGV4XSwgY3VycmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZmluZChjb21wb25lbnQuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdHJhbnNmb3JtS2V5c1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbdHJhbnNmb3JtZXI9J3RvTG93ZXJDYXNlJ11cbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNmb3JtS2V5cyhtYXAsIHRyYW5zZm9ybWVyID0gJ3RvTG93ZXJDYXNlJykge1xuXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRNYXAgPSB7fTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGZ1bmN0aW9uIGZvckVhY2goa2V5KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRNYXBba2V5W3RyYW5zZm9ybWVyXSgpXSA9IG1hcFtrZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZE1hcDtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyQ29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2Qgc2V0dXBEZWxlZ2F0aW9uXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBzZXR1cERlbGVnYXRpb24oKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZXJtaW5lcyBhbGwgb2YgdGhlIGV2ZW50IHR5cGVzIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyLiBXaWxsIGNhY2hlIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgKiBvZiB0aGlzIGRpc2NvdmVyeSBmb3IgcGVyZm9ybWFuY2UgYmVuZWZpdHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGV2ZW50c1xuICAgICAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBsZXQgZXZlbnRzID0gZXZlbnROYW1lcyB8fCAoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGFFbGVtZW50ICAgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyICAgID0gL15vbi9pLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhRWxlbWVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkubWF0Y2gobWF0Y2hlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZXMucHVzaChrZXkucmVwbGFjZShtYXRjaGVyLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnROYW1lcztcblxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goKGV2ZW50VHlwZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYG9uJHtldmVudC50eXBlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudExpc3QgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlsaXR5LnRvQXJyYXkoZXZlbnQucGF0aCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ldGhvZCBgc3RvcFByb3BhZ2F0aW9uYCB3YXMgaW52b2tlZCBvbiB0aGUgY3VycmVudCBldmVudCwgd2hpY2ggcHJldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cyBmcm9tIHByb3BhZ2F0aW5nIGFueSBmdXJ0aGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZ2V0QXR0cmlidXRlIHx8ICFpdGVtLmhhc0F0dHJpYnV0ZSh1dGlsaXR5LkFUVFJJQlVURV9SRUFDVElEKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBlbGVtZW50IGlzIG5vdCBhIHZhbGlkIFJlYWN0IGVsZW1lbnQgYmVjYXVzZSBpdCBkb2Vzbid0IGhhdmUgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlYWN0IElEIGRhdGEgYXR0cmlidXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHRvIGZpZWxkIHRoZSBjb21wb25lbnQgYnkgdGhlIGFzc29jaWF0ZWQgUmVhY3QgSUQuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLmZpbmRCeUlkKGl0ZW0uZ2V0QXR0cmlidXRlKHV0aWxpdHkuQVRUUklCVVRFX1JFQUNUSUQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLnByb3BlcnRpZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgY3VycmVudCBSZWFjdCBldmVudHMgaW50byBsb3dlciBjYXNlIGtleXMsIHNvIHRoYXQgd2UgY2FuIHBhaXIgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwIHdpdGggdGhlIGV2ZW50IHR5cGVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtS2V5cyhtb2RlbC5wcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudE5hbWUgaW4gdHJhbnNmb3JtZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBkZWZlciB0aGUgaW52b2NhdGlvbiBvZiB0aGUgZXZlbnQgbWV0aG9kLCBiZWNhdXNlIG90aGVyd2lzZSBSZWFjdC5qc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHJlLXJlbmRlciwgYW5kIHRoZSBSZWFjdCBJRHMgd2lsbCB0aGVuIGJlIFwib3V0IG9mIHN5bmNcIiBmb3IgdGhpcyBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRMaXN0LnB1c2godHJhbnNmb3JtZWRbZXZlbnROYW1lXS5iaW5kKG1vZGVsLmNvbXBvbmVudCwgZXZlbnQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEludm9rZSBlYWNoIGZvdW5kIGV2ZW50IGZvciB0aGUgZXZlbnQgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaXN0LmZvckVhY2goKGV2ZW50SW52b2NhdGlvbikgPT4gZXZlbnRJbnZvY2F0aW9uKCkpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKHdpbmRvdy5kb2N1bWVudCk7IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJGNvbnNvbGUpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB3YXJuXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB3YXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICRjb25zb2xlLmxvZyhgJWNNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogcmdiYSgwLCAwLCAwLCAuNSknLCAnY29sb3I6ICM1RjlFQTAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBpbmZvXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBpbmZvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICRjb25zb2xlLmxvZyhgJWNNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogcmdiYSgwLCAwLCAwLCAuNSknLCAnY29sb3I6ICMwMDhEREInKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBlcnJvclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3IobWVzc2FnZSkge1xuICAgICAgICAgICAgJGNvbnNvbGUubG9nKGAlY01hcGxlLmpzOiAlYyR7bWVzc2FnZX0uYCwgJ2NvbG9yOiByZ2JhKDAsIDAsIDAsIC41KScsICdjb2xvcjogI0NENjA5MCcpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSh3aW5kb3cuY29uc29sZSk7IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdGFudCBSRVNPTFZFX1RJTUVPVVRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgNjAwMDBcbiAgICAgICAgICovXG4gICAgICAgIFJFU09MVkVfVElNRU9VVDogNjAwMDAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdGFudCBOQU1FU1BBQ0VfU0VQQVJBVE9SXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICctJ1xuICAgICAgICAgKi9cbiAgICAgICAgTkFNRVNQQUNFX1NFUEFSQVRPUjogJy0nXG5cbiAgICB9O1xuXG59KSgpOyIsImltcG9ydCB1dGlsaXR5IGZyb20gJy4vVXRpbGl0eS5qcyc7XG5cbi8qKlxuICogQG1ldGhvZCBxdWVyeUFsbFxuICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5sZXQgcXVlcnlBbGwgPSBmdW5jdGlvbiBxdWVyeUFsbChleHByZXNzaW9uKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGV4cHJlc3Npb24gPSBBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pID8gZXhwcmVzc2lvbi5qb2luKCcsJykgOiBleHByZXNzaW9uO1xuICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkodGhpcy5xdWVyeVNlbGVjdG9yQWxsKGV4cHJlc3Npb24pKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q1NTTGlua3NcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDU1NMaW5rcyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAnbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q1NTSW5saW5lc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldENTU0lubGluZXMoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgWydzdHlsZVt0eXBlPVwidGV4dC9jc3NcIl0nLCAnc3R5bGU6bm90KFt0eXBlXSknXSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0SW1wb3J0c1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldEltcG9ydHMoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ2xpbmtbcmVsPVwiaW1wb3J0XCJdOm5vdChbZGF0YS1pZ25vcmVdKScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFRlbXBsYXRlc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFRlbXBsYXRlcyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAndGVtcGxhdGVbcmVmXScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFNjcmlwdHNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRTY3JpcHRzKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IFsnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nLCAnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJdJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NjcmlwdFt0eXBlPVwidGV4dC9lY21hc2NyaXB0XCJdJywgJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vZWNtYXNjcmlwdFwiXScsICdzY3JpcHQ6bm90KFt0eXBlXSknXTtcblxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgc2VsZWN0b3JzKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEFsbFNjcmlwdHNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRBbGxTY3JpcHRzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBqc3hGaWxlcyA9IHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ3NjcmlwdFt0eXBlPVwidGV4dC9qc3hcIl0nKTtcbiAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQodXRpbGl0eS50b0FycmF5KHRoaXMuZ2V0U2NyaXB0cyhlbGVtZW50KSksIHV0aWxpdHkudG9BcnJheShqc3hGaWxlcykpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSgpOyIsImltcG9ydCBsb2dnZXIgIGZyb20gJy4vTG9nZ2VyLmpzJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vT3B0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCRkb2N1bWVudCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAY29uc3RhbnQgQVRUUklCVVRFX1JFQUNUSURcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEFUVFJJQlVURV9SRUFDVElEOiAnZGF0YS1yZWFjdGlkJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZXNvbHZlclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbXBvcnRFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7SFRNTERvY3VtZW50fG51bGx9IG93bmVyRG9jdW1lbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgcmVzb2x2ZXIoaW1wb3J0RWxlbWVudCwgb3duZXJEb2N1bWVudCkge1xuXG4gICAgICAgICAgICBsZXQgdXJsICAgICAgICAgICAgID0gaW1wb3J0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCBpbXBvcnRFbGVtZW50LmdldEF0dHJpYnV0ZSgncmVmJyksXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGF0aCAgID0gdGhpcy5nZXRQYXRoKHVybCksXG4gICAgICAgICAgICAgICAgZ2V0UGF0aCAgICAgICAgID0gdGhpcy5nZXRQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZ2V0TmFtZSAgICAgICAgID0gdGhpcy5nZXROYW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgcmVtb3ZlRXh0ZW5zaW9uID0gdGhpcy5yZW1vdmVFeHRlbnNpb24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCByZXNvbHZlUGF0aFxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAqIEBwYXJhbSB7SFRNTERvY3VtZW50fSBvdmVycmlkZURvY3VtZW50XG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVQYXRoKHBhdGgsIG92ZXJyaWRlRG9jdW1lbnQgPSAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgYSAgPSBvdmVycmlkZURvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgICAgICBhLmhyZWYgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmhyZWY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdGlvblxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcHJvZHVjdGlvbjoge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldEltcG9ydFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtIVE1MTGlua0VsZW1lbnR9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRJbXBvcnQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1wb3J0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFBhdGgocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvY2FsUGF0aChwYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmdldEFic29sdXRlUGF0aCgpfS8ke2dldE5hbWUocGF0aCl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKHBhdGgsICRkb2N1bWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCByZXNvbHZlQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVDb21wb25lbnQocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUV4dGVuc2lvbihwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRTcmNcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0U3JjKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE5hbWUoc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRBYnNvbHV0ZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0QWJzb2x1dGVQYXRoKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UmVsYXRpdmVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFJlbGF0aXZlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgaXNMb2NhbFBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlzTG9jYWxQYXRoKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIX5wYXRoLmluZGV4T2YodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBkZXZlbG9wbWVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQ6IHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRJbXBvcnRcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7SFRNTExpbmtFbGVtZW50fVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0SW1wb3J0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGltcG9ydEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXRoKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NhbFBhdGgocGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBYnNvbHV0ZVBhdGgoKX0vJHtwYXRofWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUGF0aChwYXRoLCAkZG9jdW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ29tcG9uZW50KHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmdldFJlbGF0aXZlUGF0aCgpfS8ke3JlbW92ZUV4dGVuc2lvbihwYXRoKX1gO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldFNyY1xuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRTcmMoc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3JjO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldEFic29sdXRlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRBYnNvbHV0ZVBhdGgoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVBhdGgoY29tcG9uZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UmVsYXRpdmVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFJlbGF0aXZlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRQYXRoO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGlzTG9jYWxQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSBwYXRoIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpc0xvY2FsUGF0aChwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gZ2V0UGF0aChyZXNvbHZlUGF0aChwYXRoLCBvd25lckRvY3VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF+cmVzb2x2ZVBhdGgoY29tcG9uZW50UGF0aCkuaW5kZXhPZihwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gYXJyYXlMaWtlXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdG9BcnJheShhcnJheUxpa2UpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tID8gQXJyYXkuZnJvbShhcnJheUxpa2UpIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFycmF5TGlrZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmxhdHRlbkFycmF5XG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbZ2l2ZW5BcnI9W11dXG4gICAgICAgICAqL1xuICAgICAgICBmbGF0dGVuQXJyYXkoYXJyLCBnaXZlbkFyciA9IFtdKSB7XG5cbiAgICAgICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuICAgICAgICAgICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShpdGVtKSkgJiYgKHRoaXMuZmxhdHRlbkFycmF5KGl0ZW0sIGdpdmVuQXJyKSk7XG4gICAgICAgICAgICAgICAgKCFBcnJheS5pc0FycmF5KGl0ZW0pKSAmJiAoZ2l2ZW5BcnIucHVzaChpdGVtKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuICAgICAgICAgICAgcmV0dXJuIGdpdmVuQXJyO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9TbmFrZUNhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGNhbWVsQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2pvaW5lcj0nLSddXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU25ha2VDYXNlKGNhbWVsQ2FzZSwgam9pbmVyID0gJy0nKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FtZWxDYXNlLnNwbGl0KC8oW0EtWl1bYS16XXswLH0pL2cpLmZpbHRlcihwYXJ0cyA9PiBwYXJ0cykuam9pbihqb2luZXIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBnZXROYW1lKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoLTEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFBhdGhcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGF0aChpbXBvcnRQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlRXh0ZW5zaW9uXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aC5zcGxpdCgnLicpLnNsaWNlKDAsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgaXNIVE1MSW1wb3J0XG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGh0bWxFbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0hUTUxJbXBvcnQoaHRtbEVsZW1lbnQpIHtcblxuICAgICAgICAgICAgbGV0IGlzSW5zdGFuY2UgID0gaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MTGlua0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgaXNJbXBvcnQgICAgPSBTdHJpbmcoaHRtbEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWwnKSkudG9Mb3dlckNhc2UoKSA9PT0gJ2ltcG9ydCcsXG4gICAgICAgICAgICAgICAgaGFzSHJlZkF0dHIgPSBodG1sRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICBoYXNUeXBlSHRtbCA9IFN0cmluZyhodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSkudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHQvaHRtbCc7XG5cbiAgICAgICAgICAgIHJldHVybiBpc0luc3RhbmNlICYmIGlzSW1wb3J0ICYmIGhhc0hyZWZBdHRyICYmIGhhc1R5cGVIdG1sO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZVRpbWVvdXRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHJlc29sdmVUaW1lb3V0KGVycm9yTWVzc2FnZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlamVjdChlcnJvck1lc3NhZ2UpLCBvcHRpb25zLlJFU09MVkVfVElNRU9VVCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhc3RzIHByaW1pdGl2ZSB2YWx1ZXMgaW50byB0aGVpciByZXNwZWN0aXZlIHR5cGVzLiBJZ25vcmVzIGNvbXBsZXggdHlwZXMsIGluY2x1ZGluZyBKU09OIG9iamVjdHMuXG4gICAgICAgICAqIEN1cnJlbnRseSBzdXBwb3J0ZWQgYXJlOiBib29sZWFucywgaW50ZWdlcnMsIGFuZCBmbG9hdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdHlwZWNhc3RQcm9wZXJ0eVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgICAgICogQHJldHVybiB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHR5cGVjYXN0UHJvcGVydHkodmFsdWUpIHtcblxuICAgICAgICAgICAgaWYgKFN0cmluZyh2YWx1ZSkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHZhbHVlKS5tYXRjaCgvXlxcZCtcXC5cXGQrL2kpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKH5bJ3RydWUnLCAnZmFsc2UnXS5pbmRleE9mKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdHJ5UmVnaXN0ZXJFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB0cnlSZWdpc3RlckVsZW1lbnQobmFtZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBjb25zdGFudCBFUlJPUl9NQVBcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IEVSUk9SX01BUCA9IHtcbiAgICAgICAgICAgICAgICAnQSB0eXBlIHdpdGggdGhhdCBuYW1lIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCc6IGBDdXN0b20gZWxlbWVudCBcIiR7bmFtZX1cIiBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRgLFxuICAgICAgICAgICAgICAgICdUaGUgdHlwZSBuYW1lIGlzIGludmFsaWQnOiBgRWxlbWVudCBuYW1lICR7bmFtZX0gaXMgaW52YWxpZCBhbmQgbXVzdCBjb25zaXN0IG9mIGF0IGxlYXN0IG9uZSBoeXBoZW5gXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudChuYW1lLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yRGF0YSA9IE9iamVjdC5rZXlzKEVSUk9SX01BUCkubWFwKChlcnJvcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKGVycm9yLCAnaScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLm1lc3NhZ2UubWF0Y2gocmVnRXhwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKEVSUk9SX01BUFtlcnJvcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghZXJyb3JEYXRhLnNvbWUoKG1vZGVsKSA9PiBtb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3coZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkod2luZG93LmRvY3VtZW50KTsiLCJpbXBvcnQgQ3VzdG9tRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnO1xuaW1wb3J0IHV0aWxpdHkgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZ2dlciAgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0xvZ2dlci5qcyc7XG5pbXBvcnQgb3B0aW9ucyAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvT3B0aW9ucy5qcyc7XG5pbXBvcnQge1N0YXRlTWFuYWdlciwgU3RhdGV9IGZyb20gJy4vU3RhdGVNYW5hZ2VyLmpzJztcblxuLyoqXG4gKiBAbW9kdWxlIE1hcGxlXG4gKiBAc3VibW9kdWxlIENvbXBvbmVudFxuICogQGV4dGVuZHMgU3RhdGVNYW5hZ2VyXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBTdGF0ZU1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogUmVzcG9uc2libGUgZm9yIGxvYWRpbmcgYW55IHByZXJlcXVpc2l0ZXMgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVsZWdhdGVkIHRvIGVhY2ggYEN1c3RvbUVsZW1lbnRgXG4gICAgICogb2JqZWN0IGZvciBjcmVhdGluZyBhIGN1c3RvbSBlbGVtZW50LCBhbmQgbGFzdGx5IHJlbmRlcmluZyB0aGUgUmVhY3QgY29tcG9uZW50IHRvIHRoZSBkZXNpZ25hdGVkIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtIVE1MVGVtcGxhdGVFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxTY3JpcHRFbGVtZW50fSBzY3JpcHRFbGVtZW50XG4gICAgICogQHJldHVybiB7TW9kdWxlfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhdGgsIHRlbXBsYXRlRWxlbWVudCwgc2NyaXB0RWxlbWVudCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGF0aCAgICAgPSBwYXRoO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0geyBzY3JpcHQ6IHNjcmlwdEVsZW1lbnQsIHRlbXBsYXRlOiB0ZW1wbGF0ZUVsZW1lbnQgfTtcblxuICAgICAgICBsZXQgc3JjID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVklORyk7XG5cbiAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBVUkwgb2YgdGhlIGNvbXBvbmVudCBmb3IgRVM2IGBTeXN0ZW0uaW1wb3J0YCwgd2hpY2ggaXMgYWxzbyBwb2x5ZmlsbGVkIGluIGNhc2UgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBwcm92aWRlIHN1cHBvcnQgZm9yIGR5bmFtaWMgbW9kdWxlIGxvYWRpbmcuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnBhdGgucmVzb2x2ZUNvbXBvbmVudChzcmMpO1xuXG4gICAgICAgIGlmIChzcmMuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpID09PSAnanN4Jykge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgbG9nZ2VyLmVycm9yKGBVc2UgSlMgZXh0ZW5zaW9uIGluc3RlYWQgb2YgSlNYIOKAkyBKU1ggY29tcGlsYXRpb24gd2lsbCB3b3JrIGFzIGV4cGVjdGVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBTeXN0ZW0uaW1wb3J0KGAke3VybH1gKS50aGVuKChpbXBvcnRzKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaW1wb3J0cy5kZWZhdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAvLyBDb21wb25lbnRzIHRoYXQgZG8gbm90IGhhdmUgYSBkZWZhdWx0IGV4cG9ydCAoaS5lOiBleHBvcnQgZGVmYXVsdCBjbGFzcy4uLikgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb2FkIGFsbCB0aGlyZC1wYXJ0eSBzY3JpcHRzIHRoYXQgYXJlIGEgcHJlcmVxdWlzaXRlIG9mIHJlc29sdmluZyB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gICAgICAgICAgICBQcm9taXNlLmFsbCh0aGlzLmxvYWRUaGlyZFBhcnR5U2NyaXB0cygpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRWxlbWVudChwYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQsIGltcG9ydHMuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZFRCk7XG4gICAgICAgICAgICB9LCAobWVzc2FnZSkgPT4gbG9nZ2VyLmVycm9yKG1lc3NhZ2UpKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2NvdmVyIGFsbCBvZiB0aGUgdGhpcmQgcGFydHkgSmF2YVNjcmlwdCBkZXBlbmRlbmNpZXMgdGhhdCBhcmUgcmVxdWlyZWQgdG8gaGF2ZSBiZWVuIGxvYWRlZCBiZWZvcmVcbiAgICAgKiBhdHRlbXB0aW5nIHRvIHJlbmRlciB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGxvYWRUaGlyZFBhcnR5U2NyaXB0c1xuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgKi9cbiAgICBsb2FkVGhpcmRQYXJ0eVNjcmlwdHMoKSB7XG5cbiAgICAgICAgbGV0IHNjcmlwdEVsZW1lbnRzICAgID0gdXRpbGl0eS50b0FycmF5KHRoaXMuZWxlbWVudHMudGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpKSxcbiAgICAgICAgICAgIHRoaXJkUGFydHlTY3JpcHRzID0gc2NyaXB0RWxlbWVudHMuZmlsdGVyKChzY3JpcHRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLnBhdGguaXNMb2NhbFBhdGgoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlyZFBhcnR5U2NyaXB0cy5tYXAoKHNjcmlwdEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgbGV0IHNyYyAgICAgICA9IHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaHJlZiAgICAgICAgID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVGltZW91dCBvZiAke29wdGlvbnMuUkVTT0xWRV9USU1FT1VUIC8gMTAwMH0gc2Vjb25kcyBleGNlZWRlZCB3aGlsc3Qgd2FpdGluZyBmb3IgdGhpcmQtcGFydHkgc2NyaXB0OiBcIiR7aHJlZn1cImA7XG4gICAgICAgICAgICAgICAgdXRpbGl0eS5yZXNvbHZlVGltZW91dChlcnJvck1lc3NhZ2UsIHJlamVjdCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IG9wdGlvbnMgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvT3B0aW9ucy5qcyc7XG5pbXBvcnQgZXZlbnRzICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9FdmVudHMuanMnO1xuaW1wb3J0IHV0aWxpdHkgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgbG9nZ2VyICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2dnZXIuanMnO1xuaW1wb3J0IGNhY2hlRmFjdG9yeSBmcm9tICcuLy4uL2hlbHBlcnMvQ2FjaGVGYWN0b3J5LmpzJztcbmltcG9ydCBzZWxlY3RvcnMgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5pbXBvcnQge1N0YXRlTWFuYWdlciwgU3RhdGV9IGZyb20gJy4vU3RhdGVNYW5hZ2VyLmpzJztcblxuLyoqXG4gKiBAbW9kdWxlIE1hcGxlXG4gKiBAc3VibW9kdWxlIEN1c3RvbUVsZW1lbnRcbiAqIEBleHRlbmRzIFN0YXRlTWFuYWdlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tRWxlbWVudCBleHRlbmRzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRTY3JpcHRcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhdGgsIHRlbXBsYXRlRWxlbWVudCwgc2NyaXB0RWxlbWVudCwgaW1wb3J0U2NyaXB0KSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXRoICAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuc2FzcyAgICAgPSBjYWNoZUZhY3RvcnkuZ2V0U2FzcygpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0geyBzY3JpcHQ6IHNjcmlwdEVsZW1lbnQsIHRlbXBsYXRlOiB0ZW1wbGF0ZUVsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5zY3JpcHQgICA9IGltcG9ydFNjcmlwdDtcblxuICAgICAgICBsZXQgZGVzY3JpcHRvciA9IHRoaXMuZ2V0RGVzY3JpcHRvcigpO1xuXG4gICAgICAgIGlmICghZGVzY3JpcHRvci5leHRlbmQpIHtcblxuICAgICAgICAgICAgaWYgKHBhdGguZ2V0SW1wb3J0KCkuaGFzQXR0cmlidXRlKCdkYXRhLW5hbWVzcGFjZScpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlICAgPSBwYXRoLmdldEltcG9ydCgpLmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnKTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLm5hbWUgPSBgJHtuYW1lc3BhY2V9JHtvcHRpb25zLk5BTUVTUEFDRV9TRVBBUkFUT1J9JHtkZXNjcmlwdG9yLm5hbWV9YDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdm9pZCB1dGlsaXR5LnRyeVJlZ2lzdGVyRWxlbWVudChkZXNjcmlwdG9yLm5hbWUsIHtcbiAgICAgICAgICAgICAgICBwcm90b3R5cGU6IHRoaXMuZ2V0RWxlbWVudFByb3RvdHlwZSgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKCdFeHRlbmRpbmcgbmF0aXZlIGVsZW1lbnRzIGN1cnJlbnRseSB1bnN1cHBvcnRlZCBkdWUgdG8gUmVhY3Qg4oCTIHNlZSBwdWxsIHJlcXVlc3Q6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzM5MzAnKTtcblxuICAgICAgICBsZXQgcHJvdG90eXBlID0gYEhUTUwke2Rlc2NyaXB0b3IuZXh0ZW5kfUVsZW1lbnRgO1xuXG4gICAgICAgIHV0aWxpdHkudHJ5UmVnaXN0ZXJFbGVtZW50KGRlc2NyaXB0b3IubmFtZSwge1xuICAgICAgICAgICAgcHJvdG90eXBlOiB0aGlzLmdldEVsZW1lbnRQcm90b3R5cGUod2luZG93W3Byb3RvdHlwZV0ucHJvdG90eXBlKSxcbiAgICAgICAgICAgIGV4dGVuZHM6IGRlc2NyaXB0b3IuZXh0ZW5kLnRvTG93ZXJDYXNlKClcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zaWJsZSBmb3IgbG9hZGluZyBhc3NvY2lhdGVkIHN0eWxlcyBpbnRvIGVpdGhlciB0aGUgc2hhZG93IERPTSwgaWYgdGhlIHBhdGggaXMgZGV0ZXJtaW5lZCB0byBiZSBsb2NhbFxuICAgICAqIHRvIHRoZSBjb21wb25lbnQsIG9yIGdsb2JhbGx5IGlmIG5vdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFN0eWxlc1xuICAgICAqIEBwYXJhbSB7U2hhZG93Um9vdH0gc2hhZG93Qm91bmRhcnlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICovXG4gICAgbG9hZFN0eWxlcyhzaGFkb3dCb3VuZGFyeSkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZENTU1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gYWRkQ1NTKGJvZHkpIHtcbiAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGJvZHk7XG4gICAgICAgICAgICBzaGFkb3dCb3VuZGFyeS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZJTkcpO1xuXG4gICAgICAgIGxldCBjb250ZW50ICAgICAgID0gdGhpcy5lbGVtZW50cy50ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgICBsZXQgbGlua0VsZW1lbnRzICA9IHNlbGVjdG9ycy5nZXRDU1NMaW5rcyhjb250ZW50KTtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudHMgPSBzZWxlY3RvcnMuZ2V0Q1NTSW5saW5lcyhjb250ZW50KTtcbiAgICAgICAgbGV0IHByb21pc2VzICAgICAgPSBbXS5jb25jYXQobGlua0VsZW1lbnRzLCBzdHlsZUVsZW1lbnRzKS5tYXAoKGVsZW1lbnQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICBhZGRDU1MoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVGYWN0b3J5LmZldGNoKHRoaXMucGF0aC5nZXRQYXRoKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpKS50aGVuKChib2R5KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ3RleHQvc2NzcycpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2Fzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdZb3Ugc2hvdWxkIGluY2x1ZGUgXCJzYXNzLmpzXCIgZm9yIGRldmVsb3BtZW50IHJ1bnRpbWUgU0FTUyBjb21waWxhdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybignQWxsIG9mIHlvdXIgU0FTUyBkb2N1bWVudHMgc2hvdWxkIGJlIGNvbXBpbGVkIHRvIENTUyBmb3IgcHJvZHVjdGlvbiB2aWEgeW91ciBidWlsZCBwcm9jZXNzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcGlsZSBTQ1NTIGRvY3VtZW50IGludG8gQ1NTIHByaW9yIHRvIGFwcGVuZGluZyBpdCB0byB0aGUgYm9keS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5zYXNzLmNvbXBpbGUoYm9keSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDU1MocmVzcG9uc2UudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFkZENTUyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4gdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZFRCkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IHRoZSBlbGVtZW50IG5hbWUsIGFuZCBvcHRpb25hbGx5IHRoZSBlbGVtZW50IGV4dGVuc2lvbiwgZnJvbSBjb252ZXJ0aW5nIHRoZSBGdW5jdGlvbiB0byBhIFN0cmluZyB2aWFcbiAgICAgKiB0aGUgYHRvU3RyaW5nYCBtZXRob2QuIEl0J3Mgd29ydGggbm90aW5nIHRoYXQgdGhpcyBpcyBwcm9iYWJseSB0aGUgd2Vha2VzdCBwYXJ0IG9mIHRoZSBNYXBsZSBzeXN0ZW0gYmVjYXVzZSBpdFxuICAgICAqIHJlbGllcyBvbiBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBkZXRlcm1pbmUgdGhlIG5hbWUgb2YgdGhlIHJlc3VsdGluZyBjdXN0b20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXREZXNjcmlwdG9yXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlc2NyaXB0b3IoKSB7XG5cbiAgICAgICAgLy8gV2l0aCBFUzYgdGhlIGBGdW5jdGlvbi5wcm90b3R5cGUubmFtZWAgcHJvcGVydHkgaXMgYmVnaW5uaW5nIHRvIGJlIHN0YW5kYXJkaXNlZCwgd2hpY2ggbWVhbnNcbiAgICAgICAgLy8gaW4gbWFueSBjYXNlcyB3ZSB3b24ndCBoYXZlIHRvIHJlc29ydCB0byB0aGUgZmVlYmxlIGB0b1N0cmluZ2AgYXBwcm9hY2guIEhvb3JhaCFcbiAgICAgICAgbGV0IG5hbWUgICA9IHRoaXMuc2NyaXB0Lm5hbWUgfHwgdGhpcy5zY3JpcHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16X10rKS9pKVsxXSxcbiAgICAgICAgICAgIGV4dGVuZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKH5uYW1lLmluZGV4T2YoJ18nKSkge1xuXG4gICAgICAgICAgICAvLyBEb2VzIHRoZSBlbGVtZW50IG5hbWUgcmVmZXJlbmNlIGFuIGVsZW1lbnQgdG8gZXh0ZW5kP1xuICAgICAgICAgICAgbGV0IHNwbGl0ID0gbmFtZS5zcGxpdCgnXycpO1xuICAgICAgICAgICAgbmFtZSAgICAgID0gc3BsaXRbMF07XG4gICAgICAgICAgICBleHRlbmQgICAgPSBzcGxpdFsxXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdXRpbGl0eS50b1NuYWtlQ2FzZShuYW1lKSwgZXh0ZW5kOiBleHRlbmQgfTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlpZWxkcyB0aGUgcHJvdG90eXBlIGZvciB0aGUgY3VzdG9tIEhUTUwgZWxlbWVudCB0aGF0IHdpbGwgYmUgcmVnaXN0ZXJlZCBmb3Igb3VyIGN1c3RvbSBSZWFjdCBjb21wb25lbnQuXG4gICAgICogSXQgbGlzdGVucyBmb3Igd2hlbiB0aGUgY3VzdG9tIGVsZW1lbnQgaGFzIGJlZW4gaW5zZXJ0ZWQgaW50byB0aGUgRE9NLCBhbmQgdGhlbiBzZXRzIHVwIHRoZSBzdHlsZXMsIGFwcGxpZXNcbiAgICAgKiBkZWZhdWx0IFJlYWN0IHByb3BlcnRpZXMsIGV0Yy4uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRFbGVtZW50UHJvdG90eXBlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnRQcm90b3R5cGVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RWxlbWVudFByb3RvdHlwZShlbGVtZW50UHJvdG90eXBlKSB7XG5cbiAgICAgICAgbGV0IGxvYWRTdHlsZXMgPSB0aGlzLmxvYWRTdHlsZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHNjcmlwdCAgICA9IHRoaXMuc2NyaXB0LFxuICAgICAgICAgICAgcGF0aCAgICAgID0gdGhpcy5wYXRoO1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGVsZW1lbnRQcm90b3R5cGUgfHwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGF0dGFjaGVkQ2FsbGJhY2tcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGF0dGFjaGVkQ2FsbGJhY2s6IHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBtZXRob2QgdmFsdWVcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBzZXREZWZhdWx0UHJvcHNcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldERlZmF1bHRQcm9wcyhhdHRyaWJ1dGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXBsYWNlciA9IC9eZGF0YS0vaTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gdXRpbGl0eS5BVFRSSUJVVEVfUkVBQ1RJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZWNhc3QgdGhlIHZhbHVlIGRlcGVuZGluZyBvbiB0aGUgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSAgPSBhdHRyaWJ1dGUubmFtZS5yZXBsYWNlKHJlcGxhY2VyLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wc1tuYW1lXSA9IHV0aWxpdHkudHlwZWNhc3RQcm9wZXJ0eShhdHRyaWJ1dGUudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgcHJvcGVydGllcyB0byB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHMgPSB7IHBhdGg6IHBhdGgsIGVsZW1lbnQ6IHRoaXMuY2xvbmVOb2RlKHRydWUpIH07XG4gICAgICAgICAgICAgICAgICAgIHNldERlZmF1bHRQcm9wcy5jYWxsKHRoaXMsIHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MICAgICAgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb25maWd1cmUgdGhlIFJlYWN0LmpzIGNvbXBvbmVudCwgaW1wb3J0aW5nIGl0IHVuZGVyIHRoZSBzaGFkb3cgYm91bmRhcnkuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHNjcmlwdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IFJlYWN0LnJlbmRlcihyZW5kZXJlZEVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb25maWd1cmUgdGhlIGV2ZW50IGRlbGVnYXRpb24gZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJbXBvcnQgZXh0ZXJuYWwgQ1NTIGRvY3VtZW50cyBhbmQgcmVzb2x2ZSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHJlc29sdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwobG9hZFN0eWxlcyhzaGFkb3dSb290KSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3VucmVzb2x2ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVzb2x2ZWQnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUVsZW1lbnQuYXBwbHkodGhpcyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQuanMnO1xuaW1wb3J0IHV0aWxpdHkgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgbG9nZ2VyICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2dnZXIuanMnO1xuaW1wb3J0IG9wdGlvbnMgICBmcm9tICcuLy4uL2hlbHBlcnMvT3B0aW9ucy5qcyc7XG5pbXBvcnQgc2VsZWN0b3JzIGZyb20gJy4vLi4vaGVscGVycy9TZWxlY3RvcnMuanMnO1xuaW1wb3J0IHtTdGF0ZU1hbmFnZXIsIFN0YXRlfSBmcm9tICcuL1N0YXRlTWFuYWdlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZSBleHRlbmRzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0hUTUxMaW5rRWxlbWVudH0gbGlua0VsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGlua0VsZW1lbnQpIHtcblxuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhdGggICAgICAgPSB1dGlsaXR5LnJlc29sdmVyKGxpbmtFbGVtZW50LCBsaW5rRWxlbWVudC5pbXBvcnQpLmRldmVsb3BtZW50O1xuICAgICAgICB0aGlzLnN0YXRlICAgICAgPSBTdGF0ZS5VTlJFU09MVkVEO1xuICAgICAgICB0aGlzLmVsZW1lbnRzICAgPSB7IGxpbms6IGxpbmtFbGVtZW50IH07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMubG9hZE1vZHVsZShsaW5rRWxlbWVudCkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIFVzZSBvbmx5IHRoZSBmaXJzdCB0ZW1wbGF0ZSwgYmVjYXVzZSBvdGhlcndpc2UgTWFwbGVpZnkgd2lsbCBoYXZlIGEgZGlmZmljdWx0IGpvYiBhdHRlbXB0aW5nXG4gICAgICAgICAgICAvLyB0byByZXNvbHZlIHRoZSBwYXRocyB3aGVuIHRoZXJlJ3MgYSBtaXNtYXRjaCBiZXR3ZWVuIHRlbXBsYXRlIGVsZW1lbnRzIGFuZCBsaW5rIGVsZW1lbnRzLlxuICAgICAgICAgICAgLy8gUFJFVklPVVM6IHRoaXMuZ2V0VGVtcGxhdGVzKCkuZm9yRWFjaCgodGVtcGxhdGVFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZUVsZW1lbnRzID0gdGhpcy5nZXRUZW1wbGF0ZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlRWxlbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgQ29tcG9uZW50IFwiJHtsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX1cIiBpcyBhdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIHR3byBjb21wb25lbnRzYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbdGhpcy5nZXRUZW1wbGF0ZXMoKVswXV0uZm9yRWFjaCgodGVtcGxhdGVFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0RWxlbWVudHMgPSBzZWxlY3RvcnMuZ2V0QWxsU2NyaXB0cyh0ZW1wbGF0ZUVsZW1lbnQuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50cy5tYXAoKHNjcmlwdEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3JjID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXRoLmlzTG9jYWxQYXRoKHNyYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KHRoaXMucGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZFRCk7XG5cbiAgICAgICAgfSwgKG1lc3NhZ2UpID0+IGxvZ2dlci5lcnJvcihtZXNzYWdlKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNldFN0YXRlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXRlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsb2FkTW9kdWxlXG4gICAgICogQHBhcmFtIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBsaW5rRWxlbWVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgbG9hZE1vZHVsZShsaW5rRWxlbWVudCkge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWSU5HKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaGFzQXR0cmlidXRlKCdyZWYnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlc29sdmUobGlua0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaW1wb3J0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVzb2x2ZShsaW5rRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKGxpbmtFbGVtZW50KSk7XG5cbiAgICAgICAgICAgIGxldCBocmVmICAgICAgICAgPSBsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVGltZW91dCBvZiAke29wdGlvbnMuUkVTT0xWRV9USU1FT1VUIC8gMTAwMH0gc2Vjb25kcyBleGNlZWRlZCB3aGlsc3Qgd2FpdGluZyBmb3IgSFRNTCBpbXBvcnQ6IFwiJHtocmVmfVwiYDtcbiAgICAgICAgICAgIHV0aWxpdHkucmVzb2x2ZVRpbWVvdXQoZXJyb3JNZXNzYWdlLCByZWplY3QpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFRlbXBsYXRlc1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRlbXBsYXRlcygpIHtcblxuICAgICAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMuZWxlbWVudHMubGluay5pbXBvcnQ7XG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkob3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpKTtcblxuICAgIH1cblxufSIsIi8qKlxuICogQGNvbnN0YW50IFN0YXRlXG4gKiBAdHlwZSB7e1VOUkVTT0xWRUQ6IG51bWJlciwgUkVTT0xWSU5HOiBudW1iZXIsIFJFU09MVkVEOiBudW1iZXJ9fVxuICovXG5leHBvcnQgY29uc3QgU3RhdGUgPSB7IFVOUkVTT0xWRUQ6IDAsIFJFU09MVklORzogMSwgUkVTT0xWRUQ6IDIgfTtcblxuLyoqXG4gKiBAbW9kdWxlIE1hcGxlXG4gKiBAc3VibW9kdWxlIFN0YXRlTWFuYWdlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtBYnN0cmFjdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZXRTdGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxufSJdfQ==
