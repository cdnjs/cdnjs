(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _Component = require('./components/Component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _modular = require('./helpers/Modular.js');

var _modular2 = _interopRequireWildcard(_modular);

(function main($window) {

    'use strict';

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

        _modular2['default'].register.apply(_modular2['default'], _toConsumableArray(modules));
    };

    $window.Maple = Maple;
    $window.Maple.Component = _Component2['default'];
})(window);

},{"./components/Component.js":2,"./helpers/Modular.js":4}],2:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module Maple
 * @submodule Component
 * @link https://github.com/Wildhoney/Maple.js
 * @author Adam Timberlake
 */

var Component = function Component() {
  _classCallCheck(this, Component);
};

exports["default"] = Component;
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

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _events = require('./../helpers/Events.js');

var _events2 = _interopRequireWildcard(_events);

var _css = require('./../helpers/Stylesheets.js');

var _css2 = _interopRequireWildcard(_css);

exports['default'] = (function main($document) {

    'use strict';

    return {

        /**
         * @method delegate
         * @param {Array} modules
         * @return {void}
         */
        register: function register() {
            for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
                modules[_key] = arguments[_key];
            }

            modules.forEach(function (name) {

                var elementName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                    prototype = Object.create(HTMLElement.prototype, {

                    /**
                     * @property createdCallback
                     * @type {Object}
                     */
                    createdCallback: {

                        /**
                         * @method value
                         * @return {void}
                         */
                        value: function value() {
                            var _this = this;

                            this.innerHTML = '';

                            // Todo: Make all of this dynamic!
                            var path = 'app/components/user-calendar';

                            System['import']('' + path + '/calendar').then(function (Component) {

                                var element = React.createElement(Component['default']),
                                    contentElement = $document.createElement('content'),
                                    shadowRoot = _this.createShadowRoot();

                                _css2['default'].associate(path, shadowRoot);
                                shadowRoot.appendChild(contentElement);

                                var component = React.render(element, contentElement);
                                _events2['default'].delegate(contentElement, component);
                            });
                        }

                    }

                });

                $document.registerElement(elementName, {
                    prototype: prototype
                });
            });
        }

    };
})(document);

