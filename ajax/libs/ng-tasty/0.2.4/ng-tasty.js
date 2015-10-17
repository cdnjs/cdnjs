/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.2.4 - 2014-08-13
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
    return input.replace(/[^a-zA-Z0-9-]+/g, '-').toLowerCase();
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
angular.module('ngTasty.filter.range', ['ngTasty.service.filterInt'])
.filter('range', [
  'filterInt',
  function(filterInt) {
    return function(input, start, stop, step) {
      start = filterInt(start);
      stop = filterInt(stop);
      step = filterInt(step);
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
  }
]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service', [
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects'
]);

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.filterInt', [])
.factory('filterInt', function() {
  return function (value) {
    if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }
});

/**
 * @ngdoc 
 * @name 
 *
 */
angular.module('ngTasty.service.debounce', [])
.factory('debounce', [
  '$timeout',
  function($timeout) {
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
  }
]);

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
.factory('joinObjects', [
  'setProperty',
  function(setProperty) {
    return function(objOne, objTwo) {
      for (var attrname in objTwo) {
        setProperty(objOne, objTwo, attrname);
      }
      return objOne;
    };
  }
]);

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
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects'
])
.constant('tableConfig', {
  query: {
    'page': 'page',
    'count': 'count',
    'sortBy': 'sort-by',
    'sortOrder': 'sort-order',
  },
  resource: undefined,
  resourceCallback: undefined
})
.controller('TableController', [
  '$scope', 
  '$attrs',
  '$timeout',
  '$filter',
  'tableConfig',
  'debounce',
  'setProperty',
  'joinObjects',
  function($scope, $attrs, $timeout, $filter, tableConfig, debounce, setProperty, joinObjects) {
    'use strict';
    this.$scope = $scope;

    // Default configs
    $scope.query = tableConfig.query;
    $scope.resource = tableConfig.resource;
    $scope.resourceCallback = tableConfig.resourceCallback;

    // Defualt variables
    $scope.clientSide = true;
    $scope.url = '';
    $scope.header = {
      'columns': []
    };
    $scope.rows = [];
    $scope.params = {};
    $scope.pagination = {
      'count': 5,
      'page': 1,
      'pages': 1,
      'size': 1
    };
    $scope.theadDirective = false;
    $scope.paginationDirective = false;

    // Set custom configs
    if (angular.isDefined($attrs.query)) {
      $scope.query = $scope.$parent.$eval($attrs.query);
    }
    if (!angular.isDefined($attrs.resource) && !angular.isDefined($attrs.resourceCallback)) {
      throw 'AngularJS tastyTable directive: need the resource or resource-callback attribute';
    }
    if (angular.isDefined($attrs.resource)) {
      $scope.resource = $scope.$parent.$eval($attrs.resource);
      if (!angular.isObject($scope.resource)) {
        throw 'AngularJS tastyTable directive: the resource ('+
          $attrs.resource + ') it\'s not an object';
      } else if (!$scope.resource.header && !$scope.resource.rows) {
        throw 'AngularJS tastyTable directive: the resource ('+
          $attrs.resource + ') has the property header or rows undefined';
      }
    }
    if (angular.isDefined($attrs.resourceCallback)) {
      $scope.resourceCallback = $scope.$parent.$eval($attrs.resourceCallback);
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
    };

    $scope.setDirectivesValues = function (resource) {
      if (!resource) {
        return false;
      }
      $scope.header = {
        'columns': resource.header,
        'sortBy': resource.sortBy || $scope.params.sortBy,
        'sortOrder': resource.sortOrder || $scope.params.sortOrder
      };
      $scope.rows = resource.rows;
      $scope.pagination = resource.pagination || $scope.pagination;
    };

    $scope.buildClientResource = function() {
      var fromRow, toRow, rowToShow, reverse;
      if ($scope.theadDirective) {
        reverse = $scope.header.sortOrder === 'asc' ? false : true;
        $scope.rows = $filter('orderBy')($scope.rows, $scope.header.sortBy, reverse);
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
      var urlQuery, value, url;
      urlQuery = {};
      if ($scope.theadDirective) {
        urlQuery = setProperty(urlQuery, params, 'sortBy');
        urlQuery = setProperty(urlQuery, params, 'sortOrder');
      }
      if ($scope.paginationDirective) {
        urlQuery = setProperty(urlQuery, params, 'page');
        urlQuery = setProperty(urlQuery, params, 'count');
      }
      if ($attrs.filters) {
        urlQuery = joinObjects(urlQuery, filters);
      }
      return Object.keys(urlQuery).map(function(key) {
        value = urlQuery[key];
        if ($scope.query[key]) {
          key = $scope.query[key];
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }).join('&');
    };

    $scope.updateClientSideResource = debounce(function() {
      $scope.setDirectivesValues($scope.resource);
      $scope.buildClientResource();
    }, 100);

    $scope.updateServerSideResource = debounce(function() {
      $scope.url = $scope.buildUrl($scope.params, $scope[$attrs.filters]);
      $scope.resourceCallback($scope.url).then(function (resource) {
        $scope.setDirectivesValues(resource);
      });
    }, 100);

    $scope.initTable = function () {
      $scope.params['sortBy'] = undefined;
      $scope.params['sortOrder'] = 'asc';
      $scope.params['page'] = 1;
      $scope.params['count'] = 5;
      if ($scope.clientSide) {
        $scope.updateClientSideResource();
      } else {
        $scope.updateServerSideResource();
      }
    };
    
    // AngularJs $watch callbacks
    if ($attrs.filters) {
      $scope.$watch($attrs.filters, function (newValue, oldValue){
        if (newValue !== oldValue) {
          $scope.updateServerSideResource();
        }
      }, true);
    }
    $scope.$watch('params', function (newValue, oldValue){
      if (newValue !== oldValue) {
        if ($scope.clientSide) {
          $scope.updateClientSideResource();
        } else {
          $scope.updateServerSideResource();
        }
      }
    }, true);

    // Init table
    $scope.initTable();
  }
])
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
.directive('tastyThead', [
  '$filter',
  function($filter) {
    return {
      restrict: 'AE',
      require: '^tastyTable',
      scope: {
        'notSortBy': '='
      },
      templateUrl: 'template/table/head.html',
      link: function (scope, element, attrs, tastyTable) {
        'use strict';
        // Thead it's called
        tastyTable.activate('thead');

        scope.fields = {};

        scope.setFields = function () {
          var lenHeader, width, i, active, sortable;
          lenHeader = scope.header.columns.length;
          scope.header.columns.forEach(function (column) {
            width = parseFloat((100 / lenHeader).toFixed(2));
            sortable = true;
            active = false;
            if (scope.notSortBy) {
              sortable = scope.notSortBy.indexOf(column.key) < 0;
            }
            if (column.key === scope.header.sortBy ||
                '-' + column.key === scope.header.sortBy) {
              active = true;
            }
            scope.fields[column.key] = {
              'active': active,
              'sortable': sortable,
              'width': { 'width': width + '%' },
              'sort': $filter('cleanFieldName')(column.key)
            };
          });
          if (scope.header.sortOrder === 'dsc' &&
              scope.header.sortBy[0] !== '-') {
            scope.header.sortBy = '-' + scope.header.sortBy;
          }
        };

        scope.sortBy = function (field) {
          if (scope.notSortBy && scope.notSortBy.indexOf(field.key) >= 0) {
            return false;
          }
          var fieldName;
          fieldName = $filter('cleanFieldName')(field.key);
          if (scope.header.sortBy == fieldName) {
            scope.header.sortBy = '-' + fieldName;
            tastyTable.setParams('sortOrder', 'dsc');
          } else {
            scope.header.sortBy = fieldName;
            tastyTable.setParams('sortOrder', 'asc');
          }
          tastyTable.setParams('sortBy', field.key);
        };

        scope.isSortUp = function(field) {
          if (scope.fields[field.key] === undefined) {
            return false;
          }
          return scope.header.sortBy == '-' + scope.fields[field.key].sort;
        };

        scope.isSortDown = function(field) {
          if (scope.fields[field.key] === undefined) {
            return false;
          }
          return scope.header.sortBy == scope.fields[field.key].sort;
        };

        tastyTable.$scope.$watch('header', function (newValue, oldValue){
          if (newValue && (newValue !== oldValue)) {
            scope.header = newValue;
            scope.setFields();
          }
        }, true);
      }
    };
  }
])

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
.directive('tastyPagination', [
  '$filter',
  function($filter) {
    return {
      restrict: 'AE',
      require: '^tastyTable',
      scope: {},
      templateUrl: 'template/table/pagination.html',
      link: function (scope, element, attrs, tastyTable) {
        'use strict';
        var getPage, setCount, setPaginationRange,
            setPreviousRange, setRemainingRange,
            setPaginationRanges;

        // Pagination it's called
        tastyTable.activate('pagination');

        /* In the future you will have a way to change
         * these values by an isolate optional scope variable,
         * more info here https://github.com/angular/angular.js/issues/6404 */
        scope.numPaginations = 5;
        scope.pagListCount = [5, 25, 50, 100];

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
          scope.pagMinRange = scope.pagMaxRange - scope.numPaginations;
          setPaginationRanges();
        };

        setRemainingRange = function () {
          if (scope.pagHideMaxRange === true || scope.pagMaxRange > scope.pagination.pages) {
            return false;
          }
          scope.pagMinRange = scope.pagMaxRange;
          scope.pagMaxRange = scope.pagMinRange + scope.numPaginations;
          if (scope.pagMaxRange > scope.pagination.pages) {
            scope.pagMaxRange = scope.pagination.pages;
          }
          scope.pagMinRange = scope.pagMaxRange - scope.numPaginations;
          setPaginationRanges();
        };

        setPaginationRanges =  function () {
          scope.pagMinRange = scope.pagMinRange > 0 ? scope.pagMinRange : 1;
          scope.pagMaxRange = scope.pagMinRange + scope.numPaginations;
          if (scope.pagMaxRange > scope.pagination.pages) {
            scope.pagMaxRange = scope.pagination.pages + 1;
          }
          scope.pagHideMinRange = scope.pagMinRange <= 1;
          scope.pagHideMaxRange = scope.pagMaxRange >= scope.pagination.pages;
          if (scope.pagination.size < 50) {
            scope.pagListCount = [5, 25];
          } else if (scope.pagination.size < 100) {
            scope.pagListCount = [5, 25, 50];
          } else {
            scope.pagListCount = [5, 25, 50, 100];
          }
          scope.rangePage = $filter('range')([], scope.pagMinRange, scope.pagMaxRange);
        };

        scope.page = {
          'get': getPage,
          'setCount': setCount,
          'previous': setPreviousRange,
          'remaining': setRemainingRange
        };

        tastyTable.$scope.$watch('pagination', function (newValue, oldValue){
          if (newValue && (newValue !== oldValue)) {
            scope.pagination = newValue;
            setPaginationRange();
          }
        }, true);
      }
    };
  }
]);