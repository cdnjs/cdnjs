"format register";
System.register("utils/polyfill", [], function(_export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      (function() {
        function polyfill(fnName) {
          if (!Array.prototype[fnName]) {
            Array.prototype[fnName] = function(predicate) {
              var i,
                  len,
                  test,
                  thisArg = arguments[1];
              if (typeof predicate !== "function") {
                throw new TypeError();
              }
              test = !thisArg ? predicate : function() {
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
    }
  };
});

System.register("utils/throttle", ["npm:angular@1.4.0"], function(_export) {
  'use strict';
  var angular;
  _export('debounce', debounce);
  _export('throttle', throttle);
  function debounce(func, wait, immediate) {
    var timeout,
        args,
        context,
        timestamp,
        result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function later() {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }
  function throttle(func, wait, options) {
    var context,
        args,
        result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function later() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date();
      if (!previous && options.leading === false)
        previous = now;
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
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }],
    execute: function() {
      ;
      ;
    }
  };
});

System.register("components/footer/pager", [], function(_export) {
  'use strict';
  var pagerConfig,
      paginationConfig;
  function PaginationController($scope, $attrs, $parse) {
    var self = this,
        ngModelCtrl = {$setViewValue: angular.noop},
        setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    this.init = function(ngModelCtrl_, config) {
      ngModelCtrl = ngModelCtrl_;
      this.config = config;
      ngModelCtrl.$render = function() {
        self.render();
      };
      if ($attrs.itemsPerPage) {
        $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
          self.itemsPerPage = parseInt(value, 10);
          $scope.totalPages = self.calculateTotalPages();
        });
      } else {
        this.itemsPerPage = config.itemsPerPage;
      }
      $scope.$watch('totalItems', function() {
        $scope.totalPages = self.calculateTotalPages();
      });
      $scope.$watch('totalPages', function(value) {
        setNumPages($scope.$parent, value);
        if ($scope.page > value) {
          $scope.selectPage(value);
        } else {
          ngModelCtrl.$render();
        }
      });
    };
    this.calculateTotalPages = function() {
      var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
      return Math.max(totalPages || 0, 1);
    };
    this.render = function() {
      $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
    };
    $scope.selectPage = function(page, evt) {
      if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
        if (evt && evt.target) {
          evt.target.blur();
        }
        ngModelCtrl.$setViewValue(page);
        ngModelCtrl.$render();
      }
    };
    $scope.getText = function(key) {
      return $scope[key + 'Text'] || self.config[key + 'Text'];
    };
    $scope.noPrevious = function() {
      return $scope.page === 1;
    };
    $scope.noNext = function() {
      return $scope.page === $scope.totalPages;
    };
  }
  function pagination($parse, paginationConfig) {
    return {
      restrict: 'EA',
      scope: {
        totalItems: '=',
        firstText: '@',
        previousText: '@',
        nextText: '@',
        lastText: '@'
      },
      require: ['pagination', '?ngModel'],
      controller: 'PaginationController',
      templateUrl: 'template/pagination/pagination.html',
      replace: true,
      link: function link(scope, element, attrs, ctrls) {
        var paginationCtrl = ctrls[0],
            ngModelCtrl = ctrls[1];
        if (!ngModelCtrl) {
          return ;
        }
        var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
            rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
        scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
        scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
        paginationCtrl.init(ngModelCtrl, paginationConfig);
        if (attrs.maxSize) {
          scope.$parent.$watch($parse(attrs.maxSize), function(value) {
            maxSize = parseInt(value, 10);
            paginationCtrl.render();
          });
        }
        function makePage(number, text, isActive) {
          return {
            number: number,
            text: text,
            active: isActive
          };
        }
        function getPages(currentPage, totalPages) {
          var pages = [];
          var startPage = 1,
              endPage = totalPages;
          var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;
          if (isMaxSized) {
            if (rotate) {
              startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
              endPage = startPage + maxSize - 1;
              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - maxSize + 1;
              }
            } else {
              startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;
              endPage = Math.min(startPage + maxSize - 1, totalPages);
            }
          }
          for (var number = startPage; number <= endPage; number++) {
            var page = makePage(number, number, number === currentPage);
            pages.push(page);
          }
          if (isMaxSized && !rotate) {
            if (startPage > 1) {
              var previousPageSet = makePage(startPage - 1, '...', false);
              pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
              var nextPageSet = makePage(endPage + 1, '...', false);
              pages.push(nextPageSet);
            }
          }
          return pages;
        }
        var originalRender = paginationCtrl.render;
        paginationCtrl.render = function() {
          originalRender();
          if (scope.page > 0 && scope.page <= scope.totalPages) {
            scope.pages = getPages(scope.page, scope.totalPages);
          }
        };
      }
    };
  }
  function pager(pagerConfig) {
    return {
      restrict: 'EA',
      scope: {
        totalItems: '=',
        previousText: '@',
        nextText: '@'
      },
      require: ['pager', '?ngModel'],
      controller: 'PaginationController',
      templateUrl: 'template/pagination/pager.html',
      replace: true,
      link: function link(scope, element, attrs, ctrls) {
        var paginationCtrl = ctrls[0],
            ngModelCtrl = ctrls[1];
        if (!ngModelCtrl) {
          return ;
        }
        scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
        paginationCtrl.init(ngModelCtrl, pagerConfig);
      }
    };
  }
  function run($templateCache) {
    $templateCache.put('template/pagination/pager.html', '<ul class="pager">\n' + '  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{getText(\'previous\')}}</a></li>\n' + '  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1, $event)">{{getText(\'next\')}}</a></li>\n' + '</ul>');
    $templateCache.put('template/pagination/pagination.html', '<ul class="pagination">\n' + '  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1, $event)">{{getText(\'first\')}}</a></li>\n' + '  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1, $event)">{{getText(\'previous\')}}</a></li>\n' + '  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n' + '  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1, $event)">{{getText(\'next\')}}</a></li>\n' + '  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages, $event)">{{getText(\'last\')}}</a></li>\n' + '</ul>');
  }
  return {
    setters: [],
    execute: function() {
      pagerConfig = {
        itemsPerPage: 10,
        previousText: '« Previous',
        nextText: 'Next »',
        align: true
      };
      paginationConfig = {
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        rotate: true
      };
      ;
      ;
      ;
      _export('default', angular.module('pager', []).run(run).constant('pagerConfig', pagerConfig).constant('paginationConfig', paginationConfig).controller('PaginationController', PaginationController).directive('pager', pager).directive('pagination', pagination));
    }
  };
});

