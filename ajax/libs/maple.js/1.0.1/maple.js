(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _Module = require('./models/Module.js');

var _Module2 = _interopRequireWildcard(_Module);

var _utility = require('./helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

(function main($window, $document) {

    'use strict';

    if (typeof System !== 'undefined') {
        System.transpiler = 'babel';
    }

    /**
     * @constant HAS_INITIATED
     * @type {Boolean}
     */
    var HAS_INITIATED = false;

    /**
     * @method isReady
     * @param {String} state
     * @return {Boolean}
     */
    function isReady(state) {
        return !HAS_INITIATED && (state === 'interactive' || state === 'complete');
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

            HAS_INITIATED = true;
            this.findComponents();
        }

        _createClass(Maple, [{
            key: 'findComponents',

            /**
             * @method findComponents
             * @return {void}
             */
            value: function findComponents() {

                var linkElements = _utility2['default'].toArray($document.querySelectorAll('link[rel="import"]'));

                linkElements.forEach(function (linkElement) {

                    if (linkElement['import']) {
                        return void new _Module2['default'](linkElement);
                    }

                    linkElement.addEventListener('load', function () {
                        return new _Module2['default'](linkElement);
                    });
                });
            }
        }]);

        return Maple;
    })();

    // Support for the "async" attribute on the Maple script element.
    if (isReady($document.readyState)) {
        new Maple();
    }

    // No documents, no person.
    $document.addEventListener('DOMContentLoaded', function () {
        return new Maple();
    });
})(window, document);

},{"./helpers/Utility.js":5,"./models/Module.js":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    /**
     * @constant REACTID_ATTRIBUTE
     * @type {String}
     */
    var REACTID_ATTRIBUTE = 'data-reactid';

    /**
     * @property components
     * @type {Array}
     */
    var components = [];

    return {

        /**
         * @method findById
         * @param id {Number}
         * @return {Object}
         */
        findById: function findById(id) {

            var properties = undefined;

            /**
             * @method findRecursively
             * @param {Object} renderedComponent
             * @return {void}
             */
            function findRecursively(renderedComponent) {

                if (renderedComponent._rootNodeID === id) {

                    properties = renderedComponent._currentElement.props;
                    return;
                }

                var children = renderedComponent._renderedComponent._renderedChildren;

                if (!children) {
                    return;
                }

                Object.keys(children).forEach(function (index) {
                    findRecursively(children[index]);
                });
            }

            components.forEach(function (component) {
                findRecursively(component._reactInternalInstance._renderedComponent);
            });

            return properties;
        },

        /**
         * @method delegate
         * @param {HTMLElement} contentElement
         * @param {ReactClass.createClass.Constructor} component
         * @return {void}
         */
        delegate: function delegate(contentElement, component) {
            var _this = this;

            components.push(component);

            contentElement.addEventListener('click', function (event) {

                event.path.forEach(function (item) {

                    if (!item.getAttribute || !item.hasAttribute(REACTID_ATTRIBUTE)) {
                        return;
                    }

                    var x = _this.findById(item.getAttribute(REACTID_ATTRIBUTE));

                    if ('onClick' in x) {
                        x.onClick.apply(component);
                    }
                });
            });
        }

    };
})();

// Remove reactid from default prop
// Setup events
// Replace "export default" when eval'ing
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @method warn
         * @param {String} message
         * @return {void}
         */
        warn: function warn(message) {
            console.log('Maple.js: %c' + message + '.', 'color: #dd4b39');
        },

        /**
         * @method info
         * @param {String} message
         * @return {void}
         */
        info: function info(message) {
            console.log('Maple.js: %c' + message + '.', 'color: blue');
        },

        /**
         * @method error
         * @param {String} message
         * @return {void}
         */
        error: function error(message) {
            console.log('Maple.js: %c' + message + '.', 'color: orange');
        }

    };
})();

module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utility = require('./Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @method getExternalStyles
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getExternalStyles: function getExternalStyles(element) {
            return _utility2['default'].toArray(element.querySelectorAll('link[type="text/css"]'));
        },

        /**
         * @method getInlineStyles
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getInlineStyles: function getInlineStyles(element) {
            return _utility2['default'].toArray(element.querySelectorAll('link[type="text/css"]'));
        },

        /**
         * @method getScripts
         * @param {HTMLElement|HTMLDocument} element
         * @return {Array}
         */
        getScripts: function getScripts(element) {

            var jsFiles = element.querySelectorAll('script[type="text/javascript"]');
            var jsxFiles = element.querySelectorAll('script[type="text/jsx"]');

            return [].concat(_utility2['default'].toArray(jsFiles), _utility2['default'].toArray(jsxFiles));
        }

    };
})();

