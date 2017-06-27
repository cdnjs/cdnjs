/*! Prelodr v1.0.5 | MIT (c) 2015 José Luis Quintana */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Queu class
 * Simple javascript Queue class implementation
 */

var Queu = (function () {

  /**
   * Constructor function
   * @constructor
   */

  function Queu() {
    _classCallCheck(this, Queu);

    this.queue = [];
    this.offset = 0;
  }

  /**
   * Get length
   * @return {Number} - Length
   */

  _createClass(Queu, [{
    key: 'getLength',
    value: function getLength() {
      return this.queue.length - this.offset;
    }

    /**
     * Checks if empty
     * @return {Boolean} - True is empty and false is not.
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.queue.length === 0;
    }

    /**
     * Add item to queue
     * @param  {Object|String|number} - item Item for queue
     */

  }, {
    key: 'add',
    value: function add(item) {
      this.queue.push(item);
      this.offset += 1;
    }

    /**
     * Remove the first element
     * @return {Object|String|number} - Return the item
     */

  }, {
    key: 'shift',
    value: function shift() {
      var item = null;

      if (this.queue.length) {
        item = this.queue.shift();
      }

      return item;
    }

    /**
     * Remove the last element
     * @return {Object|String|number} - Return the item
     */

  }, {
    key: 'pop',
    value: function pop() {
      var item = null;

      if (this.queue.length) {
        item = this.queue.pop();
      }

      return item;
    }

    /**
     * Get last item
     * @return {object|string|number} - Last item
     */

  }, {
    key: 'last',
    value: function last() {
      return this.queue.length > 0 ? this.queue[this.queue.length - 1] : null;
    }

    /**
     * Get first item
     * @return {object|string|number} - First item
     */

  }, {
    key: 'first',
    value: function first() {
      return this.queue.length > 0 ? this.queue[0] : null;
    }
  }]);

  return Queu;
})();

(function () {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = Queu;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Queu;
    });
  } else {
    window.Queu = Queu;
  }
})();