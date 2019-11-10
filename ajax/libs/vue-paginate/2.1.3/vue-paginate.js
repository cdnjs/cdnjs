/*!
 * vue-paginate v2.1.2
 * (c) 2016 Taha Shashtari
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VuePaginate = global.VuePaginate || {})));
}(this, function (exports) { 'use strict';

  var utils = {
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

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var RIGHT_ARROW = '»';
  var LEFT_ARROW = '«';
  var ELIPSES = '…';

  var LimitedLinksGenerator = function () {
    function LimitedLinksGenerator(vm, list, listName) {
      classCallCheck(this, LimitedLinksGenerator);

      this.vm = vm;
      this.list = list;
      this.listName = listName;
    }

    createClass(LimitedLinksGenerator, [{
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
        links = links.concat(utils.generateLinksArray(this.list.initial + 2, this.list.numberOfPages, this.limit - 1));

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
        return [].concat(toConsumableArray(new Set(links)));
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
          this.vm['change' + utils.capitalize(this.listName) + 'Page'](this.list.initial + 1);
        } else {
          this.list.currentPage = this.list.numberOfPages;
          this.vm['change' + utils.capitalize(this.listName) + 'Page'](this.list.currentPage);
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
          this.vm['change' + utils.capitalize(this.listName) + 'Page'](this.list.initial + this.limit);
        } else {
          this.list.currentPage = this.list.initial;
          this.vm['change' + utils.capitalize(this.listName) + 'Page'](this.list.currentPage + 1);
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

          this.vm['change' + utils.capitalize(this.listName) + 'Page'](this.list.currentPage + 1);
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
        var numberOfNavs = ~~(this.list.numberOfPages / this.limit);
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
  var paginate = {
    twoWay: true,

    params: ['limit'],

    bind: function bind() {
      var _this = this;

      // Turn off warnings (because we're using vm.$set).
      exports.Vue.config.silent = true;

      var vm = this.vm;
      this.listName = this.expression;
      var perPage = this.getPerPage();
      var limit = +this.params.limit;

      if (!vm[this.listName]) {
        throw new Error('[vue-paginate] the list name "' + this.listName + '" is not defined in your vm instance.');
      }

      this.originalList = vm[this.listName];

      // Set the full version on the vm
      vm.$set('full' + utils.capitalize(this.listName), this.originalList);

      // Update the original list when the user changes the full list.
      vm.$watch('full' + utils.capitalize(this.listName), function (newVal, oldVal) {
        _this.originalList = newVal;
        _this.setNumberOfPages(_this.originalList.length);
        vm['refresh' + utils.capitalize(_this.listName) + 'Page']();
      });

      if (this.isPerPageDynamic()) {
        vm.$watch(this.arg, function (newVal) {
          _this.list.perPage = +newVal <= 0 ? 1 : +newVal;
          vm['refresh' + utils.capitalize(_this.listName) + 'Page']();
        });
      }

      this.list = { currentPage: 0, initial: 0, perPage: perPage };

      // Set links array.
      this.setNumberOfPages(this.originalList.length);

      // Set links array for limited navs (if used).
      this.setLimitedPages(limit);

      // To check if the number of links in the nav is sufficient to be displayed.
      vm.$set('has' + utils.capitalize(this.listName) + 'Links', this.list.numberOfPages > 1);

      vm['change' + utils.capitalize(this.listName) + 'Page'] = function (page) {
        // Reset the list with original data for two reasons:
        // 1. To change it, so the update hook gets triggered.
        // 2. To slice it with new positions from the beginning.
        vm[_this.listName] = _this.originalList;

        _this.list.currentPage = typeof page == 'number' ? page - 1 : page;

        _this.setLimitedPages(limit);
      };

      // Another way to navigate pages (Next & Prev)
      vm['next' + utils.capitalize(this.listName) + 'Page'] = function () {
        vm[_this.listName] = _this.originalList;

        _this.list.currentPage = _this.list.currentPage + 1 < _this.list.numberOfPages ? _this.list.currentPage + 1 : _this.list.currentPage;
      };

      vm['prev' + utils.capitalize(this.listName) + 'Page'] = function () {
        vm[_this.listName] = _this.originalList;

        _this.list.currentPage = _this.list.currentPage - 1 > 0 ? _this.list.currentPage - 1 : 0;
      };

      vm['refresh' + utils.capitalize(this.listName) + 'Page'] = function () {
        vm['change' + utils.capitalize(_this.listName) + 'Page'](1);
      };

      // Turn on warnings back
      exports.Vue.config.silent = false;
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

      var links = utils.generateLinksArray(1, this.list.numberOfPages);

      this.vm.$set(this.listName + 'Links', links);
    },
    setCurrentPage: function setCurrentPage() {
      exports.Vue.config.silent = true;
      this.vm.$set('current' + utils.capitalize(this.listName) + 'Page', this.list.currentPage + 1);
      this.vm.$set('has' + utils.capitalize(this.listName) + 'Links', this.list.numberOfPages > 1);
      exports.Vue.config.silent = false;
    },
    setLimitedPages: function setLimitedPages(limit) {
      var links = new LimitedLinksGenerator(this.vm, this.list, this.listName).generate(limit);

      this.vm.$set('limited' + utils.capitalize(this.listName) + 'Links', links);
    },
    getPerPage: function getPerPage() {
      var vm = this.vm;
      var arg = this.arg;
      var regex = new RegExp(arg, 'i');

      if (!this.isPerPageDynamic()) {
        return +arg;
      }

      if (isDynamicPerPageValid()) {
        this.arg = getDynamicArg();
        return +vm[this.arg];
      }

      return 1;

      function getDynamicArg() {
        return Object.keys(vm.$data).find(function (a) {
          return a.match(regex);
        });
      }
      function isDynamicPerPageValid() {
        return +vm[getDynamicArg()] > 0;
      }
    },
    isPerPageDynamic: function isPerPageDynamic() {
      return !Number.isInteger(Number.parseInt(this.arg));
    }
  };

  exports.Vue = {};
  var vuePaginate = {};

  vuePaginate.install = function (vue) {
    exports.Vue = vue;
    exports.Vue.directive('paginate', paginate);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vuePaginate);
  }

  module.exports = vuePaginate;

  exports['default'] = vuePaginate;

  Object.defineProperty(exports, '__esModule', { value: true });

}));