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
            return _utility2['default'].toArray(this.element.content.querySelectorAll('script'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9VdGlsaXR5LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL21vZGVscy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvbW9kZWxzL1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7eUJDQXNCLHVCQUF1Qjs7Ozt3QkFDdkIsc0JBQXNCOzs7O3VCQUN0QixzQkFBc0I7Ozs7QUFFNUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFOztBQUUvQixnQkFBWSxDQUFDOztBQUViLFFBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQy9CLGNBQU0sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO0tBQy9COzs7Ozs7QUFNRCxRQUFNLFFBQVEsR0FBRztBQUNiLGFBQUssRUFBTSxvQkFBb0I7QUFDL0IsaUJBQVMsRUFBRSxVQUFVO0FBQ3JCLGNBQU0sRUFBSyx1QkFBdUI7QUFDbEMsZUFBTyxFQUFJLGdDQUFnQztLQUM5QyxDQUFDOzs7Ozs7OztRQU9JLEtBQUs7Ozs7Ozs7O0FBT0ksaUJBUFQsS0FBSyxHQU9tQjs7OzhDQUFYLFNBQVM7QUFBVCx5QkFBUzs7O2tDQVB0QixLQUFLOzs7Ozs7QUFhSCxnQkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHFCQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUNqRCxzQkFBSyxjQUFjLE1BQUEsUUFBSSxTQUFTLENBQUMsQ0FBQzthQUNyQyxD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QUFFLElBQUksUUFBSixJQUFJO1lBQUUsT0FBTyxRQUFQLE9BQU87OzhCQVRoQixRQUFROztBQVVyQixZQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQztBQUNwQixZQUFJLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQztBQUNwQixZQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjs7aUJBYmdCLFFBQVE7Ozs7Ozs7ZUFtQmxCLG1CQUFHO0FBQ04sbUJBQU8scUJBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDM0U7Ozs7Ozs7OztlQU9nQiwyQkFBQyxVQUFVLEVBQUU7QUFDMUIsd0JBQVUsSUFBSSxDQUFDLElBQUksU0FBSSxxQkFBUSxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUc7U0FDaEU7OztXQTlCZ0IsUUFBUTs7O3FCQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL21vZGVscy9Db21wb25lbnQuanMnO1xuaW1wb3J0IFRlbXBsYXRlICBmcm9tICcuL21vZGVscy9UZW1wbGF0ZS5qcyc7XG5pbXBvcnQgdXRpbGl0eSAgIGZyb20gJy4vaGVscGVycy9VdGlsaXR5LmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0eXBlb2YgU3lzdGVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTeXN0ZW0udHJhbnNwaWxlciA9ICdiYWJlbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGNvbnN0YW50IFNFTEVDVE9SXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBjb25zdCBTRUxFQ1RPUiA9IHtcbiAgICAgICAgTElOS1M6ICAgICAnbGlua1tyZWw9XCJpbXBvcnRcIl0nLFxuICAgICAgICBURU1QTEFURVM6ICd0ZW1wbGF0ZScsXG4gICAgICAgIFNUWUxFUzogICAgJ2xpbmtbdHlwZT1cInRleHQvY3NzXCJdJyxcbiAgICAgICAgU0NSSVBUUzogICAnc2NyaXB0W3R5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIl0nXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgTWFwbGVcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gICAgICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAgICAgKi9cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBibGFja2xpc3RcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmJsYWNrbGlzdCkge1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjb21wb25lbnRzXG4gICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuXG4gICAgICAgICAgICAkZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRDb21wb25lbnRzKC4uLmJsYWNrbGlzdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZmluZENvbXBvbmVudHNcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYmxhY2tsaXN0XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kQ29tcG9uZW50cyguLi5ibGFja2xpc3QpIHtcblxuICAgICAgICAgICAgW10uY29uY2F0KHRoaXMubG9hZExpbmtzKCkpLmZvckVhY2goKHByb21pc2UpID0+IHByb21pc2UudGhlbigodGVtcGxhdGVzKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZXMuZm9yRWFjaCgodGVtcGxhdGUpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVTY3JpcHRzKHRlbXBsYXRlKS5mb3JFYWNoKChwcm9taXNlKSA9PiBwcm9taXNlLnRoZW4oKGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgY3VzdG9tIGVsZW1lbnQgdXNpbmcgdGhlIHJlc29sdmVkIHNjcmlwdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbGVtZW50KGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgbG9hZExpbmtzXG4gICAgICAgICAqIEByZXR1cm4ge1Byb21pc2VbXX1cbiAgICAgICAgICovXG4gICAgICAgIGxvYWRMaW5rcygpIHtcblxuICAgICAgICAgICAgbGV0IGxpbmtFbGVtZW50cyA9IHV0aWxpdHkudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SLkxJTktTKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBsaW5rRWxlbWVudHMubWFwKChsaW5rRWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgPSBsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHV0aWxpdHkubW9kdWxlUGF0aChocmVmKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHV0aWxpdHkubW9kdWxlTmFtZShocmVmKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBsaW5rRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRUZW1wbGF0ZXMobGlua0VsZW1lbnQuaW1wb3J0KS5mb3JFYWNoKCh0ZW1wbGF0ZUVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgb3VyIGNvbXBvbmVudCB3aXRoIHRoZSBuYW1lLCBwYXRoLCBhbmQgdGhlIGFzc29jaWF0ZWQgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSh7IG5hbWU6IG5hbWUsIHBhdGg6IHBhdGgsIGVsZW1lbnQ6IHRlbXBsYXRlRWxlbWVudCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlcy5wdXNoKHRlbXBsYXRlKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlcyk7XG5cbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZXNvbHZlU2NyaXB0c1xuICAgICAgICAgKiBAcGFyYW0ge1RlbXBsYXRlfSB0ZW1wbGF0ZVxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlW119XG4gICAgICAgICAqL1xuICAgICAgICByZXNvbHZlU2NyaXB0cyh0ZW1wbGF0ZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUuc2NyaXB0cygpLm1hcCgoc2NyaXB0RWxlbWVudCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdFBhdGggPSB0ZW1wbGF0ZS5yZXNvbHZlU2NyaXB0UGF0aChzY3JpcHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuXG4gICAgICAgICAgICAgICAgU3lzdGVtLmltcG9ydChzY3JpcHRQYXRoKS50aGVuKChtb2R1bGVJbXBvcnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIGVhY2ggc2NyaXB0IGNvbnRhaW5lZCB3aXRoaW4gdGhlIHRlbXBsYXRlIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IENvbXBvbmVudCh7IHNjcmlwdDogbW9kdWxlSW1wb3J0LmRlZmF1bHQsIHRlbXBsYXRlOiB0ZW1wbGF0ZSB9KSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBjdXN0b20gZWxlbWVudCB1c2luZyBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQsIGFuZCB0aGVuIGFwcGVuZGluZ1xuICAgICAgICAgKiB0aGUgYXNzb2NpYXRlZCBSZWFjdC5qcyBjb21wb25lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVnaXN0ZXJFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChjb21wb25lbnQpIHtcblxuICAgICAgICAgICAgJGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudChjb21wb25lbnQuZWxlbWVudE5hbWUoKSwge1xuICAgICAgICAgICAgICAgIHByb3RvdHlwZTogY29tcG9uZW50LmN1c3RvbUVsZW1lbnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRUZW1wbGF0ZXNcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRG9jdW1lbnR9IFtkb2N1bWVudFJvb3Q9JGRvY3VtZW50XVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRUZW1wbGF0ZXMoZG9jdW1lbnRSb290ID0gJGRvY3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbGl0eS50b0FycmF5KGRvY3VtZW50Um9vdC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SLlRFTVBMQVRFUykpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAkd2luZG93Lk1hcGxlID0gTWFwbGU7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHsqfSBhcnJheUxpa2VcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0b0FycmF5KGFycmF5TGlrZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20gPyBBcnJheS5mcm9tKGFycmF5TGlrZSkgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJyYXlMaWtlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0b1NuYWtlQ2FzZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FtZWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbam9pbmVyPSctJ11cbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdG9TbmFrZUNhc2UoY2FtZWxDYXNlLCBqb2luZXIgPSAnLScpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW1lbENhc2Uuc3BsaXQoLyhbQS1aXVthLXpdezAsfSkvZykuZmlsdGVyKHBhcnRzID0+IHBhcnRzKS5qb2luKGpvaW5lcikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBnZXRCYXNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdldEJhc2UobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUuc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIG1vZHVsZVBhdGhcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGltcG9ydFBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgbW9kdWxlUGF0aChpbXBvcnRQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgbW9kdWxlTmFtZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW1wb3J0UGF0aFxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBtb2R1bGVOYW1lKGltcG9ydFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLnBvcCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUV4dGVuc2lvblxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGhcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlRXh0ZW5zaW9uKGZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGguc3BsaXQoJy4nKS5zbGljZSgwLCAtMSkuam9pbignLicpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG59KSgpOyIsImltcG9ydCB1dGlsaXR5IGZyb20gJy4vLi4vaGVscGVycy9VdGlsaXR5LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHNjcmlwdFxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGV9IHRlbXBsYXRlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeyBzY3JpcHQsIHRlbXBsYXRlIH0pIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgICA9IHNjcmlwdDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZWxlbWVudE5hbWVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZWxlbWVudE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB1dGlsaXR5LnRvU25ha2VDYXNlKHRoaXMuc2NyaXB0LnRvU3RyaW5nKCkubWF0Y2goLyg/OmZ1bmN0aW9ufGNsYXNzKVxccyooW2Etel0rKS9pKVsxXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjdXN0b21FbGVtZW50XG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgY3VzdG9tRWxlbWVudCgpIHtcblxuICAgICAgICBsZXQgc2NyaXB0ICAgPSB0aGlzLnNjcmlwdCxcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUsIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYXR0YWNoZWRDYWxsYmFja1xuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXR0YWNoZWRDYWxsYmFjazoge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5kZWZhdWx0UHJvcHMgPSB7IHBhdGg6IHRlbXBsYXRlLnBhdGgsIGVsZW1lbnQ6IHRoaXMuY2xvbmVOb2RlKHRydWUpIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MICAgICAgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbXBvcnQgYXR0cmlidXRlcyBmcm9tIHRoZSBlbGVtZW50IGFuZCB0cmFuc2ZlciB0byB0aGUgUmVhY3QuanMgY2xhc3MuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlczsgaW5kZXggPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlcy5pdGVtKGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gYXR0cmlidXRlLm5hbWUucmVwbGFjZSgvXmRhdGEtL2ksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQuZGVmYXVsdFByb3BzW25hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChzY3JpcHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LnJlbmRlcihyZW5kZXJlZEVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi8uLi9oZWxwZXJzL1V0aWxpdHkuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtIVE1MVGVtcGxhdGVFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHsgbmFtZSwgcGF0aCwgZWxlbWVudCB9KSB7XG4gICAgICAgIHRoaXMubmFtZSAgICA9IG5hbWU7XG4gICAgICAgIHRoaXMucGF0aCAgICA9IHBhdGg7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnZXRTY3JpcHRzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgc2NyaXB0cygpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxpdHkudG9BcnJheSh0aGlzLmVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCByZXNvbHZlU2NyaXB0UGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY3JpcHROYW1lXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmVTY3JpcHRQYXRoKHNjcmlwdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucGF0aH0vJHt1dGlsaXR5LnJlbW92ZUV4dGVuc2lvbihzY3JpcHROYW1lKX1gO1xuICAgIH1cblxufVxuXG4vL2ltcG9ydCBldmVudHMgICAgIGZyb20gJy4vLi4vaGVscGVycy9FdmVudHMuanMnO1xuLy9pbXBvcnQgY3NzICAgICAgICBmcm9tICcuLy4uL2hlbHBlcnMvU3R5bGVzaGVldHMuanMnO1xuLy9pbXBvcnQgdXRpbGl0eSAgICBmcm9tICcuLy4uL2hlbHBlcnMvVXRpbGl0eS5qcyc7XG4vL2ltcG9ydCBsb2dnZXIgICAgIGZyb20gJy4vLi4vaGVscGVycy9Mb2dnZXIuanMnO1xuLy9cbi8vLyoqXG4vLyAqIEBjb25zdGFudCBTRUxFQ1RPUlxuLy8gKiBAdHlwZSB7T2JqZWN0fVxuLy8gKi9cbi8vY29uc3QgU0VMRUNUT1IgPSB7XG4vLyAgICBMSU5LUzogICAgICdsaW5rW3JlbD1cImltcG9ydFwiXScsXG4vLyAgICBURU1QTEFURVM6ICd0ZW1wbGF0ZScsXG4vLyAgICBTVFlMRVM6ICAgICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG4vLyAgICBTQ1JJUFRTOiAgICdzY3JpcHRbdHlwZT1cInRleHQvamF2YXNjcmlwdFwiXSdcbi8vfTtcbi8vXG4vLy8qKlxuLy8gKiBAbW9kdWxlIE1hcGxlXG4vLyAqIEBzdWJtb2R1bGUgUmVnaXN0ZXJcbi8vICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuLy8gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuLy8gKi9cbi8vZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0ZXIge1xuLy9cbi8vICAgIC8qKlxuLy8gICAgICogQGNvbnN0cnVjdG9yXG4vLyAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2R1bGVzXG4vLyAgICAgKiBAcmV0dXJuIHtSZWdpc3Rlcn1cbi8vICAgICAqL1xuLy8gICAgY29uc3RydWN0b3IoLi4ubW9kdWxlcykge1xuLy8gICAgICAgIHRoaXMucmVnaXN0ZXIoLi4ubW9kdWxlcyk7XG4vLyAgICB9XG4vL1xuLy8gICAgLyoqXG4vLyAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyXG4vLyAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2R1bGVzXG4vLyAgICAgKiBAcmV0dXJuIHt2b2lkfVxuLy8gICAgICovXG4vLyAgICByZWdpc3RlciguLi5tb2R1bGVzKSB7XG4vL1xuLy8gICAgICAgIFtdLmNvbmNhdCh0aGlzLmxvYWRMaW5rcygpKS5mb3JFYWNoKChwcm9taXNlKSA9PiB7XG4vL1xuLy8gICAgICAgICAgICBwcm9taXNlLnRoZW4oKGNvbXBvbmVudCkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgICAgIGlmIChtb2R1bGVzLmxlbmd0aCAmJiAhfm1vZHVsZXMuaW5kZXhPZihjb21wb25lbnQubW9kdWxlTmFtZSkpIHtcbi8vICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgY29tcG9uZW50LnNjcmlwdHMuZm9yRWFjaCgoc2NyaXB0KSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5pbXBvcnQoc2NyaXB0KS50aGVuKChtb2R1bGVJbXBvcnQpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gbW9kdWxlSW1wb3J0LmRlZmF1bHQudG9TdHJpbmcoKS5tYXRjaCgvKD86ZnVuY3Rpb258Y2xhc3MpXFxzKihbYS16XSspL2kpWzFdO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRWxlbWVudChjb21wb25lbnROYW1lLCBtb2R1bGVJbXBvcnQuZGVmYXVsdCwgY29tcG9uZW50Lm1vZHVsZVBhdGgsIGNvbXBvbmVudC5zdHlsZXMpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICB9KTtcbi8vXG4vLyAgICB9XG4vL1xuLy8gICAgLyoqXG4vLyAgICAgKiBAbWV0aG9kIGxvYWRMaW5rc1xuLy8gICAgICogQHJldHVybiB7UHJvbWlzZVtdfVxuLy8gICAgICovXG4vLyAgICBsb2FkTGlua3MoKSB7XG4vL1xuLy8gICAgICAgIHJldHVybiB1dGlsaXR5LnRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUi5MSU5LUykpLm1hcCgobGlua0VsZW1lbnQpID0+IHtcbi8vXG4vLyAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIGxldCBocmVmQXR0cmlidXRlICAgPSBsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCAgICAgID0gdXRpbGl0eS5nZXRNb2R1bGVQYXRoKGhyZWZBdHRyaWJ1dGUpLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lICAgICAgPSB1dGlsaXR5LmdldE1vZHVsZU5hbWUoaHJlZkF0dHJpYnV0ZSksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRWxlbWVudCA9IGxpbmtFbGVtZW50LmltcG9ydC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SLlRFTVBMQVRFUyk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBtb2R1bGVQYXRoLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtb2R1bGVOYW1lLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IHV0aWxpdHkudG9BcnJheSh0ZW1wbGF0ZUVsZW1lbnQuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SLlNUWUxFUykpLm1hcCgobGlua0VsZW1lbnQpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHttb2R1bGVQYXRofS8ke2xpbmtFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpfWA7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRzOiB1dGlsaXR5LnRvQXJyYXkodGVtcGxhdGVFbGVtZW50LmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUi5TQ1JJUFRTKSkubWFwKChzY3JpcHRFbGVtZW50KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7bW9kdWxlUGF0aH0vJHt1dGlsaXR5LmdldEJhc2Uoc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKX1gO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgIH0pO1xuLy9cbi8vICAgIH1cbi8vXG4vLyAgICAvKipcbi8vICAgICAqIFJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgY3VzdG9tIGVsZW1lbnQgdXNpbmcgZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50LCBhbmQgdGhlbiBhcHBlbmRpbmdcbi8vICAgICAqIHRoZSBhc3NvY2lhdGVkIFJlYWN0LmpzIGNvbXBvbmVudC5cbi8vICAgICAqXG4vLyAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyRWxlbWVudFxuLy8gICAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuLy8gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudFxuLy8gICAgICogQHBhcmFtIHtTdHJpbmd9IG1vZHVsZVBhdGhcbi8vICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlc1xuLy8gICAgICogQHJldHVybiB7dm9pZH1cbi8vICAgICAqL1xuLy8gICAgcmVnaXN0ZXJFbGVtZW50KGNsYXNzTmFtZSwgY29tcG9uZW50LCBtb2R1bGVQYXRoLCBzdHlsZXMpIHtcbi8vXG4vLyAgICAgICAgbGV0IGVsZW1lbnROYW1lID0gdXRpbGl0eS50b1NuYWtlQ2FzZShjbGFzc05hbWUpLFxuLy8gICAgICAgICAgICBwcm90b3R5cGUgICA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlLCB7XG4vL1xuLy8gICAgICAgICAgICAvKipcbi8vICAgICAgICAgICAgICogQHByb3BlcnR5IGF0dGFjaGVkQ2FsbGJhY2tcbi8vICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbi8vICAgICAgICAgICAgICovXG4vLyAgICAgICAgICAgIGF0dGFjaGVkQ2FsbGJhY2s6IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAvKipcbi8vICAgICAgICAgICAgICAgICAqIEBtZXRob2QgdmFsdWVcbi8vICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4vLyAgICAgICAgICAgICAgICAgKi9cbi8vICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRlZmF1bHRQcm9wcyA9IHsgcGF0aDogbW9kdWxlUGF0aCwgZWxlbWVudDogdGhpcy5jbG9uZU5vZGUodHJ1ZSkgfTtcbi8vICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCAgICAgICAgID0gJyc7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIC8vIEltcG9ydCBhdHRyaWJ1dGVzIGZyb20gdGhlIGVsZW1lbnQgYW5kIHRyYW5zZmVyIHRvIHRoZSBSZWFjdC5qcyBjbGFzcy5cbi8vICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDAsIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7IGluZGV4IDwgYXR0cmlidXRlcy5sZW5ndGg7IGluZGV4KyspIHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzLml0ZW0oaW5kZXgpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBhdHRyaWJ1dGUubmFtZS5yZXBsYWNlKC9eZGF0YS0vaSwgJycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRlZmF1bHRQcm9wc1tuYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZEVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvbnRlbnQnKSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuLy8gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5kZWxlZ2F0ZShjb250ZW50RWxlbWVudCwgUmVhY3QucmVuZGVyKHJlbmRlcmVkRWxlbWVudCwgY29udGVudEVsZW1lbnQpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoY3NzLmFzc29jaWF0ZShzdHlsZXMsIHNoYWRvd1Jvb3QpKS50aGVuKCgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3VucmVzb2x2ZWQnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Jlc29sdmVkJywgJycpO1xuLy8gICAgICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge1xuLy8gICAgICAgICAgICBwcm90b3R5cGU6IHByb3RvdHlwZVxuLy8gICAgICAgIH0pO1xuLy9cbi8vICAgIH1cbi8vXG4vL30iXX0=
