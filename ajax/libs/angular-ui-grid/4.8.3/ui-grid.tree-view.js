/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.treeView
   * @description
   *
   * # ui.grid.treeView
   *
   * <div class="alert alert-warning" role="alert"><strong>Beta</strong> This feature is ready for testing, but it either hasn't seen a lot of use or has some known bugs.</div>
   *
   * This module provides a tree view of the data that it is provided, with nodes in that
   * tree and leaves.  Unlike grouping, the tree is an inherent property of the data and must
   * be provided with your data array.
   *
   * Design information:
   * -------------------
   *
   * TreeView uses treeBase for the underlying functionality, and is a very thin wrapper around
   * that logic.  Most of the design information has now moved to treebase.
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.treeView"></div>
   */

  var module = angular.module('ui.grid.treeView', ['ui.grid', 'ui.grid.treeBase']);

  /**
   *  @ngdoc object
   *  @name ui.grid.treeView.constant:uiGridTreeViewConstants
   *
   *  @description constants available in treeView module, this includes
   *  all the constants declared in the treeBase module (these are manually copied
   *  as there isn't an easy way to include constants in another constants file, and
   *  we don't want to make users include treeBase)
   *
   */
  module.constant('uiGridTreeViewConstants', {
    featureName: "treeView",
    rowHeaderColName: 'treeBaseRowHeaderCol',
    EXPANDED: 'expanded',
    COLLAPSED: 'collapsed',
    aggregation: {
      COUNT: 'count',
      SUM: 'sum',
      MAX: 'max',
      MIN: 'min',
      AVG: 'avg'
    }
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.treeView.service:uiGridTreeViewService
   *
   *  @description Services for treeView features
   */
  module.service('uiGridTreeViewService', ['$q', 'uiGridTreeViewConstants', 'uiGridTreeBaseConstants', 'uiGridTreeBaseService', 'gridUtil', 'GridRow', 'gridClassFactory', 'i18nService', 'uiGridConstants',
  function ($q, uiGridTreeViewConstants, uiGridTreeBaseConstants, uiGridTreeBaseService, gridUtil, GridRow, gridClassFactory, i18nService, uiGridConstants) {

    var service = {

      initializeGrid: function (grid, $scope) {
        uiGridTreeBaseService.initializeGrid( grid, $scope );

        /**
         *  @ngdoc object
         *  @name ui.grid.treeView.grid:treeView
         *
         *  @description Grid properties and functions added for treeView
         */
        grid.treeView = {};

        grid.registerRowsProcessor(service.adjustSorting, 60);

        /**
         *  @ngdoc object
         *  @name ui.grid.treeView.api:PublicApi
         *
         *  @description Public Api for treeView feature
         */
        var publicApi = {
          events: {
            treeView: {
            }
          },
          methods: {
            treeView: {
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
         *  @name ui.grid.treeView.api:GridOptions
         *
         *  @description GridOptions for treeView feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         *
         *  Many tree options are set on treeBase, make sure to look at that feature in
         *  conjunction with these options.
         */

        /**
         *  @ngdoc object
         *  @name enableTreeView
         *  @propertyOf  ui.grid.treeView.api:GridOptions
         *  @description Enable row tree view for entire grid.
         *  <br/>Defaults to true
         */
        gridOptions.enableTreeView = gridOptions.enableTreeView !== false;

      },


      /**
       * @ngdoc function
       * @name adjustSorting
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Trees cannot be sorted the same as flat lists of rows -
       * trees are sorted recursively within each level - so the children of each
       * node are sorted, but not the full set of rows.
       *
       * To achieve this, we suppress the normal sorting by setting ignoreSort on
       * each of the sort columns.  When the treeBase rowsProcessor runs it will then
       * unignore these, and will perform a recursive sort against the tree that it builds.
       *
       * @param {array} renderableRows the rows that we need to pass on through
       * @returns {array} renderableRows that we passed on through
       */
      adjustSorting: function( renderableRows ) {
        var grid = this;

        grid.columns.forEach( function( column ) {
          if ( column.sort ) {
            column.sort.ignoreSort = true;
          }
        });

        return renderableRows;
      }
    };

    return service;
  }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.treeView.directive:uiGridTreeView
   *  @element div
   *  @restrict A
   *
   *  @description Adds treeView features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.treeView']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.columnDefs = [
        {name: 'name', enableCellEdit: true},
        {name: 'title', enableCellEdit: true}
      ];

      $scope.gridOptions = { columnDefs: $scope.columnDefs, data: $scope.data };
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="gridOptions" ui-grid-tree-view></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridTreeView', ['uiGridTreeViewConstants', 'uiGridTreeViewService', '$templateCache',
  function (uiGridTreeViewConstants, uiGridTreeViewService, $templateCache) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            if (uiGridCtrl.grid.options.enableTreeView !== false) {
              uiGridTreeViewService.initializeGrid(uiGridCtrl.grid, $scope);
            }
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {

          }
        };
      }
    };
  }]);
})();
