/*
 * AngularJS integration with the HTML5 Sortable jQuery Plugin
 * https://github.com/voidberg/html5sortable
 *
 * Copyright 2013, Alexandru Badiu <andu@ctrlz.ro>
 *
 * Thanks to the following contributors: samantp.
 *
 * Released under the MIT license.
 */
(function(angular) {
  'use strict';

  angular.module('htmlSortable', [])
    .directive('htmlSortable', [
      '$timeout', '$parse', function($timeout, $parse) {
        return {
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
            var opts, model;

            opts = angular.extend({}, scope.$eval(attrs.htmlSortable));
            element.sortable(opts);

            if (ngModel) {
              model = $parse(attrs.ngModel);

              ngModel.$render = function() {
                $timeout(function () {
                  element.sortable('reload');
                }, 50);
              };

              scope.$watch(model, function() {
                $timeout(function () {
                  element.sortable('reload');
                }, 50);
              }, true);

              element.sortable().bind('sortupdate', function(e, data) {
                var $source = data.startparent.attr('ng-model');
                var $dest   = data.endparent.attr('ng-model');

                var $sourceModel = $parse($source);
                var $destModel = $parse($dest);

                var $start = data.oldindex;
                var $end   = data.item.index();

                scope.$apply(function () {
                  if ($source === $dest) {
                    var $items = $sourceModel(scope);
                    $items.splice($end, 0, $items.splice($start, 1)[0]);
                    $sourceModel.assign(scope, $items);
                  }
                  else {
                    var $item = scope[$source][$start];
                    var $sourceItems = $sourceModel(scope);
                    var $destItems = $destModel(scope);

                    $sourceItems.splice($start, 1);
                    $destItems.splice($end, 0, $item);

                    $sourceModel.assign(scope, $sourceItems);
                    $destModel.assign(scope, $destItems);
                  }
                });
              });
            }
          }
        };
      }
    ]);
}(angular));
