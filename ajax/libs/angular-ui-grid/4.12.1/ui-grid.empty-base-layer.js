/*!
 * ui-grid - v4.12.0-9c6a9c83 - 2023-01-19
 *   http://ui-grid.info/
 *   Copyright (c) 2023 UI Grid Team; License: MIT
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 726:
/***/ ((module) => {

module.exports = "<div class=\"ui-grid-empty-base-layer-container ui-grid-canvas\">\n  <div class=\"ui-grid-row\"\n       ng-repeat=\"(rowRenderIndex, row) in grid.baseLayer.emptyRows track by $index\"\n       ng-style=\"Viewport.rowStyle(rowRenderIndex)\">\n    <div>\n      <div>\n        <div  ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\"\n              class=\"ui-grid-cell {{ col.getColClass(false) }}\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 806:
/***/ (() => {

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
    return {
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
        // default option to true unless it was explicitly set to false
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
        compile: function () {
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
          compile: function ($elm) {
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


/***/ }),

/***/ 561:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

angular.module('ui.grid.emptyBaseLayer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/emptyBaseLayerContainer', __webpack_require__(726));
}]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
__webpack_require__(806);
__webpack_require__(561)

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin

})();

/******/ })()
;