/**
 * angular-data-table - AngularJS data table directive written in ES6.
 * @version v0.3.9
 * @link http://swimlane.com/
 * @license 
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("DataTable", ["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.DataTable = mod.exports;
  }
})(this, function (exports, module) {
  "use strict";

  (function () {
    function polyfill(fnName) {
      if (!Array.prototype[fnName]) {
        Array.prototype[fnName] = function (predicate) {
          var i,
              len,
              test,
              thisArg = arguments[1];

          if (typeof predicate !== "function") {
            throw new TypeError();
          }

          test = !thisArg ? predicate : function () {
            return predicate.apply(thisArg, arguments);
          };

          for (i = 0, len = this.length; i < len; i++) {
            if (test(this[i], i, this) === true) {
              return fnName === "find" ? this[i] : i;
            }
          }

          if (fnName !== "find") {
            return -1;
          }
        };
      }
    }

    for (var i in {
      find: 1,
      findIndex: 1
    }) {
      polyfill(i);
    }
  })();

  function PagerDirective() {
    return {
      restrict: 'E',
      controller: 'PagerController',
      controllerAs: 'pager',
      scope: true,
      bindToController: {
        page: '=',
        size: '=',
        count: '=',
        onPage: '&'
      },
      template: "<div class=\"dt-pager\">\n        <ul class=\"pager\">\n          <li ng-class=\"{ disabled: !pager.canPrevious() }\">\n            <a href ng-click=\"pager.selectPage(1)\" class=\"icon-left\"></a>\n          </li>\n          <li ng-repeat=\"pg in pager.pages track by $index\" ng-class=\"{ active: pg.active }\">\n            <a href ng-click=\"pager.selectPage(pg.number)\">{{pg.text}}</a>\n          </li>\n          <li ng-class=\"{ disabled: !pager.canNext() }\">\n            <a href ng-click=\"pager.selectPage(pager.totalPages)\" class=\"icon-right\"></a>\n          </li>\n        </ul>\n      </div>",
      replace: true
    };
  }

  var PagerController = (function () {
    function PagerController($scope) {
      var _this = this;

      babelHelpers.classCallCheck(this, PagerController);

      $scope.$watch('pager.count', function (newVal) {
        _this.calcTotalPages(_this.size, _this.count);
        _this.getPages(_this.page || 1);
      });

      $scope.$watch('pager.page', function (newVal) {
        if (newVal !== 0 && newVal <= _this.totalPages) {
          _this.getPages(newVal);
        }
      });

      this.getPages(this.page || 1);
    }
    PagerController.$inject = ["$scope"];

    babelHelpers.createClass(PagerController, [{
      key: "calcTotalPages",
      value: function calcTotalPages(size, count) {
        var count = size < 1 ? 1 : Math.ceil(count / size);
        this.totalPages = Math.max(count || 0, 1);
      }
    }, {
      key: "selectPage",
      value: function selectPage(num) {
        if (num > 0 && num <= this.totalPages) {
          this.page = num;
          this.onPage({
            page: num
          });
        }
      }
    }, {
      key: "canPrevious",
      value: function canPrevious() {
        return this.page !== 1;
      }
    }, {
      key: "canNext",
      value: function canNext() {
        return this.page <= this.totalPages;
      }
    }, {
      key: "getPages",
      value: function getPages(page) {
        var pages = [],
            startPage = 1,
            endPage = this.totalPages,
            maxSize = 5,
            isMaxSized = maxSize < this.totalPages;

        if (isMaxSized) {
          startPage = (Math.ceil(page / maxSize) - 1) * maxSize + 1;
          endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }

        for (var number = startPage; number <= endPage; number++) {
          pages.push({
            number: number,
            text: number,
            active: number === page
          });
        }

        if (isMaxSized) {
          if (startPage > 1) {
            pages.unshift({
              number: startPage - 1,
              text: '...'
            });
          }

          if (endPage < this.totalPages) {
            pages.push({
              number: endPage + 1,
              text: '...'
            });
          }
        }

        this.pages = pages;
      }
    }]);
    return PagerController;
  })();

  function FooterDirective() {
    return {
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'footer',
      scope: true,
      bindToController: {
        paging: '=',
        onPage: '&'
      },
      template: "<div class=\"dt-footer\">\n        <div class=\"page-count\">{{footer.paging.count}} total</div>\n        <dt-pager page=\"footer.page\"\n               size=\"footer.paging.size\"\n               count=\"footer.paging.count\"\n               on-page=\"footer.onPaged(page)\"\n               ng-show=\"footer.paging.count > 1\">\n         </dt-pager>\n      </div>",
      replace: true
    };
  }

  var FooterController = (function () {
    function FooterController($scope) {
      var _this2 = this;

      babelHelpers.classCallCheck(this, FooterController);

      this.page = this.paging.offset + 1;
      $scope.$watch('footer.paging.offset', function (newVal) {
        _this2.offsetChanged(newVal);
      });
    }
    FooterController.$inject = ["$scope"];

    babelHelpers.createClass(FooterController, [{
      key: "offsetChanged",
      value: function offsetChanged(newVal) {
        this.page = newVal + 1;
      }
    }, {
      key: "onPaged",
      value: function onPaged(page) {
        this.paging.offset = page - 1;
        this.onPage({
          offset: this.paging.offset,
          size: this.paging.size
        });
      }
    }]);
    return FooterController;
  })();

  function CellDirective($rootScope, $compile, $log, $timeout) {
    return {
      restrict: 'E',
      controller: 'CellController',
      scope: true,
      controllerAs: 'cell',
      bindToController: {
        options: '=',
        value: '=',
        selected: '=',
        column: '=',
        row: '=',
        expanded: '=',
        hasChildren: '=',
        onTreeToggle: '&',
        onCheckboxChange: '&'
      },
      template: "<div class=\"dt-cell\" \n            data-title=\"{{::cell.column.name}}\" \n            ng-style=\"cell.styles()\"\n            ng-class=\"cell.cellClass()\">\n        <label ng-if=\"cell.column.isCheckboxColumn\" class=\"dt-checkbox\">\n          <input type=\"checkbox\" \n                 ng-checked=\"cell.selected\"\n                 ng-click=\"cell.onCheckboxChanged($event)\" />\n        </label>\n        <span ng-if=\"cell.column.isTreeColumn && cell.hasChildren\"\n              ng-class=\"cell.treeClass()\"\n              ng-click=\"cell.onTreeToggled($event)\"></span>\n        <span class=\"dt-cell-content\"></span>\n      </div>",
      replace: true,
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var content = angular.element($elm[0].querySelector('.dt-cell-content')),
                cellScope;

            if (ctrl.column.template || ctrl.column.cellRenderer) {
              cellScope = ctrl.options.$outer.$new(false);
              cellScope.getValue = ctrl.getValue;
            }

            $scope.$watch('cell.value', function () {
              content.empty();

              if (cellScope) {
                cellScope.$cell = ctrl.value;
                cellScope.$row = ctrl.row;
              }

              if (ctrl.column.template) {
                var elm = angular.element("<span>" + ctrl.column.template.trim() + "</span>");
                content.append($compile(elm)(cellScope));
              } else if (ctrl.column.cellRenderer) {
                var elm = angular.element(ctrl.column.cellRenderer(cellScope, content));
                content.append($compile(elm)(cellScope));
              } else {
                content[0].innerHTML = ctrl.getValue();
              }
            });
          }
        };
      }
    };
  }
  CellDirective.$inject = ["$rootScope", "$compile", "$log", "$timeout"];

  var CellController = (function () {
    function CellController() {
      babelHelpers.classCallCheck(this, CellController);
    }

    babelHelpers.createClass(CellController, [{
      key: "styles",
      value: function styles() {
        return {
          width: this.column.width + 'px'
        };
      }
    }, {
      key: "cellClass",
      value: function cellClass() {
        var style = {
          'dt-tree-col': this.column.isTreeColumn
        };

        if (this.column.className) {
          style[this.column.className] = true;
        }

        return style;
      }
    }, {
      key: "treeClass",
      value: function treeClass() {
        return {
          'dt-tree-toggle': true,
          'icon-right': !this.expanded,
          'icon-down': this.expanded
        };
      }
    }, {
      key: "onTreeToggled",
      value: function onTreeToggled(evt) {
        evt.stopPropagation();
        this.expanded = !this.expanded;
        this.onTreeToggle({
          cell: {
            value: this.value,
            column: this.column,
            expanded: this.expanded
          }
        });
      }
    }, {
      key: "onCheckboxChanged",
      value: function onCheckboxChanged(event) {
        event.stopPropagation();
        this.onCheckboxChange();
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var val = this.column.cellDataGetter ? this.column.cellDataGetter(this.value) : this.value;

        if (val === undefined || val === null) val = '';

        return val;
      }
    }]);
    return CellController;
  })();

  var cache = {},
      testStyle = document.createElement('div').style;

  var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1],
        dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();

  function CamelCase(str) {
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");

    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');

    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();

    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
      return b.trim() + c.toUpperCase();
    });
    return str;
  }

  function GetVendorPrefixedName(property) {
    var name = CamelCase(property);
    if (!cache[name]) {
      if (testStyle[prefix.css + property] !== undefined) {
        cache[name] = prefix.css + property;
      } else if (testStyle[property] !== undefined) {
        cache[name] = property;
      }
    }
    return cache[name];
  }

  var transform = GetVendorPrefixedName('transform'),
      backfaceVisibility = GetVendorPrefixedName('backfaceVisibility'),
      hasCSSTransforms = !!GetVendorPrefixedName('transform'),
      hasCSS3DTransforms = !!GetVendorPrefixedName('perspective'),
      ua = window.navigator.userAgent,
      isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);

  function TranslateXY(styles, x, y) {
    if (hasCSSTransforms) {
      if (!isSafari && hasCSS3DTransforms) {
        styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
        styles[backfaceVisibility] = 'hidden';
      } else {
        styles[transform] = "translate(" + x + "px, " + y + "px, 0)";
      }
    } else {
      styles.top = y + 'px';
      styles.left = x + 'px';
    }
  }

  function GroupRowDirective() {
    return {
      restrict: 'E',
      controller: 'GroupRowController',
      controllerAs: 'group',
      bindToController: {
        row: '=',
        onGroupToggle: '&',
        expanded: '=',
        options: '='
      },
      scope: true,
      replace: true,
      template: "\n      <div class=\"dt-group-row\">\n        <span ng-class=\"group.treeClass()\"\n              ng-click=\"group.onGroupToggled($event)\">\n        </span>\n        <span class=\"dt-group-row-label\" ng-bind=\"group.row.name\">\n        </span>\n      </div>",
      link: function link($scope, $elm, $attrs, ctrl) {
        TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);

        ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
      }
    };
  }

  var GroupRowController = (function () {
    function GroupRowController() {
      babelHelpers.classCallCheck(this, GroupRowController);
    }

    babelHelpers.createClass(GroupRowController, [{
      key: "onGroupToggled",
      value: function onGroupToggled(evt) {
        evt.stopPropagation();
        this.onGroupToggle({
          group: this.row
        });
      }
    }, {
      key: "treeClass",
      value: function treeClass() {
        return {
          'dt-tree-toggle': true,
          'icon-right': !this.expanded,
          'icon-down': this.expanded
        };
      }
    }]);
    return GroupRowController;
  })();

  function RowDirective() {
    return {
      restrict: 'E',
      controller: 'RowController',
      controllerAs: 'rowCtrl',
      scope: true,
      bindToController: {
        row: '=',
        columns: '=',
        columnWidths: '=',
        expanded: '=',
        selected: '=',
        hasChildren: '=',
        options: '=',
        onCheckboxChange: '&',
        onTreeToggle: '&'
      },
      link: function link($scope, $elm, $attrs, ctrl) {
        if (ctrl.row) {
          TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);
        }

        ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
      },
      template: "\n      <div class=\"dt-row\">\n        <div class=\"dt-row-left dt-row-block\" \n             ng-if=\"rowCtrl.columns['left'].length\"\n             ng-style=\"rowCtrl.stylesByGroup('left')\">\n          <dt-cell ng-repeat=\"column in rowCtrl.columns['left'] track by column.$id\"\n                   on-tree-toggle=\"rowCtrl.onTreeToggled(cell)\"\n                   column=\"column\"\n                   options=\"rowCtrl.options\"\n                   has-children=\"rowCtrl.hasChildren\"\n                   on-checkbox-change=\"rowCtrl.onCheckboxChanged()\"\n                   selected=\"rowCtrl.selected\"\n                   expanded=\"rowCtrl.expanded\"\n                   row=\"rowCtrl.row\"\n                   value=\"rowCtrl.getValue(column)\">\n          </dt-cell>\n        </div>\n        <div class=\"dt-row-center dt-row-block\" \n             ng-style=\"rowCtrl.stylesByGroup('center')\">\n          <dt-cell ng-repeat=\"column in rowCtrl.columns['center'] track by column.$id\"\n                   on-tree-toggle=\"rowCtrl.onTreeToggled(cell)\"\n                   column=\"column\"\n                   options=\"rowCtrl.options\"\n                   has-children=\"rowCtrl.hasChildren\"\n                   expanded=\"rowCtrl.expanded\"\n                   selected=\"rowCtrl.selected\"\n                   row=\"rowCtrl.row\"\n                   on-checkbox-change=\"rowCtrl.onCheckboxChanged()\"\n                   value=\"rowCtrl.getValue(column)\">\n          </dt-cell>\n        </div>\n        <div class=\"dt-row-right dt-row-block\" \n             ng-if=\"rowCtrl.columns['right'].length\"\n             ng-style=\"rowCtrl.stylesByGroup('right')\">\n          <dt-cell ng-repeat=\"column in rowCtrl.columns['right'] track by column.$id\"\n                   on-tree-toggle=\"rowCtrl.onTreeToggled(cell)\"\n                   column=\"column\"\n                   options=\"rowCtrl.options\"\n                   has-children=\"rowCtrl.hasChildren\"\n                   selected=\"rowCtrl.selected\"\n                   on-checkbox-change=\"rowCtrl.onCheckboxChanged()\"\n                   row=\"rowCtrl.row\"\n                   expanded=\"rowCtrl.expanded\"\n                   value=\"rowCtrl.getValue(column)\">\n          </dt-cell>\n        </div>\n      </div>",
      replace: true
    };
  }

  function DeepValueGetter(obj, path) {
    if (!obj || !path) return obj;

    var current = obj,
        split = path.split('.');

    if (split.length) {
      for (var i = 0, len = split.length; i < len; i++) {
        current = current[split[i]];
      }
    }

    return current;
  }

  var RowController = (function () {
    function RowController() {
      babelHelpers.classCallCheck(this, RowController);
    }

    babelHelpers.createClass(RowController, [{
      key: "getValue",
      value: function getValue(col) {
        if (!col.prop) return '';
        return DeepValueGetter(this.row, col.prop);
      }
    }, {
      key: "onTreeToggled",
      value: function onTreeToggled(cell) {
        this.onTreeToggle({
          cell: cell,
          row: this.row
        });
      }
    }, {
      key: "stylesByGroup",
      value: function stylesByGroup(group) {
        var styles = {
          width: this.columnWidths[group] + 'px'
        };

        if (group === 'left') {
          TranslateXY(styles, this.options.internal.offsetX, 0);
        } else if (group === 'right') {
          var offset = (this.columnWidths.total - this.options.internal.innerWidth - this.options.internal.offsetX + this.options.internal.scrollBarWidth) * -1;
          TranslateXY(styles, offset, 0);
        }

        return styles;
      }
    }, {
      key: "onCheckboxChanged",
      value: function onCheckboxChanged() {
        this.onCheckboxChange({
          row: this.row
        });
      }
    }]);
    return RowController;
  })();

  var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  var StyleTranslator = (function () {
    function StyleTranslator(height) {
      babelHelpers.classCallCheck(this, StyleTranslator);

      this.height = height;
      this.map = new Map();
    }

    babelHelpers.createClass(StyleTranslator, [{
      key: "update",
      value: function update(rows) {
        var n = 0;
        while (n <= this.map.size) {
          var dom = this.map.get(n);
          var model = rows[n];
          if (dom && model) {
            TranslateXY(dom[0].style, 0, model.$$index * this.height);
          }
          n++;
        }
      }
    }, {
      key: "register",
      value: function register(idx, dom) {
        this.map.set(idx, dom);
      }
    }]);
    return StyleTranslator;
  })();

  var ScrollHelper = (function () {
    function ScrollHelper(elm) {
      babelHelpers.classCallCheck(this, ScrollHelper);

      this._elm = elm;
    }

    babelHelpers.createClass(ScrollHelper, [{
      key: "setYOffset",
      value: function setYOffset(offsetY) {
        this._elm[0].scrollTop = offsetY;
      }
    }]);
    return ScrollHelper;
  })();

  function ScrollerDirective($timeout) {
    return {
      restrict: 'E',
      require: '^dtBody',
      transclude: true,
      replace: true,
      template: "<div ng-style=\"scrollerStyles()\" ng-transclude></div>",
      link: function link($scope, $elm, $attrs, ctrl) {
        var ticking = false,
            lastScrollY = 0,
            lastScrollX = 0;

        ctrl.options.internal.scrollHelper = new ScrollHelper($elm.parent());

        ctrl.options.internal.styleTranslator = new StyleTranslator(ctrl.options.rowHeight);

        function update() {
          $timeout(function () {
            ctrl.options.internal.offsetY = lastScrollY;
            ctrl.options.internal.offsetX = lastScrollX;
            ctrl.updatePage();

            if (ctrl.options.scrollbarV) {
              var rows = ctrl.getRows();
              ctrl.options.internal.styleTranslator.update(rows);
              $elm.removeClass('dt-scrolling');
            }
          });

          ticking = false;
        };

        function requestTick() {
          if (!ticking) {
            requestAnimFrame(update);
            ticking = true;
          }
        };

        $elm.parent().on('scroll', function (ev) {
          lastScrollY = this.scrollTop;
          lastScrollX = this.scrollLeft;
          $elm.addClass('dt-scrolling');
          requestTick();
        });

        $scope.scrollerStyles = function (scope) {
          return {
            height: ctrl.count * ctrl.options.rowHeight + 'px'
          };
        };
      }
    };
  }
  ScrollerDirective.$inject = ["$timeout"];

  function BodyDirective($timeout) {
    return {
      restrict: 'E',
      controller: 'BodyController',
      controllerAs: 'body',
      bindToController: {
        columns: '=',
        columnWidths: '=',
        rows: '=',
        options: '=',
        selected: '=?',
        expanded: '=?',
        onPage: '&',
        onTreeToggle: '&',
        onSelect: '&',
        onRowClick: '&'
      },
      scope: true,
      template: "\n      <div class=\"dt-body\" ng-style=\"body.styles()\">\n        <dt-scroller class=\"dt-body-scroller\">\n          <dt-group-row ng-repeat-start=\"r in body.tempRows track by $index\"\n                        ng-if=\"r.group\"\n                        ng-style=\"body.groupRowStyles(r)\" \n                        options=\"body.options\"\n                        on-group-toggle=\"body.onGroupToggle(group)\"\n                        expanded=\"body.getRowExpanded(r)\"\n                        tabindex=\"{{$index}}\"\n                        row=\"r\">\n          </dt-group-row>\n          <dt-row ng-repeat-end\n                  ng-if=\"!r.group\"\n                  row=\"body.getRowValue($index)\"\n                  tabindex=\"{{$index}}\"\n                  columns=\"body.columns\"\n                  column-widths=\"body.columnWidths\"\n                  ng-keydown=\"body.keyDown($event, $index, r)\"\n                  ng-click=\"body.rowClicked($event, $index, r)\"\n                  on-tree-toggle=\"body.onTreeToggled(row, cell)\"\n                  ng-class=\"body.rowClasses(r)\"\n                  options=\"body.options\"\n                  selected=\"body.isSelected(r)\"\n                  on-checkbox-change=\"body.onCheckboxChange($index, row)\"\n                  columns=\"body.columnsByPin\"\n                  has-children=\"body.getRowHasChildren(r)\"\n                  expanded=\"body.getRowExpanded(r)\"\n                  ng-style=\"body.rowStyles(r)\">\n          </dt-row>\n        </dt-scroller>\n        <div ng-if=\"body.rows && !body.rows.length\" \n             class=\"empty-row\" \n             ng-bind=\"::body.options.emptyMessage\">\n       </div>\n       <div ng-if=\"body.rows === undefined\" \n             class=\"loading-row\"\n             ng-bind=\"::body.options.loadingMessage\">\n        </div>\n      </div>"
    };
  }
  BodyDirective.$inject = ["$timeout"];

  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    COMMA: 188,
    PERIOD: 190,
    A: 65,
    Z: 90,
    ZERO: 48,
    NUMPAD_0: 96,
    NUMPAD_9: 105
  };

  var BodyController = (function () {
    function BodyController($scope, $timeout) {
      var _this3 = this;

      babelHelpers.classCallCheck(this, BodyController);

      this.$scope = $scope;
      this.tempRows = [];

      this.treeColumn = this.options.columns.find(function (c) {
        return c.isTreeColumn;
      });

      this.groupColumn = this.options.columns.find(function (c) {
        return c.group;
      });

      $scope.$watchCollection('body.rows', function (newVal, oldVal) {
        if (newVal) {
          if (!_this3.options.paging.externalPaging) {
            _this3.options.paging.count = newVal.length;
          }

          _this3.count = _this3.options.paging.count;

          if (_this3.treeColumn || _this3.groupColumn) {
            _this3.buildRowsByGroup();
          }

          if (_this3.options.scrollbarV) {
            var refresh = newVal && oldVal && (newVal.length === oldVal.length || newVal.length < oldVal.length);

            _this3.getRows(refresh);
          } else {
            var _tempRows;

            var rows = _this3.rows;
            if (_this3.treeColumn) {
              rows = _this3.buildTree();
            } else if (_this3.groupColumn) {
              rows = _this3.buildGroups();
            }
            _this3.tempRows.splice(0, _this3.tempRows.length);
            (_tempRows = _this3.tempRows).push.apply(_tempRows, babelHelpers.toConsumableArray(rows));
          }
        }
      });

      if (this.options.scrollbarV) {
        var sized = false;
        $scope.$watch('body.options.paging.size', function (newVal, oldVal) {
          if (!sized || newVal > oldVal) {
            _this3.getRows();
            sized = true;
          }
        });

        $scope.$watch('body.options.paging.count', function (count) {
          _this3.count = count;
          _this3.updatePage();
        });

        $scope.$watch('body.options.paging.offset', function (newVal) {
          if (_this3.options.paging.size) {
            _this3.onPage({
              offset: newVal,
              size: _this3.options.paging.size
            });
          }
        });
      }
    }
    BodyController.$inject = ["$scope", "$timeout"];

    babelHelpers.createClass(BodyController, [{
      key: "getFirstLastIndexes",
      value: function getFirstLastIndexes() {
        var firstRowIndex = Math.max(Math.floor((this.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0),
            endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);

        if (!this.options.scrollbarV) endIndex = this.count;

        return {
          first: firstRowIndex,
          last: endIndex
        };
      }
    }, {
      key: "updatePage",
      value: function updatePage() {
        var idxs = this.getFirstLastIndexes(),
            curPage = Math.ceil(idxs.first / this.options.paging.size);
        if (!isNaN(curPage)) {
          this.options.paging.offset = curPage;
        }
      }
    }, {
      key: "buildRowsByGroup",
      value: function buildRowsByGroup() {
        this.index = {};
        this.rowsByGroup = {};

        var parentProp = this.treeColumn ? this.treeColumn.relationProp : this.groupColumn.prop;

        for (var i = 0, len = this.rows.length; i < len; i++) {
          var row = this.rows[i];

          var relVal = row[parentProp];
          if (relVal) {
            if (this.rowsByGroup[relVal]) {
              this.rowsByGroup[relVal].push(row);
            } else {
              this.rowsByGroup[relVal] = [row];
            }
          }

          if (this.treeColumn) {
            var prop = this.treeColumn.prop;
            this.index[row[prop]] = row;

            if (row[parentProp] === undefined) {
              row.$$depth = 0;
            } else {
              var parent = this.index[row[parentProp]];
              row.$$depth = parent.$$depth + 1;
              if (parent.$$children) {
                parent.$$children.push(row[prop]);
              } else {
                parent.$$children = [row[prop]];
              }
            }
          }
        }
      }
    }, {
      key: "buildGroups",
      value: function buildGroups() {
        var _this4 = this;

        var temp = [];

        angular.forEach(this.rowsByGroup, function (v, k) {
          temp.push({
            name: k,
            group: true
          });

          if (_this4.expanded[k]) {
            temp.push.apply(temp, babelHelpers.toConsumableArray(v));
          }
        });

        return temp;
      }
    }, {
      key: "buildTree",
      value: function buildTree() {
        var count = 0,
            temp = [];

        for (var i = 0, len = this.rows.length; i < len; i++) {
          var row = this.rows[i],
              relVal = row[this.treeColumn.relationProp],
              keyVal = row[this.treeColumn.prop],
              rows = this.rowsByGroup[keyVal],
              expanded = this.expanded[keyVal];

          if (!relVal) {
            count++;
            temp.push(row);
          }

          if (rows && rows.length) {
            if (expanded) {
              temp.push.apply(temp, babelHelpers.toConsumableArray(rows));
              count = count + rows.length;
            }
          }
        }

        return temp;
      }
    }, {
      key: "getRows",
      value: function getRows(refresh) {
        if ((this.treeColumn || this.groupColumn) && !this.rowsByGroup) {
          return false;
        }

        var temp;

        if (this.treeColumn) {
          temp = this.treeTemp || [];

          if (refresh || !this.treeTemp) {
            this.treeTemp = temp = this.buildTree();
            this.count = temp.length;

            this.tempRows.splice(0, this.tempRows.length);
          }
        } else if (this.groupColumn) {
          temp = this.groupsTemp || [];

          if (refresh || !this.groupsTemp) {
            this.groupsTemp = temp = this.buildGroups();
            this.count = temp.length;
          }
        } else {
          temp = this.rows;
          if (refresh === true) {
            this.tempRows.splice(0, this.tempRows.length);
          }
        }

        var idx = 0,
            indexes = this.getFirstLastIndexes(),
            rowIndex = indexes.first;

        this.tempRows.splice(indexes.first, indexes.last);

        while (rowIndex < indexes.last && rowIndex < this.count) {
          var row = temp[rowIndex];
          if (row) {
            row.$$index = rowIndex;
            this.tempRows[idx] = row;
          }
          idx++;
          rowIndex++;
        }

        return this.tempRows;
      }
    }, {
      key: "styles",
      value: function styles() {
        var styles = {
          width: this.options.internal.innerWidth + 'px'
        };

        if (!this.options.scrollbarV) {
          styles.overflowY = 'hidden';
        } else if (this.options.scrollbarH === false) {
          styles.overflowX = 'hidden';
        }

        if (this.options.scrollbarV) {
          styles.height = this.options.internal.bodyHeight + 'px';
        }

        return styles;
      }
    }, {
      key: "rowStyles",
      value: function rowStyles(row) {
        var styles = {};

        if (this.options.rowHeight === 'auto') {
          styles.height = this.options.rowHeight + 'px';
        }

        return styles;
      }
    }, {
      key: "groupRowStyles",
      value: function groupRowStyles(row) {
        var styles = this.rowStyles(row);
        styles.width = this.columnWidths.total + 'px';
        return styles;
      }
    }, {
      key: "rowClasses",
      value: function rowClasses(row) {
        var styles = {
          'selected': this.isSelected(row)
        };

        if (this.treeColumn) {
          styles['dt-leaf'] = this.rowsByGroup[row[this.treeColumn.relationProp]];

          styles['dt-has-leafs'] = this.rowsByGroup[row[this.treeColumn.prop]];

          styles['dt-depth-' + row.$$depth] = true;
        }

        if (row.$$index % 2 == 0) {
          styles['dt-row-even'] = true;
        } else {
          styles['dt-row-odd'] = true;
        }

        return styles;
      }
    }, {
      key: "isSelected",
      value: function isSelected(row) {
        var selected = false;

        if (this.options.selectable) {
          if (this.options.multiSelect) {
            selected = this.selected.indexOf(row) > -1;
          } else {
            selected = this.selected === row;
          }
        }

        return selected;
      }
    }, {
      key: "keyDown",
      value: function keyDown(ev, index, row) {
        ev.preventDefault();

        if (ev.keyCode === KEYS.DOWN) {
          var next = ev.target.nextElementSibling;
          if (next) {
            next.focus();
          }
        } else if (ev.keyCode === KEYS.UP) {
          var prev = ev.target.previousElementSibling;
          if (prev) {
            prev.focus();
          }
        } else if (ev.keyCode === KEYS.RETURN) {
          this.selectRow(index, row);
        }
      }
    }, {
      key: "rowClicked",
      value: function rowClicked(event, index, row) {
        if (!this.options.checkboxSelection) {
          event.preventDefault();
          this.selectRow(event, index, row);
        }

        this.onRowClick({ row: row });
      }
    }, {
      key: "selectRow",
      value: function selectRow(event, index, row) {
        if (this.options.selectable) {
          if (this.options.multiSelect) {
            var isCtrlKeyDown = event.ctrlKey || event.metaKey,
                isShiftKeyDown = event.shiftKey;

            if (isShiftKeyDown) {
              this.selectRowsBetween(index, row);
            } else {
              var idx = this.selected.indexOf(row);
              if (idx > -1) {
                this.selected.splice(idx, 1);
              } else {
                if (this.options.multiSelectOnShift && this.selected.length === 1) {
                  this.selected.splice(0, 1);
                }
                this.selected.push(row);
                this.onSelect({ rows: [row] });
              }
            }
            this.prevIndex = index;
          } else {
            this.selected = row;
            this.onSelect({ rows: [row] });
          }
        }
      }
    }, {
      key: "selectRowsBetween",
      value: function selectRowsBetween(index) {
        var reverse = index < this.prevIndex,
            selecteds = [];

        for (var i = 0, len = this.tempRows.length; i < len; i++) {
          var row = this.tempRows[i],
              greater = i >= this.prevIndex && i <= index,
              lesser = i <= this.prevIndex && i >= index;

          var range = {};
          if (reverse) {
            range = {
              start: index,
              end: this.prevIndex - index
            };
          } else {
            range = {
              start: this.prevIndex,
              end: index + 1
            };
          }

          if (reverse && lesser || !reverse && greater) {
            var idx = this.selected.indexOf(row);

            if (reverse && idx > -1) {
              this.selected.splice(idx, 1);
              continue;
            }

            if (i >= range.start && i < range.end) {
              if (idx === -1) {
                this.selected.push(row);
                selecteds.push(row);
              }
            }
          }
        }

        this.onSelect({ rows: selecteds });
      }
    }, {
      key: "getRowValue",
      value: function getRowValue(idx) {
        return this.tempRows[idx];
      }
    }, {
      key: "getRowExpanded",
      value: function getRowExpanded(row) {
        if (this.treeColumn) {
          return this.expanded[row[this.treeColumn.prop]];
        } else if (this.groupColumn) {
          return this.expanded[row.name];
        }
      }
    }, {
      key: "getRowHasChildren",
      value: function getRowHasChildren(row) {
        if (!this.treeColumn) return;
        var children = this.rowsByGroup[row[this.treeColumn.prop]];
        return children !== undefined || children && !children.length;
      }
    }, {
      key: "onTreeToggled",
      value: function onTreeToggled(row, cell) {
        var val = row[this.treeColumn.prop];
        this.expanded[val] = !this.expanded[val];

        if (this.options.scrollbarV) {
          this.getRows(true);
        } else {
          var _tempRows2;

          var values = this.buildTree();
          this.tempRows.splice(0, this.tempRows.length);
          (_tempRows2 = this.tempRows).push.apply(_tempRows2, babelHelpers.toConsumableArray(values));
        }

        this.onTreeToggle({
          row: row,
          cell: cell
        });
      }
    }, {
      key: "onCheckboxChange",
      value: function onCheckboxChange(index, row) {
        this.selectRow(index, row);
      }
    }, {
      key: "onGroupToggle",
      value: function onGroupToggle(row) {
        this.expanded[row.name] = !this.expanded[row.name];

        if (this.options.scrollbarV) {
          this.getRows(true);
        } else {
          var _tempRows3;

          var values = this.buildGroups();
          this.tempRows.splice(0, this.tempRows.length);
          (_tempRows3 = this.tempRows).push.apply(_tempRows3, babelHelpers.toConsumableArray(values));
        }
      }
    }]);
    return BodyController;
  })();

  function HeaderCellDirective($compile) {
    return {
      restrict: 'E',
      controller: 'HeaderCellController',
      controllerAs: 'hcell',
      scope: true,
      bindToController: {
        column: '=',
        onCheckboxChange: '&',
        onSort: '&',
        onResize: '&',
        selected: '='
      },
      replace: true,
      template: "<div ng-class=\"hcell.cellClass()\"\n            draggable=\"true\"\n            ng-style=\"hcell.styles()\"\n            title=\"{{::hcell.column.name}}\">\n        <div resizable=\"hcell.column.resizable\" \n             on-resize=\"hcell.onResized(width, hcell.column)\"\n             min-width=\"hcell.column.minWidth\"\n             max-width=\"hcell.column.maxWidth\">\n          <label ng-if=\"hcell.column.isCheckboxColumn && hcell.column.headerCheckbox\" class=\"dt-checkbox\">\n            <input type=\"checkbox\" \n                   ng-checked=\"hcell.selected\"\n                   ng-click=\"hcell.onCheckboxChange()\" />\n          </label>\n          <span class=\"dt-header-cell-label\" \n                ng-click=\"hcell.onSorted()\">\n          </span>\n          <span ng-class=\"hcell.sortClass()\"></span>\n        </div>\n      </div>",
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var label = $elm[0].querySelector('.dt-header-cell-label');

            if (ctrl.column.headerRenderer) {
              var elm = angular.element(ctrl.column.headerRenderer($elm));
              angular.element(label).append($compile(elm)($scope)[0]);
            } else {
              var val = ctrl.column.name;
              if (val === undefined || val === null) val = '';
              label.innerHTML = val;
            }
          }
        };
      }
    };
  }
  HeaderCellDirective.$inject = ["$compile"];

  var HeaderCellController = (function () {
    function HeaderCellController() {
      babelHelpers.classCallCheck(this, HeaderCellController);
    }

    babelHelpers.createClass(HeaderCellController, [{
      key: "styles",
      value: function styles() {
        return {
          width: this.column.width + 'px',
          minWidth: this.column.minWidth + 'px',
          maxWidth: this.column.maxWidth + 'px',
          height: this.column.height + 'px'
        };
      }
    }, {
      key: "cellClass",
      value: function cellClass() {
        var cls = {
          'sortable': this.column.sortable,
          'dt-header-cell': true,
          'resizable': this.column.resizable
        };

        if (this.column.heaerClassName) {
          cls[this.column.headerClassName] = true;
        }

        return cls;
      }
    }, {
      key: "onSorted",
      value: function onSorted() {
        if (this.column.sortable) {
          if (!this.column.sort) {
            this.column.sort = 'asc';
          } else if (this.column.sort === 'asc') {
            this.column.sort = 'desc';
          } else if (this.column.sort === 'desc') {
            this.column.sort = undefined;
          }

          this.onSort({
            column: this.column
          });
        }
      }
    }, {
      key: "sortClass",
      value: function sortClass() {
        return {
          'sort-btn': true,
          'sort-asc icon-down': this.column.sort === 'asc',
          'sort-desc icon-up': this.column.sort === 'desc'
        };
      }
    }, {
      key: "onResized",
      value: function onResized(width, column) {
        this.onResize({
          column: column,
          width: width
        });
      }
    }, {
      key: "onCheckboxChange",
      value: function onCheckboxChange() {
        this.onCheckboxChanged();
      }
    }]);
    return HeaderCellController;
  })();

  function HeaderDirective($timeout) {
    return {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'header',
      scope: true,
      bindToController: {
        options: '=',
        columns: '=',
        columnWidths: '=',
        onSort: '&',
        onResize: '&',
        onCheckboxChange: '&'
      },
      template: "\n      <div class=\"dt-header\" ng-style=\"header.styles()\">\n        <div class=\"dt-header-inner\" ng-style=\"header.innerStyles()\">\n          <div class=\"dt-row-left\"\n               ng-style=\"header.stylesByGroup('left')\"\n               ng-if=\"header.columns['left'].length\"\n               sortable=\"header.options.reorderable\"\n               on-sortable-sort=\"columnsResorted(event, childScope)\">\n            <dt-header-cell ng-repeat=\"column in header.columns['left'] track by column.$id\" \n                            on-checkbox-change=\"header.onCheckboxChanged()\"\n                            on-sort=\"header.onSorted(column)\"\n                            on-resize=\"header.onResized(column, width)\"\n                            selected=\"header.isSelected()\"\n                            column=\"column\">\n            </dt-header-cell>\n          </div>\n          <div class=\"dt-row-center\" \n               sortable=\"header.options.reorderable\"\n               ng-style=\"header.stylesByGroup('center')\"\n               on-sortable-sort=\"columnsResorted(event, childScope)\">\n            <dt-header-cell ng-repeat=\"column in header.columns['center'] track by column.$id\" \n                            on-checkbox-change=\"header.onCheckboxChanged()\"\n                            on-sort=\"header.onSorted(column)\"\n                            selected=\"header.isSelected()\"\n                            on-resize=\"header.onResized(column, width)\"\n                            column=\"column\">\n            </dt-header-cell>\n          </div>\n          <div class=\"dt-row-right\"\n               ng-if=\"header.columns['right'].length\"\n               sortable=\"header.options.reorderable\"\n               ng-style=\"header.stylesByGroup('right')\"\n               on-sortable-sort=\"columnsResorted(event, childScope)\">\n            <dt-header-cell ng-repeat=\"column in header.columns['right'] track by column.$id\" \n                            on-checkbox-change=\"header.onCheckboxChanged()\"\n                            on-sort=\"header.onSorted(column)\"\n                            selected=\"header.isSelected()\"\n                            on-resize=\"header.onResized(column, width)\"\n                            column=\"column\">\n            </dt-header-cell>\n          </div>\n        </div>\n      </div>",
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {

        $scope.columnsResorted = function (event, childScope) {
          var col = childScope.column,
              parent = angular.element(event.currentTarget),
              newIdx = -1;

          angular.forEach(parent.children(), function (c, i) {
            if (childScope === angular.element(c).scope()) {
              newIdx = i;
            }
          });

          $timeout(function () {
            angular.forEach(ctrl.columns, function (group) {
              var idx = group.indexOf(col);
              if (idx > -1) {
                var curColAtIdx = group[newIdx],
                    siblingIdx = ctrl.options.columns.indexOf(curColAtIdx),
                    curIdx = ctrl.options.columns.indexOf(col);

                ctrl.options.columns.splice(curIdx, 1);
                ctrl.options.columns.splice(siblingIdx, 0, col);

                return false;
              }
            });
          });
        };
      }
    };
  }
  HeaderDirective.$inject = ["$timeout"];

  var HeaderController = (function () {
    function HeaderController() {
      babelHelpers.classCallCheck(this, HeaderController);
    }

    babelHelpers.createClass(HeaderController, [{
      key: "styles",
      value: function styles() {
        return {
          width: this.options.internal.innerWidth + 'px',
          height: this.options.headerHeight + 'px'
        };
      }
    }, {
      key: "innerStyles",
      value: function innerStyles() {
        return {
          width: this.columnWidths.total + 'px'
        };
      }
    }, {
      key: "onSorted",
      value: function onSorted(column) {
        this.onSort({
          column: column
        });
      }
    }, {
      key: "stylesByGroup",
      value: function stylesByGroup(group) {
        var styles = {
          width: this.columnWidths[group] + 'px'
        };

        if (group === 'center') {
          TranslateXY(styles, this.options.internal.offsetX * -1, 0);
        } else if (group === 'right') {
          var offset = (this.columnWidths.total - this.options.internal.innerWidth) * -1;
          TranslateXY(styles, offset, 0);
        }

        return styles;
      }
    }, {
      key: "onCheckboxChanged",
      value: function onCheckboxChanged() {
        this.onCheckboxChange();
      }
    }, {
      key: "onResized",
      value: function onResized(column, width) {
        this.onResize({
          column: column,
          width: width
        });
      }
    }]);
    return HeaderController;
  })();

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function later() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function later() {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  }

  function SortableDirective($timeout) {
    return {
      restrict: 'A',
      scope: {
        isSortable: '=sortable',
        onSortableSort: '&'
      },
      link: function link($scope, $element, $attrs) {
        var rootEl = $element[0],
            dragEl,
            nextEl,
            dropEl;

        function isbefore(a, b) {
          if (a.parentNode == b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
              if (cur === b) {
                return true;
              }
            }
          }
          return false;
        };

        function onDragEnter(e) {
          var target = e.target;
          if (isbefore(dragEl, target)) {
            target.parentNode.insertBefore(dragEl, target);
          } else if (target.nextSibling && target.hasAttribute('draggable')) {
            target.parentNode.insertBefore(dragEl, target.nextSibling);
          }
        };

        function onDragEnd(evt) {
          evt.preventDefault();

          dragEl.classList.remove('dt-clone');

          $element.off('dragend', onDragEnd);
          $element.off('dragenter', onDragEnter);

          if (nextEl !== dragEl.nextSibling) {
            $scope.onSortableSort({
              event: evt,
              childScope: angular.element(dragEl).scope()
            });
          }
        };

        function onDragStart(evt) {
          if (!$scope.isSortable) return false;
          evt = evt.originalEvent || evt;

          dragEl = evt.target;
          nextEl = dragEl.nextSibling;
          dragEl.classList.add('dt-clone');

          evt.dataTransfer.effectAllowed = 'move';
          evt.dataTransfer.setData('Text', dragEl.textContent);

          $element.on('dragenter', onDragEnter);
          $element.on('dragend', onDragEnd);
        };

        $element.on('dragstart', onDragStart);

        $scope.$on('$destroy', function () {
          $element.off('dragstart', onDragStart);
        });
      }
    };
  }
  SortableDirective.$inject = ["$timeout"];

  function ResizableDirective($document, debounce, $timeout) {
    return {
      restrict: 'A',
      scope: {
        isResizable: '=resizable',
        minWidth: '=',
        maxWidth: '=',
        onResize: '&'
      },
      link: function link($scope, $element, $attrs) {
        if ($scope.isResizable) {
          $element.addClass('resizable');
        }

        var handle = angular.element("<span class=\"dt-resize-handle\" title=\"Resize\"></span>"),
            parent = $element.parent(),
            prevScreenX;

        handle.on('mousedown', function (event) {
          if (!$element[0].classList.contains('resizable')) {
            return false;
          }

          event.stopPropagation();
          event.preventDefault();

          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          event = event.originalEvent || event;

          var width = parent[0].scrollWidth,
              movementX = event.movementX || event.mozMovementX || event.screenX - prevScreenX,
              newWidth = width + (movementX || 0);

          prevScreenX = event.screenX;

          if ((!$scope.minWidth || newWidth >= $scope.minWidth) && (!$scope.maxWidth || newWidth <= $scope.maxWidth)) {
            parent.css({
              width: newWidth + 'px'
            });
          }
        }

        function mouseup() {
          if ($scope.onResize) {
            $timeout(function () {
              $scope.onResize({ width: parent[0].scrollWidth });
            });
          }

          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }

        $element.append(handle);
      }
    };
  }
  ResizableDirective.$inject = ["$document", "debounce", "$timeout"];

  var ColumnDefaults = {
    frozenLeft: false,

    frozenRight: false,

    className: undefined,

    heaerClassName: undefined,

    flexGrow: 0,

    minWidth: undefined,

    maxWidth: undefined,

    width: 150,

    resizable: true,

    comparator: undefined,

    sortable: true,

    sort: undefined,

    headerRenderer: undefined,

    cellRenderer: undefined,

    cellDataGetter: undefined,

    isTreeColumn: false,

    isCheckboxColumn: false,

    headerCheckbox: false,

    canAutoResize: true

  };

  function DataTableService() {
    return {
      columns: {},

      buildAndSaveColumns: function buildAndSaveColumns(id, columnElms) {
        if (columnElms && columnElms.length) {
          this.columns[id] = this.buildColumns(columnElms);
        }
      },

      buildColumns: function buildColumns(columnElms) {
        var columns = [];

        angular.forEach(columnElms, function (c) {
          var column = {};

          angular.forEach(c.attributes, function (attr) {
            var attrName = CamelCase(attr.name);

            if (ColumnDefaults.hasOwnProperty(attrName)) {
              var val = attr.value;

              if (!isNaN(attr.value)) {
                val = parseInt(attr.value);
              }

              column[attrName] = val;
            }

            if (attrName === 'class') {
              column.className = attr.value;
            }

            if (attrName === 'name' || attrName === 'prop') {
              column[attrName] = attr.value;
            }
          });

          if (c.innerHTML !== '') {
            column.template = c.innerHTML;
          }

          columns.push(column);
        });

        return columns;
      }

    };
  }

  function ScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";

    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

  function DataTableDirective($window, $timeout, throttle, DataTableService) {
    return {
      restrict: 'E',
      replace: true,
      controller: 'DataTableController',
      scope: true,
      bindToController: {
        options: '=',
        rows: '=',
        selected: '=?',
        expanded: '=?',
        onSelect: '&',
        onSort: '&',
        onTreeToggle: '&',
        onPage: '&',
        onRowClick: '&'
      },
      controllerAs: 'dt',
      template: function template(element) {
        var columns = element[0].getElementsByTagName('column'),
            id = ObjectId();
        DataTableService.buildAndSaveColumns(id, columns);

        return "<div class=\"dt\" ng-class=\"dt.tableCss()\" data-column-id=\"" + id + "\">\n          <dt-header options=\"dt.options\"\n                     on-checkbox-change=\"dt.onHeaderCheckboxChange()\"\n                     columns=\"dt.columnsByPin\"\n                     column-widths=\"dt.columnWidths\"\n                     ng-if=\"dt.options.headerHeight\"\n                     on-resize=\"dt.onResize(column, width)\"\n                     selected=\"dt.isAllRowsSelected()\"\n                     on-sort=\"dt.onSorted()\">\n          </dt-header>\n          <dt-body rows=\"dt.rows\"\n                   selected=\"dt.selected\"\n                   expanded=\"dt.expanded\"\n                   columns=\"dt.columnsByPin\"\n                   on-select=\"dt.onSelected(rows)\"\n                   on-row-click=\"dt.onRowClicked(row)\"\n                   column-widths=\"dt.columnWidths\"\n                   options=\"dt.options\"\n                   on-page=\"dt.onBodyPage(offset, size)\"\n                   on-tree-toggle=\"dt.onTreeToggled(row, cell)\">\n           </dt-body>\n          <dt-footer ng-if=\"dt.options.footerHeight\"\n                     ng-style=\"{ height: dt.options.footerHeight + 'px' }\"\n                     on-page=\"dt.onFooterPage(offset, size)\"\n                     paging=\"dt.options.paging\">\n           </dt-footer>\n        </div>";
      },
      compile: function compile(tElem, tAttrs) {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var id = $elm.attr('data-column-id'),
                columns = DataTableService.columns[id];
            if (columns) {
              ctrl.options.columns = columns;
            }

            ctrl.transposeColumnDefaults();
            ctrl.options.internal.scrollBarWidth = ScrollbarWidth();

            function resize() {
              var rect = $elm[0].getBoundingClientRect();

              ctrl.options.internal.innerWidth = Math.floor(rect.width);

              if (ctrl.options.scrollbarV) {
                var height = rect.height;

                if (ctrl.options.headerHeight) {
                  height = height - ctrl.options.headerHeight;
                }

                if (ctrl.options.footerHeight) {
                  height = height - ctrl.options.footerHeight;
                }

                ctrl.options.internal.bodyHeight = height;
              }

              ctrl.adjustColumns();
              ctrl.calculatePageSize();
            }

            resize();
            $timeout(resize);
            $elm.addClass('dt-loaded');
            angular.element($window).bind('resize', throttle(function () {
              $timeout(resize);
            }));

            $scope.$on('$destroy', function () {
              angular.element($window).off('resize');
            });
          }
        };
      }
    };
  }
  DataTableDirective.$inject = ["$window", "$timeout", "throttle", "DataTableService"];

  function GetTotalFlexGrow(columns) {
    var totalFlexGrow = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        totalFlexGrow += c.flexGrow || 0;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return totalFlexGrow;
  }

  function ColumnTotalWidth(columns, prop) {
    var totalWidth = 0;

    columns.forEach(function (c) {
      var has = prop && c[prop];
      totalWidth = totalWidth + (has ? c[prop] : c.width);
    });

    return totalWidth;
  }

  function DistributeFlexWidth(columns, flexWidth) {
    if (flexWidth <= 0) {
      return {
        columns: columns,
        width: ColumnTotalWidth(columns)
      };
    }

    var remainingFlexGrow = GetTotalFlexGrow(columns),
        remainingFlexWidth = flexWidth,
        totalWidth = 0;

    for (var i = 0, len = columns.length; i < len; i++) {
      var column = columns[i];

      if (!column.flexGrow) {
        totalWidth += column.width;
        return;
      }

      var columnFlexWidth = Math.floor(column.flexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnWidth = Math.floor(column.width + columnFlexWidth);

      if (column.minWidth && newColumnWidth < column.minWidth) {
        newColumnWidth = column.minWidth;
      }

      if (column.maxWidth && newColumnWidth > column.maxWidth) {
        newColumnWidth = column.maxWidth;
      }

      totalWidth += newColumnWidth;
      remainingFlexGrow -= column.flexGrow;
      remainingFlexWidth -= columnFlexWidth;

      column.width = newColumnWidth;
    }

    return {
      width: totalWidth
    };
  }

  function ColumnsByPin(cols) {
    var ret = {
      left: [],
      center: [],
      right: []
    };

    for (var i = 0, len = cols.length; i < len; i++) {
      var c = cols[i];
      if (c.frozenLeft) {
        ret.left.push(c);
      } else if (c.frozenRight) {
        ret.right.push(c);
      } else {
        ret.center.push(c);
      }
    }

    return ret;
  }

  function AdjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = ColumnTotalWidth(allColumns),
        remainingFlexGrow = GetTotalFlexGrow(allColumns),
        remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0),
        colsByGroup = ColumnsByPin(allColumns);

    angular.forEach(colsByGroup, function (cols) {
      var columnGroupFlexGrow = GetTotalFlexGrow(cols),
          columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnSettings = DistributeFlexWidth(cols, columnGroupFlexWidth);

      remainingFlexGrow -= columnGroupFlexGrow;
      remainingFlexWidth -= columnGroupFlexWidth;
    });
  }

  function ForceFillColumnWidths(allColumns, expectedWidth, startIdx) {
    var contentWidth = 0,
        columnsToResize = startIdx > -1 ? allColumns.slice(startIdx, allColumns.length).filter(function (c) {
      return c.canAutoResize;
    }) : allColumns.filter(function (c) {
      return c.canAutoResize;
    });

    allColumns.forEach(function (c) {
      if (!c.canAutoResize) {
        contentWidth += c.width;
      } else {
        contentWidth += c.$$oldWidth || c.width;
      }
    });

    var remainingWidth = expectedWidth - contentWidth,
        additionWidthPerColumn = remainingWidth / columnsToResize.length,
        exceedsWindow = contentWidth > expectedWidth;

    columnsToResize.forEach(function (column) {
      if (exceedsWindow) {
        column.width = column.$$oldWidth || column.width;
      } else {
        if (!column.$$oldWidth) {
          column.$$oldWidth = column.width;
        }

        var newSize = column.$$oldWidth + additionWidthPerColumn;
        if (column.minWith && newSize < column.minWidth) {
          column.width = column.minWidth;
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
        } else {
          column.width = newSize;
        }
      }
    });
  }

  function ColumnGroupWidths(groups, all) {
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }

  var TableDefaults = {
    scrollbarV: true,

    rowHeight: 30,

    columnMode: 'standard',

    loadingMessage: 'Loading...',

    emptyMessage: 'No data to display',

    headerHeight: 30,

    footerHeight: 0,

    paging: {
      externalPaging: false,

      size: undefined,

      count: 0,

      offset: 0
    },

    selectable: false,

    multiSelect: false,

    checkboxSelection: false,

    reorderable: true,

    internal: {
      offsetX: 0,
      offsetY: 0,
      innerWidth: 0,
      bodyHeight: 300
    }

  };

  var DataTableController = (function () {
    function DataTableController($scope, $filter, $log, $transclude) {
      var _this5 = this;

      babelHelpers.classCallCheck(this, DataTableController);

      angular.extend(this, {
        $scope: $scope,
        $filter: $filter,
        $log: $log
      });

      this.defaults();

      this.options.$outer = $scope.$parent;

      $scope.$watch('dt.options.columns', function (newVal, oldVal) {
        if (newVal.length > oldVal.length) {
          _this5.transposeColumnDefaults();
        }

        if (newVal.length !== oldVal.length) {
          _this5.adjustColumns();
        }

        _this5.calculateColumns();
      }, true);

      var watch = $scope.$watch('dt.rows', function (newVal) {
        if (newVal) {
          watch();
          _this5.onSorted();
        }
      });
    }
    DataTableController.$inject = ["$scope", "$filter", "$log", "$transclude"];

    babelHelpers.createClass(DataTableController, [{
      key: "defaults",
      value: function defaults() {
        var _this6 = this;

        this.expanded = this.expanded || {};

        this.options = angular.extend(angular.copy(TableDefaults), this.options);

        angular.forEach(TableDefaults.paging, function (v, k) {
          if (!_this6.options.paging[k]) {
            _this6.options.paging[k] = v;
          }
        });

        if (this.options.selectable && this.options.multiSelect) {
          this.selected = this.selected || [];
        }
      }
    }, {
      key: "transposeColumnDefaults",
      value: function transposeColumnDefaults() {
        for (var i = 0, len = this.options.columns.length; i < len; i++) {
          var column = this.options.columns[i];
          column.$id = ObjectId();

          angular.forEach(ColumnDefaults, function (v, k) {
            if (!column.hasOwnProperty(k)) {
              column[k] = v;
            }
          });

          if (column.name && !column.prop) {
            column.prop = CamelCase(column.name);
          }

          this.options.columns[i] = column;
        }
      }
    }, {
      key: "calculateColumns",
      value: function calculateColumns() {
        var columns = this.options.columns;
        this.columnsByPin = ColumnsByPin(columns);
        this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
      }
    }, {
      key: "tableCss",
      value: function tableCss() {
        return {
          'fixed': this.options.scrollbarV,
          'selectable': this.options.selectable,
          'checkboxable': this.options.checkboxSelection
        };
      }
    }, {
      key: "adjustColumns",
      value: function adjustColumns(forceIdx) {
        var width = this.options.internal.innerWidth - this.options.internal.scrollBarWidth;

        if (this.options.columnMode === 'force') {
          ForceFillColumnWidths(this.options.columns, width, forceIdx);
        } else if (this.options.columnMode === 'flex') {
          AdjustColumnWidths(this.options.columns, width);
        }
      }
    }, {
      key: "calculatePageSize",
      value: function calculatePageSize() {
        this.options.paging.size = Math.ceil(this.options.internal.bodyHeight / this.options.rowHeight) + 1;
      }
    }, {
      key: "onSorted",
      value: function onSorted() {
        if (!this.rows) return;

        var sorts = this.options.columns.filter(function (c) {
          return c.sort;
        });

        if (sorts.length) {
          this.onSort({ sorts: sorts });

          var clientSorts = [];
          for (var i = 0, len = sorts.length; i < len; i++) {
            var c = sorts[i];
            if (c.comparator !== false) {
              var dir = c.sort === 'asc' ? '' : '-';
              clientSorts.push(dir + c.prop);
            }
          }

          if (clientSorts.length) {
            var _rows;

            var sortedValues = this.$filter('orderBy')(this.rows, clientSorts);
            this.rows.splice(0, this.rows.length);
            (_rows = this.rows).push.apply(_rows, babelHelpers.toConsumableArray(sortedValues));
          }
        }

        this.options.internal.scrollHelper.setYOffset(0);
      }
    }, {
      key: "onTreeToggled",
      value: function onTreeToggled(row, cell) {
        this.onTreeToggle({
          row: row,
          cell: cell
        });
      }
    }, {
      key: "onBodyPage",
      value: function onBodyPage(offset, size) {
        this.onPage({
          offset: offset,
          size: size
        });
      }
    }, {
      key: "onFooterPage",
      value: function onFooterPage(offset, size) {
        var pageBlockSize = this.options.rowHeight * size,
            offsetY = pageBlockSize * offset;

        this.options.internal.scrollHelper.setYOffset(offsetY);
      }
    }, {
      key: "onHeaderCheckboxChange",
      value: function onHeaderCheckboxChange() {
        if (this.rows) {
          var matches = this.selected.length === this.rows.length;
          this.selected.splice(0, this.selected.length);

          if (!matches) {
            var _selected;

            (_selected = this.selected).push.apply(_selected, babelHelpers.toConsumableArray(this.rows));
          }
        }
      }
    }, {
      key: "isAllRowsSelected",
      value: function isAllRowsSelected() {
        if (this.rows) return false;
        return this.selected.length === this.rows.length;
      }
    }, {
      key: "onResize",
      value: function onResize(column, width) {
        var idx = this.options.columns.indexOf(column);
        if (idx > -1) {
          var column = this.options.columns[idx];
          column.width = width;
          column.canAutoResize = false;

          this.adjustColumns(idx);
          this.calculateColumns();
        }
      }
    }, {
      key: "onSelected",
      value: function onSelected(rows) {
        this.onSelect({
          rows: rows
        });
      }
    }, {
      key: "onRowClicked",
      value: function onRowClicked(row) {
        this.onRowClick({
          row: row
        });
      }
    }]);
    return DataTableController;
  })();

  var dataTable = angular.module('data-table', []).controller('DataTableController', DataTableController).directive('dtable', DataTableDirective).factory('DataTableService', DataTableService).directive('resizable', ResizableDirective).directive('sortable', SortableDirective).constant('debounce', debounce).constant('throttle', throttle).controller('HeaderController', HeaderController).directive('dtHeader', HeaderDirective).controller('HeaderCellController', HeaderCellController).directive('dtHeaderCell', HeaderCellDirective).controller('BodyController', BodyController).directive('dtBody', BodyDirective).directive('dtScroller', ScrollerDirective).controller('RowController', RowController).directive('dtRow', RowDirective).controller('GroupRowController', GroupRowController).directive('dtGroupRow', GroupRowDirective).controller('CellController', CellController).directive('dtCell', CellDirective).controller('FooterController', FooterController).directive('dtFooter', FooterDirective).controller('PagerController', PagerController).directive('dtPager', PagerDirective);

  module.exports = dataTable;
});