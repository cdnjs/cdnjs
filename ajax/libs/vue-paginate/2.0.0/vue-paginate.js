(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RIGHT_ARROW = '»';
var LEFT_ARROW = '«';
var ELIPSES = '…';

var LimitedLinksGenerator = function () {
  function LimitedLinksGenerator(vm, list, listName) {
    _classCallCheck(this, LimitedLinksGenerator);

    this.vm = vm;
    this.list = list;
    this.listName = listName;
  }

  _createClass(LimitedLinksGenerator, [{
    key: 'generate',
    value: function generate(limit) {
      this.limit = limit || 4;

      var links = [];

      if (this.shouldShowLeftArrow()) {
        links.push(LEFT_ARROW);
      }

      if (this.rightArrowOrElipsesIsClicked()) {

        // Show the left arrow if not shown yet.
        if (links[0] !== LEFT_ARROW) {
          links.push(LEFT_ARROW);
        }

        this.showNextNavSet();
      }

      if (this.leftArrowIsClicked()) {

        // Remove left arrow if it's the first nav set
        // and the there's a left arrow (as the first element).
        if (this.list.initial <= this.limit && links[0] === LEFT_ARROW) {
          links.shift();
        }

        this.showPreviousNavSet();
      }

      if (this.lastPageIsClicked()) {

        // Add the left arrow if it's not there yet.
        if (links[0] !== LEFT_ARROW) {
          links.push(LEFT_ARROW);
        }

        this.showLastNavSet();
      }

      // Add the very first page (page 1).
      links.push(this.list.initial + 1);

      // The this.limit should not be beyond the total number of pages.
      this.limit = this.limit > this.list.numberOfPages ? this.list.numberOfPages : this.limit;

      // Generate and add the rest nav links.
      links = links.concat(_utils2.default.generateLinksArray(this.list.initial + 2, this.list.numberOfPages, this.limit - 1));

      if (this.shouldShowElipses()) {
        links.push(ELIPSES);
      }

      // Add the last page.
      links.push(this.list.numberOfPages);

      // If should show right arrow.
      if (this.notLastNavSet()) {
        links.push(RIGHT_ARROW);
      }

      // return the links without duplicate values
      return [].concat(_toConsumableArray(new Set(links)));
    }
  }, {
    key: 'shouldShowLeftArrow',
    value: function shouldShowLeftArrow() {
      return this.list.numberOfPages > this.limit + 1 && this.list.initial >= this.limit;
    }
  }, {
    key: 'rightArrowOrElipsesIsClicked',
    value: function rightArrowOrElipsesIsClicked() {
      return this.list.currentPage === ELIPSES || this.list.currentPage === RIGHT_ARROW;
    }
  }, {
    key: 'showNextNavSet',
    value: function showNextNavSet() {
      if (this.list.numberOfPages - this.list.initial > this.limit + 1) {
        this.list.initial += this.limit;
        this.vm['change' + _utils2.default.capitalize(this.listName) + 'Page'](this.list.initial + 1);
      } else {
        this.list.currentPage = this.list.numberOfPages;
        this.vm['change' + _utils2.default.capitalize(this.listName) + 'Page'](this.list.currentPage);
        return;
      }
    }
  }, {
    key: 'leftArrowIsClicked',
    value: function leftArrowIsClicked() {
      return this.list.currentPage === LEFT_ARROW;
    }
  }, {
    key: 'showPreviousNavSet',
    value: function showPreviousNavSet() {
      if (this.list.initial > this.limit - 1) {
        this.list.initial -= this.limit;
        this.vm['change' + _utils2.default.capitalize(this.listName) + 'Page'](this.list.initial + this.limit);
      } else {
        this.list.currentPage = this.list.initial;
        this.vm['change' + _utils2.default.capitalize(this.listName) + 'Page'](this.list.currentPage + 1);
        return;
      }
    }
  }, {
    key: 'lastPageIsClicked',
    value: function lastPageIsClicked() {
      return this.list.currentPage == this.list.numberOfPages - 1;
    }
  }, {
    key: 'showLastNavSet',
    value: function showLastNavSet() {
      if (this.list.numberOfPages - this.list.initial > this.limit + 1) {
        this.list.initial = this.initialOfLastNav(this.limit);
        this.list.currentPage = this.list.initial + this.limit;

        this.vm['change' + _utils2.default.capitalize(this.listName) + 'Page'](this.list.currentPage + 1);
      }
    }
  }, {
    key: 'shouldShowElipses',
    value: function shouldShowElipses() {
      return this.list.numberOfPages - this.list.initial > this.limit + 1;
    }
  }, {
    key: 'initialOfLastNav',
    value: function initialOfLastNav() {
      var numberOfNavs = ~ ~(this.list.numberOfPages / this.limit);
      var rest = this.list.numberOfPages - this.limit * numberOfNavs;

      rest = rest <= 1 ? rest + this.limit : rest;
      return this.list.numberOfPages - rest;
    }
  }, {
    key: 'notLastNavSet',
    value: function notLastNavSet() {
      return this.list.initial < this.initialOfLastNav(this.limit);
    }
  }]);

  return LimitedLinksGenerator;
}();

exports.default = LimitedLinksGenerator;

},{"./utils":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vue = undefined;

var _paginate = require('./paginate');

var _paginate2 = _interopRequireDefault(_paginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = {};
var vuePaginate = {};

vuePaginate.install = function (vue) {
  exports.Vue = Vue = vue;
  Vue.directive('paginate', _paginate2.default);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuePaginate);
}

exports.Vue = Vue;
exports.default = vuePaginate;

module.exports = vuePaginate;

},{"./paginate":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _LimitedLinksGenerator = require('./LimitedLinksGenerator');

var _LimitedLinksGenerator2 = _interopRequireDefault(_LimitedLinksGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Each instance contains these state variables:
 *
 * list: {
 *   perPage: 0,
 *   numberOfPages: 0,
 *   currentPage: 0,
 *   initial: 0 // the initial page number in limited links
 * }
 *
 * listName: ''
 *
 * originalList: {} // The initial list (before it's sliced)
 */
exports.default = {
  twoWay: true,

  params: ['limit'],

  bind: function bind() {
    var _this = this;

    // Turn off warnings (because we're using vm.$set).
    _index.Vue.config.silent = true;

    var vm = this.vm;
    this.listName = this.expression;
    var perPage = +this.arg;
    var limit = +this.params.limit;

    if (!vm[this.listName]) {
      throw new Error('[vue-paginate] the list name "' + this.listName + '" is not defined in your vm instance.');
    }

    this.originalList = vm[this.listName];

    // Set the full version on the vm
    vm.$set('full' + _utils2.default.capitalize(this.listName), this.originalList);

    // Update the original list when the user changes the full list.
    vm.$watch('full' + _utils2.default.capitalize(this.listName), function (newVal, oldVal) {
      _this.originalList = newVal;
      vm['refresh' + _utils2.default.capitalize(_this.listName) + 'Page']();
    });

    this.list = { currentPage: 0, initial: 0, perPage: perPage };

    // Set links array.
    this.setNumberOfPages(this.originalList.length);

    // Set links array for limited navs (if used).
    this.setLimitedPages(limit);

    // To check if the number of links in the nav is sufficient to be displayed.
    vm.$set('has' + _utils2.default.capitalize(this.listName) + 'Links', this.list.numberOfPages > 1);

    vm['change' + _utils2.default.capitalize(this.listName) + 'Page'] = function (page) {
      // Reset the list with original data for two reasons:
      // 1. To change it, so the update hook gets triggered.
      // 2. To slice it with new positions from the beginning.
      vm[_this.listName] = _this.originalList;

      _this.list.currentPage = typeof page == 'number' ? page - 1 : page;

      _this.setLimitedPages(limit);
    };

    // Another way to navigate pages (Next & Prev)
    vm['next' + _utils2.default.capitalize(this.listName) + 'Page'] = function () {
      vm[_this.listName] = _this.originalList;

      _this.list.currentPage = _this.list.currentPage + 1 < _this.list.numberOfPages ? _this.list.currentPage + 1 : _this.list.currentPage;
    };

    vm['prev' + _utils2.default.capitalize(this.listName) + 'Page'] = function () {
      vm[_this.listName] = _this.originalList;

      _this.list.currentPage = _this.list.currentPage - 1 > 0 ? _this.list.currentPage - 1 : 0;
    };

    vm['refresh' + _utils2.default.capitalize(this.listName) + 'Page'] = function () {
      vm['change' + _utils2.default.capitalize(_this.listName) + 'Page'](0);
    };

    // Turn on warnings back
    _index.Vue.config.silent = false;
  },
  update: function update(list) {
    // Refresh number of pages (useful in case you're filtering the list)
    this.setNumberOfPages(list.length);

    this.list.currentPage = this.list.currentPage >= this.list.numberOfPages ? this.list.numberOfPages - 1 : this.list.currentPage;

    // Apply the current page from the list state to the vm.
    this.setCurrentPage();

    var index = this.list.currentPage * this.list.perPage;

    this.set(list.slice(index, index + this.list.perPage));
  },
  setNumberOfPages: function setNumberOfPages(length) {
    var numberOfItems = length;
    this.list.numberOfPages = Math.ceil(numberOfItems / this.list.perPage);

    var links = _utils2.default.generateLinksArray(1, this.list.numberOfPages);

    this.vm.$set(this.listName + 'Links', links);
  },
  setCurrentPage: function setCurrentPage() {
    _index.Vue.config.silent = true;
    this.vm.$set('current' + _utils2.default.capitalize(this.listName) + 'Page', this.list.currentPage + 1);
    this.vm.$set('has' + _utils2.default.capitalize(this.listName) + 'Links', this.list.numberOfPages > 1);
    _index.Vue.config.silent = false;
  },
  setLimitedPages: function setLimitedPages(limit) {
    var links = new _LimitedLinksGenerator2.default(this.vm, this.list, this.listName).generate(limit);

    this.vm.$set('limited' + _utils2.default.capitalize(this.listName) + 'Links', links);
  }
};

},{"./LimitedLinksGenerator":1,"./index":2,"./utils":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  capitalize: function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },


  generateLinksArray: function generateLinksArray(initial, max) {
    var limit = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    var links = [];

    for (var i = initial; i <= max; i++) {
      links.push(i);

      if (limit && links.length >= limit) break;
    }

    return links;
  }
};

},{}]},{},[2]);