module.exports = exports['default'];

},{"./Utility.js":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    /**
     * @constant WAIT_TIMEOUT
     * @type {Number}
     */
    var WAIT_TIMEOUT = 30000;

    return {

        /**
         * @method pathResolver
         * @param {HTMLDocument} ownerDocument
         * @param {String} url
         * @return {Object}
         */
        pathResolver: function pathResolver(ownerDocument, url) {

            var componentPath = this.getPath(url),
                getPath = this.getPath.bind(this);

            /**
             * @method resolvePath
             * @param {String} path
             * @param {HTMLDocument} overrideDocument
             * @return {String}
             */
            function resolvePath(path) {
                var overrideDocument = arguments[1] === undefined ? document : arguments[1];

                var a = overrideDocument.createElement('a');
                a.href = path;
                return a.href;
            }

            return {

                /**
                 * @method getPath
                 * @param {String} path
                 * @return {String}
                 */
                getPath: function getPath(path) {

                    if (this.isLocalPath(path)) {
                        return '' + this.getAbsolutePath() + '/' + path;
                    }

                    return resolvePath(path, document);
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
         * @method timeoutPromise
         * @param {Function} reject
         * @param {String} errorMessage
         * @param {Number} [timeout=WAIT_TIMEOUT]
         * @return {void}
         */
        timeoutPromise: function timeoutPromise(reject) {
            var errorMessage = arguments[1] === undefined ? 'Timeout' : arguments[1];
            var timeout = arguments[2] === undefined ? WAIT_TIMEOUT : arguments[2];

            setTimeout(function () {
                return reject(new Error(errorMessage));
            }, timeout);
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
            return importPath.split('/').slice(0, -1).pop();
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
        }

    };
})();

module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
var State = { UNRESOLVED: 0, RESOLVING: 1, RESOLVED: 2 };

exports.State = State;

var Abstract = (function () {

    /**
     * @constructor
     * @return {Abstract}
     */

    function Abstract() {
        _classCallCheck(this, Abstract);

        this.state = State.UNRESOLVED;
    }

    _createClass(Abstract, [{
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

    return Abstract;
})();

exports.Abstract = Abstract;

},{}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Element = require('./Element.js');

var _Element2 = _interopRequireWildcard(_Element);

var _Abstract$State = require('./Abstract.js');

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _logger = require('./../helpers/Logger.js');

var _logger2 = _interopRequireWildcard(_logger);

var Component = (function (_Abstract) {

    /**
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
        this.setState(_Abstract$State.State.RESOLVING);

        if (scriptElement.getAttribute('type') === 'text/jsx') {
            return void this.loadJSX(src);
        }

        var url = '' + this.path.getRelativePath() + '/' + _utility2['default'].removeExtension(src);

        System['import'](url).then(function (imports) {

            if (!imports['default']) {
                return;
            }

            // Load all third-party scripts that are a prerequisite of resolving the custom element.
            Promise.all(_this.loadThirdPartyScripts()).then(function () {
                new _Element2['default'](path, templateElement, scriptElement, imports['default']);
                _this.setState(_Abstract$State.State.RESOLVED);
            });
        });
    }

    _inherits(Component, _Abstract);

    _createClass(Component, [{
        key: 'loadThirdPartyScripts',

        /**
         * @method loadThirdPartyScripts
         * @return {Promise[]}
         */
        value: function loadThirdPartyScripts() {
            var _this2 = this;

            var scriptElements = _utility2['default'].toArray(this.elements.template.content.querySelectorAll('script[type="text/javascript"]')),
                thirdPartyScripts = scriptElements.filter(function (scriptElement) {
                return !_this2.path.isLocalPath(scriptElement.getAttribute('src'));
            });

            return thirdPartyScripts.map(function (scriptElement) {

                return new Promise(function (resolve) {
                    scriptElement.addEventListener('load', function () {
                        return resolve();
                    });
                    document.head.appendChild(scriptElement);
                });
            });
        }
    }, {
        key: 'loadJSX',

        /**
         * @method loadJSX
         * @param {String} src
         * @return {void}
         */
        value: function loadJSX(src) {
            var _this3 = this;

            _logger2['default'].warn('Using JSXTransformer which is highly experimental and should not be used for production');

            fetch('' + this.path.getRelativePath() + '/' + src).then(function (response) {
                return response.text();
            }).then(function (body) {

                /* jslint evil: true */
                var transformed = eval('"use strict"; ' + JSXTransformer.transform(body).code);

                Promise.all(_this3.loadThirdPartyScripts()).then(function () {
                    new _Element2['default'](_this3.path, _this3.elements.template, _this3.elements.script, transformed);
                    _this3.setState(_Abstract$State.State.RESOLVED);
                });
            });
        }
    }]);

    return Component;
})(_Abstract$State.Abstract);

exports['default'] = Component;
module.exports = exports['default'];

},{"./../helpers/Logger.js":3,"./../helpers/Utility.js":5,"./Abstract.js":6,"./Element.js":8}],8:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Abstract$State = require('./Abstract.js');

