/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.3.1 - 2014-11-10
 * License: MIT
 */
angular.module("ngTasty", ["ngTasty.filter","ngTasty.service","ngTasty.table"]);
/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.filter', [
  'ngTasty.filter.cleanFieldName',
  'ngTasty.filter.filterInt',
  'ngTasty.filter.range'
]);

/**
 * @ngdoc filter
 * @name cleanFieldName
 *
 * @description
 * Calling toString will return the ...
 *
 * @example
  ng-bind="key | cleanFieldName"
 *
 */
angular.module('ngTasty.filter.cleanFieldName', [])
.filter('cleanFieldName', function() {
  return function (input) {
    return input.replace(/[^a-zA-Z0-9-]+/g, '-');
  };
});

/**
 * @ngdoc filter
 * @name filterInt
 * @kind function
 *
 */
angular.module('ngTasty.filter.filterInt', [])
.filter('filterInt', function() {
  return function (input) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(input)) {
      return Number(input);
    }
    return NaN;
  };
});

/**
 * @ngdoc filter
 * @name range
 * @kind function
 *
 * @description
 * Create a list containing arithmetic progressions. The arguments must 
 * be plain integers. If the step argument is omitted, it defaults to 1. 
 * If the start argument is omitted, it defaults to 0.
 *
 * @example
  ng-repeat="n in [] | range:1:30"
 */
angular.module('ngTasty.filter.range', [])
.filter('range', ["$filter", function($filter) {
  return function(input, start, stop, step) {
    start = $filter('filterInt')(start);
    stop = $filter('filterInt')(stop);
    step = $filter('filterInt')(step);
    if (isNaN(start)) {
      start = 0;
    }
    if (isNaN(stop)) {
      stop = start;
      start = 0;
    }
    if (isNaN(step)) {
      step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)){
      return [];
    }
    for (var i = start; step > 0 ? i < stop : i > stop; i += step){
      input.push(i);
    }
    return input;
  };
}]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service', [
  'ngTasty.service.tastyUtil',
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects',
  'ngTasty.service.webSocket'
]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.tastyUtil', [
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects'
])
.factory('tastyUtil', ["debounce", "setProperty", "joinObjects", function(debounce, setProperty, joinObjects) {
  return {
    'debounce': debounce,
    'setProperty': setProperty,
    'joinObjects': joinObjects
  };
}]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.debounce', [])
.factory('debounce', ["$timeout", function($timeout) {
  return function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      $timeout.cancel(timeout);
      timeout = $timeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };
}]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.setProperty', [])
.factory('setProperty', function() {
  return function(objOne, objTwo, attrname) {
    if (typeof objTwo[attrname] !== 'undefined' && 
        objTwo[attrname] !== null) {
      objOne[attrname] = objTwo[attrname];
    }
    return objOne;
  };
});

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.joinObjects', [])
.factory('joinObjects', ["setProperty", function(setProperty) {
  return function(objOne, objTwo, listKeyNotJoin) {
    listKeyNotJoin = listKeyNotJoin || [];
    for (var attrname in objTwo) {
      if (listKeyNotJoin.indexOf(attrname) < 0) {
        setProperty(objOne, objTwo, attrname);
      }
    }
    return objOne;
  };
}]);

angular.module('ngTasty.service.webSocket', [
  'ngTasty.service'
])
.factory('WebSocket', function() {
  
  return function(url) {
    var blobURL = URL.createObjectURL(new Blob(['(', function() {
      var WSWorker = (function() {
        var _ws;

        var initialize = function(url) {
          _ws = new WebSocket(url);
        };

        var on = function(event) {
          _ws.onmessage = function(response) {
            var data = JSON.parse(response.data);
            self.postMessage(data);
          };
        };

        var send = function(data) {
          _ws.send(data);
        };

        return {
          initialize: initialize,
          on: on,
          send: send
        };

      })();

      self.addEventListener('message', function(e) {
        switch (e.data.cmd) {
          case 'ws_new':
            WSWorker.initialize(e.data.url);
            break;
          case 'ws_on':
            WSWorker.on(e.data.event, e.data.cb);
            break;
          case 'ws_send':
            WSWorker.send(JSON.stringify(e.data.data));
            break;
          default:
            console.log('Unknown command: ' + e.data.cmd);
          }
      });

    }.toString(), ')()'], { type: 'application/javascript' }));

    var _worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);

    _worker.postMessage({ cmd: 'ws_new', url: url });

    return {
      on: function(event, cb) {
        _worker.postMessage({ cmd: 'ws_on' });
        _worker.addEventListener('message', function(e) {
          if (event === 'all' || e.data.type === event) {
            cb(e.data);
          } 
        });
      },
      send: function(data) {
        _worker.postMessage({ cmd: 'ws_send', data: data });
      }
    };

  };
});

