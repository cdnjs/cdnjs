angular.module('angular-growl', []).config(['$httpProvider', function ($httpProvider) {
	"use strict";

	$httpProvider.responseInterceptors.push(['$q', 'growl', function ($q, growl) {
		function success(response) {
			if (response.messages) {
				growl.addServerMessages(response.messages);
			}
			return response;
		}

		function error(response) {
			if (response.messages) {
				growl.addServerMessages(response.messages);
			}

			return $q.reject(response);

		}

		return function (promise) {
			return promise.then(success, error);
		};
	}]);
}]);
angular.module("angular-growl").directive("growl", ["$rootScope", function ($rootScope) {
	"use strict";

	return {
		restrict: 'A',
		template:   '<div class="growl" ng-show="showMessages()" style="position: fixed; top: 10px; right: 10px; float: right; width: 250px;">' +
			'	<div class="alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' +
			'		<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' +
			'            {{ message.text}}' +
			'	</div>' +
			'</div>',
		replace: false,
		scope: true,
		controller: function ($scope) {
			$scope.messages = [];

			$scope.showMessages = function () {
				return $scope.messages.length > 0;
			};

			$rootScope.$on("growlMessage", function (event, message) {
				$scope.messages.push(message);
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
	};
}]);
angular.module("angular-growl").factory("growl", ["$rootScope", "$filter", function ($rootScope, $filter) {
	"use strict";

	var translate;

	try {
		translate = $filter("translate");
	} catch (e){
		//
	}

	function broadcastMessage(message) {
		if (translate) {
			message = translate(message);
		}
		$rootScope.$broadcast("growlMessage", message);
	}

	function sendMessage(text, severity) {
		var message = {
			text: text,
			isWarn: severity.isWarn,
			isError: severity.isError,
			isInfo: severity.isInfo,
			isSuccess: severity.isSuccess
		};

		broadcastMessage(message);
	}

	function addWarnMessage(text) {
		sendMessage(text, {isWarn: true});
	}

	function addErrorMessage(text) {
		sendMessage(text, {isError: true});
	}

	function addInfoMessage(text) {
		sendMessage(text, {isInfo: true});
	}

	function addSuccessMessage(text) {
		sendMessage(text, {isSuccess: true});
	}

	function addServerMessages(messages) {
		if (messages && messages.length > 0) {
			broadcastMessage(messages);
		}
	}

	return {
		addWarnMessage: addWarnMessage,
		addErrorMessage: addErrorMessage,
		addInfoMessage: addInfoMessage,
		addSuccessMessage: addSuccessMessage,
		addServerMessages: addServerMessages

	};
}]);