module.exports = exports['default'];

},{"./../helpers/Events.js":3,"./../helpers/Stylesheets.js":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = (function main($document) {

    'use strict';

    return {

        /**
         * @property linkSelector
         * @type {String}
         */
        linkSelector: 'link[type="text/css"]',

        /**
         * @method toArray
         * @param {*} arrayLike
         * @return {Array}
         */
        toArray: function toArray(arrayLike) {
            return Array.prototype.slice.apply(arrayLike);
        },

        /**
         * @method associate
         * @param {String} componentPath
         * @param {ShadowRoot} shadowRoot
         * @return {void}
         */
        associate: function associate(componentPath, shadowRoot) {
            var _this = this;

            this.toArray(document.querySelectorAll('link')).forEach(function (link) {

                var href = link.getAttribute('href');

                if (href.match(componentPath)) {

                    var templateElement = link['import'].querySelector('template'),
                        templateContent = templateElement.content,
                        cssDocuments = _this.toArray(templateContent.querySelectorAll('link')).map(function (linkElement) {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvY29tcG9uZW50cy9Db21wb25lbnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9FdmVudHMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvaGVscGVycy9Nb2R1bGFyLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvTWFwbGUuanMvc3JjL2hlbHBlcnMvU3R5bGVzaGVldHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozt5QkNBc0IsMkJBQTJCOzs7O3VCQUMzQixzQkFBc0I7Ozs7QUFFNUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUU7O0FBRXBCLGdCQUFZLENBQUM7O1FBRVAsS0FBSzs7Ozs7OztBQU9JLGFBUFQsS0FBSyxHQU9pQjswQ0FBVCxPQUFPO0FBQVAsbUJBQU87Ozs4QkFQcEIsS0FBSzs7QUFTSCw2QkFBUSxRQUFRLE1BQUEsMENBQUksT0FBTyxFQUFDLENBQUM7S0FFaEM7O0FBSUwsV0FBTyxDQUFDLEtBQUssR0FBYSxLQUFLLENBQUM7QUFDaEMsV0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLHlCQUFZLENBQUM7Q0FFdkMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ25CVSxTQUFTLFlBQVQsU0FBUzt3QkFBVCxTQUFTOzs7cUJBQVQsU0FBUzs7Ozs7Ozs7OztxQkNOZixDQUFDLFNBQVMsSUFBSSxHQUFHOztBQUU1QixnQkFBWSxDQUFDOztBQUViLFdBQU87Ozs7Ozs7O0FBUUgsZ0JBQVEsRUFBQSxrQkFB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QUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSzs7QUFFOUQsb0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXJDLG9CQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7O0FBRTNCLHdCQUFJLGVBQWUsR0FBRyxJQUFJLFVBQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO3dCQUN2RCxlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU87d0JBQ3pDLFlBQVksR0FBTSxNQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFXLEVBQUs7QUFDMUYsb0NBQVUsYUFBYSxTQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUc7cUJBQ2pFLENBQUMsQ0FBQzs7QUFFUCxnQ0FBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVcsRUFBSzs7QUFFbEMsNEJBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEQsb0NBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLG9DQUFZLENBQUMsU0FBUyxvQkFBa0IsV0FBVyxNQUFHLENBQUM7QUFDdkQsa0NBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBRXhDLENBQUMsQ0FBQztpQkFFTjthQUVKLENBQUMsQ0FBQztTQUVOOztLQUVKLENBQUM7Q0FFTCxDQUFBLENBQUUsUUFBUSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgbW9kdWxhciAgIGZyb20gJy4vaGVscGVycy9Nb2R1bGFyLmpzJztcblxuKGZ1bmN0aW9uIG1haW4oJHdpbmRvdykge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2R1bGVzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciguLi5tb2R1bGVzKSB7XG5cbiAgICAgICAgICAgIG1vZHVsYXIucmVnaXN0ZXIoLi4ubW9kdWxlcyk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgJHdpbmRvdy5NYXBsZSAgICAgICAgICAgPSBNYXBsZTtcbiAgICAkd2luZG93Lk1hcGxlLkNvbXBvbmVudCA9IENvbXBvbmVudDtcblxufSkod2luZG93KTsiLCIvKipcbiAqIEBtb2R1bGUgTWFwbGVcbiAqIEBzdWJtb2R1bGUgQ29tcG9uZW50XG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuXG59IiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgZGVsZWdhdGVcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudEVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLkNvbnN0cnVjdG9yfSBjb21wb25lbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGRlbGVnYXRlKGNvbnRlbnRFbGVtZW50LCBjb21wb25lbnQpIHtcblxuICAgICAgICAgICAgbGV0IGFFbGVtZW50ICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICAgICAgICAgICAgZXZlbnRzICAgICA9IFtdLFxuICAgICAgICAgICAgICAgIGV2ZW50RXNxdWUgPSAvb25bYS16XSsvaTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYUVsZW1lbnQpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleS5tYXRjaChldmVudEVzcXVlKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChrZXkucmVwbGFjZSgvXm9uLywgJycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgZ2V0RXZlbnRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRFdmVudChldmVudE5hbWUsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBtYXRjaE5hbWUgPSBuZXcgUmVnRXhwKGV2ZW50TmFtZSwgJ2knKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRGbiAgID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5Lm1hdGNoKG1hdGNoTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRGbiA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRGbjtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgZmluZEV2ZW50c1xuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWFjdElkXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmluZEV2ZW50cyhub2RlLCByZWFjdElkLCBldmVudE5hbWUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBldmVudHMgICAgICA9IFtdLFxuICAgICAgICAgICAgICAgICAgICByb290RXZlbnRGbiA9IGdldEV2ZW50KGV2ZW50TmFtZSwgbm9kZS5fY3VycmVudEVsZW1lbnQuX3N0b3JlLnByb3BzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyb290RXZlbnRGbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvdW5kIGV2ZW50IGluIHJvb3QhXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHJvb3RFdmVudEZuKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChub2RlLl9yb290Tm9kZUlEID09PSByZWFjdElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gbm9kZS5fcmVuZGVyZWRDaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNoaWxkcmVuW2lkXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uX3Jvb3ROb2RlSUQgPT09IHJlYWN0SWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZEV2ZW50Rm4gPSBnZXRFdmVudChldmVudE5hbWUsIGl0ZW0uX2luc3RhbmNlLnByb3BzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZEV2ZW50Rm4pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3VuZCBldmVudCBpbiBjaGlsZHJlbiFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goY2hpbGRFdmVudEZuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uX3JlbmRlcmVkQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluZEV2ZW50cyhpdGVtLCByZWFjdElkLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgY3JlYXRlRXZlbnRcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGV2ZW50TmFtZSkge1xuXG4gICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRzID0gY29tcG9uZW50Ll9yZWFjdEludGVybmFsSW5zdGFuY2UuX3JlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Rm4gICAgPSBgb24ke2V2ZW50LnR5cGV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cyAgICAgPSBmaW5kRXZlbnRzKGNvbXBvbmVudHMsIGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVhY3RpZCcpLCBldmVudEZuKTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnRGbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRGbi5hcHBseShjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50TmFtZSBvZiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFdmVudChldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IGV2ZW50cyAgZnJvbSAnLi8uLi9oZWxwZXJzL0V2ZW50cy5qcyc7XG5pbXBvcnQgY3NzICAgICBmcm9tICcuLy4uL2hlbHBlcnMvU3R5bGVzaGVldHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gbWFpbigkZG9jdW1lbnQpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBkZWxlZ2F0ZVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2R1bGVzXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlciguLi5tb2R1bGVzKSB7XG5cbiAgICAgICAgICAgIG1vZHVsZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnROYW1lICAgPSBuYW1lLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgIHByb3RvdHlwZSAgICAgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkgY3JlYXRlZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQ2FsbGJhY2s6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAbWV0aG9kIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9kbzogTWFrZSBhbGwgb2YgdGhpcyBkeW5hbWljIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gJ2FwcC9jb21wb25lbnRzL3VzZXItY2FsZW5kYXInO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3lzdGVtLmltcG9ydChgJHtwYXRofS9jYWxlbmRhcmApLnRoZW4oKENvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ICAgICAgICA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LmRlZmF1bHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuYXNzb2NpYXRlKHBhdGgsIHNoYWRvd1Jvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gUmVhY3QucmVuZGVyKGVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmRlbGVnYXRlKGNvbnRlbnRFbGVtZW50LCBjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdG90eXBlOiBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoZG9jdW1lbnQpOyIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBtYWluKCRkb2N1bWVudCkge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkgbGlua1NlbGVjdG9yXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBsaW5rU2VsZWN0b3I6ICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAgICAgKiBAcGFyYW0geyp9IGFycmF5TGlrZVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRvQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFycmF5TGlrZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgYXNzb2NpYXRlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRQYXRoXG4gICAgICAgICAqIEBwYXJhbSB7U2hhZG93Um9vdH0gc2hhZG93Um9vdFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgYXNzb2NpYXRlKGNvbXBvbmVudFBhdGgsIHNoYWRvd1Jvb3QpIHtcblxuICAgICAgICAgICAgdGhpcy50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmsnKSkuZm9yRWFjaCgobGluaykgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhyZWYubWF0Y2goY29tcG9uZW50UGF0aCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVFbGVtZW50ID0gbGluay5pbXBvcnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzICAgID0gdGhpcy50b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJykpLm1hcCgobGlua0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29tcG9uZW50UGF0aH0vJHtsaW5rRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzLmZvckVhY2goKGNzc0RvY3VtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBgQGltcG9ydCB1cmwoJHtjc3NEb2N1bWVudH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoZG9jdW1lbnQpOyJdfQ==
