/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.pinning
   * @description
   *
   * # ui.grid.pinning
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides column pinning to the end user via menu options in the column header
   *
   * <div doc-module-components="ui.grid.pinning"></div>
   */

  var module = angular.module('ui.grid.pinning', ['ui.grid']);

  module.constant('uiGridPinningConstants', {
    container: {
      LEFT: 'left',
      RIGHT: 'right',
      NONE: ''
    }
  });

  module.service('uiGridPinningService', ['gridUtil', 'GridRenderContainer', 'i18nService', 'uiGridPinningConstants', function (gridUtil, GridRenderContainer, i18nService, uiGridPinningConstants) {
    var service = {

      initializeGrid: function (grid) {
        service.defaultGridOptions(grid.options);

        // Register a column builder to add new menu items for pinning left and right
        grid.registerColumnBuilder(service.pinningColumnBuilder);

        /**
         *  @ngdoc object
         *  @name ui.grid.pinning.api:PublicApi
         *
         *  @description Public Api for pinning feature
         */
        var publicApi = {
          events: {
            pinning: {
              /**
               * @ngdoc event
               * @name columnPinned
               * @eventOf ui.grid.pinning.api:PublicApi
               * @description raised when column pin state has changed
               * <pre>
               *   gridApi.pinning.on.columnPinned(scope, function(colDef){})
               * </pre>
               * @param {object} colDef the column that was changed
               * @param {string} container the render container the column is in ('left', 'right', '')
               */
              columnPinned: function(colDef, container) {
              }
            }
          },
          methods: {
            pinning: {
              /**
               * @ngdoc function
               * @name pinColumn
               * @methodOf ui.grid.pinning.api:PublicApi
               * @description pin column left, right, or none
               * <pre>
               *   gridApi.pinning.pinColumn(col, uiGridPinningConstants.container.LEFT)
               * </pre>
               * @param {gridColumn} col the column being pinned
               * @param {string} container one of the recognised types
               * from uiGridPinningConstants
               */
              pinColumn: function(col, container) {
                service.pinColumn(grid, col, container);
              }
            }
          }
        };

        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);
      },

      defaultGridOptions: function (gridOptions) {
        // default option to true unless it was explicitly set to false
        /**
         *  @ngdoc object
         *  @name ui.grid.pinning.api:GridOptions
         *
         *  @description GridOptions for pinning feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */

        /**
         *  @ngdoc object
         *  @name enablePinning
         *  @propertyOf  ui.grid.pinning.api:GridOptions
         *  @description Enable pinning for the entire grid.
         *  <br/>Defaults to true
         */
        gridOptions.enablePinning = gridOptions.enablePinning !== false;
        /**
         *  @ngdoc object
         *  @name hidePinLeft
         *  @propertyOf  ui.grid.pinning.api:GridOptions
         *  @description Hide Pin Left for the entire grid.
         *  <br/>Defaults to false
         */
        gridOptions.hidePinLeft = gridOptions.enablePinning && gridOptions.hidePinLeft;
        /**
         *  @ngdoc object
         *  @name hidePinRight
         *  @propertyOf  ui.grid.pinning.api:GridOptions
         *  @description Hide Pin Right pinning for the entire grid.
         *  <br/>Defaults to false
         */
        gridOptions.hidePinRight = gridOptions.enablePinning && gridOptions.hidePinRight;
      },

      pinningColumnBuilder: function (colDef, col, gridOptions) {
        // default to true unless gridOptions or colDef is explicitly false

        /**
         *  @ngdoc object
         *  @name ui.grid.pinning.api:ColumnDef
         *
         *  @description ColumnDef for pinning feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
         */

        /**
         *  @ngdoc object
         *  @name enablePinning
         *  @propertyOf  ui.grid.pinning.api:ColumnDef
         *  @description Enable pinning for the individual column.
         *  <br/>Defaults to true
         */
        colDef.enablePinning = colDef.enablePinning === undefined ? gridOptions.enablePinning : colDef.enablePinning;
        /**
         *  @ngdoc object
         *  @name hidePinLeft
         *  @propertyOf  ui.grid.pinning.api:ColumnDef
         *  @description Hide Pin Left for the individual column.
         *  <br/>Defaults to false
         */
        colDef.hidePinLeft = colDef.hidePinLeft === undefined ? gridOptions.hidePinLeft : colDef.hidePinLeft;
        /**
         *  @ngdoc object
         *  @name hidePinRight
         *  @propertyOf  ui.grid.pinning.api:ColumnDef
         *  @description Hide Pin Right for the individual column.
         *  <br/>Defaults to false
         */
        colDef.hidePinRight = colDef.hidePinRight === undefined ? gridOptions.hidePinRight : colDef.hidePinRight;

        /**
         *  @ngdoc object
         *  @name pinnedLeft
         *  @propertyOf  ui.grid.pinning.api:ColumnDef
         *  @description Column is pinned left when grid is rendered
         *  <br/>Defaults to false
         */

        /**
         *  @ngdoc object
         *  @name pinnedRight
         *  @propertyOf  ui.grid.pinning.api:ColumnDef
         *  @description Column is pinned right when grid is rendered
         *  <br/>Defaults to false
         */
        if (colDef.pinnedLeft) {
          col.renderContainer = 'left';
          col.grid.createLeftContainer();
        }
        else if (colDef.pinnedRight) {
          col.renderContainer = 'right';
          col.grid.createRightContainer();
        }

        if (!colDef.enablePinning) {
          return;
        }

        var pinColumnLeftAction = {
          name: 'ui.grid.pinning.pinLeft',
          title: i18nService.get().pinning.pinLeft,
          icon: 'ui-grid-icon-left-open',
          shown: function () {
            return typeof(this.context.col.renderContainer) === 'undefined' || !this.context.col.renderContainer || this.context.col.renderContainer !== 'left';
          },
          action: function () {
            service.pinColumn(this.context.col.grid, this.context.col, uiGridPinningConstants.container.LEFT);
          }
        };

        var pinColumnRightAction = {
          name: 'ui.grid.pinning.pinRight',
          title: i18nService.get().pinning.pinRight,
          icon: 'ui-grid-icon-right-open',
          shown: function () {
            return typeof(this.context.col.renderContainer) === 'undefined' || !this.context.col.renderContainer || this.context.col.renderContainer !== 'right';
          },
          action: function () {
            service.pinColumn(this.context.col.grid, this.context.col, uiGridPinningConstants.container.RIGHT);
          }
        };

        var removePinAction = {
          name: 'ui.grid.pinning.unpin',
          title: i18nService.get().pinning.unpin,
          icon: 'ui-grid-icon-cancel',
          shown: function () {
            return typeof(this.context.col.renderContainer) !== 'undefined' && this.context.col.renderContainer !== null && this.context.col.renderContainer !== 'body';
          },
          action: function () {
            service.pinColumn(this.context.col.grid, this.context.col, uiGridPinningConstants.container.NONE);
          }
        };

        // Skip from menu if hidePinLeft or hidePinRight is true
        if (!colDef.hidePinLeft && !gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.pinLeft')) {
          col.menuItems.push(pinColumnLeftAction);
        }
        if (!colDef.hidePinRight && !gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.pinRight')) {
          col.menuItems.push(pinColumnRightAction);
        }
        if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.unpin')) {
          col.menuItems.push(removePinAction);
        }
      },

      pinColumn: function(grid, col, container) {
        if (container === uiGridPinningConstants.container.NONE) {
          col.renderContainer = null;
          col.colDef.pinnedLeft = col.colDef.pinnedRight = false;
        }
        else {
          col.renderContainer = container;
          if (container === uiGridPinningConstants.container.LEFT) {
            grid.createLeftContainer();
          }
          else if (container === uiGridPinningConstants.container.RIGHT) {
            grid.createRightContainer();
          }
        }

        grid.refresh()
        .then(function() {
          grid.api.pinning.raise.columnPinned( col.colDef, container );
        });
      }
    };

    return service;
  }]);

  module.directive('uiGridPinning', ['gridUtil', 'uiGridPinningService',
    function (gridUtil, uiGridPinningService) {
      return {
        require: 'uiGrid',
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              uiGridPinningService.initializeGrid(uiGridCtrl.grid);
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {
            }
          };
        }
      };
    }]);
})();
