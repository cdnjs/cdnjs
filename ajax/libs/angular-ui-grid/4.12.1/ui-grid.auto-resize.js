/*!
 * ui-grid - v4.12.0-9c6a9c83 - 2023-01-19
 *   http://ui-grid.info/
 *   Copyright (c) 2023 UI Grid Team; License: MIT
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 605:
/***/ (() => {

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

  /**
   *  @ngdoc directive
   *  @name ui.grid.autoResize.directive:uiGridAutoResize
   *  @element div
   *  @restrict A
   *
   *  @description Stacks on top of the ui-grid directive and
   *  adds the a watch to the grid's height and width which refreshes
   *  the grid content whenever its dimensions change.
   *
   */
  module.directive('uiGridAutoResize', ['gridUtil', function(gridUtil) {
    return {
      require: 'uiGrid',
      scope: false,
      link: function($scope, $elm, $attrs, uiGridCtrl) {
        var debouncedRefresh;

        function getDimensions() {
          return {
            width: gridUtil.elementWidth($elm),
            height: gridUtil.elementHeight($elm)
          };
        }

        function refreshGrid(prevWidth, prevHeight, width, height) {
          if ($elm[0].offsetParent !== null) {
            uiGridCtrl.grid.gridWidth = width;
            uiGridCtrl.grid.gridHeight = height;
            uiGridCtrl.grid.queueGridRefresh()
              .then(function() {
                uiGridCtrl.grid.api.core.raise.gridDimensionChanged(prevHeight, prevWidth, height, width);
              });
          }
        }

        debouncedRefresh = gridUtil.debounce(refreshGrid, 400);

        $scope.$watchCollection(getDimensions, function(newValues, oldValues) {
          if (!angular.equals(newValues, oldValues)) {
            debouncedRefresh(oldValues.width, oldValues.height, newValues.width, newValues.height);
          }
        });
      }
    };
  }]);
})();


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__(605);

})();

/******/ })()
;