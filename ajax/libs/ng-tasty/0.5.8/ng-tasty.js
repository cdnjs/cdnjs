/*
 * ng-tasty
 * https://github.com/Zizzamia/ng-tasty

 * Version: 0.5.8 - 2015-08-05
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
    'sortOrder': undefined
  },
  query: {
    'page': 'page',
    'count': 'count',
    'sortBy': 'sort-by',
    'sortOrder': 'sort-order'
  },
  bindOnce: true,
  loadOnInit: false,
  iconUp: 'fa fa-sort-up',
  iconDown: 'fa fa-sort-down',
  bootstrapIcon: false,
  templateHeadUrl: 'template/table/head.html',
  templateUrl: 'template/table/pagination.html',
  listItemsPerPage: [5, 25, 50, 100],
  itemsPerPage: 5,
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
    'buildClientResourceCount': 0
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
      $scope.params['page'] = 1;
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
    if (initNow || updateFrom === 'params') {
      var paramsObj = angular.copy($scope.params);
      paramsObj.filters = $scope.filters;
      $scope.resourceCallback($scope.url, paramsObj)
      .then(function (resource) {
        setDirectivesValues(resource);
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
