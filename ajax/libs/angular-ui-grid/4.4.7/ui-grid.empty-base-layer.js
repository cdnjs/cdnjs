/*!
 * ui-grid - v4.4.7 - 2018-04-20
 * Copyright (c) 2018 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.emptyBaseLayer
   * @description
   *
   * # ui.grid.emptyBaseLayer
   *
   * <div class="alert alert-warning" role="alert"><strong>Alpha</strong> This feature is in development. There will almost certainly be breaking api changes, or there are major outstanding bugs.</div>
   *
   * This module provides the ability to have the background of the ui-grid be empty rows, this would be displayed in the case were
   * the grid height is greater then the amount of rows displayed.
   *
   * <div doc-module-components="ui.grid.emptyBaseLayer"></div>
   */
  var module = angular.module('ui.grid.emptyBaseLayer', ['ui.grid']);


  /**
   *  @ngdoc service
   *  @name ui.grid.emptyBaseLayer.service:uiGridBaseLayerService
   *
   *  @description Services for the empty base layer grid
   */
  module.service('uiGridBaseLayerService', ['gridUtil', '$compile', function (gridUtil, $compile) {
    var service = {
      initializeGrid: function (grid, disableEmptyBaseLayer) {

        /**
         *  @ngdoc object
         *  @name ui.grid.emptyBaseLayer.api:GridOptions
         *
         *  @description GridOptions for emptyBaseLayer feature, these are available to be
         *  set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
         */
        grid.baseLayer = {
          emptyRows: []
        };

        /**
         *  @ngdoc object
         *  @name enableEmptyGridBaseLayer
         *  @propertyOf  ui.grid.emptyBaseLayer.api:GridOptions
         *  @description Enable empty base layer, which shows empty rows as background on the entire grid
         *  <br/>Defaults to true, if the directive is used.
         *  <br/>Set to false either by setting this attribute or passing false to the directive.
         */
        //default option to true unless it was explicitly set to false
        if (grid.options.enableEmptyGridBaseLayer !== false) {
          grid.options.enableEmptyGridBaseLayer = !disableEmptyBaseLayer;
        }
      },

      setNumberOfEmptyRows: function(viewportHeight, grid) {
        var rowHeight = grid.options.rowHeight,
          rows = Math.ceil(viewportHeight / rowHeight);
        if (rows > 0) {
          grid.baseLayer.emptyRows = [];
          for (var i = 0; i < rows; i++) {
            grid.baseLayer.emptyRows.push({});
          }
        }
      }
    };
    return service;
  }]);

  /**
   *  @ngdoc object
   *  @name ui.grid.emptyBaseLayer.directive:uiGridEmptyBaseLayer
   *  @description Shows empty rows in the background of the ui-grid, these span
   *  the full height of the ui-grid, so that there won't be blank space below the shown rows.
   *  @example
   *  <pre>
   *  <div ui-grid="gridOptions" class="grid" ui-grid-empty-base-layer></div>
   *  </pre>
   *  Or you can enable/disable it dynamically by passing in true or false. It doesn't
   *  the value, so it would only be set on initial render.
   *  <pre>
   *  <div ui-grid="gridOptions" class="grid" ui-grid-empty-base-layer="false"></div>
   *  </pre>
   */
  module.directive('uiGridEmptyBaseLayer', ['gridUtil', 'uiGridBaseLayerService',
      '$parse',
    function (gridUtil, uiGridBaseLayerService, $parse) {
      return {
        require: '^uiGrid',
        scope: false,
        compile: function ($elm, $attrs) {
          return {
            pre: function ($scope, $elm, $attrs, uiGridCtrl) {
              var disableEmptyBaseLayer = $parse($attrs.uiGridEmptyBaseLayer)($scope) === false;
              uiGridBaseLayerService.initializeGrid(uiGridCtrl.grid, disableEmptyBaseLayer);
            },
            post: function ($scope, $elm, $attrs, uiGridCtrl) {
              if (!uiGridCtrl.grid.options.enableEmptyGridBaseLayer) {
                return;
              }

              var renderBodyContainer = uiGridCtrl.grid.renderContainers.body,
                viewportHeight = renderBodyContainer.getViewportHeight();

              function heightHasChanged() {
                var newViewPortHeight = renderBodyContainer.getViewportHeight();

                if (newViewPortHeight !== viewportHeight) {
                  viewportHeight = newViewPortHeight;
                  return true;
                }
                return false;
              }

              function getEmptyBaseLayerCss(viewportHeight) {
                // Set ui-grid-empty-base-layer height
                return '.grid' + uiGridCtrl.grid.id +
                  ' .ui-grid-render-container ' +
                  '.ui-grid-empty-base-layer-container.ui-grid-canvas ' +
                  '{ height: ' + viewportHeight + 'px; }';
              }

              uiGridCtrl.grid.registerStyleComputation({
                func: function() {
                  if (heightHasChanged()) {
                    uiGridBaseLayerService.setNumberOfEmptyRows(viewportHeight, uiGridCtrl.grid);
                  }
                  return getEmptyBaseLayerCss(viewportHeight);
                }
              });
            }
          };
        }
      };
    }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.emptyBaseLayer.directive:uiGridViewport
   *  @description stacks on the uiGridViewport directive to append the empty grid base layer html elements to the
   *  default gridRow template
   */
  module.directive('uiGridViewport',
    ['$compile', 'gridUtil', '$templateCache',
      function ($compile, gridUtil, $templateCache) {
        return {
          priority: -200,
          scope: false,
          compile: function ($elm, $attrs) {
            var emptyBaseLayerContainer = $templateCache.get('ui-grid/emptyBaseLayerContainer');
            $elm.prepend(emptyBaseLayerContainer);
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
