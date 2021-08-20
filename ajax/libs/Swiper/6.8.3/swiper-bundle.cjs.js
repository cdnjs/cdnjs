/**
 * Swiper 6.8.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 20, 2021
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Swiper = require('./cjs/components/core/core-class');
var Virtual = require('./cjs/components/virtual/virtual');
var Keyboard = require('./cjs/components/keyboard/keyboard');
var Mousewheel = require('./cjs/components/mousewheel/mousewheel');
var Navigation = require('./cjs/components/navigation/navigation');
var Pagination = require('./cjs/components/pagination/pagination');
var Scrollbar = require('./cjs/components/scrollbar/scrollbar');
var Parallax = require('./cjs/components/parallax/parallax');
var Zoom = require('./cjs/components/zoom/zoom');
var Lazy = require('./cjs/components/lazy/lazy');
var Controller = require('./cjs/components/controller/controller');
var A11y = require('./cjs/components/a11y/a11y');
var History = require('./cjs/components/history/history');
var HashNavigation = require('./cjs/components/hash-navigation/hash-navigation');
var Autoplay = require('./cjs/components/autoplay/autoplay');
var EffectFade = require('./cjs/components/effect-fade/effect-fade');
var EffectCube = require('./cjs/components/effect-cube/effect-cube');
var EffectFlip = require('./cjs/components/effect-flip/effect-flip');
var EffectCoverflow = require('./cjs/components/effect-coverflow/effect-coverflow');
var Thumbs = require('./cjs/components/thumbs/thumbs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Swiper__default = /*#__PURE__*/_interopDefaultLegacy(Swiper);
var Virtual__default = /*#__PURE__*/_interopDefaultLegacy(Virtual);
var Keyboard__default = /*#__PURE__*/_interopDefaultLegacy(Keyboard);
var Mousewheel__default = /*#__PURE__*/_interopDefaultLegacy(Mousewheel);
var Navigation__default = /*#__PURE__*/_interopDefaultLegacy(Navigation);
var Pagination__default = /*#__PURE__*/_interopDefaultLegacy(Pagination);
var Scrollbar__default = /*#__PURE__*/_interopDefaultLegacy(Scrollbar);
var Parallax__default = /*#__PURE__*/_interopDefaultLegacy(Parallax);
var Zoom__default = /*#__PURE__*/_interopDefaultLegacy(Zoom);
var Lazy__default = /*#__PURE__*/_interopDefaultLegacy(Lazy);
var Controller__default = /*#__PURE__*/_interopDefaultLegacy(Controller);
var A11y__default = /*#__PURE__*/_interopDefaultLegacy(A11y);
var History__default = /*#__PURE__*/_interopDefaultLegacy(History);
var HashNavigation__default = /*#__PURE__*/_interopDefaultLegacy(HashNavigation);
var Autoplay__default = /*#__PURE__*/_interopDefaultLegacy(Autoplay);
var EffectFade__default = /*#__PURE__*/_interopDefaultLegacy(EffectFade);
var EffectCube__default = /*#__PURE__*/_interopDefaultLegacy(EffectCube);
var EffectFlip__default = /*#__PURE__*/_interopDefaultLegacy(EffectFlip);
var EffectCoverflow__default = /*#__PURE__*/_interopDefaultLegacy(EffectCoverflow);
var Thumbs__default = /*#__PURE__*/_interopDefaultLegacy(Thumbs);

// Swiper Class
var components = [Virtual__default['default'], Keyboard__default['default'], Mousewheel__default['default'], Navigation__default['default'], Pagination__default['default'], Scrollbar__default['default'], Parallax__default['default'], Zoom__default['default'], Lazy__default['default'], Controller__default['default'], A11y__default['default'], History__default['default'], HashNavigation__default['default'], Autoplay__default['default'], EffectFade__default['default'], EffectCube__default['default'], EffectFlip__default['default'], EffectCoverflow__default['default'], Thumbs__default['default']];
Swiper__default['default'].use(components);

Object.defineProperty(exports, 'Swiper', {
  enumerable: true,
  get: function () {
    return Swiper__default['default'];
  }
});
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () {
    return Swiper__default['default'];
  }
});
