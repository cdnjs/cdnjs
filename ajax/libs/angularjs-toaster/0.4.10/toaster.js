(function () {
'use strict';

/*
 * AngularJS Toaster
 * Version: 0.4.10
 *
 * Copyright 2013 Jiri Kavulak.  
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa and Hans Fjällemark
 */

angular.module('toaster', ['ngAnimate'])
.constant('toasterConfig', {
    'limit': 0,                   // limits max number of toasts 
    'tap-to-dismiss': true,
    'close-button': false,
    'newest-on-top': true,
    //'fade-in': 1000,            // done in css
    //'on-fade-in': undefined,    // not implemented
    //'fade-out': 1000,           // done in css
    // 'on-fade-out': undefined,  // not implemented
    //'extended-time-out': 1000,    // not implemented
    'time-out': 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
    'icon-classes': {
        error: 'toast-error',
        info: 'toast-info',
        wait: 'toast-wait',
        success: 'toast-success',
        warning: 'toast-warning'
    },
    'body-output-type': '',// Options: '', 'trustedHtml', 'template', 'templateWithData'
    'body-template': 'toasterBodyTmpl.html',
    'icon-class': 'toast-info',
    'position-class': 'toast-top-right',
    'title-class': 'toast-title',
    'message-class': 'toast-message',
    'mouseover-timer-stop': true // stop timeout on mouseover and restart timer on mouseout
})
.service('toaster', ['$rootScope', 'toasterConfig', function ($rootScope, toasterConfig) {
    this.pop = function (type, title, body, timeout, bodyOutputType, clickHandler) {
        if (angular.isObject(type)) {
            var params = type; // NOTE: anable parameters as pop argument
            this.toast = {
                type: params.type,
                title: params.title,
                body: params.body,
                timeout: params.timeout,
                bodyOutputType: params.bodyOutputType,
                clickHandler: params.clickHandler
            };
        }
        else {
            this.toast = {
                type: type,
                title: title,
                body: body,
                timeout: timeout,
                bodyOutputType: bodyOutputType,
                clickHandler: clickHandler
            };
        }
        $rootScope.$emit('toaster-newToast');
    };

    this.clear = function () {
        $rootScope.$emit('toaster-clearToasts');
    };
    
    for (var type in toasterConfig['icon-classes']) {
    this[type] = (function (toasterType){ 
                    return function(title, body, timeout, bodyOutputType, clickHandler) {
                                if (angular.isString(title))
                                    this.pop(toasterType, title, body, timeout, bodyOutputType, clickHandler);
                                else 
                                    this.pop(angular.extend(title, {type: toasterType}));
                               }
                     })(type);
    }
}])
.factory('toasterRegisterEvents', function() {
  
  var toasterFactory = {
      _NewToastEvent: false,
      _ClearAllToastsEvent: false,
      registerNewToastEvent: function(){
        this._NewToastEvent = true;
      },
      registerClearAllToastsEvent: function(){
        this._ClearAllToastsEvent = true;
      },
      isRegisteredNewToastEvent: function(){
        return this._NewToastEvent;
      },
      isRegisteredClearAllToastsEvent: function(){
        return this._ClearAllToastsEvent;
      }
    }
    return {
      registerNewToastEvent: toasterFactory.registerNewToastEvent,
      registerClearAllToastsEvent: toasterFactory.registerClearAllToastsEvent,
      isRegisteredNewToastEvent: toasterFactory.isRegisteredNewToastEvent,
      isRegisteredClearAllToastsEvent: toasterFactory.isRegisteredClearAllToastsEvent
  }
})
.directive('toasterContainer', ['$parse', '$rootScope', '$interval', '$sce', 'toasterConfig', 'toaster', 'toasterRegisterEvents',
function ($parse, $rootScope, $interval, $sce, toasterConfig, toaster, toasterRegisterEvents) {
    return {
        replace: true,
        restrict: 'EA',
        scope: true, // creates an internal scope for this directive
        link: function (scope, elm, attrs) {

            var id = 0,
                mergedConfig;

            mergedConfig = angular.extend({}, toasterConfig, scope.$eval(attrs.toasterOptions));

            scope.config = {
                position: mergedConfig['position-class'],
                title: mergedConfig['title-class'],
                message: mergedConfig['message-class'],
                tap: mergedConfig['tap-to-dismiss'],
                closeButton: mergedConfig['close-button'],
                animation: mergedConfig['animation-class'],
                mouseoverTimer:  mergedConfig['mouseover-timer-stop']
            };

            scope.deregClearToasts = null;
            scope.deregNewToast = null;

            scope.$on("$destroy",function () {
                if (scope.deregClearToasts) scope.deregClearToasts();
                if (scope.deregNewToast) scope.deregNewToast();
                scope.deregClearToasts=null;
                scope.deregNewToast=null;
            });

            scope.configureTimer = function configureTimer(toast) {
                var timeout = typeof (toast.timeout) == "number" ? toast.timeout : mergedConfig['time-out'];
                if (timeout > 0)
                    setTimeout(toast, timeout);
            };

            function addToast(toast) {
                toast.type = mergedConfig['icon-classes'][toast.type];
                if (!toast.type)
                    toast.type = mergedConfig['icon-class'];

                id++;
                angular.extend(toast, { id: id });

                // Set the toast.bodyOutputType to the default if it isn't set
                toast.bodyOutputType = toast.bodyOutputType || mergedConfig['body-output-type'];
                switch (toast.bodyOutputType) {
                    case 'trustedHtml':
                        toast.html = $sce.trustAsHtml(toast.body);
                        break;
                    case 'template':
                        toast.bodyTemplate = toast.body || mergedConfig['body-template'];
                        break;
                    case 'templateWithData':
                        var fcGet = $parse(toast.body || mergedConfig['body-template']);
                        var templateWithData = fcGet(scope);
                        toast.bodyTemplate = templateWithData.template;
                        toast.data = templateWithData.data;
                        break;
                }

                scope.configureTimer(toast);

                if (mergedConfig['newest-on-top'] === true) {
                    scope.toasters.unshift(toast);
                    if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                        scope.toasters.pop();
                    }
                } else {
                    scope.toasters.push(toast);
                    if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                        scope.toasters.shift();
                    }
                }
                
                toast.mouseover = false;
            }
            
            function setTimeout(toast, time) {
                toast.timeout = $interval(function () {
                    if (!toast.mouseover)
                        scope.removeToast(toast.id);
                }, time);
            }

            scope.toasters = [];
            
            if(!toasterRegisterEvents.isRegisteredNewToastEvent()){
                toasterRegisterEvents.registerNewToastEvent();
                scope.deregNewToast = $rootScope.$on('toaster-newToast', function () {
                    addToast(toaster.toast);
              });
            }

            if(!toasterRegisterEvents.isRegisteredClearAllToastsEvent()){
                toasterRegisterEvents.registerClearAllToastsEvent();
                scope.deregClearToasts = $rootScope.$on('toaster-clearToasts', function () {
                    scope.toasters.splice(0, scope.toasters.length);
              });
            }
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            $scope.stopTimer = function (toast) {
                toast.mouseover = true;
                if ($scope.config.mouseoverTimer === true) {
                    if (toast.timeout) {
                        $interval.cancel(toast.timeout);
                        toast.timeout = null;
                    }
                }
            };

            $scope.restartTimer = function (toast) {
                toast.mouseover = false;
                if ($scope.config.mouseoverTimer === true) {
                    if (!toast.timeout)
                        $scope.configureTimer(toast);
                } 
                else if (toast.timeout === null) {
                    $scope.removeToast(toaster.id);
                } 
            };

            $scope.removeToast = function (id) {
                var i = 0;
                for (i; i < $scope.toasters.length; i++) {
                    if ($scope.toasters[i].id === id)
                        break;
                }
                $scope.toasters.splice(i, 1);
            };

            $scope.click = function (toaster, isCloseButton) {
                if ($scope.config.tap === true || isCloseButton == true) {
                    var removeToast = true;
                    if (toaster.clickHandler) {
                        if (angular.isFunction(toaster.clickHandler)) {
                            removeToast = toaster.clickHandler(toaster, isCloseButton);
                        }
                        else if (angular.isFunction($scope.$parent.$eval(toaster.clickHandler))) {
                            removeToast = $scope.$parent.$eval(toaster.clickHandler)(toaster, isCloseButton);
                        }
                        else {
                            console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.");
                        }
                    }
                    if (removeToast) {
                        $scope.removeToast(toaster.id);
                    }
                }
            };
        }],
        template:
        '<div  id="toast-container" ng-class="[config.position, config.animation]">' +
            '<div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)"  ng-mouseout="restartTimer(toaster)">' +
              '<button class="toast-close-button" ng-show="config.closeButton" ng-click="click(toaster, true)">&times;</button>' +
              '<div ng-class="config.title">{{toaster.title}}</div>' +
              '<div ng-class="config.message" ng-switch on="toaster.bodyOutputType">' +
                '<div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div>' +
                '<div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div>' +
                '<div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div>' +
                '<div ng-switch-default >{{toaster.body}}</div>' +
              '</div>' +
            '</div>' +
        '</div>'
    };
}]);
})(window, document);