/**
 * @ngdoc directive
 * @name tastyTable
 *
 * @example
  <table tasty-table>
    <tbody></tbody>
  </table>
 *
 */
angular.module('ngTasty.table', [
  'ngTasty.filter.cleanFieldName',
  'ngTasty.filter.range',
  'ngTasty.service.tastyUtil'
])
.constant('tableConfig', {
  init: {
    'count': 5,
    'page': 1,
    'sortBy': undefined,
    'sortOrder': undefined
  },
  query: {
    'page': 'page',
    'count': 'count',
    'sortBy': 'sort-by',
    'sortOrder': 'sort-order',
  },
  listItemsPerPage: [5, 25, 50, 100],
  itemsPerPage: 5,
  bindOnce: true
})
.controller('TableController', ["$scope", "$attrs", "$timeout", "$filter", "$parse", "tableConfig", "tastyUtil", function($scope, $attrs, $timeout, $filter, $parse, tableConfig, tastyUtil) {
  'use strict';
  var listScopeToWatch, initTable;
  this.$scope = $scope;

  listScopeToWatch = ['filters', 'init', 'query', 'resource', 'resourceCallback'];
  listScopeToWatch.forEach(function (scopeName) {
    var lastValue, parentGet, compare, parentSet, parentValueWatch;
    if (!$attrs[scopeName]) {
      return;
    }
    parentGet = $parse($attrs[scopeName]);
    if (parentGet.literal) {
      compare = equals;
    } else {
      compare = function(a,b) { return a === b || (a !== a && b !== b); };
    }
    parentSet = parentGet.assign;
    lastValue = $scope[scopeName] = parentGet($scope.$parent);
    parentValueWatch = function parentValueWatch(parentValue) {
      if (!compare(parentValue, $scope[scopeName])) {
        // we are out of sync and need to copy
        if (!compare(parentValue, lastValue)) {
          // parent changed and it has precedence
          $scope[scopeName] = parentValue;
        } else {
          // if the parent can be assigned then do so
          parentSet($scope.$parent, parentValue = $scope[scopeName]);
        }
      }
      return lastValue = parentValue;
    };
    parentValueWatch.$stateful = true;
    $scope.$parent.$watch($parse($attrs[scopeName], parentValueWatch), null, parentGet.literal);
  });

  // Default configs
  $scope.query = $scope.query || tableConfig.query;
  $scope.init = $scope.init || {};
  $scope.init.count = $scope.init.count || tableConfig.init.count;
  $scope.init.page = $scope.init.page || tableConfig.init.page;
  $scope.init.sortBy = $scope.init.sortBy || tableConfig.init.sortBy;
  $scope.init.sortOrder = $scope.init.sortOrder || tableConfig.init.sortOrder;

  // Defualt variables
  $scope.clientSide = true;
  $scope.url = '';
  $scope.header = {
    'columns': []
  };
  $scope.rows = [];
  $scope.params = {};
  $scope.pagination = {
    'count': $scope.init.count,
    'page': $scope.init.page,
    'pages': 1,
    'size': 0
  };
  $scope.theadDirective = false;
  $scope.paginationDirective = false; 

  /* Set custom configs
   * In the future you will have a way to change
   * these values by an isolate optional scope variable,
   * more info here https://github.com/angular/angular.js/issues/6404 */
  if (!angular.isDefined($attrs.resource) && !angular.isDefined($attrs.resourceCallback)) {
    throw 'AngularJS tastyTable directive: need the resource or resource-callback attribute';
  }
  if (angular.isDefined($attrs.resource)) {
    if (!angular.isObject($scope.resource)) {
      throw 'AngularJS tastyTable directive: the resource ('+
        $attrs.resource + ') it\'s not an object';
    } else if (!$scope.resource.header && !$scope.resource.rows) {
      throw 'AngularJS tastyTable directive: the resource ('+
        $attrs.resource + ') has the property header or rows undefined';
    }
  }
  if (angular.isDefined($attrs.resourceCallback)) {
    if (!angular.isFunction($scope.resourceCallback)) {
      throw 'AngularJS tastyTable directive: the resource-callback ('+
        $attrs.resourceCallback + ') it\'s not a function';
    }
    $scope.clientSide = false;
  }   

  // In TableController, by using `this` we build an API 
  // for other directives to talk to this one.
  this.activate = function(directiveName) {
    $scope[directiveName + 'Directive'] = true;
    $scope.params[directiveName] = true;
  };

  this.setParams = function(key, value) {
    $scope.params[key] = value;
    if (['sortBy', 'sortOrder'].indexOf(key) >= 0) {
      $scope.header[key] = value;
    }
  };

  this.bindOnce = tableConfig.bindOnce;

  $scope.setDirectivesValues = function (resource) {
    if (!angular.isObject(resource)) {
      throw 'AngularJS tastyTable directive: the resource '+
            'it\'s not an object';
    } else if (!resource.header && !resource.rows) {
      throw 'AngularJS tastyTable directive: the resource '+
            'has the property header or rows undefined';
    }
    // Assuming if one header uses just one key it's based on the new pattern.
    // [feature request] simplified header for resources #37 by @WebReflection
    if (Object.keys(resource.header[0]).length === 1) {
      resource.header = resource.header.map(function (header) {
        var key = Object.keys(header)[0];
        return {
          key: key,
          name: header[key]
        };
      });
    }
    $scope.header = {
      'columns': resource.header,
      'sortBy': $scope.params.sortBy,
      'sortOrder': $scope.params.sortOrder
    };
    $scope.rows = resource.rows;
    if ($scope.paginationDirective && resource.pagination) {
      $scope.pagination.count = resource.pagination.count;
      $scope.pagination.page = resource.pagination.page;
      $scope.pagination.pages = resource.pagination.pages;
      $scope.pagination.size = resource.pagination.size;
    }
  };

  $scope.buildClientResource = function() {
    var fromRow, toRow, rowToShow, reverse, listSortBy;
    if ($scope.theadDirective) {
      reverse = $scope.header.sortOrder === 'asc' ? false : true;
      listSortBy = [function(item) {
        return item[$scope.header.sortBy];
      }];
      if ($scope.header.columns[0].key !== $scope.header.sortBy) {
        listSortBy.push(function(item) {
          return item[$scope.header.columns[0].key];
        });
      }
      if ($scope.header.sortBy) {
        $scope.rows = $filter('orderBy')($scope.rows, listSortBy, reverse);
      }
    }
    if ($attrs.filters) {
      $scope.rows = $filter('filter')($scope.rows, $scope.filters);
    }
    if ($scope.paginationDirective) {
      $scope.pagination.page = $scope.params.page;
      $scope.pagination.count = $scope.params.count;
      $scope.pagination.size = $scope.rows.length;
      $scope.pagination.pages = Math.ceil($scope.rows.length / $scope.pagination.count);
      toRow = $scope.pagination.count * $scope.pagination.page;
      fromRow = toRow - $scope.pagination.count;
      if (fromRow >= 0 && toRow >= 0) {
        rowToShow = $scope.rows.slice(fromRow, toRow);
        $scope.rows = rowToShow;
      }
    }
  };

  $scope.buildUrl = function(params, filters) {
    var urlQuery, value, url, listKeyNotJoin;
    urlQuery = {};
    listKeyNotJoin = ['sortBy', 'sortOrder', 'page', 'count'];
    if ($scope.theadDirective) {
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'sortBy');
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'sortOrder');
    }
    if ($scope.paginationDirective) {
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'page');
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'count');
    }
    if ($attrs.filters) {
      urlQuery = tastyUtil.joinObjects(urlQuery, filters, listKeyNotJoin);
    }
    return Object.keys(urlQuery).map(function(key) {
      value = urlQuery[key];
      if ($scope.query[key]) {
        key = $scope.query[key];
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).join('&');
  };

  $scope.updateClientSideResource = tastyUtil.debounce(function() {
    $scope.setDirectivesValues($scope.resource);
    $scope.buildClientResource();
  }, 60);

  $scope.updateServerSideResource = tastyUtil.debounce(function() {
    $scope.url = $scope.buildUrl($scope.params, $scope.filters);
    $scope.resourceCallback($scope.url, $scope.params).then(function (resource) {
      $scope.setDirectivesValues(resource);
    });
  }, 60);

  initTable = function () {
    if ($scope.clientSide) {
      $scope.params.sortBy = $scope.resource.sortBy || $scope.init.sortBy;
      $scope.params.sortOrder = $scope.resource.sortOrder || $scope.init.sortOrder;
      $scope.params.page = $scope.init.page;
      if ($scope.resource.pagination) {
        $scope.params.page = $scope.resource.pagination.page || $scope.init.page;
      }
      $scope.updateClientSideResource();
    } else {
      $scope.params.sortBy = $scope.init.sortBy;
      $scope.params.sortOrder = $scope.init.sortOrder;
      $scope.params.page = $scope.init.page;
      $scope.updateServerSideResource();
    }
  };
  
  // AngularJs $watch callbacks
  if ($attrs.filters) {
    $scope.$watch('filters', function (newValue, oldValue){
      if (newValue !== oldValue) {
        if ($scope.clientSide) {
          $scope.updateClientSideResource();
        } else {
          $scope.updateServerSideResource();
        }
      }
    }, true);
  }
  $scope.$watchCollection('params', function (newValue, oldValue){
    if (newValue !== oldValue) {
      if ($scope.clientSide) {
        $scope.updateClientSideResource();
      } else {
        $scope.updateServerSideResource();
      }
    }
  });
  if ($scope.resource) {
    $scope.$watch('resource', function (newValue, oldValue){
      if (newValue !== oldValue) {
        $scope.params.sortBy = newValue.sortBy;
        $scope.params.sortOrder = newValue.sortOrder;
        $scope.updateClientSideResource();
      }
    }, true);
  }

  // Init table
  initTable();
}])
.directive('tastyTable', function(){
  return {
    restrict: 'A',
    scope: true,
    controller: 'TableController'
  };
})

