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

var _helpersEventsJs = require('./helpers/Events.js');

var _helpersEventsJs2 = _interopRequireDefault(_helpersEventsJs);

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
                    new _modelsModuleJs2['default'](linkElement);
                    return;
                }

                linkElement.addEventListener('load', function () {
                    return new _modelsModuleJs2['default'](linkElement);
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

},{"./helpers/Events.js":3,"./helpers/Selectors.js":5,"./helpers/Utility.js":6,"./models/Component.js":7,"./models/Module.js":9}],2:[function(require,module,exports){
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

},{"./Utility.js":6}],4:[function(require,module,exports){
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

},{"./Utility.js":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _LoggerJs = require('./Logger.js');

var _LoggerJs2 = _interopRequireDefault(_LoggerJs);

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
                'A type with that name is already registered': 'Custom element "' + name + '" has already been registered'
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

},{"./Logger.js":4}],7:[function(require,module,exports){
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

                return new Promise(function (resolve) {
                    scriptElement.addEventListener('load', function () {
                        return resolve();
                    });
                    document.head.appendChild(scriptElement);
                });
            });
        }
    }]);

    return Component;
})(_StateManagerJs.StateManager);

exports['default'] = Component;
module.exports = exports['default'];

},{"./../helpers/Logger.js":4,"./../helpers/Utility.js":6,"./Element.js":8,"./StateManager.js":10}],8:[function(require,module,exports){
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
            prototype: Object.create(window[prototype].prototype, this.getElementPrototype()),
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
         * @return {Object}
         */
        value: function getElementPrototype() {

            var loadStyles = this.loadStyles.bind(this),
                script = this.script,
                path = this.path;

            return Object.create(HTMLElement.prototype, {

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
                         * @method applyDefaultProps
                         * @param {Object} attributes
                         * @return {void}
                         */
                        function applyDefaultProps(attributes) {

                            for (var index = 0; index < attributes.length; index++) {

                                var attribute = attributes.item(index);
                                var replacer = /^data-/i;

                                if (attribute.value) {

                                    if (attribute.name === _helpersUtilityJs2['default'].ATTRIBUTE_REACTID) {
                                        continue;
                                    }

                                    var _name = attribute.name.replace(replacer, '');
                                    script.defaultProps[_name] = attribute.value;
                                }
                            }
                        }

                        // Apply properties to the custom element.
                        script.defaultProps = { path: path, element: this.cloneNode(true) };
                        applyDefaultProps.call(this, this.attributes);
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

},{"./../helpers/CacheFactory.js":2,"./../helpers/Events.js":3,"./../helpers/Logger.js":4,"./../helpers/Selectors.js":5,"./../helpers/Utility.js":6,"./StateManager.js":10}],9:[function(require,module,exports){
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
         * @param {HTMLTemplateElement} templateElement
         * @return {Promise}
         */
        value: function loadModule(templateElement) {

            this.setState(_StateManagerJs.State.RESOLVING);

            return new Promise(function (resolve) {

                if (templateElement.hasAttribute('ref')) {
                    return void resolve(templateElement);
                }

                if (templateElement['import']) {
                    return void resolve(templateElement);
                }

                templateElement.addEventListener('load', function () {
                    resolve(templateElement);
                });
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

},{"./../helpers/Logger.js":4,"./../helpers/Selectors.js":5,"./../helpers/Utility.js":6,"./Component.js":7,"./StateManager.js":10}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9DYWNoZUZhY3RvcnkuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2dnZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9TZWxlY3RvcnMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL0VsZW1lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL01vZHVsZS5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9tb2RlbHMvU3RhdGVNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OEJDQXNCLG9CQUFvQjs7OztpQ0FDcEIsdUJBQXVCOzs7O2tDQUN2Qix3QkFBd0I7Ozs7Z0NBQ3hCLHNCQUFzQjs7OzsrQkFDdEIscUJBQXFCOzs7O0FBRTNDLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTs7QUFFL0IsZ0JBQVksQ0FBQzs7QUFFYixRQUFJLE9BQU8sTUFB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O0FBRVgsZ0JBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFPLENBQUM7QUFDOUMsbUJBQU8sOEJBQVEsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBRXRFOzs7V0FsR2dCLE1BQU07bUJBRm5CLFlBQVk7O3FCQUVDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZwQixJQUFNLEtBQUssR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7O1FBQXJELEtBQUssR0FBTCxLQUFLOzs7Ozs7OztJQVFMLFlBQVk7Ozs7Ozs7QUFNVixXQU5GLFlBQVksR0FNUDswQkFOTCxZQUFZOztBQU9qQixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7R0FDakM7O2VBUlEsWUFBWTs7Ozs7Ozs7V0FlYixrQkFBQyxLQUFLLEVBQUU7QUFDWixVQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7O1NBakJRLFlBQVk7OztRQUFaLFlBQVksR0FBWixZQUFZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNb2R1bGUgICAgZnJvbSAnLi9tb2RlbHMvTW9kdWxlLmpzJztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9tb2RlbHMvQ29tcG9uZW50LmpzJztcbmltcG9ydCBzZWxlY3RvcnMgZnJvbSAnLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgIGZyb20gJy4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBldmVudHMgICAgZnJvbSAnLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5cbihmdW5jdGlvbiBtYWluKCR3aW5kb3csICRkb2N1bWVudCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mIFN5c3RlbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgU3lzdGVtLnRyYW5zcGlsZXIgICA9ICdiYWJlbCc7XG4gICAgICAgIFN5c3RlbS5iYWJlbE9wdGlvbnMgPSB7IGJsYWNrbGlzdDogW10gfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RhbnQgSEFTX0lOSVRJQVRFRFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIGxldCBIQVNfSU5JVElBVEVEID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAbW9kdWxlIE1hcGxlXG4gICAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICAgICAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gICAgICovXG4gICAgY2xhc3MgTWFwbGUge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgICAgICB0aGlzLmZpbmRMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy5maW5kVGVtcGxhdGVzKCk7XG5cbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSB0aGUgZXZlbnQgZGVsZWdhdGlvbiBtYXBwaW5ncy5cbiAgICAgICAgICAgIGV2ZW50cy5zZXR1cERlbGVnYXRpb24oKTtcblxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBhbnkgY2hhbmdlcyB0byB0aGUgRE9NIHdoZXJlIEhUTUwgaW1wb3J0cyBjYW4gYmUgZHluYW1pY2FsbHkgaW1wb3J0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LlxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNwb25zaWJsZSBmb3IgZmluZGluZyBhbGwgb2YgdGhlIGV4dGVybmFsIGxpbmsgZWxlbWVudHMsIGFzIHdlbGwgYXMgdGhlIGlubGluZSB0ZW1wbGF0ZSBlbGVtZW50c1xuICAgICAgICAgKiB0aGF0IGNhbiBiZSBoYW5kY3JhZnRlZCwgb3IgYmFrZWQgaW50byB0aGUgSFRNTCBkb2N1bWVudCB3aGVuIGNvbXBpbGluZyBhIHByb2plY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmluZExpbmtzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kTGlua3MoKSB7XG5cbiAgICAgICAgICAgIHNlbGVjdG9ycy5nZXRJbXBvcnRzKCRkb2N1bWVudCkuZm9yRWFjaCgobGlua0VsZW1lbnQpID0+IHRoaXMud2FpdEZvckxpbmtFbGVtZW50KGxpbmtFbGVtZW50KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNwb25zaWJsZSBmb3IgZmluZGluZyBhbGwgb2YgdGhlIHRlbXBsYXRlIEhUTUwgZWxlbWVudHMgdGhhdCBjb250YWluIHRoZSBgcmVmYCBhdHRyaWJ1dGUgd2hpY2hcbiAgICAgICAgICogaXMgdGhlIGNvbXBvbmVudCdzIG9yaWdpbmFsIHBhdGggYmVmb3JlIE1hcGxlaWZ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRUZW1wbGF0ZXNcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRUZW1wbGF0ZXMoKSB7XG5cbiAgICAgICAgICAgIHNlbGVjdG9ycy5nZXRUZW1wbGF0ZXMoJGRvY3VtZW50KS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyA9IHNlbGVjdG9ycy5nZXRBbGxTY3JpcHRzKHRlbXBsYXRlRWxlbWVudC5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVmICAgICAgICAgICAgPSB0ZW1wbGF0ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWYnKTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCAgICAgICAgICAgPSB1dGlsaXR5LnJlc29sdmVyKHJlZiwgbnVsbCkucHJvZHVjdGlvbjtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzLmZvckVhY2goKHNjcmlwdEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aC5pc0xvY2FsUGF0aChzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQ29tcG9uZW50KHBhdGgsIHRlbXBsYXRlRWxlbWVudCwgc2NyaXB0RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2Qgd2FpdEZvckxpbmtFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7SFRNTExpbmtFbGVtZW50fSBsaW5rRWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgd2FpdEZvckxpbmtFbGVtZW50KGxpbmtFbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChsaW5rRWxlbWVudC5pbXBvcnQpIHtcbiAgICAgICAgICAgICAgICBuZXcgTW9kdWxlKGxpbmtFbGVtZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBuZXcgTW9kdWxlKGxpbmtFbGVtZW50KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0ZW5zIGZvciBjaGFuZ2VzIHRvIHRoZSBgSFRNTEhlYWRFbGVtZW50YCBub2RlIGFuZCByZWdpc3RlcnMgYW55IG5ldyBpbXBvcnRzIHRoYXQgYXJlXG4gICAgICAgICAqIGR5bmFtaWNhbGx5IGltcG9ydGVkIGludG8gdGhlIGRvY3VtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIG9ic2VydmVNdXRhdGlvbnNcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIG9ic2VydmVNdXRhdGlvbnMoKSB7XG5cbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcblxuICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRlZE5vZGVzID0gdXRpbGl0eS50b0FycmF5KG11dGF0aW9uLmFkZGVkTm9kZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbGl0eS5pc0hUTUxJbXBvcnQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRGb3JMaW5rRWxlbWVudChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCRkb2N1bWVudC5oZWFkLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGluaXRpYWxpc2VcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpc2UoKSB7XG5cbiAgICAgICAgbGV0IHN0YXRlICAgICAgID0gJGRvY3VtZW50LnJlYWR5U3RhdGUsXG4gICAgICAgICAgICByZWFkeVN0YXRlcyA9IFsnaW50ZXJhY3RpdmUnLCAnY29tcGxldGUnXTtcblxuICAgICAgICBpZiAoIUhBU19JTklUSUFURUQgJiYgfnJlYWR5U3RhdGVzLmluZGV4T2Yoc3RhdGUpKSB7XG5cbiAgICAgICAgICAgIEhBU19JTklUSUFURUQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBObyBkb2N1bWVudHMsIG5vIHBlcnNvbi5cbiAgICAgICAgICAgIG5ldyBNYXBsZSgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFN1cHBvcnQgZm9yIGFzeW5jLCBkZWZlciwgYW5kIG5vcm1hbCBpbmNsdXNpb24uXG4gICAgaW5pdGlhbGlzZSgpO1xuICAgICRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGlzZSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCR3aW5kb3cpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IGNhY2hlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgY2FjaGUgPSB7fTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBkZWxlZ2F0aW5nIHRvIHRoZSBuYXRpdmUgYGZldGNoYCBmdW5jdGlvbiAocG9seWZpbGwgcHJvdmlkZWQpLCBidXQgd2lsbCBjYWNoZSB0aGVcbiAgICAgICAgICogaW5pdGlhbCBwcm9taXNlIGluIG9yZGVyIGZvciBvdGhlciBpbnZvY2F0aW9ucyB0byB0aGUgc2FtZSBVUkwgdG8geWllbGQgdGhlIHNhbWUgcHJvbWlzZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmZXRjaFxuICAgICAgICAgKiBAcGFyYW0gdXJsIHtTdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICAgICAqL1xuICAgICAgICBmZXRjaCh1cmwpIHtcblxuICAgICAgICAgICAgaWYgKGNhY2hlW3VybF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbdXJsXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbdXJsXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAkd2luZG93LmZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSkudGhlbigoYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3VybF07XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkod2luZG93KTsiLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuL1V0aWxpdHkuanMnO1xuXG4vKipcbiAqIEBtZXRob2Qgb3ZlcnJpZGVTdG9wUHJvcGFnYXRpb25cbiAqIEBzZWU6IGh0dHA6Ly9iaXQubHkvMWRQcHhIbFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuKGZ1bmN0aW9uIG92ZXJyaWRlU3RvcFByb3BhZ2F0aW9uKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBsZXQgb3ZlcnJpZGRlblN0b3AgPSBFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uO1xuXG4gICAgRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIG92ZXJyaWRkZW5TdG9wLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBjb21wb25lbnRzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGxldCBjb21wb25lbnRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgZXZlbnROYW1lc1xuICAgICAqIEB0eXBlIHtBcnJheXxudWxsfVxuICAgICAqL1xuICAgIGxldCBldmVudE5hbWVzID0gbnVsbDtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY3Vyc2l2ZWx5IGRpc2NvdmVyIGEgY29tcG9uZW50IHZpYSBpdHMgUmVhY3QgSUQgdGhhdCBpcyBzZXQgYXMgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgKiBvbiBlYWNoIFJlYWN0IGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmluZEJ5SWRcbiAgICAgICAgICogQHBhcmFtIGlkIHtTdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRCeUlkKGlkKSB7XG5cbiAgICAgICAgICAgIGxldCBtb2RlbDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWV0aG9kIGZpbmRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJlZENvbXBvbmVudFxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRDb21wb25lbnRcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmQocmVuZGVyZWRDb21wb25lbnQsIGN1cnJlbnRDb21wb25lbnQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudC5fcm9vdE5vZGVJRCA9PT0gaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBiaW5kTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBiaW5kTW9kZWwoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogY3VycmVudENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQocmVuZGVyZWRDb21wb25lbnQpKSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSByZW5kZXJlZENvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuX3JlbmRlcmVkQ2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZHJlbikuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kKGNoaWxkcmVuW2luZGV4XSwgY3VycmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZmluZChjb21wb25lbnQuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdHJhbnNmb3JtS2V5c1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbdHJhbnNmb3JtZXI9J3RvTG93ZXJDYXNlJ11cbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNmb3JtS2V5cyhtYXAsIHRyYW5zZm9ybWVyID0gJ3RvTG93ZXJDYXNlJykge1xuXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRNYXAgPSB7fTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGZ1bmN0aW9uIGZvckVhY2goa2V5KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRNYXBba2V5W3RyYW5zZm9ybWVyXSgpXSA9IG1hcFtrZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZE1hcDtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyQ29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2Qgc2V0dXBEZWxlZ2F0aW9uXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBzZXR1cERlbGVnYXRpb24oKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZXJtaW5lcyBhbGwgb2YgdGhlIGV2ZW50IHR5cGVzIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyLiBXaWxsIGNhY2hlIHRoZSByZXN1bHRzXG4gICAgICAgICAgICAgKiBvZiB0aGlzIGRpc2NvdmVyeSBmb3IgcGVyZm9ybWFuY2UgYmVuZWZpdHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGV2ZW50c1xuICAgICAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBsZXQgZXZlbnRzID0gZXZlbnROYW1lcyB8fCAoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGFFbGVtZW50ICAgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyICAgID0gL15vbi9pLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhRWxlbWVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkubWF0Y2gobWF0Y2hlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZXMucHVzaChrZXkucmVwbGFjZShtYXRjaGVyLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnROYW1lcztcblxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goKGV2ZW50VHlwZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYG9uJHtldmVudC50eXBlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudExpc3QgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlsaXR5LnRvQXJyYXkoZXZlbnQucGF0aCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ldGhvZCBgc3RvcFByb3BhZ2F0aW9uYCB3YXMgaW52b2tlZCBvbiB0aGUgY3VycmVudCBldmVudCwgd2hpY2ggcHJldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cyBmcm9tIHByb3BhZ2F0aW5nIGFueSBmdXJ0aGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZ2V0QXR0cmlidXRlIHx8ICFpdGVtLmhhc0F0dHJpYnV0ZSh1dGlsaXR5LkFUVFJJQlVURV9SRUFDVElEKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBlbGVtZW50IGlzIG5vdCBhIHZhbGlkIFJlYWN0IGVsZW1lbnQgYmVjYXVzZSBpdCBkb2Vzbid0IGhhdmUgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlYWN0IElEIGRhdGEgYXR0cmlidXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHRvIGZpZWxkIHRoZSBjb21wb25lbnQgYnkgdGhlIGFzc29jaWF0ZWQgUmVhY3QgSUQuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLmZpbmRCeUlkKGl0ZW0uZ2V0QXR0cmlidXRlKHV0aWxpdHkuQVRUUklCVVRFX1JFQUNUSUQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLnByb3BlcnRpZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgY3VycmVudCBSZWFjdCBldmVudHMgaW50byBsb3dlciBjYXNlIGtleXMsIHNvIHRoYXQgd2UgY2FuIHBhaXIgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwIHdpdGggdGhlIGV2ZW50IHR5cGVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtS2V5cyhtb2RlbC5wcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudE5hbWUgaW4gdHJhbnNmb3JtZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBkZWZlciB0aGUgaW52b2NhdGlvbiBvZiB0aGUgZXZlbnQgbWV0aG9kLCBiZWNhdXNlIG90aGVyd2lzZSBSZWFjdC5qc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHJlLXJlbmRlciwgYW5kIHRoZSBSZWFjdCBJRHMgd2lsbCB0aGVuIGJlIFwib3V0IG9mIHN5bmNcIiBmb3IgdGhpcyBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRMaXN0LnB1c2godHJhbnNmb3JtZWRbZXZlbnROYW1lXS5iaW5kKG1vZGVsLmNvbXBvbmVudCwgZXZlbnQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEludm9rZSBlYWNoIGZvdW5kIGV2ZW50IGZvciB0aGUgZXZlbnQgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaXN0LmZvckVhY2goKGV2ZW50SW52b2NhdGlvbikgPT4gZXZlbnRJbnZvY2F0aW9uKCkpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKHdpbmRvdy5kb2N1bWVudCk7IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oJGNvbnNvbGUpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB3YXJuXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB3YXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICRjb25zb2xlLmxvZyhgJWNNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogcmdiYSgwLCAwLCAwLCAuNSknLCAnY29sb3I6ICM1RjlFQTAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBpbmZvXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBpbmZvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICRjb25zb2xlLmxvZyhgJWNNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogcmdiYSgwLCAwLCAwLCAuNSknLCAnY29sb3I6ICMwMDhEREInKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBlcnJvclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3IobWVzc2FnZSkge1xuICAgICAgICAgICAgJGNvbnNvbGUubG9nKGAlY01hcGxlLmpzOiAlYyR7bWVzc2FnZX0uYCwgJ2NvbG9yOiByZ2JhKDAsIDAsIDAsIC41KScsICdjb2xvcjogI0NENjA5MCcpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSh3aW5kb3cuY29uc29sZSk7IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi9VdGlsaXR5LmpzJztcblxuLyoqXG4gKiBAbWV0aG9kIHF1ZXJ5QWxsXG4gKiBAcGFyYW0ge1N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmxldCBxdWVyeUFsbCA9IGZ1bmN0aW9uIHF1ZXJ5QWxsKGV4cHJlc3Npb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KHRoaXMucXVlcnlTZWxlY3RvckFsbChleHByZXNzaW9uKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRDU1NMaW5rc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldENTU0xpbmtzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeUFsbC5jYWxsKGVsZW1lbnQsICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXSxsaW5rW3R5cGU9XCJ0ZXh0L3Njc3NcIl0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRDU1NJbmxpbmVzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q1NTSW5saW5lcyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAnc3R5bGVbdHlwZT1cInRleHQvY3NzXCJdJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0SW1wb3J0c1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldEltcG9ydHMoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ2xpbmtbcmVsPVwiaW1wb3J0XCJdOm5vdChbZGF0YS1pZ25vcmVdKScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFRlbXBsYXRlc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFRlbXBsYXRlcyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwuY2FsbChlbGVtZW50LCAndGVtcGxhdGVbcmVmXScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFNjcmlwdHNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRTY3JpcHRzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeUFsbC5jYWxsKGVsZW1lbnQsICdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEFsbFNjcmlwdHNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRBbGxTY3JpcHRzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBqc3hGaWxlcyA9IHF1ZXJ5QWxsLmNhbGwoZWxlbWVudCwgJ3NjcmlwdFt0eXBlPVwidGV4dC9qc3hcIl0nKTtcbiAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQodXRpbGl0eS50b0FycmF5KHRoaXMuZ2V0U2NyaXB0cyhlbGVtZW50KSksIHV0aWxpdHkudG9BcnJheShqc3hGaWxlcykpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSgpOyIsImltcG9ydCBsb2dnZXIgZnJvbSAnLi9Mb2dnZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigkZG9jdW1lbnQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0YW50IEFUVFJJQlVURV9SRUFDVElEXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBBVFRSSUJVVEVfUkVBQ1RJRDogJ2RhdGEtcmVhY3RpZCcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxEb2N1bWVudHxudWxsfSBvd25lckRvY3VtZW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHJlc29sdmVyKHVybCwgb3duZXJEb2N1bWVudCkge1xuXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50UGF0aCA9IHRoaXMuZ2V0UGF0aCh1cmwpLFxuICAgICAgICAgICAgICAgIGdldFBhdGggICAgICAgPSB0aGlzLmdldFBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBnZXROYW1lICAgICAgID0gdGhpcy5nZXROYW1lLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZVBhdGhcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0hUTUxEb2N1bWVudH0gb3ZlcnJpZGVEb2N1bWVudFxuICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlUGF0aChwYXRoLCBvdmVycmlkZURvY3VtZW50ID0gJGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IGEgID0gb3ZlcnJpZGVEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICAgICAgYS5ocmVmID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5ocmVmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IHByb2R1Y3Rpb25cbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHByb2R1Y3Rpb246IHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFBhdGgocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvY2FsUGF0aChwYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmdldEFic29sdXRlUGF0aCgpfS8ke2dldE5hbWUocGF0aCl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKHBhdGgsICRkb2N1bWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRTcmNcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0U3JjKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE5hbWUoc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRBYnNvbHV0ZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0QWJzb2x1dGVQYXRoKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UmVsYXRpdmVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFJlbGF0aXZlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgaXNMb2NhbFBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlzTG9jYWxQYXRoKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIX5wYXRoLmluZGV4T2YodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBkZXZlbG9wbWVudFxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQ6IHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRQYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldFBhdGgocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvY2FsUGF0aChwYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmdldEFic29sdXRlUGF0aCgpfS8ke3BhdGh9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKHBhdGgsICRkb2N1bWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRTcmNcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0U3JjKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNyYztcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBnZXRBYnNvbHV0ZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0QWJzb2x1dGVQYXRoKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKGNvbXBvbmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldFJlbGF0aXZlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBnZXRSZWxhdGl2ZVBhdGgoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50UGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBpc0xvY2FsUGF0aFxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gcGF0aCB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaXNMb2NhbFBhdGgocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGdldFBhdGgocmVzb2x2ZVBhdGgocGF0aCwgb3duZXJEb2N1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhfnJlc29sdmVQYXRoKGNvbXBvbmVudFBhdGgpLmluZGV4T2YocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAgICAgKiBAcGFyYW0geyp9IGFycmF5TGlrZVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRvQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSA/IEFycmF5LmZyb20oYXJyYXlMaWtlKSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcnJheUxpa2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGZsYXR0ZW5BcnJheVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW2dpdmVuQXJyPVtdXVxuICAgICAgICAgKi9cbiAgICAgICAgZmxhdHRlbkFycmF5KGFyciwgZ2l2ZW5BcnIgPSBbXSkge1xuXG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cbiAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkoaXRlbSkpICYmICh0aGlzLmZsYXR0ZW5BcnJheShpdGVtLCBnaXZlbkFycikpO1xuICAgICAgICAgICAgICAgICghQXJyYXkuaXNBcnJheShpdGVtKSkgJiYgKGdpdmVuQXJyLnB1c2goaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cbiAgICAgICAgICAgIHJldHVybiBnaXZlbkFycjtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU25ha2VDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYW1lbENhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtqb2luZXI9Jy0nXVxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1NuYWtlQ2FzZShjYW1lbENhc2UsIGpvaW5lciA9ICctJykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbWVsQ2FzZS5zcGxpdCgvKFtBLVpdW2Etel17MCx9KS9nKS5maWx0ZXIocGFydHMgPT4gcGFydHMpLmpvaW4oam9pbmVyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldE5hbWVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TmFtZShpbXBvcnRQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnLycpLnNsaWNlKC0xKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRQYXRoXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdldFBhdGgoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUV4dGVuc2lvblxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlRXh0ZW5zaW9uKGZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGguc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGlzSFRNTEltcG9ydFxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBodG1sRWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNIVE1MSW1wb3J0KGh0bWxFbGVtZW50KSB7XG5cbiAgICAgICAgICAgIHZhciBpc0luc3RhbmNlICA9IGh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTExpbmtFbGVtZW50LFxuICAgICAgICAgICAgICAgIGlzSW1wb3J0ICAgID0gU3RyaW5nKGh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZSgncmVsJykpLnRvTG93ZXJDYXNlKCkgPT09ICdpbXBvcnQnLFxuICAgICAgICAgICAgICAgIGhhc0hyZWZBdHRyID0gaHRtbEVsZW1lbnQuaGFzQXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgICAgICAgICAgaGFzVHlwZUh0bWwgPSBTdHJpbmcoaHRtbEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykpLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0L2h0bWwnO1xuXG4gICAgICAgICAgICByZXR1cm4gaXNJbnN0YW5jZSAmJiBpc0ltcG9ydCAmJiBoYXNIcmVmQXR0ciAmJiBoYXNUeXBlSHRtbDtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRyeVJlZ2lzdGVyRWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllc1xuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgdHJ5UmVnaXN0ZXJFbGVtZW50KG5hbWUsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAY29uc3RhbnQgRVJST1JfTUFQXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBFUlJPUl9NQVAgPSB7XG4gICAgICAgICAgICAgICAgJ0EgdHlwZSB3aXRoIHRoYXQgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQnOiBgQ3VzdG9tIGVsZW1lbnQgXCIke25hbWV9XCIgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkYFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQobmFtZSwgcHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBlcnJvckRhdGEgPSBPYmplY3Qua2V5cyhFUlJPUl9NQVApLm1hcCgoZXJyb3IpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cChlcnJvciwgJ2knKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5tZXNzYWdlLm1hdGNoKHJlZ0V4cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihFUlJPUl9NQVBbZXJyb3JdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yRGF0YS5zb21lKChtb2RlbCkgPT4gbW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKHdpbmRvdy5kb2N1bWVudCk7IiwiaW1wb3J0IEN1c3RvbUVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJztcbmltcG9ydCB1dGlsaXR5ICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBsb2dnZXIgICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2dnZXIuanMnO1xuaW1wb3J0IHtTdGF0ZU1hbmFnZXIsIFN0YXRlfSBmcm9tICcuL1N0YXRlTWFuYWdlci5qcyc7XG5cbi8qKlxuICogQG1vZHVsZSBNYXBsZVxuICogQHN1Ym1vZHVsZSBDb21wb25lbnRcbiAqIEBleHRlbmRzIFN0YXRlTWFuYWdlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgU3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIFJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGFueSBwcmVyZXF1aXNpdGVzIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlbGVnYXRlZCB0byBlYWNoIGBDdXN0b21FbGVtZW50YFxuICAgICAqIG9iamVjdCBmb3IgY3JlYXRpbmcgYSBjdXN0b20gZWxlbWVudCwgYW5kIGxhc3RseSByZW5kZXJpbmcgdGhlIFJlYWN0IGNvbXBvbmVudCB0byB0aGUgZGVzaWduYXRlZCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gc2NyaXB0RWxlbWVudFxuICAgICAqIEByZXR1cm4ge01vZHVsZX1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQpIHtcblxuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhdGggICAgID0gcGF0aDtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHsgc2NyaXB0OiBzY3JpcHRFbGVtZW50LCB0ZW1wbGF0ZTogdGVtcGxhdGVFbGVtZW50IH07XG5cbiAgICAgICAgbGV0IHNyYyA9IHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZJTkcpO1xuXG4gICAgICAgIC8vIENvbmZpZ3VyZSB0aGUgVVJMIG9mIHRoZSBjb21wb25lbnQgZm9yIEVTNiBgU3lzdGVtLmltcG9ydGAsIHdoaWNoIGlzIGFsc28gcG9seWZpbGxlZCBpbiBjYXNlIHRoZVxuICAgICAgICAvLyBjdXJyZW50IGJyb3dzZXIgZG9lcyBub3QgcHJvdmlkZSBzdXBwb3J0IGZvciBkeW5hbWljIG1vZHVsZSBsb2FkaW5nLlxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5wYXRoLmdldFJlbGF0aXZlUGF0aCgpfS8ke3V0aWxpdHkucmVtb3ZlRXh0ZW5zaW9uKHNyYyl9YDtcblxuICAgICAgICBpZiAoc3JjLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKSA9PT0gJ2pzeCcpIHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIGxvZ2dlci5lcnJvcihgVXNlIEpTIGV4dGVuc2lvbiBpbnN0ZWFkIG9mIEpTWCDigJMgSlNYIGNvbXBpbGF0aW9uIHdpbGwgd29yayBhcyBleHBlY3RlZGApO1xuICAgICAgICB9XG5cbiAgICAgICAgU3lzdGVtLmltcG9ydChgJHt1cmx9YCkudGhlbigoaW1wb3J0cykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWltcG9ydHMuZGVmYXVsdCkge1xuXG4gICAgICAgICAgICAgICAgLy8gQ29tcG9uZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgZGVmYXVsdCBleHBvcnQgKGkuZTogZXhwb3J0IGRlZmF1bHQgY2xhc3MuLi4pIHdpbGwgYmUgaWdub3JlZC5cbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9hZCBhbGwgdGhpcmQtcGFydHkgc2NyaXB0cyB0aGF0IGFyZSBhIHByZXJlcXVpc2l0ZSBvZiByZXNvbHZpbmcgdGhlIGN1c3RvbSBlbGVtZW50LlxuICAgICAgICAgICAgUHJvbWlzZS5hbGwodGhpcy5sb2FkVGhpcmRQYXJ0eVNjcmlwdHMoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUVsZW1lbnQocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50LCBpbXBvcnRzLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWRUQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNjb3ZlciBhbGwgb2YgdGhlIHRoaXJkIHBhcnR5IEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIHJlcXVpcmVkIHRvIGhhdmUgYmVlbiBsb2FkZWQgYmVmb3JlXG4gICAgICogYXR0ZW1wdGluZyB0byByZW5kZXIgdGhlIGN1c3RvbSBlbGVtZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBsb2FkVGhpcmRQYXJ0eVNjcmlwdHNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICovXG4gICAgbG9hZFRoaXJkUGFydHlTY3JpcHRzKCkge1xuXG4gICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyAgICA9IHV0aWxpdHkudG9BcnJheSh0aGlzLmVsZW1lbnRzLnRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nKSksXG4gICAgICAgICAgICB0aGlyZFBhcnR5U2NyaXB0cyA9IHNjcmlwdEVsZW1lbnRzLmZpbHRlcigoc2NyaXB0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5wYXRoLmlzTG9jYWxQYXRoKHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcmRQYXJ0eVNjcmlwdHMubWFwKChzY3JpcHRFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBzcmMgICAgICAgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCBldmVudHMgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgICAgIGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBsb2dnZXIgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0xvZ2dlci5qcyc7XG5pbXBvcnQgY2FjaGVGYWN0b3J5IGZyb20gJy4vLi4vaGVscGVycy9DYWNoZUZhY3RvcnkuanMnO1xuaW1wb3J0IHNlbGVjdG9ycyAgICBmcm9tICcuLy4uL2hlbHBlcnMvU2VsZWN0b3JzLmpzJztcbmltcG9ydCB7U3RhdGVNYW5hZ2VyLCBTdGF0ZX0gZnJvbSAnLi9TdGF0ZU1hbmFnZXIuanMnO1xuXG4vKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgQ3VzdG9tRWxlbWVudFxuICogQGV4dGVuZHMgU3RhdGVNYW5hZ2VyXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21FbGVtZW50IGV4dGVuZHMgU3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gc2NyaXB0RWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFNjcmlwdFxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50LCBpbXBvcnRTY3JpcHQpIHtcblxuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhdGggICAgID0gcGF0aDtcbiAgICAgICAgdGhpcy5zYXNzICAgICA9ICh0eXBlb2YgU2FzcyA9PT0gJ3VuZGVmaW5lZCcpID8gbnVsbCA6IG5ldyBTYXNzKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7IHNjcmlwdDogc2NyaXB0RWxlbWVudCwgdGVtcGxhdGU6IHRlbXBsYXRlRWxlbWVudCB9O1xuICAgICAgICB0aGlzLnNjcmlwdCAgID0gaW1wb3J0U2NyaXB0O1xuXG4gICAgICAgIGxldCBkZXNjcmlwdG9yID0gdGhpcy5nZXREZXNjcmlwdG9yKCk7XG5cbiAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmV4dGVuZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdm9pZCB1dGlsaXR5LnRyeVJlZ2lzdGVyRWxlbWVudChkZXNjcmlwdG9yLm5hbWUsIHtcbiAgICAgICAgICAgICAgICBwcm90b3R5cGU6IHRoaXMuZ2V0RWxlbWVudFByb3RvdHlwZSgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IGBIVE1MJHtkZXNjcmlwdG9yLmV4dGVuZH1FbGVtZW50YDtcblxuICAgICAgICB1dGlsaXR5LnRyeVJlZ2lzdGVyRWxlbWVudChkZXNjcmlwdG9yLm5hbWUsIHtcbiAgICAgICAgICAgIHByb3RvdHlwZTogT2JqZWN0LmNyZWF0ZSh3aW5kb3dbcHJvdG90eXBlXS5wcm90b3R5cGUsIHRoaXMuZ2V0RWxlbWVudFByb3RvdHlwZSgpKSxcbiAgICAgICAgICAgIGV4dGVuZHM6IGRlc2NyaXB0b3IuZXh0ZW5kLnRvTG93ZXJDYXNlKClcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zaWJsZSBmb3IgbG9hZGluZyBhc3NvY2lhdGVkIHN0eWxlcyBpbnRvIGVpdGhlciB0aGUgc2hhZG93IERPTSwgaWYgdGhlIHBhdGggaXMgZGV0ZXJtaW5lZCB0byBiZSBsb2NhbFxuICAgICAqIHRvIHRoZSBjb21wb25lbnQsIG9yIGdsb2JhbGx5IGlmIG5vdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFN0eWxlc1xuICAgICAqIEBwYXJhbSB7U2hhZG93Um9vdH0gc2hhZG93Qm91bmRhcnlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICovXG4gICAgbG9hZFN0eWxlcyhzaGFkb3dCb3VuZGFyeSkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZENTU1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gYWRkQ1NTKGJvZHkpIHtcbiAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGJvZHk7XG4gICAgICAgICAgICBzaGFkb3dCb3VuZGFyeS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZJTkcpO1xuXG4gICAgICAgIGxldCBjb250ZW50ICAgICAgID0gdGhpcy5lbGVtZW50cy50ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgICBsZXQgbGlua0VsZW1lbnRzICA9IHNlbGVjdG9ycy5nZXRDU1NMaW5rcyhjb250ZW50KTtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudHMgPSBzZWxlY3RvcnMuZ2V0Q1NTSW5saW5lcyhjb250ZW50KTtcbiAgICAgICAgbGV0IHByb21pc2VzICAgICAgPSBbXS5jb25jYXQobGlua0VsZW1lbnRzLCBzdHlsZUVsZW1lbnRzKS5tYXAoKGVsZW1lbnQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICBhZGRDU1MoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVGYWN0b3J5LmZldGNoKHRoaXMucGF0aC5nZXRQYXRoKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpKS50aGVuKChib2R5KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ3RleHQvc2NzcycpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2Fzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdZb3Ugc2hvdWxkIGluY2x1ZGUgXCJzYXNzLmpzXCIgZm9yIGRldmVsb3BtZW50IHJ1bnRpbWUgU0FTUyBjb21waWxhdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybignQWxsIG9mIHlvdXIgU0FTUyBkb2N1bWVudHMgc2hvdWxkIGJlIGNvbXBpbGVkIHRvIENTUyBmb3IgcHJvZHVjdGlvbiB2aWEgeW91ciBidWlsZCBwcm9jZXNzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcGlsZSBTQ1NTIGRvY3VtZW50IGludG8gQ1NTIHByaW9yIHRvIGFwcGVuZGluZyBpdCB0byB0aGUgYm9keS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5zYXNzLmNvbXBpbGUoYm9keSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDU1MocmVzcG9uc2UudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFkZENTUyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4gdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZFRCkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IHRoZSBlbGVtZW50IG5hbWUsIGFuZCBvcHRpb25hbGx5IHRoZSBlbGVtZW50IGV4dGVuc2lvbiwgZnJvbSBjb252ZXJ0aW5nIHRoZSBGdW5jdGlvbiB0byBhIFN0cmluZyB2aWFcbiAgICAgKiB0aGUgYHRvU3RyaW5nYCBtZXRob2QuIEl0J3Mgd29ydGggbm90aW5nIHRoYXQgdGhpcyBpcyBwcm9iYWJseSB0aGUgd2Vha2VzdCBwYXJ0IG9mIHRoZSBNYXBsZSBzeXN0ZW0gYmVjYXVzZSBpdFxuICAgICAqIHJlbGllcyBvbiBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBkZXRlcm1pbmUgdGhlIG5hbWUgb2YgdGhlIHJlc3VsdGluZyBjdXN0b20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXREZXNjcmlwdG9yXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlc2NyaXB0b3IoKSB7XG5cbiAgICAgICAgLy8gV2l0aCBFUzYgdGhlIGBGdW5jdGlvbi5wcm90b3R5cGUubmFtZWAgcHJvcGVydHkgaXMgYmVnaW5uaW5nIHRvIGJlIHN0YW5kYXJkaXNlZCwgd2hpY2ggbWVhbnNcbiAgICAgICAgLy8gaW4gbWFueSBjYXNlcyB3ZSB3b24ndCBoYXZlIHRvIHJlc29ydCB0byB0aGUgZmVlYmxlIGB0b1N0cmluZ2AgYXBwcm9hY2guIEhvb3JhaCFcbiAgICAgICAgbGV0IG5hbWUgICA9IHRoaXMuc2NyaXB0Lm5hbWUgfHwgdGhpcy5zY3JpcHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16X10rKS9pKVsxXSxcbiAgICAgICAgICAgIGV4dGVuZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKH5uYW1lLmluZGV4T2YoJ18nKSkge1xuXG4gICAgICAgICAgICAvLyBEb2VzIHRoZSBlbGVtZW50IG5hbWUgcmVmZXJlbmNlIGFuIGVsZW1lbnQgdG8gZXh0ZW5kP1xuICAgICAgICAgICAgbGV0IHNwbGl0ID0gbmFtZS5zcGxpdCgnXycpO1xuICAgICAgICAgICAgbmFtZSAgICAgID0gc3BsaXRbMF07XG4gICAgICAgICAgICBleHRlbmQgICAgPSBzcGxpdFsxXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdXRpbGl0eS50b1NuYWtlQ2FzZShuYW1lKSwgZXh0ZW5kOiBleHRlbmQgfTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlpZWxkcyB0aGUgcHJvdG90eXBlIGZvciB0aGUgY3VzdG9tIEhUTUwgZWxlbWVudCB0aGF0IHdpbGwgYmUgcmVnaXN0ZXJlZCBmb3Igb3VyIGN1c3RvbSBSZWFjdCBjb21wb25lbnQuXG4gICAgICogSXQgbGlzdGVucyBmb3Igd2hlbiB0aGUgY3VzdG9tIGVsZW1lbnQgaGFzIGJlZW4gaW5zZXJ0ZWQgaW50byB0aGUgRE9NLCBhbmQgdGhlbiBzZXRzIHVwIHRoZSBzdHlsZXMsIGFwcGxpZXNcbiAgICAgKiBkZWZhdWx0IFJlYWN0IHByb3BlcnRpZXMsIGV0Yy4uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRFbGVtZW50UHJvdG90eXBlXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEVsZW1lbnRQcm90b3R5cGUoKSB7XG5cbiAgICAgICAgbGV0IGxvYWRTdHlsZXMgPSB0aGlzLmxvYWRTdHlsZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHNjcmlwdCAgICA9IHRoaXMuc2NyaXB0LFxuICAgICAgICAgICAgcGF0aCAgICAgID0gdGhpcy5wYXRoO1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhdHRhY2hlZENhbGxiYWNrXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhdHRhY2hlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgYXBwbHlEZWZhdWx0UHJvcHNcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFwcGx5RGVmYXVsdFByb3BzKGF0dHJpYnV0ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlcy5pdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVwbGFjZXIgID0gL15kYXRhLS9pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gdXRpbGl0eS5BVFRSSUJVVEVfUkVBQ1RJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lLnJlcGxhY2UocmVwbGFjZXIsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wc1tuYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBwcm9wZXJ0aWVzIHRvIHRoZSBjdXN0b20gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wcyA9IHsgcGF0aDogcGF0aCwgZWxlbWVudDogdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlEZWZhdWx0UHJvcHMuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCAgICAgID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBSZWFjdC5qcyBjb21wb25lbnQsIGltcG9ydGluZyBpdCB1bmRlciB0aGUgc2hhZG93IGJvdW5kYXJ5LlxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChzY3JpcHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBSZWFjdC5yZW5kZXIocmVuZGVyZWRFbGVtZW50LCBjb250ZW50RWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBldmVudCBkZWxlZ2F0aW9uIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICBldmVudHMucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSW1wb3J0IGV4dGVybmFsIENTUyBkb2N1bWVudHMgYW5kIHJlc29sdmUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCByZXNvbHZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnQoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGxvYWRTdHlsZXMoc2hhZG93Um9vdCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd1bnJlc29sdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Jlc29sdmVkJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVFbGVtZW50LmFwcGx5KHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50LmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZ2dlciAgICBmcm9tICcuLy4uL2hlbHBlcnMvTG9nZ2VyLmpzJztcbmltcG9ydCBzZWxlY3RvcnMgZnJvbSAnLi8uLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5pbXBvcnQge1N0YXRlTWFuYWdlciwgU3RhdGV9IGZyb20gJy4vU3RhdGVNYW5hZ2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlIGV4dGVuZHMgU3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SFRNTExpbmtFbGVtZW50fSBsaW5rRWxlbWVudFxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsaW5rRWxlbWVudCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGF0aCAgICAgICA9IHV0aWxpdHkucmVzb2x2ZXIobGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyksIGxpbmtFbGVtZW50LmltcG9ydCkuZGV2ZWxvcG1lbnQ7XG4gICAgICAgIHRoaXMuc3RhdGUgICAgICA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgICA9IHsgbGluazogbGlua0VsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG5cbiAgICAgICAgdGhpcy5sb2FkTW9kdWxlKGxpbmtFbGVtZW50KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gVXNlIG9ubHkgdGhlIGZpcnN0IHRlbXBsYXRlLCBiZWNhdXNlIG90aGVyd2lzZSBNYXBsZWlmeSB3aWxsIGhhdmUgYSBkaWZmaWN1bHQgam9iIGF0dGVtcHRpbmdcbiAgICAgICAgICAgIC8vIHRvIHJlc29sdmUgdGhlIHBhdGhzIHdoZW4gdGhlcmUncyBhIG1pc21hdGNoIGJldHdlZW4gdGVtcGxhdGUgZWxlbWVudHMgYW5kIGxpbmsgZWxlbWVudHMuXG4gICAgICAgICAgICAvLyBQUkVWSU9VUzogdGhpcy5nZXRUZW1wbGF0ZXMoKS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlRWxlbWVudHMgPSB0aGlzLmdldFRlbXBsYXRlcygpO1xuXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBDb21wb25lbnQgXCIke2xpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpfVwiIGlzIGF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgdHdvIGNvbXBvbmVudHNgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFt0aGlzLmdldFRlbXBsYXRlcygpWzBdXS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyA9IHNlbGVjdG9ycy5nZXRBbGxTY3JpcHRzKHRlbXBsYXRlRWxlbWVudC5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhdGguaXNMb2NhbFBhdGgoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQodGhpcy5wYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVkVEKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2V0U3RhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvYWRNb2R1bGVcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgbG9hZE1vZHVsZSh0ZW1wbGF0ZUVsZW1lbnQpIHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVklORyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZWYnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlc29sdmUodGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlRWxlbWVudC5pbXBvcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCByZXNvbHZlKHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRlbXBsYXRlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFRlbXBsYXRlc1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRlbXBsYXRlcygpIHtcblxuICAgICAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMuZWxlbWVudHMubGluay5pbXBvcnQ7XG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkob3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpKTtcblxuICAgIH1cblxufSIsIi8qKlxuICogQGNvbnN0YW50IFN0YXRlXG4gKiBAdHlwZSB7e1VOUkVTT0xWRUQ6IG51bWJlciwgUkVTT0xWSU5HOiBudW1iZXIsIFJFU09MVkVEOiBudW1iZXJ9fVxuICovXG5leHBvcnQgY29uc3QgU3RhdGUgPSB7IFVOUkVTT0xWRUQ6IDAsIFJFU09MVklORzogMSwgUkVTT0xWRUQ6IDIgfTtcblxuLyoqXG4gKiBAbW9kdWxlIE1hcGxlXG4gKiBAc3VibW9kdWxlIFN0YXRlTWFuYWdlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtBYnN0cmFjdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZXRTdGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxufSJdfQ==
