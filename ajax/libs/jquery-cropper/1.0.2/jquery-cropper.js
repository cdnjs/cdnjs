/*!
 * jQuery Cropper v1.0.2
 * https://fengyuanchen.github.io/jquery-cropper
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2025-03-08T08:35:16.178Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('cropperjs')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'cropperjs'], factory) :
  (global = global || self, factory(global.jQuery, global.Cropper));
}(this, (function ($, Cropper) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  Cropper = Cropper && Object.prototype.hasOwnProperty.call(Cropper, 'default') ? Cropper['default'] : Cropper;

  if ($ && $.fn && Cropper) {
    var AnotherCropper = $.fn.cropper;
    var NAMESPACE = 'cropper';
    $.fn.cropper = function jQueryCropper(option) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var result;
      this.each(function (i, element) {
        var $element = $(element);
        var isDestroy = option === 'destroy';
        var cropper = $element.data(NAMESPACE);
        if (!cropper) {
          if (isDestroy) {
            return;
          }
          var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
          cropper = new Cropper(element, options);
          $element.data(NAMESPACE, cropper);
        }
        if (typeof option === 'string') {
          var fn = cropper[option];
          if (typeof fn === 'function') {
            result = fn.apply(cropper, args);
            if (result === cropper) {
              result = undefined;
            }
            if (isDestroy) {
              $element.removeData(NAMESPACE);
            }
          }
        }
      });
      return result !== undefined ? result : this;
    };
    $.fn.cropper.Constructor = Cropper;
    $.fn.cropper.setDefaults = Cropper.setDefaults;
    $.fn.cropper.noConflict = function noConflict() {
      $.fn.cropper = AnotherCropper;
      return this;
    };
  }

})));
