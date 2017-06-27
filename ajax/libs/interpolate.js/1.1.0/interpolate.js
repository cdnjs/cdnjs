/*! interpolate.js v1.1.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/interpolate */
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
   * @class Interpolate
   * @classdesc Interpolates a String against an Object's values
   * @param {String} tmpl Template to store for parsing
   */
  function Interpolate (tmpl) {
    if (getType(tmpl) !== 'String') return;
    this.template = strip(tmpl);
  }

  /**
   * @name Interpolate#getDelimiters
   * @desc Match content between delimiters
   * @type {RegExp}
   */
  Interpolate.getDelimiters = /\{\{([a-zA-Z0-9\.-_]+)\}\}/g;

  /**
   * @name Interpolate#stripDelimiters
   * @desc Strips whitespace between delimiters
   * @type {RegExp}
   */
  Interpolate.stripDelimiters = /\s(?![^}}]*\{\{)/g;

  /**
   * @name Interpolate#parse
   * @desc Parses an Object's values against the stored String template
   * @returns {String} Parsed template
   */
  Interpolate.prototype.parse = function (obj) {
    if (getType(obj) !== 'Object') return;
    var temp = this.template;
    return temp.replace(Interpolate.getDelimiters, function(str, path) {
      return followPath(obj, path);
    });
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
   * @param {String} tmpl Template for removing whitespace between handlebars
   * @returns {String}
   * @private
   */
  function strip (tmpl) {
    return tmpl.replace(Interpolate.stripDelimiters, '');
  }

  /**
   * @name reduce
   * @desc Reduce a collection to a single value
   * @returns {String}
   * @private
   */
  function reduce (collection, iter, initial) {
    for (var i = 0, length = collection.length; i < length; i++) {
      initial = iter.call(null, initial, collection[i], i, collection);
    }
    return initial;
  }

  /**
   * @name followPath
   * @desc Follows a path on the given data to retrieve a value
   *
   * @example
   * var data = { foo : { bar : "abc" } };
   * followPath(data, 'foo.bar'); // 'abc'
   *
   * @param {Object} data the object to get a value from
   * @param {String} path a path to a value on the data object
   * @returns {*} the value of following the path on the data object
   * @private
   */
  function followPath (data, path) {
    return reduce(path.split('.'), function (prev, curr) {
      return prev && prev[curr];
    }, data);
  }

  return function (tmpl) {
    var template = new Interpolate(tmpl);
    return function (obj) {
      return template.parse(obj);
    };
  };

});
