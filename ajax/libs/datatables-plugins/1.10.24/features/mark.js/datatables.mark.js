/*!***************************************************
 * datatables.mark.js v2.1.0
 * https://github.com/julmot/datatables.mark.js
 * Copyright (c) 2016–2020, Julian Kühnel
 * Released under the MIT license https://git.io/voRZ7
 *****************************************************/

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory, window, document) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    var jquery = require('jquery');
    require('datatables.net');
    require('mark.js/dist/jquery.mark.js');
    module.exports = factory(window, document, jquery);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables.net', 'markjs'], function (jQuery) {
      return factory(window, document, jQuery);
    });
  } else {
    factory(window, document, jQuery);
  }
})(function (window, document, $) {
  var MarkDataTables = function () {
    function MarkDataTables(dtInstance, options) {
      _classCallCheck(this, MarkDataTables);

      if (!$.fn.mark || !$.fn.unmark) {
        throw new Error('jquery.mark.js is necessary for datatables.mark.js');
      }
      this.instance = dtInstance;
      this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
      this.intervalThreshold = 49;
      this.intervalMs = 300;
      this.initMarkListener();
    }

    _createClass(MarkDataTables, [{
      key: 'initMarkListener',
      value: function initMarkListener() {
        var _this = this;

        var ev = 'draw.dt.dth column-visibility.dt.dth column-reorder.dt.dth';
        ev += ' responsive-display.dt.dth';
        var intvl = null;
        this.instance.on(ev, function () {
          var rows = _this.instance.rows({
            filter: 'applied',
            page: 'current'
          }).nodes().length;
          if (rows > _this.intervalThreshold) {
            clearTimeout(intvl);
            intvl = setTimeout(function () {
              _this.mark();
            }, _this.intervalMs);
          } else {
            _this.mark();
          }
        });
        this.instance.on('destroy', function () {
          _this.instance.off(ev);
        });
        this.mark();
      }
    }, {
      key: 'mark',
      value: function mark() {
        var _this2 = this;

        var globalSearch = this.instance.search();
        var $tableBody = $(this.instance.table().body());
        $tableBody.unmark(this.options);
        if (this.instance.table().rows({ search: 'applied' }).data().length) {
          $tableBody.mark(globalSearch, this.options);
        }
        this.instance.columns({
          search: 'applied',
          page: 'current'
        }).nodes().each(function (nodes, colIndex) {
          var columnSearch = _this2.instance.column(colIndex).search(),
              searchVal = columnSearch || globalSearch;
          if (searchVal) {
            nodes.forEach(function (node) {
              $(node).unmark(_this2.options).mark(searchVal, _this2.options);
            });
          }
        });
      }
    }]);

    return MarkDataTables;
  }();

  $(document).on('init.dt.dth', function (event, settings) {
    if (event.namespace !== 'dt') {
      return;
    }

    var dtInstance = $.fn.dataTable.Api(settings);

    var options = null;
    if (dtInstance.init().mark) {
      options = dtInstance.init().mark;
    } else if ($.fn.dataTable.defaults.mark) {
      options = $.fn.dataTable.defaults.mark;
    }
    if (options === null) {
      return;
    }

    new MarkDataTables(dtInstance, options);
  });
}, window, document);
