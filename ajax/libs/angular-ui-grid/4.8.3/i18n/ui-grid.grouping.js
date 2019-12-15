/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.grouping
   * @description
   *
   * # ui.grid.grouping
   *
   * <div class="alert alert-warning" role="alert"><strong>Beta</strong> This feature is ready for testing, but it either hasn't seen a lot of use or has some known bugs.</div>
   *
   * This module provides grouping of rows based on the data in them, similar
   * in concept to excel grouping.  You can group multiple columns, resulting in
   * nested grouping.
   *
   * In concept this feature is similar to sorting + grid footer/aggregation, it
   * sorts the data based on the grouped columns, then creates group rows that
   * reflect a break in the data.  Each of those group rows can have aggregations for
   * the data within that group.
   *
   * This feature leverages treeBase to provide the tree functionality itself,
   * the key thing this feature does therefore is to set treeLevels on the rows
   * and insert the group headers.
   *
   * Design information:
   * -------------------
   *
   * Each column will get new menu items - group by, and aggregate by.  Group by
   * will cause this column to be sorted (if not already), and will move this column
   * to the front of the sorted columns (i.e. grouped columns take precedence over
   * sorted columns).  It will respect the sort order already set if there is one,
   * and it will allow the sorting logic to change that sort order, it just forces
   * the column to the front of the sorting.  You can group by multiple columns, the
   * logic will add this column to the sorting after any already grouped columns.
   *
   * Once a grouping is defined, grouping logic is added to the rowsProcessors.  This
   * will process the rows, identifying a break in the data value, and inserting a grouping row.
   * Grouping rows have specific attributes on them:
   *
   *  - internalRow = true: tells us that this isn't a real row, so we can ignore it
   *    from any processing that it looking at core data rows.  This is used by the core
   *    logic (or will be one day), as it's not grouping specific
   *  - groupHeader = true: tells us this is a groupHeader.  This is used by the grouping logic
   *    to know if this is a groupHeader row or not
   *
   * Since the logic is baked into the rowsProcessors, it should get triggered whenever
   * row order or filtering or anything like that is changed.  In order to avoid the row instantiation
   * time, and to preserve state across invocations, we hold a cache of the rows that we created
   * last time, and we use them again this time if we can.
   *
   * By default rows are collapsed, which means all data rows have their visible property
   * set to false, and only level 0 group rows are set to visible.
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.grouping"></div>
   */

  var module = angular.module('ui.grid.grouping', ['ui.grid', 'ui.grid.treeBase']);

  /**
   *  @ngdoc object
   *  @name ui.grid.grouping.constant:uiGridGroupingConstants
   *
   *  @description constants available in grouping module, this includes
   *  all the constants declared in the treeBase module (these are manually copied
   *  as there isn't an easy way to include constants in another constants file, and
   *  we don't want to make users include treeBase)
   *
   */
  module.constant('uiGridGroupingConstants', {
    featureName: "grouping",
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
   *  @name ui.grid.grouping.service:uiGridGroupingService
   *
   *  @description Services for grouping features
   */
  module.service('uiGridGroupingService', ['$q', 'uiGridGroupingConstants', 'gridUtil', 'rowSorter', 'GridRow', 'gridClassFactory', 'i18nService', 'uiGridConstants', 'uiGridTreeBaseService',
  function ($q, uiGridGroupingConstants, gridUtil, rowSorter, GridRow, gridClassFactory, i18nService, uiGridConstants, uiGridTreeBaseService) {
    var service = {
      initializeGrid: function (grid, $scope) {
        uiGridTreeBaseService.initializeGrid( grid, $scope );

        // add feature namespace and any properties to grid for needed
        /**
         *  @ngdoc object
         *  @name ui.grid.grouping.grid:grouping
         *
         *  @description Grid properties and functions added for grouping
         */
        grid.grouping = {};

        /**
         *  @ngdoc property
         *  @propertyOf ui.grid.grouping.grid:grouping
         *  @name groupHeaderCache
         *
         *  @description Cache that holds the group header rows we created last time, we'll
         *  reuse these next time, not least because they hold our expanded states.
         *
         *  We need to take care with these that they don't become a memory leak, we
         *  create a new cache each time using the values from the old cache.  This works
         *  so long as we're creating group rows for invisible rows as well.
         *
         *  The cache is a nested hash, indexed on the value we grouped by.  So if we
         *  grouped by gender then age, we'd maybe have something like:
         *  ```
         *    {
         *      male: {
         *        row: <pointer to the old row>,
         *        children: {
         *          22: { row: <pointer to the old row> },
         *          31: { row: <pointer to the old row> }
         *      },
         *      female: {
         *        row: <pointer to the old row>,
         *        children: {
         *          28: { row: <pointer to the old row> },
         *          55: { row: <pointer to the old row> }
         *      }
         *    }
         *  ```
         *
         *  We create new rows for any missing rows, this means that they come in as collapsed.
         *
         */
        grid.grouping.groupHeaderCache = {};

        service.defaultGridOptions(grid.options);

        grid.registerRowsProcessor(service.groupRows, 400);

        grid.registerColumnBuilder( service.groupingColumnBuilder);

        grid.registerColumnsProcessor(service.groupingColumnProcessor, 400);

        /**
         *  @ngdoc object
         *  @name ui.grid.grouping.api:PublicApi
         *
         *  @description Public Api for grouping feature
         */
        var publicApi = {
          events: {
            grouping: {
              /**
               * @ngdoc event
               * @eventOf ui.grid.grouping.api:PublicApi
               * @name aggregationChanged
               * @description raised whenever aggregation is changed, added or removed from a column
               *
               * <pre>
               *      gridApi.grouping.on.aggregationChanged(scope,function(col) {})
               * </pre>
               * @param {GridColumn} col the column on which aggregation changed. The aggregation
               * type is available as `col.treeAggregation.type`
               */
              aggregationChanged: {},
              /**
               * @ngdoc event
               * @eventOf ui.grid.grouping.api:PublicApi
               * @name groupingChanged
               * @description raised whenever the grouped columns changes
               *
               * <pre>
               *      gridApi.grouping.on.groupingChanged(scope,function(col) {})
               * </pre>
               * @param {GridColumn} col the column on which grouping changed. The new grouping is
               * available as `col.grouping`
               */
              groupingChanged: {}
            }
          },
          methods: {
            grouping: {
              /**
               * @ngdoc function
               * @name getGrouping
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Get the grouping configuration for this grid,
               * used by the saveState feature.  Adds expandedState to the information
               * provided by the internal getGrouping, and removes any aggregations that have a source
               * of grouping (i.e. will be automatically reapplied when we regroup the column)
               * Returned grouping is an object
               *   `{ grouping: groupArray, treeAggregations: aggregateArray, expandedState: hash }`
               * where grouping contains an array of objects:
               *   `{ field: column.field, colName: column.name, groupPriority: column.grouping.groupPriority }`
               * and aggregations contains an array of objects:
               *   `{ field: column.field, colName: column.name, aggregation: column.grouping.aggregation }`
               * and expandedState is a hash of the currently expanded nodes
               *
               * The groupArray will be sorted by groupPriority.
               *
               * @param {boolean} getExpanded whether or not to return the expanded state
               * @returns {object} grouping configuration
               */
              getGrouping: function ( getExpanded ) {
                var grouping = service.getGrouping(grid);

                grouping.grouping.forEach( function( group ) {
                  group.colName = group.col.name;
                  delete group.col;
                });

                grouping.aggregations.forEach( function( aggregation ) {
                  aggregation.colName = aggregation.col.name;
                  delete aggregation.col;
                });

                grouping.aggregations = grouping.aggregations.filter( function( aggregation ) {
                  return !aggregation.aggregation.source || aggregation.aggregation.source !== 'grouping';
                });

                if ( getExpanded ) {
                  grouping.rowExpandedStates = service.getRowExpandedStates( grid.grouping.groupingHeaderCache );
                }

                return grouping;
              },

              /**
               * @ngdoc function
               * @name setGrouping
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Set the grouping configuration for this grid,
               * used by the saveState feature, but can also be used by any
               * user to specify a combined grouping and aggregation configuration
               * @param {object} config the config you want to apply, in the format
               * provided out by getGrouping
               */
              setGrouping: function ( config ) {
                service.setGrouping(grid, config);
              },

              /**
               * @ngdoc function
               * @name groupColumn
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Adds this column to the existing grouping, at the end of the priority order.
               * If the column doesn't have a sort, adds one, by default ASC
               *
               * This column will move to the left of any non-group columns, the
               * move is handled in a columnProcessor, so gets called as part of refresh
               *
               * @param {string} columnName the name of the column we want to group
               */
              groupColumn: function(columnName) {
                var column = grid.getColumn(columnName);

                service.groupColumn(grid, column);
              },

              /**
               * @ngdoc function
               * @name ungroupColumn
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Removes the groupPriority from this column.  If the
               * column was previously aggregated the aggregation will come back.
               * The sort will remain.
               *
               * This column will move to the right of any other group columns, the
               * move is handled in a columnProcessor, so gets called as part of refresh
               *
               * @param {string} columnName the name of the column we want to ungroup
               */
              ungroupColumn: function(columnName) {
                var column = grid.getColumn(columnName);

                service.ungroupColumn(grid, column);
              },

              /**
               * @ngdoc function
               * @name clearGrouping
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Clear any grouped columns and any aggregations.  Doesn't remove sorting,
               * as we don't know whether that sorting was added by grouping or was there beforehand
               *
               */
              clearGrouping: function() {
                service.clearGrouping(grid);
              },

              /**
               * @ngdoc function
               * @name aggregateColumn
               * @methodOf  ui.grid.grouping.api:PublicApi
               * @description Sets the aggregation type on a column, if the
               * column is currently grouped then it removes the grouping first.
               * If the aggregationDef is null then will result in the aggregation
               * being removed
               *
               * @param {string} columnName the column we want to aggregate
               * @param {string|function} aggregationDef one of the recognised types
               * from uiGridGroupingConstants or a custom aggregation function.
               * @param {string} aggregationLabel (optional) The label to use for this aggregation.
               */
              aggregateColumn: function(columnName, aggregationDef, aggregationLabel) {
                var column = grid.getColumn(columnName);

                service.aggregateColumn(grid, column, aggregationDef, aggregationLabel);
              }
            }
          }
        };

        grid.api.registerEventsFromObject(publicApi.events);

        grid.api.registerMethodsFromObject(publicApi.methods);

        grid.api.core.on.sortChanged($scope, service.tidyPriorities);
      },

      defaultGridOptions: function (gridOptions) {
        // default option to true unless it was explicitly set to false
        /**
         *  @ngdoc object
         *  @name ui.grid.grouping.api:GridOptions
         *
         *  @description GridOptions for grouping feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */

        /**
         *  @ngdoc object
         *  @name enableGrouping
         *  @propertyOf  ui.grid.grouping.api:GridOptions
         *  @description Enable row grouping for entire grid.
         *  <br/>Defaults to true
         */
        gridOptions.enableGrouping = gridOptions.enableGrouping !== false;

        /**
         *  @ngdoc object
         *  @name groupingShowCounts
         *  @propertyOf  ui.grid.grouping.api:GridOptions
         *  @description shows counts on the groupHeader rows. Not that if you are using a cellFilter or a
         *  sortingAlgorithm which relies on a specific format or data type, showing counts may cause that
         *  to break, since the group header rows will always be a string with groupingShowCounts enabled.
         *  <br/>Defaults to true except on columns of types 'date' and 'object'
         */
        gridOptions.groupingShowCounts = gridOptions.groupingShowCounts !== false;

        /**
         *  @ngdoc object
         *  @name groupingNullLabel
         *  @propertyOf  ui.grid.grouping.api:GridOptions
         *  @description The string to use for the grouping header row label on rows which contain a null or undefined value in the grouped column.
         *  <br/>Defaults to "Null"
         */
        gridOptions.groupingNullLabel = typeof(gridOptions.groupingNullLabel) === 'undefined' ? 'Null' : gridOptions.groupingNullLabel;

        /**
         *  @ngdoc object
         *  @name enableGroupHeaderSelection
         *  @propertyOf  ui.grid.grouping.api:GridOptions
         *  @description Allows group header rows to be selected.
         *  <br/>Defaults to false
         */
        gridOptions.enableGroupHeaderSelection = gridOptions.enableGroupHeaderSelection === true;
      },


      /**
       * @ngdoc function
       * @name groupingColumnBuilder
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Sets the grouping defaults based on the columnDefs
       *
       * @param {object} colDef columnDef we're basing on
       * @param {GridColumn} col the column we're to update
       * @param {object} gridOptions the options we should use
       * @returns {promise} promise for the builder - actually we do it all inline so it's immediately resolved
       */
      groupingColumnBuilder: function (colDef, col, gridOptions) {
        /**
         *  @ngdoc object
         *  @name ui.grid.grouping.api:ColumnDef
         *
         *  @description ColumnDef for grouping feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
         */

        /**
         *  @ngdoc object
         *  @name enableGrouping
         *  @propertyOf  ui.grid.grouping.api:ColumnDef
         *  @description Enable grouping on this column
         *  <br/>Defaults to true.
         */
        if (colDef.enableGrouping === false) {
          return;
        }

        /**
         *  @ngdoc object
         *  @name grouping
         *  @propertyOf  ui.grid.grouping.api:ColumnDef
         *  @description Set the grouping for a column.  Format is:
         *  ```
         *    {
         *      groupPriority: <number, starts at 0, if less than 0 or undefined then we're aggregating in this column>
         *    }
         *  ```
         *
         *  **Note that aggregation used to be included in grouping, but is now separately set on the column via treeAggregation
         *  setting in treeBase**
         *
         *  We group in the priority order given, this will also put these columns to the high order of the sort irrespective
         *  of the sort priority given them.  If there is no sort defined then we sort ascending, if there is a sort defined then
         *  we use that sort.
         *
         *  If the groupPriority is undefined or less than 0, then we expect to be aggregating, and we look at the
         *  aggregation types to determine what sort of aggregation we can do.  Values are in the constants file, but
         *  include SUM, COUNT, MAX, MIN
         *
         *  groupPriorities should generally be sequential, if they're not then the next time getGrouping is called
         *  we'll renumber them to be sequential.
         *  <br/>Defaults to undefined.
         */

        if ( typeof(col.grouping) === 'undefined' && typeof(colDef.grouping) !== 'undefined') {
          col.grouping = angular.copy(colDef.grouping);
          if ( typeof(col.grouping.groupPriority) !== 'undefined' && col.grouping.groupPriority > -1 ) {
            col.treeAggregationFn = uiGridTreeBaseService.nativeAggregations()[uiGridGroupingConstants.aggregation.COUNT].aggregationFn;
            col.treeAggregationFinalizerFn = service.groupedFinalizerFn;
          }
        } else if (typeof(col.grouping) === 'undefined') {
          col.grouping = {};
        }

        if (typeof(col.grouping) !== 'undefined' && typeof(col.grouping.groupPriority) !== 'undefined' && col.grouping.groupPriority >= 0) {
          col.suppressRemoveSort = true;
        }

        var groupColumn = {
          name: 'ui.grid.grouping.group',
          title: i18nService.get().grouping.group,
          icon: 'ui-grid-icon-indent-right',
          shown: function () {
            return typeof(this.context.col.grouping) === 'undefined' ||
                   typeof(this.context.col.grouping.groupPriority) === 'undefined' ||
                   this.context.col.grouping.groupPriority < 0;
          },
          action: function () {
            service.groupColumn( this.context.col.grid, this.context.col );
          }
        };

        var ungroupColumn = {
          name: 'ui.grid.grouping.ungroup',
          title: i18nService.get().grouping.ungroup,
          icon: 'ui-grid-icon-indent-left',
          shown: function () {
            return typeof(this.context.col.grouping) !== 'undefined' &&
                   typeof(this.context.col.grouping.groupPriority) !== 'undefined' &&
                   this.context.col.grouping.groupPriority >= 0;
          },
          action: function () {
            service.ungroupColumn( this.context.col.grid, this.context.col );
          }
        };

        var aggregateRemove = {
          name: 'ui.grid.grouping.aggregateRemove',
          title: i18nService.get().grouping.aggregate_remove,
          shown: function () {
            return typeof(this.context.col.treeAggregationFn) !== 'undefined';
          },
          action: function () {
            service.aggregateColumn( this.context.col.grid, this.context.col, null);
          }
        };

        // generic adder for the aggregation menus, which follow a pattern
        var addAggregationMenu = function(type, title) {
          title = title || i18nService.get().grouping['aggregate_' + type] || type;
          var menuItem = {
            name: 'ui.grid.grouping.aggregate' + type,
            title: title,
            shown: function () {
              return typeof(this.context.col.treeAggregation) === 'undefined' ||
                     typeof(this.context.col.treeAggregation.type) === 'undefined' ||
                     this.context.col.treeAggregation.type !== type;
            },
            action: function () {
              service.aggregateColumn( this.context.col.grid, this.context.col, type);
            }
          };

          if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.grouping.aggregate' + type)) {
            col.menuItems.push(menuItem);
          }
        };

        /**
         *  @ngdoc object
         *  @name groupingShowGroupingMenu
         *  @propertyOf  ui.grid.grouping.api:ColumnDef
         *  @description Show the grouping (group and ungroup items) menu on this column
         *  <br/>Defaults to true.
         */
        if ( col.colDef.groupingShowGroupingMenu !== false ) {
          if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.grouping.group')) {
            col.menuItems.push(groupColumn);
          }

          if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.grouping.ungroup')) {
            col.menuItems.push(ungroupColumn);
          }
        }


        /**
         *  @ngdoc object
         *  @name groupingShowAggregationMenu
         *  @propertyOf  ui.grid.grouping.api:ColumnDef
         *  @description Show the aggregation menu on this column
         *  <br/>Defaults to true.
         */
        if ( col.colDef.groupingShowAggregationMenu !== false ) {
          angular.forEach(uiGridTreeBaseService.nativeAggregations(), function(aggregationDef, name) {
            addAggregationMenu(name);
          });
          angular.forEach(gridOptions.treeCustomAggregations, function(aggregationDef, name) {
            addAggregationMenu(name, aggregationDef.menuTitle);
          });

          if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.grouping.aggregateRemove')) {
            col.menuItems.push(aggregateRemove);
          }
        }
      },




      /**
       * @ngdoc function
       * @name groupingColumnProcessor
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Moves the columns around based on which are grouped
       *
       * @param {array} columns the columns to consider rendering
       * @param {array} rows the grid rows, which we don't use but are passed to us
       * @returns {array} updated columns array
       */
      groupingColumnProcessor: function( columns, rows ) {
        columns = service.moveGroupColumns(this, columns, rows);
        return columns;
      },

      /**
       * @ngdoc function
       * @name groupedFinalizerFn
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Used on group columns to display the rendered value and optionally
       * display the count of rows.
       *
       * @param {aggregation} aggregation The aggregation entity for a grouped column
       */
      groupedFinalizerFn: function( aggregation ) {
        var col = this;

        if ( typeof(aggregation.groupVal) !== 'undefined') {
          aggregation.rendered = aggregation.groupVal;
          if ( col.grid.options.groupingShowCounts && col.colDef.type !== 'date' && col.colDef.type !== 'object' ) {
            aggregation.rendered += (' (' + aggregation.value + ')');
          }
        } else {
          aggregation.rendered = null;
        }
      },

      /**
       * @ngdoc function
       * @name moveGroupColumns
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Moves the column order so that the grouped columns are lined up
       * to the left (well, unless you're RTL, then it's the right).  By doing this in
       * the columnsProcessor, we make it transient - when the column is ungrouped it'll
       * go back to where it was.
       *
       * Does nothing if the option `moveGroupColumns` is set to false.
       *
       * @param {Grid} grid grid object
       * @param {array} columns the columns that we should process/move
       * @returns {array} updated columns
       */
      moveGroupColumns: function( grid, columns ) {
        if ( grid.options.moveGroupColumns === false) {
          return columns;
        }

        columns.forEach(function(column, index) {
          // position used to make stable sort in moveGroupColumns
          column.groupingPosition = index;
        });

        columns.sort(function(a, b) {
          var a_group, b_group;

          if (a.isRowHeader) {
            a_group = a.headerPriority;
          }
          else if ( typeof(a.grouping) === 'undefined' || typeof(a.grouping.groupPriority) === 'undefined' || a.grouping.groupPriority < 0) {
            a_group = null;
          }
          else {
            a_group = a.grouping.groupPriority;
          }

          if (b.isRowHeader) {
            b_group = b.headerPriority;
          }
          else if ( typeof(b.grouping) === 'undefined' || typeof(b.grouping.groupPriority) === 'undefined' || b.grouping.groupPriority < 0) {
            b_group = null;
          }
          else {
            b_group = b.grouping.groupPriority;
          }

          // groups get sorted to the top
          if ( a_group !== null && b_group === null) { return -1; }
          if ( b_group !== null && a_group === null) { return 1; }
          if ( a_group !== null && b_group !== null) {return a_group - b_group; }

          return a.groupingPosition - b.groupingPosition;
        });

        columns.forEach( function(column) {
          delete column.groupingPosition;
        });

        return columns;
      },


      /**
       * @ngdoc function
       * @name groupColumn
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Adds this column to the existing grouping, at the end of the priority order.
       * If the column doesn't have a sort, adds one, by default ASC
       *
       * This column will move to the left of any non-group columns, the
       * move is handled in a columnProcessor, so gets called as part of refresh
       *
       * @param {Grid} grid grid object
       * @param {GridColumn} column the column we want to group
       */
      groupColumn: function( grid, column) {
        if ( typeof(column.grouping) === 'undefined' ) {
          column.grouping = {};
        }

        // set the group priority to the next number in the hierarchy
        var existingGrouping = service.getGrouping( grid );
        column.grouping.groupPriority = existingGrouping.grouping.length;

        // save sort in order to restore it when column is ungrouped
        column.previousSort = angular.copy(column.sort);

        // add sort if not present
        if ( !column.sort ) {
          column.sort = { direction: uiGridConstants.ASC };
        } else if ( typeof(column.sort.direction) === 'undefined' || column.sort.direction === null ) {
          column.sort.direction = uiGridConstants.ASC;
        }

        column.treeAggregation = { type: uiGridGroupingConstants.aggregation.COUNT, source: 'grouping' };

        if ( column.colDef && angular.isFunction(column.colDef.customTreeAggregationFn) ) {
          column.treeAggregationFn = column.colDef.customTreeAggregationFn;
        } else {
          column.treeAggregationFn = uiGridTreeBaseService.nativeAggregations()[uiGridGroupingConstants.aggregation.COUNT].aggregationFn;
        }

        column.treeAggregationFinalizerFn = service.groupedFinalizerFn;

        grid.api.grouping.raise.groupingChanged(column);
        // This indirectly calls service.tidyPriorities( grid );
        grid.api.core.raise.sortChanged(grid, grid.getColumnSorting());

        grid.queueGridRefresh();
      },


       /**
       * @ngdoc function
       * @name ungroupColumn
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Removes the groupPriority from this column.  If the
       * column was previously aggregated the aggregation will come back.
       * The sort will remain.
       *
       * This column will move to the right of any other group columns, the
       * move is handled in a columnProcessor, so gets called as part of refresh
       *
       * @param {Grid} grid grid object
       * @param {GridColumn} column the column we want to ungroup
       */
      ungroupColumn: function( grid, column) {
        if ( typeof(column.grouping) === 'undefined' ) {
          return;
        }

        delete column.grouping.groupPriority;
        delete column.treeAggregation;
        delete column.customTreeAggregationFinalizer;

        if (column.previousSort) {
          column.sort = column.previousSort;
          delete column.previousSort;
        }

        service.tidyPriorities( grid );

        grid.api.grouping.raise.groupingChanged(column);
        grid.api.core.raise.sortChanged(grid, grid.getColumnSorting());

        grid.queueGridRefresh();
      },

      /**
       * @ngdoc function
       * @name aggregateColumn
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Sets the aggregation type on a column, if the
       * column is currently grouped then it removes the grouping first.
       *
       * @param {Grid} grid grid object
       * @param {GridColumn} column the column we want to aggregate
       * @param {string} aggregationType of the recognised types from uiGridGroupingConstants or one of the custom aggregations from gridOptions
       */
      aggregateColumn: function( grid, column, aggregationType) {
        if (typeof(column.grouping) !== 'undefined' && typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0) {
          service.ungroupColumn( grid, column );
        }

        var aggregationDef = {};

        if ( typeof(grid.options.treeCustomAggregations[aggregationType]) !== 'undefined' ) {
          aggregationDef = grid.options.treeCustomAggregations[aggregationType];
        } else if ( typeof(uiGridTreeBaseService.nativeAggregations()[aggregationType]) !== 'undefined' ) {
          aggregationDef = uiGridTreeBaseService.nativeAggregations()[aggregationType];
        }

        column.treeAggregation = { type: aggregationType, label:  i18nService.get().aggregation[aggregationDef.label] || aggregationDef.label };
        column.treeAggregationFn = aggregationDef.aggregationFn;
        column.treeAggregationFinalizerFn = aggregationDef.finalizerFn;

        grid.api.grouping.raise.aggregationChanged(column);

        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name setGrouping
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Set the grouping based on a config object, used by the save state feature
       * (more specifically, by the restore function in that feature )
       *
       * @param {Grid} grid grid object
       * @param {object} config the config we want to set, same format as that returned by getGrouping
       */
      setGrouping: function ( grid, config ) {
        if ( typeof(config) === 'undefined' ) {
          return;
        }

        // first remove any existing grouping
        service.clearGrouping(grid);

        if ( config.grouping && config.grouping.length && config.grouping.length > 0 ) {
          config.grouping.forEach( function( group ) {
            var col = grid.getColumn(group.colName);

            if ( col ) {
              service.groupColumn( grid, col );
            }
          });
        }

        if ( config.aggregations && config.aggregations.length ) {
          config.aggregations.forEach( function( aggregation ) {
            var col = grid.getColumn(aggregation.colName);

            if ( col ) {
              service.aggregateColumn( grid, col, aggregation.aggregation.type );
            }
          });
        }

        if ( config.rowExpandedStates ) {
          service.applyRowExpandedStates( grid.grouping.groupingHeaderCache, config.rowExpandedStates );
        }
      },


      /**
       * @ngdoc function
       * @name clearGrouping
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Clear any grouped columns and any aggregations.  Doesn't remove sorting,
       * as we don't know whether that sorting was added by grouping or was there beforehand
       *
       * @param {Grid} grid grid object
       */
      clearGrouping: function( grid ) {
        var currentGrouping = service.getGrouping(grid);

        if ( currentGrouping.grouping.length > 0 ) {
          currentGrouping.grouping.forEach( function( group ) {
            if (!group.col) {
              // should have a group.colName if there's no col
              group.col = grid.getColumn(group.colName);
            }
            service.ungroupColumn(grid, group.col);
          });
        }

        if ( currentGrouping.aggregations.length > 0 ) {
          currentGrouping.aggregations.forEach( function( aggregation ) {
            if (!aggregation.col) {
              // should have a group.colName if there's no col
              aggregation.col = grid.getColumn(aggregation.colName);
            }
            service.aggregateColumn(grid, aggregation.col, null);
          });
        }
      },


      /**
       * @ngdoc function
       * @name tidyPriorities
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Renumbers groupPriority and sortPriority such that
       * groupPriority is contiguous, and sortPriority either matches
       * groupPriority (for group columns), and otherwise is contiguous and
       * higher than groupPriority.
       *
       * @param {Grid} grid grid object
       */
      tidyPriorities: function( grid ) {
        // if we're called from sortChanged, grid is in this, not passed as param, the param can be a column or undefined
        if ( ( typeof(grid) === 'undefined' || typeof(grid.grid) !== 'undefined' ) && typeof(this.grid) !== 'undefined' ) {
          grid = this.grid;
        }

        var groupArray = [],
          sortArray = [];

        grid.columns.forEach( function(column, index) {
          if ( typeof(column.grouping) !== 'undefined' && typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0) {
            groupArray.push(column);
          }
          else if ( typeof(column.sort) !== 'undefined' && typeof(column.sort.priority) !== 'undefined' && column.sort.priority >= 0) {
            sortArray.push(column);
          }
        });

        groupArray.sort(function(a, b) { return a.grouping.groupPriority - b.grouping.groupPriority; });
        groupArray.forEach( function(column, index) {
          column.grouping.groupPriority = index;
          column.suppressRemoveSort = true;
          if ( typeof(column.sort) === 'undefined') {
            column.sort = {};
          }
          column.sort.priority = index;
        });

        var i = groupArray.length;

        sortArray.sort(function(a, b) { return a.sort.priority - b.sort.priority; });
        sortArray.forEach(function(column) {
          column.sort.priority = i;
          column.suppressRemoveSort = column.colDef.suppressRemoveSort;
          i++;
        });
      },

      /**
       * @ngdoc function
       * @name groupRows
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description The rowProcessor that creates the groupHeaders (i.e. does
       * the actual grouping).
       *
       * Assumes it is always called after the sorting processor, guaranteed by the priority setting
       *
       * Processes all the rows in order, inserting a groupHeader row whenever there is a change
       * in value of a grouped row, based on the sortAlgorithm used for the column.  The group header row
       * is looked up in the groupHeaderCache, and used from there if there is one. The entity is reset
       * to {} if one is found.
       *
       * As it processes it maintains a `processingState` array. This records, for each level of grouping we're
       * working with, the following information:
       * ```
       *   {
       *     fieldName: name,
       *     col: col,
       *     initialised: boolean,
       *     currentValue: value,
       *     currentRow: gridRow,
       *   }
       * ```
       * We look for changes in the currentValue at any of the levels.  Where we find a change we:
       *
       * - create a new groupHeader row in the array
       *
       * @param {array} renderableRows the rows we want to process, usually the output from the previous rowProcessor
       * @returns {array} the updated rows, including our new group rows
       */
      groupRows: function( renderableRows ) {
        if (renderableRows.length === 0) {
          return renderableRows;
        }

        var grid = this;
        grid.grouping.oldGroupingHeaderCache = grid.grouping.groupingHeaderCache || {};
        grid.grouping.groupingHeaderCache = {};

        var processingState = service.initialiseProcessingState( grid );

        // processes each of the fields we are grouping by, checks if the value has changed and inserts a groupHeader
        // Broken out as shouldn't create functions in a loop.
        var updateProcessingState = function( groupFieldState, stateIndex ) {
          var fieldValue = grid.getCellValue(row, groupFieldState.col);

          // look for change of value - and insert a header
          if ( !groupFieldState.initialised || rowSorter.getSortFn(grid, groupFieldState.col, renderableRows)(fieldValue, groupFieldState.currentValue) !== 0 ) {
            service.insertGroupHeader( grid, renderableRows, i, processingState, stateIndex );
            i++;
          }
        };

        // use a for loop because it's tolerant of the array length changing whilst we go - we can
        // manipulate the iterator when we insert groupHeader rows
        for (var i = 0; i < renderableRows.length; i++ ) {
          var row = renderableRows[i];

          if ( row.visible ) {
            processingState.forEach( updateProcessingState );
          }
        }

        delete grid.grouping.oldGroupingHeaderCache;
        return renderableRows;
      },


      /**
       * @ngdoc function
       * @name initialiseProcessingState
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Creates the processing state array that is used
       * for groupRows.
       *
       * @param {Grid} grid grid object
       * @returns {array} an array in the format described in the groupRows method,
       * initialised with blank values
       */
      initialiseProcessingState: function( grid ) {
        var processingState = [];
        var columnSettings = service.getGrouping( grid );

        columnSettings.grouping.forEach( function( groupItem, index) {
          processingState.push({
            fieldName: groupItem.field,
            col: groupItem.col,
            initialised: false,
            currentValue: null,
            currentRow: null
          });
        });

        return processingState;
      },


      /**
       * @ngdoc function
       * @name getGrouping
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Get the grouping settings from the columns.  As a side effect
       * this always renumbers the grouping starting at 0
       * @param {Grid} grid grid object
       * @returns {array} an array of the group fields, in order of priority
       */
      getGrouping: function( grid ) {
        var groupArray = [],
          aggregateArray = [];

        // get all the grouping
        grid.columns.forEach(function(column) {
          if ( column.grouping ) {
            if ( typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0) {
              groupArray.push({ field: column.field, col: column, groupPriority: column.grouping.groupPriority, grouping: column.grouping });
            }
          }
          if ( column.treeAggregation && column.treeAggregation.type ) {
            aggregateArray.push({ field: column.field, col: column, aggregation: column.treeAggregation });
          }
        });

        // sort grouping into priority order
        groupArray.sort( function(a, b) {
          return a.groupPriority - b.groupPriority;
        });

        // renumber the priority in case it was somewhat messed up, then remove the grouping reference
        groupArray.forEach( function( group, index) {
          group.grouping.groupPriority = index;
          group.groupPriority = index;
          delete group.grouping;
        });

        return { grouping: groupArray, aggregations: aggregateArray };
      },


      /**
       * @ngdoc function
       * @name insertGroupHeader
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Create a group header row, and link it to the various configuration
       * items that we use.
       *
       * Look for the row in the oldGroupingHeaderCache, write the row into the new groupingHeaderCache.
       *
       * @param {Grid} grid grid object
       * @param {array} renderableRows the rows that we are processing
       * @param {number} rowIndex the row we were up to processing
       * @param {array} processingState the current processing state
       * @param {number} stateIndex the processing state item that we were on when we triggered a new group header -
       * i.e. the column that we want to create a header for
       */
      insertGroupHeader: function( grid, renderableRows, rowIndex, processingState, stateIndex ) {
        // set the value that caused the end of a group into the header row and the processing state
        var col = processingState[stateIndex].col,
          newValue = grid.getCellValue(renderableRows[rowIndex], col),
          newDisplayValue = newValue;

        if ( typeof(newValue) === 'undefined' || newValue === null ) {
          newDisplayValue = grid.options.groupingNullLabel;
        }

        function getKeyAsValueForCacheMap(key) {
          return angular.isObject(key) ? JSON.stringify(key) : key;
        }

        var cacheItem = grid.grouping.oldGroupingHeaderCache;

        for ( var i = 0; i < stateIndex; i++ ) {
          if ( cacheItem && cacheItem[getKeyAsValueForCacheMap(processingState[i].currentValue)] ) {
            cacheItem = cacheItem[getKeyAsValueForCacheMap(processingState[i].currentValue)].children;
          }
        }

        var headerRow;

        if ( cacheItem && cacheItem[getKeyAsValueForCacheMap(newValue)]) {
          headerRow = cacheItem[getKeyAsValueForCacheMap(newValue)].row;
          headerRow.entity = {};
        } else {
          headerRow = new GridRow( {}, null, grid );
          gridClassFactory.rowTemplateAssigner.call(grid, headerRow);
        }

        headerRow.entity['$$' + processingState[stateIndex].col.uid] = { groupVal: newDisplayValue };
        headerRow.treeLevel = stateIndex;
        headerRow.groupHeader = true;
        headerRow.internalRow = true;
        headerRow.enableCellEdit = false;
        headerRow.enableSelection = grid.options.enableGroupHeaderSelection;
        processingState[stateIndex].initialised = true;
        processingState[stateIndex].currentValue = newValue;
        processingState[stateIndex].currentRow = headerRow;

        // set all processing states below this one to not be initialised - change of this state
        // means all those need to start again
        service.finaliseProcessingState( processingState, stateIndex + 1);

        // insert our new header row
        renderableRows.splice(rowIndex, 0, headerRow);

        // add our new header row to the cache
        cacheItem = grid.grouping.groupingHeaderCache;
        for ( i = 0; i < stateIndex; i++ ) {
          cacheItem = cacheItem[getKeyAsValueForCacheMap(processingState[i].currentValue)].children;
        }
        cacheItem[getKeyAsValueForCacheMap(newValue)] = { row: headerRow, children: {} };
      },


      /**
       * @ngdoc function
       * @name finaliseProcessingState
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Set all processing states lower than the one that had a break in value to
       * no longer be initialised.  Render the counts into the entity ready for display.
       *
       * @param {array} processingState the current processing state
       * @param {number} stateIndex the processing state item that we were on when we triggered a new group header, all
       * processing states after this need to be finalised
       */
      finaliseProcessingState: function( processingState, stateIndex ) {
        for ( var i = stateIndex; i < processingState.length; i++) {
          processingState[i].initialised = false;
          processingState[i].currentRow = null;
          processingState[i].currentValue = null;
        }
      },


      /**
       * @ngdoc function
       * @name getRowExpandedStates
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Extract the groupHeaderCache hash, pulling out only the states.
       *
       * The example below shows a grid that is grouped by gender then age
       *
       * <pre>
       *   {
       *     male: {
       *       state: 'expanded',
       *       children: {
       *         22: { state: 'expanded' },
       *         30: { state: 'collapsed' }
       *       }
       *     },
       *     female: {
       *       state: 'expanded',
       *       children: {
       *         28: { state: 'expanded' },
       *         55: { state: 'collapsed' }
       *       }
       *     }
       *   }
       * </pre>
       *
       * @param {object} treeChildren The tree children elements object
       * @returns {object} the expanded states as an object
       */
      getRowExpandedStates: function(treeChildren) {
        if ( typeof(treeChildren) === 'undefined' ) {
          return {};
        }

        var newChildren = {};

        angular.forEach( treeChildren, function( value, key ) {
          newChildren[key] = { state: value.row.treeNode.state };
          if ( value.children ) {
            newChildren[key].children = service.getRowExpandedStates( value.children );
          } else {
            newChildren[key].children = {};
          }
        });

        return newChildren;
      },


      /**
       * @ngdoc function
       * @name applyRowExpandedStates
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Take a hash in the format as created by getRowExpandedStates,
       * and apply it to the grid.grouping.groupHeaderCache.
       *
       * Takes a treeSubset, and applies to a treeSubset - so can be called
       * recursively.
       *
       * @param {object} currentNode can be grid.grouping.groupHeaderCache, or any of
       * the children of that hash
       * @param {object} expandedStates can be the full expanded states, or children
       * of that expanded states (which hopefully matches the subset of the groupHeaderCache)
       */
      applyRowExpandedStates: function( currentNode, expandedStates ) {
        if ( typeof(expandedStates) === 'undefined' ) {
          return;
        }

        angular.forEach(expandedStates, function( value, key ) {
          if ( currentNode[key] ) {
            currentNode[key].row.treeNode.state = value.state;

            if (value.children && currentNode[key].children) {
              service.applyRowExpandedStates( currentNode[key].children, value.children );
            }
          }
        });
      }


    };

    return service;

  }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.grouping.directive:uiGridGrouping
   *  @element div
   *  @restrict A
   *
   *  @description Adds grouping features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.grouping']);

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
   <div ui-grid="gridOptions" ui-grid-grouping></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridGrouping', ['uiGridGroupingConstants', 'uiGridGroupingService',
  function (uiGridGroupingConstants, uiGridGroupingService) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            if (uiGridCtrl.grid.options.enableGrouping !== false) {
              uiGridGroupingService.initializeGrid(uiGridCtrl.grid, $scope);
            }
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);

})();