var _events = require('./../helpers/Events.js');

var _events2 = _interopRequireWildcard(_events);

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _selectors = require('./../helpers/Selectors.js');

var _selectors2 = _interopRequireWildcard(_selectors);

var Element = (function (_Abstract) {

    /**
     * @constructor
     * @param {String} path
     * @param {HTMLScriptElement} scriptElement
     * @param {HTMLTemplateElement} templateElement
     * @param {String} importScript
     * @return {Element}
     */

    function Element(path, templateElement, scriptElement, importScript) {
        _classCallCheck(this, Element);

        _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this);
        this.path = path;
        this.elements = { script: scriptElement, template: templateElement };
        this.script = importScript;

        document.registerElement(this.getElementName(), {
            prototype: this.getElementPrototype()
        });
    }

    _inherits(Element, _Abstract);

    _createClass(Element, [{
        key: 'loadStyles',

        /**
         * @method loadStyles
         * @param {ShadowRoot} shadowBoundary
         * @return {Promise[]}
         */
        value: function loadStyles(shadowBoundary) {
            var _this = this;

            /**
             * @method createStyle
             * @param {String} body
             * @param {ShadowRoot|HTMLDocument} element
             * @return {void}
             */
            function createStyle(body) {
                var element = arguments[1] === undefined ? shadowBoundary : arguments[1];

                var styleElement = document.createElement('style');
                styleElement.setAttribute('type', 'text/css');
                styleElement.innerHTML = body;
                element.appendChild(styleElement);
            }

            this.setState(_Abstract$State.State.RESOLVING);

            var content = this.elements.template.content;
            var linkElements = _selectors2['default'].getExternalStyles(content);
            var styleElements = _selectors2['default'].getInlineStyles(content);
            var promises = [].concat(linkElements, styleElements).map(function (element) {
                return new Promise(function (resolve) {

                    if (element.nodeName.toLowerCase() === 'style') {
                        createStyle(element.innerHTML, shadowBoundary);
                        resolve();
                        return;
                    }

                    fetch(_this.path.getPath(element.getAttribute('href'))).then(function (response) {
                        return response.text();
                    }).then(function (body) {
                        createStyle(body, shadowBoundary);
                        resolve();
                    });
                });
            });

            Promise.all(promises).then(function () {
                return _this.setState(_Abstract$State.State.RESOLVED);
            });
            return promises;
        }
    }, {
        key: 'getElementName',

        /**
         * @method getElementName
         * @return {String}
         */
        value: function getElementName() {
            return _utility2['default'].toSnakeCase(this.script.toString().match(/(?:function|class)\s*([a-z]+)/i)[1]);
        }
    }, {
        key: 'getElementPrototype',

        /**
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
                        var _this2 = this;

                        /**
                         * @method applyDefaultProps
                         * @param {Object} attributes
                         * @return {void}
                         */
                        function applyDefaultProps(attributes) {

                            for (var index = 0; index < attributes.length; index++) {

                                var attribute = attributes.item(index);

                                if (attribute.value) {
                                    var _name = attribute.name.replace(/^data-/i, '');
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
                        _events2['default'].delegate(contentElement, component);

                        // Import external CSS documents.
                        Promise.all(loadStyles(shadowRoot)).then(function () {
                            _this2.removeAttribute('unresolved');
                            _this2.setAttribute('resolved', '');
                        });
                    }

                }

            });
        }
    }]);

    return Element;
})(_Abstract$State.Abstract);

