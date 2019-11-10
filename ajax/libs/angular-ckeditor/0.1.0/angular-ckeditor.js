/*! Angular CKEditor v0.1.0 | (c) 2014 Le Monde | License MIT */

(function (root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) define(['angular'], factory);
  // Global
  else factory(angular);
}(this, function (angular) {

  angular
  .module('ckeditor', [])
  .directive('ckeditor', ['$parse', ckeditorDirective]);

  /**
   * CKEditor directive.
   *
   * @example
   * <div ckeditor="options" ng-model="content" ready="onReady()"></div>
   */

  function ckeditorDirective($parse) {
    return {
      restrict: 'A',
      require: ['ngModel'],
      link: function (scope, element, attrs, ctrls) {
        var ngModel = ctrls[0];
        var readyHandler = $parse(attrs.ready);
        var config = $parse(attrs.ckeditor)(scope);
        var instance = CKEDITOR.inline(element[0], config || {});
        var ready = instance.status === 'ready';
        var buffer = null;

        // Handle ready event.
        if (ready) onReady();
        else instance.on('instanceReady', function () {
          scope.$apply(onReady);
        });

        function onReady() {
          ready = true;

          // Put editor out of readonly.
          instance.setReadOnly(false);

          // Set the view data.
          setEditorData(buffer);

          // Sync view on specific events.
          ['dataReady', 'change', 'saveSnapshot'].forEach(function (event) {
            instance.on(event, function () {
              // Force events to be asynchrone.
              setTimeout(function () {
                scope.$apply(syncView);
              }, 0);
            });
          });

          // Call external ready handler in a setTimeout to ensure
          // that it's done after the complete ngModel initialization.
          setTimeout(function () {
            readyHandler(scope);
          }, 0);
        }

        // Destroy editor on destroy.
        scope.$on('$destroy', function onDestroy() {
          instance.destroy(false);
        });

        // Set editor data when view data change.
        ngModel.$render = syncEditor;

        /**
         * Sync the editor.
         */

        function syncEditor() {
          if (ready) setEditorData(ngModel.$viewValue);
          else buffer = ngModel.$viewValue;
        }

        /**
         * Sync the view.
         */

        function syncView() {
          ngModel.$setViewValue(instance.getData());
        }

        /**
         * Set editor data.
         *
         * @param {String} data
         */

        function setEditorData(data) {
          instance.setData(data);
        }
      }
    };
  }
}));