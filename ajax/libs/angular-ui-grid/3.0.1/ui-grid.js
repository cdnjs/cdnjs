/*!
 * ui-grid - v3.0.1 - 2015-07-17
 * Copyright (c) 2015 ; License: MIT 
 */

(function () {
  'use strict';
  angular.module('ui.grid.i18n', []);
  angular.module('ui.grid', ['ui.grid.i18n']);
})();
(function () {
  'use strict';
  angular.module('ui.grid').constant('uiGridConstants', {
    LOG_DEBUG_MESSAGES: true,
    LOG_WARN_MESSAGES: true,
    LOG_ERROR_MESSAGES: true,
    CUSTOM_FILTERS: /CUSTOM_FILTERS/g,
    COL_FIELD: /COL_FIELD/g,
    MODEL_COL_FIELD: /MODEL_COL_FIELD/g,
    TOOLTIP: /title=\"TOOLTIP\"/g,
    DISPLAY_CELL_TEMPLATE: /DISPLAY_CELL_TEMPLATE/g,
    TEMPLATE_REGEXP: /<.+>/,
    FUNC_REGEXP: /(\([^)]*\))?$/,
    DOT_REGEXP: /\./g,
    APOS_REGEXP: /'/g,
    BRACKET_REGEXP: /^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,
    COL_CLASS_PREFIX: 'ui-grid-col',
    events: {
      GRID_SCROLL: 'uiGridScroll',
      COLUMN_MENU_SHOWN: 'uiGridColMenuShown',
      ITEM_DRAGGING: 'uiGridItemDragStart', // For any item being dragged
      COLUMN_HEADER_CLICK: 'uiGridColumnHeaderClick'
    },
    // copied from http://www.lsauer.com/2011/08/javascript-keymap-keycodes-in-json.html
    keymap: {
      TAB: 9,
      STRG: 17,
      CAPSLOCK: 20,
      CTRL: 17,
      CTRLRIGHT: 18,
      CTRLR: 18,
      SHIFT: 16,
      RETURN: 13,
      ENTER: 13,
      BACKSPACE: 8,
      BCKSP: 8,
      ALT: 18,
      ALTR: 17,
      ALTRIGHT: 17,
      SPACE: 32,
      WIN: 91,
      MAC: 91,
      FN: null,
      PG_UP: 33,
      PG_DOWN: 34,
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39,
      ESC: 27,
      DEL: 46,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123
    },
    ASC: 'asc',
    DESC: 'desc',
    filter: {
      STARTS_WITH: 2,
      ENDS_WITH: 4,
      EXACT: 8,
      CONTAINS: 16,
      GREATER_THAN: 32,
      GREATER_THAN_OR_EQUAL: 64,
      LESS_THAN: 128,
      LESS_THAN_OR_EQUAL: 256,
      NOT_EQUAL: 512,
      SELECT: 'select',
      INPUT: 'input'
    },

    aggregationTypes: {
      sum: 2,
      count: 4,
      avg: 8,
      min: 16,
      max: 32
    },

    // TODO(c0bra): Create full list of these somehow. NOTE: do any allow a space before or after them?
    CURRENCY_SYMBOLS: ['ƒ', '$', '£', '$', '¤', '¥', '៛', '₩', '₱', '฿', '₫'],

    scrollDirection: {
      UP: 'up',
      DOWN: 'down',
      LEFT: 'left',
      RIGHT: 'right',
      NONE: 'none'

    },

    dataChange: {
      ALL: 'all',
      EDIT: 'edit',
      ROW: 'row',
      COLUMN: 'column',
      OPTIONS: 'options'
    },
    scrollbars: {
      NEVER: 0,
      ALWAYS: 1
      //WHEN_NEEDED: 2
    }
  });

})();
angular.module('ui.grid').directive('uiGridCell', ['$compile', '$parse', 'gridUtil', 'uiGridConstants', function ($compile, $parse, gridUtil, uiGridConstants) {
  var uiGridCell = {
    priority: 0,
    scope: false,
    require: '?^uiGrid',
    compile: function() {
      return {
        pre: function($scope, $elm, $attrs, uiGridCtrl) {
          function compileTemplate() {
            var compiledElementFn = $scope.col.compiledElementFn;

            compiledElementFn($scope, function(clonedElement, scope) {
              $elm.append(clonedElement);
            });
          }

          // If the grid controller is present, use it to get the compiled cell template function
          if (uiGridCtrl && $scope.col.compiledElementFn) {
             compileTemplate();
          }
          // No controller, compile the element manually (for unit tests)
          else {
            if ( uiGridCtrl && !$scope.col.compiledElementFn ){
              // gridUtil.logError('Render has been called before precompile.  Please log a ui-grid issue');  

              $scope.col.getCompiledElementFn()
                .then(function (compiledElementFn) {
                  compiledElementFn($scope, function(clonedElement, scope) {
                    $elm.append(clonedElement);
                  });
                });
            }
            else {
              var html = $scope.col.cellTemplate
                .replace(uiGridConstants.MODEL_COL_FIELD, 'row.entity.' + gridUtil.preEval($scope.col.field))
                .replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

              var cellElement = $compile(html)($scope);
              $elm.append(cellElement);
            }
          }
        },
        post: function($scope, $elm, $attrs, uiGridCtrl) {
          var initColClass = $scope.col.getColClass(false);
          $elm.addClass(initColClass);

          var classAdded;
          var updateClass = function( grid ){
            var contents = $elm;
            if ( classAdded ){
              contents.removeClass( classAdded );
              classAdded = null;
            }

            if (angular.isFunction($scope.col.cellClass)) {
              classAdded = $scope.col.cellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
            }
            else {
              classAdded = $scope.col.cellClass;
            }
            contents.addClass(classAdded);
          };

          if ($scope.col.cellClass) {
            updateClass();
          }
          
          // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
          var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateClass, [uiGridConstants.dataChange.COLUMN, uiGridConstants.dataChange.EDIT]);
          
          // watch the col and row to see if they change - which would indicate that we've scrolled or sorted or otherwise
          // changed the row/col that this cell relates to, and we need to re-evaluate cell classes and maybe other things
          var cellChangeFunction = function( n, o ){
            if ( n !== o ) {
              if ( classAdded || $scope.col.cellClass ){
                updateClass();
              }

              // See if the column's internal class has changed
              var newColClass = $scope.col.getColClass(false);
              if (newColClass !== initColClass) {
                $elm.removeClass(initColClass);
                $elm.addClass(newColClass);
                initColClass = newColClass;
              }
            }
          };

          // TODO(c0bra): Turn this into a deep array watch
/*        shouldn't be needed any more given track by col.name
          var colWatchDereg = $scope.$watch( 'col', cellChangeFunction );
*/
          var rowWatchDereg = $scope.$watch( 'row', cellChangeFunction );
          
          
          var deregisterFunction = function() {
            dataChangeDereg();
//            colWatchDereg();
            rowWatchDereg(); 
          };
          
          $scope.$on( '$destroy', deregisterFunction );
          $elm.on( '$destroy', deregisterFunction );
        }
      };
    }
  };

  return uiGridCell;
}]);


(function(){

angular.module('ui.grid')
.service('uiGridColumnMenuService', [ 'i18nService', 'uiGridConstants', 'gridUtil', 
function ( i18nService, uiGridConstants, gridUtil ) {
/**
 *  @ngdoc service
 *  @name ui.grid.service:uiGridColumnMenuService
 *
 *  @description Services for working with column menus, factored out
 *  to make the code easier to understand
 */

  var service = {
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name initialize
     * @description  Sets defaults, puts a reference to the $scope on 
     * the uiGridController
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * @param {controller} uiGridCtrl the uiGridController for the grid
     * we're on
     * 
     */
    initialize: function( $scope, uiGridCtrl ){
      $scope.grid = uiGridCtrl.grid;

      // Store a reference to this link/controller in the main uiGrid controller
      // to allow showMenu later
      uiGridCtrl.columnMenuScope = $scope;
      
      // Save whether we're shown or not so the columns can check
      $scope.menuShown = false;
    },
    
    
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name setColMenuItemWatch
     * @description  Setup a watch on $scope.col.menuItems, and update
     * menuItems based on this.  $scope.col needs to be set by the column
     * before calling the menu.
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * @param {controller} uiGridCtrl the uiGridController for the grid
     * we're on
     * 
     */    
    setColMenuItemWatch: function ( $scope ){
      var deregFunction = $scope.$watch('col.menuItems', function (n, o) {
        if (typeof(n) !== 'undefined' && n && angular.isArray(n)) {
          n.forEach(function (item) {
            if (typeof(item.context) === 'undefined' || !item.context) {
              item.context = {};
            }
            item.context.col = $scope.col;
          });

          $scope.menuItems = $scope.defaultMenuItems.concat(n);
        }
        else {
          $scope.menuItems = $scope.defaultMenuItems;
        }
      }); 
      
      $scope.$on( '$destroy', deregFunction );     
    },


    /**
     * @ngdoc boolean
     * @name enableSorting
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description (optional) True by default. When enabled, this setting adds sort
     * widgets to the column header, allowing sorting of the data in the individual column.
     */
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name sortable
     * @description  determines whether this column is sortable
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * 
     */    
    sortable: function( $scope ) {
      if ( $scope.grid.options.enableSorting && typeof($scope.col) !== 'undefined' && $scope.col && $scope.col.enableSorting) {
        return true;
      }
      else {
        return false;
      }
    },
    
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name isActiveSort
     * @description  determines whether the requested sort direction is current active, to 
     * allow highlighting in the menu
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * @param {string} direction the direction that we'd have selected for us to be active
     * 
     */  
    isActiveSort: function( $scope, direction ){
      return (typeof($scope.col) !== 'undefined' && typeof($scope.col.sort) !== 'undefined' && 
              typeof($scope.col.sort.direction) !== 'undefined' && $scope.col.sort.direction === direction);
      
    },
    
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name suppressRemoveSort
     * @description  determines whether we should suppress the removeSort option
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * 
     */  
    suppressRemoveSort: function( $scope ) {
      if ($scope.col && $scope.col.suppressRemoveSort) {
        return true;
      }
      else {
        return false;
      }
    },       


    /**
     * @ngdoc boolean
     * @name enableHiding
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description (optional) True by default. When set to false, this setting prevents a user from hiding the column
     * using the column menu or the grid menu.
     */
    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name hideable
     * @description  determines whether a column can be hidden, by checking the enableHiding columnDef option
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * 
     */  
    hideable: function( $scope ) {
      if (typeof($scope.col) !== 'undefined' && $scope.col && $scope.col.colDef && $scope.col.colDef.enableHiding === false ) {
        return false;
      }
      else {
        return true;
      }
    },     


    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name getDefaultMenuItems
     * @description  returns the default menu items for a column menu
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * 
     */     
    getDefaultMenuItems: function( $scope ){
      return [
        {
          title: i18nService.getSafeText('sort.ascending'),
          icon: 'ui-grid-icon-sort-alt-up',
          action: function($event) {
            $event.stopPropagation();
            $scope.sortColumn($event, uiGridConstants.ASC);
          },
          shown: function () {
            return service.sortable( $scope );
          },
          active: function() {
            return service.isActiveSort( $scope, uiGridConstants.ASC);
          }
        },
        {
          title: i18nService.getSafeText('sort.descending'),
          icon: 'ui-grid-icon-sort-alt-down',
          action: function($event) {
            $event.stopPropagation();
            $scope.sortColumn($event, uiGridConstants.DESC);
          },
          shown: function() {
            return service.sortable( $scope );
          },
          active: function() {
            return service.isActiveSort( $scope, uiGridConstants.DESC);
          }
        },
        {
          title: i18nService.getSafeText('sort.remove'),
          icon: 'ui-grid-icon-cancel',
          action: function ($event) {
            $event.stopPropagation();
            $scope.unsortColumn();
          },
          shown: function() {
            return service.sortable( $scope ) && 
                   typeof($scope.col) !== 'undefined' && (typeof($scope.col.sort) !== 'undefined' && 
                   typeof($scope.col.sort.direction) !== 'undefined') && $scope.col.sort.direction !== null &&
                  !service.suppressRemoveSort( $scope );
          }
        },
        {
          title: i18nService.getSafeText('column.hide'),
          icon: 'ui-grid-icon-cancel',
          shown: function() {
            return service.hideable( $scope );
          },
          action: function ($event) {
            $event.stopPropagation();
            $scope.hideColumn();
          }
        }
      ];
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name getColumnElementPosition
     * @description  gets the position information needed to place the column
     * menu below the column header
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * @param {GridCol} column the column we want to position below
     * @param {element} $columnElement the column element we want to position below
     * @returns {hash} containing left, top, offset, height, width
     * 
     */  
    getColumnElementPosition: function( $scope, column, $columnElement ){
      var positionData = {};
      positionData.left = $columnElement[0].offsetLeft;
      positionData.top = $columnElement[0].offsetTop;
      positionData.parentLeft = $columnElement[0].offsetParent.offsetLeft;

      // Get the grid scrollLeft
      positionData.offset = 0;
      if (column.grid.options.offsetLeft) {
        positionData.offset = column.grid.options.offsetLeft;
      }

      positionData.height = gridUtil.elementHeight($columnElement, true);
      positionData.width = gridUtil.elementWidth($columnElement, true);
      
      return positionData;
    },
    

    /**
     * @ngdoc method
     * @methodOf ui.grid.service:uiGridColumnMenuService
     * @name repositionMenu
     * @description  Reposition the menu below the new column.  If the menu has no child nodes 
     * (i.e. it's not currently visible) then we guess it's width at 100, we'll be called again
     * later to fix it
     * @param {$scope} $scope the $scope from the uiGridColumnMenu
     * @param {GridCol} column the column we want to position below
     * @param {hash} positionData a hash containing left, top, offset, height, width
     * @param {element} $elm the column menu element that we want to reposition
     * @param {element} $columnElement the column element that we want to reposition underneath
     * 
     */  
    repositionMenu: function( $scope, column, positionData, $elm, $columnElement ) {
      var menu = $elm[0].querySelectorAll('.ui-grid-menu');
      var containerId = column.renderContainer ? column.renderContainer : 'body';
      var renderContainer = column.grid.renderContainers[containerId];

      // It's possible that the render container of the column we're attaching to is 
      // offset from the grid (i.e. pinned containers), we need to get the difference in the offsetLeft 
      // between the render container and the grid
      var renderContainerElm = gridUtil.closestElm($columnElement, '.ui-grid-render-container');
      var renderContainerOffset = renderContainerElm.getBoundingClientRect().left - $scope.grid.element[0].getBoundingClientRect().left;

      var containerScrollLeft = renderContainerElm.querySelectorAll('.ui-grid-viewport')[0].scrollLeft;

      // default value the last width for _this_ column, otherwise last width for _any_ column, otherwise default to 170
      var myWidth = column.lastMenuWidth ? column.lastMenuWidth : ( $scope.lastMenuWidth ? $scope.lastMenuWidth : 170);
      var paddingRight = column.lastMenuPaddingRight ? column.lastMenuPaddingRight : ( $scope.lastMenuPaddingRight ? $scope.lastMenuPaddingRight : 10);
      
      if ( menu.length !== 0 ){
        var mid = menu[0].querySelectorAll('.ui-grid-menu-mid'); 
        if ( mid.length !== 0 && !angular.element(mid).hasClass('ng-hide') ) {
          myWidth = gridUtil.elementWidth(menu, true);
          $scope.lastMenuWidth = myWidth;
          column.lastMenuWidth = myWidth;
  
          // TODO(c0bra): use padding-left/padding-right based on document direction (ltr/rtl), place menu on proper side
          // Get the column menu right padding
          paddingRight = parseInt(gridUtil.getStyles(angular.element(menu)[0])['paddingRight'], 10);
          $scope.lastMenuPaddingRight = paddingRight;
          column.lastMenuPaddingRight = paddingRight;
        }
      }
      
      var left = positionData.left + renderContainerOffset - containerScrollLeft + positionData.parentLeft + positionData.width - myWidth + paddingRight;
      if (left < positionData.offset){
        left = positionData.offset;
      }

      $elm.css('left', left + 'px');
      $elm.css('top', (positionData.top + positionData.height) + 'px');
    }    

  };
  
  return service;
}])


.directive('uiGridColumnMenu', ['$timeout', 'gridUtil', 'uiGridConstants', 'uiGridColumnMenuService', 
function ($timeout, gridUtil, uiGridConstants, uiGridColumnMenuService) {
/**
 * @ngdoc directive
 * @name ui.grid.directive:uiGridColumnMenu
 * @description  Provides the column menu framework, leverages uiGridMenu underneath
 * 
 */

  var uiGridColumnMenu = {
    priority: 0,
    scope: true,
    require: '?^uiGrid',
    templateUrl: 'ui-grid/uiGridColumnMenu',
    replace: true,
    link: function ($scope, $elm, $attrs, uiGridCtrl) {
      var self = this;
      
      uiGridColumnMenuService.initialize( $scope, uiGridCtrl );

      $scope.defaultMenuItems = uiGridColumnMenuService.getDefaultMenuItems( $scope );

      // Set the menu items for use with the column menu. The user can later add additional items via the watch
      $scope.menuItems = $scope.defaultMenuItems;
      uiGridColumnMenuService.setColMenuItemWatch( $scope );

  
      /**
       * @ngdoc method
       * @methodOf ui.grid.directive:uiGridColumnMenu
       * @name showMenu
       * @description Shows the column menu.  If the menu is already displayed it
       * calls the menu to ask it to hide (it will animate), then it repositions the menu
       * to the right place whilst hidden (it will make an assumption on menu width), 
       * then it asks the menu to show (it will animate), then it repositions the menu again 
       * once we can calculate it's size.
       * @param {GridCol} column the column we want to position below
       * @param {element} $columnElement the column element we want to position below
       */
      $scope.showMenu = function(column, $columnElement, event) {
        // Swap to this column
        $scope.col = column;

        // Get the position information for the column element
        var colElementPosition = uiGridColumnMenuService.getColumnElementPosition( $scope, column, $columnElement );

        if ($scope.menuShown) {
          // we want to hide, then reposition, then show, but we want to wait for animations
          // we set a variable, and then rely on the menu-hidden event to call the reposition and show
          $scope.colElement = $columnElement;
          $scope.colElementPosition = colElementPosition;
          $scope.hideThenShow = true;

          $scope.$broadcast('hide-menu', { originalEvent: event });
        } else {
          self.shown = $scope.menuShown = true;
          uiGridColumnMenuService.repositionMenu( $scope, column, colElementPosition, $elm, $columnElement );

          $scope.colElement = $columnElement;
          $scope.colElementPosition = colElementPosition;
          $scope.$broadcast('show-menu', { originalEvent: event });
        } 

      };


      /**
       * @ngdoc method
       * @methodOf ui.grid.directive:uiGridColumnMenu
       * @name hideMenu
       * @description Hides the column menu.
       * @param {boolean} broadcastTrigger true if we were triggered by a broadcast
       * from the menu itself - in which case don't broadcast again as we'll get
       * an infinite loop
       */
      $scope.hideMenu = function( broadcastTrigger ) {
        // delete $scope.col;
        $scope.menuShown = false;
        
        if ( !broadcastTrigger ){
          $scope.$broadcast('hide-menu');
        }
      };

      
      $scope.$on('menu-hidden', function() {
        if ( $scope.hideThenShow ){
          delete $scope.hideThenShow;

          uiGridColumnMenuService.repositionMenu( $scope, $scope.col, $scope.colElementPosition, $elm, $scope.colElement );
          $scope.$broadcast('show-menu');

          $scope.menuShown = true;
        } else {
          $scope.hideMenu( true );
        }
      });
      
      $scope.$on('menu-shown', function() {
        $timeout( function() {
          uiGridColumnMenuService.repositionMenu( $scope, $scope.col, $scope.colElementPosition, $elm, $scope.colElement );
          delete $scope.colElementPosition;
          delete $scope.columnElement;
        }, 200);
      });

 
      /* Column methods */
      $scope.sortColumn = function (event, dir) {
        event.stopPropagation();

        $scope.grid.sortColumn($scope.col, dir, true)
          .then(function () {
            $scope.grid.refresh();
            $scope.hideMenu();
          });
      };

      $scope.unsortColumn = function () {
        $scope.col.unsort();

        $scope.grid.refresh();
        $scope.hideMenu();
      };

      $scope.hideColumn = function () {
        $scope.col.colDef.visible = false;
        $scope.col.visible = false;

        $scope.grid.queueGridRefresh();
        $scope.hideMenu();
        $scope.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
        $scope.grid.api.core.raise.columnVisibilityChanged( $scope.col );        
      };
    },
    
    
    
    controller: ['$scope', function ($scope) {
      var self = this;
      
      $scope.$watch('menuItems', function (n, o) {
        self.menuItems = n;
      });
    }]
  };

  return uiGridColumnMenu;

}]);

})();
(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridFilter', ['$compile', '$templateCache', function ($compile, $templateCache) {

    return {
      compile: function() {
        return {
          pre: function ($scope, $elm, $attrs, controllers) {
            $scope.col.updateFilters = function( filterable ){
              $elm.children().remove();
              if ( filterable ){
                var template = $scope.col.filterHeaderTemplate;
    
                $elm.append($compile(template)($scope));
              }
            };
            
            $scope.$on( '$destroy', function() {
              delete $scope.col.updateFilters;
            });
          }
        };
      }
    };
  }]);
})();

(function () {
  'use strict';

  angular.module('ui.grid').directive('uiGridFooterCell', ['$timeout', 'gridUtil', 'uiGridConstants', '$compile',
  function ($timeout, gridUtil, uiGridConstants, $compile) {
    var uiGridFooterCell = {
      priority: 0,
      scope: {
        col: '=',
        row: '=',
        renderIndex: '='
      },
      replace: true,
      require: '^uiGrid',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            var cellFooter = $compile($scope.col.footerCellTemplate)($scope);
            $elm.append(cellFooter);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
            //$elm.addClass($scope.col.getColClass(false));
            $scope.grid = uiGridCtrl.grid;

            var initColClass = $scope.col.getColClass(false);
            $elm.addClass(initColClass);

            // apply any footerCellClass
            var classAdded;
            var updateClass = function( grid ){
              var contents = $elm;
              if ( classAdded ){
                contents.removeClass( classAdded );
                classAdded = null;
              }
  
              if (angular.isFunction($scope.col.footerCellClass)) {
                classAdded = $scope.col.footerCellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
              }
              else {
                classAdded = $scope.col.footerCellClass;
              }
              contents.addClass(classAdded);
            };
  
            if ($scope.col.footerCellClass) {
              updateClass();
            }

            $scope.col.updateAggregationValue();

            // Watch for column changes so we can alter the col cell class properly
/* shouldn't be needed any more, given track by col.name
            $scope.$watch('col', function (n, o) {
              if (n !== o) {
                // See if the column's internal class has changed
                var newColClass = $scope.col.getColClass(false);
                if (newColClass !== initColClass) {
                  $elm.removeClass(initColClass);
                  $elm.addClass(newColClass);
                  initColClass = newColClass;
                }
              }
            });
*/


            // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
            var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateClass, [uiGridConstants.dataChange.COLUMN]);
            // listen for visible rows change and update aggregation values
            $scope.grid.api.core.on.rowsRendered( $scope, $scope.col.updateAggregationValue );

            $scope.$on( '$destroy', dataChangeDereg );
          }
        };
      }
    };

    return uiGridFooterCell;
  }]);

})();

(function () {
  'use strict';

  angular.module('ui.grid').directive('uiGridFooter', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', function ($templateCache, $compile, uiGridConstants, gridUtil, $timeout) {

    return {
      restrict: 'EA',
      replace: true,
      // priority: 1000,
      require: ['^uiGrid', '^uiGridRenderContainer'],
      scope: true,
      compile: function ($elm, $attrs) {
        return {
          pre: function ($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            $scope.grid = uiGridCtrl.grid;
            $scope.colContainer = containerCtrl.colContainer;

            containerCtrl.footer = $elm;

            var footerTemplate = $scope.grid.options.footerTemplate;
            gridUtil.getTemplate(footerTemplate)
              .then(function (contents) {
                var template = angular.element(contents);

                var newElm = $compile(template)($scope);
                $elm.append(newElm);

                if (containerCtrl) {
                  // Inject a reference to the footer viewport (if it exists) into the grid controller for use in the horizontal scroll handler below
                  var footerViewport = $elm[0].getElementsByClassName('ui-grid-footer-viewport')[0];

                  if (footerViewport) {
                    containerCtrl.footerViewport = footerViewport;
                  }
                }
              });
          },

          post: function ($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            // gridUtil.logDebug('ui-grid-footer link');

            var grid = uiGridCtrl.grid;

            // Don't animate footer cells
            gridUtil.disableAnimations($elm);

            containerCtrl.footer = $elm;

            var footerViewport = $elm[0].getElementsByClassName('ui-grid-footer-viewport')[0];
            if (footerViewport) {
              containerCtrl.footerViewport = footerViewport;
            }
          }
        };
      }
    };
  }]);

})();
(function () {
  'use strict';

  angular.module('ui.grid').directive('uiGridGridFooter', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', function ($templateCache, $compile, uiGridConstants, gridUtil, $timeout) {

    return {
      restrict: 'EA',
      replace: true,
      // priority: 1000,
      require: '^uiGrid',
      scope: true,
      compile: function ($elm, $attrs) {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {

            $scope.grid = uiGridCtrl.grid;



            var footerTemplate = $scope.grid.options.gridFooterTemplate;
            gridUtil.getTemplate(footerTemplate)
              .then(function (contents) {
                var template = angular.element(contents);

                var newElm = $compile(template)($scope);
                $elm.append(newElm);
              });
          },

          post: function ($scope, $elm, $attrs, controllers) {

          }
        };
      }
    };
  }]);

})();
(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridGroupPanel', ["$compile", "uiGridConstants", "gridUtil", function($compile, uiGridConstants, gridUtil) {
    var defaultTemplate = 'ui-grid/ui-grid-group-panel';

    return {
      restrict: 'EA',
      replace: true,
      require: '?^uiGrid',
      scope: false,
      compile: function($elm, $attrs) {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            var groupPanelTemplate = $scope.grid.options.groupPanelTemplate  || defaultTemplate;

             gridUtil.getTemplate(groupPanelTemplate)
              .then(function (contents) {
                var template = angular.element(contents);
                
                var newElm = $compile(template)($scope);
                $elm.append(newElm);
              });
          },

          post: function ($scope, $elm, $attrs, uiGridCtrl) {
            $elm.bind('$destroy', function() {
              // scrollUnbinder();
            });
          }
        };
      }
    };
  }]);

})();
(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridHeaderCell', ['$compile', '$timeout', '$window', '$document', 'gridUtil', 'uiGridConstants', 'ScrollEvent',
  function ($compile, $timeout, $window, $document, gridUtil, uiGridConstants, ScrollEvent) {
    // Do stuff after mouse has been down this many ms on the header cell
    var mousedownTimeout = 500;
    var changeModeTimeout = 500;    // length of time between a touch event and a mouse event being recognised again, and vice versa

    var uiGridHeaderCell = {
      priority: 0,
      scope: {
        col: '=',
        row: '=',
        renderIndex: '='
      },
      require: ['?^uiGrid', '^uiGridRenderContainer'],
      replace: true,
      compile: function() {
        return {
          pre: function ($scope, $elm, $attrs) {
            var cellHeader = $compile($scope.col.headerCellTemplate)($scope);
            $elm.append(cellHeader);
          },
          
          post: function ($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var renderContainerCtrl = controllers[1];

            $scope.grid = uiGridCtrl.grid;

            $scope.renderContainer = uiGridCtrl.grid.renderContainers[renderContainerCtrl.containerId];
            
            var initColClass = $scope.col.getColClass(false);
            $elm.addClass(initColClass);
    
            // Hide the menu by default
            $scope.menuShown = false;
    
            // Put asc and desc sort directions in scope
            $scope.asc = uiGridConstants.ASC;
            $scope.desc = uiGridConstants.DESC;
    
            // Store a reference to menu element
            var $colMenu = angular.element( $elm[0].querySelectorAll('.ui-grid-header-cell-menu') );
    
            var $contentsElm = angular.element( $elm[0].querySelectorAll('.ui-grid-cell-contents') );
    

            // apply any headerCellClass
            var classAdded;
            var previousMouseX;

            // filter watchers
            var filterDeregisters = [];
            
            
            /* 
             * Our basic approach here for event handlers is that we listen for a down event (mousedown or touchstart).
             * Once we have a down event, we need to work out whether we have a click, a drag, or a 
             * hold.  A click would sort the grid (if sortable).  A drag would be used by moveable, so 
             * we ignore it.  A hold would open the menu.
             * 
             * So, on down event, we put in place handlers for move and up events, and a timer.  If the
             * timer expires before we see a move or up, then we have a long press and hence a column menu open.  
             * If the up happens before the timer, then we have a click, and we sort if the column is sortable.  
             * If a move happens before the timer, then we are doing column move, so we do nothing, the moveable feature
             * will handle it.
             * 
             * To deal with touch enabled devices that also have mice, we only create our handlers when
             * we get the down event, and we create the corresponding handlers - if we're touchstart then 
             * we get touchmove and touchend, if we're mousedown then we get mousemove and mouseup.
             * 
             * We also suppress the click action whilst this is happening - otherwise after the mouseup there
             * will be a click event and that can cause the column menu to close
             *
             */
            
            $scope.downFn = function( event ){
              event.stopPropagation();

              if (typeof(event.originalEvent) !== 'undefined' && event.originalEvent !== undefined) {
                event = event.originalEvent;
              }
    
              // Don't show the menu if it's not the left button
              if (event.button && event.button !== 0) {
                return;
              }
              previousMouseX = event.pageX;

              $scope.mousedownStartTime = (new Date()).getTime();
              $scope.mousedownTimeout = $timeout(function() { }, mousedownTimeout);
    
              $scope.mousedownTimeout.then(function () {
                if ( $scope.colMenu ) {
                  uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm, event);
                }
              });

              uiGridCtrl.fireEvent(uiGridConstants.events.COLUMN_HEADER_CLICK, {event: event, columnName: $scope.col.colDef.name});
              
              $scope.offAllEvents();
              if ( event.type === 'touchstart'){
                $document.on('touchend', $scope.upFn);
                $document.on('touchmove', $scope.moveFn);
              } else if ( event.type === 'mousedown' ){
                $document.on('mouseup', $scope.upFn);
                $document.on('mousemove', $scope.moveFn);
              }
            };
            
            $scope.upFn = function( event ){
              event.stopPropagation();
              $timeout.cancel($scope.mousedownTimeout);
              $scope.offAllEvents();
              $scope.onDownEvents(event.type);

              var mousedownEndTime = (new Date()).getTime();
              var mousedownTime = mousedownEndTime - $scope.mousedownStartTime;
  
              if (mousedownTime > mousedownTimeout) {
                // long click, handled above with mousedown
              }
              else {
                // short click
                if ( $scope.sortable ){
                  $scope.handleClick(event);
                }
              }
            };
            
            $scope.moveFn = function( event ){
              // Chrome is known to fire some bogus move events.
              var changeValue = event.pageX - previousMouseX;
              if ( changeValue === 0 ){ return; }

              // we're a move, so do nothing and leave for column move (if enabled) to take over
              $timeout.cancel($scope.mousedownTimeout);
              $scope.offAllEvents();
              $scope.onDownEvents(event.type);
            };
            
            $scope.clickFn = function ( event ){
              event.stopPropagation();
              $contentsElm.off('click', $scope.clickFn);
            };
            

            $scope.offAllEvents = function(){
              $contentsElm.off('touchstart', $scope.downFn);
              $contentsElm.off('mousedown', $scope.downFn);

              $document.off('touchend', $scope.upFn);
              $document.off('mouseup', $scope.upFn);

              $document.off('touchmove', $scope.moveFn);
              $document.off('mousemove', $scope.moveFn);
              
              $contentsElm.off('click', $scope.clickFn);
            };
            
            $scope.onDownEvents = function( type ){
              // If there is a previous event, then wait a while before
              // activating the other mode - i.e. if the last event was a touch event then
              // don't enable mouse events for a wee while (500ms or so)
              // Avoids problems with devices that emulate mouse events when you have touch events

              switch (type){
                case 'touchmove':
                case 'touchend':
                  $contentsElm.on('click', $scope.clickFn);
                  $contentsElm.on('touchstart', $scope.downFn);
                  $timeout(function(){
                    $contentsElm.on('mousedown', $scope.downFn);              
                  }, changeModeTimeout);
                  break;
                case 'mousemove':
                case 'mouseup':
                  $contentsElm.on('click', $scope.clickFn);
                  $contentsElm.on('mousedown', $scope.downFn);
                  $timeout(function(){
                    $contentsElm.on('touchstart', $scope.downFn);              
                  }, changeModeTimeout);
                  break;
                default:
                  $contentsElm.on('click', $scope.clickFn);
                  $contentsElm.on('touchstart', $scope.downFn);
                  $contentsElm.on('mousedown', $scope.downFn);
              }              
            };
            

            var updateHeaderOptions = function( grid ){
              var contents = $elm;
              if ( classAdded ){
                contents.removeClass( classAdded );
                classAdded = null;
              }
  
              if (angular.isFunction($scope.col.headerCellClass)) {
                classAdded = $scope.col.headerCellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
              }
              else {
                classAdded = $scope.col.headerCellClass;
              }
              contents.addClass(classAdded);
              
              var rightMostContainer = $scope.grid.renderContainers['right'] ? $scope.grid.renderContainers['right'] : $scope.grid.renderContainers['body'];
              $scope.isLastCol = ( $scope.col === rightMostContainer.visibleColumnCache[ rightMostContainer.visibleColumnCache.length - 1 ] );

              // Figure out whether this column is sortable or not
              if (uiGridCtrl.grid.options.enableSorting && $scope.col.enableSorting) {
                $scope.sortable = true;
              }
              else {
                $scope.sortable = false;
              }
      
              // Figure out whether this column is filterable or not
              var oldFilterable = $scope.filterable;
              if (uiGridCtrl.grid.options.enableFiltering && $scope.col.enableFiltering) {
                $scope.filterable = true;
              }
              else {
                $scope.filterable = false;
              }

              if ( oldFilterable !== $scope.filterable){
                if ( typeof($scope.col.updateFilters) !== 'undefined' ){
                  $scope.col.updateFilters($scope.filterable);
                }

                // if column is filterable add a filter watcher
                if ($scope.filterable) {
                  $scope.col.filters.forEach( function(filter, i) {
                    filterDeregisters.push($scope.$watch('col.filters[' + i + '].term', function(n, o) {
                      if (n !== o) {
                        uiGridCtrl.grid.api.core.raise.filterChanged();
                        uiGridCtrl.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                        uiGridCtrl.grid.queueGridRefresh();
                      }
                    }));  
                  });
                  $scope.$on('$destroy', function() {
                    filterDeregisters.forEach( function(filterDeregister) {
                      filterDeregister();
                    });
                  });
                } else {
                  filterDeregisters.forEach( function(filterDeregister) {
                    filterDeregister();
                  });
                }                          
                
              }
              
              // figure out whether we support column menus
              if ($scope.col.grid.options && $scope.col.grid.options.enableColumnMenus !== false && 
                      $scope.col.colDef && $scope.col.colDef.enableColumnMenu !== false){
                $scope.colMenu = true;
              } else {
                $scope.colMenu = false;
              }
              
              /**
              * @ngdoc property
              * @name enableColumnMenu
              * @propertyOf ui.grid.class:GridOptions.columnDef
              * @description if column menus are enabled, controls the column menus for this specific
              * column (i.e. if gridOptions.enableColumnMenus, then you can control column menus
              * using this option. If gridOptions.enableColumnMenus === false then you get no column
              * menus irrespective of the value of this option ).  Defaults to true.
              *
              */
              /**
              * @ngdoc property
              * @name enableColumnMenus
              * @propertyOf ui.grid.class:GridOptions.columnDef
              * @description Override for column menus everywhere - if set to false then you get no
              * column menus.  Defaults to true.
              *
              */
  
              $scope.offAllEvents();
              
              if ($scope.sortable || $scope.colMenu) {
                $scope.onDownEvents();
          
                $scope.$on('$destroy', function () {
                  $scope.offAllEvents();
                });
              } 
            };

/*
            $scope.$watch('col', function (n, o) {
              if (n !== o) {
                // See if the column's internal class has changed
                var newColClass = $scope.col.getColClass(false);
                if (newColClass !== initColClass) {
                  $elm.removeClass(initColClass);
                  $elm.addClass(newColClass);
                  initColClass = newColClass;
                }
              }
            });
*/
            updateHeaderOptions();
            
            // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
            var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateHeaderOptions, [uiGridConstants.dataChange.COLUMN]);

            $scope.$on( '$destroy', dataChangeDereg );            

            $scope.handleClick = function(event) {
              // If the shift key is being held down, add this column to the sort
              var add = false;
              if (event.shiftKey) {
                add = true;
              }
    
              // Sort this column then rebuild the grid's rows
              uiGridCtrl.grid.sortColumn($scope.col, add)
                .then(function () {
                  if (uiGridCtrl.columnMenuScope) { uiGridCtrl.columnMenuScope.hideMenu(); }
                  uiGridCtrl.grid.refresh();
                });
            };
    

            $scope.toggleMenu = function(event) {
              event.stopPropagation();
    
              // If the menu is already showing...
              if (uiGridCtrl.columnMenuScope.menuShown) {
                // ... and we're the column the menu is on...
                if (uiGridCtrl.columnMenuScope.col === $scope.col) {
                  // ... hide it
                  uiGridCtrl.columnMenuScope.hideMenu();
                }
                // ... and we're NOT the column the menu is on
                else {
                  // ... move the menu to our column
                  uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm);
                }
              }
              // If the menu is NOT showing
              else {
                // ... show it on our column
                uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm);
              }
            };
          }
        };
      }
    };

    return uiGridHeaderCell;
  }]);

})();

(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridHeader', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', 'ScrollEvent',
    function($templateCache, $compile, uiGridConstants, gridUtil, $timeout, ScrollEvent) {
    var defaultTemplate = 'ui-grid/ui-grid-header';
    var emptyTemplate = 'ui-grid/ui-grid-no-header';

    return {
      restrict: 'EA',
      // templateUrl: 'ui-grid/ui-grid-header',
      replace: true,
      // priority: 1000,
      require: ['^uiGrid', '^uiGridRenderContainer'],
      scope: true,
      compile: function($elm, $attrs) {
        return {
          pre: function ($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            $scope.grid = uiGridCtrl.grid;
            $scope.colContainer = containerCtrl.colContainer;

            updateHeaderReferences();
            
            var headerTemplate;
            if (!$scope.grid.options.showHeader) {
              headerTemplate = emptyTemplate;
            }
            else {
              headerTemplate = ($scope.grid.options.headerTemplate) ? $scope.grid.options.headerTemplate : defaultTemplate;            
            }

            gridUtil.getTemplate(headerTemplate)
              .then(function (contents) {
                var template = angular.element(contents);
                
                var newElm = $compile(template)($scope);
                $elm.replaceWith(newElm);

                // And update $elm to be the new element
                $elm = newElm;

                updateHeaderReferences();

                if (containerCtrl) {
                  // Inject a reference to the header viewport (if it exists) into the grid controller for use in the horizontal scroll handler below
                  var headerViewport = $elm[0].getElementsByClassName('ui-grid-header-viewport')[0];


                  if (headerViewport) {
                    containerCtrl.headerViewport = headerViewport;
                    angular.element(headerViewport).on('scroll', scrollHandler);
                    $scope.$on('$destroy', function () {
                      angular.element(headerViewport).off('scroll', scrollHandler);
                    });
                  }
                }

                $scope.grid.queueRefresh();
              });

            function updateHeaderReferences() {
              containerCtrl.header = containerCtrl.colContainer.header = $elm;

              var headerCanvases = $elm[0].getElementsByClassName('ui-grid-header-canvas');

              if (headerCanvases.length > 0) {
                containerCtrl.headerCanvas = containerCtrl.colContainer.headerCanvas = headerCanvases[0];
              }
              else {
                containerCtrl.headerCanvas = null;
              }
            }

            function scrollHandler(evt) {
              if (uiGridCtrl.grid.isScrollingHorizontally) {
                return;
              }
              var newScrollLeft = gridUtil.normalizeScrollLeft(containerCtrl.headerViewport, uiGridCtrl.grid);
              var horizScrollPercentage = containerCtrl.colContainer.scrollHorizontal(newScrollLeft);

              var scrollEvent = new ScrollEvent(uiGridCtrl.grid, null, containerCtrl.colContainer, ScrollEvent.Sources.ViewPortScroll);
              scrollEvent.newScrollLeft = newScrollLeft;
              if ( horizScrollPercentage > -1 ){
                scrollEvent.x = { percentage: horizScrollPercentage };
              }

              uiGridCtrl.grid.scrollContainers(null, scrollEvent);
            }
          },

          post: function ($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            // gridUtil.logDebug('ui-grid-header link');

            var grid = uiGridCtrl.grid;

            // Don't animate header cells
            gridUtil.disableAnimations($elm);

            function updateColumnWidths() {
              // this styleBuilder always runs after the renderContainer, so we can rely on the column widths
              // already being populated correctly

              var columnCache = containerCtrl.colContainer.visibleColumnCache;
              
              // Build the CSS
              // uiGridCtrl.grid.columns.forEach(function (column) {
              var ret = '';
              var canvasWidth = 0;
              columnCache.forEach(function (column) {
                ret = ret + column.getColClassDefinition();
                canvasWidth += column.drawnWidth;
              });

              containerCtrl.colContainer.canvasWidth = canvasWidth;
              
              // Return the styles back to buildStyles which pops them into the `customStyles` scope variable
              return ret;
            }
            
            containerCtrl.header = $elm;
            
            var headerViewport = $elm[0].getElementsByClassName('ui-grid-header-viewport')[0];
            if (headerViewport) {
              containerCtrl.headerViewport = headerViewport;
            }

            //todo: remove this if by injecting gridCtrl into unit tests
            if (uiGridCtrl) {
              uiGridCtrl.grid.registerStyleComputation({
                priority: 15,
                func: updateColumnWidths
              });
            }
          }
        };
      }
    };
  }]);

})();

(function(){

angular.module('ui.grid')
.service('uiGridGridMenuService', [ 'gridUtil', 'i18nService', 'uiGridConstants', function( gridUtil, i18nService, uiGridConstants ) {
  /**
   *  @ngdoc service
   *  @name ui.grid.gridMenuService
   *
   *  @description Methods for working with the grid menu
   */

  var service = {
    /**
     * @ngdoc method
     * @methodOf ui.grid.gridMenuService
     * @name initialize
     * @description Sets up the gridMenu. Most importantly, sets our
     * scope onto the grid object as grid.gridMenuScope, allowing us
     * to operate when passed only the grid.  Second most importantly, 
     * we register the 'addToGridMenu' and 'removeFromGridMenu' methods
     * on the core api.
     * @param {$scope} $scope the scope of this gridMenu
     * @param {Grid} grid the grid to which this gridMenu is associated
     */
    initialize: function( $scope, grid ){
      grid.gridMenuScope = $scope;
      $scope.grid = grid;
      $scope.registeredMenuItems = [];
      
      // not certain this is needed, but would be bad to create a memory leak
      $scope.$on('$destroy', function() {
        if ( $scope.grid && $scope.grid.gridMenuScope ){
          $scope.grid.gridMenuScope = null;
        }
        if ( $scope.grid ){
          $scope.grid = null;
        }
        if ( $scope.registeredMenuItems ){
          $scope.registeredMenuItems = null;
        }
      });
      
      $scope.registeredMenuItems = [];

      /**
       * @ngdoc function
       * @name addToGridMenu
       * @methodOf ui.grid.core.api:PublicApi
       * @description add items to the grid menu.  Used by features
       * to add their menu items if they are enabled, can also be used by
       * end users to add menu items.  This method has the advantage of allowing
       * remove again, which can simplify management of which items are included
       * in the menu when.  (Noting that in most cases the shown and active functions
       * provide a better way to handle visibility of menu items)
       * @param {Grid} grid the grid on which we are acting
       * @param {array} items menu items in the format as described in the tutorial, with 
       * the added note that if you want to use remove you must also specify an `id` field,
       * which is provided when you want to remove an item.  The id should be unique.
       * 
       */
      grid.api.registerMethod( 'core', 'addToGridMenu', service.addToGridMenu );
  
      /**
       * @ngdoc function
       * @name removeFromGridMenu
       * @methodOf ui.grid.core.api:PublicApi
       * @description Remove an item from the grid menu based on a provided id. Assumes
       * that the id is unique, removes only the last instance of that id. Does nothing if
       * the specified id is not found
       * @param {Grid} grid the grid on which we are acting
       * @param {string} id the id we'd like to remove from the menu
       * 
       */
      grid.api.registerMethod( 'core', 'removeFromGridMenu', service.removeFromGridMenu );
    },
 
    
    /**
     * @ngdoc function
     * @name addToGridMenu
     * @propertyOf ui.grid.gridMenuService
     * @description add items to the grid menu.  Used by features
     * to add their menu items if they are enabled, can also be used by
     * end users to add menu items.  This method has the advantage of allowing
     * remove again, which can simplify management of which items are included
     * in the menu when.  (Noting that in most cases the shown and active functions
     * provide a better way to handle visibility of menu items)
     * @param {Grid} grid the grid on which we are acting
     * @param {array} items menu items in the format as described in the tutorial, with 
     * the added note that if you want to use remove you must also specify an `id` field,
     * which is provided when you want to remove an item.  The id should be unique.
     * 
     */
    addToGridMenu: function( grid, menuItems ) {
      if ( !angular.isArray( menuItems ) ) {
        gridUtil.logError( 'addToGridMenu: menuItems must be an array, and is not, not adding any items');
      } else {
        if ( grid.gridMenuScope ){
          grid.gridMenuScope.registeredMenuItems = grid.gridMenuScope.registeredMenuItems ? grid.gridMenuScope.registeredMenuItems : [];
          grid.gridMenuScope.registeredMenuItems = grid.gridMenuScope.registeredMenuItems.concat( menuItems );
        } else {
          gridUtil.logError( 'Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid');
        }
      }  
    },
    

    /**
     * @ngdoc function
     * @name removeFromGridMenu
     * @methodOf ui.grid.gridMenuService
     * @description Remove an item from the grid menu based on a provided id.  Assumes
     * that the id is unique, removes only the last instance of that id.  Does nothing if
     * the specified id is not found.  If there is no gridMenuScope or registeredMenuItems
     * then do nothing silently - the desired result is those menu items not be present and they
     * aren't.
     * @param {Grid} grid the grid on which we are acting
     * @param {string} id the id we'd like to remove from the menu
     * 
     */    
    removeFromGridMenu: function( grid, id ){
      var foundIndex = -1;
      
      if ( grid && grid.gridMenuScope ){
        grid.gridMenuScope.registeredMenuItems.forEach( function( value, index ) {
          if ( value.id === id ){
            if (foundIndex > -1) {
              gridUtil.logError( 'removeFromGridMenu: found multiple items with the same id, removing only the last' );
            } else {
              
              foundIndex = index;
            }
          }
        });
      }

      if ( foundIndex > -1 ){
        grid.gridMenuScope.registeredMenuItems.splice( foundIndex, 1 );
      }
    },
    
        
    /**
     * @ngdoc array
     * @name gridMenuCustomItems
     * @propertyOf ui.grid.class:GridOptions
     * @description (optional) An array of menu items that should be added to
     * the gridMenu.  Follow the format documented in the tutorial for column
     * menu customisation.  The context provided to the action function will 
     * include context.grid.  An alternative if working with dynamic menus is to use the 
     * provided api - core.addToGridMenu and core.removeFromGridMenu, which handles
     * some of the management of items for you.
     * 
     */
    /**
     * @ngdoc boolean
     * @name gridMenuShowHideColumns
     * @propertyOf ui.grid.class:GridOptions
     * @description true by default, whether the grid menu should allow hide/show
     * of columns
     * 
     */
    /**
     * @ngdoc method
     * @methodOf ui.grid.gridMenuService
     * @name getMenuItems
     * @description Decides the menu items to show in the menu.  This is a
     * combination of:
     * 
     * - the default menu items that are always included, 
     * - any menu items that have been provided through the addMenuItem api. These
     *   are typically added by features within the grid
     * - any menu items included in grid.options.gridMenuCustomItems.  These can be
     *   changed dynamically, as they're always recalculated whenever we show the
     *   menu
     * @param {$scope} $scope the scope of this gridMenu, from which we can find all 
     * the information that we need
     * @returns {array} an array of menu items that can be shown 
     */
    getMenuItems: function( $scope ) {
      var menuItems = [
        // this is where we add any menu items we want to always include
      ];
      
      if ( $scope.grid.options.gridMenuCustomItems ){
        if ( !angular.isArray( $scope.grid.options.gridMenuCustomItems ) ){ 
          gridUtil.logError( 'gridOptions.gridMenuCustomItems must be an array, and is not'); 
        } else {
          menuItems = menuItems.concat( $scope.grid.options.gridMenuCustomItems );
        }
      }
  
      menuItems = menuItems.concat( $scope.registeredMenuItems );
      
      if ( $scope.grid.options.gridMenuShowHideColumns !== false ){
        menuItems = menuItems.concat( service.showHideColumns( $scope ) );
      }
      
      menuItems.sort(function(a, b){
        return a.order - b.order;
      });
      
      return menuItems;
    },
    
    
    /**
     * @ngdoc array
     * @name gridMenuTitleFilter
     * @propertyOf ui.grid.class:GridOptions
     * @description (optional) A function that takes a title string 
     * (usually the col.displayName), and converts it into a display value.  The function
     * must return either a string or a promise.
     * 
     * Used for internationalization of the grid menu column names - for angular-translate
     * you can pass $translate as the function, for i18nService you can pass getSafeText as the 
     * function
     * @example
     * <pre>
     *   gridOptions = {
     *     gridMenuTitleFilter: $translate
     *   }
     * </pre>
     */
    /**
     * @ngdoc method
     * @methodOf ui.grid.gridMenuService
     * @name showHideColumns
     * @description Adds two menu items for each of the columns in columnDefs.  One
     * menu item for hide, one menu item for show.  Each is visible when appropriate
     * (show when column is not visible, hide when column is visible).  Each toggles
     * the visible property on the columnDef using toggleColumnVisibility
     * @param {$scope} $scope of a gridMenu, which contains a reference to the grid
     */
    showHideColumns: function( $scope ){
      var showHideColumns = [];
      if ( !$scope.grid.options.columnDefs || $scope.grid.options.columnDefs.length === 0 || $scope.grid.columns.length === 0 ) {
        return showHideColumns;
      }
      
      // add header for columns
      showHideColumns.push({
        title: i18nService.getSafeText('gridMenu.columns'),
        order: 300
      });
      
      $scope.grid.options.gridMenuTitleFilter = $scope.grid.options.gridMenuTitleFilter ? $scope.grid.options.gridMenuTitleFilter : function( title ) { return title; };  
      
      $scope.grid.options.columnDefs.forEach( function( colDef, index ){
        if ( colDef.enableHiding !== false ){
          // add hide menu item - shows an OK icon as we only show when column is already visible
          var menuItem = {
            icon: 'ui-grid-icon-ok',
            action: function($event) {
              $event.stopPropagation();
              service.toggleColumnVisibility( this.context.gridCol );
            },
            shown: function() {
              return this.context.gridCol.colDef.visible === true || this.context.gridCol.colDef.visible === undefined;
            },
            context: { gridCol: $scope.grid.getColumn(colDef.name || colDef.field) },
            leaveOpen: true,
            order: 301 + index * 2
          };
          service.setMenuItemTitle( menuItem, colDef, $scope.grid );
          showHideColumns.push( menuItem );

          // add show menu item - shows no icon as we only show when column is invisible
          menuItem = {
            icon: 'ui-grid-icon-cancel',
            action: function($event) {
              $event.stopPropagation();
              service.toggleColumnVisibility( this.context.gridCol );
            },
            shown: function() {
              return !(this.context.gridCol.colDef.visible === true || this.context.gridCol.colDef.visible === undefined);
            },
            context: { gridCol: $scope.grid.getColumn(colDef.name || colDef.field) },
            leaveOpen: true,
            order: 301 + index * 2 + 1
          };
          service.setMenuItemTitle( menuItem, colDef, $scope.grid );
          showHideColumns.push( menuItem );
        }
      });
      return showHideColumns;
    },
    
    
    /**
     * @ngdoc method
     * @methodOf ui.grid.gridMenuService
     * @name setMenuItemTitle
     * @description Handles the response from gridMenuTitleFilter, adding it directly to the menu
     * item if it returns a string, otherwise waiting for the promise to resolve or reject then
     * putting the result into the title 
     * @param {object} menuItem the menuItem we want to put the title on
     * @param {object} colDef the colDef from which we can get displayName, name or field
     * @param {Grid} grid the grid, from which we can get the options.gridMenuTitleFilter
     * 
     */
    setMenuItemTitle: function( menuItem, colDef, grid ){
      var title = grid.options.gridMenuTitleFilter( colDef.displayName || gridUtil.readableColumnName(colDef.name) || colDef.field );
      
      if ( typeof(title) === 'string' ){
        menuItem.title = title;
      } else if ( title.then ){
        // must be a promise
        menuItem.title = "";
        title.then( function( successValue ) {
          menuItem.title = successValue;
        }, function( errorValue ) {
          menuItem.title = errorValue;
        });
      } else {
        gridUtil.logError('Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config');
        menuItem.title = 'badconfig';
      }
    },

    /**
     * @ngdoc method
     * @methodOf ui.grid.gridMenuService
     * @name toggleColumnVisibility
     * @description Toggles the visibility of an individual column.  Expects to be
     * provided a context that has on it a gridColumn, which is the column that
     * we'll operate upon.  We change the visibility, and refresh the grid as appropriate
     * @param {GridCol} gridCol the column that we want to toggle
     * 
     */
    toggleColumnVisibility: function( gridCol ) {
      gridCol.colDef.visible = !( gridCol.colDef.visible === true || gridCol.colDef.visible === undefined ); 
      
      gridCol.grid.refresh();
      gridCol.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
      gridCol.grid.api.core.raise.columnVisibilityChanged( gridCol );
    }
  };
  
  return service;
}])



.directive('uiGridMenuButton', ['gridUtil', 'uiGridConstants', 'uiGridGridMenuService', 
function (gridUtil, uiGridConstants, uiGridGridMenuService) {

  return {
    priority: 0,
    scope: true,
    require: ['?^uiGrid'],
    templateUrl: 'ui-grid/ui-grid-menu-button',
    replace: true,


    link: function ($scope, $elm, $attrs, controllers) {
      var uiGridCtrl = controllers[0];

      uiGridGridMenuService.initialize($scope, uiGridCtrl.grid);
      
      $scope.shown = false;

      $scope.toggleMenu = function () {
        if ( $scope.shown ){
          $scope.$broadcast('hide-menu');
          $scope.shown = false;
        } else {
          $scope.menuItems = uiGridGridMenuService.getMenuItems( $scope );
          $scope.$broadcast('show-menu');
          $scope.shown = true;
        }
      };
      
      $scope.$on('menu-hidden', function() {
        $scope.shown = false;
      });
    }
  };

}]);

})();
(function(){

/**
 * @ngdoc directive
 * @name ui.grid.directive:uiGridMenu
 * @element style
 * @restrict A
 *
 * @description
 * Allows us to interpolate expressions in `<style>` elements. Angular doesn't do this by default as it can/will/might? break in IE8.
 *
 * @example
 <doc:example module="app">
 <doc:source>
 <script>
 var app = angular.module('app', ['ui.grid']);

 app.controller('MainCtrl', ['$scope', function ($scope) {
   
 }]);
 </script>

 <div ng-controller="MainCtrl">
   <div ui-grid-menu shown="true"  ></div>
 </div>
 </doc:source>
 <doc:scenario>
 </doc:scenario>
 </doc:example>
 */
angular.module('ui.grid')

.directive('uiGridMenu', ['$compile', '$timeout', '$window', '$document', 'gridUtil', 'uiGridConstants', 
function ($compile, $timeout, $window, $document, gridUtil, uiGridConstants) {
  var uiGridMenu = {
    priority: 0,
    scope: {
      // shown: '&',
      menuItems: '=',
      autoHide: '=?'
    },
    require: '?^uiGrid',
    templateUrl: 'ui-grid/uiGridMenu',
    replace: false,
    link: function ($scope, $elm, $attrs, uiGridCtrl) {
      var self = this;
      var menuMid;
      var $animate;
     
    // *** Show/Hide functions ******
      self.showMenu = $scope.showMenu = function(event, args) {
        if ( !$scope.shown ){

          /*
           * In order to animate cleanly we remove the ng-if, wait a digest cycle, then
           * animate the removal of the ng-hide.  We can't successfully (so far as I can tell)
           * animate removal of the ng-if, as the menu items aren't there yet.  And we don't want
           * to rely on ng-show only, as that leaves elements in the DOM that are needlessly evaluated
           * on scroll events.
           * 
           * Note when testing animation that animations don't run on the tutorials.  When debugging it looks
           * like they do, but angular has a default $animate provider that is just a stub, and that's what's
           * being called.  ALso don't be fooled by the fact that your browser has actually loaded the 
           * angular-translate.js, it's not using it.  You need to test animations in an external application. 
           */
          $scope.shown = true;

          $timeout( function() {
            $scope.shownMid = true;
            $scope.$emit('menu-shown');
          });
        } else if ( !$scope.shownMid ) {
          // we're probably doing a hide then show, so we don't need to wait for ng-if
          $scope.shownMid = true;
          $scope.$emit('menu-shown');
        }

        var docEventType = 'click';
        if (args && args.originalEvent && args.originalEvent.type && args.originalEvent.type === 'touchstart') {
          docEventType = args.originalEvent.type;
        }

        // Turn off an existing document click handler
        angular.element(document).off('click touchstart', applyHideMenu);

        // Turn on the document click handler, but in a timeout so it doesn't apply to THIS click if there is one
        $timeout(function() {
          angular.element(document).on(docEventType, applyHideMenu);
        });
      };


      self.hideMenu = $scope.hideMenu = function(event, args) {
        if ( $scope.shown ){
          /*
           * In order to animate cleanly we animate the addition of ng-hide, then use a $timeout to
           * set the ng-if (shown = false) after the animation runs.  In theory we can cascade off the
           * callback on the addClass method, but it is very unreliable with unit tests for no discernable reason.
           *   
           * The user may have clicked on the menu again whilst
           * we're waiting, so we check that the mid isn't shown before applying the ng-if.
           */
          $scope.shownMid = false;
          $timeout( function() {
            if ( !$scope.shownMid ){
              $scope.shown = false;
              $scope.$emit('menu-hidden');
            }
          }, 200);
        }

        angular.element(document).off('click touchstart', applyHideMenu);
      };

      $scope.$on('hide-menu', function (event, args) {
        $scope.hideMenu(event, args);
      });

      $scope.$on('show-menu', function (event, args) {
        $scope.showMenu(event, args);
      });

      
    // *** Auto hide when click elsewhere ******
      var applyHideMenu = function(){
        if ($scope.shown) {
          $scope.$apply(function () {
            $scope.hideMenu();
          });
        }
      };
    
      if (typeof($scope.autoHide) === 'undefined' || $scope.autoHide === undefined) {
        $scope.autoHide = true;
      }

      if ($scope.autoHide) {
        angular.element($window).on('resize', applyHideMenu);
      }

      $scope.$on('$destroy', function () {
        angular.element(document).off('click touchstart', applyHideMenu);
      });
      

      $scope.$on('$destroy', function() {
        angular.element($window).off('resize', applyHideMenu);
      });

      if (uiGridCtrl) {
       $scope.$on('$destroy', uiGridCtrl.grid.api.core.on.scrollBegin($scope, applyHideMenu ));
      }

      $scope.$on('$destroy', $scope.$on(uiGridConstants.events.ITEM_DRAGGING, applyHideMenu ));
    },
    
    
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      var self = this;
    }]
  };

  return uiGridMenu;
}])

.directive('uiGridMenuItem', ['gridUtil', '$compile', 'i18nService', function (gridUtil, $compile, i18nService) {
  var uiGridMenuItem = {
    priority: 0,
    scope: {
      name: '=',
      active: '=',
      action: '=',
      icon: '=',
      shown: '=',
      context: '=',
      templateUrl: '=',
      leaveOpen: '='
    },
    require: ['?^uiGrid', '^uiGridMenu'],
    templateUrl: 'ui-grid/uiGridMenuItem',
    replace: true,
    compile: function($elm, $attrs) {
      return {
        pre: function ($scope, $elm, $attrs, controllers) {
          var uiGridCtrl = controllers[0],
              uiGridMenuCtrl = controllers[1];
          
          if ($scope.templateUrl) {
            gridUtil.getTemplate($scope.templateUrl)
                .then(function (contents) {
                  var template = angular.element(contents);
                    
                  var newElm = $compile(template)($scope);
                  $elm.replaceWith(newElm);
                });
          }
        },
        post: function ($scope, $elm, $attrs, controllers) {
          var uiGridCtrl = controllers[0],
              uiGridMenuCtrl = controllers[1];

          // TODO(c0bra): validate that shown and active are functions if they're defined. An exception is already thrown above this though
          // if (typeof($scope.shown) !== 'undefined' && $scope.shown && typeof($scope.shown) !== 'function') {
          //   throw new TypeError("$scope.shown is defined but not a function");
          // }
          if (typeof($scope.shown) === 'undefined' || $scope.shown === null) {
            $scope.shown = function() { return true; };
          }

          $scope.itemShown = function () {
            var context = {};
            if ($scope.context) {
              context.context = $scope.context;
            }

            if (typeof(uiGridCtrl) !== 'undefined' && uiGridCtrl) {
              context.grid = uiGridCtrl.grid;
            }

            return $scope.shown.call(context);
          };

          $scope.itemAction = function($event,title) {
            // gridUtil.logDebug('itemAction');
            $event.stopPropagation();

            if (typeof($scope.action) === 'function') {
              var context = {};

              if ($scope.context) {
                context.context = $scope.context;
              }

              // Add the grid to the function call context if the uiGrid controller is present
              if (typeof(uiGridCtrl) !== 'undefined' && uiGridCtrl) {
                context.grid = uiGridCtrl.grid;
              }

              $scope.action.call(context, $event, title);

              if ( !$scope.leaveOpen ){
                $scope.$emit('hide-menu');
              }
            }
          };

          $scope.i18n = i18nService.get();
        }
      };
    }
  };

  return uiGridMenuItem;
}]);

})();
(function(){
  'use strict';
  /**
   * @ngdoc overview
   * @name ui.grid.directive:uiGridOneBind
   * @summary A group of directives that provide a one time bind to a dom element.
   * @description A group of directives that provide a one time bind to a dom element.
   * As one time bindings are not supported in Angular 1.2.* this directive provdes this capability.
   * This is done to reduce the number of watchers on the dom.
   * <br/>
   * <h2>Short Example ({@link ui.grid.directive:uiGridOneBindSrc ui-grid-one-bind-src})</h2>
   * <pre>
        <div ng-init="imageName = 'myImageDir.jpg'">
          <img ui-grid-one-bind-src="imageName"></img>
        </div>
     </pre>
   * Will become:
   * <pre>
       <div ng-init="imageName = 'myImageDir.jpg'">
         <img ui-grid-one-bind-src="imageName" src="myImageDir.jpg"></img>
       </div>
     </pre>
     </br>
     <h2>Short Example ({@link ui.grid.directive:uiGridOneBindText ui-grid-one-bind-text})</h2>
   * <pre>
        <div ng-init="text='Add this text'" ui-grid-one-bind-text="text"></div>
     </pre>
   * Will become:
   * <pre>
   <div ng-init="text='Add this text'" ui-grid-one-bind-text="text">Add this text</div>
     </pre>
     </br>
   * <b>Note:</b> This behavior is slightly different for the {@link ui.grid.directive:uiGridOneBindIdGrid uiGridOneBindIdGrid}
   * and {@link ui.grid.directive:uiGridOneBindAriaLabelledbyGrid uiGridOneBindAriaLabelledbyGrid} directives.
   *
   */
  //https://github.com/joshkurz/Black-Belt-AngularJS-Directives/blob/master/directives/Optimization/oneBind.js
  var oneBinders = angular.module('ui.grid');
  angular.forEach([
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindSrc
       * @memberof ui.grid.directive:uiGridOneBind
       * @element img
       * @restrict A
       * @param {String} uiGridOneBindSrc The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the src dom tag.
       *
       */
      {tag: 'Src', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindText
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindText The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the text dom tag.
       */
      {tag: 'Text', method: 'text'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindHref
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindHref The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the href dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Href', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindClass
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindClass The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @param {Object} uiGridOneBindClass The object that you want to bind. At least one of the values in the object must be something other than null or undefined for the watcher to be removed.
       *                                    this is to prevent the watcher from being removed before the scope is initialized.
       * @param {Array} uiGridOneBindClass An array of classes to bind to this element.
       * @description One time binding for the class dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Class', method: 'addClass'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindHtml
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindHtml The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the html method on a dom element. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Html', method: 'html'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindAlt
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindAlt The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the alt dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Alt', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindStyle
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindStyle The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the style dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Style', method: 'css'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindValue
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindValue The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the value dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Value', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindId
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindId The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the value dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Id', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindIdGrid
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindIdGrid The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the id dom tag.
       * <h1>Important Note!</h1>
       * If the id tag passed as a parameter does <b>not</b> contain the grid id as a substring
       * then the directive will search the scope and the parent controller (if it is a uiGridController) for the grid.id value.
       * If this value is found then it is appended to the begining of the id tag. If the grid is not found then the directive throws an error.
       * This is done in order to ensure uniqueness of id tags across the grid.
       * This is to prevent two grids in the same document having duplicate id tags.
       */
      {tag: 'Id', directiveName:'IdGrid', method: 'attr', appendGridId: true},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindTitle
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindTitle The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the title dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       */
      {tag: 'Title', method: 'attr'},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindAriaLabel
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindAriaLabel The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the aria-label dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       *<br/>
       * <pre>
            <div ng-init="text='Add this text'" ui-grid-one-bind-aria-label="text"></div>
         </pre>
       * Will become:
       * <pre>
            <div ng-init="text='Add this text'" ui-grid-one-bind-aria-label="text" aria-label="Add this text"></div>
         </pre>
       */
      {tag: 'Label', method: 'attr', aria:true},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindAriaLabelledby
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindAriaLabelledby The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the aria-labelledby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       *<br/>
       * <pre>
            <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby="anId"></div>
         </pre>
       * Will become:
       * <pre>
            <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby="anId" aria-labelledby="gridID32"></div>
         </pre>
       */
      {tag: 'Labelledby', method: 'attr', aria:true},
      /**
       * @ngdoc directive
       * @name ui.grid.directive:uiGridOneBindAriaLabelledbyGrid
       * @element div
       * @restrict A
       * @param {String} uiGridOneBindAriaLabelledbyGrid The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
       * @description One time binding for the aria-labelledby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
       * Works somewhat like {@link ui.grid.directive:uiGridOneBindIdGrid} however this one supports a list of ids (seperated by a space) and will dynamically add the
       * grid id to each one.
       *<br/>
       * <pre>
            <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby-grid="anId"></div>
         </pre>
       * Will become ([grid.id] will be replaced by the actual grid id):
       * <pre>
            <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby-grid="anId" aria-labelledby-Grid="[grid.id]-gridID32"></div>
         </pre>
       */
      {tag: 'Labelledby', directiveName:'LabelledbyGrid', appendGridId:true, method: 'attr', aria:true}],
    function(v){

      var baseDirectiveName = 'uiGridOneBind';
      //If it is an aria tag then append the aria label seperately
      //This is done because the aria tags are formatted aria-* and the directive name can't have a '-' character in it.
      //If the diretiveName has to be overridden then it does so here. This is because the tag being modified and the directive sometimes don't match up.
      var directiveName = (v.aria ? baseDirectiveName + 'Aria' : baseDirectiveName) + (v.directiveName ? v.directiveName : v.tag);
      oneBinders.directive(directiveName, ['gridUtil', function(gridUtil){
        return {
          restrict: 'A',
          require: ['?uiGrid','?^uiGrid'],
          link: function(scope, iElement, iAttrs, controllers){
            /* Appends the grid id to the beginnig of the value. */
            var appendGridId = function(val){
              var grid; //Get an instance of the grid if its available
              //If its available in the scope then we don't need to try to find it elsewhere
              if (scope.grid) {
                grid = scope.grid;
              }
              //Another possible location to try to find the grid
              else if (scope.col && scope.col.grid){
                grid = scope.col.grid;
              }
              //Last ditch effort: Search through the provided controllers.
              else if (!controllers.some( //Go through the controllers till one has the element we need
                function(controller){
                  if (controller && controller.grid) {
                    grid = controller.grid;
                    return true; //We've found the grid
                  }
              })){
                //We tried our best to find it for you
                gridUtil.logError("["+directiveName+"] A valid grid could not be found to bind id. Are you using this directive " +
                                 "within the correct scope? Trying to generate id: [gridID]-" + val);
                throw new Error("No valid grid could be found");
              }

              if (grid){
                var idRegex = new RegExp(grid.id.toString());
                //If the grid id hasn't been appended already in the template declaration
                if (!idRegex.test(val)){
                  val = grid.id.toString() + '-' + val;
                }
              }
              return val;
            };

            // The watch returns a function to remove itself.
            var rmWatcher = scope.$watch(iAttrs[directiveName], function(newV){
              if (newV){
                //If we are trying to add an id element then we also apply the grid id if it isn't already there
                if (v.appendGridId) {
                  var newIdString = null;
                  //Append the id to all of the new ids.
                  angular.forEach( newV.split(' '), function(s){
                    newIdString = (newIdString ? (newIdString + ' ') : '') +  appendGridId(s);
                  });
                  newV = newIdString;
                }

                // Append this newValue to the dom element.
                switch (v.method) {
                  case 'attr': //The attr method takes two paraams the tag and the value
                    if (v.aria) {
                      //If it is an aria element then append the aria prefix
                      iElement[v.method]('aria-' + v.tag.toLowerCase(),newV);
                    } else {
                      iElement[v.method](v.tag.toLowerCase(),newV);
                    }
                    break;
                  case 'addClass':
                    //Pulled from https://github.com/Pasvaz/bindonce/blob/master/bindonce.js
                    if (angular.isObject(newV) && !angular.isArray(newV)) {
                      var results = [];
                      var nonNullFound = false; //We don't want to remove the binding unless the key is actually defined
                      angular.forEach(newV, function (value, index) {
                        if (value !== null && typeof(value) !== "undefined"){
                          nonNullFound = true; //A non null value for a key was found so the object must have been initialized
                          if (value) {results.push(index);}
                        }
                      });
                      //A non null value for a key wasn't found so assume that the scope values haven't been fully initialized
                      if (!nonNullFound){
                        return; // If not initialized then the watcher should not be removed yet.
                      }
                      newV = results;
                    }

                    if (newV) {
                      iElement.addClass(angular.isArray(newV) ? newV.join(' ') : newV);
                    } else {
                      return;
                    }
                    break;
                  default:
                    iElement[v.method](newV);
                    break;
                }

                //Removes the watcher on itself after the bind
                rmWatcher();
              }
            // True ensures that equality is determined using angular.equals instead of ===
            }, true); //End rm watchers
          } //End compile function
        }; //End directive return
      } // End directive function
    ]); //End directive
  }); // End angular foreach
})();

(function () {
  'use strict';

  var module = angular.module('ui.grid');

  module.directive('uiGridRenderContainer', ['$timeout', '$document', 'uiGridConstants', 'gridUtil', 'ScrollEvent',
    function($timeout, $document, uiGridConstants, gridUtil, ScrollEvent) {
    return {
      replace: true,
      transclude: true,
      templateUrl: 'ui-grid/uiGridRenderContainer',
      require: ['^uiGrid', 'uiGridRenderContainer'],
      scope: {
        containerId: '=',
        rowContainerName: '=',
        colContainerName: '=',
        bindScrollHorizontal: '=',
        bindScrollVertical: '=',
        enableVerticalScrollbar: '=',
        enableHorizontalScrollbar: '='
      },
      controller: 'uiGridRenderContainer as RenderContainer',
      compile: function () {
        return {
          pre: function prelink($scope, $elm, $attrs, controllers) {

            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];
            var grid = $scope.grid = uiGridCtrl.grid;

            // Verify that the render container for this element exists
            if (!$scope.rowContainerName) {
              throw "No row render container name specified";
            }
            if (!$scope.colContainerName) {
              throw "No column render container name specified";
            }

            if (!grid.renderContainers[$scope.rowContainerName]) {
              throw "Row render container '" + $scope.rowContainerName + "' is not registered.";
            }
            if (!grid.renderContainers[$scope.colContainerName]) {
              throw "Column render container '" + $scope.colContainerName + "' is not registered.";
            }

            var rowContainer = $scope.rowContainer = grid.renderContainers[$scope.rowContainerName];
            var colContainer = $scope.colContainer = grid.renderContainers[$scope.colContainerName];

            containerCtrl.containerId = $scope.containerId;
            containerCtrl.rowContainer = rowContainer;
            containerCtrl.colContainer = colContainer;
          },
          post: function postlink($scope, $elm, $attrs, controllers) {

            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            var grid = uiGridCtrl.grid;
            var rowContainer = containerCtrl.rowContainer;
            var colContainer = containerCtrl.colContainer;
            var scrollTop = null;
            var scrollLeft = null;


            var renderContainer = grid.renderContainers[$scope.containerId];

            // Put the container name on this element as a class
            $elm.addClass('ui-grid-render-container-' + $scope.containerId);

            // Scroll the render container viewport when the mousewheel is used
            gridUtil.on.mousewheel($elm, function (event) {
              var scrollEvent = new ScrollEvent(grid, rowContainer, colContainer, ScrollEvent.Sources.RenderContainerMouseWheel);
              if (event.deltaY !== 0) {
                var scrollYAmount = event.deltaY * -1 * event.deltaFactor;

                scrollTop = containerCtrl.viewport[0].scrollTop;

                // Get the scroll percentage
                scrollEvent.verticalScrollLength = rowContainer.getVerticalScrollLength();
                var scrollYPercentage = (scrollTop + scrollYAmount) / scrollEvent.verticalScrollLength;

                // If we should be scrolled 100%, make sure the scrollTop matches the maximum scroll length
                //   Viewports that have "overflow: hidden" don't let the mousewheel scroll all the way to the bottom without this check
                if (scrollYPercentage >= 1 && scrollTop < scrollEvent.verticalScrollLength) {
                  containerCtrl.viewport[0].scrollTop = scrollEvent.verticalScrollLength;
                }

                // Keep scrollPercentage within the range 0-1.
                if (scrollYPercentage < 0) { scrollYPercentage = 0; }
                else if (scrollYPercentage > 1) { scrollYPercentage = 1; }

                scrollEvent.y = { percentage: scrollYPercentage, pixels: scrollYAmount };
              }
              if (event.deltaX !== 0) {
                var scrollXAmount = event.deltaX * event.deltaFactor;

                // Get the scroll percentage
                scrollLeft = gridUtil.normalizeScrollLeft(containerCtrl.viewport, grid);
                scrollEvent.horizontalScrollLength = (colContainer.getCanvasWidth() - colContainer.getViewportWidth());
                var scrollXPercentage = (scrollLeft + scrollXAmount) / scrollEvent.horizontalScrollLength;

                // Keep scrollPercentage within the range 0-1.
                if (scrollXPercentage < 0) { scrollXPercentage = 0; }
                else if (scrollXPercentage > 1) { scrollXPercentage = 1; }

                scrollEvent.x = { percentage: scrollXPercentage, pixels: scrollXAmount };
              }

              // Let the parent container scroll if the grid is already at the top/bottom
              if ((event.deltaY !== 0 && (scrollEvent.atTop(scrollTop) || scrollEvent.atBottom(scrollTop))) ||
                  (event.deltaX !== 0 && (scrollEvent.atLeft(scrollLeft) || scrollEvent.atRight(scrollLeft)))) {
                //parent controller scrolls
              }
              else {
                event.preventDefault();
                scrollEvent.fireThrottledScrollingEvent('', scrollEvent);
              }

            });

            $elm.bind('$destroy', function() {
              $elm.unbind('keydown');

              ['touchstart', 'touchmove', 'touchend','keydown', 'wheel', 'mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'].forEach(function (eventName) {
                $elm.unbind(eventName);
              });
            });

            // TODO(c0bra): Handle resizing the inner canvas based on the number of elements
            function update() {
              var ret = '';

              var canvasWidth = colContainer.canvasWidth;
              var viewportWidth = colContainer.getViewportWidth();

              var canvasHeight = rowContainer.getCanvasHeight();

              //add additional height for scrollbar on left and right container
              //if ($scope.containerId !== 'body') {
              //  canvasHeight -= grid.scrollbarHeight;
              //}

              var viewportHeight = rowContainer.getViewportHeight();
              //shorten the height to make room for a scrollbar placeholder
              if (colContainer.needsHScrollbarPlaceholder()) {
                viewportHeight -= grid.scrollbarHeight;
              }

              var headerViewportWidth,
                  footerViewportWidth;
              headerViewportWidth = footerViewportWidth = colContainer.getHeaderViewportWidth();

              // Set canvas dimensions
              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-canvas { width: ' + canvasWidth + 'px; height: ' + canvasHeight + 'px; }';

              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { width: ' + (canvasWidth + grid.scrollbarWidth) + 'px; }';

              if (renderContainer.explicitHeaderCanvasHeight) {
                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { height: ' + renderContainer.explicitHeaderCanvasHeight + 'px; }';
              }
              else {
                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { height: inherit; }';
              }

              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-viewport { width: ' + viewportWidth + 'px; height: ' + viewportHeight + 'px; }';
              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-viewport { width: ' + headerViewportWidth + 'px; }';

              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-footer-canvas { width: ' + (canvasWidth + grid.scrollbarWidth) + 'px; }';
              ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-footer-viewport { width: ' + footerViewportWidth + 'px; }';

              return ret;
            }

            uiGridCtrl.grid.registerStyleComputation({
              priority: 6,
              func: update
            });
          }
        };
      }
    };

  }]);

  module.controller('uiGridRenderContainer', ['$scope', 'gridUtil', function ($scope, gridUtil) {

  }]);

})();

(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridRow', ['gridUtil', function(gridUtil) {
    return {
      replace: true,
      // priority: 2001,
      // templateUrl: 'ui-grid/ui-grid-row',
      require: ['^uiGrid', '^uiGridRenderContainer'],
      scope: {
         row: '=uiGridRow',
         //rowRenderIndex is added to scope to give the true visual index of the row to any directives that need it
         rowRenderIndex: '='
      },
      compile: function() {
        return {
          pre: function($scope, $elm, $attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var containerCtrl = controllers[1];

            var grid = uiGridCtrl.grid;

            $scope.grid = uiGridCtrl.grid;
            $scope.colContainer = containerCtrl.colContainer;

            // Function for attaching the template to this scope
            var clonedElement, cloneScope;
            function compileTemplate() {
              $scope.row.getRowTemplateFn.then(function (compiledElementFn) {
                // var compiledElementFn = $scope.row.compiledElementFn;

                // Create a new scope for the contents of this row, so we can destroy it later if need be
                var newScope = $scope.$new();

                compiledElementFn(newScope, function (newElm, scope) {
                  // If we already have a cloned element, we need to remove it and destroy its scope
                  if (clonedElement) {
                    clonedElement.remove();
                    cloneScope.$destroy();
                  }

                  // Empty the row and append the new element
                  $elm.empty().append(newElm);

                  // Save the new cloned element and scope
                  clonedElement = newElm;
                  cloneScope = newScope;
                });
              });
            }

            // Initially attach the compiled template to this scope
            compileTemplate();

            // If the row's compiled element function changes, we need to replace this element's contents with the new compiled template
            $scope.$watch('row.getRowTemplateFn', function (newFunc, oldFunc) {
              if (newFunc !== oldFunc) {
                compileTemplate();
              }
            });
          },
          post: function($scope, $elm, $attrs, controllers) {

          }
        };
      }
    };
  }]);

})();
(function(){
// 'use strict';

  /**
   * @ngdoc directive
   * @name ui.grid.directive:uiGridStyle
   * @element style
   * @restrict A
   *
   * @description
   * Allows us to interpolate expressions in `<style>` elements. Angular doesn't do this by default as it can/will/might? break in IE8.
   *
   * @example
   <doc:example module="app">
   <doc:source>
   <script>
   var app = angular.module('app', ['ui.grid']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.myStyle = '.blah { border: 1px solid }';
        }]);
   </script>

   <div ng-controller="MainCtrl">
   <style ui-grid-style>{{ myStyle }}</style>
   <span class="blah">I am in a box.</span>
   </div>
   </doc:source>
   <doc:scenario>
      it('should apply the right class to the element', function () {
        element(by.css('.blah')).getCssValue('border-top-width')
          .then(function(c) {
            expect(c).toContain('1px');
          });
      });
   </doc:scenario>
   </doc:example>
   */


  angular.module('ui.grid').directive('uiGridStyle', ['gridUtil', '$interpolate', function(gridUtil, $interpolate) {
    return {
      // restrict: 'A',
      // priority: 1000,
      // require: '?^uiGrid',
      link: function($scope, $elm, $attrs, uiGridCtrl) {
        // gridUtil.logDebug('ui-grid-style link');
        // if (uiGridCtrl === undefined) {
        //    gridUtil.logWarn('[ui-grid-style link] uiGridCtrl is undefined!');
        // }

        var interpolateFn = $interpolate($elm.text(), true);

        if (interpolateFn) {
          $scope.$watch(interpolateFn, function(value) {
            $elm.text(value);
          });
        }

          // uiGridCtrl.recalcRowStyles = function() {
          //   var offset = (scope.options.offsetTop || 0) - (scope.options.excessRows * scope.options.rowHeight);
          //   var rowHeight = scope.options.rowHeight;

          //   var ret = '';
          //   var rowStyleCount = uiGridCtrl.minRowsToRender() + (scope.options.excessRows * 2);
          //   for (var i = 1; i <= rowStyleCount; i++) {
          //     ret = ret + ' .grid' + scope.gridId + ' .ui-grid-row:nth-child(' + i + ') { top: ' + offset + 'px; }';
          //     offset = offset + rowHeight;
          //   }

          //   scope.rowStyles = ret;
          // };

          // uiGridCtrl.styleComputions.push(uiGridCtrl.recalcRowStyles);

      }
    };
  }]);

})();

(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridViewport', ['gridUtil','ScrollEvent','uiGridConstants', '$log',
    function(gridUtil, ScrollEvent, uiGridConstants, $log) {
      return {
        replace: true,
        scope: {},
        controllerAs: 'Viewport',
        templateUrl: 'ui-grid/uiGridViewport',
        require: ['^uiGrid', '^uiGridRenderContainer'],
        link: function($scope, $elm, $attrs, controllers) {
          // gridUtil.logDebug('viewport post-link');

          var uiGridCtrl = controllers[0];
          var containerCtrl = controllers[1];

          $scope.containerCtrl = containerCtrl;

          var rowContainer = containerCtrl.rowContainer;
          var colContainer = containerCtrl.colContainer;

          var grid = uiGridCtrl.grid;

          $scope.grid = uiGridCtrl.grid;

          // Put the containers in scope so we can get rows and columns from them
          $scope.rowContainer = containerCtrl.rowContainer;
          $scope.colContainer = containerCtrl.colContainer;

          // Register this viewport with its container
          containerCtrl.viewport = $elm;


          $elm.on('scroll', scrollHandler);

          var ignoreScroll = false;

          function scrollHandler(evt) {
            //Leaving in this commented code in case it can someday be used
            //It does improve performance, but because the horizontal scroll is normalized,
            //  using this code will lead to the column header getting slightly out of line with columns
            //
            //if (ignoreScroll && (grid.isScrollingHorizontally || grid.isScrollingHorizontally)) {
            //  //don't ask for scrollTop if we just set it
            //  ignoreScroll = false;
            //  return;
            //}
            //ignoreScroll = true;

            var newScrollTop = $elm[0].scrollTop;
            var newScrollLeft = gridUtil.normalizeScrollLeft($elm, grid);

            var vertScrollPercentage = rowContainer.scrollVertical(newScrollTop);
            var horizScrollPercentage = colContainer.scrollHorizontal(newScrollLeft);

            var scrollEvent = new ScrollEvent(grid, rowContainer, colContainer, ScrollEvent.Sources.ViewPortScroll);
            scrollEvent.newScrollLeft = newScrollLeft;
            scrollEvent.newScrollTop = newScrollTop;
            if ( horizScrollPercentage > -1 ){
              scrollEvent.x = { percentage: horizScrollPercentage };
            }

            if ( vertScrollPercentage > -1 ){
              scrollEvent.y = { percentage: vertScrollPercentage };
            }

            grid.scrollContainers($scope.$parent.containerId, scrollEvent);
          }

          if ($scope.$parent.bindScrollVertical) {
            grid.addVerticalScrollSync($scope.$parent.containerId, syncVerticalScroll);
          }

          if ($scope.$parent.bindScrollHorizontal) {
            grid.addHorizontalScrollSync($scope.$parent.containerId, syncHorizontalScroll);
            grid.addHorizontalScrollSync($scope.$parent.containerId + 'header', syncHorizontalHeader);
            grid.addHorizontalScrollSync($scope.$parent.containerId + 'footer', syncHorizontalFooter);
          }

          function syncVerticalScroll(scrollEvent){
            containerCtrl.prevScrollArgs = scrollEvent;
            var newScrollTop = scrollEvent.getNewScrollTop(rowContainer,containerCtrl.viewport);
            $elm[0].scrollTop = newScrollTop;

          }

          function syncHorizontalScroll(scrollEvent){
            containerCtrl.prevScrollArgs = scrollEvent;
            var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
            $elm[0].scrollLeft =  gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
          }

          function syncHorizontalHeader(scrollEvent){
            var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
            if (containerCtrl.headerViewport) {
              containerCtrl.headerViewport.scrollLeft = gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
            }
          }

          function syncHorizontalFooter(scrollEvent){
            var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
            if (containerCtrl.footerViewport) {
              containerCtrl.footerViewport.scrollLeft =  gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
            }
          }


        },
        controller: ['$scope', function ($scope) {
          this.rowStyle = function (index) {
            var rowContainer = $scope.rowContainer;
            var colContainer = $scope.colContainer;

            var styles = {};

            if (index === 0 && rowContainer.currentTopRow !== 0) {
              // The row offset-top is just the height of the rows above the current top-most row, which are no longer rendered
              var hiddenRowWidth = (rowContainer.currentTopRow) * rowContainer.grid.options.rowHeight;

              // return { 'margin-top': hiddenRowWidth + 'px' };
              styles['margin-top'] = hiddenRowWidth + 'px';
            }

            if (colContainer.currentFirstColumn !== 0) {
              if (colContainer.grid.isRTL()) {
                styles['margin-right'] = colContainer.columnOffset + 'px';
              }
              else {
                styles['margin-left'] = colContainer.columnOffset + 'px';
              }
            }

            return styles;
          };
        }]
      };
    }
  ]);

})();

(function() {

angular.module('ui.grid')
.directive('uiGridVisible', function uiGridVisibleAction() {
  return function ($scope, $elm, $attr) {
    $scope.$watch($attr.uiGridVisible, function (visible) {
        // $elm.css('visibility', visible ? 'visible' : 'hidden');
        $elm[visible ? 'removeClass' : 'addClass']('ui-grid-invisible');
    });
  };
});

})();
(function () {
  'use strict';

  angular.module('ui.grid').controller('uiGridController', ['$scope', '$element', '$attrs', 'gridUtil', '$q', 'uiGridConstants',
                    '$templateCache', 'gridClassFactory', '$timeout', '$parse', '$compile',
    function ($scope, $elm, $attrs, gridUtil, $q, uiGridConstants,
              $templateCache, gridClassFactory, $timeout, $parse, $compile) {
      // gridUtil.logDebug('ui-grid controller');

      var self = this;

      self.grid = gridClassFactory.createGrid($scope.uiGrid);

      //assign $scope.$parent if appScope not already assigned
      self.grid.appScope = self.grid.appScope || $scope.$parent;

      $elm.addClass('grid' + self.grid.id);
      self.grid.rtl = gridUtil.getStyles($elm[0])['direction'] === 'rtl';


      // angular.extend(self.grid.options, );

      //all properties of grid are available on scope
      $scope.grid = self.grid;

      if ($attrs.uiGridColumns) {
        $attrs.$observe('uiGridColumns', function(value) {
          self.grid.options.columnDefs = value;
          self.grid.buildColumns()
            .then(function(){
              self.grid.preCompileCellTemplates();

              self.grid.refreshCanvas(true);
            });
        });
      }


      // if fastWatch is set we watch only the length and the reference, not every individual object
      var deregFunctions = [];
      if (self.grid.options.fastWatch) {
        self.uiGrid = $scope.uiGrid;
        if (angular.isString($scope.uiGrid.data)) {
          deregFunctions.push( $scope.$parent.$watch($scope.uiGrid.data, dataWatchFunction) );
          deregFunctions.push( $scope.$parent.$watch(function() {
            if ( self.grid.appScope[$scope.uiGrid.data] ){
              return self.grid.appScope[$scope.uiGrid.data].length; 
            } else {
              return undefined;
            } 
          }, dataWatchFunction) );
        } else {
          deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.data; }, dataWatchFunction) );
          deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.data.length; }, dataWatchFunction) );
        }
        deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.columnDefs; }, columnDefsWatchFunction) );
        deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.columnDefs.length; }, columnDefsWatchFunction) );
      } else {
        if (angular.isString($scope.uiGrid.data)) {
          deregFunctions.push( $scope.$parent.$watchCollection($scope.uiGrid.data, dataWatchFunction) );
        } else {
          deregFunctions.push( $scope.$parent.$watchCollection(function() { return $scope.uiGrid.data; }, dataWatchFunction) );
        }
        deregFunctions.push( $scope.$parent.$watchCollection(function() { return $scope.uiGrid.columnDefs; }, columnDefsWatchFunction) );
      }
      

      function columnDefsWatchFunction(n, o) {
        if (n && n !== o) {
          self.grid.options.columnDefs = n;
          self.grid.buildColumns({ orderByColumnDefs: true })
            .then(function(){

              self.grid.preCompileCellTemplates();

              self.grid.callDataChangeCallbacks(uiGridConstants.dataChange.COLUMN);
            });
        }
      }

      function dataWatchFunction(newData) {
        // gridUtil.logDebug('dataWatch fired');
        var promises = [];
        
        if ( self.grid.options.fastWatch ){
          if (angular.isString($scope.uiGrid.data)) {
            newData = self.grid.appScope[$scope.uiGrid.data];
          } else {
            newData = $scope.uiGrid.data;
          }
        }
        
        if (newData) {
          if (
            // If we have no columns (i.e. columns length is either 0 or equal to the number of row header columns, which don't count because they're created automatically)
            self.grid.columns.length === (self.grid.rowHeaderColumns ? self.grid.rowHeaderColumns.length : 0) &&
            // ... and we don't have a ui-grid-columns attribute, which would define columns for us
            !$attrs.uiGridColumns &&
            // ... and we have no pre-defined columns
            self.grid.options.columnDefs.length === 0 &&
            // ... but we DO have data
            newData.length > 0
          ) {
            // ... then build the column definitions from the data that we have
            self.grid.buildColumnDefsFromData(newData);
          }

          // If we either have some columns defined, or some data defined
          if (self.grid.options.columnDefs.length > 0 || newData.length > 0) {
            // Build the column set, then pre-compile the column cell templates
            promises.push(self.grid.buildColumns()
              .then(function() {
                self.grid.preCompileCellTemplates();
              }));
          }

          $q.all(promises).then(function() {
            self.grid.modifyRows(newData)
              .then(function () {
                // if (self.viewport) {
                  self.grid.redrawInPlace(true);
                // }

                $scope.$evalAsync(function() {
                  self.grid.refreshCanvas(true);
                  self.grid.callDataChangeCallbacks(uiGridConstants.dataChange.ROW);
                });
              });
          });
        }
      }

      var styleWatchDereg = $scope.$watch(function () { return self.grid.styleComputations; }, function() {
        self.grid.refreshCanvas(true);
      });

      $scope.$on('$destroy', function() {
        deregFunctions.forEach( function( deregFn ){ deregFn(); });
        styleWatchDereg();
      });

      self.fireEvent = function(eventName, args) {
        // Add the grid to the event arguments if it's not there
        if (typeof(args) === 'undefined' || args === undefined) {
          args = {};
        }

        if (typeof(args.grid) === 'undefined' || args.grid === undefined) {
          args.grid = self.grid;
        }

        $scope.$broadcast(eventName, args);
      };

      self.innerCompile = function innerCompile(elm) {
        $compile(elm)($scope);
      };

    }]);

/**
 *  @ngdoc directive
 *  @name ui.grid.directive:uiGrid
 *  @element div
 *  @restrict EA
 *  @param {Object} uiGrid Options for the grid to use
 *
 *  @description Create a very basic grid.
 *
 *  @example
    <example module="app">
      <file name="app.js">
        var app = angular.module('app', ['ui.grid']);

        app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.data = [
            { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
          ];
        }]);
      </file>
      <file name="index.html">
        <div ng-controller="MainCtrl">
          <div ui-grid="{ data: data }"></div>
        </div>
      </file>
    </example>
 */
angular.module('ui.grid').directive('uiGrid', uiGridDirective);

uiGridDirective.$inject = ['$compile', '$templateCache', '$timeout', '$window', 'gridUtil', 'uiGridConstants'];
function uiGridDirective($compile, $templateCache, $timeout, $window, gridUtil, uiGridConstants) {
  return {
    templateUrl: 'ui-grid/ui-grid',
    scope: {
      uiGrid: '='
    },
    replace: true,
    transclude: true,
    controller: 'uiGridController',
    compile: function () {
      return {
        post: function ($scope, $elm, $attrs, uiGridCtrl) {
          var grid = uiGridCtrl.grid;
          // Initialize scrollbars (TODO: move to controller??)
          uiGridCtrl.scrollbars = [];
          grid.element = $elm;


          // See if the grid has a rendered width, if not, wait a bit and try again
          var sizeCheckInterval = 100; // ms
          var maxSizeChecks = 20; // 2 seconds total
          var sizeChecks = 0;

          // Setup (event listeners) the grid
          setup();

          // And initialize it
          init();

          // Mark rendering complete so API events can happen
          grid.renderingComplete();

          // If the grid doesn't have size currently, wait for a bit to see if it gets size
          checkSize();

          /*-- Methods --*/

          function checkSize() {
            // If the grid has no width and we haven't checked more than <maxSizeChecks> times, check again in <sizeCheckInterval> milliseconds
            if ($elm[0].offsetWidth <= 0 && sizeChecks < maxSizeChecks) {
              setTimeout(checkSize, sizeCheckInterval);
              sizeChecks++;
            }
            else {
              $timeout(init);
            }
          }

          // Setup event listeners and watchers
          function setup() {
            // Bind to window resize events
            angular.element($window).on('resize', gridResize);

            // Unbind from window resize events when the grid is destroyed
            $elm.on('$destroy', function () {
              angular.element($window).off('resize', gridResize);
            });

            // If we add a left container after render, we need to watch and react
            $scope.$watch(function () { return grid.hasLeftContainer();}, function (newValue, oldValue) {
              if (newValue === oldValue) {
                return;
              }
              grid.refreshCanvas(true);
            });

            // If we add a right container after render, we need to watch and react
            $scope.$watch(function () { return grid.hasRightContainer();}, function (newValue, oldValue) {
              if (newValue === oldValue) {
                return;
              }
              grid.refreshCanvas(true);
            });
          }

          // Initialize the directive
          function init() {
            grid.gridWidth = $scope.gridWidth = gridUtil.elementWidth($elm);

            // Default canvasWidth to the grid width, in case we don't get any column definitions to calculate it from
            grid.canvasWidth = uiGridCtrl.grid.gridWidth;

            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);

            // If the grid isn't tall enough to fit a single row, it's kind of useless. Resize it to fit a minimum number of rows
            if (grid.gridHeight < grid.options.rowHeight && grid.options.enableMinHeightCheck) {
              autoAdjustHeight();
            }

            // Run initial canvas refresh
            grid.refreshCanvas(true);
          }

          // Set the grid's height ourselves in the case that its height would be unusably small
          function autoAdjustHeight() {
            // Figure out the new height
            var contentHeight = grid.options.minRowsToShow * grid.options.rowHeight;
            var headerHeight = grid.options.showHeader ? grid.options.headerRowHeight : 0;
            var footerHeight = grid.calcFooterHeight();
            
            var scrollbarHeight = 0;
            if (grid.options.enableHorizontalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
              scrollbarHeight = gridUtil.getScrollbarWidth();
            }

            var maxNumberOfFilters = 0;
            // Calculates the maximum number of filters in the columns
            angular.forEach(grid.options.columnDefs, function(col) {
              if (col.hasOwnProperty('filter')) {
                if (maxNumberOfFilters < 1) {
                    maxNumberOfFilters = 1;
                }
              }
              else if (col.hasOwnProperty('filters')) {
                if (maxNumberOfFilters < col.filters.length) {
                    maxNumberOfFilters = col.filters.length;
                }
              }
            });
            var filterHeight = maxNumberOfFilters * headerHeight;

            var newHeight = headerHeight + contentHeight + footerHeight + scrollbarHeight + filterHeight;

            $elm.css('height', newHeight + 'px');

            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);
          }

          // Resize the grid on window resize events
          function gridResize($event) {
            grid.gridWidth = $scope.gridWidth = gridUtil.elementWidth($elm);
            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);

            grid.refreshCanvas(true);
          }
        }
      };
    }
  };
}

})();

(function(){
  'use strict';

  // TODO: rename this file to ui-grid-pinned-container.js

  angular.module('ui.grid').directive('uiGridPinnedContainer', ['gridUtil', function (gridUtil) {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',
      scope: {
        side: '=uiGridPinnedContainer'
      },
      require: '^uiGrid',
      compile: function compile() {
        return {
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
            // gridUtil.logDebug('ui-grid-pinned-container ' + $scope.side + ' link');

            var grid = uiGridCtrl.grid;

            var myWidth = 0;

            $elm.addClass('ui-grid-pinned-container-' + $scope.side);

            // Monkey-patch the viewport width function
            if ($scope.side === 'left' || $scope.side === 'right') {
              grid.renderContainers[$scope.side].getViewportWidth = monkeyPatchedGetViewportWidth;
            }

            function monkeyPatchedGetViewportWidth() {
              /*jshint validthis: true */
              var self = this;

              var viewportWidth = 0;
              self.visibleColumnCache.forEach(function (column) {
                viewportWidth += column.drawnWidth;
              });

              var adjustment = self.getViewportAdjustment();

              viewportWidth = viewportWidth + adjustment.width;

              return viewportWidth;
            }

            function updateContainerWidth() {
              if ($scope.side === 'left' || $scope.side === 'right') {
                var cols = grid.renderContainers[$scope.side].visibleColumnCache;
                var width = 0;
                for (var i = 0; i < cols.length; i++) {
                  var col = cols[i];
                  width += col.drawnWidth || col.width || 0;
                }

                return width;
              }
            }

            function updateContainerDimensions() {
              var ret = '';

              // Column containers
              if ($scope.side === 'left' || $scope.side === 'right') {
                myWidth = updateContainerWidth();

                // gridUtil.logDebug('myWidth', myWidth);

                // TODO(c0bra): Subtract sum of col widths from grid viewport width and update it
                $elm.attr('style', null);

             //   var myHeight = grid.renderContainers.body.getViewportHeight(); // + grid.horizontalScrollbarHeight;

                ret += '.grid' + grid.id + ' .ui-grid-pinned-container-' + $scope.side + ', .grid' + grid.id + ' .ui-grid-pinned-container-' + $scope.side + ' .ui-grid-render-container-' + $scope.side + ' .ui-grid-viewport { width: ' + myWidth + 'px; } ';
              }

              return ret;
            }

            grid.renderContainers.body.registerViewportAdjuster(function (adjustment) {
              myWidth = updateContainerWidth();

              // Subtract our own width
              adjustment.width -= myWidth;
              adjustment.side = $scope.side;

              return adjustment;
            });

            // Register style computation to adjust for columns in `side`'s render container
            grid.registerStyleComputation({
              priority: 15,
              func: updateContainerDimensions
            });
          }
        };
      }
    };
  }]);
})();

(function(){

angular.module('ui.grid')
.factory('Grid', ['$q', '$compile', '$parse', 'gridUtil', 'uiGridConstants', 'GridOptions', 'GridColumn', 'GridRow', 'GridApi', 'rowSorter', 'rowSearcher', 'GridRenderContainer', '$timeout','ScrollEvent',
    function($q, $compile, $parse, gridUtil, uiGridConstants, GridOptions, GridColumn, GridRow, GridApi, rowSorter, rowSearcher, GridRenderContainer, $timeout, ScrollEvent) {

  /**
   * @ngdoc object
   * @name ui.grid.core.api:PublicApi
   * @description Public Api for the core grid features
   *
   */

  /**
   * @ngdoc function
   * @name ui.grid.class:Grid
   * @description Grid is the main viewModel.  Any properties or methods needed to maintain state are defined in
   * this prototype.  One instance of Grid is created per Grid directive instance.
   * @param {object} options Object map of options to pass into the grid. An 'id' property is expected.
   */
  var Grid = function Grid(options) {
    var self = this;
    // Get the id out of the options, then remove it
    if (options !== undefined && typeof(options.id) !== 'undefined' && options.id) {
      if (!/^[_a-zA-Z0-9-]+$/.test(options.id)) {
        throw new Error("Grid id '" + options.id + '" is invalid. It must follow CSS selector syntax rules.');
      }
    }
    else {
      throw new Error('No ID provided. An ID must be given when creating a grid.');
    }

    self.id = options.id;
    delete options.id;

    // Get default options
    self.options = GridOptions.initialize( options );

    /**
     * @ngdoc object
     * @name appScope
     * @propertyOf ui.grid.class:Grid
     * @description reference to the application scope (the parent scope of the ui-grid element).  Assigned in ui-grid controller
     * <br/>
     * use gridOptions.appScopeProvider to override the default assignment of $scope.$parent with any reference
     */
    self.appScope = self.options.appScopeProvider;

    self.headerHeight = self.options.headerRowHeight;


    /**
     * @ngdoc object
     * @name footerHeight
     * @propertyOf ui.grid.class:Grid
     * @description returns the total footer height gridFooter + columnFooter
     */
    self.footerHeight = self.calcFooterHeight();


    /**
     * @ngdoc object
     * @name columnFooterHeight
     * @propertyOf ui.grid.class:Grid
     * @description returns the total column footer height
     */
    self.columnFooterHeight = self.calcColumnFooterHeight();

    self.rtl = false;
    self.gridHeight = 0;
    self.gridWidth = 0;
    self.columnBuilders = [];
    self.rowBuilders = [];
    self.rowsProcessors = [];
    self.columnsProcessors = [];
    self.styleComputations = [];
    self.viewportAdjusters = [];
    self.rowHeaderColumns = [];
    self.dataChangeCallbacks = {};
    self.verticalScrollSyncCallBackFns = {};
    self.horizontalScrollSyncCallBackFns = {};

    // self.visibleRowCache = [];

    // Set of 'render' containers for self grid, which can render sets of rows
    self.renderContainers = {};

    // Create a
    self.renderContainers.body = new GridRenderContainer('body', self);

    self.cellValueGetterCache = {};

    // Cached function to use with custom row templates
    self.getRowTemplateFn = null;


    //representation of the rows on the grid.
    //these are wrapped references to the actual data rows (options.data)
    self.rows = [];

    //represents the columns on the grid
    self.columns = [];

    /**
     * @ngdoc boolean
     * @name isScrollingVertically
     * @propertyOf ui.grid.class:Grid
     * @description set to true when Grid is scrolling vertically. Set to false via debounced method
     */
    self.isScrollingVertically = false;

    /**
     * @ngdoc boolean
     * @name isScrollingHorizontally
     * @propertyOf ui.grid.class:Grid
     * @description set to true when Grid is scrolling horizontally. Set to false via debounced method
     */
    self.isScrollingHorizontally = false;

    /**
     * @ngdoc property
     * @name scrollDirection
     * @propertyOf ui.grid.class:Grid
     * @description set one of the uiGridConstants.scrollDirection values (UP, DOWN, LEFT, RIGHT, NONE), which tells
     * us which direction we are scrolling. Set to NONE via debounced method
     */
    self.scrollDirection = uiGridConstants.scrollDirection.NONE;

    //if true, grid will not respond to any scroll events
    self.disableScrolling = false;


    function vertical (scrollEvent) {
      self.isScrollingVertically = false;
      self.api.core.raise.scrollEnd(scrollEvent);
      self.scrollDirection = uiGridConstants.scrollDirection.NONE;
    }

    var debouncedVertical = gridUtil.debounce(vertical, self.options.scrollDebounce);
    var debouncedVerticalMinDelay = gridUtil.debounce(vertical, 0);

    function horizontal (scrollEvent) {
      self.isScrollingHorizontally = false;
      self.api.core.raise.scrollEnd(scrollEvent);
      self.scrollDirection = uiGridConstants.scrollDirection.NONE;
    }

    var debouncedHorizontal = gridUtil.debounce(horizontal, self.options.scrollDebounce);
    var debouncedHorizontalMinDelay = gridUtil.debounce(horizontal, 0);


    /**
     * @ngdoc function
     * @name flagScrollingVertically
     * @methodOf ui.grid.class:Grid
     * @description sets isScrollingVertically to true and sets it to false in a debounced function
     */
    self.flagScrollingVertically = function(scrollEvent) {
      if (!self.isScrollingVertically && !self.isScrollingHorizontally) {
        self.api.core.raise.scrollBegin(scrollEvent);
      }
      self.isScrollingVertically = true;
      if (self.options.scrollDebounce === 0 || !scrollEvent.withDelay) {
        debouncedVerticalMinDelay(scrollEvent);
      }
      else {
        debouncedVertical(scrollEvent);
      }
    };

    /**
     * @ngdoc function
     * @name flagScrollingHorizontally
     * @methodOf ui.grid.class:Grid
     * @description sets isScrollingHorizontally to true and sets it to false in a debounced function
     */
    self.flagScrollingHorizontally = function(scrollEvent) {
      if (!self.isScrollingVertically && !self.isScrollingHorizontally) {
        self.api.core.raise.scrollBegin(scrollEvent);
      }
      self.isScrollingHorizontally = true;
      if (self.options.scrollDebounce === 0 || !scrollEvent.withDelay) {
        debouncedHorizontalMinDelay(scrollEvent);
      }
      else {
        debouncedHorizontal(scrollEvent);
      }
    };

    self.scrollbarHeight = 0;
    self.scrollbarWidth = 0;
    if (self.options.enableHorizontalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
      self.scrollbarHeight = gridUtil.getScrollbarWidth();
    }

    if (self.options.enableVerticalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
      self.scrollbarWidth = gridUtil.getScrollbarWidth();
    }



    self.api = new GridApi(self);

    /**
     * @ngdoc function
     * @name refresh
     * @methodOf ui.grid.core.api:PublicApi
     * @description Refresh the rendered grid on screen.
     * The refresh method re-runs both the columnProcessors and the
     * rowProcessors, as well as calling refreshCanvas to update all
     * the grid sizing.  In general you should prefer to use queueGridRefresh
     * instead, which is basically a debounced version of refresh.
     *
     * If you only want to resize the grid, not regenerate all the rows
     * and columns, you should consider directly calling refreshCanvas instead.
     *
     */
    self.api.registerMethod( 'core', 'refresh', this.refresh );

    /**
     * @ngdoc function
     * @name queueGridRefresh
     * @methodOf ui.grid.core.api:PublicApi
     * @description Request a refresh of the rendered grid on screen, if multiple
     * calls to queueGridRefresh are made within a digest cycle only one will execute.
     * The refresh method re-runs both the columnProcessors and the
     * rowProcessors, as well as calling refreshCanvas to update all
     * the grid sizing.  In general you should prefer to use queueGridRefresh
     * instead, which is basically a debounced version of refresh.
     *
     */
    self.api.registerMethod( 'core', 'queueGridRefresh', this.queueGridRefresh );

    /**
     * @ngdoc function
     * @name refreshRows
     * @methodOf ui.grid.core.api:PublicApi
     * @description Runs only the rowProcessors, columns remain as they were.
     * It then calls redrawInPlace and refreshCanvas, which adjust the grid sizing.
     * @returns {promise} promise that is resolved when render completes?
     *
     */
    self.api.registerMethod( 'core', 'refreshRows', this.refreshRows );

    /**
     * @ngdoc function
     * @name queueRefresh
     * @methodOf ui.grid.core.api:PublicApi
     * @description Requests execution of refreshCanvas, if multiple requests are made
     * during a digest cycle only one will run.  RefreshCanvas updates the grid sizing.
     * @returns {promise} promise that is resolved when render completes?
     *
     */
    self.api.registerMethod( 'core', 'queueRefresh', this.queueRefresh );

    /**
     * @ngdoc function
     * @name handleWindowResize
     * @methodOf ui.grid.core.api:PublicApi
     * @description Trigger a grid resize, normally this would be picked
     * up by a watch on window size, but in some circumstances it is necessary
     * to call this manually
     * @returns {promise} promise that is resolved when render completes?
     *
     */
    self.api.registerMethod( 'core', 'handleWindowResize', this.handleWindowResize );


    /**
     * @ngdoc function
     * @name addRowHeaderColumn
     * @methodOf ui.grid.core.api:PublicApi
     * @description adds a row header column to the grid
     * @param {object} column def
     *
     */
    self.api.registerMethod( 'core', 'addRowHeaderColumn', this.addRowHeaderColumn );

    /**
     * @ngdoc function
     * @name scrollToIfNecessary
     * @methodOf ui.grid.core.api:PublicApi
     * @description Scrolls the grid to make a certain row and column combo visible,
     *   in the case that it is not completely visible on the screen already.
     * @param {GridRow} gridRow row to make visible
     * @param {GridCol} gridCol column to make visible
     * @returns {promise} a promise that is resolved when scrolling is complete
     *
     */
    self.api.registerMethod( 'core', 'scrollToIfNecessary', function(gridRow, gridCol) { return self.scrollToIfNecessary(gridRow, gridCol);} );

    /**
     * @ngdoc function
     * @name scrollTo
     * @methodOf ui.grid.core.api:PublicApi
     * @description Scroll the grid such that the specified
     * row and column is in view
     * @param {object} rowEntity gridOptions.data[] array instance to make visible
     * @param {object} colDef to make visible
     * @returns {promise} a promise that is resolved after any scrolling is finished
     */
    self.api.registerMethod( 'core', 'scrollTo', function (rowEntity, colDef) { return self.scrollTo(rowEntity, colDef);}  );

    /**
     * @ngdoc function
     * @name registerRowsProcessor
     * @methodOf ui.grid.core.api:PublicApi
     * @description
     * Register a "rows processor" function. When the rows are updated,
     * the grid calls each registered "rows processor", which has a chance
     * to alter the set of rows (sorting, etc) as long as the count is not
     * modified.
     *
     * @param {function(renderedRowsToProcess, columns )} processorFunction rows processor function, which
     * is run in the context of the grid (i.e. this for the function will be the grid), and must
     * return the updated rows list, which is passed to the next processor in the chain
     * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
     * for other people to inject rows processors at intermediate priorities.  Lower priority rowsProcessors run earlier.
     *
     * At present allRowsVisible is running at 50, sort manipulations running at 60-65, filter is running at 100,
     * sort is at 200, grouping and treeview at 400-410, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
     */
    self.api.registerMethod( 'core', 'registerRowsProcessor', this.registerRowsProcessor  );

    /**
     * @ngdoc function
     * @name registerColumnsProcessor
     * @methodOf ui.grid.core.api:PublicApi
     * @description
     * Register a "columns processor" function. When the columns are updated,
     * the grid calls each registered "columns processor", which has a chance
     * to alter the set of columns as long as the count is not
     * modified.
     *
     * @param {function(renderedColumnsToProcess, rows )} processorFunction columns processor function, which
     * is run in the context of the grid (i.e. this for the function will be the grid), and must
     * return the updated columns list, which is passed to the next processor in the chain
     * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
     * for other people to inject columns processors at intermediate priorities.  Lower priority columnsProcessors run earlier.
     *
     * At present allRowsVisible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
     */
    self.api.registerMethod( 'core', 'registerColumnsProcessor', this.registerColumnsProcessor  );



    /**
     * @ngdoc function
     * @name sortHandleNulls
     * @methodOf ui.grid.core.api:PublicApi
     * @description A null handling method that can be used when building custom sort
     * functions
     * @example
     * <pre>
     *   mySortFn = function(a, b) {
     *   var nulls = $scope.gridApi.core.sortHandleNulls(a, b);
     *   if ( nulls !== null ){
     *     return nulls;
     *   } else {
     *     // your code for sorting here
     *   };
     * </pre>
     * @param {object} a sort value a
     * @param {object} b sort value b
     * @returns {number} null if there were no nulls/undefineds, otherwise returns
     * a sort value that should be passed back from the sort function
     *
     */
    self.api.registerMethod( 'core', 'sortHandleNulls', rowSorter.handleNulls );


    /**
     * @ngdoc function
     * @name sortChanged
     * @methodOf  ui.grid.core.api:PublicApi
     * @description The sort criteria on one or more columns has
     * changed.  Provides as parameters the grid and the output of
     * getColumnSorting, which is an array of gridColumns
     * that have sorting on them, sorted in priority order.
     *
     * @param {Grid} grid the grid
     * @param {array} sortColumns an array of columns with
     * sorts on them, in priority order
     *
     * @example
     * <pre>
     *      gridApi.core.on.sortChanged( grid, sortColumns );
     * </pre>
     */
    self.api.registerEvent( 'core', 'sortChanged' );

      /**
     * @ngdoc function
     * @name columnVisibilityChanged
     * @methodOf  ui.grid.core.api:PublicApi
     * @description The visibility of a column has changed,
     * the column itself is passed out as a parameter of the event.
     *
     * @param {GridCol} column the column that changed
     *
     * @example
     * <pre>
     *      gridApi.core.on.columnVisibilityChanged( $scope, function (column) {
     *        // do something
     *      } );
     * </pre>
     */
    self.api.registerEvent( 'core', 'columnVisibilityChanged' );

    /**
     * @ngdoc method
     * @name notifyDataChange
     * @methodOf ui.grid.core.api:PublicApi
     * @description Notify the grid that a data or config change has occurred,
     * where that change isn't something the grid was otherwise noticing.  This
     * might be particularly relevant where you've changed values within the data
     * and you'd like cell classes to be re-evaluated, or changed config within
     * the columnDef and you'd like headerCellClasses to be re-evaluated.
     * @param {string} type one of the
     * uiGridConstants.dataChange values (ALL, ROW, EDIT, COLUMN), which tells
     * us which refreshes to fire.
     *
     */
    self.api.registerMethod( 'core', 'notifyDataChange', this.notifyDataChange );

    /**
     * @ngdoc method
     * @name clearAllFilters
     * @methodOf ui.grid.core.api:PublicApi
     * @description Clears all filters and optionally refreshes the visible rows.
     * @param {object} refreshRows Defaults to true.
     * @param {object} clearConditions Defaults to false.
     * @param {object} clearFlags Defaults to false.
     * @returns {promise} If `refreshRows` is true, returns a promise of the rows refreshing.
     */
    self.api.registerMethod('core', 'clearAllFilters', this.clearAllFilters);

    self.registerDataChangeCallback( self.columnRefreshCallback, [uiGridConstants.dataChange.COLUMN]);
    self.registerDataChangeCallback( self.processRowsCallback, [uiGridConstants.dataChange.EDIT]);
    self.registerDataChangeCallback( self.updateFooterHeightCallback, [uiGridConstants.dataChange.OPTIONS]);

    self.registerStyleComputation({
      priority: 10,
      func: self.getFooterStyles
    });
  };

   Grid.prototype.calcFooterHeight = function () {
     if (!this.hasFooter()) {
       return 0;
     }

     var height = 0;
     if (this.options.showGridFooter) {
       height += this.options.gridFooterHeight;
     }

     height += this.calcColumnFooterHeight();

     return height;
   };

   Grid.prototype.calcColumnFooterHeight = function () {
     var height = 0;

     if (this.options.showColumnFooter) {
       height += this.options.columnFooterHeight;
     }

     return height;
   };

   Grid.prototype.getFooterStyles = function () {
     var style = '.grid' + this.id + ' .ui-grid-footer-aggregates-row { height: ' + this.options.columnFooterHeight + 'px; }';
     style += ' .grid' + this.id + ' .ui-grid-footer-info { height: ' + this.options.gridFooterHeight + 'px; }';
     return style;
   };

  Grid.prototype.hasFooter = function () {
   return this.options.showGridFooter || this.options.showColumnFooter;
  };

  /**
   * @ngdoc function
   * @name isRTL
   * @methodOf ui.grid.class:Grid
   * @description Returns true if grid is RightToLeft
   */
  Grid.prototype.isRTL = function () {
    return this.rtl;
  };


  /**
   * @ngdoc function
   * @name registerColumnBuilder
   * @methodOf ui.grid.class:Grid
   * @description When the build creates columns from column definitions, the columnbuilders will be called to add
   * additional properties to the column.
   * @param {function(colDef, col, gridOptions)} columnBuilder function to be called
   */
  Grid.prototype.registerColumnBuilder = function registerColumnBuilder(columnBuilder) {
    this.columnBuilders.push(columnBuilder);
  };

  /**
   * @ngdoc function
   * @name buildColumnDefsFromData
   * @methodOf ui.grid.class:Grid
   * @description Populates columnDefs from the provided data
   * @param {function(colDef, col, gridOptions)} rowBuilder function to be called
   */
  Grid.prototype.buildColumnDefsFromData = function (dataRows){
    this.options.columnDefs =  gridUtil.getColumnsFromData(dataRows, this.options.excludeProperties);
  };

  /**
   * @ngdoc function
   * @name registerRowBuilder
   * @methodOf ui.grid.class:Grid
   * @description When the build creates rows from gridOptions.data, the rowBuilders will be called to add
   * additional properties to the row.
   * @param {function(row, gridOptions)} rowBuilder function to be called
   */
  Grid.prototype.registerRowBuilder = function registerRowBuilder(rowBuilder) {
    this.rowBuilders.push(rowBuilder);
  };


  /**
   * @ngdoc function
   * @name registerDataChangeCallback
   * @methodOf ui.grid.class:Grid
   * @description When a data change occurs, the data change callbacks of the specified type
   * will be called.  The rules are:
   *
   * - when the data watch fires, that is considered a ROW change (the data watch only notices
   *   added or removed rows)
   * - when the api is called to inform us of a change, the declared type of that change is used
   * - when a cell edit completes, the EDIT callbacks are triggered
   * - when the columnDef watch fires, the COLUMN callbacks are triggered
   * - when the options watch fires, the OPTIONS callbacks are triggered
   *
   * For a given event:
   * - ALL calls ROW, EDIT, COLUMN, OPTIONS and ALL callbacks
   * - ROW calls ROW and ALL callbacks
   * - EDIT calls EDIT and ALL callbacks
   * - COLUMN calls COLUMN and ALL callbacks
   * - OPTIONS calls OPTIONS and ALL callbacks
   *
   * @param {function(grid)} callback function to be called
   * @param {array} types the types of data change you want to be informed of.  Values from
   * the uiGridConstants.dataChange values ( ALL, EDIT, ROW, COLUMN, OPTIONS ).  Optional and defaults to
   * ALL
   * @returns {function} deregister function - a function that can be called to deregister this callback
   */
  Grid.prototype.registerDataChangeCallback = function registerDataChangeCallback(callback, types, _this) {
    var uid = gridUtil.nextUid();
    if ( !types ){
      types = [uiGridConstants.dataChange.ALL];
    }
    if ( !Array.isArray(types)){
      gridUtil.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: " + types );
    }
    this.dataChangeCallbacks[uid] = { callback: callback, types: types, _this:_this };

    var self = this;
    var deregisterFunction = function() {
      delete self.dataChangeCallbacks[uid];
    };
    return deregisterFunction;
  };

  /**
   * @ngdoc function
   * @name callDataChangeCallbacks
   * @methodOf ui.grid.class:Grid
   * @description Calls the callbacks based on the type of data change that
   * has occurred. Always calls the ALL callbacks, calls the ROW, EDIT, COLUMN and OPTIONS callbacks if the
   * event type is matching, or if the type is ALL.
   * @param {number} type the type of event that occurred - one of the
   * uiGridConstants.dataChange values (ALL, ROW, EDIT, COLUMN, OPTIONS)
   */
  Grid.prototype.callDataChangeCallbacks = function callDataChangeCallbacks(type, options) {
    angular.forEach( this.dataChangeCallbacks, function( callback, uid ){
      if ( callback.types.indexOf( uiGridConstants.dataChange.ALL ) !== -1 ||
           callback.types.indexOf( type ) !== -1 ||
           type === uiGridConstants.dataChange.ALL ) {
        if (callback._this) {
           callback.callback.apply(callback._this,this);
        }
        else {
          callback.callback( this );
        }
      }
    }, this);
  };

  /**
   * @ngdoc function
   * @name notifyDataChange
   * @methodOf ui.grid.class:Grid
   * @description Notifies us that a data change has occurred, used in the public
   * api for users to tell us when they've changed data or some other event that
   * our watches cannot pick up
   * @param {string} type the type of event that occurred - one of the
   * uiGridConstants.dataChange values (ALL, ROW, EDIT, COLUMN)
   */
  Grid.prototype.notifyDataChange = function notifyDataChange(type) {
    var constants = uiGridConstants.dataChange;
    if ( type === constants.ALL ||
         type === constants.COLUMN ||
         type === constants.EDIT ||
         type === constants.ROW ||
         type === constants.OPTIONS ){
      this.callDataChangeCallbacks( type );
    } else {
      gridUtil.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: " + type);
    }
  };


  /**
   * @ngdoc function
   * @name columnRefreshCallback
   * @methodOf ui.grid.class:Grid
   * @description refreshes the grid when a column refresh
   * is notified, which triggers handling of the visible flag.
   * This is called on uiGridConstants.dataChange.COLUMN, and is
   * registered as a dataChangeCallback in grid.js
   * @param {string} name column name
   */
  Grid.prototype.columnRefreshCallback = function columnRefreshCallback( grid ){
    grid.buildColumns();
    grid.queueGridRefresh();
  };


  /**
   * @ngdoc function
   * @name processRowsCallback
   * @methodOf ui.grid.class:Grid
   * @description calls the row processors, specifically
   * intended to reset the sorting when an edit is called,
   * registered as a dataChangeCallback on uiGridConstants.dataChange.EDIT
   * @param {string} name column name
   */
  Grid.prototype.processRowsCallback = function processRowsCallback( grid ){
    grid.queueGridRefresh();
  };


  /**
   * @ngdoc function
   * @name updateFooterHeightCallback
   * @methodOf ui.grid.class:Grid
   * @description recalculates the footer height,
   * registered as a dataChangeCallback on uiGridConstants.dataChange.OPTIONS
   * @param {string} name column name
   */
  Grid.prototype.updateFooterHeightCallback = function updateFooterHeightCallback( grid ){
    grid.footerHeight = grid.calcFooterHeight();
    grid.columnFooterHeight = grid.calcColumnFooterHeight();
  };


  /**
   * @ngdoc function
   * @name getColumn
   * @methodOf ui.grid.class:Grid
   * @description returns a grid column for the column name
   * @param {string} name column name
   */
  Grid.prototype.getColumn = function getColumn(name) {
    var columns = this.columns.filter(function (column) {
      return column.colDef.name === name;
    });
    return columns.length > 0 ? columns[0] : null;
  };

  /**
   * @ngdoc function
   * @name getColDef
   * @methodOf ui.grid.class:Grid
   * @description returns a grid colDef for the column name
   * @param {string} name column.field
   */
  Grid.prototype.getColDef = function getColDef(name) {
    var colDefs = this.options.columnDefs.filter(function (colDef) {
      return colDef.name === name;
    });
    return colDefs.length > 0 ? colDefs[0] : null;
  };

  /**
   * @ngdoc function
   * @name assignTypes
   * @methodOf ui.grid.class:Grid
   * @description uses the first row of data to assign colDef.type for any types not defined.
   */
  /**
   * @ngdoc property
   * @name type
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description the type of the column, used in sorting.  If not provided then the
   * grid will guess the type.  Add this only if the grid guessing is not to your
   * satisfaction.  One of:
   * - 'string'
   * - 'boolean'
   * - 'number'
   * - 'date'
   * - 'object'
   * - 'numberStr'
   * Note that if you choose date, your dates should be in a javascript date type
   *
   */
  Grid.prototype.assignTypes = function(){
    var self = this;
    self.options.columnDefs.forEach(function (colDef, index) {

      //Assign colDef type if not specified
      if (!colDef.type) {
        var col = new GridColumn(colDef, index, self);
        var firstRow = self.rows.length > 0 ? self.rows[0] : null;
        if (firstRow) {
          colDef.type = gridUtil.guessType(self.getCellValue(firstRow, col));
        }
        else {
          colDef.type = 'string';
        }
      }
    });
  };


  /**
   * @ngdoc function
   * @name isRowHeaderColumn
   * @methodOf ui.grid.class:Grid
   * @description returns true if the column is a row Header
   * @param {object} column column
   */
  Grid.prototype.isRowHeaderColumn = function isRowHeaderColumn(column) {
    return this.rowHeaderColumns.indexOf(column) !== -1;
  };

  /**
  * @ngdoc function
  * @name addRowHeaderColumn
  * @methodOf ui.grid.class:Grid
  * @description adds a row header column to the grid
  * @param {object} column def
  */
  Grid.prototype.addRowHeaderColumn = function addRowHeaderColumn(colDef) {
    var self = this;
    var rowHeaderCol = new GridColumn(colDef, gridUtil.nextUid(), self);
    rowHeaderCol.isRowHeader = true;
    if (self.isRTL()) {
      self.createRightContainer();
      rowHeaderCol.renderContainer = 'right';
    }
    else {
      self.createLeftContainer();
      rowHeaderCol.renderContainer = 'left';
    }

    // relies on the default column builder being first in array, as it is instantiated
    // as part of grid creation
    self.columnBuilders[0](colDef,rowHeaderCol,self.options)
      .then(function(){
        rowHeaderCol.enableFiltering = false;
        rowHeaderCol.enableSorting = false;
        rowHeaderCol.enableHiding = false;
        self.rowHeaderColumns.push(rowHeaderCol);
        self.buildColumns()
          .then( function() {
            self.preCompileCellTemplates();
            self.queueGridRefresh();
          });
      });
  };

  /**
   * @ngdoc function
   * @name getOnlyDataColumns
   * @methodOf ui.grid.class:Grid
   * @description returns all columns except for rowHeader columns
   */
  Grid.prototype.getOnlyDataColumns = function getOnlyDataColumns() {
    var self = this;
    var cols = [];
    self.columns.forEach(function (col) {
      if (self.rowHeaderColumns.indexOf(col) === -1) {
        cols.push(col);
      }
    });
    return cols;
  };

  /**
   * @ngdoc function
   * @name buildColumns
   * @methodOf ui.grid.class:Grid
   * @description creates GridColumn objects from the columnDefinition.  Calls each registered
   * columnBuilder to further process the column
   * @param {object} options  An object contains options to use when building columns
   *
   * * **orderByColumnDefs**: defaults to **false**. When true, `buildColumns` will reorder existing columns according to the order within the column definitions.
   *
   * @returns {Promise} a promise to load any needed column resources
   */
  Grid.prototype.buildColumns = function buildColumns(opts) {
    var options = {
      orderByColumnDefs: false
    };

    angular.extend(options, opts);

    // gridUtil.logDebug('buildColumns');
    var self = this;
    var builderPromises = [];
    var headerOffset = self.rowHeaderColumns.length;
    var i;

    // Remove any columns for which a columnDef cannot be found
    // Deliberately don't use forEach, as it doesn't like splice being called in the middle
    // Also don't cache columns.length, as it will change during this operation
    for (i = 0; i < self.columns.length; i++){
      if (!self.getColDef(self.columns[i].name)) {
        self.columns.splice(i, 1);
        i--;
      }
    }

    //add row header columns to the grid columns array _after_ columns without columnDefs have been removed
    self.rowHeaderColumns.forEach(function (rowHeaderColumn) {
      self.columns.unshift(rowHeaderColumn);
    });


    // look at each column def, and update column properties to match.  If the column def
    // doesn't have a column, then splice in a new gridCol
    self.options.columnDefs.forEach(function (colDef, index) {
      self.preprocessColDef(colDef);
      var col = self.getColumn(colDef.name);

      if (!col) {
        col = new GridColumn(colDef, gridUtil.nextUid(), self);
        self.columns.splice(index + headerOffset, 0, col);
      }
      else {
        // tell updateColumnDef that the column was pre-existing
        col.updateColumnDef(colDef, false);
      }

      self.columnBuilders.forEach(function (builder) {
        builderPromises.push(builder.call(self, colDef, col, self.options));
      });
    });

    /*** Reorder columns if necessary ***/
    if (!!options.orderByColumnDefs) {
      // Create a shallow copy of the columns as a cache
      var columnCache = self.columns.slice(0);

      // We need to allow for the "row headers" when mapping from the column defs array to the columns array
      //   If we have a row header in columns[0] and don't account for it   we'll overwrite it with the column in columnDefs[0]

      // Go through all the column defs, use the shorter of columns length and colDefs.length because if a user has given two columns the same name then
      // columns will be shorter than columnDefs.  In this situation we'll avoid an error, but the user will still get an unexpected result
      var len = Math.min(self.options.columnDefs.length, self.columns.length);
      for (i = 0; i < len; i++) {
        // If the column at this index has a different name than the column at the same index in the column defs...
        if (self.columns[i + headerOffset].name !== self.options.columnDefs[i].name) {
          // Replace the one in the cache with the appropriate column
          columnCache[i + headerOffset] = self.getColumn(self.options.columnDefs[i].name);
        }
        else {
          // Otherwise just copy over the one from the initial columns
          columnCache[i + headerOffset] = self.columns[i + headerOffset];
        }
      }

      // Empty out the columns array, non-destructively
      self.columns.length = 0;

      // And splice in the updated, ordered columns from the cache
      Array.prototype.splice.apply(self.columns, [0, 0].concat(columnCache));
    }

    return $q.all(builderPromises).then(function(){
      if (self.rows.length > 0){
        self.assignTypes();
      }
    });
  };

/**
 * @ngdoc function
 * @name preCompileCellTemplates
 * @methodOf ui.grid.class:Grid
 * @description precompiles all cell templates
 */
  Grid.prototype.preCompileCellTemplates = function() {
    var self = this;

    var preCompileTemplate = function( col ) {
      var html = col.cellTemplate.replace(uiGridConstants.MODEL_COL_FIELD, self.getQualifiedColField(col));
      html = html.replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

      var compiledElementFn = $compile(html);
      col.compiledElementFn = compiledElementFn;

      if (col.compiledElementFnDefer) {
        col.compiledElementFnDefer.resolve(col.compiledElementFn);
      }
    };

    this.columns.forEach(function (col) {
      if ( col.cellTemplate ){
        preCompileTemplate( col );
      } else if ( col.cellTemplatePromise ){
        col.cellTemplatePromise.then( function() {
          preCompileTemplate( col );
        });
      }
    });
  };

  /**
   * @ngdoc function
   * @name getGridQualifiedColField
   * @methodOf ui.grid.class:Grid
   * @description Returns the $parse-able accessor for a column within its $scope
   * @param {GridColumn} col col object
   */
  Grid.prototype.getQualifiedColField = function (col) {
    return 'row.entity.' + gridUtil.preEval(col.field);
  };

  /**
   * @ngdoc function
   * @name createLeftContainer
   * @methodOf ui.grid.class:Grid
   * @description creates the left render container if it doesn't already exist
   */
  Grid.prototype.createLeftContainer = function() {
    if (!this.hasLeftContainer()) {
      this.renderContainers.left = new GridRenderContainer('left', this, { disableColumnOffset: true });
    }
  };

  /**
   * @ngdoc function
   * @name createRightContainer
   * @methodOf ui.grid.class:Grid
   * @description creates the right render container if it doesn't already exist
   */
  Grid.prototype.createRightContainer = function() {
    if (!this.hasRightContainer()) {
      this.renderContainers.right = new GridRenderContainer('right', this, { disableColumnOffset: true });
    }
  };

  /**
   * @ngdoc function
   * @name hasLeftContainer
   * @methodOf ui.grid.class:Grid
   * @description returns true if leftContainer exists
   */
  Grid.prototype.hasLeftContainer = function() {
    return this.renderContainers.left !== undefined;
  };

  /**
   * @ngdoc function
   * @name hasLeftContainer
   * @methodOf ui.grid.class:Grid
   * @description returns true if rightContainer exists
   */
  Grid.prototype.hasRightContainer = function() {
    return this.renderContainers.right !== undefined;
  };


      /**
   * undocumented function
   * @name preprocessColDef
   * @methodOf ui.grid.class:Grid
   * @description defaults the name property from field to maintain backwards compatibility with 2.x
   * validates that name or field is present
   */
  Grid.prototype.preprocessColDef = function preprocessColDef(colDef) {
    var self = this;

    if (!colDef.field && !colDef.name) {
      throw new Error('colDef.name or colDef.field property is required');
    }

    //maintain backwards compatibility with 2.x
    //field was required in 2.x.  now name is required
    if (colDef.name === undefined && colDef.field !== undefined) {
      // See if the column name already exists:
      var newName = colDef.field,
        counter = 2;
      while (self.getColumn(newName)) {
        newName = colDef.field + counter.toString();
        counter++;
      }
      colDef.name = newName;
    }
  };

  // Return a list of items that exist in the `n` array but not the `o` array. Uses optional property accessors passed as third & fourth parameters
  Grid.prototype.newInN = function newInN(o, n, oAccessor, nAccessor) {
    var self = this;

    var t = [];
    for (var i = 0; i < n.length; i++) {
      var nV = nAccessor ? n[i][nAccessor] : n[i];

      var found = false;
      for (var j = 0; j < o.length; j++) {
        var oV = oAccessor ? o[j][oAccessor] : o[j];
        if (self.options.rowEquality(nV, oV)) {
          found = true;
          break;
        }
      }
      if (!found) {
        t.push(nV);
      }
    }

    return t;
  };

  /**
   * @ngdoc function
   * @name getRow
   * @methodOf ui.grid.class:Grid
   * @description returns the GridRow that contains the rowEntity
   * @param {object} rowEntity the gridOptions.data array element instance
   * @param {array} rows [optional] the rows to look in - if not provided then
   * looks in grid.rows
   */
  Grid.prototype.getRow = function getRow(rowEntity, lookInRows) {
    var self = this;

    lookInRows = typeof(lookInRows) === 'undefined' ? self.rows : lookInRows;

    var rows = lookInRows.filter(function (row) {
      return self.options.rowEquality(row.entity, rowEntity);
    });
    return rows.length > 0 ? rows[0] : null;
  };


  /**
   * @ngdoc function
   * @name modifyRows
   * @methodOf ui.grid.class:Grid
   * @description creates or removes GridRow objects from the newRawData array.  Calls each registered
   * rowBuilder to further process the row
   *
   * This method aims to achieve three things:
   * 1. the resulting rows array is in the same order as the newRawData, we'll call
   * rowsProcessors immediately after to sort the data anyway
   * 2. if we have row hashing available, we try to use the rowHash to find the row
   * 3. no memory leaks - rows that are no longer in newRawData need to be garbage collected
   *
   * The basic logic flow makes use of the newRawData, oldRows and oldHash, and creates
   * the newRows and newHash
   *
   * ```
   * newRawData.forEach newEntity
   *   if (hashing enabled)
   *     check oldHash for newEntity
   *   else
   *     look for old row directly in oldRows
   *   if !oldRowFound     // must be a new row
   *     create newRow
   *   append to the newRows and add to newHash
   *   run the processors
   *
   * Rows are identified using the hashKey if configured.  If not configured, then rows
   * are identified using the gridOptions.rowEquality function
   */
  Grid.prototype.modifyRows = function modifyRows(newRawData) {
    var self = this;
    var oldRows = self.rows.slice(0);
    var oldRowHash = self.rowHashMap || self.createRowHashMap();
    self.rowHashMap = self.createRowHashMap();
    self.rows.length = 0;

    newRawData.forEach( function( newEntity, i ) {
      var newRow;
      if ( self.options.enableRowHashing ){
        // if hashing is enabled, then this row will be in the hash if we already know about it
        newRow = oldRowHash.get( newEntity );
      } else {
        // otherwise, manually search the oldRows to see if we can find this row
        newRow = self.getRow(newEntity, oldRows);
      }

      // if we didn't find the row, it must be new, so create it
      if ( !newRow ){
        newRow = self.processRowBuilders(new GridRow(newEntity, i, self));
      }

      self.rows.push( newRow );
      self.rowHashMap.put( newEntity, newRow );
    });

    self.assignTypes();

    var p1 = $q.when(self.processRowsProcessors(self.rows))
      .then(function (renderableRows) {
        return self.setVisibleRows(renderableRows);
      });

    var p2 = $q.when(self.processColumnsProcessors(self.columns))
      .then(function (renderableColumns) {
        return self.setVisibleColumns(renderableColumns);
      });

    return $q.all([p1, p2]);
  };


  /**
   * Private Undocumented Method
   * @name addRows
   * @methodOf ui.grid.class:Grid
   * @description adds the newRawData array of rows to the grid and calls all registered
   * rowBuilders. this keyword will reference the grid
   */
  Grid.prototype.addRows = function addRows(newRawData) {
    var self = this;

    var existingRowCount = self.rows.length;
    for (var i = 0; i < newRawData.length; i++) {
      var newRow = self.processRowBuilders(new GridRow(newRawData[i], i + existingRowCount, self));

      if (self.options.enableRowHashing) {
        var found = self.rowHashMap.get(newRow.entity);
        if (found) {
          found.row = newRow;
        }
      }

      self.rows.push(newRow);
    }
  };

  /**
   * @ngdoc function
   * @name processRowBuilders
   * @methodOf ui.grid.class:Grid
   * @description processes all RowBuilders for the gridRow
   * @param {GridRow} gridRow reference to gridRow
   * @returns {GridRow} the gridRow with all additional behavior added
   */
  Grid.prototype.processRowBuilders = function processRowBuilders(gridRow) {
    var self = this;

    self.rowBuilders.forEach(function (builder) {
      builder.call(self, gridRow, self.options);
    });

    return gridRow;
  };

  /**
   * @ngdoc function
   * @name registerStyleComputation
   * @methodOf ui.grid.class:Grid
   * @description registered a styleComputation function
   *
   * If the function returns a value it will be appended into the grid's `<style>` block
   * @param {function($scope)} styleComputation function
   */
  Grid.prototype.registerStyleComputation = function registerStyleComputation(styleComputationInfo) {
    this.styleComputations.push(styleComputationInfo);
  };


  // NOTE (c0bra): We already have rowBuilders. I think these do exactly the same thing...
  // Grid.prototype.registerRowFilter = function(filter) {
  //   // TODO(c0bra): validate filter?

  //   this.rowFilters.push(filter);
  // };

  // Grid.prototype.removeRowFilter = function(filter) {
  //   var idx = this.rowFilters.indexOf(filter);

  //   if (typeof(idx) !== 'undefined' && idx !== undefined) {
  //     this.rowFilters.slice(idx, 1);
  //   }
  // };

  // Grid.prototype.processRowFilters = function(rows) {
  //   var self = this;
  //   self.rowFilters.forEach(function (filter) {
  //     filter.call(self, rows);
  //   });
  // };


  /**
   * @ngdoc function
   * @name registerRowsProcessor
   * @methodOf ui.grid.class:Grid
   * @description
   *
   * Register a "rows processor" function. When the rows are updated,
   * the grid calls each registered "rows processor", which has a chance
   * to alter the set of rows (sorting, etc) as long as the count is not
   * modified.
   *
   * @param {function(renderedRowsToProcess, columns )} processorFunction rows processor function, which
   * is run in the context of the grid (i.e. this for the function will be the grid), and must
   * return the updated rows list, which is passed to the next processor in the chain
   * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
   * for other people to inject rows processors at intermediate priorities.  Lower priority rowsProcessors run earlier.
   *
   * At present all rows visible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
   *
   */
  Grid.prototype.registerRowsProcessor = function registerRowsProcessor(processor, priority) {
    if (!angular.isFunction(processor)) {
      throw 'Attempt to register non-function rows processor: ' + processor;
    }

    this.rowsProcessors.push({processor: processor, priority: priority});
    this.rowsProcessors.sort(function sortByPriority( a, b ){
      return a.priority - b.priority;
    });
  };

  /**
   * @ngdoc function
   * @name removeRowsProcessor
   * @methodOf ui.grid.class:Grid
   * @param {function(renderableRows)} rows processor function
   * @description Remove a registered rows processor
   */
  Grid.prototype.removeRowsProcessor = function removeRowsProcessor(processor) {
    var idx = -1;
    this.rowsProcessors.forEach(function(rowsProcessor, index){
      if ( rowsProcessor.processor === processor ){
        idx = index;
      }
    });

    if ( idx !== -1 ) {
      this.rowsProcessors.splice(idx, 1);
    }
  };

  /**
   * Private Undocumented Method
   * @name processRowsProcessors
   * @methodOf ui.grid.class:Grid
   * @param {Array[GridRow]} The array of "renderable" rows
   * @param {Array[GridColumn]} The array of columns
   * @description Run all the registered rows processors on the array of renderable rows
   */
  Grid.prototype.processRowsProcessors = function processRowsProcessors(renderableRows) {
    var self = this;

    // Create a shallow copy of the rows so that we can safely sort them without altering the original grid.rows sort order
    var myRenderableRows = renderableRows.slice(0);

    // Return myRenderableRows with no processing if we have no rows processors
    if (self.rowsProcessors.length === 0) {
      return $q.when(myRenderableRows);
    }

    // Counter for iterating through rows processors
    var i = 0;

    // Promise for when we're done with all the processors
    var finished = $q.defer();

    // This function will call the processor in self.rowsProcessors at index 'i', and then
    //   when done will call the next processor in the list, using the output from the processor
    //   at i as the argument for 'renderedRowsToProcess' on the next iteration.
    //
    //   If we're at the end of the list of processors, we resolve our 'finished' callback with
    //   the result.
    function startProcessor(i, renderedRowsToProcess) {
      // Get the processor at 'i'
      var processor = self.rowsProcessors[i].processor;

      // Call the processor, passing in the rows to process and the current columns
      //   (note: it's wrapped in $q.when() in case the processor does not return a promise)
      return $q.when( processor.call(self, renderedRowsToProcess, self.columns) )
        .then(function handleProcessedRows(processedRows) {
          // Check for errors
          if (!processedRows) {
            throw "Processor at index " + i + " did not return a set of renderable rows";
          }

          if (!angular.isArray(processedRows)) {
            throw "Processor at index " + i + " did not return an array";
          }

          // Processor is done, increment the counter
          i++;

          // If we're not done with the processors, call the next one
          if (i <= self.rowsProcessors.length - 1) {
            return startProcessor(i, processedRows);
          }
          // We're done! Resolve the 'finished' promise
          else {
            finished.resolve(processedRows);
          }
        });
    }

    // Start on the first processor
    startProcessor(0, myRenderableRows);

    return finished.promise;
  };

  Grid.prototype.setVisibleRows = function setVisibleRows(rows) {
    var self = this;

    // Reset all the render container row caches
    for (var i in self.renderContainers) {
      var container = self.renderContainers[i];

      container.canvasHeightShouldUpdate = true;

      if ( typeof(container.visibleRowCache) === 'undefined' ){
        container.visibleRowCache = [];
      } else {
        container.visibleRowCache.length = 0;
      }
    }

    // rows.forEach(function (row) {
    for (var ri = 0; ri < rows.length; ri++) {
      var row = rows[ri];

      var targetContainer = (typeof(row.renderContainer) !== 'undefined' && row.renderContainer) ? row.renderContainer : 'body';

      // If the row is visible
      if (row.visible) {
        self.renderContainers[targetContainer].visibleRowCache.push(row);
      }
    }
    self.api.core.raise.rowsRendered(this.api);
  };

  /**
   * @ngdoc function
   * @name registerColumnsProcessor
   * @methodOf ui.grid.class:Grid
   * @param {function(renderedColumnsToProcess, rows)} columnProcessor column processor function, which
   * is run in the context of the grid (i.e. this for the function will be the grid), and
   * which must return an updated renderedColumnsToProcess which can be passed to the next processor
   * in the chain
   * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
   * for other people to inject columns processors at intermediate priorities.  Lower priority columnsProcessors run earlier.
   *
   * At present all rows visible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
   * @description

     Register a "columns processor" function. When the columns are updated,
     the grid calls each registered "columns processor", which has a chance
     to alter the set of columns, as long as the count is not modified.
   */
  Grid.prototype.registerColumnsProcessor = function registerColumnsProcessor(processor, priority) {
    if (!angular.isFunction(processor)) {
      throw 'Attempt to register non-function rows processor: ' + processor;
    }

    this.columnsProcessors.push({processor: processor, priority: priority});
    this.columnsProcessors.sort(function sortByPriority( a, b ){
      return a.priority - b.priority;
    });
  };

  Grid.prototype.removeColumnsProcessor = function removeColumnsProcessor(processor) {
    var idx = this.columnsProcessors.indexOf(processor);

    if (typeof(idx) !== 'undefined' && idx !== undefined) {
      this.columnsProcessors.splice(idx, 1);
    }
  };

  Grid.prototype.processColumnsProcessors = function processColumnsProcessors(renderableColumns) {
    var self = this;

    // Create a shallow copy of the rows so that we can safely sort them without altering the original grid.rows sort order
    var myRenderableColumns = renderableColumns.slice(0);

    // Return myRenderableRows with no processing if we have no rows processors
    if (self.columnsProcessors.length === 0) {
      return $q.when(myRenderableColumns);
    }

    // Counter for iterating through rows processors
    var i = 0;

    // Promise for when we're done with all the processors
    var finished = $q.defer();

    // This function will call the processor in self.rowsProcessors at index 'i', and then
    //   when done will call the next processor in the list, using the output from the processor
    //   at i as the argument for 'renderedRowsToProcess' on the next iteration.
    //
    //   If we're at the end of the list of processors, we resolve our 'finished' callback with
    //   the result.
    function startProcessor(i, renderedColumnsToProcess) {
      // Get the processor at 'i'
      var processor = self.columnsProcessors[i].processor;

      // Call the processor, passing in the rows to process and the current columns
      //   (note: it's wrapped in $q.when() in case the processor does not return a promise)
      return $q.when( processor.call(self, renderedColumnsToProcess, self.rows) )
        .then(function handleProcessedRows(processedColumns) {
          // Check for errors
          if (!processedColumns) {
            throw "Processor at index " + i + " did not return a set of renderable rows";
          }

          if (!angular.isArray(processedColumns)) {
            throw "Processor at index " + i + " did not return an array";
          }

          // Processor is done, increment the counter
          i++;

          // If we're not done with the processors, call the next one
          if (i <= self.columnsProcessors.length - 1) {
            return startProcessor(i, myRenderableColumns);
          }
          // We're done! Resolve the 'finished' promise
          else {
            finished.resolve(myRenderableColumns);
          }
        });
    }

    // Start on the first processor
    startProcessor(0, myRenderableColumns);

    return finished.promise;
  };

  Grid.prototype.setVisibleColumns = function setVisibleColumns(columns) {
    // gridUtil.logDebug('setVisibleColumns');

    var self = this;

    // Reset all the render container row caches
    for (var i in self.renderContainers) {
      var container = self.renderContainers[i];

      container.visibleColumnCache.length = 0;
    }

    for (var ci = 0; ci < columns.length; ci++) {
      var column = columns[ci];

      // If the column is visible
      if (column.visible) {
        // If the column has a container specified
        if (typeof(column.renderContainer) !== 'undefined' && column.renderContainer) {
          self.renderContainers[column.renderContainer].visibleColumnCache.push(column);
        }
        // If not, put it into the body container
        else {
          self.renderContainers.body.visibleColumnCache.push(column);
        }
      }
    }
  };

  /**
   * @ngdoc function
   * @name handleWindowResize
   * @methodOf ui.grid.class:Grid
   * @description Triggered when the browser window resizes; automatically resizes the grid
   */
  Grid.prototype.handleWindowResize = function handleWindowResize($event) {
    var self = this;

    self.gridWidth = gridUtil.elementWidth(self.element);
    self.gridHeight = gridUtil.elementHeight(self.element);

    self.queueRefresh();
  };

  /**
   * @ngdoc function
   * @name queueRefresh
   * @methodOf ui.grid.class:Grid
   * @description queues a grid refreshCanvas, a way of debouncing all the refreshes we might otherwise issue
   */
  Grid.prototype.queueRefresh = function queueRefresh() {
    var self = this;

    if (self.refreshCanceller) {
      $timeout.cancel(self.refreshCanceller);
    }

    self.refreshCanceller = $timeout(function () {
      self.refreshCanvas(true);
    });

    self.refreshCanceller.then(function () {
      self.refreshCanceller = null;
    });

    return self.refreshCanceller;
  };


  /**
   * @ngdoc function
   * @name queueGridRefresh
   * @methodOf ui.grid.class:Grid
   * @description queues a grid refresh, a way of debouncing all the refreshes we might otherwise issue
   */
  Grid.prototype.queueGridRefresh = function queueGridRefresh() {
    var self = this;

    if (self.gridRefreshCanceller) {
      $timeout.cancel(self.gridRefreshCanceller);
    }

    self.gridRefreshCanceller = $timeout(function () {
      self.refresh(true);
    });

    self.gridRefreshCanceller.then(function () {
      self.gridRefreshCanceller = null;
    });

    return self.gridRefreshCanceller;
  };


  /**
   * @ngdoc function
   * @name updateCanvasHeight
   * @methodOf ui.grid.class:Grid
   * @description flags all render containers to update their canvas height
   */
  Grid.prototype.updateCanvasHeight = function updateCanvasHeight() {
    var self = this;

    for (var containerId in self.renderContainers) {
      if (self.renderContainers.hasOwnProperty(containerId)) {
        var container = self.renderContainers[containerId];
        container.canvasHeightShouldUpdate = true;
      }
    }
  };

  /**
   * @ngdoc function
   * @name buildStyles
   * @methodOf ui.grid.class:Grid
   * @description calls each styleComputation function
   */
  // TODO: this used to take $scope, but couldn't see that it was used
  Grid.prototype.buildStyles = function buildStyles() {
    // gridUtil.logDebug('buildStyles');

    var self = this;

    self.customStyles = '';

    self.styleComputations
      .sort(function(a, b) {
        if (a.priority === null) { return 1; }
        if (b.priority === null) { return -1; }
        if (a.priority === null && b.priority === null) { return 0; }
        return a.priority - b.priority;
      })
      .forEach(function (compInfo) {
        // this used to provide $scope as a second parameter, but I couldn't find any
        // style builders that used it, so removed it as part of moving to grid from controller
        var ret = compInfo.func.call(self);

        if (angular.isString(ret)) {
          self.customStyles += '\n' + ret;
        }
      });
  };


  Grid.prototype.minColumnsToRender = function minColumnsToRender() {
    var self = this;
    var viewport = this.getViewportWidth();

    var min = 0;
    var totalWidth = 0;
    self.columns.forEach(function(col, i) {
      if (totalWidth < viewport) {
        totalWidth += col.drawnWidth;
        min++;
      }
      else {
        var currWidth = 0;
        for (var j = i; j >= i - min; j--) {
          currWidth += self.columns[j].drawnWidth;
        }
        if (currWidth < viewport) {
          min++;
        }
      }
    });

    return min;
  };

  Grid.prototype.getBodyHeight = function getBodyHeight() {
    // Start with the viewportHeight
    var bodyHeight = this.getViewportHeight();

    // Add the horizontal scrollbar height if there is one
    //if (typeof(this.horizontalScrollbarHeight) !== 'undefined' && this.horizontalScrollbarHeight !== undefined && this.horizontalScrollbarHeight > 0) {
    //  bodyHeight = bodyHeight + this.horizontalScrollbarHeight;
    //}

    return bodyHeight;
  };

  // NOTE: viewport drawable height is the height of the grid minus the header row height (including any border)
  // TODO(c0bra): account for footer height
  Grid.prototype.getViewportHeight = function getViewportHeight() {
    var self = this;

    var viewPortHeight = this.gridHeight - this.headerHeight - this.footerHeight;

    // Account for native horizontal scrollbar, if present
    //if (typeof(this.horizontalScrollbarHeight) !== 'undefined' && this.horizontalScrollbarHeight !== undefined && this.horizontalScrollbarHeight > 0) {
    //  viewPortHeight = viewPortHeight - this.horizontalScrollbarHeight;
    //}

    var adjustment = self.getViewportAdjustment();

    viewPortHeight = viewPortHeight + adjustment.height;

    //gridUtil.logDebug('viewPortHeight', viewPortHeight);

    return viewPortHeight;
  };

  Grid.prototype.getViewportWidth = function getViewportWidth() {
    var self = this;

    var viewPortWidth = this.gridWidth;

    //if (typeof(this.verticalScrollbarWidth) !== 'undefined' && this.verticalScrollbarWidth !== undefined && this.verticalScrollbarWidth > 0) {
    //  viewPortWidth = viewPortWidth - this.verticalScrollbarWidth;
    //}

    var adjustment = self.getViewportAdjustment();

    viewPortWidth = viewPortWidth + adjustment.width;

    //gridUtil.logDebug('getviewPortWidth', viewPortWidth);

    return viewPortWidth;
  };

  Grid.prototype.getHeaderViewportWidth = function getHeaderViewportWidth() {
    var viewPortWidth = this.getViewportWidth();

    //if (typeof(this.verticalScrollbarWidth) !== 'undefined' && this.verticalScrollbarWidth !== undefined && this.verticalScrollbarWidth > 0) {
    //  viewPortWidth = viewPortWidth + this.verticalScrollbarWidth;
    //}

    return viewPortWidth;
  };

  Grid.prototype.addVerticalScrollSync = function (containerId, callBackFn) {
    this.verticalScrollSyncCallBackFns[containerId] = callBackFn;
  };

  Grid.prototype.addHorizontalScrollSync = function (containerId, callBackFn) {
    this.horizontalScrollSyncCallBackFns[containerId] = callBackFn;
  };

/**
 * Scroll needed containers by calling their ScrollSyncs
 * @param sourceContainerId the containerId that has already set it's top/left.
 *         can be empty string which means all containers need to set top/left
 * @param scrollEvent
 */
  Grid.prototype.scrollContainers = function (sourceContainerId, scrollEvent) {

    if (scrollEvent.y) {
      //default for no container Id (ex. mousewheel means that all containers must set scrollTop/Left)
      var verts = ['body','left', 'right'];

      this.flagScrollingVertically(scrollEvent);

      if (sourceContainerId === 'body') {
        verts = ['left', 'right'];
      }
      else if (sourceContainerId === 'left') {
        verts = ['body', 'right'];
      }
      else if (sourceContainerId === 'right') {
        verts = ['body', 'left'];
      }

      for (var i = 0; i < verts.length; i++) {
        var id = verts[i];
        if (this.verticalScrollSyncCallBackFns[id]) {
          this.verticalScrollSyncCallBackFns[id](scrollEvent);
        }
      }

    }

    if (scrollEvent.x) {
      //default for no container Id (ex. mousewheel means that all containers must set scrollTop/Left)
      var horizs = ['body','bodyheader', 'bodyfooter'];

      this.flagScrollingHorizontally(scrollEvent);
      if (sourceContainerId === 'body') {
        horizs = ['bodyheader', 'bodyfooter'];
      }

      for (var j = 0; j < horizs.length; j++) {
        var idh = horizs[j];
        if (this.horizontalScrollSyncCallBackFns[idh]) {
          this.horizontalScrollSyncCallBackFns[idh](scrollEvent);
        }
      }

    }

  };

  Grid.prototype.registerViewportAdjuster = function registerViewportAdjuster(func) {
    this.viewportAdjusters.push(func);
  };

  Grid.prototype.removeViewportAdjuster = function registerViewportAdjuster(func) {
    var idx = this.viewportAdjusters.indexOf(func);

    if (typeof(idx) !== 'undefined' && idx !== undefined) {
      this.viewportAdjusters.splice(idx, 1);
    }
  };

  Grid.prototype.getViewportAdjustment = function getViewportAdjustment() {
    var self = this;

    var adjustment = { height: 0, width: 0 };

    self.viewportAdjusters.forEach(function (func) {
      adjustment = func.call(this, adjustment);
    });

    return adjustment;
  };

  Grid.prototype.getVisibleRowCount = function getVisibleRowCount() {
    // var count = 0;

    // this.rows.forEach(function (row) {
    //   if (row.visible) {
    //     count++;
    //   }
    // });

    // return this.visibleRowCache.length;
    return this.renderContainers.body.visibleRowCache.length;
  };

   Grid.prototype.getVisibleRows = function getVisibleRows() {
    return this.renderContainers.body.visibleRowCache;
   };

  Grid.prototype.getVisibleColumnCount = function getVisibleColumnCount() {
    // var count = 0;

    // this.rows.forEach(function (row) {
    //   if (row.visible) {
    //     count++;
    //   }
    // });

    // return this.visibleRowCache.length;
    return this.renderContainers.body.visibleColumnCache.length;
  };


  Grid.prototype.searchRows = function searchRows(renderableRows) {
    return rowSearcher.search(this, renderableRows, this.columns);
  };

  Grid.prototype.sortByColumn = function sortByColumn(renderableRows) {
    return rowSorter.sort(this, renderableRows, this.columns);
  };

  /**
   * @ngdoc function
   * @name getCellValue
   * @methodOf ui.grid.class:Grid
   * @description Gets the value of a cell for a particular row and column
   * @param {GridRow} row Row to access
   * @param {GridColumn} col Column to access
   */
  Grid.prototype.getCellValue = function getCellValue(row, col){
    if ( typeof(row.entity[ '$$' + col.uid ]) !== 'undefined' ) {
      return row.entity[ '$$' + col.uid].rendered;
    } else if (this.options.flatEntityAccess && typeof(col.field) !== 'undefined' ){
      return row.entity[col.field];
    } else {
      if (!col.cellValueGetterCache) {
        col.cellValueGetterCache = $parse(row.getEntityQualifiedColField(col));
      }

      return col.cellValueGetterCache(row);
    }
  };

  /**
   * @ngdoc function
   * @name getCellDisplayValue
   * @methodOf ui.grid.class:Grid
   * @description Gets the displayed value of a cell after applying any the `cellFilter`
   * @param {GridRow} row Row to access
   * @param {GridColumn} col Column to access
   */
  Grid.prototype.getCellDisplayValue = function getCellDisplayValue(row, col) {
    if ( !col.cellDisplayGetterCache ) {
      var custom_filter = col.cellFilter ? " | " + col.cellFilter : "";

      if (typeof(row.entity['$$' + col.uid]) !== 'undefined') {
        col.cellDisplayGetterCache = $parse(row.entity['$$' + col.uid].rendered + custom_filter);
      } else if (this.options.flatEntityAccess && typeof(col.field) !== 'undefined') {
        col.cellDisplayGetterCache = $parse(row.entity[col.field] + custom_filter);
      } else {
        col.cellDisplayGetterCache = $parse(row.getEntityQualifiedColField(col) + custom_filter);
      }
    }

    return col.cellDisplayGetterCache(row);
  };


  Grid.prototype.getNextColumnSortPriority = function getNextColumnSortPriority() {
    var self = this,
        p = 0;

    self.columns.forEach(function (col) {
      if (col.sort && col.sort.priority && col.sort.priority > p) {
        p = col.sort.priority;
      }
    });

    return p + 1;
  };

  /**
   * @ngdoc function
   * @name resetColumnSorting
   * @methodOf ui.grid.class:Grid
   * @description Return the columns that the grid is currently being sorted by
   * @param {GridColumn} [excludedColumn] Optional GridColumn to exclude from having its sorting reset
   */
  Grid.prototype.resetColumnSorting = function resetColumnSorting(excludeCol) {
    var self = this;

    self.columns.forEach(function (col) {
      if (col !== excludeCol && !col.suppressRemoveSort) {
        col.sort = {};
      }
    });
  };

  /**
   * @ngdoc function
   * @name getColumnSorting
   * @methodOf ui.grid.class:Grid
   * @description Return the columns that the grid is currently being sorted by
   * @returns {Array[GridColumn]} An array of GridColumn objects
   */
  Grid.prototype.getColumnSorting = function getColumnSorting() {
    var self = this;

    var sortedCols = [], myCols;

    // Iterate through all the columns, sorted by priority
    // Make local copy of column list, because sorting is in-place and we do not want to
    // change the original sequence of columns
    myCols = self.columns.slice(0);
    myCols.sort(rowSorter.prioritySort).forEach(function (col) {
      if (col.sort && typeof(col.sort.direction) !== 'undefined' && col.sort.direction && (col.sort.direction === uiGridConstants.ASC || col.sort.direction === uiGridConstants.DESC)) {
        sortedCols.push(col);
      }
    });

    return sortedCols;
  };

  /**
   * @ngdoc function
   * @name sortColumn
   * @methodOf ui.grid.class:Grid
   * @description Set the sorting on a given column, optionally resetting any existing sorting on the Grid.
   * Emits the sortChanged event whenever the sort criteria are changed.
   * @param {GridColumn} column Column to set the sorting on
   * @param {uiGridConstants.ASC|uiGridConstants.DESC} [direction] Direction to sort by, either descending or ascending.
   *   If not provided, the column will iterate through the sort directions: ascending, descending, unsorted.
   * @param {boolean} [add] Add this column to the sorting. If not provided or set to `false`, the Grid will reset any existing sorting and sort
   *   by this column only
   * @returns {Promise} A resolved promise that supplies the column.
   */

  Grid.prototype.sortColumn = function sortColumn(column, directionOrAdd, add) {
    var self = this,
        direction = null;

    if (typeof(column) === 'undefined' || !column) {
      throw new Error('No column parameter provided');
    }

    // Second argument can either be a direction or whether to add this column to the existing sort.
    //   If it's a boolean, it's an add, otherwise, it's a direction
    if (typeof(directionOrAdd) === 'boolean') {
      add = directionOrAdd;
    }
    else {
      direction = directionOrAdd;
    }

    if (!add) {
      self.resetColumnSorting(column);
      column.sort.priority = 0;
      // Get the actual priority since there may be columns which have suppressRemoveSort set
      column.sort.priority = self.getNextColumnSortPriority();
    }
    else if (!column.sort.priority){
      column.sort.priority = self.getNextColumnSortPriority();
    }

    if (!direction) {
      // Figure out the sort direction
      if (column.sort.direction && column.sort.direction === uiGridConstants.ASC) {
        column.sort.direction = uiGridConstants.DESC;
      }
      else if (column.sort.direction && column.sort.direction === uiGridConstants.DESC) {
        if ( column.colDef && column.suppressRemoveSort ){
          column.sort.direction = uiGridConstants.ASC;
        } else {
          column.sort = {};
        }
      }
      else {
        column.sort.direction = uiGridConstants.ASC;
      }
    }
    else {
      column.sort.direction = direction;
    }

    self.api.core.raise.sortChanged( self, self.getColumnSorting() );

    return $q.when(column);
  };

  /**
   * communicate to outside world that we are done with initial rendering
   */
  Grid.prototype.renderingComplete = function(){
    if (angular.isFunction(this.options.onRegisterApi)) {
      this.options.onRegisterApi(this.api);
    }
    this.api.core.raise.renderingComplete( this.api );
  };

  Grid.prototype.createRowHashMap = function createRowHashMap() {
    var self = this;

    var hashMap = new RowHashMap();
    hashMap.grid = self;

    return hashMap;
  };


  /**
   * @ngdoc function
   * @name refresh
   * @methodOf ui.grid.class:Grid
   * @description Refresh the rendered grid on screen.
   * @param {boolean} [rowsAltered] Optional flag for refreshing when the number of rows has changed.
   */
  Grid.prototype.refresh = function refresh(rowsAltered) {
    var self = this;

    var p1 = self.processRowsProcessors(self.rows).then(function (renderableRows) {
      self.setVisibleRows(renderableRows);
    });

    var p2 = self.processColumnsProcessors(self.columns).then(function (renderableColumns) {
      self.setVisibleColumns(renderableColumns);
    });

    return $q.all([p1, p2]).then(function () {
      self.redrawInPlace(rowsAltered);

      self.refreshCanvas(true);
    });
  };

  /**
   * @ngdoc function
   * @name refreshRows
   * @methodOf ui.grid.class:Grid
   * @description Refresh the rendered rows on screen?  Note: not functional at present
   * @returns {promise} promise that is resolved when render completes?
   *
   */
  Grid.prototype.refreshRows = function refreshRows() {
    var self = this;

    return self.processRowsProcessors(self.rows)
      .then(function (renderableRows) {
        self.setVisibleRows(renderableRows);

        self.redrawInPlace();

        self.refreshCanvas( true );
      });
  };

  /**
   * @ngdoc function
   * @name refreshCanvas
   * @methodOf ui.grid.class:Grid
   * @description Builds all styles and recalculates much of the grid sizing
   * @param {object} buildStyles optional parameter.  Use TBD
   * @returns {promise} promise that is resolved when the canvas
   * has been refreshed
   *
   */
  Grid.prototype.refreshCanvas = function(buildStyles) {
    var self = this;

    if (buildStyles) {
      self.buildStyles();
    }

    var p = $q.defer();

    // Get all the header heights
    var containerHeadersToRecalc = [];
    for (var containerId in self.renderContainers) {
      if (self.renderContainers.hasOwnProperty(containerId)) {
        var container = self.renderContainers[containerId];

        // Skip containers that have no canvasWidth set yet
        if (container.canvasWidth === null || isNaN(container.canvasWidth)) {
          continue;
        }

        if (container.header || container.headerCanvas) {
          container.explicitHeaderHeight = container.explicitHeaderHeight || null;
          container.explicitHeaderCanvasHeight = container.explicitHeaderCanvasHeight || null;

          containerHeadersToRecalc.push(container);
        }
      }
    }

    /*
     *
     * Here we loop through the headers, measuring each element as well as any header "canvas" it has within it.
     *
     * If any header is less than the largest header height, it will be resized to that so that we don't have headers
     * with different heights, which looks like a rendering problem
     *
     * We'll do the same thing with the header canvases, and give the header CELLS an explicit height if their canvas
     * is smaller than the largest canvas height. That was header cells without extra controls like filtering don't
     * appear shorter than other cells.
     *
     */
    if (containerHeadersToRecalc.length > 0) {
      // Build the styles without the explicit header heights
      if (buildStyles) {
        self.buildStyles();
      }

      // Putting in a timeout as it's not calculating after the grid element is rendered and filled out
      $timeout(function() {
        // var oldHeaderHeight = self.grid.headerHeight;
        // self.grid.headerHeight = gridUtil.outerElementHeight(self.header);

        var rebuildStyles = false;

        // Get all the header heights
        var maxHeaderHeight = 0;
        var maxHeaderCanvasHeight = 0;
        var i, container;
        var getHeight = function(oldVal, newVal){
          if ( oldVal !== newVal){
            rebuildStyles = true;
          }
          return newVal;
        };
        for (i = 0; i < containerHeadersToRecalc.length; i++) {
          container = containerHeadersToRecalc[i];

          // Skip containers that have no canvasWidth set yet
          if (container.canvasWidth === null || isNaN(container.canvasWidth)) {
            continue;
          }

          if (container.header) {
            var headerHeight = container.headerHeight = getHeight(container.headerHeight, parseInt(gridUtil.outerElementHeight(container.header), 10));

            // Get the "inner" header height, that is the height minus the top and bottom borders, if present. We'll use it to make sure all the headers have a consistent height
            var topBorder = gridUtil.getBorderSize(container.header, 'top');
            var bottomBorder = gridUtil.getBorderSize(container.header, 'bottom');
            var innerHeaderHeight = parseInt(headerHeight - topBorder - bottomBorder, 10);

            innerHeaderHeight  = innerHeaderHeight < 0 ? 0 : innerHeaderHeight;

            container.innerHeaderHeight = innerHeaderHeight;

            // If the header doesn't have an explicit height set, save the largest header height for use later
            //   Explicit header heights are based off of the max we are calculating here. We never want to base the max on something we're setting explicitly
            if (!container.explicitHeaderHeight && innerHeaderHeight > maxHeaderHeight) {
              maxHeaderHeight = innerHeaderHeight;
            }
          }

          if (container.headerCanvas) {
            var headerCanvasHeight = container.headerCanvasHeight = getHeight(container.headerCanvasHeight, parseInt(gridUtil.outerElementHeight(container.headerCanvas), 10));


            // If the header doesn't have an explicit canvas height, save the largest header canvas height for use later
            //   Explicit header heights are based off of the max we are calculating here. We never want to base the max on something we're setting explicitly
            if (!container.explicitHeaderCanvasHeight && headerCanvasHeight > maxHeaderCanvasHeight) {
              maxHeaderCanvasHeight = headerCanvasHeight;
            }
          }
        }

        // Go through all the headers
        for (i = 0; i < containerHeadersToRecalc.length; i++) {
          container = containerHeadersToRecalc[i];

          /* If:
              1. We have a max header height
              2. This container has a header height defined
              3. And either this container has an explicit header height set, OR its header height is less than the max

              then:

              Give this container's header an explicit height so it will line up with the tallest header
          */
          if (
            maxHeaderHeight > 0 && typeof(container.headerHeight) !== 'undefined' && container.headerHeight !== null &&
            (container.explicitHeaderHeight || container.headerHeight < maxHeaderHeight)
          ) {
            container.explicitHeaderHeight = getHeight(container.explicitHeaderHeight, maxHeaderHeight);
          }

          // Do the same as above except for the header canvas
          if (
            maxHeaderCanvasHeight > 0 && typeof(container.headerCanvasHeight) !== 'undefined' && container.headerCanvasHeight !== null &&
            (container.explicitHeaderCanvasHeight || container.headerCanvasHeight < maxHeaderCanvasHeight)
          ) {
            container.explicitHeaderCanvasHeight = getHeight(container.explicitHeaderCanvasHeight, maxHeaderCanvasHeight);
          }
        }

        // Rebuild styles if the header height has changed
        //   The header height is used in body/viewport calculations and those are then used in other styles so we need it to be available
        if (buildStyles && rebuildStyles) {
          self.buildStyles();
        }

        p.resolve();
      });
    }
    else {
      // Timeout still needs to be here to trigger digest after styles have been rebuilt
      $timeout(function() {
        p.resolve();
      });
    }

    return p.promise;
  };


  /**
   * @ngdoc function
   * @name redrawCanvas
   * @methodOf ui.grid.class:Grid
   * @description Redraw the rows and columns based on our current scroll position
   * @param {boolean} [rowsAdded] Optional to indicate rows are added and the scroll percentage must be recalculated
   *
   */
  Grid.prototype.redrawInPlace = function redrawInPlace(rowsAdded) {
    // gridUtil.logDebug('redrawInPlace');

    var self = this;

    for (var i in self.renderContainers) {
      var container = self.renderContainers[i];

      // gridUtil.logDebug('redrawing container', i);

      if (rowsAdded) {
        container.adjustRows(container.prevScrollTop, null);
        container.adjustColumns(container.prevScrollLeft, null);
      }
      else {
        container.adjustRows(null, container.prevScrolltopPercentage);
        container.adjustColumns(null, container.prevScrollleftPercentage);
      }
    }
  };

    /**
     * @ngdoc function
     * @name hasLeftContainerColumns
     * @methodOf ui.grid.class:Grid
     * @description returns true if leftContainer has columns
     */
    Grid.prototype.hasLeftContainerColumns = function () {
      return this.hasLeftContainer() && this.renderContainers.left.renderedColumns.length > 0;
    };

    /**
     * @ngdoc function
     * @name hasRightContainerColumns
     * @methodOf ui.grid.class:Grid
     * @description returns true if rightContainer has columns
     */
    Grid.prototype.hasRightContainerColumns = function () {
      return this.hasRightContainer() && this.renderContainers.right.renderedColumns.length > 0;
    };

    /**
     * @ngdoc method
     * @methodOf  ui.grid.class:Grid
     * @name scrollToIfNecessary
     * @description Scrolls the grid to make a certain row and column combo visible,
     *   in the case that it is not completely visible on the screen already.
     * @param {GridRow} gridRow row to make visible
     * @param {GridCol} gridCol column to make visible
     * @returns {promise} a promise that is resolved when scrolling is complete
     */
    Grid.prototype.scrollToIfNecessary = function (gridRow, gridCol) {
      var self = this;

      var scrollEvent = new ScrollEvent(self, 'uiGrid.scrollToIfNecessary');

      // Alias the visible row and column caches
      var visRowCache = self.renderContainers.body.visibleRowCache;
      var visColCache = self.renderContainers.body.visibleColumnCache;

      /*-- Get the top, left, right, and bottom "scrolled" edges of the grid --*/

      // The top boundary is the current Y scroll position PLUS the header height, because the header can obscure rows when the grid is scrolled downwards
      var topBound = self.renderContainers.body.prevScrollTop + self.headerHeight;

      // Don't the let top boundary be less than 0
      topBound = (topBound < 0) ? 0 : topBound;

      // The left boundary is the current X scroll position
      var leftBound = self.renderContainers.body.prevScrollLeft;

      // The bottom boundary is the current Y scroll position, plus the height of the grid, but minus the header height.
      //   Basically this is the viewport height added on to the scroll position
      var bottomBound = self.renderContainers.body.prevScrollTop + self.gridHeight - self.renderContainers.body.headerHeight - self.footerHeight -  self.scrollbarWidth;

      // If there's a horizontal scrollbar, remove its height from the bottom boundary, otherwise we'll be letting it obscure rows
      //if (self.horizontalScrollbarHeight) {
      //  bottomBound = bottomBound - self.horizontalScrollbarHeight;
      //}

      // The right position is the current X scroll position minus the grid width
      var rightBound = self.renderContainers.body.prevScrollLeft + Math.ceil(self.gridWidth);

      // If there's a vertical scrollbar, subtract it from the right boundary or we'll allow it to obscure cells
      //if (self.verticalScrollbarWidth) {
      //  rightBound = rightBound - self.verticalScrollbarWidth;
      //}

      // We were given a row to scroll to
      if (gridRow !== null) {
        // This is the index of the row we want to scroll to, within the list of rows that can be visible
        var seekRowIndex = visRowCache.indexOf(gridRow);

        // Total vertical scroll length of the grid
        var scrollLength = (self.renderContainers.body.getCanvasHeight() - self.renderContainers.body.getViewportHeight());

        // Add the height of the native horizontal scrollbar to the scroll length, if it's there. Otherwise it will mask over the final row
        //if (self.horizontalScrollbarHeight && self.horizontalScrollbarHeight > 0) {
        //  scrollLength = scrollLength + self.horizontalScrollbarHeight;
        //}

        // This is the minimum amount of pixels we need to scroll vertical in order to see this row.
        var pixelsToSeeRow = ((seekRowIndex + 1) * self.options.rowHeight);

        // Don't let the pixels required to see the row be less than zero
        pixelsToSeeRow = (pixelsToSeeRow < 0) ? 0 : pixelsToSeeRow;

        var scrollPixels, percentage;

        // If the scroll position we need to see the row is LESS than the top boundary, i.e. obscured above the top of the self...
        if (pixelsToSeeRow < topBound) {
          // Get the different between the top boundary and the required scroll position and subtract it from the current scroll position\
          //   to get the full position we need
          scrollPixels = self.renderContainers.body.prevScrollTop - (topBound - pixelsToSeeRow);

          // Turn the scroll position into a percentage and make it an argument for a scroll event
          percentage = scrollPixels / scrollLength;
          scrollEvent.y = { percentage: percentage  };
        }
        // Otherwise if the scroll position we need to see the row is MORE than the bottom boundary, i.e. obscured below the bottom of the self...
        else if (pixelsToSeeRow > bottomBound) {
          // Get the different between the bottom boundary and the required scroll position and add it to the current scroll position
          //   to get the full position we need
          scrollPixels = pixelsToSeeRow - bottomBound + self.renderContainers.body.prevScrollTop;

          // Turn the scroll position into a percentage and make it an argument for a scroll event
          percentage = scrollPixels / scrollLength;
          scrollEvent.y = { percentage: percentage  };
        }
      }

      // We were given a column to scroll to
      if (gridCol !== null) {
        // This is the index of the row we want to scroll to, within the list of rows that can be visible
        var seekColumnIndex = visColCache.indexOf(gridCol);

        // Total vertical scroll length of the grid
        var horizScrollLength = (self.renderContainers.body.getCanvasWidth() - self.renderContainers.body.getViewportWidth());

        // Add the height of the native horizontal scrollbar to the scroll length, if it's there. Otherwise it will mask over the final row
        // if (self.verticalScrollbarWidth && self.verticalScrollbarWidth > 0) {
        //   horizScrollLength = horizScrollLength + self.verticalScrollbarWidth;
        // }

        // This is the minimum amount of pixels we need to scroll vertical in order to see this column
        var columnLeftEdge = 0;
        for (var i = 0; i < seekColumnIndex; i++) {
          var col = visColCache[i];
          columnLeftEdge += col.drawnWidth;
        }
        columnLeftEdge = (columnLeftEdge < 0) ? 0 : columnLeftEdge;

        var columnRightEdge = columnLeftEdge + gridCol.drawnWidth;

        // Don't let the pixels required to see the column be less than zero
        columnRightEdge = (columnRightEdge < 0) ? 0 : columnRightEdge;

        var horizScrollPixels, horizPercentage;

        // If the scroll position we need to see the row is LESS than the top boundary, i.e. obscured above the top of the self...
        if (columnLeftEdge < leftBound) {
          // Get the different between the top boundary and the required scroll position and subtract it from the current scroll position\
          //   to get the full position we need
          horizScrollPixels = self.renderContainers.body.prevScrollLeft - (leftBound - columnLeftEdge);

          // Turn the scroll position into a percentage and make it an argument for a scroll event
          horizPercentage = horizScrollPixels / horizScrollLength;
          horizPercentage = (horizPercentage > 1) ? 1 : horizPercentage;
          scrollEvent.x = { percentage: horizPercentage  };
        }
        // Otherwise if the scroll position we need to see the row is MORE than the bottom boundary, i.e. obscured below the bottom of the self...
        else if (columnRightEdge > rightBound) {
          // Get the different between the bottom boundary and the required scroll position and add it to the current scroll position
          //   to get the full position we need
          horizScrollPixels = columnRightEdge - rightBound + self.renderContainers.body.prevScrollLeft;

          // Turn the scroll position into a percentage and make it an argument for a scroll event
          horizPercentage = horizScrollPixels / horizScrollLength;
          horizPercentage = (horizPercentage > 1) ? 1 : horizPercentage;
          scrollEvent.x = { percentage: horizPercentage  };
        }
      }

      var deferred = $q.defer();

      // If we need to scroll on either the x or y axes, fire a scroll event
      if (scrollEvent.y || scrollEvent.x) {
        scrollEvent.withDelay = false;
        self.scrollContainers('',scrollEvent);
        var dereg = self.api.core.on.scrollEnd(null,function() {
          deferred.resolve(scrollEvent);
          dereg();
        });
      }
      else {
        deferred.resolve();
      }

      return deferred.promise;
    };

    /**
     * @ngdoc method
     * @methodOf ui.grid.class:Grid
     * @name scrollTo
     * @description Scroll the grid such that the specified
     * row and column is in view
     * @param {object} rowEntity gridOptions.data[] array instance to make visible
     * @param {object} colDef to make visible
     * @returns {promise} a promise that is resolved after any scrolling is finished
     */
    Grid.prototype.scrollTo = function (rowEntity, colDef) {
      var gridRow = null, gridCol = null;

      if (rowEntity !== null && typeof(rowEntity) !== 'undefined' ) {
        gridRow = this.getRow(rowEntity);
      }

      if (colDef !== null && typeof(colDef) !== 'undefined' ) {
        gridCol = this.getColumn(colDef.name ? colDef.name : colDef.field);
      }
      return this.scrollToIfNecessary(gridRow, gridCol);
    };

  /**
   * @ngdoc function
   * @name clearAllFilters
   * @methodOf ui.grid.class:Grid
   * @description Clears all filters and optionally refreshes the visible rows.
   * @param {object} refreshRows Defaults to true.
   * @param {object} clearConditions Defaults to false.
   * @param {object} clearFlags Defaults to false.
   * @returns {promise} If `refreshRows` is true, returns a promise of the rows refreshing.
   */
  Grid.prototype.clearAllFilters = function clearAllFilters(refreshRows, clearConditions, clearFlags) {
    // Default `refreshRows` to true because it will be the most commonly desired behaviour.
    if (refreshRows === undefined) {
      refreshRows = true;
    }
    if (clearConditions === undefined) {
      clearConditions = false;
    }
    if (clearFlags === undefined) {
      clearFlags = false;
    }

    this.columns.forEach(function(column) {
      column.filters.forEach(function(filter) {
        filter.term = undefined;

        if (clearConditions) {
          filter.condition = undefined;
        }

        if (clearFlags) {
          filter.flags = undefined;
        }
      });
    });

    if (refreshRows) {
      return this.refreshRows();
    }
  };


      // Blatantly stolen from Angular as it isn't exposed (yet? 2.0?)
  function RowHashMap() {}

  RowHashMap.prototype = {
    /**
     * Store key value pair
     * @param key key to store can be any type
     * @param value value to store can be any type
     */
    put: function(key, value) {
      this[this.grid.options.rowIdentity(key)] = value;
    },

    /**
     * @param key
     * @returns {Object} the value for the key
     */
    get: function(key) {
      return this[this.grid.options.rowIdentity(key)];
    },

    /**
     * Remove the key/value pair
     * @param key
     */
    remove: function(key) {
      var value = this[key = this.grid.options.rowIdentity(key)];
      delete this[key];
      return value;
    }
  };



  return Grid;

}]);

})();

(function () {

  angular.module('ui.grid')
    .factory('GridApi', ['$q', '$rootScope', 'gridUtil', 'uiGridConstants', 'GridRow', 'uiGridGridMenuService',
      function ($q, $rootScope, gridUtil, uiGridConstants, GridRow, uiGridGridMenuService) {
        /**
         * @ngdoc function
         * @name ui.grid.class:GridApi
         * @description GridApi provides the ability to register public methods events inside the grid and allow
         * for other components to use the api via featureName.raise.methodName and featureName.on.eventName(function(args){}.
         * <br/>
         * To listen to events, you must add a callback to gridOptions.onRegisterApi
         * <pre>
         *   $scope.gridOptions.onRegisterApi = function(gridApi){
         *      gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
         *          $log.log('navigation event');
         *      });
         *   };
         * </pre>
         * @param {object} grid grid that owns api
         */
        var GridApi = function GridApi(grid) {
          this.grid = grid;
          this.listeners = [];
          
          /**
           * @ngdoc function
           * @name renderingComplete
           * @methodOf  ui.grid.core.api:PublicApi
           * @description Rendering is complete, called at the same
           * time as `onRegisterApi`, but provides a way to obtain
           * that same event within features without stopping end
           * users from getting at the onRegisterApi method.
           * 
           * Included in gridApi so that it's always there - otherwise
           * there is still a timing problem with when a feature can
           * call this. 
           * 
           * @param {GridApi} gridApi the grid api, as normally 
           * returned in the onRegisterApi method
           * 
           * @example
           * <pre>
           *      gridApi.core.on.renderingComplete( grid );
           * </pre>
           */
          this.registerEvent( 'core', 'renderingComplete' );

          /**
           * @ngdoc event
           * @name filterChanged
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised after the filter is changed.  The nature
           * of the watch expression doesn't allow notification of what changed,
           * so the receiver of this event will need to re-extract the filter 
           * conditions from the columns.
           * 
           */
          this.registerEvent( 'core', 'filterChanged' );

          /**
           * @ngdoc function
           * @name setRowInvisible
           * @methodOf  ui.grid.core.api:PublicApi
           * @description Sets an override on the row to make it always invisible,
           * which will override any filtering or other visibility calculations.  
           * If the row is currently visible then sets it to invisible and calls
           * both grid refresh and emits the rowsVisibleChanged event
           * @param {object} rowEntity gridOptions.data[] array instance
           */
          this.registerMethod( 'core', 'setRowInvisible', GridRow.prototype.setRowInvisible );
      
          /**
           * @ngdoc function
           * @name clearRowInvisible
           * @methodOf  ui.grid.core.api:PublicApi
           * @description Clears any override on visibility for the row so that it returns to 
           * using normal filtering and other visibility calculations.  
           * If the row is currently invisible then sets it to visible and calls
           * both grid refresh and emits the rowsVisibleChanged event
           * TODO: if a filter is active then we can't just set it to visible?
           * @param {object} rowEntity gridOptions.data[] array instance
           */
          this.registerMethod( 'core', 'clearRowInvisible', GridRow.prototype.clearRowInvisible );
      
          /**
           * @ngdoc function
           * @name getVisibleRows
           * @methodOf  ui.grid.core.api:PublicApi
           * @description Returns all visible rows
           * @param {Grid} grid the grid you want to get visible rows from
           * @returns {array} an array of gridRow
           */
          this.registerMethod( 'core', 'getVisibleRows', this.grid.getVisibleRows );
          
          /**
           * @ngdoc event
           * @name rowsVisibleChanged
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised after the rows that are visible
           * change.  The filtering is zero-based, so it isn't possible
           * to say which rows changed (unlike in the selection feature).
           * We can plausibly know which row was changed when setRowInvisible
           * is called, but in that situation the user already knows which row
           * they changed.  When a filter runs we don't know what changed,
           * and that is the one that would have been useful.
           *
           */
          this.registerEvent( 'core', 'rowsVisibleChanged' );

          /**
           * @ngdoc event
           * @name rowsRendered
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised after the cache of visible rows is changed.
           */
          this.registerEvent( 'core', 'rowsRendered' );


          /**
           * @ngdoc event
           * @name scrollBegin
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised when scroll begins.  Is throttled, so won't be raised too frequently
           */
          this.registerEvent( 'core', 'scrollBegin' );

          /**
           * @ngdoc event
           * @name scrollEnd
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised when scroll has finished.  Is throttled, so won't be raised too frequently
           */
          this.registerEvent( 'core', 'scrollEnd' );

          /**
           * @ngdoc event
           * @name canvasHeightChanged
           * @eventOf  ui.grid.core.api:PublicApi
           * @description  is raised when the canvas height has changed
           * <br/>
           * arguments: oldHeight, newHeight
           */
          this.registerEvent( 'core', 'canvasHeightChanged');
        };

        /**
         * @ngdoc function
         * @name ui.grid.class:suppressEvents
         * @methodOf ui.grid.class:GridApi
         * @description Used to execute a function while disabling the specified event listeners.
         * Disables the listenerFunctions, executes the callbackFn, and then enables
         * the listenerFunctions again
         * @param {object} listenerFuncs listenerFunc or array of listenerFuncs to suppress. These must be the same
         * functions that were used in the .on.eventName method
         * @param {object} callBackFn function to execute
         * @example
         * <pre>
         *    var navigate = function (newRowCol, oldRowCol){
         *       //do something on navigate
         *    }
         *
         *    gridApi.cellNav.on.navigate(scope,navigate);
         *
         *
         *    //call the scrollTo event and suppress our navigate listener
         *    //scrollTo will still raise the event for other listeners
         *    gridApi.suppressEvents(navigate, function(){
         *       gridApi.cellNav.scrollTo(aRow, aCol);
         *    });
         *
         * </pre>
         */
        GridApi.prototype.suppressEvents = function (listenerFuncs, callBackFn) {
          var self = this;
          var listeners = angular.isArray(listenerFuncs) ? listenerFuncs : [listenerFuncs];

          //find all registered listeners
          var foundListeners = self.listeners.filter(function(listener) {
            return listeners.some(function(l) {
              return listener.handler === l;
            });
          });

          //deregister all the listeners
          foundListeners.forEach(function(l){
            l.dereg();
          });

          callBackFn();

          //reregister all the listeners
          foundListeners.forEach(function(l){
              l.dereg = registerEventWithAngular(l.eventId, l.handler, self.grid, l._this);
          });

        };

        /**
         * @ngdoc function
         * @name registerEvent
         * @methodOf ui.grid.class:GridApi
         * @description Registers a new event for the given feature.  The event will get a
         * .raise and .on prepended to it
         * <br>
         * .raise.eventName() - takes no arguments
         * <br/>
         * <br/>
         * .on.eventName(scope, callBackFn, _this)
         * <br/>
         * scope - a scope reference to add a deregister call to the scopes .$on('destroy').  Scope is optional and can be a null value,
         * but in this case you must deregister it yourself via the returned deregister function
         * <br/>
         * callBackFn - The function to call
         * <br/>
         * _this - optional this context variable for callbackFn. If omitted, grid.api will be used for the context
         * <br/>
         * .on.eventName returns a dereg funtion that will remove the listener.  It's not necessary to use it as the listener
         * will be removed when the scope is destroyed.
         * @param {string} featureName name of the feature that raises the event
         * @param {string} eventName  name of the event
         */
        GridApi.prototype.registerEvent = function (featureName, eventName) {
          var self = this;
          if (!self[featureName]) {
            self[featureName] = {};
          }

          var feature = self[featureName];
          if (!feature.on) {
            feature.on = {};
            feature.raise = {};
          }

          var eventId = self.grid.id + featureName + eventName;

          // gridUtil.logDebug('Creating raise event method ' + featureName + '.raise.' + eventName);
          feature.raise[eventName] = function () {
            $rootScope.$emit.apply($rootScope, [eventId].concat(Array.prototype.slice.call(arguments)));
          };

          // gridUtil.logDebug('Creating on event method ' + featureName + '.on.' + eventName);
          feature.on[eventName] = function (scope, handler, _this) {
            if ( scope !== null && typeof(scope.$on) === 'undefined' ){
              gridUtil.logError('asked to listen on ' + featureName + '.on.' + eventName + ' but scope wasn\'t passed in the input parameters.  It is legitimate to pass null, but you\'ve passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering');
              return;
            }
            var deregAngularOn = registerEventWithAngular(eventId, handler, self.grid, _this);

            //track our listener so we can turn off and on
            var listener = {handler: handler, dereg: deregAngularOn, eventId: eventId, scope: scope, _this:_this};
            self.listeners.push(listener);

            var removeListener = function(){
              listener.dereg();
              var index = self.listeners.indexOf(listener);
              self.listeners.splice(index,1);
            };

            //destroy tracking when scope is destroyed
            if (scope) {
              scope.$on('$destroy', function() {
                removeListener();
              });
            }


            return removeListener;
          };
        };

        function registerEventWithAngular(eventId, handler, grid, _this) {
          return $rootScope.$on(eventId, function (event) {
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1); //remove evt argument
            handler.apply(_this ? _this : grid.api, args);
          });
        }

        /**
         * @ngdoc function
         * @name registerEventsFromObject
         * @methodOf ui.grid.class:GridApi
         * @description Registers features and events from a simple objectMap.
         * eventObjectMap must be in this format (multiple features allowed)
         * <pre>
         * {featureName:
         *        {
         *          eventNameOne:function(args){},
         *          eventNameTwo:function(args){}
         *        }
         *  }
         * </pre>
         * @param {object} eventObjectMap map of feature/event names
         */
        GridApi.prototype.registerEventsFromObject = function (eventObjectMap) {
          var self = this;
          var features = [];
          angular.forEach(eventObjectMap, function (featProp, featPropName) {
            var feature = {name: featPropName, events: []};
            angular.forEach(featProp, function (prop, propName) {
              feature.events.push(propName);
            });
            features.push(feature);
          });

          features.forEach(function (feature) {
            feature.events.forEach(function (event) {
              self.registerEvent(feature.name, event);
            });
          });

        };

        /**
         * @ngdoc function
         * @name registerMethod
         * @methodOf ui.grid.class:GridApi
         * @description Registers a new event for the given feature
         * @param {string} featureName name of the feature
         * @param {string} methodName  name of the method
         * @param {object} callBackFn function to execute
         * @param {object} _this binds callBackFn 'this' to _this.  Defaults to gridApi.grid
         */
        GridApi.prototype.registerMethod = function (featureName, methodName, callBackFn, _this) {
          if (!this[featureName]) {
            this[featureName] = {};
          }

          var feature = this[featureName];

          feature[methodName] = gridUtil.createBoundedWrapper(_this || this.grid, callBackFn);
        };

        /**
         * @ngdoc function
         * @name registerMethodsFromObject
         * @methodOf ui.grid.class:GridApi
         * @description Registers features and methods from a simple objectMap.
         * eventObjectMap must be in this format (multiple features allowed)
         * <br>
         * {featureName:
         *        {
         *          methodNameOne:function(args){},
         *          methodNameTwo:function(args){}
         *        }
         * @param {object} eventObjectMap map of feature/event names
         * @param {object} _this binds this to _this for all functions.  Defaults to gridApi.grid
         */
        GridApi.prototype.registerMethodsFromObject = function (methodMap, _this) {
          var self = this;
          var features = [];
          angular.forEach(methodMap, function (featProp, featPropName) {
            var feature = {name: featPropName, methods: []};
            angular.forEach(featProp, function (prop, propName) {
              feature.methods.push({name: propName, fn: prop});
            });
            features.push(feature);
          });

          features.forEach(function (feature) {
            feature.methods.forEach(function (method) {
              self.registerMethod(feature.name, method.name, method.fn, _this);
            });
          });

        };
        
        return GridApi;

      }]);

})();

(function(){

angular.module('ui.grid')
.factory('GridColumn', ['gridUtil', 'uiGridConstants', 'i18nService', function(gridUtil, uiGridConstants, i18nService) {

  /**
   * ******************************************************************************************
   * PaulL1: Ugly hack here in documentation.  These properties are clearly properties of GridColumn, 
   * and need to be noted as such for those extending and building ui-grid itself.
   * However, from an end-developer perspective, they interact with all these through columnDefs,
   * and they really need to be documented there.  I feel like they're relatively static, and
   * I can't find an elegant way for ngDoc to reference to both....so I've duplicated each
   * comment block.  Ugh.
   * 
   */

  /** 
   * @ngdoc property
   * @name name
   * @propertyOf ui.grid.class:GridColumn
   * @description (mandatory) each column should have a name, although for backward
   * compatibility with 2.x name can be omitted if field is present
   *
   */

  /** 
   * @ngdoc property
   * @name name
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description (mandatory) each column should have a name, although for backward
   * compatibility with 2.x name can be omitted if field is present
   *
   */
    
  /** 
   * @ngdoc property
   * @name displayName
   * @propertyOf ui.grid.class:GridColumn
   * @description Column name that will be shown in the header.  If displayName is not
   * provided then one is generated using the name.
   *
   */

  /** 
   * @ngdoc property
   * @name displayName
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description Column name that will be shown in the header.  If displayName is not
   * provided then one is generated using the name.
   *
   */
       
  /** 
   * @ngdoc property
   * @name field
   * @propertyOf ui.grid.class:GridColumn
   * @description field must be provided if you wish to bind to a 
   * property in the data source.  Should be an angular expression that evaluates against grid.options.data 
   * array element.  Can be a complex expression: <code>employee.address.city</code>, or can be a function: <code>employee.getFullAddress()</code>.
   * See the angular docs on binding expressions.
   *
   */
    
  /** 
   * @ngdoc property
   * @name field
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description field must be provided if you wish to bind to a 
   * property in the data source.  Should be an angular expression that evaluates against grid.options.data 
   * array element.  Can be a complex expression: <code>employee.address.city</code>, or can be a function: <code>employee.getFullAddress()</code>.    * See the angular docs on binding expressions.    *
   */
    
  /** 
   * @ngdoc property
   * @name filter
   * @propertyOf ui.grid.class:GridColumn
   * @description Filter on this column.  
   * @example
   * <pre>{ term: 'text', condition: uiGridConstants.filter.STARTS_WITH, placeholder: 'type to filter...', flags: { caseSensitive: false }, type: uiGridConstants.filter.SELECT, [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ] }</pre>
   *
   */
    
  /**
   * @ngdoc object
   * @name ui.grid.class:GridColumn
   * @description Represents the viewModel for each column.  Any state or methods needed for a Grid Column
   * are defined on this prototype
   * @param {ColumnDef} colDef the column def to associate with this column
   * @param {number} uid the unique and immutable uid we'd like to allocate to this column
   * @param {Grid} grid the grid we'd like to create this column in
   */ 
  function GridColumn(colDef, uid, grid) {
    var self = this;

    self.grid = grid;
    self.uid = uid;

    self.updateColumnDef(colDef, true);

    /**
     * @ngdoc function
     * @name hideColumn
     * @methodOf ui.grid.class:GridColumn
     * @description Hides the column by setting colDef.visible = false
     */
    GridColumn.prototype.hideColumn = function() {
      this.colDef.visible = false;
    };

    self.aggregationValue = undefined;

    // The footer cell registers to listen for the rowsRendered event, and calls this.  Needed to be
    // in something with a scope so that the dereg would get called
    self.updateAggregationValue = function() {

     // gridUtil.logDebug('getAggregationValue for Column ' + self.colDef.name);

      /** 
       * @ngdoc property
       * @name aggregationType
       * @propertyOf ui.grid.class:GridOptions.columnDef
       * @description The aggregation that you'd like to show in the columnFooter for this
       * column.  Valid values are in uiGridConstants, and currently include `uiGridConstants.aggregationTypes.count`, 
       * `uiGridConstants.aggregationTypes.sum`, `uiGridConstants.aggregationTypes.avg`, `uiGridConstants.aggregationTypes.min`, 
       * `uiGridConstants.aggregationTypes.max`.
       * 
       * You can also provide a function as the aggregation type, in this case your function needs to accept the full
       * set of visible rows, and return a value that should be shown 
       */
      if (!self.aggregationType) {
        self.aggregationValue = undefined;
        return;
      }

      var result = 0;
      var visibleRows = self.grid.getVisibleRows();

      var cellValues = function(){
        var values = [];
        visibleRows.forEach(function (row) {
          var cellValue = self.grid.getCellValue(row, self);
          var cellNumber = Number(cellValue);
          if (!isNaN(cellNumber)) {
            values.push(cellNumber);
          }
        });
        return values;
      };

      if (angular.isFunction(self.aggregationType)) {
        self.aggregationValue = self.aggregationType(visibleRows, self);
      }
      else if (self.aggregationType === uiGridConstants.aggregationTypes.count) {
        self.aggregationValue = self.grid.getVisibleRowCount();
      }
      else if (self.aggregationType === uiGridConstants.aggregationTypes.sum) {
        cellValues().forEach(function (value) {
          result += value;
        });
        self.aggregationValue = result;
      }
      else if (self.aggregationType === uiGridConstants.aggregationTypes.avg) {
        cellValues().forEach(function (value) {
          result += value;
        });
        result = result / cellValues().length;
        self.aggregationValue = result;
      }
      else if (self.aggregationType === uiGridConstants.aggregationTypes.min) {
        self.aggregationValue = Math.min.apply(null, cellValues());
      }
      else if (self.aggregationType === uiGridConstants.aggregationTypes.max) {
        self.aggregationValue = Math.max.apply(null, cellValues());
      }
      else {
        self.aggregationValue = '\u00A0';
      }
    };

//     var throttledUpdateAggregationValue = gridUtil.throttle(updateAggregationValue, self.grid.options.aggregationCalcThrottle, { trailing: true, context: self.name });

    /**
     * @ngdoc function
     * @name getAggregationValue
     * @methodOf ui.grid.class:GridColumn
     * @description gets the aggregation value based on the aggregation type for this column.
     * Debounced using scrollDebounce option setting
     */
    this.getAggregationValue =  function() {
//      if (!self.grid.isScrollingVertically && !self.grid.isScrollingHorizontally) {
//        throttledUpdateAggregationValue();
//      }

      return self.aggregationValue;
    };
  }


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:GridColumn
   * @name setPropertyOrDefault
   * @description Sets a property on the column using the passed in columnDef, and
   * setting the defaultValue if the value cannot be found on the colDef
   * @param {ColumnDef} colDef the column def to look in for the property value
   * @param {string} propName the property name we'd like to set
   * @param {object} defaultValue the value to use if the colDef doesn't provide the setting
   */ 
  GridColumn.prototype.setPropertyOrDefault = function (colDef, propName, defaultValue) {
    var self = this;

    // Use the column definition filter if we were passed it
    if (typeof(colDef[propName]) !== 'undefined' && colDef[propName]) {
      self[propName] = colDef[propName];
    }
    // Otherwise use our own if it's set
    else if (typeof(self[propName]) !== 'undefined') {
      self[propName] = self[propName];
    }
    // Default to empty object for the filter
    else {
      self[propName] = defaultValue ? defaultValue : {};
    }
  };

  
  
  /** 
   * @ngdoc property
   * @name width
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description sets the column width.  Can be either 
   * a number or a percentage, or an * for auto.
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', width: 100},
   *                                          { field: 'field2', width: '20%'},
   *                                          { field: 'field3', width: '*' }]; </pre>
   *
   */

  /** 
   * @ngdoc property
   * @name minWidth
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description sets the minimum column width.  Should be a number.
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', minWidth: 100}]; </pre>
   *
   */

  /** 
   * @ngdoc property
   * @name maxWidth
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description sets the maximum column width.  Should be a number.
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', maxWidth: 100}]; </pre>
   *
   */

  /** 
   * @ngdoc property
   * @name visible
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description sets whether or not the column is visible
   * </br>Default is true
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ 
   *     { field: 'field1', visible: true},
   *     { field: 'field2', visible: false }
   *   ]; </pre>
   *
   */
   
  /**
   * @ngdoc property
   * @name sort
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description An object of sort information, attributes are:
   * 
   * - direction: values are uiGridConstants.ASC or uiGridConstants.DESC
   * - ignoreSort: if set to true this sort is ignored (used by tree to manipulate the sort functionality)
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', sort: { direction: uiGridConstants.ASC, ignoreSort: true }}] </pre>
   */
  

  /** 
   * @ngdoc property
   * @name sortingAlgorithm
   * @propertyOf ui.grid.class:GridColumn
   * @description Algorithm to use for sorting this column. Takes 'a' and 'b' parameters 
   * like any normal sorting function.
   *
   */

  /** 
   * @ngdoc property
   * @name sortingAlgorithm
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description Algorithm to use for sorting this column. Takes 'a' and 'b' parameters 
   * like any normal sorting function.
   *
   */
      
  /** 
   * @ngdoc array
   * @name filters
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description Specify multiple filter fields.
   * @example
   * <pre>$scope.gridOptions.columnDefs = [ 
   *   {
   *     field: 'field1', filters: [
   *       {
   *         term: 'aa',
   *         condition: uiGridConstants.filter.STARTS_WITH,
   *         placeholder: 'starts with...',
   *         flags: { caseSensitive: false },
   *         type: uiGridConstants.filter.SELECT,
   *         selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ]
   *       },
   *       {
   *         condition: uiGridConstants.filter.ENDS_WITH,
   *         placeholder: 'ends with...'
   *       }
   *     ]
   *   }
   * ]; </pre>
   *
   * 
   */ 
   
  /** 
   * @ngdoc array
   * @name filters
   * @propertyOf ui.grid.class:GridColumn
   * @description Filters for this column. Includes 'term' property bound to filter input elements.
   * @example
   * <pre>[
   *   {
   *     term: 'foo', // ngModel for <input>
   *     condition: uiGridConstants.filter.STARTS_WITH,
   *     placeholder: 'starts with...',
   *     flags: { caseSensitive: false },
   *     type: uiGridConstants.filter.SELECT,
   *     selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ]
   *   },
   *   {
   *     term: 'baz',
   *     condition: uiGridConstants.filter.ENDS_WITH,
   *     placeholder: 'ends with...'
   *   }
   * ] </pre>
   *
   * 
   */   

  /** 
   * @ngdoc array
   * @name menuItems
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description used to add menu items to a column.  Refer to the tutorial on this 
   * functionality.  A number of settings are supported:
   * 
   * - title: controls the title that is displayed in the menu
   * - icon: the icon shown alongside that title
   * - action: the method to call when the menu is clicked
   * - shown: a function to evaluate to determine whether or not to show the item
   * - active: a function to evaluate to determine whether or not the item is currently selected
   * - context: context to pass to the action function, available in this.context in your handler
   * - leaveOpen: if set to true, the menu should stay open after the action, defaults to false
   * @example
   * <pre>  $scope.gridOptions.columnDefs = [ 
   *   { field: 'field1', menuItems: [
   *     {
   *       title: 'Outer Scope Alert',
   *       icon: 'ui-grid-icon-info-circled',
   *       action: function($event) {
   *         this.context.blargh(); // $scope.blargh() would work too, this is just an example
   *       },
   *       shown: function() { return true; },
   *       active: function() { return true; },
   *       context: $scope
   *     },
   *     {
   *       title: 'Grid ID',
   *       action: function() {
   *         alert('Grid ID: ' + this.grid.id);
   *       }
   *     }
   *   ] }]; </pre>
   *
   */   

  /**
   * @ngdoc method
   * @methodOf ui.grid.class:GridColumn
   * @name updateColumnDef
   * @description Moves settings from the columnDef down onto the column,
   * and sets properties as appropriate
   * @param {ColumnDef} colDef the column def to look in for the property value
   * @param {boolean} isNew whether the column is being newly created, if not
   * we're updating an existing column, and some items such as the sort shouldn't
   * be copied down
   */ 
  GridColumn.prototype.updateColumnDef = function(colDef, isNew) {
    var self = this;

    self.colDef = colDef;

    if (colDef.name === undefined) {
      throw new Error('colDef.name is required for column at index ' + self.grid.options.columnDefs.indexOf(colDef));
    }

    self.displayName = (colDef.displayName === undefined) ? gridUtil.readableColumnName(colDef.name) : colDef.displayName;
    
    var colDefWidth = colDef.width;
    var parseErrorMsg = "Cannot parse column width '" + colDefWidth + "' for column named '" + colDef.name + "'";

    if (!angular.isString(colDefWidth) && !angular.isNumber(colDefWidth)) {
      self.width = '*';
    } else if (angular.isString(colDefWidth)) {
      // See if it ends with a percent
      if (gridUtil.endsWith(colDefWidth, '%')) {
        // If so we should be able to parse the non-percent-sign part to a number
        var percentStr = colDefWidth.replace(/%/g, '');
        var percent = parseInt(percentStr, 10);
        if (isNaN(percent)) {
          throw new Error(parseErrorMsg);
        }
        self.width = colDefWidth;
      }
      // And see if it's a number string
      else if (colDefWidth.match(/^(\d+)$/)) {
        self.width = parseInt(colDefWidth.match(/^(\d+)$/)[1], 10);
      }
      // Otherwise it should be a string of asterisks
      else if (colDefWidth.match(/^\*+$/)) {
        self.width = colDefWidth;
      }
      // No idea, throw an Error
      else {
        throw new Error(parseErrorMsg);
      }
    }
    // Is a number, use it as the width
    else {
      self.width = colDefWidth;
    }

    self.minWidth = !colDef.minWidth ? 30 : colDef.minWidth;
    self.maxWidth = !colDef.maxWidth ? 9000 : colDef.maxWidth;

    //use field if it is defined; name if it is not
    self.field = (colDef.field === undefined) ? colDef.name : colDef.field;
    
    if ( typeof( self.field ) !== 'string' ){
      gridUtil.logError( 'Field is not a string, this is likely to break the code, Field is: ' + self.field );
    }
    
    self.name = colDef.name;

    // Use colDef.displayName as long as it's not undefined, otherwise default to the field name
    self.displayName = (colDef.displayName === undefined) ? gridUtil.readableColumnName(colDef.name) : colDef.displayName;

    //self.originalIndex = index;

    self.aggregationType = angular.isDefined(colDef.aggregationType) ? colDef.aggregationType : null;
    self.footerCellTemplate = angular.isDefined(colDef.footerCellTemplate) ? colDef.footerCellTemplate : null;

    /**
     * @ngdoc property
     * @name cellTooltip
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description Whether or not to show a tooltip when a user hovers over the cell.
     * If set to false, no tooltip.  If true, the cell value is shown in the tooltip (useful
     * if you have long values in your cells), if a function then that function is called
     * passing in the row and the col `cellTooltip( row, col )`, and the return value is shown in the tooltip,
     * if it is a static string then displays that static string.
     * 
     * Defaults to false
     *
     */
    if ( typeof(colDef.cellTooltip) === 'undefined' || colDef.cellTooltip === false ) {
      self.cellTooltip = false;
    } else if ( colDef.cellTooltip === true ){
      self.cellTooltip = function(row, col) {
        return self.grid.getCellValue( row, col );
      };
    } else if (typeof(colDef.cellTooltip) === 'function' ){
      self.cellTooltip = colDef.cellTooltip;
    } else {
      self.cellTooltip = function ( row, col ){
        return col.colDef.cellTooltip;
      };
    }

    /**
     * @ngdoc property
     * @name headerTooltip
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description Whether or not to show a tooltip when a user hovers over the header cell.
     * If set to false, no tooltip.  If true, the displayName is shown in the tooltip (useful
     * if you have long values in your headers), if a function then that function is called
     * passing in the row and the col `headerTooltip( col )`, and the return value is shown in the tooltip,
     * if a static string then shows that static string.
     * 
     * Defaults to false
     *
     */
    if ( typeof(colDef.headerTooltip) === 'undefined' || colDef.headerTooltip === false ) {
      self.headerTooltip = false;
    } else if ( colDef.headerTooltip === true ){
      self.headerTooltip = function(col) {
        return col.displayName;
      };
    } else if (typeof(colDef.headerTooltip) === 'function' ){
      self.headerTooltip = colDef.headerTooltip;
    } else {
      self.headerTooltip = function ( col ) {
        return col.colDef.headerTooltip;
      };
    }


    /**
     * @ngdoc property
     * @name footerCellClass
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description footerCellClass can be a string specifying the class to append to a cell
     * or it can be a function(row,rowRenderIndex, col, colRenderIndex) that returns a class name
     *
     */
    self.footerCellClass = colDef.footerCellClass;

    /**
     * @ngdoc property
     * @name cellClass
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description cellClass can be a string specifying the class to append to a cell
     * or it can be a function(row,rowRenderIndex, col, colRenderIndex) that returns a class name
     *
     */
    self.cellClass = colDef.cellClass;

    /**
     * @ngdoc property
     * @name headerCellClass
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description headerCellClass can be a string specifying the class to append to a cell
     * or it can be a function(row,rowRenderIndex, col, colRenderIndex) that returns a class name
     *
     */
    self.headerCellClass = colDef.headerCellClass;

    /**
     * @ngdoc property
     * @name cellFilter
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description cellFilter is a filter to apply to the content of each cell
     * @example
     * <pre>
     *   gridOptions.columnDefs[0].cellFilter = 'date'
     *
     */
    self.cellFilter = colDef.cellFilter ? colDef.cellFilter : "";

    /**
     * @ngdoc boolean
     * @name sortCellFiltered
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description (optional) False by default. When `true` uiGrid will apply the cellFilter before
     * sorting the data. Note that when using this option uiGrid will assume that the displayed value is
     * a string, and use the {@link ui.grid.class:RowSorter#sortAlpha sortAlpha} `sortFn`. It is possible
     * to return a non-string value from an angularjs filter, in which case you should define a {@link ui.grid.class:GridOptions.columnDef#sortingAlgorithm sortingAlgorithm}
     * for the column which hanldes the returned type. You may specify one of the `sortingAlgorithms`
     * found in the {@link ui.grid.RowSorter rowSorter} service.
     */
    self.sortCellFiltered = colDef.sortCellFiltered ? true : false;

    /**
     * @ngdoc boolean
     * @name filterCellFiltered
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description (optional) False by default. When `true` uiGrid will apply the cellFilter before
     * applying "search" `filters`.
     */
    self.filterCellFiltered = colDef.filterCellFiltered ? true : false;

    /**
     * @ngdoc property
     * @name headerCellFilter
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description headerCellFilter is a filter to apply to the content of the column header
     * @example
     * <pre>
     *   gridOptions.columnDefs[0].headerCellFilter = 'translate'
     *
     */
    self.headerCellFilter = colDef.headerCellFilter ? colDef.headerCellFilter : "";

    /**
     * @ngdoc property
     * @name footerCellFilter
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description footerCellFilter is a filter to apply to the content of the column footer
     * @example
     * <pre>
     *   gridOptions.columnDefs[0].footerCellFilter = 'date'
     *
     */
    self.footerCellFilter = colDef.footerCellFilter ? colDef.footerCellFilter : "";

    self.visible = gridUtil.isNullOrUndefined(colDef.visible) || colDef.visible;

    self.headerClass = colDef.headerClass;
    //self.cursor = self.sortable ? 'pointer' : 'default';

    // Turn on sorting by default
    self.enableSorting = typeof(colDef.enableSorting) !== 'undefined' ? colDef.enableSorting : true;
    self.sortingAlgorithm = colDef.sortingAlgorithm;

    /**
     * @ngdoc boolean
     * @name suppressRemoveSort
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description (optional) False by default. When enabled, this setting hides the removeSort option
     * in the menu, and prevents users from manually removing the sort
     */
    if ( typeof(self.suppressRemoveSort) === 'undefined'){
      self.suppressRemoveSort = typeof(colDef.suppressRemoveSort) !== 'undefined' ? colDef.suppressRemoveSort : false;
    }
    
    /**
     * @ngdoc property
     * @name enableFiltering
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description turn off filtering for an individual column, where
     * you've turned on filtering for the overall grid
     * @example
     * <pre>
     *   gridOptions.columnDefs[0].enableFiltering = false;
     *
     */
    // Turn on filtering by default (it's disabled by default at the Grid level)
    self.enableFiltering = typeof(colDef.enableFiltering) !== 'undefined' ? colDef.enableFiltering : true;

    // self.menuItems = colDef.menuItems;
    self.setPropertyOrDefault(colDef, 'menuItems', []);

    // Use the column definition sort if we were passed it, but only if this is a newly added column
    if ( isNew ){
      self.setPropertyOrDefault(colDef, 'sort');
    }

    // Set up default filters array for when one is not provided.
    //   In other words, this (in column def):
    //   
    //       filter: { term: 'something', flags: {}, condition: [CONDITION] }
    //       
    //   is just shorthand for this:
    //   
    //       filters: [{ term: 'something', flags: {}, condition: [CONDITION] }]
    //       
    var defaultFilters = [];
    if (colDef.filter) {
      defaultFilters.push(colDef.filter);
    }
    else if ( colDef.filters ){
      defaultFilters = colDef.filters;
    } else {
      // Add an empty filter definition object, which will
      // translate to a guessed condition and no pre-populated
      // value for the filter <input>.
      defaultFilters.push({});
    }

    /**
     * @ngdoc property
     * @name filter
     * @propertyOf ui.grid.class:GridOptions.columnDef
     * @description Specify a single filter field on this column.
     *
     * A filter consists of a condition, a term, and a placeholder:
     *
     * - condition defines how rows are chosen as matching the filter term. This can be set to
     * one of the constants in uiGridConstants.filter, or you can supply a custom filter function
     * that gets passed the following arguments: [searchTerm, cellValue, row, column].
     * - term: If set, the filter field will be pre-populated
     * with this value.
     * - placeholder: String that will be set to the `<input>.placeholder` attribute.
     * - noTerm: set this to true if you have defined a custom function in condition, and
     * your custom function doesn't require a term (so it can run even when the term is null)
     * - flags: only flag currently available is `caseSensitive`, set to false if you don't want
     * case sensitive matching
     * - type: defaults to uiGridConstants.filter.INPUT, which gives a text box.  If set to uiGridConstants.filter.SELECT
     * then a select box will be shown with options selectOptions
     * - selectOptions: options in the format `[ { value: 1, label: 'male' }]`.  No i18n filter is provided, you need
     * to perform the i18n on the values before you provide them
     * - disableCancelFilterButton: defaults to false. If set to true then the 'x' button that cancels/clears the filter
     * will not be shown.
     * @example
     * <pre>$scope.gridOptions.columnDefs = [
     *   {
     *     field: 'field1',
     *     filter: {
     *       term: 'xx',
     *       condition: uiGridConstants.filter.STARTS_WITH,
     *       placeholder: 'starts with...',
     *       flags: { caseSensitive: false },
     *       type: uiGridConstants.filter.SELECT,
     *       selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ],
     *       disableCancelFilterButton: true
     *     }
     *   }
     * ]; </pre>
     *
     */

    /*

  
    /*

      self.filters = [
        {
          term: 'search term'
          condition: uiGridConstants.filter.CONTAINS,
          placeholder: 'my placeholder',
          flags: {
            caseSensitive: true
          }
        }
      ]

    */

    // Only set filter if this is a newly added column, if we're updating an existing
    // column then we don't want to put the default filter back if the user may have already
    // removed it.
    // However, we do want to keep the settings if they change, just not the term
    if ( isNew ) {
      self.setPropertyOrDefault(colDef, 'filter');
      self.setPropertyOrDefault(colDef, 'filters', defaultFilters);
    } else if ( self.filters.length === defaultFilters.length ) {
      self.filters.forEach( function( filter, index ){
        if (typeof(defaultFilters[index].placeholder) !== 'undefined') {
          filter.placeholder = defaultFilters[index].placeholder;
        }
        if (typeof(defaultFilters[index].flags) !== 'undefined') {
          filter.flags = defaultFilters[index].flags;
        }
        if (typeof(defaultFilters[index].type) !== 'undefined') {
          filter.type = defaultFilters[index].type;
        }
        if (typeof(defaultFilters[index].selectOptions) !== 'undefined') {
          filter.selectOptions = defaultFilters[index].selectOptions;
        }
      });
    }

    // Remove this column from the grid sorting, include inside build columns so has
    // access to self - all seems a bit dodgy but doesn't work otherwise so have left
    // as is
    GridColumn.prototype.unsort = function () {
      this.sort = {};
      self.grid.api.core.raise.sortChanged( self.grid, self.grid.getColumnSorting() );
    };
  
  };


  /**
   * @ngdoc function
   * @name getColClass
   * @methodOf ui.grid.class:GridColumn
   * @description Returns the class name for the column
   * @param {bool} prefixDot  if true, will return .className instead of className
   */
  GridColumn.prototype.getColClass = function (prefixDot) {
    var cls = uiGridConstants.COL_CLASS_PREFIX + this.uid;

    return prefixDot ? '.' + cls : cls;
  };

    /**
     * @ngdoc function
     * @name isPinnedLeft
     * @methodOf ui.grid.class:GridColumn
     * @description Returns true if column is in the left render container
     */
    GridColumn.prototype.isPinnedLeft = function () {
      return this.renderContainer === 'left';
    };

    /**
     * @ngdoc function
     * @name isPinnedRight
     * @methodOf ui.grid.class:GridColumn
     * @description Returns true if column is in the right render container
     */
    GridColumn.prototype.isPinnedRight = function () {
      return this.renderContainer === 'right';
    };


    /**
   * @ngdoc function
   * @name getColClassDefinition
   * @methodOf ui.grid.class:GridColumn
   * @description Returns the class definition for th column
   */
  GridColumn.prototype.getColClassDefinition = function () {
    return ' .grid' + this.grid.id + ' ' + this.getColClass(true) + ' { min-width: ' + this.drawnWidth + 'px; max-width: ' + this.drawnWidth + 'px; }';
  };

  /**
   * @ngdoc function
   * @name getRenderContainer
   * @methodOf ui.grid.class:GridColumn
   * @description Returns the render container object that this column belongs to.
   *
   * Columns will be default be in the `body` render container if they aren't allocated to one specifically.
   */
  GridColumn.prototype.getRenderContainer = function getRenderContainer() {
    var self = this;

    var containerId = self.renderContainer;

    if (containerId === null || containerId === '' || containerId === undefined) {
      containerId = 'body';
    }

    return self.grid.renderContainers[containerId];
  };

  /**
   * @ngdoc function
   * @name showColumn
   * @methodOf ui.grid.class:GridColumn
   * @description Makes the column visible by setting colDef.visible = true
   */
  GridColumn.prototype.showColumn = function() {
      this.colDef.visible = true;
  };


  /** 
   * @ngdoc property
   * @name aggregationHideLabel
   * @propertyOf ui.grid.class:GridOptions.columnDef
   * @description defaults to false, if set to true hides the label text
   * in the aggregation footer, so only the value is displayed.
   *
   */
  /**
   * @ngdoc function
   * @name getAggregationText
   * @methodOf ui.grid.class:GridColumn
   * @description Gets the aggregation label from colDef.aggregationLabel if
   * specified or by using i18n, including deciding whether or not to display
   * based on colDef.aggregationHideLabel.
   *
   * @param {string} label the i18n lookup value to use for the column label
   * 
   */
  GridColumn.prototype.getAggregationText = function () {
    var self = this;
    if ( self.colDef.aggregationHideLabel ){
      return '';
    }
    else if ( self.colDef.aggregationLabel ) {
      return self.colDef.aggregationLabel;
    }
    else {
      switch ( self.colDef.aggregationType ){
        case uiGridConstants.aggregationTypes.count:
          return i18nService.getSafeText('aggregation.count');
        case uiGridConstants.aggregationTypes.sum:
          return i18nService.getSafeText('aggregation.sum');
        case uiGridConstants.aggregationTypes.avg:
          return i18nService.getSafeText('aggregation.avg');
        case uiGridConstants.aggregationTypes.min:
          return i18nService.getSafeText('aggregation.min');
        case uiGridConstants.aggregationTypes.max:
          return i18nService.getSafeText('aggregation.max');
        default:
          return '';
      }
    }
  };

  GridColumn.prototype.getCellTemplate = function () {
    var self = this;

    return self.cellTemplatePromise;
  };

  GridColumn.prototype.getCompiledElementFn = function () {
    var self = this;

    return self.compiledElementFnDefer.promise;
  };

  return GridColumn;
}]);

})();

  (function(){

angular.module('ui.grid')
.factory('GridOptions', ['gridUtil','uiGridConstants', function(gridUtil,uiGridConstants) {

  /**
   * @ngdoc function
   * @name ui.grid.class:GridOptions
   * @description Default GridOptions class.  GridOptions are defined by the application developer and overlaid
   * over this object.  Setting gridOptions within your controller is the most common method for an application
   * developer to configure the behaviour of their ui-grid
   *
   * @example To define your gridOptions within your controller:
   * <pre>$scope.gridOptions = {
   *   data: $scope.myData,
   *   columnDefs: [
   *     { name: 'field1', displayName: 'pretty display name' },
   *     { name: 'field2', visible: false }
   *  ]
   * };</pre>
   *
   * You can then use this within your html template, when you define your grid:
   * <pre>&lt;div ui-grid="gridOptions"&gt;&lt;/div&gt;</pre>
   *
   * To provide default options for all of the grids within your application, use an angular
   * decorator to modify the GridOptions factory.
   * <pre>
   * app.config(function($provide){
   *   $provide.decorator('GridOptions',function($delegate){
   *     var gridOptions;
   *     gridOptions = angular.copy($delegate);
   *     gridOptions.initialize = function(options) {
   *       var initOptions;
   *       initOptions = $delegate.initialize(options);
   *       initOptions.enableColumnMenus = false;
   *       return initOptions;
   *     };
   *     return gridOptions;
   *   });
   * });
   * </pre>
   */
  return {
    initialize: function( baseOptions ){
      /**
       * @ngdoc function
       * @name onRegisterApi
       * @propertyOf ui.grid.class:GridOptions
       * @description A callback that returns the gridApi once the grid is instantiated, which is
       * then used to interact with the grid programatically.
       *
       * Note that the gridApi.core.renderingComplete event is identical to this
       * callback, but has the advantage that it can be called from multiple places
       * if needed
       *
       * @example
       * <pre>
       *   $scope.gridOptions.onRegisterApi = function ( gridApi ) {
       *     $scope.gridApi = gridApi;
       *     $scope.gridApi.selection.selectAllRows( $scope.gridApi.grid );
       *   };
       * </pre>
       *
       */
      baseOptions.onRegisterApi = baseOptions.onRegisterApi || angular.noop();

      /**
       * @ngdoc object
       * @name data
       * @propertyOf ui.grid.class:GridOptions
       * @description (mandatory) Array of data to be rendered into the grid, providing the data source or data binding for
       * the grid.
       *
       * Most commonly the data is an array of objects, where each object has a number of attributes.
       * Each attribute automatically becomes a column in your grid.  This array could, for example, be sourced from
       * an angularJS $resource query request.  The array can also contain complex objects, refer the binding tutorial
       * for examples of that.
       *
       * The most flexible usage is to set your data on $scope:
       *
       * `$scope.data = data;`
       *
       * And then direct the grid to resolve whatever is in $scope.data:
       *
       * `$scope.gridOptions.data = 'data';`
       *
       * This is the most flexible approach as it allows you to replace $scope.data whenever you feel like it without
       * getting pointer issues.
       *
       * Alternatively you can directly set the data array:
       *
       * `$scope.gridOptions.data = [ ];`
       * or
       *
       * `$http.get('/data/100.json')
       * .success(function(data) {
       *   $scope.myData = data;
       *   $scope.gridOptions.data = $scope.myData;
       *  });`
       *
       * Where you do this, you need to take care in updating the data - you can't just update `$scope.myData` to some other
       * array, you need to update $scope.gridOptions.data to point to that new array as well.
       *
       */
      baseOptions.data = baseOptions.data || [];

      /**
       * @ngdoc array
       * @name columnDefs
       * @propertyOf  ui.grid.class:GridOptions
       * @description Array of columnDef objects.  Only required property is name.
       * The individual options available in columnDefs are documented in the
       * {@link ui.grid.class:GridOptions.columnDef columnDef} section
       * </br>_field property can be used in place of name for backwards compatibility with 2.x_
       *  @example
       *
       * <pre>var columnDefs = [{name:'field1'}, {name:'field2'}];</pre>
       *
       */
      baseOptions.columnDefs = baseOptions.columnDefs || [];

      /**
       * @ngdoc object
       * @name ui.grid.class:GridOptions.columnDef
       * @description Definition / configuration of an individual column, which would typically be
       * one of many column definitions within the gridOptions.columnDefs array
       * @example
       * <pre>{name:'field1', field: 'field1', filter: { term: 'xxx' }}</pre>
       *
       */


      /**
       * @ngdoc array
       * @name excludeProperties
       * @propertyOf  ui.grid.class:GridOptions
       * @description Array of property names in data to ignore when auto-generating column names.  Provides the
       * inverse of columnDefs - columnDefs is a list of columns to include, excludeProperties is a list of columns
       * to exclude.
       *
       * If columnDefs is defined, this will be ignored.
       *
       * Defaults to ['$$hashKey']
       */

      baseOptions.excludeProperties = baseOptions.excludeProperties || ['$$hashKey'];

      /**
       * @ngdoc boolean
       * @name enableRowHashing
       * @propertyOf ui.grid.class:GridOptions
       * @description True by default. When enabled, this setting allows uiGrid to add
       * `$$hashKey`-type properties (similar to Angular) to elements in the `data` array. This allows
       * the grid to maintain state while vastly speeding up the process of altering `data` by adding/moving/removing rows.
       *
       * Note that this DOES add properties to your data that you may not want, but they are stripped out when using `angular.toJson()`. IF
       * you do not want this at all you can disable this setting but you will take a performance hit if you are using large numbers of rows
       * and are altering the data set often.
       */
      baseOptions.enableRowHashing = baseOptions.enableRowHashing !== false;

      /**
       * @ngdoc function
       * @name rowIdentity
       * @methodOf ui.grid.class:GridOptions
       * @description This function is used to get and, if necessary, set the value uniquely identifying this row (i.e. if an identity is not present it will set one).
       *
       * By default it returns the `$$hashKey` property if it exists. If it doesn't it uses gridUtil.nextUid() to generate one
       */
      baseOptions.rowIdentity = baseOptions.rowIdentity || function rowIdentity(row) {
        return gridUtil.hashKey(row);
      };

      /**
       * @ngdoc function
       * @name getRowIdentity
       * @methodOf ui.grid.class:GridOptions
       * @description This function returns the identity value uniquely identifying this row, if one is not present it does not set it.
       *
       * By default it returns the `$$hashKey` property but can be overridden to use any property or set of properties you want.
       */
      baseOptions.getRowIdentity = baseOptions.getRowIdentity || function getRowIdentity(row) {
        return row.$$hashKey;
      };

      /**
       * @ngdoc property
       * @name flatEntityAccess
       * @propertyOf ui.grid.class:GridOptions
       * @description Set to true if your columns are all related directly to fields in a flat object structure - i.e.
       * each of your columns associate directly with a propery one each of the entities in your data array.
       *
       * In that situation we can avoid all the logic associated with complex binding to functions or to properties of sub-objects,
       * which can provide a significant speed improvement with large data sets, with filtering and with sorting.
       *
       * By default false
       */
      baseOptions.flatEntityAccess = baseOptions.flatEntityAccess === true;

      /**
       * @ngdoc property
       * @name showHeader
       * @propertyOf ui.grid.class:GridOptions
       * @description True by default. When set to false, this setting will replace the
       * standard header template with '<div></div>', resulting in no header being shown.
       */
      baseOptions.showHeader = typeof(baseOptions.showHeader) !== "undefined" ? baseOptions.showHeader : true;

      /* (NOTE): Don't show this in the docs. We only use it internally
       * @ngdoc property
       * @name headerRowHeight
       * @propertyOf ui.grid.class:GridOptions
       * @description The height of the header in pixels, defaults to 30
       *
       */
      if (!baseOptions.showHeader) {
        baseOptions.headerRowHeight = 0;
      }
      else {
        baseOptions.headerRowHeight = typeof(baseOptions.headerRowHeight) !== "undefined" ? baseOptions.headerRowHeight : 30;
      }

      /**
       * @ngdoc property
       * @name rowHeight
       * @propertyOf ui.grid.class:GridOptions
       * @description The height of the row in pixels, defaults to 30
       *
       */
      baseOptions.rowHeight = baseOptions.rowHeight || 30;

      /**
       * @ngdoc integer
       * @name minRowsToShow
       * @propertyOf ui.grid.class:GridOptions
       * @description Minimum number of rows to show when the grid doesn't have a defined height. Defaults to "10".
       */
      baseOptions.minRowsToShow = typeof(baseOptions.minRowsToShow) !== "undefined" ? baseOptions.minRowsToShow : 10;

      /**
       * @ngdoc property
       * @name showGridFooter
       * @propertyOf ui.grid.class:GridOptions
       * @description Whether or not to show the footer, defaults to false
       * The footer display Total Rows and Visible Rows (filtered rows)
       */
      baseOptions.showGridFooter = baseOptions.showGridFooter === true;

      /**
       * @ngdoc property
       * @name showColumnFooter
       * @propertyOf ui.grid.class:GridOptions
       * @description Whether or not to show the column footer, defaults to false
       * The column footer displays column aggregates
       */
      baseOptions.showColumnFooter = baseOptions.showColumnFooter === true;

      /**
       * @ngdoc property
       * @name columnFooterHeight
       * @propertyOf ui.grid.class:GridOptions
       * @description The height of the footer rows (column footer and grid footer) in pixels
       *
       */
      baseOptions.columnFooterHeight = typeof(baseOptions.columnFooterHeight) !== "undefined" ? baseOptions.columnFooterHeight : 30;
      baseOptions.gridFooterHeight = typeof(baseOptions.gridFooterHeight) !== "undefined" ? baseOptions.gridFooterHeight : 30;

      baseOptions.columnWidth = typeof(baseOptions.columnWidth) !== "undefined" ? baseOptions.columnWidth : 50;

      /**
       * @ngdoc property
       * @name maxVisibleColumnCount
       * @propertyOf ui.grid.class:GridOptions
       * @description Defaults to 200
       *
       */
      baseOptions.maxVisibleColumnCount = typeof(baseOptions.maxVisibleColumnCount) !== "undefined" ? baseOptions.maxVisibleColumnCount : 200;

      /**
       * @ngdoc property
       * @name virtualizationThreshold
       * @propertyOf ui.grid.class:GridOptions
       * @description Turn virtualization on when number of data elements goes over this number, defaults to 20
       */
      baseOptions.virtualizationThreshold = typeof(baseOptions.virtualizationThreshold) !== "undefined" ? baseOptions.virtualizationThreshold : 20;

      /**
       * @ngdoc property
       * @name columnVirtualizationThreshold
       * @propertyOf ui.grid.class:GridOptions
       * @description Turn virtualization on when number of columns goes over this number, defaults to 10
       */
      baseOptions.columnVirtualizationThreshold = typeof(baseOptions.columnVirtualizationThreshold) !== "undefined" ? baseOptions.columnVirtualizationThreshold : 10;

      /**
       * @ngdoc property
       * @name excessRows
       * @propertyOf ui.grid.class:GridOptions
       * @description Extra rows to to render outside of the viewport, which helps with smoothness of scrolling.
       * Defaults to 4
       */
      baseOptions.excessRows = typeof(baseOptions.excessRows) !== "undefined" ? baseOptions.excessRows : 4;
      /**
       * @ngdoc property
       * @name scrollThreshold
       * @propertyOf ui.grid.class:GridOptions
       * @description Defaults to 4
       */
      baseOptions.scrollThreshold = typeof(baseOptions.scrollThreshold) !== "undefined" ? baseOptions.scrollThreshold : 4;

      /**
       * @ngdoc property
       * @name excessColumns
       * @propertyOf ui.grid.class:GridOptions
       * @description Extra columns to to render outside of the viewport, which helps with smoothness of scrolling.
       * Defaults to 4
       */
      baseOptions.excessColumns = typeof(baseOptions.excessColumns) !== "undefined" ? baseOptions.excessColumns : 4;
      /**
       * @ngdoc property
       * @name horizontalScrollThreshold
       * @propertyOf ui.grid.class:GridOptions
       * @description Defaults to 4
       */
      baseOptions.horizontalScrollThreshold = typeof(baseOptions.horizontalScrollThreshold) !== "undefined" ? baseOptions.horizontalScrollThreshold : 2;


      /**
       * @ngdoc property
       * @name aggregationCalcThrottle
       * @propertyOf ui.grid.class:GridOptions
       * @description Default time in milliseconds to throttle aggregation calcuations, defaults to 500ms
       */
      baseOptions.aggregationCalcThrottle = typeof(baseOptions.aggregationCalcThrottle) !== "undefined" ? baseOptions.aggregationCalcThrottle : 500;

      /**
       * @ngdoc property
       * @name wheelScrollThrottle
       * @propertyOf ui.grid.class:GridOptions
       * @description Default time in milliseconds to throttle scroll events to, defaults to 70ms
       */
      baseOptions.wheelScrollThrottle = typeof(baseOptions.wheelScrollThrottle) !== "undefined" ? baseOptions.wheelScrollThrottle : 70;


      /**
       * @ngdoc property
       * @name scrollDebounce
       * @propertyOf ui.grid.class:GridOptions
       * @description Default time in milliseconds to debounce scroll events, defaults to 300ms
       */
      baseOptions.scrollDebounce = typeof(baseOptions.scrollDebounce) !== "undefined" ? baseOptions.scrollDebounce : 300;

      /**
       * @ngdoc boolean
       * @name enableSorting
       * @propertyOf ui.grid.class:GridOptions
       * @description True by default. When enabled, this setting adds sort
       * widgets to the column headers, allowing sorting of the data for the entire grid.
       * Sorting can then be disabled on individual columns using the columnDefs.
       */
      baseOptions.enableSorting = baseOptions.enableSorting !== false;

      /**
       * @ngdoc boolean
       * @name enableFiltering
       * @propertyOf ui.grid.class:GridOptions
       * @description False by default. When enabled, this setting adds filter
       * boxes to each column header, allowing filtering within the column for the entire grid.
       * Filtering can then be disabled on individual columns using the columnDefs.
       */
      baseOptions.enableFiltering = baseOptions.enableFiltering === true;

      /**
       * @ngdoc boolean
       * @name enableColumnMenus
       * @propertyOf ui.grid.class:GridOptions
       * @description True by default. When enabled, this setting displays a column
       * menu within each column.
       */
      baseOptions.enableColumnMenus = baseOptions.enableColumnMenus !== false;

      /**
       * @ngdoc boolean
       * @name enableVerticalScrollbar
       * @propertyOf ui.grid.class:GridOptions
       * @description uiGridConstants.scrollbars.ALWAYS by default. This settings controls the vertical scrollbar for the grid.
       * Supported values: uiGridConstants.scrollbars.ALWAYS, uiGridConstants.scrollbars.NEVER
       */
      baseOptions.enableVerticalScrollbar = typeof(baseOptions.enableVerticalScrollbar) !== "undefined" ? baseOptions.enableVerticalScrollbar : uiGridConstants.scrollbars.ALWAYS;

      /**
       * @ngdoc boolean
       * @name enableHorizontalScrollbar
       * @propertyOf ui.grid.class:GridOptions
       * @description uiGridConstants.scrollbars.ALWAYS by default. This settings controls the horizontal scrollbar for the grid.
       * Supported values: uiGridConstants.scrollbars.ALWAYS, uiGridConstants.scrollbars.NEVER
       */
      baseOptions.enableHorizontalScrollbar = typeof(baseOptions.enableHorizontalScrollbar) !== "undefined" ? baseOptions.enableHorizontalScrollbar : uiGridConstants.scrollbars.ALWAYS;

      /**
       * @ngdoc boolean
       * @name enableMinHeightCheck
       * @propertyOf ui.grid.class:GridOptions
       * @description True by default. When enabled, a newly initialized grid will check to see if it is tall enough to display
       * at least one row of data.  If the grid is not tall enough, it will resize the DOM element to display minRowsToShow number
       * of rows.
       */
       baseOptions.enableMinHeightCheck = baseOptions.enableMinHeightCheck !== false;

      /**
       * @ngdoc boolean
       * @name minimumColumnSize
       * @propertyOf ui.grid.class:GridOptions
       * @description Columns can't be smaller than this, defaults to 10 pixels
       */
      baseOptions.minimumColumnSize = typeof(baseOptions.minimumColumnSize) !== "undefined" ? baseOptions.minimumColumnSize : 10;

      /**
       * @ngdoc function
       * @name rowEquality
       * @methodOf ui.grid.class:GridOptions
       * @description By default, rows are compared using object equality.  This option can be overridden
       * to compare on any data item property or function
       * @param {object} entityA First Data Item to compare
       * @param {object} entityB Second Data Item to compare
       */
      baseOptions.rowEquality = baseOptions.rowEquality || function(entityA, entityB) {
        return entityA === entityB;
      };

      /**
       * @ngdoc string
       * @name headerTemplate
       * @propertyOf ui.grid.class:GridOptions
       * @description Null by default. When provided, this setting uses a custom header
       * template, rather than the default template. Can be set to either the name of a template file:
       * <pre>  $scope.gridOptions.headerTemplate = 'header_template.html';</pre>
       * inline html
       * <pre>  $scope.gridOptions.headerTemplate = '<div class="ui-grid-top-panel" style="text-align: center">I am a Custom Grid Header</div>'</pre>
       * or the id of a precompiled template (TBD how to use this).
       * </br>Refer to the custom header tutorial for more information.
       * If you want no header at all, you can set to an empty div:
       * <pre>  $scope.gridOptions.headerTemplate = '<div></div>';</pre>
       *
       * If you want to only have a static header, then you can set to static content.  If
       * you want to tailor the existing column headers, then you should look at the
       * current 'ui-grid-header.html' template in github as your starting point.
       *
       */
      baseOptions.headerTemplate = baseOptions.headerTemplate || null;

      /**
       * @ngdoc string
       * @name footerTemplate
       * @propertyOf ui.grid.class:GridOptions
       * @description (optional) ui-grid/ui-grid-footer by default.  This footer shows the per-column
       * aggregation totals.
       * When provided, this setting uses a custom footer template. Can be set to either the name of a template file 'footer_template.html', inline html
       * <pre>'<div class="ui-grid-bottom-panel" style="text-align: center">I am a Custom Grid Footer</div>'</pre>, or the id
       * of a precompiled template (TBD how to use this).  Refer to the custom footer tutorial for more information.
       */
      baseOptions.footerTemplate = baseOptions.footerTemplate || 'ui-grid/ui-grid-footer';

      /**
       * @ngdoc string
       * @name gridFooterTemplate
       * @propertyOf ui.grid.class:GridOptions
       * @description (optional) ui-grid/ui-grid-grid-footer by default. This template by default shows the
       * total items at the bottom of the grid, and the selected items if selection is enabled.
       */
      baseOptions.gridFooterTemplate = baseOptions.gridFooterTemplate || 'ui-grid/ui-grid-grid-footer';

      /**
       * @ngdoc string
       * @name rowTemplate
       * @propertyOf ui.grid.class:GridOptions
       * @description 'ui-grid/ui-grid-row' by default. When provided, this setting uses a
       * custom row template.  Can be set to either the name of a template file:
       * <pre> $scope.gridOptions.rowTemplate = 'row_template.html';</pre>
       * inline html
       * <pre>  $scope.gridOptions.rowTemplate = '<div style="background-color: aquamarine" ng-click="grid.appScope.fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>';</pre>
       * or the id of a precompiled template (TBD how to use this) can be provided.
       * </br>Refer to the custom row template tutorial for more information.
       */
      baseOptions.rowTemplate = baseOptions.rowTemplate || 'ui-grid/ui-grid-row';

      /**
       * @ngdoc object
       * @name appScopeProvider
       * @propertyOf ui.grid.class:GridOptions
       * @description by default, the parent scope of the ui-grid element will be assigned to grid.appScope
       * this property allows you to assign any reference you want to grid.appScope
       */
      baseOptions.appScopeProvider = baseOptions.appScopeProvider || null;

      return baseOptions;
    }
  };


}]);

})();

(function(){

angular.module('ui.grid')

  /**
   * @ngdoc function
   * @name ui.grid.class:GridRenderContainer
   * @description The grid has render containers, allowing the ability to have pinned columns.  If the grid
   * is right-to-left then there may be a right render container, if left-to-right then there may
   * be a left render container.  There is always a body render container.
   * @param {string} name The name of the render container ('body', 'left', or 'right')
   * @param {Grid} grid the grid the render container is in
   * @param {object} options the render container options
   */
.factory('GridRenderContainer', ['gridUtil', 'uiGridConstants', function(gridUtil, uiGridConstants) {
  function GridRenderContainer(name, grid, options) {
    var self = this;

    // if (gridUtil.type(grid) !== 'Grid') {
    //   throw new Error('Grid argument is not a Grid object');
    // }

    self.name = name;

    self.grid = grid;

    // self.rowCache = [];
    // self.columnCache = [];

    self.visibleRowCache = [];
    self.visibleColumnCache = [];

    self.renderedRows = [];
    self.renderedColumns = [];

    self.prevScrollTop = 0;
    self.prevScrolltopPercentage = 0;
    self.prevRowScrollIndex = 0;

    self.prevScrollLeft = 0;
    self.prevScrollleftPercentage = 0;
    self.prevColumnScrollIndex = 0;

    self.columnStyles = "";

    self.viewportAdjusters = [];

    /**
     *  @ngdoc boolean
     *  @name hasHScrollbar
     *  @propertyOf  ui.grid.class:GridRenderContainer
     *  @description flag to signal that container has a horizontal scrollbar
     */
    self.hasHScrollbar = false;

    /**
     *  @ngdoc boolean
     *  @name hasHScrollbar
     *  @propertyOf  ui.grid.class:GridRenderContainer
     *  @description flag to signal that container has a vertical scrollbar
     */
    self.hasVScrollbar = false;

    /**
     *  @ngdoc boolean
     *  @name canvasHeightShouldUpdate
     *  @propertyOf  ui.grid.class:GridRenderContainer
     *  @description flag to signal that container should recalculate the canvas size
     */
    self.canvasHeightShouldUpdate = true;

    /**
     *  @ngdoc boolean
     *  @name canvasHeight
     *  @propertyOf  ui.grid.class:GridRenderContainer
     *  @description last calculated canvas height value
     */
    self.$$canvasHeight = 0;

    if (options && angular.isObject(options)) {
      angular.extend(self, options);
    }

    grid.registerStyleComputation({
      priority: 5,
      func: function () {
        self.updateColumnWidths();
        return self.columnStyles;
      }
    });
  }


  GridRenderContainer.prototype.reset = function reset() {
    // this.rowCache.length = 0;
    // this.columnCache.length = 0;

    this.visibleColumnCache.length = 0;
    this.visibleRowCache.length = 0;

    this.renderedRows.length = 0;
    this.renderedColumns.length = 0;
  };

  // TODO(c0bra): calculate size?? Should this be in a stackable directive?


  GridRenderContainer.prototype.containsColumn = function (col) {
     return this.visibleColumnCache.indexOf(col) !== -1;
  };

  GridRenderContainer.prototype.minRowsToRender = function minRowsToRender() {
    var self = this;
    var minRows = 0;
    var rowAddedHeight = 0;
    var viewPortHeight = self.getViewportHeight();
    for (var i = self.visibleRowCache.length - 1; rowAddedHeight < viewPortHeight && i >= 0; i--) {
      rowAddedHeight += self.visibleRowCache[i].height;
      minRows++;
    }
    return minRows;
  };

  GridRenderContainer.prototype.minColumnsToRender = function minColumnsToRender() {
    var self = this;
    var viewportWidth = this.getViewportWidth();

    var min = 0;
    var totalWidth = 0;
    // self.columns.forEach(function(col, i) {
    for (var i = 0; i < self.visibleColumnCache.length; i++) {
      var col = self.visibleColumnCache[i];

      if (totalWidth < viewportWidth) {
        totalWidth += col.drawnWidth ? col.drawnWidth : 0;
        min++;
      }
      else {
        var currWidth = 0;
        for (var j = i; j >= i - min; j--) {
          currWidth += self.visibleColumnCache[j].drawnWidth ? self.visibleColumnCache[j].drawnWidth : 0;
        }
        if (currWidth < viewportWidth) {
          min++;
        }
      }
    }

    return min;
  };

  GridRenderContainer.prototype.getVisibleRowCount = function getVisibleRowCount() {
    return this.visibleRowCache.length;
  };

  /**
   * @ngdoc function
   * @name registerViewportAdjuster
   * @methodOf ui.grid.class:GridRenderContainer
   * @description Registers an adjuster to the render container's available width or height.  Adjusters are used
   * to tell the render container that there is something else consuming space, and to adjust it's size
   * appropriately.
   * @param {function} func the adjuster function we want to register
   */

  GridRenderContainer.prototype.registerViewportAdjuster = function registerViewportAdjuster(func) {
    this.viewportAdjusters.push(func);
  };

  /**
   * @ngdoc function
   * @name removeViewportAdjuster
   * @methodOf ui.grid.class:GridRenderContainer
   * @description Removes an adjuster, should be used when your element is destroyed
   * @param {function} func the adjuster function we want to remove
   */
  GridRenderContainer.prototype.removeViewportAdjuster = function registerViewportAdjuster(func) {
    var idx = this.viewportAdjusters.indexOf(func);

    if (typeof(idx) !== 'undefined' && idx !== undefined) {
      this.viewportAdjusters.splice(idx, 1);
    }
  };

  /**
   * @ngdoc function
   * @name getViewportAdjustment
   * @methodOf ui.grid.class:GridRenderContainer
   * @description Gets the adjustment based on the viewportAdjusters.
   * @returns {object} a hash of { height: x, width: y }.  Usually the values will be negative
   */
  GridRenderContainer.prototype.getViewportAdjustment = function getViewportAdjustment() {
    var self = this;

    var adjustment = { height: 0, width: 0 };

    self.viewportAdjusters.forEach(function (func) {
      adjustment = func.call(this, adjustment);
    });

    return adjustment;
  };

  GridRenderContainer.prototype.getMargin = function getMargin(side) {
    var self = this;

    var amount = 0;

    self.viewportAdjusters.forEach(function (func) {
      var adjustment = func.call(this, { height: 0, width: 0 });

      if (adjustment.side && adjustment.side === side) {
        amount += adjustment.width * -1;
      }
    });

    return amount;
  };

  GridRenderContainer.prototype.getViewportHeight = function getViewportHeight() {
    var self = this;

    var headerHeight = (self.headerHeight) ? self.headerHeight : self.grid.headerHeight;

    var viewPortHeight = self.grid.gridHeight - headerHeight - self.grid.footerHeight;


    var adjustment = self.getViewportAdjustment();

    viewPortHeight = viewPortHeight + adjustment.height;

    return viewPortHeight;
  };

  GridRenderContainer.prototype.getViewportWidth = function getViewportWidth() {
    var self = this;

    var viewportWidth = self.grid.gridWidth;

    //if (typeof(self.grid.verticalScrollbarWidth) !== 'undefined' && self.grid.verticalScrollbarWidth !== undefined && self.grid.verticalScrollbarWidth > 0) {
    //  viewPortWidth = viewPortWidth - self.grid.verticalScrollbarWidth;
    //}

    // var viewportWidth = 0;\
    // self.visibleColumnCache.forEach(function (column) {
    //   viewportWidth += column.drawnWidth;
    // });

    var adjustment = self.getViewportAdjustment();

    viewportWidth = viewportWidth + adjustment.width;

    return viewportWidth;
  };

  GridRenderContainer.prototype.getHeaderViewportWidth = function getHeaderViewportWidth() {
    var self = this;

    var viewportWidth = this.getViewportWidth();

    //if (typeof(self.grid.verticalScrollbarWidth) !== 'undefined' && self.grid.verticalScrollbarWidth !== undefined && self.grid.verticalScrollbarWidth > 0) {
    //  viewPortWidth = viewPortWidth + self.grid.verticalScrollbarWidth;
    //}

    // var adjustment = self.getViewportAdjustment();
    // viewPortWidth = viewPortWidth + adjustment.width;

    return viewportWidth;
  };


  /**
   * @ngdoc function
   * @name getCanvasHeight
   * @methodOf ui.grid.class:GridRenderContainer
   * @description Returns the total canvas height.   Only recalculates if canvasHeightShouldUpdate = false
   * @returns {number} total height of all the visible rows in the container
   */
  GridRenderContainer.prototype.getCanvasHeight = function getCanvasHeight() {
    var self = this;

    if (!self.canvasHeightShouldUpdate) {
      return self.$$canvasHeight;
    }

    var oldCanvasHeight = self.$$canvasHeight;

    self.$$canvasHeight =  0;

    self.visibleRowCache.forEach(function(row){
      self.$$canvasHeight += row.height;
    });


    self.canvasHeightShouldUpdate = false;

    self.grid.api.core.raise.canvasHeightChanged(oldCanvasHeight, self.$$canvasHeight);

    return self.$$canvasHeight;
  };

  GridRenderContainer.prototype.getVerticalScrollLength = function getVerticalScrollLength() {
    return this.getCanvasHeight() - this.getViewportHeight() + this.grid.scrollbarHeight;
  };

  GridRenderContainer.prototype.getCanvasWidth = function getCanvasWidth() {
    var self = this;

    var ret = self.canvasWidth;

    return ret;
  };

  GridRenderContainer.prototype.setRenderedRows = function setRenderedRows(newRows) {
    this.renderedRows.length = newRows.length;
    for (var i = 0; i < newRows.length; i++) {
      this.renderedRows[i] = newRows[i];
    }
  };

  GridRenderContainer.prototype.setRenderedColumns = function setRenderedColumns(newColumns) {
    var self = this;

    // OLD:
    this.renderedColumns.length = newColumns.length;
    for (var i = 0; i < newColumns.length; i++) {
      this.renderedColumns[i] = newColumns[i];
    }

    this.updateColumnOffset();
  };

  GridRenderContainer.prototype.updateColumnOffset = function updateColumnOffset() {
    // Calculate the width of the columns on the left side that are no longer rendered.
    //  That will be the offset for the columns as we scroll horizontally.
    var hiddenColumnsWidth = 0;
    for (var i = 0; i < this.currentFirstColumn; i++) {
      hiddenColumnsWidth += this.visibleColumnCache[i].drawnWidth;
    }

    this.columnOffset = hiddenColumnsWidth;
  };

  GridRenderContainer.prototype.scrollVertical = function (newScrollTop) {
    var vertScrollPercentage = -1;

    if (newScrollTop !== this.prevScrollTop) {
      var yDiff = newScrollTop - this.prevScrollTop;

      if (yDiff > 0 ) { this.grid.scrollDirection = uiGridConstants.scrollDirection.DOWN; }
      if (yDiff < 0 ) { this.grid.scrollDirection = uiGridConstants.scrollDirection.UP; }

      var vertScrollLength = this.getVerticalScrollLength();

      vertScrollPercentage = newScrollTop / vertScrollLength;

      // console.log('vert', vertScrollPercentage, newScrollTop, vertScrollLength);

      if (vertScrollPercentage > 1) { vertScrollPercentage = 1; }
      if (vertScrollPercentage < 0) { vertScrollPercentage = 0; }

      this.adjustScrollVertical(newScrollTop, vertScrollPercentage);
      return vertScrollPercentage;
    }
  };

  GridRenderContainer.prototype.scrollHorizontal = function(newScrollLeft){
    var horizScrollPercentage = -1;

    // Handle RTL here

    if (newScrollLeft !== this.prevScrollLeft) {
      var xDiff = newScrollLeft - this.prevScrollLeft;

      if (xDiff > 0) { this.grid.scrollDirection = uiGridConstants.scrollDirection.RIGHT; }
      if (xDiff < 0) { this.grid.scrollDirection = uiGridConstants.scrollDirection.LEFT; }

      var horizScrollLength = (this.canvasWidth - this.getViewportWidth());
      if (horizScrollLength !== 0) {
        horizScrollPercentage = newScrollLeft / horizScrollLength;
      }
      else {
        horizScrollPercentage = 0;
      }

      this.adjustScrollHorizontal(newScrollLeft, horizScrollPercentage);
      return horizScrollPercentage;
    }
  };

  GridRenderContainer.prototype.adjustScrollVertical = function adjustScrollVertical(scrollTop, scrollPercentage, force) {
    if (this.prevScrollTop === scrollTop && !force) {
      return;
    }

    if (typeof(scrollTop) === 'undefined' || scrollTop === undefined || scrollTop === null) {
      scrollTop = (this.getCanvasHeight() - this.getViewportHeight()) * scrollPercentage;
    }

    this.adjustRows(scrollTop, scrollPercentage, false);

    this.prevScrollTop = scrollTop;
    this.prevScrolltopPercentage = scrollPercentage;

    this.grid.queueRefresh();
  };

  GridRenderContainer.prototype.adjustScrollHorizontal = function adjustScrollHorizontal(scrollLeft, scrollPercentage, force) {
    if (this.prevScrollLeft === scrollLeft && !force) {
      return;
    }

    if (typeof(scrollLeft) === 'undefined' || scrollLeft === undefined || scrollLeft === null) {
      scrollLeft = (this.getCanvasWidth() - this.getViewportWidth()) * scrollPercentage;
    }

    this.adjustColumns(scrollLeft, scrollPercentage);

    this.prevScrollLeft = scrollLeft;
    this.prevScrollleftPercentage = scrollPercentage;

    this.grid.queueRefresh();
  };

  GridRenderContainer.prototype.adjustRows = function adjustRows(scrollTop, scrollPercentage, postDataLoaded) {
    var self = this;

    var minRows = self.minRowsToRender();

    var rowCache = self.visibleRowCache;

    var maxRowIndex = rowCache.length - minRows;

    // console.log('scroll%1', scrollPercentage);

    // Calculate the scroll percentage according to the scrollTop location, if no percentage was provided
    if ((typeof(scrollPercentage) === 'undefined' || scrollPercentage === null) && scrollTop) {
      scrollPercentage = scrollTop / self.getVerticalScrollLength();
    }

    var rowIndex = Math.ceil(Math.min(maxRowIndex, maxRowIndex * scrollPercentage));

    // console.log('maxRowIndex / scroll%', maxRowIndex, scrollPercentage, rowIndex);

    // Define a max row index that we can't scroll past
    if (rowIndex > maxRowIndex) {
      rowIndex = maxRowIndex;
    }

    var newRange = [];
    if (rowCache.length > self.grid.options.virtualizationThreshold) {
      if (!(typeof(scrollTop) === 'undefined' || scrollTop === null)) {
        // Have we hit the threshold going down?
        if ( !self.grid.suppressParentScrollDown && self.prevScrollTop < scrollTop && rowIndex < self.prevRowScrollIndex + self.grid.options.scrollThreshold && rowIndex < maxRowIndex) {
          return;
        }
        //Have we hit the threshold going up?
        if ( !self.grid.suppressParentScrollUp && self.prevScrollTop > scrollTop && rowIndex > self.prevRowScrollIndex - self.grid.options.scrollThreshold && rowIndex < maxRowIndex) {
          return;
        }
      }
      var rangeStart = {};
      var rangeEnd = {};

      rangeStart = Math.max(0, rowIndex - self.grid.options.excessRows);
      rangeEnd = Math.min(rowCache.length, rowIndex + minRows + self.grid.options.excessRows);

      newRange = [rangeStart, rangeEnd];
    }
    else {
      var maxLen = self.visibleRowCache.length;
      newRange = [0, Math.max(maxLen, minRows + self.grid.options.excessRows)];
    }

    self.updateViewableRowRange(newRange);

    self.prevRowScrollIndex = rowIndex;
  };

  GridRenderContainer.prototype.adjustColumns = function adjustColumns(scrollLeft, scrollPercentage) {
    var self = this;

    var minCols = self.minColumnsToRender();

    var columnCache = self.visibleColumnCache;
    var maxColumnIndex = columnCache.length - minCols;

    // Calculate the scroll percentage according to the scrollTop location, if no percentage was provided
    if ((typeof(scrollPercentage) === 'undefined' || scrollPercentage === null) && scrollLeft) {
      scrollPercentage = scrollLeft / self.getCanvasWidth();
    }

    var colIndex = Math.ceil(Math.min(maxColumnIndex, maxColumnIndex * scrollPercentage));

    // Define a max row index that we can't scroll past
    if (colIndex > maxColumnIndex) {
      colIndex = maxColumnIndex;
    }

    var newRange = [];
    if (columnCache.length > self.grid.options.columnVirtualizationThreshold && self.getCanvasWidth() > self.getViewportWidth()) {
      /* Commented the following lines because otherwise the moved column wasn't visible immediately on the new position
       * in the case of many columns with horizontal scroll, one had to scroll left or right and then return in order to see it
      // Have we hit the threshold going down?
      if (self.prevScrollLeft < scrollLeft && colIndex < self.prevColumnScrollIndex + self.grid.options.horizontalScrollThreshold && colIndex < maxColumnIndex) {
        return;
      }
      //Have we hit the threshold going up?
      if (self.prevScrollLeft > scrollLeft && colIndex > self.prevColumnScrollIndex - self.grid.options.horizontalScrollThreshold && colIndex < maxColumnIndex) {
        return;
      }*/

      var rangeStart = Math.max(0, colIndex - self.grid.options.excessColumns);
      var rangeEnd = Math.min(columnCache.length, colIndex + minCols + self.grid.options.excessColumns);

      newRange = [rangeStart, rangeEnd];
    }
    else {
      var maxLen = self.visibleColumnCache.length;

      newRange = [0, Math.max(maxLen, minCols + self.grid.options.excessColumns)];
    }

    self.updateViewableColumnRange(newRange);

    self.prevColumnScrollIndex = colIndex;
  };

  // Method for updating the visible rows
  GridRenderContainer.prototype.updateViewableRowRange = function updateViewableRowRange(renderedRange) {
    // Slice out the range of rows from the data
    // var rowArr = uiGridCtrl.grid.rows.slice(renderedRange[0], renderedRange[1]);
    var rowArr = this.visibleRowCache.slice(renderedRange[0], renderedRange[1]);

    // Define the top-most rendered row
    this.currentTopRow = renderedRange[0];

    this.setRenderedRows(rowArr);
  };

  // Method for updating the visible columns
  GridRenderContainer.prototype.updateViewableColumnRange = function updateViewableColumnRange(renderedRange) {
    // Slice out the range of rows from the data
    // var columnArr = uiGridCtrl.grid.columns.slice(renderedRange[0], renderedRange[1]);
    var columnArr = this.visibleColumnCache.slice(renderedRange[0], renderedRange[1]);

    // Define the left-most rendered columns
    this.currentFirstColumn = renderedRange[0];

    this.setRenderedColumns(columnArr);
  };

  GridRenderContainer.prototype.headerCellWrapperStyle = function () {
    var self = this;

    if (self.currentFirstColumn !== 0) {
      var offset = self.columnOffset;

      if (self.grid.isRTL()) {
        return { 'margin-right': offset + 'px' };
      }
      else {
        return { 'margin-left': offset + 'px' };
      }
    }

    return null;
  };

    /**
     *  @ngdoc boolean
     *  @name updateColumnWidths
     *  @propertyOf  ui.grid.class:GridRenderContainer
     *  @description Determine the appropriate column width of each column across all render containers.
     *
     *  Column width is easy when each column has a specified width.  When columns are variable width (i.e.
     *  have an * or % of the viewport) then we try to calculate so that things fit in.  The problem is that
     *  we have multiple render containers, and we don't want one render container to just take the whole viewport
     *  when it doesn't need to - we want things to balance out across the render containers.
     *
     *  To do this, we use this method to calculate all the renderContainers, recognising that in a given render
     *  cycle it'll get called once per render container, so it needs to return the same values each time.
     *
     *  The constraints on this method are therefore:
     *  - must return the same value when called multiple times, to do this it needs to rely on properties of the
     *    columns, but not properties that change when this is called (so it shouldn't rely on drawnWidth)
     *
     *  The general logic of this method is:
     *  - calculate our total available width
     *  - look at all the columns across all render containers, and work out which have widths and which have
     *    constraints such as % or * or something else
     *  - for those with *, count the total number of * we see and add it onto a running total, add this column to an * array
     *  - for those with a %, allocate the % as a percentage of the viewport, having consideration of min and max
     *  - for those with manual width (in pixels) we set the drawnWidth to the specified width
     *  - we end up with an asterisks array still to process
     *  - we look at our remaining width.  If it's greater than zero, we divide it up among the asterisk columns, then process
     *    them for min and max width constraints
     *  - if it's zero or less, we set the asterisk columns to their minimum widths
     *  - we use parseInt quite a bit, as we try to make all our column widths integers
     */
  GridRenderContainer.prototype.updateColumnWidths = function () {
    var self = this;

    var asterisksArray = [],
        asteriskNum = 0,
        usedWidthSum = 0,
        ret = '';

    // Get the width of the viewport
    var availableWidth = self.grid.getViewportWidth() - self.grid.scrollbarWidth;

    // get all the columns across all render containers, we have to calculate them all or one render container
    // could consume the whole viewport
    var columnCache = [];
    angular.forEach(self.grid.renderContainers, function( container, name){
      columnCache = columnCache.concat(container.visibleColumnCache);
    });

    // look at each column, process any manual values or %, put the * into an array to look at later
    columnCache.forEach(function(column, i) {
      var width = 0;
      // Skip hidden columns
      if (!column.visible) { return; }

      if (angular.isNumber(column.width)) {
        // pixel width, set to this value
        width = parseInt(column.width, 10);
        usedWidthSum = usedWidthSum + width;
        column.drawnWidth = width;

      } else if (gridUtil.endsWith(column.width, "%")) {
        // percentage width, set to percentage of the viewport
        width = parseInt(parseInt(column.width.replace(/%/g, ''), 10) / 100 * availableWidth);

        if ( width > column.maxWidth ){
          width = column.maxWidth;
        }

        if ( width < column.minWidth ){
          width = column.minWidth;
        }

        usedWidthSum = usedWidthSum + width;
        column.drawnWidth = width;
      } else if (angular.isString(column.width) && column.width.indexOf('*') !== -1) {
        // is an asterisk column, the gridColumn already checked the string consists only of '****'
        asteriskNum = asteriskNum + column.width.length;
        asterisksArray.push(column);
      }
    });

    // Get the remaining width (available width subtracted by the used widths sum)
    var remainingWidth = availableWidth - usedWidthSum;

    var i, column, colWidth;

    if (asterisksArray.length > 0) {
      // the width that each asterisk value would be assigned (this can be negative)
      var asteriskVal = remainingWidth / asteriskNum;

      asterisksArray.forEach(function( column ){
        var width = parseInt(column.width.length * asteriskVal, 10);

        if ( width > column.maxWidth ){
          width = column.maxWidth;
        }

        if ( width < column.minWidth ){
          width = column.minWidth;
        }

        usedWidthSum = usedWidthSum + width;
        column.drawnWidth = width;
      });
    }

    // If the grid width didn't divide evenly into the column widths and we have pixels left over, or our
    // calculated widths would have the grid narrower than the available space,
    // dole the remainder out one by one to make everything fit
    var processColumnUpwards = function(column){
      if ( column.drawnWidth < column.maxWidth && leftoverWidth > 0) {
        column.drawnWidth++;
        usedWidthSum++;
        leftoverWidth--;
        columnsToChange = true;
      }
    };

    var leftoverWidth = availableWidth - usedWidthSum;
    var columnsToChange = true;

    while (leftoverWidth > 0 && columnsToChange) {
      columnsToChange = false;
      asterisksArray.forEach(processColumnUpwards);
    }

    // We can end up with too much width even though some columns aren't at their max width, in this situation
    // we can trim the columns a little
    var processColumnDownwards = function(column){
      if ( column.drawnWidth > column.minWidth && excessWidth > 0) {
        column.drawnWidth--;
        usedWidthSum--;
        excessWidth--;
        columnsToChange = true;
      }
    };

    var excessWidth =  usedWidthSum - availableWidth;
    columnsToChange = true;

    while (excessWidth > 0 && columnsToChange) {
      columnsToChange = false;
      asterisksArray.forEach(processColumnDownwards);
    }


    // all that was across all the renderContainers, now we need to work out what that calculation decided for
    // our renderContainer
    var canvasWidth = 0;
    self.visibleColumnCache.forEach(function(column){
      if ( column.visible ){
        canvasWidth = canvasWidth + column.drawnWidth;
      }
    });

    // Build the CSS
    columnCache.forEach(function (column) {
      ret = ret + column.getColClassDefinition();
    });

    self.canvasWidth = canvasWidth;

    // Return the styles back to buildStyles which pops them into the `customStyles` scope variable
    // return ret;

    // Set this render container's column styles so they can be used in style computation
    this.columnStyles = ret;
  };

  GridRenderContainer.prototype.needsHScrollbarPlaceholder = function () {
    return this.grid.options.enableHorizontalScrollbar && !this.hasHScrollbar;
  };

  GridRenderContainer.prototype.getViewportStyle = function () {
    var self = this;
    var styles = {};

    self.hasHScrollbar = false;
    self.hasVScrollbar = false;

    if (self.grid.disableScrolling) {
      styles['overflow-x'] = 'hidden';
      styles['overflow-y'] = 'hidden';
      return styles;
    }

    if (self.name === 'body') {
      self.hasHScrollbar = self.grid.options.enableHorizontalScrollbar !== uiGridConstants.scrollbars.NEVER;
      if (!self.grid.isRTL()) {
        if (!self.grid.hasRightContainerColumns()) {
          self.hasVScrollbar = self.grid.options.enableVerticalScrollbar !== uiGridConstants.scrollbars.NEVER;
        }
      }
      else {
        if (!self.grid.hasLeftContainerColumns()) {
          self.hasVScrollbar = self.grid.options.enableVerticalScrollbar !== uiGridConstants.scrollbars.NEVER;
        }
      }
    }
    else if (self.name === 'left') {
      self.hasVScrollbar = self.grid.isRTL() ? self.grid.options.enableVerticalScrollbar !== uiGridConstants.scrollbars.NEVER : false;
    }
    else {
      self.hasVScrollbar = !self.grid.isRTL() ? self.grid.options.enableVerticalScrollbar !== uiGridConstants.scrollbars.NEVER : false;
    }

    styles['overflow-x'] = self.hasHScrollbar ? 'scroll' : 'hidden';
    styles['overflow-y'] = self.hasVScrollbar ? 'scroll' : 'hidden';


    return styles;


  };

  return GridRenderContainer;
}]);

})();

(function(){

angular.module('ui.grid')
.factory('GridRow', ['gridUtil', function(gridUtil) {

   /**
   * @ngdoc function
   * @name ui.grid.class:GridRow
   * @description GridRow is the viewModel for one logical row on the grid.  A grid Row is not necessarily a one-to-one
   * relation to gridOptions.data.
   * @param {object} entity the array item from GridOptions.data
   * @param {number} index the current position of the row in the array
   * @param {Grid} reference to the parent grid
   */
  function GridRow(entity, index, grid) {

     /**
      *  @ngdoc object
      *  @name grid
      *  @propertyOf  ui.grid.class:GridRow
      *  @description A reference back to the grid
      */
     this.grid = grid;

     /**
      *  @ngdoc object
      *  @name entity
      *  @propertyOf  ui.grid.class:GridRow
      *  @description A reference to an item in gridOptions.data[]
      */
    this.entity = entity;

     /**
      *  @ngdoc object
      *  @name uid
      *  @propertyOf  ui.grid.class:GridRow
      *  @description  UniqueId of row
      */
     this.uid = gridUtil.nextUid();

     /**
      *  @ngdoc object
      *  @name visible
      *  @propertyOf  ui.grid.class:GridRow
      *  @description If true, the row will be rendered
      */
    // Default to true
    this.visible = true;


    this.$$height = grid.options.rowHeight;

  }

    /**
     *  @ngdoc object
     *  @name height
     *  @propertyOf  ui.grid.class:GridRow
     *  @description height of each individual row. changing the height will flag all
     *  row renderContainers to recalculate their canvas height
     */
    Object.defineProperty(GridRow.prototype, 'height', {
      get: function() {
        return this.$$height;
      },
      set: function(height) {
        if (height !== this.$$height) {
          this.grid.updateCanvasHeight();
          this.$$height = height;
        }
      }
    });

  /**
   * @ngdoc function
   * @name getQualifiedColField
   * @methodOf ui.grid.class:GridRow
   * @description returns the qualified field name as it exists on scope
   * ie: row.entity.fieldA
   * @param {GridCol} col column instance
   * @returns {string} resulting name that can be evaluated on scope
   */
    GridRow.prototype.getQualifiedColField = function(col) {
      return 'row.' + this.getEntityQualifiedColField(col);
    };

    /**
     * @ngdoc function
     * @name getEntityQualifiedColField
     * @methodOf ui.grid.class:GridRow
     * @description returns the qualified field name minus the row path
     * ie: entity.fieldA
     * @param {GridCol} col column instance
     * @returns {string} resulting name that can be evaluated against a row
     */
  GridRow.prototype.getEntityQualifiedColField = function(col) {
    return gridUtil.preEval('entity.' + col.field);
  };
  
  
  /**
   * @ngdoc function
   * @name setRowInvisible
   * @methodOf  ui.grid.class:GridRow
   * @description Sets an override on the row that forces it to always
   * be invisible. Emits the rowsVisibleChanged event if it changed the row visibility.
   * 
   * This method can be called from the api, passing in the gridRow we want
   * altered.  It should really work by calling gridRow.setRowInvisible, but that's
   * not the way I coded it, and too late to change now.  Changed to just call
   * the internal function row.setThisRowInvisible().
   * 
   * @param {GridRow} row the row we want to set to invisible
   * 
   */
  GridRow.prototype.setRowInvisible = function ( row ) {
    if (row && row.setThisRowInvisible){
      row.setThisRowInvisible( 'user' );
    }
  };
  
  
  /**
   * @ngdoc function
   * @name clearRowInvisible
   * @methodOf  ui.grid.class:GridRow
   * @description Clears an override on the row that forces it to always
   * be invisible. Emits the rowsVisibleChanged event if it changed the row visibility.
   * 
   * This method can be called from the api, passing in the gridRow we want
   * altered.  It should really work by calling gridRow.clearRowInvisible, but that's
   * not the way I coded it, and too late to change now.  Changed to just call
   * the internal function row.clearThisRowInvisible().
   * 
   * @param {GridRow} row the row we want to clear the invisible flag
   * 
   */
  GridRow.prototype.clearRowInvisible = function ( row ) {
    if (row && row.clearThisRowInvisible){
      row.clearThisRowInvisible( 'user' );
    }
  };
  
  
  /**
   * @ngdoc function
   * @name setThisRowInvisible
   * @methodOf  ui.grid.class:GridRow
   * @description Sets an override on the row that forces it to always
   * be invisible. Emits the rowsVisibleChanged event if it changed the row visibility
   *
   * @param {string} reason the reason (usually the module) for the row to be invisible.
   * E.g. grouping, user, filter
   * @param {boolean} fromRowsProcessor whether we were called from a rowsProcessor, passed through to evaluateRowVisibility
   */
  GridRow.prototype.setThisRowInvisible = function ( reason, fromRowsProcessor ) {
    if ( !this.invisibleReason ){
      this.invisibleReason = {};
    }
    this.invisibleReason[reason] = true;
    this.evaluateRowVisibility( fromRowsProcessor);
  };


  /**
   * @ngdoc function
   * @name clearRowInvisible
   * @methodOf ui.grid.class:GridRow
   * @description Clears any override on the row visibility, returning it 
   * to normal visibility calculations.  Emits the rowsVisibleChanged
   * event
   * 
   * @param {string} reason the reason (usually the module) for the row to be invisible.
   * E.g. grouping, user, filter
   * @param {boolean} fromRowsProcessor whether we were called from a rowsProcessor, passed through to evaluateRowVisibility
   */
  GridRow.prototype.clearThisRowInvisible = function ( reason, fromRowsProcessor ) {
    if (typeof(this.invisibleReason) !== 'undefined' ) {
      delete this.invisibleReason[reason];
    }
    this.evaluateRowVisibility( fromRowsProcessor );
  };


  /**
   * @ngdoc function
   * @name evaluateRowVisibility
   * @methodOf ui.grid.class:GridRow
   * @description Determines whether the row should be visible based on invisibleReason, 
   * and if it changes the row visibility, then emits the rowsVisibleChanged event.
   * 
   * Queues a grid refresh, but doesn't call it directly to avoid hitting lots of grid refreshes.
   * @param {boolean} fromRowProcessor if true, then it won't raise events or queue the refresh, the
   * row processor does that already
   */
  GridRow.prototype.evaluateRowVisibility = function ( fromRowProcessor ) {
    var newVisibility = true;
    if ( typeof(this.invisibleReason) !== 'undefined' ){
      angular.forEach(this.invisibleReason, function( value, key ){
        if ( value ){
          newVisibility = false;
        }
      });
    }
    
    if ( typeof(this.visible) === 'undefined' || this.visible !== newVisibility ){
      this.visible = newVisibility;
      if ( !fromRowProcessor ){
        this.grid.queueGridRefresh();
        this.grid.api.core.raise.rowsVisibleChanged(this);
      }
    }
  };
  

  return GridRow;
}]);

})();

(function () {
  angular.module('ui.grid')
    .factory('ScrollEvent', ['gridUtil', function (gridUtil) {

      /**
       * @ngdoc function
       * @name ui.grid.class:ScrollEvent
       * @description Model for all scrollEvents
       * @param {Grid} grid that owns the scroll event
       * @param {GridRenderContainer} sourceRowContainer that owns the scroll event. Can be null
       * @param {GridRenderContainer} sourceColContainer that owns the scroll event. Can be null
       * @param {string} source the source of the event - from uiGridConstants.scrollEventSources or a string value of directive/service/factory.functionName
       */
      function ScrollEvent(grid, sourceRowContainer, sourceColContainer, source) {
        var self = this;
        if (!grid) {
          throw new Error("grid argument is required");
        }

        /**
         *  @ngdoc object
         *  @name grid
         *  @propertyOf  ui.grid.class:ScrollEvent
         *  @description A reference back to the grid
         */
         self.grid = grid;



        /**
         *  @ngdoc object
         *  @name source
         *  @propertyOf  ui.grid.class:ScrollEvent
         *  @description the source of the scroll event. limited to values from uiGridConstants.scrollEventSources
         */
        self.source = source;


        /**
         *  @ngdoc object
         *  @name noDelay
         *  @propertyOf  ui.grid.class:ScrollEvent
         *  @description most scroll events from the mouse or trackpad require delay to operate properly
         *  set to false to eliminate delay.  Useful for scroll events that the grid causes, such as scrolling to make a row visible.
         */
        self.withDelay = true;

        self.sourceRowContainer = sourceRowContainer;
        self.sourceColContainer = sourceColContainer;

        self.newScrollLeft = null;
        self.newScrollTop = null;
        self.x = null;
        self.y = null;

        self.verticalScrollLength = -9999999;
        self.horizontalScrollLength = -999999;


        /**
         *  @ngdoc function
         *  @name fireThrottledScrollingEvent
         *  @methodOf  ui.grid.class:ScrollEvent
         *  @description fires a throttled event using grid.api.core.raise.scrollEvent
         */
        self.fireThrottledScrollingEvent = gridUtil.throttle(function(sourceContainerId) {
          self.grid.scrollContainers(sourceContainerId, self);
        }, self.grid.options.wheelScrollThrottle, {trailing: true});

      }


      /**
       *  @ngdoc function
       *  @name getNewScrollLeft
       *  @methodOf  ui.grid.class:ScrollEvent
       *  @description returns newScrollLeft property if available; calculates a new value if it isn't
       */
      ScrollEvent.prototype.getNewScrollLeft = function(colContainer, viewport){
        var self = this;

        if (!self.newScrollLeft){
          var scrollWidth = (colContainer.getCanvasWidth() - colContainer.getViewportWidth());

          var oldScrollLeft = gridUtil.normalizeScrollLeft(viewport, self.grid);

          var scrollXPercentage;
          if (typeof(self.x.percentage) !== 'undefined' && self.x.percentage !== undefined) {
            scrollXPercentage = self.x.percentage;
          }
          else if (typeof(self.x.pixels) !== 'undefined' && self.x.pixels !== undefined) {
            scrollXPercentage = self.x.percentage = (oldScrollLeft + self.x.pixels) / scrollWidth;
          }
          else {
            throw new Error("No percentage or pixel value provided for scroll event X axis");
          }

          return Math.max(0, scrollXPercentage * scrollWidth);
        }

        return self.newScrollLeft;
      };


      /**
       *  @ngdoc function
       *  @name getNewScrollTop
       *  @methodOf  ui.grid.class:ScrollEvent
       *  @description returns newScrollTop property if available; calculates a new value if it isn't
       */
      ScrollEvent.prototype.getNewScrollTop = function(rowContainer, viewport){
        var self = this;


        if (!self.newScrollTop){
          var scrollLength = rowContainer.getVerticalScrollLength();

          var oldScrollTop = viewport[0].scrollTop;

          var scrollYPercentage;
          if (typeof(self.y.percentage) !== 'undefined' && self.y.percentage !== undefined) {
            scrollYPercentage = self.y.percentage;
          }
          else if (typeof(self.y.pixels) !== 'undefined' && self.y.pixels !== undefined) {
            scrollYPercentage = self.y.percentage = (oldScrollTop + self.y.pixels) / scrollLength;
          }
          else {
            throw new Error("No percentage or pixel value provided for scroll event Y axis");
          }

          return Math.max(0, scrollYPercentage * scrollLength);
        }

        return self.newScrollTop;
      };

      ScrollEvent.prototype.atTop = function(scrollTop) {
        return (this.y && (this.y.percentage === 0 || this.verticalScrollLength < 0) && scrollTop === 0);
      };

      ScrollEvent.prototype.atBottom = function(scrollTop) {
        return (this.y && (this.y.percentage === 1 || this.verticalScrollLength === 0) && scrollTop > 0);
      };

      ScrollEvent.prototype.atLeft = function(scrollLeft) {
        return (this.x && (this.x.percentage === 0 || this.horizontalScrollLength < 0) && scrollLeft === 0);
      };

      ScrollEvent.prototype.atRight = function(scrollLeft) {
        return (this.x && (this.x.percentage === 1 || this.horizontalScrollLength ===0) && scrollLeft > 0);
      };


      ScrollEvent.Sources = {
        ViewPortScroll: 'ViewPortScroll',
        RenderContainerMouseWheel: 'RenderContainerMouseWheel',
        RenderContainerTouchMove: 'RenderContainerTouchMove',
        Other: 99
      };

      return ScrollEvent;
    }]);



})();

(function () {
  'use strict';
  /**
   *  @ngdoc object
   *  @name ui.grid.service:gridClassFactory
   *
   *  @description factory to return dom specific instances of a grid
   *
   */
  angular.module('ui.grid').service('gridClassFactory', ['gridUtil', '$q', '$compile', '$templateCache', 'uiGridConstants', 'Grid', 'GridColumn', 'GridRow',
    function (gridUtil, $q, $compile, $templateCache, uiGridConstants, Grid, GridColumn, GridRow) {

      var service = {
        /**
         * @ngdoc method
         * @name createGrid
         * @methodOf ui.grid.service:gridClassFactory
         * @description Creates a new grid instance. Each instance will have a unique id
         * @param {object} options An object map of options to pass into the created grid instance.
         * @returns {Grid} grid
         */
        createGrid : function(options) {
          options = (typeof(options) !== 'undefined') ? options : {};
          options.id = gridUtil.newId();
          var grid = new Grid(options);

          // NOTE/TODO: rowTemplate should always be defined...
          if (grid.options.rowTemplate) {
            var rowTemplateFnPromise = $q.defer();
            grid.getRowTemplateFn = rowTemplateFnPromise.promise;
            
            gridUtil.getTemplate(grid.options.rowTemplate)
              .then(
                function (template) {
                  var rowTemplateFn = $compile(template);
                  rowTemplateFnPromise.resolve(rowTemplateFn);
                },
                function (res) {
                  // Todo handle response error here?
                  throw new Error("Couldn't fetch/use row template '" + grid.options.rowTemplate + "'");
                });
          }

          grid.registerColumnBuilder(service.defaultColumnBuilder);

          // Row builder for custom row templates
          grid.registerRowBuilder(service.rowTemplateAssigner);

          // Reset all rows to visible initially
          grid.registerRowsProcessor(function allRowsVisible(rows) {
            rows.forEach(function (row) {
              row.evaluateRowVisibility( true );
            }, 50);

            return rows;
          });

          grid.registerColumnsProcessor(function allColumnsVisible(columns) {
            columns.forEach(function (column) {
              column.visible = true;
            });

            return columns;
          }, 50);

          grid.registerColumnsProcessor(function(renderableColumns) {
              renderableColumns.forEach(function (column) {
                  if (column.colDef.visible === false) {
                      column.visible = false;
                  }
              });

              return renderableColumns;
          }, 50);


          grid.registerRowsProcessor(grid.searchRows, 100);

          // Register the default row processor, it sorts rows by selected columns
          if (grid.options.externalSort && angular.isFunction(grid.options.externalSort)) {
            grid.registerRowsProcessor(grid.options.externalSort, 200);
          }
          else {
            grid.registerRowsProcessor(grid.sortByColumn, 200);
          }

          return grid;
        },

        /**
         * @ngdoc function
         * @name defaultColumnBuilder
         * @methodOf ui.grid.service:gridClassFactory
         * @description Processes designTime column definitions and applies them to col for the
         *              core grid features
         * @param {object} colDef reference to column definition
         * @param {GridColumn} col reference to gridCol
         * @param {object} gridOptions reference to grid options
         */
        defaultColumnBuilder: function (colDef, col, gridOptions) {

          var templateGetPromises = [];

          // Abstracts the standard template processing we do for every template type.
          var processTemplate = function( templateType, providedType, defaultTemplate, filterType, tooltipType ) {
            if ( !colDef[templateType] ){
              col[providedType] = defaultTemplate;
            } else {
              col[providedType] = colDef[templateType];
            }
 
             templateGetPromises.push(gridUtil.getTemplate(col[providedType])
                .then(
                function (template) {
                  var tooltipCall = ( tooltipType === 'cellTooltip' ) ? 'col.cellTooltip(row,col)' : 'col.headerTooltip(col)';
                  if ( tooltipType && col[tooltipType] === false ){
                    template = template.replace(uiGridConstants.TOOLTIP, '');
                  } else if ( tooltipType && col[tooltipType] ){
                    template = template.replace(uiGridConstants.TOOLTIP, 'title="{{' + tooltipCall + ' CUSTOM_FILTERS }}"');
                  }

                  if ( filterType ){
                    col[templateType] = template.replace(uiGridConstants.CUSTOM_FILTERS, function() {
                      return col[filterType] ? "|" + col[filterType] : "";
                    });
                  } else {
                    col[templateType] = template;
                  }
                },
                function (res) {
                  throw new Error("Couldn't fetch/use colDef." + templateType + " '" + colDef[templateType] + "'");
                })
            );

          };


          /**
           * @ngdoc property
           * @name cellTemplate
           * @propertyOf ui.grid.class:GridOptions.columnDef
           * @description a custom template for each cell in this column.  The default
           * is ui-grid/uiGridCell.  If you are using the cellNav feature, this template
           * must contain a div that can receive focus.
           *
           */
          processTemplate( 'cellTemplate', 'providedCellTemplate', 'ui-grid/uiGridCell', 'cellFilter', 'cellTooltip' );
          col.cellTemplatePromise = templateGetPromises[0];

          /**
           * @ngdoc property
           * @name headerCellTemplate
           * @propertyOf ui.grid.class:GridOptions.columnDef
           * @description a custom template for the header for this column.  The default
           * is ui-grid/uiGridHeaderCell
           *
           */
          processTemplate( 'headerCellTemplate', 'providedHeaderCellTemplate', 'ui-grid/uiGridHeaderCell', 'headerCellFilter', 'headerTooltip' );

          /**
           * @ngdoc property
           * @name footerCellTemplate
           * @propertyOf ui.grid.class:GridOptions.columnDef
           * @description a custom template for the footer for this column.  The default
           * is ui-grid/uiGridFooterCell
           *
           */
          processTemplate( 'footerCellTemplate', 'providedFooterCellTemplate', 'ui-grid/uiGridFooterCell', 'footerCellFilter' );

          /**
           * @ngdoc property
           * @name filterHeaderTemplate
           * @propertyOf ui.grid.class:GridOptions.columnDef
           * @description a custom template for the filter input.  The default is ui-grid/ui-grid-filter
           *
           */
          processTemplate( 'filterHeaderTemplate', 'providedFilterHeaderTemplate', 'ui-grid/ui-grid-filter' );

          // Create a promise for the compiled element function
          col.compiledElementFnDefer = $q.defer();

          return $q.all(templateGetPromises);
        },
        

        rowTemplateAssigner: function rowTemplateAssigner(row) {
          var grid = this;

          // Row has no template assigned to it
          if (!row.rowTemplate) {
            // Use the default row template from the grid
            row.rowTemplate = grid.options.rowTemplate;

            // Use the grid's function for fetching the compiled row template function
            row.getRowTemplateFn = grid.getRowTemplateFn;
          }
          // Row has its own template assigned
          else {
            // Create a promise for the compiled row template function
            var perRowTemplateFnPromise = $q.defer();
            row.getRowTemplateFn = perRowTemplateFnPromise.promise;

            // Get the row template
            gridUtil.getTemplate(row.rowTemplate)
              .then(function (template) {
                // Compile the template
                var rowTemplateFn = $compile(template);
                
                // Resolve the compiled template function promise
                perRowTemplateFnPromise.resolve(rowTemplateFn);
              },
              function (res) {
                // Todo handle response error here?
                throw new Error("Couldn't fetch/use row template '" + row.rowTemplate + "'");
              });
          }

          return row.getRowTemplateFn;
        }
      };

      //class definitions (moved to separate factories)

      return service;
    }]);

})();
(function() {

var module = angular.module('ui.grid');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


/**
 *  @ngdoc service
 *  @name ui.grid.service:rowSearcher
 *
 *  @description Service for searching/filtering rows based on column value conditions.
 */
module.service('rowSearcher', ['gridUtil', 'uiGridConstants', function (gridUtil, uiGridConstants) {
  var defaultCondition = uiGridConstants.filter.CONTAINS;

  var rowSearcher = {};

  /**
   * @ngdoc function
   * @name getTerm
   * @methodOf ui.grid.service:rowSearcher
   * @description Get the term from a filter
   * Trims leading and trailing whitespace
   * @param {object} filter object to use
   * @returns {object} Parsed term
   */
  rowSearcher.getTerm = function getTerm(filter) {
    if (typeof(filter.term) === 'undefined') { return filter.term; }
    
    var term = filter.term;

    // Strip leading and trailing whitespace if the term is a string
    if (typeof(term) === 'string') {
      term = term.trim();
    }

    return term;
  };

  /**
   * @ngdoc function
   * @name stripTerm
   * @methodOf ui.grid.service:rowSearcher
   * @description Remove leading and trailing asterisk (*) from the filter's term
   * @param {object} filter object to use
   * @returns {uiGridConstants.filter<int>} Value representing the condition constant value
   */
  rowSearcher.stripTerm = function stripTerm(filter) {
    var term = rowSearcher.getTerm(filter);

    if (typeof(term) === 'string') {
      return escapeRegExp(term.replace(/(^\*|\*$)/g, ''));
    }
    else {
      return term;
    }
  };
  

  /**
   * @ngdoc function
   * @name guessCondition
   * @methodOf ui.grid.service:rowSearcher
   * @description Guess the condition for a filter based on its term
   * <br>
   * Defaults to STARTS_WITH. Uses CONTAINS for strings beginning and ending with *s (*bob*).
   * Uses STARTS_WITH for strings ending with * (bo*). Uses ENDS_WITH for strings starting with * (*ob).
   * @param {object} filter object to use
   * @returns {uiGridConstants.filter<int>} Value representing the condition constant value
   */
  rowSearcher.guessCondition = function guessCondition(filter) {
    if (typeof(filter.term) === 'undefined' || !filter.term) {
      return defaultCondition;
    }

    var term = rowSearcher.getTerm(filter);
    
    if (/\*/.test(term)) {
      var regexpFlags = '';
      if (!filter.flags || !filter.flags.caseSensitive) {
        regexpFlags += 'i';
      }

      var reText = term.replace(/(\\)?\*/g, function ($0, $1) { return $1 ? $0 : '[\\s\\S]*?'; });
      return new RegExp('^' + reText + '$', regexpFlags);
    }
    // Otherwise default to default condition
    else {
      return defaultCondition;
    }
  };
  
  
  /**
   * @ngdoc function
   * @name setupFilters
   * @methodOf ui.grid.service:rowSearcher
   * @description For a given columns filters (either col.filters, or [col.filter] can be passed in),
   * do all the parsing and pre-processing and store that data into a new filters object.  The object
   * has the condition, the flags, the stripped term, and a parsed reg exp if there was one.
   * 
   * We could use a forEach in here, since it's much less performance sensitive, but since we're using 
   * for loops everywhere else in this module...
   * 
   * @param {array} filters the filters from the column (col.filters or [col.filter])
   * @returns {array} An array of parsed/preprocessed filters
   */
  rowSearcher.setupFilters = function setupFilters( filters ){
    var newFilters = [];
    
    var filtersLength = filters.length;
    for ( var i = 0; i < filtersLength; i++ ){
      var filter = filters[i];
      
      if ( filter.noTerm || !gridUtil.isNullOrUndefined(filter.term) ){
        var newFilter = {};
        
        var regexpFlags = '';
        if (!filter.flags || !filter.flags.caseSensitive) {
          regexpFlags += 'i';
        }
    
        if ( !gridUtil.isNullOrUndefined(filter.term) ){
          // it is possible to have noTerm.  We don't need to copy that across, it was just a flag to avoid
          // getting the filter ignored if the filter was a function that didn't use a term
          newFilter.term = rowSearcher.stripTerm(filter);
        }
        
        if ( filter.condition ){
          newFilter.condition = filter.condition;
        } else {
          newFilter.condition = rowSearcher.guessCondition(filter);
        }

        newFilter.flags = angular.extend( { caseSensitive: false, date: false }, filter.flags );

        if (newFilter.condition === uiGridConstants.filter.STARTS_WITH) {
          newFilter.startswithRE = new RegExp('^' + newFilter.term, regexpFlags);
        }
        
         if (newFilter.condition === uiGridConstants.filter.ENDS_WITH) {
          newFilter.endswithRE = new RegExp(newFilter.term + '$', regexpFlags);
        }

        if (newFilter.condition === uiGridConstants.filter.CONTAINS) {
          newFilter.containsRE = new RegExp(newFilter.term, regexpFlags);
        }

        if (newFilter.condition === uiGridConstants.filter.EXACT) {
          newFilter.exactRE = new RegExp('^' + newFilter.term + '$', regexpFlags);
        }
        
        newFilters.push(newFilter);
      }
    }
    return newFilters;
  };
  

  /**
   * @ngdoc function
   * @name runColumnFilter
   * @methodOf ui.grid.service:rowSearcher
   * @description Runs a single pre-parsed filter against a cell, returning true
   * if the cell matches that one filter.
   * 
   * @param {Grid} grid the grid we're working against
   * @param {GridRow} row the row we're matching against
   * @param {GridCol} column the column that we're working against
   * @param {object} filter the specific, preparsed, filter that we want to test
   * @returns {boolean} true if we match (row stays visible)
   */
  rowSearcher.runColumnFilter = function runColumnFilter(grid, row, column, filter) {
    // Cache typeof condition
    var conditionType = typeof(filter.condition);

    // Term to search for.
    var term = filter.term;

    // Get the column value for this row
    var value;
    if ( column.filterCellFiltered ){
      value = grid.getCellDisplayValue(row, column);
    } else {
      value = grid.getCellValue(row, column);
    }


    // If the filter's condition is a RegExp, then use it
    if (filter.condition instanceof RegExp) {
      return filter.condition.test(value);
    }

    // If the filter's condition is a function, run it
    if (conditionType === 'function') {
      return filter.condition(term, value, row, column);
    }

    if (filter.startswithRE) {
      return filter.startswithRE.test(value);
    }

    if (filter.endswithRE) {
      return filter.endswithRE.test(value);
    }

    if (filter.containsRE) {
      return filter.containsRE.test(value);
    }

    if (filter.exactRE) {
      return filter.exactRE.test(value);
    }

    if (filter.condition === uiGridConstants.filter.NOT_EQUAL) {
      var regex = new RegExp('^' + term + '$');
      return !regex.exec(value);
    }

    if (typeof(value) === 'number' && typeof(term) === 'string' ){
      // if the term has a decimal in it, it comes through as '9\.4', we need to take out the \
      // the same for negative numbers
      // TODO: I suspect the right answer is to look at escapeRegExp at the top of this code file, maybe it's not needed?
      var tempFloat = parseFloat(term.replace(/\\\./,'.').replace(/\\\-/,'-'));
      if (!isNaN(tempFloat)) {
        term = tempFloat;
      }
    }

    if (filter.flags.date === true) {
      value = new Date(value);
      // If the term has a dash in it, it comes through as '\-' -- we need to take out the '\'.
      term = new Date(term.replace(/\\/g, ''));
    }

    if (filter.condition === uiGridConstants.filter.GREATER_THAN) {
      return (value > term);
    }

    if (filter.condition === uiGridConstants.filter.GREATER_THAN_OR_EQUAL) {
      return (value >= term);
    }

    if (filter.condition === uiGridConstants.filter.LESS_THAN) {
      return (value < term);
    }

    if (filter.condition === uiGridConstants.filter.LESS_THAN_OR_EQUAL) {
      return (value <= term);
    }

    return true;
  };


  /**
   * @ngdoc boolean
   * @name useExternalFiltering
   * @propertyOf ui.grid.class:GridOptions
   * @description False by default. When enabled, this setting suppresses the internal filtering.
   * All UI logic will still operate, allowing filter conditions to be set and modified.
   * 
   * The external filter logic can listen for the `filterChange` event, which fires whenever
   * a filter has been adjusted.
   */
  /**
   * @ngdoc function
   * @name searchColumn
   * @methodOf ui.grid.service:rowSearcher
   * @description Process provided filters on provided column against a given row. If the row meets 
   * the conditions on all the filters, return true.
   * @param {Grid} grid Grid to search in
   * @param {GridRow} row Row to search on
   * @param {GridCol} column Column with the filters to use
   * @param {array} filters array of pre-parsed/preprocessed filters to apply
   * @returns {boolean} Whether the column matches or not.
   */
  rowSearcher.searchColumn = function searchColumn(grid, row, column, filters) {
    if (grid.options.useExternalFiltering) {
      return true;
    }

    var filtersLength = filters.length;
    for (var i = 0; i < filtersLength; i++) {
      var filter = filters[i];

      var ret = rowSearcher.runColumnFilter(grid, row, column, filter);
      if (!ret) {
        return false;
      }
    }

    return true;
  };


  /**
   * @ngdoc function
   * @name search
   * @methodOf ui.grid.service:rowSearcher
   * @description Run a search across the given rows and columns, marking any rows that don't 
   * match the stored col.filters or col.filter as invisible.
   * @param {Grid} grid Grid instance to search inside
   * @param {Array[GridRow]} rows GridRows to filter
   * @param {Array[GridColumn]} columns GridColumns with filters to process
   */
  rowSearcher.search = function search(grid, rows, columns) {
    /*
     * Added performance optimisations into this code base, as this logic creates deeply nested
     * loops and is therefore very performance sensitive.  In particular, avoiding forEach as
     * this impacts some browser optimisers (particularly Chrome), using iterators instead
     */

    // Don't do anything if we weren't passed any rows
    if (!rows) {
      return;
    }

    // don't filter if filtering currently disabled
    if (!grid.options.enableFiltering){
      return rows;
    }

    // Build list of filters to apply
    var filterData = [];

    var colsLength = columns.length;

    var hasTerm = function( filters ) {
      var hasTerm = false;

      filters.forEach( function (filter) {
        if ( !gridUtil.isNullOrUndefined(filter.term) && filter.term !== '' || filter.noTerm ){
          hasTerm = true;
        }
      });

      return hasTerm;
    };

    for (var i = 0; i < colsLength; i++) {
      var col = columns[i];

      if (typeof(col.filters) !== 'undefined' && hasTerm(col.filters) ) {
        filterData.push( { col: col, filters: rowSearcher.setupFilters(col.filters) } );
      }
    }

    if (filterData.length > 0) {
      // define functions outside the loop, performance optimisation
      var foreachRow = function(grid, row, col, filters){
        if ( row.visible && !rowSearcher.searchColumn(grid, row, col, filters) ) {
          row.visible = false;
        }
      };

      var foreachFilterCol = function(grid, filterData){
        var rowsLength = rows.length;
        for ( var i = 0; i < rowsLength; i++){
          foreachRow(grid, rows[i], filterData.col, filterData.filters);  
        }
      };

      // nested loop itself - foreachFilterCol, which in turn calls foreachRow
      var filterDataLength = filterData.length;
      for ( var j = 0; j < filterDataLength; j++){
        foreachFilterCol( grid, filterData[j] );  
      }

      if (grid.api.core.raise.rowsVisibleChanged) {
        grid.api.core.raise.rowsVisibleChanged();
      }

      // drop any invisible rows
      // keeping these, as needed with filtering for trees - we have to come back and make parent nodes visible if child nodes are selected in the filter
      // rows = rows.filter(function(row){ return row.visible; });

    }

    return rows;
  };

  return rowSearcher;
}]);

})();

(function() {

var module = angular.module('ui.grid');

/**
 * @ngdoc object
 * @name ui.grid.class:RowSorter
 * @description RowSorter provides the default sorting mechanisms, 
 * including guessing column types and applying appropriate sort 
 * algorithms
 * 
 */ 

module.service('rowSorter', ['$parse', 'uiGridConstants', function ($parse, uiGridConstants) {
  var currencyRegexStr = 
    '(' +
    uiGridConstants.CURRENCY_SYMBOLS
      .map(function (a) { return '\\' + a; }) // Escape all the currency symbols ($ at least will jack up this regex)
      .join('|') + // Join all the symbols together with |s
    ')?';

  // /^[-+]?[£$¤¥]?[\d,.]+%?$/
  var numberStrRegex = new RegExp('^[-+]?' + currencyRegexStr + '[\\d,.]+' + currencyRegexStr + '%?$');

  var rowSorter = {
    // Cache of sorting functions. Once we create them, we don't want to keep re-doing it
    //   this takes a piece of data from the cell and tries to determine its type and what sorting
    //   function to use for it
    colSortFnCache: {}
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name guessSortFn
   * @description Assigns a sort function to use based on the itemType in the column
   * @param {string} itemType one of 'number', 'boolean', 'string', 'date', 'object'.  And
   * error will be thrown for any other type.
   * @returns {function} a sort function that will sort that type
   */
  rowSorter.guessSortFn = function guessSortFn(itemType) {
    switch (itemType) {
      case "number":
        return rowSorter.sortNumber;
      case "numberStr":
        return rowSorter.sortNumberStr;
      case "boolean":
        return rowSorter.sortBool;
      case "string":
        return rowSorter.sortAlpha;
      case "date":
        return rowSorter.sortDate;
      case "object":
        return rowSorter.basicSort;
      default:
        throw new Error('No sorting function found for type:' + itemType);
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name handleNulls
   * @description Sorts nulls and undefined to the bottom (top when
   * descending).  Called by each of the internal sorters before
   * attempting to sort.  Note that this method is available on the core api
   * via gridApi.core.sortHandleNulls
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} null if there were no nulls/undefineds, otherwise returns
   * a sort value that should be passed back from the sort function
   */
  rowSorter.handleNulls = function handleNulls(a, b) {
    // We want to allow zero values and false values to be evaluated in the sort function
    if ((!a && a !== 0 && a !== false) || (!b && b !== 0 && b !== false)) {
      // We want to force nulls and such to the bottom when we sort... which effectively is "greater than"
      if ((!a && a !== 0 && a !== false) && (!b && b !== 0 && b !== false)) {
        return 0;
      }
      else if (!a && a !== 0 && a !== false) {
        return 1;
      }
      else if (!b && b !== 0 && b !== false) {
        return -1;
      }
    }
    return null;
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name basicSort
   * @description Sorts any values that provide the < method, including strings
   * or numbers.  Handles nulls and undefined through calling handleNulls 
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.basicSort = function basicSort(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      if (a === b) {
        return 0;
      }
      if (a < b) {
        return -1;
      }
      return 1;
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sortNumber
   * @description Sorts numerical values.  Handles nulls and undefined through calling handleNulls 
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.sortNumber = function sortNumber(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      return a - b;
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sortNumberStr
   * @description Sorts numerical values that are stored in a string (i.e. parses them to numbers first).  
   * Handles nulls and undefined through calling handleNulls 
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.sortNumberStr = function sortNumberStr(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      var numA, // The parsed number form of 'a'
          numB, // The parsed number form of 'b'
          badA = false,
          badB = false;
  
      // Try to parse 'a' to a float
      numA = parseFloat(a.replace(/[^0-9.-]/g, ''));
  
      // If 'a' couldn't be parsed to float, flag it as bad
      if (isNaN(numA)) {
          badA = true;
      }
  
      // Try to parse 'b' to a float
      numB = parseFloat(b.replace(/[^0-9.-]/g, ''));
  
      // If 'b' couldn't be parsed to float, flag it as bad
      if (isNaN(numB)) {
          badB = true;
      }
  
      // We want bad ones to get pushed to the bottom... which effectively is "greater than"
      if (badA && badB) {
          return 0;
      }
  
      if (badA) {
          return 1;
      }
  
      if (badB) {
          return -1;
      }
  
      return numA - numB;
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sortAlpha
   * @description Sorts string values. Handles nulls and undefined through calling handleNulls 
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.sortAlpha = function sortAlpha(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      var strA = a.toString().toLowerCase(),
          strB = b.toString().toLowerCase();
  
      return strA === strB ? 0 : (strA < strB ? -1 : 1);
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sortDate
   * @description Sorts date values. Handles nulls and undefined through calling handleNulls.
   * Handles date strings by converting to Date object if not already an instance of Date
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.sortDate = function sortDate(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      if (!(a instanceof Date)) {
        a = new Date(a);
      }
      if (!(b instanceof Date)){
        b = new Date(b);
      }
      var timeA = a.getTime(),
          timeB = b.getTime();
  
      return timeA === timeB ? 0 : (timeA < timeB ? -1 : 1);
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sortBool
   * @description Sorts boolean values, true is considered larger than false. 
   * Handles nulls and undefined through calling handleNulls 
   * @param {object} a sort value a
   * @param {object} b sort value b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.sortBool = function sortBool(a, b) {
    var nulls = rowSorter.handleNulls(a, b);
    if ( nulls !== null ){
      return nulls;
    } else {
      if (a && b) {
        return 0;
      }
  
      if (!a && !b) {
        return 0;
      }
      else {
        return a ? 1 : -1;
      }
    }
  };


  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name getSortFn
   * @description Get the sort function for the column.  Looks first in 
   * rowSorter.colSortFnCache using the column name, failing that it
   * looks at col.sortingAlgorithm (and puts it in the cache), failing that
   * it guesses the sort algorithm based on the data type.
   * 
   * The cache currently seems a bit pointless, as none of the work we do is
   * processor intensive enough to need caching.  Presumably in future we might
   * inspect the row data itself to guess the sort function, and in that case
   * it would make sense to have a cache, the infrastructure is in place to allow
   * that.
   * 
   * @param {Grid} grid the grid to consider
   * @param {GridCol} col the column to find a function for
   * @param {array} rows an array of grid rows.  Currently unused, but presumably in future
   * we might inspect the rows themselves to decide what sort of data might be there
   * @returns {function} the sort function chosen for the column
   */
  rowSorter.getSortFn = function getSortFn(grid, col, rows) {
    var sortFn, item;

    // See if we already figured out what to use to sort the column and have it in the cache
    if (rowSorter.colSortFnCache[col.colDef.name]) {
      sortFn = rowSorter.colSortFnCache[col.colDef.name];
    }
    // If the column has its OWN sorting algorithm, use that
    else if (col.sortingAlgorithm !== undefined) {
      sortFn = col.sortingAlgorithm;
      rowSorter.colSortFnCache[col.colDef.name] = col.sortingAlgorithm;
    }
    // Always default to sortAlpha when sorting after a cellFilter
    else if ( col.sortCellFiltered && col.cellFilter ){
      sortFn = rowSorter.sortAlpha;
      rowSorter.colSortFnCache[col.colDef.name] = sortFn;
    }
    // Try and guess what sort function to use
    else {
      // Guess the sort function
      sortFn = rowSorter.guessSortFn(col.colDef.type);

      // If we found a sort function, cache it
      if (sortFn) {
        rowSorter.colSortFnCache[col.colDef.name] = sortFn;
      }
      else {
        // We assign the alpha sort because anything that is null/undefined will never get passed to
        // the actual sorting function. It will get caught in our null check and returned to be sorted
        // down to the bottom
        sortFn = rowSorter.sortAlpha;
      }
    }

    return sortFn;
  };



  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name prioritySort
   * @description Used where multiple columns are present in the sort criteria,
   * we determine which column should take precedence in the sort by sorting
   * the columns based on their sort.priority
   * 
   * @param {gridColumn} a column a
   * @param {gridColumn} b column b
   * @returns {number} normal sort function, returns -ve, 0, +ve
   */
  rowSorter.prioritySort = function (a, b) {
    // Both columns have a sort priority
    if (a.sort.priority !== undefined && b.sort.priority !== undefined) {
      // A is higher priority
      if (a.sort.priority < b.sort.priority) {
        return -1;
      }
      // Equal
      else if (a.sort.priority === b.sort.priority) {
        return 0;
      }
      // B is higher
      else {
        return 1;
      }
    }
    // Only A has a priority
    else if (a.sort.priority || a.sort.priority === 0) {
      return -1;
    }
    // Only B has a priority
    else if (b.sort.priority || b.sort.priority === 0) {
      return 1;
    }
    // Neither has a priority
    else {
      return 0;
    }
  };


  /**
   * @ngdoc object
   * @name useExternalSorting
   * @propertyOf ui.grid.class:GridOptions
   * @description Prevents the internal sorting from executing.  Events will
   * still be fired when the sort changes, and the sort information on
   * the columns will be updated, allowing an external sorter (for example,
   * server sorting) to be implemented.  Defaults to false. 
   * 
   */
  /**
   * @ngdoc method
   * @methodOf ui.grid.class:RowSorter
   * @name sort
   * @description sorts the grid 
   * @param {Object} grid the grid itself
   * @param {array} rows the rows to be sorted
   * @param {array} columns the columns in which to look
   * for sort criteria
   * @returns {array} sorted rows
   */
  rowSorter.sort = function rowSorterSort(grid, rows, columns) {
    // first make sure we are even supposed to do work
    if (!rows) {
      return;
    }
    
    if (grid.options.useExternalSorting){
      return rows;
    }

    // Build the list of columns to sort by
    var sortCols = [];
    columns.forEach(function (col) {
      if (col.sort && !col.sort.ignoreSort && col.sort.direction && (col.sort.direction === uiGridConstants.ASC || col.sort.direction === uiGridConstants.DESC)) {
        sortCols.push(col);
      }
    });

    // Sort the "sort columns" by their sort priority
    sortCols = sortCols.sort(rowSorter.prioritySort);

    // Now rows to sort by, maintain original order
    if (sortCols.length === 0) {
      return rows;
    }
    
    // Re-usable variables
    var col, direction;

    // put a custom index field on each row, used to make a stable sort out of unstable sorts (e.g. Chrome)
    var setIndex = function( row, idx ){
      row.entity.$$uiGridIndex = idx;
    };
    rows.forEach(setIndex);

    // IE9-11 HACK.... the 'rows' variable would be empty where we call rowSorter.getSortFn(...) below. We have to use a separate reference
    // var d = data.slice(0);
    var r = rows.slice(0);

    // Now actually sort the data
    var rowSortFn = function (rowA, rowB) {
      var tem = 0,
          idx = 0,
          sortFn;

      while (tem === 0 && idx < sortCols.length) {
        // grab the metadata for the rest of the logic
        col = sortCols[idx];
        direction = sortCols[idx].sort.direction;

        sortFn = rowSorter.getSortFn(grid, col, r);
        
        var propA, propB;

        if ( col.sortCellFiltered ){
          propA = grid.getCellDisplayValue(rowA, col);
          propB = grid.getCellDisplayValue(rowB, col);
        } else {
          propA = grid.getCellValue(rowA, col);
          propB = grid.getCellValue(rowB, col);
        }

        tem = sortFn(propA, propB);

        idx++;
      }

      // Chrome doesn't implement a stable sort function.  If our sort returns 0 
      // (i.e. the items are equal), and we're at the last sort column in the list,
      // then return the previous order using our custom
      // index variable
      if (tem === 0 ) {
        return rowA.entity.$$uiGridIndex - rowB.entity.$$uiGridIndex;
      }
      
      // Made it this far, we don't have to worry about null & undefined
      if (direction === uiGridConstants.ASC) {
        return tem;
      } else {
        return 0 - tem;
      }
    };

    var newRows = rows.sort(rowSortFn);
    
    // remove the custom index field on each row, used to make a stable sort out of unstable sorts (e.g. Chrome)
    var clearIndex = function( row, idx ){
       delete row.entity.$$uiGridIndex;
    };
    rows.forEach(clearIndex);
    
    return newRows;
  };

  return rowSorter;
}]);

})();

(function() {

var module = angular.module('ui.grid');

var bindPolyfill;
if (typeof Function.prototype.bind !== "function") {
  bindPolyfill = function() {
    var slice = Array.prototype.slice;
    return function(context) {
      var fn = this,
        args = slice.call(arguments, 1);
      if (args.length) {
        return function() {
          return arguments.length ? fn.apply(context, args.concat(slice.call(arguments))) : fn.apply(context, args);
        };
      }
      return function() {
        return arguments.length ? fn.apply(context, arguments) : fn.call(context);
      };
    };
  };
}

function getStyles (elem) {
  var e = elem;
  if (typeof(e.length) !== 'undefined' && e.length) {
    e = elem[0];
  }

  return e.ownerDocument.defaultView.getComputedStyle(e, null);
}

var rnumnonpx = new RegExp( "^(" + (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source + ")(?!px)[a-z%]+$", "i" ),
    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(block|none|table(?!-c[ea]).+)/,
    cssShow = { position: "absolute", visibility: "hidden", display: "block" };

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
  var i = extra === ( isBorderBox ? 'border' : 'content' ) ?
          // If we already have the right measurement, avoid augmentation
          4 :
          // Otherwise initialize for horizontal or vertical properties
          name === 'width' ? 1 : 0,

          val = 0;

  var sides = ['Top', 'Right', 'Bottom', 'Left'];

  for ( ; i < 4; i += 2 ) {
    var side = sides[i];
    // dump('side', side);

    // both box models exclude margin, so add it if we want it
    if ( extra === 'margin' ) {
      var marg = parseFloat(styles[extra + side]);
      if (!isNaN(marg)) {
        val += marg;
      }
    }
    // dump('val1', val);

    if ( isBorderBox ) {
      // border-box includes padding, so remove it if we want content
      if ( extra === 'content' ) {
        var padd = parseFloat(styles['padding' + side]);
        if (!isNaN(padd)) {
          val -= padd;
          // dump('val2', val);
        }
      }

      // at this point, extra isn't border nor margin, so remove border
      if ( extra !== 'margin' ) {
        var bordermarg = parseFloat(styles['border' + side + 'Width']);
        if (!isNaN(bordermarg)) {
          val -= bordermarg;
          // dump('val3', val);
        }
      }
    }
    else {
      // at this point, extra isn't content, so add padding
      var nocontentPad = parseFloat(styles['padding' + side]);
      if (!isNaN(nocontentPad)) {
        val += nocontentPad;
        // dump('val4', val);
      }

      // at this point, extra isn't content nor padding, so add border
      if ( extra !== 'padding') {
        var nocontentnopad = parseFloat(styles['border' + side + 'Width']);
        if (!isNaN(nocontentnopad)) {
          val += nocontentnopad;
          // dump('val5', val);
        }
      }
    }
  }

  // dump('augVal', val);

  return val;
}

function getWidthOrHeight( elem, name, extra ) {
  // Start with offset property, which is equivalent to the border-box value
  var valueIsBorderBox = true,
          val, // = name === 'width' ? elem.offsetWidth : elem.offsetHeight,
          styles = getStyles(elem),
          isBorderBox = styles['boxSizing'] === 'border-box';

  // some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
  if ( val <= 0 || val == null ) {
    // Fall back to computed then uncomputed css if necessary
    val = styles[name];
    if ( val < 0 || val == null ) {
      val = elem.style[ name ];
    }

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val) ) {
      return val;
    }

    // we need the check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    valueIsBorderBox = isBorderBox &&
            ( true || val === elem.style[ name ] ); // use 'true' instead of 'support.boxSizingReliable()'

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ) || 0;
  }

  // use the active box-sizing model to add/subtract irrelevant styles
  var ret = ( val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || ( isBorderBox ? "border" : "content" ),
      valueIsBorderBox,
      styles
    )
  );

  // dump('ret', ret, val);
  return ret;
}

function getLineHeight(elm) {
  elm = angular.element(elm)[0];
  var parent = elm.parentElement;

  if (!parent) {
    parent = document.getElementsByTagName('body')[0];
  }

  return parseInt( getStyles(parent).fontSize ) || parseInt( getStyles(elm).fontSize ) || 16;
}

var uid = ['0', '0', '0'];
var uidPrefix = 'uiGrid-';

/**
 *  @ngdoc service
 *  @name ui.grid.service:GridUtil
 *
 *  @description Grid utility functions
 */
module.service('gridUtil', ['$log', '$window', '$document', '$http', '$templateCache', '$timeout', '$interval', '$injector', '$q', '$interpolate', 'uiGridConstants',
  function ($log, $window, $document, $http, $templateCache, $timeout, $interval, $injector, $q, $interpolate, uiGridConstants) {
  var s = {

    augmentWidthOrHeight: augmentWidthOrHeight,

    getStyles: getStyles,

    /**
     * @ngdoc method
     * @name createBoundedWrapper
     * @methodOf ui.grid.service:GridUtil
     *
     * @param {object} Object to bind 'this' to
     * @param {method} Method to bind
     * @returns {Function} The wrapper that performs the binding
     *
     * @description
     * Binds given method to given object.
     *
     * By means of a wrapper, ensures that ``method`` is always bound to
     * ``object`` regardless of its calling environment.
     * Iow, inside ``method``, ``this`` always points to ``object``.
     *
     * See http://alistapart.com/article/getoutbindingsituations
     *
     */
    createBoundedWrapper: function(object, method) {
        return function() {
            return method.apply(object, arguments);
        };
    },


    /**
     * @ngdoc method
     * @name readableColumnName
     * @methodOf ui.grid.service:GridUtil
     *
     * @param {string} columnName Column name as a string
     * @returns {string} Column name appropriately capitalized and split apart
     *
       @example
       <example module="app">
        <file name="app.js">
          var app = angular.module('app', ['ui.grid']);

          app.controller('MainCtrl', ['$scope', 'gridUtil', function ($scope, gridUtil) {
            $scope.name = 'firstName';
            $scope.columnName = function(name) {
              return gridUtil.readableColumnName(name);
            };
          }]);
        </file>
        <file name="index.html">
          <div ng-controller="MainCtrl">
            <strong>Column name:</strong> <input ng-model="name" />
            <br>
            <strong>Output:</strong> <span ng-bind="columnName(name)"></span>
          </div>
        </file>
      </example>
     */
    readableColumnName: function (columnName) {
      // Convert underscores to spaces
      if (typeof(columnName) === 'undefined' || columnName === undefined || columnName === null) { return columnName; }

      if (typeof(columnName) !== 'string') {
        columnName = String(columnName);
      }

      return columnName.replace(/_+/g, ' ')
        // Replace a completely all-capsed word with a first-letter-capitalized version
        .replace(/^[A-Z]+$/, function (match) {
          return angular.lowercase(angular.uppercase(match.charAt(0)) + match.slice(1));
        })
        // Capitalize the first letter of words
        .replace(/([\w\u00C0-\u017F]+)/g, function (match) {
          return angular.uppercase(match.charAt(0)) + match.slice(1);
        })
        // Put a space in between words that have partial capilizations (i.e. 'firstName' becomes 'First Name')
        // .replace(/([A-Z]|[A-Z]\w+)([A-Z])/g, "$1 $2");
        // .replace(/(\w+?|\w)([A-Z])/g, "$1 $2");
        .replace(/(\w+?(?=[A-Z]))/g, '$1 ');
    },

    /**
     * @ngdoc method
     * @name getColumnsFromData
     * @methodOf ui.grid.service:GridUtil
     * @description Return a list of column names, given a data set
     *
     * @param {string} data Data array for grid
     * @returns {Object} Column definitions with field accessor and column name
     *
     * @example
       <pre>
         var data = [
           { firstName: 'Bob', lastName: 'Jones' },
           { firstName: 'Frank', lastName: 'Smith' }
         ];

         var columnDefs = GridUtil.getColumnsFromData(data, excludeProperties);

         columnDefs == [
          {
            field: 'firstName',
            name: 'First Name'
          },
          {
            field: 'lastName',
            name: 'Last Name'
          }
         ];
       </pre>
     */
    getColumnsFromData: function (data, excludeProperties) {
      var columnDefs = [];

      if (!data || typeof(data[0]) === 'undefined' || data[0] === undefined) { return []; }
      if (angular.isUndefined(excludeProperties)) { excludeProperties = []; }

      var item = data[0];

      angular.forEach(item,function (prop, propName) {
        if ( excludeProperties.indexOf(propName) === -1){
          columnDefs.push({
            name: propName
          });
        }
      });

      return columnDefs;
    },

    /**
     * @ngdoc method
     * @name newId
     * @methodOf ui.grid.service:GridUtil
     * @description Return a unique ID string
     *
     * @returns {string} Unique string
     *
     * @example
       <pre>
        var id = GridUtil.newId();

        # 1387305700482;
       </pre>
     */
    newId: (function() {
      var seedId = new Date().getTime();
      return function() {
          return seedId += 1;
      };
    })(),


    /**
     * @ngdoc method
     * @name getTemplate
     * @methodOf ui.grid.service:GridUtil
     * @description Get's template from cache / element / url
     *
     * @param {string|element|promise} Either a string representing the template id, a string representing the template url,
     *   an jQuery/Angualr element, or a promise that returns the template contents to use.
     * @returns {object} a promise resolving to template contents
     *
     * @example
     <pre>
     GridUtil.getTemplate(url).then(function (contents) {
          alert(contents);
        })
     </pre>
     */
    getTemplate: function (template) {
      // Try to fetch the template out of the templateCache
      if ($templateCache.get(template)) {
        return s.postProcessTemplate($templateCache.get(template));
      }

      // See if the template is itself a promise
      if (template.hasOwnProperty('then')) {
        return template.then(s.postProcessTemplate);
      }

      // If the template is an element, return the element
      try {
        if (angular.element(template).length > 0) {
          return $q.when(template).then(s.postProcessTemplate);
        }
      }
      catch (err){
        //do nothing; not valid html
      }

      s.logDebug('fetching url', template);

      // Default to trying to fetch the template as a url with $http
      return $http({ method: 'GET', url: template})
        .then(
          function (result) {
            var templateHtml = result.data.trim();
            //put in templateCache for next call
            $templateCache.put(template, templateHtml);
            return templateHtml;
          },
          function (err) {
            throw new Error("Could not get template " + template + ": " + err);
          }
        )
        .then(s.postProcessTemplate);
    },

    //
    postProcessTemplate: function (template) {
      var startSym = $interpolate.startSymbol(),
          endSym = $interpolate.endSymbol();

      // If either of the interpolation symbols have been changed, we need to alter this template
      if (startSym !== '{{' || endSym !== '}}') {
        template = template.replace(/\{\{/g, startSym);
        template = template.replace(/\}\}/g, endSym);
      }

      return $q.when(template);
    },

    /**
     * @ngdoc method
     * @name guessType
     * @methodOf ui.grid.service:GridUtil
     * @description guesses the type of an argument
     *
     * @param {string/number/bool/object} item variable to examine
     * @returns {string} one of the following
     * - 'string'
     * - 'boolean'
     * - 'number'
     * - 'date'
     * - 'object'
     */
    guessType : function (item) {
      var itemType = typeof(item);

      // Check for numbers and booleans
      switch (itemType) {
        case "number":
        case "boolean":
        case "string":
          return itemType;
        default:
          if (angular.isDate(item)) {
            return "date";
          }
          return "object";
      }
    },


  /**
    * @ngdoc method
    * @name elementWidth
    * @methodOf ui.grid.service:GridUtil
    *
    * @param {element} element DOM element
    * @param {string} [extra] Optional modifier for calculation. Use 'margin' to account for margins on element
    *
    * @returns {number} Element width in pixels, accounting for any borders, etc.
    */
    elementWidth: function (elem) {

    },

    /**
    * @ngdoc method
    * @name elementHeight
    * @methodOf ui.grid.service:GridUtil
    *
    * @param {element} element DOM element
    * @param {string} [extra] Optional modifier for calculation. Use 'margin' to account for margins on element
    *
    * @returns {number} Element height in pixels, accounting for any borders, etc.
    */
    elementHeight: function (elem) {

    },

    // Thanks to http://stackoverflow.com/a/13382873/888165
    getScrollbarWidth: function() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    },

    swap: function( elem, options, callback, args ) {
      var ret, name,
              old = {};

      // Remember the old values, and insert the new ones
      for ( name in options ) {
        old[ name ] = elem.style[ name ];
        elem.style[ name ] = options[ name ];
      }

      ret = callback.apply( elem, args || [] );

      // Revert the old values
      for ( name in options ) {
        elem.style[ name ] = old[ name ];
      }

      return ret;
    },

    fakeElement: function( elem, options, callback, args ) {
      var ret, name,
          newElement = angular.element(elem).clone()[0];

      for ( name in options ) {
        newElement.style[ name ] = options[ name ];
      }

      angular.element(document.body).append(newElement);

      ret = callback.call( newElement, newElement );

      angular.element(newElement).remove();

      return ret;
    },

    /**
    * @ngdoc method
    * @name normalizeWheelEvent
    * @methodOf ui.grid.service:GridUtil
    *
    * @param {event} event A mouse wheel event
    *
    * @returns {event} A normalized event
    *
    * @description
    * Given an event from this list:
    *
    * `wheel, mousewheel, DomMouseScroll, MozMousePixelScroll`
    *
    * "normalize" it
    * so that it stays consistent no matter what browser it comes from (i.e. scale it correctly and make sure the direction is right.)
    */
    normalizeWheelEvent: function (event) {
      // var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
      // var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
      var lowestDelta, lowestDeltaXY;

      var orgEvent   = event || window.event,
          args       = [].slice.call(arguments, 1),
          delta      = 0,
          deltaX     = 0,
          deltaY     = 0,
          absDelta   = 0,
          absDeltaXY = 0,
          fn;

      // event = $.event.fix(orgEvent);
      // event.type = 'mousewheel';

      // NOTE: jQuery masks the event and stores it in the event as originalEvent
      if (orgEvent.originalEvent) {
        orgEvent = orgEvent.originalEvent;
      }

      // Old school scrollwheel delta
      if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
      if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

      // At a minimum, setup the deltaY to be delta
      deltaY = delta;

      // Firefox < 17 related to DOMMouseScroll event
      if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
          deltaY = 0;
          deltaX = delta * -1;
      }

      // New school wheel delta (wheel event)
      if ( orgEvent.deltaY ) {
          deltaY = orgEvent.deltaY * -1;
          delta  = deltaY;
      }
      if ( orgEvent.deltaX ) {
          deltaX = orgEvent.deltaX;
          delta  = deltaX * -1;
      }

      // Webkit
      if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
      if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX; }

      // Look for lowest delta to normalize the delta values
      absDelta = Math.abs(delta);
      if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
      absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
      if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

      // Get a whole value for the deltas
      fn     = delta > 0 ? 'floor' : 'ceil';
      delta  = Math[fn](delta  / lowestDelta);
      deltaX = Math[fn](deltaX / lowestDeltaXY);
      deltaY = Math[fn](deltaY / lowestDeltaXY);

      return {
        delta: delta,
        deltaX: deltaX,
        deltaY: deltaY
      };
    },

    // Stolen from Modernizr
    // TODO: make this, and everythign that flows from it, robust
    //http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
    isTouchEnabled: function() {
      var bool;

      if (('ontouchstart' in $window) || $window.DocumentTouch && $document instanceof DocumentTouch) {
        bool = true;
      }

      return bool;
    },

    isNullOrUndefined: function(obj) {
      if (obj === undefined || obj === null) {
        return true;
      }
      return false;
    },

    endsWith: function(str, suffix) {
      if (!str || !suffix || typeof str !== "string") {
        return false;
      }
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    arrayContainsObjectWithProperty: function(array, propertyName, propertyValue) {
        var found = false;
        angular.forEach(array, function (object) {
            if (object[propertyName] === propertyValue) {
                found = true;
            }
        });
        return found;
    },

    //// Shim requestAnimationFrame
    //requestAnimationFrame: $window.requestAnimationFrame && $window.requestAnimationFrame.bind($window) ||
    //                       $window.webkitRequestAnimationFrame && $window.webkitRequestAnimationFrame.bind($window) ||
    //                       function(fn) {
    //                         return $timeout(fn, 10, false);
    //                       },

    numericAndNullSort: function (a, b) {
      if (a === null) { return 1; }
      if (b === null) { return -1; }
      if (a === null && b === null) { return 0; }
      return a - b;
    },

    // Disable ngAnimate animations on an element
    disableAnimations: function (element) {
      var $animate;
      try {
        $animate = $injector.get('$animate');
        $animate.enabled(false, element);
      }
      catch (e) {}
    },

    enableAnimations: function (element) {
      var $animate;
      try {
        $animate = $injector.get('$animate');
        $animate.enabled(true, element);
        return $animate;
      }
      catch (e) {}
    },

    // Blatantly stolen from Angular as it isn't exposed (yet. 2.0 maybe?)
    nextUid: function nextUid() {
      var index = uid.length;
      var digit;

      while (index) {
        index--;
        digit = uid[index].charCodeAt(0);
        if (digit === 57 /*'9'*/) {
          uid[index] = 'A';
          return uidPrefix + uid.join('');
        }
        if (digit === 90  /*'Z'*/) {
          uid[index] = '0';
        } else {
          uid[index] = String.fromCharCode(digit + 1);
          return uidPrefix + uid.join('');
        }
      }
      uid.unshift('0');

      return uidPrefix + uid.join('');
    },

    // Blatantly stolen from Angular as it isn't exposed (yet. 2.0 maybe?)
    hashKey: function hashKey(obj) {
      var objType = typeof obj,
          key;

      if (objType === 'object' && obj !== null) {
        if (typeof (key = obj.$$hashKey) === 'function') {
          // must invoke on object to keep the right this
          key = obj.$$hashKey();
        }
        else if (typeof(obj.$$hashKey) !== 'undefined' && obj.$$hashKey) {
          key = obj.$$hashKey;
        }
        else if (key === undefined) {
          key = obj.$$hashKey = s.nextUid();
        }
      }
      else {
        key = obj;
      }

      return objType + ':' + key;
    },

    resetUids: function () {
      uid = ['0', '0', '0'];
    },

    /**
     * @ngdoc method
     * @methodOf ui.grid.service:GridUtil
     * @name logError
     * @description wraps the $log method, allowing us to choose different
     * treatment within ui-grid if we so desired.  At present we only log
     * error messages if uiGridConstants.LOG_ERROR_MESSAGES is set to true
     * @param {string} logMessage message to be logged to the console
     *
     */
    logError: function( logMessage ){
      if ( uiGridConstants.LOG_ERROR_MESSAGES ){
        $log.error( logMessage );
      }
    },

    /**
     * @ngdoc method
     * @methodOf ui.grid.service:GridUtil
     * @name logWarn
     * @description wraps the $log method, allowing us to choose different
     * treatment within ui-grid if we so desired.  At present we only log
     * warning messages if uiGridConstants.LOG_WARN_MESSAGES is set to true
     * @param {string} logMessage message to be logged to the console
     *
     */
    logWarn: function( logMessage ){
      if ( uiGridConstants.LOG_WARN_MESSAGES ){
        $log.warn( logMessage );
      }
    },

    /**
     * @ngdoc method
     * @methodOf ui.grid.service:GridUtil
     * @name logDebug
     * @description wraps the $log method, allowing us to choose different
     * treatment within ui-grid if we so desired.  At present we only log
     * debug messages if uiGridConstants.LOG_DEBUG_MESSAGES is set to true
     *
     */
    logDebug: function() {
      if ( uiGridConstants.LOG_DEBUG_MESSAGES ){
        $log.debug.apply($log, arguments);
      }
    }

  };

  ['width', 'height'].forEach(function (name) {
    var capsName = angular.uppercase(name.charAt(0)) + name.substr(1);
    s['element' + capsName] = function (elem, extra) {
      var e = elem;
      if (e && typeof(e.length) !== 'undefined' && e.length) {
        e = elem[0];
      }

      if (e) {
        var styles = getStyles(e);
        return e.offsetWidth === 0 && rdisplayswap.test(styles.display) ?
                  s.swap(e, cssShow, function() {
                    return getWidthOrHeight(e, name, extra );
                  }) :
                  getWidthOrHeight( e, name, extra );
      }
      else {
        return null;
      }
    };

    s['outerElement' + capsName] = function (elem, margin) {
      return elem ? s['element' + capsName].call(this, elem, margin ? 'margin' : 'border') : null;
    };
  });

  // http://stackoverflow.com/a/24107550/888165
  s.closestElm = function closestElm(el, selector) {
    if (typeof(el.length) !== 'undefined' && el.length) {
      el = el[0];
    }

    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    // traverse parents
    var parent;
    while (el !== null) {
      parent = el.parentElement;
      if (parent !== null && parent[matchesFn](selector)) {
          return parent;
      }
      el = parent;
    }

    return null;
  };

  s.type = function (obj) {
    var text = Function.prototype.toString.call(obj.constructor);
    return text.match(/function (.*?)\(/)[1];
  };

  s.getBorderSize = function getBorderSize(elem, borderType) {
    if (typeof(elem.length) !== 'undefined' && elem.length) {
      elem = elem[0];
    }

    var styles = getStyles(elem);

    // If a specific border is supplied, like 'top', read the 'borderTop' style property
    if (borderType) {
      borderType = 'border' + borderType.charAt(0).toUpperCase() + borderType.slice(1);
    }
    else {
      borderType = 'border';
    }

    borderType += 'Width';

    var val = parseInt(styles[borderType], 10);

    if (isNaN(val)) {
      return 0;
    }
    else {
      return val;
    }
  };

  // http://stackoverflow.com/a/22948274/888165
  // TODO: Opera? Mobile?
  s.detectBrowser = function detectBrowser() {
    var userAgent = $window.navigator.userAgent;

    var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer|trident\//i};

    for (var key in browsers) {
      if (browsers[key].test(userAgent)) {
        return key;
      }
    }

    return 'unknown';
  };

  // Borrowed from https://github.com/othree/jquery.rtl-scroll-type
  // Determine the scroll "type" this browser is using for RTL
  s.rtlScrollType = function rtlScrollType() {
    if (rtlScrollType.type) {
      return rtlScrollType.type;
    }

    var definer = angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>')[0],
        type = 'reverse';

    document.body.appendChild(definer);

    if (definer.scrollLeft > 0) {
      type = 'default';
    }
    else {
      definer.scrollLeft = 1;
      if (definer.scrollLeft === 0) {
        type = 'negative';
      }
    }

    angular.element(definer).remove();
    rtlScrollType.type = type;

    return type;
  };

    /**
     * @ngdoc method
     * @name normalizeScrollLeft
     * @methodOf ui.grid.service:GridUtil
     *
     * @param {element} element The element to get the `scrollLeft` from.
     * @param {grid} grid -  grid used to normalize (uses the rtl property)
     *
     * @returns {number} A normalized scrollLeft value for the current browser.
     *
     * @description
     * Browsers currently handle RTL in different ways, resulting in inconsistent scrollLeft values. This method normalizes them
     */
  s.normalizeScrollLeft = function normalizeScrollLeft(element, grid) {
    if (typeof(element.length) !== 'undefined' && element.length) {
      element = element[0];
    }

    var scrollLeft = element.scrollLeft;

    if (grid.isRTL()) {
      switch (s.rtlScrollType()) {
        case 'default':
          return element.scrollWidth - scrollLeft - element.clientWidth;
        case 'negative':
          return Math.abs(scrollLeft);
        case 'reverse':
          return scrollLeft;
      }
    }

    return scrollLeft;
  };

  /**
  * @ngdoc method
  * @name denormalizeScrollLeft
  * @methodOf ui.grid.service:GridUtil
  *
  * @param {element} element The element to normalize the `scrollLeft` value for
  * @param {number} scrollLeft The `scrollLeft` value to denormalize.
  * @param {grid} grid The grid that owns the scroll event.
  *
  * @returns {number} A normalized scrollLeft value for the current browser.
  *
  * @description
  * Browsers currently handle RTL in different ways, resulting in inconsistent scrollLeft values. This method denormalizes a value for the current browser.
  */
  s.denormalizeScrollLeft = function denormalizeScrollLeft(element, scrollLeft, grid) {
    if (typeof(element.length) !== 'undefined' && element.length) {
      element = element[0];
    }

    if (grid.isRTL()) {
      switch (s.rtlScrollType()) {
        case 'default':
          // Get the max scroll for the element
          var maxScrollLeft = element.scrollWidth - element.clientWidth;

          // Subtract the current scroll amount from the max scroll
          return maxScrollLeft - scrollLeft;
        case 'negative':
          return scrollLeft * -1;
        case 'reverse':
          return scrollLeft;
      }
    }

    return scrollLeft;
  };

    /**
     * @ngdoc method
     * @name preEval
     * @methodOf ui.grid.service:GridUtil
     *
     * @param {string} path Path to evaluate
     *
     * @returns {string} A path that is normalized.
     *
     * @description
     * Takes a field path and converts it to bracket notation to allow for special characters in path
     * @example
     * <pre>
     * gridUtil.preEval('property') == 'property'
     * gridUtil.preEval('nested.deep.prop-erty') = "nested['deep']['prop-erty']"
     * </pre>
     */
  s.preEval = function (path) {
    var m = uiGridConstants.BRACKET_REGEXP.exec(path);
    if (m) {
      return (m[1] ? s.preEval(m[1]) : m[1]) + m[2] + (m[3] ? s.preEval(m[3]) : m[3]);
    } else {
      path = path.replace(uiGridConstants.APOS_REGEXP, '\\\'');
      var parts = path.split(uiGridConstants.DOT_REGEXP);
      var preparsed = [parts.shift()];    // first item must be var notation, thus skip
      angular.forEach(parts, function (part) {
        preparsed.push(part.replace(uiGridConstants.FUNC_REGEXP, '\']$1'));
      });
      return preparsed.join('[\'');
    }
  };

  /**
   * @ngdoc method
   * @name debounce
   * @methodOf ui.grid.service:GridUtil
   *
   * @param {function} func function to debounce
   * @param {number} wait milliseconds to delay
   * @param {boolean} immediate execute before delay
   *
   * @returns {function} A function that can be executed as debounced function
   *
   * @description
   * Copied from https://github.com/shahata/angular-debounce
   * Takes a function, decorates it to execute only 1 time after multiple calls, and returns the decorated function
   * @example
   * <pre>
   * var debouncedFunc =  gridUtil.debounce(function(){alert('debounced');}, 500);
   * debouncedFunc();
   * debouncedFunc();
   * debouncedFunc();
   * </pre>
   */
  s.debounce =  function (func, wait, immediate) {
    var timeout, args, context, result;
    function debounce() {
      /* jshint validthis:true */
      context = this;
      args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
      return result;
    }
    debounce.cancel = function () {
      $timeout.cancel(timeout);
      timeout = null;
    };
    return debounce;
  };

  /**
   * @ngdoc method
   * @name throttle
   * @methodOf ui.grid.service:GridUtil
   *
   * @param {function} func function to throttle
   * @param {number} wait milliseconds to delay after first trigger
   * @param {Object} params to use in throttle.
   *
   * @returns {function} A function that can be executed as throttled function
   *
   * @description
   * Adapted from debounce function (above)
   * Potential keys for Params Object are:
   *    trailing (bool) - whether to trigger after throttle time ends if called multiple times
   * Updated to use $interval rather than $timeout, as protractor (e2e tests) is able to work with $interval,
   * but not with $timeout
   *
   * Note that when using throttle, you need to use throttle to create a new function upfront, then use the function
   * return from that call each time you need to call throttle.  If you call throttle itself repeatedly, the lastCall
   * variable will get overwritten and the throttling won't work
   *
   * @example
   * <pre>
   * var throttledFunc =  gridUtil.throttle(function(){console.log('throttled');}, 500, {trailing: true});
   * throttledFunc(); //=> logs throttled
   * throttledFunc(); //=> queues attempt to log throttled for ~500ms (since trailing param is truthy)
   * throttledFunc(); //=> updates arguments to keep most-recent request, but does not do anything else.
   * </pre>
   */
  s.throttle = function(func, wait, options){
    options = options || {};
    var lastCall = 0, queued = null, context, args;

    function runFunc(endDate){
      lastCall = +new Date();
      func.apply(context, args);
      $interval(function(){ queued = null; }, 0, 1);
    }

    return function(){
      /* jshint validthis:true */
      context = this;
      args = arguments;
      if (queued === null){
        var sinceLast = +new Date() - lastCall;
        if (sinceLast > wait){
          runFunc();
        }
        else if (options.trailing){
          queued = $interval(runFunc, wait - sinceLast, 1);
        }
      }
    };
  };

  s.on = {};
  s.off = {};
  s._events = {};

  s.addOff = function (eventName) {
    s.off[eventName] = function (elm, fn) {
      var idx = s._events[eventName].indexOf(fn);
      if (idx > 0) {
        s._events[eventName].removeAt(idx);
      }
    };
  };

  var mouseWheeltoBind = ( 'onwheel' in document || document.documentMode >= 9 ) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
      nullLowestDeltaTimeout,
      lowestDelta;

  s.on.mousewheel = function (elm, fn) {
    if (!elm || !fn) { return; }

    var $elm = angular.element(elm);

    // Store the line height and page height for this particular element
    $elm.data('mousewheel-line-height', getLineHeight($elm));
    $elm.data('mousewheel-page-height', s.elementHeight($elm));
    if (!$elm.data('mousewheel-callbacks')) { $elm.data('mousewheel-callbacks', {}); }

    var cbs = $elm.data('mousewheel-callbacks');
    cbs[fn] = (Function.prototype.bind || bindPolyfill).call(mousewheelHandler, $elm[0], fn);

    // Bind all the mousew heel events
    for ( var i = mouseWheeltoBind.length; i; ) {
      $elm.on(mouseWheeltoBind[--i], cbs[fn]);
    }
  };
  s.off.mousewheel = function (elm, fn) {
    var $elm = angular.element(this);

    var cbs = $elm.data('mousewheel-callbacks');
    var handler = cbs[fn];

    if (handler) {
      for ( var i = mouseWheeltoBind.length; i; ) {
        $elm.off(mouseWheeltoBind[--i], handler);
      }
    }

    delete cbs[fn];

    if (Object.keys(cbs).length === 0) {
      $elm.removeData('mousewheel-line-height');
      $elm.removeData('mousewheel-page-height');
      $elm.removeData('mousewheel-callbacks');
    }
  };

  function mousewheelHandler(fn, event) {
    var $elm = angular.element(this);

    var delta      = 0,
        deltaX     = 0,
        deltaY     = 0,
        absDelta   = 0,
        offsetX    = 0,
        offsetY    = 0;

    // jQuery masks events
    if (event.originalEvent) { event = event.originalEvent; }

    if ( 'detail'      in event ) { deltaY = event.detail * -1;      }
    if ( 'wheelDelta'  in event ) { deltaY = event.wheelDelta;       }
    if ( 'wheelDeltaY' in event ) { deltaY = event.wheelDeltaY;      }
    if ( 'wheelDeltaX' in event ) { deltaX = event.wheelDeltaX * -1; }

    // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
    if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
      deltaX = deltaY * -1;
      deltaY = 0;
    }

    // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
    delta = deltaY === 0 ? deltaX : deltaY;

    // New school wheel delta (wheel event)
    if ( 'deltaY' in event ) {
      deltaY = event.deltaY * -1;
      delta  = deltaY;
    }
    if ( 'deltaX' in event ) {
      deltaX = event.deltaX;
      if ( deltaY === 0 ) { delta  = deltaX * -1; }
    }

    // No change actually happened, no reason to go any further
    if ( deltaY === 0 && deltaX === 0 ) { return; }

    // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages
    if ( event.deltaMode === 1 ) {
        var lineHeight = $elm.data('mousewheel-line-height');
        delta  *= lineHeight;
        deltaY *= lineHeight;
        deltaX *= lineHeight;
    }
    else if ( event.deltaMode === 2 ) {
        var pageHeight = $elm.data('mousewheel-page-height');
        delta  *= pageHeight;
        deltaY *= pageHeight;
        deltaX *= pageHeight;
    }

    // Store lowest absolute delta to normalize the delta values
    absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

    if ( !lowestDelta || absDelta < lowestDelta ) {
      lowestDelta = absDelta;

      // Adjust older deltas if necessary
      if ( shouldAdjustOldDeltas(event, absDelta) ) {
        lowestDelta /= 40;
      }
    }

    // Get a whole, normalized value for the deltas
    delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
    deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
    deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

    event.deltaMode = 0;

    // Normalise offsetX and offsetY properties
    // if ($elm[0].getBoundingClientRect ) {
    //   var boundingRect = $(elm)[0].getBoundingClientRect();
    //   offsetX = event.clientX - boundingRect.left;
    //   offsetY = event.clientY - boundingRect.top;
    // }

    // event.deltaX = deltaX;
    // event.deltaY = deltaY;
    // event.deltaFactor = lowestDelta;

    var newEvent = {
      originalEvent: event,
      deltaX: deltaX,
      deltaY: deltaY,
      deltaFactor: lowestDelta,
      preventDefault: function () { event.preventDefault(); }
    };

    // Clearout lowestDelta after sometime to better
    // handle multiple device types that give
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120
    if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

    fn.call($elm[0], newEvent);
  }

  function nullLowestDelta() {
    lowestDelta = null;
  }

  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
  }

  return s;
}]);

// Add 'px' to the end of a number string if it doesn't have it already
module.filter('px', function() {
  return function(str) {
    if (str.match(/^[\d\.]+$/)) {
      return str + 'px';
    }
    else {
      return str;
    }
  };
});

})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      var lang = {
              aggregate: {
                  label: 'položky'
              },
              groupPanel: {
                  description: 'Přesuntě záhlaví zde pro vytvoření skupiny dle sloupce.'
              },
              search: {
                  placeholder: 'Hledat...',
                  showingItems: 'Zobrazuji položky:',
                  selectedItems: 'Vybrané položky:',
                  totalItems: 'Celkem položek:',
                  size: 'Velikost strany:',
                  first: 'První strana',
                  next: 'Další strana',
                  previous: 'Předchozí strana',
                  last: 'Poslední strana'
              },
              menu: {
                  text: 'Vyberte sloupec:'
              },
              sort: {
                  ascending: 'Seřadit od A-Z',
                  descending: 'Seřadit od Z-A',
                  remove: 'Odebrat seřazení'
              },
              column: {
                  hide: 'Schovat sloupec'
              },
              aggregation: {
                  count: 'celkem řádků: ',
                  sum: 'celkem: ',
                  avg: 'avg: ',
                  min: 'min.: ',
                  max: 'max.: '
              },
              pinning: {
                  pinLeft: 'Zamknout v levo',
                  pinRight: 'Zamknout v pravo',
                  unpin: 'Odemknout'
              },
              gridMenu: {
                  columns: 'Sloupce:',
                  importerTitle: 'Importovat soubor',
                  exporterAllAsCsv: 'Exportovat všechny data do csv',
                  exporterVisibleAsCsv: 'Exportovat viditelné data do csv',
                  exporterSelectedAsCsv: 'Exportovat vybranné data do csv',
                  exporterAllAsPdf: 'Exportovat všechny data do pdf',
                  exporterVisibleAsPdf: 'Exportovat viditelné data do pdf',
                  exporterSelectedAsPdf: 'Exportovat vybranné data do pdf'
              },
              importer: {
                  noHeaders: 'Názvy sloupců se nepodařilo získat, obsahuje soubor záhlaví?',
                  noObjects: 'Data se nepodařilo zpracovat, obsahuje soubor řádky mimo záhlaví?',
                  invalidCsv: 'Soubor nelze zpracovat, jedná se CSV?',
                  invalidJson: 'Soubor nelze zpracovat, je to JSON?',
                  jsonNotArray: 'Soubor musí obsahovat json. Ukončuji..'
              },
              pagination: {
                  sizes: 'položek na stránku',
                  totalItems: 'položek'
              },
              grouping: {
                  group: 'Seskupit',
                  ungroup: 'Odebrat seskupení',
                  aggregate_count: 'Agregace: Count',
                  aggregate_sum: 'Agregace: Sum',
                  aggregate_max: 'Agregace: Max',
                  aggregate_min: 'Agregace: Min',
                  aggregate_avg: 'Agregace: Avg',
                  aggregate_remove: 'Agregace: Odebrat'
              }
          };

          // support varianty of different czech keys.
          $delegate.add('cs', lang);
          $delegate.add('cz', lang);
          $delegate.add('cs-cz', lang);
          $delegate.add('cs-CZ', lang);
      return $delegate;
    }]);
  }]);
})();

(function(){
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('da', {
        aggregate:{
          label: 'artikler'
        },
        groupPanel:{
          description: 'Grupér rækker udfra en kolonne ved at trække dens overskift hertil.'
        },
        search:{
          placeholder: 'Søg...',
          showingItems: 'Viste rækker:',
          selectedItems: 'Valgte rækker:',
          totalItems: 'Rækker totalt:',
          size: 'Side størrelse:',
          first: 'Første side',
          next: 'Næste side',
          previous: 'Forrige side',
          last: 'Sidste side'
        },
        menu:{
          text: 'Vælg kolonner:'
        },
        column: {
          hide: 'Skjul kolonne'
        },
        aggregation: {
          count: 'samlede rækker: ',
          sum: 'smalede: ',
          avg: 'gns: ',
          min: 'min: ',
          max: 'max: '
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('de', {
        aggregate: {
          label: 'Eintrag'
        },
        groupPanel: {
          description: 'Ziehen Sie eine Spaltenüberschrift hierhin, um nach dieser Spalte zu gruppieren.'
        },
        search: {
          placeholder: 'Suche...',
          showingItems: 'Zeige Einträge:',
          selectedItems: 'Ausgewählte Einträge:',
          totalItems: 'Einträge gesamt:',
          size: 'Einträge pro Seite:',
          first: 'Erste Seite',
          next: 'Nächste Seite',
          previous: 'Vorherige Seite',
          last: 'Letzte Seite'
        },
        menu: {
          text: 'Spalten auswählen:'
        },
        sort: {
          ascending: 'aufsteigend sortieren',
          descending: 'absteigend sortieren',
          remove: 'Sortierung zurücksetzen'
        },
        column: {
          hide: 'Spalte ausblenden'
        },
        aggregation: {
          count: 'Zeilen insgesamt: ',
          sum: 'gesamt: ',
          avg: 'Durchschnitt: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
            pinLeft: 'Links anheften',
            pinRight: 'Rechts anheften',
            unpin: 'Lösen'
        },
        gridMenu: {
          columns: 'Spalten:',
          importerTitle: 'Datei importieren',
          exporterAllAsCsv: 'Alle Daten als CSV exportieren',
          exporterVisibleAsCsv: 'sichtbare Daten als CSV exportieren',
          exporterSelectedAsCsv: 'markierte Daten als CSV exportieren',
          exporterAllAsPdf: 'Alle Daten als PDF exportieren',
          exporterVisibleAsPdf: 'sichtbare Daten als PDF exportieren',
          exporterSelectedAsPdf: 'markierte Daten als CSV exportieren'
        },
        importer: {
          noHeaders: 'Es konnten keine Spaltennamen ermittelt werden. Sind in der Datei Spaltendefinitionen enthalten?',
          noObjects: 'Es konnten keine Zeileninformationen gelesen werden, Sind in der Datei außer den Spaltendefinitionen auch Daten enthalten?',
          invalidCsv: 'Die Datei konnte nicht eingelesen werden, ist es eine gültige CSV-Datei?',
          invalidJson: 'Die Datei konnte nicht eingelesen werden. Enthält sie gültiges JSON?',
          jsonNotArray: 'Die importierte JSON-Datei muß ein Array enthalten. Breche Import ab.'
        },
        pagination: {
            sizes: 'Einträge pro Seite',
            totalItems: 'Einträge'
        },
        grouping: {
            group: 'Gruppieren',
            ungroup: 'Gruppierung aufheben',
            aggregate_count: 'Agg: Anzahl',
            aggregate_sum: 'Agg: Summe',
            aggregate_max: 'Agg: Maximum',
            aggregate_min: 'Agg: Minimum',
            aggregate_avg: 'Agg: Mittelwert',
            aggregate_remove: 'Aggregation entfernen'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('en', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Drag a column header here and drop it to group by that column.'
        },
        search: {
          placeholder: 'Search...',
          showingItems: 'Showing Items:',
          selectedItems: 'Selected Items:',
          totalItems: 'Total Items:',
          size: 'Page Size:',
          first: 'First Page',
          next: 'Next Page',
          previous: 'Previous Page',
          last: 'Last Page'
        },
        menu: {
          text: 'Choose Columns:'
        },
        sort: {
          ascending: 'Sort Ascending',
          descending: 'Sort Descending',
          remove: 'Remove Sort'
        },
        column: {
          hide: 'Hide Column'
        },
        aggregation: {
          count: 'total rows: ',
          sum: 'total: ',
          avg: 'avg: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
         pinLeft: 'Pin Left',
          pinRight: 'Pin Right',
          unpin: 'Unpin'
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        },
        pagination: {
          sizes: 'items per page',
          totalItems: 'items',
          of: 'of'
        },
        grouping: {
          group: 'Group',
          ungroup: 'Ungroup',
          aggregate_count: 'Agg: Count',
          aggregate_sum: 'Agg: Sum',
          aggregate_max: 'Agg: Max',
          aggregate_min: 'Agg: Min',
          aggregate_avg: 'Agg: Avg',
          aggregate_remove: 'Agg: Remove'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('es', {
        aggregate: {
          label: 'Artículos'
        },
        groupPanel: {
          description: 'Arrastre un encabezado de columna aquí y suéltelo para agrupar por esa columna.'
        },
        search: {
          placeholder: 'Buscar...',
          showingItems: 'Artículos Mostrados:',
          selectedItems: 'Artículos Seleccionados:',
          totalItems: 'Artículos Totales:',
          size: 'Tamaño de Página:',
          first: 'Primera Página',
          next: 'Página Siguiente',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Elegir columnas:'
        },
        sort: {
          ascending: 'Orden Ascendente',
          descending: 'Orden Descendente',
          remove: 'Sin Ordenar'
        },
        column: {
          hide: 'Ocultar la columna'
        },
        aggregation: {
          count: 'filas totales: ',
          sum: 'total: ',
          avg: 'media: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fijar a la Izquierda',
          pinRight: 'Fijar a la Derecha',
          unpin: 'Quitar Fijación'
        },
        gridMenu: {
          columns: 'Columnas:',
          importerTitle: 'Importar archivo',
          exporterAllAsCsv: 'Exportar todo como csv',
          exporterVisibleAsCsv: 'Exportar vista como csv',
          exporterSelectedAsCsv: 'Exportar selección como csv',
          exporterAllAsPdf: 'Exportar todo como pdf',
          exporterVisibleAsPdf: 'Exportar vista como pdf',
          exporterSelectedAsPdf: 'Exportar selección como pdf'
        },
        importer: {
          noHeaders: 'No fue posible derivar los nombres de las columnas, ¿tiene encabezados el archivo?',
          noObjects: 'No fue posible obtener registros, ¿contiene datos el archivo, aparte de los encabezados?',
          invalidCsv: 'No fue posible procesar el archivo, ¿es un CSV válido?',
          invalidJson: 'No fue posible procesar el archivo, ¿es un Json válido?',
          jsonNotArray: 'El archivo json importado debe contener un array, abortando.'
        },
        pagination: {
          sizes: 'registros por página',
          totalItems: 'registros',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Cont',
          aggregate_sum: 'Agr: Sum',
          aggregate_max: 'Agr: Máx',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Prom',
          aggregate_remove: 'Agr: Quitar'
        }
      });
      return $delegate;
    }]);
}]);
})();

/**
 * Translated by: R. Salarmehr
 *                M. Hosseynzade
 *                Using Vajje.com online dictionary.
 */
(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('fa', {
        aggregate: {
          label: 'قلم'
        },
        groupPanel: {
          description: 'عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن.'
        },
        search: {
          placeholder: 'جستجو...',
          showingItems: 'نمایش اقلام:',
          selectedItems: 'قلم\u200cهای انتخاب شده:',
          totalItems: 'مجموع اقلام:',
          size: 'اندازه\u200cی صفحه:',
          first: 'اولین صفحه',
          next: 'صفحه\u200cی\u200cبعدی',
          previous: 'صفحه\u200cی\u200c قبلی',
          last: 'آخرین صفحه'
        },
        menu: {
          text: 'ستون\u200cهای انتخابی:'
        },
        sort: {
          ascending: 'ترتیب صعودی',
          descending: 'ترتیب نزولی',
          remove: 'حذف مرتب کردن'
        },
        column: {
          hide: 'پنهان\u200cکردن ستون'
        },
        aggregation: {
          count: 'تعداد: ',
          sum: 'مجموع: ',
          avg: 'میانگین: ',
          min: 'کمترین: ',
          max: 'بیشترین: '
        },
        pinning: {
          pinLeft: 'پین کردن سمت چپ',
          pinRight: 'پین کردن سمت راست',
          unpin: 'حذف پین'
        },
        gridMenu: {
          columns: 'ستون\u200cها:',
          importerTitle: 'وارد کردن فایل',
          exporterAllAsCsv: 'خروجی تمام داده\u200cها در فایل csv',
          exporterVisibleAsCsv: 'خروجی داده\u200cهای قابل مشاهده در فایل csv',
          exporterSelectedAsCsv: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل csv',
          exporterAllAsPdf: 'خروجی تمام داده\u200cها در فایل pdf',
          exporterVisibleAsPdf: 'خروجی داده\u200cهای قابل مشاهده در فایل pdf',
          exporterSelectedAsPdf: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل pdf'
        },
        importer: {
          noHeaders: 'نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟',
          noObjects: 'اشیا قابل استخراج نیستند. آیا به جز عنوان\u200cها در فایل داده وجود دارد؟',
          invalidCsv: 'فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟',
          invalidJson: 'فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟',
          jsonNotArray: 'فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد.'
        },
        pagination: {
          sizes: 'اقلام در هر صفحه',
          totalItems: 'اقلام',
          of: 'از'
        },
        grouping: {
          group: 'گروه\u200cبندی',
          ungroup: 'حذف گروه\u200cبندی',
          aggregate_count: 'Agg: تعداد',
          aggregate_sum: 'Agg: جمع',
          aggregate_max: 'Agg: بیشینه',
          aggregate_min: 'Agg: کمینه',
          aggregate_avg: 'Agg: میانگین',
          aggregate_remove: 'Agg: حذف'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('fi', {
        aggregate: {
          label: 'rivit'
        },
        groupPanel: {
          description: 'Raahaa ja pudota otsikko tähän ryhmittääksesi sarakkeen mukaan.'
        },
        search: {
          placeholder: 'Hae...',
          showingItems: 'Näytetään rivejä:',
          selectedItems: 'Valitut rivit:',
          totalItems: 'Rivejä yht.:',
          size: 'Näytä:',
          first: 'Ensimmäinen sivu',
          next: 'Seuraava sivu',
          previous: 'Edellinen sivu',
          last: 'Viimeinen sivu'
        },
        menu: {
          text: 'Valitse sarakkeet:'
        },
        sort: {
          ascending: 'Järjestä nouseva',
          descending: 'Järjestä laskeva',
          remove: 'Poista järjestys'
        },
        column: {
          hide: 'Piilota sarake'
        },
        aggregation: {
          count: 'Rivejä yht.: ',
          sum: 'Summa: ',
          avg: 'K.a.: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
         pinLeft: 'Lukitse vasemmalle',
          pinRight: 'Lukitse oikealle',
          unpin: 'Poista lukitus'
        },
        gridMenu: {
          columns: 'Sarakkeet:',
          importerTitle: 'Tuo tiedosto',
          exporterAllAsCsv: 'Vie tiedot csv-muodossa',
          exporterVisibleAsCsv: 'Vie näkyvä tieto csv-muodossa',
          exporterSelectedAsCsv: 'Vie valittu tieto csv-muodossa',
          exporterAllAsPdf: 'Vie tiedot pdf-muodossa',
          exporterVisibleAsPdf: 'Vie näkyvä tieto pdf-muodossa',
          exporterSelectedAsPdf: 'Vie valittu tieto pdf-muodossa'
        },
        importer: {
          noHeaders: 'Sarakkeen nimiä ei voitu päätellä, onko tiedostossa otsikkoriviä?',
          noObjects: 'Tietoja ei voitu lukea, onko tiedostossa muuta kuin otsikkot?',
          invalidCsv: 'Tiedostoa ei voitu käsitellä, oliko se CSV-muodossa?',
          invalidJson: 'Tiedostoa ei voitu käsitellä, oliko se JSON-muodossa?',
          jsonNotArray: 'Tiedosto ei sisältänyt taulukkoa, lopetetaan.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('fr', {
        aggregate: {
          label: 'éléments'
        },
        groupPanel: {
          description: 'Faites glisser une en-tête de colonne ici pour créer un groupe de colonnes.'
        },
        search: {
          placeholder: 'Recherche...',
          showingItems: 'Affichage des éléments :',
          selectedItems: 'Éléments sélectionnés :',
          totalItems: 'Nombre total d\'éléments:',
          size: 'Taille de page:',
          first: 'Première page',
          next: 'Page Suivante',
          previous: 'Page précédente',
          last: 'Dernière page'
        },
        menu: {
          text: 'Choisir des colonnes :'
        },
        sort: {
          ascending: 'Trier par ordre croissant',
          descending: 'Trier par ordre décroissant',
          remove: 'Enlever le tri'
        },
        column: {
          hide: 'Cacher la colonne'
        },
        aggregation: {
          count: 'lignes totales: ',
          sum: 'total: ',
          avg: 'moy: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Épingler à gauche',
          pinRight: 'Épingler à droite',
          unpin: 'Détacher'
        },
        gridMenu: {
          columns: 'Colonnes:',
          importerTitle: 'Importer un fichier',
          exporterAllAsCsv: 'Exporter toutes les données en CSV',
          exporterVisibleAsCsv: 'Exporter les données visibles en CSV',
          exporterSelectedAsCsv: 'Exporter les données sélectionnées en CSV',
          exporterAllAsPdf: 'Exporter toutes les données en PDF',
          exporterVisibleAsPdf: 'Exporter les données visibles en PDF',
          exporterSelectedAsPdf: 'Exporter les données sélectionnées en PDF'
        },
        importer: {
          noHeaders: 'Impossible de déterminer le nom des colonnes, le fichier possède-t-il une en-tête ?',
          noObjects: 'Aucun objet trouvé, le fichier possède-t-il des données autres que l\'en-tête ?',
          invalidCsv: 'Le fichier n\'a pas pu être traité, le CSV est-il valide ?',
          invalidJson: 'Le fichier n\'a pas pu être traité, le JSON est-il valide ?',
          jsonNotArray: 'Le fichier JSON importé doit contenir un tableau, abandon.'
        },
        pagination: {
          sizes: 'éléments par page',
          totalItems: 'éléments'
        },
        grouping: {
          group: 'Grouper',
          ungroup: 'Dégrouper',
          aggregate_count: 'Agg: Compte',
          aggregate_sum: 'Agg: Somme',
          aggregate_max: 'Agg: Max',
          aggregate_min: 'Agg: Min',
          aggregate_avg: 'Agg: Moy',
          aggregate_remove: 'Agg: Retirer'
        }
      });
      return $delegate;
    }]);
  }]);
})();
(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('he', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו.'
        },
        search: {
          placeholder: 'חפש...',
          showingItems: 'מציג:',
          selectedItems: 'סה"כ נבחרו:',
          totalItems: 'סה"כ רשומות:',
          size: 'תוצאות בדף:',
          first: 'דף ראשון',
          next: 'דף הבא',
          previous: 'דף קודם',
          last: 'דף אחרון'
        },
        menu: {
          text: 'בחר עמודות:'
        },
        sort: {
          ascending: 'סדר עולה',
          descending: 'סדר יורד',
          remove: 'בטל'
        },
        column: {
          hide: 'טור הסתר'
        },
        aggregation: {
          count: 'total rows: ',
          sum: 'total: ',
          avg: 'avg: ',
          min: 'min: ',
          max: 'max: '
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('hy', {
        aggregate: {
          label: 'տվյալներ'
        },
        groupPanel: {
          description: 'Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։'
        },
        search: {
          placeholder: 'Փնտրում...',
          showingItems: 'Ցուցադրված տվյալներ՝',
          selectedItems: 'Ընտրված:',
          totalItems: 'Ընդամենը՝',
          size: 'Տողերի քանակը էջում՝',
          first: 'Առաջին էջ',
          next: 'Հաջորդ էջ',
          previous: 'Նախորդ էջ',
          last: 'Վերջին էջ'
        },
        menu: {
          text: 'Ընտրել սյուները:'
        },
        sort: {
          ascending: 'Աճման կարգով',
          descending: 'Նվազման կարգով',
          remove: 'Հանել '
        },
        column: {
          hide: 'Թաքցնել սյունը'
        },
        aggregation: {
          count: 'ընդամենը տող՝ ',
          sum: 'ընդամենը՝ ',
          avg: 'միջին՝ ',
          min: 'մին՝ ',
          max: 'մաքս՝ '
        },
        pinning: {
          pinLeft: 'Կպցնել ձախ կողմում',
          pinRight: 'Կպցնել աջ կողմում',
          unpin: 'Արձակել'
        },
        gridMenu: {
          columns: 'Սյուներ:',
          importerTitle: 'Ներմուծել ֆայլ',
          exporterAllAsCsv: 'Արտահանել ամբողջը CSV',
          exporterVisibleAsCsv: 'Արտահանել երևացող տվյալները CSV',
          exporterSelectedAsCsv: 'Արտահանել ընտրված տվյալները CSV',
          exporterAllAsPdf: 'Արտահանել PDF',
          exporterVisibleAsPdf: 'Արտահանել երևացող տվյալները PDF',
          exporterSelectedAsPdf: 'Արտահանել ընտրված տվյալները PDF'
        },
        importer: {
          noHeaders: 'Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։',
          noObjects: 'Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։',
          invalidCsv: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։',
          invalidJson: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։',
          jsonNotArray: 'Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('it', {
        aggregate: {
          label: 'elementi'
        },
        groupPanel: {
          description: 'Trascina un\'intestazione all\'interno del gruppo della colonna.'
        },
        search: {
          placeholder: 'Ricerca...',
          showingItems: 'Mostra:',
          selectedItems: 'Selezionati:',
          totalItems: 'Totali:',
          size: 'Tot Pagine:',
          first: 'Prima',
          next: 'Prossima',
          previous: 'Precedente',
          last: 'Ultima'
        },
        menu: {
          text: 'Scegli le colonne:'
        },
        sort: {
          ascending: 'Asc.',
          descending: 'Desc.',
          remove: 'Annulla ordinamento'
        },
        column: {
          hide: 'Nascondi'
        },
        aggregation: {
          count: 'righe totali: ',
          sum: 'tot: ',
          avg: 'media: ',
          min: 'minimo: ',
          max: 'massimo: '
        },
        pinning: {
         pinLeft: 'Blocca a sx',
          pinRight: 'Blocca a dx',
          unpin: 'Blocca in alto'
        },
        gridMenu: {
          columns: 'Colonne:',
          importerTitle: 'Importa',
          exporterAllAsCsv: 'Esporta tutti i dati in CSV',
          exporterVisibleAsCsv: 'Esporta i dati visibili in CSV',
          exporterSelectedAsCsv: 'Esporta i dati selezionati in CSV',
          exporterAllAsPdf: 'Esporta tutti i dati in PDF',
          exporterVisibleAsPdf: 'Esporta i dati visibili in PDF',
          exporterSelectedAsPdf: 'Esporta i dati selezionati in PDF'
        },
        importer: {
          noHeaders: 'Impossibile reperire i nomi delle colonne, sicuro che siano indicati all\'interno del file?',
          noObjects: 'Impossibile reperire gli oggetti, sicuro che siano indicati all\'interno del file?',
          invalidCsv: 'Impossibile elaborare il file, sicuro che sia un CSV?',
          invalidJson: 'Impossibile elaborare il file, sicuro che sia un JSON valido?',
          jsonNotArray: 'Errore! Il file JSON da importare deve contenere un array.'
        },
        grouping: {
          group: 'Raggruppa',
          ungroup: 'Separa',
          aggregate_count: 'Agg: N. Elem.',
          aggregate_sum: 'Agg: Somma',
          aggregate_max: 'Agg: Massimo',
          aggregate_min: 'Agg: Minimo',
          aggregate_avg: 'Agg: Media',
          aggregate_remove: 'Agg: Rimuovi'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ja', {
        aggregate: {
          label: '項目'
        },
        groupPanel: {
          description: 'ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。'
        },
        search: {
          placeholder: '検索...',
          showingItems: '表示中の項目:',
          selectedItems: '選択した項目:',
          totalItems: '項目の総数:',
          size: 'ページサイズ:',
          first: '最初のページ',
          next: '次のページ',
          previous: '前のページ',
          last: '前のページ'
        },
        menu: {
          text: '列の選択:'
        },
        sort: {
          ascending: '昇順に並べ替え',
          descending: '降順に並べ替え',
          remove: '並べ替えの解除'
        },
        column: {
          hide: '列の非表示'
        },
        aggregation: {
          count: '合計行数: ',
          sum: '合計: ',
          avg: '平均: ',
          min: '最小: ',
          max: '最大: '
        },
        pinning: {
          pinLeft: '左に固定',
          pinRight: '右に固定',
          unpin: '固定解除'
        },
        gridMenu: {
          columns: '列:',
          importerTitle: 'ファイルのインポート',
          exporterAllAsCsv: 'すべてのデータをCSV形式でエクスポート',
          exporterVisibleAsCsv: '表示中のデータをCSV形式でエクスポート',
          exporterSelectedAsCsv: '選択したデータをCSV形式でエクスポート',
          exporterAllAsPdf: 'すべてのデータをPDF形式でエクスポート',
          exporterVisibleAsPdf: '表示中のデータをPDF形式でエクスポート',
          exporterSelectedAsPdf: '選択したデータをPDF形式でエクスポート'
        },
        importer: {
          noHeaders: '列名を取得できません。ファイルにヘッダが含まれていることを確認してください。',
          noObjects: 'オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。',
          invalidCsv: 'ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。',
          invalidJson: 'ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。',
          jsonNotArray: 'インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。'
        },
        pagination: {
          sizes: '項目/ページ',
          totalItems: '項目'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ko', {
        aggregate: {
          label: '아이템'
        },
        groupPanel: {
          description: '컬럼으로 그룹핑하기 위해서는 컬럼 헤더를 끌어 떨어뜨려 주세요.'
        },
        search: {
          placeholder: '검색...',
          showingItems: '항목 보여주기:',
          selectedItems: '선택 항목:',
          totalItems: '전체 항목:',
          size: '페이지 크기:',
          first: '첫번째 페이지',
          next: '다음 페이지',
          previous: '이전 페이지',
          last: '마지막 페이지'
        },
        menu: {
          text: '컬럼을 선택하세요:'
        },
        sort: {
          ascending: '오름차순 정렬',
          descending: '내림차순 정렬',
          remove: '소팅 제거'
        },
        column: {
          hide: '컬럼 제거'
        },
        aggregation: {
          count: '전체 갯수: ',
          sum: '전체: ',
          avg: '평균: ',
          min: '최소: ',
          max: '최대: '
        },
        pinning: {
         pinLeft: '왼쪽 핀',
          pinRight: '오른쪽 핀',
          unpin: '핀 제거'
        },
        gridMenu: {
          columns: '컬럼:',
          importerTitle: '파일 가져오기',
          exporterAllAsCsv: 'csv로 모든 데이터 내보내기',
          exporterVisibleAsCsv: 'csv로 보이는 데이터 내보내기',
          exporterSelectedAsCsv: 'csv로 선택된 데이터 내보내기',
          exporterAllAsPdf: 'pdf로 모든 데이터 내보내기',
          exporterVisibleAsPdf: 'pdf로 보이는 데이터 내보내기',
          exporterSelectedAsPdf: 'pdf로 선택 데이터 내보내기'
        },
        importer: {
          noHeaders: '컬럼명이 지정되어 있지 않습니다. 파일에 헤더가 명시되어 있는지 확인해 주세요.',
          noObjects: '데이터가 지정되어 있지 않습니다. 데이터가 파일에 있는지 확인해 주세요.',
          invalidCsv: '파일을 처리할 수 없습니다. 올바른 csv인지 확인해 주세요.',
          invalidJson: '파일을 처리할 수 없습니다. 올바른 json인지 확인해 주세요.',
          jsonNotArray: 'json 파일은 배열을 포함해야 합니다.'
        },
        pagination: {
          sizes: '페이지당 항목',
          totalItems: '전체 항목'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('nl', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Sleep hier een kolomnaam heen om op te groeperen.'
        },
        search: {
          placeholder: 'Zoeken...',
          showingItems: 'Getoonde items:',
          selectedItems: 'Geselecteerde items:',
          totalItems: 'Totaal aantal items:',
          size: 'Items per pagina:',
          first: 'Eerste pagina',
          next: 'Volgende pagina',
          previous: 'Vorige pagina',
          last: 'Laatste pagina'
        },
        menu: {
          text: 'Kies kolommen:'
        },
        sort: {
          ascending: 'Sorteer oplopend',
          descending: 'Sorteer aflopend',
          remove: 'Verwijder sortering'
        },
        column: {
          hide: 'Verberg kolom'
        },
        aggregation: {
          count: 'Aantal rijen: ',
          sum: 'Som: ',
          avg: 'Gemiddelde: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
          pinLeft: 'Zet links vast',
          pinRight: 'Zet rechts vast',
          unpin: 'Maak los'
        },
        gridMenu: {
          columns: 'Kolommen:',
          importerTitle: 'Importeer bestand',
          exporterAllAsCsv: 'Exporteer alle data als csv',
          exporterVisibleAsCsv: 'Exporteer zichtbare data als csv',
          exporterSelectedAsCsv: 'Exporteer geselecteerde data als csv',
          exporterAllAsPdf: 'Exporteer alle data als pdf',
          exporterVisibleAsPdf: 'Exporteer zichtbare data als pdf',
          exporterSelectedAsPdf: 'Exporteer geselecteerde data als pdf'
        },
        importer: {
          noHeaders: 'Kolomnamen kunnen niet worden afgeleid. Heeft het bestand een header?',
          noObjects: 'Objecten kunnen niet worden afgeleid. Bevat het bestand data naast de headers?',
          invalidCsv: 'Het bestand kan niet verwerkt worden. Is het een valide csv bestand?',
          invalidJson: 'Het bestand kan niet verwerkt worden. Is het valide json?',
          jsonNotArray: 'Het json bestand moet een array bevatten. De actie wordt geannuleerd.'
        },
        pagination: {
            sizes: 'items per pagina',
            totalItems: 'items'
        },
        grouping: {
            group: 'Groepeer',
            ungroup: 'Groepering opheffen',
            aggregate_count: 'Agg: Aantal',
            aggregate_sum: 'Agg: Som',
            aggregate_max: 'Agg: Max',
            aggregate_min: 'Agg: Min',
            aggregate_avg: 'Agg: Gem',
            aggregate_remove: 'Agg: Verwijder'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('pt-br', {
        aggregate: {
          label: 'itens'
        },
        groupPanel: {
          description: 'Arraste e solte uma coluna aqui para agrupar por essa coluna'
        },
        search: {
          placeholder: 'Procurar...',
          showingItems: 'Mostrando os Itens:',
          selectedItems: 'Items Selecionados:',
          totalItems: 'Total de Itens:',
          size: 'Tamanho da Página:',
          first: 'Primeira Página',
          next: 'Próxima Página',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Selecione as colunas:'
        },
        sort: {
          ascending: 'Ordenar Ascendente',
          descending: 'Ordenar Descendente',
          remove: 'Remover Ordenação'
        },
        column: {
          hide: 'Esconder coluna'
        },
        aggregation: {
          count: 'total de linhas: ',
          sum: 'total: ',
          avg: 'med: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fixar Esquerda',
          pinRight: 'Fixar Direita',
          unpin: 'Desprender'
        },
        gridMenu: {
          columns: 'Colunas:',
          importerTitle: 'Importar arquivo',
          exporterAllAsCsv: 'Exportar todos os dados como csv',
          exporterVisibleAsCsv: 'Exportar dados visíveis como csv',
          exporterSelectedAsCsv: 'Exportar dados selecionados como csv',
          exporterAllAsPdf: 'Exportar todos os dados como pdf',
          exporterVisibleAsPdf: 'Exportar dados visíveis como pdf',
          exporterSelectedAsPdf: 'Exportar dados selecionados como pdf'
        },
        importer: {
          noHeaders: 'Nomes de colunas não puderam ser derivados. O arquivo tem um cabeçalho?',
          noObjects: 'Objetos não puderam ser derivados. Havia dados no arquivo, além dos cabeçalhos?',
          invalidCsv: 'Arquivo não pode ser processado. É um CSV válido?',
          invalidJson: 'Arquivo não pode ser processado. É um Json válido?',
          jsonNotArray: 'Arquivo json importado tem que conter um array. Abortando.'
        },
        pagination: {
          sizes: 'itens por página',
          totalItems: 'itens'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Contar',
          aggregate_sum: 'Agr: Soma',
          aggregate_max: 'Agr: Max',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Med',
          aggregate_remove: 'Agr: Remover'
        }
      });
      return $delegate;
    }]);
}]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('pt', {
        aggregate: {
          label: 'itens'
        },
        groupPanel: {
          description: 'Arraste e solte uma coluna aqui para agrupar por essa coluna'
        },
        search: {
          placeholder: 'Procurar...',
          showingItems: 'Mostrando os Itens:',
          selectedItems: 'Itens Selecionados:',
          totalItems: 'Total de Itens:',
          size: 'Tamanho da Página:',
          first: 'Primeira Página',
          next: 'Próxima Página',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Selecione as colunas:'
        },
        sort: {
          ascending: 'Ordenar Ascendente',
          descending: 'Ordenar Descendente',
          remove: 'Remover Ordenação'
        },
        column: {
          hide: 'Esconder coluna'
        },
        aggregation: {
          count: 'total de linhas: ',
          sum: 'total: ',
          avg: 'med: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fixar Esquerda',
          pinRight: 'Fixar Direita',
          unpin: 'Desprender'
        },
        gridMenu: {
          columns: 'Colunas:',
          importerTitle: 'Importar ficheiro',
          exporterAllAsCsv: 'Exportar todos os dados como csv',
          exporterVisibleAsCsv: 'Exportar dados visíveis como csv',
          exporterSelectedAsCsv: 'Exportar dados selecionados como csv',
          exporterAllAsPdf: 'Exportar todos os dados como pdf',
          exporterVisibleAsPdf: 'Exportar dados visíveis como pdf',
          exporterSelectedAsPdf: 'Exportar dados selecionados como pdf'
        },
        importer: {
          noHeaders: 'Nomes de colunas não puderam ser derivados. O ficheiro tem um cabeçalho?',
          noObjects: 'Objetos não puderam ser derivados. Havia dados no ficheiro, além dos cabeçalhos?',
          invalidCsv: 'Ficheiro não pode ser processado. É um CSV válido?',
          invalidJson: 'Ficheiro não pode ser processado. É um Json válido?',
          jsonNotArray: 'Ficheiro json importado tem que conter um array. Interrompendo.'
        },
        pagination: {
          sizes: 'itens por página',
          totalItems: 'itens'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Contar',
          aggregate_sum: 'Agr: Soma',
          aggregate_max: 'Agr: Max',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Med',
          aggregate_remove: 'Agr: Remover'
        }        
      });
      return $delegate;
    }]);
}]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ru', {
        aggregate: {
          label: 'элементы'
        },
        groupPanel: {
          description: 'Для группировки по столбцу перетащите сюда его название.'
        },
        search: {
          placeholder: 'Поиск...',
          showingItems: 'Показать элементы:',
          selectedItems: 'Выбранные элементы:',
          totalItems: 'Всего элементов:',
          size: 'Размер страницы:',
          first: 'Первая страница',
          next: 'Следующая страница',
          previous: 'Предыдущая страница',
          last: 'Последняя страница'
        },
        menu: {
          text: 'Выбрать столбцы:'
        },
        sort: {
          ascending: 'По возрастанию',
          descending: 'По убыванию',
          remove: 'Убрать сортировку'
        },
        column: {
          hide: 'спрятать столбец'
        },
        aggregation: {
          count: 'всего строк: ',
          sum: 'итого: ',
          avg: 'среднее: ',
          min: 'мин: ',
          max: 'макс: '
        },
        gridMenu: {
          columns: 'Столбцы:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Экспортировать всё в CSV',
          exporterVisibleAsCsv: 'Экспортировать видимые данные в CSV',
          exporterSelectedAsCsv: 'Экспортировать выбранные данные в CSV',
          exporterAllAsPdf: 'Экспортировать всё в PDF',
          exporterVisibleAsPdf: 'Экспортировать видимые данные в PDF',
          exporterSelectedAsPdf: 'Экспортировать выбранные данные в PDF'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('sk', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca.'
        },
        search: {
          placeholder: 'Hľadaj...',
          showingItems: 'Zobrazujem položky:',
          selectedItems: 'Vybraté položky:',
          totalItems: 'Počet položiek:',
          size: 'Počet:',
          first: 'Prvá strana',
          next: 'Ďalšia strana',
          previous: 'Predchádzajúca strana',
          last: 'Posledná strana'
        },
        menu: {
          text: 'Vyberte stĺpce:'
        },
        sort: {
          ascending: 'Zotriediť vzostupne',
          descending: 'Zotriediť zostupne',
          remove: 'Vymazať triedenie'
        },
        aggregation: {
          count: 'total rows: ',
          sum: 'total: ',
          avg: 'avg: ',
          min: 'min: ',
          max: 'max: '
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('sv', {
        aggregate: {
          label: 'Artiklar'
        },
        groupPanel: {
          description: 'Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen.'
        },
        search: {
          placeholder: 'Sök...',
          showingItems: 'Visar artiklar:',
          selectedItems: 'Valda artiklar:',
          totalItems: 'Antal artiklar:',
          size: 'Sidstorlek:',
          first: 'Första sidan',
          next: 'Nästa sida',
          previous: 'Föregående sida',
          last: 'Sista sidan'
        },
        menu: {
          text: 'Välj kolumner:'
        },
        sort: {
          ascending: 'Sortera stigande',
          descending: 'Sortera fallande',
          remove: 'Inaktivera sortering'
        },
        column: {
          hide: 'Göm kolumn'
        },
        aggregation: {
          count: 'Antal rader: ',
          sum: 'Summa: ',
          avg: 'Genomsnitt: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
          pinLeft: 'Fäst vänster',
          pinRight: 'Fäst höger',
          unpin: 'Lösgör'
        },
        gridMenu: {
          columns: 'Kolumner:',
          importerTitle: 'Importera fil',
          exporterAllAsCsv: 'Exportera all data som CSV',
          exporterVisibleAsCsv: 'Exportera synlig data som CSV',
          exporterSelectedAsCsv: 'Exportera markerad data som CSV',
          exporterAllAsPdf: 'Exportera all data som PDF',
          exporterVisibleAsPdf: 'Exportera synlig data som PDF',
          exporterSelectedAsPdf: 'Exportera markerad data som PDF'
        },
        importer: {
          noHeaders: 'Kolumnnamn kunde inte härledas. Har filen ett sidhuvud?',
          noObjects: 'Objekt kunde inte härledas. Har filen data undantaget sidhuvud?',
          invalidCsv: 'Filen kunde inte behandlas, är den en giltig CSV?',
          invalidJson: 'Filen kunde inte behandlas, är den en giltig JSON?',
          jsonNotArray: 'Importerad JSON-fil måste innehålla ett fält. Import avbruten.'
        },
        pagination: {
          sizes: 'Artiklar per sida',
          totalItems: 'Artiklar'
        }
      });
      return $delegate;
    }]);
  }]);
})();

/**
 * @ngdoc overview
 * @name ui.grid.i18n
 * @description
 *
 *  # ui.grid.i18n
 * This module provides i18n functions to ui.grid and any application that wants to use it

 *
 * <div doc-module-components="ui.grid.i18n"></div>
 */

(function () {
  var DIRECTIVE_ALIASES = ['uiT', 'uiTranslate'];
  var FILTER_ALIASES = ['t', 'uiTranslate'];

  var module = angular.module('ui.grid.i18n');


  /**
   *  @ngdoc object
   *  @name ui.grid.i18n.constant:i18nConstants
   *
   *  @description constants available in i18n module
   */
  module.constant('i18nConstants', {
    MISSING: '[MISSING]',
    UPDATE_EVENT: '$uiI18n',

    LOCALE_DIRECTIVE_ALIAS: 'uiI18n',
    // default to english
    DEFAULT_LANG: 'en'
  });

//    module.config(['$provide', function($provide) {
//        $provide.decorator('i18nService', ['$delegate', function($delegate) {}])}]);

  /**
   *  @ngdoc service
   *  @name ui.grid.i18n.service:i18nService
   *
   *  @description Services for i18n
   */
  module.service('i18nService', ['$log', 'i18nConstants', '$rootScope',
    function ($log, i18nConstants, $rootScope) {

      var langCache = {
        _langs: {},
        current: null,
        get: function (lang) {
          return this._langs[lang.toLowerCase()];
        },
        add: function (lang, strings) {
          var lower = lang.toLowerCase();
          if (!this._langs[lower]) {
            this._langs[lower] = {};
          }
          angular.extend(this._langs[lower], strings);
        },
        getAllLangs: function () {
          var langs = [];
          if (!this._langs) {
            return langs;
          }

          for (var key in this._langs) {
            langs.push(key);
          }

          return langs;
        },
        setCurrent: function (lang) {
          this.current = lang.toLowerCase();
        },
        getCurrentLang: function () {
          return this.current;
        }
      };

      var service = {

        /**
         * @ngdoc service
         * @name add
         * @methodOf ui.grid.i18n.service:i18nService
         * @description  Adds the languages and strings to the cache. Decorate this service to
         * add more translation strings
         * @param {string} lang language to add
         * @param {object} stringMaps of strings to add grouped by property names
         * @example
         * <pre>
         *      i18nService.add('en', {
         *         aggregate: {
         *                 label1: 'items',
         *                 label2: 'some more items'
         *                 }
         *         },
         *         groupPanel: {
         *              description: 'Drag a column header here and drop it to group by that column.'
         *           }
         *      }
         * </pre>
         */
        add: function (langs, stringMaps) {
          if (typeof(langs) === 'object') {
            angular.forEach(langs, function (lang) {
              if (lang) {
                langCache.add(lang, stringMaps);
              }
            });
          } else {
            langCache.add(langs, stringMaps);
          }
        },

        /**
         * @ngdoc service
         * @name getAllLangs
         * @methodOf ui.grid.i18n.service:i18nService
         * @description  return all currently loaded languages
         * @returns {array} string
         */
        getAllLangs: function () {
          return langCache.getAllLangs();
        },

        /**
         * @ngdoc service
         * @name get
         * @methodOf ui.grid.i18n.service:i18nService
         * @description  return all currently loaded languages
         * @param {string} lang to return.  If not specified, returns current language
         * @returns {object} the translation string maps for the language
         */
        get: function (lang) {
          var language = lang ? lang : service.getCurrentLang();
          return langCache.get(language);
        },

        /**
         * @ngdoc service
         * @name getSafeText
         * @methodOf ui.grid.i18n.service:i18nService
         * @description  returns the text specified in the path or a Missing text if text is not found
         * @param {string} path property path to use for retrieving text from string map
         * @param {string} lang to return.  If not specified, returns current language
         * @returns {object} the translation for the path
         * @example
         * <pre>
         * i18nService.getSafeText('sort.ascending')
         * </pre>
         */
        getSafeText: function (path, lang) {
          var language = lang ? lang : service.getCurrentLang();
          var trans = langCache.get(language);

          if (!trans) {
            return i18nConstants.MISSING;
          }

          var paths = path.split('.');
          var current = trans;

          for (var i = 0; i < paths.length; ++i) {
            if (current[paths[i]] === undefined || current[paths[i]] === null) {
              return i18nConstants.MISSING;
            } else {
              current = current[paths[i]];
            }
          }

          return current;

        },

        /**
         * @ngdoc service
         * @name setCurrentLang
         * @methodOf ui.grid.i18n.service:i18nService
         * @description sets the current language to use in the application
         * $broadcasts the Update_Event on the $rootScope
         * @param {string} lang to set
         * @example
         * <pre>
         * i18nService.setCurrentLang('fr');
         * </pre>
         */

        setCurrentLang: function (lang) {
          if (lang) {
            langCache.setCurrent(lang);
            $rootScope.$broadcast(i18nConstants.UPDATE_EVENT);
          }
        },

        /**
         * @ngdoc service
         * @name getCurrentLang
         * @methodOf ui.grid.i18n.service:i18nService
         * @description returns the current language used in the application
         */
        getCurrentLang: function () {
          var lang = langCache.getCurrentLang();
          if (!lang) {
            lang = i18nConstants.DEFAULT_LANG;
            langCache.setCurrent(lang);
          }
          return lang;
        }

      };

      return service;

    }]);

  var localeDirective = function (i18nService, i18nConstants) {
    return {
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs) {
            var alias = i18nConstants.LOCALE_DIRECTIVE_ALIAS;
            // check for watchable property
            var lang = $scope.$eval($attrs[alias]);
            if (lang) {
              $scope.$watch($attrs[alias], function () {
                i18nService.setCurrentLang(lang);
              });
            } else if ($attrs.$$observers) {
              $attrs.$observe(alias, function () {
                i18nService.setCurrentLang($attrs[alias] || i18nConstants.DEFAULT_LANG);
              });
            }
          }
        };
      }
    };
  };

  module.directive('uiI18n', ['i18nService', 'i18nConstants', localeDirective]);

  // directive syntax
  var uitDirective = function ($parse, i18nService, i18nConstants) {
    return {
      restrict: 'EA',
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs) {
            var alias1 = DIRECTIVE_ALIASES[0],
              alias2 = DIRECTIVE_ALIASES[1];
            var token = $attrs[alias1] || $attrs[alias2] || $elm.html();
            var missing = i18nConstants.MISSING + token;
            var observer;
            if ($attrs.$$observers) {
              var prop = $attrs[alias1] ? alias1 : alias2;
              observer = $attrs.$observe(prop, function (result) {
                if (result) {
                  $elm.html($parse(result)(i18nService.getCurrentLang()) || missing);
                }
              });
            }
            var getter = $parse(token);
            var listener = $scope.$on(i18nConstants.UPDATE_EVENT, function (evt) {
              if (observer) {
                observer($attrs[alias1] || $attrs[alias2]);
              } else {
                // set text based on i18n current language
                $elm.html(getter(i18nService.get()) || missing);
              }
            });
            $scope.$on('$destroy', listener);

            $elm.html(getter(i18nService.get()) || missing);
          }
        };
      }
    };
  };

  angular.forEach( DIRECTIVE_ALIASES, function ( alias ) {
    module.directive( alias, ['$parse', 'i18nService', 'i18nConstants', uitDirective] );
  } );

  // optional filter syntax
  var uitFilter = function ($parse, i18nService, i18nConstants) {
    return function (data) {
      var getter = $parse(data);
      // set text based on i18n current language
      return getter(i18nService.get()) || i18nConstants.MISSING + data;
    };
  };

  angular.forEach( FILTER_ALIASES, function ( alias ) {
    module.filter( alias, ['$parse', 'i18nService', 'i18nConstants', uitFilter] );
  } );


})();
(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('zh-cn', {
        aggregate: {
          label: '行'
        },
        groupPanel: {
          description: '拖曳表头到此处进行分组'
        },
        search: {
          placeholder: '查找',
          showingItems: '已显示行数：',
          selectedItems: '已选择行数：',
          totalItems: '总行数：',
          size: '每页显示行数：',
          first: '首页',
          next: '下一页',
          previous: '上一页',
          last: '末页'
        },
        menu: {
          text: '选择列：'
        },
        sort: {
          ascending: '升序',
          descending: '降序',
          remove: '取消排序'
        },
        column: {
          hide: '隐藏列'
        },
        aggregation: {
          count: '计数：',
          sum: '求和：',
          avg: '均值：',
          min: '最小值：',
          max: '最大值：'
        },
        pinning: {
          pinLeft: '左侧固定',
          pinRight: '右侧固定',
          unpin: '取消固定'
        },
        gridMenu: {
          columns: '列：',
          importerTitle: '导入文件',
          exporterAllAsCsv: '导出全部数据到CSV',
          exporterVisibleAsCsv: '导出可见数据到CSV',
          exporterSelectedAsCsv: '导出已选数据到CSV',
          exporterAllAsPdf: '导出全部数据到PDF',
          exporterVisibleAsPdf: '导出可见数据到PDF',
          exporterSelectedAsPdf: '导出已选数据到PDF'
        },
        importer: {
          noHeaders: '无法获取列名，确定文件包含表头？',
          noObjects: '无法获取数据，确定文件包含数据？',
          invalidCsv: '无法处理文件，确定是合法的CSV文件？',
          invalidJson: '无法处理文件，确定是合法的JSON文件？',
          jsonNotArray: '导入的文件不是JSON数组！'
        },
        pagination: {
          sizes: '行每页',
          totalItems: '行'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('zh-tw', {
        aggregate: {
          label: '行'
        },
        groupPanel: {
          description: '拖曳表頭到此處進行分組'
        },
        search: {
          placeholder: '查找',
          showingItems: '已顯示行數：',
          selectedItems: '已選擇行數：',
          totalItems: '總行數：',
          size: '每頁顯示行數：',
          first: '首頁',
          next: '下壹頁',
          previous: '上壹頁',
          last: '末頁'
        },
        menu: {
          text: '選擇列：'
        },
        sort: {
          ascending: '升序',
          descending: '降序',
          remove: '取消排序'
        },
        column: {
          hide: '隱藏列'
        },
        aggregation: {
          count: '計數：',
          sum: '求和：',
          avg: '均值：',
          min: '最小值：',
          max: '最大值：'
        },
        pinning: {
          pinLeft: '左側固定',
          pinRight: '右側固定',
          unpin: '取消固定'
        },
        gridMenu: {
          columns: '列：',
          importerTitle: '導入文件',
          exporterAllAsCsv: '導出全部數據到CSV',
          exporterVisibleAsCsv: '導出可見數據到CSV',
          exporterSelectedAsCsv: '導出已選數據到CSV',
          exporterAllAsPdf: '導出全部數據到PDF',
          exporterVisibleAsPdf: '導出可見數據到PDF',
          exporterSelectedAsPdf: '導出已選數據到PDF'
        },
        importer: {
          noHeaders: '無法獲取列名，確定文件包含表頭？',
          noObjects: '無法獲取數據，確定文件包含數據？',
          invalidCsv: '無法處理文件，確定是合法的CSV文件？',
          invalidJson: '無法處理文件，確定是合法的JSON文件？',
          jsonNotArray: '導入的文件不是JSON數組！'
        },
        pagination: {
          sizes: '行每頁',
          totalItems: '行'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
  'use strict';
  /**
   *  @ngdoc overview
   *  @name ui.grid.autoResize
   *
   *  @description
   *
   *  #ui.grid.autoResize
   *
   *  <div class="alert alert-warning" role="alert"><strong>Beta</strong> This feature is ready for testing, but it either hasn't seen a lot of use or has some known bugs.</div>
   *
   *  This module provides auto-resizing functionality to UI-Grid.
   */
  var module = angular.module('ui.grid.autoResize', ['ui.grid']);


  module.directive('uiGridAutoResize', ['$timeout', 'gridUtil', function ($timeout, gridUtil) {
    return {
      require: 'uiGrid',
      scope: false,
      link: function ($scope, $elm, $attrs, uiGridCtrl) {
        var prevGridWidth, prevGridHeight;

        function getDimensions() {
          prevGridHeight = gridUtil.elementHeight($elm);
          prevGridWidth = gridUtil.elementWidth($elm);
        }

        // Initialize the dimensions
        getDimensions();

        var resizeTimeoutId;
        function startTimeout() {
          clearTimeout(resizeTimeoutId);

          resizeTimeoutId = setTimeout(function () {
            var newGridHeight = gridUtil.elementHeight($elm);
            var newGridWidth = gridUtil.elementWidth($elm);

            if (newGridHeight !== prevGridHeight || newGridWidth !== prevGridWidth) {
              uiGridCtrl.grid.gridHeight = newGridHeight;
              uiGridCtrl.grid.gridWidth = newGridWidth;

              $scope.$apply(function () {
                uiGridCtrl.grid.refresh()
                  .then(function () {
                    getDimensions();

                    startTimeout();
                  });
              });
            }
            else {
              startTimeout();
            }
          }, 250);
        }

        startTimeout();

        $scope.$on('$destroy', function() {
          clearTimeout(resizeTimeoutId);
        });
      }
    };
  }]);
})();

(function () {
  'use strict';

  /**
   *  @ngdoc overview
   *  @name ui.grid.cellNav
   *
   *  @description

      #ui.grid.cellNav

      <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>

      This module provides auto-resizing functionality to UI-Grid.
   */
  var module = angular.module('ui.grid.cellNav', ['ui.grid']);

  function RowCol(row, col) {
    this.row = row;
    this.col = col;
  }

  /**
   *  @ngdoc object
   *  @name ui.grid.cellNav.constant:uiGridCellNavConstants
   *
   *  @description constants available in cellNav
   */
  module.constant('uiGridCellNavConstants', {
    FEATURE_NAME: 'gridCellNav',
    CELL_NAV_EVENT: 'cellNav',
    direction: {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3, PG_UP: 4, PG_DOWN: 5},
    EVENT_TYPE: {
      KEYDOWN: 0,
      CLICK: 1,
      CLEAR: 2
    }
  });


  module.factory('uiGridCellNavFactory', ['gridUtil', 'uiGridConstants', 'uiGridCellNavConstants', '$q',
    function (gridUtil, uiGridConstants, uiGridCellNavConstants, $q) {
      /**
       *  @ngdoc object
       *  @name ui.grid.cellNav.object:CellNav
       *  @description returns a CellNav prototype function
       *  @param {object} rowContainer container for rows
       *  @param {object} colContainer parent column container
       *  @param {object} leftColContainer column container to the left of parent
       *  @param {object} rightColContainer column container to the right of parent
       */
      var UiGridCellNav = function UiGridCellNav(rowContainer, colContainer, leftColContainer, rightColContainer) {
        this.rows = rowContainer.visibleRowCache;
        this.columns = colContainer.visibleColumnCache;
        this.leftColumns = leftColContainer ? leftColContainer.visibleColumnCache : [];
        this.rightColumns = rightColContainer ? rightColContainer.visibleColumnCache : [];
        this.bodyContainer = rowContainer;
      };

      /** returns focusable columns of all containers */
      UiGridCellNav.prototype.getFocusableCols = function () {
        var allColumns = this.leftColumns.concat(this.columns, this.rightColumns);

        return allColumns.filter(function (col) {
          return col.colDef.allowCellFocus;
        });
      };

      /**
       *  @ngdoc object
       *  @name ui.grid.cellNav.api:GridRow
       *
       *  @description GridRow settings for cellNav feature, these are available to be
       *  set only internally (for example, by other features)
       */

      /**
       *  @ngdoc object
       *  @name allowCellFocus
       *  @propertyOf  ui.grid.cellNav.api:GridRow
       *  @description Enable focus on a cell within this row.  If set to false then no cells
       *  in this row can be focused - group header rows as an example would set this to false.
       *  <br/>Defaults to true
       */
      /** returns focusable rows */
      UiGridCellNav.prototype.getFocusableRows = function () {
        return this.rows.filter(function(row) {
          return row.allowCellFocus !== false;
        });
      };

      UiGridCellNav.prototype.getNextRowCol = function (direction, curRow, curCol) {
        switch (direction) {
          case uiGridCellNavConstants.direction.LEFT:
            return this.getRowColLeft(curRow, curCol);
          case uiGridCellNavConstants.direction.RIGHT:
            return this.getRowColRight(curRow, curCol);
          case uiGridCellNavConstants.direction.UP:
            return this.getRowColUp(curRow, curCol);
          case uiGridCellNavConstants.direction.DOWN:
            return this.getRowColDown(curRow, curCol);
          case uiGridCellNavConstants.direction.PG_UP:
            return this.getRowColPageUp(curRow, curCol);
          case uiGridCellNavConstants.direction.PG_DOWN:
            return this.getRowColPageDown(curRow, curCol);
        }

      };

      UiGridCellNav.prototype.initializeSelection = function () {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        if (focusableCols.length === 0 || focusableRows.length === 0) {
          return null;
        }

        var curRowIndex = 0;
        var curColIndex = 0;
        return new RowCol(focusableRows[0], focusableCols[0]); //return same row
      };

      UiGridCellNav.prototype.getRowColLeft = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 1
        if (curColIndex === -1) {
          curColIndex = 1;
        }

        var nextColIndex = curColIndex === 0 ? focusableCols.length - 1 : curColIndex - 1;

        //get column to left
        if (nextColIndex > curColIndex) {
          // On the first row
          // if (curRowIndex === 0 && curColIndex === 0) {
          //   return null;
          // }
          if (curRowIndex === 0) {
            return new RowCol(curRow, focusableCols[nextColIndex]); //return same row
          }
          else {
            //up one row and far right column
            return new RowCol(focusableRows[curRowIndex - 1], focusableCols[nextColIndex]);
          }
        }
        else {
          return new RowCol(curRow, focusableCols[nextColIndex]);
        }
      };



      UiGridCellNav.prototype.getRowColRight = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 0
        if (curColIndex === -1) {
          curColIndex = 0;
        }
        var nextColIndex = curColIndex === focusableCols.length - 1 ? 0 : curColIndex + 1;

        if (nextColIndex < curColIndex) {
          if (curRowIndex === focusableRows.length - 1) {
            return new RowCol(curRow, focusableCols[nextColIndex]); //return same row
          }
          else {
            //down one row and far left column
            return new RowCol(focusableRows[curRowIndex + 1], focusableCols[nextColIndex]);
          }
        }
        else {
          return new RowCol(curRow, focusableCols[nextColIndex]);
        }
      };

      UiGridCellNav.prototype.getRowColDown = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 0
        if (curColIndex === -1) {
          curColIndex = 0;
        }

        if (curRowIndex === focusableRows.length - 1) {
          return new RowCol(curRow, focusableCols[curColIndex]); //return same row
        }
        else {
          //down one row
          return new RowCol(focusableRows[curRowIndex + 1], focusableCols[curColIndex]);
        }
      };

      UiGridCellNav.prototype.getRowColPageDown = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 0
        if (curColIndex === -1) {
          curColIndex = 0;
        }

        var pageSize = this.bodyContainer.minRowsToRender();
        if (curRowIndex >= focusableRows.length - pageSize) {
          return new RowCol(focusableRows[focusableRows.length - 1], focusableCols[curColIndex]); //return last row
        }
        else {
          //down one page
          return new RowCol(focusableRows[curRowIndex + pageSize], focusableCols[curColIndex]);
        }
      };

      UiGridCellNav.prototype.getRowColUp = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 0
        if (curColIndex === -1) {
          curColIndex = 0;
        }

        if (curRowIndex === 0) {
          return new RowCol(curRow, focusableCols[curColIndex]); //return same row
        }
        else {
          //up one row
          return new RowCol(focusableRows[curRowIndex - 1], focusableCols[curColIndex]);
        }
      };

      UiGridCellNav.prototype.getRowColPageUp = function (curRow, curCol) {
        var focusableCols = this.getFocusableCols();
        var focusableRows = this.getFocusableRows();
        var curColIndex = focusableCols.indexOf(curCol);
        var curRowIndex = focusableRows.indexOf(curRow);

        //could not find column in focusable Columns so set it to 0
        if (curColIndex === -1) {
          curColIndex = 0;
        }

        var pageSize = this.bodyContainer.minRowsToRender();
        if (curRowIndex - pageSize < 0) {
          return new RowCol(focusableRows[0], focusableCols[curColIndex]); //return first row
        }
        else {
          //up one page
          return new RowCol(focusableRows[curRowIndex - pageSize], focusableCols[curColIndex]);
        }
      };
      return UiGridCellNav;
    }]);

  /**
   *  @ngdoc service
   *  @name ui.grid.cellNav.service:uiGridCellNavService
   *
   *  @description Services for cell navigation features. If you don't like the key maps we use,
   *  or the direction cells navigation, override with a service decorator (see angular docs)
   */
  module.service('uiGridCellNavService', ['gridUtil', 'uiGridConstants', 'uiGridCellNavConstants', '$q', 'uiGridCellNavFactory', 'ScrollEvent',
    function (gridUtil, uiGridConstants, uiGridCellNavConstants, $q, UiGridCellNav, ScrollEvent) {

      var service = {

        initializeGrid: function (grid) {
          grid.registerColumnBuilder(service.cellNavColumnBuilder);


          /**
           *  @ngdoc object
           *  @name ui.grid.cellNav:Grid.cellNav
           * @description cellNav properties added to grid class
           */
          grid.cellNav = {};
          grid.cellNav.lastRowCol = null;
          grid.cellNav.focusedCells = [];

          service.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.cellNav.api:PublicApi
           *
           *  @description Public Api for cellNav feature
           */
          var publicApi = {
            events: {
              cellNav: {
                /**
                 * @ngdoc event
                 * @name navigate
                 * @eventOf  ui.grid.cellNav.api:PublicApi
                 * @description raised when the active cell is changed
                 * <pre>
                 *      gridApi.cellNav.on.navigate(scope,function(newRowcol, oldRowCol){})
                 * </pre>
                 * @param {object} newRowCol new position
                 * @param {object} oldRowCol old position
                 */
                navigate: function (newRowCol, oldRowCol) {},
                /**
                 * @ngdoc event
                 * @name viewPortKeyDown
                 * @eventOf  ui.grid.cellNav.api:PublicApi
                 * @description  is raised when the viewPort receives a keyDown event. Cells never get focus in uiGrid
                 * due to the difficulties of setting focus on a cell that is not visible in the viewport.  Use this
                 * event whenever you need a keydown event on a cell
                 * <br/>
                 * @param {object} event keydown event
                 * @param {object} rowCol current rowCol position
                 */
                viewPortKeyDown: function (event, rowCol) {},

                /**
                 * @ngdoc event
                 * @name viewPortKeyPress
                 * @eventOf  ui.grid.cellNav.api:PublicApi
                 * @description  is raised when the viewPort receives a keyPress event. Cells never get focus in uiGrid
                 * due to the difficulties of setting focus on a cell that is not visible in the viewport.  Use this
                 * event whenever you need a keypress event on a cell
                 * <br/>
                 * @param {object} event keypress event
                 * @param {object} rowCol current rowCol position
                 */
                viewPortKeyPress: function (event, rowCol) {}
              }
            },
            methods: {
              cellNav: {
                /**
                 * @ngdoc function
                 * @name scrollToFocus
                 * @methodOf  ui.grid.cellNav.api:PublicApi
                 * @description brings the specified row and column into view, and sets focus
                 * to that cell
                 * @param {object} rowEntity gridOptions.data[] array instance to make visible and set focus
                 * @param {object} colDef to make visible and set focus
                 * @returns {promise} a promise that is resolved after any scrolling is finished
                 */
                scrollToFocus: function (rowEntity, colDef) {
                  return service.scrollToFocus(grid, rowEntity, colDef);
                },

                /**
                 * @ngdoc function
                 * @name getFocusedCell
                 * @methodOf  ui.grid.cellNav.api:PublicApi
                 * @description returns the current (or last if Grid does not have focus) focused row and column
                 * <br> value is null if no selection has occurred
                 */
                getFocusedCell: function () {
                  return grid.cellNav.lastRowCol;
                },

                /**
                 * @ngdoc function
                 * @name getCurrentSelection
                 * @methodOf  ui.grid.cellNav.api:PublicApi
                 * @description returns an array containing the current selection
                 * <br> array is empty if no selection has occurred
                 */
                getCurrentSelection: function () {
                  return grid.cellNav.focusedCells;
                },

                /**
                 * @ngdoc function
                 * @name rowColSelectIndex
                 * @methodOf  ui.grid.cellNav.api:PublicApi
                 * @description returns the index in the order in which the RowCol was selected, returns -1 if the RowCol
                 * isn't selected
                 * @param {object} rowCol the rowCol to evaluate
                 */
                rowColSelectIndex: function (rowCol) {
                  //return gridUtil.arrayContainsObjectWithProperty(grid.cellNav.focusedCells, 'col.uid', rowCol.col.uid) &&
                  var index = -1;
                  for (var i = 0; i < grid.cellNav.focusedCells.length; i++) {
                    if (grid.cellNav.focusedCells[i].col.uid === rowCol.col.uid &&
                      grid.cellNav.focusedCells[i].row.uid === rowCol.row.uid) {
                      index = i;
                      break;
                    }
                  }
                  return index;
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);

          grid.api.registerMethodsFromObject(publicApi.methods);

        },

        defaultGridOptions: function (gridOptions) {
          /**
           *  @ngdoc object
           *  @name ui.grid.cellNav.api:GridOptions
           *
           *  @description GridOptions for cellNav feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           *  @ngdoc object
           *  @name modifierKeysToMultiSelectCells
           *  @propertyOf  ui.grid.cellNav.api:GridOptions
           *  @description Enable multiple cell selection only when using the ctrlKey or shiftKey.
           *  <br/>Defaults to false
           */
          gridOptions.modifierKeysToMultiSelectCells = gridOptions.modifierKeysToMultiSelectCells === true;

        },

        /**
         * @ngdoc service
         * @name decorateRenderContainers
         * @methodOf ui.grid.cellNav.service:uiGridCellNavService
         * @description  decorates grid renderContainers with cellNav functions
         */
        decorateRenderContainers: function (grid) {

          var rightContainer = grid.hasRightContainer() ? grid.renderContainers.right : null;
          var leftContainer = grid.hasLeftContainer() ? grid.renderContainers.left : null;

          if (leftContainer !== null) {
            grid.renderContainers.left.cellNav = new UiGridCellNav(grid.renderContainers.body, leftContainer, rightContainer, grid.renderContainers.body);
          }
          if (rightContainer !== null) {
            grid.renderContainers.right.cellNav = new UiGridCellNav(grid.renderContainers.body, rightContainer, grid.renderContainers.body, leftContainer);
          }

          grid.renderContainers.body.cellNav = new UiGridCellNav(grid.renderContainers.body, grid.renderContainers.body, leftContainer, rightContainer);
        },

        /**
         * @ngdoc service
         * @name getDirection
         * @methodOf ui.grid.cellNav.service:uiGridCellNavService
         * @description  determines which direction to for a given keyDown event
         * @returns {uiGridCellNavConstants.direction} direction
         */
        getDirection: function (evt) {
          if (evt.keyCode === uiGridConstants.keymap.LEFT ||
            (evt.keyCode === uiGridConstants.keymap.TAB && evt.shiftKey)) {
            return uiGridCellNavConstants.direction.LEFT;
          }
          if (evt.keyCode === uiGridConstants.keymap.RIGHT ||
            evt.keyCode === uiGridConstants.keymap.TAB) {
            return uiGridCellNavConstants.direction.RIGHT;
          }

          if (evt.keyCode === uiGridConstants.keymap.UP ||
            (evt.keyCode === uiGridConstants.keymap.ENTER && evt.shiftKey) ) {
            return uiGridCellNavConstants.direction.UP;
          }

          if (evt.keyCode === uiGridConstants.keymap.PG_UP){
            return uiGridCellNavConstants.direction.PG_UP;
          }

          if (evt.keyCode === uiGridConstants.keymap.DOWN ||
            evt.keyCode === uiGridConstants.keymap.ENTER && !(evt.ctrlKey || evt.altKey)) {
            return uiGridCellNavConstants.direction.DOWN;
          }

          if (evt.keyCode === uiGridConstants.keymap.PG_DOWN){
            return uiGridCellNavConstants.direction.PG_DOWN;
          }

          return null;
        },

        /**
         * @ngdoc service
         * @name cellNavColumnBuilder
         * @methodOf ui.grid.cellNav.service:uiGridCellNavService
         * @description columnBuilder function that adds cell navigation properties to grid column
         * @returns {promise} promise that will load any needed templates when resolved
         */
        cellNavColumnBuilder: function (colDef, col, gridOptions) {
          var promises = [];

          /**
           *  @ngdoc object
           *  @name ui.grid.cellNav.api:ColumnDef
           *
           *  @description Column Definitions for cellNav feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
           */

          /**
           *  @ngdoc object
           *  @name allowCellFocus
           *  @propertyOf  ui.grid.cellNav.api:ColumnDef
           *  @description Enable focus on a cell within this column.
           *  <br/>Defaults to true
           */
          colDef.allowCellFocus = colDef.allowCellFocus === undefined ? true : colDef.allowCellFocus;

          return $q.all(promises);
        },

        /**
         * @ngdoc method
         * @methodOf ui.grid.cellNav.service:uiGridCellNavService
         * @name scrollToFocus
         * @description Scroll the grid such that the specified
         * row and column is in view, and set focus to the cell in that row and column
         * @param {Grid} grid the grid you'd like to act upon, usually available
         * from gridApi.grid
         * @param {object} rowEntity gridOptions.data[] array instance to make visible and set focus to
         * @param {object} colDef to make visible and set focus to
         * @returns {promise} a promise that is resolved after any scrolling is finished
         */
        scrollToFocus: function (grid, rowEntity, colDef) {
          var gridRow = null, gridCol = null;

          if (typeof(rowEntity) !== 'undefined' && rowEntity !== null) {
            gridRow = grid.getRow(rowEntity);
          }

          if (typeof(colDef) !== 'undefined' && colDef !== null) {
            gridCol = grid.getColumn(colDef.name ? colDef.name : colDef.field);
          }
          return grid.api.core.scrollToIfNecessary(gridRow, gridCol).then(function () {
            var rowCol = { row: gridRow, col: gridCol };

            // Broadcast the navigation
            if (gridRow !== null && gridCol !== null) {
              grid.cellNav.broadcastCellNav(rowCol);
            }
          });



        },


        /**
         * @ngdoc method
         * @methodOf ui.grid.cellNav.service:uiGridCellNavService
         * @name getLeftWidth
         * @description Get the current drawn width of the columns in the
         * grid up to the numbered column, and add an apportionment for the
         * column that we're on.  So if we are on column 0, we want to scroll
         * 0% (i.e. exclude this column from calc).  If we're on the last column
         * we want to scroll to 100% (i.e. include this column in the calc). So
         * we include (thisColIndex / totalNumberCols) % of this column width
         * @param {Grid} grid the grid you'd like to act upon, usually available
         * from gridApi.grid
         * @param {gridCol} upToCol the column to total up to and including
         */
        getLeftWidth: function (grid, upToCol) {
          var width = 0;

          if (!upToCol) {
            return width;
          }

          var lastIndex = grid.renderContainers.body.visibleColumnCache.indexOf( upToCol );

          // total column widths up-to but not including the passed in column
          grid.renderContainers.body.visibleColumnCache.forEach( function( col, index ) {
            if ( index < lastIndex ){
              width += col.drawnWidth;
            }
          });

          // pro-rata the final column based on % of total columns.
          var percentage = lastIndex === 0 ? 0 : (lastIndex + 1) / grid.renderContainers.body.visibleColumnCache.length;
          width += upToCol.drawnWidth * percentage;

          return width;
        }
      };

      return service;
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.cellNav.directive:uiCellNav
   *  @element div
   *  @restrict EA
   *
   *  @description Adds cell navigation features to the grid columns
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.cellNav']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.columnDefs = [
        {name: 'name'},
        {name: 'title'}
      ];
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-cellnav></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridCellnav', ['gridUtil', 'uiGridCellNavService', 'uiGridCellNavConstants', 'uiGridConstants', '$timeout',
    function (gridUtil, uiGridCellNavService, uiGridCellNavConstants, uiGridConstants, $timeout) {
      return {
        replace: true,
        priority: -150,
        require: '^uiGrid',
        scope: false,
        controller: function () {},
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              var _scope = $scope;

              var grid = uiGridCtrl.grid;
              uiGridCellNavService.initializeGrid(grid);

              uiGridCtrl.cellNav = {};

              uiGridCtrl.cellNav.getActiveCell = function () {
                var elms = $elm[0].getElementsByClassName('ui-grid-cell-focus');
                if (elms.length > 0){
                  return elms[0];
                }

                return undefined;
              };

              uiGridCtrl.cellNav.broadcastCellNav = grid.cellNav.broadcastCellNav = function (newRowCol, modifierDown) {
                modifierDown = !(modifierDown === undefined || !modifierDown);
                uiGridCtrl.cellNav.broadcastFocus(newRowCol, modifierDown);
                _scope.$broadcast(uiGridCellNavConstants.CELL_NAV_EVENT, newRowCol, modifierDown);
              };

              uiGridCtrl.cellNav.clearFocus = grid.cellNav.clearFocus = function () {
                _scope.$broadcast(uiGridCellNavConstants.CELL_NAV_EVENT, { eventType: uiGridCellNavConstants.EVENT_TYPE.CLEAR });
              };

              uiGridCtrl.cellNav.broadcastFocus = function (rowCol, modifierDown) {
                modifierDown = !(modifierDown === undefined || !modifierDown);

                var row = rowCol.row,
                  col = rowCol.col;

                var rowColSelectIndex = uiGridCtrl.grid.api.cellNav.rowColSelectIndex(rowCol);

                if (grid.cellNav.lastRowCol === null || rowColSelectIndex === -1) {
                  var newRowCol = new RowCol(row, col);

                  grid.api.cellNav.raise.navigate(newRowCol, grid.cellNav.lastRowCol);
                  grid.cellNav.lastRowCol = newRowCol;
                  if (uiGridCtrl.grid.options.modifierKeysToMultiSelectCells && modifierDown) {
                    grid.cellNav.focusedCells.push(rowCol);
                  } else {
                    grid.cellNav.focusedCells = [rowCol];
                  }
                } else if (grid.options.modifierKeysToMultiSelectCells && modifierDown &&
                  rowColSelectIndex >= 0) {

                  grid.cellNav.focusedCells.splice(rowColSelectIndex, 1);
                }
              };

              uiGridCtrl.cellNav.handleKeyDown = function (evt) {
                var direction = uiGridCellNavService.getDirection(evt);
                if (direction === null) {
                  return null;
                }

                var containerId = 'body';
                if (evt.uiGridTargetRenderContainerId) {
                  containerId = evt.uiGridTargetRenderContainerId;
                }

                // Get the last-focused row+col combo
                var lastRowCol = uiGridCtrl.grid.api.cellNav.getFocusedCell();
                if (lastRowCol) {
                  // Figure out which new row+combo we're navigating to
                  var rowCol = uiGridCtrl.grid.renderContainers[containerId].cellNav.getNextRowCol(direction, lastRowCol.row, lastRowCol.col);
                  var focusableCols = uiGridCtrl.grid.renderContainers[containerId].cellNav.getFocusableCols();
                  var rowColSelectIndex = uiGridCtrl.grid.api.cellNav.rowColSelectIndex(rowCol);
                  // Shift+tab on top-left cell should exit cellnav on render container
                  if (
                    // Navigating left
                    direction === uiGridCellNavConstants.direction.LEFT &&
                    // New col is last col (i.e. wrap around)
                    rowCol.col === focusableCols[focusableCols.length - 1] &&
                    // Staying on same row, which means we're at first row
                    rowCol.row === lastRowCol.row &&
                    evt.keyCode === uiGridConstants.keymap.TAB &&
                    evt.shiftKey
                  ) {
                    grid.cellNav.focusedCells.splice(rowColSelectIndex, 1);
                    uiGridCtrl.cellNav.clearFocus();
                    return true;
                  }
                  // Tab on bottom-right cell should exit cellnav on render container
                  else if (
                    direction === uiGridCellNavConstants.direction.RIGHT &&
                    // New col is first col (i.e. wrap around)
                    rowCol.col === focusableCols[0] &&
                    // Staying on same row, which means we're at first row
                    rowCol.row === lastRowCol.row &&
                    evt.keyCode === uiGridConstants.keymap.TAB &&
                    !evt.shiftKey
                  ) {
                    grid.cellNav.focusedCells.splice(rowColSelectIndex, 1);
                    uiGridCtrl.cellNav.clearFocus();
                    return true;
                  }

                  // Scroll to the new cell, if it's not completely visible within the render container's viewport
                  grid.scrollToIfNecessary(rowCol.row, rowCol.col).then(function () {
                    uiGridCtrl.cellNav.broadcastCellNav(rowCol);
                  });


                  evt.stopPropagation();
                  evt.preventDefault();

                  return false;
                }
              };
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {
            }
          };
        }
      };
    }]);

  module.directive('uiGridRenderContainer', ['$timeout', '$document', 'gridUtil', 'uiGridConstants', 'uiGridCellNavService', '$compile','uiGridCellNavConstants',
    function ($timeout, $document, gridUtil, uiGridConstants, uiGridCellNavService, $compile, uiGridCellNavConstants) {
      return {
        replace: true,
        priority: -99999, //this needs to run very last
        require: ['^uiGrid', 'uiGridRenderContainer', '?^uiGridCellnav'],
        scope: false,
        compile: function () {
          return {
            post: function ($scope, $elm, $attrs, controllers) {
              var uiGridCtrl = controllers[0],
                 renderContainerCtrl = controllers[1];

              // Skip attaching cell-nav specific logic if the directive is not attached above us
              if (!uiGridCtrl.grid.api.cellNav) { return; }

              var containerId = renderContainerCtrl.containerId;

              var grid = uiGridCtrl.grid;

              // focusser only created for body
              if (containerId !== 'body') {
                return;
              }

              // Needs to run last after all renderContainers are built
              uiGridCellNavService.decorateRenderContainers(grid);

              //add an element with no dimensions that can be used to set focus and capture keystrokes
              var focuser = $compile('<div class="ui-grid-focuser" tabindex="0"></div>')($scope);
              $elm.append(focuser);

              uiGridCtrl.focus = function () {
                focuser[0].focus();
                //allow for first time grid focus
                focuser.on('focus', function (evt) {
                  evt.uiGridTargetRenderContainerId = containerId;
                  var rowCol = uiGridCtrl.grid.api.cellNav.getFocusedCell();
                  if (rowCol === null) {
                    rowCol = uiGridCtrl.grid.renderContainers[containerId].cellNav.getNextRowCol(uiGridCellNavConstants.direction.DOWN, null, null);
                    if (rowCol.row && rowCol.col) {
                      uiGridCtrl.cellNav.broadcastCellNav(rowCol);
                    }
                  }
                });
              };

              var viewPortKeyDownWasRaisedForRowCol = null;
              // Bind to keydown events in the render container
              focuser.on('keydown', function (evt) {
                evt.uiGridTargetRenderContainerId = containerId;
                var rowCol = uiGridCtrl.grid.api.cellNav.getFocusedCell();
                var result = uiGridCtrl.cellNav.handleKeyDown(evt);
                if (result === null) {
                  uiGridCtrl.grid.api.cellNav.raise.viewPortKeyDown(evt, rowCol);
                  viewPortKeyDownWasRaisedForRowCol = rowCol;
                }
              });
              //Bind to keypress events in the render container
              //keypress events are needed by edit function so the key press
              //that initiated an edit is not lost
              //must fire the event in a timeout so the editor can
              //initialize and subscribe to the event on another event loop
              focuser.on('keypress', function (evt) {
                if (viewPortKeyDownWasRaisedForRowCol) {
                  $timeout(function () {
                    uiGridCtrl.grid.api.cellNav.raise.viewPortKeyPress(evt, viewPortKeyDownWasRaisedForRowCol);
                  },4);

                  viewPortKeyDownWasRaisedForRowCol = null;
                }
              });

            }
          };
        }
      };
    }]);

  module.directive('uiGridViewport', ['$timeout', '$document', 'gridUtil', 'uiGridConstants', 'uiGridCellNavService', 'uiGridCellNavConstants','$log','$compile',
    function ($timeout, $document, gridUtil, uiGridConstants, uiGridCellNavService, uiGridCellNavConstants, $log, $compile) {
      return {
        replace: true,
        priority: -99999, //this needs to run very last
        require: ['^uiGrid', '^uiGridRenderContainer', '?^uiGridCellnav'],
        scope: false,
        compile: function () {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            },
            post: function ($scope, $elm, $attrs, controllers) {
              var uiGridCtrl = controllers[0],
                renderContainerCtrl = controllers[1];

              // Skip attaching cell-nav specific logic if the directive is not attached above us
              if (!uiGridCtrl.grid.api.cellNav) { return; }

              var containerId = renderContainerCtrl.containerId;
              //no need to process for other containers
              if (containerId !== 'body') {
                return;
              }

              var grid = uiGridCtrl.grid;



              uiGridCtrl.focus();



              grid.api.core.on.scrollBegin($scope, function (args) {

                // Skip if there's no currently-focused cell
                var lastRowCol = uiGridCtrl.grid.api.cellNav.getFocusedCell();
                if (lastRowCol == null) {
                  return;
                }

                //if not in my container, move on
                //todo: worry about horiz scroll
                if (!renderContainerCtrl.colContainer.containsColumn(lastRowCol.col)) {
                  return;
                }

                //clear dom of focused cell

                var elements = $elm[0].getElementsByClassName('ui-grid-cell-focus');
                Array.prototype.forEach.call(elements,function(e){angular.element(e).removeClass('ui-grid-cell-focus');});

              });

              grid.api.core.on.scrollEnd($scope, function (args) {
                // Skip if there's no currently-focused cell
                var lastRowCol = uiGridCtrl.grid.api.cellNav.getFocusedCell();
                if (lastRowCol == null) {
                  return;
                }

                //if not in my container, move on
                //todo: worry about horiz scroll
                if (!renderContainerCtrl.colContainer.containsColumn(lastRowCol.col)) {
                  return;
                }

                uiGridCtrl.cellNav.broadcastCellNav(lastRowCol);

              });

              grid.api.cellNav.on.navigate($scope, function () {
                //focus again because it can be lost
                 uiGridCtrl.focus();
              });

            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.cellNav.directive:uiGridCell
   *  @element div
   *  @restrict A
   *  @description Stacks on top of ui.grid.uiGridCell to provide cell navigation
   */
  module.directive('uiGridCell', ['$timeout', '$document', 'uiGridCellNavService', 'gridUtil', 'uiGridCellNavConstants', 'uiGridConstants',
    function ($timeout, $document, uiGridCellNavService, gridUtil, uiGridCellNavConstants, uiGridConstants) {
      return {
        priority: -150, // run after default uiGridCell directive and ui.grid.edit uiGridCell
        restrict: 'A',
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          // Skip attaching cell-nav specific logic if the directive is not attached above us
          if (!uiGridCtrl.grid.api.cellNav) { return; }

          if (!$scope.col.colDef.allowCellFocus) {
            return;
          }

          // When a cell is clicked, broadcast a cellNav event saying that this row+col combo is now focused
          $elm.find('div').on('click', function (evt) {
            uiGridCtrl.cellNav.broadcastCellNav(new RowCol($scope.row, $scope.col), evt.ctrlKey || evt.metaKey);

            evt.stopPropagation();
            $scope.$apply();
          });

          $elm.find('div').on('focus', function (evt) {
            uiGridCtrl.cellNav.broadcastCellNav(new RowCol($scope.row, $scope.col), evt.ctrlKey || evt.metaKey);
          });

          // This event is fired for all cells.  If the cell matches, then focus is set
          $scope.$on(uiGridCellNavConstants.CELL_NAV_EVENT, function (evt, rowCol, modifierDown) {
            if (evt.eventType === uiGridCellNavConstants.EVENT_TYPE.CLEAR) {
              clearFocus();
              return;
            }

            if (rowCol.row === $scope.row &&
              rowCol.col === $scope.col) {
              if (uiGridCtrl.grid.options.modifierKeysToMultiSelectCells && modifierDown &&
                uiGridCtrl.grid.api.cellNav.rowColSelectIndex(rowCol) === -1) {
                clearFocus();
              } else {
                setFocused();
              }

             // // This cellNav event came from a keydown event so we can safely refocus
             // if (rowCol.hasOwnProperty('eventType') && rowCol.eventType === uiGridCellNavConstants.EVENT_TYPE.KEYDOWN) {
             ////   $elm.find('div')[0].focus();
             // }
            }
            else if (!(uiGridCtrl.grid.options.modifierKeysToMultiSelectCells && modifierDown)) {
              clearFocus();
            }
          });

          function setFocused() {
            var div = $elm.find('div');
            div.addClass('ui-grid-cell-focus');
          }

          function clearFocus() {
            var div = $elm.find('div');
            div.removeClass('ui-grid-cell-focus');
          }

          $scope.$on('$destroy', function () {
            $elm.find('div').off('click');
          });
        }
      };
    }]);

})();

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.edit
   * @description
   *
   * # ui.grid.edit
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides cell editing capability to ui.grid. The goal was to emulate keying data in a spreadsheet via
   * a keyboard.
   * <br/>
   * <br/>
   * To really get the full spreadsheet-like data entry, the ui.grid.cellNav module should be used. This will allow the
   * user to key data and then tab, arrow, or enter to the cells beside or below.
   *
   * <div doc-module-components="ui.grid.edit"></div>
   */

  var module = angular.module('ui.grid.edit', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.edit.constant:uiGridEditConstants
   *
   *  @description constants available in edit module
   */
  module.constant('uiGridEditConstants', {
    EDITABLE_CELL_TEMPLATE: /EDITABLE_CELL_TEMPLATE/g,
    //must be lowercase because template bulder converts to lower
    EDITABLE_CELL_DIRECTIVE: /editable_cell_directive/g,
    events: {
      BEGIN_CELL_EDIT: 'uiGridEventBeginCellEdit',
      END_CELL_EDIT: 'uiGridEventEndCellEdit',
      CANCEL_CELL_EDIT: 'uiGridEventCancelCellEdit'
    }
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.edit.service:uiGridEditService
   *
   *  @description Services for editing features
   */
  module.service('uiGridEditService', ['$q', 'uiGridConstants', 'gridUtil',
    function ($q, uiGridConstants, gridUtil) {

      var service = {

        initializeGrid: function (grid) {

          service.defaultGridOptions(grid.options);

          grid.registerColumnBuilder(service.editColumnBuilder);
          grid.edit = {};

          /**
           *  @ngdoc object
           *  @name ui.grid.edit.api:PublicApi
           *
           *  @description Public Api for edit feature
           */
          var publicApi = {
            events: {
              edit: {
                /**
                 * @ngdoc event
                 * @name afterCellEdit
                 * @eventOf  ui.grid.edit.api:PublicApi
                 * @description raised when cell editing is complete
                 * <pre>
                 *      gridApi.edit.on.afterCellEdit(scope,function(rowEntity, colDef){})
                 * </pre>
                 * @param {object} rowEntity the options.data element that was edited
                 * @param {object} colDef the column that was edited
                 * @param {object} newValue new value
                 * @param {object} oldValue old value
                 */
                afterCellEdit: function (rowEntity, colDef, newValue, oldValue) {
                },
                /**
                 * @ngdoc event
                 * @name beginCellEdit
                 * @eventOf  ui.grid.edit.api:PublicApi
                 * @description raised when cell editing starts on a cell
                 * <pre>
                 *      gridApi.edit.on.beginCellEdit(scope,function(rowEntity, colDef){})
                 * </pre>
                 * @param {object} rowEntity the options.data element that was edited
                 * @param {object} colDef the column that was edited
                 * @param {object} triggerEvent the event that triggered the edit.  Useful to prevent losing keystrokes on some
                 *                 complex editors
                 */
                beginCellEdit: function (rowEntity, colDef, triggerEvent) {
                },
                /**
                 * @ngdoc event
                 * @name cancelCellEdit
                 * @eventOf  ui.grid.edit.api:PublicApi
                 * @description raised when cell editing is cancelled on a cell
                 * <pre>
                 *      gridApi.edit.on.cancelCellEdit(scope,function(rowEntity, colDef){})
                 * </pre>
                 * @param {object} rowEntity the options.data element that was edited
                 * @param {object} colDef the column that was edited
                 */
                cancelCellEdit: function (rowEntity, colDef) {
                }
              }
            },
            methods: {
              edit: { }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);
          //grid.api.registerMethodsFromObject(publicApi.methods);

        },

        defaultGridOptions: function (gridOptions) {

          /**
           *  @ngdoc object
           *  @name ui.grid.edit.api:GridOptions
           *
           *  @description Options for configuring the edit feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           *  @ngdoc object
           *  @name enableCellEdit
           *  @propertyOf  ui.grid.edit.api:GridOptions
           *  @description If defined, sets the default value for the editable flag on each individual colDefs
           *  if their individual enableCellEdit configuration is not defined. Defaults to undefined.
           */

          /**
           *  @ngdoc object
           *  @name cellEditableCondition
           *  @propertyOf  ui.grid.edit.api:GridOptions
           *  @description If specified, either a value or function to be used by all columns before editing.
           *  If falsy, then editing of cell is not allowed.
           *  @example
           *  <pre>
           *  function($scope){
           *    //use $scope.row.entity and $scope.col.colDef to determine if editing is allowed
           *    return true;
           *  }
           *  </pre>
           */
          gridOptions.cellEditableCondition = gridOptions.cellEditableCondition === undefined ? true : gridOptions.cellEditableCondition;

          /**
           *  @ngdoc object
           *  @name editableCellTemplate
           *  @propertyOf  ui.grid.edit.api:GridOptions
           *  @description If specified, cellTemplate to use as the editor for all columns.
           *  <br/> defaults to 'ui-grid/cellTextEditor'
           */

          /**
           *  @ngdoc object
           *  @name enableCellEditOnFocus
           *  @propertyOf  ui.grid.edit.api:GridOptions
           *  @description If true, then editor is invoked as soon as cell receives focus. Default false.
           *  <br/>_requires cellNav feature and the edit feature to be enabled_
           */
            //enableCellEditOnFocus can only be used if cellnav module is used
          gridOptions.enableCellEditOnFocus = gridOptions.enableCellEditOnFocus === undefined ? false : gridOptions.enableCellEditOnFocus;
        },

        /**
         * @ngdoc service
         * @name editColumnBuilder
         * @methodOf ui.grid.edit.service:uiGridEditService
         * @description columnBuilder function that adds edit properties to grid column
         * @returns {promise} promise that will load any needed templates when resolved
         */
        editColumnBuilder: function (colDef, col, gridOptions) {

          var promises = [];

          /**
           *  @ngdoc object
           *  @name ui.grid.edit.api:ColumnDef
           *
           *  @description Column Definition for edit feature, these are available to be
           *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
           */

          /**
           *  @ngdoc object
           *  @name enableCellEdit
           *  @propertyOf  ui.grid.edit.api:ColumnDef
           *  @description enable editing on column
           */
          colDef.enableCellEdit = colDef.enableCellEdit === undefined ? (gridOptions.enableCellEdit === undefined ?
            (colDef.type !== 'object') : gridOptions.enableCellEdit) : colDef.enableCellEdit;

          /**
           *  @ngdoc object
           *  @name cellEditableCondition
           *  @propertyOf  ui.grid.edit.api:ColumnDef
           *  @description If specified, either a value or function evaluated before editing cell.  If falsy, then editing of cell is not allowed.
           *  @example
           *  <pre>
           *  function($scope){
           *    //use $scope.row.entity and $scope.col.colDef to determine if editing is allowed
           *    return true;
           *  }
           *  </pre>
           */
          colDef.cellEditableCondition = colDef.cellEditableCondition === undefined ? gridOptions.cellEditableCondition :  colDef.cellEditableCondition;

          /**
           *  @ngdoc object
           *  @name editableCellTemplate
           *  @propertyOf  ui.grid.edit.api:ColumnDef
           *  @description cell template to be used when editing this column. Can be Url or text template
           *  <br/>Defaults to gridOptions.editableCellTemplate
           */
          if (colDef.enableCellEdit) {
            colDef.editableCellTemplate = colDef.editableCellTemplate || gridOptions.editableCellTemplate || 'ui-grid/cellEditor';

            promises.push(gridUtil.getTemplate(colDef.editableCellTemplate)
              .then(
              function (template) {
                col.editableCellTemplate = template;
              },
              function (res) {
                // Todo handle response error here?
                throw new Error("Couldn't fetch/use colDef.editableCellTemplate '" + colDef.editableCellTemplate + "'");
              }));
          }

          /**
           *  @ngdoc object
           *  @name enableCellEditOnFocus
           *  @propertyOf  ui.grid.edit.api:ColumnDef
           *  @requires ui.grid.cellNav
           *  @description If true, then editor is invoked as soon as cell receives focus. Default false.
           *  <br>_requires both the cellNav feature and the edit feature to be enabled_
           */
            //enableCellEditOnFocus can only be used if cellnav module is used
          colDef.enableCellEditOnFocus = colDef.enableCellEditOnFocus === undefined ? gridOptions.enableCellEditOnFocus : colDef.enableCellEditOnFocus;


          /**
           *  @ngdoc string
           *  @name editModelField
           *  @propertyOf  ui.grid.edit.api:ColumnDef
           *  @description a bindable string value that is used when binding to edit controls instead of colDef.field
           *  <br/> example: You have a complex property on and object like state:{abbrev:'MS',name:'Mississippi'}.  The
           *  grid should display state.name in the cell and sort/filter based on the state.name property but the editor
           *  requires the full state object.
           *  <br/>colDef.field = 'state.name'
           *  <br/>colDef.editModelField = 'state'
           */
          //colDef.editModelField

          return $q.all(promises);
        },

        /**
         * @ngdoc service
         * @name isStartEditKey
         * @methodOf ui.grid.edit.service:uiGridEditService
         * @description  Determines if a keypress should start editing.  Decorate this service to override with your
         * own key events.  See service decorator in angular docs.
         * @param {Event} evt keydown event
         * @returns {boolean} true if an edit should start
         */
        isStartEditKey: function (evt) {
          if (evt.metaKey ||
              evt.keyCode === uiGridConstants.keymap.ESC ||
              evt.keyCode === uiGridConstants.keymap.SHIFT ||
              evt.keyCode === uiGridConstants.keymap.CTRL ||
              evt.keyCode === uiGridConstants.keymap.ALT ||
              evt.keyCode === uiGridConstants.keymap.WIN ||
              evt.keyCode === uiGridConstants.keymap.CAPSLOCK ||

             evt.keyCode === uiGridConstants.keymap.LEFT ||
            (evt.keyCode === uiGridConstants.keymap.TAB && evt.shiftKey) ||

            evt.keyCode === uiGridConstants.keymap.RIGHT ||
            evt.keyCode === uiGridConstants.keymap.TAB ||

            evt.keyCode === uiGridConstants.keymap.UP ||
            (evt.keyCode === uiGridConstants.keymap.ENTER && evt.shiftKey) ||

            evt.keyCode === uiGridConstants.keymap.DOWN ||
            evt.keyCode === uiGridConstants.keymap.ENTER) {
            return false;

          }
          return true;
        }


      };

      return service;

    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridEdit
   *  @element div
   *  @restrict A
   *
   *  @description Adds editing features to the ui-grid directive.
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.edit']);

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
   <div ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-edit></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridEdit', ['gridUtil', 'uiGridEditService', function (gridUtil, uiGridEditService) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            uiGridEditService.initializeGrid(uiGridCtrl.grid);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridRenderContainer
   *  @element div
   *  @restrict A
   *
   *  @description Adds keydown listeners to renderContainer element so we can capture when to begin edits
   *
   */
  module.directive('uiGridViewport', [ 'uiGridEditConstants',
    function ( uiGridEditConstants) {
      return {
        replace: true,
        priority: -99998, //run before cellNav
        require: ['^uiGrid', '^uiGridRenderContainer'],
        scope: false,
        compile: function () {
          return {
            post: function ($scope, $elm, $attrs, controllers) {
              var uiGridCtrl = controllers[0];

              // Skip attaching if edit and cellNav is not enabled
              if (!uiGridCtrl.grid.api.edit || !uiGridCtrl.grid.api.cellNav) { return; }

              var containerId =  controllers[1].containerId;
              //no need to process for other containers
              if (containerId !== 'body') {
                return;
              }

              //refocus on the grid
              $scope.$on(uiGridEditConstants.events.CANCEL_CELL_EDIT, function () {
                uiGridCtrl.focus();
              });
              $scope.$on(uiGridEditConstants.events.END_CELL_EDIT, function () {
                uiGridCtrl.focus();
              });

            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridCell
   *  @element div
   *  @restrict A
   *
   *  @description Stacks on top of ui.grid.uiGridCell to provide in-line editing capabilities to the cell
   *  Editing Actions.
   *
   *  Binds edit start events to the uiGridCell element.  When the events fire, the gridCell element is appended
   *  with the columnDef.editableCellTemplate element ('cellEditor.html' by default).
   *
   *  The editableCellTemplate should respond to uiGridEditConstants.events.BEGIN\_CELL\_EDIT angular event
   *  and do the initial steps needed to edit the cell (setfocus on input element, etc).
   *
   *  When the editableCellTemplate recognizes that the editing is ended (blur event, Enter key, etc.)
   *  it should emit the uiGridEditConstants.events.END\_CELL\_EDIT event.
   *
   *  If editableCellTemplate recognizes that the editing has been cancelled (esc key)
   *  it should emit the uiGridEditConstants.events.CANCEL\_CELL\_EDIT event.  The original value
   *  will be set back on the model by the uiGridCell directive.
   *
   *  Events that invoke editing:
   *    - dblclick
   *    - F2 keydown (when using cell selection)
   *
   *  Events that end editing:
   *    - Dependent on the specific editableCellTemplate
   *    - Standards should be blur and enter keydown
   *
   *  Events that cancel editing:
   *    - Dependent on the specific editableCellTemplate
   *    - Standards should be Esc keydown
   *
   *  Grid Events that end editing:
   *    - uiGridConstants.events.GRID_SCROLL
   *
   */

  /**
   *  @ngdoc object
   *  @name ui.grid.edit.api:GridRow
   *
   *  @description GridRow options for edit feature, these are available to be
   *  set internally only, by other features
   */

  /**
   *  @ngdoc object
   *  @name enableCellEdit
   *  @propertyOf  ui.grid.edit.api:GridRow
   *  @description enable editing on row, grouping for example might disable editing on group header rows
   */

  module.directive('uiGridCell',
    ['$compile', '$injector', '$timeout', 'uiGridConstants', 'uiGridEditConstants', 'gridUtil', '$parse', 'uiGridEditService', '$rootScope',
      function ($compile, $injector, $timeout, uiGridConstants, uiGridEditConstants, gridUtil, $parse, uiGridEditService, $rootScope) {
        var touchstartTimeout = 500;
        if ($injector.has('uiGridCellNavService')) {
          var uiGridCellNavService = $injector.get('uiGridCellNavService');
        }

        return {
          priority: -100, // run after default uiGridCell directive
          restrict: 'A',
          scope: false,
          require: '?^uiGrid',
          link: function ($scope, $elm, $attrs, uiGridCtrl) {
            var html;
            var origCellValue;
            var inEdit = false;
            var cellModel;
            var cancelTouchstartTimeout;

            var editCellScope;

            if (!$scope.col.colDef.enableCellEdit) {
              return;
            }

            var cellNavNavigateDereg = function() {};

            // Bind to keydown events in the render container
            if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {

              uiGridCtrl.grid.api.cellNav.on.viewPortKeyDown($scope, function (evt, rowCol) {
                if (rowCol === null) {
                  return;
                }

                if (rowCol.row === $scope.row && rowCol.col === $scope.col && !$scope.col.colDef.enableCellEditOnFocus) {
                  //important to do this before scrollToIfNecessary
                  beginEditKeyDown(evt);
                 // uiGridCtrl.grid.api.core.scrollToIfNecessary(rowCol.row, rowCol.col);
                }

              });
            }

            var setEditable = function() {
              if ($scope.col.colDef.enableCellEdit && $scope.row.enableCellEdit !== false) {
                registerBeginEditEvents();
              } else {
                cancelBeginEditEvents();
              }
            };

            setEditable();

            var rowWatchDereg = $scope.$watch( 'row', setEditable );
            $scope.$on( '$destroy', rowWatchDereg );

            function registerBeginEditEvents() {
              $elm.on('dblclick', beginEdit);

              // Add touchstart handling. If the users starts a touch and it doesn't end after X milliseconds, then start the edit
              $elm.on('touchstart', touchStart);

              if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                cellNavNavigateDereg = uiGridCtrl.grid.api.cellNav.on.navigate($scope, function (newRowCol, oldRowCol) {
                  if ($scope.col.colDef.enableCellEditOnFocus) {
                    if (newRowCol.row === $scope.row && newRowCol.col === $scope.col) {
                      $timeout(function () {
                        beginEdit();
                      });
                    }
                  }
                });
              }



            }

            function touchStart(event) {
              // jQuery masks events
              if (typeof(event.originalEvent) !== 'undefined' && event.originalEvent !== undefined) {
                event = event.originalEvent;
              }

              // Bind touchend handler
              $elm.on('touchend', touchEnd);

              // Start a timeout
              cancelTouchstartTimeout = $timeout(function() { }, touchstartTimeout);

              // Timeout's done! Start the edit
              cancelTouchstartTimeout.then(function () {
                // Use setTimeout to start the edit because beginEdit expects to be outside of $digest
                setTimeout(beginEdit, 0);

                // Undbind the touchend handler, we don't need it anymore
                $elm.off('touchend', touchEnd);
              });
            }

            // Cancel any touchstart timeout
            function touchEnd(event) {
              $timeout.cancel(cancelTouchstartTimeout);
              $elm.off('touchend', touchEnd);
            }

            function cancelBeginEditEvents() {
              $elm.off('dblclick', beginEdit);
              $elm.off('keydown', beginEditKeyDown);
              $elm.off('touchstart', touchStart);
              cellNavNavigateDereg();
            }

            function beginEditKeyDown(evt) {
              if (uiGridEditService.isStartEditKey(evt)) {
                beginEdit(evt);
              }
            }

            function shouldEdit(col, row) {
              return !row.isSaving &&
                ( angular.isFunction(col.colDef.cellEditableCondition) ?
                    col.colDef.cellEditableCondition($scope) :
                    col.colDef.cellEditableCondition );
            }


            function beginEdit(triggerEvent) {
              //we need to scroll the cell into focus before invoking the editor
              $scope.grid.api.core.scrollToIfNecessary($scope.row, $scope.col)
                .then(function () {
                  beginEditAfterScroll(triggerEvent);
                });
            }

            /**
             *  @ngdoc property
             *  @name editDropdownOptionsArray
             *  @propertyOf ui.grid.edit.api:ColumnDef
             *  @description an array of values in the format
             *  [ {id: xxx, value: xxx} ], which is populated
             *  into the edit dropdown
             *
             */
            /**
             *  @ngdoc property
             *  @name editDropdownIdLabel
             *  @propertyOf ui.grid.edit.api:ColumnDef
             *  @description the label for the "id" field
             *  in the editDropdownOptionsArray.  Defaults
             *  to 'id'
             *  @example
             *  <pre>
             *    $scope.gridOptions = {
             *      columnDefs: [
             *        {name: 'status', editableCellTemplate: 'ui-grid/dropdownEditor',
             *          editDropdownOptionsArray: [{code: 1, status: 'active'}, {code: 2, status: 'inactive'}],
             *          editDropdownIdLabel: 'code', editDropdownValueLabel: 'status' }
             *      ],
             *  </pre>
             *
             */
            /**
             *  @ngdoc property
             *  @name editDropdownRowEntityOptionsArrayPath
             *  @propertyOf ui.grid.edit.api:ColumnDef
             *  @description a path to a property on row.entity containing an
             *  array of values in the format
             *  [ {id: xxx, value: xxx} ], which will be used to populate
             *  the edit dropdown.  This can be used when the dropdown values are dependent on
             *  the backing row entity.
             *  If this property is set then editDropdownOptionsArray will be ignored.
             *  @example
             *  <pre>
             *    $scope.gridOptions = {
             *      columnDefs: [
             *        {name: 'status', editableCellTemplate: 'ui-grid/dropdownEditor',
             *          editDropdownRowEntityOptionsArrayPath: 'foo.bars[0].baz',
             *          editDropdownIdLabel: 'code', editDropdownValueLabel: 'status' }
             *      ],
             *  </pre>
             *
             */
            /**
             *  @ngdoc property
             *  @name editDropdownValueLabel
             *  @propertyOf ui.grid.edit.api:ColumnDef
             *  @description the label for the "value" field
             *  in the editDropdownOptionsArray.  Defaults
             *  to 'value'
             *  @example
             *  <pre>
             *    $scope.gridOptions = {
             *      columnDefs: [
             *        {name: 'status', editableCellTemplate: 'ui-grid/dropdownEditor',
             *          editDropdownOptionsArray: [{code: 1, status: 'active'}, {code: 2, status: 'inactive'}],
             *          editDropdownIdLabel: 'code', editDropdownValueLabel: 'status' }
             *      ],
             *  </pre>
             *
             */
            /**
             *  @ngdoc property
             *  @name editDropdownFilter
             *  @propertyOf ui.grid.edit.api:ColumnDef
             *  @description A filter that you would like to apply to the values in the options list
             *  of the dropdown.  For example if you were using angular-translate you might set this
             *  to `'translate'`
             *  @example
             *  <pre>
             *    $scope.gridOptions = {
             *      columnDefs: [
             *        {name: 'status', editableCellTemplate: 'ui-grid/dropdownEditor',
             *          editDropdownOptionsArray: [{code: 1, status: 'active'}, {code: 2, status: 'inactive'}],
             *          editDropdownIdLabel: 'code', editDropdownValueLabel: 'status', editDropdownFilter: 'translate' }
             *      ],
             *  </pre>
             *
             */
            function beginEditAfterScroll(triggerEvent) {
              // If we are already editing, then just skip this so we don't try editing twice...
              if (inEdit) {
                return;
              }

              if (!shouldEdit($scope.col, $scope.row)) {
                return;
              }


              cellModel = $parse($scope.row.getQualifiedColField($scope.col));
              //get original value from the cell
              origCellValue = cellModel($scope);

              html = $scope.col.editableCellTemplate;

              if ($scope.col.colDef.editModelField) {
                html = html.replace(uiGridConstants.MODEL_COL_FIELD, gridUtil.preEval('row.entity.' + $scope.col.colDef.editModelField));
              }
              else {
                html = html.replace(uiGridConstants.MODEL_COL_FIELD, $scope.row.getQualifiedColField($scope.col));
              }

              html = html.replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

              var optionFilter = $scope.col.colDef.editDropdownFilter ? '|' + $scope.col.colDef.editDropdownFilter : '';
              html = html.replace(uiGridConstants.CUSTOM_FILTERS, optionFilter);

              var inputType = 'text';
              switch ($scope.col.colDef.type){
                case 'boolean':
                  inputType = 'checkbox';
                  break;
                case 'number':
                  inputType = 'number';
                  break;
                case 'date':
                  inputType = 'date';
                  break;
              }
              html = html.replace('INPUT_TYPE', inputType);

              var editDropdownRowEntityOptionsArrayPath = $scope.col.colDef.editDropdownRowEntityOptionsArrayPath;
              if (editDropdownRowEntityOptionsArrayPath) {
                $scope.editDropdownOptionsArray =  resolveObjectFromPath($scope.row.entity, editDropdownRowEntityOptionsArrayPath);
              }
              else {
                $scope.editDropdownOptionsArray = $scope.col.colDef.editDropdownOptionsArray;
              }
              $scope.editDropdownIdLabel = $scope.col.colDef.editDropdownIdLabel ? $scope.col.colDef.editDropdownIdLabel : 'id';
              $scope.editDropdownValueLabel = $scope.col.colDef.editDropdownValueLabel ? $scope.col.colDef.editDropdownValueLabel : 'value';

              var cellElement;
              var createEditor = function(){
                inEdit = true;
                cancelBeginEditEvents();
                var cellElement = angular.element(html);
                $elm.append(cellElement);
                editCellScope = $scope.$new();
                $compile(cellElement)(editCellScope);
                var gridCellContentsEl = angular.element($elm.children()[0]);
                gridCellContentsEl.addClass('ui-grid-cell-contents-hidden');
              };
              if (!$rootScope.$$phase) {
                $scope.$apply(createEditor);
              } else {
                createEditor();
              }

              //stop editing when grid is scrolled
              var deregOnGridScroll = $scope.col.grid.api.core.on.scrollBegin($scope, function () {
                endEdit();
                $scope.grid.api.edit.raise.afterCellEdit($scope.row.entity, $scope.col.colDef, cellModel($scope), origCellValue);
                deregOnGridScroll();
                deregOnEndCellEdit();
                deregOnCancelCellEdit();
              });

              //end editing
              var deregOnEndCellEdit = $scope.$on(uiGridEditConstants.events.END_CELL_EDIT, function () {
                endEdit();
                $scope.grid.api.edit.raise.afterCellEdit($scope.row.entity, $scope.col.colDef, cellModel($scope), origCellValue);
                deregOnEndCellEdit();
                deregOnGridScroll();
                deregOnCancelCellEdit();
              });

              //cancel editing
              var deregOnCancelCellEdit = $scope.$on(uiGridEditConstants.events.CANCEL_CELL_EDIT, function () {
                cancelEdit();
                deregOnCancelCellEdit();
                deregOnGridScroll();
                deregOnEndCellEdit();
              });

              $scope.$broadcast(uiGridEditConstants.events.BEGIN_CELL_EDIT, triggerEvent);
              $scope.grid.api.edit.raise.beginCellEdit($scope.row.entity, $scope.col.colDef, triggerEvent);
            }

            function endEdit() {
              $scope.grid.disableScrolling = false;
              if (!inEdit) {
                return;
              }
              var gridCellContentsEl = angular.element($elm.children()[0]);
              //remove edit element
              editCellScope.$destroy();
              angular.element($elm.children()[1]).remove();
              gridCellContentsEl.removeClass('ui-grid-cell-contents-hidden');
              inEdit = false;
              registerBeginEditEvents();
              $scope.grid.api.core.notifyDataChange( uiGridConstants.dataChange.EDIT );
              //sometimes the events can't keep up with the keyboard and grid focus is lost, so always focus
              //back to grid here
              if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                uiGridCtrl.focus();
              }
            }

            function cancelEdit() {
              $scope.grid.disableScrolling = false;
              if (!inEdit) {
                return;
              }
              cellModel.assign($scope, origCellValue);
              $scope.$apply();

              $scope.grid.api.edit.raise.cancelCellEdit($scope.row.entity, $scope.col.colDef);
              endEdit();
            }

            // resolves a string path against the given object
            // shamelessly borrowed from
            // http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
            function resolveObjectFromPath(object, path) {
              path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
              path = path.replace(/^\./, '');           // strip a leading dot
              var a = path.split('.');
              while (a.length) {
                  var n = a.shift();
                  if (n in object) {
                      object = object[n];
                  } else {
                      return;
                  }
              }
              return object;
            }

          }
        };
      }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridEditor
   *  @element div
   *  @restrict A
   *
   *  @description input editor directive for editable fields.
   *  Provides EndEdit and CancelEdit events
   *
   *  Events that end editing:
   *     blur and enter keydown
   *
   *  Events that cancel editing:
   *    - Esc keydown
   *
   */
  module.directive('uiGridEditor',
    ['gridUtil', 'uiGridConstants', 'uiGridEditConstants','$timeout', 'uiGridEditService',
      function (gridUtil, uiGridConstants, uiGridEditConstants, $timeout, uiGridEditService) {
        return {
          scope: true,
          require: ['?^uiGrid', '?^uiGridRenderContainer', 'ngModel'],
          compile: function () {
            return {
              pre: function ($scope, $elm, $attrs) {

              },
              post: function ($scope, $elm, $attrs, controllers) {
                var uiGridCtrl, renderContainerCtrl, ngModel;
                if (controllers[0]) { uiGridCtrl = controllers[0]; }
                if (controllers[1]) { renderContainerCtrl = controllers[1]; }
                if (controllers[2]) { ngModel = controllers[2]; }

                //set focus at start of edit
                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function (evt,triggerEvent) {
                  $timeout(function () {
                    $elm[0].focus();
                    $elm[0].select();
                  });

                  //set the keystroke that started the edit event
                  //we must do this because the BeginEdit is done in a different event loop than the intitial
                  //keydown event
                  //fire this event for the keypress that is received
                  if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    var viewPortKeyDownUnregister = uiGridCtrl.grid.api.cellNav.on.viewPortKeyPress($scope, function (evt, rowCol) {
                      if (uiGridEditService.isStartEditKey(evt)) {
                        ngModel.$setViewValue(String.fromCharCode(evt.keyCode), evt);
                        ngModel.$render();
                      }
                      viewPortKeyDownUnregister();
                    });
                  }

                  $elm.on('blur', function (evt) {
                    $scope.stopEdit(evt);
                  });
                });


                $scope.deepEdit = false;

                $scope.stopEdit = function (evt) {
                  if ($scope.inputForm && !$scope.inputForm.$valid) {
                    evt.stopPropagation();
                    $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                  }
                  else {
                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                  }
                  $scope.deepEdit = false;
                };


                $elm.on('click', function (evt) {
                  if ($elm[0].type !== 'checkbox') {
                    $scope.deepEdit = true;
                    $timeout(function () {
                      $scope.grid.disableScrolling = true;
                    });
                  }
                });

                $elm.on('keydown', function (evt) {
                  switch (evt.keyCode) {
                    case uiGridConstants.keymap.ESC:
                      evt.stopPropagation();
                      $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                      break;
                  }

                  if ($scope.deepEdit &&
                    (evt.keyCode === uiGridConstants.keymap.LEFT ||
                     evt.keyCode === uiGridConstants.keymap.RIGHT ||
                     evt.keyCode === uiGridConstants.keymap.UP ||
                     evt.keyCode === uiGridConstants.keymap.DOWN)) {
                    evt.stopPropagation();
                  }
                  // Pass the keydown event off to the cellNav service, if it exists
                  else if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                    if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                      $scope.stopEdit(evt);
                    }
                  }
                  else {
                    //handle enter and tab for editing not using cellNav
                    switch (evt.keyCode) {
                      case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                      case uiGridConstants.keymap.TAB:
                        evt.stopPropagation();
                        evt.preventDefault();
                        $scope.stopEdit(evt);
                        break;
                    }
                  }

                  return true;
                });
              }
            };
          }
        };
      }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:input
   *  @element input
   *  @restrict E
   *
   *  @description directive to provide binding between input[date] value and ng-model for angular 1.2
   *  It is similar to input[date] directive of angular 1.3
   *
   *  Supported date format for input is 'yyyy-MM-dd'
   *  The directive will set the $valid property of input element and the enclosing form to false if
   *  model is invalid date or value of input is entered wrong.
   *
   */
    module.directive('uiGridEditor', ['$filter', function ($filter) {
      function parseDateString(dateString) {
        if (typeof(dateString) === 'undefined' || dateString === '') {
          return null;
        }
        var parts = dateString.split('-');
        if (parts.length !== 3) {
          return null;
        }
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);

        if (month < 1 || year < 1 || day < 1) {
          return null;
        }
        return new Date(year, (month - 1), day);
      }
      return {
        priority: -100, // run after default uiGridEditor directive
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {

          if (angular.version.minor === 2 && attrs.type && attrs.type === 'date' && ngModel) {

            ngModel.$formatters.push(function (modelValue) {
              ngModel.$setValidity(null,(!modelValue || !isNaN(modelValue.getTime())));
              return $filter('date')(modelValue, 'yyyy-MM-dd');
            });

            ngModel.$parsers.push(function (viewValue) {
              if (viewValue && viewValue.length > 0) {
                var dateValue = parseDateString(viewValue);
                ngModel.$setValidity(null, (dateValue && !isNaN(dateValue.getTime())));
                return dateValue;
              }
              else {
                ngModel.$setValidity(null, true);
                return null;
              }
            });
          }
        }
      };
    }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridEditDropdown
   *  @element div
   *  @restrict A
   *
   *  @description dropdown editor for editable fields.
   *  Provides EndEdit and CancelEdit events
   *
   *  Events that end editing:
   *     blur and enter keydown, and any left/right nav
   *
   *  Events that cancel editing:
   *    - Esc keydown
   *
   */
  module.directive('uiGridEditDropdown',
    ['uiGridConstants', 'uiGridEditConstants',
      function (uiGridConstants, uiGridEditConstants) {
        return {
          require: ['?^uiGrid', '?^uiGridRenderContainer'],
          scope: true,
          compile: function () {
            return {
              pre: function ($scope, $elm, $attrs) {

              },
              post: function ($scope, $elm, $attrs, controllers) {
                var uiGridCtrl = controllers[0];
                var renderContainerCtrl = controllers[1];

                //set focus at start of edit
                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                  $elm[0].focus();
                  $elm[0].style.width = ($elm[0].parentElement.offsetWidth - 1) + 'px';
                  $elm.on('blur', function (evt) {
                    $scope.stopEdit(evt);
                  });
                });


                $scope.stopEdit = function (evt) {
                  // no need to validate a dropdown - invalid values shouldn't be
                  // available in the list
                  $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                };

                $elm.on('keydown', function (evt) {
                  switch (evt.keyCode) {
                    case uiGridConstants.keymap.ESC:
                      evt.stopPropagation();
                      $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                      break;
                  }
                  if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                    if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                      $scope.stopEdit(evt);
                    }
                  }
                  else {
                    //handle enter and tab for editing not using cellNav
                    switch (evt.keyCode) {
                      case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                      case uiGridConstants.keymap.TAB:
                        evt.stopPropagation();
                        evt.preventDefault();
                        $scope.stopEdit(evt);
                        break;
                    }
                  }
                  return true;
                });
              }
            };
          }
        };
      }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.edit.directive:uiGridEditFileChooser
   *  @element div
   *  @restrict A
   *
   *  @description input editor directive for editable fields.
   *  Provides EndEdit and CancelEdit events
   *
   *  Events that end editing:
   *     blur and enter keydown
   *
   *  Events that cancel editing:
   *    - Esc keydown
   *
   */
  module.directive('uiGridEditFileChooser',
    ['gridUtil', 'uiGridConstants', 'uiGridEditConstants','$timeout',
      function (gridUtil, uiGridConstants, uiGridEditConstants, $timeout) {
        return {
          scope: true,
          require: ['?^uiGrid', '?^uiGridRenderContainer'],
          compile: function () {
            return {
              pre: function ($scope, $elm, $attrs) {

              },
              post: function ($scope, $elm, $attrs, controllers) {
                var uiGridCtrl, renderContainerCtrl;
                if (controllers[0]) { uiGridCtrl = controllers[0]; }
                if (controllers[1]) { renderContainerCtrl = controllers[1]; }
                var grid = uiGridCtrl.grid;

                var handleFileSelect = function( event ){
                  var target = event.srcElement || event.target;

                  if (target && target.files && target.files.length > 0) {
                    /**
                     *  @ngdoc property
                     *  @name editFileChooserCallback
                     *  @propertyOf  ui.grid.edit.api:ColumnDef
                     *  @description A function that should be called when any files have been chosen
                     *  by the user.  You should use this to process the files appropriately for your
                     *  application.
                     *
                     *  It passes the gridCol, the gridRow (from which you can get gridRow.entity),
                     *  and the files.  The files are in the format as returned from the file chooser,
                     *  an array of files, with each having useful information such as:
                     *  - `files[0].lastModifiedDate`
                     *  - `files[0].name`
                     *  - `files[0].size`  (appears to be in bytes)
                     *  - `files[0].type`  (MIME type by the looks)
                     *
                     *  Typically you would do something with these files - most commonly you would
                     *  use the filename or read the file itself in.  The example function does both.
                     *
                     *  @example
                     *  <pre>
                     *  editFileChooserCallBack: function(gridRow, gridCol, files ){
                     *    // ignore all but the first file, it can only choose one anyway
                     *    // set the filename into this column
                     *    gridRow.entity.filename = file[0].name;
                     *
                     *    // read the file and set it into a hidden column, which we may do stuff with later
                     *    var setFile = function(fileContent){
                     *      gridRow.entity.file = fileContent.currentTarget.result;
                     *    };
                     *    var reader = new FileReader();
                     *    reader.onload = setFile;
                     *    reader.readAsText( files[0] );
                     *  }
                     *  </pre>
                     */
                    if ( typeof($scope.col.colDef.editFileChooserCallback) === 'function' ) {
                      $scope.col.colDef.editFileChooserCallback($scope.row, $scope.col, target.files);
                    } else {
                      gridUtil.logError('You need to set colDef.editFileChooserCallback to use the file chooser');
                    }

                    target.form.reset();
                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                  } else {
                    $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                  }
                };

                $elm[0].addEventListener('change', handleFileSelect, false);  // TODO: why the false on the end?  Google

                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                  $elm[0].focus();
                  $elm[0].select();

                  $elm.on('blur', function (evt) {
                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                  });
                });
              }
            };
          }
        };
      }]);


})();

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
         *  @name
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
               * @description raised when cell editing is complete
               * <pre>
               *      gridApi.expandable.on.rowExpandedStateChanged(scope,function(row){})
               * </pre>
               * @param {GridRow} row the row that was expanded
               */
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
              }
            }
          }
        };
        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);
      },

      toggleRowExpansion: function (grid, row) {
        row.isExpanded = !row.isExpanded;
        if (row.isExpanded) {
          row.height = row.grid.options.rowHeight + grid.options.expandableRowHeight;
        }
        else {
          row.height = row.grid.options.rowHeight;
          grid.expandable.expandedAll = false;
        }
        grid.api.expandable.raise.rowExpandedStateChanged(row);
      },

      expandAllRows: function(grid, $scope) {
        grid.renderContainers.body.visibleRowCache.forEach( function(row) {
          if (!row.isExpanded) {
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
              if ( uiGridCtrl.grid.options.enableExpandableRowHeader !== false ) {
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
                uiGridCtrl.grid.addRowHeaderColumn(expandableRowHeaderColDef);
              }
              uiGridExpandableService.initializeGrid(uiGridCtrl.grid);
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
                    var expandableRowScope = $scope.grid.options.expandableRowScope;
                    for (var property in expandableRowScope) {
                      if (expandableRowScope.hasOwnProperty(property)) {
                        $scope[property] = expandableRowScope[property];
                      }
                    }
                  }
                  var expandedRowElement = $compile(template)($scope);
                  $elm.append(expandedRowElement);
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

/* global console */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.exporter
   * @description
   *
   * # ui.grid.exporter
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides the ability to exporter data from the grid.
   *
   * Data can be exported in a range of formats, and all data, visible
   * data, or selected rows can be exported, with all columns or visible
   * columns.
   *
   * No UI is provided, the caller should provide their own UI/buttons
   * as appropriate, or enable the gridMenu
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.exporter"></div>
   */

  var module = angular.module('ui.grid.exporter', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.exporter.constant:uiGridExporterConstants
   *
   *  @description constants available in exporter module
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name ALL
   * @description export all data, including data not visible.  Can
   * be set for either rowTypes or colTypes
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name VISIBLE
   * @description export only visible data, including data not visible.  Can
   * be set for either rowTypes or colTypes
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name SELECTED
   * @description export all data, including data not visible.  Can
   * be set only for rowTypes, selection of only some columns is
   * not supported
   */
  module.constant('uiGridExporterConstants', {
    featureName: 'exporter',
    ALL: 'all',
    VISIBLE: 'visible',
    SELECTED: 'selected',
    CSV_CONTENT: 'CSV_CONTENT',
    BUTTON_LABEL: 'BUTTON_LABEL',
    FILE_NAME: 'FILE_NAME'
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.exporter.service:uiGridExporterService
   *
   *  @description Services for exporter feature
   */
  module.service('uiGridExporterService', ['$q', 'uiGridExporterConstants', 'gridUtil', '$compile', '$interval', 'i18nService',
    function ($q, uiGridExporterConstants, gridUtil, $compile, $interval, i18nService) {

      var service = {

        delay: 100,

        initializeGrid: function (grid) {

          //add feature namespace and any properties to grid for needed state
          grid.exporter = {};
          this.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.exporter.api:PublicApi
           *
           *  @description Public Api for exporter feature
           */
          var publicApi = {
            events: {
              exporter: {
              }
            },
            methods: {
              exporter: {
                /**
                 * @ngdoc function
                 * @name csvExport
                 * @methodOf  ui.grid.exporter.api:PublicApi
                 * @description Exports rows from the grid in csv format,
                 * the data exported is selected based on the provided options
                 * @param {string} rowTypes which rows to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
                 * uiGridExporterConstants.SELECTED
                 * @param {string} colTypes which columns to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE
                 */
                csvExport: function (rowTypes, colTypes) {
                  service.csvExport(grid, rowTypes, colTypes);
                },
                /**
                 * @ngdoc function
                 * @name pdfExport
                 * @methodOf  ui.grid.exporter.api:PublicApi
                 * @description Exports rows from the grid in pdf format,
                 * the data exported is selected based on the provided options
                 * Note that this function has a dependency on pdfMake, all
                 * going well this has been installed for you.
                 * The resulting pdf opens in a new browser window.
                 * @param {string} rowTypes which rows to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
                 * uiGridExporterConstants.SELECTED
                 * @param {string} colTypes which columns to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE
                 */
                pdfExport: function (rowTypes, colTypes) {
                  service.pdfExport(grid, rowTypes, colTypes);
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);

          grid.api.registerMethodsFromObject(publicApi.methods);

          if (grid.api.core.addToGridMenu){
            service.addToMenu( grid );
          } else {
            // order of registration is not guaranteed, register in a little while
            $interval( function() {
              if (grid.api.core.addToGridMenu){
                service.addToMenu( grid );
              }
            }, this.delay, 1);
          }

        },

        defaultGridOptions: function (gridOptions) {
          //default option to true unless it was explicitly set to false
          /**
           * @ngdoc object
           * @name ui.grid.exporter.api:GridOptions
           *
           * @description GridOptions for exporter feature, these are available to be
           * set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */
          /**
           * @ngdoc object
           * @name ui.grid.exporter.api:ColumnDef
           * @description ColumnDef settings for exporter
           */
          /**
           * @ngdoc object
           * @name exporterSuppressMenu
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Don't show the export menu button, implying the user
           * will roll their own UI for calling the exporter
           * <br/>Defaults to false
           */
          gridOptions.exporterSuppressMenu = gridOptions.exporterSuppressMenu === true;
          /**
           * @ngdoc object
           * @name exporterMenuLabel
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The text to show on the exporter menu button
           * link
           * <br/>Defaults to 'Export'
           */
          gridOptions.exporterMenuLabel = gridOptions.exporterMenuLabel ? gridOptions.exporterMenuLabel : 'Export';
          /**
           * @ngdoc object
           * @name exporterSuppressColumns
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Columns that should not be exported.  The selectionRowHeader is already automatically
           * suppressed, but if you had a button column or some other "system" column that shouldn't be shown in the
           * output then add it in this list.  You should provide an array of column names.
           * <br/>Defaults to: []
           * <pre>
           *   gridOptions.exporterSuppressColumns = [ 'buttons' ];
           * </pre>
           */
          gridOptions.exporterSuppressColumns = gridOptions.exporterSuppressColumns ? gridOptions.exporterSuppressColumns : [];
          /**
           * @ngdoc object
           * @name exporterCsvColumnSeparator
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The character to use as column separator
           * link
           * <br/>Defaults to ','
           */
          gridOptions.exporterCsvColumnSeparator = gridOptions.exporterCsvColumnSeparator ? gridOptions.exporterCsvColumnSeparator : ',';
          /**
           * @ngdoc object
           * @name exporterCsvFilename
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default filename to use when saving the downloaded csv.
           * This will only work in some browsers.
           * <br/>Defaults to 'download.csv'
           */
          gridOptions.exporterCsvFilename = gridOptions.exporterCsvFilename ? gridOptions.exporterCsvFilename : 'download.csv';
          /**
           * @ngdoc object
           * @name exporterPdfFilename
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default filename to use when saving the downloaded pdf, only used in IE (other browsers open pdfs in a new window)
           * <br/>Defaults to 'download.pdf'
           */
          gridOptions.exporterPdfFilename = gridOptions.exporterPdfFilename ? gridOptions.exporterPdfFilename : 'download.pdf';
          /**
           * @ngdoc object
           * @name exporterOlderExcelCompatibility
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Some versions of excel don't like the utf-16 BOM on the front, and it comes
           * through as ï»¿ in the first column header.  Setting this option to false will suppress this, at the
           * expense of proper utf-16 handling in applications that do recognise the BOM
           * <br/>Defaults to false
           */
          gridOptions.exporterOlderExcelCompatibility = gridOptions.exporterOlderExcelCompatibility === true;
          /**
           * @ngdoc object
           * @name exporterPdfDefaultStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     fontSize: 11
           *   }
           * </pre>
           */
          gridOptions.exporterPdfDefaultStyle = gridOptions.exporterPdfDefaultStyle ? gridOptions.exporterPdfDefaultStyle : { fontSize: 11 };
          /**
           * @ngdoc object
           * @name exporterPdfTableStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The table style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     margin: [0, 5, 0, 15]
           *   }
           * </pre>
           */
          gridOptions.exporterPdfTableStyle = gridOptions.exporterPdfTableStyle ? gridOptions.exporterPdfTableStyle : { margin: [0, 5, 0, 15] };
          /**
           * @ngdoc object
           * @name exporterPdfTableHeaderStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The tableHeader style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     bold: true,
           *     fontSize: 12,
           *     color: 'black'
           *   }
           * </pre>
           */
          gridOptions.exporterPdfTableHeaderStyle = gridOptions.exporterPdfTableHeaderStyle ? gridOptions.exporterPdfTableHeaderStyle : { bold: true, fontSize: 12, color: 'black' };
          /**
           * @ngdoc object
           * @name exporterPdfHeader
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The header section for pdf exports.  Can be
           * simple text:
           * <pre>
           *   gridOptions.exporterPdfHeader = 'My Header';
           * </pre>
           * Can be a more complex object in pdfMake format:
           * <pre>
           *   gridOptions.exporterPdfHeader = {
           *     columns: [
           *       'Left part',
           *       { text: 'Right part', alignment: 'right' }
           *     ]
           *   };
           * </pre>
           * Or can be a function, allowing page numbers and the like
           * <pre>
           *   gridOptions.exporterPdfHeader: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; };
           * </pre>
           */
          gridOptions.exporterPdfHeader = gridOptions.exporterPdfHeader ? gridOptions.exporterPdfHeader : null;
          /**
           * @ngdoc object
           * @name exporterPdfFooter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The header section for pdf exports.  Can be
           * simple text:
           * <pre>
           *   gridOptions.exporterPdfFooter = 'My Footer';
           * </pre>
           * Can be a more complex object in pdfMake format:
           * <pre>
           *   gridOptions.exporterPdfFooter = {
           *     columns: [
           *       'Left part',
           *       { text: 'Right part', alignment: 'right' }
           *     ]
           *   };
           * </pre>
           * Or can be a function, allowing page numbers and the like
           * <pre>
           *   gridOptions.exporterPdfFooter: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; };
           * </pre>
           */
          gridOptions.exporterPdfFooter = gridOptions.exporterPdfFooter ? gridOptions.exporterPdfFooter : null;
          /**
           * @ngdoc object
           * @name exporterPdfOrientation
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The orientation, should be a valid pdfMake value,
           * 'landscape' or 'portrait'
           * <br/>Defaults to landscape
           */
          gridOptions.exporterPdfOrientation = gridOptions.exporterPdfOrientation ? gridOptions.exporterPdfOrientation : 'landscape';
          /**
           * @ngdoc object
           * @name exporterPdfPageSize
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The orientation, should be a valid pdfMake
           * paper size, usually 'A4' or 'LETTER'
           * {@link https://github.com/bpampuch/pdfmake/blob/master/src/standardPageSizes.js pdfMake page sizes}
           * <br/>Defaults to A4
           */
          gridOptions.exporterPdfPageSize = gridOptions.exporterPdfPageSize ? gridOptions.exporterPdfPageSize : 'A4';
          /**
           * @ngdoc object
           * @name exporterPdfMaxGridWidth
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The maxium grid width - the current grid width
           * will be scaled to match this, with any fixed width columns
           * being adjusted accordingly.
           * <br/>Defaults to 720 (for A4 landscape), use 670 for LETTER
           */
          gridOptions.exporterPdfMaxGridWidth = gridOptions.exporterPdfMaxGridWidth ? gridOptions.exporterPdfMaxGridWidth : 720;
          /**
           * @ngdoc object
           * @name exporterPdfTableLayout
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A tableLayout in pdfMake format,
           * controls gridlines and the like.  We use the default
           * layout usually.
           * <br/>Defaults to null, which means no layout
           */

          /**
           * @ngdoc object
           * @name exporterMenuAllData
           * @porpertyOf  ui.grid.exporter.api:GridOptions
           * @description Add export all data as cvs/pdf menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuAllData = gridOptions.exporterMenuAllData !== undefined ? gridOptions.exporterMenuAllData : true;

          /**
           * @ngdoc object
           * @name exporterMenuCsv
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Add csv export menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuCsv = gridOptions.exporterMenuCsv !== undefined ? gridOptions.exporterMenuCsv : true;

          /**
           * @ngdoc object
           * @name exporterMenuPdf
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Add pdf export menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuPdf = gridOptions.exporterMenuPdf !== undefined ? gridOptions.exporterMenuPdf : true;

          /**
           * @ngdoc object
           * @name exporterPdfCustomFormatter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A custom callback routine that changes the pdf document, adding any
           * custom styling or content that is supported by pdfMake.  Takes in the complete docDefinition, and
           * must return an updated docDefinition ready for pdfMake.
           * @example
           * In this example we add a style to the style array, so that we can use it in our
           * footer definition.
           * <pre>
           *   gridOptions.exporterPdfCustomFormatter = function ( docDefinition ) {
           *     docDefinition.styles.footerStyle = { bold: true, fontSize: 10 };
           *     return docDefinition;
           *   }
           *
           *   gridOptions.exporterPdfFooter = { text: 'My footer', style: 'footerStyle' }
           * </pre>
           */
          gridOptions.exporterPdfCustomFormatter = ( gridOptions.exporterPdfCustomFormatter && typeof( gridOptions.exporterPdfCustomFormatter ) === 'function' ) ? gridOptions.exporterPdfCustomFormatter : function ( docDef ) { return docDef; };

          /**
           * @ngdoc object
           * @name exporterHeaderFilterUseName
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Defaults to false, which leads to `displayName` being passed into the headerFilter.
           * If set to true, then will pass `name` instead.
           *
           *
           * @example
           * <pre>
           *   gridOptions.exporterHeaderFilterUseName = true;
           * </pre>
           */
          gridOptions.exporterHeaderFilterUseName = gridOptions.exporterHeaderFilterUseName === true;

          /**
           * @ngdoc object
           * @name exporterHeaderFilter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to apply to the header displayNames before exporting.  Useful for internationalisation,
           * for example if you were using angular-translate you'd set this to `$translate.instant`.  Note that this
           * call must be synchronous, it cannot be a call that returns a promise.
           *
           * Behaviour can be changed to pass in `name` instead of `displayName` through use of `exporterHeaderFilterUseName: true`.
           *
           * @example
           * <pre>
           *   gridOptions.exporterHeaderFilter = function( displayName ){ return 'col: ' + name; };
           * </pre>
           * OR
           * <pre>
           *   gridOptions.exporterHeaderFilter = $translate.instant;
           * </pre>
           */

          /**
           * @ngdoc function
           * @name exporterFieldCallback
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to call for each field before exporting it.  Allows
           * massaging of raw data into a display format, for example if you have applied
           * filters to convert codes into decodes, or you require
           * a specific date format in the exported content.
           *
           * The method is called once for each field exported, and provides the grid, the
           * gridCol and the GridRow for you to use as context in massaging the data.
           *
           * @param {Grid} grid provides the grid in case you have need of it
           * @param {GridRow} row the row from which the data comes
           * @param {GridCol} col the column from which the data comes
           * @param {object} value the value for your massaging
           * @returns {object} you must return the massaged value ready for exporting
           *
           * @example
           * <pre>
           *   gridOptions.exporterFieldCallback = function ( grid, row, col, value ){
           *     if ( col.name === 'status' ){
           *       value = decodeStatus( value );
           *     }
           *     return value;
           *   }
           * </pre>
           */
          gridOptions.exporterFieldCallback = gridOptions.exporterFieldCallback ? gridOptions.exporterFieldCallback : function( grid, row, col, value ) { return value; };

          /**
           * @ngdoc function
           * @name exporterAllDataFn
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description This promise is needed when exporting all rows,
           * and the data need to be provided by server side. Default is null.
           * @returns {Promise} a promise to load all data from server
           *
           * @example
           * <pre>
           *   gridOptions.exporterAllDataFn = function () {
           *     return $http.get('/data/100.json')
           *   }
           * </pre>
           */
          gridOptions.exporterAllDataFn = gridOptions.exporterAllDataFn ? gridOptions.exporterAllDataFn : null;

          /**
           * @ngdoc function
           * @name exporterAllDataPromise
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description DEPRECATED - exporterAllDataFn used to be
           * called this, but it wasn't a promise, it was a function that returned
           * a promise.  Deprecated, but supported for backward compatibility, use
           * exporterAllDataFn instead.
           * @returns {Promise} a promise to load all data from server
           *
           * @example
           * <pre>
           *   gridOptions.exporterAllDataFn = function () {
           *     return $http.get('/data/100.json')
           *   }
           * </pre>
           */
          if ( gridOptions.exporterAllDataFn == null && gridOptions.exporterAllDataPromise ) {
            gridOptions.exporterAllDataFn = gridOptions.exporterAllDataPromise;
          }
        },


        /**
         * @ngdoc function
         * @name addToMenu
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Adds export items to the grid menu,
         * allowing the user to select export options
         * @param {Grid} grid the grid from which data should be exported
         */
        addToMenu: function ( grid ) {
          grid.api.core.addToGridMenu( grid, [
            {
              title: i18nService.getSafeText('gridMenu.exporterAllAsCsv'),
              action: function ($event) {
                this.grid.api.exporter.csvExport( uiGridExporterConstants.ALL, uiGridExporterConstants.ALL );
              },
              shown: function() {
                return this.grid.options.exporterMenuCsv && this.grid.options.exporterMenuAllData;
              },
              order: 200
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterVisibleAsCsv'),
              action: function ($event) {
                this.grid.api.exporter.csvExport( uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return this.grid.options.exporterMenuCsv;
              },
              order: 201
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterSelectedAsCsv'),
              action: function ($event) {
                this.grid.api.exporter.csvExport( uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return this.grid.options.exporterMenuCsv &&
                       ( this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0 );
              },
              order: 202
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterAllAsPdf'),
              action: function ($event) {
                this.grid.api.exporter.pdfExport( uiGridExporterConstants.ALL, uiGridExporterConstants.ALL );
              },
              shown: function() {
                return this.grid.options.exporterMenuPdf && this.grid.options.exporterMenuAllData;
              },
              order: 203
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterVisibleAsPdf'),
              action: function ($event) {
                this.grid.api.exporter.pdfExport( uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return this.grid.options.exporterMenuPdf;
              },
              order: 204
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterSelectedAsPdf'),
              action: function ($event) {
                this.grid.api.exporter.pdfExport( uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return this.grid.options.exporterMenuPdf &&
                       ( this.grid.api.selection && this.grid.api.selection.getSelectedRows().length > 0 );
              },
              order: 205
            }
          ]);
        },


        /**
         * @ngdoc function
         * @name csvExport
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Exports rows from the grid in csv format,
         * the data exported is selected based on the provided options
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        csvExport: function (grid, rowTypes, colTypes) {
          var self = this;
          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function() {
            var exportColumnHeaders = self.getColumnHeaders(grid, colTypes);
            var exportData = self.getData(grid, rowTypes, colTypes);
            var csvContent = self.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator);

            self.downloadFile (grid.options.exporterCsvFilename, csvContent, grid.options.exporterOlderExcelCompatibility);
          });
        },

        /**
         * @ngdoc function
         * @name loadAllDataIfNeeded
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description When using server side pagination, use exporterAllDataFn to
         * load all data before continuing processing.
         * When using client side pagination, return a resolved promise so processing
         * continues immediately
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        loadAllDataIfNeeded: function (grid, rowTypes, colTypes) {
          if ( rowTypes === uiGridExporterConstants.ALL && grid.rows.length !== grid.options.totalItems && grid.options.exporterAllDataFn) {
            return grid.options.exporterAllDataFn()
              .then(function() {
                grid.modifyRows(grid.options.data);
              });
          } else {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
          }
        },

        /**
         * @ngdoc property
         * @propertyOf ui.grid.exporter.api:ColumnDef
         * @name exporterSuppressExport
         * @description Suppresses export for this column.  Used by selection and expandable.
         */

        /**
         * @ngdoc function
         * @name getColumnHeaders
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets the column headers from the grid to use
         * as a title row for the exported file, all headers have
         * headerCellFilters applied as appropriate.
         *
         * Column headers are an array of objects, each object has
         * name, displayName, width and align attributes.  Only name is
         * used for csv, all attributes are used for pdf.
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        getColumnHeaders: function (grid, colTypes) {
          var headers = [];
          var columns;

          if ( colTypes === uiGridExporterConstants.ALL ){
            columns = grid.columns;
          } else {
            columns = grid.renderContainers.body.visibleColumnCache.filter( function( column ){ return column.visible; } );
          }

          columns.forEach( function( gridCol, index ) {
            if ( gridCol.colDef.exporterSuppressExport !== true &&
                 grid.options.exporterSuppressColumns.indexOf( gridCol.name ) === -1 ){
              headers.push({
                name: gridCol.field,
                displayName: grid.options.exporterHeaderFilter ? ( grid.options.exporterHeaderFilterUseName ? grid.options.exporterHeaderFilter(gridCol.name) : grid.options.exporterHeaderFilter(gridCol.displayName) ) : gridCol.displayName,
                width: gridCol.drawnWidth ? gridCol.drawnWidth : gridCol.width,
                align: gridCol.colDef.type === 'number' ? 'right' : 'left'
              });
            }
          });

          return headers;
        },


        /**
         * @ngdoc property
         * @propertyOf ui.grid.exporter.api:ColumnDef
         * @name exporterPdfAlign
         * @description the alignment you'd like for this specific column when
         * exported into a pdf.  Can be 'left', 'right', 'center' or any other
         * valid pdfMake alignment option.
         */


        /**
         * @ngdoc object
         * @name ui.grid.exporter.api:GridRow
         * @description GridRow settings for exporter
         */
        /**
         * @ngdoc object
         * @name exporterEnableExporting
         * @propertyOf  ui.grid.exporter.api:GridRow
         * @description If set to false, then don't export this row, notwithstanding visible or
         * other settings
         * <br/>Defaults to true
         */

        /**
         * @ngdoc function
         * @name getData
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets data from the grid based on the provided options,
         * all cells have cellFilters applied as appropriate.  Any rows marked
         * `exporterEnableExporting: false` will not be exported
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        getData: function (grid, rowTypes, colTypes) {
          var data = [];
          var rows;
          var columns;

          switch ( rowTypes ) {
            case uiGridExporterConstants.ALL:
              rows = grid.rows;
              break;
            case uiGridExporterConstants.VISIBLE:
              rows = grid.getVisibleRows();
              break;
            case uiGridExporterConstants.SELECTED:
              if ( grid.api.selection ){
                rows = grid.api.selection.getSelectedGridRows();
              } else {
                gridUtil.logError('selection feature must be enabled to allow selected rows to be exported');
              }
              break;
          }

          if ( colTypes === uiGridExporterConstants.ALL ){
            columns = grid.columns;
          } else {
            columns = grid.renderContainers.body.visibleColumnCache.filter( function( column ){ return column.visible; } );
          }

          rows.forEach( function( row, index ) {

            if (row.exporterEnableExporting !== false) {
              var extractedRow = [];


              columns.forEach( function( gridCol, index ) {
              if ( (gridCol.visible || colTypes === uiGridExporterConstants.ALL ) &&
                   gridCol.colDef.exporterSuppressExport !== true &&
                   grid.options.exporterSuppressColumns.indexOf( gridCol.name ) === -1 ){
                  var extractedField = { value: grid.options.exporterFieldCallback( grid, row, gridCol, grid.getCellValue( row, gridCol ) ) };
                  if ( gridCol.colDef.exporterPdfAlign ) {
                    extractedField.alignment = gridCol.colDef.exporterPdfAlign;
                  }
                  extractedRow.push(extractedField);
                }
              });

              data.push(extractedRow);
            }
          });

          return data;
        },


        /**
         * @ngdoc function
         * @name formatAsCSV
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Formats the column headers and data as a CSV,
         * and sends that data to the user
         * @param {array} exportColumnHeaders an array of column headers,
         * where each header is an object with name, width and maybe alignment
         * @param {array} exportData an array of rows, where each row is
         * an array of column data
         * @returns {string} csv the formatted csv as a string
         */
        formatAsCsv: function (exportColumnHeaders, exportData, separator) {
          var self = this;

          var bareHeaders = exportColumnHeaders.map(function(header){return { value: header.displayName };});

          var csv = self.formatRowAsCsv(this, separator)(bareHeaders) + '\n';

          csv += exportData.map(this.formatRowAsCsv(this, separator)).join('\n');

          return csv;
        },

        /**
         * @ngdoc function
         * @name formatRowAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a csv field, including
         * quotes around the value
         * @param {exporterService} exporter pass in exporter
         * @param {array} row the row to be turned into a csv string
         * @returns {string} a csv-ified version of the row
         */
        formatRowAsCsv: function (exporter, separator) {
          return function (row) {
            return row.map(exporter.formatFieldAsCsv).join(separator);
          };
        },

        /**
         * @ngdoc function
         * @name formatFieldAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a csv field, including
         * quotes around the value
         * @param {field} field the field to be turned into a csv string,
         * may be of any type
         * @returns {string} a csv-ified version of the field
         */
        formatFieldAsCsv: function (field) {
          if (field.value == null) { // we want to catch anything null-ish, hence just == not ===
            return '';
          }
          if (typeof(field.value) === 'number') {
            return field.value;
          }
          if (typeof(field.value) === 'boolean') {
            return (field.value ? 'TRUE' : 'FALSE') ;
          }
          if (typeof(field.value) === 'string') {
            return '"' + field.value.replace(/"/g,'""') + '"';
          }

          return JSON.stringify(field.value);
        },


        /**
         * @ngdoc function
         * @name isIE
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Checks whether current browser is IE and returns it's version if it is
        */
        isIE: function () {
          var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
          return match ? parseInt(match[1]) : false;
        },


        /**
         * @ngdoc function
         * @name downloadFile
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Triggers download of a csv file.  Logic provided
         * by @cssensei (from his colleagues at https://github.com/ifeelgoods) in issue #2391
         * @param {string} fileName the filename we'd like our file to be
         * given
         * @param {string} csvContent the csv content that we'd like to
         * download as a file
         * @param {boolean} exporterOlderExcelCompatibility whether or not we put a utf-16 BOM on the from (\uFEFF)
         */
        downloadFile: function (fileName, csvContent, exporterOlderExcelCompatibility) {
          var D = document;
          var a = D.createElement('a');
          var strMimeType = 'application/octet-stream;charset=utf-8';
          var rawFile;
          var ieVersion;

          ieVersion = this.isIE();
          if (ieVersion && ieVersion < 10) {
            var frame = D.createElement('iframe');
            document.body.appendChild(frame);

            frame.contentWindow.document.open("text/html", "replace");
            frame.contentWindow.document.write('sep=,\r\n' + csvContent);
            frame.contentWindow.document.close();
            frame.contentWindow.focus();
            frame.contentWindow.document.execCommand('SaveAs', true, fileName);

            document.body.removeChild(frame);
            return true;
          }

          // IE10+
          if (navigator.msSaveBlob) {
            return navigator.msSaveBlob(
              new Blob(
                [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
                { type: strMimeType } ),
              fileName
            );
          }

          //html5 A[download]
          if ('download' in a) {
            var blob = new Blob(
              [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
              { type: strMimeType }
            );
            rawFile = URL.createObjectURL(blob);
            a.setAttribute('download', fileName);
          } else {
            rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent);
            a.setAttribute('target', '_blank');
          }

          a.href = rawFile;
          a.setAttribute('style', 'display:none;');
          D.body.appendChild(a);
          setTimeout(function() {
            if (a.click) {
              a.click();
              // Workaround for Safari 5
            } else if (document.createEvent) {
              var eventObj = document.createEvent('MouseEvents');
              eventObj.initEvent('click', true, true);
              a.dispatchEvent(eventObj);
            }
            D.body.removeChild(a);

          }, this.delay);
        },

        /**
         * @ngdoc function
         * @name pdfExport
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Exports rows from the grid in pdf format,
         * the data exported is selected based on the provided options.
         * Note that this function has a dependency on pdfMake, which must
         * be installed.  The resulting pdf opens in a new
         * browser window.
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        pdfExport: function (grid, rowTypes, colTypes) {
          var self = this;
          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function () {
            var exportColumnHeaders = self.getColumnHeaders(grid, colTypes);
            var exportData = self.getData(grid, rowTypes, colTypes);
            var docDefinition = self.prepareAsPdf(grid, exportColumnHeaders, exportData);

            if (self.isIE()) {
              self.downloadPDF(grid.options.exporterPdfFilename, docDefinition);
            } else {
              pdfMake.createPdf(docDefinition).open();
            }
          });
        },


        /**
         * @ngdoc function
         * @name downloadPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Generates and retrieves the pdf as a blob, then downloads
         * it as a file.  Only used in IE, in all other browsers we use the native
         * pdfMake.open function to just open the PDF
         * @param {string} fileName the filename to give to the pdf, can be set
         * through exporterPdfFilename
         * @param {object} docDefinition a pdf docDefinition that we can generate
         * and get a blob from
         */
        downloadPDF: function (fileName, docDefinition) {
          var D = document;
          var a = D.createElement('a');
          var strMimeType = 'application/octet-stream;charset=utf-8';
          var rawFile;
          var ieVersion;

          ieVersion = this.isIE();
          var doc = pdfMake.createPdf(docDefinition);
          var blob;

          doc.getBuffer( function (buffer) {
            blob = new Blob([buffer]);

            if (ieVersion && ieVersion < 10) {
              var frame = D.createElement('iframe');
              document.body.appendChild(frame);

              frame.contentWindow.document.open("text/html", "replace");
              frame.contentWindow.document.write(blob);
              frame.contentWindow.document.close();
              frame.contentWindow.focus();
              frame.contentWindow.document.execCommand('SaveAs', true, fileName);

              document.body.removeChild(frame);
              return true;
            }

            // IE10+
            if (navigator.msSaveBlob) {
              return navigator.msSaveBlob(
                blob, fileName
              );
            }
          });
        },


        /**
         * @ngdoc function
         * @name renderAsPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders the data into a pdf, and opens that pdf.
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {array} exportColumnHeaders an array of column headers,
         * where each header is an object with name, width and maybe alignment
         * @param {array} exportData an array of rows, where each row is
         * an array of column data
         * @returns {object} a pdfMake format document definition, ready
         * for generation
         */
        prepareAsPdf: function(grid, exportColumnHeaders, exportData) {
          var headerWidths = this.calculatePdfHeaderWidths( grid, exportColumnHeaders );

          var headerColumns = exportColumnHeaders.map( function( header ) {
            return { text: header.displayName, style: 'tableHeader' };
          });

          var stringData = exportData.map(this.formatRowAsPdf(this));

          var allData = [headerColumns].concat(stringData);

          var docDefinition = {
            pageOrientation: grid.options.exporterPdfOrientation,
            pageSize: grid.options.exporterPdfPageSize,
            content: [{
              style: 'tableStyle',
              table: {
                headerRows: 1,
                widths: headerWidths,
                body: allData
              }
            }],
            styles: {
              tableStyle: grid.options.exporterPdfTableStyle,
              tableHeader: grid.options.exporterPdfTableHeaderStyle
            },
            defaultStyle: grid.options.exporterPdfDefaultStyle
          };

          if ( grid.options.exporterPdfLayout ){
            docDefinition.layout = grid.options.exporterPdfLayout;
          }

          if ( grid.options.exporterPdfHeader ){
            docDefinition.header = grid.options.exporterPdfHeader;
          }

          if ( grid.options.exporterPdfFooter ){
            docDefinition.footer = grid.options.exporterPdfFooter;
          }

          if ( grid.options.exporterPdfCustomFormatter ){
            docDefinition = grid.options.exporterPdfCustomFormatter( docDefinition );
          }
          return docDefinition;

        },


        /**
         * @ngdoc function
         * @name calculatePdfHeaderWidths
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Determines the column widths base on the
         * widths we got from the grid.  If the column is drawn
         * then we have a drawnWidth.  If the column is not visible
         * then we have '*', 'x%' or a width.  When columns are
         * not visible they don't contribute to the overall gridWidth,
         * so we need to adjust to allow for extra columns
         *
         * Our basic heuristic is to take the current gridWidth, plus
         * numeric columns and call this the base gridwidth.
         *
         * To that we add 100 for any '*' column, and x% of the base gridWidth
         * for any column that is a %
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {array} exportHeaders array of header information
         * @returns {object} an array of header widths
         */
        calculatePdfHeaderWidths: function ( grid, exportHeaders ) {
          var baseGridWidth = 0;
          exportHeaders.forEach( function(value){
            if (typeof(value.width) === 'number'){
              baseGridWidth += value.width;
            }
          });

          var extraColumns = 0;
          exportHeaders.forEach( function(value){
            if (value.width === '*'){
              extraColumns += 100;
            }
            if (typeof(value.width) === 'string' && value.width.match(/(\d)*%/)) {
              var percent = parseInt(value.width.match(/(\d)*%/)[0]);

              value.width = baseGridWidth * percent / 100;
              extraColumns += value.width;
            }
          });

          var gridWidth = baseGridWidth + extraColumns;

          return exportHeaders.map(function( header ) {
            return header.width === '*' ? header.width : header.width * grid.options.exporterPdfMaxGridWidth / gridWidth;
          });

        },

        /**
         * @ngdoc function
         * @name formatRowAsPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a row in a format consumable by PDF,
         * mainly meaning casting everything to a string
         * @param {exporterService} exporter pass in exporter
         * @param {array} row the row to be turned into a csv string
         * @returns {string} a csv-ified version of the row
         */
        formatRowAsPdf: function ( exporter ) {
          return function( row ) {
            return row.map(exporter.formatFieldAsPdfString);
          };
        },


        /**
         * @ngdoc function
         * @name formatFieldAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a pdf-able field, which
         * is different from a csv field only in that strings don't have quotes
         * around them
         * @param {field} field the field to be turned into a pdf string,
         * may be of any type
         * @returns {string} a string-ified version of the field
         */
        formatFieldAsPdfString: function (field) {
          var returnVal;
          if (field.value == null) { // we want to catch anything null-ish, hence just == not ===
            returnVal = '';
          } else if (typeof(field.value) === 'number') {
            returnVal = field.value.toString();
          } else if (typeof(field.value) === 'boolean') {
            returnVal = (field.value ? 'TRUE' : 'FALSE') ;
          } else if (typeof(field.value) === 'string') {
            returnVal = field.value.replace(/"/g,'""');
          } else {
            returnVal = JSON.stringify(field.value).replace(/^"/,'').replace(/"$/,'');
          }

          if (field.alignment && typeof(field.alignment) === 'string' ){
            returnVal = { text: returnVal, alignment: field.alignment };
          }

          return returnVal;
        }
      };

      return service;

    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.exporter.directive:uiGridExporter
   *  @element div
   *  @restrict A
   *
   *  @description Adds exporter features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.exporter']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.gridOptions = {
        enableGridMenu: true,
        exporterMenuCsv: false,
        columnDefs: [
          {name: 'name', enableCellEdit: true},
          {name: 'title', enableCellEdit: true}
        ],
        data: $scope.data
      };
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="gridOptions" ui-grid-exporter></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridExporter', ['uiGridExporterConstants', 'uiGridExporterService', 'gridUtil', '$compile',
    function (uiGridExporterConstants, uiGridExporterService, gridUtil, $compile) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          uiGridExporterService.initializeGrid(uiGridCtrl.grid);
          uiGridCtrl.grid.exporter.$scope = $scope;
        }
      };
    }
  ]);
})();

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

        //add feature namespace and any properties to grid for needed
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
               *      gridApi.grouping.on.aggregationChanged(scope,function(col){})
               * </pre>
               * @param {gridCol} col the column which on which aggregation changed. The aggregation
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
               *      gridApi.grouping.on.groupingChanged(scope,function(col){})
               * </pre>
               * @param {gridCol} col the column which on which grouping changed. The new grouping is
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

                grouping.aggregations = grouping.aggregations.filter( function( aggregation ){
                  return !aggregation.aggregation.source || aggregation.aggregation.source !== 'grouping';
                });

                if ( getExpanded ){
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
              groupColumn: function( columnName ) {
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
              ungroupColumn: function( columnName ) {
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
               * @param {string} or {function} aggregationDef one of the recognised types
               * from uiGridGroupingConstants or a custom aggregation function.
               * @param {string} aggregationLabel (optional) The label to use for this aggregation.
               */
              aggregateColumn: function( columnName, aggregationDef, aggregationLabel){
                var column = grid.getColumn(columnName);
                service.aggregateColumn( grid, column, aggregationDef, aggregationLabel);
              }

            }
          }
        };

        grid.api.registerEventsFromObject(publicApi.events);

        grid.api.registerMethodsFromObject(publicApi.methods);

        grid.api.core.on.sortChanged( $scope, service.tidyPriorities);

      },

      defaultGridOptions: function (gridOptions) {
        //default option to true unless it was explicitly set to false
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
         *  <br/>Defaults to true except on columns of type 'date'
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
       * @param {GridCol} col the column we're to update
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
        if (colDef.enableGrouping === false){
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
          if ( typeof(col.grouping.groupPriority) !== 'undefined' && col.grouping.groupPriority > -1 ){
            col.treeAggregationFn = uiGridTreeBaseService.nativeAggregations()[uiGridGroupingConstants.aggregation.COUNT].aggregationFn;
            col.treeAggregationFinalizerFn = service.groupedFinalizerFn;
          }
        } else if (typeof(col.grouping) === 'undefined'){
          col.grouping = {};
        }

        if (typeof(col.grouping) !== 'undefined' && typeof(col.grouping.groupPriority) !== 'undefined' && col.grouping.groupPriority >= 0){
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
        var addAggregationMenu = function(type, title){
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
        if ( col.colDef.groupingShowGroupingMenu !== false ){
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
        if ( col.colDef.groupingShowAggregationMenu !== false ){
          angular.forEach(uiGridTreeBaseService.nativeAggregations(), function(aggregationDef, name){
            addAggregationMenu(name);
          });
          angular.forEach(gridOptions.treeCustomAggregations, function(aggregationDef, name){
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
        var grid = this;

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
       * @param {aggregation} the aggregation entity for a grouped column
       */
      groupedFinalizerFn: function( aggregation ){
        var col = this;

        if ( typeof(aggregation.groupVal) !== 'undefined') {
          aggregation.rendered = aggregation.groupVal;
          if ( col.grid.options.groupingShowCounts && col.colDef.type !== 'date' ){
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
       * @param {array} rows the grid rows
       * @returns {array} updated columns
       */
      moveGroupColumns: function( grid, columns, rows ){
        if ( grid.options.moveGroupColumns === false){
          return;
        }

        columns.forEach( function(column, index){
          // position used to make stable sort in moveGroupColumns
          column.groupingPosition = index;
        });

        columns.sort(function(a, b){
          var a_group, b_group;
          if (a.isRowHeader){
            a_group = -1000;
          }
          else if ( typeof(a.grouping) === 'undefined' || typeof(a.grouping.groupPriority) === 'undefined' || a.grouping.groupPriority < 0){
            a_group = null;
          } else {
            a_group = a.grouping.groupPriority;
          }

          if (b.isRowHeader){
            b_group = -1000;
          }
          else if ( typeof(b.grouping) === 'undefined' || typeof(b.grouping.groupPriority) === 'undefined' || b.grouping.groupPriority < 0){
            b_group = null;
          } else {
            b_group = b.grouping.groupPriority;
          }

          // groups get sorted to the top
          if ( a_group !== null && b_group === null) { return -1; }
          if ( b_group !== null && a_group === null) { return 1; }
          if ( a_group !== null && b_group !== null) {return a_group - b_group; }

          return a.groupingPosition - b.groupingPosition;
        });

        columns.forEach( function(column, index) {
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
       * @param {GridCol} column the column we want to group
       */
      groupColumn: function( grid, column){
        if ( typeof(column.grouping) === 'undefined' ){
          column.grouping = {};
        }

        // set the group priority to the next number in the hierarchy
        var existingGrouping = service.getGrouping( grid );
        column.grouping.groupPriority = existingGrouping.grouping.length;

        // add sort if not present
        if ( !column.sort ){
          column.sort = { direction: uiGridConstants.ASC };
        } else if ( typeof(column.sort.direction) === 'undefined' || column.sort.direction === null ){
          column.sort.direction = uiGridConstants.ASC;
        }

        service.tidyPriorities( grid );

        column.treeAggregation = { type: uiGridGroupingConstants.aggregation.COUNT, source: 'grouping' };
        column.treeAggregationFn = uiGridTreeBaseService.nativeAggregations()[uiGridGroupingConstants.aggregation.COUNT].aggregationFn;
        column.treeAggregationFinalizerFn = service.groupedFinalizerFn;

        grid.api.grouping.raise.groupingChanged(column);

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
       * @param {GridCol} column the column we want to ungroup
       */
      ungroupColumn: function( grid, column){
        if ( typeof(column.grouping) === 'undefined' ){
          return;
        }

        delete column.grouping.groupPriority;
        delete column.treeAggregation;
        delete column.customTreeAggregationFinalizer;

        service.tidyPriorities( grid );

        grid.api.grouping.raise.groupingChanged(column);

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
       * @param {GridCol} column the column we want to aggregate
       * @param {string} one of the recognised types from uiGridGroupingConstants or one of the custom aggregations from gridOptions
       */
      aggregateColumn: function( grid, column, aggregationType){

        if (typeof(column.grouping) !== 'undefined' && typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0){
          service.ungroupColumn( grid, column );
        }

        var aggregationDef = {};
        if ( typeof(grid.options.treeCustomAggregations[aggregationType]) !== 'undefined' ){
          aggregationDef = grid.options.treeCustomAggregations[aggregationType];
        } else if ( typeof(uiGridTreeBaseService.nativeAggregations()[aggregationType]) !== 'undefined' ){
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
      setGrouping: function ( grid, config ){
        if ( typeof(config) === 'undefined' ){
          return;
        }

        // first remove any existing grouping
        service.clearGrouping(grid);

        if ( config.grouping && config.grouping.length && config.grouping.length > 0 ){
          config.grouping.forEach( function( group ) {
            var col = grid.getColumn(group.colName);

            if ( col ) {
              service.groupColumn( grid, col );
            }
          });
        }

        if ( config.aggregations && config.aggregations.length ){
          config.aggregations.forEach( function( aggregation ) {
            var col = grid.getColumn(aggregation.colName);

            if ( col ) {
              service.aggregateColumn( grid, col, aggregation.aggregation.type );
            }
          });
        }

        if ( config.rowExpandedStates ){
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

        if ( currentGrouping.grouping.length > 0 ){
          currentGrouping.grouping.forEach( function( group ) {
            if (!group.col){
              // should have a group.colName if there's no col
              group.col = grid.getColumn(group.colName);
            }
            service.ungroupColumn(grid, group.col);
          });
        }

        if ( currentGrouping.aggregations.length > 0 ){
          currentGrouping.aggregations.forEach( function( aggregation ){
            if (!aggregation.col){
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
      tidyPriorities: function( grid ){
        // if we're called from sortChanged, grid is in this, not passed as param, the param can be a column or undefined
        if ( ( typeof(grid) === 'undefined' || typeof(grid.grid) !== 'undefined' ) && typeof(this.grid) !== 'undefined' ) {
          grid = this.grid;
        }

        var groupArray = [];
        var sortArray = [];

        grid.columns.forEach( function(column, index){
          if ( typeof(column.grouping) !== 'undefined' && typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0){
            groupArray.push(column);
          } else if ( typeof(column.sort) !== 'undefined' && typeof(column.sort.priority) !== 'undefined' && column.sort.priority >= 0){
            sortArray.push(column);
          }
        });

        groupArray.sort(function(a, b){ return a.grouping.groupPriority - b.grouping.groupPriority; });
        groupArray.forEach( function(column, index){
          column.grouping.groupPriority = index;
          column.suppressRemoveSort = true;
          if ( typeof(column.sort) === 'undefined'){
            column.sort = {};
          }
          column.sort.priority = index;
        });

        var i = groupArray.length;
        sortArray.sort(function(a, b){ return a.sort.priority - b.sort.priority; });
        sortArray.forEach( function(column, index){
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
        if (renderableRows.length === 0){
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
          if ( !groupFieldState.initialised || rowSorter.getSortFn(grid, groupFieldState.col, renderableRows)(fieldValue, groupFieldState.currentValue) !== 0 ){
            service.insertGroupHeader( grid, renderableRows, i, processingState, stateIndex );
            i++;
          }
        };

        // use a for loop because it's tolerant of the array length changing whilst we go - we can
        // manipulate the iterator when we insert groupHeader rows
        for (var i = 0; i < renderableRows.length; i++ ){
          var row = renderableRows[i];

          if ( row.visible ){
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
      initialiseProcessingState: function( grid ){
        var processingState = [];
        var columnSettings = service.getGrouping( grid );

        columnSettings.grouping.forEach( function( groupItem, index){
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
      getGrouping: function( grid ){
        var groupArray = [];
        var aggregateArray = [];

        // get all the grouping
        grid.columns.forEach( function(column, columnIndex){
          if ( column.grouping ){
            if ( typeof(column.grouping.groupPriority) !== 'undefined' && column.grouping.groupPriority >= 0){
              groupArray.push({ field: column.field, col: column, groupPriority: column.grouping.groupPriority, grouping: column.grouping });
            }
          }
          if ( column.treeAggregation && column.treeAggregation.type ){
            aggregateArray.push({ field: column.field, col: column, aggregation: column.treeAggregation });
          }
        });

        // sort grouping into priority order
        groupArray.sort( function(a, b){
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
        var fieldName = processingState[stateIndex].fieldName;
        var col = processingState[stateIndex].col;

        var newValue = grid.getCellValue(renderableRows[rowIndex], col);
        var newDisplayValue = newValue;
        if ( typeof(newValue) === 'undefined' || newValue === null ) {
          newDisplayValue = grid.options.groupingNullLabel;
        }

        var cacheItem = grid.grouping.oldGroupingHeaderCache;
        for ( var i = 0; i < stateIndex; i++ ){
          if ( cacheItem && cacheItem[processingState[i].currentValue] ){
            cacheItem = cacheItem[processingState[i].currentValue].children;
          }
        }

        var headerRow;
        if ( cacheItem && cacheItem[newValue]){
          headerRow = cacheItem[newValue].row;
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
        for ( i = 0; i < stateIndex; i++ ){
          cacheItem = cacheItem[processingState[i].currentValue].children;
        }
        cacheItem[newValue] = { row: headerRow, children: {} };
      },


      /**
       * @ngdoc function
       * @name finaliseProcessingState
       * @methodOf  ui.grid.grouping.service:uiGridGroupingService
       * @description Set all processing states lower than the one that had a break in value to
       * no longer be initialised.  Render the counts into the entity ready for display.
       *
       * @param {Grid} grid grid object
       * @param {array} processingState the current processing state
       * @param {number} stateIndex the processing state item that we were on when we triggered a new group header, all
       * processing states after this need to be finalised
       */
      finaliseProcessingState: function( processingState, stateIndex ){
        for ( var i = stateIndex; i < processingState.length; i++){
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
       * @param {Grid} grid grid object
       * @returns {hash} the expanded states as a hash
       */
      getRowExpandedStates: function(treeChildren){
        if ( typeof(treeChildren) === 'undefined' ){
          return {};
        }

        var newChildren = {};

        angular.forEach( treeChildren, function( value, key ){
          newChildren[key] = { state: value.row.treeNode.state };
          if ( value.children ){
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
       * @returns {hash} expandedStates can be the full expanded states, or children
       * of that expanded states (which hopefully matches the subset of the groupHeaderCache)
       */
      applyRowExpandedStates: function( currentNode, expandedStates ){
        if ( typeof(expandedStates) === 'undefined' ){
          return;
        }

        angular.forEach(expandedStates, function( value, key ) {
          if ( currentNode[key] ){
            currentNode[key].row.treeNode.state = value.state;

            if (value.children && currentNode[key].children){
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
  module.directive('uiGridGrouping', ['uiGridGroupingConstants', 'uiGridGroupingService', '$templateCache',
  function (uiGridGroupingConstants, uiGridGroupingService, $templateCache) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            if (uiGridCtrl.grid.options.enableGrouping !== false){
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

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.importer
   * @description
   *
   * # ui.grid.importer
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides the ability to import data into the grid. It
   * uses the column defs to work out which data belongs in which column,
   * and creates entities from a configured class (typically a $resource).
   *
   * If the rowEdit feature is enabled, it also calls save on those newly
   * created objects, and then displays any errors in the imported data.
   *
   * Currently the importer imports only CSV and json files, although provision has been
   * made to process other file formats, and these can be added over time.
   *
   * For json files, the properties within each object in the json must match the column names
   * (to put it another way, the importer doesn't process the json, it just copies the objects
   * within the json into a new instance of the specified object type)
   *
   * For CSV import, the default column identification relies on each column in the
   * header row matching a column.name or column.displayName. Optionally, a column identification
   * callback can be used.  This allows matching using other attributes, which is particularly
   * useful if your application has internationalised column headings (i.e. the headings that
   * the user sees don't match the column names).
   *
   * The importer makes use of the grid menu as the UI for requesting an
   * import.
   *
   * <div ui-grid-importer></div>
   */

  var module = angular.module('ui.grid.importer', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.importer.constant:uiGridImporterConstants
   *
   *  @description constants available in importer module
   */

  module.constant('uiGridImporterConstants', {
    featureName: 'importer'
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.importer.service:uiGridImporterService
   *
   *  @description Services for importer feature
   */
  module.service('uiGridImporterService', ['$q', 'uiGridConstants', 'uiGridImporterConstants', 'gridUtil', '$compile', '$interval', 'i18nService', '$window',
    function ($q, uiGridConstants, uiGridImporterConstants, gridUtil, $compile, $interval, i18nService, $window) {

      var service = {

        initializeGrid: function ($scope, grid) {

          //add feature namespace and any properties to grid for needed state
          grid.importer = {
            $scope: $scope
          };

          this.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.importer.api:PublicApi
           *
           *  @description Public Api for importer feature
           */
          var publicApi = {
            events: {
              importer: {
              }
            },
            methods: {
              importer: {
                /**
                 * @ngdoc function
                 * @name importFile
                 * @methodOf  ui.grid.importer.api:PublicApi
                 * @description Imports a file into the grid using the file object
                 * provided.  Bypasses the grid menu
                 * @param {File} fileObject the file we want to import, as a javascript
                 * File object
                 */
                importFile: function ( fileObject ) {
                  service.importThisFile( grid, fileObject );
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);

          grid.api.registerMethodsFromObject(publicApi.methods);

          if ( grid.options.enableImporter && grid.options.importerShowMenu ){
            if ( grid.api.core.addToGridMenu ){
              service.addToMenu( grid );
            } else {
              // order of registration is not guaranteed, register in a little while
              $interval( function() {
                if (grid.api.core.addToGridMenu){
                  service.addToMenu( grid );
                }
              }, 100, 1);
            }
          }
        },


        defaultGridOptions: function (gridOptions) {
          //default option to true unless it was explicitly set to false
          /**
           * @ngdoc object
           * @name ui.grid.importer.api:GridOptions
           *
           * @description GridOptions for importer feature, these are available to be
           * set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */

          /**
           * @ngdoc property
           * @propertyOf ui.grid.importer.api:GridOptions
           * @name enableImporter
           * @description Whether or not importer is enabled.  Automatically set
           * to false if the user's browser does not support the required fileApi.
           * Otherwise defaults to true.
           *
           */
          if (gridOptions.enableImporter  || gridOptions.enableImporter === undefined) {
            if ( !($window.hasOwnProperty('File') && $window.hasOwnProperty('FileReader') && $window.hasOwnProperty('FileList') && $window.hasOwnProperty('Blob')) ) {
              gridUtil.logError('The File APIs are not fully supported in this browser, grid importer cannot be used.');
              gridOptions.enableImporter = false;
            } else {
              gridOptions.enableImporter = true;
            }
          } else {
            gridOptions.enableImporter = false;
          }

          /**
           * @ngdoc method
           * @name importerProcessHeaders
           * @methodOf ui.grid.importer.api:GridOptions
           * @description A callback function that will process headers using custom
           * logic.  Set this callback function if the headers that your user will provide in their
           * import file don't necessarily match the grid header or field names.  This might commonly
           * occur where your application is internationalised, and therefore the field names
           * that the user recognises are in a different language than the field names that
           * ui-grid knows about.
           *
           * Defaults to the internal `processHeaders` method, which seeks to match using both
           * displayName and column.name.  Any non-matching columns are discarded.
           *
           * Your callback routine should respond by processing the header array, and returning an array
           * of matching column names.  A null value in any given position means "don't import this column"
           *
           * <pre>
           *      gridOptions.importerProcessHeaders: function( headerArray ) {
           *        var myHeaderColumns = [];
           *        var thisCol;
           *        headerArray.forEach( function( value, index ) {
           *          thisCol = mySpecialLookupFunction( value );
           *          myHeaderColumns.push( thisCol.name );
           *        });
           *
           *        return myHeaderCols;
           *      })
           * </pre>
           * @param {Grid} grid the grid we're importing into
           * @param {array} headerArray an array of the text from the first row of the csv file,
           * which you need to match to column.names
           * @returns {array} array of matching column names, in the same order as the headerArray
           *
           */
          gridOptions.importerProcessHeaders = gridOptions.importerProcessHeaders || service.processHeaders;

          /**
           * @ngdoc method
           * @name importerHeaderFilter
           * @methodOf ui.grid.importer.api:GridOptions
           * @description A callback function that will filter (usually translate) a single
           * header.  Used when you want to match the passed in column names to the column
           * displayName after the header filter.
           *
           * Your callback routine needs to return the filtered header value.
           * <pre>
           *      gridOptions.importerHeaderFilter: function( displayName ) {
           *        return $translate.instant( displayName );
           *      })
           * </pre>
           *
           * or:
           * <pre>
           *      gridOptions.importerHeaderFilter: $translate.instant
           * </pre>
           * @param {string} displayName the displayName that we'd like to translate
           * @returns {string} the translated name
           *
           */
          gridOptions.importerHeaderFilter = gridOptions.importerHeaderFilter || function( displayName ) { return displayName; };

          /**
           * @ngdoc method
           * @name importerErrorCallback
           * @methodOf ui.grid.importer.api:GridOptions
           * @description A callback function that provides custom error handling, rather
           * than the standard grid behaviour of an alert box and a console message.  You
           * might use this to internationalise the console log messages, or to write to a
           * custom logging routine that returned errors to the server.
           *
           * <pre>
           *      gridOptions.importerErrorCallback: function( grid, errorKey, consoleMessage, context ) {
           *        myUserDisplayRoutine( errorKey );
           *        myLoggingRoutine( consoleMessage, context );
           *      })
           * </pre>
           * @param {Grid} grid the grid we're importing into, may be useful if you're positioning messages
           * in some way
           * @param {string} errorKey one of the i18n keys the importer can return - importer.noHeaders,
           * importer.noObjects, importer.invalidCsv, importer.invalidJson, importer.jsonNotArray
           * @param {string} consoleMessage the English console message that importer would have written
           * @param {object} context the context data that importer would have appended to that console message,
           * often the file content itself or the element that is in error
           *
           */
          if ( !gridOptions.importerErrorCallback ||  typeof(gridOptions.importerErrorCallback) !== 'function' ){
            delete gridOptions.importerErrorCallback;
          }

          /**
           * @ngdoc method
           * @name importerDataAddCallback
           * @methodOf ui.grid.importer.api:GridOptions
           * @description A mandatory callback function that adds data to the source data array.  The grid
           * generally doesn't add rows to the source data array, it is tidier to handle this through a user
           * callback.
           *
           * <pre>
           *      gridOptions.importerDataAddCallback: function( grid, newObjects ) {
           *        $scope.myData = $scope.myData.concat( newObjects );
           *      })
           * </pre>
           * @param {Grid} grid the grid we're importing into, may be useful in some way
           * @param {array} newObjects an array of new objects that you should add to your data
           *
           */
          if ( gridOptions.enableImporter === true && !gridOptions.importerDataAddCallback ) {
            gridUtil.logError("You have not set an importerDataAddCallback, importer is disabled");
            gridOptions.enableImporter = false;
          }

          /**
           * @ngdoc object
           * @name importerNewObject
           * @propertyOf  ui.grid.importer.api:GridOptions
           * @description An object on which we call `new` to create each new row before inserting it into
           * the data array.  Typically this would be a $resource entity, which means that if you're using
           * the rowEdit feature, you can directly call save on this entity when the save event is triggered.
           *
           * Defaults to a vanilla javascript object
           *
           * @example
           * <pre>
           *   gridOptions.importerNewObject = MyRes;
           * </pre>
           *
           */

          /**
           * @ngdoc property
           * @propertyOf ui.grid.importer.api:GridOptions
           * @name importerShowMenu
           * @description Whether or not to show an item in the grid menu.  Defaults to true.
           *
           */
          gridOptions.importerShowMenu = gridOptions.importerShowMenu !== false;

          /**
           * @ngdoc method
           * @methodOf ui.grid.importer.api:GridOptions
           * @name importerObjectCallback
           * @description A callback that massages the data for each object.  For example,
           * you might have data stored as a code value, but display the decode.  This callback
           * can be used to change the decoded value back into a code.  Defaults to doing nothing.
           * @param {Grid} grid in case you need it
           * @param {object} newObject the new object as importer has created it, modify it
           * then return the modified version
           * @returns {object} the modified object
           * @example
           * <pre>
           *   gridOptions.importerObjectCallback = function ( grid, newObject ) {
           *     switch newObject.status {
           *       case 'Active':
           *         newObject.status = 1;
           *         break;
           *       case 'Inactive':
           *         newObject.status = 2;
           *         break;
           *     }
           *     return newObject;
           *   };
           * </pre>
           */
          gridOptions.importerObjectCallback = gridOptions.importerObjectCallback || function( grid, newObject ) { return newObject; };
        },


        /**
         * @ngdoc function
         * @name addToMenu
         * @methodOf  ui.grid.importer.service:uiGridImporterService
         * @description Adds import menu item to the grid menu,
         * allowing the user to request import of a file
         * @param {Grid} grid the grid into which data should be imported
         */
        addToMenu: function ( grid ) {
          grid.api.core.addToGridMenu( grid, [
            {
              title: i18nService.getSafeText('gridMenu.importerTitle'),
              order: 150
            },
            {
              templateUrl: 'ui-grid/importerMenuItemContainer',
              action: function ($event) {
                this.grid.api.importer.importAFile( grid );
              },
              order: 151
            }
          ]);
        },


        /**
         * @ngdoc function
         * @name importThisFile
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Imports the provided file into the grid using the file object
         * provided.  Bypasses the grid menu
         * @param {Grid} grid the grid we're importing into
         * @param {File} fileObject the file we want to import, as returned from the File
         * javascript object
         */
        importThisFile: function ( grid, fileObject ) {
          if (!fileObject){
            gridUtil.logError( 'No file object provided to importThisFile, should be impossible, aborting');
            return;
          }

          var reader = new FileReader();

          switch ( fileObject.type ){
            case 'application/json':
              reader.onload = service.importJsonClosure( grid );
              break;
            default:
              reader.onload = service.importCsvClosure( grid );
              break;
          }

          reader.readAsText( fileObject );
        },


        /**
         * @ngdoc function
         * @name importJson
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Creates a function that imports a json file into the grid.
         * The json data is imported into new objects of type `gridOptions.importerNewObject`,
         * and if the rowEdit feature is enabled the rows are marked as dirty
         * @param {Grid} grid the grid we want to import into
         * @param {FileObject} importFile the file that we want to import, as
         * a FileObject
         */
        importJsonClosure: function( grid ) {
          return function( importFile ){
            var newObjects = [];
            var newObject;

            var importArray = service.parseJson( grid, importFile );
            if (importArray === null){
              return;
            }
            importArray.forEach(  function( value, index ) {
              newObject = service.newObject( grid );
              angular.extend( newObject, value );
              newObject = grid.options.importerObjectCallback( grid, newObject );
              newObjects.push( newObject );
            });

            service.addObjects( grid, newObjects );

          };
        },


        /**
         * @ngdoc function
         * @name parseJson
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Parses a json file, returns the parsed data.
         * Displays an error if file doesn't parse
         * @param {Grid} grid the grid that we want to import into
         * @param {FileObject} importFile the file that we want to import, as
         * a FileObject
         * @returns {array} array of objects from the imported json
         */
        parseJson: function( grid, importFile ){
          var loadedObjects;
          try {
            loadedObjects = JSON.parse( importFile.target.result );
          } catch (e) {
            service.alertError( grid, 'importer.invalidJson', 'File could not be processed, is it valid json? Content was: ', importFile.target.result );
            return;
          }

          if ( !Array.isArray( loadedObjects ) ){
            service.alertError( grid, 'importer.jsonNotarray', 'Import failed, file is not an array, file was: ', importFile.target.result );
            return [];
          } else {
            return loadedObjects;
          }
        },



        /**
         * @ngdoc function
         * @name importCsvClosure
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Creates a function that imports a csv file into the grid
         * (allowing it to be used in the reader.onload event)
         * @param {Grid} grid the grid that we want to import into
         * @param {FileObject} importFile the file that we want to import, as
         * a file object
         */
        importCsvClosure: function( grid ) {
          return function( importFile ){
            var importArray = service.parseCsv( importFile );
            if ( !importArray || importArray.length < 1 ){
              service.alertError( grid, 'importer.invalidCsv', 'File could not be processed, is it valid csv? Content was: ', importFile.target.result );
              return;
            }

            var newObjects = service.createCsvObjects( grid, importArray );
            if ( !newObjects || newObjects.length === 0 ){
              service.alertError( grid, 'importer.noObjects', 'Objects were not able to be derived, content was: ', importFile.target.result );
              return;
            }

            service.addObjects( grid, newObjects );
          };
        },


        /**
         * @ngdoc function
         * @name parseCsv
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Parses a csv file into an array of arrays, with the first
         * array being the headers, and the remaining arrays being the data.
         * The logic for this comes from https://github.com/thetalecrafter/excel.js/blob/master/src/csv.js,
         * which is noted as being under the MIT license.  The code is modified to pass the jscs yoda condition
         * checker
         * @param {FileObject} importFile the file that we want to import, as a
         * file object
         */
        parseCsv: function( importFile ) {
          var csv = importFile.target.result;

          // use the CSV-JS library to parse
          return CSV.parse(csv);
        },


        /**
         * @ngdoc function
         * @name createCsvObjects
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Converts an array of arrays (representing the csv file)
         * into a set of objects.  Uses the provided `gridOptions.importerNewObject`
         * to create the objects, and maps the header row into the individual columns
         * using either `gridOptions.importerProcessHeaders`, or by using a native method
         * of matching to either the displayName, column name or column field of
         * the columns in the column defs.  The resulting objects will have attributes
         * that are named based on the column.field or column.name, in that order.
         * @param {Grid} grid the grid that we want to import into
         * @param {Array} importArray the data that we want to import, as an array
         */
        createCsvObjects: function( grid, importArray ){
          // pull off header row and turn into headers
          var headerMapping = grid.options.importerProcessHeaders( grid, importArray.shift() );
          if ( !headerMapping || headerMapping.length === 0 ){
            service.alertError( grid, 'importer.noHeaders', 'Column names could not be derived, content was: ', importArray );
            return [];
          }

          var newObjects = [];
          var newObject;
          importArray.forEach( function( row, index ) {
            newObject = service.newObject( grid );
            if ( row !== null ){
              row.forEach( function( field, index ){
                if ( headerMapping[index] !== null ){
                  newObject[ headerMapping[index] ] = field;
                }
              });
            }
            newObject = grid.options.importerObjectCallback( grid, newObject );
            newObjects.push( newObject );
          });

          return newObjects;
        },


        /**
         * @ngdoc function
         * @name processHeaders
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Determines the columns that the header row from
         * a csv (or other) file represents.
         * @param {Grid} grid the grid we're importing into
         * @param {array} headerRow the header row that we wish to match against
         * the column definitions
         * @returns {array} an array of the attribute names that should be used
         * for that column, based on matching the headers or creating the headers
         *
         */
        processHeaders: function( grid, headerRow ) {
          var headers = [];
          if ( !grid.options.columnDefs || grid.options.columnDefs.length === 0 ){
            // we are going to create new columnDefs for all these columns, so just remove
            // spaces from the names to create fields
            headerRow.forEach( function( value, index ) {
              headers.push( value.replace( /[^0-9a-zA-Z\-_]/g, '_' ) );
            });
            return headers;
          } else {
            var lookupHash = service.flattenColumnDefs( grid, grid.options.columnDefs );
            headerRow.forEach(  function( value, index ) {
              if ( lookupHash[value] ) {
                headers.push( lookupHash[value] );
              } else if ( lookupHash[ value.toLowerCase() ] ) {
                headers.push( lookupHash[ value.toLowerCase() ] );
              } else {
                headers.push( null );
              }
            });
            return headers;
          }
        },


        /**
         * @name flattenColumnDefs
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Runs through the column defs and creates a hash of
         * the displayName, name and field, and of each of those values forced to lower case,
         * with each pointing to the field or name
         * (whichever is present).  Used to lookup column headers and decide what
         * attribute name to give to the resulting field.
         * @param {Grid} grid the grid we're importing into
         * @param {array} columnDefs the columnDefs that we should flatten
         * @returns {hash} the flattened version of the column def information, allowing
         * us to look up a value by `flattenedHash[ headerValue ]`
         */
        flattenColumnDefs: function( grid, columnDefs ){
          var flattenedHash = {};
          columnDefs.forEach(  function( columnDef, index) {
            if ( columnDef.name ){
              flattenedHash[ columnDef.name ] = columnDef.field || columnDef.name;
              flattenedHash[ columnDef.name.toLowerCase() ] = columnDef.field || columnDef.name;
            }

            if ( columnDef.field ){
              flattenedHash[ columnDef.field ] = columnDef.field || columnDef.name;
              flattenedHash[ columnDef.field.toLowerCase() ] = columnDef.field || columnDef.name;
            }

            if ( columnDef.displayName ){
              flattenedHash[ columnDef.displayName ] = columnDef.field || columnDef.name;
              flattenedHash[ columnDef.displayName.toLowerCase() ] = columnDef.field || columnDef.name;
            }

            if ( columnDef.displayName && grid.options.importerHeaderFilter ){
              flattenedHash[ grid.options.importerHeaderFilter(columnDef.displayName) ] = columnDef.field || columnDef.name;
              flattenedHash[ grid.options.importerHeaderFilter(columnDef.displayName).toLowerCase() ] = columnDef.field || columnDef.name;
            }
          });

          return flattenedHash;
        },


        /**
         * @ngdoc function
         * @name addObjects
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Inserts our new objects into the grid data, and
         * sets the rows to dirty if the rowEdit feature is being used
         *
         * Does this by registering a watch on dataChanges, which essentially
         * is waiting on the result of the grid data watch, and downstream processing.
         *
         * When the callback is called, it deregisters itself - we don't want to run
         * again next time data is added.
         *
         * If we never get called, we deregister on destroy.
         *
         * @param {Grid} grid the grid we're importing into
         * @param {array} newObjects the objects we want to insert into the grid data
         * @returns {object} the new object
         */
        addObjects: function( grid, newObjects, $scope ){
          if ( grid.api.rowEdit ){
            var dataChangeDereg = grid.registerDataChangeCallback( function() {
              grid.api.rowEdit.setRowsDirty( newObjects );
              dataChangeDereg();
            }, [uiGridConstants.dataChange.ROW] );

            grid.importer.$scope.$on( '$destroy', dataChangeDereg );
          }

          grid.importer.$scope.$apply( grid.options.importerDataAddCallback( grid, newObjects ) );

        },


        /**
         * @ngdoc function
         * @name newObject
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Makes a new object based on `gridOptions.importerNewObject`,
         * or based on an empty object if not present
         * @param {Grid} grid the grid we're importing into
         * @returns {object} the new object
         */
        newObject: function( grid ){
          if ( typeof(grid.options) !== "undefined" && typeof(grid.options.importerNewObject) !== "undefined" ){
            return new grid.options.importerNewObject();
          } else {
            return {};
          }
        },


        /**
         * @ngdoc function
         * @name alertError
         * @methodOf ui.grid.importer.service:uiGridImporterService
         * @description Provides an internationalised user alert for the failure,
         * and logs a console message including diagnostic content.
         * Optionally, if the the `gridOptions.importerErrorCallback` routine
         * is defined, then calls that instead, allowing user specified error routines
         * @param {Grid} grid the grid we're importing into
         * @param {array} headerRow the header row that we wish to match against
         * the column definitions
         */
        alertError: function( grid, alertI18nToken, consoleMessage, context ){
          if ( grid.options.importerErrorCallback ){
            grid.options.importerErrorCallback( grid, alertI18nToken, consoleMessage, context );
          } else {
            $window.alert(i18nService.getSafeText( alertI18nToken ));
            gridUtil.logError(consoleMessage + context );
          }
        }
      };

      return service;

    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.importer.directive:uiGridImporter
   *  @element div
   *  @restrict A
   *
   *  @description Adds importer features to grid
   *
   */
  module.directive('uiGridImporter', ['uiGridImporterConstants', 'uiGridImporterService', 'gridUtil', '$compile',
    function (uiGridImporterConstants, uiGridImporterService, gridUtil, $compile) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          uiGridImporterService.initializeGrid($scope, uiGridCtrl.grid);
        }
      };
    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.importer.directive:uiGridImporterMenuItem
   *  @element div
   *  @restrict A
   *
   *  @description Handles the processing from the importer menu item - once a file is
   *  selected
   *
   */
  module.directive('uiGridImporterMenuItem', ['uiGridImporterConstants', 'uiGridImporterService', 'gridUtil', '$compile',
    function (uiGridImporterConstants, uiGridImporterService, gridUtil, $compile) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        templateUrl: 'ui-grid/importerMenuItem',
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          var handleFileSelect = function( event ){
            var target = event.srcElement || event.target;

            if (target && target.files && target.files.length === 1) {
              var fileObject = target.files[0];
              uiGridImporterService.importThisFile( grid, fileObject );
              target.form.reset();
            }
          };

          var fileChooser = $elm[0].querySelectorAll('.ui-grid-importer-file-chooser');
          var grid = uiGridCtrl.grid;

          if ( fileChooser.length !== 1 ){
            gridUtil.logError('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
          } else {
            fileChooser[0].addEventListener('change', handleFileSelect, false);  // TODO: why the false on the end?  Google
          }
        }
      };
    }
  ]);
})();

(function() {
  'use strict';
  /**
   *  @ngdoc overview
   *  @name ui.grid.infiniteScroll
   *
   *  @description
   *
   * #ui.grid.infiniteScroll
   *
   * <div class="alert alert-warning" role="alert"><strong>Beta</strong> This feature is ready for testing, but it either hasn't seen a lot of use or has some known bugs.</div>
   *
   * This module provides infinite scroll functionality to ui-grid
   *
   */
  var module = angular.module('ui.grid.infiniteScroll', ['ui.grid']);
  /**
   *  @ngdoc service
   *  @name ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
   *
   *  @description Service for infinite scroll features
   */
  module.service('uiGridInfiniteScrollService', ['gridUtil', '$compile', '$timeout', 'uiGridConstants', 'ScrollEvent', '$q', function (gridUtil, $compile, $timeout, uiGridConstants, ScrollEvent, $q) {

    var service = {

      /**
       * @ngdoc function
       * @name initializeGrid
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description This method register events and methods into grid public API
       */

      initializeGrid: function(grid, $scope) {
        service.defaultGridOptions(grid.options);

        if (!grid.options.enableInfiniteScroll){
          return;
        }

        grid.infiniteScroll = { dataLoading: false };
        service.setScrollDirections( grid, grid.options.infiniteScrollUp, grid.options.infiniteScrollDown );
          grid.api.core.on.scrollEnd($scope, service.handleScroll);

        /**
         *  @ngdoc object
         *  @name ui.grid.infiniteScroll.api:PublicAPI
         *
         *  @description Public API for infinite scroll feature
         */
        var publicApi = {
          events: {
            infiniteScroll: {

              /**
               * @ngdoc event
               * @name needLoadMoreData
               * @eventOf ui.grid.infiniteScroll.api:PublicAPI
               * @description This event fires when scroll reaches bottom percentage of grid
               * and needs to load data
               */

              needLoadMoreData: function ($scope, fn) {
              },

              /**
               * @ngdoc event
               * @name needLoadMoreDataTop
               * @eventOf ui.grid.infiniteScroll.api:PublicAPI
               * @description This event fires when scroll reaches top percentage of grid
               * and needs to load data
               */

              needLoadMoreDataTop: function ($scope, fn) {
              }
            }
          },
          methods: {
            infiniteScroll: {

              /**
               * @ngdoc function
               * @name dataLoaded
               * @methodOf ui.grid.infiniteScroll.api:PublicAPI
               * @description Call this function when you have loaded the additional data
               * requested.  You should set scrollUp and scrollDown to indicate
               * whether there are still more pages in each direction.
               *
               * If you call dataLoaded without first calling `saveScrollPercentage` then we will
               * scroll the user to the start of the newly loaded data, which usually gives a smooth scroll
               * experience, but can give a jumpy experience with large `infiniteScrollRowsFromEnd` values, and
               * on variable speed internet connections.  Using `saveScrollPercentage` as demonstrated in the tutorial
               * should give a smoother scrolling experience for users.
               *
               * See infinite_scroll tutorial for example of usage
               * @param {boolean} scrollUp if set to false flags that there are no more pages upwards, so don't fire
               * any more infinite scroll events upward
               * @param {boolean} scrollDown if set to false flags that there are no more pages downwards, so don't
               * fire any more infinite scroll events downward
               * @returns {promise} a promise that is resolved when the grid scrolling is fully adjusted.  If you're
               * planning to remove pages, you should wait on this promise first, or you'll break the scroll positioning
               */
              dataLoaded: function( scrollUp, scrollDown ) {
                service.setScrollDirections(grid, scrollUp, scrollDown);

                var promise = service.adjustScroll(grid).then(function() {
                  grid.infiniteScroll.dataLoading = false;
                });

                return promise;
              },

              /**
               * @ngdoc function
               * @name resetScroll
               * @methodOf ui.grid.infiniteScroll.api:PublicAPI
               * @description Call this function when you have taken some action that makes the current
               * scroll position invalid.  For example, if you're using external sorting and you've resorted
               * then you might reset the scroll, or if you've otherwise substantially changed the data, perhaps
               * you've reused an existing grid for a new data set
               *
               * You must tell us whether there is data upwards or downwards after the reset
               *
               * @param {boolean} scrollUp flag that there are pages upwards, fire
               * infinite scroll events upward
               * @param {boolean} scrollDown flag that there are pages downwards, so
               * fire infinite scroll events downward
               * @returns {promise} promise that is resolved when the scroll reset is complete
               */
              resetScroll: function( scrollUp, scrollDown ) {
                service.setScrollDirections( grid, scrollUp, scrollDown);

                return service.adjustInfiniteScrollPosition(grid, 0);
              },


              /**
               * @ngdoc function
               * @name saveScrollPercentage
               * @methodOf ui.grid.infiniteScroll.api:PublicAPI
               * @description Saves the scroll percentage and number of visible rows before you adjust the data,
               * used if you're subsequently going to call `dataRemovedTop` or `dataRemovedBottom`
               */
              saveScrollPercentage: function() {
                grid.infiniteScroll.prevScrolltopPercentage = grid.renderContainers.body.prevScrolltopPercentage;
                grid.infiniteScroll.previousVisibleRows = grid.renderContainers.body.visibleRowCache.length;
              },


              /**
               * @ngdoc function
               * @name dataRemovedTop
               * @methodOf ui.grid.infiniteScroll.api:PublicAPI
               * @description Adjusts the scroll position after you've removed data at the top
               * @param {boolean} scrollUp flag that there are pages upwards, fire
               * infinite scroll events upward
               * @param {boolean} scrollDown flag that there are pages downwards, so
               * fire infinite scroll events downward
               */
              dataRemovedTop: function( scrollUp, scrollDown ) {
                service.dataRemovedTop( grid, scrollUp, scrollDown );
              },

              /**
               * @ngdoc function
               * @name dataRemovedBottom
               * @methodOf ui.grid.infiniteScroll.api:PublicAPI
               * @description Adjusts the scroll position after you've removed data at the bottom
               * @param {boolean} scrollUp flag that there are pages upwards, fire
               * infinite scroll events upward
               * @param {boolean} scrollDown flag that there are pages downwards, so
               * fire infinite scroll events downward
               */
              dataRemovedBottom: function( scrollUp, scrollDown ) {
                service.dataRemovedBottom( grid, scrollUp, scrollDown );
              },

              /**
               * @ngdoc function
               * @name setScrollDirections
               * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
               * @description Sets the scrollUp and scrollDown flags, handling nulls and undefined,
               * and also sets the grid.suppressParentScroll
               * @param {boolean} scrollUp whether there are pages available up - defaults to false
               * @param {boolean} scrollDown whether there are pages available down - defaults to true
               */
              setScrollDirections:  function ( scrollUp, scrollDown ) {
                service.setScrollDirections( grid, scrollUp, scrollDown );
              }

            }
          }
        };
        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);
      },


      defaultGridOptions: function (gridOptions) {
        //default option to true unless it was explicitly set to false
        /**
         *  @ngdoc object
         *  @name ui.grid.infiniteScroll.api:GridOptions
         *
         *  @description GridOptions for infinite scroll feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */

        /**
         *  @ngdoc object
         *  @name enableInfiniteScroll
         *  @propertyOf  ui.grid.infiniteScroll.api:GridOptions
         *  @description Enable infinite scrolling for this grid
         *  <br/>Defaults to true
         */
        gridOptions.enableInfiniteScroll = gridOptions.enableInfiniteScroll !== false;

        /**
         * @ngdoc property
         * @name infiniteScrollRowsFromEnd
         * @propertyOf ui.grid.class:GridOptions
         * @description This setting controls how close to the end of the dataset a user gets before
         * more data is requested by the infinite scroll, whether scrolling up or down.  This allows you to
         * 'prefetch' rows before the user actually runs out of scrolling.
         *
         * Note that if you set this value too high it may give jumpy scrolling behaviour, if you're getting
         * this behaviour you could use the `saveScrollPercentageMethod` right before loading your data, and we'll
         * preserve that scroll position
         *
         * <br> Defaults to 20
         */
        gridOptions.infiniteScrollRowsFromEnd = gridOptions.infiniteScrollRowsFromEnd || 20;

        /**
         * @ngdoc property
         * @name infiniteScrollUp
         * @propertyOf ui.grid.class:GridOptions
         * @description Whether you allow infinite scroll up, implying that the first page of data
         * you have displayed is in the middle of your data set.  If set to true then we trigger the
         * needMoreDataTop event when the user hits the top of the scrollbar.
         * <br> Defaults to false
         */
        gridOptions.infiniteScrollUp = gridOptions.infiniteScrollUp === true;

        /**
         * @ngdoc property
         * @name infiniteScrollDown
         * @propertyOf ui.grid.class:GridOptions
         * @description Whether you allow infinite scroll down, implying that the first page of data
         * you have displayed is in the middle of your data set.  If set to true then we trigger the
         * needMoreData event when the user hits the bottom of the scrollbar.
         * <br> Defaults to true
         */
        gridOptions.infiniteScrollDown = gridOptions.infiniteScrollDown !== false;
      },


      /**
       * @ngdoc function
       * @name setScrollDirections
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description Sets the scrollUp and scrollDown flags, handling nulls and undefined,
       * and also sets the grid.suppressParentScroll
       * @param {grid} grid the grid we're operating on
       * @param {boolean} scrollUp whether there are pages available up - defaults to false
       * @param {boolean} scrollDown whether there are pages available down - defaults to true
       */
      setScrollDirections:  function ( grid, scrollUp, scrollDown ) {
        grid.infiniteScroll.scrollUp = ( scrollUp === true );
        grid.suppressParentScrollUp = ( scrollUp === true );

        grid.infiniteScroll.scrollDown = ( scrollDown !== false);
        grid.suppressParentScrollDown = ( scrollDown !== false);
      },


      /**
       * @ngdoc function
       * @name handleScroll
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description Called whenever the grid scrolls, determines whether the scroll should
       * trigger an infinite scroll request for more data
       * @param {object} args the args from the event
       */
      handleScroll:  function (args) {
        // don't request data if already waiting for data, or if source is coming from ui.grid.adjustInfiniteScrollPosition() function
        if ( args.grid.infiniteScroll && args.grid.infiniteScroll.dataLoading || args.source === 'ui.grid.adjustInfiniteScrollPosition' ){
          return;
        }

        if (args.y) {
          var percentage;
          var targetPercentage = args.grid.options.infiniteScrollRowsFromEnd / args.grid.renderContainers.body.visibleRowCache.length;
          if (args.grid.scrollDirection === uiGridConstants.scrollDirection.UP ) {
            percentage = args.y.percentage;
            if (percentage <= targetPercentage){
              service.loadData(args.grid);
            }
          } else if (args.grid.scrollDirection === uiGridConstants.scrollDirection.DOWN) {
            percentage = 1 - args.y.percentage;
            if (percentage <= targetPercentage){
              service.loadData(args.grid);
            }
          }
        }
      },


      /**
       * @ngdoc function
       * @name loadData
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description This function fires 'needLoadMoreData' or 'needLoadMoreDataTop' event based on scrollDirection
       * and whether there are more pages upwards or downwards.  It also stores the number of rows that we had previously,
       * and clears out any saved scroll position so that we know whether or not the user calls `saveScrollPercentage`
       * @param {Grid} grid the grid we're working on
       */
      loadData: function (grid) {
        // save number of currently visible rows to calculate new scroll position later - we know that we want
        // to be at approximately the row we're currently at
        grid.infiniteScroll.previousVisibleRows = grid.renderContainers.body.visibleRowCache.length;
        grid.infiniteScroll.direction = grid.scrollDirection;
        delete grid.infiniteScroll.prevScrolltopPercentage;

        if (grid.scrollDirection === uiGridConstants.scrollDirection.UP && grid.infiniteScroll.scrollUp ) {
          grid.infiniteScroll.dataLoading = true;
          grid.api.infiniteScroll.raise.needLoadMoreDataTop();
        } else if (grid.scrollDirection === uiGridConstants.scrollDirection.DOWN && grid.infiniteScroll.scrollDown ) {
          grid.infiniteScroll.dataLoading = true;
          grid.api.infiniteScroll.raise.needLoadMoreData();
        }
      },


      /**
       * @ngdoc function
       * @name adjustScroll
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description Once we are informed that data has been loaded, adjust the scroll position to account for that
       * addition and to make things look clean.
       *
       * If we're scrolling up we scroll to the first row of the old data set -
       * so we're assuming that you would have gotten to the top of the grid (from the 20% need more data trigger) by
       * the time the data comes back.  If we're scrolling down we scoll to the last row of the old data set - so we're
       * assuming that you would have gotten to the bottom of the grid (from the 80% need more data trigger) by the time
       * the data comes back.
       *
       * Neither of these are good assumptions, but making this a smoother experience really requires
       * that trigger to not be a percentage, and to be much closer to the end of the data (say, 5 rows off the end).  Even then
       * it'd be better still to actually run into the end.  But if the data takes a while to come back, they may have scrolled
       * somewhere else in the mean-time, in which case they'll get a jump back to the new data.  Anyway, this will do for
       * now, until someone wants to do better.
       * @param {Grid} grid the grid we're working on
       * @returns {promise} a promise that is resolved when scrolling has finished
       */
      adjustScroll: function(grid){
        var promise = $q.defer();
        $timeout(function () {
          var newPercentage;

          if ( grid.infiniteScroll.direction === undefined ){
            // called from initialize, tweak our scroll up a little
            service.adjustInfiniteScrollPosition(grid, 0);
          }

          var newVisibleRows = grid.renderContainers.body.visibleRowCache.length;
          var oldPercentage, oldTopRow;
          var halfViewport = grid.getViewportHeight() / grid.options.rowHeight / 2;

          if ( grid.infiniteScroll.direction === uiGridConstants.scrollDirection.UP ){
            oldPercentage = grid.infiniteScroll.prevScrolltopPercentage || 0;
            oldTopRow = oldPercentage * grid.infiniteScroll.previousVisibleRows;
            newPercentage = ( newVisibleRows - grid.infiniteScroll.previousVisibleRows + oldTopRow + halfViewport ) / newVisibleRows;
            service.adjustInfiniteScrollPosition(grid, newPercentage);
            $timeout( function() {
              promise.resolve();
            });
          }

          if ( grid.infiniteScroll.direction === uiGridConstants.scrollDirection.DOWN ){
            oldPercentage = grid.infiniteScroll.prevScrolltopPercentage || 1;
            oldTopRow = oldPercentage * grid.infiniteScroll.previousVisibleRows;
            newPercentage = ( oldTopRow - halfViewport ) / newVisibleRows;
            service.adjustInfiniteScrollPosition(grid, newPercentage);
            $timeout( function() {
              promise.resolve();
            });
          }
        }, 0);

        return promise.promise;
      },


      /**
       * @ngdoc function
       * @name adjustInfiniteScrollPosition
       * @methodOf ui.grid.infiniteScroll.service:uiGridInfiniteScrollService
       * @description This function fires 'needLoadMoreData' or 'needLoadMoreDataTop' event based on scrollDirection
       * @param {Grid} grid the grid we're working on
       * @param {number} percentage the percentage through the grid that we want to scroll to
       * @returns {promise} a promise that is resolved when the scrolling finishes
       */
      adjustInfiniteScrollPosition: function (grid, percentage) {
        var scrollEvent = new ScrollEvent(grid, null, null, 'ui.grid.adjustInfiniteScrollPosition');

        //for infinite scroll, if there are pages upwards then never allow it to be at the zero position so the up button can be active
        if ( percentage === 0 && grid.infiniteScroll.scrollUp ) {
          scrollEvent.y = {pixels: 1};
        }
        else {
          scrollEvent.y = {percentage: percentage};
        }
        grid.scrollContainers('', scrollEvent);
      },


      /**
       * @ngdoc function
       * @name dataRemovedTop
       * @methodOf ui.grid.infiniteScroll.api:PublicAPI
       * @description Adjusts the scroll position after you've removed data at the top. You should
       * have called `saveScrollPercentage` before you remove the data, and if you're doing this in
       * response to a `needMoreData` you should wait until the promise from `loadData` has resolved
       * before you start removing data
       * @param {Grid} grid the grid we're working on
       * @param {boolean} scrollUp flag that there are pages upwards, fire
       * infinite scroll events upward
       * @param {boolean} scrollDown flag that there are pages downwards, so
       * fire infinite scroll events downward
       * @returns {promise} a promise that is resolved when the scrolling finishes
       */
      dataRemovedTop: function( grid, scrollUp, scrollDown ) {
        service.setScrollDirections( grid, scrollUp, scrollDown );

        var newVisibleRows = grid.renderContainers.body.visibleRowCache.length;
        var oldScrollRow = grid.infiniteScroll.prevScrolltopPercentage * grid.infiniteScroll.previousVisibleRows;

        // since we removed from the top, our new scroll row will be the old scroll row less the number
        // of rows removed
        var newScrollRow = oldScrollRow - ( grid.infiniteScroll.previousVisibleRows - newVisibleRows );
        var newScrollPercent = newScrollRow / newVisibleRows;

        return service.adjustInfiniteScrollPosition( grid, newScrollPercent );
      },

      /**
       * @ngdoc function
       * @name dataRemovedBottom
       * @methodOf ui.grid.infiniteScroll.api:PublicAPI
       * @description Adjusts the scroll position after you've removed data at the bottom.  You should
       * have called `saveScrollPercentage` before you remove the data, and if you're doing this in
       * response to a `needMoreData` you should wait until the promise from `loadData` has resolved
       * before you start removing data
       * @param {Grid} grid the grid we're working on
       * @param {boolean} scrollUp flag that there are pages upwards, fire
       * infinite scroll events upward
       * @param {boolean} scrollDown flag that there are pages downwards, so
       * fire infinite scroll events downward
       */
      dataRemovedBottom: function( grid, scrollUp, scrollDown ) {
        service.setScrollDirections( grid, scrollUp, scrollDown );

        var newVisibleRows = grid.renderContainers.body.visibleRowCache.length;
        var oldScrollRow = grid.infiniteScroll.prevScrolltopPercentage * grid.infiniteScroll.previousVisibleRows;

        // since we removed from the bottom, our new scroll row will be same as the old scroll row
        var newScrollPercent = oldScrollRow / newVisibleRows;

        return service.adjustInfiniteScrollPosition( grid, newScrollPercent );
      }
    };
    return service;
  }]);
  /**
   *  @ngdoc directive
   *  @name ui.grid.infiniteScroll.directive:uiGridInfiniteScroll
   *  @element div
   *  @restrict A
   *
   *  @description Adds infinite scroll features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.infiniteScroll']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Alex', car: 'Toyota' },
            { name: 'Sam', car: 'Lexus' }
      ];

      $scope.columnDefs = [
        {name: 'name'},
        {name: 'car'}
      ];
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-infinite-scroll="20"></div>
   </div>
   </file>
   </example>
   */

  module.directive('uiGridInfiniteScroll', ['uiGridInfiniteScrollService',
    function (uiGridInfiniteScrollService) {
      return {
        priority: -200,
        scope: false,
        require: '^uiGrid',
        compile: function($scope, $elm, $attr){
          return {
            pre: function($scope, $elm, $attr, uiGridCtrl) {
              uiGridInfiniteScrollService.initializeGrid(uiGridCtrl.grid, $scope);
            },
            post: function($scope, $elm, $attr) {
            }
          };
        }
      };
    }]);

})();

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.moveColumns
   * @description
   *
   * # ui.grid.moveColumns
   *
   * <div class="alert alert-warning" role="alert"><strong>Alpha</strong> This feature is in development. There will almost certainly be breaking api changes, or there are major outstanding bugs.</div>
   *
   * This module provides column moving capability to ui.grid. It enables to change the position of columns.
   * <div doc-module-components="ui.grid.moveColumns"></div>
   */
  var module = angular.module('ui.grid.moveColumns', ['ui.grid']);

  /**
   *  @ngdoc service
   *  @name ui.grid.moveColumns.service:uiGridMoveColumnService
   *  @description Service for column moving feature.
   */
  module.service('uiGridMoveColumnService', ['$q', '$timeout', '$log', 'ScrollEvent', 'uiGridConstants', 'gridUtil', function ($q, $timeout, $log, ScrollEvent, uiGridConstants, gridUtil) {

    var service = {
      initializeGrid: function (grid) {
        var self = this;
        this.registerPublicApi(grid);
        this.defaultGridOptions(grid.options);
        grid.registerColumnBuilder(self.movableColumnBuilder);
      },
      registerPublicApi: function (grid) {
        var self = this;
        /**
         *  @ngdoc object
         *  @name ui.grid.moveColumns.api:PublicApi
         *  @description Public Api for column moving feature.
         */
        var publicApi = {
          events: {
            /**
             * @ngdoc event
             * @name columnPositionChanged
             * @eventOf  ui.grid.moveColumns.api:PublicApi
             * @description raised when column is moved
             * <pre>
             *      gridApi.colMovable.on.columnPositionChanged(scope,function(colDef, originalPosition, newPosition){})
             * </pre>
             * @param {object} colDef the column that was moved
             * @param {integer} originalPosition of the column
             * @param {integer} finalPosition of the column
             */
            colMovable: {
              columnPositionChanged: function (colDef, originalPosition, newPosition) {
              }
            }
          },
          methods: {
            /**
             * @ngdoc method
             * @name moveColumn
             * @methodOf  ui.grid.moveColumns.api:PublicApi
             * @description Method can be used to change column position.
             * <pre>
             *      gridApi.colMovable.moveColumn(oldPosition, newPosition)
             * </pre>
             * @param {integer} originalPosition of the column
             * @param {integer} finalPosition of the column
             */
            colMovable: {
              moveColumn: function (originalPosition, finalPosition) {
                var columns = grid.columns;
                if (!angular.isNumber(originalPosition) || !angular.isNumber(finalPosition)) {
                  gridUtil.logError('MoveColumn: Please provide valid values for originalPosition and finalPosition');
                  return;
                }
                var nonMovableColumns = 0;
                for (var i = 0; i < columns.length; i++) {
                  if ((angular.isDefined(columns[i].colDef.visible) && columns[i].colDef.visible === false) || columns[i].isRowHeader === true) {
                    nonMovableColumns++;
                  }
                }
                if (originalPosition >= (columns.length - nonMovableColumns) || finalPosition >= (columns.length - nonMovableColumns)) {
                  gridUtil.logError('MoveColumn: Invalid values for originalPosition, finalPosition');
                  return;
                }
                var findPositionForRenderIndex = function (index) {
                  var position = index;
                  for (var i = 0; i <= position; i++) {
                    if (angular.isDefined(columns[i]) && ((angular.isDefined(columns[i].colDef.visible) && columns[i].colDef.visible === false) || columns[i].isRowHeader === true)) {
                      position++;
                    }
                  }
                  return position;
                };
                self.redrawColumnAtPosition(grid, findPositionForRenderIndex(originalPosition), findPositionForRenderIndex(finalPosition));
              }
            }
          }
        };
        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);
      },
      defaultGridOptions: function (gridOptions) {
        /**
         *  @ngdoc object
         *  @name ui.grid.moveColumns.api:GridOptions
         *
         *  @description Options for configuring the move column feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */
        /**
         *  @ngdoc object
         *  @name enableColumnMoving
         *  @propertyOf  ui.grid.moveColumns.api:GridOptions
         *  @description If defined, sets the default value for the colMovable flag on each individual colDefs
         *  if their individual enableColumnMoving configuration is not defined. Defaults to true.
         */
        gridOptions.enableColumnMoving = gridOptions.enableColumnMoving !== false;
      },
      movableColumnBuilder: function (colDef, col, gridOptions) {
        var promises = [];
        /**
         *  @ngdoc object
         *  @name ui.grid.moveColumns.api:ColumnDef
         *
         *  @description Column Definition for move column feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
         */
        /**
         *  @ngdoc object
         *  @name enableColumnMoving
         *  @propertyOf  ui.grid.moveColumns.api:ColumnDef
         *  @description Enable column moving for the column.
         */
        colDef.enableColumnMoving = colDef.enableColumnMoving === undefined ? gridOptions.enableColumnMoving
          : colDef.enableColumnMoving;
        return $q.all(promises);
      },
      redrawColumnAtPosition: function (grid, originalPosition, newPosition) {

        var columns = grid.columns;

        var originalColumn = columns[originalPosition];
        if (originalColumn.colDef.enableColumnMoving) {
          if (originalPosition > newPosition) {
            for (var i1 = originalPosition; i1 > newPosition; i1--) {
              columns[i1] = columns[i1 - 1];
            }
          }
          else if (newPosition > originalPosition) {
            for (var i2 = originalPosition; i2 < newPosition; i2++) {
              columns[i2] = columns[i2 + 1];
            }
          }
          columns[newPosition] = originalColumn;
          grid.queueGridRefresh();
          $timeout(function () {
            grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
            grid.api.colMovable.raise.columnPositionChanged(originalColumn.colDef, originalPosition, newPosition);
          });
        }
      }
    };
    return service;
  }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.moveColumns.directive:uiGridMoveColumns
   *  @element div
   *  @restrict A
   *  @description Adds column moving features to the ui-grid directive.
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.moveColumns']);
   app.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = [
          { name: 'Bob', title: 'CEO', age: 45 },
          { name: 'Frank', title: 'Lowly Developer', age: 25 },
          { name: 'Jenny', title: 'Highly Developer', age: 35 }
        ];
        $scope.columnDefs = [
          {name: 'name'},
          {name: 'title'},
          {name: 'age'}
        ];
      }]);
   </file>
   <file name="main.css">
   .grid {
      width: 100%;
      height: 150px;
    }
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div class="grid" ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-move-columns></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridMoveColumns', ['uiGridMoveColumnService', function (uiGridMoveColumnService) {
    return {
      replace: true,
      priority: 0,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            uiGridMoveColumnService.initializeGrid(uiGridCtrl.grid);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.moveColumns.directive:uiGridHeaderCell
   *  @element div
   *  @restrict A
   *
   *  @description Stacks on top of ui.grid.uiGridHeaderCell to provide capability to be able to move it to reposition column.
   *
   *  On receiving mouseDown event headerCell is cloned, now as the mouse moves the cloned header cell also moved in the grid.
   *  In case the moving cloned header cell reaches the left or right extreme of grid, grid scrolling is triggered (if horizontal scroll exists).
   *  On mouseUp event column is repositioned at position where mouse is released and cloned header cell is removed.
   *
   *  Events that invoke cloning of header cell:
   *    - mousedown
   *
   *  Events that invoke movement of cloned header cell:
   *    - mousemove
   *
   *  Events that invoke repositioning of column:
   *    - mouseup
   */
  module.directive('uiGridHeaderCell', ['$q', 'gridUtil', 'uiGridMoveColumnService', '$document', '$log', 'uiGridConstants', 'ScrollEvent',
    function ($q, gridUtil, uiGridMoveColumnService, $document, $log, uiGridConstants, ScrollEvent) {
      return {
        priority: -10,
        require: '^uiGrid',
        compile: function () {
          return {
            post: function ($scope, $elm, $attrs, uiGridCtrl) {

              if ($scope.col.colDef.enableColumnMoving) {

                /*
                 * Our general approach to column move is that we listen to a touchstart or mousedown
                 * event over the column header.  When we hear one, then we wait for a move of the same type
                 * - if we are a touchstart then we listen for a touchmove, if we are a mousedown we listen for
                 * a mousemove (i.e. a drag) before we decide that there's a move underway.  If there's never a move,
                 * and we instead get a mouseup or a touchend, then we just drop out again and do nothing.
                 *
                 */
                var $contentsElm = angular.element( $elm[0].querySelectorAll('.ui-grid-cell-contents') );

                var gridLeft;
                var previousMouseX;
                var totalMouseMovement;
                var rightMoveLimit;
                var elmCloned = false;
                var movingElm;
                var reducedWidth;
                var moveOccurred = false;

                var downFn = function( event ){
                  //Setting some variables required for calculations.
                  gridLeft = $scope.grid.element[0].getBoundingClientRect().left;
                  if ( $scope.grid.hasLeftContainer() ){
                    gridLeft += $scope.grid.renderContainers.left.header[0].getBoundingClientRect().width;
                  }

                  previousMouseX = event.pageX;
                  totalMouseMovement = 0;
                  rightMoveLimit = gridLeft + $scope.grid.getViewportWidth();

                  if ( event.type === 'mousedown' ){
                    $document.on('mousemove', moveFn);
                    $document.on('mouseup', upFn);
                  } else if ( event.type === 'touchstart' ){
                    $document.on('touchmove', moveFn);
                    $document.on('touchend', upFn);
                  }
                };

                var moveFn = function( event ) {
                  var changeValue = event.pageX - previousMouseX;
                  if ( changeValue === 0 ){ return; }
                  //Disable text selection in Chrome during column move
                  document.onselectstart = function() { return false; };

                  moveOccurred = true;

                  if (!elmCloned) {
                    cloneElement();
                  }
                  else if (elmCloned) {
                    moveElement(changeValue);
                    previousMouseX = event.pageX;
                  }
                };

                var upFn = function( event ){
                  //Re-enable text selection after column move
                  document.onselectstart = null;

                  //Remove the cloned element on mouse up.
                  if (movingElm) {
                    movingElm.remove();
                    elmCloned = false;
                  }

                  offAllEvents();
                  onDownEvents();

                  if (!moveOccurred){
                    return;
                  }

                  var columns = $scope.grid.columns;
                  var columnIndex = 0;
                  for (var i = 0; i < columns.length; i++) {
                    if (columns[i].colDef.name !== $scope.col.colDef.name) {
                      columnIndex++;
                    }
                    else {
                      break;
                    }
                  }

                  //Case where column should be moved to a position on its left
                  if (totalMouseMovement < 0) {
                    var totalColumnsLeftWidth = 0;
                    for (var il = columnIndex - 1; il >= 0; il--) {
                      if (angular.isUndefined(columns[il].colDef.visible) || columns[il].colDef.visible === true) {
                        totalColumnsLeftWidth += columns[il].drawnWidth || columns[il].width || columns[il].colDef.width;
                        if (totalColumnsLeftWidth > Math.abs(totalMouseMovement)) {
                          uiGridMoveColumnService.redrawColumnAtPosition
                          ($scope.grid, columnIndex, il + 1);
                          break;
                        }
                      }
                    }
                    //Case where column should be moved to beginning of the grid.
                    if (totalColumnsLeftWidth < Math.abs(totalMouseMovement)) {
                      uiGridMoveColumnService.redrawColumnAtPosition
                      ($scope.grid, columnIndex, 0);
                    }
                  }

                  //Case where column should be moved to a position on its right
                  else if (totalMouseMovement > 0) {
                    var totalColumnsRightWidth = 0;
                    for (var ir = columnIndex + 1; ir < columns.length; ir++) {
                      if (angular.isUndefined(columns[ir].colDef.visible) || columns[ir].colDef.visible === true) {
                        totalColumnsRightWidth += columns[ir].drawnWidth || columns[ir].width || columns[ir].colDef.width;
                        if (totalColumnsRightWidth > totalMouseMovement) {
                          uiGridMoveColumnService.redrawColumnAtPosition
                          ($scope.grid, columnIndex, ir - 1);
                          break;
                        }
                      }
                    }
                    //Case where column should be moved to end of the grid.
                    if (totalColumnsRightWidth < totalMouseMovement) {
                      uiGridMoveColumnService.redrawColumnAtPosition
                      ($scope.grid, columnIndex, columns.length - 1);
                    }
                  }
                };

                var onDownEvents = function(){
                  $contentsElm.on('touchstart', downFn);
                  $contentsElm.on('mousedown', downFn);
                };

                var offAllEvents = function() {
                  $contentsElm.off('touchstart', downFn);
                  $contentsElm.off('mousedown', downFn);

                  $document.off('mousemove', moveFn);
                  $document.off('touchmove', moveFn);

                  $document.off('mouseup', upFn);
                  $document.off('touchend', upFn);
                };

                onDownEvents();


                var cloneElement = function () {
                  elmCloned = true;

                  //Cloning header cell and appending to current header cell.
                  movingElm = $elm.clone();
                  $elm.parent().append(movingElm);

                  //Left of cloned element should be aligned to original header cell.
                  movingElm.addClass('movingColumn');
                  var movingElementStyles = {};
                  var elmLeft;
                  if (gridUtil.detectBrowser() === 'safari') {
                    //Correction for Safari getBoundingClientRect,
                    //which does not correctly compute when there is an horizontal scroll
                    elmLeft = $elm[0].offsetLeft + $elm[0].offsetWidth - $elm[0].getBoundingClientRect().width;
                  }
                  else {
                    elmLeft = $elm[0].getBoundingClientRect().left;
                  }
                  movingElementStyles.left = (elmLeft - gridLeft) + 'px';
                  var gridRight = $scope.grid.element[0].getBoundingClientRect().right;
                  var elmRight = $elm[0].getBoundingClientRect().right;
                  if (elmRight > gridRight) {
                    reducedWidth = $scope.col.drawnWidth + (gridRight - elmRight);
                    movingElementStyles.width = reducedWidth + 'px';
                  }
                  movingElm.css(movingElementStyles);
                };

                var moveElement = function (changeValue) {
                  //Calculate total column width
                  var columns = $scope.grid.columns;
                  var totalColumnWidth = 0;
                  for (var i = 0; i < columns.length; i++) {
                    if (angular.isUndefined(columns[i].colDef.visible) || columns[i].colDef.visible === true) {
                      totalColumnWidth += columns[i].drawnWidth || columns[i].width || columns[i].colDef.width;
                    }
                  }

                  //Calculate new position of left of column
                  var currentElmLeft = movingElm[0].getBoundingClientRect().left - 1;
                  var currentElmRight = movingElm[0].getBoundingClientRect().right;
                  var newElementLeft;

                  newElementLeft = currentElmLeft - gridLeft + changeValue;
                  newElementLeft = newElementLeft < rightMoveLimit ? newElementLeft : rightMoveLimit;

                  //Update css of moving column to adjust to new left value or fire scroll in case column has reached edge of grid
                  if ((currentElmLeft >= gridLeft || changeValue > 0) && (currentElmRight <= rightMoveLimit || changeValue < 0)) {
                    movingElm.css({visibility: 'visible', 'left': newElementLeft + 'px'});
                  }
                  else if (totalColumnWidth > Math.ceil(uiGridCtrl.grid.gridWidth)) {
                    changeValue *= 8;
                    var scrollEvent = new ScrollEvent($scope.col.grid, null, null, 'uiGridHeaderCell.moveElement');
                    scrollEvent.x = {pixels: changeValue};
                    scrollEvent.grid.scrollContainers('',scrollEvent);
                  }

                  //Calculate total width of columns on the left of the moving column and the mouse movement
                  var totalColumnsLeftWidth = 0;
                  for (var il = 0; il < columns.length; il++) {
                    if (angular.isUndefined(columns[il].colDef.visible) || columns[il].colDef.visible === true) {
                      if (columns[il].colDef.name !== $scope.col.colDef.name) {
                        totalColumnsLeftWidth += columns[il].drawnWidth || columns[il].width || columns[il].colDef.width;
                      }
                      else {
                        break;
                      }
                    }
                  }
                  if ($scope.newScrollLeft === undefined) {
                    totalMouseMovement += changeValue;
                  }
                  else {
                    totalMouseMovement = $scope.newScrollLeft + newElementLeft - totalColumnsLeftWidth;
                  }

                  //Increase width of moving column, in case the rightmost column was moved and its width was
                  //decreased because of overflow
                  if (reducedWidth < $scope.col.drawnWidth) {
                    reducedWidth += Math.abs(changeValue);
                    movingElm.css({'width': reducedWidth + 'px'});
                  }
                };
              }
            }
          };
        }
      };
    }]);
})();

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
                 * @name getTotalPages
                 * @methodOf ui.grid.pagination.api:PublicAPI
                 * @description Returns the total number of pages
                 */
                getTotalPages: function () {
                  if (!grid.options.enablePagination) {
                    return null;
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
                  } else {
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

          var processPagination = function( renderableRows ){
            if (grid.options.useExternalPagination || !grid.options.enablePagination) {
              return renderableRows;
            }
            //client side pagination
            var pageSize = parseInt(grid.options.paginationPageSize, 10);
            var currentPage = parseInt(grid.options.paginationCurrentPage, 10);

            var visibleRows = renderableRows.filter(function (row) { return row.visible; });
            grid.options.totalItems = visibleRows.length;

            var firstRow = (currentPage - 1) * pageSize;
            if (firstRow > visibleRows.length) {
              currentPage = grid.options.paginationCurrentPage = 1;
              firstRow = (currentPage - 1) * pageSize;
            }
            return visibleRows.slice(firstRow, firstRow + pageSize);
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
           * @description Enables pagination, defaults to true
           */
          gridOptions.enablePagination = gridOptions.enablePagination !== false;
          /**
           * @ngdoc property
           * @name enablePaginationControls
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Enables the paginator at the bottom of the grid. Turn this off, if you want to implement your
           *              own controls outside the grid.
           */
          gridOptions.enablePaginationControls = gridOptions.enablePaginationControls !== false;
          /**
           * @ngdoc property
           * @name useExternalPagination
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Disables client side pagination. When true, handle the paginationChanged event and set data
           *              and totalItems, defaults to `false`
           */
          gridOptions.useExternalPagination = gridOptions.useExternalPagination === true;
          /**
           * @ngdoc property
           * @name totalItems
           * @propertyOf ui.grid.pagination.api:GridOptions
           * @description Total number of items, set automatically when client side pagination, needs set by user
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
            } else {
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
              grid.queueGridRefresh(); //client side pagination
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
  module.directive('uiGridPager', ['uiGridPaginationService', 'uiGridConstants', 'gridUtil', 'i18nService',
    function (uiGridPaginationService, uiGridConstants, gridUtil, i18nService) {
      return {
        priority: -200,
        scope: true,
        require: '^uiGrid',
        link: function ($scope, $elm, $attr, uiGridCtrl) {
          $scope.paginationApi = uiGridCtrl.grid.api.pagination;
          $scope.sizesLabel = i18nService.getSafeText('pagination.sizes');
          $scope.totalItemsLabel = i18nService.getSafeText('pagination.totalItems');
          $scope.paginationOf = i18nService.getSafeText('pagination.of');

          var options = uiGridCtrl.grid.options;

          uiGridCtrl.grid.renderContainers.body.registerViewportAdjuster(function (adjustment) {
            adjustment.height = adjustment.height - gridUtil.elementHeight($elm);
            return adjustment;
          });

          var dataChangeDereg = uiGridCtrl.grid.registerDataChangeCallback(function (grid) {
            if (!grid.options.useExternalPagination) {
              grid.options.totalItems = grid.rows.length;
            }
          }, [uiGridConstants.dataChange.ROW]);

          $scope.$on('$destroy', dataChangeDereg);

          var setShowing = function () {
            $scope.showingLow = ((options.paginationCurrentPage - 1) * options.paginationPageSize) + 1;
            $scope.showingHigh = Math.min(options.paginationCurrentPage * options.paginationPageSize, options.totalItems);
          };

          var deregT = $scope.$watch('grid.options.totalItems + grid.options.paginationPageSize', setShowing);

          var deregP = $scope.$watch('grid.options.paginationCurrentPage + grid.options.paginationPageSize', function (newValues, oldValues) {
              if (newValues === oldValues) {
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

              setShowing();
              uiGridPaginationService.onPaginationChanged($scope.grid, options.paginationCurrentPage, options.paginationPageSize);
            }
          );

          $scope.$on('$destroy', function() {
            deregT();
            deregP();
          });

          $scope.cantPageForward = function () {
            if (options.totalItems > 0) {
              return options.paginationCurrentPage >= $scope.paginationApi.getTotalPages();
            } else {
              return options.data.length < 1;
            }
          };

          $scope.cantPageToLast = function () {
            if (options.totalItems > 0) {
              return $scope.cantPageForward();
            } else {
              return true;
            }
          };

          $scope.cantPageBackward = function () {
            return options.paginationCurrentPage <= 1;
          };
        }
      };
    }
  ]);
})();

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
               * @name columnPin
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
        //default option to true unless it was explicitly set to false
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

      },

      pinningColumnBuilder: function (colDef, col, gridOptions) {
        //default to true unless gridOptions or colDef is explicitly false

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
            service.pinColumn(this.context.col.grid, this.context.col, uiGridPinningConstants.container.UNPIN);
          }
        };

        if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.pinLeft')) {
          col.menuItems.push(pinColumnLeftAction);
        }
        if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.pinRight')) {
          col.menuItems.push(pinColumnRightAction);
        }
        if (!gridUtil.arrayContainsObjectWithProperty(col.menuItems, 'name', 'ui.grid.pinning.unpin')) {
          col.menuItems.push(removePinAction);
        }
      },

      pinColumn: function(grid, col, container) {
        if (container === uiGridPinningConstants.container.NONE) {
          col.renderContainer = null;
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

(function(){
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

  module.service('uiGridResizeColumnsService', ['gridUtil', '$q', '$timeout',
    function (gridUtil, $q, $timeout) {

      var service = {
        defaultGridOptions: function(gridOptions){
          //default option to true unless it was explicitly set to false
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

          //legacy support
          //use old name if it is explicitly false
          if (gridOptions.enableColumnResize === false){
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
          //default to true unless gridOptions or colDef is explicitly false
          colDef.enableColumnResizing = colDef.enableColumnResizing === undefined ? gridOptions.enableColumnResizing : colDef.enableColumnResizing;


          //legacy support of old option name
          if (colDef.enableColumnResize === false){
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
                 *      gridApi.colResizable.on.columnSizeChanged(scope,function(colDef, deltaChange){})
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
          $timeout(function () {
            if ( grid.api.colResizable ){
              grid.api.colResizable.raise.columnSizeChanged(colDef, deltaChange);
            } else {
              gridUtil.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.");
            }
          });
        },

        // get either this column, or the column next to this column, to resize,
        // returns the column we're going to resize
        findTargetCol: function(col, position, rtlMultiplier){
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

      return service;

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
  module.directive('uiGridHeaderCell', ['gridUtil', '$templateCache', '$compile', '$q', 'uiGridResizeColumnsService', 'uiGridConstants', '$timeout', function (gridUtil, $templateCache, $compile, $q, uiGridResizeColumnsService, uiGridConstants, $timeout) {
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
              //when in RTL mode reverse the direction using the rtlMultiplier and change the position to left
              if (grid.isRTL()) {
                $scope.position = 'left';
                rtlMultiplier = -1;
              }

              var displayResizers = function(){

                // remove any existing resizers.
                var resizers = $elm[0].getElementsByClassName('ui-grid-column-resizer');
                for ( var i = 0; i < resizers.length; i++ ){
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

              var waitDisplay = function(){
                $timeout(displayResizers);
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

    var resizer = {
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

        //when in RTL mode reverse the direction using the rtlMultiplier and change the position to left
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
        function constrainWidth(col, width){
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


        function upFunction(event, args) {
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
          if ( event.type === 'touchstart' ){
            $document.on('touchend', upFunction);
            $document.on('touchmove', moveFunction);
            $elm.off('mousedown', downFunction);
          } else {
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
        var dblClickFn = function(event, args){
          event.stopPropagation();

          var col = uiGridResizeColumnsService.findTargetCol($scope.col, $scope.position, rtlMultiplier);

          // Don't resize if it's disabled on this column
          if (col.colDef.enableColumnResizing === false) {
            return;
          }

          // Go through the rendered rows and find out the max size for the data in this column
          var maxWidth = 0;
          var xDiff = 0;

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
                  xDiff = maxWidth - width;
                }
              });
            });

          // check we're not outside the allowable bounds for this column
          col.width = constrainWidth(col, maxWidth);

          refreshCanvas(xDiff);

          uiGridResizeColumnsService.fireColumnSizeChanged(uiGridCtrl.grid, col.colDef, xDiff);        };
        $elm.on('dblclick', dblClickFn);

        $elm.on('$destroy', function() {
          $elm.off('dblclick', dblClickFn);
          offAllEvents();
        });
      }
    };

    return resizer;
  }]);

})();

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
                 *      gridApi.rowEdit.on.saveRow(scope,function(rowEntity){})
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
                 * to be dirty.  note that if you have only just inserted the
                 * rows into your data you will need to wait for a $digest cycle
                 * before the gridRows are present - so often you would wrap this
                 * call in a $interval or $timeout
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

            if ( gridRow.rowEditSavePromise ){
              // don't save the row again if it's already saving - that causes stale object exceptions
              return gridRow.rowEditSavePromise;
            }

            var promise = grid.api.rowEdit.raise.saveRow( gridRow.entity );

            if ( gridRow.rowEditSavePromise ){
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

            if (!grid.rowEdit.errorRows){
              grid.rowEdit.errorRows = [];
            }
            if (!service.isRowPresent( grid.rowEdit.errorRows, gridRow ) ){
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
        removeRow: function( rowArray, removeGridRow ){
          if (typeof(rowArray) === 'undefined' || rowArray === null){
            return;
          }

          rowArray.forEach( function( gridRow, index ){
            if ( gridRow.uid === removeGridRow.uid ){
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
        isRowPresent: function( rowArray, removeGridRow ){
          var present = false;
          rowArray.forEach( function( gridRow, index ){
            if ( gridRow.uid === removeGridRow.uid ){
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
        flushDirtyRows: function(grid){
          var promises = [];
          grid.rowEdit.dirtyRows.forEach( function( gridRow ){
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
        endEditCell: function( rowEntity, colDef, newValue, previousValue ){
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ){ gridUtil.logError( 'Unable to find rowEntity in grid data, dirty flag cannot be set' ); return; }

          if ( newValue !== previousValue || gridRow.isDirty ){
            if ( !grid.rowEdit.dirtyRows ){
              grid.rowEdit.dirtyRows = [];
            }

            if ( !gridRow.isDirty ){
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
        beginEditCell: function( rowEntity, colDef ){
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ){ gridUtil.logError( 'Unable to find rowEntity in grid data, timer cannot be cancelled' ); return; }

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
        cancelEditCell: function( rowEntity, colDef ){
          var grid = this.grid;
          var gridRow = grid.getRow( rowEntity );
          if ( !gridRow ){ gridUtil.logError( 'Unable to find rowEntity in grid data, timer cannot be set' ); return; }

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
        navigate: function( newRowCol, oldRowCol ){
          var grid = this.grid;
          if ( newRowCol.row.rowEditSaveTimer ){
            service.cancelTimer( grid, newRowCol.row );
          }

          if ( oldRowCol && oldRowCol.row && oldRowCol.row !== newRowCol.row ){
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
        considerSetTimer: function( grid, gridRow ){
          service.cancelTimer( grid, gridRow );

          if ( gridRow.isDirty && !gridRow.isSaving ){
            if ( grid.options.rowEditWaitInterval !== -1 ){
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
        cancelTimer: function( grid, gridRow ){
          if ( gridRow.rowEditSaveTimer && !gridRow.isSaving ){
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
          myDataRows.forEach( function( value, index ){
            gridRow = grid.getRow( value );
            if ( gridRow ){
              if ( !grid.rowEdit.dirtyRows ){
                grid.rowEdit.dirtyRows = [];
              }

              if ( !gridRow.isDirty ){
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

          myDataRows.forEach( function( value, index ){
            gridRow = grid.getRow( value );
            if ( gridRow ){
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

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.saveState
   * @description
   *
   * # ui.grid.saveState
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides the ability to save the grid state, and restore
   * it when the user returns to the page.
   *
   * No UI is provided, the caller should provide their own UI/buttons
   * as appropriate. Usually the navigate events would be used to save
   * the grid state and restore it.
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.save-state"></div>
   */

  var module = angular.module('ui.grid.saveState', ['ui.grid', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.treeView']);

  /**
   *  @ngdoc object
   *  @name ui.grid.saveState.constant:uiGridSaveStateConstants
   *
   *  @description constants available in save state module
   */

  module.constant('uiGridSaveStateConstants', {
    featureName: 'saveState'
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.saveState.service:uiGridSaveStateService
   *
   *  @description Services for saveState feature
   */
  module.service('uiGridSaveStateService', ['$q', 'uiGridSaveStateConstants', 'gridUtil', '$compile', '$interval', 'uiGridConstants',
    function ($q, uiGridSaveStateConstants, gridUtil, $compile, $interval, uiGridConstants ) {

      var service = {

        initializeGrid: function (grid) {

          //add feature namespace and any properties to grid for needed state
          grid.saveState = {};
          this.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.saveState.api:PublicApi
           *
           *  @description Public Api for saveState feature
           */
          var publicApi = {
            events: {
              saveState: {
              }
            },
            methods: {
              saveState: {
                /**
                 * @ngdoc function
                 * @name save
                 * @methodOf  ui.grid.saveState.api:PublicApi
                 * @description Packages the current state of the grid into
                 * an object, and provides it to the user for saving
                 * @returns {object} the state as a javascript object that can be saved
                 */
                save: function () {
                  return service.save(grid);
                },
                /**
                 * @ngdoc function
                 * @name restore
                 * @methodOf  ui.grid.saveState.api:PublicApi
                 * @description Restores the provided state into the grid
                 * @param {scope} $scope a scope that we can broadcast on
                 * @param {object} state the state that should be restored into the grid
                 */
                restore: function ( $scope, state) {
                  service.restore(grid, $scope, state);
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);

          grid.api.registerMethodsFromObject(publicApi.methods);

        },

        defaultGridOptions: function (gridOptions) {
          //default option to true unless it was explicitly set to false
          /**
           * @ngdoc object
           * @name ui.grid.saveState.api:GridOptions
           *
           * @description GridOptions for saveState feature, these are available to be
           * set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */
          /**
           * @ngdoc object
           * @name saveWidths
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the current column widths.  Note that unless
           * you've provided the user with some way to resize their columns (say
           * the resize columns feature), then this makes little sense.
           * <br/>Defaults to true
           */
          gridOptions.saveWidths = gridOptions.saveWidths !== false;
          /**
           * @ngdoc object
           * @name saveOrder
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Restore the current column order.  Note that unless
           * you've provided the user with some way to reorder their columns (for
           * example the move columns feature), this makes little sense.
           * <br/>Defaults to true
           */
          gridOptions.saveOrder = gridOptions.saveOrder !== false;
          /**
           * @ngdoc object
           * @name saveScroll
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the current scroll position.  Note that this
           * is saved as the percentage of the grid scrolled - so if your
           * user returns to a grid with a significantly different number of
           * rows (perhaps some data has been deleted) then the scroll won't
           * actually show the same rows as before.  If you want to scroll to
           * a specific row then you should instead use the saveFocus option, which
           * is the default.
           *
           * Note that this element will only be saved if the cellNav feature is
           * enabled
           * <br/>Defaults to false
           */
          gridOptions.saveScroll = gridOptions.saveScroll === true;
          /**
           * @ngdoc object
           * @name saveFocus
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the current focused cell.  On returning
           * to this focused cell we'll also scroll.  This option is
           * preferred to the saveScroll option, so is set to true by
           * default.  If saveScroll is set to true then this option will
           * be disabled.
           *
           * By default this option saves the current row number and column
           * number, and returns to that row and column.  However, if you define
           * a saveRowIdentity function, then it will return you to the currently
           * selected column within that row (in a business sense - so if some
           * rows have been deleted, it will still find the same data, presuming it
           * still exists in the list.  If it isn't in the list then it will instead
           * return to the same row number - i.e. scroll percentage)
           *
           * Note that this option will do nothing if the cellNav
           * feature is not enabled.
           *
           * <br/>Defaults to true (unless saveScroll is true)
           */
          gridOptions.saveFocus = gridOptions.saveScroll !== true && gridOptions.saveFocus !== false;
          /**
           * @ngdoc object
           * @name saveRowIdentity
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description A function that can be called, passing in a rowEntity,
           * and that will return a unique id for that row.  This might simply
           * return the `id` field from that row (if you have one), or it might
           * concatenate some fields within the row to make a unique value.
           *
           * This value will be used to find the same row again and set the focus
           * to it, if it exists when we return.
           *
           * <br/>Defaults to undefined
           */
          /**
           * @ngdoc object
           * @name saveVisible
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save whether or not columns are visible.
           *
           * <br/>Defaults to true
           */
          gridOptions.saveVisible = gridOptions.saveVisible !== false;
          /**
           * @ngdoc object
           * @name saveSort
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the current sort state for each column
           *
           * <br/>Defaults to true
           */
          gridOptions.saveSort = gridOptions.saveSort !== false;
          /**
           * @ngdoc object
           * @name saveFilter
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the current filter state for each column
           *
           * <br/>Defaults to true
           */
          gridOptions.saveFilter = gridOptions.saveFilter !== false;
          /**
           * @ngdoc object
           * @name saveSelection
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the currently selected rows.  If the `saveRowIdentity` callback
           * is defined, then it will save the id of the row and select that.  If not, then
           * it will attempt to select the rows by row number, which will give the wrong results
           * if the data set has changed in the mean-time.
           *
           * Note that this option only does anything
           * if the selection feature is enabled.
           *
           * <br/>Defaults to true
           */
          gridOptions.saveSelection = gridOptions.saveSelection !== false;
          /**
           * @ngdoc object
           * @name saveGrouping
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the grouping configuration.  If set to true and the
           * grouping feature is not enabled then does nothing.
           *
           * <br/>Defaults to true
           */
          gridOptions.saveGrouping = gridOptions.saveGrouping !== false;
          /**
           * @ngdoc object
           * @name saveGroupingExpandedStates
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the grouping row expanded states.  If set to true and the
           * grouping feature is not enabled then does nothing.
           *
           * This can be quite a bit of data, in many cases you wouldn't want to save this
           * information.
           *
           * <br/>Defaults to false
           */
          gridOptions.saveGroupingExpandedStates = gridOptions.saveGroupingExpandedStates === true;
          /**
           * @ngdoc object
           * @name savePinning
           * @propertyOf ui.grid.saveState.api:GridOptions
           * @description Save pinning state for columns.
           *
           * <br/>Defaults to true
           */
          gridOptions.savePinning = gridOptions.savePinning !== false;
          /**
           * @ngdoc object
           * @name saveTreeView
           * @propertyOf  ui.grid.saveState.api:GridOptions
           * @description Save the treeView configuration.  If set to true and the
           * treeView feature is not enabled then does nothing.
           *
           * <br/>Defaults to true
           */
          gridOptions.saveTreeView = gridOptions.saveTreeView !== false;
        },



        /**
         * @ngdoc function
         * @name save
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the current grid state into an object, and
         * passes that object back to the caller
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {object} the state ready to be saved
         */
        save: function (grid) {
          var savedState = {};

          savedState.columns = service.saveColumns( grid );
          savedState.scrollFocus = service.saveScrollFocus( grid );
          savedState.selection = service.saveSelection( grid );
          savedState.grouping = service.saveGrouping( grid );
          savedState.treeView = service.saveTreeView( grid );

          return savedState;
        },


        /**
         * @ngdoc function
         * @name restore
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Applies the provided state to the grid
         *
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {scope} $scope a scope that we can broadcast on
         * @param {object} state the state we'd like to restore
         */
        restore: function( grid, $scope, state ){
          if ( state.columns ) {
            service.restoreColumns( grid, state.columns );
          }

          if ( state.scrollFocus ){
            service.restoreScrollFocus( grid, $scope, state.scrollFocus );
          }

          if ( state.selection ){
            service.restoreSelection( grid, state.selection );
          }

          if ( state.grouping ){
            service.restoreGrouping( grid, state.grouping );
          }

          if ( state.treeView ){
            service.restoreTreeView( grid, state.treeView );
          }

          grid.refresh();
        },


        /**
         * @ngdoc function
         * @name saveColumns
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the column setup, including sort, filters, ordering,
         * pinning and column widths.
         *
         * Works through the current columns, storing them in order.  Stores the
         * column name, then the visible flag, width, sort and filters for each column.
         *
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {array} the columns state ready to be saved
         */
        saveColumns: function( grid ) {
          var columns = [];
          grid.getOnlyDataColumns().forEach( function( column ) {
            var savedColumn = {};
            savedColumn.name = column.name;

            if ( grid.options.saveVisible ){
              savedColumn.visible = column.visible;
            }

            if ( grid.options.saveWidths ){
              savedColumn.width = column.width;
            }

            // these two must be copied, not just pointed too - otherwise our saved state is pointing to the same object as current state
            if ( grid.options.saveSort ){
              savedColumn.sort = angular.copy( column.sort );
            }

            if ( grid.options.saveFilter ){
              savedColumn.filters = [];
              column.filters.forEach( function( filter ){
                var copiedFilter = {};
                angular.forEach( filter, function( value, key) {
                  if ( key !== 'condition' && key !== '$$hashKey' && key !== 'placeholder'){
                    copiedFilter[key] = value;
                  }
                });
                savedColumn.filters.push(copiedFilter);
              });
            }

            if ( !!grid.api.pinning && grid.options.savePinning ){
              savedColumn.pinned = column.renderContainer ? column.renderContainer : '';
            }

            columns.push( savedColumn );
          });

          return columns;
        },


        /**
         * @ngdoc function
         * @name saveScrollFocus
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the currently scroll or focus.
         *
         * If cellNav isn't present then does nothing - we can't return
         * to the scroll position without cellNav anyway.
         *
         * If the cellNav module is present, and saveFocus is true, then
         * it saves the currently focused cell.  If rowIdentity is present
         * then saves using rowIdentity, otherwise saves visibleRowNum.
         *
         * If the cellNav module is not present, and saveScroll is true, then
         * it approximates the current scroll row and column, and saves that.
         *
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {object} the selection state ready to be saved
         */
        saveScrollFocus: function( grid ){
          if ( !grid.api.cellNav ){
            return {};
          }

          var scrollFocus = {};
          if ( grid.options.saveFocus ){
            scrollFocus.focus = true;
            var rowCol = grid.api.cellNav.getFocusedCell();
            if ( rowCol !== null ) {
              if ( rowCol.col !== null ){
                scrollFocus.colName = rowCol.col.colDef.name;
              }
              if ( rowCol.row !== null ){
                scrollFocus.rowVal = service.getRowVal( grid, rowCol.row );
              }
            }
          }

          if ( grid.options.saveScroll || grid.options.saveFocus && !scrollFocus.colName && !scrollFocus.rowVal ) {
            scrollFocus.focus = false;
            if ( grid.renderContainers.body.prevRowScrollIndex ){
              scrollFocus.rowVal = service.getRowVal( grid, grid.renderContainers.body.visibleRowCache[ grid.renderContainers.body.prevRowScrollIndex ]);
            }

            if ( grid.renderContainers.body.prevColScrollIndex ){
              scrollFocus.colName = grid.renderContainers.body.visibleColumnCache[ grid.renderContainers.body.prevColScrollIndex ].name;
            }
          }

          return scrollFocus;
        },


        /**
         * @ngdoc function
         * @name saveSelection
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the currently selected rows, if the selection feature is enabled
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {array} the selection state ready to be saved
         */
        saveSelection: function( grid ){
          if ( !grid.api.selection || !grid.options.saveSelection ){
            return [];
          }

          var selection = grid.api.selection.getSelectedGridRows().map( function( gridRow ) {
            return service.getRowVal( grid, gridRow );
          });

          return selection;
        },


        /**
         * @ngdoc function
         * @name saveGrouping
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the grouping state, if the grouping feature is enabled
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {object} the grouping state ready to be saved
         */
        saveGrouping: function( grid ){
          if ( !grid.api.grouping || !grid.options.saveGrouping ){
            return {};
          }

          return grid.api.grouping.getGrouping( grid.options.saveGroupingExpandedStates );
        },


        /**
         * @ngdoc function
         * @name saveTreeView
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Saves the tree view state, if the tree feature is enabled
         * @param {Grid} grid the grid whose state we'd like to save
         * @returns {object} the tree view state ready to be saved
         */
        saveTreeView: function( grid ){
          if ( !grid.api.treeView || !grid.options.saveTreeView ){
            return {};
          }

          return grid.api.treeView.getTreeView();
        },


        /**
         * @ngdoc function
         * @name getRowVal
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Helper function that gets either the rowNum or
         * the saveRowIdentity, given a gridRow
         * @param {Grid} grid the grid the row is in
         * @param {GridRow} gridRow the row we want the rowNum for
         * @returns {object} an object containing { identity: true/false, row: rowNumber/rowIdentity }
         *
         */
        getRowVal: function( grid, gridRow ){
          if ( !gridRow ) {
            return null;
          }

          var rowVal = {};
          if ( grid.options.saveRowIdentity ){
            rowVal.identity = true;
            rowVal.row = grid.options.saveRowIdentity( gridRow.entity );
          } else {
            rowVal.identity = false;
            rowVal.row = grid.renderContainers.body.visibleRowCache.indexOf( gridRow );
          }
          return rowVal;
        },


        /**
         * @ngdoc function
         * @name restoreColumns
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Restores the columns, including order, visible, width,
         * pinning, sort and filters.
         *
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {object} columnsState the list of columns we had before, with their state
         */
        restoreColumns: function( grid, columnsState ){
          var isSortChanged = false;

          columnsState.forEach( function( columnState, index ) {
            var currentCol = grid.getColumn( columnState.name );

            if ( currentCol && !grid.isRowHeaderColumn(currentCol) ){
              if ( grid.options.saveVisible &&
                   ( currentCol.visible !== columnState.visible ||
                     currentCol.colDef.visible !== columnState.visible ) ){
                currentCol.visible = columnState.visible;
                currentCol.colDef.visible = columnState.visible;
                grid.api.core.raise.columnVisibilityChanged(currentCol);
              }

              if ( grid.options.saveWidths ){
                currentCol.width = columnState.width;
              }

              if ( grid.options.saveSort &&
                   !angular.equals(currentCol.sort, columnState.sort) &&
                   !( currentCol.sort === undefined && angular.isEmpty(columnState.sort) ) ){
                currentCol.sort = angular.copy( columnState.sort );
                isSortChanged = true;
              }

              if ( grid.options.saveFilter &&
                   !angular.equals(currentCol.filters, columnState.filters ) ){
                columnState.filters.forEach( function( filter, index ){
                  angular.extend( currentCol.filters[index], filter );
                  if ( typeof(filter.term) === 'undefined' || filter.term === null ){
                    delete currentCol.filters[index].term;
                  }
                });
                grid.api.core.raise.filterChanged();
              }

              if ( !!grid.api.pinning && grid.options.savePinning && currentCol.renderContainer !== columnState.pinned ){
                grid.api.pinning.pinColumn(currentCol, columnState.pinned);
              }

              var currentIndex = grid.getOnlyDataColumns().indexOf( currentCol );
              if (currentIndex !== -1) {
                if (grid.options.saveOrder && currentIndex !== index) {
                  var column = grid.columns.splice(currentIndex + grid.rowHeaderColumns.length, 1)[0];
                  grid.columns.splice(index + grid.rowHeaderColumns.length, 0, column);
                }
              }
            }
          });

          if ( isSortChanged ) {
            grid.api.core.raise.sortChanged( grid, grid.getColumnSorting() );
          }
        },


        /**
         * @ngdoc function
         * @name restoreScrollFocus
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Scrolls to the position that was saved.  If focus is true, then
         * sets focus to the specified row/col.  If focus is false, then scrolls to the
         * specified row/col.
         *
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {scope} $scope a scope that we can broadcast on
         * @param {object} scrollFocusState the scroll/focus state ready to be restored
         */
        restoreScrollFocus: function( grid, $scope, scrollFocusState ){
          if ( !grid.api.cellNav ){
            return;
          }

          var colDef, row;
          if ( scrollFocusState.colName ){
            var colDefs = grid.options.columnDefs.filter( function( colDef ) { return colDef.name === scrollFocusState.colName; });
            if ( colDefs.length > 0 ){
              colDef = colDefs[0];
            }
          }

          if ( scrollFocusState.rowVal && scrollFocusState.rowVal.row ){
            if ( scrollFocusState.rowVal.identity ){
              row = service.findRowByIdentity( grid, scrollFocusState.rowVal );
            } else {
              row = grid.renderContainers.body.visibleRowCache[ scrollFocusState.rowVal.row ];
            }
          }

          var entity = row && row.entity ? row.entity : null ;

          if ( colDef || entity ) {
            if (scrollFocusState.focus ){
              grid.api.cellNav.scrollToFocus( entity, colDef );
            } else {
              grid.scrollTo( entity, colDef );
            }
          }
        },


        /**
         * @ngdoc function
         * @name restoreSelection
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Selects the rows that are provided in the selection
         * state.  If you are using `saveRowIdentity` and more than one row matches the identity
         * function then only the first is selected.
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {object} selectionState the selection state ready to be restored
         */
        restoreSelection: function( grid, selectionState ){
          if ( !grid.api.selection ){
            return;
          }

          grid.api.selection.clearSelectedRows();

          selectionState.forEach(  function( rowVal ) {
            if ( rowVal.identity ){
              var foundRow = service.findRowByIdentity( grid, rowVal );

              if ( foundRow ){
                grid.api.selection.selectRow( foundRow.entity );
              }

            } else {
              grid.api.selection.selectRowByVisibleIndex( rowVal.row );
            }
          });
        },


        /**
         * @ngdoc function
         * @name restoreGrouping
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Restores the grouping configuration, if the grouping feature
         * is enabled.
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {object} groupingState the grouping state ready to be restored
         */
        restoreGrouping: function( grid, groupingState ){
          if ( !grid.api.grouping || typeof(groupingState) === 'undefined' || groupingState === null || angular.equals(groupingState, {}) ){
            return;
          }

          grid.api.grouping.setGrouping( groupingState );
        },

        /**
         * @ngdoc function
         * @name restoreTreeView
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Restores the tree view configuration, if the tree view feature
         * is enabled.
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {object} treeViewState the tree view state ready to be restored
         */
        restoreTreeView: function( grid, treeViewState ){
          if ( !grid.api.treeView || typeof(treeViewState) === 'undefined' || treeViewState === null || angular.equals(treeViewState, {}) ){
            return;
          }

          grid.api.treeView.setTreeView( treeViewState );
        },

        /**
         * @ngdoc function
         * @name findRowByIdentity
         * @methodOf  ui.grid.saveState.service:uiGridSaveStateService
         * @description Finds a row given it's identity value, returns the first found row
         * if any are found, otherwise returns null if no rows are found.
         * @param {Grid} grid the grid whose state we'd like to restore
         * @param {object} rowVal the row we'd like to find
         * @returns {gridRow} the found row, or null if none found
         */
        findRowByIdentity: function( grid, rowVal ){
          if ( !grid.options.saveRowIdentity ){
            return null;
          }

          var filteredRows = grid.rows.filter( function( gridRow ) {
            if ( grid.options.saveRowIdentity( gridRow.entity ) === rowVal.row ){
              return true;
            } else {
              return false;
            }
          });

          if ( filteredRows.length > 0 ){
            return filteredRows[0];
          } else {
            return null;
          }
        }
      };

      return service;

    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.saveState.directive:uiGridSaveState
   *  @element div
   *  @restrict A
   *
   *  @description Adds saveState features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.saveState']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
        { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.gridOptions = {
        columnDefs: [
          {name: 'name'},
          {name: 'title', enableCellEdit: true}
        ],
        data: $scope.data
      };
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="gridOptions" ui-grid-save-state></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridSaveState', ['uiGridSaveStateConstants', 'uiGridSaveStateService', 'gridUtil', '$compile',
    function (uiGridSaveStateConstants, uiGridSaveStateService, gridUtil, $compile) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          uiGridSaveStateService.initializeGrid(uiGridCtrl.grid);
        }
      };
    }
  ]);
})();

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
    featureName: "selection",
    selectionRowHeaderColName: 'selectionRowHeaderCol'
  });

  //add methods to GridRow
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('GridRow', ['$delegate', function($delegate) {

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
       *  @description Selected state of row.  Should be readonly. Make any changes to selected state using setSelected().
       *  <br/>Defaults to false
       */


        /**
         * @ngdoc function
         * @name setSelected
         * @methodOf ui.grid.selection.api:GridRow
         * @description Sets the isSelected property and updates the selectedCount
         * Changes to isSelected state should only be made via this function
         * @param {bool} selected value to set
         */
        $delegate.prototype.setSelected = function(selected) {
          this.isSelected = selected;
          if (selected) {
            this.grid.selection.selectedCount++;
          }
          else {
            this.grid.selection.selectedCount--;
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
  module.service('uiGridSelectionService', ['$q', '$templateCache', 'uiGridSelectionConstants', 'gridUtil',
    function ($q, $templateCache, uiGridSelectionConstants, gridUtil) {

      var service = {

        initializeGrid: function (grid) {

          //add feature namespace and any properties to grid for needed
          /**
           *  @ngdoc object
           *  @name ui.grid.selection.grid:selection
           *
           *  @description Grid properties and functions added for selection
           */
          grid.selection = {};
          grid.selection.lastSelectedRow = null;
          grid.selection.selectAll = false;


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
                 * @name rowSelectionChanged
                 * @eventOf  ui.grid.selection.api:PublicApi
                 * @description  is raised after the row.isSelected state is changed
                 * @param {GridRow} row the row that was selected/deselected
                 * @param {Event} event object if raised from an event
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
                 * @param {array} rows the rows that were selected/deselected
                 * @param {Event} event object if raised from an event
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
                 * @param {Event} event object if raised from an event
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
                 * @param {Event} event object if raised from an event
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
                 * @param {number} index index within the rowsVisible array
                 * @param {Event} event object if raised from an event
                 */
                selectRowByVisibleIndex: function ( rowNum, evt ) {
                  var row = grid.renderContainers.body.visibleRowCache[rowNum];
                  if (row !== null && typeof(row) !== 'undefined' && !row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name unSelectRow
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description UnSelect the data row
                 * @param {object} rowEntity gridOptions.data[] array instance
                 * @param {Event} event object if raised from an event
                 */
                unSelectRow: function (rowEntity, evt) {
                  var row = grid.getRow(rowEntity);
                  if (row !== null && row.isSelected) {
                    service.toggleRowSelection(grid, row, evt, grid.options.multiSelect, grid.options.noUnselect);
                  }
                },
                /**
                 * @ngdoc function
                 * @name selectAllRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Selects all rows.  Does nothing if multiSelect = false
                 * @param {Event} event object if raised from an event
                 */
                selectAllRows: function (evt) {
                  if (grid.options.multiSelect === false) {
                    return;
                  }

                  var changedRows = [];
                  grid.rows.forEach(function (row) {
                    if ( !row.isSelected && row.enableSelection !== false ){
                      row.setSelected(true);
                      service.decideRaiseSelectionEvent( grid, row, changedRows, evt );
                    }
                  });
                  service.decideRaiseSelectionBatchEvent( grid, changedRows, evt );
                  grid.selection.selectAll = true;
                },
                /**
                 * @ngdoc function
                 * @name selectAllVisibleRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Selects all visible rows.  Does nothing if multiSelect = false
                 * @param {Event} event object if raised from an event
                 */
                selectAllVisibleRows: function (evt) {
                  if (grid.options.multiSelect === false) {
                    return;
                  }

                  var changedRows = [];
                  grid.rows.forEach(function (row) {
                    if (row.visible) {
                      if (!row.isSelected && row.enableSelection !== false){
                        row.setSelected(true);
                        service.decideRaiseSelectionEvent( grid, row, changedRows, evt );
                      }
                    } else {
                      if (row.isSelected){
                        row.setSelected(false);
                        service.decideRaiseSelectionEvent( grid, row, changedRows, evt );
                      }
                    }
                  });
                  service.decideRaiseSelectionBatchEvent( grid, changedRows, evt );
                  grid.selection.selectAll = true;
                },
                /**
                 * @ngdoc function
                 * @name clearSelectedRows
                 * @methodOf  ui.grid.selection.api:PublicApi
                 * @description Unselects all rows
                 * @param {Event} event object if raised from an event
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
          //default option to true unless it was explicitly set to false
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
           *  false if `enableRowHeaderSelection` is true, otherwise defaults to false.
           */
          if ( typeof(gridOptions.enableFullRowSelection) === 'undefined' ){
            gridOptions.enableFullRowSelection = !gridOptions.enableRowHeaderSelection;
          }
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
         * @param {Event} event object if resulting from event
         * @param {bool} multiSelect if false, only one row at time can be selected
         * @param {bool} noUnselect if true then rows cannot be unselected
         */
        toggleRowSelection: function (grid, row, evt, multiSelect, noUnselect) {
          var selected = row.isSelected;

          if ( row.enableSelection === false && !selected ){
            return;
          }

          if (!multiSelect && !selected) {
            service.clearSelectedRows(grid, evt);
          } else if (!multiSelect && selected) {
            var selectedRows = service.getSelectedRows(grid);
            if (selectedRows.length > 1) {
              selected = false; // Enable reselect of the row
              service.clearSelectedRows(grid, evt);
            }
          }

          if (selected && noUnselect){
            // don't deselect the row
          } else {
            row.setSelected(!selected);
            if (row.isSelected === true) {
              grid.selection.lastSelectedRow = row;
            } else {
              grid.selection.selectAll = false;
            }
            grid.api.selection.raise.rowSelectionChanged(row, evt);
          }
        },
        /**
         * @ngdoc function
         * @name shiftSelect
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description selects a group of rows from the last selected row using the shift key
         * @param {Grid} grid grid object
         * @param {GridRow} clicked row
         * @param {Event} event object if raised from an event
         * @param {bool} multiSelect if false, does nothing this is for multiSelect only
         */
        shiftSelect: function (grid, row, evt, multiSelect) {
          if (!multiSelect) {
            return;
          }
          var selectedRows = service.getSelectedRows(grid);
          var fromRow = selectedRows.length > 0 ? grid.renderContainers.body.visibleRowCache.indexOf(grid.selection.lastSelectedRow) : 0;
          var toRow = grid.renderContainers.body.visibleRowCache.indexOf(row);
          //reverse select direction
          if (fromRow > toRow) {
            var tmp = fromRow;
            fromRow = toRow;
            toRow = tmp;
          }

          var changedRows = [];
          for (var i = fromRow; i <= toRow; i++) {
            var rowToSelect = grid.renderContainers.body.visibleRowCache[i];
            if (rowToSelect) {
              if ( !rowToSelect.isSelected && rowToSelect.enableSelection !== false ){
                rowToSelect.setSelected(true);
                grid.selection.lastSelectedRow = rowToSelect;
                service.decideRaiseSelectionEvent( grid, rowToSelect, changedRows, evt );
              }
            }
          }
          service.decideRaiseSelectionBatchEvent( grid, changedRows, evt );
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
         * @param {Event} event object if raised from an event
         */
        clearSelectedRows: function (grid, evt) {
          var changedRows = [];
          service.getSelectedRows(grid).forEach(function (row) {
            if ( row.isSelected ){
              row.setSelected(false);
              service.decideRaiseSelectionEvent( grid, row, changedRows, evt );
            }
          });
          service.decideRaiseSelectionBatchEvent( grid, changedRows, evt );
          grid.selection.selectAll = false;
        },

        /**
         * @ngdoc function
         * @name decideRaiseSelectionEvent
         * @methodOf  ui.grid.selection.service:uiGridSelectionService
         * @description Decides whether to raise a single event or a batch event
         * @param {Grid} grid grid object
         * @param {GridRow} row row that has changed
         * @param {array} changedRows an array to which we can append the changed
         * @param {Event} event object if raised from an event
         * row if we're doing batch events
         */
        decideRaiseSelectionEvent: function( grid, row, changedRows, evt ){
          if ( !grid.options.enableSelectionBatchEvent ){
            grid.api.selection.raise.rowSelectionChanged(row, evt);
          } else {
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
         * @param {Event} event object if raised from an event
         * if we're doing batch events
         */
        decideRaiseSelectionBatchEvent: function( grid, changedRows, evt ){
          if ( changedRows.length > 0 ){
            grid.api.selection.raise.rowSelectionChangedBatch(changedRows, evt);
          }
        }
      };

      return service;

    }]);

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
  module.directive('uiGridSelection', ['uiGridSelectionConstants', 'uiGridSelectionService', '$templateCache', 'uiGridConstants',
    function (uiGridSelectionConstants, uiGridSelectionService, $templateCache, uiGridConstants) {
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
                  width:  uiGridCtrl.grid.options.selectionRowHeaderWidth,
                  minWidth: 10,
                  cellTemplate: 'ui-grid/selectionRowHeader',
                  headerCellTemplate: 'ui-grid/selectionHeaderCell',
                  enableColumnResizing: false,
                  enableColumnMenu: false,
                  exporterSuppressExport: true,
                  allowCellFocus: true
                };

                uiGridCtrl.grid.addRowHeaderColumn(selectionRowHeaderDef);
              }

              var processorSet = false;

              var processSelectableRows = function( rows ){
                rows.forEach(function(row){
                  row.enableSelection = uiGridCtrl.grid.options.isRowSelectable(row);
                });
                return rows;
              };

              var updateOptions = function(){
                if (uiGridCtrl.grid.options.isRowSelectable !== angular.noop && processorSet !== true) {
                  uiGridCtrl.grid.registerRowsProcessor(processSelectableRows, 500);
                  processorSet = true;
                }
              };

              updateOptions();

              var dataChangeDereg = uiGridCtrl.grid.registerDataChangeCallback( updateOptions, [uiGridConstants.dataChange.OPTIONS] );

              $scope.$on( '$destroy', dataChangeDereg);
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
        link: function($scope, $elm, $attrs, uiGridCtrl) {
          var self = uiGridCtrl.grid;
          $scope.selectButtonClick = selectButtonClick;

          // On IE, prevent mousedowns on the select button from starting a selection.
          //   If this is not done and you shift+click on another row, the browser will select a big chunk of text
          if (gridUtil.detectBrowser() === 'ie') {
            $elm.on('mousedown', selectButtonMouseDown);
          }


          function selectButtonClick(row, evt) {
            evt.stopPropagation();

            if (evt.shiftKey) {
              uiGridSelectionService.shiftSelect(self, row, evt, self.options.multiSelect);
            }
            else if (evt.ctrlKey || evt.metaKey) {
              uiGridSelectionService.toggleRowSelection(self, row, evt, self.options.multiSelect, self.options.noUnselect);
            }
            else {
              uiGridSelectionService.toggleRowSelection(self, row, evt, (self.options.multiSelect && !self.options.modifierKeysToMultiSelect), self.options.noUnselect);
            }
          }

          function selectButtonMouseDown(evt) {
            if (evt.ctrlKey || evt.shiftKey) {
              evt.target.onselectstart = function () { return false; };
              window.setTimeout(function () { evt.target.onselectstart = null; }, 0);
            }
          }
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
        link: function($scope, $elm, $attrs, uiGridCtrl) {
          var self = $scope.col.grid;

          $scope.headerButtonClick = function(row, evt) {
            if ( self.selection.selectAll ){
              uiGridSelectionService.clearSelectedRows(self, evt);
              if ( self.options.noUnselect ){
                self.api.selection.selectRowByVisibleIndex(0, evt);
              }
              self.selection.selectAll = false;
            } else {
              if ( self.options.multiSelect ){
                self.api.selection.selectAllVisibleRows(evt);
                self.selection.selectAll = true;
              }
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
    ['$compile', 'uiGridConstants', 'uiGridSelectionConstants', 'gridUtil', '$parse', 'uiGridSelectionService',
      function ($compile, uiGridConstants, uiGridSelectionConstants, gridUtil, $parse, uiGridSelectionService) {
        return {
          priority: -200, // run after default  directive
          scope: false,
          compile: function ($elm, $attrs) {
            var rowRepeatDiv = angular.element($elm.children().children()[0]);

            var existingNgClass = rowRepeatDiv.attr("ng-class");
            var newNgClass = '';
            if ( existingNgClass ) {
              newNgClass = existingNgClass.slice(0, -1) + ",'ui-grid-row-selected': row.isSelected}";
            } else {
              newNgClass = "{'ui-grid-row-selected': row.isSelected}";
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

  /**
   *  @ngdoc directive
   *  @name ui.grid.selection.directive:uiGridCell
   *  @element div
   *  @restrict A
   *
   *  @description Stacks on top of ui.grid.uiGridCell to provide selection feature
   */
  module.directive('uiGridCell',
    ['$compile', 'uiGridConstants', 'uiGridSelectionConstants', 'gridUtil', '$parse', 'uiGridSelectionService', '$timeout',
      function ($compile, uiGridConstants, uiGridSelectionConstants, gridUtil, $parse, uiGridSelectionService, $timeout) {
        return {
          priority: -200, // run after default uiGridCell directive
          restrict: 'A',
          require: '?^uiGrid',
          scope: false,
          link: function ($scope, $elm, $attrs, uiGridCtrl) {

            var touchStartTime = 0;
            var touchTimeout = 300;

            // Bind to keydown events in the render container
            if (uiGridCtrl.grid.api.cellNav) {

              uiGridCtrl.grid.api.cellNav.on.viewPortKeyDown($scope, function (evt, rowCol) {
                if (rowCol === null ||
                  rowCol.row !== $scope.row ||
                  rowCol.col !== $scope.col) {
                  return;
                }

                if (evt.keyCode === 32 && $scope.col.colDef.name === "selectionRowHeaderCol") {
                  uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt, ($scope.grid.options.multiSelect && !$scope.grid.options.modifierKeysToMultiSelect), $scope.grid.options.noUnselect);
                  $scope.$apply();
                }

              //  uiGridCellNavService.scrollToIfNecessary(uiGridCtrl.grid, rowCol.row, rowCol.col);
              });
            }

            //$elm.bind('keydown', function (evt) {
            //  if (evt.keyCode === 32 && $scope.col.colDef.name === "selectionRowHeaderCol") {
            //    uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt, ($scope.grid.options.multiSelect && !$scope.grid.options.modifierKeysToMultiSelect), $scope.grid.options.noUnselect);
            //    $scope.$apply();
            //  }
            //});

            var selectCells = function(evt){
              // if we get a click, then stop listening for touchend
              $elm.off('touchend', touchEnd);

              if (evt.shiftKey) {
                uiGridSelectionService.shiftSelect($scope.grid, $scope.row, evt, $scope.grid.options.multiSelect);
              }
              else if (evt.ctrlKey || evt.metaKey) {
                uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt, $scope.grid.options.multiSelect, $scope.grid.options.noUnselect);
              }
              else {
                uiGridSelectionService.toggleRowSelection($scope.grid, $scope.row, evt, ($scope.grid.options.multiSelect && !$scope.grid.options.modifierKeysToMultiSelect), $scope.grid.options.noUnselect);
              }
              $scope.$apply();

              // don't re-enable the touchend handler for a little while - some devices generate both, and it will
              // take a little while to move your hand from the mouse to the screen if you have both modes of input
              $timeout(function() {
                $elm.on('touchend', touchEnd);
              }, touchTimeout);
            };

            var touchStart = function(evt){
              touchStartTime = (new Date()).getTime();

              // if we get a touch event, then stop listening for click
              $elm.off('click', selectCells);
            };

            var touchEnd = function(evt) {
              var touchEndTime = (new Date()).getTime();
              var touchTime = touchEndTime - touchStartTime;

              if (touchTime < touchTimeout ) {
                // short touch
                selectCells(evt);
              }

              // don't re-enable the click handler for a little while - some devices generate both, and it will
              // take a little while to move your hand from the screen to the mouse if you have both modes of input
              $timeout(function() {
                $elm.on('click', selectCells);
              }, touchTimeout);
            };

            function registerRowSelectionEvents() {
              if ($scope.grid.options.enableRowSelection && $scope.grid.options.enableFullRowSelection) {
                $elm.addClass('ui-grid-disable-selection');
                $elm.on('touchstart', touchStart);
                $elm.on('touchend', touchEnd);
                $elm.on('click', selectCells);

                $scope.registered = true;
              }
            }

            function deregisterRowSelectionEvents() {
              if ($scope.registered){
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
            var dataChangeDereg = $scope.grid.registerDataChangeCallback( function() {
              if ( $scope.grid.options.enableRowSelection && $scope.grid.options.enableFullRowSelection &&
                !$scope.registered ){
                registerRowSelectionEvents();
              } else if ( ( !$scope.grid.options.enableRowSelection || !$scope.grid.options.enableFullRowSelection ) &&
                $scope.registered ){
                deregisterRowSelectionEvents();
              }
            }, [uiGridConstants.dataChange.OPTIONS] );

            $elm.on( '$destroy', dataChangeDereg);
          }
        };
      }]);

  module.directive('uiGridGridFooter', ['$compile', 'uiGridConstants', 'gridUtil', function ($compile, uiGridConstants, gridUtil) {
    return {
      restrict: 'EA',
      replace: true,
      priority: -1000,
      require: '^uiGrid',
      scope: true,
      compile: function ($elm, $attrs) {
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

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.treeBase
   * @description
   *
   * # ui.grid.treeBase
   *
   * <div class="alert alert-warning" role="alert"><strong>Beta</strong> This feature is ready for testing, but it either hasn't seen a lot of use or has some known bugs.</div>
   *
   * This module provides base tree handling functions that are shared by other features, notably grouping
   * and treeView.  It provides a tree view of the data, with nodes in that
   * tree and leaves.
   *
   * Design information:
   * -------------------
   *
   * The raw data that is provided must come with a $$treeLevel on any non-leaf node.  Grouping will create
   * these on all the group header rows, treeView will expect these to be set in the raw data by the user.
   * TreeBase will run a rowsProcessor that:
   *  - builds `treeBase.tree` out of the provided rows
   *  - permits a recursive sort of the tree
   *  - maintains the expand/collapse state of each node
   *  - provides the expand/collapse all button and the expand/collapse buttons
   *  - maintains the count of children for each node
   *
   * Each row is updated with a link to the tree node that represents it.  Refer {@link ui.grid.treeBase.grid:treeBase.tree tree documentation}
   * for information.
   *
   *  TreeBase adds information to the rows
   *  - treeLevel: if present and > -1 tells us the level (level 0 is the top level)
   *  - treeNode: pointer to the node in the grid.treeBase.tree that refers
   *    to this row, allowing us to manipulate the state
   *
   * Since the logic is baked into the rowsProcessors, it should get triggered whenever
   * row order or filtering or anything like that is changed.  We recall the expanded state
   * across invocations of the rowsProcessors by the reference to the treeNode on the individual
   * rows.  We rebuild the tree itself quite frequently, when we do this we use the saved treeNodes to
   * get the state, but we overwrite the other data in that treeNode.
   *
   * By default rows are collapsed, which means all data rows have their visible property
   * set to false, and only level 0 group rows are set to visible.
   *
   * We rely on the rowsProcessors to do the actual expanding and collapsing, so we set the flags we want into
   * grid.treeBase.tree, then call refresh.  This is because we can't easily change the visible
   * row cache without calling the processors, and once we've built the logic into the rowProcessors we may as
   * well use it all the time.
   *
   * Tree base provides sorting (on non-grouped columns).
   *
   * Sorting works in two passes.  The standard sorting is performed for any columns that are important to building
   * the tree (for example, any grouped columns).  Then after the tree is built, a recursive tree sort is performed
   * for the remaining sort columns (including the original sort) - these columns are sorted within each tree level
   * (so all the level 1 nodes are sorted, then all the level 2 nodes within each level 1 node etc).
   *
   * To achieve this we make use of the `ignoreSort` property on the sort configuration.  The parent feature (treeView or grouping)
   * must provide a rowsProcessor that runs with very low priority (typically in the 60-65 range), and that sets
   * the `ignoreSort`on any sort that it wants to run on the tree.  TreeBase will clear the ignoreSort on all sorts - so it
   * will turn on any sorts that haven't run.  It will then call a recursive sort on the tree.
   *
   * Tree base provides treeAggregation.  It checks the treeAggregation configuration on each column, and aggregates based on
   * the logic provided as it builds the tree. Footer aggregation from the uiGrid core should not be used with treeBase aggregation,
   * since it operates on all visible rows, as opposed to to leaf nodes only. Setting `showColumnFooter: true` will show the
   * treeAggregations in the column footer.  Aggregation information will be collected in the format:
   *
   * ```
   *   {
   *     type: 'count',
   *     value: 4,
   *     label: 'count: ',
   *     rendered: 'count: 4'
   *   }
   * ```
   *
   * A callback is provided to format the value once it is finalised (aka a valueFilter).
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.treeBase"></div>
   */

  var module = angular.module('ui.grid.treeBase', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.treeBase.constant:uiGridTreeBaseConstants
   *
   *  @description constants available in treeBase module.
   *
   *  These constants are manually copied into grouping and treeView,
   *  as I haven't found a way to simply include them, and it's not worth
   *  investing time in for something that changes very infrequently.
   *
   */
  module.constant('uiGridTreeBaseConstants', {
    featureName: "treeBase",
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
   *  @name ui.grid.treeBase.service:uiGridTreeBaseService
   *
   *  @description Services for treeBase feature
   */
  /**
   *  @ngdoc object
   *  @name ui.grid.treeBase.api:ColumnDef
   *
   *  @description ColumnDef for tree feature, these are available to be
   *  set using the ui-grid {@link ui.grid.class:GridOptions.columnDef gridOptions.columnDefs}
   */

  module.service('uiGridTreeBaseService', ['$q', 'uiGridTreeBaseConstants', 'gridUtil', 'GridRow', 'gridClassFactory', 'i18nService', 'uiGridConstants', 'rowSorter',
  function ($q, uiGridTreeBaseConstants, gridUtil, GridRow, gridClassFactory, i18nService, uiGridConstants, rowSorter) {

    var service = {

      initializeGrid: function (grid, $scope) {

        //add feature namespace and any properties to grid for needed
        /**
         *  @ngdoc object
         *  @name ui.grid.treeBase.grid:treeBase
         *
         *  @description Grid properties and functions added for treeBase
         */
        grid.treeBase = {};

        /**
         *  @ngdoc property
         *  @propertyOf ui.grid.treeBase.grid:treeBase
         *  @name numberLevels
         *
         *  @description Total number of tree levels currently used, calculated by the rowsProcessor by
         *  retaining the highest tree level it sees
         */
        grid.treeBase.numberLevels = 0;

        /**
         *  @ngdoc property
         *  @propertyOf ui.grid.treeBase.grid:treeBase
         *  @name expandAll
         *
         *  @description Whether or not the expandAll box is selected
         */
        grid.treeBase.expandAll = false;

        /**
         *  @ngdoc property
         *  @propertyOf ui.grid.treeBase.grid:treeBase
         *  @name tree
         *
         *  @description Tree represented as a nested array that holds the state of each node, along with a
         *  pointer to the row.  The array order is material - we will display the children in the order
         *  they are stored in the array
         *
         *  Each node stores:
         *
         *    - the state of this node
         *    - an array of children of this node
         *    - a pointer to the parent of this node (reverse pointer, allowing us to walk up the tree)
         *    - the number of children of this node
         *    - aggregation information calculated from the nodes
         *
         *  ```
         *    [{
         *      state: 'expanded',
         *      row: <reference to row>,
         *      parentRow: null,
         *      aggregations: [{
         *        type: 'count',
         *        col: <gridCol>,
         *        value: 2,
         *        label: 'count: ',
         *        rendered: 'count: 2'
         *      }],
         *      children: [
         *        {
         *          state: 'expanded',
         *          row: <reference to row>,
         *          parentRow: <reference to row>,
         *          aggregations: [{
         *            type: 'count',
         *            col: '<gridCol>,
         *            value: 4,
         *            label: 'count: ',
         *            rendered: 'count: 4'
         *          }],
         *          children: [
         *            { state: 'expanded', row: <reference to row>, parentRow: <reference to row> },
         *            { state: 'collapsed', row: <reference to row>, parentRow: <reference to row> },
         *            { state: 'expanded', row: <reference to row>, parentRow: <reference to row> },
         *            { state: 'collapsed', row: <reference to row>, parentRow: <reference to row> }
         *          ]
         *        },
         *        {
         *          state: 'collapsed',
         *          row: <reference to row>,
         *          parentRow: <reference to row>,
         *          aggregations: [{
         *            type: 'count',
         *            col: <gridCol>,
         *            value: 3,
         *            label: 'count: ',
         *            rendered: 'count: 3'
         *          }],
         *          children: [
         *            { state: 'expanded', row: <reference to row>, parentRow: <reference to row> },
         *            { state: 'collapsed', row: <reference to row>, parentRow: <reference to row> },
         *            { state: 'expanded', row: <reference to row>, parentRow: <reference to row> }
         *          ]
         *        }
         *      ]
         *    }, {<another level 0 node maybe>} ]
         *  ```
         *  Missing state values are false - meaning they aren't expanded.
         *
         *  This is used because the rowProcessors run every time the grid is refreshed, so
         *  we'd lose the expanded state every time the grid was refreshed.  This instead gives
         *  us a reliable lookup that persists across rowProcessors.
         *
         *  This tree is rebuilt every time we run the rowsProcessors.  Since each row holds a pointer
         *  to it's tree node we can persist expand/collapse state across calls to rowsProcessor, we discard
         *  all transient information on the tree (children, childCount) and recalculate it
         *
         */
        grid.treeBase.tree = {};

        service.defaultGridOptions(grid.options);

        grid.registerRowsProcessor(service.treeRows, 410);

        grid.registerColumnBuilder( service.treeBaseColumnBuilder );

        service.createRowHeader( grid );

        /**
         *  @ngdoc object
         *  @name ui.grid.treeBase.api:PublicApi
         *
         *  @description Public Api for treeBase feature
         */
        var publicApi = {
          events: {
            treeBase: {
              /**
               * @ngdoc event
               * @eventOf ui.grid.treeBase.api:PublicApi
               * @name rowExpanded
               * @description raised whenever a row is expanded.  If you are dynamically
               * rendering your tree you can listen to this event, and then retrieve
               * the children of this row and load them into the grid data.
               *
               * When the data is loaded the grid will automatically refresh to show these new rows
               *
               * <pre>
               *      gridApi.treeBase.on.rowExpanded(scope,function(row){})
               * </pre>
               * @param {gridRow} row the row that was expanded.  You can also
               * retrieve the grid from this row with row.grid
               */
              rowExpanded: {},

              /**
               * @ngdoc event
               * @eventOf ui.grid.treeBase.api:PublicApi
               * @name rowCollapsed
               * @description raised whenever a row is collapsed.  Doesn't really have
               * a purpose at the moment, included for symmetry
               *
               * <pre>
               *      gridApi.treeBase.on.rowCollapsed(scope,function(row){})
               * </pre>
               * @param {gridRow} row the row that was collapsed.  You can also
               * retrieve the grid from this row with row.grid
               */
              rowCollapsed: {}
            }
          },

          methods: {
            treeBase: {
              /**
               * @ngdoc function
               * @name expandAllRows
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description Expands all tree rows
               */
              expandAllRows: function () {
                service.expandAllRows(grid);
              },

              /**
               * @ngdoc function
               * @name collapseAllRows
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description collapse all tree rows
               */
              collapseAllRows: function () {
                service.collapseAllRows(grid);
              },

              /**
               * @ngdoc function
               * @name toggleRowTreeState
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description  call expand if the row is collapsed, collapse if it is expanded
               * @param {gridRow} row the row you wish to toggle
               */
              toggleRowTreeState: function (row) {
                service.toggleRowTreeState(grid, row);
              },

              /**
               * @ngdoc function
               * @name expandRow
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description expand the immediate children of the specified row
               * @param {gridRow} row the row you wish to expand
               */
              expandRow: function (row) {
                service.expandRow(grid, row);
              },

              /**
               * @ngdoc function
               * @name expandRowChildren
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description expand all children of the specified row
               * @param {gridRow} row the row you wish to expand
               */
              expandRowChildren: function (row) {
                service.expandRowChildren(grid, row);
              },

              /**
               * @ngdoc function
               * @name collapseRow
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description collapse  the specified row.  When
               * you expand the row again, all grandchildren will retain their state
               * @param {gridRow} row the row you wish to collapse
               */
              collapseRow: function ( row ) {
                service.collapseRow(grid, row);
              },

              /**
               * @ngdoc function
               * @name collapseRowChildren
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description collapse all children of the specified row.  When
               * you expand the row again, all grandchildren will be collapsed
               * @param {gridRow} row the row you wish to collapse children for
               */
              collapseRowChildren: function ( row ) {
                service.collapseRowChildren(grid, row);
              },

              /**
               * @ngdoc function
               * @name getTreeState
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description Get the tree state for this grid,
               * used by the saveState feature
               * Returned treeState as an object
               *   `{ expandedState: { uid: 'expanded', uid: 'collapsed' } }`
               * where expandedState is a hash of row uid and the current expanded state
               *
               * @returns {object} tree state
               *
               * TODO - this needs work - we need an identifier that persists across instantiations,
               * not uid.  This really means we need a row identity defined, but that won't work for
               * grouping.  Perhaps this needs to be moved up to treeView and grouping, rather than
               * being in base.
               */
              getTreeExpandedState: function () {
                return { expandedState: service.getTreeState(grid) };
              },

              /**
               * @ngdoc function
               * @name setTreeState
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description Set the expanded states of the tree
               * @param {object} config the config you want to apply, in the format
               * provided by getTreeState
               */
              setTreeState: function ( config ) {
                service.setTreeState( grid, config );
              },

              /**
               * @ngdoc function
               * @name getRowChildren
               * @methodOf  ui.grid.treeBase.api:PublicApi
               * @description Get the children of the specified row
               * @param {GridRow} row the row you want the children of
               * @returns {Array} array of children of this row, the children
               * are all gridRows
               */
              getRowChildren: function ( row ){
                return row.treeNode.children.map( function( childNode ){
                  return childNode.row;
                });
              }
            }
          }
        };

        grid.api.registerEventsFromObject(publicApi.events);

        grid.api.registerMethodsFromObject(publicApi.methods);
      },


      defaultGridOptions: function (gridOptions) {
        //default option to true unless it was explicitly set to false
        /**
         *  @ngdoc object
         *  @name ui.grid.treeBase.api:GridOptions
         *
         *  @description GridOptions for treeBase feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */

        /**
         *  @ngdoc object
         *  @name treeRowHeaderBaseWidth
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description Base width of the tree header, provides for a single level of tree.  This
         *  is incremented by `treeIndent` for each extra level
         *  <br/>Defaults to 30
         */
        gridOptions.treeRowHeaderBaseWidth = gridOptions.treeRowHeaderBaseWidth || 30;

        /**
         *  @ngdoc object
         *  @name treeIndent
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description Number of pixels of indent for the icon at each tree level, wider indents are visually more pleasing,
         *  but will make the tree row header wider
         *  <br/>Defaults to 10
         */
        gridOptions.treeIndent = gridOptions.treeIndent || 10;

        /**
         *  @ngdoc object
         *  @name showTreeRowHeader
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description If set to false, don't create the row header.  Youll need to programatically control the expand
         *  states
         *  <br/>Defaults to true
         */
        gridOptions.showTreeRowHeader = gridOptions.showTreeRowHeader !== false;

        /**
         *  @ngdoc object
         *  @name showTreeExpandNoChildren
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description If set to true, show the expand/collapse button even if there are no
         *  children of a node.  You'd use this if you're planning to dynamically load the children
         *
         *  <br/>Defaults to true, grouping overrides to false
         */
        gridOptions.showTreeExpandNoChildren = gridOptions.showTreeExpandNoChildren !== false;

        /**
         *  @ngdoc object
         *  @name treeRowHeaderAlwaysVisible
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description If set to true, row header even if there are no tree nodes
         *
         *  <br/>Defaults to true
         */
        gridOptions.treeRowHeaderAlwaysVisible = gridOptions.treeRowHeaderAlwaysVisible !== false;

        /**
         *  @ngdoc object
         *  @name treeCustomAggregations
         *  @propertyOf  ui.grid.treeBase.api:GridOptions
         *  @description Define custom aggregation functions. The properties of this object will be
         *  aggregation types available for use on columnDef with {@link ui.grid.treeBase.api:ColumnDef treeAggregationType} or through the column menu.
         *  If a function defined here uses the same name as one of the native aggregations, this one will take precedence.
         *  The object format is:
         *
         *  <pre>
         *    {
         *      aggregationName: {
         *        label: (optional) string,
         *        aggregationFn: function( aggregation, fieldValue, numValue, row ){...},
         *        finalizerFn: (optional) function( aggregation ){...}
       *        },
         *      mean: {
         *        label: 'mean',
         *        aggregationFn: function( aggregation, fieldValue, numValue ){
       *            aggregation.count = (aggregation.count || 1) + 1;
         *          aggregation.sum = (aggregation.sum || 0) + numValue;
         *        },
         *        finalizerFn: function( aggregation ){
         *          aggregation.value = aggregation.sum / aggregation.count
         *        }
         *      }
         *    }
         *  </pre>
         *
         *  <br/>The `finalizerFn` may be used to manipulate the value before rendering, or to
         *  apply a custom rendered value. If `aggregation.rendered` is left undefined, the value will be
         *  rendered. Note that the native aggregation functions use an `finalizerFn` to concatenate
         *  the label and the value.
         *
         *  <br/>Defaults to {}
         */
        gridOptions.treeCustomAggregations = gridOptions.treeCustomAggregations || {};
      },


      /**
       * @ngdoc function
       * @name treeBaseColumnBuilder
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Sets the tree defaults based on the columnDefs
       *
       * @param {object} colDef columnDef we're basing on
       * @param {GridCol} col the column we're to update
       * @param {object} gridOptions the options we should use
       * @returns {promise} promise for the builder - actually we do it all inline so it's immediately resolved
       */
      treeBaseColumnBuilder: function (colDef, col, gridOptions) {


        /**
         *  @ngdoc object
         *  @name customTreeAggregationFn
         *  @propertyOf  ui.grid.treeBase.api:ColumnDef
         *  @description A custom function that aggregates rows into some form of
         *  total.  Aggregations run row-by-row, the function needs to be capable of
         *  creating a running total.
         *
         *  The function will be provided the aggregation item (in which you can store running
         *  totals), the row value that is to be aggregated, and that same row value converted to
         *  a number (most aggregations work on numbers)
         *  @example
         *  <pre>
         *    customTreeAggregationFn = function ( aggregation, fieldValue, numValue, row ){
         *      // calculates the average of the squares of the values
         *      if ( typeof(aggregation.count) === 'undefined' ){
         *        aggregation.count = 0;
         *      }
         *      aggregation.count++;
         *
         *      if ( !isNaN(numValue) ){
         *        if ( typeof(aggregation.total) === 'undefined' ){
         *          aggregation.total = 0;
         *        }
         *        aggregation.total = aggregation.total + numValue * numValue;
         *      }
         *
         *      aggregation.value = aggregation.total / aggregation.count;
         *    }
         *  </pre>
         *  <br/>Defaults to undefined. May be overwritten by treeAggregationType, the two options should not be used together.
         */
        if ( typeof(colDef.customTreeAggregationFn) !== 'undefined' ){
          col.treeAggregationFn = colDef.customTreeAggregationFn;
        }

        /**
         *  @ngdoc object
         *  @name treeAggregationType
         *  @propertyOf  ui.grid.treeBase.api:ColumnDef
         *  @description Use one of the native or grid-level aggregation methods for calculating aggregations on this column.
         *  Native method are in the constants file and include: SUM, COUNT, MIN, MAX, AVG. This may also be the property the
         *  name of an aggregation function defined with {@link ui.grid.treeBase.api:GridOptions treeCustomAggregations}.
         *
         *  <pre>
         *      treeAggregationType = uiGridTreeBaseConstants.aggregation.SUM,
         *    }
         *  </pre>
         *
         *  If you are using aggregations you should either:
         *
         *   - also use grouping, in which case the aggregations are displayed in the group header, OR
         *   - use treeView, in which case you can set `treeAggregationUpdateEntity: true` in the colDef, and
         *     treeBase will store the aggregation information in the entity, or you can set `treeAggregationUpdateEntity: false`
         *     in the colDef, and you need to manual retrieve the calculated aggregations from the row.treeNode.aggregations
         *
         *  <br/>Takes precendence over a treeAggregationFn, the two options should not be used together.
         *  <br/>Defaults to undefined.
         */
        if ( typeof(colDef.treeAggregationType) !== 'undefined' ){
          col.treeAggregation = { type: colDef.treeAggregationType };
          if ( typeof(gridOptions.treeCustomAggregations[colDef.treeAggregationType]) !== 'undefined' ){
            col.treeAggregationFn = gridOptions.treeCustomAggregations[colDef.treeAggregationType].aggregationFn;
            col.treeAggregationFinalizerFn = gridOptions.treeCustomAggregations[colDef.treeAggregationType].finalizerFn;
            col.treeAggregation.label = gridOptions.treeCustomAggregations[colDef.treeAggregationType].label;
          } else if ( typeof(service.nativeAggregations()[colDef.treeAggregationType]) !== 'undefined' ){
            col.treeAggregationFn = service.nativeAggregations()[colDef.treeAggregationType].aggregationFn;
            col.treeAggregation.label = service.nativeAggregations()[colDef.treeAggregationType].label;
          }
        }

         /**
         *  @ngdoc object
         *  @name treeAggregationLabel
         *  @propertyOf  ui.grid.treeBase.api:ColumnDef
         *  @description A custom label to use for this aggregation. If provided we don't use native i18n.
         */
        if ( typeof(colDef.treeAggregationLabel) !== 'undefined' ){
          if (typeof(col.treeAggregation) === 'undefined' ){
            col.treeAggregation = {};
          }
          col.treeAggregation.label = colDef.treeAggregationLabel;
        }

        /**
         *  @ngdoc object
         *  @name treeAggregationUpdateEntity
         *  @propertyOf  ui.grid.treeBase.api:ColumnDef
         *  @description Store calculated aggregations into the entity, allowing them
         *  to be displayed in the grid using a standard cellTemplate.  This defaults to true,
         *  if you are using grouping then you shouldn't set it to false, as then the aggregations won't
         *  display.
         *
         *  If you are using treeView in most cases you'll want to set this to true.  This will result in
         *  getCellValue returning the aggregation rather than whatever was stored in the cell attribute on
         *  the entity.  If you want to render the underlying entity value (and do something else with the aggregation)
         *  then you could use a custom cellTemplate to display `row.entity.myAttribute`, rather than using getCellValue.
         *
         *  <br/>Defaults to true
         *
         *  @example
         *  <pre>
         *    gridOptions.columns = [{
         *      name: 'myCol',
         *      treeAggregation: { type: uiGridTreeBaseConstants.aggregation.SUM },
         *      treeAggregationUpdateEntity: true
         *      cellTemplate: '<div>{{row.entity.myCol + " " + row.treeNode.aggregations[0].rendered}}</div>'
         *    }];
         * </pre>
         */
        col.treeAggregationUpdateEntity = colDef.treeAggregationUpdateEntity !== false;

        /**
         *  @ngdoc object
         *  @name customTreeAggregationFinalizerFn
         *  @propertyOf  ui.grid.treeBase.api:ColumnDef
         *  @description A custom function that populates aggregation.rendered, this is called when
         *  a particular aggregation has been fully calculated, and we want to render the value.
         *
         *  With the native aggregation options we just concatenate `aggregation.label` and
         *  `aggregation.value`, but if you wanted to apply a filter or otherwise manipulate the label
         *  or the value, you can do so with this function. This function will be called after the
         *  the default `finalizerFn`.
         *
         *  @example
         *  <pre>
         *    customTreeAggregationFinalizerFn = function ( aggregation ){
         *      aggregation.rendered = aggregation.label + aggregation.value / 100 + '%';
         *    }
         *  </pre>
         *  <br/>Defaults to undefined.
         */
        if ( typeof(col.customTreeAggregationFinalizerFn) === 'undefined' ){
          col.customTreeAggregationFinalizerFn = colDef.customTreeAggregationFinalizerFn;
        }

      },


      /**
       * @ngdoc function
       * @name createRowHeader
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Create the rowHeader.  If treeRowHeaderAlwaysVisible then
       * set it to visible, otherwise set it to invisible
       *
       * @param {Grid} grid grid object
       */
      createRowHeader: function( grid ){
        var rowHeaderColumnDef = {
          name: uiGridTreeBaseConstants.rowHeaderColName,
          displayName: '',
          width:  grid.options.treeRowHeaderBaseWidth,
          minWidth: 10,
          cellTemplate: 'ui-grid/treeBaseRowHeader',
          headerCellTemplate: 'ui-grid/treeBaseHeaderCell',
          enableColumnResizing: false,
          enableColumnMenu: false,
          exporterSuppressExport: true,
          allowCellFocus: true
        };

        rowHeaderColumnDef.visible = grid.options.treeRowHeaderAlwaysVisible;
        grid.addRowHeaderColumn( rowHeaderColumnDef );
      },


      /**
       * @ngdoc function
       * @name expandAllRows
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Expands all nodes in the tree
       *
       * @param {Grid} grid grid object
       */
      expandAllRows: function (grid) {
        grid.treeBase.tree.forEach( function( node ) {
          service.setAllNodes( grid, node, uiGridTreeBaseConstants.EXPANDED);
        });
        grid.treeBase.expandAll = true;
        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name collapseAllRows
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Collapses all nodes in the tree
       *
       * @param {Grid} grid grid object
       */
      collapseAllRows: function (grid) {
        grid.treeBase.tree.forEach( function( node ) {
          service.setAllNodes( grid, node, uiGridTreeBaseConstants.COLLAPSED);
        });
        grid.treeBase.expandAll = false;
        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name setAllNodes
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Works through a subset of grid.treeBase.rowExpandedStates, setting
       * all child nodes (and their descendents) of the provided node to the given state.
       *
       * Calls itself recursively on all nodes so as to achieve this.
       *
       * @param {Grid} grid the grid we're operating on (so we can raise events)
       * @param {object} treeNode a node in the tree that we want to update
       * @param {string} targetState the state we want to set it to
       */
      setAllNodes: function (grid, treeNode, targetState) {
        if ( typeof(treeNode.state) !== 'undefined' && treeNode.state !== targetState ){
          treeNode.state = targetState;

          if ( targetState === uiGridTreeBaseConstants.EXPANDED ){
            grid.api.treeBase.raise.rowExpanded(treeNode.row);
          } else {
            grid.api.treeBase.raise.rowCollapsed(treeNode.row);
          }
        }

        // set all child nodes
        if ( treeNode.children ){
          treeNode.children.forEach(function( childNode ){
            service.setAllNodes(grid, childNode, targetState);
          });
        }
      },


      /**
       * @ngdoc function
       * @name toggleRowTreeState
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Toggles the expand or collapse state of this grouped row, if
       * it's a parent row
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to toggle
       */
      toggleRowTreeState: function ( grid, row ){
        if ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ){
          return;
        }

        if (row.treeNode.state === uiGridTreeBaseConstants.EXPANDED){
          service.collapseRow(grid, row);
        } else {
          service.expandRow(grid, row);
        }

        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name expandRow
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Expands this specific row, showing only immediate children.
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to expand
       */
      expandRow: function ( grid, row ){
        if ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ){
          return;
        }

        if ( row.treeNode.state !== uiGridTreeBaseConstants.EXPANDED ){
          row.treeNode.state = uiGridTreeBaseConstants.EXPANDED;
          grid.api.treeBase.raise.rowExpanded(row);
          grid.treeBase.expandAll = service.allExpanded(grid.treeBase.tree);
          grid.queueGridRefresh();
        }
      },


      /**
       * @ngdoc function
       * @name expandRowChildren
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Expands this specific row, showing all children.
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to expand
       */
      expandRowChildren: function ( grid, row ){
        if ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ){
          return;
        }

        service.setAllNodes(grid, row.treeNode, uiGridTreeBaseConstants.EXPANDED);
        grid.treeBase.expandAll = service.allExpanded(grid.treeBase.tree);
        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name collapseRow
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Collapses this specific row
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to collapse
       */
      collapseRow: function( grid, row ){
        if ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ){
          return;
        }

        if ( row.treeNode.state !== uiGridTreeBaseConstants.COLLAPSED ){
          row.treeNode.state = uiGridTreeBaseConstants.COLLAPSED;
          grid.treeBase.expandAll = false;
          grid.api.treeBase.raise.rowCollapsed(row);
          grid.queueGridRefresh();
        }
      },


      /**
       * @ngdoc function
       * @name collapseRowChildren
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Collapses this specific row and all children
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to collapse
       */
      collapseRowChildren: function( grid, row ){
        if ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ){
          return;
        }

        service.setAllNodes(grid, row.treeNode, uiGridTreeBaseConstants.COLLAPSED);
        grid.treeBase.expandAll = false;
        grid.queueGridRefresh();
      },


      /**
       * @ngdoc function
       * @name allExpanded
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Returns true if all rows are expanded, false
       * if they're not.  Walks the tree to determine this.  Used
       * to set the expandAll state.
       *
       * If the node has no children, then return true (it's immaterial
       * whether it is expanded).  If the node has children, then return
       * false if this node is collapsed, or if any child node is not all expanded
       *
       * @param {object} tree the grid to check
       * @returns {boolean} whether or not the tree is all expanded
       */
      allExpanded: function( tree ){
        var allExpanded = true;
        tree.forEach( function( node ){
          if ( !service.allExpandedInternal( node ) ){
            allExpanded = false;
          }
        });
        return allExpanded;
      },

      allExpandedInternal: function( treeNode ){
        if ( treeNode.children && treeNode.children.length > 0 ){
          if ( treeNode.state === uiGridTreeBaseConstants.COLLAPSED ){
            return false;
          }
          var allExpanded = true;
          treeNode.children.forEach( function( node ){
            if ( !service.allExpandedInternal( node ) ){
              allExpanded = false;
            }
          });
          return allExpanded;
        } else {
          return true;
        }
      },


      /**
       * @ngdoc function
       * @name treeRows
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description The rowProcessor that adds the nodes to the tree, and sets the visible
       * state of each row based on it's parent state
       *
       * Assumes it is always called after the sorting processor, and the grouping processor if there is one.
       * Performs any tree sorts itself after having built the tree
       *
       * Processes all the rows in order, setting the group level based on the $$treeLevel in the associated
       * entity, and setting the visible state based on the parent's state.
       *
       * Calculates the deepest level of tree whilst it goes, and updates that so that the header column can be correctly
       * sized.
       *
       * Aggregates if necessary along the way.
       *
       * @param {array} renderableRows the rows we want to process, usually the output from the previous rowProcessor
       * @returns {array} the updated rows
       */
      treeRows: function( renderableRows ) {
        if (renderableRows.length === 0){
          return renderableRows;
        }

        var grid = this;
        var currentLevel = 0;
        var currentState = uiGridTreeBaseConstants.EXPANDED;
        var parents = [];

        grid.treeBase.tree = service.createTree( grid, renderableRows );
        service.updateRowHeaderWidth( grid );

        service.sortTree( grid );
        service.fixFilter( grid );

        return service.renderTree( grid.treeBase.tree );
      },


      /**
       * @ngdoc function
       * @name createOrUpdateRowHeaderWidth
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Calculates the rowHeader width.
       *
       * If rowHeader is always present, updates the width.
       *
       * If rowHeader is only sometimes present (`treeRowHeaderAlwaysVisible: false`), determines whether there
       * should be one, then creates or removes it as appropriate, with the created rowHeader having the
       * right width.
       *
       * If there's never a rowHeader then never creates one: `showTreeRowHeader: false`
       *
       * @param {Grid} grid the grid we want to set the row header on
       */
      updateRowHeaderWidth: function( grid ){
        var rowHeader = grid.getColumn(uiGridTreeBaseConstants.rowHeaderColName);

        var newWidth = grid.options.treeRowHeaderBaseWidth + grid.options.treeIndent * Math.max(grid.treeBase.numberLevels - 1, 0);
        if ( rowHeader && newWidth !== rowHeader.width ){
          rowHeader.width = newWidth;
          grid.queueRefresh();
        }

        var newVisibility = true;
        if ( grid.options.showTreeRowHeader === false ){
          newVisibility = false;
        }
        if ( grid.options.treeRowHeaderAlwaysVisible === false && grid.treeBase.numberLevels <= 0 ){
          newVisibility = false;
        }
        if ( rowHeader.visible !== newVisibility ) {
          rowHeader.visible = newVisibility;
          rowHeader.colDef.visible = newVisibility;
          grid.queueGridRefresh();
        }
      },


      /**
       * @ngdoc function
       * @name renderTree
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Creates an array of rows based on the tree, exporting only
       * the visible nodes and leaves
       *
       * @param {array} nodeList the list of nodes - can be grid.treeBase.tree, or can be node.children when
       * we're calling recursively
       * @returns {array} renderable rows
       */
      renderTree: function( nodeList ){
        var renderableRows = [];

        nodeList.forEach( function ( node ){
          if ( node.row.visible ){
            renderableRows.push( node.row );
          }
          if ( node.state === uiGridTreeBaseConstants.EXPANDED && node.children && node.children.length > 0 ){
            renderableRows = renderableRows.concat( service.renderTree( node.children ) );
          }
        });
        return renderableRows;
      },


      /**
       * @ngdoc function
       * @name createTree
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Creates a tree from the renderableRows
       *
       * @param {Grid} grid the grid
       * @param {array} renderableRows the rows we want to create a tree from
       * @returns {object} the tree we've build
       */
      createTree: function( grid, renderableRows ) {
        var currentLevel = -1;
        var parents = [];
        var currentState;
        grid.treeBase.tree = [];
        grid.treeBase.numberLevels = 0;
        var aggregations = service.getAggregations( grid );

        var createNode = function( row ){
          if ( typeof(row.entity.$$treeLevel) !== 'undefined' && row.treeLevel !== row.entity.$$treeLevel ){
            row.treeLevel = row.entity.$$treeLevel;
          }

          if ( row.treeLevel <= currentLevel ){
            // pop any levels that aren't parents of this level, formatting the aggregation at the same time
            while ( row.treeLevel <= currentLevel ){
              var lastParent = parents.pop();
              service.finaliseAggregations( lastParent );
              currentLevel--;
            }

            // reset our current state based on the new parent, set to expanded if this is a level 0 node
            if ( parents.length > 0 ){
              currentState = service.setCurrentState(parents);
            } else {
              currentState = uiGridTreeBaseConstants.EXPANDED;
            }
          }

          // aggregate if this is a leaf node
          if ( ( typeof(row.treeLevel) === 'undefined' || row.treeLevel === null || row.treeLevel < 0 ) && row.visible  ){
            service.aggregate( grid, row, parents );
          }

          // add this node to the tree
          service.addOrUseNode(grid, row, parents, aggregations);

          if ( typeof(row.treeLevel) !== 'undefined' && row.treeLevel !== null && row.treeLevel >= 0 ){
            parents.push(row);
            currentLevel++;
            currentState = service.setCurrentState(parents);
          }

          // update the tree number of levels, so we can set header width if we need to
          if ( grid.treeBase.numberLevels < row.treeLevel + 1){
            grid.treeBase.numberLevels = row.treeLevel + 1;
          }
        };

        renderableRows.forEach( createNode );

        // finalise remaining aggregations
        while ( parents.length > 0 ){
          var lastParent = parents.pop();
          service.finaliseAggregations( lastParent );
        }

        return grid.treeBase.tree;
      },


      /**
       * @ngdoc function
       * @name addOrUseNode
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Creates a tree node for this row.  If this row already has a treeNode
       * recorded against it, preserves the state, but otherwise overwrites the data.
       *
       * @param {grid} grid the grid we're operating on
       * @param {gridRow} row the row we want to set
       * @param {array} parents an array of the parents this row should have
       * @param {array} aggregationBase empty aggregation information
       * @returns {undefined} updates the parents array, updates the row to have a treeNode, and updates the
       * grid.treeBase.tree
       */
      addOrUseNode: function( grid, row, parents, aggregationBase ){
        var newAggregations = [];
        aggregationBase.forEach( function(aggregation){
          newAggregations.push(service.buildAggregationObject(aggregation.col));
        });

        var newNode = { state: uiGridTreeBaseConstants.COLLAPSED, row: row, parentRow: null, aggregations: newAggregations, children: [] };
        if ( row.treeNode ){
          newNode.state = row.treeNode.state;
        }
        if ( parents.length > 0 ){
          newNode.parentRow = parents[parents.length - 1];
        }
        row.treeNode = newNode;

        if ( parents.length === 0 ){
          grid.treeBase.tree.push( newNode );
        } else {
          parents[parents.length - 1].treeNode.children.push( newNode );
        }
      },


      /**
       * @ngdoc function
       * @name setCurrentState
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Looks at the parents array to determine our current state.
       * If any node in the hierarchy is collapsed, then return collapsed, otherwise return
       * expanded.
       *
       * @param {array} parents an array of the parents this row should have
       * @returns {string} the state we should be setting to any nodes we see
       */
      setCurrentState: function( parents ){
        var currentState = uiGridTreeBaseConstants.EXPANDED;
        parents.forEach( function(parent){
          if ( parent.treeNode.state === uiGridTreeBaseConstants.COLLAPSED ){
            currentState = uiGridTreeBaseConstants.COLLAPSED;
          }
        });
        return currentState;
      },


      /**
       * @ngdoc function
       * @name sortTree
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Performs a recursive sort on the tree nodes, sorting the
       * children of each node and putting them back into the children array.
       *
       * Before doing this it turns back on all the sortIgnore - things that were previously
       * ignored we process now.  Since we're sorting within the nodes, presumably anything
       * that was already sorted is how we derived the nodes, we can keep those sorts too.
       *
       * We only sort tree nodes that are expanded - no point in wasting effort sorting collapsed
       * nodes
       *
       * @param {Grid} grid the grid to get the aggregation information from
       * @returns {array} the aggregation information
       */
      sortTree: function( grid ){
        grid.columns.forEach( function( column ) {
          if ( column.sort && column.sort.ignoreSort ){
            delete column.sort.ignoreSort;
          }
        });

        grid.treeBase.tree = service.sortInternal( grid, grid.treeBase.tree );
      },

      sortInternal: function( grid, treeList ){
        var rows = treeList.map( function( node ){
          return node.row;
        });

        rows = rowSorter.sort( grid, rows, grid.columns );

        var treeNodes = rows.map( function( row ){
          return row.treeNode;
        });

        treeNodes.forEach( function( node ){
          if ( node.state === uiGridTreeBaseConstants.EXPANDED && node.children && node.children.length > 0 ){
            node.children = service.sortInternal( grid, node.children );
          }
        });

        return treeNodes;
      },

      /**
       * @ngdoc function
       * @name fixFilter
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description After filtering has run, we need to go back through the tree
       * and make sure the parent rows are always visible if any of the child rows
       * are visible (filtering may make a child visible, but the parent may not
       * match the filter criteria)
       *
       * This has a risk of being computationally expensive, we do it by walking
       * the tree and remembering whether there are any invisible nodes on the
       * way down.
       *
       * @param {Grid} grid the grid to fix filters on
       */
      fixFilter: function( grid ){
        var parentsVisible;

        grid.treeBase.tree.forEach( function( node ){
          if ( node.children && node.children.length > 0 ){
            parentsVisible = node.row.visible;
            service.fixFilterInternal( node.children, parentsVisible );
          }
        });
      },

      fixFilterInternal: function( nodes, parentsVisible) {
        nodes.forEach( function( node ){
          if ( node.row.visible && !parentsVisible ){
            service.setParentsVisible( node );
            parentsVisible = true;
          }

          if ( node.children && node.children.length > 0 ){
            if ( service.fixFilterInternal( node.children, ( parentsVisible && node.row.visible ) ) ) {
              parentsVisible = true;
            }
          }
        });

        return parentsVisible;
      },

      setParentsVisible: function( node ){
        while ( node.parentRow ){
          node.parentRow.visible = true;
          node = node.parentRow.treeNode;
        }
      },

      /**
       * @ngdoc function
       * @name buildAggregationObject
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Build the object which is stored on the column for holding meta-data about the aggregation.
       * This method should only be called with columns which have an aggregation.
       *
       * @param {Column} the column which this object relates to
       * @returns {object} {col: Column object, label: string, type: string (optional)}
       */
      buildAggregationObject: function( column ){
        var newAggregation = { col: column };

        if ( column.treeAggregation && column.treeAggregation.type ){
          newAggregation.type = column.treeAggregation.type;
        }

        if ( column.treeAggregation && column.treeAggregation.label ){
          newAggregation.label = column.treeAggregation.label;
        }

        return newAggregation;
      },

      /**
       * @ngdoc function
       * @name getAggregations
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Looks through the grid columns to find those with aggregations,
       * and collates the aggregation information into an array, returns that array
       *
       * @param {Grid} grid the grid to get the aggregation information from
       * @returns {array} the aggregation information
       */
      getAggregations: function( grid ){
        var aggregateArray = [];

        grid.columns.forEach( function(column){
          if ( typeof(column.treeAggregationFn) !== 'undefined' ){
            aggregateArray.push( service.buildAggregationObject(column) );

            if ( grid.options.showColumnFooter && typeof(column.colDef.aggregationType) === 'undefined' && column.treeAggregation ){
              // Add aggregation object for footer
              column.treeFooterAggregation = service.buildAggregationObject(column);
              column.aggregationType = service.treeFooterAggregationType;
            }
          }
        });
        return aggregateArray;
      },


      /**
       * @ngdoc function
       * @name aggregate
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Accumulate the data from this row onto the aggregations for each parent
       *
       * Iterate over the parents, then iterate over the aggregations for each of those parents,
       * and perform the aggregation for each individual aggregation
       *
       * @param {Grid} grid grid object
       * @param {GridRow} row the row we want to set grouping visibility on
       * @param {array} parents the parents that we would want to aggregate onto
       */
      aggregate: function( grid, row, parents ){
        if ( parents.length === 0 && row.treeNode && row.treeNode.aggregations ){
          row.treeNode.aggregations.forEach(function(aggregation){
            // Calculate aggregations for footer even if there are no grouped rows
            if ( typeof(aggregation.col.treeFooterAggregation) !== 'undefined' ) {
              var fieldValue = grid.getCellValue(row, aggregation.col);
              var numValue = Number(fieldValue);
              aggregation.col.treeAggregationFn(aggregation.col.treeFooterAggregation, fieldValue, numValue, row);
            }
          });
        }

        parents.forEach( function( parent, index ){
          if ( parent.treeNode.aggregations ){
            parent.treeNode.aggregations.forEach( function( aggregation ){
              var fieldValue = grid.getCellValue(row, aggregation.col);
              var numValue = Number(fieldValue);
              aggregation.col.treeAggregationFn(aggregation, fieldValue, numValue, row);

              if ( index === 0 && typeof(aggregation.col.treeFooterAggregation) !== 'undefined' ){
                aggregation.col.treeAggregationFn(aggregation.col.treeFooterAggregation, fieldValue, numValue, row);
              }
            });
          }
        });
      },


      // Aggregation routines - no doco needed as self evident
      nativeAggregations: function() {
        var nativeAggregations = {
          count: {
            label: i18nService.get().aggregation.count,
            menuTitle: i18nService.get().grouping.aggregate_count,
            aggregationFn: function (aggregation, fieldValue, numValue) {
              if (typeof(aggregation.value) === 'undefined') {
                aggregation.value = 1;
              } else {
                aggregation.value++;
              }
            }
          },

          sum: {
            label: i18nService.get().aggregation.sum,
            menuTitle: i18nService.get().grouping.aggregate_sum,
            aggregationFn: function( aggregation, fieldValue, numValue ) {
              if (!isNaN(numValue)) {
                if (typeof(aggregation.value) === 'undefined') {
                  aggregation.value = numValue;
                } else {
                  aggregation.value += numValue;
                }
              }
            }
          },

          min: {
            label: i18nService.get().aggregation.min,
            menuTitle: i18nService.get().grouping.aggregate_min,
            aggregationFn: function( aggregation, fieldValue, numValue ) {
              if (typeof(aggregation.value) === 'undefined') {
                aggregation.value = fieldValue;
              } else {
                if (typeof(fieldValue) !== 'undefined' && fieldValue !== null && (fieldValue < aggregation.value || aggregation.value === null)) {
                  aggregation.value = fieldValue;
                }
              }
            }
          },

          max: {
            label: i18nService.get().aggregation.max,
            menuTitle: i18nService.get().grouping.aggregate_max,
            aggregationFn: function( aggregation, fieldValue, numValue ){
              if ( typeof(aggregation.value) === 'undefined' ){
                aggregation.value = fieldValue;
              } else {
                if ( typeof(fieldValue) !== 'undefined' && fieldValue !== null && (fieldValue > aggregation.value || aggregation.value === null)){
                  aggregation.value = fieldValue;
                }
              }
            }
          },

          avg: {
            label: i18nService.get().aggregation.avg,
            menuTitle: i18nService.get().grouping.aggregate_avg,
            aggregationFn: function( aggregation, fieldValue, numValue ){
              if ( typeof(aggregation.count) === 'undefined' ){
                aggregation.count = 1;
              } else {
                aggregation.count++;
              }

              if ( isNaN(numValue) ){
                return;
              }

              if ( typeof(aggregation.value) === 'undefined' || typeof(aggregation.sum) === 'undefined' ){
                aggregation.value = numValue;
                aggregation.sum = numValue;
              } else {
                aggregation.sum += numValue;
                aggregation.value = aggregation.sum / aggregation.count;
              }
            }
          }
        };
        return nativeAggregations;
      },

      /**
       * @ngdoc function
       * @name finaliseAggregation
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Helper function used to finalize aggregation nodes and footer cells
       *
       * @param {gridRow} row the parent we're finalising
       * @param {aggregation} the aggregation object manipulated by the aggregationFn
       */
      finaliseAggregation: function(row, aggregation){
        if ( aggregation.col.treeAggregationUpdateEntity && typeof(row) !== 'undefined' && typeof(row.entity[ '$$' + aggregation.col.uid ]) !== 'undefined' ){
          angular.extend( aggregation, row.entity[ '$$' + aggregation.col.uid ]);
        }

        if ( typeof(aggregation.col.treeAggregationFinalizerFn) === 'function' ){
          aggregation.col.treeAggregationFinalizerFn( aggregation );
        }
        if ( typeof(aggregation.col.customTreeAggregationFinalizerFn) === 'function' ){
          aggregation.col.customTreeAggregationFinalizerFn( aggregation );
        }
        if ( typeof(aggregation.rendered) === 'undefined' ){
          aggregation.rendered = aggregation.label ? aggregation.label + aggregation.value : aggregation.value;
        }
      },

      /**
       * @ngdoc function
       * @name finaliseAggregations
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Format the data from the aggregation into the rendered text
       * e.g. if we had label: 'sum: ' and value: 25, we'd create 'sum: 25'.
       *
       * As part of this we call any formatting callback routines we've been provided.
       *
       * We write our aggregation out to the row.entity if treeAggregationUpdateEntity is
       * set on the column - we don't overwrite any information that's already there, we append
       * to it so that grouping can have set the groupVal beforehand without us overwriting it.
       *
       * We need to copy the data from the row.entity first before we finalise the aggregation,
       * we need that information for the finaliserFn
       *
       * @param {gridRow} row the parent we're finalising
       */
      finaliseAggregations: function( row ){
        if ( typeof(row.treeNode.aggregations) === 'undefined' ){
          return;
        }

        row.treeNode.aggregations.forEach( function( aggregation ) {
          service.finaliseAggregation(row, aggregation);

          if ( aggregation.col.treeAggregationUpdateEntity ){
            var aggregationCopy = {};
            angular.forEach( aggregation, function( value, key ){
              if ( aggregation.hasOwnProperty(key) && key !== 'col' ){
                aggregationCopy[key] = value;
              }
            });

            row.entity[ '$$' + aggregation.col.uid ] = aggregationCopy;
          }
        });
      },

      /**
       * @ngdoc function
       * @name treeFooterAggregationType
       * @methodOf  ui.grid.treeBase.service:uiGridTreeBaseService
       * @description Uses the tree aggregation functions and finalizers to set the
       * column footer aggregations.
       *
       * @param {rows} visible rows. not used, but accepted to match signature of GridColumn.aggregationType
       * @param {gridColumn} the column we are finalizing
       */
      treeFooterAggregationType: function( rows, column ) {
        service.finaliseAggregation(undefined, column.treeFooterAggregation);
        if ( typeof(column.treeFooterAggregation.value) === 'undefined' || column.treeFooterAggregation.rendered === null ){
          // The was apparently no aggregation performed (perhaps this is a grouped column
          return '';
        }
        return column.treeFooterAggregation.rendered;
      }
    };

    return service;

  }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.treeBase.directive:uiGridTreeRowHeaderButtons
   *  @element div
   *
   *  @description Provides the expand/collapse button on rows
   */
  module.directive('uiGridTreeBaseRowHeaderButtons', ['$templateCache', 'uiGridTreeBaseService',
  function ($templateCache, uiGridTreeBaseService) {
    return {
      replace: true,
      restrict: 'E',
      template: $templateCache.get('ui-grid/treeBaseRowHeaderButtons'),
      scope: true,
      require: '^uiGrid',
      link: function($scope, $elm, $attrs, uiGridCtrl) {
        var self = uiGridCtrl.grid;
        $scope.treeButtonClick = function(row, evt) {
          uiGridTreeBaseService.toggleRowTreeState(self, row, evt);
        };
      }
    };
  }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.treeBase.directive:uiGridTreeBaseExpandAllButtons
   *  @element div
   *
   *  @description Provides the expand/collapse all button
   */
  module.directive('uiGridTreeBaseExpandAllButtons', ['$templateCache', 'uiGridTreeBaseService',
  function ($templateCache, uiGridTreeBaseService) {
    return {
      replace: true,
      restrict: 'E',
      template: $templateCache.get('ui-grid/treeBaseExpandAllButtons'),
      scope: false,
      link: function($scope, $elm, $attrs, uiGridCtrl) {
        var self = $scope.col.grid;

        $scope.headerButtonClick = function(row, evt) {
          if ( self.treeBase.expandAll ){
            uiGridTreeBaseService.collapseAllRows(self, evt);
          } else {
            uiGridTreeBaseService.expandAllRows(self, evt);
          }
        };
      }
    };
  }]);


  /**
   *  @ngdoc directive
   *  @name ui.grid.treeBase.directive:uiGridViewport
   *  @element div
   *
   *  @description Stacks on top of ui.grid.uiGridViewport to set formatting on a tree header row
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
            newNgClass = existingNgClass.slice(0, -1) + ",'ui-grid-tree-header-row': row.treeLevel > -1}";
          } else {
            newNgClass = "{'ui-grid-tree-header-row': row.treeLevel > -1}";
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
        //default option to true unless it was explicitly set to false
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

        grid.columns.forEach( function( column ){
          if ( column.sort ){
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
            if (uiGridCtrl.grid.options.enableTreeView !== false){
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

angular.module('ui.grid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/ui-grid-filter',
    "<div class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\" ng-class=\"{'ui-grid-filter-cancel-button-hidden' : colFilter.disableCancelFilterButton === true }\"><div ng-if=\"colFilter.type !== 'select'\"><input type=\"text\" class=\"ui-grid-filter-input\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\"><div class=\"ui-grid-filter-button\" ng-click=\"colFilter.term = null\" ng-if=\"!colFilter.disableCancelFilterButton\"><i class=\"ui-grid-icon-cancel\" ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">&nbsp;</i></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"><option value=\"\"></option></select><div class=\"ui-grid-filter-button-select\" ng-click=\"colFilter.term = null\" ng-if=\"!colFilter.disableCancelFilterButton\"><i class=\"ui-grid-icon-cancel\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\">&nbsp;</i></div></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-footer',
    "<div class=\"ui-grid-footer-panel ui-grid-footer-aggregates-row\"><div class=\"ui-grid-footer ui-grid-footer-viewport\"><div class=\"ui-grid-footer-canvas\"><div class=\"ui-grid-footer-cell-wrapper\" ng-style=\"colContainer.headerCellWrapperStyle()\"><div class=\"ui-grid-footer-cell-row\"><div ng-repeat=\"col in colContainer.renderedColumns track by col.uid\" ui-grid-footer-cell col=\"col\" render-index=\"$index\" class=\"ui-grid-footer-cell ui-grid-clearfix\"></div></div></div></div></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-grid-footer',
    "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>{{'search.totalItems' | t}} {{grid.rows.length}}</span> <span ng-if=\"grid.renderContainers.body.visibleRowCache.length !== grid.rows.length\" class=\"ngLabel\">({{\"search.showingItems\" | t}} {{grid.renderContainers.body.visibleRowCache.length}})</span></div>"
  );


  $templateCache.put('ui-grid/ui-grid-group-panel',
    "<div class=\"ui-grid-group-panel\"><div ui-t=\"groupPanel.description\" class=\"description\" ng-show=\"groupings.length == 0\"></div><ul ng-show=\"groupings.length > 0\" class=\"ngGroupList\"><li class=\"ngGroupItem\" ng-repeat=\"group in configGroups\"><span class=\"ngGroupElement\"><span class=\"ngGroupName\">{{group.displayName}} <span ng-click=\"removeGroup($index)\" class=\"ngRemoveGroup\">x</span></span> <span ng-hide=\"$last\" class=\"ngGroupArrow\"></span></span></li></ul></div>"
  );


  $templateCache.put('ui-grid/ui-grid-header',
    "<div class=\"ui-grid-header\"><div class=\"ui-grid-top-panel\"><div class=\"ui-grid-header-viewport\"><div class=\"ui-grid-header-canvas\"><div class=\"ui-grid-header-cell-wrapper\" ng-style=\"colContainer.headerCellWrapperStyle()\"><div class=\"ui-grid-header-cell-row\"><div class=\"ui-grid-header-cell ui-grid-clearfix\" ng-repeat=\"col in colContainer.renderedColumns track by col.uid\" ui-grid-header-cell col=\"col\" render-index=\"$index\"></div></div></div></div></div></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-menu-button',
    "<div class=\"ui-grid-menu-button\" ng-click=\"toggleMenu()\"><div class=\"ui-grid-icon-container\"><i class=\"ui-grid-icon-menu\">&nbsp;</i></div><div ui-grid-menu menu-items=\"menuItems\"></div></div>"
  );


  $templateCache.put('ui-grid/ui-grid-no-header',
    "<div class=\"ui-grid-top-panel\"></div>"
  );


  $templateCache.put('ui-grid/ui-grid-row',
    "<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
  );


  $templateCache.put('ui-grid/ui-grid',
    "<div ui-i18n=\"en\" class=\"ui-grid\"><!-- TODO (c0bra): add \"scoped\" attr here, eventually? --><style ui-grid-style>.grid{{ grid.id }} {\n" +
    "      /* Styles for the grid */\n" +
    "    }\n" +
    "\n" +
    "    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n" +
    "      height: {{ grid.options.rowHeight }}px;\n" +
    "    }\n" +
    "\n" +
    "    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n" +
    "      border-bottom-width: {{ ((grid.getTotalRowHeight() < grid.getViewportHeight()) && '1') || '0' }}px;\n" +
    "    }\n" +
    "\n" +
    "    {{ grid.verticalScrollbarStyles }}\n" +
    "    {{ grid.horizontalScrollbarStyles }}\n" +
    "\n" +
    "    /*\n" +
    "    .ui-grid[dir=rtl] .ui-grid-viewport {\n" +
    "      padding-left: {{ grid.verticalScrollbarWidth }}px;\n" +
    "    }\n" +
    "    */\n" +
    "\n" +
    "    {{ grid.customStyles }}</style><div class=\"ui-grid-contents-wrapper\"><div ui-grid-menu-button ng-if=\"grid.options.enableGridMenu\"></div><div ng-if=\"grid.hasLeftContainer()\" style=\"width: 0\" ui-grid-pinned-container=\"'left'\"></div><div ui-grid-render-container container-id=\"'body'\" col-container-name=\"'body'\" row-container-name=\"'body'\" bind-scroll-horizontal=\"true\" bind-scroll-vertical=\"true\" enable-horizontal-scrollbar=\"grid.options.enableHorizontalScrollbar\" enable-vertical-scrollbar=\"grid.options.enableVerticalScrollbar\"></div><div ng-if=\"grid.hasRightContainer()\" style=\"width: 0\" ui-grid-pinned-container=\"'right'\"></div><div ui-grid-grid-footer ng-if=\"grid.options.showGridFooter\"></div><div ui-grid-column-menu ng-if=\"grid.options.enableColumnMenus\"></div><div ng-transclude></div></div></div>"
  );


  $templateCache.put('ui-grid/uiGridCell',
    "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{COL_FIELD CUSTOM_FILTERS}}</div>"
  );


  $templateCache.put('ui-grid/uiGridColumnMenu',
    "<div class=\"ui-grid-column-menu\"><div ui-grid-menu menu-items=\"menuItems\"><!-- <div class=\"ui-grid-column-menu\">\n" +
    "    <div class=\"inner\" ng-show=\"menuShown\">\n" +
    "      <ul>\n" +
    "        <div ng-show=\"grid.options.enableSorting\">\n" +
    "          <li ng-click=\"sortColumn($event, asc)\" ng-class=\"{ 'selected' : col.sort.direction == asc }\"><i class=\"ui-grid-icon-sort-alt-up\"></i> Sort Ascending</li>\n" +
    "          <li ng-click=\"sortColumn($event, desc)\" ng-class=\"{ 'selected' : col.sort.direction == desc }\"><i class=\"ui-grid-icon-sort-alt-down\"></i> Sort Descending</li>\n" +
    "          <li ng-show=\"col.sort.direction\" ng-click=\"unsortColumn()\"><i class=\"ui-grid-icon-cancel\"></i> Remove Sort</li>\n" +
    "        </div>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div> --></div></div>"
  );


  $templateCache.put('ui-grid/uiGridFooterCell',
    "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>"
  );


  $templateCache.put('ui-grid/uiGridHeaderCell',
    "<div ng-class=\"{ 'sortable': sortable }\"><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\" title=\"TOOLTIP\"><span>{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-visible=\"col.sort.direction\" ng-class=\"{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }\">&nbsp;</span></div><div class=\"ui-grid-column-menu-button\" ng-if=\"grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false\" ng-click=\"toggleMenu($event)\" ng-class=\"{'ui-grid-column-menu-button-last-col': isLastCol}\"><i class=\"ui-grid-icon-angle-down\">&nbsp;</i></div><div ui-grid-filter></div></div>"
  );


  $templateCache.put('ui-grid/uiGridMenu',
    "<div class=\"ui-grid-menu\" ng-if=\"shown\"><div class=\"ui-grid-menu-mid\" ng-show=\"shownMid\"><div class=\"ui-grid-menu-inner\"><ul class=\"ui-grid-menu-items\"><li ng-repeat=\"item in menuItems\" ui-grid-menu-item action=\"item.action\" name=\"item.title\" active=\"item.active\" icon=\"item.icon\" shown=\"item.shown\" context=\"item.context\" template-url=\"item.templateUrl\" leave-open=\"item.leaveOpen\"></li></ul></div></div></div>"
  );


  $templateCache.put('ui-grid/uiGridMenuItem',
    "<li class=\"ui-grid-menu-item\" ng-click=\"itemAction($event, title)\" ng-show=\"itemShown()\" ng-class=\"{ 'ui-grid-menu-item-active' : active() }\"><i ng-class=\"icon\"></i> {{ name }}</li>"
  );


  $templateCache.put('ui-grid/uiGridRenderContainer',
    "<div class=\"ui-grid-render-container\" ng-style=\"{ 'margin-left': colContainer.getMargin('left') + 'px', 'margin-right': colContainer.getMargin('right') + 'px' }\"><div ui-grid-header></div><div ui-grid-viewport></div><div ng-if=\"colContainer.needsHScrollbarPlaceholder()\" class=\"ui-grid-scrollbar-placeholder\" style=\"height:{{colContainer.grid.scrollbarHeight}}px\"></div><div ui-grid-footer ng-if=\"grid.options.showColumnFooter\"></div></div>"
  );


  $templateCache.put('ui-grid/uiGridViewport',
    "<div class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>"
  );


  $templateCache.put('ui-grid/cellEditor',
    "<div><form name=\"inputForm\"><input type=\"INPUT_TYPE\" ng-class=\"'colt' + col.uid\" ui-grid-editor ng-model=\"MODEL_COL_FIELD\"></form></div>"
  );


  $templateCache.put('ui-grid/dropdownEditor',
    "<div><form name=\"inputForm\"><select ng-class=\"'colt' + col.uid\" ui-grid-edit-dropdown ng-model=\"MODEL_COL_FIELD\" ng-options=\"field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray\"></select></form></div>"
  );


  $templateCache.put('ui-grid/fileChooserEditor',
    "<div><form name=\"inputForm\"><input ng-class=\"'colt' + col.uid\" ui-grid-edit-file-chooser type=\"file\" id=\"files\" name=\"files[]\" ng-model=\"MODEL_COL_FIELD\"></form></div>"
  );


  $templateCache.put('ui-grid/expandableRow',
    "<div ui-grid-expandable-row ng-if=\"expandableRow.shouldRenderExpand()\" class=\"expandableRow\" style=\"float:left; margin-top: 1px; margin-bottom: 1px\" ng-style=\"{width: (grid.renderContainers.body.getCanvasWidth()) + 'px'\n" +
    "     , height: grid.options.expandableRowHeight + 'px'}\"></div>"
  );


  $templateCache.put('ui-grid/expandableRowHeader',
    "<div class=\"ui-grid-row-header-cell ui-grid-expandable-buttons-cell\"><div class=\"ui-grid-cell-contents\"><i ng-class=\"{ 'ui-grid-icon-plus-squared' : !row.isExpanded, 'ui-grid-icon-minus-squared' : row.isExpanded }\" ng-click=\"grid.api.expandable.toggleRowExpansion(row.entity)\"></i></div></div>"
  );


  $templateCache.put('ui-grid/expandableScrollFiller',
    "<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller:true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px',\n" +
    "              height: grid.options.expandableRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\"><i class=\"ui-grid-icon-spin5 ui-grid-animate-spin\" ng-style=\"{ 'margin-top': ( grid.options.expandableRowHeight/2 - 5) + 'px',\n" +
    "            'margin-left' : ((grid.getViewportWidth() - grid.options.rowHeader.rowHeaderWidth)/2 - 5) + 'px' }\"></i></div>"
  );


  $templateCache.put('ui-grid/expandableTopRowHeader',
    "<div class=\"ui-grid-row-header-cell ui-grid-expandable-buttons-cell\"><div class=\"ui-grid-cell-contents\"><i ng-class=\"{ 'ui-grid-icon-plus-squared' : !grid.expandable.expandedAll, 'ui-grid-icon-minus-squared' : grid.expandable.expandedAll }\" ng-click=\"grid.api.expandable.toggleAllRows()\"></i></div></div>"
  );


  $templateCache.put('ui-grid/csvLink',
    "<span class=\"ui-grid-exporter-csv-link-span\"><a href=\"data:text/csv;charset=UTF-8,CSV_CONTENT\" download=\"FILE_NAME\">LINK_LABEL</a></span>"
  );


  $templateCache.put('ui-grid/importerMenuItem',
    "<li class=\"ui-grid-menu-item\"><form><input class=\"ui-grid-importer-file-chooser\" type=\"file\" id=\"files\" name=\"files[]\"></form></li>"
  );


  $templateCache.put('ui-grid/importerMenuItemContainer',
    "<div ui-grid-importer-menu-item></div>"
  );


  $templateCache.put('ui-grid/pagination',
    "<div class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\"><div class=\"ui-grid-pager-container\"><div class=\"ui-grid-pager-control\"><button type=\"button\" ng-click=\"paginationApi.seek(1)\" ng-disabled=\"cantPageBackward()\"><div class=\"first-triangle\"><div class=\"first-bar\"></div></div></button> <button type=\"button\" ng-click=\"paginationApi.previousPage()\" ng-disabled=\"cantPageBackward()\"><div class=\"first-triangle prev-triangle\"></div></button> <input type=\"number\" ng-model=\"grid.options.paginationCurrentPage\" min=\"1\" max=\"{{ paginationApi.getTotalPages() }}\" required> <span class=\"ui-grid-pager-max-pages-number\" ng-show=\"paginationApi.getTotalPages() > 0\">/ {{ paginationApi.getTotalPages() }}</span> <button type=\"button\" ng-click=\"paginationApi.nextPage()\" ng-disabled=\"cantPageForward()\"><div class=\"last-triangle next-triangle\"></div></button> <button type=\"button\" ng-click=\"paginationApi.seek(paginationApi.getTotalPages())\" ng-disabled=\"cantPageToLast()\"><div class=\"last-triangle\"><div class=\"last-bar\"></div></div></button></div><div class=\"ui-grid-pager-row-count-picker\"><select ng-model=\"grid.options.paginationPageSize\" ng-options=\"o as o for o in grid.options.paginationPageSizes\"></select><span class=\"ui-grid-pager-row-count-label\">&nbsp;{{sizesLabel}}</span></div></div><div class=\"ui-grid-pager-count-container\"><div class=\"ui-grid-pager-count\"><span ng-show=\"grid.options.totalItems > 0\">{{showingLow}} - {{showingHigh}} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>"
  );


  $templateCache.put('ui-grid/columnResizer',
    "<div ui-grid-column-resizer ng-if=\"grid.options.enableColumnResizing\" class=\"ui-grid-column-resizer\" col=\"col\" position=\"right\" render-index=\"renderIndex\" unselectable=\"on\"></div>"
  );


  $templateCache.put('ui-grid/gridFooterSelectedItems',
    "<span ng-if=\"grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected\">({{\"search.selectedItems\" | t}} {{grid.selection.selectedCount}})</span>"
  );


  $templateCache.put('ui-grid/selectionHeaderCell',
    "<div><!-- <div class=\"ui-grid-vertical-bar\">&nbsp;</div> --><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><ui-grid-selection-select-all-buttons ng-if=\"grid.options.enableSelectAll\"></ui-grid-selection-select-all-buttons></div></div>"
  );


  $templateCache.put('ui-grid/selectionRowHeader',
    "<div class=\"ui-grid-disable-selection\"><div class=\"ui-grid-cell-contents\"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
  );


  $templateCache.put('ui-grid/selectionRowHeaderButtons',
    "<div class=\"ui-grid-selection-row-header-buttons ui-grid-icon-ok\" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" ng-click=\"selectButtonClick(row, $event)\">&nbsp;</div>"
  );


  $templateCache.put('ui-grid/selectionSelectAllButtons',
    "<div class=\"ui-grid-selection-row-header-buttons ui-grid-icon-ok\" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-click=\"headerButtonClick($event)\"></div>"
  );


  $templateCache.put('ui-grid/treeBaseExpandAllButtons',
    "<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-icon-minus-squared': grid.treeBase.numberLevels > 0 && grid.treeBase.expandAll, 'ui-grid-icon-plus-squared': grid.treeBase.numberLevels > 0 && !grid.treeBase.expandAll}\" ng-click=\"headerButtonClick($event)\"></div>"
  );


  $templateCache.put('ui-grid/treeBaseHeaderCell',
    "<div><div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><ui-grid-tree-base-expand-all-buttons></ui-grid-tree-base-expand-all-buttons></div></div>"
  );


  $templateCache.put('ui-grid/treeBaseRowHeader',
    "<div class=\"ui-grid-cell-contents\"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>"
  );


  $templateCache.put('ui-grid/treeBaseRowHeaderButtons',
    "<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-tree-base-header': row.treeLevel > -1 }\" ng-click=\"treeButtonClick(row, $event)\"><i ng-class=\"{'ui-grid-icon-minus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'expanded', 'ui-grid-icon-plus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'collapsed'}\" ng-style=\"{'padding-left': grid.options.treeIndent * row.treeLevel + 'px'}\"></i> &nbsp;</div>"
  );

}]);
