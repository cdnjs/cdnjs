/*!
 * ui-grid - v4.4.4 - 2018-03-23
 * Copyright (c) 2018 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.expandable
   * @description
   *
   * # ui.grid.expandable
   *
   * <div class="alert alert-warning" role="alert"><strong>Alpha</strong> This feature is in development. There will almost certainly be breaking api changes, or there are major outstanding bugs.</div>
   *
   * This module provides the ability to create subgrids with the ability to expand a row
   * to show the subgrid.
   *
   * <div doc-module-components="ui.grid.expandable"></div>
   */
  var module = angular.module('ui.grid.expandable', ['ui.grid']);

  /**
   *  @ngdoc service
   *  @name ui.grid.expandable.service:uiGridExpandableService
   *
   *  @description Services for the expandable grid
   */
  module.service('uiGridExpandableService', ['gridUtil', '$compile', function (gridUtil, $compile) {
    var service = {
      initializeGrid: function (grid) {

        grid.expandable = {};
        grid.expandable.expandedAll = false;

        /**
         *  @ngdoc object
         *  @name enableExpandable
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Whether or not to use expandable feature, allows you to turn off expandable on specific grids
         *  within your application, or in specific modes on _this_ grid. Defaults to true.
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      enableExpandable: false
         *    }
         *  </pre>
         */
        grid.options.enableExpandable = grid.options.enableExpandable !== false;

        /**
         *  @ngdoc object
         *  @name showExpandAllButton
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Whether or not to display the expand all button, allows you to hide expand all button on specific grids
         *  within your application, or in specific modes on _this_ grid. Defaults to true.
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      showExpandAllButton: false
         *    }
         *  </pre>
         */
        grid.options.showExpandAllButton = grid.options.showExpandAllButton !== false;

        /**
         *  @ngdoc object
         *  @name expandableRowHeight
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Height in pixels of the expanded subgrid.  Defaults to
         *  150
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      expandableRowHeight: 150
         *    }
         *  </pre>
         */
        grid.options.expandableRowHeight = grid.options.expandableRowHeight || 150;

        /**
         *  @ngdoc object
         *  @name expandableRowHeaderWidth
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Width in pixels of the expandable column. Defaults to 40
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      expandableRowHeaderWidth: 40
         *    }
         *  </pre>
         */
        grid.options.expandableRowHeaderWidth = grid.options.expandableRowHeaderWidth || 40;

        /**
         *  @ngdoc object
         *  @name expandableRowTemplate
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Mandatory. The template for your expanded row
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      expandableRowTemplate: 'expandableRowTemplate.html'
         *    }
         *  </pre>
         */
        if ( grid.options.enableExpandable && !grid.options.expandableRowTemplate ){
          gridUtil.logError( 'You have not set the expandableRowTemplate, disabling expandable module' );
          grid.options.enableExpandable = false;
        }

        /**
         *  @ngdoc object
         *  @name ui.grid.expandable.api:PublicApi
         *
         *  @description Public Api for expandable feature
         */
        /**
         *  @ngdoc object
         *  @name ui.grid.expandable.api:GridRow
         *
         *  @description Additional properties added to GridRow when using the expandable module
         */
        /**
         *  @ngdoc object
         *  @name ui.grid.expandable.api:GridOptions
         *
         *  @description Options for configuring the expandable feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */
        var publicApi = {
          events: {
            expandable: {
              /**
               * @ngdoc event
               * @name rowExpandedStateChanged
               * @eventOf  ui.grid.expandable.api:PublicApi
               * @description raised when row expanded or collapsed
               * <pre>
               *      gridApi.expandable.on.rowExpandedStateChanged(scope,function(row){})
               * </pre>
               * @param {GridRow} row the row that was expanded
               */
              rowExpandedBeforeStateChanged: function(scope,row){
              },
              rowExpandedStateChanged: function (scope, row) {
              }
            }
          },

          methods: {
            expandable: {
              /**
               * @ngdoc method
               * @name toggleRowExpansion
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Toggle a specific row
               * <pre>
               *      gridApi.expandable.toggleRowExpansion(rowEntity);
               * </pre>
               * @param {object} rowEntity the data entity for the row you want to expand
               */
              toggleRowExpansion: function (rowEntity) {
                var row = grid.getRow(rowEntity);
                if (row !== null) {
                  service.toggleRowExpansion(grid, row);
                }
              },

              /**
               * @ngdoc method
               * @name expandAllRows
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Expand all subgrids.
               * <pre>
               *      gridApi.expandable.expandAllRows();
               * </pre>
               */
              expandAllRows: function() {
                service.expandAllRows(grid);
              },

              /**
               * @ngdoc method
               * @name collapseAllRows
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Collapse all subgrids.
               * <pre>
               *      gridApi.expandable.collapseAllRows();
               * </pre>
               */
              collapseAllRows: function() {
                service.collapseAllRows(grid);
              },

              /**
               * @ngdoc method
               * @name toggleAllRows
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Toggle all subgrids.
               * <pre>
               *      gridApi.expandable.toggleAllRows();
               * </pre>
               */
              toggleAllRows: function() {
                service.toggleAllRows(grid);
              },
              /**
               * @ngdoc function
               * @name expandRow
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Expand the data row
               * @param {object} rowEntity gridOptions.data[] array instance
               */
              expandRow: function (rowEntity) {
                var row = grid.getRow(rowEntity);
                if (row !== null && !row.isExpanded) {
                  service.toggleRowExpansion(grid, row);
                }
              },
              /**
               * @ngdoc function
               * @name collapseRow
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description Collapse the data row
               * @param {object} rowEntity gridOptions.data[] array instance
               */
              collapseRow: function (rowEntity) {
                var row = grid.getRow(rowEntity);
                if (row !== null && row.isExpanded) {
                  service.toggleRowExpansion(grid, row);
                }
              },
              /**
               * @ngdoc function
               * @name getExpandedRows
               * @methodOf  ui.grid.expandable.api:PublicApi
               * @description returns all expandedRow's entity references
               */
              getExpandedRows: function () {
                return service.getExpandedRows(grid).map(function (gridRow) {
                  return gridRow.entity;
                });
              }
            }
          }
        };
        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);
      },

      toggleRowExpansion: function (grid, row) {
        // trigger the "before change" event. Can change row height dynamically this way.
        grid.api.expandable.raise.rowExpandedBeforeStateChanged(row);
        /**
         *  @ngdoc object
         *  @name isExpanded
         *  @propertyOf  ui.grid.expandable.api:GridRow
         *  @description Whether or not the row is currently expanded.
         *  @example
         *  <pre>
         *    $scope.api.expandable.on.rowExpandedStateChanged($scope, function (row) {
         *      if (row.isExpanded) {
         *        //...
         *      }
         *    });
         *  </pre>
         */
        row.isExpanded = !row.isExpanded;
        if (angular.isUndefined(row.expandedRowHeight)){
          row.expandedRowHeight = grid.options.expandableRowHeight;
        }

        if (row.isExpanded) {
          row.height = row.grid.options.rowHeight + row.expandedRowHeight;
        }
        else {
          row.height = row.grid.options.rowHeight;
          grid.expandable.expandedAll = false;
        }
        grid.api.expandable.raise.rowExpandedStateChanged(row);
      },

      expandAllRows: function(grid, $scope) {
        grid.renderContainers.body.visibleRowCache.forEach( function(row) {
          if (!row.isExpanded && !(row.entity.subGridOptions && row.entity.subGridOptions.disableRowExpandable)) {
            service.toggleRowExpansion(grid, row);
          }
        });
        grid.expandable.expandedAll = true;
        grid.queueGridRefresh();
      },

      collapseAllRows: function(grid) {
        grid.renderContainers.body.visibleRowCache.forEach( function(row) {
          if (row.isExpanded) {
            service.toggleRowExpansion(grid, row);
          }
        });
        grid.expandable.expandedAll = false;
        grid.queueGridRefresh();
      },

      toggleAllRows: function(grid) {
        if (grid.expandable.expandedAll) {
          service.collapseAllRows(grid);
        }
        else {
          service.expandAllRows(grid);
        }
      },

      getExpandedRows: function (grid) {
        return grid.rows.filter(function (row) {
          return row.isExpanded;
        });
      }
    };
    return service;
  }]);

  /**
   *  @ngdoc object
   *  @name enableExpandableRowHeader
   *  @propertyOf  ui.grid.expandable.api:GridOptions
   *  @description Show a rowHeader to provide the expandable buttons.  If set to false then implies
   *  you're going to use a custom method for expanding and collapsing the subgrids. Defaults to true.
   *  @example
   *  <pre>
   *    $scope.gridOptions = {
   *      enableExpandableRowHeader: false
   *    }
   *  </pre>
   */
  module.directive('uiGridExpandable', ['uiGridExpandableService', '$templateCache',
    function (uiGridExpandableService, $templateCache) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              uiGridExpandableService.initializeGrid(uiGridCtrl.grid);

              if (!uiGridCtrl.grid.options.enableExpandable) {
                return;
              }

              if (uiGridCtrl.grid.options.enableExpandableRowHeader !== false ) {
                var expandableRowHeaderColDef = {
                  name: 'expandableButtons',
                  displayName: '',
                  exporterSuppressExport: true,
                  enableColumnResizing: false,
                  enableColumnMenu: false,
                  width: uiGridCtrl.grid.options.expandableRowHeaderWidth || 40
                };
                expandableRowHeaderColDef.cellTemplate = $templateCache.get('ui-grid/expandableRowHeader');
                expandableRowHeaderColDef.headerCellTemplate = $templateCache.get('ui-grid/expandableTopRowHeader');
                uiGridCtrl.grid.addRowHeaderColumn(expandableRowHeaderColDef, -90);
              }

            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {
            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGrid
   *  @description stacks on the uiGrid directive to register child grid with parent row when child is created
   */
  module.directive('uiGrid', ['uiGridExpandableService', '$templateCache',
    function (uiGridExpandableService, $templateCache) {
      return {
        replace: true,
        priority: 599,
        require: '^uiGrid',
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {

              uiGridCtrl.grid.api.core.on.renderingComplete($scope, function() {
                //if a parent grid row is on the scope, then add the parentRow property to this childGrid
                if ($scope.row && $scope.row.grid && $scope.row.grid.options && $scope.row.grid.options.enableExpandable) {

                  /**
                   *  @ngdoc directive
                   *  @name ui.grid.expandable.class:Grid
                   *  @description Additional Grid properties added by expandable module
                   */

                  /**
                   *  @ngdoc object
                   *  @name parentRow
                   *  @propertyOf ui.grid.expandable.class:Grid
                   *  @description reference to the expanded parent row that owns this grid
                   */
                  uiGridCtrl.grid.parentRow = $scope.row;

                  //todo: adjust height on parent row when child grid height changes. we need some sort of gridHeightChanged event
                 // uiGridCtrl.grid.core.on.canvasHeightChanged($scope, function(oldHeight, newHeight) {
                 //   uiGridCtrl.grid.parentRow = newHeight;
                 // });
                }

              });
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {

            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGridExpandableRow
   *  @description directive to render the expandable row template
   */
  module.directive('uiGridExpandableRow',
  ['uiGridExpandableService', '$timeout', '$compile', 'uiGridConstants','gridUtil','$interval', '$log',
    function (uiGridExpandableService, $timeout, $compile, uiGridConstants, gridUtil, $interval, $log) {

      return {
        replace: false,
        priority: 0,
        scope: false,

        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              gridUtil.getTemplate($scope.grid.options.expandableRowTemplate).then(
                function (template) {
                  if ($scope.grid.options.expandableRowScope) {
                    /**
                     *  @ngdoc object
                     *  @name expandableRowScope
                     *  @propertyOf  ui.grid.expandable.api:GridOptions
                     *  @description  Variables of object expandableScope will be available in the scope of the expanded subgrid
                     *  @example
                     *  <pre>
                     *    $scope.gridOptions = {
                     *      expandableRowScope: expandableScope
                     *    }
                     *  </pre>
                     */
                    var expandableRowScope = $scope.grid.options.expandableRowScope;
                    for (var property in expandableRowScope) {
                      if (expandableRowScope.hasOwnProperty(property)) {
                        $scope[property] = expandableRowScope[property];
                      }
                    }
                  }
                  var expandedRowElement = angular.element(template);
                  $elm.append(expandedRowElement);
                  expandedRowElement = $compile(expandedRowElement)($scope);
                  $scope.row.expandedRendered = true;
              });
            },

            post: function ($scope, $elm, $attrs, uiGridCtrl) {
              $scope.$on('$destroy', function() {
                $scope.row.expandedRendered = false;
              });
            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGridRow
   *  @description stacks on the uiGridRow directive to add support for expandable rows
   */
  module.directive('uiGridRow',
    ['$compile', 'gridUtil', '$templateCache',
      function ($compile, gridUtil, $templateCache) {
        return {
          priority: -200,
          scope: false,
          compile: function ($elm, $attrs) {
            return {
              pre: function ($scope, $elm, $attrs, controllers) {

                if (!$scope.grid.options.enableExpandable) {
                  return;
                }

                $scope.expandableRow = {};

                $scope.expandableRow.shouldRenderExpand = function () {
                  var ret = $scope.colContainer.name === 'body' &&  $scope.grid.options.enableExpandable !== false && $scope.row.isExpanded && (!$scope.grid.isScrollingVertically || $scope.row.expandedRendered);
                  return ret;
                };

                $scope.expandableRow.shouldRenderFiller = function () {
                  var ret = $scope.row.isExpanded && ( $scope.colContainer.name !== 'body' || ($scope.grid.isScrollingVertically && !$scope.row.expandedRendered));
                  return ret;
                };

 /*
  * Commented out @PaulL1.  This has no purpose that I can see, and causes #2964.  If this code needs to be reinstated for some
  * reason it needs to use drawnWidth, not width, and needs to check column visibility.  It should really use render container
  * visible column cache also instead of checking column.renderContainer.
                  function updateRowContainerWidth() {
                      var grid = $scope.grid;
                      var colWidth = 0;
                      grid.columns.forEach( function (column) {
                          if (column.renderContainer === 'left') {
                            colWidth += column.width;
                          }
                      });
                      colWidth = Math.floor(colWidth);
                      return '.grid' + grid.id + ' .ui-grid-pinned-container-' + $scope.colContainer.name + ', .grid' + grid.id +
                          ' .ui-grid-pinned-container-' + $scope.colContainer.name + ' .ui-grid-render-container-' + $scope.colContainer.name +
                          ' .ui-grid-viewport .ui-grid-canvas .ui-grid-row { width: ' + colWidth + 'px; }';
                  }

                  if ($scope.colContainer.name === 'left') {
                      $scope.grid.registerStyleComputation({
                          priority: 15,
                          func: updateRowContainerWidth
                      });
                  }*/

              },
              post: function ($scope, $elm, $attrs, controllers) {
              }
            };
          }
        };
      }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGridViewport
   *  @description stacks on the uiGridViewport directive to append the expandable row html elements to the
   *  default gridRow template
   */
  module.directive('uiGridViewport',
    ['$compile', 'gridUtil', '$templateCache',
      function ($compile, gridUtil, $templateCache) {
        return {
          priority: -200,
          scope: false,
          compile: function ($elm, $attrs) {

             //todo: this adds ng-if watchers to each row even if the grid is not using expandable directive
             //      or options.enableExpandable == false
             //      The alternative is to compile the template and append to each row in a uiGridRow directive

            var rowRepeatDiv = angular.element($elm.children().children()[0]);
            var expandedRowFillerElement = $templateCache.get('ui-grid/expandableScrollFiller');
            var expandedRowElement = $templateCache.get('ui-grid/expandableRow');
            rowRepeatDiv.append(expandedRowElement);
            rowRepeatDiv.append(expandedRowFillerElement);
            return {
              pre: function ($scope, $elm, $attrs, controllers) {
              },
              post: function ($scope, $elm, $attrs, controllers) {
              }
            };
          }
        };
      }]);

})();
