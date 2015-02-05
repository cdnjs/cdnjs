var Scrollpoints = (function (undefined) {
    "use strict";

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

    var elementBegin = function (domElement) {
        return domElement.offsetTop;
    };

    var elementEnd = function (domElement) {
        return elementBegin(domElement) + domElement.offsetHeight;
    };

    var windowTopPos = function () {
        return (window.scrollY || document.documentElement.scrollTop);
    };

    var windowBottomPos = function () {
        return windowTopPos() + window.innerHeight;
    };


    var entering = function (e) {
        if (e.reversed) return !e.done && windowTopPos() <= elementEnd(e.element) - e.offset;
        return !e.done && windowBottomPos() >= elementBegin(e.element) + e.offset;
    };

    var entered = function (e, overrideReversed) {

        var reversed = overrideReversed === undefined ? e.reversed : overrideReversed;

        if (reversed) return !e.done && windowTopPos() <= elementBegin(e.element) - e.offset;
        return !e.done && windowBottomPos() >= elementEnd(e.element) + e.offset;
    };

    var leaving = function (e) {
        if (e.reversed) return !e.done && windowBottomPos() <= elementEnd(e.element) - e.offset;
        return !e.done && windowTopPos() >= elementBegin(e.element) + e.offset;
    };

    var left = function (e, overrideReversed, real) {

        var reversed = overrideReversed === undefined ? e.reversed : overrideReversed;

        if (reversed) return !e.done && windowBottomPos() <= elementBegin(e.element) - e.offset;
        return !e.done && windowTopPos() >= elementEnd(e.element) + e.offset;
    };


    var executeScrollpoints = function () {
        scrollpoints.forEach(function (elem, index, array) {

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

                if (!elem.once) {
                    if (elem.when === 'entered') {
                        exports.add(elem.element, function () { elem.done = false; }, {when: 'leaving', reversed: !elem.reversed}); // entered = lower edge = reverse leaving
                    }
                    if (elem.when === 'entering') {
                        exports.add(elem.element, function () { elem.done = false; }, {when: 'left', reversed: !elem.reversed}); // entering = upper edge = reverse left
                    }
                    if (elem.when === 'left') {
                        exports.add(elem.element, function () { elem.done = false; }, {when: 'entering', reversed: !elem.reversed}); // left = lower edge = reverse entering
                    }
                    if (elem.when === 'leaving') {
                        exports.add(elem.element, function () { elem.done = false; }, {when: 'entered', reversed: !elem.reversed}); // leaving = upper edge = reverse entered
                    }
                }
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

    exports.configure = function (userOptions) {
        defaultOptions = extendOptions(userOptions);
    };

    window.addEventListener('scroll', executeScrollpoints);

    return exports;

})();

if (module && module.exports) module.exports = Scrollpoints;
if (exports) exports = Scrollpoints;
