(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

(function main($window) {

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
            key: 'register',

            /**
             * @method register
             * @param {String} name
             * @param {Object} blueprint
             * @return {void}
             */
            value: function register(name, blueprint) {

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
                var _this = this;

                this.toArray(document.querySelectorAll('link')).forEach(function (link) {

                    if (link['import'] === ownerDocument) {
                        (function () {

                            var path = link.getAttribute('href').split('/').slice(0, -1).join('/'),
                                templateElement = ownerDocument.querySelector('template').content,
                                cssDocuments = _this.toArray(templateElement.querySelectorAll(options.linkSelector)).map(function (model) {
                                return '' + path + '/' + model.getAttribute('href');
                            });

                            cssDocuments.forEach(function (cssDocument) {

                                var styleElement = document.createElement('style');
                                styleElement.setAttribute('type', 'text/css');
                                styleElement.innerHTML = '@import url(' + cssDocument + ')';
                                shadowRoot.appendChild(styleElement);
                            });
                        })();
                    }
                });
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

                var ownerDocument = document.currentScript.ownerDocument,
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

                            var contentElement = document.createElement('content'),
                                shadowRoot = this.createShadowRoot();

                            associateCSS(shadowRoot);
                            shadowRoot.appendChild(contentElement);
                            React.render(element, contentElement);
                        }

                    }

                });

                /**
                 * @property MegaButton
                 * @type {Object}
                 */
                document.registerElement(name, {
                    prototype: elementPrototype
                });
            }
        }]);

        return Maple;
    })();

    $window.maple = new Maple();
})(window);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7QUFFcEIsZ0JBQVksQ0FBQzs7Ozs7O0FBTWIsUUFBTSxPQUFPLEdBQUc7QUFDWixvQkFBWSxFQUFFLHVCQUF1QjtBQUNyQyxzQkFBYyxFQUFFLG9CQUFvQjtBQUNwQyxxQkFBYSxFQUFFLGdCQUFnQjtBQUMvQixtQkFBVyxFQUFFLE1BQU07S0FDdEIsQ0FBQzs7Ozs7Ozs7UUFPSSxLQUFLOzs7Ozs7O0FBTUksaUJBTlQsS0FBSyxHQU1PO2tDQU5aLEtBQUs7O0FBT0gsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3RCOztxQkFSQyxLQUFLOzs7Ozs7Ozs7bUJBZ0JPLHdCQUFDLE9BQU8sRUFBRTtBQUNwQixzQkFBTSxJQUFJLEtBQUssZ0JBQWMsT0FBTyxPQUFJLENBQUM7YUFDNUM7Ozs7Ozs7OzttQkFPTSxpQkFBQyxTQUFTLEVBQUU7QUFDZix1QkFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakQ7Ozs7Ozs7Ozs7bUJBUU8sa0JBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTs7QUFFdEIsb0JBQUksT0FBTyxHQUFXLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkQsb0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBRWhGOzs7Ozs7Ozs7O21CQVFXLHNCQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUU7OztBQUVwQyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7O0FBRTlELHdCQUFJLElBQUksVUFBTyxLQUFLLGFBQWEsRUFBRTs7O0FBRS9CLGdDQUFJLElBQUksR0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDN0UsZUFBZSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztnQ0FDakUsWUFBWSxHQUFNLE1BQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDbEcsNENBQVUsSUFBSSxTQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUc7NkJBQ2xELENBQUMsQ0FBQzs7QUFFUCx3Q0FBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVcsRUFBSzs7QUFFbEMsb0NBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkQsNENBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLDRDQUFZLENBQUMsU0FBUyxvQkFBa0IsV0FBVyxNQUFHLENBQUM7QUFDdkQsMENBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7NkJBRXhDLENBQUMsQ0FBQzs7cUJBRU47aUJBRUosQ0FBQyxDQUFDO2FBRU47Ozs7Ozs7Ozs7bUJBUVksdUJBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTs7QUFFekIsb0JBQUksYUFBYSxHQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYTtvQkFDdkQsWUFBWSxHQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUM7b0JBQzlELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTs7Ozs7O0FBTXhELG1DQUFlLEVBQUU7Ozs7OztBQU1iLDZCQUFLLEVBQUUsU0FBUyxLQUFLLEdBQUc7O0FBRXBCLGdDQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsZ0NBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2dDQUNsRCxVQUFVLEdBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0FBRTdDLHdDQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekIsc0NBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdkMsaUNBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3lCQUV6Qzs7cUJBRUo7O2lCQUVKLENBQUMsQ0FBQzs7Ozs7O0FBTUgsd0JBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO0FBQzNCLDZCQUFTLEVBQUUsZ0JBQWdCO2lCQUM5QixDQUFDLENBQUM7YUFFTjs7O2VBMUhDLEtBQUs7OztBQThIWCxXQUFPLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Q0FFL0IsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiBtYWluKCR3aW5kb3cpIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0YW50IG9wdGlvbnNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGxpbmtTZWxlY3RvcjogJ2xpbmtbdHlwZT1cInRleHQvY3NzXCJdJyxcbiAgICAgICAgaW1wb3J0U2VsZWN0b3I6ICdsaW5rW3JlbD1cImltcG9ydFwiXScsXG4gICAgICAgIGRhdGFBdHRyaWJ1dGU6ICdkYXRhLWNvbXBvbmVudCcsXG4gICAgICAgIGRhdGFFbGVtZW50OiAnaHRtbCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG1vZHVsZSBNYXBsZVxuICAgICAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gICAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9NYXBsZS5qc1xuICAgICAqL1xuICAgIGNsYXNzIE1hcGxlIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEByZXR1cm4ge01hcGxlfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCB0aHJvd0V4Y2VwdGlvblxuICAgICAgICAgKiBAdGhyb3dzIEVycm9yXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICB0aHJvd0V4Y2VwdGlvbihtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hcGxlLmpzOiAke21lc3NhZ2V9LmApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAgICAgKiBAcGFyYW0geyp9IGFycmF5TGlrZVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRvQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFycmF5TGlrZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZWdpc3RlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYmx1ZXByaW50XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICByZWdpc3RlcihuYW1lLCBibHVlcHJpbnQpIHtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgICAgICAgICA9IFJlYWN0LmNyZWF0ZUNsYXNzKGJsdWVwcmludCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzW25hbWVdID0gdGhpcy5jcmVhdGVFbGVtZW50KG5hbWUsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBhc3NvY2lhdGVDU1NcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudFxuICAgICAgICAgKiBAcGFyYW0ge1NoYWRvd1Jvb3R9IHNoYWRvd1Jvb3RcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGFzc29jaWF0ZUNTUyhvd25lckRvY3VtZW50LCBzaGFkb3dSb290KSB7XG5cbiAgICAgICAgICAgIHRoaXMudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJykpLmZvckVhY2goKGxpbmspID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChsaW5rLmltcG9ydCA9PT0gb3duZXJEb2N1bWVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoICAgICAgICAgICAgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRWxlbWVudCA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzRG9jdW1lbnRzICAgID0gdGhpcy50b0FycmF5KHRlbXBsYXRlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMubGlua1NlbGVjdG9yKSkubWFwKChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtwYXRofS8ke21vZGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjc3NEb2N1bWVudHMuZm9yRWFjaCgoY3NzRG9jdW1lbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gYEBpbXBvcnQgdXJsKCR7Y3NzRG9jdW1lbnR9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVFbGVtZW50KG5hbWUsIGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgbGV0IG93bmVyRG9jdW1lbnQgICAgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgYXNzb2NpYXRlQ1NTICAgICA9IHRoaXMuYXNzb2NpYXRlQ1NTLmJpbmQodGhpcywgb3duZXJEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlLCB7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkgY3JlYXRlZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjcmVhdGVkQ2FsbGJhY2s6IHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQG1ldGhvZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb250ZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdCAgICAgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRlQ1NTKHNoYWRvd1Jvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5yZW5kZXIoZWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IE1lZ2FCdXR0b25cbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudChuYW1lLCB7XG4gICAgICAgICAgICAgICAgcHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAkd2luZG93Lm1hcGxlID0gbmV3IE1hcGxlKCk7XG5cbn0pKHdpbmRvdyk7Il19
