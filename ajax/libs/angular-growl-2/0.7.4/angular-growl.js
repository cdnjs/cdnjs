/**
 * angular-growl-v2 - v0.7.4 - 2015-05-26
 * http://janstevens.github.io/angular-growl-2
 * Copyright (c) 2015 Marco Rinck,Jan Stevens; Licensed MIT
 */
angular.module('angular-growl', []);
angular.module('angular-growl').directive('growl', [function () {
    'use strict';
    return {
      restrict: 'A',
      templateUrl: 'templates/growl/growl.html',
      replace: false,
      scope: {
        reference: '@',
        inline: '=',
        limitMessages: '='
      },
      controller: [
        '$scope',
        '$timeout',
        'growl',
        'growlMessages',
        function ($scope, $timeout, growl, growlMessages) {
          $scope.referenceId = $scope.reference || 0;
          growlMessages.initDirective($scope.referenceId, $scope.limitMessages);
          $scope.growlMessages = growlMessages;
          $scope.inlineMessage = angular.isDefined($scope.inline) ? $scope.inline : growl.inlineMessages();
          $scope.$watch('limitMessages', function (limitMessages) {
            var directive = growlMessages.directives[$scope.referenceId];
            if (!angular.isUndefined(limitMessages) && !angular.isUndefined(directive)) {
              directive.limitMessages = limitMessages;
            }
          });
          $scope.stopTimeoutClose = function (message) {
            if (!message.clickToClose) {
              angular.forEach(message.promises, function (promise) {
                $timeout.cancel(promise);
              });
              if (message.close) {
                growlMessages.deleteMessage(message);
              } else {
                message.close = true;
              }
            }
          };
          $scope.alertClasses = function (message) {
            return {
              'alert-success': message.severity === 'success',
              'alert-error': message.severity === 'error',
              'alert-danger': message.severity === 'error',
              'alert-info': message.severity === 'info',
              'alert-warning': message.severity === 'warning',
              'icon': message.disableIcons === false,
              'alert-dismissable': !message.disableCloseButton
            };
          };
          $scope.showCountDown = function (message) {
            return !message.disableCountDown && message.ttl > 0;
          };
          $scope.wrapperClasses = function () {
            var classes = {};
            classes['growl-fixed'] = !$scope.inlineMessage;
            classes[growl.position()] = true;
            return classes;
          };
          $scope.computeTitle = function (message) {
            var ret = {
                'success': 'Success',
                'error': 'Error',
                'info': 'Information',
                'warn': 'Warning'
              };
            return ret[message.severity];
          };
        }
      ]
    };
  }]);