exports['default'] = Element;
module.exports = exports['default'];

},{"./../helpers/Events.js":2,"./../helpers/Selectors.js":4,"./../helpers/Utility.js":5,"./Abstract.js":6}],9:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Component = require('./Component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _Abstract$State = require('./Abstract.js');

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _selectors = require('./../helpers/Selectors.js');

var _selectors2 = _interopRequireWildcard(_selectors);

var Module = (function (_Abstract) {

    /**
     * @constructor
     * @param {HTMLTemplateElement} templateElement
     * @return {Component}
     */

    function Module(templateElement) {
        var _this = this;

        _classCallCheck(this, Module);

        _get(Object.getPrototypeOf(Module.prototype), 'constructor', this).call(this);
        this.path = _utility2['default'].pathResolver(templateElement['import'], templateElement.getAttribute('href'));
        this.state = _Abstract$State.State.UNRESOLVED;
        this.elements = { template: templateElement };
        this.components = [];

        this.loadModule(templateElement).then(function () {

            _this.getTemplates().forEach(function (templateElement) {

                var scriptElements = _selectors2['default'].getScripts(templateElement.content);

                scriptElements.map(function (scriptElement) {

                    var src = scriptElement.getAttribute('src');

                    if (!_this.path.isLocalPath(src)) {
                        return;
                    }

                    var component = new _Component2['default'](_this.path, templateElement, scriptElement);
                    _this.components.push(component);
                });
            });

            _this.setState(_Abstract$State.State.RESOLVED);
        });
    }

    _inherits(Module, _Abstract);

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

            this.setState(_Abstract$State.State.RESOLVING);

            return new Promise(function (resolve) {

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

            var ownerDocument = this.elements.template['import'];
            return _utility2['default'].toArray(ownerDocument.querySelectorAll('template'));
        }
    }]);

    return Module;
})(_Abstract$State.Abstract);

