/*!
 * ui-grid - v4.4.5 - 2018-03-31
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
        var elementWidth,
          elementHeight;

        var updateWidth = gridUtil.throttle(function() {
          elementWidth = gridUtil.elementWidth($elm);
        }, 200);

        var updateHeight = gridUtil.throttle(function() {
          elementHeight = gridUtil.elementHeight($elm);
        }, 200);

        var refresh = gridUtil.throttle(function(width, height) {
          uiGridCtrl.grid.gridWidth = width;
          uiGridCtrl.grid.gridHeight = height;
          uiGridCtrl.grid.refresh();
        }, 300);

        $scope.$watchGroup([
          function() {
            updateWidth();
            return elementWidth;
          },
          function() {
            updateHeight();
            return elementHeight;
          }
        ], function(newValues, oldValues, scope) {
          if (!angular.equals(newValues, oldValues)) {
            refresh(newValues[0], newValues[1]);
          }
        });
      }
    };
  }]);
})();