System.register("utils/resizable", [], function(_export) {
  'use strict';
  _export('Resizable', Resizable);
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
            parent = $element.parent();
        handle.on('mousedown', function(event) {
          if (!$element[0].classList.contains('resizable')) {
            return false;
          }
          event.stopPropagation();
          event.preventDefault();
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });
        function mousemove(event) {
          var width = parent[0].scrollWidth,
              newWidth = width + event.movementX;
          if ((!$scope.minWidth || newWidth >= $scope.minWidth) && (!$scope.maxWidth || newWidth <= $scope.maxWidth)) {
            parent.css({width: newWidth + 'px'});
          }
        }
        function mouseup() {
          if ($scope.onResize) {
            $timeout(function() {
              $scope.onResize({width: parent[0].scrollWidth});
            });
          }
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
        $element.append(handle);
      }
    };
  }
  return {
    setters: [],
    execute: function() {
      ;
    }
  };
});

System.register("utils/sortable", ["npm:angular@1.4.0"], function(_export) {
  'use strict';
  var angular;
  _export('Sortable', Sortable);
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
        $timeout(function() {
          angular.forEach(rootEl.children, function(el) {
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
        }
        ;
        function onDragEnter(e) {
          var target = e.target;
          if (isbefore(dragEl, target)) {
            target.parentNode.insertBefore(dragEl, target);
          } else if (target.nextSibling && target.hasAttribute('draggable')) {
            target.parentNode.insertBefore(dragEl, target.nextSibling);
          }
        }
        ;
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
        }
        ;
        function onDragStart(evt) {
          if (!$scope.isSortable)
            return false;
          dragEl = evt.target;
          nextEl = dragEl.nextSibling;
          dragEl.classList.add('dt-clone');
          evt.dataTransfer.effectAllowed = 'move';
          evt.dataTransfer.setData('Text', dragEl.textContent);
          $element.on('dragenter', onDragEnter);
          $element.on('dragend', onDragEnd);
        }
        ;
        $element.on('dragstart', onDragStart);
        $scope.$on('$destroy', function() {
          $element.off('dragstart', onDragStart);
        });
      }
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }],
    execute: function() {}
  };
});

