/*!
 * ngToast v1.2.0 (http://tameraydin.github.io/ngToast)
 * Copyright 2014 Tamer Aydin
 * Licensed under MIT (http://tameraydin.mit-license.org/)
 */
(function(window, angular, undefined) {
  'use strict';

  angular.module('ngToast.provider', [])
    .provider('ngToast', [
      function() {
        var messages = [],
            messageStack = [];

        var defaults = {
          class: 'success',
          dismissOnTimeout: true,
          timeout: 4000,
          dismissButton: false,
          dismissButtonHtml: '&times;',
          dismissOnClick: true,
          horizontalPosition: 'right', // right, center, left
          verticalPosition: 'top', // top, bottom,
          maxNumber: 0
        };

        function Message(msg) {
          var id = Math.floor(Math.random()*1000);
          while (messages.indexOf(id) > -1) {
            id = Math.floor(Math.random()*1000);
          }

          this.id = id;
          this.class = defaults.class;
          this.dismissOnTimeout = defaults.dismissOnTimeout;
          this.timeout = defaults.timeout;
          this.dismissButton = defaults.dismissButton;
          this.dismissButtonHtml = defaults.dismissButtonHtml;
          this.dismissOnClick = defaults.dismissOnClick;

          angular.extend(this, msg);
        }

        this.configure = function(config) {
          angular.extend(defaults, config);
        };

        this.$get = [function() {
          return {
            settings: defaults,
            messages: messages,
            dismiss: function(id) {
              if (id) {
                for (var i = messages.length - 1; i >= 0; i--) {
                  if (messages[i].id === id) {
                    messages.splice(i, 1);
                    messageStack.splice(messageStack.indexOf(id), 1);
                    return;
                  }
                }

              } else {
                while(messages.length > 0) {
                  messages.pop();
                }
                messageStack = [];
              }
            },
            create: function(msg) {
              if (defaults.maxNumber > 0 &&
                  messageStack.length >= defaults.maxNumber) {
                this.dismiss(messageStack[0]);
              }

              msg = (typeof msg === 'string') ? {content: msg} : msg;

              var newMsg = new Message(msg);
              if (defaults.verticalPosition === 'bottom') {
                messages.unshift(newMsg);
              } else {
                messages.push(newMsg);
              }
              messageStack.push(newMsg.id);
              return newMsg.id;
            }
          };
        }];
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular.module('ngToast.directives', ['ngToast.provider'])
    .directive('ngToast', ['ngToast', '$templateCache', '$log',
      function(ngToast, $templateCache, $log) {
        return {
          replace: true,
          restrict: 'E',
          template:
            '<div class="ng-toast ng-toast--{{hPos}} ng-toast--{{vPos}}">' +
              '<ul class="ng-toast__list">' +
                '<ng-toast-message ng-repeat="message in messages" ' +
                  'message="message">' +
                  '<span ng-bind-html="message.content"></span>' +
                '</ng-toast-message>' +
              '</ul>' +
            '</div>',
          compile: function(tElem, tAttrs) {
            if (tAttrs.template) {
              var template = $templateCache.get(tAttrs.template);
              if (template) {
                tElem.replaceWith(template);
              } else {
                $log.warn('ngToast: Provided template could not be loaded. ' +
                  'Please be sure that it is populated before the <ng-toast> element is represented.');
              }
            }

            return function(scope) {
              scope.hPos = ngToast.settings.horizontalPosition;
              scope.vPos = ngToast.settings.verticalPosition;
              scope.messages = ngToast.messages;
            };
          }
        };
      }
    ])
    .directive('ngToastMessage', ['$timeout', 'ngToast',
      function($timeout, ngToast) {
        return {
          replace: true,
          transclude: true,
          restrict: 'E',
          scope: {
            message: '='
          },
          controller: ['$scope', 'ngToast', function($scope, ngToast) {
            $scope.dismiss = function() {
              ngToast.dismiss($scope.message.id);
            };
          }],
          template:
            '<li class="ng-toast__message">' +
              '<div class="alert alert-{{message.class}}" ' +
                'ng-class="{\'alert-dismissable\': message.dismissButton}">' +
                '<button type="button" class="close" ' +
                  'ng-if="message.dismissButton" ' +
                  'ng-bind-html="message.dismissButtonHtml" ' +
                  'ng-click="!message.dismissOnClick && dismiss()">' +
                '</button>' +
                '<span ng-transclude></span>' +
              '</div>' +
            '</li>',
          link: function(scope, element) {
            if (scope.message.dismissOnTimeout) {
              $timeout(function() {
                ngToast.dismiss(scope.message.id);
              }, scope.message.timeout);
            }

            if (scope.message.dismissOnClick) {
              element.bind('click', function() {
                ngToast.dismiss(scope.message.id);
                scope.$apply();
              });
            }
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('ngToast', [
      'ngAnimate',
      'ngSanitize',
      'ngToast.directives',
      'ngToast.provider'
    ]);

})(window, window.angular);
