var Scrollpoints = (function (undefined) {
    'use strict';

    var exports = {};
    var scrollpoints = [];

    var defaultOptions = {
        once: true,
        reversed: false,
        when: 'entered', // 'entered', 'entering', 'left', 'leaving'
        offset: 0
    };

    var extendOptions = function (userOptions) {
        if (userOptions === undefined) {
            userOptions = {};
        }
        var combined = {};
        for (var key in defaultOptions) {
            if (userOptions.hasOwnProperty(key)) {
                combined[key] = userOptions[key];
            } else {
                combined[key] = defaultOptions[key];
            }
        }
        return combined;
    };

    var isRendered = function (domElement) {
        return (domElement.offsetWidth > 0 || domElement.offsetHeight > 0);
    };

    var oppositeDirectionOf = function (direction) {
        if (direction === 'entered') { return 'leaving'; }
        if (direction === 'entering') { return 'left'; }
        if (direction === 'left') { return 'entering'; }
        if (direction === 'leaving') { return 'entered'; }
    };

    var windowTopPos = function () {
        return document.body.scrollTop;
    };

    var windowBottomPos = function () {
        return windowTopPos() + window.innerHeight;
    };

    var elementBegin = function (domElement) {
        return domElement.getBoundingClientRect().top + windowTopPos();
    };

    var elementEnd = function (domElement) {
        return elementBegin(domElement) + domElement.offsetHeight;
    };


    var entering = function (e) {
        if (e.reversed) {
            return !e.done && windowTopPos() <= elementEnd(e.element) - e.offset;
        }
        return !e.done && windowBottomPos() >= elementBegin(e.element) + e.offset;
    };

    var entered = function (e, overrideReversed) {

        var reversed = overrideReversed === undefined ? e.reversed : overrideReversed;

        if (reversed) {
            return !e.done && windowTopPos() <= elementBegin(e.element) - e.offset;
        }
        return !e.done && windowBottomPos() >= elementEnd(e.element) + e.offset;
    };

    var leaving = function (e) {
        if (e.reversed) {
            return !e.done && windowBottomPos() <= elementEnd(e.element) - e.offset;
        }
        return !e.done && windowTopPos() >= elementBegin(e.element) + e.offset;
    };

    var left = function (e, overrideReversed) {

        var reversed = overrideReversed === undefined ? e.reversed : overrideReversed;

        if (reversed) {
            return !e.done && windowBottomPos() <= elementBegin(e.element) - e.offset;
        }
        return !e.done && windowTopPos() >= elementEnd(e.element) + e.offset;
    };


    var executeScrollpoints = function () {
        scrollpoints.forEach(function (elem) {
            if (!isRendered(elem.element)) {
                return;
            }

            if (!elem.active && (elem.when === 'leaving' || elem.when === 'left') && entered(elem, false) ||
                !elem.active && (elem.when === 'entering' || elem.when === 'entered') && left(elem, false)) {
                elem.active = true;
            }

            var shouldFire =    elem.when === 'entered' && entered(elem) ||
                                elem.when === 'entering' && entering(elem) ||
                                elem.when === 'leaving' && leaving(elem) ||
                                elem.when === 'left' && left(elem);


            if (elem.active && shouldFire) {
                elem.callback.call(window, elem.element);
                elem.done = true;

                setTimeout(function () { // modify array after forEach finishes.
                    if (!elem.once) {
                        // add a scrollpoint which triggers at the opposite position and reactivates the current one.
                        // example: A scrollpoint triggers when leaving at the top of the screen, is then temporarily
                        // deactivated and gets reactivated when the element comes back in from the top (its lower edge)
                        exports.add(elem.element, function () { elem.done = false; }, {when: oppositeDirectionOf(elem.when), reversed: !elem.reversed});
                    }
                });
            }

        });
    };

    exports.add = function (domElement, callback, options) {
        var opts = extendOptions(options);

        // reversed elements are inactive initially. Scrollpoints which trigger on 'left' or 'leave' will
        // be activated once they entered the screen, those who trigger on 'entered' or 'entering' once they left the screen.
        var activeInitially = true;

        if ((opts.when === 'entered' || opts.when === 'entering') && opts.reversed ||
            (opts.when === 'left' || opts.when === 'leaving') && opts.reversed) {
            activeInitially = false;
        }

        scrollpoints.push({
            element: domElement,
            callback: callback,

            once: opts.once,
            reversed: opts.reversed,
            when: opts.when,
            offset: opts.offset,

            active: activeInitially,
            done: false
        });

        executeScrollpoints();
    };

    exports.destroy = function() {
        scrollpoints = [];
        return exports;
    };

    exports.configure = function (userOptions) {
        defaultOptions = extendOptions(userOptions);
    };

    window.addEventListener('scroll', executeScrollpoints);

    return exports;

})();


// For use with browserify
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Scrollpoints;
}
if (typeof exports !== 'undefined') {
    exports = Scrollpoints;
}
