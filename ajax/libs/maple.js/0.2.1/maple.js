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
                        return linkElement.addEventListener('load', function () {

                            var templates = [];

                            _this2.findTemplates(linkElement['import']).forEach(function (templateElement) {

                                // Instantiate our component with the name, path, and the associated element.
                                var template = new _Template2['default']({ name: name, path: path, element: templateElement });
                                templates.push(template);
                            });

                            resolve(templates);
                        });
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
            scripts: 'script[type="text/javascript"]',
            inlines: 'style[type="text/css"]',
            components: 'script[type="text/maple-component"]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Mb2cuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7eUJDQXNCLHVCQUF1Qjs7Ozt3QkFDdkIsc0JBQXNCOzs7O3VCQUN0QixzQkFBc0I7Ozs7bUJBQ3RCLGtCQUFrQjs7OztBQUV4QyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7O0FBRS9CLGdCQUFZLENBQUM7O0FBRWIsUUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDL0IsY0FBTSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7S0FDL0I7Ozs7Ozs7O1FBT0ssS0FBSzs7Ozs7OztBQU1JLGlCQU5ULEtBQUssR0FNTztrQ0FOWixLQUFLOztBQU9ILGdCQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7O3FCQVJDLEtBQUs7Ozs7Ozs7bUJBY08sMEJBQUc7OztBQUViLGtCQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87MkJBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQVMsRUFBSzs7QUFFekUsaUNBQVMsQ0FBQyxPQUFPLENBQUMsVUFB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Q0FBQyxnQkFBZ0IsQ0FBQyxxQkFBUSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM5Rjs7Ozs7Ozs7O2VBT2dCLDJCQUFDLFVBQVUsRUFBRTtBQUMxQix3QkFBVSxJQUFJLENBQUMsSUFBSSxTQUFJLHFCQUFRLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBRztTQUNoRTs7O1dBdENnQixRQUFROzs7cUJBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgVGVtcGxhdGUgIGZyb20gJy4vbW9kZWxzL1RlbXBsYXRlLmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuaW1wb3J0IGxvZyAgICAgICBmcm9tICcuL2hlbHBlcnMvTG9nLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciA9ICdiYWJlbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1vZHVsZSBNYXBsZVxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAgICAgKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICAgICAqL1xuICAgIGNsYXNzIE1hcGxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuZmluZENvbXBvbmVudHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRDb21wb25lbnRzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kQ29tcG9uZW50cygpIHtcblxuICAgICAgICAgICAgW10uY29uY2F0KHRoaXMubG9hZExpbmtzKCkpLmZvckVhY2goKHByb21pc2UpID0+IHByb21pc2UudGhlbigodGVtcGxhdGVzKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMuZm9yRWFjaCgodGVtcGxhdGUpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBMb2FkIGFsbCBvZiB0aGUgcHJlcmVxdWlzaXRlcyBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwodGhpcy5sb2FkVGhpcmRQYXJ0eVNjcmlwdHModGVtcGxhdGUpKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlU2NyaXB0cyh0ZW1wbGF0ZSkuZm9yRWFjaCgocHJvbWlzZSkgPT4gcHJvbWlzZS50aGVuKChjb21wb25lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBjdXN0b20gZWxlbWVudCB1c2luZyB0aGUgcmVzb2x2ZWQgc2NyaXB0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGxvYWRMaW5rc1xuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICAgICAqL1xuICAgICAgICBsb2FkTGlua3MoKSB7XG5cbiAgICAgICAgICAgIGxldCBsaW5rRWxlbWVudHMgPSB0aGlzLmZpbmRMaW5rcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gbGlua0VsZW1lbnRzLm1hcCgobGlua0VsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBocmVmID0gbGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB1dGlsaXR5LmV4dHJhY3ROYW1lKGhyZWYpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXRpbGl0eS5leHRyYWN0UGF0aChocmVmKTtcblxuICAgICAgICAgICAgICAgIGxvZygnQ29tcG9uZW50JywgbmFtZSwgJyM4Qjg2NEUnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gbGlua0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kVGVtcGxhdGVzKGxpbmtFbGVtZW50LmltcG9ydCkuZm9yRWFjaCgodGVtcGxhdGVFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIG91ciBjb21wb25lbnQgd2l0aCB0aGUgbmFtZSwgcGF0aCwgYW5kIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoeyBuYW1lOiBuYW1lLCBwYXRoOiBwYXRoLCBlbGVtZW50OiB0ZW1wbGF0ZUVsZW1lbnQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMucHVzaCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgbG9hZFRoaXJkUGFydHlTY3JpcHRzXG4gICAgICAgICAqIEBwYXJhbSB7VGVtcGxhdGV9IHRlbXBsYXRlXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgICAgICovXG4gICAgICAgIGxvYWRUaGlyZFBhcnR5U2NyaXB0cyh0ZW1wbGF0ZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUudGhpcmRQYXJ0eVNjcmlwdHMoKS5tYXAoKHNjcmlwdCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgICAgIHZhciBzY3JpcHRFbGVtZW50ID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCBzY3JpcHQuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG5cbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc2NyaXB0RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcblxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZXNvbHZlU2NyaXB0c1xuICAgICAgICAgKiBAcGFyYW0ge1RlbXBsYXRlfSB0ZW1wbGF0ZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICAgICAqL1xuICAgICAgICByZXNvbHZlU2NyaXB0cyh0ZW1wbGF0ZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUuY29tcG9uZW50U2NyaXB0cygpLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHRQYXRoID0gdGVtcGxhdGUucmVzb2x2ZVNjcmlwdFBhdGgoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcblxuICAgICAgICAgICAgICAgIFN5c3RlbS5pbXBvcnQoc2NyaXB0UGF0aCkudGhlbigobW9kdWxlSW1wb3J0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBlYWNoIHNjcmlwdCBjb250YWluZWQgd2l0aGluIHRoZSB0ZW1wbGF0ZSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBDb21wb25lbnQoeyBzY3JpcHQ6IG1vZHVsZUltcG9ydC5kZWZhdWx0LCB0ZW1wbGF0ZTogdGVtcGxhdGUgfSkpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgY3VzdG9tIGVsZW1lbnQgdXNpbmcgJGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCwgYW5kIHRoZW4gYXBwZW5kaW5nXG4gICAgICAgICAqIHRoZSBhc3NvY2lhdGVkIFJlYWN0LmpzIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZWdpc3RlckVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudCkge1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGNvbXBvbmVudC5lbGVtZW50TmFtZSgpO1xuXG4gICAgICAgICAgICBpZiAobmFtZS5zcGxpdCgnLScpLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgbG9nKCdJbnZhbGlkIFRhZycsIGAke25hbWV9YCwgJyNEQjcwOTMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQobmFtZSwge1xuICAgICAgICAgICAgICAgIHByb3RvdHlwZTogY29tcG9uZW50LmN1c3RvbUVsZW1lbnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRMaW5rc1xuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRMaW5rcygpIHtcbiAgICAgICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoJGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXRpbGl0eS5zZWxlY3Rvci5saW5rcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmluZFRlbXBsYXRlc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxEb2N1bWVudH0gW2RvY3VtZW50Um9vdD0kZG9jdW1lbnRdXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZFRlbXBsYXRlcyhkb2N1bWVudFJvb3QgPSAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoZG9jdW1lbnRSb290LnF1ZXJ5U2VsZWN0b3JBbGwodXRpbGl0eS5zZWxlY3Rvci50ZW1wbGF0ZXMpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gTm8gZG9jdW1lbnRzLCBubyBwZXJzb24uXG4gICAgJGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBuZXcgTWFwbGUoKSk7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8vY29uc29sZS5sb2coJyVjICcsICdsaW5lLWhlaWdodDogMTAwcHg7IHBhZGRpbmc6IDMycHggMTM0cHg7IGJhY2tncm91bmQ6IHVybChodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzL2Jsb2IvbWFzdGVyL21lZGlhL2NvbnNvbGUtbG9nby5wbmc/cmF3PXRydWUpJyk7XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcGFyYW0ge1N0cmluZ30gY29sb3VyXG4gKiBAcmV0dXJuIHtsb2d9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyhsYWJlbCwgbWVzc2FnZSwgY29sb3VyKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGxldCBjb21tb25TdHlsZXMgPSAndGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGluZS1oZWlnaHQ6IDIwcHg7IGZvbnQtc2l6ZTogOXB4Oyc7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjIE1hcGxlICVjICR7bGFiZWx9ICVjICR7bWVzc2FnZX1gLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiB3aGl0ZTsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IHBhZGRpbmc6IDNweCA1cHhgLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiAke2NvbG91cn07IHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2VgLFxuICAgICAgICBgJHtjb21tb25TdHlsZXN9IGNvbG9yOiByZ2JhKDAsIDAsIDAsIC41NSlgXG4gICAgKTtcblxufSIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgc2VsZWN0b3JcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGVjdG9yOiB7XG4gICAgICAgICAgICBsaW5rczogICAgICAnbGlua1tyZWw9XCJpbXBvcnRcIl06bm90KFtkYXRhLWlnbm9yZV0pJyxcbiAgICAgICAgICAgIHN0eWxlczogICAgICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG4gICAgICAgICAgICBzY3JpcHRzOiAgICAnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nLFxuICAgICAgICAgICAgaW5saW5lczogICAgJ3N0eWxlW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG4gICAgICAgICAgICBjb21wb25lbnRzOiAnc2NyaXB0W3R5cGU9XCJ0ZXh0L21hcGxlLWNvbXBvbmVudFwiXScsXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6ICAndGVtcGxhdGUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAgICAgKiBAcGFyYW0geyp9IGFycmF5TGlrZVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRvQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSA/IEFycmF5LmZyb20oYXJyYXlMaWtlKSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcnJheUxpa2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU25ha2VDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYW1lbENhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtqb2luZXI9Jy0nXVxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1NuYWtlQ2FzZShjYW1lbENhc2UsIGpvaW5lciA9ICctJykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbWVsQ2FzZS5zcGxpdCgvKFtBLVpdW2Etel17MCx9KS9nKS5maWx0ZXIocGFydHMgPT4gcGFydHMpLmpvaW4oam9pbmVyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGV4dHJhY3ROYW1lXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3ROYW1lKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLnBvcCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGV4dHJhY3RQYXRoXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGV4dHJhY3RQYXRoKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVFeHRlbnNpb25cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZUV4dGVuc2lvbihmaWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoLnNwbGl0KCcuJykuc2xpY2UoMCwgLTEpLmpvaW4oJy4nKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoKTsiLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5pbXBvcnQgbG9nICAgICBmcm9tICcuLy4uL2hlbHBlcnMvTG9nLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdFxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGV9IHRlbXBsYXRlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeyBzY3JpcHQsIHRlbXBsYXRlIH0pIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgICA9IHNjcmlwdDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZWxlbWVudE5hbWVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZWxlbWVudE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvU25ha2VDYXNlKHRoaXMuc2NyaXB0LnRvU3RyaW5nKCkubWF0Y2goLyg/OmZ1bmN0aW9ufGNsYXNzKVxccyooW2Etel0rKS9pKVsxXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpbXBvcnRMaW5rc1xuICAgICAqIEBwYXJhbSB7U2hhZG93Um9vdH0gc2hhZG93Qm91bmRhcnlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICovXG4gICAgaW1wb3J0TGlua3Moc2hhZG93Qm91bmRhcnkpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBhcHBlbmRTdHlsZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gYXBwZW5kU3R5bGUoYm9keSkge1xuICAgICAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gYm9keTtcbiAgICAgICAgICAgIHNoYWRvd0JvdW5kYXJ5LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29udGVudCAgICAgICA9IHRoaXMudGVtcGxhdGUuZWxlbWVudC5jb250ZW50LFxuICAgICAgICAgICAgbGlua0VsZW1lbnRzICA9IHV0aWxpdHkudG9BcnJheShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXRpbGl0eS5zZWxlY3Rvci5zdHlsZXMpKSxcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudHMgPSB1dGlsaXR5LnRvQXJyYXkoY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKHV0aWxpdHkuc2VsZWN0b3IuaW5saW5lcykpO1xuXG4gICAgICAgIHJldHVybiBbXS5jb25jYXQobGlua0VsZW1lbnRzLCBzdHlsZUVsZW1lbnRzKS5tYXAoKGVsZW1lbnQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICBhcHBlbmRTdHlsZShlbGVtZW50LmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHVybCA9IGAke3RoaXMudGVtcGxhdGUucGF0aH0vJHtlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpfWA7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgYXNzb2NpYXRlZCBzdHlsZSBlbGVtZW50IGFuZCByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggaXQuXG4gICAgICAgICAgICBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpLnRoZW4oKGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBlbmRTdHlsZShib2R5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGN1c3RvbUVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBjdXN0b21FbGVtZW50KCkge1xuXG4gICAgICAgIGxldCBuYW1lICAgICAgICA9IHRoaXMuZWxlbWVudE5hbWUoKSxcbiAgICAgICAgICAgIHNjcmlwdCAgICAgID0gdGhpcy5zY3JpcHQsXG4gICAgICAgICAgICB0ZW1wbGF0ZSAgICA9IHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICBpbXBvcnRMaW5rcyA9IHRoaXMuaW1wb3J0TGlua3MuYmluZCh0aGlzKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUsIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYXR0YWNoZWRDYWxsYmFja1xuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXR0YWNoZWRDYWxsYmFjazoge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxvZygnRWxlbWVudCcsIG5hbWUsICcjMDA5QUNEJyk7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHMgPSB7IHBhdGg6IHRlbXBsYXRlLnBhdGgsIGVsZW1lbnQ6IHRoaXMuY2xvbmVOb2RlKHRydWUpIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MICAgICAgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbXBvcnQgYXR0cmlidXRlcyBmcm9tIHRoZSBlbGVtZW50IGFuZCB0cmFuc2ZlciB0byB0aGUgUmVhY3QuanMgY2xhc3MuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlczsgaW5kZXggPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlcy5pdGVtKGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gYXR0cmlidXRlLm5hbWUucmVwbGFjZSgvXmRhdGEtL2ksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQuZGVmYXVsdFByb3BzW25hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChzY3JpcHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LnJlbmRlcihyZW5kZXJlZEVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbXBvcnQgZXh0ZXJuYWwgQ1NTIGRvY3VtZW50cy5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoaW1wb3J0TGlua3Moc2hhZG93Um9vdCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3VucmVzb2x2ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyZXNvbHZlZCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCB1dGlsaXR5IGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIHBhdGgsIGVsZW1lbnQgfSkge1xuICAgICAgICB0aGlzLm5hbWUgICAgPSBuYW1lO1xuICAgICAgICB0aGlzLnBhdGggICAgPSBwYXRoO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdGhpcmRQYXJ0eVNjcmlwdHNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlyZFBhcnR5U2NyaXB0cygpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheSh0aGlzLmVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKHV0aWxpdHkuc2VsZWN0b3Iuc2NyaXB0cykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29tcG9uZW50U2NyaXB0c1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGNvbXBvbmVudFNjcmlwdHMoKSB7XG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkodGhpcy5lbGVtZW50LmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCh1dGlsaXR5LnNlbGVjdG9yLmNvbXBvbmVudHMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlc29sdmVTY3JpcHRQYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjcmlwdE5hbWVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgcmVzb2x2ZVNjcmlwdFBhdGgoc2NyaXB0TmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wYXRofS8ke3V0aWxpdHkucmVtb3ZlRXh0ZW5zaW9uKHNjcmlwdE5hbWUpfWA7XG4gICAgfVxuXG59Il19