/**
 * @ngdoc directive
 * @name tastyThead
 *
 * @example
  <table tasty-table>
    <thead table-head></thead>
    <tbody></tbody>
  </table>
 *
 */
.directive('tastyThead', ["$filter", function($filter) {
  return {
    restrict: 'AE',
    require: '^tastyTable',
    scope: {
      'notSortBy': '='
    },
    templateUrl: 'template/table/head.html',
    link: function (scope, element, attrs, tastyTable) {
      'use strict';
      var iconUp, iconDown;
      // Thead it's called
      tastyTable.activate('thead');
      scope.bindOnce = tastyTable.bindOnce;
      scope.columns = [];

      iconUp = 'fa fa-sort-up';
      iconDown = 'fa fa-sort-down';

      scope.setColumns = function () {
        var lenHeader, width, i, active, sortable, sort, isSorted;
        scope.columns = [];
        lenHeader = scope.header.columns.length;
        scope.header.columns.forEach(function (column, index) {
          width = parseFloat((100 / lenHeader).toFixed(2));
          sortable = true;
          active = false;
          isSorted = '';
          if (scope.notSortBy) {
            sortable = scope.notSortBy.indexOf(column.key) < 0;
          }
          if (column.key === scope.header.sortBy ||
              '-' + column.key === scope.header.sortBy) {
            active = true;
          }
          sort = $filter('cleanFieldName')(column.key);
          if (scope.header.sortBy === '-' + sort) {
            isSorted = iconDown;
          } else if (scope.header.sortBy === sort) {
            isSorted = iconUp;
          }
          scope.columns.push({
            'key': column.key,
            'name': column.name,
            'active': active,
            'sortable': sortable,
            'width': { 'width': width + '%' },
            'isSorted': isSorted
          });
        });
        if (scope.header.sortOrder === 'dsc' && 
            scope.header.sortBy &&
            scope.header.sortBy[0] !== '-') {
          scope.header.sortBy = '-' + scope.header.sortBy;
        }
      };

      scope.sortBy = function (column) {
        if (scope.notSortBy && scope.notSortBy.indexOf(column.key) >= 0) {
          return false;
        }
        var columnName, sortOrder;
        columnName = $filter('cleanFieldName')(column.key);
        if (scope.header.sortBy === columnName) {
          sortOrder = 'dsc';
        } else {
          sortOrder = 'asc';
        }
        tastyTable.setParams('sortBy', column.key);
        tastyTable.setParams('sortOrder', sortOrder);
      };

      scope.classToShow = function (column) {
        var listClassToShow = [];
        if (column.sortable) {
          listClassToShow.push('sortable');
        }
        if (column.active) {
          listClassToShow.push('active');
        }
        return listClassToShow;
      };

      tastyTable.$scope.$watchCollection('header', function (newValue, oldValue){
        if (newValue && (newValue !== oldValue)) {
          scope.header = newValue;
          scope.setColumns();
        }
      });
    }
  };
}])

