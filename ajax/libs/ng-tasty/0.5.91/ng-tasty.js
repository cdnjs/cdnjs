/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.5.9 - 2015-12-14
 * License: MIT
 */
angular.module("ngTasty", ["ngTasty.component.table","ngTasty.filter.camelize","ngTasty.filter.cleanFieldName","ngTasty.filter.filterInt","ngTasty.filter.range","ngTasty.filter.slugify","ngTasty.service.bindTo","ngTasty.service.debounce","ngTasty.service.joinObjects","ngTasty.service.setProperty","ngTasty.service.tastyUtil","ngTasty.service.throttle","ngTasty.service.webSocket"]);
/**
 * @ngdoc directive
 * @name ngTasty.component.tastyTable
 *
 * @example
  <table tasty-table>
    <tbody></tbody>
  </table>
 *
 */
angular.module('ngTasty.component.table', [
  'ngTasty.filter.cleanFieldName',
  'ngTasty.filter.range',
  'ngTasty.service.tastyUtil',
  'ngTasty.tpls.table.head',
  'ngTasty.tpls.table.pagination'
])
.constant('tableConfig', {
  init: {
    'count': 5,
    'page': 1,
    'sortBy': undefined,
    'sortOrder': undefined,
    'filterBase': 1
  },
  query: {
    'page': 'page',
    'count': 'count',
    'sortBy': 'sort-by',
    'sortOrder': 'sort-order'
  },
  bootstrapIcon: false,
  bindOnce: true,
  loadOnInit: false,
  iconUp: 'fa fa-sort-up',
  iconDown: 'fa fa-sort-down',
  listItemsPerPage: [5, 25, 50, 100],
  itemsPerPage: 5,
  templateHeadUrl: 'template/table/head.html',
  templateUrl: 'template/table/pagination.html',
  watchResource: 'reference'
})
.controller('TableController', ["$scope", "$attrs", "$filter", "tableConfig", "tastyUtil", function($scope, $attrs, $filter, tableConfig, tastyUtil) {
  var listScopeToWatch, initTable, newScopeName, initStatus,
      updateClientSideResource, updateServerSideResource, setDirectivesValues,
      buildClientResource, buildUrl, paramsInitialCycle, initNow, loadOnInit;
  var vm = this;
  vm.$scope = $scope;
  initStatus = {};
  initNow = true;
  paramsInitialCycle = true;
  $scope.init = {};
  $scope.query = {};
  $scope.logs = {
    'buildClientResourceCount': 0,
    'updateServerSideResourceRunning': 0
  };
  $scope.theme = {};

  // Each one of them is a possible attribute to start watching
  listScopeToWatch = [
    'bindFilters', 
    'bindFiltersComparator',
    'bindInit', 
    'bindQuery', 
    'bindResource', 
    'bindResourceCallback', 
    'bindWatchResource', 
    'bindReload',
    'bindTheme'
  ];
  listScopeToWatch.forEach(function (scopeName) {
    newScopeName = scopeName.substring(4);
    newScopeName = newScopeName.charAt(0).toLowerCase() + newScopeName.slice(1);
    if ($attrs[scopeName]) {
      tastyUtil.bindTo(scopeName, $scope, $attrs, newScopeName);
    } else if ($attrs[newScopeName] && newScopeName === 'watchResource') {
      $scope[newScopeName] = $attrs[newScopeName];
    } else if ($attrs[newScopeName] && newScopeName === 'filtersComparator') {
      $scope[newScopeName] = JSON.parse($attrs[newScopeName]);
    }
  });

  // Default theme
  vm.config = {};
  if (angular.isObject($scope.theme)) {
    Object.keys(tableConfig).forEach(function(key) {
      if (angular.isDefined($scope.theme[key])) {
        vm.config[key] = $scope.theme[key];
      } else {
        vm.config[key] = tableConfig[key];
      }
    }, vm);
  } else {
    vm.config = tableConfig;
  }

  // Default configs
  $scope.query.page = $scope.query.page || vm.config.query.page;
  $scope.query.count = $scope.query.count || vm.config.query.count;
  $scope.query.sortBy = $scope.query.sortBy || vm.config.query.sortBy;
  $scope.query.sortOrder = $scope.query.sortOrder || vm.config.query.sortOrder;

  // Set init configs
  if ($scope.reload && !vm.config.loadOnInit) {
    initNow = false;
  }
  $scope.init.count = $scope.init.count || vm.config.init.count;
  $scope.init.page = $scope.init.page || vm.config.init.page;
  $scope.init.sortBy = $scope.init.sortBy || vm.config.init.sortBy;
  $scope.init.sortOrder = $scope.init.sortOrder || vm.config.init.sortOrder;
  if (!angular.isUndefined($scope.init.filterBase)) {
    $scope.init.filterBase = $scope.init.filterBase;
  } else {
    $scope.init.filterBase = vm.config.init.filterBase;
  }  
  $scope.watchResource = $scope.watchResource || vm.config.watchResource;

  // Defualt variables
  var listImmutableKey =[
    'filters',
    'init',
    'query',
    'rows',
    'header',
    'pagination',
    'params',
    'sortOrder',
    'sortBy',
    'url'
  ];
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
  if (!angular.isDefined($attrs.bindResource) && !angular.isDefined($attrs.bindResourceCallback)) {
    throw new Error('AngularJS tastyTable directive: need the ' +
                    'bind-resource or bind-resource-callback attribute');
  }
  if (angular.isDefined($attrs.bindResource)) {
    if (!angular.isObject($scope.resource)) {
      throw new Error('AngularJS tastyTable directive: the bind-resource ('+
                      $attrs.bindResource + ') is not an object');
    } else if (!$scope.resource.header && !$scope.resource.rows) {
      throw new Error('AngularJS tastyTable directive: the bind-resource ('+
                      $attrs.bindResource + ') has the property header or rows undefined');
    }
  }
  if (angular.isDefined($attrs.bindResourceCallback)) {
    if (!angular.isFunction($scope.resourceCallback)) {
      throw new Error('AngularJS tastyTable directive: the bind-resource-callback ('+
                      $attrs.bindResourceCallback + ') is not a function');
    }
    $scope.clientSide = false;
  }   

  // In TableController, by using `vm` we build an API 
  // for other directives to talk to vm one.
  vm.start = false;

  vm.activate = function(directiveName) {
    $scope[directiveName + 'Directive'] = true;
    $scope.params[directiveName] = true;
  };

  vm.setParams = function(key, value) {
    $scope.params[key] = value;
    if (['sortBy', 'sortOrder'].indexOf(key) >= 0) {
      $scope.header[key] = value;
    }
  };

  vm.initTable = function (keyDirective) {
    initStatus[keyDirective] = true;
    if (!$scope.theadDirective && !$scope.paginationDirective) { // None of them
      vm.start = true;
    } else if ($scope.theadDirective && $scope.paginationDirective) { // Both directives
      if (initStatus.thead && initStatus.pagination){
        vm.start = true;
      }
    } else if ($scope.theadDirective && !$scope.paginationDirective) { // Only Thead directive
      if (initStatus.thead){
        vm.start = true;
      }
    } else if (!$scope.theadDirective && $scope.paginationDirective) { // Only Pagination directive
      if (initStatus.pagination){
        vm.start = true;
      }
    }

    if (vm.start) {
      if ($scope.clientSide) {
        $scope.params.sortBy = $scope.resource.sortBy || $scope.init.sortBy;
        $scope.params.sortOrder = $scope.resource.sortOrder || $scope.init.sortOrder;
        $scope.params.page = $scope.init.page;
        if ($scope.resource.pagination) {
          $scope.params.page = $scope.resource.pagination.page || $scope.init.page;
        }
        if (initNow) {
          $scope.$evalAsync(updateClientSideResource);
        } 
      } else {
        $scope.params.sortBy = $scope.init.sortBy;
        $scope.params.sortOrder = $scope.init.sortOrder;
        $scope.params.page = $scope.init.page;
        if (initNow) {
          $scope.$evalAsync(updateServerSideResource);
        } else if ($scope.reload) {
          $scope.url = buildUrl($scope.params, $scope.filters);
          $scope.reload = function () {
            $scope.resourceCallback($scope.url, angular.copy($scope.params))
            .then(function (resource) {
              setDirectivesValues(resource);
            });
          };
        }
      }
    }
  };

  vm.bindOnce = vm.config.bindOnce;

  setDirectivesValues = function (resource) {
    if (!angular.isObject(resource)) {
      throw new Error('AngularJS tastyTable directive: the resource response '+
                      'is not an object');
    } else if (!resource.header && !resource.rows) {
      throw new Error('AngularJS tastyTable directive: the resource response object '+
                      'has the property header or rows undefined');
    }
    Object.keys(resource).forEach(function(key) {
      if (listImmutableKey.indexOf(key) < 0) {
        $scope[key] = resource[key];
      }
    });
    // Assuming if one header uses just one key it's based on the new pattern.
    // [feature request] simplified header for resources #37 by @WebReflection
    if (resource.header.length && Object.keys(resource.header[0]).length === 1) {
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
    if (!$scope.clientSide) {
      $scope.header.sortBy = $scope.header.sortBy || resource.sortBy;
      $scope.header.sortOrder = $scope.header.sortOrder || resource.sortOrder;
    }
    $scope.rows = resource.rows;
    if ($scope.paginationDirective) {
      $scope.pagination.page = $scope.params.page;
      $scope.pagination.count = $scope.params.count;
      $scope.pagination.size = $scope.rows.length;
      if (resource.pagination) {
        if (resource.pagination.count) {
          $scope.pagination.count = resource.pagination.count;
        }
        if (resource.pagination.page) {
          $scope.pagination.page = resource.pagination.page;
        }
        if (resource.pagination.size) {
          $scope.pagination.size = resource.pagination.size;
        }
      }
      $scope.pagination.pages = Math.ceil($scope.pagination.size / $scope.pagination.count);
      if ($scope.pagination.pages < $scope.pagination.page) {
        $scope.params.page = $scope.pagination.pages;
      }
    }
  };

  buildClientResource = function(updateFrom) {
    var fromRow, toRow, rowToShow, reverse, listSortBy;
    $scope.logs.buildClientResourceCount += 1;
    if ($scope.theadDirective && $scope.header.columns.length) {
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
    if ($attrs.bindFilters) {
      $scope.rows = $filter('filter')($scope.rows, $scope.filters, $scope.filtersComparator);
    }
    if ($scope.paginationDirective) {
      $scope.pagination.count = $scope.params.count;
      $scope.pagination.size = $scope.rows.length;
      $scope.pagination.pages = Math.ceil($scope.rows.length / $scope.pagination.count);
      if (updateFrom === 'filters' || 
          $scope.pagination.page > $scope.pagination.pages) {
        $scope.pagination.page = 1;
        $scope.params.page = 1;
      } else {
        $scope.pagination.page = $scope.params.page;
      }
      toRow = $scope.pagination.count * $scope.pagination.page;
      fromRow = toRow - $scope.pagination.count;
      if (fromRow >= 0 && toRow >= 0) {
        rowToShow = $scope.rows.slice(fromRow, toRow);
        $scope.rows = rowToShow;
      }
    }
  };

  buildUrl = function(params, filters) {
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
    if ($attrs.bindFilters) {
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

  updateClientSideResource = function (updateFrom) {
    if ($scope.params.sortBy) {
      $scope.resource.sortBy = $scope.params.sortBy;
    }
    if ($scope.params.sortOrder) {
      $scope.resource.sortOrder = $scope.params.sortOrder;
    }
    if ($scope.params.page && $scope.params.count) {
      $scope.resource.pagination = $scope.pagination;
      $scope.resource.pagination.page = $scope.params.page;
      $scope.resource.pagination.count = $scope.params.count;
    }
    setDirectivesValues($scope.resource);
    buildClientResource(updateFrom);
  };

  updateServerSideResource = function (updateFrom) {
    if (updateFrom === 'filters') {
      if (Number.isInteger($scope.init.filterBase)) {
        $scope.params.page = $scope.init.filterBase;
      }
    }
    $scope.url = buildUrl($scope.params, $scope.filters);
    if ($scope.reload) {
      $scope.reload = function () {
        $scope.resourceCallback($scope.url, angular.copy($scope.params))
        .then(function (resource) {
          setDirectivesValues(resource);
        });
      };
    }
    if ((initNow || updateFrom === 'params') &&
        !$scope.logs.updateServerSideResourceRunning) {
      $scope.logs.updateServerSideResourceRunning = true;
      var paramsObj = angular.copy($scope.params);
      paramsObj.filters = $scope.filters;
      $scope.resourceCallback($scope.url, paramsObj)
      .then(function (resource) {
        setDirectivesValues(resource);
        $scope.logs.updateServerSideResourceRunning = false;
      });
    }
  };
  
  // AngularJs $watch callbacks
  if ($attrs.bindFilters) {
    $scope.$watch('filters', function watchFilters (newValue, oldValue){
      if (newValue !== oldValue) {
        if ($scope.clientSide) {
          $scope.$evalAsync(updateClientSideResource('filters'));
        } else {
          $scope.$evalAsync(updateServerSideResource('filters'));
        }
      }
    }, true);
  }
  $scope.$watchCollection('params', function watchParams (newValue, oldValue){
    if (newValue !== oldValue) {
      // Run update resuorce only if we are on 
      // the second cycle or more of `params`
      if (paramsInitialCycle === false) {
        if ($scope.clientSide) {
          $scope.$evalAsync(updateClientSideResource('params'));
        } else {
          $scope.$evalAsync(updateServerSideResource('params'));
        }
      } else {
        paramsInitialCycle = false;
      }
    }
  });
  if ($scope.resource) {
    var watchResource = function (newValue, oldValue){
      if (newValue !== oldValue) {
        $scope.params.sortBy = $scope.resource.sortBy || $scope.params.sortBy;
        $scope.params.sortOrder = $scope.resource.sortOrder || $scope.params.sortOrder;
        $scope.$evalAsync(updateClientSideResource('resource'));
        if (!$scope.resource.reload) {
          $scope.resource.reload = function reloadResource () {
            $scope.$evalAsync(updateClientSideResource('resource'));
          };
        }
      }
    };
    if ($scope.watchResource === 'reference') {
      $scope.$watch('resource', watchResource);
    } else if ($scope.watchResource === 'collection') {
      $scope.$watchCollection('resource.header', watchResource);
      $scope.$watchCollection('resource.rows', watchResource);
      $scope.$watchGroup(['resource.sortBy', 
        'resource.sortOrder', 
        'resource.pagination.count',
        'resource.pagination.page',
        'resource.pagination.pages',
        'resource.pagination.size'], watchResource);
    } else if ($scope.watchResource === 'equality') {
      $scope.$watch('resource.header', watchResource, true);
      $scope.$watch('resource.rows', watchResource, true);
      $scope.$watch('resource.sortBy', watchResource, true);
      $scope.$watch('resource.sortOrder', watchResource, true);
      $scope.$watch('resource.pagination.count', watchResource, true);
      $scope.$watch('resource.pagination.page', watchResource, true);
      $scope.$watch('resource.pagination.pages', watchResource, true);
      $scope.$watch('resource.pagination.size', watchResource, true);
    }
  }
}])
.directive('tastyTable', function(){
  return {
    restrict: 'A',
    scope: true,
    controller: 'TableController',
    link: function postLink(scope, element, attrs, tastyTable) {
      if (element.find('tasty-thead').length ||
          element[0].querySelector('[tasty-thead]')) {
        tastyTable.activate('thead');
      }
      if (element.find('tasty-pagination').length ||
          element[0].querySelector('[tasty-pagination]')) {
        tastyTable.activate('pagination');
      }
      tastyTable.initTable();
    }
  };
})

/**
 * @ngdoc directive
 * @name ngTasty.component.tastyThead
 *
 * @example
  <table tasty-table>
    <thead table-head></thead>
    <tbody></tbody>
  </table>
 *
 */
.directive('tastyThead', ["$filter", "$templateCache", "$http", "$compile", "tableConfig", "tastyUtil", function($filter, $templateCache, $http, $compile, tableConfig, tastyUtil) {
  return {
    restrict: 'AE',
    require: '^tastyTable',
    scope: {},
    templateUrl: tableConfig.templateHeadUrl,
    link: function postLink(scope, element, attrs, tastyTable) {
      var newScopeName, listScopeToWatch;
      scope.bindOnce = tastyTable.bindOnce;
      scope.columns = [];
      scope.bootstrapIcon = tastyTable.config.bootstrapIcon;
      scope.iconUp = tastyTable.config.iconUp;
      scope.iconDown = tastyTable.config.iconDown;

      listScopeToWatch = [
        'bindNotSortBy', 
        'bindBootstrapIcon', 
        'bindIconUp', 
        'bindIconDown',
        'bindTemplateUrl'
      ];
      listScopeToWatch.forEach(function (scopeName) {
        newScopeName = scopeName.substring(4);
        newScopeName = newScopeName.charAt(0).toLowerCase() + newScopeName.slice(1);
        if (attrs[scopeName]) {
          tastyUtil.bindTo(scopeName, scope, attrs, newScopeName);
        } else if (attrs[newScopeName]) {
          if (attrs[newScopeName][0] === '[') {
            attrs[newScopeName] = attrs[newScopeName].replace(/'/g, '"');
            scope[newScopeName] = JSON.parse(attrs[newScopeName]);
          } else {
            scope[newScopeName] = attrs[newScopeName];
          }
        }
      });

      if (scope.templateUrl) {
        $http.get(scope.templateUrl, { cache: $templateCache })
        .success(function(templateContent) {
          element.replaceWith($compile(templateContent)(scope));                
        });
      }

      scope.setColumns = function () {
        var width, i, active, sortable, sort, 
            isSorted, isSortedCaret;
        scope.columns = [];
        if (scope.header.sortOrder === 'dsc' && 
            scope.header.sortBy &&
            scope.header.sortBy[0] !== '-') {
          scope.header.sortBy = '-' + scope.header.sortBy;
        }
        scope.header.columns.forEach(function (column, index) {
          column.style = column.style || {};
          if (!angular.isArray(column.class)) {
            column.class = [];
          }
          sortable = true;
          active = false;
          isSorted = '';
          isSortedCaret = '';
          // Not sort column when the key is present in the `notSortBy` list,
          // and Not sort column when `notSortBy` is an empty list
          if (angular.isArray(scope.notSortBy)) {
            if (scope.notSortBy.length) {
              sortable = scope.notSortBy.indexOf(column.key) < 0;
            } else {
              sortable = false;
            }
          }
          if (column.key === scope.header.sortBy ||
              '-' + column.key === scope.header.sortBy) {
            active = true;
          }
          sort = $filter('cleanFieldName')(column.key);
          if (scope.header.sortBy === '-' + sort) {
            if (tastyTable.config.bootstrapIcon) {
              isSorted = '';
              isSortedCaret = 'caret';
            } else {
              isSorted = scope.iconDown;
            }
          } else if (scope.header.sortBy === sort) {
            if (tastyTable.config.bootstrapIcon) {
              isSorted = 'dropup';
              isSortedCaret = 'caret';
            } else {
              isSorted = scope.iconUp;
            }
          }
          scope.columns.push({
            'key': column.key,
            'name': column.name,
            'active': active,
            'sortable': sortable,
            'class': column.class,
            'style': column.style,
            'isSorted': isSorted,
            'isSortedCaret': isSortedCaret
          });
        });
        if (!tastyTable.start) {
          // Thead it's called
          tastyTable.initTable('thead');
        }
      };

      scope.sortBy = function (column) {
        if (!column.sortable) {
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
        column.class.forEach(function getListClass (className) {
          listClassToShow.push(className);
        });
        return listClassToShow;
      };

      tastyTable.$scope.$watchCollection('header', function watchHeader (newValue, oldValue){
        if (newValue  && ((newValue !== oldValue) || !tastyTable.start)) {
          scope.header = newValue;
          scope.setColumns();
        }
      });
    }
  };
}])

/**
 * @ngdoc directive
 * @name ngTasty.component.tastyPagination
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
.directive('tastyPagination', ["$filter", "$templateCache", "$http", "$compile", "tableConfig", "tastyUtil", function($filter, $templateCache, $http, $compile, tableConfig, tastyUtil) {
  return {
    restrict: 'AE',
    require: '^tastyTable',
    scope: {},
    templateUrl: tableConfig.templateUrl,
    link: function postLink(scope, element, attrs, tastyTable) {
      var getPage, setCount, setPaginationRange, setPreviousRange, 
          setRemainingRange, setPaginationRanges, listScopeToWatch, newScopeName;

      listScopeToWatch = [
        'bindItemsPerPage', 
        'bindListItemsPerPage', 
        'bindTemplateUrl'
      ];
      listScopeToWatch.forEach(function (scopeName) {
        newScopeName = scopeName.substring(4);
        newScopeName = newScopeName.charAt(0).toLowerCase() + newScopeName.slice(1);
        if (attrs[scopeName]) {
          tastyUtil.bindTo(scopeName, scope, attrs, newScopeName);
        } else if (attrs[newScopeName]) {
          if (newScopeName === 'itemsPerPage') {
            scope[newScopeName] = parseInt(attrs[newScopeName]);
          } else {
            try {
              scope[newScopeName] = JSON.parse(attrs[newScopeName]);
            } catch (err) {
              scope[newScopeName] = attrs[newScopeName];
            }
          }
        }
      });
      
      if (scope.templateUrl) {
        $http.get(scope.templateUrl, { cache: $templateCache })
        .success(function(templateContent) {
          element.replaceWith($compile(templateContent)(scope));                
        });
      }

      // Default configs
      scope.itemsPerPage = scope.itemsPerPage || tastyTable.config.itemsPerPage;
      scope.listItemsPerPage = scope.listItemsPerPage || tastyTable.config.listItemsPerPage;

      // Serve side table case
      if (!tastyTable.$scope.clientSide) {
        scope.itemsPerPage = tastyTable.$scope.init.count || scope.itemsPerPage;
      }

      // Internal variable
      scope.pagination = {};
      scope.pagMinRange = 1;
      scope.pagMaxRange = 1;

      getPage = function (numPage) {
        tastyTable.setParams('page', numPage);
      };

      setCount = function(count) {
        var maxItems, page;
        scope.itemsPerPage = count;
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
        scope.pagMinRange = scope.pagMaxRange - 5;
        setPaginationRanges();
      };

      setRemainingRange = function () {
        if (scope.pagHideMaxRange === true || 
            scope.pagMaxRange > scope.pagination.pages) {
          return false;
        }
        scope.pagMinRange = scope.pagMaxRange;
        scope.pagMaxRange = scope.pagMinRange + 5;
        if (scope.pagMaxRange >= scope.pagination.pages) {
          scope.pagMaxRange = scope.pagination.pages + 1;
          scope.pagMinRange = scope.pagMaxRange - 5 + 1;
        }
        scope.pagMinRange = scope.pagMaxRange - 5;
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
        scope.pagHideMaxRange = scope.pagMaxRange > scope.pagination.pages;
        scope.classPageMinRange = scope.pagHideMinRange ? 'disabled' : '';
        scope.classPageMaxRange = scope.pagHideMaxRange ? 'disabled' : '';

        for (var i = scope.listItemsPerPage.length; i >= 0; i--) {
          if (scope.pagination.size > scope.listItemsPerPage[i]) {
            scope.listItemsPerPageShow = scope.listItemsPerPage.slice(0, (i + 2));
            break;
          }
        }
        scope.rangePage = $filter('range')([], scope.pagMinRange, scope.pagMaxRange);

        if (!tastyTable.start) {
          // Pagination it's called
          tastyTable.initTable('pagination');
        }
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

      tastyTable.$scope.$watchCollection('pagination', function watchPagination (newValue, oldValue){
        if (newValue  && ((newValue !== oldValue) || !tastyTable.start)) {
          scope.pagination = newValue;
          setPaginationRange();
        }
      });

      // Init Pagination
      scope.page.setCount(scope.itemsPerPage);
    }
  };
}]);

/**
 * @ngdoc filter
 * @name ngTasty.filter.filterCamelize
 * @function
 *
 */
angular.module('ngTasty.filter.camelize', [])
.filter('camelize', function() {
  var CAMELIZE_REGEX = /(?:^|[-_ ])(\w)/g;
  
  return function (input, first) {
    var isString = typeof input === 'string',
        firstLetter = typeof first === 'undefined' ? false : !!first;
    
    if(typeof input === 'undefined' || 
       input === null || 
       (!isString && isNaN(input)) ) {
      return '';
    }

    if(!isString){
      return '' + input;
    }
    
    return input.trim() // remove trailing spaces
      .replace(/ +(?= )/g,'') // remove multiple WS
      .replace(CAMELIZE_REGEX, function (_, character, pos) { // actual conversion
        if (character && (firstLetter || pos > 0)) {
          return character.toUpperCase();
        } else {
          return character;
        }
      });
  };
});

/**
 * @ngdoc filter
 * @name ngTasty.filter.cleanFieldName
 * @function
 *
 * @description
 * Calling cleanFieldName will replace all 
 * empty space with with -
 *
 * @example
  ng-bind="key | cleanFieldName"
 *
 */
angular.module('ngTasty.filter.cleanFieldName', [])
.filter('cleanFieldName', function() {
  return function (input) {
    return input.replace(/[^a-zA-Z0-9-_-]+/g, '-');
  };
});

/**
 * @ngdoc filter
 * @name ngTasty.filter.filterInt
 * @function
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
 * @name ngTasty.filter.range
 * @function
 *
 * @description
 * Create a list containing arithmetic progressions. The arguments must 
 * be plain integers. If the step argument is omitted, it defaults to 1. 
 * If the start argument is omitted, it defaults to 0.
 *
 * @example
  ng-repeat="n in [] | range:1:30"
 */
angular.module('ngTasty.filter.range', ['ngTasty.filter.filterInt'])
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
 * @author https://github.com/bogdan-alexandrescu/ - @balx
 * @ngdoc filter
 * @name ngTasty.filter.slugify
 * @function
 *
 * @description
 * Transform text into an ascii slug by replacing whitespaces, accentuated, 
 * and special characters with the coresponding latin character or completely 
 * removing them when no latin equivalent is found. This can be used safely to 
 * generate valid URLs.
 */
angular.module('ngTasty.filter.slugify', [])
.filter('slugify', function () {

  var makeString = function (object) {
    if (object == null) {
      return '';
    }
    return '' + object;
  };

  var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșšŝťțŭùúüűûñÿýçżźž',
      to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssttuuuuuunyyczzz',
      regex = new RegExp('[' + from + ']', 'g');

  return function (str) {
    str = makeString(str)
    .toString() // make sure is a string
    .toLowerCase()
    .replace(regex, function (c){
      var index = from.indexOf(c);
      return to.charAt(index) || '-';
    }) // normalize some foreign characters
    .replace(/[^\w\-\s]+/g, '') // remove unwanted characters
    .trim() //trim spaces
    .replace(/\s+/g, '-') // replace any space with a dash
    .replace(/\-\-+/g, '-'); // remove duplicate dashes
    return str;
  };
});
  
/**
 * @ngdoc service
 * @name ngTasty.service.bindTo
 * @description
 *
 * Set up $watches for isolate scope and controller bindings. This process
 * only occurs for isolate scopes and new scopes with controllerAs.
 */
angular.module('ngTasty.service.bindTo', [])
.factory('bindTo', ["$parse", function($parse) {
  return function (scopeName, scope, attrs, newScopeName) {
    var lastValue, parentGet, compare, parentSet, 
    parentValueWatch, isolateScopeName;
    if (!attrs[scopeName]) {
      return;
    }
    parentGet = $parse(attrs[scopeName]);
    if (parentGet.literal) {
      compare = angular.equals;
    } else {
      compare = function(a,b) { return a === b || (a !== a && b !== b); };
    }
    if (newScopeName) {
      isolateScopeName = newScopeName;
    } else {
      isolateScopeName = scopeName;
    }
    parentSet = parentGet.assign || function() {
      // reset the change, or we will throw this exception on every $digest
      lastValue = scope[scopeName] = parentGet(scopeName);
      throw 'Expression ' + attrs[attrName] + ' is non-assignable!';
    };
    lastValue = scope[isolateScopeName] = parentGet(scope.$parent);
    parentValueWatch = function parentValueWatch(parentValue) {
      if (!compare(parentValue, scope[isolateScopeName])) {
        // we are out of sync and need to copy
        if (!compare(parentValue, lastValue)) {
          // parent changed and it has precedence
          scope[isolateScopeName] = parentValue;
        } else {
          // if the parent can be assigned then do so
          parentSet(scope.$parent, parentValue = scope[isolateScopeName]);
        }
      }
      return lastValue = parentValue;
    };
    parentValueWatch.$stateful = true;
    scope.$parent.$watch($parse(attrs[scopeName], parentValueWatch), null, parentGet.literal);
  };
}]);

/**
 * @ngdoc service
 * @name ngTasty.service.debounce
 * @description
 *
 */
angular.module('ngTasty.service.debounce', [])
.factory('debounce', ["$timeout", function ($timeout) {
  return function (func, wait, immediate) {
    var args, context, debounceTimeout, timeout;
    debounceTimeout = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    return function debounce () {
      context = this;
      args = arguments;
      var callNow = immediate && !timeout;
      $timeout.cancel(timeout);
      timeout = $timeout(debounceTimeout, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };
}]);

/**
 * @ngdoc service
 * @name ngTasty.service.joinObjects
 * @description
 *
 */
angular.module('ngTasty.service.joinObjects', ['ngTasty.service.setProperty'])
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

/**
 * @ngdoc service
 * @name ngTasty.service.setProperty
 * @description
 *
 */
angular.module('ngTasty.service.setProperty', [])
.factory('setProperty', function() {
  return function(objOne, objTwo, attrname) {
    if (typeof objTwo[attrname] !== 'undefined' && 
        objTwo[attrname] !== null) {
      if (angular.isString(objTwo[attrname])) {
        if (objTwo[attrname].length) {
          objOne[attrname] = objTwo[attrname];
        }
      } else {
        objOne[attrname] = objTwo[attrname];
      }
    }
    return objOne;
  };
});

/**
 * @ngdoc service
 * @name ngTasty.service.tastyUtil
 * @description
 *
 */
angular.module('ngTasty.service.tastyUtil', [
  'ngTasty.service.bindTo',
  'ngTasty.service.debounce',
  'ngTasty.service.setProperty',
  'ngTasty.service.joinObjects',
  'ngTasty.service.throttle',
  'ngTasty.service.webSocket'
])
.factory('tastyUtil', ["debounce", "setProperty", "joinObjects", "bindTo", "webSocket", "throttle", function(debounce, setProperty, joinObjects, 
  bindTo, webSocket, throttle) {
  return {
    'bindTo': bindTo,
    'debounce': debounce,
    'setProperty': setProperty,
    'joinObjects': joinObjects,
    'throttle': throttle,
    'webSocket': webSocket
  };
}]);

/**
 * @ngdoc service
 * @name ngTasty.service.throttle
 * @description
 * # throttle
 * Factory in ngTasty.
 */
angular.module('ngTasty.service.throttle', [])
.factory('throttle', ["$timeout", function ($timeout) {
  return function (fn, threshhold, scope) {
    threshhold = threshhold || 250;
    var last, promise;
    return function throttle () {
      var context = scope || this;
      var now = Date.now(),
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        $timeout.cancel(promise);
        promise = $timeout(function throttleTimeout () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };
}]);

/**
 * @ngdoc service
 * @name ngTasty.service.webSocket
 * @description
 * # webSocket
 * Factory in ngTasty.
 */
angular.module('ngTasty.service.webSocket', [])
.factory('webSocket', function() {
  return function(url) {
    /**
     * Creates a String[1] representing a binary blob[2] function 
     * containing the WebSocket Factory API.
     *
     * [1]: https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
     * [2]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
     * 
     * @return {string}   String containing the encoded script
     */
    var blobURL = URL.createObjectURL(new Blob(['(', function() {
      var WSWorker = (function() {
        var _ws;

        /**
         * Initialize a new WebSocket using
         * the provided URL parameters.
         * 
         * @param  {string} url The WebSocket URL
         */
        var initialize = function(url) {
          _ws = new WebSocket(url);
        };

        /**
         * Listens for any message coming from the WebSocket
         * and send its content to the main JS thread using postMessage[1].
         *
         * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Worker.postMessage
         * 
         */
        var on = function() {
          _ws.onmessage = function(response) {
            var data = JSON.parse(response.data);
            self.postMessage(data);
          };
        };

        /**
         * Sends data to the WebSocket.
         * 
         * @param  {string} data
         */
        var send = function(data) {
          _ws.send(data);
        };

        return {
          initialize: initialize,
          on: on,
          send: send
        };

      })();

      /**
       * Listens for incoming messages from the main
       * JavaScript Thread.
       *
       * The commands allowed are:
       *
       * ws_new  ~> Calls initialize on the Web Socket Worker
       * ws_on   ~> Register the supplied callback
       * ws_send ~> Sends a message to the underlying WebSocket
       *            encoding it as a string (JSON.stringify)
       *            
       */
      self.addEventListener('message', function(e) {
        switch (e.data.cmd) {
          case 'ws_new':
            WSWorker.initialize(e.data.url);
            break;
          case 'ws_on':
            WSWorker.on();
            break;
          case 'ws_send':
            WSWorker.send(JSON.stringify(e.data.data));
            break;
          default:
            console.log('Unknown command: ' + e.data.cmd);
          }
      });

    }.toString(), ')()'], { type: 'application/javascript' }));
    

    // Create a new WebSocket Worker, revoke the URL since
    // it's not useful anymore.
    var _worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);

    // Tell the WebSocket Worker to init a new WebSocket
    _worker.postMessage({ cmd: 'ws_new', url: url });


    return {
      /**
       * Registers a callback to a specific Worker event listener.
       * There are two different events:
       *
       * - 'all' ~> subscribes to all websocket messages
       * - 'type'~> subscribes to all websocket messages containing
       *            a field named 'type'.
       *
       * For example, WebSockets Server events like this one:
       *
       * {
       *   'type': 'tweet',
       *   'data': ...
       * }
       *
       * can be handled in the following way:
       *
       *  ws.on('twitter', function(data) {
       *      ...
       *  });
       *  
       * @param  {string}   event The event name
       * @param  {Function} cb    Callback with output data (first param)
       */
      on: function(event, cb) {
        _worker.postMessage({ cmd: 'ws_on' });
        _worker.addEventListener('message', function(e) {
          if (event === 'all' || e.data.type === event) {
            cb(e.data);
          } 
        });
      },
      /**
       * Sends data to the WebSocket.
       * 
       * @param  {Any} data
       */
      send: function(data) {
        _worker.postMessage({ cmd: 'ws_send', data: data });
      }
    };
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nLXRhc3R5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0E7Q0FDQTs7Q0FFQTtDQUNBO0NBQ0E7QUFDQTtBQUNBO0NBUEE7Q0FDQTtDQUNBO0NBQ0E7RUFDQTtJQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7QUFDQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQUNBLGFBQUEsZUFBQSxHQUFBLDREQUFBO0VBQ0E7TUFDQTtNQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtJQUNBO0lBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtNQUNBO0lBQ0E7TUFDQTtJQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0lBQ0E7TUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtJQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0lBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7SUFDQTtFQUNBO0lBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0dBQ0E7R0FDQTtHQUNBO0VBQ0E7SUFDQTtvQkFDQTtFQUNBO0VBQ0E7SUFDQTtNQUNBO3NCQUNBO0lBQ0E7TUFDQTtzQkFDQTtJQUNBO0VBQ0E7RUFDQTtJQUNBO01BQ0E7c0JBQ0E7SUFDQTtJQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0lBQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBOztJQUVBO01BQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtVQUNBO1VBQ0E7WUFDQTtZQUNBO2NBQ0E7WUFDQTtVQUNBO1FBQ0E7TUFDQTtJQUNBO0VBQ0E7O0VBRUE7O0VBRUE7SUFDQTtNQUNBO3NCQUNBO0lBQ0E7TUFDQTtzQkFDQTtJQUNBO0lBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO1FBQ0E7UUFDQTtVQUNBO1VBQ0E7UUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtVQUNBO1FBQ0E7UUFDQTtNQUNBO1FBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7TUFDQTtJQUNBO0VBQ0E7O0VBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO1FBQ0E7TUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7O0VBRUE7SUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7UUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtNQUNBO1FBQ0E7VUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7WUFDQTtVQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7QUFDQSxZQUFBLFVBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQSxhQUFBLGVBQUE7SUFDQTtNQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7VUFDQTtRQUNBO01BQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0VBQ0E7SUFDQTtJQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0EsWUFBQSxVQUFBLEdBQUEsK0VBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1lBQ0E7UUFDQTtRQUNBO1lBQ0E7WUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1VBQ0E7WUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7WUFDQTtjQUNBO1lBQ0E7Y0FDQTtZQUNBO1VBQ0E7VUFDQTtjQUNBO1lBQ0E7VUFDQTtVQUNBO1VBQ0E7WUFDQTtjQUNBO2NBQ0E7WUFDQTtjQUNBO1lBQ0E7VUFDQTtZQUNBO2NBQ0E7Y0FDQTtZQUNBO2NBQ0E7WUFDQTtVQUNBO1VBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1VBQ0E7UUFDQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtVQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7RUFDQTtJQUNBO0tBQ0E7SUFDQTtJQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0EsWUFBQSxlQUFBLEdBQUEsK0VBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtVQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtZQUNBO1VBQ0E7WUFDQTtjQUNBO1lBQ0E7Y0FDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBO01BQ0E7O01BRUE7TUFDQTtRQUNBO01BQ0E7O01BRUE7TUFDQTtNQUNBO01BQ0E7O01BRUE7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtVQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1lBQ0E7VUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7VUFDQTtZQUNBO1lBQ0E7VUFDQTtRQUNBO1FBQ0E7O1FBRUE7VUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtVQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7O01BRUE7TUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxTQUFBLFFBQUE7RUFDQTs7RUFFQTtJQUNBO1FBQ0E7O0lBRUE7T0FDQTtPQUNBO01BQ0E7SUFDQTs7SUFFQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtNQUNBO1FBQ0E7VUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtFQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsU0FBQSxjQUFBO0VBQ0E7SUFDQTtFQUNBO0FBQ0E7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxTQUFBLFNBQUE7RUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0VBQ0E7Q0FDQTtBQUNBO0FBQ0EsU0FBQSxLQUFBLEdBQUEsWUFBQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsU0FBQSxPQUFBOztFQUVBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7RUFDQTs7RUFFQTtNQUNBO01BQ0E7O0VBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDQTtBQUNBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFVBQUEsTUFBQSxHQUFBLFdBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtRQUNBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxVQUFBLFFBQUEsR0FBQSxhQUFBO0VBQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxVQUFBLFdBQUEsR0FBQSxnQkFBQTtFQUNBO0lBQ0E7SUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7RUFDQTtBQUNBLENBQUEsQ0FBQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFVBQUEsV0FBQTtFQUNBO0lBQ0E7UUFDQTtNQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7SUFDQTtFQUNBO0FBQ0E7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQUNBLFVBQUEsU0FBQSxHQUFBLDhFQUFBO0VBQ0E7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxVQUFBLFFBQUEsR0FBQSxhQUFBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO1VBQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1VBQ0E7UUFDQTtNQUNBO1FBQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBLENBQUEsQ0FBQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsVUFBQSxTQUFBO0VBQ0E7SUFDQTtLQUNBO0tBQ0E7S0FDQTtLQUNBO0tBQ0E7S0FDQTtLQUNBO0tBQ0E7SUFDQTtNQUNBO1FBQ0E7O1FBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1FBQ0E7VUFDQTtRQUNBOztRQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1FBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtRQUNBOztRQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7UUFDQTtVQUNBO1FBQ0E7O1FBRUE7VUFDQTtVQUNBO1VBQ0E7UUFDQTs7TUFFQTs7TUFFQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7TUFDQTtRQUNBO1VBQ0E7WUFDQTtZQUNBO1VBQ0E7WUFDQTtZQUNBO1VBQ0E7WUFDQTtZQUNBO1VBQ0E7WUFDQTtVQUNBO01BQ0E7O0lBRUE7OztJQUdBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7OztJQUdBO01BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO01BQ0E7UUFDQTtRQUNBO1VBQ0E7WUFDQTtVQUNBO1FBQ0E7TUFDQTtNQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0EiLCJmaWxlIjoibmctdGFzdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogbmctdGFzdHlcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9aaXp6YW1pYS9uZy10YXN0eVxuXG4gKiBWZXJzaW9uOiAwLjUuOSAtIDIwMTUtMTItMTRcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5hbmd1bGFyLm1vZHVsZShcIm5nVGFzdHlcIiwgW1wibmdUYXN0eS5jb21wb25lbnQudGFibGVcIixcIm5nVGFzdHkuZmlsdGVyLmNhbWVsaXplXCIsXCJuZ1Rhc3R5LmZpbHRlci5jbGVhbkZpZWxkTmFtZVwiLFwibmdUYXN0eS5maWx0ZXIuZmlsdGVySW50XCIsXCJuZ1Rhc3R5LmZpbHRlci5yYW5nZVwiLFwibmdUYXN0eS5maWx0ZXIuc2x1Z2lmeVwiLFwibmdUYXN0eS5zZXJ2aWNlLmJpbmRUb1wiLFwibmdUYXN0eS5zZXJ2aWNlLmRlYm91bmNlXCIsXCJuZ1Rhc3R5LnNlcnZpY2Uuam9pbk9iamVjdHNcIixcIm5nVGFzdHkuc2VydmljZS5zZXRQcm9wZXJ0eVwiLFwibmdUYXN0eS5zZXJ2aWNlLnRhc3R5VXRpbFwiLFwibmdUYXN0eS5zZXJ2aWNlLnRocm90dGxlXCIsXCJuZ1Rhc3R5LnNlcnZpY2Uud2ViU29ja2V0XCJdKTtcbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgbmdUYXN0eS5jb21wb25lbnQudGFzdHlUYWJsZVxuICpcbiAqIEBleGFtcGxlXG4gIDx0YWJsZSB0YXN0eS10YWJsZT5cbiAgICA8dGJvZHk+PC90Ym9keT5cbiAgPC90YWJsZT5cbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LmNvbXBvbmVudC50YWJsZScsIFtcbiAgJ25nVGFzdHkuZmlsdGVyLmNsZWFuRmllbGROYW1lJyxcbiAgJ25nVGFzdHkuZmlsdGVyLnJhbmdlJyxcbiAgJ25nVGFzdHkuc2VydmljZS50YXN0eVV0aWwnLFxuICAnbmdUYXN0eS50cGxzLnRhYmxlLmhlYWQnLFxuICAnbmdUYXN0eS50cGxzLnRhYmxlLnBhZ2luYXRpb24nXG5dKVxuLmNvbnN0YW50KCd0YWJsZUNvbmZpZycsIHtcbiAgaW5pdDoge1xuICAgICdjb3VudCc6IDUsXG4gICAgJ3BhZ2UnOiAxLFxuICAgICdzb3J0QnknOiB1bmRlZmluZWQsXG4gICAgJ3NvcnRPcmRlcic6IHVuZGVmaW5lZCxcbiAgICAnZmlsdGVyQmFzZSc6IDFcbiAgfSxcbiAgcXVlcnk6IHtcbiAgICAncGFnZSc6ICdwYWdlJyxcbiAgICAnY291bnQnOiAnY291bnQnLFxuICAgICdzb3J0QnknOiAnc29ydC1ieScsXG4gICAgJ3NvcnRPcmRlcic6ICdzb3J0LW9yZGVyJ1xuICB9LFxuICBib290c3RyYXBJY29uOiBmYWxzZSxcbiAgYmluZE9uY2U6IHRydWUsXG4gIGxvYWRPbkluaXQ6IGZhbHNlLFxuICBpY29uVXA6ICdmYSBmYS1zb3J0LXVwJyxcbiAgaWNvbkRvd246ICdmYSBmYS1zb3J0LWRvd24nLFxuICBsaXN0SXRlbXNQZXJQYWdlOiBbNSwgMjUsIDUwLCAxMDBdLFxuICBpdGVtc1BlclBhZ2U6IDUsXG4gIHRlbXBsYXRlSGVhZFVybDogJ3RlbXBsYXRlL3RhYmxlL2hlYWQuaHRtbCcsXG4gIHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvdGFibGUvcGFnaW5hdGlvbi5odG1sJyxcbiAgd2F0Y2hSZXNvdXJjZTogJ3JlZmVyZW5jZSdcbn0pXG4uY29udHJvbGxlcignVGFibGVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkYXR0cnMsICRmaWx0ZXIsIHRhYmxlQ29uZmlnLCB0YXN0eVV0aWwpIHtcbiAgdmFyIGxpc3RTY29wZVRvV2F0Y2gsIGluaXRUYWJsZSwgbmV3U2NvcGVOYW1lLCBpbml0U3RhdHVzLFxuICAgICAgdXBkYXRlQ2xpZW50U2lkZVJlc291cmNlLCB1cGRhdGVTZXJ2ZXJTaWRlUmVzb3VyY2UsIHNldERpcmVjdGl2ZXNWYWx1ZXMsXG4gICAgICBidWlsZENsaWVudFJlc291cmNlLCBidWlsZFVybCwgcGFyYW1zSW5pdGlhbEN5Y2xlLCBpbml0Tm93LCBsb2FkT25Jbml0O1xuICB2YXIgdm0gPSB0aGlzO1xuICB2bS4kc2NvcGUgPSAkc2NvcGU7XG4gIGluaXRTdGF0dXMgPSB7fTtcbiAgaW5pdE5vdyA9IHRydWU7XG4gIHBhcmFtc0luaXRpYWxDeWNsZSA9IHRydWU7XG4gICRzY29wZS5pbml0ID0ge307XG4gICRzY29wZS5xdWVyeSA9IHt9O1xuICAkc2NvcGUubG9ncyA9IHtcbiAgICAnYnVpbGRDbGllbnRSZXNvdXJjZUNvdW50JzogMCxcbiAgICAndXBkYXRlU2VydmVyU2lkZVJlc291cmNlUnVubmluZyc6IDBcbiAgfTtcbiAgJHNjb3BlLnRoZW1lID0ge307XG5cbiAgLy8gRWFjaCBvbmUgb2YgdGhlbSBpcyBhIHBvc3NpYmxlIGF0dHJpYnV0ZSB0byBzdGFydCB3YXRjaGluZ1xuICBsaXN0U2NvcGVUb1dhdGNoID0gW1xuICAgICdiaW5kRmlsdGVycycsIFxuICAgICdiaW5kRmlsdGVyc0NvbXBhcmF0b3InLFxuICAgICdiaW5kSW5pdCcsIFxuICAgICdiaW5kUXVlcnknLCBcbiAgICAnYmluZFJlc291cmNlJywgXG4gICAgJ2JpbmRSZXNvdXJjZUNhbGxiYWNrJywgXG4gICAgJ2JpbmRXYXRjaFJlc291cmNlJywgXG4gICAgJ2JpbmRSZWxvYWQnLFxuICAgICdiaW5kVGhlbWUnXG4gIF07XG4gIGxpc3RTY29wZVRvV2F0Y2guZm9yRWFjaChmdW5jdGlvbiAoc2NvcGVOYW1lKSB7XG4gICAgbmV3U2NvcGVOYW1lID0gc2NvcGVOYW1lLnN1YnN0cmluZyg0KTtcbiAgICBuZXdTY29wZU5hbWUgPSBuZXdTY29wZU5hbWUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBuZXdTY29wZU5hbWUuc2xpY2UoMSk7XG4gICAgaWYgKCRhdHRyc1tzY29wZU5hbWVdKSB7XG4gICAgICB0YXN0eVV0aWwuYmluZFRvKHNjb3BlTmFtZSwgJHNjb3BlLCAkYXR0cnMsIG5ld1Njb3BlTmFtZSk7XG4gICAgfSBlbHNlIGlmICgkYXR0cnNbbmV3U2NvcGVOYW1lXSAmJiBuZXdTY29wZU5hbWUgPT09ICd3YXRjaFJlc291cmNlJykge1xuICAgICAgJHNjb3BlW25ld1Njb3BlTmFtZV0gPSAkYXR0cnNbbmV3U2NvcGVOYW1lXTtcbiAgICB9IGVsc2UgaWYgKCRhdHRyc1tuZXdTY29wZU5hbWVdICYmIG5ld1Njb3BlTmFtZSA9PT0gJ2ZpbHRlcnNDb21wYXJhdG9yJykge1xuICAgICAgJHNjb3BlW25ld1Njb3BlTmFtZV0gPSBKU09OLnBhcnNlKCRhdHRyc1tuZXdTY29wZU5hbWVdKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIERlZmF1bHQgdGhlbWVcbiAgdm0uY29uZmlnID0ge307XG4gIGlmIChhbmd1bGFyLmlzT2JqZWN0KCRzY29wZS50aGVtZSkpIHtcbiAgICBPYmplY3Qua2V5cyh0YWJsZUNvbmZpZykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUudGhlbWVba2V5XSkpIHtcbiAgICAgICAgdm0uY29uZmlnW2tleV0gPSAkc2NvcGUudGhlbWVba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZtLmNvbmZpZ1trZXldID0gdGFibGVDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9LCB2bSk7XG4gIH0gZWxzZSB7XG4gICAgdm0uY29uZmlnID0gdGFibGVDb25maWc7XG4gIH1cblxuICAvLyBEZWZhdWx0IGNvbmZpZ3NcbiAgJHNjb3BlLnF1ZXJ5LnBhZ2UgPSAkc2NvcGUucXVlcnkucGFnZSB8fCB2bS5jb25maWcucXVlcnkucGFnZTtcbiAgJHNjb3BlLnF1ZXJ5LmNvdW50ID0gJHNjb3BlLnF1ZXJ5LmNvdW50IHx8IHZtLmNvbmZpZy5xdWVyeS5jb3VudDtcbiAgJHNjb3BlLnF1ZXJ5LnNvcnRCeSA9ICRzY29wZS5xdWVyeS5zb3J0QnkgfHwgdm0uY29uZmlnLnF1ZXJ5LnNvcnRCeTtcbiAgJHNjb3BlLnF1ZXJ5LnNvcnRPcmRlciA9ICRzY29wZS5xdWVyeS5zb3J0T3JkZXIgfHwgdm0uY29uZmlnLnF1ZXJ5LnNvcnRPcmRlcjtcblxuICAvLyBTZXQgaW5pdCBjb25maWdzXG4gIGlmICgkc2NvcGUucmVsb2FkICYmICF2bS5jb25maWcubG9hZE9uSW5pdCkge1xuICAgIGluaXROb3cgPSBmYWxzZTtcbiAgfVxuICAkc2NvcGUuaW5pdC5jb3VudCA9ICRzY29wZS5pbml0LmNvdW50IHx8IHZtLmNvbmZpZy5pbml0LmNvdW50O1xuICAkc2NvcGUuaW5pdC5wYWdlID0gJHNjb3BlLmluaXQucGFnZSB8fCB2bS5jb25maWcuaW5pdC5wYWdlO1xuICAkc2NvcGUuaW5pdC5zb3J0QnkgPSAkc2NvcGUuaW5pdC5zb3J0QnkgfHwgdm0uY29uZmlnLmluaXQuc29ydEJ5O1xuICAkc2NvcGUuaW5pdC5zb3J0T3JkZXIgPSAkc2NvcGUuaW5pdC5zb3J0T3JkZXIgfHwgdm0uY29uZmlnLmluaXQuc29ydE9yZGVyO1xuICBpZiAoIWFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmluaXQuZmlsdGVyQmFzZSkpIHtcbiAgICAkc2NvcGUuaW5pdC5maWx0ZXJCYXNlID0gJHNjb3BlLmluaXQuZmlsdGVyQmFzZTtcbiAgfSBlbHNlIHtcbiAgICAkc2NvcGUuaW5pdC5maWx0ZXJCYXNlID0gdm0uY29uZmlnLmluaXQuZmlsdGVyQmFzZTtcbiAgfSAgXG4gICRzY29wZS53YXRjaFJlc291cmNlID0gJHNjb3BlLndhdGNoUmVzb3VyY2UgfHwgdm0uY29uZmlnLndhdGNoUmVzb3VyY2U7XG5cbiAgLy8gRGVmdWFsdCB2YXJpYWJsZXNcbiAgdmFyIGxpc3RJbW11dGFibGVLZXkgPVtcbiAgICAnZmlsdGVycycsXG4gICAgJ2luaXQnLFxuICAgICdxdWVyeScsXG4gICAgJ3Jvd3MnLFxuICAgICdoZWFkZXInLFxuICAgICdwYWdpbmF0aW9uJyxcbiAgICAncGFyYW1zJyxcbiAgICAnc29ydE9yZGVyJyxcbiAgICAnc29ydEJ5JyxcbiAgICAndXJsJ1xuICBdO1xuICAkc2NvcGUuY2xpZW50U2lkZSA9IHRydWU7XG4gICRzY29wZS51cmwgPSAnJztcbiAgJHNjb3BlLmhlYWRlciA9IHtcbiAgICAnY29sdW1ucyc6IFtdXG4gIH07XG4gICRzY29wZS5yb3dzID0gW107XG4gICRzY29wZS5wYXJhbXMgPSB7fTtcbiAgJHNjb3BlLnBhZ2luYXRpb24gPSB7XG4gICAgJ2NvdW50JzogJHNjb3BlLmluaXQuY291bnQsXG4gICAgJ3BhZ2UnOiAkc2NvcGUuaW5pdC5wYWdlLFxuICAgICdwYWdlcyc6IDEsXG4gICAgJ3NpemUnOiAwXG4gIH07XG4gICRzY29wZS50aGVhZERpcmVjdGl2ZSA9IGZhbHNlO1xuICAkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSA9IGZhbHNlOyBcblxuICAvKiBTZXQgY3VzdG9tIGNvbmZpZ3NcbiAgICogSW4gdGhlIGZ1dHVyZSB5b3Ugd2lsbCBoYXZlIGEgd2F5IHRvIGNoYW5nZVxuICAgKiB0aGVzZSB2YWx1ZXMgYnkgYW4gaXNvbGF0ZSBvcHRpb25hbCBzY29wZSB2YXJpYWJsZSxcbiAgICogbW9yZSBpbmZvIGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci5qcy9pc3N1ZXMvNjQwNCAqL1xuICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5iaW5kUmVzb3VyY2UpICYmICFhbmd1bGFyLmlzRGVmaW5lZCgkYXR0cnMuYmluZFJlc291cmNlQ2FsbGJhY2spKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IG5lZWQgdGhlICcgK1xuICAgICAgICAgICAgICAgICAgICAnYmluZC1yZXNvdXJjZSBvciBiaW5kLXJlc291cmNlLWNhbGxiYWNrIGF0dHJpYnV0ZScpO1xuICB9XG4gIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkYXR0cnMuYmluZFJlc291cmNlKSkge1xuICAgIGlmICghYW5ndWxhci5pc09iamVjdCgkc2NvcGUucmVzb3VyY2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXJKUyB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogdGhlIGJpbmQtcmVzb3VyY2UgKCcrXG4gICAgICAgICAgICAgICAgICAgICAgJGF0dHJzLmJpbmRSZXNvdXJjZSArICcpIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICB9IGVsc2UgaWYgKCEkc2NvcGUucmVzb3VyY2UuaGVhZGVyICYmICEkc2NvcGUucmVzb3VyY2Uucm93cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IHRoZSBiaW5kLXJlc291cmNlICgnK1xuICAgICAgICAgICAgICAgICAgICAgICRhdHRycy5iaW5kUmVzb3VyY2UgKyAnKSBoYXMgdGhlIHByb3BlcnR5IGhlYWRlciBvciByb3dzIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxuICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJGF0dHJzLmJpbmRSZXNvdXJjZUNhbGxiYWNrKSkge1xuICAgIGlmICghYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5yZXNvdXJjZUNhbGxiYWNrKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IHRoZSBiaW5kLXJlc291cmNlLWNhbGxiYWNrICgnK1xuICAgICAgICAgICAgICAgICAgICAgICRhdHRycy5iaW5kUmVzb3VyY2VDYWxsYmFjayArICcpIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgICRzY29wZS5jbGllbnRTaWRlID0gZmFsc2U7XG4gIH0gICBcblxuICAvLyBJbiBUYWJsZUNvbnRyb2xsZXIsIGJ5IHVzaW5nIGB2bWAgd2UgYnVpbGQgYW4gQVBJIFxuICAvLyBmb3Igb3RoZXIgZGlyZWN0aXZlcyB0byB0YWxrIHRvIHZtIG9uZS5cbiAgdm0uc3RhcnQgPSBmYWxzZTtcblxuICB2bS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKGRpcmVjdGl2ZU5hbWUpIHtcbiAgICAkc2NvcGVbZGlyZWN0aXZlTmFtZSArICdEaXJlY3RpdmUnXSA9IHRydWU7XG4gICAgJHNjb3BlLnBhcmFtc1tkaXJlY3RpdmVOYW1lXSA9IHRydWU7XG4gIH07XG5cbiAgdm0uc2V0UGFyYW1zID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICRzY29wZS5wYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgIGlmIChbJ3NvcnRCeScsICdzb3J0T3JkZXInXS5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgJHNjb3BlLmhlYWRlcltrZXldID0gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIHZtLmluaXRUYWJsZSA9IGZ1bmN0aW9uIChrZXlEaXJlY3RpdmUpIHtcbiAgICBpbml0U3RhdHVzW2tleURpcmVjdGl2ZV0gPSB0cnVlO1xuICAgIGlmICghJHNjb3BlLnRoZWFkRGlyZWN0aXZlICYmICEkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkgeyAvLyBOb25lIG9mIHRoZW1cbiAgICAgIHZtLnN0YXJ0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCRzY29wZS50aGVhZERpcmVjdGl2ZSAmJiAkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkgeyAvLyBCb3RoIGRpcmVjdGl2ZXNcbiAgICAgIGlmIChpbml0U3RhdHVzLnRoZWFkICYmIGluaXRTdGF0dXMucGFnaW5hdGlvbil7XG4gICAgICAgIHZtLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCRzY29wZS50aGVhZERpcmVjdGl2ZSAmJiAhJHNjb3BlLnBhZ2luYXRpb25EaXJlY3RpdmUpIHsgLy8gT25seSBUaGVhZCBkaXJlY3RpdmVcbiAgICAgIGlmIChpbml0U3RhdHVzLnRoZWFkKXtcbiAgICAgICAgdm0uc3RhcnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoISRzY29wZS50aGVhZERpcmVjdGl2ZSAmJiAkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkgeyAvLyBPbmx5IFBhZ2luYXRpb24gZGlyZWN0aXZlXG4gICAgICBpZiAoaW5pdFN0YXR1cy5wYWdpbmF0aW9uKXtcbiAgICAgICAgdm0uc3RhcnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2bS5zdGFydCkge1xuICAgICAgaWYgKCRzY29wZS5jbGllbnRTaWRlKSB7XG4gICAgICAgICRzY29wZS5wYXJhbXMuc29ydEJ5ID0gJHNjb3BlLnJlc291cmNlLnNvcnRCeSB8fCAkc2NvcGUuaW5pdC5zb3J0Qnk7XG4gICAgICAgICRzY29wZS5wYXJhbXMuc29ydE9yZGVyID0gJHNjb3BlLnJlc291cmNlLnNvcnRPcmRlciB8fCAkc2NvcGUuaW5pdC5zb3J0T3JkZXI7XG4gICAgICAgICRzY29wZS5wYXJhbXMucGFnZSA9ICRzY29wZS5pbml0LnBhZ2U7XG4gICAgICAgIGlmICgkc2NvcGUucmVzb3VyY2UucGFnaW5hdGlvbikge1xuICAgICAgICAgICRzY29wZS5wYXJhbXMucGFnZSA9ICRzY29wZS5yZXNvdXJjZS5wYWdpbmF0aW9uLnBhZ2UgfHwgJHNjb3BlLmluaXQucGFnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5pdE5vdykge1xuICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSk7XG4gICAgICAgIH0gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUucGFyYW1zLnNvcnRCeSA9ICRzY29wZS5pbml0LnNvcnRCeTtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5zb3J0T3JkZXIgPSAkc2NvcGUuaW5pdC5zb3J0T3JkZXI7XG4gICAgICAgICRzY29wZS5wYXJhbXMucGFnZSA9ICRzY29wZS5pbml0LnBhZ2U7XG4gICAgICAgIGlmIChpbml0Tm93KSB7XG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmModXBkYXRlU2VydmVyU2lkZVJlc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUucmVsb2FkKSB7XG4gICAgICAgICAgJHNjb3BlLnVybCA9IGJ1aWxkVXJsKCRzY29wZS5wYXJhbXMsICRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAkc2NvcGUucmVsb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlQ2FsbGJhY2soJHNjb3BlLnVybCwgYW5ndWxhci5jb3B5KCRzY29wZS5wYXJhbXMpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgIHNldERpcmVjdGl2ZXNWYWx1ZXMocmVzb3VyY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2bS5iaW5kT25jZSA9IHZtLmNvbmZpZy5iaW5kT25jZTtcblxuICBzZXREaXJlY3RpdmVzVmFsdWVzID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgaWYgKCFhbmd1bGFyLmlzT2JqZWN0KHJlc291cmNlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IHRoZSByZXNvdXJjZSByZXNwb25zZSAnK1xuICAgICAgICAgICAgICAgICAgICAgICdpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgfSBlbHNlIGlmICghcmVzb3VyY2UuaGVhZGVyICYmICFyZXNvdXJjZS5yb3dzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXJKUyB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogdGhlIHJlc291cmNlIHJlc3BvbnNlIG9iamVjdCAnK1xuICAgICAgICAgICAgICAgICAgICAgICdoYXMgdGhlIHByb3BlcnR5IGhlYWRlciBvciByb3dzIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhyZXNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChsaXN0SW1tdXRhYmxlS2V5LmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgJHNjb3BlW2tleV0gPSByZXNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEFzc3VtaW5nIGlmIG9uZSBoZWFkZXIgdXNlcyBqdXN0IG9uZSBrZXkgaXQncyBiYXNlZCBvbiB0aGUgbmV3IHBhdHRlcm4uXG4gICAgLy8gW2ZlYXR1cmUgcmVxdWVzdF0gc2ltcGxpZmllZCBoZWFkZXIgZm9yIHJlc291cmNlcyAjMzcgYnkgQFdlYlJlZmxlY3Rpb25cbiAgICBpZiAocmVzb3VyY2UuaGVhZGVyLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhyZXNvdXJjZS5oZWFkZXJbMF0pLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmVzb3VyY2UuaGVhZGVyID0gcmVzb3VyY2UuaGVhZGVyLm1hcChmdW5jdGlvbiAoaGVhZGVyKSB7XG4gICAgICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyhoZWFkZXIpWzBdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIG5hbWU6IGhlYWRlcltrZXldXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgJHNjb3BlLmhlYWRlciA9IHtcbiAgICAgICdjb2x1bW5zJzogcmVzb3VyY2UuaGVhZGVyLFxuICAgICAgJ3NvcnRCeSc6ICRzY29wZS5wYXJhbXMuc29ydEJ5LFxuICAgICAgJ3NvcnRPcmRlcic6ICRzY29wZS5wYXJhbXMuc29ydE9yZGVyXG4gICAgfTtcbiAgICBpZiAoISRzY29wZS5jbGllbnRTaWRlKSB7XG4gICAgICAkc2NvcGUuaGVhZGVyLnNvcnRCeSA9ICRzY29wZS5oZWFkZXIuc29ydEJ5IHx8IHJlc291cmNlLnNvcnRCeTtcbiAgICAgICRzY29wZS5oZWFkZXIuc29ydE9yZGVyID0gJHNjb3BlLmhlYWRlci5zb3J0T3JkZXIgfHwgcmVzb3VyY2Uuc29ydE9yZGVyO1xuICAgIH1cbiAgICAkc2NvcGUucm93cyA9IHJlc291cmNlLnJvd3M7XG4gICAgaWYgKCRzY29wZS5wYWdpbmF0aW9uRGlyZWN0aXZlKSB7XG4gICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlID0gJHNjb3BlLnBhcmFtcy5wYWdlO1xuICAgICAgJHNjb3BlLnBhZ2luYXRpb24uY291bnQgPSAkc2NvcGUucGFyYW1zLmNvdW50O1xuICAgICAgJHNjb3BlLnBhZ2luYXRpb24uc2l6ZSA9ICRzY29wZS5yb3dzLmxlbmd0aDtcbiAgICAgIGlmIChyZXNvdXJjZS5wYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChyZXNvdXJjZS5wYWdpbmF0aW9uLmNvdW50KSB7XG4gICAgICAgICAgJHNjb3BlLnBhZ2luYXRpb24uY291bnQgPSByZXNvdXJjZS5wYWdpbmF0aW9uLmNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvdXJjZS5wYWdpbmF0aW9uLnBhZ2UpIHtcbiAgICAgICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlID0gcmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNvdXJjZS5wYWdpbmF0aW9uLnNpemUpIHtcbiAgICAgICAgICAkc2NvcGUucGFnaW5hdGlvbi5zaXplID0gcmVzb3VyY2UucGFnaW5hdGlvbi5zaXplO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlcyA9IE1hdGguY2VpbCgkc2NvcGUucGFnaW5hdGlvbi5zaXplIC8gJHNjb3BlLnBhZ2luYXRpb24uY291bnQpO1xuICAgICAgaWYgKCRzY29wZS5wYWdpbmF0aW9uLnBhZ2VzIDwgJHNjb3BlLnBhZ2luYXRpb24ucGFnZSkge1xuICAgICAgICAkc2NvcGUucGFyYW1zLnBhZ2UgPSAkc2NvcGUucGFnaW5hdGlvbi5wYWdlcztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYnVpbGRDbGllbnRSZXNvdXJjZSA9IGZ1bmN0aW9uKHVwZGF0ZUZyb20pIHtcbiAgICB2YXIgZnJvbVJvdywgdG9Sb3csIHJvd1RvU2hvdywgcmV2ZXJzZSwgbGlzdFNvcnRCeTtcbiAgICAkc2NvcGUubG9ncy5idWlsZENsaWVudFJlc291cmNlQ291bnQgKz0gMTtcbiAgICBpZiAoJHNjb3BlLnRoZWFkRGlyZWN0aXZlICYmICRzY29wZS5oZWFkZXIuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHJldmVyc2UgPSAkc2NvcGUuaGVhZGVyLnNvcnRPcmRlciA9PT0gJ2FzYycgPyBmYWxzZSA6IHRydWU7XG4gICAgICBsaXN0U29ydEJ5ID0gW2Z1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1bJHNjb3BlLmhlYWRlci5zb3J0QnldO1xuICAgICAgfV07XG4gICAgICBpZiAoJHNjb3BlLmhlYWRlci5jb2x1bW5zWzBdLmtleSAhPT0gJHNjb3BlLmhlYWRlci5zb3J0QnkpIHtcbiAgICAgICAgbGlzdFNvcnRCeS5wdXNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbVskc2NvcGUuaGVhZGVyLmNvbHVtbnNbMF0ua2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoJHNjb3BlLmhlYWRlci5zb3J0QnkpIHtcbiAgICAgICAgJHNjb3BlLnJvd3MgPSAkZmlsdGVyKCdvcmRlckJ5JykoJHNjb3BlLnJvd3MsIGxpc3RTb3J0QnksIHJldmVyc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoJGF0dHJzLmJpbmRGaWx0ZXJzKSB7XG4gICAgICAkc2NvcGUucm93cyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKCRzY29wZS5yb3dzLCAkc2NvcGUuZmlsdGVycywgJHNjb3BlLmZpbHRlcnNDb21wYXJhdG9yKTtcbiAgICB9XG4gICAgaWYgKCRzY29wZS5wYWdpbmF0aW9uRGlyZWN0aXZlKSB7XG4gICAgICAkc2NvcGUucGFnaW5hdGlvbi5jb3VudCA9ICRzY29wZS5wYXJhbXMuY291bnQ7XG4gICAgICAkc2NvcGUucGFnaW5hdGlvbi5zaXplID0gJHNjb3BlLnJvd3MubGVuZ3RoO1xuICAgICAgJHNjb3BlLnBhZ2luYXRpb24ucGFnZXMgPSBNYXRoLmNlaWwoJHNjb3BlLnJvd3MubGVuZ3RoIC8gJHNjb3BlLnBhZ2luYXRpb24uY291bnQpO1xuICAgICAgaWYgKHVwZGF0ZUZyb20gPT09ICdmaWx0ZXJzJyB8fCBcbiAgICAgICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlID4gJHNjb3BlLnBhZ2luYXRpb24ucGFnZXMpIHtcbiAgICAgICAgJHNjb3BlLnBhZ2luYXRpb24ucGFnZSA9IDE7XG4gICAgICAgICRzY29wZS5wYXJhbXMucGFnZSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlID0gJHNjb3BlLnBhcmFtcy5wYWdlO1xuICAgICAgfVxuICAgICAgdG9Sb3cgPSAkc2NvcGUucGFnaW5hdGlvbi5jb3VudCAqICRzY29wZS5wYWdpbmF0aW9uLnBhZ2U7XG4gICAgICBmcm9tUm93ID0gdG9Sb3cgLSAkc2NvcGUucGFnaW5hdGlvbi5jb3VudDtcbiAgICAgIGlmIChmcm9tUm93ID49IDAgJiYgdG9Sb3cgPj0gMCkge1xuICAgICAgICByb3dUb1Nob3cgPSAkc2NvcGUucm93cy5zbGljZShmcm9tUm93LCB0b1Jvdyk7XG4gICAgICAgICRzY29wZS5yb3dzID0gcm93VG9TaG93O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBidWlsZFVybCA9IGZ1bmN0aW9uKHBhcmFtcywgZmlsdGVycykge1xuICAgIHZhciB1cmxRdWVyeSwgdmFsdWUsIHVybCwgbGlzdEtleU5vdEpvaW47XG4gICAgdXJsUXVlcnkgPSB7fTtcbiAgICBsaXN0S2V5Tm90Sm9pbiA9IFsnc29ydEJ5JywgJ3NvcnRPcmRlcicsICdwYWdlJywgJ2NvdW50J107XG4gICAgaWYgKCRzY29wZS50aGVhZERpcmVjdGl2ZSkge1xuICAgICAgdXJsUXVlcnkgPSB0YXN0eVV0aWwuc2V0UHJvcGVydHkodXJsUXVlcnksIHBhcmFtcywgJ3NvcnRCeScpO1xuICAgICAgdXJsUXVlcnkgPSB0YXN0eVV0aWwuc2V0UHJvcGVydHkodXJsUXVlcnksIHBhcmFtcywgJ3NvcnRPcmRlcicpO1xuICAgIH1cbiAgICBpZiAoJHNjb3BlLnBhZ2luYXRpb25EaXJlY3RpdmUpIHtcbiAgICAgIHVybFF1ZXJ5ID0gdGFzdHlVdGlsLnNldFByb3BlcnR5KHVybFF1ZXJ5LCBwYXJhbXMsICdwYWdlJyk7XG4gICAgICB1cmxRdWVyeSA9IHRhc3R5VXRpbC5zZXRQcm9wZXJ0eSh1cmxRdWVyeSwgcGFyYW1zLCAnY291bnQnKTtcbiAgICB9XG4gICAgaWYgKCRhdHRycy5iaW5kRmlsdGVycykge1xuICAgICAgdXJsUXVlcnkgPSB0YXN0eVV0aWwuam9pbk9iamVjdHModXJsUXVlcnksIGZpbHRlcnMsIGxpc3RLZXlOb3RKb2luKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHVybFF1ZXJ5KS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YWx1ZSA9IHVybFF1ZXJ5W2tleV07XG4gICAgICBpZiAoJHNjb3BlLnF1ZXJ5W2tleV0pIHtcbiAgICAgICAga2V5ID0gJHNjb3BlLnF1ZXJ5W2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH0pLmpvaW4oJyYnKTtcbiAgfTtcblxuICB1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UgPSBmdW5jdGlvbiAodXBkYXRlRnJvbSkge1xuICAgIGlmICgkc2NvcGUucGFyYW1zLnNvcnRCeSkge1xuICAgICAgJHNjb3BlLnJlc291cmNlLnNvcnRCeSA9ICRzY29wZS5wYXJhbXMuc29ydEJ5O1xuICAgIH1cbiAgICBpZiAoJHNjb3BlLnBhcmFtcy5zb3J0T3JkZXIpIHtcbiAgICAgICRzY29wZS5yZXNvdXJjZS5zb3J0T3JkZXIgPSAkc2NvcGUucGFyYW1zLnNvcnRPcmRlcjtcbiAgICB9XG4gICAgaWYgKCRzY29wZS5wYXJhbXMucGFnZSAmJiAkc2NvcGUucGFyYW1zLmNvdW50KSB7XG4gICAgICAkc2NvcGUucmVzb3VyY2UucGFnaW5hdGlvbiA9ICRzY29wZS5wYWdpbmF0aW9uO1xuICAgICAgJHNjb3BlLnJlc291cmNlLnBhZ2luYXRpb24ucGFnZSA9ICRzY29wZS5wYXJhbXMucGFnZTtcbiAgICAgICRzY29wZS5yZXNvdXJjZS5wYWdpbmF0aW9uLmNvdW50ID0gJHNjb3BlLnBhcmFtcy5jb3VudDtcbiAgICB9XG4gICAgc2V0RGlyZWN0aXZlc1ZhbHVlcygkc2NvcGUucmVzb3VyY2UpO1xuICAgIGJ1aWxkQ2xpZW50UmVzb3VyY2UodXBkYXRlRnJvbSk7XG4gIH07XG5cbiAgdXBkYXRlU2VydmVyU2lkZVJlc291cmNlID0gZnVuY3Rpb24gKHVwZGF0ZUZyb20pIHtcbiAgICBpZiAodXBkYXRlRnJvbSA9PT0gJ2ZpbHRlcnMnKSB7XG4gICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcigkc2NvcGUuaW5pdC5maWx0ZXJCYXNlKSkge1xuICAgICAgICAkc2NvcGUucGFyYW1zLnBhZ2UgPSAkc2NvcGUuaW5pdC5maWx0ZXJCYXNlO1xuICAgICAgfVxuICAgIH1cbiAgICAkc2NvcGUudXJsID0gYnVpbGRVcmwoJHNjb3BlLnBhcmFtcywgJHNjb3BlLmZpbHRlcnMpO1xuICAgIGlmICgkc2NvcGUucmVsb2FkKSB7XG4gICAgICAkc2NvcGUucmVsb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUucmVzb3VyY2VDYWxsYmFjaygkc2NvcGUudXJsLCBhbmd1bGFyLmNvcHkoJHNjb3BlLnBhcmFtcykpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICAgIHNldERpcmVjdGl2ZXNWYWx1ZXMocmVzb3VyY2UpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgoaW5pdE5vdyB8fCB1cGRhdGVGcm9tID09PSAncGFyYW1zJykgJiZcbiAgICAgICAgISRzY29wZS5sb2dzLnVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZVJ1bm5pbmcpIHtcbiAgICAgICRzY29wZS5sb2dzLnVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZVJ1bm5pbmcgPSB0cnVlO1xuICAgICAgdmFyIHBhcmFtc09iaiA9IGFuZ3VsYXIuY29weSgkc2NvcGUucGFyYW1zKTtcbiAgICAgIHBhcmFtc09iai5maWx0ZXJzID0gJHNjb3BlLmZpbHRlcnM7XG4gICAgICAkc2NvcGUucmVzb3VyY2VDYWxsYmFjaygkc2NvcGUudXJsLCBwYXJhbXNPYmopXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgc2V0RGlyZWN0aXZlc1ZhbHVlcyhyZXNvdXJjZSk7XG4gICAgICAgICRzY29wZS5sb2dzLnVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZVJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8vIEFuZ3VsYXJKcyAkd2F0Y2ggY2FsbGJhY2tzXG4gIGlmICgkYXR0cnMuYmluZEZpbHRlcnMpIHtcbiAgICAkc2NvcGUuJHdhdGNoKCdmaWx0ZXJzJywgZnVuY3Rpb24gd2F0Y2hGaWx0ZXJzIChuZXdWYWx1ZSwgb2xkVmFsdWUpe1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoJHNjb3BlLmNsaWVudFNpZGUpIHtcbiAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyh1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UoJ2ZpbHRlcnMnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmModXBkYXRlU2VydmVyU2lkZVJlc291cmNlKCdmaWx0ZXJzJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH1cbiAgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ3BhcmFtcycsIGZ1bmN0aW9uIHdhdGNoUGFyYW1zIChuZXdWYWx1ZSwgb2xkVmFsdWUpe1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIC8vIFJ1biB1cGRhdGUgcmVzdW9yY2Ugb25seSBpZiB3ZSBhcmUgb24gXG4gICAgICAvLyB0aGUgc2Vjb25kIGN5Y2xlIG9yIG1vcmUgb2YgYHBhcmFtc2BcbiAgICAgIGlmIChwYXJhbXNJbml0aWFsQ3ljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICgkc2NvcGUuY2xpZW50U2lkZSkge1xuICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSgncGFyYW1zJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZSgncGFyYW1zJykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXNJbml0aWFsQ3ljbGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoJHNjb3BlLnJlc291cmNlKSB7XG4gICAgdmFyIHdhdGNoUmVzb3VyY2UgPSBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKXtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5zb3J0QnkgPSAkc2NvcGUucmVzb3VyY2Uuc29ydEJ5IHx8ICRzY29wZS5wYXJhbXMuc29ydEJ5O1xuICAgICAgICAkc2NvcGUucGFyYW1zLnNvcnRPcmRlciA9ICRzY29wZS5yZXNvdXJjZS5zb3J0T3JkZXIgfHwgJHNjb3BlLnBhcmFtcy5zb3J0T3JkZXI7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSgncmVzb3VyY2UnKSk7XG4gICAgICAgIGlmICghJHNjb3BlLnJlc291cmNlLnJlbG9hZCkge1xuICAgICAgICAgICRzY29wZS5yZXNvdXJjZS5yZWxvYWQgPSBmdW5jdGlvbiByZWxvYWRSZXNvdXJjZSAoKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyh1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UoJ3Jlc291cmNlJykpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICgkc2NvcGUud2F0Y2hSZXNvdXJjZSA9PT0gJ3JlZmVyZW5jZScpIHtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlJywgd2F0Y2hSZXNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICgkc2NvcGUud2F0Y2hSZXNvdXJjZSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigncmVzb3VyY2UuaGVhZGVyJywgd2F0Y2hSZXNvdXJjZSk7XG4gICAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigncmVzb3VyY2Uucm93cycsIHdhdGNoUmVzb3VyY2UpO1xuICAgICAgJHNjb3BlLiR3YXRjaEdyb3VwKFsncmVzb3VyY2Uuc29ydEJ5JywgXG4gICAgICAgICdyZXNvdXJjZS5zb3J0T3JkZXInLCBcbiAgICAgICAgJ3Jlc291cmNlLnBhZ2luYXRpb24uY291bnQnLFxuICAgICAgICAncmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlJyxcbiAgICAgICAgJ3Jlc291cmNlLnBhZ2luYXRpb24ucGFnZXMnLFxuICAgICAgICAncmVzb3VyY2UucGFnaW5hdGlvbi5zaXplJ10sIHdhdGNoUmVzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAoJHNjb3BlLndhdGNoUmVzb3VyY2UgPT09ICdlcXVhbGl0eScpIHtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLmhlYWRlcicsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2Uucm93cycsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2Uuc29ydEJ5Jywgd2F0Y2hSZXNvdXJjZSwgdHJ1ZSk7XG4gICAgICAkc2NvcGUuJHdhdGNoKCdyZXNvdXJjZS5zb3J0T3JkZXInLCB3YXRjaFJlc291cmNlLCB0cnVlKTtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLnBhZ2luYXRpb24uY291bnQnLCB3YXRjaFJlc291cmNlLCB0cnVlKTtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLnBhZ2luYXRpb24ucGFnZScsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlcycsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2UucGFnaW5hdGlvbi5zaXplJywgd2F0Y2hSZXNvdXJjZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG59KVxuLmRpcmVjdGl2ZSgndGFzdHlUYWJsZScsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZTogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiAnVGFibGVDb250cm9sbGVyJyxcbiAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRhc3R5VGFibGUpIHtcbiAgICAgIGlmIChlbGVtZW50LmZpbmQoJ3Rhc3R5LXRoZWFkJykubGVuZ3RoIHx8XG4gICAgICAgICAgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdbdGFzdHktdGhlYWRdJykpIHtcbiAgICAgICAgdGFzdHlUYWJsZS5hY3RpdmF0ZSgndGhlYWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50LmZpbmQoJ3Rhc3R5LXBhZ2luYXRpb24nKS5sZW5ndGggfHxcbiAgICAgICAgICBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJ1t0YXN0eS1wYWdpbmF0aW9uXScpKSB7XG4gICAgICAgIHRhc3R5VGFibGUuYWN0aXZhdGUoJ3BhZ2luYXRpb24nKTtcbiAgICAgIH1cbiAgICAgIHRhc3R5VGFibGUuaW5pdFRhYmxlKCk7XG4gICAgfVxuICB9O1xufSlcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1Rhc3R5LmNvbXBvbmVudC50YXN0eVRoZWFkXG4gKlxuICogQGV4YW1wbGVcbiAgPHRhYmxlIHRhc3R5LXRhYmxlPlxuICAgIDx0aGVhZCB0YWJsZS1oZWFkPjwvdGhlYWQ+XG4gICAgPHRib2R5PjwvdGJvZHk+XG4gIDwvdGFibGU+XG4gKlxuICovXG4uZGlyZWN0aXZlKCd0YXN0eVRoZWFkJywgZnVuY3Rpb24oJGZpbHRlciwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkY29tcGlsZSwgdGFibGVDb25maWcsIHRhc3R5VXRpbCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHJlcXVpcmU6ICdedGFzdHlUYWJsZScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiB0YWJsZUNvbmZpZy50ZW1wbGF0ZUhlYWRVcmwsXG4gICAgbGluazogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0YXN0eVRhYmxlKSB7XG4gICAgICB2YXIgbmV3U2NvcGVOYW1lLCBsaXN0U2NvcGVUb1dhdGNoO1xuICAgICAgc2NvcGUuYmluZE9uY2UgPSB0YXN0eVRhYmxlLmJpbmRPbmNlO1xuICAgICAgc2NvcGUuY29sdW1ucyA9IFtdO1xuICAgICAgc2NvcGUuYm9vdHN0cmFwSWNvbiA9IHRhc3R5VGFibGUuY29uZmlnLmJvb3RzdHJhcEljb247XG4gICAgICBzY29wZS5pY29uVXAgPSB0YXN0eVRhYmxlLmNvbmZpZy5pY29uVXA7XG4gICAgICBzY29wZS5pY29uRG93biA9IHRhc3R5VGFibGUuY29uZmlnLmljb25Eb3duO1xuXG4gICAgICBsaXN0U2NvcGVUb1dhdGNoID0gW1xuICAgICAgICAnYmluZE5vdFNvcnRCeScsIFxuICAgICAgICAnYmluZEJvb3RzdHJhcEljb24nLCBcbiAgICAgICAgJ2JpbmRJY29uVXAnLCBcbiAgICAgICAgJ2JpbmRJY29uRG93bicsXG4gICAgICAgICdiaW5kVGVtcGxhdGVVcmwnXG4gICAgICBdO1xuICAgICAgbGlzdFNjb3BlVG9XYXRjaC5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZU5hbWUpIHtcbiAgICAgICAgbmV3U2NvcGVOYW1lID0gc2NvcGVOYW1lLnN1YnN0cmluZyg0KTtcbiAgICAgICAgbmV3U2NvcGVOYW1lID0gbmV3U2NvcGVOYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgbmV3U2NvcGVOYW1lLnNsaWNlKDEpO1xuICAgICAgICBpZiAoYXR0cnNbc2NvcGVOYW1lXSkge1xuICAgICAgICAgIHRhc3R5VXRpbC5iaW5kVG8oc2NvcGVOYW1lLCBzY29wZSwgYXR0cnMsIG5ld1Njb3BlTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0cnNbbmV3U2NvcGVOYW1lXSkge1xuICAgICAgICAgIGlmIChhdHRyc1tuZXdTY29wZU5hbWVdWzBdID09PSAnWycpIHtcbiAgICAgICAgICAgIGF0dHJzW25ld1Njb3BlTmFtZV0gPSBhdHRyc1tuZXdTY29wZU5hbWVdLnJlcGxhY2UoLycvZywgJ1wiJyk7XG4gICAgICAgICAgICBzY29wZVtuZXdTY29wZU5hbWVdID0gSlNPTi5wYXJzZShhdHRyc1tuZXdTY29wZU5hbWVdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcGVbbmV3U2NvcGVOYW1lXSA9IGF0dHJzW25ld1Njb3BlTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNjb3BlLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgICRodHRwLmdldChzY29wZS50ZW1wbGF0ZVVybCwgeyBjYWNoZTogJHRlbXBsYXRlQ2FjaGUgfSlcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24odGVtcGxhdGVDb250ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5yZXBsYWNlV2l0aCgkY29tcGlsZSh0ZW1wbGF0ZUNvbnRlbnQpKHNjb3BlKSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2NvcGUuc2V0Q29sdW1ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdpZHRoLCBpLCBhY3RpdmUsIHNvcnRhYmxlLCBzb3J0LCBcbiAgICAgICAgICAgIGlzU29ydGVkLCBpc1NvcnRlZENhcmV0O1xuICAgICAgICBzY29wZS5jb2x1bW5zID0gW107XG4gICAgICAgIGlmIChzY29wZS5oZWFkZXIuc29ydE9yZGVyID09PSAnZHNjJyAmJiBcbiAgICAgICAgICAgIHNjb3BlLmhlYWRlci5zb3J0QnkgJiZcbiAgICAgICAgICAgIHNjb3BlLmhlYWRlci5zb3J0QnlbMF0gIT09ICctJykge1xuICAgICAgICAgIHNjb3BlLmhlYWRlci5zb3J0QnkgPSAnLScgKyBzY29wZS5oZWFkZXIuc29ydEJ5O1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLmhlYWRlci5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUgPSBjb2x1bW4uc3R5bGUgfHwge307XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkoY29sdW1uLmNsYXNzKSkge1xuICAgICAgICAgICAgY29sdW1uLmNsYXNzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvcnRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBpc1NvcnRlZCA9ICcnO1xuICAgICAgICAgIGlzU29ydGVkQ2FyZXQgPSAnJztcbiAgICAgICAgICAvLyBOb3Qgc29ydCBjb2x1bW4gd2hlbiB0aGUga2V5IGlzIHByZXNlbnQgaW4gdGhlIGBub3RTb3J0QnlgIGxpc3QsXG4gICAgICAgICAgLy8gYW5kIE5vdCBzb3J0IGNvbHVtbiB3aGVuIGBub3RTb3J0QnlgIGlzIGFuIGVtcHR5IGxpc3RcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHNjb3BlLm5vdFNvcnRCeSkpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5ub3RTb3J0QnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHNvcnRhYmxlID0gc2NvcGUubm90U29ydEJ5LmluZGV4T2YoY29sdW1uLmtleSkgPCAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc29ydGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbHVtbi5rZXkgPT09IHNjb3BlLmhlYWRlci5zb3J0QnkgfHxcbiAgICAgICAgICAgICAgJy0nICsgY29sdW1uLmtleSA9PT0gc2NvcGUuaGVhZGVyLnNvcnRCeSkge1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc29ydCA9ICRmaWx0ZXIoJ2NsZWFuRmllbGROYW1lJykoY29sdW1uLmtleSk7XG4gICAgICAgICAgaWYgKHNjb3BlLmhlYWRlci5zb3J0QnkgPT09ICctJyArIHNvcnQpIHtcbiAgICAgICAgICAgIGlmICh0YXN0eVRhYmxlLmNvbmZpZy5ib290c3RyYXBJY29uKSB7XG4gICAgICAgICAgICAgIGlzU29ydGVkID0gJyc7XG4gICAgICAgICAgICAgIGlzU29ydGVkQ2FyZXQgPSAnY2FyZXQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNTb3J0ZWQgPSBzY29wZS5pY29uRG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHNjb3BlLmhlYWRlci5zb3J0QnkgPT09IHNvcnQpIHtcbiAgICAgICAgICAgIGlmICh0YXN0eVRhYmxlLmNvbmZpZy5ib290c3RyYXBJY29uKSB7XG4gICAgICAgICAgICAgIGlzU29ydGVkID0gJ2Ryb3B1cCc7XG4gICAgICAgICAgICAgIGlzU29ydGVkQ2FyZXQgPSAnY2FyZXQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNTb3J0ZWQgPSBzY29wZS5pY29uVXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLmNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICAna2V5JzogY29sdW1uLmtleSxcbiAgICAgICAgICAgICduYW1lJzogY29sdW1uLm5hbWUsXG4gICAgICAgICAgICAnYWN0aXZlJzogYWN0aXZlLFxuICAgICAgICAgICAgJ3NvcnRhYmxlJzogc29ydGFibGUsXG4gICAgICAgICAgICAnY2xhc3MnOiBjb2x1bW4uY2xhc3MsXG4gICAgICAgICAgICAnc3R5bGUnOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAnaXNTb3J0ZWQnOiBpc1NvcnRlZCxcbiAgICAgICAgICAgICdpc1NvcnRlZENhcmV0JzogaXNTb3J0ZWRDYXJldFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0YXN0eVRhYmxlLnN0YXJ0KSB7XG4gICAgICAgICAgLy8gVGhlYWQgaXQncyBjYWxsZWRcbiAgICAgICAgICB0YXN0eVRhYmxlLmluaXRUYWJsZSgndGhlYWQnKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2NvcGUuc29ydEJ5ID0gZnVuY3Rpb24gKGNvbHVtbikge1xuICAgICAgICBpZiAoIWNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29sdW1uTmFtZSwgc29ydE9yZGVyO1xuICAgICAgICBjb2x1bW5OYW1lID0gJGZpbHRlcignY2xlYW5GaWVsZE5hbWUnKShjb2x1bW4ua2V5KTtcbiAgICAgICAgaWYgKHNjb3BlLmhlYWRlci5zb3J0QnkgPT09IGNvbHVtbk5hbWUpIHtcbiAgICAgICAgICBzb3J0T3JkZXIgPSAnZHNjJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3J0T3JkZXIgPSAnYXNjJztcbiAgICAgICAgfVxuICAgICAgICB0YXN0eVRhYmxlLnNldFBhcmFtcygnc29ydEJ5JywgY29sdW1uLmtleSk7XG4gICAgICAgIHRhc3R5VGFibGUuc2V0UGFyYW1zKCdzb3J0T3JkZXInLCBzb3J0T3JkZXIpO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuY2xhc3NUb1Nob3cgPSBmdW5jdGlvbiAoY29sdW1uKSB7XG4gICAgICAgIHZhciBsaXN0Q2xhc3NUb1Nob3cgPSBbXTtcbiAgICAgICAgaWYgKGNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgICAgIGxpc3RDbGFzc1RvU2hvdy5wdXNoKCdzb3J0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW4uYWN0aXZlKSB7XG4gICAgICAgICAgbGlzdENsYXNzVG9TaG93LnB1c2goJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbHVtbi5jbGFzcy5mb3JFYWNoKGZ1bmN0aW9uIGdldExpc3RDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgbGlzdENsYXNzVG9TaG93LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0Q2xhc3NUb1Nob3c7XG4gICAgICB9O1xuXG4gICAgICB0YXN0eVRhYmxlLiRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdoZWFkZXInLCBmdW5jdGlvbiB3YXRjaEhlYWRlciAobmV3VmFsdWUsIG9sZFZhbHVlKXtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICAmJiAoKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkgfHwgIXRhc3R5VGFibGUuc3RhcnQpKSB7XG4gICAgICAgICAgc2NvcGUuaGVhZGVyID0gbmV3VmFsdWU7XG4gICAgICAgICAgc2NvcGUuc2V0Q29sdW1ucygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KVxuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIG5nVGFzdHkuY29tcG9uZW50LnRhc3R5UGFnaW5hdGlvblxuICpcbiAqIEBleGFtcGxlXG4gIDxkaXYgdGFzdHktdGFibGU+XG4gICAgPHRhYmxlPlxuICAgICAuLi5cbiAgICA8L3RhYmxlPlxuICAgIDxkaXYgdGFibGUtcGFnaW5hdGlvbj48L2Rpdj5cbiAgPC9kaXY+XG4gKlxuICovXG4uZGlyZWN0aXZlKCd0YXN0eVBhZ2luYXRpb24nLCBmdW5jdGlvbigkZmlsdGVyLCAkdGVtcGxhdGVDYWNoZSwgJGh0dHAsICRjb21waWxlLCB0YWJsZUNvbmZpZywgdGFzdHlVdGlsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgcmVxdWlyZTogJ150YXN0eVRhYmxlJyxcbiAgICBzY29wZToge30sXG4gICAgdGVtcGxhdGVVcmw6IHRhYmxlQ29uZmlnLnRlbXBsYXRlVXJsLFxuICAgIGxpbms6IGZ1bmN0aW9uIHBvc3RMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgdGFzdHlUYWJsZSkge1xuICAgICAgdmFyIGdldFBhZ2UsIHNldENvdW50LCBzZXRQYWdpbmF0aW9uUmFuZ2UsIHNldFByZXZpb3VzUmFuZ2UsIFxuICAgICAgICAgIHNldFJlbWFpbmluZ1JhbmdlLCBzZXRQYWdpbmF0aW9uUmFuZ2VzLCBsaXN0U2NvcGVUb1dhdGNoLCBuZXdTY29wZU5hbWU7XG5cbiAgICAgIGxpc3RTY29wZVRvV2F0Y2ggPSBbXG4gICAgICAgICdiaW5kSXRlbXNQZXJQYWdlJywgXG4gICAgICAgICdiaW5kTGlzdEl0ZW1zUGVyUGFnZScsIFxuICAgICAgICAnYmluZFRlbXBsYXRlVXJsJ1xuICAgICAgXTtcbiAgICAgIGxpc3RTY29wZVRvV2F0Y2guZm9yRWFjaChmdW5jdGlvbiAoc2NvcGVOYW1lKSB7XG4gICAgICAgIG5ld1Njb3BlTmFtZSA9IHNjb3BlTmFtZS5zdWJzdHJpbmcoNCk7XG4gICAgICAgIG5ld1Njb3BlTmFtZSA9IG5ld1Njb3BlTmFtZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIG5ld1Njb3BlTmFtZS5zbGljZSgxKTtcbiAgICAgICAgaWYgKGF0dHJzW3Njb3BlTmFtZV0pIHtcbiAgICAgICAgICB0YXN0eVV0aWwuYmluZFRvKHNjb3BlTmFtZSwgc2NvcGUsIGF0dHJzLCBuZXdTY29wZU5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dHJzW25ld1Njb3BlTmFtZV0pIHtcbiAgICAgICAgICBpZiAobmV3U2NvcGVOYW1lID09PSAnaXRlbXNQZXJQYWdlJykge1xuICAgICAgICAgICAgc2NvcGVbbmV3U2NvcGVOYW1lXSA9IHBhcnNlSW50KGF0dHJzW25ld1Njb3BlTmFtZV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzY29wZVtuZXdTY29wZU5hbWVdID0gSlNPTi5wYXJzZShhdHRyc1tuZXdTY29wZU5hbWVdKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBzY29wZVtuZXdTY29wZU5hbWVdID0gYXR0cnNbbmV3U2NvcGVOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZiAoc2NvcGUudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgJGh0dHAuZ2V0KHNjb3BlLnRlbXBsYXRlVXJsLCB7IGNhY2hlOiAkdGVtcGxhdGVDYWNoZSB9KVxuICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbih0ZW1wbGF0ZUNvbnRlbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnJlcGxhY2VXaXRoKCRjb21waWxlKHRlbXBsYXRlQ29udGVudCkoc2NvcGUpKTsgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBEZWZhdWx0IGNvbmZpZ3NcbiAgICAgIHNjb3BlLml0ZW1zUGVyUGFnZSA9IHNjb3BlLml0ZW1zUGVyUGFnZSB8fCB0YXN0eVRhYmxlLmNvbmZpZy5pdGVtc1BlclBhZ2U7XG4gICAgICBzY29wZS5saXN0SXRlbXNQZXJQYWdlID0gc2NvcGUubGlzdEl0ZW1zUGVyUGFnZSB8fCB0YXN0eVRhYmxlLmNvbmZpZy5saXN0SXRlbXNQZXJQYWdlO1xuXG4gICAgICAvLyBTZXJ2ZSBzaWRlIHRhYmxlIGNhc2VcbiAgICAgIGlmICghdGFzdHlUYWJsZS4kc2NvcGUuY2xpZW50U2lkZSkge1xuICAgICAgICBzY29wZS5pdGVtc1BlclBhZ2UgPSB0YXN0eVRhYmxlLiRzY29wZS5pbml0LmNvdW50IHx8IHNjb3BlLml0ZW1zUGVyUGFnZTtcbiAgICAgIH1cblxuICAgICAgLy8gSW50ZXJuYWwgdmFyaWFibGVcbiAgICAgIHNjb3BlLnBhZ2luYXRpb24gPSB7fTtcbiAgICAgIHNjb3BlLnBhZ01pblJhbmdlID0gMTtcbiAgICAgIHNjb3BlLnBhZ01heFJhbmdlID0gMTtcblxuICAgICAgZ2V0UGFnZSA9IGZ1bmN0aW9uIChudW1QYWdlKSB7XG4gICAgICAgIHRhc3R5VGFibGUuc2V0UGFyYW1zKCdwYWdlJywgbnVtUGFnZSk7XG4gICAgICB9O1xuXG4gICAgICBzZXRDb3VudCA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICAgIHZhciBtYXhJdGVtcywgcGFnZTtcbiAgICAgICAgc2NvcGUuaXRlbXNQZXJQYWdlID0gY291bnQ7XG4gICAgICAgIG1heEl0ZW1zID0gY291bnQgKiBzY29wZS5wYWdpbmF0aW9uLnBhZ2U7XG4gICAgICAgIGlmIChtYXhJdGVtcyA+IHNjb3BlLnBhZ2luYXRpb24uc2l6ZSkge1xuICAgICAgICAgIHBhZ2UgPSBNYXRoLmNlaWwoc2NvcGUucGFnaW5hdGlvbi5zaXplIC8gY291bnQpO1xuICAgICAgICAgIHRhc3R5VGFibGUuc2V0UGFyYW1zKCdwYWdlJywgcGFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFzdHlUYWJsZS5zZXRQYXJhbXMoJ2NvdW50JywgY291bnQpO1xuICAgICAgfTtcblxuICAgICAgc2V0UGFnaW5hdGlvblJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VycmVudFBhZ2UsIHRvdGFsUGFnZXM7XG4gICAgICAgIGN1cnJlbnRQYWdlID0gc2NvcGUucGFnaW5hdGlvbi5wYWdlO1xuICAgICAgICBpZiAoY3VycmVudFBhZ2UgPiBzY29wZS5wYWdpbmF0aW9uLnBhZ2VzKSB7XG4gICAgICAgICAgY3VycmVudFBhZ2UgPSBzY29wZS5wYWdpbmF0aW9uLnBhZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnBhZ01pblJhbmdlID0gKGN1cnJlbnRQYWdlIC0gMikgPiAwID8gKGN1cnJlbnRQYWdlIC0gMikgOiAxO1xuICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IChjdXJyZW50UGFnZSArIDIpO1xuICAgICAgICBzY29wZS5wYWdpbmF0aW9uLnBhZ2UgID0gY3VycmVudFBhZ2U7XG4gICAgICAgIHNldFBhZ2luYXRpb25SYW5nZXMoKTtcbiAgICAgIH07XG5cbiAgICAgIHNldFByZXZpb3VzUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY29wZS5wYWdIaWRlTWluUmFuZ2UgPT09IHRydWUgfHwgc2NvcGUucGFnTWluUmFuZ2UgPCAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnBhZ01heFJhbmdlID0gc2NvcGUucGFnTWluUmFuZ2U7XG4gICAgICAgIHNjb3BlLnBhZ01pblJhbmdlID0gc2NvcGUucGFnTWF4UmFuZ2UgLSA1O1xuICAgICAgICBzZXRQYWdpbmF0aW9uUmFuZ2VzKCk7XG4gICAgICB9O1xuXG4gICAgICBzZXRSZW1haW5pbmdSYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNjb3BlLnBhZ0hpZGVNYXhSYW5nZSA9PT0gdHJ1ZSB8fCBcbiAgICAgICAgICAgIHNjb3BlLnBhZ01heFJhbmdlID4gc2NvcGUucGFnaW5hdGlvbi5wYWdlcykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IHNjb3BlLnBhZ01heFJhbmdlO1xuICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IHNjb3BlLnBhZ01pblJhbmdlICsgNTtcbiAgICAgICAgaWYgKHNjb3BlLnBhZ01heFJhbmdlID49IHNjb3BlLnBhZ2luYXRpb24ucGFnZXMpIHtcbiAgICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IHNjb3BlLnBhZ2luYXRpb24ucGFnZXMgKyAxO1xuICAgICAgICAgIHNjb3BlLnBhZ01pblJhbmdlID0gc2NvcGUucGFnTWF4UmFuZ2UgLSA1ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IHNjb3BlLnBhZ01heFJhbmdlIC0gNTtcbiAgICAgICAgc2V0UGFnaW5hdGlvblJhbmdlcygpO1xuICAgICAgfTtcblxuICAgICAgc2V0UGFnaW5hdGlvblJhbmdlcyA9ICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjb3BlLmxpc3RJdGVtc1BlclBhZ2VTaG93ID0gW107XG4gICAgICAgIHNjb3BlLnBhZ01pblJhbmdlID0gc2NvcGUucGFnTWluUmFuZ2UgPiAwID8gc2NvcGUucGFnTWluUmFuZ2UgOiAxO1xuICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IHNjb3BlLnBhZ01pblJhbmdlICsgNTtcbiAgICAgICAgaWYgKHNjb3BlLnBhZ01heFJhbmdlID4gc2NvcGUucGFnaW5hdGlvbi5wYWdlcykge1xuICAgICAgICAgIHNjb3BlLnBhZ01heFJhbmdlID0gc2NvcGUucGFnaW5hdGlvbi5wYWdlcyArIDE7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucGFnSGlkZU1pblJhbmdlID0gc2NvcGUucGFnTWluUmFuZ2UgPD0gMTtcbiAgICAgICAgc2NvcGUucGFnSGlkZU1heFJhbmdlID0gc2NvcGUucGFnTWF4UmFuZ2UgPiBzY29wZS5wYWdpbmF0aW9uLnBhZ2VzO1xuICAgICAgICBzY29wZS5jbGFzc1BhZ2VNaW5SYW5nZSA9IHNjb3BlLnBhZ0hpZGVNaW5SYW5nZSA/ICdkaXNhYmxlZCcgOiAnJztcbiAgICAgICAgc2NvcGUuY2xhc3NQYWdlTWF4UmFuZ2UgPSBzY29wZS5wYWdIaWRlTWF4UmFuZ2UgPyAnZGlzYWJsZWQnIDogJyc7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHNjb3BlLmxpc3RJdGVtc1BlclBhZ2UubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChzY29wZS5wYWdpbmF0aW9uLnNpemUgPiBzY29wZS5saXN0SXRlbXNQZXJQYWdlW2ldKSB7XG4gICAgICAgICAgICBzY29wZS5saXN0SXRlbXNQZXJQYWdlU2hvdyA9IHNjb3BlLmxpc3RJdGVtc1BlclBhZ2Uuc2xpY2UoMCwgKGkgKyAyKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucmFuZ2VQYWdlID0gJGZpbHRlcigncmFuZ2UnKShbXSwgc2NvcGUucGFnTWluUmFuZ2UsIHNjb3BlLnBhZ01heFJhbmdlKTtcblxuICAgICAgICBpZiAoIXRhc3R5VGFibGUuc3RhcnQpIHtcbiAgICAgICAgICAvLyBQYWdpbmF0aW9uIGl0J3MgY2FsbGVkXG4gICAgICAgICAgdGFzdHlUYWJsZS5pbml0VGFibGUoJ3BhZ2luYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2NvcGUuY2xhc3NQYWdpbmF0aW9uQ291bnQgPSBmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgICAgaWYgKGNvdW50ID09IHNjb3BlLnBhZ2luYXRpb24uY291bnQpIHtcbiAgICAgICAgICByZXR1cm4gJ2FjdGl2ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuY2xhc3NOdW1QYWdlID0gZnVuY3Rpb24gKG51bVBhZ2UpIHtcbiAgICAgICAgaWYgKG51bVBhZ2UgPT0gc2NvcGUucGFnaW5hdGlvbi5wYWdlKSB7XG4gICAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIHNjb3BlLnBhZ2UgPSB7XG4gICAgICAgICdnZXQnOiBnZXRQYWdlLFxuICAgICAgICAnc2V0Q291bnQnOiBzZXRDb3VudCxcbiAgICAgICAgJ3ByZXZpb3VzJzogc2V0UHJldmlvdXNSYW5nZSxcbiAgICAgICAgJ3JlbWFpbmluZyc6IHNldFJlbWFpbmluZ1JhbmdlXG4gICAgICB9O1xuXG4gICAgICB0YXN0eVRhYmxlLiRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdwYWdpbmF0aW9uJywgZnVuY3Rpb24gd2F0Y2hQYWdpbmF0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpe1xuICAgICAgICBpZiAobmV3VmFsdWUgICYmICgobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB8fCAhdGFzdHlUYWJsZS5zdGFydCkpIHtcbiAgICAgICAgICBzY29wZS5wYWdpbmF0aW9uID0gbmV3VmFsdWU7XG4gICAgICAgICAgc2V0UGFnaW5hdGlvblJhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbml0IFBhZ2luYXRpb25cbiAgICAgIHNjb3BlLnBhZ2Uuc2V0Q291bnQoc2NvcGUuaXRlbXNQZXJQYWdlKTtcbiAgICB9XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2MgZmlsdGVyXG4gKiBAbmFtZSBuZ1Rhc3R5LmZpbHRlci5maWx0ZXJDYW1lbGl6ZVxuICogQGZ1bmN0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5maWx0ZXIuY2FtZWxpemUnLCBbXSlcbi5maWx0ZXIoJ2NhbWVsaXplJywgZnVuY3Rpb24oKSB7XG4gIHZhciBDQU1FTElaRV9SRUdFWCA9IC8oPzpefFstXyBdKShcXHcpL2c7XG4gIFxuICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCBmaXJzdCkge1xuICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycsXG4gICAgICAgIGZpcnN0TGV0dGVyID0gdHlwZW9mIGZpcnN0ID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogISFmaXJzdDtcbiAgICBcbiAgICBpZih0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnIHx8IFxuICAgICAgIGlucHV0ID09PSBudWxsIHx8IFxuICAgICAgICghaXNTdHJpbmcgJiYgaXNOYU4oaW5wdXQpKSApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZighaXNTdHJpbmcpe1xuICAgICAgcmV0dXJuICcnICsgaW5wdXQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBpbnB1dC50cmltKCkgLy8gcmVtb3ZlIHRyYWlsaW5nIHNwYWNlc1xuICAgICAgLnJlcGxhY2UoLyArKD89ICkvZywnJykgLy8gcmVtb3ZlIG11bHRpcGxlIFdTXG4gICAgICAucmVwbGFjZShDQU1FTElaRV9SRUdFWCwgZnVuY3Rpb24gKF8sIGNoYXJhY3RlciwgcG9zKSB7IC8vIGFjdHVhbCBjb252ZXJzaW9uXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgJiYgKGZpcnN0TGV0dGVyIHx8IHBvcyA+IDApKSB7XG4gICAgICAgICAgcmV0dXJuIGNoYXJhY3Rlci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIGZpbHRlclxuICogQG5hbWUgbmdUYXN0eS5maWx0ZXIuY2xlYW5GaWVsZE5hbWVcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ2FsbGluZyBjbGVhbkZpZWxkTmFtZSB3aWxsIHJlcGxhY2UgYWxsIFxuICogZW1wdHkgc3BhY2Ugd2l0aCB3aXRoIC1cbiAqXG4gKiBAZXhhbXBsZVxuICBuZy1iaW5kPVwia2V5IHwgY2xlYW5GaWVsZE5hbWVcIlxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuZmlsdGVyLmNsZWFuRmllbGROYW1lJywgW10pXG4uZmlsdGVyKCdjbGVhbkZpZWxkTmFtZScsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1teYS16QS1aMC05LV8tXSsvZywgJy0nKTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIG5nVGFzdHkuZmlsdGVyLmZpbHRlckludFxuICogQGZ1bmN0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5maWx0ZXIuZmlsdGVySW50JywgW10pXG4uZmlsdGVyKCdmaWx0ZXJJbnQnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmKC9eKFxcLXxcXCspPyhbMC05XSt8SW5maW5pdHkpJC8udGVzdChpbnB1dCkpIHtcbiAgICAgIHJldHVybiBOdW1iZXIoaW5wdXQpO1xuICAgIH1cbiAgICByZXR1cm4gTmFOO1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIGZpbHRlclxuICogQG5hbWUgbmdUYXN0eS5maWx0ZXIucmFuZ2VcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlIGEgbGlzdCBjb250YWluaW5nIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb25zLiBUaGUgYXJndW1lbnRzIG11c3QgXG4gKiBiZSBwbGFpbiBpbnRlZ2Vycy4gSWYgdGhlIHN0ZXAgYXJndW1lbnQgaXMgb21pdHRlZCwgaXQgZGVmYXVsdHMgdG8gMS4gXG4gKiBJZiB0aGUgc3RhcnQgYXJndW1lbnQgaXMgb21pdHRlZCwgaXQgZGVmYXVsdHMgdG8gMC5cbiAqXG4gKiBAZXhhbXBsZVxuICBuZy1yZXBlYXQ9XCJuIGluIFtdIHwgcmFuZ2U6MTozMFwiXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LmZpbHRlci5yYW5nZScsIFsnbmdUYXN0eS5maWx0ZXIuZmlsdGVySW50J10pXG4uZmlsdGVyKCdyYW5nZScsIGZ1bmN0aW9uKCRmaWx0ZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIHN0YXJ0ID0gJGZpbHRlcignZmlsdGVySW50Jykoc3RhcnQpO1xuICAgIHN0b3AgPSAkZmlsdGVyKCdmaWx0ZXJJbnQnKShzdG9wKTtcbiAgICBzdGVwID0gJGZpbHRlcignZmlsdGVySW50Jykoc3RlcCk7XG4gICAgaWYgKGlzTmFOKHN0YXJ0KSkge1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBpZiAoaXNOYU4oc3RvcCkpIHtcbiAgICAgIHN0b3AgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKGlzTmFOKHN0ZXApKSB7XG4gICAgICBzdGVwID0gMTtcbiAgICB9XG4gICAgaWYgKChzdGVwID4gMCAmJiBzdGFydCA+PSBzdG9wKSB8fCAoc3RlcCA8IDAgJiYgc3RhcnQgPD0gc3RvcCkpe1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IHN0ZXAgPiAwID8gaSA8IHN0b3AgOiBpID4gc3RvcDsgaSArPSBzdGVwKXtcbiAgICAgIGlucHV0LnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBpbnB1dDtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBhdXRob3IgaHR0cHM6Ly9naXRodWIuY29tL2JvZ2Rhbi1hbGV4YW5kcmVzY3UvIC0gQGJhbHhcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIG5nVGFzdHkuZmlsdGVyLnNsdWdpZnlcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVHJhbnNmb3JtIHRleHQgaW50byBhbiBhc2NpaSBzbHVnIGJ5IHJlcGxhY2luZyB3aGl0ZXNwYWNlcywgYWNjZW50dWF0ZWQsIFxuICogYW5kIHNwZWNpYWwgY2hhcmFjdGVycyB3aXRoIHRoZSBjb3Jlc3BvbmRpbmcgbGF0aW4gY2hhcmFjdGVyIG9yIGNvbXBsZXRlbHkgXG4gKiByZW1vdmluZyB0aGVtIHdoZW4gbm8gbGF0aW4gZXF1aXZhbGVudCBpcyBmb3VuZC4gVGhpcyBjYW4gYmUgdXNlZCBzYWZlbHkgdG8gXG4gKiBnZW5lcmF0ZSB2YWxpZCBVUkxzLlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5maWx0ZXIuc2x1Z2lmeScsIFtdKVxuLmZpbHRlcignc2x1Z2lmeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgbWFrZVN0cmluZyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuICcnICsgb2JqZWN0O1xuICB9O1xuXG4gIHZhciBmcm9tICA9ICfEhcOgw6HDpMOiw6PDpcOmxIPEh8SNxInEmcOow6nDq8OqxJ3EpcOsw63Dr8OuxLXFgsS+xYTFiMOyw7PDtsWRw7TDtcOww7jFm8iZxaHFncWlyJvFrcO5w7rDvMWxw7vDscO/w73Dp8W8xbrFvicsXG4gICAgICB0byAgICA9ICdhYWFhYWFhYWFjY2NlZWVlZWdoaWlpaWpsbG5ub29vb29vb29zc3NzdHR1dXV1dXVueXljenp6JyxcbiAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnWycgKyBmcm9tICsgJ10nLCAnZycpO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgc3RyID0gbWFrZVN0cmluZyhzdHIpXG4gICAgLnRvU3RyaW5nKCkgLy8gbWFrZSBzdXJlIGlzIGEgc3RyaW5nXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZShyZWdleCwgZnVuY3Rpb24gKGMpe1xuICAgICAgdmFyIGluZGV4ID0gZnJvbS5pbmRleE9mKGMpO1xuICAgICAgcmV0dXJuIHRvLmNoYXJBdChpbmRleCkgfHwgJy0nO1xuICAgIH0pIC8vIG5vcm1hbGl6ZSBzb21lIGZvcmVpZ24gY2hhcmFjdGVyc1xuICAgIC5yZXBsYWNlKC9bXlxcd1xcLVxcc10rL2csICcnKSAvLyByZW1vdmUgdW53YW50ZWQgY2hhcmFjdGVyc1xuICAgIC50cmltKCkgLy90cmltIHNwYWNlc1xuICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgLy8gcmVwbGFjZSBhbnkgc3BhY2Ugd2l0aCBhIGRhc2hcbiAgICAucmVwbGFjZSgvXFwtXFwtKy9nLCAnLScpOyAvLyByZW1vdmUgZHVwbGljYXRlIGRhc2hlc1xuICAgIHJldHVybiBzdHI7XG4gIH07XG59KTtcbiAgXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSBuZ1Rhc3R5LnNlcnZpY2UuYmluZFRvXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBTZXQgdXAgJHdhdGNoZXMgZm9yIGlzb2xhdGUgc2NvcGUgYW5kIGNvbnRyb2xsZXIgYmluZGluZ3MuIFRoaXMgcHJvY2Vzc1xuICogb25seSBvY2N1cnMgZm9yIGlzb2xhdGUgc2NvcGVzIGFuZCBuZXcgc2NvcGVzIHdpdGggY29udHJvbGxlckFzLlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5zZXJ2aWNlLmJpbmRUbycsIFtdKVxuLmZhY3RvcnkoJ2JpbmRUbycsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlTmFtZSwgc2NvcGUsIGF0dHJzLCBuZXdTY29wZU5hbWUpIHtcbiAgICB2YXIgbGFzdFZhbHVlLCBwYXJlbnRHZXQsIGNvbXBhcmUsIHBhcmVudFNldCwgXG4gICAgcGFyZW50VmFsdWVXYXRjaCwgaXNvbGF0ZVNjb3BlTmFtZTtcbiAgICBpZiAoIWF0dHJzW3Njb3BlTmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50R2V0ID0gJHBhcnNlKGF0dHJzW3Njb3BlTmFtZV0pO1xuICAgIGlmIChwYXJlbnRHZXQubGl0ZXJhbCkge1xuICAgICAgY29tcGFyZSA9IGFuZ3VsYXIuZXF1YWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wYXJlID0gZnVuY3Rpb24oYSxiKSB7IHJldHVybiBhID09PSBiIHx8IChhICE9PSBhICYmIGIgIT09IGIpOyB9O1xuICAgIH1cbiAgICBpZiAobmV3U2NvcGVOYW1lKSB7XG4gICAgICBpc29sYXRlU2NvcGVOYW1lID0gbmV3U2NvcGVOYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc29sYXRlU2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICAgIH1cbiAgICBwYXJlbnRTZXQgPSBwYXJlbnRHZXQuYXNzaWduIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmVzZXQgdGhlIGNoYW5nZSwgb3Igd2Ugd2lsbCB0aHJvdyB0aGlzIGV4Y2VwdGlvbiBvbiBldmVyeSAkZGlnZXN0XG4gICAgICBsYXN0VmFsdWUgPSBzY29wZVtzY29wZU5hbWVdID0gcGFyZW50R2V0KHNjb3BlTmFtZSk7XG4gICAgICB0aHJvdyAnRXhwcmVzc2lvbiAnICsgYXR0cnNbYXR0ck5hbWVdICsgJyBpcyBub24tYXNzaWduYWJsZSEnO1xuICAgIH07XG4gICAgbGFzdFZhbHVlID0gc2NvcGVbaXNvbGF0ZVNjb3BlTmFtZV0gPSBwYXJlbnRHZXQoc2NvcGUuJHBhcmVudCk7XG4gICAgcGFyZW50VmFsdWVXYXRjaCA9IGZ1bmN0aW9uIHBhcmVudFZhbHVlV2F0Y2gocGFyZW50VmFsdWUpIHtcbiAgICAgIGlmICghY29tcGFyZShwYXJlbnRWYWx1ZSwgc2NvcGVbaXNvbGF0ZVNjb3BlTmFtZV0pKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvdXQgb2Ygc3luYyBhbmQgbmVlZCB0byBjb3B5XG4gICAgICAgIGlmICghY29tcGFyZShwYXJlbnRWYWx1ZSwgbGFzdFZhbHVlKSkge1xuICAgICAgICAgIC8vIHBhcmVudCBjaGFuZ2VkIGFuZCBpdCBoYXMgcHJlY2VkZW5jZVxuICAgICAgICAgIHNjb3BlW2lzb2xhdGVTY29wZU5hbWVdID0gcGFyZW50VmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHBhcmVudCBjYW4gYmUgYXNzaWduZWQgdGhlbiBkbyBzb1xuICAgICAgICAgIHBhcmVudFNldChzY29wZS4kcGFyZW50LCBwYXJlbnRWYWx1ZSA9IHNjb3BlW2lzb2xhdGVTY29wZU5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGxhc3RWYWx1ZSA9IHBhcmVudFZhbHVlO1xuICAgIH07XG4gICAgcGFyZW50VmFsdWVXYXRjaC4kc3RhdGVmdWwgPSB0cnVlO1xuICAgIHNjb3BlLiRwYXJlbnQuJHdhdGNoKCRwYXJzZShhdHRyc1tzY29wZU5hbWVdLCBwYXJlbnRWYWx1ZVdhdGNoKSwgbnVsbCwgcGFyZW50R2V0LmxpdGVyYWwpO1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIG5nVGFzdHkuc2VydmljZS5kZWJvdW5jZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5zZXJ2aWNlLmRlYm91bmNlJywgW10pXG4uZmFjdG9yeSgnZGVib3VuY2UnLCBmdW5jdGlvbiAoJHRpbWVvdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgYXJncywgY29udGV4dCwgZGVib3VuY2VUaW1lb3V0LCB0aW1lb3V0O1xuICAgIGRlYm91bmNlVGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlICgpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9ICR0aW1lb3V0KGRlYm91bmNlVGltZW91dCwgd2FpdCk7XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgbmdUYXN0eS5zZXJ2aWNlLmpvaW5PYmplY3RzXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LnNlcnZpY2Uuam9pbk9iamVjdHMnLCBbJ25nVGFzdHkuc2VydmljZS5zZXRQcm9wZXJ0eSddKVxuLmZhY3RvcnkoJ2pvaW5PYmplY3RzJywgZnVuY3Rpb24oc2V0UHJvcGVydHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iak9uZSwgb2JqVHdvLCBsaXN0S2V5Tm90Sm9pbikge1xuICAgIGxpc3RLZXlOb3RKb2luID0gbGlzdEtleU5vdEpvaW4gfHwgW107XG4gICAgZm9yICh2YXIgYXR0cm5hbWUgaW4gb2JqVHdvKSB7XG4gICAgICBpZiAobGlzdEtleU5vdEpvaW4uaW5kZXhPZihhdHRybmFtZSkgPCAwKSB7XG4gICAgICAgIHNldFByb3BlcnR5KG9iak9uZSwgb2JqVHdvLCBhdHRybmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmpPbmU7XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgbmdUYXN0eS5zZXJ2aWNlLnNldFByb3BlcnR5XG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LnNlcnZpY2Uuc2V0UHJvcGVydHknLCBbXSlcbi5mYWN0b3J5KCdzZXRQcm9wZXJ0eScsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqT25lLCBvYmpUd28sIGF0dHJuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBvYmpUd29bYXR0cm5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBcbiAgICAgICAgb2JqVHdvW2F0dHJuYW1lXSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob2JqVHdvW2F0dHJuYW1lXSkpIHtcbiAgICAgICAgaWYgKG9ialR3b1thdHRybmFtZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgb2JqT25lW2F0dHJuYW1lXSA9IG9ialR3b1thdHRybmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iak9uZVthdHRybmFtZV0gPSBvYmpUd29bYXR0cm5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqT25lO1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIG5nVGFzdHkuc2VydmljZS50YXN0eVV0aWxcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuc2VydmljZS50YXN0eVV0aWwnLCBbXG4gICduZ1Rhc3R5LnNlcnZpY2UuYmluZFRvJyxcbiAgJ25nVGFzdHkuc2VydmljZS5kZWJvdW5jZScsXG4gICduZ1Rhc3R5LnNlcnZpY2Uuc2V0UHJvcGVydHknLFxuICAnbmdUYXN0eS5zZXJ2aWNlLmpvaW5PYmplY3RzJyxcbiAgJ25nVGFzdHkuc2VydmljZS50aHJvdHRsZScsXG4gICduZ1Rhc3R5LnNlcnZpY2Uud2ViU29ja2V0J1xuXSlcbi5mYWN0b3J5KCd0YXN0eVV0aWwnLCBmdW5jdGlvbihkZWJvdW5jZSwgc2V0UHJvcGVydHksIGpvaW5PYmplY3RzLCBcbiAgYmluZFRvLCB3ZWJTb2NrZXQsIHRocm90dGxlKSB7XG4gIHJldHVybiB7XG4gICAgJ2JpbmRUbyc6IGJpbmRUbyxcbiAgICAnZGVib3VuY2UnOiBkZWJvdW5jZSxcbiAgICAnc2V0UHJvcGVydHknOiBzZXRQcm9wZXJ0eSxcbiAgICAnam9pbk9iamVjdHMnOiBqb2luT2JqZWN0cyxcbiAgICAndGhyb3R0bGUnOiB0aHJvdHRsZSxcbiAgICAnd2ViU29ja2V0Jzogd2ViU29ja2V0XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgbmdUYXN0eS5zZXJ2aWNlLnRocm90dGxlXG4gKiBAZGVzY3JpcHRpb25cbiAqICMgdGhyb3R0bGVcbiAqIEZhY3RvcnkgaW4gbmdUYXN0eS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuc2VydmljZS50aHJvdHRsZScsIFtdKVxuLmZhY3RvcnkoJ3Rocm90dGxlJywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XG4gICAgdGhyZXNoaG9sZCA9IHRocmVzaGhvbGQgfHwgMjUwO1xuICAgIHZhciBsYXN0LCBwcm9taXNlO1xuICAgIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZSAoKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcbiAgICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgICAkdGltZW91dC5jYW5jZWwocHJvbWlzZSk7XG4gICAgICAgIHByb21pc2UgPSAkdGltZW91dChmdW5jdGlvbiB0aHJvdHRsZVRpbWVvdXQgKCkge1xuICAgICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHRocmVzaGhvbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSBuZ1Rhc3R5LnNlcnZpY2Uud2ViU29ja2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqICMgd2ViU29ja2V0XG4gKiBGYWN0b3J5IGluIG5nVGFzdHkuXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LnNlcnZpY2Uud2ViU29ja2V0JywgW10pXG4uZmFjdG9yeSgnd2ViU29ja2V0JywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbih1cmwpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU3RyaW5nWzFdIHJlcHJlc2VudGluZyBhIGJpbmFyeSBibG9iWzJdIGZ1bmN0aW9uIFxuICAgICAqIGNvbnRhaW5pbmcgdGhlIFdlYlNvY2tldCBGYWN0b3J5IEFQSS5cbiAgICAgKlxuICAgICAqIFsxXTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC5jcmVhdGVPYmplY3RVUkxcbiAgICAgKiBbMl06IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9CbG9iXG4gICAgICogXG4gICAgICogQHJldHVybiB7c3RyaW5nfSAgIFN0cmluZyBjb250YWluaW5nIHRoZSBlbmNvZGVkIHNjcmlwdFxuICAgICAqL1xuICAgIHZhciBibG9iVVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbJygnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBXU1dvcmtlciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF93cztcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGl6ZSBhIG5ldyBXZWJTb2NrZXQgdXNpbmdcbiAgICAgICAgICogdGhlIHByb3ZpZGVkIFVSTCBwYXJhbWV0ZXJzLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtICB7c3RyaW5nfSB1cmwgVGhlIFdlYlNvY2tldCBVUkxcbiAgICAgICAgICovXG4gICAgICAgIHZhciBpbml0aWFsaXplID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgX3dzID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0ZW5zIGZvciBhbnkgbWVzc2FnZSBjb21pbmcgZnJvbSB0aGUgV2ViU29ja2V0XG4gICAgICAgICAqIGFuZCBzZW5kIGl0cyBjb250ZW50IHRvIHRoZSBtYWluIEpTIHRocmVhZCB1c2luZyBwb3N0TWVzc2FnZVsxXS5cbiAgICAgICAgICpcbiAgICAgICAgICogWzFdOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV29ya2VyLnBvc3RNZXNzYWdlXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3dzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbmRzIGRhdGEgdG8gdGhlIFdlYlNvY2tldC5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSAge3N0cmluZ30gZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHNlbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgX3dzLnNlbmQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxuICAgICAgICAgIG9uOiBvbixcbiAgICAgICAgICBzZW5kOiBzZW5kXG4gICAgICAgIH07XG5cbiAgICAgIH0pKCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogTGlzdGVucyBmb3IgaW5jb21pbmcgbWVzc2FnZXMgZnJvbSB0aGUgbWFpblxuICAgICAgICogSmF2YVNjcmlwdCBUaHJlYWQuXG4gICAgICAgKlxuICAgICAgICogVGhlIGNvbW1hbmRzIGFsbG93ZWQgYXJlOlxuICAgICAgICpcbiAgICAgICAqIHdzX25ldyAgfj4gQ2FsbHMgaW5pdGlhbGl6ZSBvbiB0aGUgV2ViIFNvY2tldCBXb3JrZXJcbiAgICAgICAqIHdzX29uICAgfj4gUmVnaXN0ZXIgdGhlIHN1cHBsaWVkIGNhbGxiYWNrXG4gICAgICAgKiB3c19zZW5kIH4+IFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgdW5kZXJseWluZyBXZWJTb2NrZXRcbiAgICAgICAqICAgICAgICAgICAgZW5jb2RpbmcgaXQgYXMgYSBzdHJpbmcgKEpTT04uc3RyaW5naWZ5KVxuICAgICAgICogICAgICAgICAgICBcbiAgICAgICAqL1xuICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzd2l0Y2ggKGUuZGF0YS5jbWQpIHtcbiAgICAgICAgICBjYXNlICd3c19uZXcnOlxuICAgICAgICAgICAgV1NXb3JrZXIuaW5pdGlhbGl6ZShlLmRhdGEudXJsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dzX29uJzpcbiAgICAgICAgICAgIFdTV29ya2VyLm9uKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3c19zZW5kJzpcbiAgICAgICAgICAgIFdTV29ya2VyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZS5kYXRhLmRhdGEpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjb21tYW5kOiAnICsgZS5kYXRhLmNtZCk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LnRvU3RyaW5nKCksICcpKCknXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcgfSkpO1xuICAgIFxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IFdlYlNvY2tldCBXb3JrZXIsIHJldm9rZSB0aGUgVVJMIHNpbmNlXG4gICAgLy8gaXQncyBub3QgdXNlZnVsIGFueW1vcmUuXG4gICAgdmFyIF93b3JrZXIgPSBuZXcgV29ya2VyKGJsb2JVUkwpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XG5cbiAgICAvLyBUZWxsIHRoZSBXZWJTb2NrZXQgV29ya2VyIHRvIGluaXQgYSBuZXcgV2ViU29ja2V0XG4gICAgX3dvcmtlci5wb3N0TWVzc2FnZSh7IGNtZDogJ3dzX25ldycsIHVybDogdXJsIH0pO1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBhIHNwZWNpZmljIFdvcmtlciBldmVudCBsaXN0ZW5lci5cbiAgICAgICAqIFRoZXJlIGFyZSB0d28gZGlmZmVyZW50IGV2ZW50czpcbiAgICAgICAqXG4gICAgICAgKiAtICdhbGwnIH4+IHN1YnNjcmliZXMgdG8gYWxsIHdlYnNvY2tldCBtZXNzYWdlc1xuICAgICAgICogLSAndHlwZSd+PiBzdWJzY3JpYmVzIHRvIGFsbCB3ZWJzb2NrZXQgbWVzc2FnZXMgY29udGFpbmluZ1xuICAgICAgICogICAgICAgICAgICBhIGZpZWxkIG5hbWVkICd0eXBlJy5cbiAgICAgICAqXG4gICAgICAgKiBGb3IgZXhhbXBsZSwgV2ViU29ja2V0cyBTZXJ2ZXIgZXZlbnRzIGxpa2UgdGhpcyBvbmU6XG4gICAgICAgKlxuICAgICAgICoge1xuICAgICAgICogICAndHlwZSc6ICd0d2VldCcsXG4gICAgICAgKiAgICdkYXRhJzogLi4uXG4gICAgICAgKiB9XG4gICAgICAgKlxuICAgICAgICogY2FuIGJlIGhhbmRsZWQgaW4gdGhlIGZvbGxvd2luZyB3YXk6XG4gICAgICAgKlxuICAgICAgICogIHdzLm9uKCd0d2l0dGVyJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICogICAgICAuLi5cbiAgICAgICAqICB9KTtcbiAgICAgICAqICBcbiAgICAgICAqIEBwYXJhbSAge3N0cmluZ30gICBldmVudCBUaGUgZXZlbnQgbmFtZVxuICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNiICAgIENhbGxiYWNrIHdpdGggb3V0cHV0IGRhdGEgKGZpcnN0IHBhcmFtKVxuICAgICAgICovXG4gICAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGNiKSB7XG4gICAgICAgIF93b3JrZXIucG9zdE1lc3NhZ2UoeyBjbWQ6ICd3c19vbicgfSk7XG4gICAgICAgIF93b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZXZlbnQgPT09ICdhbGwnIHx8IGUuZGF0YS50eXBlID09PSBldmVudCkge1xuICAgICAgICAgICAgY2IoZS5kYXRhKTtcbiAgICAgICAgICB9IFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIFNlbmRzIGRhdGEgdG8gdGhlIFdlYlNvY2tldC5cbiAgICAgICAqIFxuICAgICAgICogQHBhcmFtICB7QW55fSBkYXRhXG4gICAgICAgKi9cbiAgICAgIHNlbmQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgX3dvcmtlci5wb3N0TWVzc2FnZSh7IGNtZDogJ3dzX3NlbmQnLCBkYXRhOiBkYXRhIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
