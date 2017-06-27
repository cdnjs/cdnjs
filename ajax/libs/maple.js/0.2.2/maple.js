(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _Component = require('./models/Component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _Template = require('./models/Template.js');

var _Template2 = _interopRequireWildcard(_Template);

var _utility = require('./helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _log = require('./helpers/Log.js');

var _log2 = _interopRequireWildcard(_log);

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
                var _this = this;

                [].concat(this.loadLinks()).forEach(function (promise) {
                    return promise.then(function (templates) {

                        templates.forEach(function (template) {

                            // Load all of the prerequisites for the component.
                            Promise.all(_this.loadThirdPartyScripts(template)).then(function () {

                                _this.resolveScripts(template).forEach(function (promise) {
                                    return promise.then(function (component) {

                                        // Register the custom element using the resolved script.
                                        _this.registerElement(component);
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }, {
            key: 'loadLinks',

            /**
             * @method loadLinks
             * @return {Promise[]}
             */
            value: function loadLinks() {
                var _this2 = this;

                var linkElements = this.findLinks();

                return linkElements.map(function (linkElement) {

                    var href = linkElement.getAttribute('href'),
                        name = _utility2['default'].extractName(href),
                        path = _utility2['default'].extractPath(href);

                    _log2['default']('Component', name, '#8B864E');

                    return new Promise(function (resolve) {

                        /**
                         * @method findTemplates
                         * @return {void}
                         */
                        var findTemplates = function findTemplates() {

                            var templates = [];

                            _this2.findTemplates(linkElement['import']).forEach(function (templateElement) {

                                // Instantiate our component with the name, path, and the associated element.
                                var template = new _Template2['default']({ name: name, path: path, element: templateElement });
                                templates.push(template);
                            });

                            resolve(templates);
                        };

                        if (linkElement['import']) {
                            return void findTemplates();
                        }

                        linkElement.addEventListener('load', findTemplates);
                    });
                });
            }
        }, {
            key: 'loadThirdPartyScripts',

            /**
             * @method loadThirdPartyScripts
             * @param {Template} template
             * @return {Promise[]}
             */
            value: function loadThirdPartyScripts(template) {

                return template.thirdPartyScripts().map(function (script) {
                    return new Promise(function (resolve) {

                        var scriptElement = $document.createElement('script');
                        scriptElement.setAttribute('type', 'text/javascript');
                        scriptElement.setAttribute('src', script.getAttribute('src'));

                        scriptElement.addEventListener('load', function () {
                            resolve(scriptElement);
                        });

                        $document.head.appendChild(scriptElement);
                    });
                });
            }
        }, {
            key: 'resolveScripts',

            /**
             * @method resolveScripts
             * @param {Template} template
             * @return {Promise[]}
             */
            value: function resolveScripts(template) {

                return template.componentScripts().map(function (scriptElement) {
                    return new Promise(function (resolve) {

                        var scriptPath = template.resolveScriptPath(scriptElement.getAttribute('src'));

                        System['import'](scriptPath).then(function (moduleImport) {

                            // Resolve each script contained within the template element.
                            resolve(new _Component2['default']({ script: moduleImport['default'], template: template }));
                        });
                    });
                });
            }
        }, {
            key: 'registerElement',

            /**
             * Responsible for creating the custom element using $document.registerElement, and then appending
             * the associated React.js component.
             *
             * @method registerElement
             * @param {Component} component
             * @return {void}
             */
            value: function registerElement(component) {

                var name = component.elementName();

                if (name.split('-').length <= 1) {
                    _log2['default']('Invalid Tag', '' + name, '#DB7093');
                    return;
                }

                $document.registerElement(name, {
                    prototype: component.customElement()
                });
            }
        }, {
            key: 'findLinks',

            /**
             * @method findLinks
             * @return {Array}
             */
            value: function findLinks() {
                return _utility2['default'].toArray($document.querySelectorAll(_utility2['default'].selector.links));
            }
        }, {
            key: 'findTemplates',

            /**
             * @method findTemplates
             * @param {HTMLDocument} [documentRoot=$document]
             * @return {Array}
             */
            value: function findTemplates() {
                var documentRoot = arguments[0] === undefined ? $document : arguments[0];

                return _utility2['default'].toArray(documentRoot.querySelectorAll(_utility2['default'].selector.templates));
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

},{"./helpers/Log.js":2,"./helpers/Utility.js":3,"./models/Component.js":4,"./models/Template.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//console.log('%c ', 'line-height: 100px; padding: 32px 134px; background: url(https://github.com/Wildhoney/Maple.js/blob/master/media/console-logo.png?raw=true)');

/**
 * @constructor
 * @param {String} label
 * @param {String} message
 * @param {String} colour
 * @return {log}
 */
exports["default"] = log;

function log(label, message, colour) {

    "use strict";

    var commonStyles = "text-transform: uppercase; line-height: 20px; font-size: 9px;";

    console.log("%c Maple %c " + label + " %c " + message, "" + commonStyles + " color: white; background-color: black; padding: 3px 5px", "" + commonStyles + " color: " + colour + "; text-transform: lowercase", "" + commonStyles + " color: rgba(0, 0, 0, .55)");
}

module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

        /**
         * @property selector
         * @type {Object}
         */
        selector: {
            links: 'link[rel="import"]:not([data-ignore])',
            styles: 'link[type="text/css"]',
            scripts: 'script[type="text/javascript"][src*="../"]',
            inlines: 'style[type="text/css"]',
            components: 'script[type="text/javascript"]:not([src*="../"])',
            templates: 'template'
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
         * @method extractName
         * @param {String} importPath
         * @return {String}
         */
        extractName: function extractName(importPath) {
            return importPath.split('/').slice(0, -1).pop();
        },

        /**
         * @method extractPath
         * @param {String} importPath
         * @return {String}
         */
        extractPath: function extractPath(importPath) {
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

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var _log = require('./../helpers/Log.js');

var _log2 = _interopRequireWildcard(_log);

var Component = (function () {

    /**
     * @constructor
     * @param {HTMLScriptElement} script
     * @param {Template} template
     */

    function Component(_ref) {
        var script = _ref.script;
        var template = _ref.template;

        _classCallCheck(this, Component);

        this.script = script;
        this.template = template;
    }

    _createClass(Component, [{
        key: 'elementName',

        /**
         * @method elementName
         * @return {String}
         */
        value: function elementName() {
            return _utility2['default'].toSnakeCase(this.script.toString().match(/(?:function|class)\s*([a-z]+)/i)[1]);
        }
    }, {
        key: 'importLinks',

        /**
         * @method importLinks
         * @param {ShadowRoot} shadowBoundary
         * @return {Promise[]}
         */
        value: function importLinks(shadowBoundary) {
            var _this = this;

            /**
             * @method appendStyle
             * @param {String} body
             * @return {void}
             */
            function appendStyle(body) {
                var styleElement = document.createElement('style');
                styleElement.setAttribute('type', 'text/css');
                styleElement.innerHTML = body;
                shadowBoundary.appendChild(styleElement);
            }

            var content = this.template.element.content,
                linkElements = _utility2['default'].toArray(content.querySelectorAll(_utility2['default'].selector.styles)),
                styleElements = _utility2['default'].toArray(content.querySelectorAll(_utility2['default'].selector.inlines));

            return [].concat(linkElements, styleElements).map(function (element) {
                return new Promise(function (resolve) {

                    if (element.nodeName.toLowerCase() === 'style') {
                        appendStyle(element.innerHTML);
                        resolve();
                        return;
                    }

                    var url = '' + _this.template.path + '/' + element.getAttribute('href');

                    // Create the associated style element and resolve the promise with it.
                    fetch(url).then(function (response) {
                        return response.text();
                    }).then(function (body) {
                        appendStyle(body);
                        resolve();
                    });
                });
            });
        }
    }, {
        key: 'customElement',

        /**
         * @method customElement
         * @return {HTMLElement}
         */
        value: function customElement() {

            var name = this.elementName(),
                script = this.script,
                template = this.template,
                importLinks = this.importLinks.bind(this);

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

                        _log2['default']('Element', name, '#009ACD');
                        script.defaultProps = { path: template.path, element: this.cloneNode(true) };
                        this.innerHTML = '';

                        // Import attributes from the element and transfer to the React.js class.
                        for (var index = 0, attributes = this.attributes; index < attributes.length; index++) {

                            var attribute = attributes.item(index);

                            if (attribute.value) {
                                var _name = attribute.name.replace(/^data-/i, '');
                                script.defaultProps[_name] = attribute.value;
                            }
                        }

                        var renderedElement = React.createElement(script),
                            contentElement = document.createElement('content'),
                            shadowRoot = this.createShadowRoot();

                        shadowRoot.appendChild(contentElement);
                        React.render(renderedElement, contentElement);

                        // Import external CSS documents.
                        Promise.all(importLinks(shadowRoot)).then(function () {
                            _this2.removeAttribute('unresolved');
                            _this2.setAttribute('resolved', '');
                        });
                    }

                }

            });
        }
    }]);

    return Component;
})();

exports['default'] = Component;
module.exports = exports['default'];

},{"./../helpers/Log.js":2,"./../helpers/Utility.js":3}],5:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

var Template = (function () {

    /**
     * @constructor
     * @param {String} name
     * @param {String} path
     * @param {HTMLTemplateElement} element
     * @return {Component}
     */

    function Template(_ref) {
        var name = _ref.name;
        var path = _ref.path;
        var element = _ref.element;

        _classCallCheck(this, Template);

        this.name = name;
        this.path = path;
        this.element = element;
    }

    _createClass(Template, [{
        key: 'thirdPartyScripts',

        /**
         * @method thirdPartyScripts
         * @return {Array}
         */
        value: function thirdPartyScripts() {
            return _utility2['default'].toArray(this.element.content.querySelectorAll(_utility2['default'].selector.scripts));
        }
    }, {
        key: 'componentScripts',

        /**
         * @method componentScripts
         * @return {Array}
         */
        value: function componentScripts() {
            return _utility2['default'].toArray(this.element.content.querySelectorAll(_utility2['default'].selector.components));
        }
    }, {
        key: 'resolveScriptPath',

        /**
         * @method resolveScriptPath
         * @param {String} scriptName
         * @return {String}
         */
        value: function resolveScriptPath(scriptName) {
            return '' + this.path + '/' + _utility2['default'].removeExtension(scriptName);
        }
    }]);

    return Template;
})();

exports['default'] = Template;
module.exports = exports['default'];

},{"./../helpers/Utility.js":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2cuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7eUJDQXNCLHVCQUF1Qjs7Ozt3QkFDdkIsc0JBQXNCOzs7O3VCQUN0QixzQkFBc0I7Ozs7bUJBQ3RCLGtCQUFrQjs7OztBQUV4QyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7O0FBRS9CLGdCQUFZLENBQUM7O0FBRWIsUUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDL0IsY0FBTSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7S0FDL0I7Ozs7OztBQU1ELFFBQUksYUFBYSxHQUFHLEtBQUssQ0FBQzs7Ozs7OztBQU8xQixhQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDcEIsZUFBUSxDQUFDLGFBQWEsS0FBSyxLQUFLLEtBQUssYUFBYSxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUEsQUFBQyxDQUFFO0tBQ2hGOzs7Ozs7OztRQU9LLEtBQUs7Ozs7Ozs7QUFNSSxpQkFOVCxLQUFLLEdBTU87a0NBTlosS0FBSzs7QUFPSCx5QkFBYSxHQUFHLElBQUksQ0FBQztBQUNyQixnQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pC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QUFJLFFBQUosSUFBSTtZQUFFLE9BQU8sUUFBUCxPQUFPOzs4QkFUaEIsUUFBUTs7QUFVckIsWUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUM7QUFDcEIsWUFBSSxDQUFDLElBQUksR0FBTSxJQUFJLENBQUM7QUFDcEIsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7O2lCQWJnQixRQUFROzs7Ozs7O2VBbUJSLDZCQUFHO0FBQ2hCLG1CQUFPLHFCQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBUSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMzRjs7Ozs7Ozs7ZUFNZSw0QkFBRztBQUNmLG1CQUFPLHFCQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBUSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM5Rjs7Ozs7Ozs7O2VBT2dCLDJCQUFDLFVBQVUsRUFBRTtBQUMxQix3QkFBVSxJQUFJLENBQUMsSUFBSSxTQUFJLHFCQUFRLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBRztTQUNoRTs7O1dBdENnQixRQUFROzs7cUJBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgVGVtcGxhdGUgIGZyb20gJy4vbW9kZWxzL1RlbXBsYXRlLmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZyAgICAgICBmcm9tICcuL2hlbHBlcnMvTG9nLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciA9ICdiYWJlbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGNvbnN0YW50IEhBU19JTklUSUFURURcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBsZXQgSEFTX0lOSVRJQVRFRCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpc1JlYWR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1JlYWR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiAoIUhBU19JTklUSUFURUQgJiYgKHN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IHN0YXRlID09PSAnY29tcGxldGUnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1vZHVsZSBNYXBsZVxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAgICAgKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICAgICAqL1xuICAgIGNsYXNzIE1hcGxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIEhBU19JTklUSUFURUQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5maW5kQ29tcG9uZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmluZENvbXBvbmVudHNcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRDb21wb25lbnRzKCkge1xuXG4gICAgICAgICAgICBbXS5jb25jYXQodGhpcy5sb2FkTGlua3MoKSkuZm9yRWFjaCgocHJvbWlzZSkgPT4gcHJvbWlzZS50aGVuKCh0ZW1wbGF0ZXMpID0+IHtcblxuICAgICAgICAgICAgICAgIHRlbXBsYXRlcy5mb3JFYWNoKCh0ZW1wbGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIExvYWQgYWxsIG9mIHRoZSBwcmVyZXF1aXNpdGVzIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbCh0aGlzLmxvYWRUaGlyZFBhcnR5U2NyaXB0cyh0ZW1wbGF0ZSkpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVTY3JpcHRzKHRlbXBsYXRlKS5mb3JFYWNoKChwcm9taXNlKSA9PiBwcm9taXNlLnRoZW4oKGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIGN1c3RvbSBlbGVtZW50IHVzaW5nIHRoZSByZXNvbHZlZCBzY3JpcHQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVsZW1lbnQoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgbG9hZExpbmtzXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgICAgICovXG4gICAgICAgIGxvYWRMaW5rcygpIHtcblxuICAgICAgICAgICAgbGV0IGxpbmtFbGVtZW50cyA9IHRoaXMuZmluZExpbmtzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBsaW5rRWxlbWVudHMubWFwKChsaW5rRWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgPSBsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHV0aWxpdHkuZXh0cmFjdE5hbWUoaHJlZiksXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1dGlsaXR5LmV4dHJhY3RQYXRoKGhyZWYpO1xuXG4gICAgICAgICAgICAgICAgbG9nKCdDb21wb25lbnQnLCBuYW1lLCAnIzhCODY0RScpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgZmluZFRlbXBsYXRlc1xuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmRUZW1wbGF0ZXMgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kVGVtcGxhdGVzKGxpbmtFbGVtZW50LmltcG9ydCkuZm9yRWFjaCgodGVtcGxhdGVFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBvdXIgY29tcG9uZW50IHdpdGggdGhlIG5hbWUsIHBhdGgsIGFuZCB0aGUgYXNzb2NpYXRlZCBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSh7IG5hbWU6IG5hbWUsIHBhdGg6IHBhdGgsIGVsZW1lbnQ6IHRlbXBsYXRlRWxlbWVudCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMucHVzaCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlua0VsZW1lbnQuaW1wb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCBmaW5kVGVtcGxhdGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZmluZFRlbXBsYXRlcyk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGxvYWRUaGlyZFBhcnR5U2NyaXB0c1xuICAgICAgICAgKiBAcGFyYW0ge1RlbXBsYXRlfSB0ZW1wbGF0ZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICAgICAqL1xuICAgICAgICBsb2FkVGhpcmRQYXJ0eVNjcmlwdHModGVtcGxhdGUpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnRoaXJkUGFydHlTY3JpcHRzKCkubWFwKChzY3JpcHQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0RWxlbWVudCA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgc2NyaXB0LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuXG4gICAgICAgICAgICAgICAgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHNjcmlwdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG5cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVzb2x2ZVNjcmlwdHNcbiAgICAgICAgICogQHBhcmFtIHtUZW1wbGF0ZX0gdGVtcGxhdGVcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVzb2x2ZVNjcmlwdHModGVtcGxhdGUpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLmNvbXBvbmVudFNjcmlwdHMoKS5tYXAoKHNjcmlwdEVsZW1lbnQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0UGF0aCA9IHRlbXBsYXRlLnJlc29sdmVTY3JpcHRQYXRoKHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG5cbiAgICAgICAgICAgICAgICBTeXN0ZW0uaW1wb3J0KHNjcmlwdFBhdGgpLnRoZW4oKG1vZHVsZUltcG9ydCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgZWFjaCBzY3JpcHQgY29udGFpbmVkIHdpdGhpbiB0aGUgdGVtcGxhdGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgQ29tcG9uZW50KHsgc2NyaXB0OiBtb2R1bGVJbXBvcnQuZGVmYXVsdCwgdGVtcGxhdGU6IHRlbXBsYXRlIH0pKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGN1c3RvbSBlbGVtZW50IHVzaW5nICRkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQsIGFuZCB0aGVuIGFwcGVuZGluZ1xuICAgICAgICAgKiB0aGUgYXNzb2NpYXRlZCBSZWFjdC5qcyBjb21wb25lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVnaXN0ZXJFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChjb21wb25lbnQpIHtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBjb21wb25lbnQuZWxlbWVudE5hbWUoKTtcblxuICAgICAgICAgICAgaWYgKG5hbWUuc3BsaXQoJy0nKS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgIGxvZygnSW52YWxpZCBUYWcnLCBgJHtuYW1lfWAsICcjREI3MDkzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KG5hbWUsIHtcbiAgICAgICAgICAgICAgICBwcm90b3R5cGU6IGNvbXBvbmVudC5jdXN0b21FbGVtZW50KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBmaW5kTGlua3NcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kTGlua3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KCRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHV0aWxpdHkuc2VsZWN0b3IubGlua3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRUZW1wbGF0ZXNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRG9jdW1lbnR9IFtkb2N1bWVudFJvb3Q9JGRvY3VtZW50XVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRUZW1wbGF0ZXMoZG9jdW1lbnRSb290ID0gJGRvY3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGRvY3VtZW50Um9vdC5xdWVyeVNlbGVjdG9yQWxsKHV0aWxpdHkuc2VsZWN0b3IudGVtcGxhdGVzKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFN1cHBvcnQgZm9yIHRoZSBcImFzeW5jXCIgYXR0cmlidXRlIG9uIHRoZSBNYXBsZSBzY3JpcHQgZWxlbWVudC5cbiAgICBpZiAoaXNSZWFkeSgkZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgbmV3IE1hcGxlKCk7XG4gICAgfVxuXG4gICAgLy8gTm8gZG9jdW1lbnRzLCBubyBwZXJzb24uXG4gICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBuZXcgTWFwbGUoKSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8vY29uc29sZS5sb2coJyVjICcsICdsaW5lLWhlaWdodDogMTAwcHg7IHBhZGRpbmc6IDMycHggMTM0cHg7IGJhY2tncm91bmQ6IHVybChodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzL2Jsb2IvbWFzdGVyL21lZGlhL2NvbnNvbGUtbG9nby5wbmc/cmF3PXRydWUpJyk7XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcGFyYW0ge1N0cmluZ30gY29sb3VyXG4gKiBAcmV0dXJuIHtsb2d9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyhsYWJlbCwgbWVzc2FnZSwgY29sb3VyKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGxldCBjb21tb25TdHlsZXMgPSAndGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGluZS1oZWlnaHQ6IDIwcHg7IGZvbnQtc2l6ZTogOXB4Oyc7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjIE1hcGxlICVjICR7bGFiZWx9ICVjICR7bWVzc2FnZX1gLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiB3aGl0ZTsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IHBhZGRpbmc6IDNweCA1cHhgLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiAke2NvbG91cn07IHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2VgLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiByZ2JhKDAsIDAsIDAsIC41NSlgXG4gICAgKTtcblxufSIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2VsZWN0b3JcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGVjdG9yOiB7XG4gICAgICAgICAgICBsaW5rczogICAgICAnbGlua1tyZWw9XCJpbXBvcnRcIl06bm90KFtkYXRhLWlnbm9yZV0pJyxcbiAgICAgICAgICAgIHN0eWxlczogICAgICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG4gICAgICAgICAgICBzY3JpcHRzOiAgICAnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl1bc3JjKj1cIi4uL1wiXScsXG4gICAgICAgICAgICBpbmxpbmVzOiAgICAnc3R5bGVbdHlwZT1cInRleHQvY3NzXCJdJyxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6ICdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXTpub3QoW3NyYyo9XCIuLi9cIl0pJyxcbiAgICAgICAgICAgIHRlbXBsYXRlczogICd0ZW1wbGF0ZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICAgICAqIEBwYXJhbSB7Kn0gYXJyYXlMaWtlXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdG9BcnJheShhcnJheUxpa2UpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tID8gQXJyYXkuZnJvbShhcnJheUxpa2UpIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFycmF5TGlrZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9TbmFrZUNhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGNhbWVsQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2pvaW5lcj0nLSddXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvU25ha2VDYXNlKGNhbWVsQ2FzZSwgam9pbmVyID0gJy0nKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FtZWxDYXNlLnNwbGl0KC8oW0EtWl1bYS16XXswLH0pL2cpLmZpbHRlcihwYXJ0cyA9PiBwYXJ0cykuam9pbihqb2luZXIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZXh0cmFjdE5hbWVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZXh0cmFjdE5hbWUoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkucG9wKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZXh0cmFjdFBhdGhcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZXh0cmFjdFBhdGgoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUV4dGVuc2lvblxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlRXh0ZW5zaW9uKGZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGguc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLicpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSgpOyIsImltcG9ydCB1dGlsaXR5IGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbmltcG9ydCBsb2cgICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2cuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gc2NyaXB0XG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZX0gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IHNjcmlwdCwgdGVtcGxhdGUgfSkge1xuICAgICAgICB0aGlzLnNjcmlwdCAgID0gc2NyaXB0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBlbGVtZW50TmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBlbGVtZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9TbmFrZUNhc2UodGhpcy5zY3JpcHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16XSspL2kpWzFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGltcG9ydExpbmtzXG4gICAgICogQHBhcmFtIHtTaGFkb3dSb290fSBzaGFkb3dCb3VuZGFyeVxuICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgKi9cbiAgICBpbXBvcnRMaW5rcyhzaGFkb3dCb3VuZGFyeSkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGFwcGVuZFN0eWxlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBhcHBlbmRTdHlsZShib2R5KSB7XG4gICAgICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBib2R5O1xuICAgICAgICAgICAgc2hhZG93Qm91bmRhcnkuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb250ZW50ICAgICAgID0gdGhpcy50ZW1wbGF0ZS5lbGVtZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBsaW5rRWxlbWVudHMgID0gdXRpbGl0eS50b0FycmF5KGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCh1dGlsaXR5LnNlbGVjdG9yLnN0eWxlcykpLFxuICAgICAgICAgICAgc3R5bGVFbGVtZW50cyA9IHV0aWxpdHkudG9BcnJheShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXRpbGl0eS5zZWxlY3Rvci5pbmxpbmVzKSk7XG5cbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChsaW5rRWxlbWVudHMsIHN0eWxlRWxlbWVudHMpLm1hcCgoZWxlbWVudCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgIGFwcGVuZFN0eWxlKGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy50ZW1wbGF0ZS5wYXRofS8ke2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyl9YDtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBhc3NvY2lhdGVkIHN0eWxlIGVsZW1lbnQgYW5kIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCBpdC5cbiAgICAgICAgICAgIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSkudGhlbigoYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIGFwcGVuZFN0eWxlKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY3VzdG9tRWxlbWVudFxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGN1c3RvbUVsZW1lbnQoKSB7XG5cbiAgICAgICAgbGV0IG5hbWUgICAgICAgID0gdGhpcy5lbGVtZW50TmFtZSgpLFxuICAgICAgICAgICAgc2NyaXB0ICAgICAgPSB0aGlzLnNjcmlwdCxcbiAgICAgICAgICAgIHRlbXBsYXRlICAgID0gdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgIGltcG9ydExpbmtzID0gdGhpcy5pbXBvcnRMaW5rcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhdHRhY2hlZENhbGxiYWNrXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhdHRhY2hlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbG9nKCdFbGVtZW50JywgbmFtZSwgJyMwMDlBQ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wcyA9IHsgcGF0aDogdGVtcGxhdGUucGF0aCwgZWxlbWVudDogdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgICAgICA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltcG9ydCBhdHRyaWJ1dGVzIGZyb20gdGhlIGVsZW1lbnQgYW5kIHRyYW5zZmVyIHRvIHRoZSBSZWFjdC5qcyBjbGFzcy5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzOyBpbmRleCA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLml0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBhdHRyaWJ1dGUubmFtZS5yZXBsYWNlKC9eZGF0YS0vaSwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHNbbmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHNjcmlwdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QucmVuZGVyKHJlbmRlcmVkRWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltcG9ydCBleHRlcm5hbCBDU1MgZG9jdW1lbnRzLlxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChpbXBvcnRMaW5rcyhzaGFkb3dSb290KSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndW5yZXNvbHZlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Jlc29sdmVkJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHsgbmFtZSwgcGF0aCwgZWxlbWVudCB9KSB7XG4gICAgICAgIHRoaXMubmFtZSAgICA9IG5hbWU7XG4gICAgICAgIHRoaXMucGF0aCAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0aGlyZFBhcnR5U2NyaXB0c1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXJkUGFydHlTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KHRoaXMuZWxlbWVudC5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXRpbGl0eS5zZWxlY3Rvci5zY3JpcHRzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb21wb25lbnRTY3JpcHRzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgY29tcG9uZW50U2NyaXB0cygpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheSh0aGlzLmVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKHV0aWxpdHkuc2VsZWN0b3IuY29tcG9uZW50cykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgcmVzb2x2ZVNjcmlwdFBhdGhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NyaXB0TmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICByZXNvbHZlU2NyaXB0UGF0aChzY3JpcHROYW1lKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnBhdGh9LyR7dXRpbGl0eS5yZW1vdmVFeHRlbnNpb24oc2NyaXB0TmFtZSl9YDtcbiAgICB9XG5cbn0iXX0=