angular.module('angular-growl').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    if ($templateCache.get('templates/growl/growl.html') === undefined) {
      $templateCache.put('templates/growl/growl.html', '<div class="growl-container" ng-class="wrapperClasses()">' + '<div class="growl-item alert" ng-repeat="message in growlMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)">' + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="growlMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button>' + '<button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button>' + '<h4 class="growl-title" ng-show="message.title" ng-bind="message.title"></h4>' + '<div class="growl-message" ng-bind-html="message.text"></div>' + '</div>' + '</div>');
    }
  }
]);
angular.module('angular-growl').provider('growl', function () {
  'use strict';
  var _ttl = {
      success: null,
      error: null,
      warning: null,
      info: null
    }, _messagesKey = 'messages', _messageTextKey = 'text', _messageTitleKey = 'title', _messageSeverityKey = 'severity', _onlyUniqueMessages = true, _messageVariableKey = 'variables', _referenceId = 0, _inline = false, _position = 'top-right', _disableCloseButton = false, _disableIcons = false, _reverseOrder = false, _disableCountDown = false, _translateMessages = true;
  this.globalTimeToLive = function (ttl) {
    if (typeof ttl === 'object') {
      for (var k in ttl) {
        if (ttl.hasOwnProperty(k)) {
          _ttl[k] = ttl[k];
        }
      }
    } else {
      for (var severity in _ttl) {
        if (_ttl.hasOwnProperty(severity)) {
          _ttl[severity] = ttl;
        }
      }
    }
    return this;
  };
  this.globalTranslateMessages = function (translateMessages) {
    _translateMessages = translateMessages;
    return this;
  };
  this.globalDisableCloseButton = function (disableCloseButton) {
    _disableCloseButton = disableCloseButton;
    return this;
  };
  this.globalDisableIcons = function (disableIcons) {
    _disableIcons = disableIcons;
    return this;
  };
  this.globalReversedOrder = function (reverseOrder) {
    _reverseOrder = reverseOrder;
    return this;
  };
  this.globalDisableCountDown = function (countDown) {
    _disableCountDown = countDown;
    return this;
  };
  this.messageVariableKey = function (messageVariableKey) {
    _messageVariableKey = messageVariableKey;
    return this;
  };
  this.globalInlineMessages = function (inline) {
    _inline = inline;
    return this;
  };
  this.globalPosition = function (position) {
    _position = position;
    return this;
  };
  this.messagesKey = function (messagesKey) {
    _messagesKey = messagesKey;
    return this;
  };
  this.messageTextKey = function (messageTextKey) {
    _messageTextKey = messageTextKey;
    return this;
  };
  this.messageTitleKey = function (messageTitleKey) {
    _messageTitleKey = messageTitleKey;
    return this;
  };
  this.messageSeverityKey = function (messageSeverityKey) {
    _messageSeverityKey = messageSeverityKey;
    return this;
  };
  this.onlyUniqueMessages = function (onlyUniqueMessages) {
    _onlyUniqueMessages = onlyUniqueMessages;
    return this;
  };
  this.serverMessagesInterceptor = [
    '$q',
    'growl',
    function ($q, growl) {
      function checkResponse(response) {
        if (response !== undefined && response.data && response.data[_messagesKey] && response.data[_messagesKey].length > 0) {
          growl.addServerMessages(response.data[_messagesKey]);
        }
      }
      return {
        'response': function (response) {
          checkResponse(response);
          return response;
        },
        'responseError': function (rejection) {
          checkResponse(rejection);
          return $q.reject(rejection);
        }
      };
    }
  ];
  this.$get = [
    '$rootScope',
    '$interpolate',
    '$sce',
    '$filter',
    '$timeout',
    'growlMessages',
    function ($rootScope, $interpolate, $sce, $filter, $timeout, growlMessages) {
      var translate;
      growlMessages.onlyUnique = _onlyUniqueMessages;
      growlMessages.reverseOrder = _reverseOrder;
      try {
        translate = $filter('translate');
      } catch (e) {
      }
      function broadcastMessage(message) {
        if (translate && message.translateMessage) {
          message.text = translate(message.text, message.variables) || message.text;
          message.title = translate(message.title) || message.title;
        } else {
          var polation = $interpolate(message.text);
          message.text = polation(message.variables);
        }
        var addedMessage = growlMessages.addMessage(message);
        $rootScope.$broadcast('growlMessage', message);
        $timeout(function () {
        }, 0);
        return addedMessage;
      }
      function sendMessage(text, config, severity) {
        var _config = config || {}, message;
        message = {
          text: text,
          title: _config.title,
          severity: severity,
          ttl: _config.ttl || _ttl[severity],
          variables: _config.variables || {},
          disableCloseButton: _config.disableCloseButton === undefined ? _disableCloseButton : _config.disableCloseButton,
          disableIcons: _config.disableIcons === undefined ? _disableIcons : _config.disableIcons,
          disableCountDown: _config.disableCountDown === undefined ? _disableCountDown : _config.disableCountDown,
          position: _config.position || _position,
          referenceId: _config.referenceId || _referenceId,
          translateMessage: _config.translateMessage === undefined ? _translateMessages : _config.translateMessage,
          destroy: function () {
            growlMessages.deleteMessage(message);
          },
          setText: function (newText) {
            message.text = $sce.trustAsHtml(String(newText));
          },
          onclose: _config.onclose,
          onopen: _config.onopen
        };
        return broadcastMessage(message);
      }
      function warning(text, config) {
        return sendMessage(text, config, 'warning');
      }
      function error(text, config) {
        return sendMessage(text, config, 'error');
      }
      function info(text, config) {
        return sendMessage(text, config, 'info');
      }
      function success(text, config) {
        return sendMessage(text, config, 'success');
      }
      function general(text, config, severity) {
        severity = (severity || 'error').toLowerCase();
        sendMessage(text, config, severity);
      }
      function addServerMessages(messages) {
        if (!messages || !messages.length) {
          return;
        }
        var i, message, severity, length;
        length = messages.length;
        for (i = 0; i < length; i++) {
          message = messages[i];
          if (message[_messageTextKey]) {
            severity = (message[_messageSeverityKey] || 'error').toLowerCase();
            var config = {};
            config.variables = message[_messageVariableKey] || {};
            config.title = message[_messageTitleKey];
            sendMessage(message[_messageTextKey], config, severity);
          }
        }
      }
      function onlyUnique() {
        return _onlyUniqueMessages;
      }
      function reverseOrder() {
        return _reverseOrder;
      }
      function inlineMessages() {
        return _inline;
      }
      function position() {
        return _position;
      }
      return {
        warning: warning,
        error: error,
        info: info,
        success: success,
        general: general,
        addServerMessages: addServerMessages,
        onlyUnique: onlyUnique,
        reverseOrder: reverseOrder,
        inlineMessages: inlineMessages,
        position: position
      };
    }
  ];
});
angular.module('angular-growl').service('growlMessages', [
  '$sce',
  '$timeout',
  function ($sce, $timeout) {
    'use strict';
    this.directives = {};
    var preloadDirectives = {};
    function preLoad(referenceId) {
      var directive;
      if (preloadDirectives[referenceId]) {
        directive = preloadDirectives[referenceId];
      } else {
        directive = preloadDirectives[referenceId] = { messages: [] };
      }
      return directive;
    }
    this.initDirective = function (referenceId, limitMessages) {
      if (preloadDirectives[referenceId]) {
        this.directives[referenceId] = preloadDirectives[referenceId];
        this.directives[referenceId].limitMessages = limitMessages;
      } else {
        this.directives[referenceId] = {
          messages: [],
          limitMessages: limitMessages
        };
      }
      return this.directives[referenceId];
    };
    this.getAllMessages = function (referenceId) {
      referenceId = referenceId || 0;
      var messages;
      if (this.directives[referenceId]) {
        messages = this.directives[referenceId].messages;
      } else {
        messages = [];
      }
      return messages;
    };
    this.destroyAllMessages = function (referenceId) {
      var messages = this.getAllMessages(referenceId);
      for (var i = messages.length - 1; i >= 0; i--) {
        messages[i].destroy();
      }
      if (this.directives[referenceId]) {
        this.directives[referenceId].messages = [];
      }
    };
    this.addMessage = function (message) {
      var directive, messages, found, msgText;
      if (this.directives[message.referenceId]) {
        directive = this.directives[message.referenceId];
      } else {
        directive = preLoad(message.referenceId);
      }
      messages = directive.messages;
      if (this.onlyUnique) {
        angular.forEach(messages, function (msg) {
          msgText = $sce.getTrustedHtml(msg.text);
          if (message.text === msgText && message.severity === msg.severity && message.title === msg.title) {
            found = true;
          }
        });
        if (found) {
          return;
        }
      }
      message.text = $sce.trustAsHtml(String(message.text));
      if (message.ttl && message.ttl !== -1) {
        message.countdown = message.ttl / 1000;
        message.promises = [];
        message.close = false;
        message.countdownFunction = function () {
          if (message.countdown > 1) {
            message.countdown--;
            message.promises.push($timeout(message.countdownFunction, 1000));
          } else {
            message.countdown--;
          }
        };
      }
      if (angular.isDefined(directive.limitMessages)) {
        var diff = messages.length - (directive.limitMessages - 1);
        if (diff > 0) {
          messages.splice(directive.limitMessages - 1, diff);
        }
      }
      if (this.reverseOrder) {
        messages.unshift(message);
      } else {
        messages.push(message);
      }
      if (typeof message.onopen === 'function') {
        message.onopen();
      }
      if (message.ttl && message.ttl !== -1) {
        message.promises.push($timeout(angular.bind(this, function () {
          this.deleteMessage(message);
        }), message.ttl));
        message.promises.push($timeout(message.countdownFunction, 1000));
      }
      return message;
    };
    this.deleteMessage = function (message) {
      var messages = this.directives[message.referenceId].messages, index = messages.indexOf(message);
      if (index > -1) {
        messages[index].close = true;
        messages.splice(index, 1);
      }
      if (typeof message.onclose === 'function') {
        message.onclose();
      }
    };
  }
]);