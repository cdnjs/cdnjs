/* Tabulator v4.1.3 (c) Oliver Folkerd */

/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Full Documentation & Demos can be found at: http://olifolkerd.github.io/tabulator/
 *
 */

(function (factory) {
  "use strict";

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($, undefined) {
  $.widget("ui.tabulator", {
    _create: function _create() {
      this.table = new Tabulator(this.element[0], this.options);

      //map tabulator functions to jquery wrapper
      for (var key in Tabulator.prototype) {
        if (typeof Tabulator.prototype[key] === "function" && key.charAt(0) !== "_") {
          this[key] = this.table[key].bind(this.table);
        }
      }
    },

    _setOption: function _setOption(option, value) {
      console.error("Tabulator jQuery wrapper does not support setting options after the table has been instantiated");
    },

    _destroy: function _destroy(option, value) {
      this.table.destroy();
    }
  });
});