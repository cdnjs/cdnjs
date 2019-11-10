/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.rowEdit
   * @description
   *
   * # ui.grid.rowEdit
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module extends the edit feature to provide tracking and saving of rows
   * of data.  The tutorial provides more information on how this feature is best
   * used {@link tutorial/205_row_editable here}.
   * <br/>
   * This feature depends on usage of the ui-grid-edit feature, and also benefits
   * from use of ui-grid-cellNav to provide the full spreadsheet-like editing
   * experience
   *
   */

  var module = angular.module('ui.grid.rowEdit', ['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav']);

  /**
   *  @ngdoc object
   *  @name ui.grid.rowEdit.constant:uiGridRowEditConstants
   *
   *  @description constants available in row edit module
   */
  module.constant('uiGridRowEditConstants', {
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.rowEdit.service:uiGridRowEditService
   *
   *  @description Services for row editing features
   */
  module.service('uiGridRowEditService', ['$interval', '$q', 'uiGridConstants', 'uiGridRowEditConstants', 'gridUtil',
    function ($interval, $q, uiGridConstants, uiGridRowEditConstants, gridUtil) {

      var service = {

        initializeGrid: function (scope, grid) {
          /**
           *  @ngdoc object
           *  @name ui.grid.rowEdit.api:PublicApi
           *
           *  @description Public Api for rowEdit feature
           */

          grid.rowEdit = {};

          var publicApi = {
            events: {
              rowEdit: {
                /**
                 * @ngdoc event
                 * @eventOf ui.grid.rowEdit.api:PublicApi
                 * @name saveRow
                 * @description raised when a row is ready for saving.  Once your
                 * row has saved you may need to use angular.extend to update the
                 * data entity with any changed data from your save (for example,
                 * lock version information if you're using optimistic locking,
                 * or last update time/user information).
                 *
                 * Your method should call setSavePromise somewhere in the body before
                 * returning control.  The feature will then wait, with the gridRow greyed out
                 * whilst this promise is being resolved.
                 *
                 * <pre>
                 *      gridApi.rowEdit.on.saveRow(scope,function(rowEntity) {})
                 * </pre>
                 * and somewhere within the event handler:
                 * <pre>
                 *      gridApi.rowEdit.setSavePromise( rowEntity, savePromise)
                 * </pre>
                 * @param {object} rowEntity the options.data element that was edited
                 * @returns {promise} Your saveRow method should return a promise, the
                 * promise should either be resolved (implying successful save), or
                 * rejected (implying an error).
                 */
                saveRow: function (rowEntity) {
                }
              }
            },
            methods: {
              rowEdit: {
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name setSavePromise
                 * @description Sets the promise associated with the row save, mandatory that
                 * the saveRow event handler calls this method somewhere before returning.
                 * <pre>
                 *      gridApi.rowEdit.setSavePromise(rowEntity, savePromise)
                 * </pre>
                 * @param {object} rowEntity a data row from the grid for which a save has
                 * been initiated
                 * @param {promise} savePromise the promise that will be resolved when the
                 * save is successful, or rejected if the save fails
                 *
                 */
                setSavePromise: function ( rowEntity, savePromise) {
                  service.setSavePromise(grid, rowEntity, savePromise);
                },
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name getDirtyRows
                 * @description Returns all currently dirty rows
                 * <pre>
                 *      gridApi.rowEdit.getDirtyRows(grid)
                 * </pre>
                 * @returns {array} An array of gridRows that are currently dirty
                 *
                 */
                getDirtyRows: function () {
                  return grid.rowEdit.dirtyRows ? grid.rowEdit.dirtyRows : [];
                },
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name getErrorRows
                 * @description Returns all currently errored rows
                 * <pre>
                 *      gridApi.rowEdit.getErrorRows(grid)
                 * </pre>
                 * @returns {array} An array of gridRows that are currently in error
                 *
                 */
                getErrorRows: function () {
                  return grid.rowEdit.errorRows ? grid.rowEdit.errorRows : [];
                },
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name flushDirtyRows
                 * @description Triggers a save event for all currently dirty rows, could
                 * be used where user presses a save button or navigates away from the page
                 * <pre>
                 *      gridApi.rowEdit.flushDirtyRows(grid)
                 * </pre>
                 * @returns {promise} a promise that represents the aggregate of all
                 * of the individual save promises - i.e. it will be resolved when all
                 * the individual save promises have been resolved.
                 *
                 */
                flushDirtyRows: function () {
                  return service.flushDirtyRows(grid);
                },

                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name setRowsDirty
                 * @description Sets each of the rows passed in dataRows
                 * to be dirty. Note that if you have only just inserted the
                 * rows into your data you will need to wait for a $digest cycle
                 * before the gridRows are present - so often you would wrap this
                 * call in a $interval or $timeout. Also, you must pass row.entity
                 * into this function rather than row objects themselves.
                 * <pre>
                 *      $interval( function() {
                 *        gridApi.rowEdit.setRowsDirty(myDataRows);
                 *      }, 0, 1);
                 * </pre>
                 * @param {array} dataRows the data entities for which the gridRows
                 * should be set dirty.
                 *
                 */
                setRowsDirty: function ( dataRows) {
                  service.setRowsDirty(grid, dataRows);
                },

                /**
                 * @ngdoc method
                 * @methodOf ui.grid.rowEdit.api:PublicApi
                 * @name setRowsClean
                 * @description Sets each of the rows passed in dataRows
                 * to be clean, removing them from the dirty cache and the error cache,
                 * and clearing the error flag and the dirty flag
                 * <pre>
                 *      var gridRows = $scope.gridApi.rowEdit.getDirtyRows();
                 *      var dataRows = gridRows.map( function( gridRow ) { return gridRow.entity; });
                 *      $scope.gridApi.rowEdit.setRowsClean( dataRows );
                 * </pre>
                 * @param {array} dataRows the data entities for which the gridRows
                 * should be set clean.
                 *
                 */
                setRowsClean: function ( dataRows) {
                  service.setRowsClean(grid, dataRows);
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);
          grid.api.registerMethodsFromObject(publicApi.methods);

          grid.api.core.on.renderingComplete( scope, function ( gridApi ) {
            grid.api.edit.on.afterCellEdit( scope, service.endEditCell );
            grid.api.edit.on.beginCellEdit( scope, service.beginEditCell );
            grid.api.edit.on.cancelCellEdit( scope, service.cancelEditCell );

            if ( grid.api.cellNav ) {
              grid.api.cellNav.on.navigate( scope, service.navigate );
            }
          });

        },

        defaultGridOptions: function (gridOptions) {

          /**
           *  @ngdoc object
           *  @name ui.grid.rowEdit.api:GridOptions
           *
           *  @description Options for configuring the rowEdit feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name saveRow
         * @description  Returns a function that saves the specified row from the grid,
         * and returns a promise
         * @param {object} grid the grid for which dirty rows should be flushed
         * @param {GridRow} gridRow the row that should be saved
         * @returns {function} the saveRow function returns a function.  That function
         * in turn, when called, returns a promise relating to the save callback
         */
        saveRow: function ( grid, gridRow ) {
          var self = this;

          return function() {
            gridRow.isSaving = true;

            if ( gridRow.rowEditSavePromise ) {
              // don't save the row again if it's already saving - that causes stale object exceptions
              return gridRow.rowEditSavePromise;
            }

            var promise = grid.api.rowEdit.raise.saveRow( gridRow.entity );

            if ( gridRow.rowEditSavePromise ) {
              gridRow.rowEditSavePromise.then( self.processSuccessPromise( grid, gridRow ), self.processErrorPromise( grid, gridRow ));
            } else {
              gridUtil.logError( 'A promise was not returned when saveRow event was raised, either nobody is listening to event, or event handler did not return a promise' );
            }
            return promise;
          };
        },


        /**
         * @ngdoc method
         * @methodOf  ui.grid.rowEdit.service:uiGridRowEditService
         * @name setSavePromise
         * @description Sets the promise associated with the row save, mandatory that
         * the saveRow event handler calls this method somewhere before returning.
         * <pre>
         *      gridApi.rowEdit.setSavePromise(grid, rowEntity)
         * </pre>
         * @param {object} grid the grid for which dirty rows should be returned
         * @param {object} rowEntity a data row from the grid for which a save has
         * been initiated
         * @param {promise} savePromise the promise that will be resolved when the
         * save is successful, or rejected if the save fails
         *
         */
        setSavePromise: function (grid, rowEntity, savePromise) {
          var gridRow = grid.getRow( rowEntity );
          gridRow.rowEditSavePromise = savePromise;
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name processSuccessPromise
         * @description  Returns a function that processes the successful
         * resolution of a save promise
         * @param {object} grid the grid for which the promise should be processed
         * @param {GridRow} gridRow the row that has been saved
         * @returns {function} the success handling function
         */
        processSuccessPromise: function ( grid, gridRow ) {
          var self = this;

          return function() {
            delete gridRow.isSaving;
            delete gridRow.isDirty;
            delete gridRow.isError;
            delete gridRow.rowEditSaveTimer;
            delete gridRow.rowEditSavePromise;
            self.removeRow( grid.rowEdit.errorRows, gridRow );
            self.removeRow( grid.rowEdit.dirtyRows, gridRow );
          };
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name processErrorPromise
         * @description  Returns a function that processes the failed
         * resolution of a save promise
         * @param {object} grid the grid for which the promise should be processed
         * @param {GridRow} gridRow the row that is now in error
         * @returns {function} the error handling function
         */
        processErrorPromise: function ( grid, gridRow ) {
          return function() {
            delete gridRow.isSaving;
            delete gridRow.rowEditSaveTimer;
            delete gridRow.rowEditSavePromise;

            gridRow.isError = true;

            if (!grid.rowEdit.errorRows) {
              grid.rowEdit.errorRows = [];
            }
            if (!service.isRowPresent( grid.rowEdit.errorRows, gridRow ) ) {
              grid.rowEdit.errorRows.push( gridRow );
            }
          };
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name removeRow
         * @description  Removes a row from a cache of rows - either
         * grid.rowEdit.errorRows or grid.rowEdit.dirtyRows.  If the row
         * is not present silently does nothing.
         * @param {array} rowArray the array from which to remove the row
         * @param {GridRow} gridRow the row that should be removed
         */
        removeRow: function( rowArray, removeGridRow ) {
          if (typeof(rowArray) === 'undefined' || rowArray === null) {
            return;
          }

          rowArray.forEach( function( gridRow, index ) {
            if ( gridRow.uid === removeGridRow.uid ) {
              rowArray.splice( index, 1);
            }
          });
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name isRowPresent
         * @description  Checks whether a row is already present
         * in the given array
         * @param {array} rowArray the array in which to look for the row
         * @param {GridRow} gridRow the row that should be looked for
         */
        isRowPresent: function( rowArray, removeGridRow ) {
          var present = false;
          rowArray.forEach( function( gridRow, index ) {
            if ( gridRow.uid === removeGridRow.uid ) {
              present = true;
            }
          });
          return present;
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name flushDirtyRows
         * @description Triggers a save event for all currently dirty rows, could
         * be used where user presses a save button or navigates away from the page
         * <pre>
         *      gridApi.rowEdit.flushDirtyRows(grid)
         * </pre>
         * @param {object} grid the grid for which dirty rows should be flushed
         * @returns {promise} a promise that represents the aggregate of all
         * of the individual save promises - i.e. it will be resolved when all
         * the individual save promises have been resolved.
         *
         */
        flushDirtyRows: function(grid) {
          var promises = [];
          grid.api.rowEdit.getDirtyRows().forEach( function( gridRow ) {
            service.cancelTimer( grid, gridRow );
            service.saveRow( grid, gridRow )();
            promises.push( gridRow.rowEditSavePromise );
          });

          return $q.all( promises );
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name endEditCell
         * @description Receives an afterCellEdit event from the edit function,
         * and sets flags as appropriate.  Only the rowEntity parameter
         * is processed, although other params are available.  Grid
         * is automatically provided by the gridApi.
         * @param {object} rowEntity the data entity for which the cell
         * was edited
         */
        endEditCell: function( rowEntity, colDef, newValue, previousValue ) {
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ) { gridUtil.logError( 'Unable to find rowEntity in grid data, dirty flag cannot be set' ); return; }

          if ( newValue !== previousValue || gridRow.isDirty ) {
            if ( !grid.rowEdit.dirtyRows ) {
              grid.rowEdit.dirtyRows = [];
            }

            if ( !gridRow.isDirty ) {
              gridRow.isDirty = true;
              grid.rowEdit.dirtyRows.push( gridRow );
            }

            delete gridRow.isError;

            service.considerSetTimer( grid, gridRow );
          }
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name beginEditCell
         * @description Receives a beginCellEdit event from the edit function,
         * and cancels any rowEditSaveTimers if present, as the user is still editing
         * this row.  Only the rowEntity parameter
         * is processed, although other params are available.  Grid
         * is automatically provided by the gridApi.
         * @param {object} rowEntity the data entity for which the cell
         * editing has commenced
         */
        beginEditCell: function( rowEntity, colDef ) {
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ) { gridUtil.logError( 'Unable to find rowEntity in grid data, timer cannot be cancelled' ); return; }

          service.cancelTimer( grid, gridRow );
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name cancelEditCell
         * @description Receives a cancelCellEdit event from the edit function,
         * and if the row was already dirty, restarts the save timer.  If the row
         * was not already dirty, then it's not dirty now either and does nothing.
         *
         * Only the rowEntity parameter
         * is processed, although other params are available.  Grid
         * is automatically provided by the gridApi.
         *
         * @param {object} rowEntity the data entity for which the cell
         * editing was cancelled
         */
        cancelEditCell: function( rowEntity, colDef ) {
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ) { gridUtil.logError( 'Unable to find rowEntity in grid data, timer cannot be set' ); return; }

          service.considerSetTimer( grid, gridRow );
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name navigate
         * @description cellNav tells us that the selected cell has changed.  If
         * the new row had a timer running, then stop it similar to in a beginCellEdit
         * call.  If the old row is dirty and not the same as the new row, then
         * start a timer on it.
         * @param {object} newRowCol the row and column that were selected
         * @param {object} oldRowCol the row and column that was left
         *
         */
        navigate: function( newRowCol, oldRowCol ) {
          var grid = this.grid;
          if ( newRowCol.row.rowEditSaveTimer ) {
            service.cancelTimer( grid, newRowCol.row );
          }

          if ( oldRowCol && oldRowCol.row && oldRowCol.row !== newRowCol.row ) {
            service.considerSetTimer( grid, oldRowCol.row );
          }
        },


        /**
         * @ngdoc property
         * @propertyOf ui.grid.rowEdit.api:GridOptions
         * @name rowEditWaitInterval
         * @description How long the grid should wait for another change on this row
         * before triggering a save (in milliseconds).  If set to -1, then saves are
         * never triggered by timer (implying that the user will call flushDirtyRows()
         * manually)
         *
         * @example
         * Setting the wait interval to 4 seconds
         * <pre>
         *   $scope.gridOptions = { rowEditWaitInterval: 4000 }
         * </pre>
         *
         */
        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name considerSetTimer
         * @description Consider setting a timer on this row (if it is dirty).  if there is a timer running
         * on the row and the row isn't currently saving, cancel it, using cancelTimer, then if the row is
         * dirty and not currently saving then set a new timer
         * @param {object} grid the grid for which we are processing
         * @param {GridRow} gridRow the row for which the timer should be adjusted
         *
         */
        considerSetTimer: function( grid, gridRow ) {
          service.cancelTimer( grid, gridRow );

          if ( gridRow.isDirty && !gridRow.isSaving ) {
            if ( grid.options.rowEditWaitInterval !== -1 ) {
              var waitTime = grid.options.rowEditWaitInterval ? grid.options.rowEditWaitInterval : 2000;
              gridRow.rowEditSaveTimer = $interval( service.saveRow( grid, gridRow ), waitTime, 1);
            }
          }
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name cancelTimer
         * @description cancel the $interval for any timer running on this row
         * then delete the timer itself
         * @param {object} grid the grid for which we are processing
         * @param {GridRow} gridRow the row for which the timer should be adjusted
         *
         */
        cancelTimer: function( grid, gridRow ) {
          if ( gridRow.rowEditSaveTimer && !gridRow.isSaving ) {
            $interval.cancel(gridRow.rowEditSaveTimer);
            delete gridRow.rowEditSaveTimer;
          }
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name setRowsDirty
         * @description Sets each of the rows passed in dataRows
         * to be dirty.  note that if you have only just inserted the
         * rows into your data you will need to wait for a $digest cycle
         * before the gridRows are present - so often you would wrap this
         * call in a $interval or $timeout
         * <pre>
         *      $interval( function() {
         *        gridApi.rowEdit.setRowsDirty( myDataRows);
         *      }, 0, 1);
         * </pre>
         * @param {object} grid the grid for which rows should be set dirty
         * @param {array} dataRows the data entities for which the gridRows
         * should be set dirty.
         *
         */
        setRowsDirty: function( grid, myDataRows ) {
          var gridRow;
          myDataRows.forEach( function( value, index ) {
            gridRow = grid.getRow( value );
            if ( gridRow ) {
              if ( !grid.rowEdit.dirtyRows ) {
                grid.rowEdit.dirtyRows = [];
              }

              if ( !gridRow.isDirty ) {
                gridRow.isDirty = true;
                grid.rowEdit.dirtyRows.push( gridRow );
              }

              delete gridRow.isError;

              service.considerSetTimer( grid, gridRow );
            } else {
              gridUtil.logError( "requested row not found in rowEdit.setRowsDirty, row was: " + value );
            }
          });
        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.rowEdit.service:uiGridRowEditService
         * @name setRowsClean
         * @description Sets each of the rows passed in dataRows
         * to be clean, clearing the dirty flag and the error flag, and removing
         * the rows from the dirty and error caches.
         * @param {object} grid the grid for which rows should be set clean
         * @param {array} dataRows the data entities for which the gridRows
         * should be set clean.
         *
         */
        setRowsClean: function( grid, myDataRows ) {
          var gridRow;

          myDataRows.forEach( function( value, index ) {
            gridRow = grid.getRow( value );
            if ( gridRow ) {
              delete gridRow.isDirty;
              service.removeRow( grid.rowEdit.dirtyRows, gridRow );
              service.cancelTimer( grid, gridRow );

              delete gridRow.isError;
              service.removeRow( grid.rowEdit.errorRows, gridRow );
            } else {
              gridUtil.logError( "requested row not found in rowEdit.setRowsClean, row was: " + value );
            }
          });
        }

      };

      return service;

    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.rowEdit.directive:uiGridEdit
   *  @element div
   *  @restrict A
   *
   *  @description Adds row editing features to the ui-grid-edit directive.
   *
   */
  module.directive('uiGridRowEdit', ['gridUtil', 'uiGridRowEditService', 'uiGridEditConstants',
  function (gridUtil, uiGridRowEditService, uiGridEditConstants) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            uiGridRowEditService.initializeGrid($scope, uiGridCtrl.grid);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.rowEdit.directive:uiGridViewport
   *  @element div
   *
   *  @description Stacks on top of ui.grid.uiGridViewport to alter the attributes used
   *  for the grid row to allow coloring of saving and error rows
   */
  module.directive('uiGridViewport',
    ['$compile', 'uiGridConstants', 'gridUtil', '$parse',
      function ($compile, uiGridConstants, gridUtil, $parse) {
        return {
          priority: -200, // run after default  directive
          scope: false,
          compile: function ($elm, $attrs) {
            var rowRepeatDiv = angular.element($elm.children().children()[0]);

            var existingNgClass = rowRepeatDiv.attr("ng-class");
            var newNgClass = '';
            if ( existingNgClass ) {
              newNgClass = existingNgClass.slice(0, -1) + ", 'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}";
            } else {
              newNgClass = "{'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}";
            }
            rowRepeatDiv.attr("ng-class", newNgClass);

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
