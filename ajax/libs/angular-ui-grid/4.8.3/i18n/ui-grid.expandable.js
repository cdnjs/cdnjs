/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
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
  module.service('uiGridExpandableService', ['gridUtil', function (gridUtil) {
    var service = {
      initializeGrid: function (grid) {

        grid.expandable = {};
        grid.expandable.expandedAll = false;

        /**
         *  @ngdoc boolean
         *  @name enableOnDblClickExpand
         *  @propertyOf  ui.grid.expandable.api:GridOptions
         *  @description Defaults to true.
         *  @example
         *  <pre>
         *    $scope.gridOptions = {
         *      onDblClickExpand: false
         *    }
         *  </pre>
         */
        grid.options.enableOnDblClickExpand = grid.options.enableOnDblClickExpand !== false;
        /**
         *  @ngdoc boolean
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
        if ( grid.options.enableExpandable && !grid.options.expandableRowTemplate ) {
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
               * @name rowExpandedBeforeStateChanged
               * @eventOf  ui.grid.expandable.api:PublicApi
               * @description raised when row is expanding or collapsing
               * <pre>
               *      gridApi.expandable.on.rowExpandedBeforeStateChanged(scope,function(row, event) {})
               * </pre>
               * @param {scope} scope the application scope
               * @param {GridRow} row the row that was expanded
               * @param {Event} evt object if raised from an event
               */
              rowExpandedBeforeStateChanged: function(scope, row, evt) {},

              /**
               * @ngdoc event
               * @name rowExpandedStateChanged
               * @eventOf  ui.grid.expandable.api:PublicApi
               * @description raised when row expanded or collapsed
               * <pre>
               *      gridApi.expandable.on.rowExpandedStateChanged(scope,function(row, event) {})
               * </pre>
               * @param {scope} scope the application scope
               * @param {GridRow} row the row that was expanded
               * @param {Event} evt object if raised from an event
               */
              rowExpandedStateChanged: function (scope, row, evt) {},

              /**
               * @ngdoc event
               * @name rowExpandedRendered
               * @eventOf  ui.grid.expandable.api:PublicApi
               * @description raised when expanded row is rendered
               * <pre>
               *      gridApi.expandable.on.rowExpandedRendered(scope,function(row, event) {})
               * </pre>
               * @param {scope} scope the application scope
               * @param {GridRow} row the row that was expanded
               * @param {Event} evt object if raised from an event
               */
              rowExpandedRendered: function (scope, row, evt) {}
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
               *      gridApi.expandable.toggleRowExpansion(rowEntity, event);
               * </pre>
               * @param {object} rowEntity the data entity for the row you want to expand
               * @param {Event} [e] event (if exist)
               */
              toggleRowExpansion: function (rowEntity, e) {
                var row = grid.getRow(rowEntity);

                if (row !== null) {
                  service.toggleRowExpansion(grid, row, e);
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

      /**
       *
       * @param grid
       * @param row
       * @param {Event} [e] event (if exist)
       */
      toggleRowExpansion: function (grid, row, e) {
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
        if (angular.isUndefined(row.expandedRowHeight)) {
          row.expandedRowHeight = grid.options.expandableRowHeight;
        }

        if (row.isExpanded) {
          row.height = row.grid.options.rowHeight + row.expandedRowHeight;
          grid.expandable.expandedAll = service.getExpandedRows(grid).length === grid.rows.length;
        }
        else {
          row.height = row.grid.options.rowHeight;
          grid.expandable.expandedAll = false;
        }
        grid.api.expandable.raise.rowExpandedStateChanged(row, e);

        // fire event on render complete
        function _tWatcher() {
          if (row.expandedRendered) {
            grid.api.expandable.raise.rowExpandedRendered(row, e);
          }
          else {
            window.setTimeout(_tWatcher, 1e2);
          }
        }
        _tWatcher();
      },

      expandAllRows: function(grid) {
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
                  width: uiGridCtrl.grid.options.expandableRowHeaderWidth || 30
                };

                expandableRowHeaderColDef.cellTemplate = $templateCache.get('ui-grid/expandableRowHeader');
                expandableRowHeaderColDef.headerCellTemplate = $templateCache.get('ui-grid/expandableTopRowHeader');
                uiGridCtrl.grid.addRowHeaderColumn(expandableRowHeaderColDef, -90);
              }
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {}
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGrid
   *  @description stacks on the uiGrid directive to register child grid with parent row when child is created
   */
  module.directive('uiGrid',
    function () {
      return {
        replace: true,
        priority: 599,
        require: '^uiGrid',
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {

              uiGridCtrl.grid.api.core.on.renderingComplete($scope, function() {
                // if a parent grid row is on the scope, then add the parentRow property to this childGrid
                if ($scope.row && $scope.row.grid && $scope.row.grid.options
                  && $scope.row.grid.options.enableExpandable) {

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

                  // todo: adjust height on parent row when child grid height changes. we need some sort of gridHeightChanged event
                 // uiGridCtrl.grid.core.on.canvasHeightChanged($scope, function(oldHeight, newHeight) {
                 //   uiGridCtrl.grid.parentRow = newHeight;
                 // });
                }
              });
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {}
          };
        }
      };
    });

  /**
   *  @ngdoc directive
   *  @name ui.grid.expandable.directive:uiGridExpandableRow
   *  @description directive to render the Row template on Expand
   */
  module.directive('uiGridExpandableRow',
  ['uiGridExpandableService', '$compile', 'uiGridConstants','gridUtil',
    function (uiGridExpandableService, $compile, uiGridConstants, gridUtil) {

      return {
        replace: false,
        priority: 0,
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm) {
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

                  expandedRowElement = $compile(expandedRowElement)($scope);
                  $elm.append(expandedRowElement);
                  $scope.row.element = $elm;
                  $scope.row.expandedRendered = true;
              });
            },

            post: function ($scope, $elm) {
              $scope.row.element = $elm;
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
      function () {
        return {
          priority: -200,
          scope: false,
          compile: function () {
            return {
              pre: function ($scope, $elm) {
                if (!$scope.grid.options.enableExpandable) {
                  return;
                }

                $scope.expandableRow = {};

                $scope.expandableRow.shouldRenderExpand = function () {
                  return $scope.colContainer.name === 'body'
                    && $scope.grid.options.enableExpandable !== false
                    && $scope.row.isExpanded
                    && (!$scope.grid.isScrollingVertically || $scope.row.expandedRendered);
                };

                $scope.expandableRow.shouldRenderFiller = function () {
                  return $scope.row.isExpanded
                    && (
                      $scope.colContainer.name !== 'body'
                      || ($scope.grid.isScrollingVertically && !$scope.row.expandedRendered));
                };

                if ($scope.grid.options.enableOnDblClickExpand) {
                  $elm.on('dblclick', function (event) {
                    // if necessary, it is possible for everyone to stop the processing of a single click OR
                    // Inside the Config in the output agent to enter a line:
                    // event.stopPropagation()
                    $scope.grid.api.expandable.toggleRowExpansion($scope.row.entity, event);
                  });
                }
              },
              post: function ($scope, $elm, $attrs, controllers) {}
            };
          }
        };
      });

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
          compile: function ($elm) {

             // todo: this adds ng-if watchers to each row even if the grid is not using expandable directive
             //      or options.enableExpandable == false
             //      The alternative is to compile the template and append to each row in a uiGridRow directive

            var rowRepeatDiv = angular.element($elm.children().children()[0]),
              expandedRowFillerElement = $templateCache.get('ui-grid/expandableScrollFiller'),
              expandedRowElement = $templateCache.get('ui-grid/expandableRow');

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

angular.module('ui.grid.expandable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/expandableRow',
    "<div ui-grid-expandable-row ng-if=\"expandableRow.shouldRenderExpand()\" class=\"expandableRow\" style=\"float:left; margin-top: 1px; margin-bottom: 1px\" ng-style=\"{width: (grid.renderContainers.body.getCanvasWidth()) + 'px', height: row.expandedRowHeight + 'px'}\"></div>"
  );


  $templateCache.put('ui-grid/expandableRowHeader',
    "<div class=\"ui-grid-row-header-cell ui-grid-expandable-buttons-cell\"><div class=\"ui-grid-cell-contents\"><i class=\"clickable\" ng-if=\"!(row.groupHeader==true || row.entity.subGridOptions.disableRowExpandable)\" ng-class=\"{ 'ui-grid-icon-plus-squared' : !row.isExpanded, 'ui-grid-icon-minus-squared' : row.isExpanded }\" ng-click=\"grid.api.expandable.toggleRowExpansion(row.entity, $event)\"></i></div></div>"
  );


  $templateCache.put('ui-grid/expandableScrollFiller',
    "<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller: true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\">&nbsp;</div>"
  );


  $templateCache.put('ui-grid/expandableTopRowHeader',
    "<div class=\"ui-grid-row-header-cell ui-grid-expandable-buttons-cell\"><div class=\"ui-grid-cell-contents\"><span class=\"ui-grid-cell-empty\" ng-if=\"!grid.options.showExpandAllButton\"></span> <button type=\"button\" class=\"ui-grid-icon-button clickable\" ng-if=\"grid.options.showExpandAllButton\" ng-class=\"{ 'ui-grid-icon-plus-squared' : !grid.expandable.expandedAll, 'ui-grid-icon-minus-squared' : grid.expandable.expandedAll }\" ng-click=\"grid.api.expandable.toggleAllRows()\"></button></div></div>"
  );

}]);