System.register("utils/utils", ["utils/math"], function(_export) {
  'use strict';
  var ColumnTotalWidth,
      requestAnimFrame;
  _export('ColumnsByPin', ColumnsByPin);
  _export('ColumnGroupWidths', ColumnGroupWidths);
  _export('DeepValueGetter', DeepValueGetter);
  function ColumnsByPin(cols) {
    var ret = {
      left: [],
      center: [],
      right: []
    };
    for (var i = 0,
        len = cols.length; i < len; i++) {
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
  function ColumnGroupWidths(groups, all) {
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }
  function DeepValueGetter(obj, path) {
    if (!obj || !path)
      return obj;
    var current = obj,
        split = path.split('.');
    if (split.length) {
      for (var i = 0,
          len = split.length; i < len; i++) {
        current = current[split[i]];
      }
    }
    return current;
  }
  return {
    setters: [function(_utilsMath) {
      ColumnTotalWidth = _utilsMath.ColumnTotalWidth;
    }],
    execute: function() {
      requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
      _export('requestAnimFrame', requestAnimFrame);
      ;
      ;
    }
  };
});

System.register("defaults", [], function(_export) {
  'use strict';
  var TableDefaults,
      ColumnDefaults;
  return {
    setters: [],
    execute: function() {
      TableDefaults = Object.freeze({
        scrollbarV: true,
        rowHeight: 30,
        forceFillColumns: false,
        loadingMessage: 'Loading...',
        emptyMessage: 'No data to display',
        headerHeight: 50,
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
      _export('TableDefaults', TableDefaults);
      ColumnDefaults = Object.freeze({
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
      _export('ColumnDefaults', ColumnDefaults);
    }
  };
});

System.register("components/header/header", ["npm:angular@1.4.0", "utils/sortable"], function(_export) {
  'use strict';
  var angular,
      Sortable,
      HeaderController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('HeaderDirective', HeaderDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
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
      template: '\n      <div class="dt-header" ng-style="header.styles(this)">\n        <div class="dt-header-inner" ng-style="header.innerStyles(this)">\n          <div class="dt-row-left"\n               ng-style="header.stylesByGroup(this, \'left\')"\n               sortable="options.reorderable"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'left\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            on-resize="header.onResize(this, column, width)"\n                            selected="header.isSelected(this)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n          <div class="dt-row-center" \n               sortable="options.reorderable"\n               ng-style="header.stylesByGroup(this, \'center\')"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'center\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            selected="header.isSelected(this)"\n                            on-resize="header.onResize(this, column, width)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n          <div class="dt-row-right"\n               sortable="options.reorderable"\n               ng-style="header.stylesByGroup(this, \'right\')"\n               on-sortable-sort="columnsResorted(event, childScope)">\n            <dt-header-cell ng-repeat="column in columns[\'right\'] track by column.name" \n                            on-checkbox-change="header.onCheckboxChange(this)"\n                            on-sort="header.onSort(this, column)"\n                            selected="header.isSelected(this)"\n                            on-resize="header.onResize(this, column, width)"\n                            column="column">\n            </dt-header-cell>\n          </div>\n        </div>\n      </div>',
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {
        $scope.columnsResorted = function(event, childScope) {
          var col = childScope.column,
              parent = angular.element(event.currentTarget),
              newIdx = -1;
          angular.forEach(parent.children(), function(c, i) {
            if (childScope === angular.element(c).scope()) {
              newIdx = i;
            }
          });
          $timeout(function() {
            angular.forEach($scope.columns, function(group) {
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
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsSortable) {
      Sortable = _utilsSortable.Sortable;
    }],
    execute: function() {
      HeaderController = (function() {
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
            return {width: scope.columnWidths.total + 'px'};
          }
        }, {
          key: 'onSort',
          value: function onSort(scope, column) {
            scope.onSort({column: column});
          }
        }, {
          key: 'stylesByGroup',
          value: function stylesByGroup(scope, group) {
            var styles = {width: scope.columnWidths[group] + 'px'};
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
      _export('HeaderController', HeaderController);
      ;
      ;
    }
  };
});

System.register("components/header/header-cell", ["npm:angular@1.4.0", "utils/resizable"], function(_export) {
  'use strict';
  var angular,
      Resizable,
      HeaderCellController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('HeaderCellDirective', HeaderCellDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
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
      template: '<div ng-class="hcell.cellClass(this)"\n            ng-style="hcell.styles(this)"\n            title="{{::column.name}}">\n        <div resizable="column.resizable" \n             on-resize="hcell.onResize(this, width, column)"\n             min-width="column.minWidth"\n             max-width="column.maxWidth">\n          <label ng-if="column.isCheckboxColumn && column.headerCheckbox" class="dt-checkbox">\n            <input type="checkbox" \n                   ng-checked="selected"\n                   ng-click="hcell.onCheckboxChange(this)" />\n          </label>\n          <span class="dt-header-cell-label" \n                ng-click="hcell.sort(this)">\n          </span>\n          <span ng-class="hcell.sortClass(this)"></span>\n        </div>\n      </div>',
      compile: function compile() {
        return {pre: function pre($scope, $elm, $attrs, ctrl) {
            var label = $elm[0].querySelector('.dt-header-cell-label');
            if ($scope.column.headerRenderer) {
              var elm = angular.element($scope.column.headerRenderer($scope, $elm));
              angular.element(label).append($compile(elm)($scope)[0]);
            } else {
              var val = $scope.column.name;
              if (val === undefined || val === null)
                val = '';
              label.innerHTML = val;
            }
          }};
      }
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsResizable) {
      Resizable = _utilsResizable.Resizable;
    }],
    execute: function() {
      HeaderCellController = (function() {
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
              scope.onSort({column: scope.column});
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
      _export('HeaderCellController', HeaderCellController);
      ;
    }
  };
});

System.register("utils/keys", [], function(_export) {
  "use strict";
  var KEYS;
  return {
    setters: [],
    execute: function() {
      KEYS = {
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
      _export("KEYS", KEYS);
    }
  };
});

System.register("components/body/row", ["npm:angular@1.4.0", "utils/utils"], function(_export) {
  'use strict';
  var angular,
      DeepValueGetter,
      RowController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('RowDirective', RowDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function RowDirective() {
    return {
      restrict: 'E',
      controller: 'RowController',
      controllerAs: 'row',
      scope: {
        value: '=',
        columns: '=',
        columnWidths: '=',
        expanded: '=',
        selected: '=',
        hasChildren: '=',
        options: '=',
        onCheckboxChange: '&',
        onTreeToggle: '&'
      },
      template: '\n      <div class="dt-row">\n        <div class="dt-row-left dt-row-block" ng-style="row.stylesByGroup(this, \'left\')">\n          <dt-cell ng-repeat="column in columns[\'left\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   selected="selected"\n                   expanded="expanded"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n        <div class="dt-row-center dt-row-block" ng-style="row.stylesByGroup(this, \'center\')">\n          <dt-cell ng-repeat="column in columns[\'center\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   expanded="expanded"\n                   selected="selected"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n        <div class="dt-row-right dt-row-block" ng-style="row.stylesByGroup(this, \'right\')">\n          <dt-cell ng-repeat="column in columns[\'right\'] track by $index"\n                   on-tree-toggle="row.onTreeToggle(this, cell)"\n                   column="column"\n                   has-children="hasChildren"\n                   selected="selected"\n                   on-checkbox-change="row.onCheckboxChange(this)"\n                   expanded="expanded"\n                   value="row.getValue(this, column)">\n          </dt-cell>\n        </div>\n      </div>',
      replace: true
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsUtils) {
      DeepValueGetter = _utilsUtils.DeepValueGetter;
    }],
    execute: function() {
      RowController = (function() {
        function RowController() {
          _classCallCheck(this, RowController);
        }
        _createClass(RowController, [{
          key: 'getValue',
          value: function getValue(scope, col) {
            return DeepValueGetter(scope.value, col.prop);
          }
        }, {
          key: 'onTreeToggle',
          value: function onTreeToggle(scope, cell) {
            scope.onTreeToggle({
              cell: cell,
              row: scope.value
            });
          }
        }, {
          key: 'stylesByGroup',
          value: function stylesByGroup(scope, group) {
            var styles = {width: scope.columnWidths[group] + 'px'};
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
            scope.onCheckboxChange({row: scope.value});
          }
        }]);
        return RowController;
      })();
      _export('RowController', RowController);
      ;
    }
  };
});

System.register("components/body/group-row", ["npm:angular@1.4.0"], function(_export) {
  'use strict';
  var angular,
      GroupRowController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('GroupRowDirective', GroupRowDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function GroupRowDirective() {
    return {
      restrict: 'E',
      controller: 'GroupRowController',
      controllerAs: 'group',
      scope: {
        value: '=',
        onGroupToggle: '&',
        expanded: '='
      },
      replace: true,
      template: '\n      <div class="dt-group-row">\n        <span ng-class="group.treeClass(this)"\n              ng-click="group.onGroupToggle($event, this)">\n        </span>\n        <span class="dt-group-row-label">\n          {{value.name}}\n        </span>\n      </div>'
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }],
    execute: function() {
      GroupRowController = (function() {
        function GroupRowController() {
          _classCallCheck(this, GroupRowController);
        }
        _createClass(GroupRowController, [{
          key: 'onGroupToggle',
          value: function onGroupToggle(evt, scope) {
            evt.stopPropagation();
            scope.onGroupToggle({group: scope.value});
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
      _export('GroupRowController', GroupRowController);
      ;
    }
  };
});

System.register("components/body/cell", ["npm:angular@1.4.0"], function(_export) {
  'use strict';
  var angular,
      CellController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('CellDirective', CellDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function CellDirective($rootScope, $compile, $log) {
    return {
      restrict: 'E',
      controller: 'CellController',
      controllerAs: 'cell',
      scope: {
        value: '=',
        selected: '=',
        column: '=',
        expanded: '=',
        hasChildren: '=',
        onTreeToggle: '&',
        onCheckboxChange: '&'
      },
      template: '<div class="dt-cell" \n            data-title="{{::column.name}}" \n            ng-style="cell.styles(column)"\n            ng-class="cell.cellClass(column)">\n        <label ng-if="column.isCheckboxColumn" class="dt-checkbox">\n          <input type="checkbox" \n                 ng-checked="selected"\n                 ng-click="cell.onCheckboxChange(this)" />\n        </label>\n        <span ng-if="column.isTreeColumn && hasChildren"\n              ng-class="cell.treeClass(this)"\n              ng-click="cell.onTreeToggle($event, this)"></span>\n        <span class="dt-cell-content"></span>\n      </div>',
      replace: true,
      compile: function compile() {
        return {pre: function pre($scope, $elm, $attrs, ctrl) {
            var content = angular.element($elm[0].querySelector('.dt-cell-content'));
            $scope.$watch('value', function() {
              content.empty();
              if ($scope.column.cellRenderer) {
                var elm = angular.element($scope.column.cellRenderer($scope, content));
                content.append($compile(elm)($scope));
              } else {
                content[0].innerHTML = ctrl.getValue($scope);
              }
            });
          }};
      }
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }],
    execute: function() {
      CellController = (function() {
        function CellController() {
          _classCallCheck(this, CellController);
        }
        _createClass(CellController, [{
          key: 'styles',
          value: function styles(col) {
            return {width: col.width + 'px'};
          }
        }, {
          key: 'cellClass',
          value: function cellClass(col) {
            var style = {'dt-tree-col': col.isTreeColumn};
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
            scope.onTreeToggle({cell: {
                value: scope.value,
                column: scope.column,
                expanded: scope.expanded
              }});
          }
        }, {
          key: 'onCheckboxChange',
          value: function onCheckboxChange(scope) {
            scope.onCheckboxChange();
          }
        }, {
          key: 'getValue',
          value: function getValue(scope) {
            var val = scope.column.cellDataGetter ? scope.column.cellDataGetter(scope.value) : scope.value;
            if (val === undefined || val === null)
              val = '';
            return val;
          }
        }]);
        return CellController;
      })();
      _export('CellController', CellController);
      ;
      ;
    }
  };
});

System.register("components/footer/footer", ["npm:angular@1.4.0"], function(_export) {
  'use strict';
  var angular,
      FooterController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('FooterDirective', FooterDirective);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function FooterDirective() {
    return {
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'footer',
      scope: {
        paging: '=',
        onPage: '&'
      },
      template: '<div class="dt-footer">\n        <div class="page-count">{{paging.count}} total</div>\n        <pagination direction-links="true"\n                    boundary-links="true"\n                    items-per-page="paging.size"\n                    total-items="paging.count"\n                    ng-show="paging.count > 1"\n                    ng-change="footer.pageChanged(this)"\n                    previous-text="&lsaquo;"\n                    next-text="&rsaquo;"\n                    first-text="&laquo;"\n                    last-text="&raquo;"\n                    rotate="false"\n                    max-size="5"\n                    ng-model="page">\n        </pagination>\n      </div>',
      replace: true
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }],
    execute: function() {
      FooterController = (function() {
        function FooterController($scope) {
          _classCallCheck(this, FooterController);
          this.$scope = $scope;
          $scope.page = $scope.paging.offset + 1;
          $scope.$watch('paging.offset', this.offsetChanged.bind(this));
        }
        _createClass(FooterController, [{
          key: 'offsetChanged',
          value: function offsetChanged(newVal) {
            this.$scope.page = newVal + 1;
          }
        }, {
          key: 'pageChanged',
          value: function pageChanged(scope) {
            scope.paging.offset = scope.page - 1;
            scope.onPage({
              offset: scope.paging.offset,
              size: scope.paging.size
            });
          }
        }]);
        return FooterController;
      })();
      _export('FooterController', FooterController);
      ;
      ;
    }
  };
});

System.register("github:systemjs/plugin-css@0.1.10/css", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (typeof window !== 'undefined') {
    var waitSeconds = 100;
    var head = document.getElementsByTagName('head')[0];
    var links = document.getElementsByTagName('link');
    var linkHrefs = [];
    for (var i = 0; i < links.length; i++) {
      linkHrefs.push(links[i].href);
    }
    var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
    var webkitLoadCheck = function(link, callback) {
      setTimeout(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href)
            return callback();
        }
        webkitLoadCheck(link, callback);
      }, 10);
    };
    var noop = function() {};
    var loadCSS = function(url) {
      return new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
          reject('Unable to load CSS');
        }, waitSeconds * 1000);
        var _callback = function() {
          clearTimeout(timeout);
          link.onload = noop;
          setTimeout(function() {
            resolve('');
          }, 7);
        };
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        if (!isWebkit)
          link.onload = _callback;
        else
          webkitLoadCheck(link, _callback);
        head.appendChild(link);
      });
    };
    exports.fetch = function(load) {
      for (var i = 0; i < linkHrefs.length; i++)
        if (load.address == linkHrefs[i])
          return '';
      return loadCSS(load.address);
    };
  } else {
    exports.fetch = function(load) {
      if (this.buildCSS === false)
        load.metadata.build = false;
      load.metadata.format = 'defined';
      return '';
    };
    exports.bundle = function(loads, opts) {
      var loader = this;
      if (loader.buildCSS === false)
        return '';
      return loader.import('./css-builder', {name: module.id}).then(function(builder) {
        return builder.call(loader, loads, opts);
      });
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("utils/math", ["npm:angular@1.4.0", "utils/utils"], function(_export) {
  'use strict';
  var angular,
      ColumnsByPin,
      ColumnGroupWidths;
  _export('ColumnTotalWidth', ColumnTotalWidth);
  _export('GetTotalFlexGrow', GetTotalFlexGrow);
  _export('DistributeFlexWidth', DistributeFlexWidth);
  _export('AdjustColumnWidths', AdjustColumnWidths);
  _export('ForceFillColumnWidths', ForceFillColumnWidths);
  function ColumnTotalWidth(columns) {
    var totalWidth = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      for (var _iterator = columns[Symbol.iterator](),
          _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;
        totalWidth += c.width;
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
    return totalWidth;
  }
  function GetTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
    try {
      for (var _iterator2 = columns[Symbol.iterator](),
          _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var c = _step2.value;
        totalFlexGrow += c.flexGrow || 0;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
    return totalFlexGrow;
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
    for (var i = 0,
        len = columns.length; i < len; i++) {
      var column = columns[i];
      if (!column.flexGrow) {
        totalWidth += column.width;
        return ;
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
    return {width: totalWidth};
  }
  function AdjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = ColumnTotalWidth(allColumns),
        remainingFlexGrow = GetTotalFlexGrow(allColumns),
        remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0),
        colsByGroup = ColumnsByPin(allColumns);
    angular.forEach(colsByGroup, function(cols) {
      var columnGroupFlexGrow = GetTotalFlexGrow(cols),
          columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnSettings = DistributeFlexWidth(cols, columnGroupFlexWidth);
      remainingFlexGrow -= columnGroupFlexGrow;
      remainingFlexWidth -= columnGroupFlexWidth;
    });
  }
  function ForceFillColumnWidths(allColumns, expectedWidth) {
    var colsByGroup = ColumnsByPin(allColumns),
        widthsByGroup = ColumnGroupWidths(colsByGroup, allColumns),
        availableWidth = expectedWidth - (widthsByGroup.left + widthsByGroup.right);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;
    try {
      for (var _iterator3 = colsByGroup.center[Symbol.iterator](),
          _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _column = _step3.value;
        if (_column.$$oldWidth) {
          _column.width = _column.$$oldWidth;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
    var contentWidth = ColumnTotalWidth(colsByGroup.center),
        remainingWidth = availableWidth - contentWidth,
        additionWidthPerColumn = Math.floor(remainingWidth / colsByGroup.center.length),
        oldLargerThanNew = contentWidth > widthsByGroup.center;
    for (var i = 0,
        len = allColumns.length; i < len; i++) {
      var column = allColumns[i];
      if (!column.frozenLeft && !column.frozenRight) {
        if (!column.$$oldWidth) {
          column.$$oldWidth = column.width;
        }
        var newSize = column.width + additionWidthPerColumn;
        column.width = oldLargerThanNew ? column.$$oldWidth : newSize;
      }
    }
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsUtils) {
      ColumnsByPin = _utilsUtils.ColumnsByPin;
      ColumnGroupWidths = _utilsUtils.ColumnGroupWidths;
    }],
    execute: function() {}
  };
});

System.register("components/body/body", ["npm:angular@1.4.0", "utils/utils", "utils/keys"], function(_export) {
  'use strict';
  var angular,
      requestAnimFrame,
      ColumnsByPin,
      KEYS,
      BodyController,
      BodyHelper;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  _export('BodyDirective', BodyDirective);
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function BodyDirective($timeout) {
    return {
      restrict: 'E',
      controller: 'BodyController',
      controllerAs: 'body',
      scope: {
        columns: '=',
        columnWidths: '=',
        values: '=',
        options: '=',
        selected: '=',
        expanded: '=',
        onPage: '&',
        onTreeToggle: '&'
      },
      template: '\n      <div class="dt-body" ng-style="body.styles()">\n        <div class="dt-body-scroller" ng-style="body.scrollerStyles()">\n          <dt-group-row ng-repeat-start="r in body.rows track by $index"\n                        ng-if="r.group"\n                        ng-style="body.groupRowStyles(this, r)" \n                        on-group-toggle="body.onGroupToggle(this, group)"\n                        expanded="body.getRowExpanded(this, r)"\n                        tabindex="{{$index}}"\n                        value="r">\n          </dt-group-row>\n          <dt-row ng-repeat-end\n                  ng-if="!r.group"\n                  value="body.getRowValue($index)"\n                  tabindex="{{$index}}"\n                  columns="columns"\n                  column-widths="columnWidths"\n                  ng-keydown="body.keyDown($event, $index, r)"\n                  ng-click="body.rowClicked($event, $index, r)"\n                  on-tree-toggle="body.onTreeToggle(this, row, cell)"\n                  ng-class="body.rowClasses(this, r)"\n                  options="options"\n                  selected="body.isSelected(r)"\n                  on-checkbox-change="body.onCheckboxChange($index, row)"\n                  columns="body.columnsByPin"\n                  has-children="body.getRowHasChildren(r)"\n                  expanded="body.getRowExpanded(this, r)"\n                  ng-style="body.rowStyles(this, r)">\n          </dt-row>\n        </div>\n        <div ng-if="values && !values.length" \n             class="empty-row" \n             ng-bind="::options.emptyMessage">\n       </div>\n       <div ng-if="values === undefined" \n             class="loading-row"\n             ng-bind="::options.loadingMessage">\n       </div>\n      </div>',
      replace: true,
      link: function link($scope, $elm, $attrs, ctrl) {
        var ticking = false,
            lastScrollY = 0,
            lastScrollX = 0,
            helper = BodyHelper.create($elm);
        function update() {
          $timeout(function() {
            $scope.options.internal.offsetY = lastScrollY;
            $scope.options.internal.offsetX = lastScrollX;
            ctrl.updatePage();
          });
          ticking = false;
        }
        ;
        function requestTick() {
          if (!ticking) {
            requestAnimFrame(update);
            ticking = true;
          }
        }
        ;
        $elm.on('scroll', function(ev) {
          lastScrollY = this.scrollTop;
          lastScrollX = this.scrollLeft;
          requestTick();
        });
      }
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsUtils) {
      requestAnimFrame = _utilsUtils.requestAnimFrame;
      ColumnsByPin = _utilsUtils.ColumnsByPin;
    }, function(_utilsKeys) {
      KEYS = _utilsKeys.KEYS;
    }],
    execute: function() {
      BodyController = (function() {
        function BodyController($scope, $timeout, throttle) {
          var _this = this;
          _classCallCheck(this, BodyController);
          angular.extend(this, {
            $scope: $scope,
            options: $scope.options,
            selected: $scope.selected
          });
          this.rows = [];
          this._viewportRowsStart = 0;
          this._viewportRowsEnd = 0;
          this.treeColumn = $scope.options.columns.find(function(c) {
            return c.isTreeColumn;
          });
          this.groupColumn = $scope.options.columns.find(function(c) {
            return c.group;
          });
          if (this.options.scrollbarV) {
            $scope.$watch('options.internal.offsetY', throttle(this.getRows.bind(this), 10));
          }
          $scope.$watchCollection('values', function(newVal, oldVal) {
            if (newVal) {
              if (!_this.options.paging.externalPaging) {
                _this.options.paging.count = newVal.length;
              }
              _this.count = _this.options.paging.count;
              if (_this.treeColumn || _this.groupColumn) {
                _this.buildRowsByGroup();
              }
              if (_this.options.scrollbarV) {
                _this.getRows();
              } else {
                var _rows;
                var values = $scope.values;
                if (_this.treeColumn) {
                  values = _this.buildTree();
                } else if (_this.groupColumn) {
                  values = _this.buildGroups();
                }
                _this.rows.splice(0, _this.rows.length);
                (_rows = _this.rows).push.apply(_rows, _toConsumableArray(values));
              }
            }
          });
          if (this.options.scrollbarV) {
            $scope.$watch('options.internal.offsetY', this.updatePage.bind(this));
            $scope.$watch('options.paging.offset', function(newVal) {
              $scope.onPage({
                offset: newVal,
                size: _this.options.paging.size
              });
            });
          }
        }
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
            for (var i = 0,
                len = this.$scope.values.length; i < len; i++) {
              var row = this.$scope.values[i];
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
            var _this2 = this;
            var temp = [];
            angular.forEach(this.rowsByGroup, function(v, k) {
              temp.push({
                name: k,
                group: true
              });
              if (_this2.$scope.expanded[k]) {
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
            for (var i = 0,
                len = this.$scope.values.length; i < len; i++) {
              var row = this.$scope.values[i],
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
                this.rows.splice(0, this.rows.length);
              }
            } else if (this.groupColumn) {
              temp = this.groupsTemp || [];
              if (refresh || !this.groupsTemp) {
                this.groupsTemp = temp = this.buildGroups();
                this.count = temp.length;
              }
            } else {
              temp = this.$scope.values;
            }
            var idx = 0,
                indexes = this.getFirstLastIndexes(),
                rowIndex = indexes.first;
            while (rowIndex < indexes.last || this.options.internal.bodyHeight < this._viewportHeight && rowIndex < this.count) {
              var row = temp[rowIndex];
              if (row) {
                row.$$index = rowIndex;
                this.rows[idx] = row;
              }
              idx++;
              this._viewportRowsEnd = rowIndex++;
            }
          }
        }, {
          key: 'styles',
          value: function styles() {
            var styles = {width: this.options.internal.innerWidth + 'px'};
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
            var styles = {height: scope.options.rowHeight + 'px'};
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
            var styles = {'selected': this.isSelected(row)};
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
              if (this.$scope.onSelect) {
                this.$scope.onSelect({row: row});
              }
            }
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
                  }
                }
                this.prevIndex = index;
              } else {
                this.selected = row;
              }
            }
          }
        }, {
          key: 'selectRowsBetween',
          value: function selectRowsBetween(index) {
            for (var i = 0,
                len = this.rows.length; i < len; i++) {
              var row = this.rows[i];
              if (i >= this.prevIndex && i <= index) {
                var idx = this.selected.indexOf(row);
                if (idx === -1) {
                  this.selected.push(row);
                }
              }
            }
          }
        }, {
          key: 'scrollerStyles',
          value: function scrollerStyles() {
            return {height: this.count * this.options.rowHeight + 'px'};
          }
        }, {
          key: 'getRowValue',
          value: function getRowValue(idx) {
            return this.rows[idx];
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
            if (!this.treeColumn)
              return ;
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
              var _rows2;
              var values = this.buildTree();
              this.rows.splice(0, this.rows.length);
              (_rows2 = this.rows).push.apply(_rows2, _toConsumableArray(values));
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
              var _rows3;
              var values = this.buildGroups();
              this.rows.splice(0, this.rows.length);
              (_rows3 = this.rows).push.apply(_rows3, _toConsumableArray(values));
            }
          }
        }]);
        return BodyController;
      })();
      _export('BodyController', BodyController);
      BodyHelper = (function() {
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
      _export('BodyHelper', BodyHelper);
      ;
    }
  };
});

System.register("data-table", ["npm:angular@1.4.0", "utils/polyfill", "utils/throttle", "components/footer/pager", "utils/resizable", "utils/sortable", "utils/math", "utils/utils", "defaults", "components/header/header", "components/header/header-cell", "components/body/body", "components/body/row", "components/body/group-row", "components/body/cell", "components/footer/footer", "data-table.css!github:systemjs/plugin-css@0.1.10"], function(_export) {
  'use strict';
  var angular,
      debounce,
      throttle,
      Pager,
      Resizable,
      Sortable,
      AdjustColumnWidths,
      ForceFillColumnWidths,
      ColumnsByPin,
      ColumnGroupWidths,
      TableDefaults,
      ColumnDefaults,
      HeaderController,
      HeaderDirective,
      HeaderCellDirective,
      HeaderCellController,
      BodyController,
      BodyHelper,
      BodyDirective,
      RowController,
      RowDirective,
      GroupRowController,
      GroupRowDirective,
      CellController,
      CellDirective,
      FooterController,
      FooterDirective,
      DataTableController;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function DataTableDirective($window, $timeout, throttle) {
    return {
      restrict: 'E',
      replace: true,
      controller: 'DataTable',
      scope: {
        options: '=',
        values: '=',
        selected: '=',
        expanded: '=',
        onSelect: '&',
        onSort: '&',
        onTreeToggle: '&',
        onPage: '&'
      },
      controllerAs: 'dt',
      template: '<div class="dt material" ng-class="dt.tableCss(this)">\n        <dt-header options="options"\n                   on-checkbox-change="dt.onHeaderCheckboxChange(this)"\n                   columns="dt.columnsByPin"\n                   column-widths="dt.columnWidths"\n                   ng-if="options.headerHeight"\n                   on-resize="dt.onResize(this, column, width)"\n                   selected="dt.isAllRowsSelected(this)"\n                   on-sort="dt.onSort(this)">\n        </dt-header>\n        <dt-body values="values"\n                 selected="selected"\n                 expanded="expanded"\n                 columns="dt.columnsByPin"\n                 column-widths="dt.columnWidths"\n                 options="options"\n                 on-page="dt.onBodyPage(this, offset, size)"\n                 on-tree-toggle="dt.onTreeToggle(this, row, cell)">\n         </dt-body>\n        <dt-footer ng-if="options.footerHeight"\n                   ng-style="{ height: options.footerHeight + \'px\' }"\n                   on-page="dt.onFooterPage(this, offset, size)"\n                   paging="options.paging">\n         </dt-footer>\n      </div>',
      compile: function compile(tElem, tAttrs) {
        return {pre: function pre($scope, $elm, $attrs, ctrl) {
            function resize() {
              $scope.options.internal.innerWidth = $elm[0].offsetWidth;
              if ($scope.options.scrollbarV) {
                var height = $elm[0].offsetHeight;
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
            resize();
            angular.element($window).bind('resize', throttle(function() {
              $timeout(resize);
            }));
          }};
      }
    };
  }
  return {
    setters: [function(_angular) {
      angular = _angular['default'];
    }, function(_utilsPolyfill) {}, function(_utilsThrottle) {
      debounce = _utilsThrottle.debounce;
      throttle = _utilsThrottle.throttle;
    }, function(_componentsFooterPager) {
      Pager = _componentsFooterPager['default'];
    }, function(_utilsResizable) {
      Resizable = _utilsResizable.Resizable;
    }, function(_utilsSortable) {
      Sortable = _utilsSortable.Sortable;
    }, function(_utilsMath) {
      AdjustColumnWidths = _utilsMath.AdjustColumnWidths;
      ForceFillColumnWidths = _utilsMath.ForceFillColumnWidths;
    }, function(_utilsUtils) {
      ColumnsByPin = _utilsUtils.ColumnsByPin;
      ColumnGroupWidths = _utilsUtils.ColumnGroupWidths;
    }, function(_defaults) {
      TableDefaults = _defaults.TableDefaults;
      ColumnDefaults = _defaults.ColumnDefaults;
    }, function(_componentsHeaderHeader) {
      HeaderController = _componentsHeaderHeader.HeaderController;
      HeaderDirective = _componentsHeaderHeader.HeaderDirective;
    }, function(_componentsHeaderHeaderCell) {
      HeaderCellDirective = _componentsHeaderHeaderCell.HeaderCellDirective;
      HeaderCellController = _componentsHeaderHeaderCell.HeaderCellController;
    }, function(_componentsBodyBody) {
      BodyController = _componentsBodyBody.BodyController;
      BodyHelper = _componentsBodyBody.BodyHelper;
      BodyDirective = _componentsBodyBody.BodyDirective;
    }, function(_componentsBodyRow) {
      RowController = _componentsBodyRow.RowController;
      RowDirective = _componentsBodyRow.RowDirective;
    }, function(_componentsBodyGroupRow) {
      GroupRowController = _componentsBodyGroupRow.GroupRowController;
      GroupRowDirective = _componentsBodyGroupRow.GroupRowDirective;
    }, function(_componentsBodyCell) {
      CellController = _componentsBodyCell.CellController;
      CellDirective = _componentsBodyCell.CellDirective;
    }, function(_componentsFooterFooter) {
      FooterController = _componentsFooterFooter.FooterController;
      FooterDirective = _componentsFooterFooter.FooterDirective;
    }, function(_dataTableCss) {}],
    execute: function() {
      DataTableController = (function() {
        function DataTableController($scope, $filter, $log) {
          var _this = this;
          _classCallCheck(this, DataTableController);
          angular.extend(this, {
            $scope: $scope,
            $filter: $filter,
            $log: $log
          });
          this.defaults($scope);
          $scope.$watch('options.columns', function(newVal, oldVal) {
            if (newVal.length > oldVal.length) {
              _this.transposeColumnDefaults(newVal);
            }
            _this.calculateColumns(newVal);
          }, true);
        }
        _createClass(DataTableController, [{
          key: 'defaults',
          value: function defaults($scope) {
            var _this2 = this;
            $scope.expanded = $scope.expanded || {};
            var options = angular.extend(angular.copy(TableDefaults), $scope.options);
            options.paging = angular.extend(angular.copy(TableDefaults.paging), $scope.options.paging);
            this.transposeColumnDefaults(options.columns);
            $scope.options = options;
            if ($scope.options.selectable && $scope.options.multiSelect) {
              $scope.selected = $scope.selected || [];
            }
            var watch = $scope.$watch('values', function(newVal) {
              if (newVal) {
                watch();
                _this2.onSort($scope);
              }
            });
          }
        }, {
          key: 'transposeColumnDefaults',
          value: function transposeColumnDefaults(columns) {
            for (var i = 0,
                len = columns.length; i < len; i++) {
              var column = columns[i];
              column = angular.extend(angular.copy(ColumnDefaults), column);
              if (!column.name) {
                this.$log.warn('\'Name\' property expected but not defined.', element);
                column.name = Math.random();
              }
              columns[i] = column;
            }
          }
        }, {
          key: 'calculateColumns',
          value: function calculateColumns(columns) {
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
          value: function adjustColumns() {
            if (this.$scope.options.forceFillColumns) {
              ForceFillColumnWidths(this.$scope.options.columns, this.$scope.options.internal.innerWidth);
            } else {
              AdjustColumnWidths(this.$scope.options.columns, this.$scope.options.internal.innerWidth);
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
            if (!scope.values)
              return ;
            var sorts = scope.options.columns.filter(function(c) {
              return c.sort;
            });
            if (sorts.length) {
              if (this.$scope.onSort) {
                this.$scope.onSort({sorts: sorts});
              }
              var clientSorts = [];
              for (var i = 0,
                  len = sorts.length; i < len; i++) {
                var c = sorts[i];
                if (c.comparator !== false) {
                  var dir = c.sort === 'asc' ? '' : '-';
                  clientSorts.push(dir + c.prop);
                }
              }
              if (clientSorts.length) {
                var _scope$values;
                var sortedValues = this.$filter('orderBy')(scope.values, clientSorts);
                scope.values.splice(0, scope.values.length);
                (_scope$values = scope.values).push.apply(_scope$values, _toConsumableArray(sortedValues));
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
            scope.onPage({
              offset: offset,
              size: size
            });
          }
        }, {
          key: 'onHeaderCheckboxChange',
          value: function onHeaderCheckboxChange(scope) {
            if (scope.values) {
              var matches = scope.selected.length === scope.values.length;
              scope.selected.splice(0, scope.selected.length);
              if (!matches) {
                var _scope$selected;
                (_scope$selected = scope.selected).push.apply(_scope$selected, _toConsumableArray(scope.values));
              }
            }
          }
        }, {
          key: 'isAllRowsSelected',
          value: function isAllRowsSelected(scope) {
            if (!scope.values)
              return false;
            return scope.selected.length === scope.values.length;
          }
        }, {
          key: 'onResize',
          value: function onResize(scope, column, width) {
            var idx = scope.options.columns.indexOf(column);
            if (idx > -1) {
              scope.options.columns[idx].width = width;
              this.calculateColumns(scope.options.columns);
            }
          }
        }]);
        return DataTableController;
      })();
      ;
      _export('default', angular.module('data-table', [Pager.name]).controller('DataTable', DataTableController).directive('dt', DataTableDirective).directive('resizable', Resizable).directive('sortable', Sortable).constant('debounce', debounce).constant('throttle', throttle).controller('HeaderController', HeaderController).directive('dtHeader', HeaderDirective).controller('HeaderCellController', HeaderCellController).directive('dtHeaderCell', HeaderCellDirective).controller('BodyController', BodyController).directive('dtBody', BodyDirective).controller('RowController', RowController).directive('dtRow', RowDirective).controller('GroupRowController', GroupRowController).directive('dtGroupRow', GroupRowDirective).controller('CellController', CellController).directive('dtCell', CellDirective).controller('FooterController', FooterController).directive('dtFooter', FooterDirective));
    }
  };
});
