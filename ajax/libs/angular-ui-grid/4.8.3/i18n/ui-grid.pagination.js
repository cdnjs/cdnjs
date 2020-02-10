/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.pagination
   *
   * @description
   *
   * # ui.grid.pagination
   *
   * <div class="alert alert-warning" role="alert"><strong>Alpha</strong> This feature is in development. There will almost certainly be breaking api changes, or there are major outstanding bugs.</div>
   *
   * This module provides pagination support to ui-grid
   */
  var module = angular.module('ui.grid.pagination', ['ng', 'ui.grid']);

  /**
   * @ngdoc service
   * @name ui.grid.pagination.service:uiGridPaginationService
   *
   * @description Service for the pagination feature
   */
  module.service('uiGridPaginationService', ['gridUtil',
    function (gridUtil) {
      var service = {
        /**
         * @ngdoc method
         * @name initializeGrid
         * @methodOf ui.grid.pagination.service:uiGridPaginationService
         * @description Attaches the service to a certain grid
         * @param {Grid} grid The grid we want to work with
         */
        initializeGrid: function (grid) {
          service.defaultGridOptions(grid.options);

          /**
          * @ngdoc object
          * @name ui.grid.pagination.api:PublicAPI
          *
          * @description Public API for the pagination feature
          */
          var publicApi = {
            events: {
              pagination: {
              /**
               * @ngdoc event
               * @name paginationChanged
               * @eventOf ui.grid.pagination.api:PublicAPI
               * @description This event fires when the pageSize or currentPage changes
               * @param {int} currentPage requested page number
               * @param {int} pageSize requested page size
               */
                paginationChanged: function (currentPage, pageSize) { }
              }
            },
            methods: {
              pagination: {
                /**
                 * @ngdoc method
                 * @name getPage
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Returns the number of the current page
                 */
                getPage: function () {
                  return grid.options.enablePagination ? grid.options.paginationCurrentPage : null;
                },
                /**
                 * @ngdoc method
                 * @name getFirstRowIndex
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Returns the index of the first row of the current page.
                 */
                getFirstRowIndex: function () {
                  if (grid.options.useCustomPagination) {
                    return grid.options.paginationPageSizes.reduce(function(result, size, index) {
                      return index < grid.options.paginationCurrentPage - 1 ? result + size : result;
                    }, 0);
                  }
                  return ((grid.options.paginationCurrentPage - 1) * grid.options.paginationPageSize);
                },
                /**
                 * @ngdoc method
                 * @name getLastRowIndex
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Returns the index of the last row of the current page.
                 */
                getLastRowIndex: function () {
                  if (grid.options.useCustomPagination) {
                    return publicApi.methods.pagination.getFirstRowIndex() + grid.options.paginationPageSizes[grid.options.paginationCurrentPage - 1] - 1;
                  }
                  return Math.min(grid.options.paginationCurrentPage * grid.options.paginationPageSize, grid.options.totalItems) - 1;
                },
                /**
                 * @ngdoc method
                 * @name getTotalPages
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Returns the total number of pages
                 */
                getTotalPages: function () {
                  if (!grid.options.enablePagination) {
                    return null;
                  }

                  if (grid.options.useCustomPagination) {
                    return grid.options.paginationPageSizes.length;
                  }

                  return (grid.options.totalItems === 0) ? 1 : Math.ceil(grid.options.totalItems / grid.options.paginationPageSize);
                },
                /**
                 * @ngdoc method
                 * @name nextPage
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Moves to the next page, if possible
                 */
                nextPage: function () {
                  if (!grid.options.enablePagination) {
                    return;
                  }

                  if (grid.options.totalItems > 0) {
                    grid.options.paginationCurrentPage = Math.min(
                      grid.options.paginationCurrentPage + 1,
                      publicApi.methods.pagination.getTotalPages()
                    );
                  }
                  else {
                    grid.options.paginationCurrentPage++;
                  }
                },
                /**
                 * @ngdoc method
                 * @name previousPage
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Moves to the previous page, if we're not on the first page
                 */
                previousPage: function () {
                  if (!grid.options.enablePagination) {
                    return;
                  }

                  grid.options.paginationCurrentPage = Math.max(grid.options.paginationCurrentPage - 1, 1);
                },
                /**
                 * @ngdoc method
                 * @name seek
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Moves to the requested page
                 * @param {int} page The number of the page that should be displayed
                 */
                seek: function (page) {
                  if (!grid.options.enablePagination) {
                    return;
                  }
                  if (!angular.isNumber(page) || page < 1) {
                    throw 'Invalid page number: ' + page;
                  }

                  grid.options.paginationCurrentPage = Math.min(page, publicApi.methods.pagination.getTotalPages());
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);
          grid.api.registerMethodsFromObject(publicApi.methods);

          var processPagination = function( renderableRows ) {
            if (grid.options.useExternalPagination || !grid.options.enablePagination) {
              return renderableRows;
            }
            // client side pagination
            var pageSize = parseInt(grid.options.paginationPageSize, 10);
            var currentPage = parseInt(grid.options.paginationCurrentPage, 10);

            var visibleRows = renderableRows.filter(function (row) { return row.visible; });
            grid.options.totalItems = visibleRows.length;

            var firstRow = publicApi.methods.pagination.getFirstRowIndex();
            var lastRow  = publicApi.methods.pagination.getLastRowIndex();

            if (firstRow > visibleRows.length) {
              currentPage = grid.options.paginationCurrentPage = 1;
              firstRow = (currentPage - 1) * pageSize;
            }
            return visibleRows.slice(firstRow, lastRow + 1);
          };

          grid.registerRowsProcessor(processPagination, 900 );

        },
        defaultGridOptions: function (gridOptions) {
          /**
           * @ngdoc object
           * @name ui.grid.pagination.api:GridOptions
           *
           * @description GridOptions for the pagination feature, these are available to be
           * set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           * @ngdoc property
           * @name enablePagination
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Enables pagination.  Defaults to true.
           */
          gridOptions.enablePagination = gridOptions.enablePagination !== false;
          /**
           * @ngdoc property
           * @name enablePaginationControls
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Enables the paginator at the bottom of the grid. Turn this off if you want to implement your
           *              own controls outside the grid.
           */
          gridOptions.enablePaginationControls = gridOptions.enablePaginationControls !== false;
          /**
           * @ngdoc property
           * @name useExternalPagination
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Disables client side pagination. When true, handle the paginationChanged event and set data
           *              and totalItems.  Defaults to `false`
           */
          gridOptions.useExternalPagination = gridOptions.useExternalPagination === true;

          /**
           * @ngdoc property
           * @name useCustomPagination
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Disables client-side pagination. When true, handle the `paginationChanged` event and set `data`,
           *              `firstRowIndex`, `lastRowIndex`, and `totalItems`.  Defaults to `false`.
           */
          gridOptions.useCustomPagination = gridOptions.useCustomPagination === true;

          /**
           * @ngdoc property
           * @name totalItems
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Total number of items, set automatically when using client side pagination, but needs set by user
           *              for server side pagination
           */
          if (gridUtil.isNullOrUndefined(gridOptions.totalItems)) {
            gridOptions.totalItems = 0;
          }
          /**
           * @ngdoc property
           * @name paginationPageSizes
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Array of page sizes, defaults to `[250, 500, 1000]`
           */
          if (gridUtil.isNullOrUndefined(gridOptions.paginationPageSizes)) {
            gridOptions.paginationPageSizes = [250, 500, 1000];
          }
          /**
           * @ngdoc property
           * @name paginationPageSize
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Page size, defaults to the first item in paginationPageSizes, or 0 if paginationPageSizes is empty
           */
          if (gridUtil.isNullOrUndefined(gridOptions.paginationPageSize)) {
            if (gridOptions.paginationPageSizes.length > 0) {
              gridOptions.paginationPageSize = gridOptions.paginationPageSizes[0];
            }
            else {
              gridOptions.paginationPageSize = 0;
            }
          }
          /**
           * @ngdoc property
           * @name paginationCurrentPage
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Current page number, defaults to 1
           */
          if (gridUtil.isNullOrUndefined(gridOptions.paginationCurrentPage)) {
            gridOptions.paginationCurrentPage = 1;
          }

          /**
           * @ngdoc property
           * @name paginationTemplate
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description A custom template for the pager, defaults to `ui-grid/pagination`
           */
          if (gridUtil.isNullOrUndefined(gridOptions.paginationTemplate)) {
            gridOptions.paginationTemplate = 'ui-grid/pagination';
          }
        },
        /**
         * @ngdoc method
         * @methodOf ui.grid.pagination.service:uiGridPaginationService
         * @name uiGridPaginationService
         * @description  Raises paginationChanged and calls refresh for client side pagination
         * @param {Grid} grid the grid for which the pagination changed
         * @param {int} currentPage requested page number
         * @param {int} pageSize requested page size
         */
        onPaginationChanged: function (grid, currentPage, pageSize) {
          grid.api.pagination.raise.paginationChanged(currentPage, pageSize);
          if (!grid.options.useExternalPagination) {
            grid.queueGridRefresh(); // client side pagination
          }
        }
      };

      return service;
    }
  ]);
  /**
   *  @ngdoc directive
   *  @name ui.grid.pagination.directive:uiGridPagination
   *  @element div
   *  @restrict A
   *
   *  @description Adds pagination features to grid
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.pagination']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Alex', car: 'Toyota' },
        { name: 'Sam', car: 'Lexus' },
        { name: 'Joe', car: 'Dodge' },
        { name: 'Bob', car: 'Buick' },
        { name: 'Cindy', car: 'Ford' },
        { name: 'Brian', car: 'Audi' },
        { name: 'Malcom', car: 'Mercedes Benz' },
        { name: 'Dave', car: 'Ford' },
        { name: 'Stacey', car: 'Audi' },
        { name: 'Amy', car: 'Acura' },
        { name: 'Scott', car: 'Toyota' },
        { name: 'Ryan', car: 'BMW' },
      ];

      $scope.gridOptions = {
        data: 'data',
        paginationPageSizes: [5, 10, 25],
        paginationPageSize: 5,
        columnDefs: [
          {name: 'name'},
          {name: 'car'}
        ]
       }
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="gridOptions" ui-grid-pagination></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridPagination', ['gridUtil', 'uiGridPaginationService',
    function (gridUtil, uiGridPaginationService) {
      return {
        priority: -200,
        scope: false,
        require: 'uiGrid',
        link: {
          pre: function ($scope, $elm, $attr, uiGridCtrl) {
            uiGridPaginationService.initializeGrid(uiGridCtrl.grid);

            gridUtil.getTemplate(uiGridCtrl.grid.options.paginationTemplate)
              .then(function (contents) {
                var template = angular.element(contents);

                $elm.append(template);
                uiGridCtrl.innerCompile(template);
              });
          }
        }
      };
    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.pagination.directive:uiGridPager
   *  @element div
   *
   *  @description Panel for handling pagination
   */
  module.directive('uiGridPager', ['uiGridPaginationService', 'uiGridConstants', 'gridUtil', 'i18nService', 'i18nConstants',
    function (uiGridPaginationService, uiGridConstants, gridUtil, i18nService, i18nConstants) {
      return {
        priority: -200,
        scope: true,
        require: '^uiGrid',
        link: function ($scope, $elm, $attr, uiGridCtrl) {
          var defaultFocusElementSelector = '.ui-grid-pager-control-input';

          $scope.aria = i18nService.getSafeText('pagination.aria'); // Returns an object with all of the aria labels

          var updateLabels = function() {
            $scope.paginationApi = uiGridCtrl.grid.api.pagination;
            $scope.sizesLabel = i18nService.getSafeText('pagination.sizes');
            $scope.totalItemsLabel = i18nService.getSafeText('pagination.totalItems');
            $scope.paginationOf = i18nService.getSafeText('pagination.of');
            $scope.paginationThrough = i18nService.getSafeText('pagination.through');
          };

          updateLabels();

          $scope.$on(i18nConstants.UPDATE_EVENT, updateLabels);

          var options = uiGridCtrl.grid.options;

          uiGridCtrl.grid.renderContainers.body.registerViewportAdjuster(function (adjustment) {
            if (options.enablePaginationControls) {
              adjustment.height = adjustment.height - gridUtil.elementHeight($elm, "padding");
            }
            return adjustment;
          });

          var dataChangeDereg = uiGridCtrl.grid.registerDataChangeCallback(function (grid) {
            if (!grid.options.useExternalPagination) {
              grid.options.totalItems = grid.rows.length;
            }
          }, [uiGridConstants.dataChange.ROW]);

          $scope.$on('$destroy', dataChangeDereg);

          var deregP = $scope.$watch('grid.options.paginationCurrentPage + grid.options.paginationPageSize', function (newValues, oldValues) {
            if (newValues === oldValues || oldValues === undefined) {
              return;
            }

            if (!angular.isNumber(options.paginationCurrentPage) || options.paginationCurrentPage < 1) {
              options.paginationCurrentPage = 1;
              return;
            }

            if (options.totalItems > 0 && options.paginationCurrentPage > $scope.paginationApi.getTotalPages()) {
              options.paginationCurrentPage = $scope.paginationApi.getTotalPages();
              return;
            }

            uiGridPaginationService.onPaginationChanged($scope.grid, options.paginationCurrentPage, options.paginationPageSize);
          });

          $scope.$on('$destroy', function() {
            deregP();
          });

          $scope.cantPageForward = function () {
            if ($scope.paginationApi.getTotalPages()) {
              return $scope.cantPageToLast();
            }
            else {
              return options.data.length < 1;
            }
          };

          $scope.cantPageToLast = function () {
            var totalPages = $scope.paginationApi.getTotalPages();

            return !totalPages || options.paginationCurrentPage >= totalPages;
          };

          $scope.cantPageBackward = function () {
            return options.paginationCurrentPage <= 1;
          };

          var focusToInputIf = function(condition) {
            if (condition) {
              gridUtil.focus.bySelector($elm, defaultFocusElementSelector);
            }
          };

          // Takes care of setting focus to the middle element when focus is lost
          $scope.pageFirstPageClick = function () {
            $scope.paginationApi.seek(1);
            focusToInputIf($scope.cantPageBackward());
          };

          $scope.pagePreviousPageClick = function () {
            $scope.paginationApi.previousPage();
            focusToInputIf($scope.cantPageBackward());
          };

          $scope.pageNextPageClick = function () {
            $scope.paginationApi.nextPage();
            focusToInputIf($scope.cantPageForward());
          };

          $scope.pageLastPageClick = function () {
            $scope.paginationApi.seek($scope.paginationApi.getTotalPages());
            focusToInputIf($scope.cantPageToLast());
          };
        }
      };
    }
  ]);
})();

angular.module('ui.grid.pagination').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/pagination',
    "<div class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\"><div role=\"navigation\" class=\"ui-grid-pager-container\"><div class=\"ui-grid-pager-control\"><button type=\"button\" class=\"ui-grid-pager-first\" ui-grid-one-bind-title=\"aria.pageToFirst\" ui-grid-one-bind-aria-label=\"aria.pageToFirst\" ng-click=\"pageFirstPageClick()\" ng-disabled=\"cantPageBackward()\"><div ng-class=\"grid.isRTL() ? 'last-triangle' : 'first-triangle'\"><div ng-class=\"grid.isRTL() ? 'last-bar-rtl' : 'first-bar'\"></div></div></button> <button type=\"button\" class=\"ui-grid-pager-previous\" ui-grid-one-bind-title=\"aria.pageBack\" ui-grid-one-bind-aria-label=\"aria.pageBack\" ng-click=\"pagePreviousPageClick()\" ng-disabled=\"cantPageBackward()\"><div ng-class=\"grid.isRTL() ? 'last-triangle prev-triangle' : 'first-triangle prev-triangle'\"></div></button> <input type=\"number\" ui-grid-one-bind-title=\"aria.pageSelected\" ui-grid-one-bind-aria-label=\"aria.pageSelected\" class=\"ui-grid-pager-control-input\" ng-model=\"grid.options.paginationCurrentPage\" min=\"1\" max=\"{{ paginationApi.getTotalPages() }}\" step=\"1\" required> <span class=\"ui-grid-pager-max-pages-number\" ng-show=\"paginationApi.getTotalPages() > 0\"><abbr ui-grid-one-bind-title=\"paginationOf\">/ </abbr>{{ paginationApi.getTotalPages() }} </span><button type=\"button\" class=\"ui-grid-pager-next\" ui-grid-one-bind-title=\"aria.pageForward\" ui-grid-one-bind-aria-label=\"aria.pageForward\" ng-click=\"pageNextPageClick()\" ng-disabled=\"cantPageForward()\"><div ng-class=\"grid.isRTL() ? 'first-triangle next-triangle' : 'last-triangle next-triangle'\"></div></button> <button type=\"button\" class=\"ui-grid-pager-last\" ui-grid-one-bind-title=\"aria.pageToLast\" ui-grid-one-bind-aria-label=\"aria.pageToLast\" ng-click=\"pageLastPageClick()\" ng-disabled=\"cantPageToLast()\"><div ng-class=\"grid.isRTL() ? 'first-triangle' : 'last-triangle'\"><div ng-class=\"grid.isRTL() ? 'first-bar-rtl' : 'last-bar'\"></div></div></button></div><div class=\"ui-grid-pager-row-count-picker\" ng-if=\"grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination\"><select ui-grid-one-bind-aria-labelledby-grid=\"'items-per-page-label'\" ng-model=\"grid.options.paginationPageSize\" ng-options=\"o as o for o in grid.options.paginationPageSizes\"></select> <span ui-grid-one-bind-id-grid=\"'items-per-page-label'\" class=\"ui-grid-pager-row-count-label\">&nbsp;{{sizesLabel}}</span></div><span ng-if=\"grid.options.paginationPageSizes.length <= 1\" class=\"ui-grid-pager-row-count-label\">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class=\"ui-grid-pager-count-container\"><div class=\"ui-grid-pager-count\"><span ng-show=\"grid.options.totalItems > 0\">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title=\"paginationThrough\">- </abbr>{{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>"
  );

}]);
