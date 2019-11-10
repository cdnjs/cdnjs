/**
 * angular-data-table - AngularJS data table directive written in ES6.
 * @version v0.0.20
 * @link http://swimlane.com/
 * @license 
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('angular')) : typeof define === 'function' && define.amd ? define(['angular'], factory) : global.DataTable = factory(angular);
})(undefined, function (angular) {
  'use strict';

  (function () {
    function polyfill(fnName) {
      if (!Array.prototype[fnName]) {
        Array.prototype[fnName] = function (predicate) {
          var i,
              len,
              test,
              thisArg = arguments[1];

          if (typeof predicate !== 'function') {
            throw new TypeError();
          }

          test = !thisArg ? predicate : function () {
            return predicate.apply(thisArg, arguments);
          };

          for (i = 0, len = this.length; i < len; i++) {
            if (test(this[i], i, this) === true) {
              return fnName === 'find' ? this[i] : i;
            }
          }

          if (fnName !== 'find') {
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

  var BodyHelper = (function () {
    var _elm;
    return {
      create: function create(elm) {
        _elm = elm;
      },
      setYOffset: function setYOffset(offsetY) {
        _elm[0].scrollTop = offsetY;
      }
    };
  })();

  var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function BodyDirective($timeout) {
    return {
      restrict: 'E',
      controller: 'BodyController',
      controllerAs: 'body',
      scope: {
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
      template: '\n        <div class="dt-body" ng-style="body.styles()">\n          <div class="dt-body-scroller" ng-style="body.scrollerStyles()">\n            <dt-group-row ng-repeat-start="r in body.tempRows track by $index"\n                          ng-if="r.group"\n                          ng-style="body.groupRowStyles(this, r)" \n                          on-group-toggle="body.onGroupToggle(this, group)"\n                          expanded="body.getRowExpanded(this, r)"\n                          tabindex="{{$index}}"\n                          row="r">\n            </dt-group-row>\n            <dt-row ng-repeat-end\n                    ng-if="!r.group"\n                    row="body.getRowValue($index)"\n                    tabindex="{{$index}}"\n                    columns="columns"\n                    column-widths="columnWidths"\n                    ng-keydown="body.keyDown($event, $index, r)"\n                    ng-click="body.rowClicked($event, $index, r)"\n                    on-tree-toggle="body.onTreeToggle(this, row, cell)"\n                    ng-class="body.rowClasses(this, r)"\n                    options="options"\n                    selected="body.isSelected(r)"\n                    on-checkbox-change="body.onCheckboxChange($index, row)"\n                    columns="body.columnsByPin"\n                    has-children="body.getRowHasChildren(r)"\n                    expanded="body.getRowExpanded(this, r)"\n                    ng-style="body.rowStyles(this, r)">\n            </dt-row>\n          </div>\n          <div ng-if="rows && !rows.length" \n               class="empty-row" \n               ng-bind="::options.emptyMessage">\n         </div>\n         <div ng-if="rows === undefined" \n               class="loading-row"\n               ng-bind="::options.loadingMessage">\n         </div>\n        </div>',
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {
        var ticking = false,
            lastScrollY = 0,
            lastScrollX = 0,
            helper = BodyHelper.create($elm);

        function update() {
          $timeout(function () {
            $scope.options.internal.offsetY = lastScrollY;
            $scope.options.internal.offsetX = lastScrollX;
            ctrl.updatePage();
          });

          ticking = false;
        };

        function requestTick() {
          if (!ticking) {
            requestAnimFrame(update);
            ticking = true;
          }
        };

        $elm.on('scroll', function (ev) {
          lastScrollY = this.scrollTop;
          lastScrollX = this.scrollLeft;
          requestTick();
        });
      }
    };
  }
  BodyDirective.$inject = ["$timeout"];

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
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
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

  function ColumnGroupWidths(groups, all) {
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }

  function ForceFillColumnWidths(allColumns, expectedWidth, startIdx) {
    var colsByGroup = ColumnsByPin(allColumns),
        widthsByGroup = ColumnGroupWidths(colsByGroup, allColumns),
        availableWidth = expectedWidth - (widthsByGroup.left + widthsByGroup.right),
        centerColumns = allColumns.filter(function (c) {
      return !c.frozenLeft && !c.frozenRight;
    }),
        contentWidth = 0,
        columnsToResize = startIdx > -1 ? allColumns.slice(startIdx, allColumns.length).filter(function (c) {
      return !c.$$resized;
    }) : allColumns.filter(function (c) {
      return !c.$$resized;
    });

    allColumns.forEach(function (c) {
      if (c.$$resized) {
        contentWidth = contentWidth + c.width;
      } else {
        contentWidth = contentWidth + (c.$$oldWidth || c.width);
      }
    });

    var remainingWidth = availableWidth - contentWidth,
        additionWidthPerColumn = Math.floor(remainingWidth / colsByGroup.center.length),
        exceedsWindow = contentWidth > widthsByGroup.center;

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

  function CamelCase(str) {
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');

    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');

    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();

    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
      return b.trim() + c.toUpperCase();
    });
    return str;
  }

  function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

  var ColumnDefaults = Object.freeze({
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

    headerCheckbox: false

  });

  var TableDefaults = Object.freeze({
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

  });

  var DataTableController = (function () {
    function DataTableController($scope, $filter, $log, $transclude) {
      var _this = this;

      _classCallCheck(this, DataTableController);

      angular.extend(this, {
        $scope: $scope,
        $filter: $filter,
        $log: $log
      });

      $scope.options.$outer = $scope.$parent;

      this.defaults($scope);
      $scope.$watch('options.columns', function (newVal, oldVal) {
        if (newVal.length > oldVal.length) {
          _this.transposeColumnDefaults(newVal);
        }

        if (newVal.length !== oldVal.length) {
          _this.adjustColumns();
        }

        _this.calculateColumns();
      }, true);

      $transclude(function (clone, scope) {
        var cols = clone[0].getElementsByTagName('column');
        _this.buildColumns($scope, cols);
        _this.transposeColumnDefaults($scope.options.columns);
      });
    }
    DataTableController.$inject = ["$scope", "$filter", "$log", "$transclude"];

    _createClass(DataTableController, [{
      key: 'buildColumns',
      value: function buildColumns(scope, columnElms) {
        if (columnElms && columnElms.length) {
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

              if (attrName === 'name') {
                column.name = attr.value;
              }
            });

            if (c.innerHTML !== '') {
              column.template = c.innerHTML;
            }

            columns.push(column);
          });

          scope.options.columns = columns;
        }
      }
    }, {
      key: 'defaults',
      value: function defaults($scope) {
        var _this2 = this;

        $scope.expanded = $scope.expanded || {};

        var options = angular.extend(angular.copy(TableDefaults), $scope.options);

        options.paging = angular.extend(angular.copy(TableDefaults.paging), $scope.options.paging);

        $scope.options = options;

        if ($scope.options.selectable && $scope.options.multiSelect) {
          $scope.selected = $scope.selected || [];
        }

        var watch = $scope.$watch('rows', function (newVal) {
          if (newVal) {
            watch();
            _this2.onSort($scope);
          }
        });
      }
    }, {
      key: 'transposeColumnDefaults',
      value: function transposeColumnDefaults(columns) {
        for (var i = 0, len = columns.length; i < len; i++) {
          var column = columns[i];
          column = angular.extend(angular.copy(ColumnDefaults), column);
          column.$id = ObjectId();

          if (column.name && !column.prop) {
            column.prop = CamelCase(column.name);
          }

          columns[i] = column;
        }
      }
    }, {
      key: 'calculateColumns',
      value: function calculateColumns() {
        var columns = this.$scope.options.columns;
        this.columnsByPin = ColumnsByPin(columns);
        this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
      }
    }, {
      key: 'tableCss',
      value: function tableCss(scope) {
        return {
          'fixed': scope.options.scrollbarV,
          'selectable': scope.options.selectable,
          'checkboxable': scope.options.checkboxSelection
        };
      }
    }, {
      key: 'adjustColumns',
      value: function adjustColumns(forceIdx) {
        var width = this.$scope.options.internal.innerWidth - this.$scope.options.internal.scrollBarWidth;

        if (this.$scope.options.columnMode === 'force') {
          ForceFillColumnWidths(this.$scope.options.columns, width, forceIdx);
        } else if (this.$scope.options.columnMode === 'flex') {
          AdjustColumnWidths(this.$scope.options.columns, width);
        }
      }
    }, {
      key: 'calculatePageSize',
      value: function calculatePageSize() {
        this.$scope.options.paging.size = Math.ceil(this.$scope.options.internal.bodyHeight / this.$scope.options.rowHeight) + 1;
      }
    }, {
      key: 'onSort',
      value: function onSort(scope) {
        if (!scope.rows) return;

        var sorts = scope.options.columns.filter(function (c) {
          return c.sort;
        });

        if (sorts.length) {
          if (this.$scope.onSort) {
            this.$scope.onSort({ sorts: sorts });
          }

          var clientSorts = [];
          for (var i = 0, len = sorts.length; i < len; i++) {
            var c = sorts[i];
            if (c.comparator !== false) {
              var dir = c.sort === 'asc' ? '' : '-';
              clientSorts.push(dir + c.prop);
            }
          }

          if (clientSorts.length) {
            var _scope$rows;

            var sortedValues = this.$filter('orderBy')(scope.rows, clientSorts);
            scope.rows.splice(0, scope.rows.length);
            (_scope$rows = scope.rows).push.apply(_scope$rows, _toConsumableArray(sortedValues));
          }
        }

        BodyHelper.setYOffset(0);
      }
    }, {
      key: 'onTreeToggle',
      value: function onTreeToggle(scope, row, cell) {
        scope.onTreeToggle({
          row: row,
          cell: cell
        });
      }
    }, {
      key: 'onBodyPage',
      value: function onBodyPage(scope, offset, size) {
        scope.onPage({
          offset: offset,
          size: size
        });
      }
    }, {
      key: 'onFooterPage',
      value: function onFooterPage(scope, offset, size) {
        var pageBlockSize = scope.options.rowHeight * size,
            offsetY = pageBlockSize * offset;

        BodyHelper.setYOffset(offsetY);
      }
    }, {
      key: 'onHeaderCheckboxChange',
      value: function onHeaderCheckboxChange(scope) {
        if (scope.rows) {
          var matches = scope.selected.length === scope.rows.length;
          scope.selected.splice(0, scope.selected.length);

          if (!matches) {
            var _scope$selected;

            (_scope$selected = scope.selected).push.apply(_scope$selected, _toConsumableArray(scope.rows));
          }
        }
      }
    }, {
      key: 'isAllRowsSelected',
      value: function isAllRowsSelected(scope) {
        if (!scope.rows) return false;
        return scope.selected.length === scope.rows.length;
      }
    }, {
      key: 'onResize',
      value: function onResize(scope, column, width) {
        var idx = scope.options.columns.indexOf(column);
        if (idx > -1) {
          var column = scope.options.columns[idx];
          column.width = width;
          column.$$resized = true;

          this.adjustColumns(idx);
          this.calculateColumns();
        }
      }
    }, {
      key: 'onSelect',
      value: function onSelect(scope, rows) {
        scope.onSelect({
          rows: rows
        });
      }
    }, {
      key: 'onRowClick',
      value: function onRowClick(scope, row) {
        scope.onRowClick({
          row: row
        });
      }
    }]);

    return DataTableController;
  })();

  function PagerDirective() {
    return {
      restrict: 'E',
      controller: 'PagerController',
      controllerAs: 'pager',
      scope: {
        page: '=',
        size: '=',
        count: '=',
        onPage: '&'
      },
      template: '<div class="dt-pager">\n          <ul class="pager">\n            <li ng-class="{ disabled: !pager.canPrevious(this) }">\n              <a href ng-click="pager.selectPage(this, 1)" class="icon-left"></a>\n            </li>\n            <li ng-repeat="pg in pager.pages track by $index" ng-class="{ active: pg.active }">\n              <a href ng-click="pager.selectPage(this, pg.number)">{{pg.text}}</a>\n            </li>\n            <li ng-class="{ disabled: !pager.canNext(this) }">\n              <a href ng-click="pager.selectPage(this, pager.totalPages)" class="icon-right"></a>\n            </li>\n          </ul>\n        </div>',
      replace: true
    };
  }

  var PagerController = (function () {
    function PagerController($scope) {
      var _this3 = this;

      _classCallCheck(this, PagerController);

      $scope.$watch('count', function (newVal) {
        _this3.calcTotalPages($scope.size, $scope.count);
        _this3.getPages($scope.page || 1);
      });

      $scope.$watch('page', function (newVal) {
        if (newVal !== 0 && newVal <= _this3.totalPages) {
          _this3.getPages(newVal);
        }
      });

      this.getPages($scope.page || 1);
    }
    PagerController.$inject = ["$scope"];

    _createClass(PagerController, [{
      key: 'calcTotalPages',
      value: function calcTotalPages(size, count) {
        var count = size < 1 ? 1 : Math.ceil(count / size);
        this.totalPages = Math.max(count || 0, 1);
      }
    }, {
      key: 'selectPage',
      value: function selectPage(scope, num) {
        if (num > 0 && num <= this.totalPages) {
          scope.page = num;
          scope.onPage({
            page: num
          });
        }
      }
    }, {
      key: 'canPrevious',
      value: function canPrevious(scope) {
        return scope.page !== 1;
      }
    }, {
      key: 'canNext',
      value: function canNext(scope) {
        return scope.page <= this.totalPages;
      }
    }, {
      key: 'getPages',
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
      scope: {
        paging: '=',
        onPage: '&'
      },
      template: '<div class="dt-footer">\n          <div class="page-count">{{paging.count}} total</div>\n          <dt-pager page="page"\n                 size="paging.size"\n                 count="paging.count"\n                 on-page="footer.onPage(this, page)"\n                 ng-show="paging.count > 1">\n           </dt-pager>\n        </div>',
      replace: true
    };
  }

  var FooterController = (function () {
    function FooterController($scope) {
      var _this4 = this;

      _classCallCheck(this, FooterController);

      $scope.page = $scope.paging.offset + 1;
      $scope.$watch('paging.offset', function (newVal) {
        _this4.offsetChanged($scope, newVal);
      });
    }
    FooterController.$inject = ["$scope"];

    _createClass(FooterController, [{
      key: 'offsetChanged',
      value: function offsetChanged(scope, newVal) {
        scope.page = newVal + 1;
      }
    }, {
      key: 'onPage',
      value: function onPage(scope, page) {
        scope.paging.offset = page - 1;
        scope.onPage({
          offset: scope.paging.offset,
          size: scope.paging.size
        });
      }
    }]);

    return FooterController;
  })();

  function CellDirective($rootScope, $compile, $log) {
    return {
      restrict: 'E',
      controller: 'CellController',
      controllerAs: 'cell',
      scope: {
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
      template: '<div class="dt-cell" \n              data-title="{{::column.name}}" \n              ng-style="cell.styles(column)"\n              ng-class="cell.cellClass(column)">\n          <label ng-if="column.isCheckboxColumn" class="dt-checkbox">\n            <input type="checkbox" \n                   ng-checked="selected"\n                   ng-click="cell.onCheckboxChange($event, this)" />\n          </label>\n          <span ng-if="column.isTreeColumn && hasChildren"\n                ng-class="cell.treeClass(this)"\n                ng-click="cell.onTreeToggle($event, this)"></span>\n          <span class="dt-cell-content"></span>\n        </div>',
      replace: true,
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var content = angular.element($elm[0].querySelector('.dt-cell-content'));
            $scope.$outer = $scope.options.$outer;

            $scope.$watch('value', function () {
              content.empty();

              if ($scope.column.template) {
                var elm = angular.element('<span>' + $scope.column.template.trim() + '</span>');
                content.append($compile(elm)($scope));
              } else if ($scope.column.cellRenderer) {
                var elm = angular.element($scope.column.cellRenderer($scope, content));
                content.append($compile(elm)($scope));
              } else {
                content[0].innerHTML = ctrl.getValue($scope);
              }
            });
          }
        };
      }
    };
  }
  CellDirective.$inject = ["$rootScope", "$compile", "$log"];

  var CellController = (function () {
    function CellController() {
      _classCallCheck(this, CellController);
    }

    _createClass(CellController, [{
      key: 'styles',
      value: function styles(col) {
        return {
          width: col.width + 'px'
        };
      }
    }, {
      key: 'cellClass',
      value: function cellClass(col) {
        var style = {
          'dt-tree-col': col.isTreeColumn
        };

        if (col.className) {
          style[col.className] = true;
        }

        return style;
      }
    }, {
      key: 'treeClass',
      value: function treeClass(scope) {
        return {
          'dt-tree-toggle': true,
          'icon-right': !scope.expanded,
          'icon-down': scope.expanded
        };
      }
    }, {
      key: 'onTreeToggle',
      value: function onTreeToggle(evt, scope) {
        evt.stopPropagation();
        scope.expanded = !scope.expanded;
        scope.onTreeToggle({
          cell: {
            value: scope.value,
            column: scope.column,
            expanded: scope.expanded
          }
        });
      }
    }, {
      key: 'onCheckboxChange',
      value: function onCheckboxChange(event, scope) {
        event.stopPropagation();
        scope.onCheckboxChange();
      }
    }, {
      key: 'getValue',
      value: function getValue(scope) {
        var val = scope.column.cellDataGetter ? scope.column.cellDataGetter(scope.value) : scope.value;

        if (val === undefined || val === null) val = '';

        return val;
      }
    }]);

    return CellController;
  })();

  function GroupRowDirective() {
    return {
      restrict: 'E',
      controller: 'GroupRowController',
      controllerAs: 'group',
      scope: {
        row: '=',
        onGroupToggle: '&',
        expanded: '='
      },
      replace: true,
      template: '\n        <div class="dt-group-row">\n          <span ng-class="group.treeClass(this)"\n                ng-click="group.onGroupToggle($event, this)">\n          </span>\n          <span class="dt-group-row-label">\n            {{row.name}}\n          </span>\n        </div>'
    };
  }

  var GroupRowController = (function () {
    function GroupRowController() {
      _classCallCheck(this, GroupRowController);
    }

    _createClass(GroupRowController, [{
      key: 'onGroupToggle',
      value: function onGroupToggle(evt, scope) {
        evt.stopPropagation();
        scope.onGroupToggle({
          group: scope.row
        });
      }
    }, {
      key: 'treeClass',
      value: function treeClass(scope) {
        return {
          'dt-tree-toggle': true,
          'icon-right': !scope.expanded,
          'icon-down': scope.expanded
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
      scope: {
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
      template: '\n        <div class="dt-row">\n          <div class="dt-row-left dt-row-block" \n               ng-if="columns[\'left\'].length"\n               ng-style="rowCtrl.stylesByGroup(this, \'left\')">\n            <dt-cell ng-repeat="column in columns[\'left\'] track by column.$id"\n                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"\n                     column="column"\n                     options="options"\n                     has-children="hasChildren"\n                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"\n                     selected="selected"\n                     expanded="expanded"\n                     row="row"\n                     value="rowCtrl.getValue(this, column)">\n            </dt-cell>\n          </div>\n          <div class="dt-row-center dt-row-block" \n               ng-style="rowCtrl.stylesByGroup(this, \'center\')">\n            <dt-cell ng-repeat="column in columns[\'center\'] track by column.$id"\n                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"\n                     column="column"\n                     options="options"\n                     has-children="hasChildren"\n                     expanded="expanded"\n                     selected="selected"\n                     row="row"\n                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"\n                     value="rowCtrl.getValue(this, column)">\n            </dt-cell>\n          </div>\n          <div class="dt-row-right dt-row-block" \n               ng-if="columns[\'right\'].length"\n               ng-style="rowCtrl.stylesByGroup(this, \'right\')">\n            <dt-cell ng-repeat="column in columns[\'right\'] track by column.$id"\n                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"\n                     column="column"\n                     options="options"\n                     has-children="hasChildren"\n                     selected="selected"\n                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"\n                     row="row"\n                     expanded="expanded"\n                     value="rowCtrl.getValue(this, column)">\n            </dt-cell>\n          </div>\n        </div>',
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
      _classCallCheck(this, RowController);
    }

    _createClass(RowController, [{
      key: 'getValue',
      value: function getValue(scope, col) {
        return DeepValueGetter(scope.row, col.prop);
      }
    }, {
      key: 'onTreeToggle',
      value: function onTreeToggle(scope, cell) {
        scope.onTreeToggle({
          cell: cell,
          row: scope.row
        });
      }
    }, {
      key: 'stylesByGroup',
      value: function stylesByGroup(scope, group) {
        var styles = {
          width: scope.columnWidths[group] + 'px'
        };

        if (group === 'left') {
          styles.transform = 'translate3d(' + scope.options.internal.offsetX + 'px, 0, 0)';
        } else if (group === 'right') {
          var offset = scope.columnWidths.total - scope.options.internal.innerWidth - scope.options.internal.offsetX;
          styles.transform = 'translate3d(-' + offset + 'px, 0, 0)';
        }

        return styles;
      }
    }, {
      key: 'onCheckboxChange',
      value: function onCheckboxChange(scope) {
        scope.onCheckboxChange({
          row: scope.row
        });
      }
    }]);

    return RowController;
  })();

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
    function BodyController($scope, $timeout, throttle) {
      var _this5 = this;

      _classCallCheck(this, BodyController);

      angular.extend(this, {
        $scope: $scope,
        options: $scope.options,
        selected: $scope.selected
      });

      this.tempRows = [];

      this.treeColumn = $scope.options.columns.find(function (c) {
        return c.isTreeColumn;
      });

      this.groupColumn = $scope.options.columns.find(function (c) {
        return c.group;
      });

      if (this.options.scrollbarV) {
        $scope.$watch('options.internal.offsetY', throttle(this.getRows.bind(this), 10));
      }

      $scope.$watchCollection('rows', function (newVal, oldVal) {
        if (newVal) {
          if (!_this5.options.paging.externalPaging) {
            _this5.options.paging.count = newVal.length;
          }

          _this5.count = _this5.options.paging.count;

          if (_this5.treeColumn || _this5.groupColumn) {
            _this5.buildRowsByGroup();
          }

          if (_this5.options.scrollbarV) {
            _this5.getRows();
          } else {
            var _tempRows;

            var rows = $scope.rows;
            if (_this5.treeColumn) {
              rows = _this5.buildTree();
            } else if (_this5.groupColumn) {
              rows = _this5.buildGroups();
            }
            _this5.tempRows.splice(0, _this5.tempRows.length);
            (_tempRows = _this5.tempRows).push.apply(_tempRows, _toConsumableArray(rows));
          }
        }
      });

      if (this.options.scrollbarV) {
        $scope.$watch('options.paging.count', this.updatePage.bind(this));
        $scope.$watch('options.internal.offsetY', this.updatePage.bind(this));
        $scope.$watch('options.paging.offset', function (newVal) {
          $scope.onPage({
            offset: newVal,
            size: _this5.options.paging.size
          });
        });
      }
    }
    BodyController.$inject = ["$scope", "$timeout", "throttle"];

    _createClass(BodyController, [{
      key: 'getFirstLastIndexes',
      value: function getFirstLastIndexes() {
        var firstRowIndex = Math.max(Math.floor((this.$scope.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0),
            endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);

        return {
          first: firstRowIndex,
          last: endIndex
        };
      }
    }, {
      key: 'updatePage',
      value: function updatePage() {
        var idxs = this.getFirstLastIndexes(),
            curPage = Math.ceil(idxs.first / this.options.paging.size);
        this.options.paging.offset = curPage;
      }
    }, {
      key: 'buildRowsByGroup',
      value: function buildRowsByGroup() {
        this.index = {};
        this.rowsByGroup = {};

        var parentProp = this.treeColumn ? this.treeColumn.relationProp : this.groupColumn.prop;

        for (var i = 0, len = this.$scope.rows.length; i < len; i++) {
          var row = this.$scope.rows[i];

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
      key: 'buildGroups',
      value: function buildGroups() {
        var _this6 = this;

        var temp = [];

        angular.forEach(this.rowsByGroup, function (v, k) {
          temp.push({
            name: k,
            group: true
          });

          if (_this6.$scope.expanded[k]) {
            temp.push.apply(temp, _toConsumableArray(v));
          }
        });

        return temp;
      }
    }, {
      key: 'buildTree',
      value: function buildTree() {
        var count = 0,
            temp = [];

        for (var i = 0, len = this.$scope.rows.length; i < len; i++) {
          var row = this.$scope.rows[i],
              relVal = row[this.treeColumn.relationProp],
              keyVal = row[this.treeColumn.prop],
              rows = this.rowsByGroup[keyVal],
              expanded = this.$scope.expanded[keyVal];

          if (!relVal) {
            count++;
            temp.push(row);
          }

          if (rows && rows.length) {
            if (expanded) {
              temp.push.apply(temp, _toConsumableArray(rows));
              count = count + rows.length;
            }
          }
        }

        return temp;
      }
    }, {
      key: 'getRows',
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
          temp = this.$scope.rows;
        }

        var idx = 0,
            indexes = this.getFirstLastIndexes(),
            rowIndex = indexes.first;

        while (rowIndex < indexes.last && rowIndex < this.count) {
          var row = temp[rowIndex];
          if (row) {
            row.$$index = rowIndex;
            this.tempRows[idx] = row;
          }

          idx++ && rowIndex++;
        }
      }
    }, {
      key: 'styles',
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
      key: 'rowStyles',
      value: function rowStyles(scope, row) {
        var styles = {
          height: scope.options.rowHeight + 'px'
        };

        if (scope.options.scrollbarV) {
          styles.transform = 'translate3d(0, ' + row.$$index * scope.options.rowHeight + 'px, 0)';
        }

        return styles;
      }
    }, {
      key: 'groupRowStyles',
      value: function groupRowStyles(scope, row) {
        var styles = this.rowStyles(scope, row);
        styles.width = scope.columnWidths.total + 'px';
        return styles;
      }
    }, {
      key: 'rowClasses',
      value: function rowClasses(scope, row) {
        var styles = {
          'selected': this.isSelected(row)
        };

        if (this.treeColumn) {
          styles['dt-leaf'] = this.rowsByGroup[row[this.treeColumn.relationProp]];

          styles['dt-has-leafs'] = this.rowsByGroup[row[this.treeColumn.prop]];

          styles['dt-depth-' + row.$$depth] = true;
        }

        return styles;
      }
    }, {
      key: 'isSelected',
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
      key: 'keyDown',
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
      key: 'rowClicked',
      value: function rowClicked(event, index, row) {
        if (!this.options.checkboxSelection) {
          event.preventDefault();
          this.selectRow(index, row);
        }

        this.$scope.onRowClick({ row: row });
      }
    }, {
      key: 'selectRow',
      value: function selectRow(index, row) {
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
                this.selected.push(row);
                this.$scope.onSelect({ rows: [row] });
              }
            }
            this.prevIndex = index;
          } else {
            this.selected = row;
            this.$scope.onSelect({ rows: [row] });
          }
        }
      }
    }, {
      key: 'selectRowsBetween',
      value: function selectRowsBetween(index) {
        var reverse = index < this.prevIndex,
            selecteds = [];

        for (var i = 0, len = this.tempRows.length; i < len; i++) {
          var row = this.tempRows[i],
              greater = i >= this.prevIndex && i <= index,
              lesser = i <= this.prevIndex && i >= index;

          if (reverse && lesser || !reverse && greater) {
            var idx = this.selected.indexOf(row);
            if (idx === -1) {
              this.selected.push(row);
              selecteds.push(row);
            }
          }
        }

        this.$scope.onSelect({ rows: selecteds });
      }
    }, {
      key: 'scrollerStyles',
      value: function scrollerStyles() {
        return {
          height: this.count * this.options.rowHeight + 'px'
        };
      }
    }, {
      key: 'getRowValue',
      value: function getRowValue(idx) {
        return this.tempRows[idx];
      }
    }, {
      key: 'getRowExpanded',
      value: function getRowExpanded(scope, row) {
        if (this.treeColumn) {
          return scope.expanded[row[this.treeColumn.prop]];
        } else if (this.groupColumn) {
          return scope.expanded[row.name];
        }
      }
    }, {
      key: 'getRowHasChildren',
      value: function getRowHasChildren(row) {
        if (!this.treeColumn) return;
        var children = this.rowsByGroup[row[this.treeColumn.prop]];
        return children !== undefined || children && !children.length;
      }
    }, {
      key: 'onTreeToggle',
      value: function onTreeToggle(scope, row, cell) {
        var val = row[this.treeColumn.prop];
        scope.expanded[val] = !scope.expanded[val];

        if (this.options.scrollbarV) {
          this.getRows(true);
        } else {
          var _tempRows2;

          var values = this.buildTree();
          this.tempRows.splice(0, this.tempRows.length);
          (_tempRows2 = this.tempRows).push.apply(_tempRows2, _toConsumableArray(values));
        }

        scope.onTreeToggle({
          row: row,
          cell: cell
        });
      }
    }, {
      key: 'onCheckboxChange',
      value: function onCheckboxChange(index, row) {
        this.selectRow(index, row);
      }
    }, {
      key: 'onGroupToggle',
      value: function onGroupToggle(scope, row) {
        scope.expanded[row.name] = !scope.expanded[row.name];

        if (this.options.scrollbarV) {
          this.getRows(true);
        } else {
          var _tempRows3;

          var values = this.buildGroups();
          this.tempRows.splice(0, this.tempRows.length);
          (_tempRows3 = this.tempRows).push.apply(_tempRows3, _toConsumableArray(values));
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
      scope: {
        column: '=',
        onCheckboxChange: '&',
        onSort: '&',
        onResize: '&',
        selected: '='
      },
      replace: true,
      template: '<div ng-class="hcell.cellClass(this)"\n              ng-style="hcell.styles(this)"\n              title="{{::column.name}}">\n          <div resizable="column.resizable" \n               on-resize="hcell.onResize(this, width, column)"\n               min-width="column.minWidth"\n               max-width="column.maxWidth">\n            <label ng-if="column.isCheckboxColumn && column.headerCheckbox" class="dt-checkbox">\n              <input type="checkbox" \n                     ng-checked="selected"\n                     ng-click="hcell.onCheckboxChange(this)" />\n            </label>\n            <span class="dt-header-cell-label" \n                  ng-click="hcell.sort(this)">\n            </span>\n            <span ng-class="hcell.sortClass(this)"></span>\n          </div>\n        </div>',
      compile: function compile() {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            var label = $elm[0].querySelector('.dt-header-cell-label');

            if ($scope.column.headerRenderer) {
              var elm = angular.element($scope.column.headerRenderer($scope, $elm));
              angular.element(label).append($compile(elm)($scope)[0]);
            } else {
              var val = $scope.column.name;
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
      _classCallCheck(this, HeaderCellController);
    }

    _createClass(HeaderCellController, [{
      key: 'styles',
      value: function styles(scope) {
        return {
          width: scope.column.width + 'px',
          minWidth: scope.column.minWidth + 'px',
          maxWidth: scope.column.maxWidth + 'px',
          height: scope.column.height + 'px'
        };
      }
    }, {
      key: 'cellClass',
      value: function cellClass(scope) {
        var cls = {
          'sortable': scope.column.sortable,
          'dt-header-cell': true,
          'resizable': scope.column.resizable
        };

        if (scope.column.heaerClassName) {
          cls[scope.column.heaerClassName] = true;
        }

        return cls;
      }
    }, {
      key: 'sort',
      value: function sort(scope) {
        if (scope.column.sortable) {
          if (!scope.column.sort) {
            scope.column.sort = 'asc';
          } else if (scope.column.sort === 'asc') {
            scope.column.sort = 'desc';
          } else if (scope.column.sort === 'desc') {
            scope.column.sort = undefined;
          }

          scope.onSort({
            column: scope.column
          });
        }
      }
    }, {
      key: 'sortClass',
      value: function sortClass(scope) {
        return {
          'sort-btn': true,
          'sort-asc icon-down': scope.column.sort === 'asc',
          'sort-desc icon-up': scope.column.sort === 'desc'
        };
      }
    }, {
      key: 'onResize',
      value: function onResize(scope, width, column) {
        scope.onResize({
          column: column,
          width: width
        });
      }
    }, {
      key: 'onCheckboxChange',
      value: function onCheckboxChange(scope) {
        scope.onCheckboxChange();
      }
    }]);

    return HeaderCellController;
  })();

  function HeaderDirective($timeout) {

    return {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'header',
      scope: {
        options: '=',
        columns: '=',
        columnWidths: '=',
        onSort: '&',
        onResize: '&',
        onCheckboxChange: '&'
      },
      template: '\n        <div class="dt-header" ng-style="header.styles(this)">\n          <div class="dt-header-inner" ng-style="header.innerStyles(this)">\n            <div class="dt-row-left"\n                 ng-style="header.stylesByGroup(this, \'left\')"\n                 ng-if="columns[\'left\'].length"\n                 sortable="options.reorderable"\n                 on-sortable-sort="columnsResorted(event, childScope)">\n              <dt-header-cell ng-repeat="column in columns[\'left\'] track by column.$id" \n                              on-checkbox-change="header.onCheckboxChange(this)"\n                              on-sort="header.onSort(this, column)"\n                              on-resize="header.onResize(this, column, width)"\n                              selected="header.isSelected(this)"\n                              column="column">\n              </dt-header-cell>\n            </div>\n            <div class="dt-row-center" \n                 sortable="options.reorderable"\n                 ng-style="header.stylesByGroup(this, \'center\')"\n                 on-sortable-sort="columnsResorted(event, childScope)">\n              <dt-header-cell ng-repeat="column in columns[\'center\'] track by column.$id" \n                              on-checkbox-change="header.onCheckboxChange(this)"\n                              on-sort="header.onSort(this, column)"\n                              selected="header.isSelected(this)"\n                              on-resize="header.onResize(this, column, width)"\n                              column="column">\n              </dt-header-cell>\n            </div>\n            <div class="dt-row-right"\n                 ng-if="columns[\'right\'].length"\n                 sortable="options.reorderable"\n                 ng-style="header.stylesByGroup(this, \'right\')"\n                 on-sortable-sort="columnsResorted(event, childScope)">\n              <dt-header-cell ng-repeat="column in columns[\'right\'] track by column.$id" \n                              on-checkbox-change="header.onCheckboxChange(this)"\n                              on-sort="header.onSort(this, column)"\n                              selected="header.isSelected(this)"\n                              on-resize="header.onResize(this, column, width)"\n                              column="column">\n              </dt-header-cell>\n            </div>\n          </div>\n        </div>',
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
            angular.forEach($scope.columns, function (group) {
              var idx = group.indexOf(col);
              if (idx > -1) {
                group.splice(idx, 1);
                group.splice(newIdx, 0, col);
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
      _classCallCheck(this, HeaderController);
    }

    _createClass(HeaderController, [{
      key: 'styles',
      value: function styles(scope) {
        return {
          width: scope.options.internal.innerWidth + 'px',
          height: scope.options.headerHeight + 'px'
        };
      }
    }, {
      key: 'innerStyles',
      value: function innerStyles(scope) {
        return {
          width: scope.columnWidths.total + 'px'
        };
      }
    }, {
      key: 'onSort',
      value: function onSort(scope, column) {
        scope.onSort({
          column: column
        });
      }
    }, {
      key: 'stylesByGroup',
      value: function stylesByGroup(scope, group) {
        var styles = {
          width: scope.columnWidths[group] + 'px'
        };

        if (group === 'center') {
          styles['transform'] = 'translate3d(-' + scope.options.internal.offsetX + 'px, 0, 0)';
        } else if (group === 'right') {
          var offset = scope.columnWidths.total - scope.options.internal.innerWidth;
          styles.transform = 'translate3d(-' + offset + 'px, 0, 0)';
        }

        return styles;
      }
    }, {
      key: 'onCheckboxChange',
      value: function onCheckboxChange(scope) {
        scope.onCheckboxChange();
      }
    }, {
      key: 'onResize',
      value: function onResize(scope, column, width) {
        scope.onResize({
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

  function Sortable($timeout) {
    return {
      restrict: 'AC',
      scope: {
        isSortable: '=sortable',
        onSortableSort: '&'
      },
      link: function link($scope, $element, $attrs) {
        var rootEl = $element[0],
            dragEl,
            nextEl,
            dropEl;

        $timeout(function () {
          angular.forEach(rootEl.children, function (el) {
            el.draggable = true;
          });
        });

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
  Sortable.$inject = ["$timeout"];

  function Resizable($document, debounce, $timeout) {
    return {
      restrict: 'AEC',
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

        var handle = angular.element('<span class="dt-resize-handle" title="Resize"></span>'),
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
  Resizable.$inject = ["$document", "debounce", "$timeout"];

  function ScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  function DataTableDirective($window, $timeout, throttle) {
    return {
      restrict: 'E',
      replace: true,
      transclude: 'element',
      controller: 'DataTable',
      scope: {
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
      template: '<div class="dt" ng-class="dt.tableCss(this)">\n            <dt-header options="options"\n                       on-checkbox-change="dt.onHeaderCheckboxChange(this)"\n                       columns="dt.columnsByPin"\n                       column-widths="dt.columnWidths"\n                       ng-if="options.headerHeight"\n                       on-resize="dt.onResize(this, column, width)"\n                       selected="dt.isAllRowsSelected(this)"\n                       on-sort="dt.onSort(this)">\n            </dt-header>\n            <dt-body rows="rows"\n                     selected="selected"\n                     expanded="expanded"\n                     columns="dt.columnsByPin"\n                     on-select="dt.onSelect(this, rows)"\n                     on-row-click="dt.onRowClick(this, row)"\n                     column-widths="dt.columnWidths"\n                     options="options"\n                     on-page="dt.onBodyPage(this, offset, size)"\n                     on-tree-toggle="dt.onTreeToggle(this, row, cell)">\n             </dt-body>\n            <dt-footer ng-if="options.footerHeight"\n                       ng-style="{ height: options.footerHeight + \'px\' }"\n                       on-page="dt.onFooterPage(this, offset, size)"\n                       paging="options.paging">\n             </dt-footer>\n          </div>',
      compile: function compile(tElem, tAttrs) {
        return {
          pre: function pre($scope, $elm, $attrs, ctrl) {
            $scope.options.internal.scrollBarWidth = ScrollbarWidth();

            function resize() {
              var rect = $elm[0].getBoundingClientRect();

              $scope.options.internal.innerWidth = Math.floor(rect.width);

              if ($scope.options.scrollbarV) {
                var height = rect.height;

                if ($scope.options.headerHeight) {
                  height = height - $scope.options.headerHeight;
                }

                if ($scope.options.footerHeight) {
                  height = height - $scope.options.footerHeight;
                }

                $scope.options.internal.bodyHeight = height;
              }

              ctrl.adjustColumns();
              ctrl.calculatePageSize();
            }

            $timeout(resize);
            $elm.addClass('dt-loaded');
            angular.element($window).bind('resize', throttle(function () {
              $timeout(resize);
            }));
          }
        };
      }
    };
  }
  DataTableDirective.$inject = ["$window", "$timeout", "throttle"];
  ;

  var data_table = angular.module('data-table', []).controller('DataTable', DataTableController).directive('dt', DataTableDirective).directive('resizable', Resizable).directive('sortable', Sortable).constant('debounce', debounce).constant('throttle', throttle).controller('HeaderController', HeaderController).directive('dtHeader', HeaderDirective).controller('HeaderCellController', HeaderCellController).directive('dtHeaderCell', HeaderCellDirective).controller('BodyController', BodyController).directive('dtBody', BodyDirective).controller('RowController', RowController).directive('dtRow', RowDirective).controller('GroupRowController', GroupRowController).directive('dtGroupRow', GroupRowDirective).controller('CellController', CellController).directive('dtCell', CellDirective).controller('FooterController', FooterController).directive('dtFooter', FooterDirective).controller('PagerController', PagerController).directive('dtPager', PagerDirective);

  return data_table;
});