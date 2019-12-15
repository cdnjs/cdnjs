/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.selection
   * @description
   *
   * # ui.grid.selection
   * This module provides row selection
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * <div doc-module-components="ui.grid.selection"></div>
   */

  var module = angular.module('ui.grid.selection', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.selection.constant:uiGridSelectionConstants
   *
   *  @description constants available in selection module
   */
  module.constant('uiGridSelectionConstants', {
    featureName: 'selection',
    selectionRowHeaderColName: 'selectionRowHeaderCol'
  });

  // add methods to GridRow
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('GridRow', ['$delegate', function ($delegate) {

      /**
       *  @ngdoc object
       *  @name ui.grid.selection.api:GridRow
       *
       *  @description GridRow prototype functions added for selection
       */

      /**
       *  @ngdoc object
       *  @name enableSelection
       *  @propertyOf  ui.grid.selection.api:GridRow
       *  @description Enable row selection for this row, only settable by internal code.
       *
       *  The grouping feature, for example, might set group header rows to not be selectable.
       *  <br/>Defaults to true
       */

      /**
       *  @ngdoc object
       *  @name isSelected
       *  @propertyOf  ui.grid.selection.api:GridRow
       *  @description Selected state of row. Should be readonly. Make any changes to selected state using setSelected().
       *  <br/>Defaults to false
       */

      /**
       *  @ngdoc object
       *  @name isFocused
       *  @propertyOf  ui.grid.selection.api:GridRow
       *  @description Focused state of row. Should be readonly. Make any changes to focused state using setFocused().
       *  <br/>Defaults to false
       */

      /**
       * @ngdoc function
       * @name setSelected
       * @methodOf ui.grid.selection.api:GridRow
       * @description Sets the isSelected property and updates the selectedCount
       * Changes to isSelected state should only be made via this function
       * @param {Boolean} selected value to set
       */
      $delegate.prototype.setSelected = function (selected) {
        if (selected !== this.isSelected) {
          this.isSelected = selected;
          this.grid.selection.selectedCount += selected ? 1 : -1;
        }
      };

      /**
       * @ngdoc function
       * @name setFocused
       * @methodOf ui.grid.selection.api:GridRow
       * @description Sets the isFocused property
       * Changes to isFocused state should only be made via this function
       * @param {Boolean} val value to set
       */
      $delegate.prototype.setFocused = function(val) {
        if (val !== this.isFocused) {
          this.grid.selection.focusedRow && (this.grid.selection.focusedRow.isFocused = false);
          this.grid.selection.focusedRow = val ? this : null;
          this.isFocused = val;
        }
      };

      return $delegate;
    }]);
  }]);

  /**
   *  @ngdoc service
   *  @name ui.grid.selection.service:uiGridSelectionService
   *
   *  @description Services for selection features
   */
  module.service('uiGridSelectionService',
    function () {
      var service = {

        initializeGrid: function (grid) {

          // add feature namespace and any properties to grid for needed
          /**
           *  @ngdoc object
           *  @name ui.grid.selection.grid:selection
           *
           *  @description Grid properties and functions added for selection
           */
          grid.selection = {
            lastSelectedRow: null,
            /**
             *  @ngdoc object
             *  @name focusedRow
             *  @propertyOf  ui.grid.selection.grid:selection
             *  @description Focused row.
             */
            focusedRow: null,
            selectAll: false
          };


          /**
           *  @ngdoc object
           *  @name selectedCount
           *  @propertyOf  ui.grid.selection.grid:selection
           *  @description Current count of selected rows
           *  @example
           *  var count = grid.selection.selectedCount
           */
          grid.selection.selectedCount = 0;

          service.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.selection.api:PublicApi
           *
           *  @description Public Api for selection feature
           */
          var publicApi = {
            events: {
              selection: {
                /**
                 * @ngdoc event
                 * @name rowFocusChanged
                 * @eventOf  ui.grid.selection.api:PublicApi
                 * @description  is raised after the row.isFocused state is changed
                 * @param {object} scope the scope associated with the grid
                 * @param {GridRow} row the row that was focused/unfocused
                 * @param {Event} evt object if raised from an event
                 */
                rowFocusChanged: function (scope, row, evt) {},
                /**
                 * @ngdoc event
                 * @name rowSelectionChanged
                 * @eventOf  ui.grid.selection.api:PublicApi
                 * @description  is raised after the row.isSelected state is changed
                 * @param {object} scope the scope associated with the grid
                 * @param {GridRow} row the row that was selected/deselected
                 * @param {Event} evt object if raised from an event
                 */
                rowSelectionChanged: function (scope, row, evt) {
                },
                /**
                 * @ngdoc event
                 * @name rowSelectionChangedBatch
                 * @eventOf  ui.grid.selection.api:PublicApi
                 * @description  is raised after the row.isSelected state is changed
                 * in bulk, if the `enableSelectionBatchEvent` option is set to true
                 * (which it is by default).  This allows more efficient processing
                 * of bulk events.
                 * @param {object} scope the scope associated with the grid
                 * @param {array} rows the rows that were selected/deselected
                 * @param {Event} evt object if raised from an event
                 */
                rowSelectionChangedBatch: function (scope, rows, evt) {
                }
              }
            },
            methods: {
              selection: {
                /**
                 * @ngdoc function
                 * @name toggleRowSelection
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Toggles data row as selected or unselected
                 * @param {object} rowEntity gridOptions.data[] array instance
                 * @param {Event} evt object if raised from an event
                 */
                toggleRowSelection: function (rowEntity, evt) {
                  var row = grid.getRow(rowEntity);
                  if (row !== null) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name selectRow
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Select the data row
                 * @param {object} rowEntity gridOptions.data[] array instance
                 * @param {Event} evt object if raised from an event
                 */
                selectRow: function (rowEntity, evt) {
                  var row = grid.getRow(rowEntity);
                  if (row !== null && !row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name selectRowByVisibleIndex
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Select the specified row by visible index (i.e. if you
                 * specify row 0 you'll get the first visible row selected).  In this context
                 * visible means of those rows that are theoretically visible (i.e. not filtered),
                 * rather than rows currently rendered on the screen.
                 * @param {number} rowNum index within the rowsVisible array
                 * @param {Event} evt object if raised from an event
                 */
                selectRowByVisibleIndex: function (rowNum, evt) {
                  var row = grid.renderContainers.body.visibleRowCache[rowNum];
                  if (row !== null && typeof (row) !== 'undefined' && !row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name unSelectRow
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description UnSelect the data row
                 * @param {object} rowEntity gridOptions.data[] array instance
                 * @param {Event} evt object if raised from an event
                 */
                unSelectRow: function (rowEntity, evt) {
                  var row = grid.getRow(rowEntity);
                  if (row !== null && row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name unSelectRowByVisibleIndex
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Unselect the specified row by visible index (i.e. if you
                 * specify row 0 you'll get the first visible row unselected).  In this context
                 * visible means of those rows that are theoretically visible (i.e. not filtered),
                 * rather than rows currently rendered on the screen.
                 * @param {number} rowNum index within the rowsVisible array
                 * @param {Event} evt object if raised from an event
                 */
                unSelectRowByVisibleIndex: function (rowNum, evt) {
                  var row = grid.renderContainers.body.visibleRowCache[rowNum];
                  if (row !== null && typeof (row) !== 'undefined' && row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name selectAllRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Selects all rows.  Does nothing if multiSelect = false
                 * @param {Event} evt object if raised from an event
                 */
                selectAllRows: function (evt) {
                  if (grid.options.multiSelect !== false) {
                    var changedRows = [];
                    grid.rows.forEach(function (row) {
                      if (!row.isSelected && row.enableSelection !== false && grid.options.isRowSelectable(row) !== false) {
                        row.setSelected(true);
                        service.decideRaiseSelectionEvent(grid, row, changedRows, evt);
                      }
                    });
                    grid.selection.selectAll = true;
                    service.decideRaiseSelectionBatchEvent(grid, changedRows, evt);
                  }
                },
                /**
                 * @ngdoc function
                 * @name selectAllVisibleRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Selects all visible rows.  Does nothing if multiSelect = false
                 * @param {Event} evt object if raised from an event
                 */
                selectAllVisibleRows: function (evt) {
                  if (grid.options.multiSelect !== false) {
                    var changedRows = [];
                    grid.rows.forEach(function(row) {
                      if (row.visible) {
                        if (!row.isSelected && row.enableSelection !== false && grid.options.isRowSelectable(row) !== false) {
                          row.setSelected(true);
                          service.decideRaiseSelectionEvent(grid, row, changedRows, evt);
                        }
                      } else if (row.isSelected) {
                        row.setSelected(false);
                        service.decideRaiseSelectionEvent(grid, row, changedRows, evt);
                      }
                    });
                    grid.selection.selectAll = true;
                    service.decideRaiseSelectionBatchEvent(grid, changedRows, evt);
                  }
                },
                /**
                 * @ngdoc function
                 * @name clearSelectedRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Unselects all rows
                 * @param {Event} evt object if raised from an event
                 */
                clearSelectedRows: function (evt) {
                  service.clearSelectedRows(grid, evt);
                },
                /**
                 * @ngdoc function
                 * @name getSelectedRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description returns all selectedRow's entity references
                 */
                getSelectedRows: function () {
                  return service.getSelectedRows(grid).map(function (gridRow) {
                    return gridRow.entity;
                  }).filter(function (entity) {
                    return entity.hasOwnProperty('$$hashKey') || !angular.isObject(entity);
                  });
                },
                /**
                 * @ngdoc function
                 * @name getSelectedGridRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description returns all selectedRow's as gridRows
                 */
                getSelectedGridRows: function () {
                  return service.getSelectedRows(grid);
                },
                /**
                 * @ngdoc function
                 * @name getSelectedCount
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description returns the number of rows selected
                 */
                getSelectedCount: function () {
                  return grid.selection.selectedCount;
                },
                /**
                 * @ngdoc function
                 * @name setMultiSelect
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Sets the current gridOption.multiSelect to true or false
                 * @param {bool} multiSelect true to allow multiple rows
                 */
                setMultiSelect: function (multiSelect) {
                  grid.options.multiSelect = multiSelect;
                },
                /**
                 * @ngdoc function
                 * @name setModifierKeysToMultiSelect
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Sets the current gridOption.modifierKeysToMultiSelect to true or false
                 * @param {bool} modifierKeysToMultiSelect true to only allow multiple rows when using ctrlKey or shiftKey is used
                 */
                setModifierKeysToMultiSelect: function (modifierKeysToMultiSelect) {
                  grid.options.modifierKeysToMultiSelect = modifierKeysToMultiSelect;
                },
                /**
                 * @ngdoc function
                 * @name getSelectAllState
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Returns whether or not the selectAll checkbox is currently ticked.  The
                 * grid doesn't automatically select rows when you add extra data - so when you add data
                 * you need to explicitly check whether the selectAll is set, and then call setVisible rows
                 * if it is
                 */
                getSelectAllState: function () {
                  return grid.selection.selectAll;
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
           *  @name ui.grid.selection.api:GridOptions
           *
           *  @description GridOptions for selection feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           *  @ngdoc object
           *  @name enableRowSelection
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable row selection for entire grid.
           *  <br/>Defaults to true
           */
          gridOptions.enableRowSelection = gridOptions.enableRowSelection !== false;
          /**
           *  @ngdoc object
           *  @name multiSelect
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable multiple row selection for entire grid
           *  <br/>Defaults to true
           */
          gridOptions.multiSelect = gridOptions.multiSelect !== false;
          /**
           *  @ngdoc object
           *  @name noUnselect
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Prevent a row from being unselected.  Works in conjunction
           *  with `multiselect = false` and `gridApi.selection.selectRow()` to allow
           *  you to create a single selection only grid - a row is always selected, you
           *  can only select different rows, you can't unselect the row.
           *  <br/>Defaults to false
           */
          gridOptions.noUnselect = gridOptions.noUnselect === true;
          /**
           *  @ngdoc object
           *  @name modifierKeysToMultiSelect
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable multiple row selection only when using the ctrlKey or shiftKey. Requires multiSelect to be true.
           *  <br/>Defaults to false
           */
          gridOptions.modifierKeysToMultiSelect = gridOptions.modifierKeysToMultiSelect === true;
          /**
           *  @ngdoc object
           *  @name enableRowHeaderSelection
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable a row header to be used for selection
           *  <br/>Defaults to true
           */
          gridOptions.enableRowHeaderSelection = gridOptions.enableRowHeaderSelection !== false;
          /**
           *  @ngdoc object
           *  @name enableFullRowSelection
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable selection by clicking anywhere on the row.  Defaults to
           *  false if `enableRowHeaderSelection` is true, otherwise defaults to true.
           */
          if (typeof (gridOptions.enableFullRowSelection) === 'undefined') {
            gridOptions.enableFullRowSelection = !gridOptions.enableRowHeaderSelection;
          }
          /**
           *  @ngdoc object
           *  @name enableFocusRowOnRowHeaderClick
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable focuse row by clicking on the row header.  Defaults to
           *  true if `enableRowHeaderSelection` is true, otherwise defaults to false.
           */
          gridOptions.enableFocusRowOnRowHeaderClick = (gridOptions.enableFocusRowOnRowHeaderClick !== false)
            || !gridOptions.enableRowHeaderSelection;
          /**
           *  @ngdoc object
           *  @name enableSelectRowOnFocus
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable focuse row by clicking on the row anywhere.  Defaults true.
           */
          gridOptions.enableSelectRowOnFocus = (gridOptions.enableSelectRowOnFocus !== false);
          /**
           *  @ngdoc object
           *  @name enableSelectAll
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Enable the select all checkbox at the top of the selectionRowHeader
           *  <br/>Defaults to true
           */
          gridOptions.enableSelectAll = gridOptions.enableSelectAll !== false;
          /**
           *  @ngdoc object
           *  @name enableSelectionBatchEvent
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description If selected rows are changed in bulk, either via the API or
           *  via the selectAll checkbox, then a separate event is fired.  Setting this
           *  option to false will cause the rowSelectionChanged event to be called multiple times
           *  instead
           *  <br/>Defaults to true
           */
          gridOptions.enableSelectionBatchEvent = gridOptions.enableSelectionBatchEvent !== false;
          /**
           *  @ngdoc object
           *  @name selectionRowHeaderWidth
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description can be used to set a custom width for the row header selection column
           *  <br/>Defaults to 30px
           */
          gridOptions.selectionRowHeaderWidth = angular.isDefined(gridOptions.selectionRowHeaderWidth) ? gridOptions.selectionRowHeaderWidth : 30;
          /**
           *  @ngdoc object
           *  @name enableFooterTotalSelected
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Shows the total number of selected items in footer if true.
           *  <br/>Defaults to true.
           *  <br/>GridOptions.showGridFooter must also be set to true.
           */
          gridOptions.enableFooterTotalSelected = gridOptions.enableFooterTotalSelected !== false;

          /**
           *  @ngdoc object
           *  @name isRowSelectable
           *  @propertyOf  ui.grid.selection.api:GridOptions
           *  @description Makes it possible to specify a method that evaluates for each row and sets its "enableSelection" property.
           */
          gridOptions.isRowSelectable = angular.isDefined(gridOptions.isRowSelectable) ? gridOptions.isRowSelectable : angular.noop;
        },

        /**
         * @ngdoc function
         * @name toggleRowSelection
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Toggles row as selected or unselected
         * @param {Grid} grid grid object
         * @param {GridRow} row row to select or deselect
         * @param {Event} evt object if resulting from event
         * @param {bool} multiSelect if false, only one row at time can be selected
         * @param {bool} noUnselect if true then rows cannot be unselected
         */
        toggleRowSelection: function (grid, row, evt, multiSelect, noUnselect) {
          if ( row.enableSelection === false ) {
            return;
          }

          var selected = row.isSelected,
            selectedRows;

          if (!multiSelect) {
            if (!selected) {
              service.clearSelectedRows(grid, evt);
            }
            else {
              selectedRows = service.getSelectedRows(grid);
              if (selectedRows.length > 1) {
                selected = false; // Enable reselect of the row
                service.clearSelectedRows(grid, evt);
              }
            }
          }

          // only select row in this case
          if (!(selected && noUnselect)) {
            row.setSelected(!selected);
            if (row.isSelected === true) {
              grid.selection.lastSelectedRow = row;
            }

            selectedRows = service.getSelectedRows(grid);
            grid.selection.selectAll = grid.rows.length === selectedRows.length;

            grid.api.selection.raise.rowSelectionChanged(row, evt);
          }
        },
        /**
         * @ngdoc function
         * @name shiftSelect
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description selects a group of rows from the last selected row using the shift key
         * @param {Grid} grid grid object
         * @param {GridRow} row clicked row
         * @param {Event} evt object if raised from an event
         * @param {bool} multiSelect if false, does nothing this is for multiSelect only
         */
        shiftSelect: function (grid, row, evt, multiSelect) {
          if (!multiSelect) {
            return;
          }
          var selectedRows = service.getSelectedRows(grid);
          var fromRow = selectedRows.length > 0 ? grid.renderContainers.body.visibleRowCache.indexOf(grid.selection.lastSelectedRow) : 0;
          var toRow = grid.renderContainers.body.visibleRowCache.indexOf(row);
          // reverse select direction
          if (fromRow > toRow) {
            var tmp = fromRow;
            fromRow = toRow;
            toRow = tmp;
          }

          var changedRows = [];
          for (var i = fromRow; i <= toRow; i++) {
            var rowToSelect = grid.renderContainers.body.visibleRowCache[i];
            if (rowToSelect) {
              if (!rowToSelect.isSelected && rowToSelect.enableSelection !== false) {
                rowToSelect.setSelected(true);
                grid.selection.lastSelectedRow = rowToSelect;
                service.decideRaiseSelectionEvent(grid, rowToSelect, changedRows, evt);
              }
            }
          }
          service.decideRaiseSelectionBatchEvent(grid, changedRows, evt);
        },
        /**
         * @ngdoc function
         * @name getSelectedRows
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Returns all the selected rows
         * @param {Grid} grid grid object
         */
        getSelectedRows: function (grid) {
          return grid.rows.filter(function (row) {
            return row.isSelected;
          });
        },

        /**
         * @ngdoc function
         * @name clearSelectedRows
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Clears all selected rows
         * @param {Grid} grid grid object
         * @param {Event} evt object if raised from an event
         */
        clearSelectedRows: function (grid, evt) {
          var changedRows = [];
          service.getSelectedRows(grid).forEach(function (row) {
            if (row.isSelected) {
              row.setSelected(false);
              service.decideRaiseSelectionEvent(grid, row, changedRows, evt);
            }
          });
          grid.selection.selectAll = false;
          grid.selection.selectedCount = 0;
          service.decideRaiseSelectionBatchEvent(grid, changedRows, evt);
        },

        /**
         * @ngdoc function
         * @name decideRaiseSelectionEvent
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Decides whether to raise a single event or a batch event
         * @param {Grid} grid grid object
         * @param {GridRow} row row that has changed
         * @param {array} changedRows an array to which we can append the changed
         * @param {Event} evt object if raised from an event
         * row if we're doing batch events
         */
        decideRaiseSelectionEvent: function (grid, row, changedRows, evt) {
          if (!grid.options.enableSelectionBatchEvent) {
            grid.api.selection.raise.rowSelectionChanged(row, evt);
          }
          else {
            changedRows.push(row);
          }
        },

        /**
         * @ngdoc function
         * @name raiseSelectionEvent
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Decides whether we need to raise a batch event, and
         * raises it if we do.
         * @param {Grid} grid grid object
         * @param {array} changedRows an array of changed rows, only populated
         * @param {Event} evt object if raised from an event
         * if we're doing batch events
         */
        decideRaiseSelectionBatchEvent: function (grid, changedRows, evt) {
          if (changedRows.length > 0) {
            grid.api.selection.raise.rowSelectionChangedBatch(changedRows, evt);
          }
        }
      };

      return service;
    });

  /**
   *  @ngdoc directive
   *  @name ui.grid.selection.directive:uiGridSelection
   *  @element div
   *  @restrict A
   *
   *  @description Adds selection features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.selection']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.columnDefs = [
        {name: 'name', enableCellEdit: true},
        {name: 'title', enableCellEdit: true}
      ];
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-selection></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridSelection', ['uiGridSelectionConstants', 'uiGridSelectionService', 'uiGridConstants',
    function (uiGridSelectionConstants, uiGridSelectionService, uiGridConstants) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              uiGridSelectionService.initializeGrid(uiGridCtrl.grid);
              if (uiGridCtrl.grid.options.enableRowHeaderSelection) {
                var selectionRowHeaderDef = {
                  name: uiGridSelectionConstants.selectionRowHeaderColName,
                  displayName: '',
                  width: uiGridCtrl.grid.options.selectionRowHeaderWidth,
                  minWidth: 10,
                  cellTemplate: 'ui-grid/selectionRowHeader',
                  headerCellTemplate: 'ui-grid/selectionHeaderCell',
                  enableColumnResizing: false,
                  enableColumnMenu: false,
                  exporterSuppressExport: true,
                  allowCellFocus: true
                };

                uiGridCtrl.grid.addRowHeaderColumn(selectionRowHeaderDef, 0);
              }

              var processorSet = false;

              var processSelectableRows = function (rows) {
                rows.forEach(function (row) {
                  row.enableSelection = uiGridCtrl.grid.options.isRowSelectable(row);
                });
                return rows;
              };

              var updateOptions = function () {
                if (uiGridCtrl.grid.options.isRowSelectable !== angular.noop && processorSet !== true) {
                  uiGridCtrl.grid.registerRowsProcessor(processSelectableRows, 500);
                  processorSet = true;
                }
              };

              updateOptions();

              var dataChangeDereg = uiGridCtrl.grid.registerDataChangeCallback(updateOptions, [uiGridConstants.dataChange.OPTIONS]);

              $scope.$on('$destroy', dataChangeDereg);
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {

            }
          };
        }
      };
    }]);

  module.directive('uiGridSelectionRowHeaderButtons', ['$templateCache', 'uiGridSelectionService', 'gridUtil',
    function ($templateCache, uiGridSelectionService, gridUtil) {
      return {
        replace: true,
        restrict: 'E',
        template: $templateCache.get('ui-grid/selectionRowHeaderButtons'),
        scope: true,
        require: '^uiGrid',
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          var self = uiGridCtrl.grid;
          $scope.selectButtonClick = selectButtonClick;
          $scope.selectButtonKeyDown = selectButtonKeyDown;

          // On IE, prevent mousedowns on the select button from starting a selection.
          // If this is not done and you shift+click on another row, the browser will select a big chunk of text
          if (gridUtil.detectBrowser() === 'ie') {
            $elm.on('mousedown', selectButtonMouseDown);
          }

          function selectButtonKeyDown(row, evt) {
            if (evt.keyCode === 32 || evt.keyCode === 13) {
              evt.preventDefault();
              selectButtonClick(row, evt);
            }
          }

          function selectButtonClick(row, evt) {
            evt.stopPropagation();

            if (evt.shiftKey) {
              uiGridSelectionService.shiftSelect(self, row, evt, self.options.multiSelect);
            }
            else if (evt.ctrlKey || evt.metaKey) {
              uiGridSelectionService.toggleRowSelection(self, row, evt,
                self.options.multiSelect, self.options.noUnselect);
            }
            else if (row.groupHeader) {
              uiGridSelectionService.toggleRowSelection(self, row, evt, self.options.multiSelect, self.options.noUnselect);
              for (var i = 0; i < row.treeNode.children.length; i++) {
                uiGridSelectionService.toggleRowSelection(self, row.treeNode.children[i].row, evt, self.options.multiSelect, self.options.noUnselect);
              }
            }
            else {
              uiGridSelectionService.toggleRowSelection(self, row, evt,
                (self.options.multiSelect && !self.options.modifierKeysToMultiSelect), self.options.noUnselect);
            }
            self.options.enableFocusRowOnRowHeaderClick && row.setFocused(!row.isFocused) && self.api.selection.raise.rowFocusChanged(row, evt);
          }

          function selectButtonMouseDown(evt) {
            if (evt.ctrlKey || evt.shiftKey) {
              evt.target.onselectstart = function () { return false; };
              window.setTimeout(function () { evt.target.onselectstart = null; }, 0);
            }
          }

          $scope.$on('$destroy', function unbindEvents() {
            $elm.off();
          });
        }
      };
    }]);

  module.directive('uiGridSelectionSelectAllButtons', ['$templateCache', 'uiGridSelectionService',
    function ($templateCache, uiGridSelectionService) {
      return {
        replace: true,
        restrict: 'E',
        template: $templateCache.get('ui-grid/selectionSelectAllButtons'),
        scope: false,
        link: function ($scope) {
          var self = $scope.col.grid;

          $scope.headerButtonKeyDown = function (evt) {
            if (evt.keyCode === 32 || evt.keyCode === 13) {
              evt.preventDefault();
              $scope.headerButtonClick(evt);
            }
          };

          $scope.headerButtonClick = function (evt) {
            if (self.selection.selectAll) {
              uiGridSelectionService.clearSelectedRows(self, evt);
              if (self.options.noUnselect) {
                self.api.selection.selectRowByVisibleIndex(0, evt);
              }
              self.selection.selectAll = false;
            }
            else if (self.options.multiSelect) {
              self.api.selection.selectAllVisibleRows(evt);
              self.selection.selectAll = true;
            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.selection.directive:uiGridViewport
   *  @element div
   *
   *  @description Stacks on top of ui.grid.uiGridViewport to alter the attributes used
   *  for the grid row
   */
  module.directive('uiGridViewport',
      function () {
        return {
          priority: -200, // run after default  directive
          scope: false,
          compile: function ($elm) {
            var rowRepeatDiv = angular.element($elm[0].querySelector('.ui-grid-canvas:not(.ui-grid-empty-base-layer-container)').children[0]),
              newNgClass = "'ui-grid-row-selected': row.isSelected, 'ui-grid-row-focused': row.isFocused}",
              existingNgClass = rowRepeatDiv.attr('ng-class');

            if (existingNgClass) {
              newNgClass = existingNgClass.slice(0, -1) + ',' + newNgClass;
            } else {
              newNgClass = '{' + newNgClass;
            }
            rowRepeatDiv.attr('ng-class', newNgClass);

            return {
              pre: function ($scope, $elm, $attrs, controllers) {},
              post: function ($scope, $elm, $attrs, controllers) {}
            };
          }
        };
      });

  /**
   *  @ngdoc directive
   *  @name ui.grid.selection.directive:uiGridCell
   *  @element div
   *  @restrict A
   *
   *  @description Stacks on top of ui.grid.uiGridCell to provide selection feature
   */
  module.directive('uiGridCell',
    ['uiGridConstants', 'uiGridSelectionService',
      function (uiGridConstants, uiGridSelectionService) {
        return {
          priority: -200, // run after default uiGridCell directive
          restrict: 'A',
          require: '?^uiGrid',
          scope: false,
          link: function ($scope, $elm, $attrs, uiGridCtrl) {
            var touchStartTime = 0,
              touchStartPos = {},
              touchTimeout = 300,
              touchPosDiff = 100;

            // Bind to keydown events in the render container
            if (uiGridCtrl.grid.api.cellNav) {
              uiGridCtrl.grid.api.cellNav.on.viewPortKeyDown($scope, function (evt, rowCol) {
                if (rowCol === null ||
                  rowCol.row !== $scope.row ||
                  rowCol.col !== $scope.col) {
                  return;
                }

                if (evt.keyCode === uiGridConstants.keymap.SPACE && $scope.col.colDef.name === 'selectionRowHeaderCol') {
                  evt.preventDefault();
                  uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt,
                    ($scope.grid.options.multiSelect && !$scope.grid.options.modifierKeysToMultiSelect),
                    $scope.grid.options.noUnselect);
                  $scope.$apply();
                }
              });
            }

            var selectCells = function (evt) {
              // if you click on expandable icon doesn't trigger selection
              if (evt.target.className === "ui-grid-icon-minus-squared" || evt.target.className === "ui-grid-icon-plus-squared") {
                return;
              }

              // if we get a click, then stop listening for touchend
              $elm.off('touchend', touchEnd);

              if (evt.shiftKey) {
                uiGridSelectionService.shiftSelect($scope.grid, $scope.row, evt, $scope.grid.options.multiSelect);
              }
              else if (evt.ctrlKey || evt.metaKey) {
                uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt,
                  $scope.grid.options.multiSelect, $scope.grid.options.noUnselect);
              }
              else if ($scope.grid.options.enableSelectRowOnFocus) {
                uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt,
                  ($scope.grid.options.multiSelect && !$scope.grid.options.modifierKeysToMultiSelect),
                  $scope.grid.options.noUnselect);
              }
              $scope.row.setFocused(!$scope.row.isFocused);
              $scope.grid.api.selection.raise.rowFocusChanged($scope.row, evt);
              $scope.$apply();

              // don't re-enable the touchend handler for a little while - some devices generate both, and it will
              // take a little while to move your hand from the mouse to the screen if you have both modes of input
              window.setTimeout(function () {
                $elm.on('touchend', touchEnd);
              }, touchTimeout);
            };

            var touchStart = function (evt) {
              touchStartTime = (new Date()).getTime();
              touchStartPos = evt.changedTouches[0];

              // if we get a touch event, then stop listening for click
              $elm.off('click', selectCells);
            };

            var touchEnd = function (evt) {
              var touchEndTime = (new Date()).getTime();
              var touchEndPos = evt.changedTouches[0];
              var touchTime = touchEndTime - touchStartTime;
              var touchXDiff = Math.abs(touchStartPos.clientX - touchEndPos.clientX)
              var touchYDiff = Math.abs(touchStartPos.clientY - touchEndPos.clientY)


              if (touchXDiff < touchPosDiff && touchYDiff < touchPosDiff) {
                if (touchTime < touchTimeout) {
                // short touch
                  selectCells(evt);
                }
              }

              // don't re-enable the click handler for a little while - some devices generate both, and it will
              // take a little while to move your hand from the screen to the mouse if you have both modes of input
              window.setTimeout(function () {
                $elm.on('click', selectCells);
              }, touchTimeout);
            };

            function registerRowSelectionEvents() {
              if ($scope.grid.options.enableRowSelection && $scope.grid.options.enableFullRowSelection && $scope.col.colDef.name !== 'selectionRowHeaderCol') {
                $elm.addClass('ui-grid-disable-selection');
                $elm.on('touchstart', touchStart);
                $elm.on('touchend', touchEnd);
                $elm.on('click', selectCells);

                $scope.registered = true;
              }
            }

            function unregisterRowSelectionEvents() {
              if ($scope.registered) {
                $elm.removeClass('ui-grid-disable-selection');
                $elm.off('touchstart', touchStart);
                $elm.off('touchend', touchEnd);
                $elm.off('click', selectCells);

                $scope.registered = false;
              }
            }

            registerRowSelectionEvents();

            // register a dataChange callback so that we can change the selection configuration dynamically
            // if the user changes the options
            var dataChangeUnreg = $scope.grid.registerDataChangeCallback(function () {
              if ($scope.grid.options.enableRowSelection && $scope.grid.options.enableFullRowSelection &&
                !$scope.registered) {
                registerRowSelectionEvents();
              }
              else if ((!$scope.grid.options.enableRowSelection || !$scope.grid.options.enableFullRowSelection) &&
                $scope.registered) {
                unregisterRowSelectionEvents();
              }
            }, [uiGridConstants.dataChange.OPTIONS]);

            $elm.on('$destroy', dataChangeUnreg);
          }
        };
      }]);

  module.directive('uiGridGridFooter', ['$compile', 'gridUtil', function ($compile, gridUtil) {
    return {
      restrict: 'EA',
      replace: true,
      priority: -1000,
      require: '^uiGrid',
      scope: true,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            if (!uiGridCtrl.grid.options.showGridFooter) {
              return;
            }

            gridUtil.getTemplate('ui-grid/gridFooterSelectedItems')
              .then(function (contents) {
                var template = angular.element(contents);

                var newElm = $compile(template)($scope);

                angular.element($elm[0].getElementsByClassName('ui-grid-grid-footer')[0]).append(newElm);
              });
          },
          post: function ($scope, $elm, $attrs, controllers) {

          }
        };
      }
    };
  }]);
})();

angular.module('ui.grid.selection').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/gridFooterSelectedItems',
    "<span ng-if=\"grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected\">({{\"search.selectedItems\" | t}} {{grid.selection.selectedCount}})</span>"
  );


  $templateCache.put('ui-grid/selectionHeaderCell',
    "<div><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><ui-grid-selection-select-all-buttons ng-if=\"grid.options.enableSelectAll\" role=\"checkbox\" ng-model=\"grid.selection.selectAll\"></ui-grid-selection-select-all-buttons></div></div>"
  );


  $templateCache.put('ui-grid/selectionRowHeader',
    "<div class=\"ui-grid-cell-contents ui-grid-disable-selection clickable\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div>"
  );


  $templateCache.put('ui-grid/selectionRowHeaderButtons',
    "<div class=\"ui-grid-selection-row-header-buttons ui-grid-icon-ok clickable\" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" tabindex=\"0\" ng-click=\"selectButtonClick(row, $event)\" ng-keydown=\"selectButtonKeyDown(row, $event)\" role=\"checkbox\" ng-model=\"row.isSelected\">&nbsp;</div>"
  );


  $templateCache.put('ui-grid/selectionSelectAllButtons',
    "<div role=\"button\" tabindex=\"0\" class=\"ui-grid-selection-row-header-buttons ui-grid-icon-ok\" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-click=\"headerButtonClick($event)\" ng-keydown=\"headerButtonKeyDown($event)\"></div>"
  );

}]);
