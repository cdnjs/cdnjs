/*
#  Classify
#  An extensible DOM utility for class helper functions
#
#  Copyright © Softlayer, an IBM Company
#  Code and documentation licensed under MIT
*/

(function(window) {
    classReg = function(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    };

    toggleClass = function(elem, c) {
        fn = (hasClass(elem, c) ? removeClass : addClass);
        fn(elem, c);
    };

    hasClass    = void 0;
    addClass    = void 0;
    removeClass = void 0;

    if ("classList" in document.documentElement) {

        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };

        addClass = function(elem, c) {
            elem.classList.add(c);
        };

        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    }
    else {

        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };

        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + " " + c;
            }
        };

        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), " ");
        };
    }

    classify = {
        hasClass:     hasClass,
        addClass:     addClass,
        removeClass:  removeClass,
        toggleClass:  toggleClass,
        has:          hasClass,
        add:          addClass,
        remove:       removeClass,
        toggle:       toggleClass
    };

    if (typeof define === "function" && define.amd) {
        define(classify);
    }
    else if (typeof exports === "object") {
        module.exports = classify;
    }
    else {
        window.classify = classify;
    }
})(window);
