(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

(function main($window) {

    'use strict';

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
            key: 'render',

            /**
             * @method render
             * @param {Object} element
             * @param {String} name
             * @return {Object}
             */
            value: function render(element, name) {

                if (typeof this.elements[name] !== 'undefined') {
                    throw new Error('Custom element ' + name + ' already exists');
                }

                // Register the custom element.
                this.elements[name] = this.registerElement(element, name);
            }
        }, {
            key: 'registerElement',

            /**
             * @method registerElement
             * @param {Object} element
             * @param {String} name
             * @return {void}
             */
            value: function registerElement(element, name) {

                var elementPrototype = Object.create(HTMLElement.prototype, {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9NYXBsZS5qcy9zcmMvTWFwbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7QUFFcEIsZ0JBQVksQ0FBQzs7Ozs7Ozs7UUFPUCxLQUFLOzs7Ozs7O0FBTUksaUJBTlQsS0FBSyxHQU1PO2tDQU5aLEtBQUs7O0FBT0gsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3RCOztxQkFSQyxLQUFLOzs7Ozs7Ozs7bUJBZ0JPLHdCQUFDLE9BQU8sRUFBRTtBQUNwQixzQkFBTSxJQUFJLEtBQUssZ0JBQWMsT0FBTyxPQUFJLENBQUM7YUFDNUM7Ozs7Ozs7Ozs7bUJBUUssZ0JBQUMsT0FBTyxFQUFFLElBQUksRUFBRTs7QUFFbEIsb0JBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUM1QywwQkFBTSxJQUFJLEtBQUsscUJBQW1CLElBQUkscUJBQWtCLENBQUM7aUJBQzVEOzs7QUFHRCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUU3RDs7Ozs7Ozs7OzttQkFRYyx5QkFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFOztBQUUzQixvQkFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQU14RCxtQ0FBZSxFQUFFOzs7Ozs7QUFNYiw2QkFBSyxFQUFFLFNBQVMsS0FBSyxHQUFHOztBQUVwQixnQ0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRXBCLGdDQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztnQ0FDbEQsVUFBVSxHQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOztBQUU3QyxzQ0FBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2QyxpQ0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7eUJBRXpDOztxQkFFSjs7aUJBRUosQ0FBQyxDQUFDOzs7Ozs7QUFNSCx3QkFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsNkJBQVMsRUFBRSxnQkFBZ0I7aUJBQzlCLENBQUMsQ0FBQzthQUVOOzs7ZUFqRkMsS0FBSzs7O0FBcUZYLFdBQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztDQUUvQixDQUFBLENBQUUsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIG1haW4oJHdpbmRvdykge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBAbW9kdWxlIE1hcGxlXG4gICAgICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L01hcGxlLmpzXG4gICAgICovXG4gICAgY2xhc3MgTWFwbGUge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICogQHJldHVybiB7TWFwbGV9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHRocm93RXhjZXB0aW9uXG4gICAgICAgICAqIEB0aHJvd3MgRXJyb3JcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIHRocm93RXhjZXB0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWFwbGUuanM6ICR7bWVzc2FnZX0uYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1ldGhvZCByZW5kZXJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyKGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsZW1lbnRzW25hbWVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ3VzdG9tIGVsZW1lbnQgJHtuYW1lfSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgY3VzdG9tIGVsZW1lbnQuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzW25hbWVdID0gdGhpcy5yZWdpc3RlckVsZW1lbnQoZWxlbWVudCwgbmFtZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyRWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSwge1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHByb3BlcnR5IGNyZWF0ZWRDYWxsYmFja1xuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY3JlYXRlZENhbGxiYWNrOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBtZXRob2QgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29udGVudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QgICAgID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QucmVuZGVyKGVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBNZWdhQnV0dG9uXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQobmFtZSwge1xuICAgICAgICAgICAgICAgIHByb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgJHdpbmRvdy5tYXBsZSA9IG5ldyBNYXBsZSgpO1xuXG59KSh3aW5kb3cpOyJdfQ==
