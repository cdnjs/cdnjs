/*! UIkit 3.0.0-beta.30 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikitslideshow_animations', factory) :
	(global.UIkitSlideshow_animations = factory());
}(this, (function () { 'use strict';

function translate3d(value) {
    if ( value === void 0 ) value = 0;

    return ("translate3d(" + value + (value ? '%' : '') + ", 0, 0)");
}

function scale3d(value) {
    return ("scale3d(" + value + ", " + value + ", 1)");
}

var slideshowAnimations = function (UIkit) {

    var mixin = UIkit.mixin;
    var ref = UIkit.util;
    var assign = ref.assign;
    var css = ref.css;

    var Animations = assign({}, mixin.slideshow.defaults.Animations, {

        fade: {

            show: function show() {
                return [
                    {opacity: 0, zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate(percent) {
                return [
                    {opacity: 1 - percent, zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        scale: {

            show: function show() {
                return [
                    {opacity: 0, transform: scale3d(1 + .5), zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 + .5 * percent), zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        pull: {

            show: function show(dir) {
                return dir < 0
                    ? [
                        {transform: translate3d(100), zIndex: 0},
                        {transform: translate3d(), zIndex: -1} ]
                    : [
                        {transform: translate3d(-100), zIndex: 0},
                        {transform: translate3d(), zIndex: -1}
                    ];
            },

            percent: function percent(current) {
                return Animations.translated(current);
            },

            translate: function translate(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate3d(percent * 100), zIndex: 0},
                        {transform: translate3d(-30 * (1 - percent)), zIndex: -1} ]
                    : [
                        {transform: translate3d(-percent * 100), zIndex: 0},
                        {transform: translate3d(30 * (1 - percent)), zIndex: -1}
                    ];
            }

        },

        push: {

            show: function show(dir) {

                return dir < 0
                    ? [
                        {transform: translate3d(30), zIndex: -1},
                        {transform: translate3d(), zIndex: 0} ]
                    : [
                        {transform: translate3d(-30), zIndex: -1},
                        {transform: translate3d(), zIndex: 0}
                    ];
            },

            percent: function percent(current, next) {
                return 1 - Animations.translated(next);
            },

            translate: function translate(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate3d(30 * percent), zIndex: -1},
                        {transform: translate3d(-100 * (1 - percent)), zIndex: 0} ]
                    : [
                        {transform: translate3d(-30 * percent), zIndex: -1},
                        {transform: translate3d(100 * (1 - percent)), zIndex: 0}
                    ];
            }

        }

    });

    return Animations;

};

return slideshowAnimations;

})));
