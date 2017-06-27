/*
 * angular-confirm
 * http://schlogen.github.io/angular-confirm/
 * Version: 1.0.4 - 2015-28-04
 * License: Apache
 */
angular.module('angular-confirm', ['ui.bootstrap'])
.controller('ConfirmModalController', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {
  $scope.data = angular.copy(data);

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])
.value('$confirmModalDefaults', {
  template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
            '<div class="modal-body">{{data.text}}</div>' +
            '<div class="modal-footer">' +
            '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
            '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
            '</div>',
  controller: 'ConfirmModalController',
  defaultLabels: {
    title :'Confirm',
    ok: 'OK',
    cancel: 'Cancel'
  }
})
.factory('$confirm', ['$modal', '$confirmModalDefaults', function($modal, $confirmModalDefaults) {
  return function(data, settings) {
    settings = angular.extend($confirmModalDefaults, (settings || {}));

    data = angular.extend({}, settings.defaultLabels, data || {});
	
    if ('templateUrl' in settings && 'template' in settings) {
      delete settings.template;
    }

    settings.resolve = {data: function() { return data; }};

    return $modal.open(settings).result;
  };
}])
.directive('confirm', ['$confirm', function($confirm) {
  return {
    priority: 1,
    restrict: 'A',
    scope: {
      confirmIf: "=",
      ngClick: '&',
      confirm: '@',
      confirmSettings: "=",
      confirmTitle: '@',
      confirmOk: '@',
      confirmCancel: '@'
    },
    link: function(scope, element, attrs) {

      function reBind(func) {
        element.unbind("click").bind("click", function($event) {
          $event.preventDefault();
          func();
        });
      }

      function bindConfirm() {
        var data = { text: scope.confirm };
		if (scope.confirmTitle) {
			data.title = scope.confirmTitle;
		}
		if (scope.confirmOk) {
			data.ok = scope.confirmOk;
		}
		if (scope.confirmCancel) {
			data.cancel = scope.confirmCancel;
		}
        $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
      }

      if (attrs.confirmIf && attrs.confirmIf != "") {
        scope.$watch('confirmIf', function(newVal) {
          if (newVal) {
            reBind(bindConfirm);
          } else {
            reBind(function() {
              scope.$apply(scope.ngClick);
            });
          }
        });
      } else {
        reBind(bindConfirm);
      }
    }
  }
}]);
