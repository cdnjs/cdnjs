/**
 * Swiper 6.8.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 6, 2021
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Swiper = require('./cjs/components/core/core-class');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Swiper__default = /*#__PURE__*/_interopDefaultLegacy(Swiper);

// Swiper Class
var components = [];
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
