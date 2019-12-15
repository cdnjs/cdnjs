/**
 * ng-inline-edit v0.1.0 (http://tamerayd.in/ng-inline-edit)
 * Copyright 2015 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function() {
          $scope.inputValue = $scope.model;
          $scope.editMode = true;
          $timeout(function() {
            $scope.editInput[0].focus();
            $document.bind('click', $scope.onDocumentClick);
          }, 0);
        };

        $scope.applyText = function(cancel, byDOMClick) {
          if (!cancel && $scope.inputValue && $scope.model !== $scope.inputValue) {
            $scope.model = $scope.inputValue;
            $scope.callback({
              newValue: $scope.model
            });
          }

          $scope.editMode = false;
          if (byDOMClick) {
            $scope.$apply();
          }
          $document.unbind('click', $scope.onDocumentClick);
        };

        $scope.onInputKeyup = function(event) {
          switch (event.keyCode) {
            case 13: // ENTER
              $scope.applyText(false, false);
              break;
            case 27: // ESC
              $scope.applyText(true, false);
              break;
            default:
              break;
          }
        };

        $scope.onDocumentClick = function(event) {
          if (event.target !== $scope.editInput[0]) {
            $scope.applyText($scope.cancelOnBlur, true);
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile',
      function($compile) {
        return {
          restrict: 'A',
          controller: 'InlineEditController',
          scope: {
            model: '=inlineEdit',
            callback: '&inlineEditCallback'
          },
          link: function(scope, element, attrs) {
            scope.model = scope.$parent.$eval(attrs.inlineEdit);
            if (attrs.hasOwnProperty('inlineEditCancelOnBlur')) {
              scope.cancelOnBlur = true;
            }

            var input = angular.element(
              '<input type="text" class="ng-inline-edit__input" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" />');
            var container = angular.element(
              '<div class="ng-inline-edit__container"></div>');

            container
              // text
              .append(angular.element(
                '<span class="ng-inline-edit__text" ' +
                  'ng-hide="editMode">{{model}}</span>'))
              // button
              .append(angular.element(
                '<a class="ng-inline-edit__button" ' +
                  'ng-show="model && !editMode" ' +
                  'ng-click="editText()">' + (attrs.inlineEditButtonHtml || '') + '</a>'));

            element
              .append(input)
              .append(container);

            scope.editInput = input;

            attrs.$observe('inlineEdit', function(newValue) {
              scope.model = scope.$parent.$eval(newValue);
              $compile(element.contents())(scope);
            });
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit', [
      'angularInlineEdit.controllers',
      'angularInlineEdit.directives'
    ]);

})(window, window.angular);
