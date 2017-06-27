'use strict';
angular.module('ui.sortable', []).value('uiSortableConfig', {}).directive('uiSortable', [
  'uiSortableConfig',
  '$log',
  function (uiSortableConfig, log) {
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        function combineCallbacks(first, second) {
          if (second && typeof second === 'function') {
            return function (e, ui) {
              first(e, ui);
              second(e, ui);
            };
          }
          return first;
        }
        var opts = {};
        var callbacks = {
            receive: null,
            remove: null,
            start: null,
            stop: null,
            update: null
          };
        var apply = function (e, ui) {
          if (ui.item.sortable.resort || ui.item.sortable.relocate) {
            scope.$apply();
          }
        };
        angular.extend(opts, uiSortableConfig);
        if (ngModel) {
          ngModel.$render = function () {
            element.sortable('refresh');
          };
          callbacks.start = function (e, ui) {
            ui.item.sortable = { index: ui.item.index() };
          };
          callbacks.update = function (e, ui) {
            ui.item.sortable.resort = ngModel;
          };
          callbacks.receive = function (e, ui) {
            ui.item.sortable.relocate = true;
            if ('moved' in ui.item.sortable) {
              ngModel.$modelValue.splice(ui.item.index(), 0, ui.item.sortable.moved);
            }
          };
          callbacks.remove = function (e, ui) {
            if (ngModel.$modelValue.length === 1) {
              ui.item.sortable.moved = ngModel.$modelValue.splice(0, 1)[0];
            } else {
              ui.item.sortable.moved = ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0];
            }
          };
          callbacks.stop = function (e, ui) {
            if (ui.item.sortable.resort && !ui.item.sortable.relocate) {
              var end, start;
              start = ui.item.sortable.index;
              end = ui.item.index();
              ui.item.sortable.resort.$modelValue.splice(end, 0, ui.item.sortable.resort.$modelValue.splice(start, 1)[0]);
            }
          };
          scope.$watch(attrs.uiSortable, function (newVal) {
            angular.forEach(newVal, function (value, key) {
              if (callbacks[key]) {
                value = combineCallbacks(callbacks[key], value);
                if (key === 'stop') {
                  value = combineCallbacks(value, apply);
                }
              }
              element.sortable('option', key, value);
            });
          }, true);
          angular.forEach(callbacks, function (value, key) {
            opts[key] = combineCallbacks(value, opts[key]);
          });
          opts.stop = combineCallbacks(opts.stop, apply);
        } else {
          log.info('ui.sortable: ngModel not provided!', element);
        }
        element.sortable(opts);
      }
    };
  }
]);