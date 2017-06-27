/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.2.6 - 2014-08-26
 * License: MIT
 */
angular.module("ngTasty", ["ngTasty.tpls", "ngTasty.filter","ngTasty.service","ngTasty.table"]);
angular.module("ngTasty.tpls", ["template/table/head.html","template/table/pagination.html"]);
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
    return input.replace(/[^a-zA-Z0-9-]+/g, '-').toLowerCase();
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
  'ngTasty.service.joinObjects'
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
  return function(objOne, objTwo) {
    for (var attrname in objTwo) {
      setProperty(objOne, objTwo, attrname);
    }
    return objOne;
  };
}]);

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
  query: {
    'page': 'page',
    'count': 'count',
    'sortBy': 'sort-by',
    'sortOrder': 'sort-order',
  },
  resource: undefined,
  resourceCallback: undefined,
  listItemsPerPage: [5, 25, 50, 100],
  itemsPerPage: 5
})
.controller('TableController', ["$scope", "$attrs", "$timeout", "$filter", "tableConfig", "tastyUtil", function($scope, $attrs, $timeout, $filter, tableConfig, tastyUtil) {
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

  /* Set custom configs
   * In the future you will have a way to change
   * these values by an isolate optional scope variable,
   * more info here https://github.com/angular/angular.js/issues/6404 */
  if (angular.isDefined($attrs.query)) {
    $scope.query = $scope.$parent[$attrs.query];
  }
  if (!angular.isDefined($attrs.resource) && !angular.isDefined($attrs.resourceCallback)) {
    throw 'AngularJS tastyTable directive: need the resource or resource-callback attribute';
  }
  if (angular.isDefined($attrs.resource)) {
    $scope.resource = $scope.$parent[$attrs.resource];
    if (!angular.isObject($scope.resource)) {
      throw 'AngularJS tastyTable directive: the resource ('+
        $attrs.resource + ') it\'s not an object';
    } else if (!$scope.resource.header && !$scope.resource.rows) {
      throw 'AngularJS tastyTable directive: the resource ('+
        $attrs.resource + ') has the property header or rows undefined';
    }
  }
  if (angular.isDefined($attrs.resourceCallback)) {
    $scope.resourceCallback = $scope.$parent[$attrs.resourceCallback];
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
    var sortBy;
    if (!resource) {
      return false;
    }
    sortBy = resource.sortBy || $scope.params.sortBy;
    sortBy = sortBy || resource.header[0].key;
    $scope.header = {
      'columns': resource.header,
      'sortBy': sortBy,
      'sortOrder': resource.sortOrder || $scope.params.sortOrder
    };
    $scope.rows = resource.rows;
    $scope.pagination = resource.pagination || $scope.pagination;
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
      $scope.rows = $filter('orderBy')($scope.rows, listSortBy, reverse);
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
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'sortBy');
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'sortOrder');
    }
    if ($scope.paginationDirective) {
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'page');
      urlQuery = tastyUtil.setProperty(urlQuery, params, 'count');
    }
    if ($attrs.filters) {
      urlQuery = tastyUtil.joinObjects(urlQuery, filters);
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
  }, 100);

  $scope.updateServerSideResource = tastyUtil.debounce(function() {
    $scope.url = $scope.buildUrl($scope.params, $scope[$attrs.filters]);
    $scope.resourceCallback($scope.url).then(function (resource) {
      $scope.setDirectivesValues(resource);
    });
  }, 100);

  $scope.initTable = function () {
    $scope.params['sortBy'] = undefined;
    $scope.params['sortOrder'] = 'asc';
    $scope.params['page'] = 1;
    $scope.params['count'] = undefined;
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
  if ($scope.resource) {
    $scope.$parent.$watch($attrs.resource, function (newValue, oldValue){
      if (newValue !== oldValue) {
        $scope.resource = newValue;
        $scope.updateClientSideResource();
      }
    }, true);
  }

  // Init table
  $scope.initTable();
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
        //scope.pagination.count = count;
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
        //scope.pagination.count = scope.itemsPerPage;
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
        scope.pagMinRange = scope.pagMinRange > 0 ? scope.pagMinRange : 1;
        scope.pagMaxRange = scope.pagMinRange + 5;
        if (scope.pagMaxRange > scope.pagination.pages) {
          scope.pagMaxRange = scope.pagination.pages + 1;
        }
        scope.pagHideMinRange = scope.pagMinRange <= 1;
        scope.pagHideMaxRange = scope.pagMaxRange >= scope.pagination.pages;
        for (var i = 2; i < scope.listItemsPerPage.length; i++) {
          if (scope.pagination.size < scope.listItemsPerPage[i]) {
            scope.listItemsPerPageShow = scope.listItemsPerPage.slice(0, i);
            break;
          }
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

      // Init Pagination
      scope.page.setCount(scope.itemsPerPage);
    }
  };
}]);

angular.module('template/table/head.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/table/head.html',
    '<tr>\n' +
    '  <th ng-repeat="column in header.columns" \n' +
    '  ng-class="{\'sortable\': fields[column.key].sortable, \n' +
    '             \'active\': fields[column.key].active}"\n' +
    '  ng-style="fields[column.key].width" \n' +
    '  ng-click="sortBy(column)">\n' +
    '    <span ng-bind="column.name"></span>\n' +
    '    <span ng-if="isSortUp(column)" class="fa fa-sort-up"></span>\n' +
    '    <span ng-if="isSortDown(column)" class="fa fa-sort-down"></span>\n' +
    '  </th> \n' +
    '</tr>');
}]);

angular.module('template/table/pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/table/pagination.html',
    '<div class="row">\n' +
    '  <div class="col-xs-3 text-left">\n' +
    '    <div class="btn-group">\n' +
    '      <button type="button" class="btn btn-default" \n' +
    '      ng-repeat="count in listItemsPerPageShow" \n' +
    '      ng-class="{active: count == pagination.count}" \n' +
    '      ng-click="page.setCount(count)" ng-bind="count"></button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="col-xs-6 text-center">\n' +
    '    <ul class="pagination">\n' +
    '      <li ng-class="{disabled: pagHideMinRange}">\n' +
    '        <span ng-click="page.previous()">&laquo;</span>\n' +
    '      </li>\n' +
    '      <li ng-repeat="numPage in rangePage" \n' +
    '      ng-class="{active: numPage == pagination.page}">\n' +
    '        <span ng-click="page.get(numPage)">\n' +
    '          <span ng-bind="numPage"></span>\n' +
    '          <span class="sr-only" ng-if="numPage == pagination.page">(current)</span>\n' +
    '        </span>\n' +
    '      </li>\n' +
    '      <li ng-class="{disabled: pagHideMaxRange}">\n' +
    '        <span ng-click="page.remaining()">&raquo;</span>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '  <div class="col-xs-3 text-right">\n' +
    '    <p>Page <span ng-bind="pagination.page"></span> \n' +
    '    of <span ng-bind="pagination.pages"></span>,\n' +
    '    of <span ng-bind="pagination.size"></span> entries</p>\n' +
    '  </div>\n' +
    '</div>');
}]);
