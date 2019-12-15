/*! iconate.js - v0.2.7 - 2018-01-16
* http://bitshadow.github.io/iconate
* Copyright (c) 2018 Jignesh Kakadiya;/*global window */
/*global document */
(function() {
    'use strict';

    var DEFAULT_DURATION = 600;
    var ONE_SECOND = 1000;
    var DEFAULT_ANIMATION = 'zoomOut';
    var ANIMATION_START;
    var ANIMATION_END;

    var isAnimationSupported = (function() {
        var documentStyle = document.documentElement.style;
        return documentStyle.animation !== undefined || documentStyle.webkitAnimation !== undefined;
    })();

    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
        ANIMATION_END = 'webkitAnimationEnd';
    } else {
        ANIMATION_END = 'animationend';
    }

    if (window.onanimationstart === undefined && window.onwebkitanimationstart !== undefined) {
        ANIMATION_START = 'webkitAnimationStart';
    } else {
        ANIMATION_START = 'animationstart';
    }

    var currentTime = Date.now || function() {
        return new Date().getTime();
    };

    function setAnimation(element, animType, duration) {
        element.style.setProperty('-webkit-animation', animType + ' ' + duration + 's');
        element.style.setProperty('animation', animType + ' ' + duration + 's');
        element.style.setProperty('-moz-animation', animType + ' ' + duration + 's');
        element.style.setProperty('-o-animation', animType + ' ' + duration + 's');
    }

    function removeAnimation(element) {
        element.style.removeProperty('-webkit-animation');
        element.style.removeProperty('animation');
        element.style.removeProperty('-moz-animation');
        element.style.removeProperty('-o-animation');
    }

    function changeClasses(element, from, to) {
        if (element.classList.contains(from)) {
            element.classList.remove(from);
        }

        element.classList.add(to);
    }

    function iconate(el, options, callback) {
        var duration,
            showPercent,
            animation;

        if (!el) {
            throw new Error('Iconate > "element" is required');
        }

        if (!isAnimationSupported) {
            changeClasses(el, options.from, options.to);
            if (typeof callback == 'function') {
                callback();
            }

            return;
        }

        options = options || {};
        animation = options.animation || DEFAULT_ANIMATION;
        duration = options.duration || DEFAULT_DURATION;

        function animationStartHandler() {
            var now = currentTime(),
                halfDuration = duration / 2;

            showPercent = window.setTimeout(function() {
                var elapsed = currentTime() - now;

                if (elapsed >= halfDuration) {
                    changeClasses(el, options.from, options.to);
                }
            }, halfDuration);
        }

        function animationEndHandler() {
            window.clearTimeout(showPercent);
            removeAnimation(el);

            el.removeEventListener(ANIMATION_END, animationEndHandler);
            el.removeEventListener(ANIMATION_START, animationStartHandler);

            if (typeof callback === 'function') {
                callback();
            }
        }

        el.addEventListener(ANIMATION_START, animationStartHandler, false);
        el.addEventListener(ANIMATION_END, animationEndHandler, false);

        setAnimation(el, animation, duration / ONE_SECOND);
    }

    // commonjs
    if (typeof exports === 'object') {
        module.exports = iconate;
    }

    // AMD module
    else if (typeof define === 'function' && define.amd) {
        define(function() {
            return iconate;
        });
    }

    // Browser global
    else {
        window.iconate = iconate;
    }
}());
