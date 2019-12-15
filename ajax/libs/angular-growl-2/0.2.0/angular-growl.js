/**
 * angular-growl - v0.2.0 - 2013-09-22
 * https://github.com/marcorinck/angular-growl
 * Copyright (c) 2013 ; Licensed MIT
 */
angular.module('angular-growl', []);
angular.module('angular-growl').directive('growl', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      restrict: 'A',
      template: '<div class="growl" ng-show="showMessages()">' + '\t<div class="alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' + '\t\t<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' + '            {{ message.text}}' + '\t</div>' + '</div>',
      replace: false,
      scope: true,
      controller: [
        '$scope',
        '$timeout',
        function ($scope, $timeout) {
          $scope.messages = [];
          $scope.showMessages = function () {
            return $scope.messages.length > 0;
          };
          $rootScope.$on('growlMessage', function (event, message) {
            $scope.messages.push(message);
            if (message.ttl && message.ttl !== -1) {
              $timeout(function () {
                $scope.deleteMessage(message);
              }, message.ttl);
            }
          });
          $scope.deleteMessage = function (message) {
            var index = $scope.messages.indexOf(message);
            if (index > -1) {
              $scope.messages.splice(index, 1);
            }
          };
          $scope.computeClasses = function (message) {
            return {
              'alert-success': message.isSuccess,
              'alert-error': message.isError,
              'alert-info': message.isInfo
            };
          };
        }
      ]
    };
  }
]);
angular.module('angular-growl').provider('growl', function () {
  'use strict';
  var _ttl = null;
  this.globalTimeToLive = function (ttl) {
    _ttl = ttl;
  };
  this.serverMessagesInterceptor = [
    '$q',
    'growl',
    function ($q, growl) {
      function success(response) {
        if (response.messages) {
          growl.addServerMessages(response.messages);
        }
        return response;
      }
      function error(response) {
        if (response.messages && response.messages.length > 0) {
          growl.addServerMessages(response.messages);
        }
        return $q.reject(response);
      }
      return function (promise) {
        return promise.then(success, error);
      };
    }
  ];
  this.$get = [
    '$rootScope',
    '$filter',
    function ($rootScope, $filter) {
      var translate;
      try {
        translate = $filter('translate');
      } catch (e) {
      }
      function broadcastMessage(message) {
        if (translate) {
          message = translate(message);
        }
        $rootScope.$broadcast('growlMessage', message);
      }
      function sendMessage(text, config, severity) {
        var _config = config || {};
        var message = {
            text: text,
            isWarn: severity.isWarn,
            isError: severity.isError,
            isInfo: severity.isInfo,
            isSuccess: severity.isSuccess,
            ttl: _config.ttl || _ttl
          };
        broadcastMessage(message);
      }
      function addWarnMessage(text, config) {
        sendMessage(text, config, { isWarn: true });
      }
      function addErrorMessage(text, config) {
        sendMessage(text, config, { isError: true });
      }
      function addInfoMessage(text, config) {
        sendMessage(text, config, { isInfo: true });
      }
      function addSuccessMessage(text, config) {
        sendMessage(text, config, { isSuccess: true });
      }
      function addServerMessages(messages) {
        var i, message, severity, length;
        length = messages.length;
        for (i = 0; i < length; i++) {
          message = messages[i];
          if (message.text && message.severity) {
            switch (message.severity) {
            case 'warn':
              severity = { isWarn: true };
              break;
            case 'success':
              severity = { isSuccess: true };
              break;
            case 'info':
              severity = { isInfo: true };
              break;
            case 'error':
              severity = { isError: true };
              break;
            }
            sendMessage(message.text, undefined, severity);
          }
        }
      }
      return {
        addWarnMessage: addWarnMessage,
        addErrorMessage: addErrorMessage,
        addInfoMessage: addInfoMessage,
        addSuccessMessage: addSuccessMessage,
        addServerMessages: addServerMessages
      };
    }
  ];
});