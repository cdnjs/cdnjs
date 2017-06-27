(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

(function main($window, $document) {

    'use strict';

    /**
     * @constant options
     * @type {Object}
     */
    var options = {
        linkSelector: 'link[type="text/css"]',
        importSelector: 'link[rel="import"]',
        dataAttribute: 'data-component',
        dataElement: 'html'
    };

    /**
     * @module Maple
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Maple.js
     */

    var Maple = (function () {

        /**
         * @constructor
         * @return {Maple}
         */

        function Maple() {
            _classCallCheck(this, Maple);

            this.elements = [];
        }

        _createClass(Maple, [{
            key: 'throwException',

            /**
             * @method throwException
             * @throws Error
             * @param {String} message
             * @return {void}
             */
            value: function throwException(message) {
                throw new Error('Maple.js: ' + message + '.');
            }
        }, {
            key: 'toArray',

            /**
             * @method toArray
             * @param {*} arrayLike
             * @return {Array}
             */
            value: function toArray(arrayLike) {
                return Array.prototype.slice.apply(arrayLike);
            }
        }, {
            key: 'component',

            /**
             * @method component
             * @param {String} name
             * @param {Object} blueprint
             * @return {void}
             */
            value: function component(name, blueprint) {

                var element = React.createClass(blueprint);
                this.elements[name] = this.createElement(name, React.createElement(element));
            }
        }, {
            key: 'associateCSS',

            /**
             * @method associateCSS
             * @param {Document} ownerDocument
             * @param {ShadowRoot} shadowRoot
             * @return {void}
             */
            value: function associateCSS(ownerDocument, shadowRoot) {
                var _this2 = this;

                this.toArray($document.querySelectorAll('link')).forEach(function (link) {

                    if (link['import'] === ownerDocument) {
                        (function () {

                            var path = link.getAttribute('href').split('/').slice(0, -1).join('/'),
                                templateElement = ownerDocument.querySelector('template').content,
                                cssDocuments = _this2.toArray(templateElement.querySelectorAll(options.linkSelector)).map(function (model) {
                                return '' + path + '/' + model.getAttribute('href');
                            });

                            cssDocuments.forEach(function (cssDocument) {

                                var styleElement = $document.createElement('style');
                                styleElement.setAttribute('type', 'text/css');
                                styleElement.innerHTML = '@import url(' + cssDocument + ')';
                                shadowRoot.appendChild(styleElement);
                            });
                        })();
                    }
                });
            }
        }, {
            key: 'delegateEvents',

            /**
             * @method delegateEvents
             * @param {HTMLElement} contentElement
             * @param {ReactClass.createClass.Constructor} component
             * @return {void}
             */
            value: function delegateEvents(contentElement, component) {

                var aElement = document.createElement('a'),
                    events = [],
                    eventEsque = /on[a-z]+/i;

                Object.keys(aElement).forEach(function (key) {

                    if (key.match(eventEsque)) {
                        events.push(key.replace(/^on/, ''));
                    }
                });

                /**
                 * @method findEvents
                 * @param {Object} node
                 * @param {String} reactId
                 * @param {String} eventName
                 * @return {Object|undefined}
                 */
                function findEvents(_x, _x2, _x3) {
                    var _again = true;

                    _function: while (_again) {
                        events = children = id = item = undefined;
                        _again = false;
                        var node = _x,
                            reactId = _x2,
                            eventName = _x3;

                        var events = [];

                        if (node._currentElement._store.props.hasOwnProperty(eventName)) {
                            events.push(node._currentElement._store.props[eventName]);
                        }

                        if (node._rootNodeID === reactId) {
                            return events;
                        }

                        var children = node._renderedChildren;

                        for (var id in children) {

                            if (children.hasOwnProperty(id)) {

                                var item = children[id];

                                if (item._rootNodeID === reactId) {

                                    if (item._instance.props.hasOwnProperty(eventName)) {
                                        events.push(item._instance.props[eventName]);
                                    }

                                    return events;
                                }

                                if (item._renderedChildren) {
                                    _x = item;
                                    _x2 = reactId;
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
                            eventFn = 'on' + (event.type.charAt(0).toUpperCase() + event.type.slice(1));
                        events = findEvents(components, event.target.getAttribute('data-reactid'), eventFn);

                        events.forEach(function (eventFn) {
                            eventFn();
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
        }, {
            key: 'createElement',

            /**
             * @method createElement
             * @param {String} name
             * @param {Object} element
             * @return {void}
             */
            value: function createElement(name, element) {

                var ownerDocument = $document.currentScript.ownerDocument,
                    delegateEvents = this.delegateEvents.bind(this),
                    associateCSS = this.associateCSS.bind(this, ownerDocument),
                    elementPrototype = Object.create(HTMLElement.prototype, {

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

                            this.innerHTML = '';

                            var contentElement = ownerDocument.createElement('content'),
                                shadowRoot = this.createShadowRoot();

                            associateCSS(shadowRoot);
                            shadowRoot.appendChild(contentElement);

                            var component = React.render(element, contentElement);

                            delegateEvents(contentElement, component);
                        }

                    }

                });

                /**
                 * @property MegaButton
                 * @type {Object}
                 */
                $document.registerElement(name, {
                    prototype: elementPrototype
                });
            }
        }]);

        return Maple;
    })();

    $window.maple = new Maple();
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7O0FBRS9CLGdCQUFZLENBQUM7Ozs7OztBQU1iLFFBQU0sT0FBTyxHQUFHO0FBQ1osb0JBQVksRUFBRSx1QkFBdUI7QUFDckMsc0JBQWMsRUFBRSxvQkFBb0I7QUFDcEMscUJBQWEsRUFBRSxnQkFBZ0I7QUFDL0IsbUJBQVcsRUFBRSxNQUFNO0tBQ3RCLENBQUM7Ozs7Ozs7O1FBT0ksS0FBSzs7Ozs7OztBQU1JLGlCQU5ULEtBQUssR0FNTztrQ0FOWixLQUFLOztBQU9ILGdCQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUN0Qjs7cUJBUkMsS0FBSzs7Ozs7Ozs7O21CQWdCTyx3QkFBQyxPQUFPLEVBQUU7QUFDcEIsc0JBQU0sSUFBSSxLQUFLLGdCQUFjLE9BQU8sT0FBSSxDQUFDO2FBQzVDOzs7Ozs7Ozs7bUJBT00saUJBQUMsU0FBUyxFQUFFO0FBQ2YsdUJBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pEOzs7Ozs7Ozs7O21CQVFRLG1CQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7O0FBRXZCLG9CQUFJLE9BQU8sR0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELG9CQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUVoRjs7Ozs7Ozs7OzttQkFRVyxzQkFBQyxhQUFh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ZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIG1haW4oJHdpbmRvdywgJGRvY3VtZW50KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdGFudCBvcHRpb25zXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBsaW5rU2VsZWN0b3I6ICdsaW5rW3R5cGU9XCJ0ZXh0L2Nzc1wiXScsXG4gICAgICAgIGltcG9ydFNlbGVjdG9yOiAnbGlua1tyZWw9XCJpbXBvcnRcIl0nLFxuICAgICAgICBkYXRhQXR0cmlidXRlOiAnZGF0YS1jb21wb25lbnQnLFxuICAgICAgICBkYXRhRWxlbWVudDogJ2h0bWwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgTWFwbGVcbiAgICAgKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvTWFwbGUuanNcbiAgICAgKi9cbiAgICBjbGFzcyBNYXBsZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKiBAcmV0dXJuIHtNYXBsZX1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdGhyb3dFeGNlcHRpb25cbiAgICAgICAgICogQHRocm93cyBFcnJvclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhyb3dFeGNlcHRpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYXBsZS5qczogJHttZXNzYWdlfS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgICAgICogQHBhcmFtIHsqfSBhcnJheUxpa2VcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0b0FycmF5KGFycmF5TGlrZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcnJheUxpa2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgY29tcG9uZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBibHVlcHJpbnRcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudChuYW1lLCBibHVlcHJpbnQpIHtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgICAgICAgICA9IFJlYWN0LmNyZWF0ZUNsYXNzKGJsdWVwcmludCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzW25hbWVdID0gdGhpcy5jcmVhdGVFbGVtZW50KG5hbWUsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBhc3NvY2lhdGVDU1NcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudFxuICAgICAgICAgKiBAcGFyYW0ge1NoYWRvd1Jvb3R9IHNoYWRvd1Jvb3RcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGFzc29jaWF0ZUNTUyhvd25lckRvY3VtZW50LCBzaGFkb3dSb290KSB7XG5cbiAgICAgICAgICAgIHRoaXMudG9BcnJheSgkZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGluaycpKS5mb3JFYWNoKChsaW5rKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAobGluay5pbXBvcnQgPT09IG93bmVyRG9jdW1lbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCAgICAgICAgICAgID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RlbXBsYXRlJykuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzc0RvY3VtZW50cyAgICA9IHRoaXMudG9BcnJheSh0ZW1wbGF0ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChvcHRpb25zLmxpbmtTZWxlY3RvcikpLm1hcCgobW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7cGF0aH0vJHttb2RlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzLmZvckVhY2goKGNzc0RvY3VtZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBgQGltcG9ydCB1cmwoJHtjc3NEb2N1bWVudH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGRlbGVnYXRlRXZlbnRzXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7UmVhY3RDbGFzcy5jcmVhdGVDbGFzcy5Db25zdHJ1Y3Rvcn0gY29tcG9uZW50XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBkZWxlZ2F0ZUV2ZW50cyhjb250ZW50RWxlbWVudCwgY29tcG9uZW50KSB7XG5cbiAgICAgICAgICAgIGxldCBhRWxlbWVudCAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxuICAgICAgICAgICAgICAgIGV2ZW50cyAgICAgPSBbXSxcbiAgICAgICAgICAgICAgICBldmVudEVzcXVlID0gL29uW2Etel0rL2k7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGFFbGVtZW50KS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChrZXkubWF0Y2goZXZlbnRFc3F1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goa2V5LnJlcGxhY2UoL15vbi8sICcnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWV0aG9kIGZpbmRFdmVudHNcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhY3RJZFxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gZmluZEV2ZW50cyhub2RlLCByZWFjdElkLCBldmVudE5hbWUpIHtcblxuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLl9jdXJyZW50RWxlbWVudC5fc3RvcmUucHJvcHMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChub2RlLl9jdXJyZW50RWxlbWVudC5fc3RvcmUucHJvcHNbZXZlbnROYW1lXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX3Jvb3ROb2RlSUQgPT09IHJlYWN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBub2RlLl9yZW5kZXJlZENoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2hpbGRyZW5baWRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcm9vdE5vZGVJRCA9PT0gcmVhY3RJZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uX2luc3RhbmNlLnByb3BzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goaXRlbS5faW5zdGFuY2UucHJvcHNbZXZlbnROYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fcmVuZGVyZWRDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kRXZlbnRzKGl0ZW0sIHJlYWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgY3JlYXRlRXZlbnRcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGV2ZW50TmFtZSkge1xuXG4gICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRzID0gY29tcG9uZW50Ll9yZWFjdEludGVybmFsSW5zdGFuY2UuX3JlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Rm4gICAgPSBgb24ke2V2ZW50LnR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBldmVudC50eXBlLnNsaWNlKDEpfWA7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cyAgICAgPSBmaW5kRXZlbnRzKGNvbXBvbmVudHMsIGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVhY3RpZCcpLCBldmVudEZuKTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnRGbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRGbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGV2ZW50TmFtZSBvZiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFdmVudChldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVFbGVtZW50KG5hbWUsIGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgbGV0IG93bmVyRG9jdW1lbnQgICAgPSAkZG9jdW1lbnQuY3VycmVudFNjcmlwdC5vd25lckRvY3VtZW50LFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlRXZlbnRzICAgPSB0aGlzLmRlbGVnYXRlRXZlbnRzLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgYXNzb2NpYXRlQ1NTICAgICA9IHRoaXMuYXNzb2NpYXRlQ1NTLmJpbmQodGhpcywgb3duZXJEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlLCB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkgY3JlYXRlZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjcmVhdGVkQ2FsbGJhY2s6IHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudEVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvbnRlbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290ICAgICA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NvY2lhdGVDU1Moc2hhZG93Um9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IFJlYWN0LnJlbmRlcihlbGVtZW50LCBjb250ZW50RWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlRXZlbnRzKGNvbnRlbnRFbGVtZW50LCBjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IE1lZ2FCdXR0b25cbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICRkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQobmFtZSwge1xuICAgICAgICAgICAgICAgIHByb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgJHdpbmRvdy5tYXBsZSA9IG5ldyBNYXBsZSgpO1xuXG59KSh3aW5kb3csIGRvY3VtZW50KTsiXX0=
