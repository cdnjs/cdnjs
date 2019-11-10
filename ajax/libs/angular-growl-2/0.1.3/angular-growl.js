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
		controller: function ($scope, $timeout) {
			$scope.messages = [];

			$scope.showMessages = function () {
				return $scope.messages.length > 0;
			};

			$rootScope.$on("growlMessage", function (event, message) {
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
	};
}]);

angular.module("angular-growl").provider("growl", function() {
	"use strict";

	var _ttl = null;

	this.globalTimeToLive = function(ttl) {
		_ttl = ttl;
	};

	this.$get = ["$rootScope", "$filter", function ($rootScope, $filter) {

		var translate;

		try {
			translate = $filter("translate");
		} catch (e) {
			//
		}

		function broadcastMessage(message) {
			if (translate) {
				message = translate(message);
			}
			$rootScope.$broadcast("growlMessage", message);
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
			sendMessage(text, config, {isWarn: true});
		}

		function addErrorMessage(text, config) {
			sendMessage(text, config, {isError: true});
		}

		function addInfoMessage(text, config) {
			sendMessage(text, config, {isInfo: true});
		}

		function addSuccessMessage(text, config) {
			sendMessage(text, config, {isSuccess: true});
		}

		function addServerMessages(messages) {
			var i;
			if (messages && messages.length > 0) {
				for (i = 0; i < messages.length; i++) {
					sendMessage(messages[i].text, undefined, messages[i].severity);
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
	}];
});
