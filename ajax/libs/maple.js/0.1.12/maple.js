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

(function main($window, $document) {

    'use strict';

    if (typeof System !== 'undefined') {
        System.transpiler = 'babel';
    }

    /**
     * @constant SELECTOR
     * @type {Object}
     */
    var SELECTOR = {
        LINKS: 'link[rel="import"]',
        TEMPLATES: 'template',
        STYLES: 'link[type="text/css"]',
        SCRIPTS: 'script[type="text/javascript"]'
    };

    /**
     * @module Maple
     * @link https://github.com/Wildhoney/Maple.js
     * @author Adam Timberlake
     */

    var Maple = (function () {

        /**
         * @constructor
         * @param {Array} blacklist
         * @return {void}
         */

        function Maple() {
            var _this = this;

            for (var _len = arguments.length, blacklist = Array(_len), _key = 0; _key < _len; _key++) {
                blacklist[_key] = arguments[_key];
            }

            _classCallCheck(this, Maple);

            /**
             * @property components
             * @type {Array}
             */
            this.components = [];

            $document.addEventListener('DOMContentLoaded', function () {
                _this.findComponents.apply(_this, blacklist);
            });
        }

        _createClass(Maple, [{
            key: 'findComponents',

            /**
             * @method findComponents
             * @param {Array} blacklist
             * @return {void}
             */
            value: function findComponents() {
                var _this2 = this;

                for (var _len2 = arguments.length, blacklist = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    blacklist[_key2] = arguments[_key2];
                }

                [].concat(this.loadLinks()).forEach(function (promise) {
                    return promise.then(function (templates) {

                        templates.forEach(function (template) {

                            _this2.resolveScripts(template).forEach(function (promise) {
                                return promise.then(function (component) {

                                    // Register the custom element using the resolved script.
                                    _this2.registerElement(component);
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
                var _this3 = this;

                var linkElements = _utility2['default'].toArray(document.querySelectorAll(SELECTOR.LINKS));

                return linkElements.map(function (linkElement) {

                    var href = linkElement.getAttribute('href'),
                        path = _utility2['default'].modulePath(href),
                        name = _utility2['default'].moduleName(href);

                    return new Promise(function (resolve, reject) {
                        return linkElement.addEventListener('load', function () {

                            var templates = [];

                            _this3.findTemplates(linkElement['import']).forEach(function (templateElement) {

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
            key: 'resolveScripts',

            /**
             * @method resolveScripts
             * @param {Template} template
             * @return {Promise[]}
             */
            value: function resolveScripts(template) {

                return template.scripts().map(function (scriptElement) {
                    return new Promise(function (resolve, reject) {

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
             * Responsible for creating the custom element using document.registerElement, and then appending
             * the associated React.js component.
             *
             * @method registerElement
             * @param {Component} component
             * @return {void}
             */
            value: function registerElement(component) {

                $document.registerElement(component.elementName(), {
                    prototype: component.customElement()
                });
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

                return _utility2['default'].toArray(documentRoot.querySelectorAll(SELECTOR.TEMPLATES));
            }
        }]);

        return Maple;
    })();

    $window.Maple = Maple;
})(window, document);

},{"./helpers/Utility.js":2,"./models/Component.js":3,"./models/Template.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main() {

    'use strict';

    return {

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
         * @method getBase
         * @param {String} name
         * @return {String}
         */
        getBase: function getBase(name) {
            return name.split('.').slice(0, -1).join('/');
        },

        /**
         * @method modulePath
         * @param {String} importPath
         * @return {String}
         */
        modulePath: function modulePath(importPath) {
            return importPath.split('/').slice(0, -1).join('/');
        },

        /**
         * @method moduleName
         * @param {String} importPath
         * @return {String}
         */
        moduleName: function moduleName(importPath) {
            return importPath.split('/').slice(0, -1).pop();
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

},{}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utility = require('./../helpers/Utility.js');

var _utility2 = _interopRequireWildcard(_utility);

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
        key: 'customElement',

        /**
         * @method customElement
         * @return {HTMLElement}
         */
        value: function customElement() {

            var script = this.script,
                template = this.template;

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
                    }

                }

            });
        }
    }]);

    return Component;
})();

exports['default'] = Component;
module.exports = exports['default'];

},{"./../helpers/Utility.js":2}],4:[function(require,module,exports){
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
        key: 'scripts',

        /**
         * @method getScripts
         * @return {Array}
         */
        value: function scripts() {
            return _utility2['default'].toArray(this.element.content.querySelectorAll('script[type="text/maple"]'));
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

//import events     from './../helpers/Events.js';
//import css        from './../helpers/Stylesheets.js';
//import utility    from './../helpers/Utility.js';
//import logger     from './../helpers/Logger.js';
//
///**
// * @constant SELECTOR
// * @type {Object}
// */
//const SELECTOR = {
//    LINKS:     'link[rel="import"]',
//    TEMPLATES: 'template',
//    STYLES:    'link[type="text/css"]',
//    SCRIPTS:   'script[type="text/javascript"]'
//};
//
///**
// * @module Maple
// * @submodule Register
// * @link https://github.com/Wildhoney/Maple.js
// * @author Adam Timberlake
// */
//export default class Register {
//
//    /**
//     * @constructor
//     * @param {Array} modules
//     * @return {Register}
//     */
//    constructor(...modules) {
//        this.register(...modules);
//    }
//
//    /**
//     * @method register
//     * @param {Array} modules
//     * @return {void}
//     */
//    register(...modules) {
//
//        [].concat(this.loadLinks()).forEach((promise) => {
//
//            promise.then((component) => {
//
//                if (modules.length && !~modules.indexOf(component.moduleName)) {
//                    return;
//                }
//
//                component.scripts.forEach((script) => {
//
//                    System.import(script).then((moduleImport) => {
//
//                        let componentName = moduleImport.default.toString().match(/(?:function|class)\s*([a-z]+)/i)[1];
//                        this.registerElement(componentName, moduleImport.default, component.modulePath, component.styles);
//
//                    });
//
//                });
//
//            });
//
//        });
//
//    }
//
//    /**
//     * @method loadLinks
//     * @return {Promise[]}
//     */
//    loadLinks() {
//
//        return utility.toArray(document.querySelectorAll(SELECTOR.LINKS)).map((linkElement) => {
//
//            return new Promise((resolve) => {
//
//                linkElement.addEventListener('load', () => {
//
//                    let hrefAttribute   = linkElement.getAttribute('href'),
//                        modulePath      = utility.getModulePath(hrefAttribute),
//                        moduleName      = utility.getModuleName(hrefAttribute),
//                        templateElement = linkElement.import.querySelector(SELECTOR.TEMPLATES);
//
//                    resolve({
//                        path: modulePath,
//                        name: moduleName,
//                        styles: utility.toArray(templateElement.content.querySelectorAll(SELECTOR.STYLES)).map((linkElement) => {
//                            return `${modulePath}/${linkElement.getAttribute('href')}`;
//                        }),
//                        scripts: utility.toArray(templateElement.content.querySelectorAll(SELECTOR.SCRIPTS)).map((scriptElement) => {
//                            return `${modulePath}/${utility.getBase(scriptElement.getAttribute('src'))}`;
//                        })
//                    });
//
//                });
//
//            });
//
//        });
//
//    }
//
//    /**
//     * Responsible for creating the custom element using document.registerElement, and then appending
//     * the associated React.js component.
//     *
//     * @method registerElement
//     * @param {String} className
//     * @param {Object} component
//     * @param {String} modulePath
//     * @param {Array} styles
//     * @return {void}
//     */
//    registerElement(className, component, modulePath, styles) {
//
//        let elementName = utility.toSnakeCase(className),
//            prototype   = Object.create(HTMLElement.prototype, {
//
//            /**
//             * @property attachedCallback
//             * @type {Object}
//             */
//            attachedCallback: {
//
//                /**
//                 * @method value
//                 * @return {void}
//                 */
//                value: function value() {
//
//                    component.defaultProps = { path: modulePath, element: this.cloneNode(true) };
//                    this.innerHTML         = '';
//
//                    // Import attributes from the element and transfer to the React.js class.
//                    for (let index = 0, attributes = this.attributes; index < attributes.length; index++) {
//
//                        let attribute = attributes.item(index);
//
//                        if (attribute.value) {
//                            let name = attribute.name.replace(/^data-/i, '');
//                            component.defaultProps[name] = attribute.value;
//                        }
//
//                    }
//
//                    let renderedElement = React.createElement(component),
//                        contentElement  = document.createElement('content'),
//                        shadowRoot      = this.createShadowRoot();
//
//                    shadowRoot.appendChild(contentElement);
//                    events.delegate(contentElement, React.render(renderedElement, contentElement));
//
//                    Promise.all(css.associate(styles, shadowRoot)).then(() => {
//                        this.removeAttribute('unresolved');
//                        this.setAttribute('resolved', '');
//                    });
//
//                }
//
//            }
//
//        });
//
//        document.registerElement(elementName, {
//            prototype: prototype
//        });
//
//    }
//
//}

},{"./../helpers/Utility.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7eUJDQXNCLHVCQUF1Qjs7Ozt3QkFDdkIsc0JBQXNCOzs7O3VCQUN0QixzQkFBc0I7Ozs7QUFFNUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFOztBQUUvQixnQkFBWSxDQUFDOztBQUViLFFBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQy9CLGNBQU0sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO0tBQy9COzs7Ozs7QUFNRCxRQUFNLFFBQVEsR0FBRztBQUNiLGFBQUssRUFBTSxvQkFBb0I7QUFDL0IsaUJBQVMsRUFBRSxVQUFVO0FBQ3JCLGNBQU0sRUFBSyx1QkFBdUI7QUFDbEMsZUFBTyxFQUFJLGdDQUFnQztLQUM5QyxDQUFDOzs7Ozs7OztRQU9JLEtBQUs7Ozs7Ozs7O0FBT0ksaUJBUFQsS0FBSyxHQU9tQjs7OzhDQUFYLFNBQVM7QUFBVCx5QkFBUzs7O2tDQVB0QixLQUFLOzs7Ozs7QUFhSCxnQkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHFCQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUNqRCxzQkFBSyxjQUFjLE1BQUEsUUFBSSxTQUFTLENBQUMsQ0FBQzthQUNyQyxD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QUFFLElBQUksUUFBSixJQUFJO1lBQUUsT0FBTyxRQUFQLE9BQU87OzhCQVRoQixRQUFROztBQVVyQixZQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQztBQUNwQixZQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQztBQUNwQixZQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7aUJBYmdCLFFBQVE7Ozs7Ozs7ZUFtQmxCLG1CQUFHO0FBQ04sbUJBQU8scUJBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztTQUM5Rjs7Ozs7Ozs7O2VBT2dCLDJCQUFDLFVBQVUsRUFBRTtBQUMxQix3QkFBVSxJQUFJLENBQUMsSUFBSSxTQUFJLHFCQUFRLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBRztTQUNoRTs7O1dBOUJnQixRQUFROzs7cUJBQVIsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgVGVtcGxhdGUgIGZyb20gJy4vbW9kZWxzL1RlbXBsYXRlLmpzJztcbmltcG9ydCB1dGlsaXR5ICAgZnJvbSAnLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuXG4oZnVuY3Rpb24gbWFpbigkd2luZG93LCAkZG9jdW1lbnQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiBTeXN0ZW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFN5c3RlbS50cmFuc3BpbGVyID0gJ2JhYmVsJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RhbnQgU0VMRUNUT1JcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNvbnN0IFNFTEVDVE9SID0ge1xuICAgICAgICBMSU5LUzogICAgICdsaW5rW3JlbD1cImltcG9ydFwiXScsXG4gICAgICAgIFRFTVBMQVRFUzogJ3RlbXBsYXRlJyxcbiAgICAgICAgU1RZTEVTOiAgICAnbGlua1t0eXBlPVwidGV4dC9jc3NcIl0nLFxuICAgICAgICBTQ1JJUFRTOiAgICdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1vZHVsZSBNYXBsZVxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAgICAgKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICAgICAqL1xuICAgIGNsYXNzIE1hcGxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJsYWNrbGlzdFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoLi4uYmxhY2tsaXN0KSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGNvbXBvbmVudHNcbiAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG5cbiAgICAgICAgICAgICRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZENvbXBvbmVudHMoLi4uYmxhY2tsaXN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBmaW5kQ29tcG9uZW50c1xuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBibGFja2xpc3RcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRDb21wb25lbnRzKC4uLmJsYWNrbGlzdCkge1xuXG4gICAgICAgICAgICBbXS5jb25jYXQodGhpcy5sb2FkTGlua3MoKSkuZm9yRWFjaCgocHJvbWlzZSkgPT4gcHJvbWlzZS50aGVuKCh0ZW1wbGF0ZXMpID0+IHtcblxuICAgICAgICAgICAgICAgIHRlbXBsYXRlcy5mb3JFYWNoKCh0ZW1wbGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZVNjcmlwdHModGVtcGxhdGUpLmZvckVhY2goKHByb21pc2UpID0+IHByb21pc2UudGhlbigoY29tcG9uZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBjdXN0b20gZWxlbWVudCB1c2luZyB0aGUgcmVzb2x2ZWQgc2NyaXB0LlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVsZW1lbnQoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBsb2FkTGlua3NcbiAgICAgICAgICogQHJldHVybiB7UHJvbWlzZVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgbG9hZExpbmtzKCkge1xuXG4gICAgICAgICAgICBsZXQgbGlua0VsZW1lbnRzID0gdXRpbGl0eS50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IuTElOS1MpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpbmtFbGVtZW50cy5tYXAoKGxpbmtFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaHJlZiA9IGxpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXRpbGl0eS5tb2R1bGVQYXRoKGhyZWYpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gdXRpbGl0eS5tb2R1bGVOYW1lKGhyZWYpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBsYXRlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFRlbXBsYXRlcyhsaW5rRWxlbWVudC5pbXBvcnQpLmZvckVhY2goKHRlbXBsYXRlRWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBvdXIgY29tcG9uZW50IHdpdGggdGhlIG5hbWUsIHBhdGgsIGFuZCB0aGUgYXNzb2NpYXRlZCBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKHsgbmFtZTogbmFtZSwgcGF0aDogcGF0aCwgZWxlbWVudDogdGVtcGxhdGVFbGVtZW50IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVzLnB1c2godGVtcGxhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGVzKTtcblxuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlc29sdmVTY3JpcHRzXG4gICAgICAgICAqIEBwYXJhbSB7VGVtcGxhdGV9IHRlbXBsYXRlXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgICAgICovXG4gICAgICAgIHJlc29sdmVTY3JpcHRzKHRlbXBsYXRlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZS5zY3JpcHRzKCkubWFwKChzY3JpcHRFbGVtZW50KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0UGF0aCA9IHRlbXBsYXRlLnJlc29sdmVTY3JpcHRQYXRoKHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG5cbiAgICAgICAgICAgICAgICBTeXN0ZW0uaW1wb3J0KHNjcmlwdFBhdGgpLnRoZW4oKG1vZHVsZUltcG9ydCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgZWFjaCBzY3JpcHQgY29udGFpbmVkIHdpdGhpbiB0aGUgdGVtcGxhdGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgQ29tcG9uZW50KHsgc2NyaXB0OiBtb2R1bGVJbXBvcnQuZGVmYXVsdCwgdGVtcGxhdGU6IHRlbXBsYXRlIH0pKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGN1c3RvbSBlbGVtZW50IHVzaW5nIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCwgYW5kIHRoZW4gYXBwZW5kaW5nXG4gICAgICAgICAqIHRoZSBhc3NvY2lhdGVkIFJlYWN0LmpzIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZWdpc3RlckVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudCkge1xuXG4gICAgICAgICAgICAkZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudC5lbGVtZW50TmFtZSgpLCB7XG4gICAgICAgICAgICAgICAgcHJvdG90eXBlOiBjb21wb25lbnQuY3VzdG9tRWxlbWVudCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmluZFRlbXBsYXRlc1xuICAgICAgICAgKiBAcGFyYW0ge0hUTUxEb2N1bWVudH0gW2RvY3VtZW50Um9vdD0kZG9jdW1lbnRdXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZmluZFRlbXBsYXRlcyhkb2N1bWVudFJvb3QgPSAkZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoZG9jdW1lbnRSb290LnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IuVEVNUExBVEVTKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgICR3aW5kb3cuTWFwbGUgPSBNYXBsZTtcblxufSkod2luZG93LCBkb2N1bWVudCk7IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAgICAgKiBAcGFyYW0geyp9IGFycmF5TGlrZVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRvQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSA/IEFycmF5LmZyb20oYXJyYXlMaWtlKSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcnJheUxpa2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU25ha2VDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYW1lbENhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IFtqb2luZXI9Jy0nXVxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0b1NuYWtlQ2FzZShjYW1lbENhc2UsIGpvaW5lciA9ICctJykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbWVsQ2FzZS5zcGxpdCgvKFtBLVpdW2Etel17MCx9KS9nKS5maWx0ZXIocGFydHMgPT4gcGFydHMpLmpvaW4oam9pbmVyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEJhc2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QmFzZShuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZS5zcGxpdCgnLicpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgbW9kdWxlUGF0aFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBtb2R1bGVQYXRoKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBtb2R1bGVOYW1lXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbXBvcnRQYXRoXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG1vZHVsZU5hbWUoaW1wb3J0UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkucG9wKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlRXh0ZW5zaW9uXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aC5zcGxpdCgnLicpLnNsaWNlKDAsIC0xKS5qb2luKCcuJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gc2NyaXB0XG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZX0gdGVtcGxhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IHNjcmlwdCwgdGVtcGxhdGUgfSkge1xuICAgICAgICB0aGlzLnNjcmlwdCAgID0gc2NyaXB0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBlbGVtZW50TmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBlbGVtZW50TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9TbmFrZUNhc2UodGhpcy5zY3JpcHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16XSspL2kpWzFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGN1c3RvbUVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBjdXN0b21FbGVtZW50KCkge1xuXG4gICAgICAgIGxldCBzY3JpcHQgICA9IHRoaXMuc2NyaXB0LFxuICAgICAgICAgICAgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhdHRhY2hlZENhbGxiYWNrXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBhdHRhY2hlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LmRlZmF1bHRQcm9wcyA9IHsgcGF0aDogdGVtcGxhdGUucGF0aCwgZWxlbWVudDogdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgICAgICA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltcG9ydCBhdHRyaWJ1dGVzIGZyb20gdGhlIGVsZW1lbnQgYW5kIHRyYW5zZmVyIHRvIHRoZSBSZWFjdC5qcyBjbGFzcy5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzOyBpbmRleCA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLml0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBhdHRyaWJ1dGUubmFtZS5yZXBsYWNlKC9eZGF0YS0vaSwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHNbbmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KHNjcmlwdCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QucmVuZGVyKHJlbmRlcmVkRWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgdXRpbGl0eSBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeyBuYW1lLCBwYXRoLCBlbGVtZW50IH0pIHtcbiAgICAgICAgdGhpcy5uYW1lICAgID0gbmFtZTtcbiAgICAgICAgdGhpcy5wYXRoICAgID0gcGF0aDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFNjcmlwdHNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBzY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KHRoaXMuZWxlbWVudC5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9tYXBsZVwiXScpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlc29sdmVTY3JpcHRQYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjcmlwdE5hbWVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgcmVzb2x2ZVNjcmlwdFBhdGgoc2NyaXB0TmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wYXRofS8ke3V0aWxpdHkucmVtb3ZlRXh0ZW5zaW9uKHNjcmlwdE5hbWUpfWA7XG4gICAgfVxuXG59XG5cbi8vaW1wb3J0IGV2ZW50cyAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG4vL2ltcG9ydCBjc3MgICAgICAgIGZyb20gJy4vLi4vaGVscGVycy9TdHlsZXNoZWV0cy5qcyc7XG4vL2ltcG9ydCB1dGlsaXR5ICAgIGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcbi8vaW1wb3J0IGxvZ2dlciAgICAgZnJvbSAnLi8uLi9oZWxwZXJzL0xvZ2dlci5qcyc7XG4vL1xuLy8vKipcbi8vICogQGNvbnN0YW50IFNFTEVDVE9SXG4vLyAqIEB0eXBlIHtPYmplY3R9XG4vLyAqL1xuLy9jb25zdCBTRUxFQ1RPUiA9IHtcbi8vICAgIExJTktTOiAgICAgJ2xpbmtbcmVsPVwiaW1wb3J0XCJdJyxcbi8vICAgIFRFTVBMQVRFUzogJ3RlbXBsYXRlJyxcbi8vICAgIFNUWUxFUzogICAgJ2xpbmtbdHlwZT1cInRleHQvY3NzXCJdJyxcbi8vICAgIFNDUklQVFM6ICAgJ3NjcmlwdFt0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCJdJ1xuLy99O1xuLy9cbi8vLyoqXG4vLyAqIEBtb2R1bGUgTWFwbGVcbi8vICogQHN1Ym1vZHVsZSBSZWdpc3RlclxuLy8gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4vLyAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4vLyAqL1xuLy9leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RlciB7XG4vL1xuLy8gICAgLyoqXG4vLyAgICAgKiBAY29uc3RydWN0b3Jcbi8vICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZHVsZXNcbi8vICAgICAqIEByZXR1cm4ge1JlZ2lzdGVyfVxuLy8gICAgICovXG4vLyAgICBjb25zdHJ1Y3RvciguLi5tb2R1bGVzKSB7XG4vLyAgICAgICAgdGhpcy5yZWdpc3RlciguLi5tb2R1bGVzKTtcbi8vICAgIH1cbi8vXG4vLyAgICAvKipcbi8vICAgICAqIEBtZXRob2QgcmVnaXN0ZXJcbi8vICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZHVsZXNcbi8vICAgICAqIEByZXR1cm4ge3ZvaWR9XG4vLyAgICAgKi9cbi8vICAgIHJlZ2lzdGVyKC4uLm1vZHVsZXMpIHtcbi8vXG4vLyAgICAgICAgW10uY29uY2F0KHRoaXMubG9hZExpbmtzKCkpLmZvckVhY2goKHByb21pc2UpID0+IHtcbi8vXG4vLyAgICAgICAgICAgIHByb21pc2UudGhlbigoY29tcG9uZW50KSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgaWYgKG1vZHVsZXMubGVuZ3RoICYmICF+bW9kdWxlcy5pbmRleE9mKGNvbXBvbmVudC5tb2R1bGVOYW1lKSkge1xuLy8gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICBjb21wb25lbnQuc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgU3lzdGVtLmltcG9ydChzY3JpcHQpLnRoZW4oKG1vZHVsZUltcG9ydCkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSBtb2R1bGVJbXBvcnQuZGVmYXVsdC50b1N0cmluZygpLm1hdGNoKC8oPzpmdW5jdGlvbnxjbGFzcylcXHMqKFthLXpdKykvaSlbMV07XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudE5hbWUsIG1vZHVsZUltcG9ydC5kZWZhdWx0LCBjb21wb25lbnQubW9kdWxlUGF0aCwgY29tcG9uZW50LnN0eWxlcyk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgIH0pO1xuLy9cbi8vICAgIH1cbi8vXG4vLyAgICAvKipcbi8vICAgICAqIEBtZXRob2QgbG9hZExpbmtzXG4vLyAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4vLyAgICAgKi9cbi8vICAgIGxvYWRMaW5rcygpIHtcbi8vXG4vLyAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SLkxJTktTKSkubWFwKChsaW5rRWxlbWVudCkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgbGV0IGhyZWZBdHRyaWJ1dGUgICA9IGxpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoICAgICAgPSB1dGlsaXR5LmdldE1vZHVsZVBhdGgoaHJlZkF0dHJpYnV0ZSksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWUgICAgICA9IHV0aWxpdHkuZ2V0TW9kdWxlTmFtZShocmVmQXR0cmlidXRlKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVFbGVtZW50ID0gbGlua0VsZW1lbnQuaW1wb3J0LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1IuVEVNUExBVEVTKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG1vZHVsZVBhdGgsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1vZHVsZU5hbWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogdXRpbGl0eS50b0FycmF5KHRlbXBsYXRlRWxlbWVudC5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1IuU1RZTEVTKSkubWFwKChsaW5rRWxlbWVudCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke21vZHVsZVBhdGh9LyR7bGlua0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyl9YDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHM6IHV0aWxpdHkudG9BcnJheSh0ZW1wbGF0ZUVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SLlNDUklQVFMpKS5tYXAoKHNjcmlwdEVsZW1lbnQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHttb2R1bGVQYXRofS8ke3V0aWxpdHkuZ2V0QmFzZShzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpfWA7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgfSk7XG4vL1xuLy8gICAgfVxuLy9cbi8vICAgIC8qKlxuLy8gICAgICogUmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBjdXN0b20gZWxlbWVudCB1c2luZyBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQsIGFuZCB0aGVuIGFwcGVuZGluZ1xuLy8gICAgICogdGhlIGFzc29jaWF0ZWQgUmVhY3QuanMgY29tcG9uZW50LlxuLy8gICAgICpcbi8vICAgICAqIEBtZXRob2QgcmVnaXN0ZXJFbGVtZW50XG4vLyAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4vLyAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4vLyAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW9kdWxlUGF0aFxuLy8gICAgICogQHBhcmFtIHtBcnJheX0gc3R5bGVzXG4vLyAgICAgKiBAcmV0dXJuIHt2b2lkfVxuLy8gICAgICovXG4vLyAgICByZWdpc3RlckVsZW1lbnQoY2xhc3NOYW1lLCBjb21wb25lbnQsIG1vZHVsZVBhdGgsIHN0eWxlcykge1xuLy9cbi8vICAgICAgICBsZXQgZWxlbWVudE5hbWUgPSB1dGlsaXR5LnRvU25ha2VDYXNlKGNsYXNzTmFtZSksXG4vLyAgICAgICAgICAgIHByb3RvdHlwZSAgID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUsIHtcbi8vXG4vLyAgICAgICAgICAgIC8qKlxuLy8gICAgICAgICAgICAgKiBAcHJvcGVydHkgYXR0YWNoZWRDYWxsYmFja1xuLy8gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuLy8gICAgICAgICAgICAgKi9cbi8vICAgICAgICAgICAgYXR0YWNoZWRDYWxsYmFjazoge1xuLy9cbi8vICAgICAgICAgICAgICAgIC8qKlxuLy8gICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuLy8gICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbi8vICAgICAgICAgICAgICAgICAqL1xuLy8gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGVmYXVsdFByb3BzID0geyBwYXRoOiBtb2R1bGVQYXRoLCBlbGVtZW50OiB0aGlzLmNsb25lTm9kZSh0cnVlKSB9O1xuLy8gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MICAgICAgICAgPSAnJztcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgLy8gSW1wb3J0IGF0dHJpYnV0ZXMgZnJvbSB0aGUgZWxlbWVudCBhbmQgdHJhbnNmZXIgdG8gdGhlIFJlYWN0LmpzIGNsYXNzLlxuLy8gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlczsgaW5kZXggPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaW5kZXgrKykge1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXMuaXRlbShpbmRleCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnZhbHVlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lLnJlcGxhY2UoL15kYXRhLS9pLCAnJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGVmYXVsdFByb3BzW25hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkRWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50KSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4vLyAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmRlbGVnYXRlKGNvbnRlbnRFbGVtZW50LCBSZWFjdC5yZW5kZXIocmVuZGVyZWRFbGVtZW50LCBjb250ZW50RWxlbWVudCkpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChjc3MuYXNzb2NpYXRlKHN0eWxlcywgc2hhZG93Um9vdCkpLnRoZW4oKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgndW5yZXNvbHZlZCcpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVzb2x2ZWQnLCAnJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7XG4vLyAgICAgICAgICAgIHByb3RvdHlwZTogcHJvdG90eXBlXG4vLyAgICAgICAgfSk7XG4vL1xuLy8gICAgfVxuLy9cbi8vfSJdfQ==