/**
 * @ngdoc directive
 * @name tastyPagination
 *
 * @example
  <div tasty-table>
    <table>
     ...
    </table>
    <div table-pagination></div>
  </div>
 *
 */
.controller('TablePaginationController', ["$scope", "$attrs", "tableConfig", function($scope, $attrs, tableConfig) {
  if (angular.isDefined($attrs.itemsPerPage)) {
    $scope.itemsPerPage = $scope.$parent[$attrs.itemsPerPage];
  }
  if (angular.isDefined($attrs.listItemsPerPage)) {
    $scope.listItemsPerPage = $scope.$parent[$attrs.listItemsPerPage];
  }
  // Default configs
  $scope.itemsPerPage = $scope.itemsPerPage || tableConfig.itemsPerPage;
  $scope.listItemsPerPage = $scope.listItemsPerPage || tableConfig.listItemsPerPage;
}])
.directive('tastyPagination', ["$filter", function($filter) {
  return {
    restrict: 'AE',
    require: '^tastyTable',
    scope: {},
    templateUrl: 'template/table/pagination.html',
    controller: 'TablePaginationController',
    link: function (scope, element, attrs, tastyTable) {
      'use strict';
      var getPage, setCount, setPaginationRange,
          setPreviousRange, setRemainingRange,
          setPaginationRanges;

      // Pagination it's called
      tastyTable.activate('pagination');

      // Internal variable
      scope.pagination = {};
      scope.pagMinRange = 1;
      scope.pagMaxRange = 1;

      getPage = function (numPage) {
        tastyTable.setParams('page', numPage);
      };

      setCount = function(count) {
        var maxItems, page;
        maxItems = count * scope.pagination.page;
        if (maxItems > scope.pagination.size) {
          page = Math.ceil(scope.pagination.size / count);
          tastyTable.setParams('page', page);
        }
        tastyTable.setParams('count', count);
      };

      setPaginationRange = function () {
        var currentPage, totalPages;
        currentPage = scope.pagination.page;
        if (currentPage > scope.pagination.pages) {
          currentPage = scope.pagination.pages;
        }
        scope.pagMinRange = (currentPage - 2) > 0 ? (currentPage - 2) : 1;
        scope.pagMaxRange = (currentPage + 2);
        scope.pagination.page  = currentPage;
        setPaginationRanges();
      };

      setPreviousRange = function () {
        if (scope.pagHideMinRange === true || scope.pagMinRange < 1) {
          return false;
        }
        scope.pagMaxRange = scope.pagMinRange;
        scope.pagMinRange = scope.pagMaxRange - scope.itemsPerPage;
        setPaginationRanges();
      };

      setRemainingRange = function () {
        if (scope.pagHideMaxRange === true || scope.pagMaxRange > scope.pagination.pages) {
          return false;
        }
        scope.pagMinRange = scope.pagMaxRange;
        scope.pagMaxRange = scope.pagMinRange + scope.itemsPerPage;
        if (scope.pagMaxRange > scope.pagination.pages) {
          scope.pagMaxRange = scope.pagination.pages;
        }
        scope.pagMinRange = scope.pagMaxRange - scope.itemsPerPage;
        setPaginationRanges();
      };

      setPaginationRanges =  function () {
        scope.listItemsPerPageShow = [];
        scope.pagMinRange = scope.pagMinRange > 0 ? scope.pagMinRange : 1;
        scope.pagMaxRange = scope.pagMinRange + 5;
        if (scope.pagMaxRange > scope.pagination.pages) {
          scope.pagMaxRange = scope.pagination.pages + 1;
        }
        scope.pagHideMinRange = scope.pagMinRange <= 1;
        scope.pagHideMaxRange = scope.pagMaxRange >= scope.pagination.pages;
        scope.classPageMinRange = scope.pagHideMinRange ? 'disabled' : '';
        scope.classPageMaxRange = scope.pagHideMaxRange ? 'disabled' : '';

        for (var i = scope.listItemsPerPage.length; i >= 0; i--) {
          if (scope.pagination.size > scope.listItemsPerPage[i]) {
            scope.listItemsPerPageShow = scope.listItemsPerPage.slice(0, (i + 1));
            break;
          }
        }

        scope.rangePage = $filter('range')([], scope.pagMinRange, scope.pagMaxRange);
      };

      scope.classPaginationCount = function (count) {
        if (count == scope.pagination.count) {
          return 'active';
        }
        return '';
      };

      scope.classNumPage = function (numPage) {
        if (numPage == scope.pagination.page) {
          return 'active';
        }
        return false;
      };

      scope.page = {
        'get': getPage,
        'setCount': setCount,
        'previous': setPreviousRange,
        'remaining': setRemainingRange
      };

      tastyTable.$scope.$watchCollection('pagination', function (newValue, oldValue){
        if (newValue && (newValue !== oldValue)) {
          scope.pagination = newValue;
          setPaginationRange();
        }
      });

      // Init Pagination
      scope.page.setCount(scope.itemsPerPage);
    }
  };
}]);
