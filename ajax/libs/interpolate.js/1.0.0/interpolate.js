/*! interpolate.js v1.0.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/interpolate */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.interpolate = factory();
  }
})(this, function () {

  'use strict';

  /**
   * Interpolate
   * @class
   * @classdesc Interpolates a String against an Object's values
   * @param {String} tmpl Template to store for parsing
   */
  function Interpolate (tmpl) {
    if (getType(tmpl) !== 'String') return;
    this.template = strip(tmpl);
  }

  /**
   * @name Interpolate#parse
   * @desc Parses an Object's values against the stored String template
   * @returns {String} Parsed template
   */
  Interpolate.prototype.parse = function (obj) {
    if (getType(obj) !== 'Object') return;
    var temp = this.template;
    for (var prop in obj) {
      var regexp = new RegExp('{{' + prop + '}}', 'g');
      if (regexp.test(temp)) {
        temp = temp.replace(regexp, obj[prop]);
      }
    }
    return temp;
  };

  /**
   * @name getType
   * @description Returns the Object's type
   * @param {Object} item The item to get the type
   * @returns {String}
   * @private
   */
  function getType (item) {
    return Object.prototype.toString.call(item).slice(8, -1);
  }

  /**
   * @name strip
   * @param {string} tmpl Template for removing whitespace between handlebars
   * @private
   * @returns {String}
   */
  function strip (tmpl) {
    return tmpl.replace(/\s(?![^}}]*\{\{)/g, '');
  }

  return function (tmpl) {
    var template = new Interpolate(tmpl);
    return function (obj) {
      return template.parse(obj);
    };
  };

});
