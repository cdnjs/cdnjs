/*!
 * ui-grid - v4.6.0 - 2018-06-21
 * Copyright (c) 2018 ; License: MIT 
 */

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
