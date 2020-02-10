/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.resizeColumns
   * @description
   *
   * # ui.grid.resizeColumns
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module allows columns to be resized.
   */
  var module = angular.module('ui.grid.resizeColumns', ['ui.grid']);

  module.service('uiGridResizeColumnsService', ['gridUtil', '$q', '$rootScope',
    function (gridUtil, $q, $rootScope) {
      return {
        defaultGridOptions: function(gridOptions) {
          // default option to true unless it was explicitly set to false
          /**
           *  @ngdoc object
           *  @name ui.grid.resizeColumns.api:GridOptions
           *
           *  @description GridOptions for resizeColumns feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           *  @ngdoc object
           *  @name enableColumnResizing
           *  @propertyOf  ui.grid.resizeColumns.api:GridOptions
           *  @description Enable column resizing on the entire grid
           *  <br/>Defaults to true
           */
          gridOptions.enableColumnResizing = gridOptions.enableColumnResizing !== false;

          // legacy support
          // use old name if it is explicitly false
          if (gridOptions.enableColumnResize === false) {
            gridOptions.enableColumnResizing = false;
          }
        },

        colResizerColumnBuilder: function (colDef, col, gridOptions) {
          var promises = [];

          /**
           *  @ngdoc object
           *  @name ui.grid.resizeColumns.api:ColumnDef
           *
           *  @description ColumnDef for resizeColumns feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
           */

          /**
           *  @ngdoc object
           *  @name enableColumnResizing
           *  @propertyOf  ui.grid.resizeColumns.api:ColumnDef
           *  @description Enable column resizing on an individual column
           *  <br/>Defaults to GridOptions.enableColumnResizing
           */
          // default to true unless gridOptions or colDef is explicitly false
          colDef.enableColumnResizing = colDef.enableColumnResizing === undefined ? gridOptions.enableColumnResizing : colDef.enableColumnResizing;


          // legacy support of old option name
          if (colDef.enableColumnResize === false) {
            colDef.enableColumnResizing = false;
          }

          return $q.all(promises);
        },

        registerPublicApi: function (grid) {
            /**
             *  @ngdoc object
             *  @name ui.grid.resizeColumns.api:PublicApi
             *  @description Public Api for column resize feature.
             */
            var publicApi = {
              events: {
                /**
                 * @ngdoc event
                 * @name columnSizeChanged
                 * @eventOf  ui.grid.resizeColumns.api:PublicApi
                 * @description raised when column is resized
                 * <pre>
                 *      gridApi.colResizable.on.columnSizeChanged(scope,function(colDef, deltaChange) {})
                 * </pre>
                 * @param {object} colDef the column that was resized
                 * @param {integer} delta of the column size change
                 */
                colResizable: {
                  columnSizeChanged: function (colDef, deltaChange) {
                  }
                }
              }
            };
            grid.api.registerEventsFromObject(publicApi.events);
        },

        fireColumnSizeChanged: function (grid, colDef, deltaChange) {
          $rootScope.$applyAsync(function () {
            if ( grid.api.colResizable ) {
              grid.api.colResizable.raise.columnSizeChanged(colDef, deltaChange);
            } else {
              gridUtil.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.");
            }
          });
        },

        // get either this column, or the column next to this column, to resize,
        // returns the column we're going to resize
        findTargetCol: function(col, position, rtlMultiplier) {
          var renderContainer = col.getRenderContainer();

          if (position === 'left') {
            // Get the column to the left of this one
            var colIndex = renderContainer.visibleColumnCache.indexOf(col);
            return renderContainer.visibleColumnCache[colIndex - 1 * rtlMultiplier];
          } else {
            return col;
          }
        }
      };
    }]);


  /**
   * @ngdoc directive
   * @name ui.grid.resizeColumns.directive:uiGridResizeColumns
   * @element div
   * @restrict A
   * @description
   * Enables resizing for all columns on the grid. If, for some reason, you want to use the ui-grid-resize-columns directive, but not allow column resizing, you can explicitly set the
   * option to false. This prevents resizing for the entire grid, regardless of individual columnDef options.
   *
   * @example
   <doc:example module="app">
   <doc:source>
   <script>
   var app = angular.module('app', ['ui.grid', 'ui.grid.resizeColumns']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.gridOpts = {
            data: [
              { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
              { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
              { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
              { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" }
            ]
          };
        }]);
   </script>

   <div ng-controller="MainCtrl">
   <div class="testGrid" ui-grid="gridOpts" ui-grid-resize-columns ></div>
   </div>
   </doc:source>
   <doc:scenario>

   </doc:scenario>
   </doc:example>
   */
  module.directive('uiGridResizeColumns', ['gridUtil', 'uiGridResizeColumnsService', function (gridUtil, uiGridResizeColumnsService) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            uiGridResizeColumnsService.defaultGridOptions(uiGridCtrl.grid.options);
            uiGridCtrl.grid.registerColumnBuilder( uiGridResizeColumnsService.colResizerColumnBuilder);
            uiGridResizeColumnsService.registerPublicApi(uiGridCtrl.grid);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);

  // Extend the uiGridHeaderCell directive
  module.directive('uiGridHeaderCell', ['gridUtil', '$templateCache', '$compile', '$q', 'uiGridResizeColumnsService', 'uiGridConstants', function (gridUtil, $templateCache, $compile, $q, uiGridResizeColumnsService, uiGridConstants) {
    return {
      // Run after the original uiGridHeaderCell
      priority: -10,
      require: '^uiGrid',
      // scope: false,
      compile: function() {
        return {
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
            var grid = uiGridCtrl.grid;

            if (grid.options.enableColumnResizing) {
              var columnResizerElm = $templateCache.get('ui-grid/columnResizer');

              var rtlMultiplier = 1;
              // when in RTL mode reverse the direction using the rtlMultiplier and change the position to left
              if (grid.isRTL()) {
                $scope.position = 'left';
                rtlMultiplier = -1;
              }

              var displayResizers = function() {

                // remove any existing resizers.
                var resizers = $elm[0].getElementsByClassName('ui-grid-column-resizer');
                for ( var i = 0; i < resizers.length; i++ ) {
                  angular.element(resizers[i]).remove();
                }

                // get the target column for the left resizer
                var otherCol = uiGridResizeColumnsService.findTargetCol($scope.col, 'left', rtlMultiplier);
                var renderContainer = $scope.col.getRenderContainer();

                // Don't append the left resizer if this is the first column or the column to the left of this one has resizing disabled
                if (otherCol && renderContainer.visibleColumnCache.indexOf($scope.col) !== 0 && otherCol.colDef.enableColumnResizing !== false) {
                  var resizerLeft = angular.element(columnResizerElm).clone();
                  resizerLeft.attr('position', 'left');

                  $elm.prepend(resizerLeft);
                  $compile(resizerLeft)($scope);
                }

                // Don't append the right resizer if this column has resizing disabled
                if ($scope.col.colDef.enableColumnResizing !== false) {
                  var resizerRight = angular.element(columnResizerElm).clone();
                  resizerRight.attr('position', 'right');

                  $elm.append(resizerRight);
                  $compile(resizerRight)($scope);
                }
              };

              displayResizers();

              var waitDisplay = function() {
                $scope.$applyAsync(displayResizers);
              };

              var dataChangeDereg = grid.registerDataChangeCallback( waitDisplay, [uiGridConstants.dataChange.COLUMN] );

              $scope.$on( '$destroy', dataChangeDereg );
            }
          }
        };
      }
    };
  }]);



  /**
   * @ngdoc directive
   * @name ui.grid.resizeColumns.directive:uiGridColumnResizer
   * @element div
   * @restrict A
   *
   * @description
   * Draggable handle that controls column resizing.
   *
   * @example
   <doc:example module="app">
     <doc:source>
       <script>
        var app = angular.module('app', ['ui.grid', 'ui.grid.resizeColumns']);

        app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.gridOpts = {
            enableColumnResizing: true,
            data: [
              { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
              { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
              { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
              { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" }
            ]
          };
        }]);
       </script>

       <div ng-controller="MainCtrl">
        <div class="testGrid" ui-grid="gridOpts"></div>
       </div>
     </doc:source>
     <doc:scenario>
      // TODO: e2e specs?

      // TODO: post-resize a horizontal scroll event should be fired
     </doc:scenario>
   </doc:example>
   */
  module.directive('uiGridColumnResizer', ['$document', 'gridUtil', 'uiGridConstants', 'uiGridResizeColumnsService', function ($document, gridUtil, uiGridConstants, uiGridResizeColumnsService) {
    var resizeOverlay = angular.element('<div class="ui-grid-resize-overlay"></div>');

    return {
      priority: 0,
      scope: {
        col: '=',
        position: '@',
        renderIndex: '='
      },
      require: '?^uiGrid',
      link: function ($scope, $elm, $attrs, uiGridCtrl) {
        var startX = 0,
            x = 0,
            gridLeft = 0,
            rtlMultiplier = 1;

        // when in RTL mode reverse the direction using the rtlMultiplier and change the position to left
        if (uiGridCtrl.grid.isRTL()) {
          $scope.position = 'left';
          rtlMultiplier = -1;
        }

        if ($scope.position === 'left') {
          $elm.addClass('left');
        }
        else if ($scope.position === 'right') {
          $elm.addClass('right');
        }

        // Refresh the grid canvas
        //   takes an argument representing the diff along the X-axis that the resize had
        function refreshCanvas(xDiff) {
          // Then refresh the grid canvas, rebuilding the styles so that the scrollbar updates its size
          uiGridCtrl.grid.refreshCanvas(true).then( function() {
            uiGridCtrl.grid.queueGridRefresh();
          });
        }

        // Check that the requested width isn't wider than the maxWidth, or narrower than the minWidth
        // Returns the new recommended with, after constraints applied
        function constrainWidth(col, width) {
          var newWidth = width;

          // If the new width would be less than the column's allowably minimum width, don't allow it
          if (col.minWidth && newWidth < col.minWidth) {
            newWidth = col.minWidth;
          }
          else if (col.maxWidth && newWidth > col.maxWidth) {
            newWidth = col.maxWidth;
          }

          return newWidth;
        }


        /*
         * Our approach to event handling aims to deal with both touch devices and mouse devices
         * We register down handlers on both touch and mouse.  When a touchstart or mousedown event
         * occurs, we register the corresponding touchmove/touchend, or mousemove/mouseend events.
         *
         * This way we can listen for both without worrying about the fact many touch devices also emulate
         * mouse events - basically whichever one we hear first is what we'll go with.
         */
        function moveFunction(event, args) {
          if (event.originalEvent) { event = event.originalEvent; }
          event.preventDefault();

          x = (event.targetTouches ? event.targetTouches[0] : event).clientX - gridLeft;

          if (x < 0) { x = 0; }
          else if (x > uiGridCtrl.grid.gridWidth) { x = uiGridCtrl.grid.gridWidth; }

          var col = uiGridResizeColumnsService.findTargetCol($scope.col, $scope.position, rtlMultiplier);

          // Don't resize if it's disabled on this column
          if (col.colDef.enableColumnResizing === false) {
            return;
          }

          if (!uiGridCtrl.grid.element.hasClass('column-resizing')) {
            uiGridCtrl.grid.element.addClass('column-resizing');
          }

          // Get the diff along the X axis
          var xDiff = x - startX;

          // Get the width that this mouse would give the column
          var newWidth = parseInt(col.drawnWidth + xDiff * rtlMultiplier, 10);

          // check we're not outside the allowable bounds for this column
          x = x + ( constrainWidth(col, newWidth) - newWidth ) * rtlMultiplier;

          resizeOverlay.css({ left: x + 'px' });

          uiGridCtrl.fireEvent(uiGridConstants.events.ITEM_DRAGGING);
        }


        function upFunction(event) {
          if (event.originalEvent) { event = event.originalEvent; }
          event.preventDefault();

          uiGridCtrl.grid.element.removeClass('column-resizing');

          resizeOverlay.remove();

          // Resize the column
          x = (event.changedTouches ? event.changedTouches[0] : event).clientX - gridLeft;
          var xDiff = x - startX;

          if (xDiff === 0) {
            // no movement, so just reset event handlers, including turning back on both
            // down events - we turned one off when this event started
            offAllEvents();
            onDownEvents();
            return;
          }

          var col = uiGridResizeColumnsService.findTargetCol($scope.col, $scope.position, rtlMultiplier);

          // Don't resize if it's disabled on this column
          if (col.colDef.enableColumnResizing === false) {
            return;
          }

          // Get the new width
          var newWidth = parseInt(col.drawnWidth + xDiff * rtlMultiplier, 10);

          // check we're not outside the allowable bounds for this column
          col.width = constrainWidth(col, newWidth);
          col.hasCustomWidth = true;

          refreshCanvas(xDiff);

          uiGridResizeColumnsService.fireColumnSizeChanged(uiGridCtrl.grid, col.colDef, xDiff);

          // stop listening of up and move events - wait for next down
          // reset the down events - we will have turned one off when this event started
          offAllEvents();
          onDownEvents();
        }


        var downFunction = function(event, args) {
          if (event.originalEvent) { event = event.originalEvent; }
          event.stopPropagation();

          // Get the left offset of the grid
          // gridLeft = uiGridCtrl.grid.element[0].offsetLeft;
          gridLeft = uiGridCtrl.grid.element[0].getBoundingClientRect().left;

          // Get the starting X position, which is the X coordinate of the click minus the grid's offset
          startX = (event.targetTouches ? event.targetTouches[0] : event).clientX - gridLeft;

          // Append the resizer overlay
          uiGridCtrl.grid.element.append(resizeOverlay);

          // Place the resizer overlay at the start position
          resizeOverlay.css({ left: startX });

          // Add handlers for move and up events - if we were mousedown then we listen for mousemove and mouseup, if
          // we were touchdown then we listen for touchmove and touchup.  Also remove the handler for the equivalent
          // down event - so if we're touchdown, then remove the mousedown handler until this event is over, if we're
          // mousedown then remove the touchdown handler until this event is over, this avoids processing duplicate events
          if ( event.type === 'touchstart' ) {
            $document.on('touchend', upFunction);
            $document.on('touchmove', moveFunction);
            $elm.off('mousedown', downFunction);
          }
          else {
            $document.on('mouseup', upFunction);
            $document.on('mousemove', moveFunction);
            $elm.off('touchstart', downFunction);
          }
        };

        var onDownEvents = function() {
          $elm.on('mousedown', downFunction);
          $elm.on('touchstart', downFunction);
        };

        var offAllEvents = function() {
          $document.off('mouseup', upFunction);
          $document.off('touchend', upFunction);
          $document.off('mousemove', moveFunction);
          $document.off('touchmove', moveFunction);
          $elm.off('mousedown', downFunction);
          $elm.off('touchstart', downFunction);
        };

        onDownEvents();


        // On doubleclick, resize to fit all rendered cells
        var dblClickFn = function(event, args) {
          event.stopPropagation();

          var col = uiGridResizeColumnsService.findTargetCol($scope.col, $scope.position, rtlMultiplier);

          // Don't resize if it's disabled on this column
          if (col.colDef.enableColumnResizing === false) {
            return;
          }

          // Go through the rendered rows and find out the max size for the data in this column
          var maxWidth = 0;

          // Get the parent render container element
          var renderContainerElm = gridUtil.closestElm($elm, '.ui-grid-render-container');

          // Get the cell contents so we measure correctly. For the header cell we have to account for the sort icon and the menu buttons, if present
          var cells = renderContainerElm.querySelectorAll('.' + uiGridConstants.COL_CLASS_PREFIX + col.uid + ' .ui-grid-cell-contents');
          Array.prototype.forEach.call(cells, function (cell) {
              // Get the cell width
              // gridUtil.logDebug('width', gridUtil.elementWidth(cell));

              // Account for the menu button if it exists
              var menuButton;
              if (angular.element(cell).parent().hasClass('ui-grid-header-cell')) {
                menuButton = angular.element(cell).parent()[0].querySelectorAll('.ui-grid-column-menu-button');
              }

              gridUtil.fakeElement(cell, {}, function(newElm) {
                // Make the element float since it's a div and can expand to fill its container
                var e = angular.element(newElm);
                e.attr('style', 'float: left');

                var width = gridUtil.elementWidth(e);

                if (menuButton) {
                  var menuButtonWidth = gridUtil.elementWidth(menuButton);
                  width = width + menuButtonWidth;
                }

                if (width > maxWidth) {
                  maxWidth = width;
                }
              });
            });

          // check we're not outside the allowable bounds for this column
          var newWidth = constrainWidth(col, maxWidth);
          var xDiff = newWidth - col.drawnWidth;
          col.width = newWidth;
          col.hasCustomWidth = true;

          refreshCanvas(xDiff);

          uiGridResizeColumnsService.fireColumnSizeChanged(uiGridCtrl.grid, col.colDef, xDiff);        };
        $elm.on('dblclick', dblClickFn);

        $elm.on('$destroy', function() {
          $elm.off('dblclick', dblClickFn);
          offAllEvents();
        });
      }
    };
  }]);
})();

angular.module('ui.grid.resizeColumns').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/columnResizer',
    "<div ui-grid-column-resizer ng-if=\"grid.options.enableColumnResizing\" class=\"ui-grid-column-resizer\" col=\"col\" position=\"right\" render-index=\"renderIndex\" unselectable=\"on\"></div>"
  );

}]);
