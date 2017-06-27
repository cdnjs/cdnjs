/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.6.1 - 2016-01-01
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
      buildClientResource, buildUrl, paramsInitialCycle, initNow, loadOnInit,
      filterChangedPage;
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
    throw new Error('Angular tastyTable directive: need the ' +
                    'bind-resource or bind-resource-callback attribute');
  }
  if (angular.isDefined($attrs.bindResource)) {
    if (!angular.isObject($scope.resource)) {
      throw new Error('Angular tastyTable directive: the bind-resource ('+
                      $attrs.bindResource + ') is not an object');
    } else if (!$scope.resource.header && !$scope.resource.rows) {
      throw new Error('Angular tastyTable directive: the bind-resource ('+
                      $attrs.bindResource + ') has the property header or rows undefined');
    }
  }
  if (angular.isDefined($attrs.bindResourceCallback)) {
    if (!angular.isFunction($scope.resourceCallback)) {
      throw new Error('Angular tastyTable directive: the bind-resource-callback ('+
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
      throw new Error('Angular tastyTable directive: the resource response '+
                      'is not an object');
    } else if (!resource.header && !resource.rows) {
      throw new Error('Angular tastyTable directive: the resource response object '+
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
        return $scope.header.sortBy.split('.')
        .reduce(function (previousValue, currentValue) {
          return previousValue[currentValue];
        }, item);
      }];
      if ($scope.header.columns[0].key !== $scope.header.sortBy) {
        listSortBy.push(function(item) {
          return $scope.header.columns[0].key.split('.')
          .reduce(function (previousValue, currentValue) {
            return previousValue[currentValue];
          }, item);
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
        if ($scope.params.page !== $scope.init.filterBase) {
          filterChangedPage = true;
        }
        $scope.params.page = $scope.init.filterBase;
      }
    }
    $scope.url = buildUrl($scope.params, $scope.filters);

    function updateServerSideResource () {
      $scope.logs.updateServerSideResourceRunning = true;
      var paramsObj = angular.copy($scope.params);
      paramsObj.filters = $scope.filters;
      $scope.resourceCallback($scope.url, paramsObj)
      .then(function (resource) {
        setDirectivesValues(resource);
        $scope.logs.updateServerSideResourceRunning = false;
      });
    }

    if ($scope.reload) {
      $scope.reload = updateServerSideResource;
    }
    if ((initNow || updateFrom === 'params') &&
        !$scope.logs.updateServerSideResourceRunning) {

      if ($scope.reload) {
        if (!filterChangedPage) {
          updateServerSideResource();
        }
      } else {
        updateServerSideResource();
        filterChangedPage = false;
      }
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

      function cleanSortBy (sortBy) {
        if (sortBy) {
          return $filter('cleanFieldName')(sortBy);
        }
        return undefined;
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
          // If sortable property is present in column object, then use it
          if (angular.isArray(scope.notSortBy)) {
            if (scope.notSortBy.length) {
              sortable = scope.notSortBy.indexOf(column.key) < 0;
            } else {
              sortable = false;
            }
          } else {
            if (angular.isDefined(column.sortable)) {
              sortable = column.sortable === true;
            }
          }
          if (column.key === scope.header.sortBy ||
              '-' + column.key === scope.header.sortBy) {
            active = true;
          }
          if (!angular.isDefined(column.key)) {
            throw new Error('Angular tastyTable directive: need a key value ' +
                            'each column table header');
          }
          sort = $filter('cleanFieldName')(column.key);
          if (cleanSortBy(scope.header.sortBy) === '-' + sort) {
            if (tastyTable.config.bootstrapIcon) {
              isSorted = '';
              isSortedCaret = 'caret';
            } else {
              isSorted = scope.iconDown;
            }
          } else if (cleanSortBy(scope.header.sortBy) === sort) {
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
        if (cleanSortBy(scope.header.sortBy) === columnName) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nLXRhc3R5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0E7Q0FDQTs7Q0FFQTtDQUNBO0NBQ0E7QUFDQTtBQUNBO0NBUEE7Q0FDQTtDQUNBO0NBQ0E7RUFDQTtJQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7QUFDQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQUNBLGFBQUEsZUFBQSxHQUFBLDREQUFBO0VBQ0E7TUFDQTtNQUNBO01BQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO01BQ0E7SUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7SUFDQTtNQUNBO1FBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBO0lBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtJQUNBO0VBQ0E7SUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7SUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7R0FDQTtHQUNBO0dBQ0E7RUFDQTtJQUNBO29CQUNBO0VBQ0E7RUFDQTtJQUNBO01BQ0E7c0JBQ0E7SUFDQTtNQUNBO3NCQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7TUFDQTtzQkFDQTtJQUNBO0lBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7SUFDQTtJQUNBO0VBQ0E7O0VBRUE7SUFDQTtJQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1VBQ0E7VUFDQTtZQUNBO1lBQ0E7Y0FDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTs7RUFFQTtJQUNBO01BQ0E7c0JBQ0E7SUFDQTtNQUNBO3NCQUNBO0lBQ0E7SUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7UUFDQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7TUFDQTtRQUNBO1VBQ0E7VUFDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO1VBQ0E7UUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtNQUNBO0lBQ0E7SUFDQTs7SUFFQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtRQUNBO01BQ0E7SUFDQTs7SUFFQTtNQUNBO0lBQ0E7SUFDQTtRQUNBOztNQUVBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtNQUNBO1FBQ0E7VUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtFQUNBO0lBQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7WUFDQTtVQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtJQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7QUFDQSxZQUFBLFVBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQSxhQUFBLGVBQUE7SUFDQTtNQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7VUFDQTtRQUNBO01BQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0VBQ0E7SUFDQTtJQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0EsWUFBQSxVQUFBLEdBQUEsK0VBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtZQUNBO1FBQ0E7UUFDQTtZQUNBO1lBQ0E7VUFDQTtRQUNBO1FBQ0E7VUFDQTtVQUNBO1lBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7WUFDQTtjQUNBO1lBQ0E7Y0FDQTtZQUNBO1VBQ0E7WUFDQTtjQUNBO1lBQ0E7VUFDQTtVQUNBO2NBQ0E7WUFDQTtVQUNBO1VBQ0E7WUFDQTs0QkFDQTtVQUNBO1VBQ0E7VUFDQTtZQUNBO2NBQ0E7Y0FDQTtZQUNBO2NBQ0E7WUFDQTtVQUNBO1lBQ0E7Y0FDQTtjQUNBO1lBQ0E7Y0FDQTtZQUNBO1VBQ0E7VUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7VUFDQTtRQUNBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtFQUNBO0lBQ0E7S0FDQTtJQUNBO0lBQ0E7RUFDQTtDQUNBO0NBQ0E7QUFDQSxZQUFBLGVBQUEsR0FBQSwrRUFBQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO1VBQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7TUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtVQUNBO1lBQ0E7VUFDQTtZQUNBO2NBQ0E7WUFDQTtjQUNBO1lBQ0E7VUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBOztNQUVBO01BQ0E7TUFDQTs7TUFFQTtNQUNBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBO01BQ0E7TUFDQTs7TUFFQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1VBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7WUFDQTtVQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtVQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtVQUNBO1lBQ0E7WUFDQTtVQUNBO1FBQ0E7UUFDQTs7UUFFQTtVQUNBO1VBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7VUFDQTtRQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO1VBQ0E7UUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtNQUNBOztNQUVBO1FBQ0E7VUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBO0lBQ0E7RUFDQTtBQUNBLENBQUEsQ0FBQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFNBQUEsUUFBQTtFQUNBOztFQUVBO0lBQ0E7UUFDQTs7SUFFQTtPQUNBO09BQ0E7TUFDQTtJQUNBOztJQUVBO01BQ0E7SUFDQTs7SUFFQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7RUFDQTtBQUNBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0VBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxTQUFBLGNBQUE7RUFDQTtJQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFNBQUEsU0FBQTtFQUNBO0lBQ0E7TUFDQTtJQUNBO0lBQ0E7RUFDQTtBQUNBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7RUFDQTtDQUNBO0FBQ0E7QUFDQSxTQUFBLEtBQUEsR0FBQSxZQUFBO0VBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxTQUFBLE9BQUE7O0VBRUE7SUFDQTtNQUNBO0lBQ0E7SUFDQTtFQUNBOztFQUVBO01BQ0E7TUFDQTs7RUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNBO0FBQ0E7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsVUFBQSxNQUFBLEdBQUEsV0FBQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtNQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7TUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO1FBQ0E7UUFDQTtVQUNBO1VBQ0E7UUFDQTtVQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDQTtBQUNBLENBQUEsQ0FBQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFVBQUEsUUFBQSxHQUFBLGFBQUE7RUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBLENBQUEsQ0FBQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFVBQUEsV0FBQSxHQUFBLGdCQUFBO0VBQ0E7SUFDQTtJQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0EsVUFBQSxXQUFBO0VBQ0E7SUFDQTtRQUNBO01BQ0E7UUFDQTtVQUNBO1FBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtJQUNBO0VBQ0E7QUFDQTs7QUFFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0FBQ0EsVUFBQSxTQUFBLEdBQUEsOEVBQUE7RUFDQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7QUFDQSxDQUFBLENBQUE7O0FBRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDQTtBQUNBLFVBQUEsUUFBQSxHQUFBLGFBQUE7RUFDQTtJQUNBO0lBQ0E7SUFDQTtNQUNBO01BQ0E7VUFDQTtNQUNBO1FBQ0E7UUFDQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBOztBQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0FBQ0E7QUFDQSxVQUFBLFNBQUE7RUFDQTtJQUNBO0tBQ0E7S0FDQTtLQUNBO0tBQ0E7S0FDQTtLQUNBO0tBQ0E7S0FDQTtJQUNBO01BQ0E7UUFDQTs7UUFFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7UUFDQTtVQUNBO1FBQ0E7O1FBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7UUFDQTtVQUNBO1lBQ0E7WUFDQTtVQUNBO1FBQ0E7O1FBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtRQUNBO1VBQ0E7UUFDQTs7UUFFQTtVQUNBO1VBQ0E7VUFDQTtRQUNBOztNQUVBOztNQUVBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtNQUNBO1FBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtZQUNBO1lBQ0E7VUFDQTtZQUNBO1VBQ0E7TUFDQTs7SUFFQTs7O0lBR0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTs7O0lBR0E7TUFDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtPQUNBO09BQ0E7TUFDQTtRQUNBO1FBQ0E7VUFDQTtZQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7T0FDQTtPQUNBO09BQ0E7T0FDQTtNQUNBO1FBQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQSIsImZpbGUiOiJuZy10YXN0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBuZy10YXN0eVxuICogaHR0cHM6Ly9naXRodWIuY29tL1ppenphbWlhL25nLXRhc3R5XG5cbiAqIFZlcnNpb246IDAuNi4xIC0gMjAxNi0wMS0wMVxuICogTGljZW5zZTogTUlUXG4gKi9cbmFuZ3VsYXIubW9kdWxlKFwibmdUYXN0eVwiLCBbXCJuZ1Rhc3R5LmNvbXBvbmVudC50YWJsZVwiLFwibmdUYXN0eS5maWx0ZXIuY2FtZWxpemVcIixcIm5nVGFzdHkuZmlsdGVyLmNsZWFuRmllbGROYW1lXCIsXCJuZ1Rhc3R5LmZpbHRlci5maWx0ZXJJbnRcIixcIm5nVGFzdHkuZmlsdGVyLnJhbmdlXCIsXCJuZ1Rhc3R5LmZpbHRlci5zbHVnaWZ5XCIsXCJuZ1Rhc3R5LnNlcnZpY2UuYmluZFRvXCIsXCJuZ1Rhc3R5LnNlcnZpY2UuZGVib3VuY2VcIixcIm5nVGFzdHkuc2VydmljZS5qb2luT2JqZWN0c1wiLFwibmdUYXN0eS5zZXJ2aWNlLnNldFByb3BlcnR5XCIsXCJuZ1Rhc3R5LnNlcnZpY2UudGFzdHlVdGlsXCIsXCJuZ1Rhc3R5LnNlcnZpY2UudGhyb3R0bGVcIixcIm5nVGFzdHkuc2VydmljZS53ZWJTb2NrZXRcIl0pO1xuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1Rhc3R5LmNvbXBvbmVudC50YXN0eVRhYmxlXG4gKlxuICogQGV4YW1wbGVcbiAgPHRhYmxlIHRhc3R5LXRhYmxlPlxuICAgIDx0Ym9keT48L3Rib2R5PlxuICA8L3RhYmxlPlxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuY29tcG9uZW50LnRhYmxlJywgW1xuICAnbmdUYXN0eS5maWx0ZXIuY2xlYW5GaWVsZE5hbWUnLFxuICAnbmdUYXN0eS5maWx0ZXIucmFuZ2UnLFxuICAnbmdUYXN0eS5zZXJ2aWNlLnRhc3R5VXRpbCcsXG4gICduZ1Rhc3R5LnRwbHMudGFibGUuaGVhZCcsXG4gICduZ1Rhc3R5LnRwbHMudGFibGUucGFnaW5hdGlvbidcbl0pXG4uY29uc3RhbnQoJ3RhYmxlQ29uZmlnJywge1xuICBpbml0OiB7XG4gICAgJ2NvdW50JzogNSxcbiAgICAncGFnZSc6IDEsXG4gICAgJ3NvcnRCeSc6IHVuZGVmaW5lZCxcbiAgICAnc29ydE9yZGVyJzogdW5kZWZpbmVkLFxuICAgICdmaWx0ZXJCYXNlJzogMVxuICB9LFxuICBxdWVyeToge1xuICAgICdwYWdlJzogJ3BhZ2UnLFxuICAgICdjb3VudCc6ICdjb3VudCcsXG4gICAgJ3NvcnRCeSc6ICdzb3J0LWJ5JyxcbiAgICAnc29ydE9yZGVyJzogJ3NvcnQtb3JkZXInXG4gIH0sXG4gIGJvb3RzdHJhcEljb246IGZhbHNlLFxuICBiaW5kT25jZTogdHJ1ZSxcbiAgbG9hZE9uSW5pdDogZmFsc2UsXG4gIGljb25VcDogJ2ZhIGZhLXNvcnQtdXAnLFxuICBpY29uRG93bjogJ2ZhIGZhLXNvcnQtZG93bicsXG4gIGxpc3RJdGVtc1BlclBhZ2U6IFs1LCAyNSwgNTAsIDEwMF0sXG4gIGl0ZW1zUGVyUGFnZTogNSxcbiAgdGVtcGxhdGVIZWFkVXJsOiAndGVtcGxhdGUvdGFibGUvaGVhZC5odG1sJyxcbiAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS90YWJsZS9wYWdpbmF0aW9uLmh0bWwnLFxuICB3YXRjaFJlc291cmNlOiAncmVmZXJlbmNlJ1xufSlcbi5jb250cm9sbGVyKCdUYWJsZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRhdHRycywgJGZpbHRlciwgdGFibGVDb25maWcsIHRhc3R5VXRpbCkge1xuICB2YXIgbGlzdFNjb3BlVG9XYXRjaCwgaW5pdFRhYmxlLCBuZXdTY29wZU5hbWUsIGluaXRTdGF0dXMsXG4gICAgICB1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UsIHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZSwgc2V0RGlyZWN0aXZlc1ZhbHVlcyxcbiAgICAgIGJ1aWxkQ2xpZW50UmVzb3VyY2UsIGJ1aWxkVXJsLCBwYXJhbXNJbml0aWFsQ3ljbGUsIGluaXROb3csIGxvYWRPbkluaXQsXG4gICAgICBmaWx0ZXJDaGFuZ2VkUGFnZTtcbiAgdmFyIHZtID0gdGhpcztcbiAgdm0uJHNjb3BlID0gJHNjb3BlO1xuICBpbml0U3RhdHVzID0ge307XG4gIGluaXROb3cgPSB0cnVlO1xuICBwYXJhbXNJbml0aWFsQ3ljbGUgPSB0cnVlO1xuICAkc2NvcGUuaW5pdCA9IHt9O1xuICAkc2NvcGUucXVlcnkgPSB7fTtcbiAgJHNjb3BlLmxvZ3MgPSB7XG4gICAgJ2J1aWxkQ2xpZW50UmVzb3VyY2VDb3VudCc6IDAsXG4gICAgJ3VwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZVJ1bm5pbmcnOiAwXG4gIH07XG4gICRzY29wZS50aGVtZSA9IHt9O1xuXG4gIC8vIEVhY2ggb25lIG9mIHRoZW0gaXMgYSBwb3NzaWJsZSBhdHRyaWJ1dGUgdG8gc3RhcnQgd2F0Y2hpbmdcbiAgbGlzdFNjb3BlVG9XYXRjaCA9IFtcbiAgICAnYmluZEZpbHRlcnMnLCBcbiAgICAnYmluZEZpbHRlcnNDb21wYXJhdG9yJyxcbiAgICAnYmluZEluaXQnLCBcbiAgICAnYmluZFF1ZXJ5JywgXG4gICAgJ2JpbmRSZXNvdXJjZScsIFxuICAgICdiaW5kUmVzb3VyY2VDYWxsYmFjaycsIFxuICAgICdiaW5kV2F0Y2hSZXNvdXJjZScsIFxuICAgICdiaW5kUmVsb2FkJyxcbiAgICAnYmluZFRoZW1lJ1xuICBdO1xuICBsaXN0U2NvcGVUb1dhdGNoLmZvckVhY2goZnVuY3Rpb24gKHNjb3BlTmFtZSkge1xuICAgIG5ld1Njb3BlTmFtZSA9IHNjb3BlTmFtZS5zdWJzdHJpbmcoNCk7XG4gICAgbmV3U2NvcGVOYW1lID0gbmV3U2NvcGVOYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgbmV3U2NvcGVOYW1lLnNsaWNlKDEpO1xuICAgIGlmICgkYXR0cnNbc2NvcGVOYW1lXSkge1xuICAgICAgdGFzdHlVdGlsLmJpbmRUbyhzY29wZU5hbWUsICRzY29wZSwgJGF0dHJzLCBuZXdTY29wZU5hbWUpO1xuICAgIH0gZWxzZSBpZiAoJGF0dHJzW25ld1Njb3BlTmFtZV0gJiYgbmV3U2NvcGVOYW1lID09PSAnd2F0Y2hSZXNvdXJjZScpIHtcbiAgICAgICRzY29wZVtuZXdTY29wZU5hbWVdID0gJGF0dHJzW25ld1Njb3BlTmFtZV07XG4gICAgfSBlbHNlIGlmICgkYXR0cnNbbmV3U2NvcGVOYW1lXSAmJiBuZXdTY29wZU5hbWUgPT09ICdmaWx0ZXJzQ29tcGFyYXRvcicpIHtcbiAgICAgICRzY29wZVtuZXdTY29wZU5hbWVdID0gSlNPTi5wYXJzZSgkYXR0cnNbbmV3U2NvcGVOYW1lXSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBEZWZhdWx0IHRoZW1lXG4gIHZtLmNvbmZpZyA9IHt9O1xuICBpZiAoYW5ndWxhci5pc09iamVjdCgkc2NvcGUudGhlbWUpKSB7XG4gICAgT2JqZWN0LmtleXModGFibGVDb25maWcpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnRoZW1lW2tleV0pKSB7XG4gICAgICAgIHZtLmNvbmZpZ1trZXldID0gJHNjb3BlLnRoZW1lW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2bS5jb25maWdba2V5XSA9IHRhYmxlQ29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfSwgdm0pO1xuICB9IGVsc2Uge1xuICAgIHZtLmNvbmZpZyA9IHRhYmxlQ29uZmlnO1xuICB9XG5cbiAgLy8gRGVmYXVsdCBjb25maWdzXG4gICRzY29wZS5xdWVyeS5wYWdlID0gJHNjb3BlLnF1ZXJ5LnBhZ2UgfHwgdm0uY29uZmlnLnF1ZXJ5LnBhZ2U7XG4gICRzY29wZS5xdWVyeS5jb3VudCA9ICRzY29wZS5xdWVyeS5jb3VudCB8fCB2bS5jb25maWcucXVlcnkuY291bnQ7XG4gICRzY29wZS5xdWVyeS5zb3J0QnkgPSAkc2NvcGUucXVlcnkuc29ydEJ5IHx8IHZtLmNvbmZpZy5xdWVyeS5zb3J0Qnk7XG4gICRzY29wZS5xdWVyeS5zb3J0T3JkZXIgPSAkc2NvcGUucXVlcnkuc29ydE9yZGVyIHx8IHZtLmNvbmZpZy5xdWVyeS5zb3J0T3JkZXI7XG5cbiAgLy8gU2V0IGluaXQgY29uZmlnc1xuICBpZiAoJHNjb3BlLnJlbG9hZCAmJiAhdm0uY29uZmlnLmxvYWRPbkluaXQpIHtcbiAgICBpbml0Tm93ID0gZmFsc2U7XG4gIH1cbiAgJHNjb3BlLmluaXQuY291bnQgPSAkc2NvcGUuaW5pdC5jb3VudCB8fCB2bS5jb25maWcuaW5pdC5jb3VudDtcbiAgJHNjb3BlLmluaXQucGFnZSA9ICRzY29wZS5pbml0LnBhZ2UgfHwgdm0uY29uZmlnLmluaXQucGFnZTtcbiAgJHNjb3BlLmluaXQuc29ydEJ5ID0gJHNjb3BlLmluaXQuc29ydEJ5IHx8IHZtLmNvbmZpZy5pbml0LnNvcnRCeTtcbiAgJHNjb3BlLmluaXQuc29ydE9yZGVyID0gJHNjb3BlLmluaXQuc29ydE9yZGVyIHx8IHZtLmNvbmZpZy5pbml0LnNvcnRPcmRlcjtcbiAgaWYgKCFhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5pbml0LmZpbHRlckJhc2UpKSB7XG4gICAgJHNjb3BlLmluaXQuZmlsdGVyQmFzZSA9ICRzY29wZS5pbml0LmZpbHRlckJhc2U7XG4gIH0gZWxzZSB7XG4gICAgJHNjb3BlLmluaXQuZmlsdGVyQmFzZSA9IHZtLmNvbmZpZy5pbml0LmZpbHRlckJhc2U7XG4gIH0gIFxuICAkc2NvcGUud2F0Y2hSZXNvdXJjZSA9ICRzY29wZS53YXRjaFJlc291cmNlIHx8IHZtLmNvbmZpZy53YXRjaFJlc291cmNlO1xuXG4gIC8vIERlZnVhbHQgdmFyaWFibGVzXG4gIHZhciBsaXN0SW1tdXRhYmxlS2V5ID1bXG4gICAgJ2ZpbHRlcnMnLFxuICAgICdpbml0JyxcbiAgICAncXVlcnknLFxuICAgICdyb3dzJyxcbiAgICAnaGVhZGVyJyxcbiAgICAncGFnaW5hdGlvbicsXG4gICAgJ3BhcmFtcycsXG4gICAgJ3NvcnRPcmRlcicsXG4gICAgJ3NvcnRCeScsXG4gICAgJ3VybCdcbiAgXTtcbiAgJHNjb3BlLmNsaWVudFNpZGUgPSB0cnVlO1xuICAkc2NvcGUudXJsID0gJyc7XG4gICRzY29wZS5oZWFkZXIgPSB7XG4gICAgJ2NvbHVtbnMnOiBbXVxuICB9O1xuICAkc2NvcGUucm93cyA9IFtdO1xuICAkc2NvcGUucGFyYW1zID0ge307XG4gICRzY29wZS5wYWdpbmF0aW9uID0ge1xuICAgICdjb3VudCc6ICRzY29wZS5pbml0LmNvdW50LFxuICAgICdwYWdlJzogJHNjb3BlLmluaXQucGFnZSxcbiAgICAncGFnZXMnOiAxLFxuICAgICdzaXplJzogMFxuICB9O1xuICAkc2NvcGUudGhlYWREaXJlY3RpdmUgPSBmYWxzZTtcbiAgJHNjb3BlLnBhZ2luYXRpb25EaXJlY3RpdmUgPSBmYWxzZTsgXG5cbiAgLyogU2V0IGN1c3RvbSBjb25maWdzXG4gICAqIEluIHRoZSBmdXR1cmUgeW91IHdpbGwgaGF2ZSBhIHdheSB0byBjaGFuZ2VcbiAgICogdGhlc2UgdmFsdWVzIGJ5IGFuIGlzb2xhdGUgb3B0aW9uYWwgc2NvcGUgdmFyaWFibGUsXG4gICAqIG1vcmUgaW5mbyBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIuanMvaXNzdWVzLzY0MDQgKi9cbiAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCgkYXR0cnMuYmluZFJlc291cmNlKSAmJiAhYW5ndWxhci5pc0RlZmluZWQoJGF0dHJzLmJpbmRSZXNvdXJjZUNhbGxiYWNrKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQW5ndWxhciB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogbmVlZCB0aGUgJyArXG4gICAgICAgICAgICAgICAgICAgICdiaW5kLXJlc291cmNlIG9yIGJpbmQtcmVzb3VyY2UtY2FsbGJhY2sgYXR0cmlidXRlJyk7XG4gIH1cbiAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5iaW5kUmVzb3VyY2UpKSB7XG4gICAgaWYgKCFhbmd1bGFyLmlzT2JqZWN0KCRzY29wZS5yZXNvdXJjZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQW5ndWxhciB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogdGhlIGJpbmQtcmVzb3VyY2UgKCcrXG4gICAgICAgICAgICAgICAgICAgICAgJGF0dHJzLmJpbmRSZXNvdXJjZSArICcpIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICB9IGVsc2UgaWYgKCEkc2NvcGUucmVzb3VyY2UuaGVhZGVyICYmICEkc2NvcGUucmVzb3VyY2Uucm93cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFyIHRhc3R5VGFibGUgZGlyZWN0aXZlOiB0aGUgYmluZC1yZXNvdXJjZSAoJytcbiAgICAgICAgICAgICAgICAgICAgICAkYXR0cnMuYmluZFJlc291cmNlICsgJykgaGFzIHRoZSBwcm9wZXJ0eSBoZWFkZXIgb3Igcm93cyB1bmRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRhdHRycy5iaW5kUmVzb3VyY2VDYWxsYmFjaykpIHtcbiAgICBpZiAoIWFuZ3VsYXIuaXNGdW5jdGlvbigkc2NvcGUucmVzb3VyY2VDYWxsYmFjaykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQW5ndWxhciB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogdGhlIGJpbmQtcmVzb3VyY2UtY2FsbGJhY2sgKCcrXG4gICAgICAgICAgICAgICAgICAgICAgJGF0dHJzLmJpbmRSZXNvdXJjZUNhbGxiYWNrICsgJykgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgJHNjb3BlLmNsaWVudFNpZGUgPSBmYWxzZTtcbiAgfSAgIFxuXG4gIC8vIEluIFRhYmxlQ29udHJvbGxlciwgYnkgdXNpbmcgYHZtYCB3ZSBidWlsZCBhbiBBUEkgXG4gIC8vIGZvciBvdGhlciBkaXJlY3RpdmVzIHRvIHRhbGsgdG8gdm0gb25lLlxuICB2bS5zdGFydCA9IGZhbHNlO1xuXG4gIHZtLmFjdGl2YXRlID0gZnVuY3Rpb24oZGlyZWN0aXZlTmFtZSkge1xuICAgICRzY29wZVtkaXJlY3RpdmVOYW1lICsgJ0RpcmVjdGl2ZSddID0gdHJ1ZTtcbiAgICAkc2NvcGUucGFyYW1zW2RpcmVjdGl2ZU5hbWVdID0gdHJ1ZTtcbiAgfTtcblxuICB2bS5zZXRQYXJhbXMgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgJHNjb3BlLnBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgaWYgKFsnc29ydEJ5JywgJ3NvcnRPcmRlciddLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAkc2NvcGUuaGVhZGVyW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgdm0uaW5pdFRhYmxlID0gZnVuY3Rpb24gKGtleURpcmVjdGl2ZSkge1xuICAgIGluaXRTdGF0dXNba2V5RGlyZWN0aXZlXSA9IHRydWU7XG4gICAgaWYgKCEkc2NvcGUudGhlYWREaXJlY3RpdmUgJiYgISRzY29wZS5wYWdpbmF0aW9uRGlyZWN0aXZlKSB7IC8vIE5vbmUgb2YgdGhlbVxuICAgICAgdm0uc3RhcnQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoJHNjb3BlLnRoZWFkRGlyZWN0aXZlICYmICRzY29wZS5wYWdpbmF0aW9uRGlyZWN0aXZlKSB7IC8vIEJvdGggZGlyZWN0aXZlc1xuICAgICAgaWYgKGluaXRTdGF0dXMudGhlYWQgJiYgaW5pdFN0YXR1cy5wYWdpbmF0aW9uKXtcbiAgICAgICAgdm0uc3RhcnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJHNjb3BlLnRoZWFkRGlyZWN0aXZlICYmICEkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkgeyAvLyBPbmx5IFRoZWFkIGRpcmVjdGl2ZVxuICAgICAgaWYgKGluaXRTdGF0dXMudGhlYWQpe1xuICAgICAgICB2bS5zdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghJHNjb3BlLnRoZWFkRGlyZWN0aXZlICYmICRzY29wZS5wYWdpbmF0aW9uRGlyZWN0aXZlKSB7IC8vIE9ubHkgUGFnaW5hdGlvbiBkaXJlY3RpdmVcbiAgICAgIGlmIChpbml0U3RhdHVzLnBhZ2luYXRpb24pe1xuICAgICAgICB2bS5zdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZtLnN0YXJ0KSB7XG4gICAgICBpZiAoJHNjb3BlLmNsaWVudFNpZGUpIHtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5zb3J0QnkgPSAkc2NvcGUucmVzb3VyY2Uuc29ydEJ5IHx8ICRzY29wZS5pbml0LnNvcnRCeTtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5zb3J0T3JkZXIgPSAkc2NvcGUucmVzb3VyY2Uuc29ydE9yZGVyIHx8ICRzY29wZS5pbml0LnNvcnRPcmRlcjtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gJHNjb3BlLmluaXQucGFnZTtcbiAgICAgICAgaWYgKCRzY29wZS5yZXNvdXJjZS5wYWdpbmF0aW9uKSB7XG4gICAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gJHNjb3BlLnJlc291cmNlLnBhZ2luYXRpb24ucGFnZSB8fCAkc2NvcGUuaW5pdC5wYWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbml0Tm93KSB7XG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmModXBkYXRlQ2xpZW50U2lkZVJlc291cmNlKTtcbiAgICAgICAgfSBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5wYXJhbXMuc29ydEJ5ID0gJHNjb3BlLmluaXQuc29ydEJ5O1xuICAgICAgICAkc2NvcGUucGFyYW1zLnNvcnRPcmRlciA9ICRzY29wZS5pbml0LnNvcnRPcmRlcjtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gJHNjb3BlLmluaXQucGFnZTtcbiAgICAgICAgaWYgKGluaXROb3cpIHtcbiAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyh1cGRhdGVTZXJ2ZXJTaWRlUmVzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5yZWxvYWQpIHtcbiAgICAgICAgICAkc2NvcGUudXJsID0gYnVpbGRVcmwoJHNjb3BlLnBhcmFtcywgJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICRzY29wZS5yZWxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VDYWxsYmFjaygkc2NvcGUudXJsLCBhbmd1bGFyLmNvcHkoJHNjb3BlLnBhcmFtcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgc2V0RGlyZWN0aXZlc1ZhbHVlcyhyZXNvdXJjZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZtLmJpbmRPbmNlID0gdm0uY29uZmlnLmJpbmRPbmNlO1xuXG4gIHNldERpcmVjdGl2ZXNWYWx1ZXMgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICBpZiAoIWFuZ3VsYXIuaXNPYmplY3QocmVzb3VyY2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IHRoZSByZXNvdXJjZSByZXNwb25zZSAnK1xuICAgICAgICAgICAgICAgICAgICAgICdpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgfSBlbHNlIGlmICghcmVzb3VyY2UuaGVhZGVyICYmICFyZXNvdXJjZS5yb3dzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIgdGFzdHlUYWJsZSBkaXJlY3RpdmU6IHRoZSByZXNvdXJjZSByZXNwb25zZSBvYmplY3QgJytcbiAgICAgICAgICAgICAgICAgICAgICAnaGFzIHRoZSBwcm9wZXJ0eSBoZWFkZXIgb3Igcm93cyB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMocmVzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAobGlzdEltbXV0YWJsZUtleS5pbmRleE9mKGtleSkgPCAwKSB7XG4gICAgICAgICRzY29wZVtrZXldID0gcmVzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBc3N1bWluZyBpZiBvbmUgaGVhZGVyIHVzZXMganVzdCBvbmUga2V5IGl0J3MgYmFzZWQgb24gdGhlIG5ldyBwYXR0ZXJuLlxuICAgIC8vIFtmZWF0dXJlIHJlcXVlc3RdIHNpbXBsaWZpZWQgaGVhZGVyIGZvciByZXNvdXJjZXMgIzM3IGJ5IEBXZWJSZWZsZWN0aW9uXG4gICAgaWYgKHJlc291cmNlLmhlYWRlci5sZW5ndGggJiYgT2JqZWN0LmtleXMocmVzb3VyY2UuaGVhZGVyWzBdKS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJlc291cmNlLmhlYWRlciA9IHJlc291cmNlLmhlYWRlci5tYXAoZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgICB2YXIga2V5ID0gT2JqZWN0LmtleXMoaGVhZGVyKVswXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBuYW1lOiBoZWFkZXJba2V5XVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgICRzY29wZS5oZWFkZXIgPSB7XG4gICAgICAnY29sdW1ucyc6IHJlc291cmNlLmhlYWRlcixcbiAgICAgICdzb3J0QnknOiAkc2NvcGUucGFyYW1zLnNvcnRCeSxcbiAgICAgICdzb3J0T3JkZXInOiAkc2NvcGUucGFyYW1zLnNvcnRPcmRlclxuICAgIH07XG4gICAgaWYgKCEkc2NvcGUuY2xpZW50U2lkZSkge1xuICAgICAgJHNjb3BlLmhlYWRlci5zb3J0QnkgPSAkc2NvcGUuaGVhZGVyLnNvcnRCeSB8fCByZXNvdXJjZS5zb3J0Qnk7XG4gICAgICAkc2NvcGUuaGVhZGVyLnNvcnRPcmRlciA9ICRzY29wZS5oZWFkZXIuc29ydE9yZGVyIHx8IHJlc291cmNlLnNvcnRPcmRlcjtcbiAgICB9XG4gICAgJHNjb3BlLnJvd3MgPSByZXNvdXJjZS5yb3dzO1xuICAgIGlmICgkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkge1xuICAgICAgJHNjb3BlLnBhZ2luYXRpb24ucGFnZSA9ICRzY29wZS5wYXJhbXMucGFnZTtcbiAgICAgICRzY29wZS5wYWdpbmF0aW9uLmNvdW50ID0gJHNjb3BlLnBhcmFtcy5jb3VudDtcbiAgICAgICRzY29wZS5wYWdpbmF0aW9uLnNpemUgPSAkc2NvcGUucm93cy5sZW5ndGg7XG4gICAgICBpZiAocmVzb3VyY2UucGFnaW5hdGlvbikge1xuICAgICAgICBpZiAocmVzb3VyY2UucGFnaW5hdGlvbi5jb3VudCkge1xuICAgICAgICAgICRzY29wZS5wYWdpbmF0aW9uLmNvdW50ID0gcmVzb3VyY2UucGFnaW5hdGlvbi5jb3VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlKSB7XG4gICAgICAgICAgJHNjb3BlLnBhZ2luYXRpb24ucGFnZSA9IHJlc291cmNlLnBhZ2luYXRpb24ucGFnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzb3VyY2UucGFnaW5hdGlvbi5zaXplKSB7XG4gICAgICAgICAgJHNjb3BlLnBhZ2luYXRpb24uc2l6ZSA9IHJlc291cmNlLnBhZ2luYXRpb24uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgJHNjb3BlLnBhZ2luYXRpb24ucGFnZXMgPSBNYXRoLmNlaWwoJHNjb3BlLnBhZ2luYXRpb24uc2l6ZSAvICRzY29wZS5wYWdpbmF0aW9uLmNvdW50KTtcbiAgICAgIGlmICgkc2NvcGUucGFnaW5hdGlvbi5wYWdlcyA8ICRzY29wZS5wYWdpbmF0aW9uLnBhZ2UpIHtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gJHNjb3BlLnBhZ2luYXRpb24ucGFnZXM7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGJ1aWxkQ2xpZW50UmVzb3VyY2UgPSBmdW5jdGlvbih1cGRhdGVGcm9tKSB7XG4gICAgdmFyIGZyb21Sb3csIHRvUm93LCByb3dUb1Nob3csIHJldmVyc2UsIGxpc3RTb3J0Qnk7XG4gICAgJHNjb3BlLmxvZ3MuYnVpbGRDbGllbnRSZXNvdXJjZUNvdW50ICs9IDE7XG4gICAgaWYgKCRzY29wZS50aGVhZERpcmVjdGl2ZSAmJiAkc2NvcGUuaGVhZGVyLmNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICByZXZlcnNlID0gJHNjb3BlLmhlYWRlci5zb3J0T3JkZXIgPT09ICdhc2MnID8gZmFsc2UgOiB0cnVlO1xuICAgICAgbGlzdFNvcnRCeSA9IFtmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUuaGVhZGVyLnNvcnRCeS5zcGxpdCgnLicpXG4gICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV07XG4gICAgICAgIH0sIGl0ZW0pO1xuICAgICAgfV07XG4gICAgICBpZiAoJHNjb3BlLmhlYWRlci5jb2x1bW5zWzBdLmtleSAhPT0gJHNjb3BlLmhlYWRlci5zb3J0QnkpIHtcbiAgICAgICAgbGlzdFNvcnRCeS5wdXNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmhlYWRlci5jb2x1bW5zWzBdLmtleS5zcGxpdCgnLicpXG4gICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWVdO1xuICAgICAgICAgIH0sIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICgkc2NvcGUuaGVhZGVyLnNvcnRCeSkge1xuICAgICAgICAkc2NvcGUucm93cyA9ICRmaWx0ZXIoJ29yZGVyQnknKSgkc2NvcGUucm93cywgbGlzdFNvcnRCeSwgcmV2ZXJzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgkYXR0cnMuYmluZEZpbHRlcnMpIHtcbiAgICAgICRzY29wZS5yb3dzID0gJGZpbHRlcignZmlsdGVyJykoJHNjb3BlLnJvd3MsICRzY29wZS5maWx0ZXJzLCAkc2NvcGUuZmlsdGVyc0NvbXBhcmF0b3IpO1xuICAgIH1cbiAgICBpZiAoJHNjb3BlLnBhZ2luYXRpb25EaXJlY3RpdmUpIHtcbiAgICAgICRzY29wZS5wYWdpbmF0aW9uLmNvdW50ID0gJHNjb3BlLnBhcmFtcy5jb3VudDtcbiAgICAgICRzY29wZS5wYWdpbmF0aW9uLnNpemUgPSAkc2NvcGUucm93cy5sZW5ndGg7XG4gICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlcyA9IE1hdGguY2VpbCgkc2NvcGUucm93cy5sZW5ndGggLyAkc2NvcGUucGFnaW5hdGlvbi5jb3VudCk7XG4gICAgICBpZiAodXBkYXRlRnJvbSA9PT0gJ2ZpbHRlcnMnIHx8IFxuICAgICAgICAgICRzY29wZS5wYWdpbmF0aW9uLnBhZ2UgPiAkc2NvcGUucGFnaW5hdGlvbi5wYWdlcykge1xuICAgICAgICAkc2NvcGUucGFnaW5hdGlvbi5wYWdlID0gMTtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5wYWdpbmF0aW9uLnBhZ2UgPSAkc2NvcGUucGFyYW1zLnBhZ2U7XG4gICAgICB9XG4gICAgICB0b1JvdyA9ICRzY29wZS5wYWdpbmF0aW9uLmNvdW50ICogJHNjb3BlLnBhZ2luYXRpb24ucGFnZTtcbiAgICAgIGZyb21Sb3cgPSB0b1JvdyAtICRzY29wZS5wYWdpbmF0aW9uLmNvdW50O1xuICAgICAgaWYgKGZyb21Sb3cgPj0gMCAmJiB0b1JvdyA+PSAwKSB7XG4gICAgICAgIHJvd1RvU2hvdyA9ICRzY29wZS5yb3dzLnNsaWNlKGZyb21Sb3csIHRvUm93KTtcbiAgICAgICAgJHNjb3BlLnJvd3MgPSByb3dUb1Nob3c7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGJ1aWxkVXJsID0gZnVuY3Rpb24ocGFyYW1zLCBmaWx0ZXJzKSB7XG4gICAgdmFyIHVybFF1ZXJ5LCB2YWx1ZSwgdXJsLCBsaXN0S2V5Tm90Sm9pbjtcbiAgICB1cmxRdWVyeSA9IHt9O1xuICAgIGxpc3RLZXlOb3RKb2luID0gWydzb3J0QnknLCAnc29ydE9yZGVyJywgJ3BhZ2UnLCAnY291bnQnXTtcbiAgICBpZiAoJHNjb3BlLnRoZWFkRGlyZWN0aXZlKSB7XG4gICAgICB1cmxRdWVyeSA9IHRhc3R5VXRpbC5zZXRQcm9wZXJ0eSh1cmxRdWVyeSwgcGFyYW1zLCAnc29ydEJ5Jyk7XG4gICAgICB1cmxRdWVyeSA9IHRhc3R5VXRpbC5zZXRQcm9wZXJ0eSh1cmxRdWVyeSwgcGFyYW1zLCAnc29ydE9yZGVyJyk7XG4gICAgfVxuICAgIGlmICgkc2NvcGUucGFnaW5hdGlvbkRpcmVjdGl2ZSkge1xuICAgICAgdXJsUXVlcnkgPSB0YXN0eVV0aWwuc2V0UHJvcGVydHkodXJsUXVlcnksIHBhcmFtcywgJ3BhZ2UnKTtcbiAgICAgIHVybFF1ZXJ5ID0gdGFzdHlVdGlsLnNldFByb3BlcnR5KHVybFF1ZXJ5LCBwYXJhbXMsICdjb3VudCcpO1xuICAgIH1cbiAgICBpZiAoJGF0dHJzLmJpbmRGaWx0ZXJzKSB7XG4gICAgICB1cmxRdWVyeSA9IHRhc3R5VXRpbC5qb2luT2JqZWN0cyh1cmxRdWVyeSwgZmlsdGVycywgbGlzdEtleU5vdEpvaW4pO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXModXJsUXVlcnkpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhbHVlID0gdXJsUXVlcnlba2V5XTtcbiAgICAgIGlmICgkc2NvcGUucXVlcnlba2V5XSkge1xuICAgICAgICBrZXkgPSAkc2NvcGUucXVlcnlba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgfSkuam9pbignJicpO1xuICB9O1xuXG4gIHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSA9IGZ1bmN0aW9uICh1cGRhdGVGcm9tKSB7XG4gICAgaWYgKCRzY29wZS5wYXJhbXMuc29ydEJ5KSB7XG4gICAgICAkc2NvcGUucmVzb3VyY2Uuc29ydEJ5ID0gJHNjb3BlLnBhcmFtcy5zb3J0Qnk7XG4gICAgfVxuICAgIGlmICgkc2NvcGUucGFyYW1zLnNvcnRPcmRlcikge1xuICAgICAgJHNjb3BlLnJlc291cmNlLnNvcnRPcmRlciA9ICRzY29wZS5wYXJhbXMuc29ydE9yZGVyO1xuICAgIH1cbiAgICBpZiAoJHNjb3BlLnBhcmFtcy5wYWdlICYmICRzY29wZS5wYXJhbXMuY291bnQpIHtcbiAgICAgICRzY29wZS5yZXNvdXJjZS5wYWdpbmF0aW9uID0gJHNjb3BlLnBhZ2luYXRpb247XG4gICAgICAkc2NvcGUucmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlID0gJHNjb3BlLnBhcmFtcy5wYWdlO1xuICAgICAgJHNjb3BlLnJlc291cmNlLnBhZ2luYXRpb24uY291bnQgPSAkc2NvcGUucGFyYW1zLmNvdW50O1xuICAgIH1cbiAgICBzZXREaXJlY3RpdmVzVmFsdWVzKCRzY29wZS5yZXNvdXJjZSk7XG4gICAgYnVpbGRDbGllbnRSZXNvdXJjZSh1cGRhdGVGcm9tKTtcbiAgfTtcblxuICB1cGRhdGVTZXJ2ZXJTaWRlUmVzb3VyY2UgPSBmdW5jdGlvbiAodXBkYXRlRnJvbSkge1xuICAgIGlmICh1cGRhdGVGcm9tID09PSAnZmlsdGVycycpIHtcbiAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKCRzY29wZS5pbml0LmZpbHRlckJhc2UpKSB7XG4gICAgICAgIGlmICgkc2NvcGUucGFyYW1zLnBhZ2UgIT09ICRzY29wZS5pbml0LmZpbHRlckJhc2UpIHtcbiAgICAgICAgICBmaWx0ZXJDaGFuZ2VkUGFnZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnBhcmFtcy5wYWdlID0gJHNjb3BlLmluaXQuZmlsdGVyQmFzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgJHNjb3BlLnVybCA9IGJ1aWxkVXJsKCRzY29wZS5wYXJhbXMsICRzY29wZS5maWx0ZXJzKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZSAoKSB7XG4gICAgICAkc2NvcGUubG9ncy51cGRhdGVTZXJ2ZXJTaWRlUmVzb3VyY2VSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHZhciBwYXJhbXNPYmogPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnBhcmFtcyk7XG4gICAgICBwYXJhbXNPYmouZmlsdGVycyA9ICRzY29wZS5maWx0ZXJzO1xuICAgICAgJHNjb3BlLnJlc291cmNlQ2FsbGJhY2soJHNjb3BlLnVybCwgcGFyYW1zT2JqKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgIHNldERpcmVjdGl2ZXNWYWx1ZXMocmVzb3VyY2UpO1xuICAgICAgICAkc2NvcGUubG9ncy51cGRhdGVTZXJ2ZXJTaWRlUmVzb3VyY2VSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoJHNjb3BlLnJlbG9hZCkge1xuICAgICAgJHNjb3BlLnJlbG9hZCA9IHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZTtcbiAgICB9XG4gICAgaWYgKChpbml0Tm93IHx8IHVwZGF0ZUZyb20gPT09ICdwYXJhbXMnKSAmJlxuICAgICAgICAhJHNjb3BlLmxvZ3MudXBkYXRlU2VydmVyU2lkZVJlc291cmNlUnVubmluZykge1xuXG4gICAgICBpZiAoJHNjb3BlLnJlbG9hZCkge1xuICAgICAgICBpZiAoIWZpbHRlckNoYW5nZWRQYWdlKSB7XG4gICAgICAgICAgdXBkYXRlU2VydmVyU2lkZVJlc291cmNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZSgpO1xuICAgICAgICBmaWx0ZXJDaGFuZ2VkUGFnZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgXG4gIC8vIEFuZ3VsYXJKcyAkd2F0Y2ggY2FsbGJhY2tzXG4gIGlmICgkYXR0cnMuYmluZEZpbHRlcnMpIHtcbiAgICAkc2NvcGUuJHdhdGNoKCdmaWx0ZXJzJywgZnVuY3Rpb24gd2F0Y2hGaWx0ZXJzIChuZXdWYWx1ZSwgb2xkVmFsdWUpe1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoJHNjb3BlLmNsaWVudFNpZGUpIHtcbiAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyh1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UoJ2ZpbHRlcnMnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmModXBkYXRlU2VydmVyU2lkZVJlc291cmNlKCdmaWx0ZXJzJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH1cbiAgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ3BhcmFtcycsIGZ1bmN0aW9uIHdhdGNoUGFyYW1zIChuZXdWYWx1ZSwgb2xkVmFsdWUpe1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIC8vIFJ1biB1cGRhdGUgcmVzdW9yY2Ugb25seSBpZiB3ZSBhcmUgb24gXG4gICAgICAvLyB0aGUgc2Vjb25kIGN5Y2xlIG9yIG1vcmUgb2YgYHBhcmFtc2BcbiAgICAgIGlmIChwYXJhbXNJbml0aWFsQ3ljbGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmICgkc2NvcGUuY2xpZW50U2lkZSkge1xuICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSgncGFyYW1zJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZVNlcnZlclNpZGVSZXNvdXJjZSgncGFyYW1zJykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXNJbml0aWFsQ3ljbGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoJHNjb3BlLnJlc291cmNlKSB7XG4gICAgdmFyIHdhdGNoUmVzb3VyY2UgPSBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKXtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgJHNjb3BlLnBhcmFtcy5zb3J0QnkgPSAkc2NvcGUucmVzb3VyY2Uuc29ydEJ5IHx8ICRzY29wZS5wYXJhbXMuc29ydEJ5O1xuICAgICAgICAkc2NvcGUucGFyYW1zLnNvcnRPcmRlciA9ICRzY29wZS5yZXNvdXJjZS5zb3J0T3JkZXIgfHwgJHNjb3BlLnBhcmFtcy5zb3J0T3JkZXI7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKHVwZGF0ZUNsaWVudFNpZGVSZXNvdXJjZSgncmVzb3VyY2UnKSk7XG4gICAgICAgIGlmICghJHNjb3BlLnJlc291cmNlLnJlbG9hZCkge1xuICAgICAgICAgICRzY29wZS5yZXNvdXJjZS5yZWxvYWQgPSBmdW5jdGlvbiByZWxvYWRSZXNvdXJjZSAoKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyh1cGRhdGVDbGllbnRTaWRlUmVzb3VyY2UoJ3Jlc291cmNlJykpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICgkc2NvcGUud2F0Y2hSZXNvdXJjZSA9PT0gJ3JlZmVyZW5jZScpIHtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlJywgd2F0Y2hSZXNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICgkc2NvcGUud2F0Y2hSZXNvdXJjZSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigncmVzb3VyY2UuaGVhZGVyJywgd2F0Y2hSZXNvdXJjZSk7XG4gICAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigncmVzb3VyY2Uucm93cycsIHdhdGNoUmVzb3VyY2UpO1xuICAgICAgJHNjb3BlLiR3YXRjaEdyb3VwKFsncmVzb3VyY2Uuc29ydEJ5JywgXG4gICAgICAgICdyZXNvdXJjZS5zb3J0T3JkZXInLCBcbiAgICAgICAgJ3Jlc291cmNlLnBhZ2luYXRpb24uY291bnQnLFxuICAgICAgICAncmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlJyxcbiAgICAgICAgJ3Jlc291cmNlLnBhZ2luYXRpb24ucGFnZXMnLFxuICAgICAgICAncmVzb3VyY2UucGFnaW5hdGlvbi5zaXplJ10sIHdhdGNoUmVzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAoJHNjb3BlLndhdGNoUmVzb3VyY2UgPT09ICdlcXVhbGl0eScpIHtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLmhlYWRlcicsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2Uucm93cycsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2Uuc29ydEJ5Jywgd2F0Y2hSZXNvdXJjZSwgdHJ1ZSk7XG4gICAgICAkc2NvcGUuJHdhdGNoKCdyZXNvdXJjZS5zb3J0T3JkZXInLCB3YXRjaFJlc291cmNlLCB0cnVlKTtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLnBhZ2luYXRpb24uY291bnQnLCB3YXRjaFJlc291cmNlLCB0cnVlKTtcbiAgICAgICRzY29wZS4kd2F0Y2goJ3Jlc291cmNlLnBhZ2luYXRpb24ucGFnZScsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2UucGFnaW5hdGlvbi5wYWdlcycsIHdhdGNoUmVzb3VyY2UsIHRydWUpO1xuICAgICAgJHNjb3BlLiR3YXRjaCgncmVzb3VyY2UucGFnaW5hdGlvbi5zaXplJywgd2F0Y2hSZXNvdXJjZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG59KVxuLmRpcmVjdGl2ZSgndGFzdHlUYWJsZScsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZTogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiAnVGFibGVDb250cm9sbGVyJyxcbiAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRhc3R5VGFibGUpIHtcbiAgICAgIGlmIChlbGVtZW50LmZpbmQoJ3Rhc3R5LXRoZWFkJykubGVuZ3RoIHx8XG4gICAgICAgICAgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdbdGFzdHktdGhlYWRdJykpIHtcbiAgICAgICAgdGFzdHlUYWJsZS5hY3RpdmF0ZSgndGhlYWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50LmZpbmQoJ3Rhc3R5LXBhZ2luYXRpb24nKS5sZW5ndGggfHxcbiAgICAgICAgICBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJ1t0YXN0eS1wYWdpbmF0aW9uXScpKSB7XG4gICAgICAgIHRhc3R5VGFibGUuYWN0aXZhdGUoJ3BhZ2luYXRpb24nKTtcbiAgICAgIH1cbiAgICAgIHRhc3R5VGFibGUuaW5pdFRhYmxlKCk7XG4gICAgfVxuICB9O1xufSlcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1Rhc3R5LmNvbXBvbmVudC50YXN0eVRoZWFkXG4gKlxuICogQGV4YW1wbGVcbiAgPHRhYmxlIHRhc3R5LXRhYmxlPlxuICAgIDx0aGVhZCB0YWJsZS1oZWFkPjwvdGhlYWQ+XG4gICAgPHRib2R5PjwvdGJvZHk+XG4gIDwvdGFibGU+XG4gKlxuICovXG4uZGlyZWN0aXZlKCd0YXN0eVRoZWFkJywgZnVuY3Rpb24oJGZpbHRlciwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkY29tcGlsZSwgdGFibGVDb25maWcsIHRhc3R5VXRpbCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHJlcXVpcmU6ICdedGFzdHlUYWJsZScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiB0YWJsZUNvbmZpZy50ZW1wbGF0ZUhlYWRVcmwsXG4gICAgbGluazogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCB0YXN0eVRhYmxlKSB7XG4gICAgICB2YXIgbmV3U2NvcGVOYW1lLCBsaXN0U2NvcGVUb1dhdGNoO1xuICAgICAgc2NvcGUuYmluZE9uY2UgPSB0YXN0eVRhYmxlLmJpbmRPbmNlO1xuICAgICAgc2NvcGUuY29sdW1ucyA9IFtdO1xuICAgICAgc2NvcGUuYm9vdHN0cmFwSWNvbiA9IHRhc3R5VGFibGUuY29uZmlnLmJvb3RzdHJhcEljb247XG4gICAgICBzY29wZS5pY29uVXAgPSB0YXN0eVRhYmxlLmNvbmZpZy5pY29uVXA7XG4gICAgICBzY29wZS5pY29uRG93biA9IHRhc3R5VGFibGUuY29uZmlnLmljb25Eb3duO1xuXG4gICAgICBsaXN0U2NvcGVUb1dhdGNoID0gW1xuICAgICAgICAnYmluZE5vdFNvcnRCeScsIFxuICAgICAgICAnYmluZEJvb3RzdHJhcEljb24nLCBcbiAgICAgICAgJ2JpbmRJY29uVXAnLCBcbiAgICAgICAgJ2JpbmRJY29uRG93bicsXG4gICAgICAgICdiaW5kVGVtcGxhdGVVcmwnXG4gICAgICBdO1xuICAgICAgbGlzdFNjb3BlVG9XYXRjaC5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZU5hbWUpIHtcbiAgICAgICAgbmV3U2NvcGVOYW1lID0gc2NvcGVOYW1lLnN1YnN0cmluZyg0KTtcbiAgICAgICAgbmV3U2NvcGVOYW1lID0gbmV3U2NvcGVOYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgbmV3U2NvcGVOYW1lLnNsaWNlKDEpO1xuICAgICAgICBpZiAoYXR0cnNbc2NvcGVOYW1lXSkge1xuICAgICAgICAgIHRhc3R5VXRpbC5iaW5kVG8oc2NvcGVOYW1lLCBzY29wZSwgYXR0cnMsIG5ld1Njb3BlTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0cnNbbmV3U2NvcGVOYW1lXSkge1xuICAgICAgICAgIGlmIChhdHRyc1tuZXdTY29wZU5hbWVdWzBdID09PSAnWycpIHtcbiAgICAgICAgICAgIGF0dHJzW25ld1Njb3BlTmFtZV0gPSBhdHRyc1tuZXdTY29wZU5hbWVdLnJlcGxhY2UoLycvZywgJ1wiJyk7XG4gICAgICAgICAgICBzY29wZVtuZXdTY29wZU5hbWVdID0gSlNPTi5wYXJzZShhdHRyc1tuZXdTY29wZU5hbWVdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcGVbbmV3U2NvcGVOYW1lXSA9IGF0dHJzW25ld1Njb3BlTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNjb3BlLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgICRodHRwLmdldChzY29wZS50ZW1wbGF0ZVVybCwgeyBjYWNoZTogJHRlbXBsYXRlQ2FjaGUgfSlcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24odGVtcGxhdGVDb250ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5yZXBsYWNlV2l0aCgkY29tcGlsZSh0ZW1wbGF0ZUNvbnRlbnQpKHNjb3BlKSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xlYW5Tb3J0QnkgKHNvcnRCeSkge1xuICAgICAgICBpZiAoc29ydEJ5KSB7XG4gICAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2NsZWFuRmllbGROYW1lJykoc29ydEJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBzY29wZS5zZXRDb2x1bW5zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd2lkdGgsIGksIGFjdGl2ZSwgc29ydGFibGUsIHNvcnQsIFxuICAgICAgICAgICAgaXNTb3J0ZWQsIGlzU29ydGVkQ2FyZXQ7XG4gICAgICAgIHNjb3BlLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgaWYgKHNjb3BlLmhlYWRlci5zb3J0T3JkZXIgPT09ICdkc2MnICYmIFxuICAgICAgICAgICAgc2NvcGUuaGVhZGVyLnNvcnRCeSAmJlxuICAgICAgICAgICAgc2NvcGUuaGVhZGVyLnNvcnRCeVswXSAhPT0gJy0nKSB7XG4gICAgICAgICAgc2NvcGUuaGVhZGVyLnNvcnRCeSA9ICctJyArIHNjb3BlLmhlYWRlci5zb3J0Qnk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuaGVhZGVyLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZSA9IGNvbHVtbi5zdHlsZSB8fCB7fTtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheShjb2x1bW4uY2xhc3MpKSB7XG4gICAgICAgICAgICBjb2x1bW4uY2xhc3MgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc29ydGFibGUgPSB0cnVlO1xuICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGlzU29ydGVkID0gJyc7XG4gICAgICAgICAgaXNTb3J0ZWRDYXJldCA9ICcnO1xuICAgICAgICAgIC8vIE5vdCBzb3J0IGNvbHVtbiB3aGVuIHRoZSBrZXkgaXMgcHJlc2VudCBpbiB0aGUgYG5vdFNvcnRCeWAgbGlzdCxcbiAgICAgICAgICAvLyBhbmQgTm90IHNvcnQgY29sdW1uIHdoZW4gYG5vdFNvcnRCeWAgaXMgYW4gZW1wdHkgbGlzdFxuICAgICAgICAgIC8vIElmIHNvcnRhYmxlIHByb3BlcnR5IGlzIHByZXNlbnQgaW4gY29sdW1uIG9iamVjdCwgdGhlbiB1c2UgaXRcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHNjb3BlLm5vdFNvcnRCeSkpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5ub3RTb3J0QnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHNvcnRhYmxlID0gc2NvcGUubm90U29ydEJ5LmluZGV4T2YoY29sdW1uLmtleSkgPCAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc29ydGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGNvbHVtbi5zb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgc29ydGFibGUgPSBjb2x1bW4uc29ydGFibGUgPT09IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb2x1bW4ua2V5ID09PSBzY29wZS5oZWFkZXIuc29ydEJ5IHx8XG4gICAgICAgICAgICAgICctJyArIGNvbHVtbi5rZXkgPT09IHNjb3BlLmhlYWRlci5zb3J0QnkpIHtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoY29sdW1uLmtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW5ndWxhciB0YXN0eVRhYmxlIGRpcmVjdGl2ZTogbmVlZCBhIGtleSB2YWx1ZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWFjaCBjb2x1bW4gdGFibGUgaGVhZGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvcnQgPSAkZmlsdGVyKCdjbGVhbkZpZWxkTmFtZScpKGNvbHVtbi5rZXkpO1xuICAgICAgICAgIGlmIChjbGVhblNvcnRCeShzY29wZS5oZWFkZXIuc29ydEJ5KSA9PT0gJy0nICsgc29ydCkge1xuICAgICAgICAgICAgaWYgKHRhc3R5VGFibGUuY29uZmlnLmJvb3RzdHJhcEljb24pIHtcbiAgICAgICAgICAgICAgaXNTb3J0ZWQgPSAnJztcbiAgICAgICAgICAgICAgaXNTb3J0ZWRDYXJldCA9ICdjYXJldCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpc1NvcnRlZCA9IHNjb3BlLmljb25Eb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY2xlYW5Tb3J0Qnkoc2NvcGUuaGVhZGVyLnNvcnRCeSkgPT09IHNvcnQpIHtcbiAgICAgICAgICAgIGlmICh0YXN0eVRhYmxlLmNvbmZpZy5ib290c3RyYXBJY29uKSB7XG4gICAgICAgICAgICAgIGlzU29ydGVkID0gJ2Ryb3B1cCc7XG4gICAgICAgICAgICAgIGlzU29ydGVkQ2FyZXQgPSAnY2FyZXQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNTb3J0ZWQgPSBzY29wZS5pY29uVXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLmNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICAna2V5JzogY29sdW1uLmtleSxcbiAgICAgICAgICAgICduYW1lJzogY29sdW1uLm5hbWUsXG4gICAgICAgICAgICAnYWN0aXZlJzogYWN0aXZlLFxuICAgICAgICAgICAgJ3NvcnRhYmxlJzogc29ydGFibGUsXG4gICAgICAgICAgICAnY2xhc3MnOiBjb2x1bW4uY2xhc3MsXG4gICAgICAgICAgICAnc3R5bGUnOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAnaXNTb3J0ZWQnOiBpc1NvcnRlZCxcbiAgICAgICAgICAgICdpc1NvcnRlZENhcmV0JzogaXNTb3J0ZWRDYXJldFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0YXN0eVRhYmxlLnN0YXJ0KSB7XG4gICAgICAgICAgLy8gVGhlYWQgaXQncyBjYWxsZWRcbiAgICAgICAgICB0YXN0eVRhYmxlLmluaXRUYWJsZSgndGhlYWQnKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2NvcGUuc29ydEJ5ID0gZnVuY3Rpb24gKGNvbHVtbikge1xuICAgICAgICBpZiAoIWNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29sdW1uTmFtZSwgc29ydE9yZGVyO1xuICAgICAgICBjb2x1bW5OYW1lID0gJGZpbHRlcignY2xlYW5GaWVsZE5hbWUnKShjb2x1bW4ua2V5KTtcbiAgICAgICAgaWYgKGNsZWFuU29ydEJ5KHNjb3BlLmhlYWRlci5zb3J0QnkpID09PSBjb2x1bW5OYW1lKSB7XG4gICAgICAgICAgc29ydE9yZGVyID0gJ2RzYyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc29ydE9yZGVyID0gJ2FzYyc7XG4gICAgICAgIH1cbiAgICAgICAgdGFzdHlUYWJsZS5zZXRQYXJhbXMoJ3NvcnRCeScsIGNvbHVtbi5rZXkpO1xuICAgICAgICB0YXN0eVRhYmxlLnNldFBhcmFtcygnc29ydE9yZGVyJywgc29ydE9yZGVyKTtcbiAgICAgIH07XG5cbiAgICAgIHNjb3BlLmNsYXNzVG9TaG93ID0gZnVuY3Rpb24gKGNvbHVtbikge1xuICAgICAgICB2YXIgbGlzdENsYXNzVG9TaG93ID0gW107XG4gICAgICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgICAgICBsaXN0Q2xhc3NUb1Nob3cucHVzaCgnc29ydGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uLmFjdGl2ZSkge1xuICAgICAgICAgIGxpc3RDbGFzc1RvU2hvdy5wdXNoKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb2x1bW4uY2xhc3MuZm9yRWFjaChmdW5jdGlvbiBnZXRMaXN0Q2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGxpc3RDbGFzc1RvU2hvdy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGlzdENsYXNzVG9TaG93O1xuICAgICAgfTtcblxuICAgICAgdGFzdHlUYWJsZS4kc2NvcGUuJHdhdGNoQ29sbGVjdGlvbignaGVhZGVyJywgZnVuY3Rpb24gd2F0Y2hIZWFkZXIgKG5ld1ZhbHVlLCBvbGRWYWx1ZSl7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAgJiYgKChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHx8ICF0YXN0eVRhYmxlLnN0YXJ0KSkge1xuICAgICAgICAgIHNjb3BlLmhlYWRlciA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHNjb3BlLnNldENvbHVtbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSlcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBuZ1Rhc3R5LmNvbXBvbmVudC50YXN0eVBhZ2luYXRpb25cbiAqXG4gKiBAZXhhbXBsZVxuICA8ZGl2IHRhc3R5LXRhYmxlPlxuICAgIDx0YWJsZT5cbiAgICAgLi4uXG4gICAgPC90YWJsZT5cbiAgICA8ZGl2IHRhYmxlLXBhZ2luYXRpb24+PC9kaXY+XG4gIDwvZGl2PlxuICpcbiAqL1xuLmRpcmVjdGl2ZSgndGFzdHlQYWdpbmF0aW9uJywgZnVuY3Rpb24oJGZpbHRlciwgJHRlbXBsYXRlQ2FjaGUsICRodHRwLCAkY29tcGlsZSwgdGFibGVDb25maWcsIHRhc3R5VXRpbCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHJlcXVpcmU6ICdedGFzdHlUYWJsZScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiB0YWJsZUNvbmZpZy50ZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIHRhc3R5VGFibGUpIHtcbiAgICAgIHZhciBnZXRQYWdlLCBzZXRDb3VudCwgc2V0UGFnaW5hdGlvblJhbmdlLCBzZXRQcmV2aW91c1JhbmdlLCBcbiAgICAgICAgICBzZXRSZW1haW5pbmdSYW5nZSwgc2V0UGFnaW5hdGlvblJhbmdlcywgbGlzdFNjb3BlVG9XYXRjaCwgbmV3U2NvcGVOYW1lO1xuXG4gICAgICBsaXN0U2NvcGVUb1dhdGNoID0gW1xuICAgICAgICAnYmluZEl0ZW1zUGVyUGFnZScsIFxuICAgICAgICAnYmluZExpc3RJdGVtc1BlclBhZ2UnLCBcbiAgICAgICAgJ2JpbmRUZW1wbGF0ZVVybCdcbiAgICAgIF07XG4gICAgICBsaXN0U2NvcGVUb1dhdGNoLmZvckVhY2goZnVuY3Rpb24gKHNjb3BlTmFtZSkge1xuICAgICAgICBuZXdTY29wZU5hbWUgPSBzY29wZU5hbWUuc3Vic3RyaW5nKDQpO1xuICAgICAgICBuZXdTY29wZU5hbWUgPSBuZXdTY29wZU5hbWUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBuZXdTY29wZU5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGlmIChhdHRyc1tzY29wZU5hbWVdKSB7XG4gICAgICAgICAgdGFzdHlVdGlsLmJpbmRUbyhzY29wZU5hbWUsIHNjb3BlLCBhdHRycywgbmV3U2NvcGVOYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRyc1tuZXdTY29wZU5hbWVdKSB7XG4gICAgICAgICAgaWYgKG5ld1Njb3BlTmFtZSA9PT0gJ2l0ZW1zUGVyUGFnZScpIHtcbiAgICAgICAgICAgIHNjb3BlW25ld1Njb3BlTmFtZV0gPSBwYXJzZUludChhdHRyc1tuZXdTY29wZU5hbWVdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc2NvcGVbbmV3U2NvcGVOYW1lXSA9IEpTT04ucGFyc2UoYXR0cnNbbmV3U2NvcGVOYW1lXSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgc2NvcGVbbmV3U2NvcGVOYW1lXSA9IGF0dHJzW25ld1Njb3BlTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKHNjb3BlLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgICRodHRwLmdldChzY29wZS50ZW1wbGF0ZVVybCwgeyBjYWNoZTogJHRlbXBsYXRlQ2FjaGUgfSlcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24odGVtcGxhdGVDb250ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5yZXBsYWNlV2l0aCgkY29tcGlsZSh0ZW1wbGF0ZUNvbnRlbnQpKHNjb3BlKSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVmYXVsdCBjb25maWdzXG4gICAgICBzY29wZS5pdGVtc1BlclBhZ2UgPSBzY29wZS5pdGVtc1BlclBhZ2UgfHwgdGFzdHlUYWJsZS5jb25maWcuaXRlbXNQZXJQYWdlO1xuICAgICAgc2NvcGUubGlzdEl0ZW1zUGVyUGFnZSA9IHNjb3BlLmxpc3RJdGVtc1BlclBhZ2UgfHwgdGFzdHlUYWJsZS5jb25maWcubGlzdEl0ZW1zUGVyUGFnZTtcblxuICAgICAgLy8gU2VydmUgc2lkZSB0YWJsZSBjYXNlXG4gICAgICBpZiAoIXRhc3R5VGFibGUuJHNjb3BlLmNsaWVudFNpZGUpIHtcbiAgICAgICAgc2NvcGUuaXRlbXNQZXJQYWdlID0gdGFzdHlUYWJsZS4kc2NvcGUuaW5pdC5jb3VudCB8fCBzY29wZS5pdGVtc1BlclBhZ2U7XG4gICAgICB9XG5cbiAgICAgIC8vIEludGVybmFsIHZhcmlhYmxlXG4gICAgICBzY29wZS5wYWdpbmF0aW9uID0ge307XG4gICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IDE7XG4gICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IDE7XG5cbiAgICAgIGdldFBhZ2UgPSBmdW5jdGlvbiAobnVtUGFnZSkge1xuICAgICAgICB0YXN0eVRhYmxlLnNldFBhcmFtcygncGFnZScsIG51bVBhZ2UpO1xuICAgICAgfTtcblxuICAgICAgc2V0Q291bnQgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgICB2YXIgbWF4SXRlbXMsIHBhZ2U7XG4gICAgICAgIHNjb3BlLml0ZW1zUGVyUGFnZSA9IGNvdW50O1xuICAgICAgICBtYXhJdGVtcyA9IGNvdW50ICogc2NvcGUucGFnaW5hdGlvbi5wYWdlO1xuICAgICAgICBpZiAobWF4SXRlbXMgPiBzY29wZS5wYWdpbmF0aW9uLnNpemUpIHtcbiAgICAgICAgICBwYWdlID0gTWF0aC5jZWlsKHNjb3BlLnBhZ2luYXRpb24uc2l6ZSAvIGNvdW50KTtcbiAgICAgICAgICB0YXN0eVRhYmxlLnNldFBhcmFtcygncGFnZScsIHBhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRhc3R5VGFibGUuc2V0UGFyYW1zKCdjb3VudCcsIGNvdW50KTtcbiAgICAgIH07XG5cbiAgICAgIHNldFBhZ2luYXRpb25SYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzO1xuICAgICAgICBjdXJyZW50UGFnZSA9IHNjb3BlLnBhZ2luYXRpb24ucGFnZTtcbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlID4gc2NvcGUucGFnaW5hdGlvbi5wYWdlcykge1xuICAgICAgICAgIGN1cnJlbnRQYWdlID0gc2NvcGUucGFnaW5hdGlvbi5wYWdlcztcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IChjdXJyZW50UGFnZSAtIDIpID4gMCA/IChjdXJyZW50UGFnZSAtIDIpIDogMTtcbiAgICAgICAgc2NvcGUucGFnTWF4UmFuZ2UgPSAoY3VycmVudFBhZ2UgKyAyKTtcbiAgICAgICAgc2NvcGUucGFnaW5hdGlvbi5wYWdlICA9IGN1cnJlbnRQYWdlO1xuICAgICAgICBzZXRQYWdpbmF0aW9uUmFuZ2VzKCk7XG4gICAgICB9O1xuXG4gICAgICBzZXRQcmV2aW91c1JhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2NvcGUucGFnSGlkZU1pblJhbmdlID09PSB0cnVlIHx8IHNjb3BlLnBhZ01pblJhbmdlIDwgMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IHNjb3BlLnBhZ01pblJhbmdlO1xuICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IHNjb3BlLnBhZ01heFJhbmdlIC0gNTtcbiAgICAgICAgc2V0UGFnaW5hdGlvblJhbmdlcygpO1xuICAgICAgfTtcblxuICAgICAgc2V0UmVtYWluaW5nUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY29wZS5wYWdIaWRlTWF4UmFuZ2UgPT09IHRydWUgfHwgXG4gICAgICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA+IHNjb3BlLnBhZ2luYXRpb24ucGFnZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucGFnTWluUmFuZ2UgPSBzY29wZS5wYWdNYXhSYW5nZTtcbiAgICAgICAgc2NvcGUucGFnTWF4UmFuZ2UgPSBzY29wZS5wYWdNaW5SYW5nZSArIDU7XG4gICAgICAgIGlmIChzY29wZS5wYWdNYXhSYW5nZSA+PSBzY29wZS5wYWdpbmF0aW9uLnBhZ2VzKSB7XG4gICAgICAgICAgc2NvcGUucGFnTWF4UmFuZ2UgPSBzY29wZS5wYWdpbmF0aW9uLnBhZ2VzICsgMTtcbiAgICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IHNjb3BlLnBhZ01heFJhbmdlIC0gNSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUucGFnTWluUmFuZ2UgPSBzY29wZS5wYWdNYXhSYW5nZSAtIDU7XG4gICAgICAgIHNldFBhZ2luYXRpb25SYW5nZXMoKTtcbiAgICAgIH07XG5cbiAgICAgIHNldFBhZ2luYXRpb25SYW5nZXMgPSAgZnVuY3Rpb24gKCkge1xuICAgICAgICBzY29wZS5saXN0SXRlbXNQZXJQYWdlU2hvdyA9IFtdO1xuICAgICAgICBzY29wZS5wYWdNaW5SYW5nZSA9IHNjb3BlLnBhZ01pblJhbmdlID4gMCA/IHNjb3BlLnBhZ01pblJhbmdlIDogMTtcbiAgICAgICAgc2NvcGUucGFnTWF4UmFuZ2UgPSBzY29wZS5wYWdNaW5SYW5nZSArIDU7XG4gICAgICAgIGlmIChzY29wZS5wYWdNYXhSYW5nZSA+IHNjb3BlLnBhZ2luYXRpb24ucGFnZXMpIHtcbiAgICAgICAgICBzY29wZS5wYWdNYXhSYW5nZSA9IHNjb3BlLnBhZ2luYXRpb24ucGFnZXMgKyAxO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnBhZ0hpZGVNaW5SYW5nZSA9IHNjb3BlLnBhZ01pblJhbmdlIDw9IDE7XG4gICAgICAgIHNjb3BlLnBhZ0hpZGVNYXhSYW5nZSA9IHNjb3BlLnBhZ01heFJhbmdlID4gc2NvcGUucGFnaW5hdGlvbi5wYWdlcztcbiAgICAgICAgc2NvcGUuY2xhc3NQYWdlTWluUmFuZ2UgPSBzY29wZS5wYWdIaWRlTWluUmFuZ2UgPyAnZGlzYWJsZWQnIDogJyc7XG4gICAgICAgIHNjb3BlLmNsYXNzUGFnZU1heFJhbmdlID0gc2NvcGUucGFnSGlkZU1heFJhbmdlID8gJ2Rpc2FibGVkJyA6ICcnO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBzY29wZS5saXN0SXRlbXNQZXJQYWdlLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAoc2NvcGUucGFnaW5hdGlvbi5zaXplID4gc2NvcGUubGlzdEl0ZW1zUGVyUGFnZVtpXSkge1xuICAgICAgICAgICAgc2NvcGUubGlzdEl0ZW1zUGVyUGFnZVNob3cgPSBzY29wZS5saXN0SXRlbXNQZXJQYWdlLnNsaWNlKDAsIChpICsgMikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnJhbmdlUGFnZSA9ICRmaWx0ZXIoJ3JhbmdlJykoW10sIHNjb3BlLnBhZ01pblJhbmdlLCBzY29wZS5wYWdNYXhSYW5nZSk7XG5cbiAgICAgICAgaWYgKCF0YXN0eVRhYmxlLnN0YXJ0KSB7XG4gICAgICAgICAgLy8gUGFnaW5hdGlvbiBpdCdzIGNhbGxlZFxuICAgICAgICAgIHRhc3R5VGFibGUuaW5pdFRhYmxlKCdwYWdpbmF0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHNjb3BlLmNsYXNzUGFnaW5hdGlvbkNvdW50ID0gZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgIGlmIChjb3VudCA9PSBzY29wZS5wYWdpbmF0aW9uLmNvdW50KSB7XG4gICAgICAgICAgcmV0dXJuICdhY3RpdmUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH07XG5cbiAgICAgIHNjb3BlLmNsYXNzTnVtUGFnZSA9IGZ1bmN0aW9uIChudW1QYWdlKSB7XG4gICAgICAgIGlmIChudW1QYWdlID09IHNjb3BlLnBhZ2luYXRpb24ucGFnZSkge1xuICAgICAgICAgIHJldHVybiAnYWN0aXZlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBzY29wZS5wYWdlID0ge1xuICAgICAgICAnZ2V0JzogZ2V0UGFnZSxcbiAgICAgICAgJ3NldENvdW50Jzogc2V0Q291bnQsXG4gICAgICAgICdwcmV2aW91cyc6IHNldFByZXZpb3VzUmFuZ2UsXG4gICAgICAgICdyZW1haW5pbmcnOiBzZXRSZW1haW5pbmdSYW5nZVxuICAgICAgfTtcblxuICAgICAgdGFzdHlUYWJsZS4kc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigncGFnaW5hdGlvbicsIGZ1bmN0aW9uIHdhdGNoUGFnaW5hdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKXtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICAmJiAoKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkgfHwgIXRhc3R5VGFibGUuc3RhcnQpKSB7XG4gICAgICAgICAgc2NvcGUucGFnaW5hdGlvbiA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHNldFBhZ2luYXRpb25SYW5nZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSW5pdCBQYWdpbmF0aW9uXG4gICAgICBzY29wZS5wYWdlLnNldENvdW50KHNjb3BlLml0ZW1zUGVyUGFnZSk7XG4gICAgfVxuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIGZpbHRlclxuICogQG5hbWUgbmdUYXN0eS5maWx0ZXIuZmlsdGVyQ2FtZWxpemVcbiAqIEBmdW5jdGlvblxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuZmlsdGVyLmNhbWVsaXplJywgW10pXG4uZmlsdGVyKCdjYW1lbGl6ZScsIGZ1bmN0aW9uKCkge1xuICB2YXIgQ0FNRUxJWkVfUkVHRVggPSAvKD86XnxbLV8gXSkoXFx3KS9nO1xuICBcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgZmlyc3QpIHtcbiAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnLFxuICAgICAgICBmaXJzdExldHRlciA9IHR5cGVvZiBmaXJzdCA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6ICEhZmlyc3Q7XG4gICAgXG4gICAgaWYodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJyB8fCBcbiAgICAgICBpbnB1dCA9PT0gbnVsbCB8fCBcbiAgICAgICAoIWlzU3RyaW5nICYmIGlzTmFOKGlucHV0KSkgKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYoIWlzU3RyaW5nKXtcbiAgICAgIHJldHVybiAnJyArIGlucHV0O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gaW5wdXQudHJpbSgpIC8vIHJlbW92ZSB0cmFpbGluZyBzcGFjZXNcbiAgICAgIC5yZXBsYWNlKC8gKyg/PSApL2csJycpIC8vIHJlbW92ZSBtdWx0aXBsZSBXU1xuICAgICAgLnJlcGxhY2UoQ0FNRUxJWkVfUkVHRVgsIGZ1bmN0aW9uIChfLCBjaGFyYWN0ZXIsIHBvcykgeyAvLyBhY3R1YWwgY29udmVyc2lvblxuICAgICAgICBpZiAoY2hhcmFjdGVyICYmIChmaXJzdExldHRlciB8fCBwb3MgPiAwKSkge1xuICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIG5nVGFzdHkuZmlsdGVyLmNsZWFuRmllbGROYW1lXG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENhbGxpbmcgY2xlYW5GaWVsZE5hbWUgd2lsbCByZXBsYWNlIGFsbCBcbiAqIGVtcHR5IHNwYWNlIHdpdGggd2l0aCAtXG4gKlxuICogQGV4YW1wbGVcbiAgbmctYmluZD1cImtleSB8IGNsZWFuRmllbGROYW1lXCJcbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LmZpbHRlci5jbGVhbkZpZWxkTmFtZScsIFtdKVxuLmZpbHRlcignY2xlYW5GaWVsZE5hbWUnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bXmEtekEtWjAtOS1fLV0rL2csICctJyk7XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2MgZmlsdGVyXG4gKiBAbmFtZSBuZ1Rhc3R5LmZpbHRlci5maWx0ZXJJbnRcbiAqIEBmdW5jdGlvblxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuZmlsdGVyLmZpbHRlckludCcsIFtdKVxuLmZpbHRlcignZmlsdGVySW50JywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZigvXihcXC18XFwrKT8oWzAtOV0rfEluZmluaXR5KSQvLnRlc3QoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKGlucHV0KTtcbiAgICB9XG4gICAgcmV0dXJuIE5hTjtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIG5nVGFzdHkuZmlsdGVyLnJhbmdlXG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZSBhIGxpc3QgY29udGFpbmluZyBhcml0aG1ldGljIHByb2dyZXNzaW9ucy4gVGhlIGFyZ3VtZW50cyBtdXN0IFxuICogYmUgcGxhaW4gaW50ZWdlcnMuIElmIHRoZSBzdGVwIGFyZ3VtZW50IGlzIG9taXR0ZWQsIGl0IGRlZmF1bHRzIHRvIDEuIFxuICogSWYgdGhlIHN0YXJ0IGFyZ3VtZW50IGlzIG9taXR0ZWQsIGl0IGRlZmF1bHRzIHRvIDAuXG4gKlxuICogQGV4YW1wbGVcbiAgbmctcmVwZWF0PVwibiBpbiBbXSB8IHJhbmdlOjE6MzBcIlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5maWx0ZXIucmFuZ2UnLCBbJ25nVGFzdHkuZmlsdGVyLmZpbHRlckludCddKVxuLmZpbHRlcigncmFuZ2UnLCBmdW5jdGlvbigkZmlsdGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBzdGFydCA9ICRmaWx0ZXIoJ2ZpbHRlckludCcpKHN0YXJ0KTtcbiAgICBzdG9wID0gJGZpbHRlcignZmlsdGVySW50Jykoc3RvcCk7XG4gICAgc3RlcCA9ICRmaWx0ZXIoJ2ZpbHRlckludCcpKHN0ZXApO1xuICAgIGlmIChpc05hTihzdGFydCkpIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKGlzTmFOKHN0b3ApKSB7XG4gICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChpc05hTihzdGVwKSkge1xuICAgICAgc3RlcCA9IDE7XG4gICAgfVxuICAgIGlmICgoc3RlcCA+IDAgJiYgc3RhcnQgPj0gc3RvcCkgfHwgKHN0ZXAgPCAwICYmIHN0YXJ0IDw9IHN0b3ApKXtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBzdGVwID4gMCA/IGkgPCBzdG9wIDogaSA+IHN0b3A7IGkgKz0gc3RlcCl7XG4gICAgICBpbnB1dC5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQ7XG4gIH07XG59KTtcblxuLyoqXG4gKiBAYXV0aG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9ib2dkYW4tYWxleGFuZHJlc2N1LyAtIEBiYWx4XG4gKiBAbmdkb2MgZmlsdGVyXG4gKiBAbmFtZSBuZ1Rhc3R5LmZpbHRlci5zbHVnaWZ5XG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRyYW5zZm9ybSB0ZXh0IGludG8gYW4gYXNjaWkgc2x1ZyBieSByZXBsYWNpbmcgd2hpdGVzcGFjZXMsIGFjY2VudHVhdGVkLCBcbiAqIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCB0aGUgY29yZXNwb25kaW5nIGxhdGluIGNoYXJhY3RlciBvciBjb21wbGV0ZWx5IFxuICogcmVtb3ZpbmcgdGhlbSB3aGVuIG5vIGxhdGluIGVxdWl2YWxlbnQgaXMgZm91bmQuIFRoaXMgY2FuIGJlIHVzZWQgc2FmZWx5IHRvIFxuICogZ2VuZXJhdGUgdmFsaWQgVVJMcy5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuZmlsdGVyLnNsdWdpZnknLCBbXSlcbi5maWx0ZXIoJ3NsdWdpZnknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIG1ha2VTdHJpbmcgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiAnJyArIG9iamVjdDtcbiAgfTtcblxuICB2YXIgZnJvbSAgPSAnxIXDoMOhw6TDosOjw6XDpsSDxIfEjcSJxJnDqMOpw6vDqsSdxKXDrMOtw6/DrsS1xYLEvsWExYjDssOzw7bFkcO0w7XDsMO4xZvImcWhxZ3Fpcibxa3DucO6w7zFscO7w7HDv8O9w6fFvMW6xb4nLFxuICAgICAgdG8gICAgPSAnYWFhYWFhYWFhY2NjZWVlZWVnaGlpaWlqbGxubm9vb29vb29vc3Nzc3R0dXV1dXV1bnl5Y3p6eicsXG4gICAgICByZWdleCA9IG5ldyBSZWdFeHAoJ1snICsgZnJvbSArICddJywgJ2cnKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICAgIHN0ciA9IG1ha2VTdHJpbmcoc3RyKVxuICAgIC50b1N0cmluZygpIC8vIG1ha2Ugc3VyZSBpcyBhIHN0cmluZ1xuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uIChjKXtcbiAgICAgIHZhciBpbmRleCA9IGZyb20uaW5kZXhPZihjKTtcbiAgICAgIHJldHVybiB0by5jaGFyQXQoaW5kZXgpIHx8ICctJztcbiAgICB9KSAvLyBub3JtYWxpemUgc29tZSBmb3JlaWduIGNoYXJhY3RlcnNcbiAgICAucmVwbGFjZSgvW15cXHdcXC1cXHNdKy9nLCAnJykgLy8gcmVtb3ZlIHVud2FudGVkIGNoYXJhY3RlcnNcbiAgICAudHJpbSgpIC8vdHJpbSBzcGFjZXNcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpIC8vIHJlcGxhY2UgYW55IHNwYWNlIHdpdGggYSBkYXNoXG4gICAgLnJlcGxhY2UoL1xcLVxcLSsvZywgJy0nKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSBkYXNoZXNcbiAgICByZXR1cm4gc3RyO1xuICB9O1xufSk7XG4gIFxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgbmdUYXN0eS5zZXJ2aWNlLmJpbmRUb1xuICogQGRlc2NyaXB0aW9uXG4gKlxuICogU2V0IHVwICR3YXRjaGVzIGZvciBpc29sYXRlIHNjb3BlIGFuZCBjb250cm9sbGVyIGJpbmRpbmdzLiBUaGlzIHByb2Nlc3NcbiAqIG9ubHkgb2NjdXJzIGZvciBpc29sYXRlIHNjb3BlcyBhbmQgbmV3IHNjb3BlcyB3aXRoIGNvbnRyb2xsZXJBcy5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuc2VydmljZS5iaW5kVG8nLCBbXSlcbi5mYWN0b3J5KCdiaW5kVG8nLCBmdW5jdGlvbigkcGFyc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZU5hbWUsIHNjb3BlLCBhdHRycywgbmV3U2NvcGVOYW1lKSB7XG4gICAgdmFyIGxhc3RWYWx1ZSwgcGFyZW50R2V0LCBjb21wYXJlLCBwYXJlbnRTZXQsIFxuICAgIHBhcmVudFZhbHVlV2F0Y2gsIGlzb2xhdGVTY29wZU5hbWU7XG4gICAgaWYgKCFhdHRyc1tzY29wZU5hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhcmVudEdldCA9ICRwYXJzZShhdHRyc1tzY29wZU5hbWVdKTtcbiAgICBpZiAocGFyZW50R2V0LmxpdGVyYWwpIHtcbiAgICAgIGNvbXBhcmUgPSBhbmd1bGFyLmVxdWFscztcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGFyZSA9IGZ1bmN0aW9uKGEsYikgeyByZXR1cm4gYSA9PT0gYiB8fCAoYSAhPT0gYSAmJiBiICE9PSBiKTsgfTtcbiAgICB9XG4gICAgaWYgKG5ld1Njb3BlTmFtZSkge1xuICAgICAgaXNvbGF0ZVNjb3BlTmFtZSA9IG5ld1Njb3BlTmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNvbGF0ZVNjb3BlTmFtZSA9IHNjb3BlTmFtZTtcbiAgICB9XG4gICAgcGFyZW50U2V0ID0gcGFyZW50R2V0LmFzc2lnbiB8fCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlc2V0IHRoZSBjaGFuZ2UsIG9yIHdlIHdpbGwgdGhyb3cgdGhpcyBleGNlcHRpb24gb24gZXZlcnkgJGRpZ2VzdFxuICAgICAgbGFzdFZhbHVlID0gc2NvcGVbc2NvcGVOYW1lXSA9IHBhcmVudEdldChzY29wZU5hbWUpO1xuICAgICAgdGhyb3cgJ0V4cHJlc3Npb24gJyArIGF0dHJzW2F0dHJOYW1lXSArICcgaXMgbm9uLWFzc2lnbmFibGUhJztcbiAgICB9O1xuICAgIGxhc3RWYWx1ZSA9IHNjb3BlW2lzb2xhdGVTY29wZU5hbWVdID0gcGFyZW50R2V0KHNjb3BlLiRwYXJlbnQpO1xuICAgIHBhcmVudFZhbHVlV2F0Y2ggPSBmdW5jdGlvbiBwYXJlbnRWYWx1ZVdhdGNoKHBhcmVudFZhbHVlKSB7XG4gICAgICBpZiAoIWNvbXBhcmUocGFyZW50VmFsdWUsIHNjb3BlW2lzb2xhdGVTY29wZU5hbWVdKSkge1xuICAgICAgICAvLyB3ZSBhcmUgb3V0IG9mIHN5bmMgYW5kIG5lZWQgdG8gY29weVxuICAgICAgICBpZiAoIWNvbXBhcmUocGFyZW50VmFsdWUsIGxhc3RWYWx1ZSkpIHtcbiAgICAgICAgICAvLyBwYXJlbnQgY2hhbmdlZCBhbmQgaXQgaGFzIHByZWNlZGVuY2VcbiAgICAgICAgICBzY29wZVtpc29sYXRlU2NvcGVOYW1lXSA9IHBhcmVudFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHRoZSBwYXJlbnQgY2FuIGJlIGFzc2lnbmVkIHRoZW4gZG8gc29cbiAgICAgICAgICBwYXJlbnRTZXQoc2NvcGUuJHBhcmVudCwgcGFyZW50VmFsdWUgPSBzY29wZVtpc29sYXRlU2NvcGVOYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBsYXN0VmFsdWUgPSBwYXJlbnRWYWx1ZTtcbiAgICB9O1xuICAgIHBhcmVudFZhbHVlV2F0Y2guJHN0YXRlZnVsID0gdHJ1ZTtcbiAgICBzY29wZS4kcGFyZW50LiR3YXRjaCgkcGFyc2UoYXR0cnNbc2NvcGVOYW1lXSwgcGFyZW50VmFsdWVXYXRjaCksIG51bGwsIHBhcmVudEdldC5saXRlcmFsKTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSBuZ1Rhc3R5LnNlcnZpY2UuZGVib3VuY2VcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nVGFzdHkuc2VydmljZS5kZWJvdW5jZScsIFtdKVxuLmZhY3RvcnkoJ2RlYm91bmNlJywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIGFyZ3MsIGNvbnRleHQsIGRlYm91bmNlVGltZW91dCwgdGltZW91dDtcbiAgICBkZWJvdW5jZVRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZSAoKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSAkdGltZW91dChkZWJvdW5jZVRpbWVvdXQsIHdhaXQpO1xuICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIG5nVGFzdHkuc2VydmljZS5qb2luT2JqZWN0c1xuICogQGRlc2NyaXB0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5zZXJ2aWNlLmpvaW5PYmplY3RzJywgWyduZ1Rhc3R5LnNlcnZpY2Uuc2V0UHJvcGVydHknXSlcbi5mYWN0b3J5KCdqb2luT2JqZWN0cycsIGZ1bmN0aW9uKHNldFByb3BlcnR5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmpPbmUsIG9ialR3bywgbGlzdEtleU5vdEpvaW4pIHtcbiAgICBsaXN0S2V5Tm90Sm9pbiA9IGxpc3RLZXlOb3RKb2luIHx8IFtdO1xuICAgIGZvciAodmFyIGF0dHJuYW1lIGluIG9ialR3bykge1xuICAgICAgaWYgKGxpc3RLZXlOb3RKb2luLmluZGV4T2YoYXR0cm5hbWUpIDwgMCkge1xuICAgICAgICBzZXRQcm9wZXJ0eShvYmpPbmUsIG9ialR3bywgYXR0cm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqT25lO1xuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIG5nVGFzdHkuc2VydmljZS5zZXRQcm9wZXJ0eVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5zZXJ2aWNlLnNldFByb3BlcnR5JywgW10pXG4uZmFjdG9yeSgnc2V0UHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iak9uZSwgb2JqVHdvLCBhdHRybmFtZSkge1xuICAgIGlmICh0eXBlb2Ygb2JqVHdvW2F0dHJuYW1lXSAhPT0gJ3VuZGVmaW5lZCcgJiYgXG4gICAgICAgIG9ialR3b1thdHRybmFtZV0gIT09IG51bGwpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9ialR3b1thdHRybmFtZV0pKSB7XG4gICAgICAgIGlmIChvYmpUd29bYXR0cm5hbWVdLmxlbmd0aCkge1xuICAgICAgICAgIG9iak9uZVthdHRybmFtZV0gPSBvYmpUd29bYXR0cm5hbWVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpPbmVbYXR0cm5hbWVdID0gb2JqVHdvW2F0dHJuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iak9uZTtcbiAgfTtcbn0pO1xuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSBuZ1Rhc3R5LnNlcnZpY2UudGFzdHlVdGlsXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LnNlcnZpY2UudGFzdHlVdGlsJywgW1xuICAnbmdUYXN0eS5zZXJ2aWNlLmJpbmRUbycsXG4gICduZ1Rhc3R5LnNlcnZpY2UuZGVib3VuY2UnLFxuICAnbmdUYXN0eS5zZXJ2aWNlLnNldFByb3BlcnR5JyxcbiAgJ25nVGFzdHkuc2VydmljZS5qb2luT2JqZWN0cycsXG4gICduZ1Rhc3R5LnNlcnZpY2UudGhyb3R0bGUnLFxuICAnbmdUYXN0eS5zZXJ2aWNlLndlYlNvY2tldCdcbl0pXG4uZmFjdG9yeSgndGFzdHlVdGlsJywgZnVuY3Rpb24oZGVib3VuY2UsIHNldFByb3BlcnR5LCBqb2luT2JqZWN0cywgXG4gIGJpbmRUbywgd2ViU29ja2V0LCB0aHJvdHRsZSkge1xuICByZXR1cm4ge1xuICAgICdiaW5kVG8nOiBiaW5kVG8sXG4gICAgJ2RlYm91bmNlJzogZGVib3VuY2UsXG4gICAgJ3NldFByb3BlcnR5Jzogc2V0UHJvcGVydHksXG4gICAgJ2pvaW5PYmplY3RzJzogam9pbk9iamVjdHMsXG4gICAgJ3Rocm90dGxlJzogdGhyb3R0bGUsXG4gICAgJ3dlYlNvY2tldCc6IHdlYlNvY2tldFxuICB9O1xufSk7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIG5nVGFzdHkuc2VydmljZS50aHJvdHRsZVxuICogQGRlc2NyaXB0aW9uXG4gKiAjIHRocm90dGxlXG4gKiBGYWN0b3J5IGluIG5nVGFzdHkuXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Rhc3R5LnNlcnZpY2UudGhyb3R0bGUnLCBbXSlcbi5mYWN0b3J5KCd0aHJvdHRsZScsIGZ1bmN0aW9uICgkdGltZW91dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuLCB0aHJlc2hob2xkLCBzY29wZSkge1xuICAgIHRocmVzaGhvbGQgPSB0aHJlc2hob2xkIHx8IDI1MDtcbiAgICB2YXIgbGFzdCwgcHJvbWlzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGUgKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSBzY29wZSB8fCB0aGlzO1xuICAgICAgdmFyIG5vdyA9IERhdGUubm93KCksXG4gICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hob2xkKSB7XG4gICAgICAgIC8vIGhvbGQgb24gdG8gaXRcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHByb21pc2UpO1xuICAgICAgICBwcm9taXNlID0gJHRpbWVvdXQoZnVuY3Rpb24gdGhyb3R0bGVUaW1lb3V0ICgpIHtcbiAgICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCB0aHJlc2hob2xkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59KTtcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgbmdUYXN0eS5zZXJ2aWNlLndlYlNvY2tldFxuICogQGRlc2NyaXB0aW9uXG4gKiAjIHdlYlNvY2tldFxuICogRmFjdG9yeSBpbiBuZ1Rhc3R5LlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdUYXN0eS5zZXJ2aWNlLndlYlNvY2tldCcsIFtdKVxuLmZhY3RvcnkoJ3dlYlNvY2tldCcsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24odXJsKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFN0cmluZ1sxXSByZXByZXNlbnRpbmcgYSBiaW5hcnkgYmxvYlsyXSBmdW5jdGlvbiBcbiAgICAgKiBjb250YWluaW5nIHRoZSBXZWJTb2NrZXQgRmFjdG9yeSBBUEkuXG4gICAgICpcbiAgICAgKiBbMV06IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkwuY3JlYXRlT2JqZWN0VVJMXG4gICAgICogWzJdOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQmxvYlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gICBTdHJpbmcgY29udGFpbmluZyB0aGUgZW5jb2RlZCBzY3JpcHRcbiAgICAgKi9cbiAgICB2YXIgYmxvYlVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoWycoJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgV1NXb3JrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfd3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpemUgYSBuZXcgV2ViU29ja2V0IHVzaW5nXG4gICAgICAgICAqIHRoZSBwcm92aWRlZCBVUkwgcGFyYW1ldGVycy5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSAge3N0cmluZ30gdXJsIFRoZSBXZWJTb2NrZXQgVVJMXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgIF93cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTGlzdGVucyBmb3IgYW55IG1lc3NhZ2UgY29taW5nIGZyb20gdGhlIFdlYlNvY2tldFxuICAgICAgICAgKiBhbmQgc2VuZCBpdHMgY29udGVudCB0byB0aGUgbWFpbiBKUyB0aHJlYWQgdXNpbmcgcG9zdE1lc3NhZ2VbMV0uXG4gICAgICAgICAqXG4gICAgICAgICAqIFsxXTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dvcmtlci5wb3N0TWVzc2FnZVxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgICAgIHZhciBvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF93cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZW5kcyBkYXRhIHRvIHRoZSBXZWJTb2NrZXQuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGFcbiAgICAgICAgICovXG4gICAgICAgIHZhciBzZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIF93cy5zZW5kKGRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbiAgICAgICAgICBvbjogb24sXG4gICAgICAgICAgc2VuZDogc2VuZFxuICAgICAgICB9O1xuXG4gICAgICB9KSgpO1xuXG4gICAgICAvKipcbiAgICAgICAqIExpc3RlbnMgZm9yIGluY29taW5nIG1lc3NhZ2VzIGZyb20gdGhlIG1haW5cbiAgICAgICAqIEphdmFTY3JpcHQgVGhyZWFkLlxuICAgICAgICpcbiAgICAgICAqIFRoZSBjb21tYW5kcyBhbGxvd2VkIGFyZTpcbiAgICAgICAqXG4gICAgICAgKiB3c19uZXcgIH4+IENhbGxzIGluaXRpYWxpemUgb24gdGhlIFdlYiBTb2NrZXQgV29ya2VyXG4gICAgICAgKiB3c19vbiAgIH4+IFJlZ2lzdGVyIHRoZSBzdXBwbGllZCBjYWxsYmFja1xuICAgICAgICogd3Nfc2VuZCB+PiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHVuZGVybHlpbmcgV2ViU29ja2V0XG4gICAgICAgKiAgICAgICAgICAgIGVuY29kaW5nIGl0IGFzIGEgc3RyaW5nIChKU09OLnN0cmluZ2lmeSlcbiAgICAgICAqICAgICAgICAgICAgXG4gICAgICAgKi9cbiAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc3dpdGNoIChlLmRhdGEuY21kKSB7XG4gICAgICAgICAgY2FzZSAnd3NfbmV3JzpcbiAgICAgICAgICAgIFdTV29ya2VyLmluaXRpYWxpemUoZS5kYXRhLnVybCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3c19vbic6XG4gICAgICAgICAgICBXU1dvcmtlci5vbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd3Nfc2VuZCc6XG4gICAgICAgICAgICBXU1dvcmtlci5zZW5kKEpTT04uc3RyaW5naWZ5KGUuZGF0YS5kYXRhKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY29tbWFuZDogJyArIGUuZGF0YS5jbWQpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfS50b1N0cmluZygpLCAnKSgpJ10sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pKTtcbiAgICBcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBXZWJTb2NrZXQgV29ya2VyLCByZXZva2UgdGhlIFVSTCBzaW5jZVxuICAgIC8vIGl0J3Mgbm90IHVzZWZ1bCBhbnltb3JlLlxuICAgIHZhciBfd29ya2VyID0gbmV3IFdvcmtlcihibG9iVVJMKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuXG4gICAgLy8gVGVsbCB0aGUgV2ViU29ja2V0IFdvcmtlciB0byBpbml0IGEgbmV3IFdlYlNvY2tldFxuICAgIF93b3JrZXIucG9zdE1lc3NhZ2UoeyBjbWQ6ICd3c19uZXcnLCB1cmw6IHVybCB9KTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8qKlxuICAgICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYSBzcGVjaWZpYyBXb3JrZXIgZXZlbnQgbGlzdGVuZXIuXG4gICAgICAgKiBUaGVyZSBhcmUgdHdvIGRpZmZlcmVudCBldmVudHM6XG4gICAgICAgKlxuICAgICAgICogLSAnYWxsJyB+PiBzdWJzY3JpYmVzIHRvIGFsbCB3ZWJzb2NrZXQgbWVzc2FnZXNcbiAgICAgICAqIC0gJ3R5cGUnfj4gc3Vic2NyaWJlcyB0byBhbGwgd2Vic29ja2V0IG1lc3NhZ2VzIGNvbnRhaW5pbmdcbiAgICAgICAqICAgICAgICAgICAgYSBmaWVsZCBuYW1lZCAndHlwZScuXG4gICAgICAgKlxuICAgICAgICogRm9yIGV4YW1wbGUsIFdlYlNvY2tldHMgU2VydmVyIGV2ZW50cyBsaWtlIHRoaXMgb25lOlxuICAgICAgICpcbiAgICAgICAqIHtcbiAgICAgICAqICAgJ3R5cGUnOiAndHdlZXQnLFxuICAgICAgICogICAnZGF0YSc6IC4uLlxuICAgICAgICogfVxuICAgICAgICpcbiAgICAgICAqIGNhbiBiZSBoYW5kbGVkIGluIHRoZSBmb2xsb3dpbmcgd2F5OlxuICAgICAgICpcbiAgICAgICAqICB3cy5vbigndHdpdHRlcicsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAqICAgICAgLi4uXG4gICAgICAgKiAgfSk7XG4gICAgICAgKiAgXG4gICAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgZXZlbnQgVGhlIGV2ZW50IG5hbWVcbiAgICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYiAgICBDYWxsYmFjayB3aXRoIG91dHB1dCBkYXRhIChmaXJzdCBwYXJhbSlcbiAgICAgICAqL1xuICAgICAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYikge1xuICAgICAgICBfd29ya2VyLnBvc3RNZXNzYWdlKHsgY21kOiAnd3Nfb24nIH0pO1xuICAgICAgICBfd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGV2ZW50ID09PSAnYWxsJyB8fCBlLmRhdGEudHlwZSA9PT0gZXZlbnQpIHtcbiAgICAgICAgICAgIGNiKGUuZGF0YSk7XG4gICAgICAgICAgfSBcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiBTZW5kcyBkYXRhIHRvIHRoZSBXZWJTb2NrZXQuXG4gICAgICAgKiBcbiAgICAgICAqIEBwYXJhbSAge0FueX0gZGF0YVxuICAgICAgICovXG4gICAgICBzZW5kOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIF93b3JrZXIucG9zdE1lc3NhZ2UoeyBjbWQ6ICd3c19zZW5kJywgZGF0YTogZGF0YSB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
