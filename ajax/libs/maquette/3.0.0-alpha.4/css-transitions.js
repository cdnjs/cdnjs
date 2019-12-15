(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory(root.cssTransitions = {});
    }
}(this, function (exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var browserSpecificTransitionEndEventName;
    var browserSpecificAnimationEndEventName;
    var determineBrowserSpecificStyleNames = function (element) {
        if ('WebkitTransition' in element.style) {
            browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
            browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
        } else if ('transition' in element.style) {
            browserSpecificTransitionEndEventName = 'transitionend';
            browserSpecificAnimationEndEventName = 'animationend';
        } else if ('MozTransition' in element.style) {
            browserSpecificTransitionEndEventName = 'transitionend';
            browserSpecificAnimationEndEventName = 'animationend';
        } else {
            throw new Error('Your browser is not supported!');
        }
    };
    var init = function (testElement) {
        if (!browserSpecificTransitionEndEventName) {
            determineBrowserSpecificStyleNames(testElement);
        }
    };
    exports.cssTransitions = {
        exit: function (element, properties, exitAnimation, removeElement) {
            init(element);
            var finished = false;
            var transitionEnd = function (evt) {
                if (!finished) {
                    finished = true;
                    element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
                    element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
                    removeElement();
                }
            };
            element.classList.add(exitAnimation);
            element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            requestAnimationFrame(function () {
                element.classList.add(exitAnimation + '-active');
            });
        },
        enter: function (element, properties, enterAnimation) {
            init(element);
            var finished = false;
            var transitionEnd = function (evt) {
                if (!finished) {
                    finished = true;
                    element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
                    element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
                    element.classList.remove(enterAnimation);
                    element.classList.remove(enterAnimation + '-active');
                }
            };
            element.classList.add(enterAnimation);
            element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            requestAnimationFrame(function () {
                element.classList.add(enterAnimation + '-active');
            });
        }
    };
}));
//# sourceMappingURL=css-transitions.js.map