exports['default'] = Module;
module.exports = exports['default'];

},{"./../helpers/Selectors.js":4,"./../helpers/Utility.js":5,"./Abstract.js":6,"./Component.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2dnZXIuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9TZWxlY3RvcnMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9BYnN0cmFjdC5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L01hcGxlLmpzL3NyYy9tb2RlbHMvQ29tcG9uZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9FbGVtZW50LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Nb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztzQkNBb0Isb0JBQW9COzs7O3VCQUNwQixzQkFBc0I7Ozs7QUFFMUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFOztBQUUvQixnQkFBWSxDQUFDOztBQUViLFFBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQy9CLGNBQU0sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO0tBQy9COzs7Ozs7QUFNRCxRQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7Ozs7Ozs7QUFPMUIsYUFBUyxPQUFPLENBQUMs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QUMsQ0FBQyxDQUFDO1NBRXRFOzs7V0FuRmdCLE1BQU07bUJBSm5CLFFBQVE7O3FCQUlLLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1vZHVsZSAgZnJvbSAnLi9tb2RlbHMvTW9kdWxlLmpzJztcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4vaGVscGVycy9VdGlsaXR5LmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciA9ICdiYWJlbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGNvbnN0YW50IEhBU19JTklUSUFURURcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBsZXQgSEFTX0lOSVRJQVRFRCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpc1JlYWR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1JlYWR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiAoIUhBU19JTklUSUFURUQgJiYgKHN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IHN0YXRlID09PSAnY29tcGxldGUnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1vZHVsZSBNYXBsZVxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAgICAgKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICAgICAqL1xuICAgIGNsYXNzIE1hcGxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIEhBU19JTklUSUFURUQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5maW5kQ29tcG9uZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmluZENvbXBvbmVudHNcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRDb21wb25lbnRzKCkge1xuXG4gICAgICAgICAgICB2YXIgbGlua0VsZW1lbnRzID0gdXRpbGl0eS50b0FycmF5KCRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cImltcG9ydFwiXScpKTtcblxuICAgICAgICAgICAgbGlua0VsZW1lbnRzLmZvckVhY2goKGxpbmtFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaW1wb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIG5ldyBNb2R1bGUobGlua0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBuZXcgTW9kdWxlKGxpbmtFbGVtZW50KSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFN1cHBvcnQgZm9yIHRoZSBcImFzeW5jXCIgYXR0cmlidXRlIG9uIHRoZSBNYXBsZSBzY3JpcHQgZWxlbWVudC5cbiAgICBpZiAoaXNSZWFkeSgkZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgbmV3IE1hcGxlKCk7XG4gICAgfVxuXG4gICAgLy8gTm8gZG9jdW1lbnRzLCBubyBwZXJzb24uXG4gICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBuZXcgTWFwbGUoKSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RhbnQgUkVBQ1RJRF9BVFRSSUJVVEVcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbnN0IFJFQUNUSURfQVRUUklCVVRFID0gJ2RhdGEtcmVhY3RpZCc7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgY29tcG9uZW50c1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBsZXQgY29tcG9uZW50cyA9IFtdO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBmaW5kQnlJZFxuICAgICAgICAgKiBAcGFyYW0gaWQge051bWJlcn1cbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZEJ5SWQoaWQpIHtcblxuICAgICAgICAgICAgbGV0IHByb3BlcnRpZXM7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBmaW5kUmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJlZENvbXBvbmVudFxuICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmluZFJlY3Vyc2l2ZWx5KHJlbmRlcmVkQ29tcG9uZW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWRDb21wb25lbnQuX3Jvb3ROb2RlSUQgPT09IGlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHJlbmRlcmVkQ29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gcmVuZGVyZWRDb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZENoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmRSZWN1cnNpdmVseShjaGlsZHJlbltpbmRleF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZmluZFJlY3Vyc2l2ZWx5KGNvbXBvbmVudC5fcmVhY3RJbnRlcm5hbEluc3RhbmNlLl9yZW5kZXJlZENvbXBvbmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBkZWxlZ2F0ZVxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MuQ29uc3RydWN0b3J9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZGVsZWdhdGUoY29udGVudEVsZW1lbnQsIGNvbXBvbmVudCkge1xuXG4gICAgICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcblxuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnBhdGguZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5nZXRBdHRyaWJ1dGUgfHwgIWl0ZW0uaGFzQXR0cmlidXRlKFJFQUNUSURfQVRUUklCVVRFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLmZpbmRCeUlkKGl0ZW0uZ2V0QXR0cmlidXRlKFJFQUNUSURfQVRUUklCVVRFKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCdvbkNsaWNrJyBpbiB4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4Lm9uQ2xpY2suYXBwbHkoY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7XG5cbi8vIFJlbW92ZSByZWFjdGlkIGZyb20gZGVmYXVsdCBwcm9wXG4vLyBTZXR1cCBldmVudHNcbi8vIFJlcGxhY2UgXCJleHBvcnQgZGVmYXVsdFwiIHdoZW4gZXZhbCdpbmciLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB3YXJuXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB3YXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogI2RkNGIzOScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGluZm9cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGluZm8obWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE1hcGxlLmpzOiAlYyR7bWVzc2FnZX0uYCwgJ2NvbG9yOiBibHVlJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZXJyb3JcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBNYXBsZS5qczogJWMke21lc3NhZ2V9LmAsICdjb2xvcjogb3JhbmdlJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi9VdGlsaXR5LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0RXh0ZXJuYWxTdHlsZXNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxIVE1MRG9jdW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRFeHRlcm5hbFN0eWxlcyhlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGlua1t0eXBlPVwidGV4dC9jc3NcIl0nKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0SW5saW5lU3R5bGVzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0SW5saW5lU3R5bGVzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRTY3JpcHRzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8SFRNTERvY3VtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2NyaXB0cyhlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGxldCBqc0ZpbGVzICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nKTtcbiAgICAgICAgICAgIGxldCBqc3hGaWxlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L2pzeFwiXScpO1xuXG4gICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KHV0aWxpdHkudG9BcnJheShqc0ZpbGVzKSwgdXRpbGl0eS50b0FycmF5KGpzeEZpbGVzKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoKTsiLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0YW50IFdBSVRfVElNRU9VVFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY29uc3QgV0FJVF9USU1FT1VUID0gMzAwMDA7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHBhdGhSZXNvbHZlclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxEb2N1bWVudH0gb3duZXJEb2N1bWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHBhdGhSZXNvbHZlcihvd25lckRvY3VtZW50LCB1cmwpIHtcblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFBhdGggPSB0aGlzLmdldFBhdGgodXJsKSxcbiAgICAgICAgICAgICAgICBnZXRQYXRoICAgICAgID0gdGhpcy5nZXRQYXRoLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCByZXNvbHZlUGF0aFxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgICAgICAgICAqIEBwYXJhbSB7SFRNTERvY3VtZW50fSBvdmVycmlkZURvY3VtZW50XG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVQYXRoKHBhdGgsIG92ZXJyaWRlRG9jdW1lbnQgPSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBhICA9IG92ZXJyaWRlRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgIGEuaHJlZiA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaHJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGdldFBhdGgocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTG9jYWxQYXRoKHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRBYnNvbHV0ZVBhdGgoKX0vJHtwYXRofWA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVBhdGgocGF0aCwgZG9jdW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0QWJzb2x1dGVQYXRoXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGdldEFic29sdXRlUGF0aCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQYXRoKGNvbXBvbmVudFBhdGgpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGdldFJlbGF0aXZlUGF0aFxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBnZXRSZWxhdGl2ZVBhdGgoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRQYXRoO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIGlzTG9jYWxQYXRoXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHBhdGgge1N0cmluZ31cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlzTG9jYWxQYXRoKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGdldFBhdGgocmVzb2x2ZVBhdGgocGF0aCwgb3duZXJEb2N1bWVudCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF+cmVzb2x2ZVBhdGgoY29tcG9uZW50UGF0aCkuaW5kZXhPZihwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHsqfSBhcnJheUxpa2VcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0b0FycmF5KGFycmF5TGlrZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20gPyBBcnJheS5mcm9tKGFycmF5TGlrZSkgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJyYXlMaWtlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBmbGF0dGVuQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IFtnaXZlbkFycj1bXV1cbiAgICAgICAgICovXG4gICAgICAgIGZsYXR0ZW5BcnJheShhcnIsIGdpdmVuQXJyID0gW10pIHtcblxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG4gICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGl0ZW0pKSAmJiAodGhpcy5mbGF0dGVuQXJyYXkoaXRlbSwgZ2l2ZW5BcnIpKTtcbiAgICAgICAgICAgICAgICAoIUFycmF5LmlzQXJyYXkoaXRlbSkpICYmIChnaXZlbkFyci5wdXNoKGl0ZW0pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4gICAgICAgICAgICByZXR1cm4gZ2l2ZW5BcnI7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0aW1lb3V0UHJvbWlzZVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZVxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVvdXQ9V0FJVF9USU1FT1VUXVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgdGltZW91dFByb21pc2UocmVqZWN0LCBlcnJvck1lc3NhZ2UgPSAnVGltZW91dCcsIHRpbWVvdXQgPSBXQUlUX1RJTUVPVVQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpKSwgdGltZW91dCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9TbmFrZUNhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGNhbWVsQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2pvaW5lcj0nLSddXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU25ha2VDYXNlKGNhbWVsQ2FzZSwgam9pbmVyID0gJy0nKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FtZWxDYXNlLnNwbGl0KC8oW0EtWl1bYS16XXswLH0pL2cpLmZpbHRlcihwYXJ0cyA9PiBwYXJ0cykuam9pbihqb2luZXIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBnZXROYW1lKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLnBvcCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFBhdGhcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UGF0aChpbXBvcnRQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlRXh0ZW5zaW9uXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aC5zcGxpdCgnLicpLnNsaWNlKDAsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiZXhwb3J0IGNvbnN0IFN0YXRlID0geyBVTlJFU09MVkVEOiAwLCBSRVNPTFZJTkc6IDEsIFJFU09MVkVEOiAyIH07XG5cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdCB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtBYnN0cmFjdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZXRTdGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxufSIsImltcG9ydCBFbGVtZW50ICAgICAgICAgICBmcm9tICcuL0VsZW1lbnQuanMnO1xuaW1wb3J0IHtBYnN0cmFjdCwgU3RhdGV9IGZyb20gJy4vQWJzdHJhY3QuanMnO1xuaW1wb3J0IHV0aWxpdHkgICAgICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBsb2dnZXIgICAgICAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvTG9nZ2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdEVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtNb2R1bGV9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50KSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXRoICAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7IHNjcmlwdDogc2NyaXB0RWxlbWVudCwgdGVtcGxhdGU6IHRlbXBsYXRlRWxlbWVudCB9O1xuXG4gICAgICAgIGxldCBzcmMgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWSU5HKTtcblxuICAgICAgICBpZiAoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ3RleHQvanN4Jykge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgdGhpcy5sb2FkSlNYKHNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5wYXRoLmdldFJlbGF0aXZlUGF0aCgpfS8ke3V0aWxpdHkucmVtb3ZlRXh0ZW5zaW9uKHNyYyl9YDtcblxuICAgICAgICBTeXN0ZW0uaW1wb3J0KHVybCkudGhlbigoaW1wb3J0cykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWltcG9ydHMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTG9hZCBhbGwgdGhpcmQtcGFydHkgc2NyaXB0cyB0aGF0IGFyZSBhIHByZXJlcXVpc2l0ZSBvZiByZXNvbHZpbmcgdGhlIGN1c3RvbSBlbGVtZW50LlxuICAgICAgICAgICAgUHJvbWlzZS5hbGwodGhpcy5sb2FkVGhpcmRQYXJ0eVNjcmlwdHMoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3IEVsZW1lbnQocGF0aCwgdGVtcGxhdGVFbGVtZW50LCBzY3JpcHRFbGVtZW50LCBpbXBvcnRzLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWRUQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvYWRUaGlyZFBhcnR5U2NyaXB0c1xuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgKi9cbiAgICBsb2FkVGhpcmRQYXJ0eVNjcmlwdHMoKSB7XG5cbiAgICAgICAgbGV0IHNjcmlwdEVsZW1lbnRzICAgID0gdXRpbGl0eS50b0FycmF5KHRoaXMuZWxlbWVudHMudGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXScpKSxcbiAgICAgICAgICAgIHRoaXJkUGFydHlTY3JpcHRzID0gc2NyaXB0RWxlbWVudHMuZmlsdGVyKChzY3JpcHRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLnBhdGguaXNMb2NhbFBhdGgoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlyZFBhcnR5U2NyaXB0cy5tYXAoKHNjcmlwdEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvYWRKU1hcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBsb2FkSlNYKHNyYykge1xuXG4gICAgICAgIGxvZ2dlci53YXJuKCdVc2luZyBKU1hUcmFuc2Zvcm1lciB3aGljaCBpcyBoaWdobHkgZXhwZXJpbWVudGFsIGFuZCBzaG91bGQgbm90IGJlIHVzZWQgZm9yIHByb2R1Y3Rpb24nKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLnBhdGguZ2V0UmVsYXRpdmVQYXRoKCl9LyR7c3JjfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9KS50aGVuKChib2R5KSA9PiB7XG5cbiAgICAgICAgICAgIC8qIGpzbGludCBldmlsOiB0cnVlICovXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSBldmFsKGBcInVzZSBzdHJpY3RcIjsgJHtKU1hUcmFuc2Zvcm1lci50cmFuc2Zvcm0oYm9keSkuY29kZX1gKTtcblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwodGhpcy5sb2FkVGhpcmRQYXJ0eVNjcmlwdHMoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3IEVsZW1lbnQodGhpcy5wYXRoLCB0aGlzLmVsZW1lbnRzLnRlbXBsYXRlLCB0aGlzLmVsZW1lbnRzLnNjcmlwdCwgdHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWRUQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQge0Fic3RyYWN0LCBTdGF0ZX0gZnJvbSAnLi9BYnN0cmFjdC5qcyc7XG5pbXBvcnQgZXZlbnRzICAgICAgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgICAgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IHNlbGVjdG9ycyAgICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9TZWxlY3RvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgQWJzdHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge0hUTUxTY3JpcHRFbGVtZW50fSBzY3JpcHRFbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MVGVtcGxhdGVFbGVtZW50fSB0ZW1wbGF0ZUVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0U2NyaXB0XG4gICAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQsIGltcG9ydFNjcmlwdCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGF0aCAgICAgPSBwYXRoO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0geyBzY3JpcHQ6IHNjcmlwdEVsZW1lbnQsIHRlbXBsYXRlOiB0ZW1wbGF0ZUVsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5zY3JpcHQgICA9IGltcG9ydFNjcmlwdDtcblxuICAgICAgICBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQodGhpcy5nZXRFbGVtZW50TmFtZSgpLCB7XG4gICAgICAgICAgICBwcm90b3R5cGU6IHRoaXMuZ2V0RWxlbWVudFByb3RvdHlwZSgpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsb2FkU3R5bGVzXG4gICAgICogQHBhcmFtIHtTaGFkb3dSb290fSBzaGFkb3dCb3VuZGFyeVxuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgKi9cbiAgICBsb2FkU3R5bGVzKHNoYWRvd0JvdW5kYXJ5KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlU3R5bGVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGJvZHlcbiAgICAgICAgICogQHBhcmFtIHtTaGFkb3dSb290fEhUTUxEb2N1bWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3R5bGUoYm9keSwgZWxlbWVudCA9IHNoYWRvd0JvdW5kYXJ5KSB7XG4gICAgICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBib2R5O1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZS5SRVNPTFZJTkcpO1xuXG4gICAgICAgIGxldCBjb250ZW50ICAgICAgID0gdGhpcy5lbGVtZW50cy50ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgICBsZXQgbGlua0VsZW1lbnRzICA9IHNlbGVjdG9ycy5nZXRFeHRlcm5hbFN0eWxlcyhjb250ZW50KTtcbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudHMgPSBzZWxlY3RvcnMuZ2V0SW5saW5lU3R5bGVzKGNvbnRlbnQpO1xuICAgICAgICBsZXQgcHJvbWlzZXMgICAgICA9IFtdLmNvbmNhdChsaW5rRWxlbWVudHMsIHN0eWxlRWxlbWVudHMpLm1hcCgoZWxlbWVudCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVN0eWxlKGVsZW1lbnQuaW5uZXJIVE1MLCBzaGFkb3dCb3VuZGFyeSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmV0Y2godGhpcy5wYXRoLmdldFBhdGgoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLnRoZW4oKGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVTdHlsZShib2R5LCBzaGFkb3dCb3VuZGFyeSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHRoaXMuc2V0U3RhdGUoU3RhdGUuUkVTT0xWRUQpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnZXRFbGVtZW50TmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9TbmFrZUNhc2UodGhpcy5zY3JpcHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16XSspL2kpWzFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldEVsZW1lbnRQcm90b3R5cGVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RWxlbWVudFByb3RvdHlwZSgpIHtcblxuICAgICAgICBsZXQgbG9hZFN0eWxlcyA9IHRoaXMubG9hZFN0eWxlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2NyaXB0ICAgID0gdGhpcy5zY3JpcHQsXG4gICAgICAgICAgICBwYXRoICAgICAgPSB0aGlzLnBhdGg7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlLCB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGF0dGFjaGVkQ2FsbGJhY2tcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGF0dGFjaGVkQ2FsbGJhY2s6IHtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBtZXRob2QgdmFsdWVcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCBhcHBseURlZmF1bHRQcm9wc1xuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYXBwbHlEZWZhdWx0UHJvcHMoYXR0cmlidXRlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXR0cmlidXRlcy5sZW5ndGg7IGluZGV4KyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLml0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lLnJlcGxhY2UoL15kYXRhLS9pLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHNbbmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHByb3BlcnRpZXMgdG8gdGhlIGN1c3RvbSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuZGVmYXVsdFByb3BzID0geyBwYXRoOiBwYXRoLCBlbGVtZW50OiB0aGlzLmNsb25lTm9kZSh0cnVlKSB9O1xuICAgICAgICAgICAgICAgICAgICBhcHBseURlZmF1bHRQcm9wcy5jYWxsKHRoaXMsIHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MICAgICAgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb25maWd1cmUgdGhlIFJlYWN0LmpzIGNvbXBvbmVudCwgaW1wb3J0aW5nIGl0IHVuZGVyIHRoZSBzaGFkb3cgYm91bmRhcnkuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHNjcmlwdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IFJlYWN0LnJlbmRlcihyZW5kZXJlZEVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb25maWd1cmUgdGhlIGV2ZW50IGRlbGVnYXRpb24gZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5kZWxlZ2F0ZShjb250ZW50RWxlbWVudCwgY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbXBvcnQgZXh0ZXJuYWwgQ1NTIGRvY3VtZW50cy5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwobG9hZFN0eWxlcyhzaGFkb3dSb290KSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndW5yZXNvbHZlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Jlc29sdmVkJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IENvbXBvbmVudCAgICAgICAgIGZyb20gJy4vQ29tcG9uZW50LmpzJztcbmltcG9ydCB7QWJzdHJhY3QsIFN0YXRlfSBmcm9tICcuL0Fic3RyYWN0LmpzJztcbmltcG9ydCB1dGlsaXR5ICAgICAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgc2VsZWN0b3JzICAgICAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL1NlbGVjdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZSBleHRlbmRzIEFic3RyYWN0IHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gdGVtcGxhdGVFbGVtZW50XG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlRWxlbWVudCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGF0aCAgICAgICA9IHV0aWxpdHkucGF0aFJlc29sdmVyKHRlbXBsYXRlRWxlbWVudC5pbXBvcnQsIHRlbXBsYXRlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgICAgIHRoaXMuc3RhdGUgICAgICA9IFN0YXRlLlVOUkVTT0xWRUQ7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgICA9IHsgdGVtcGxhdGU6IHRlbXBsYXRlRWxlbWVudCB9O1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcblxuICAgICAgICB0aGlzLmxvYWRNb2R1bGUodGVtcGxhdGVFbGVtZW50KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5nZXRUZW1wbGF0ZXMoKS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRFbGVtZW50cyA9IHNlbGVjdG9ycy5nZXRTY3JpcHRzKHRlbXBsYXRlRWxlbWVudC5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnRzLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhdGguaXNMb2NhbFBhdGgoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQodGhpcy5wYXRoLCB0ZW1wbGF0ZUVsZW1lbnQsIHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVkVEKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2V0U3RhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvYWRNb2R1bGVcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlRWxlbWVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgbG9hZE1vZHVsZSh0ZW1wbGF0ZUVsZW1lbnQpIHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKFN0YXRlLlJFU09MVklORyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUVsZW1lbnQuaW1wb3J0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgcmVzb2x2ZSh0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnZXRUZW1wbGF0ZXNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUZW1wbGF0ZXMoKSB7XG5cbiAgICAgICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLmVsZW1lbnRzLnRlbXBsYXRlLmltcG9ydDtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheShvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJykpO1xuXG4gICAgfVxuXG59Il19
