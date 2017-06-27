(function(angular) {
	"use strict";
	var max_redirects = 10;
	angular.module('ui.router.default', ['ui.router'])
		.config(['$provide', function($provide) {
			$provide.decorator('$state', ['$delegate', function($delegate) {
				var transitionTo = $delegate.transitionTo;
				$delegate.transitionTo = function(to, toParams, options) {
					var numRedirects = 0;
					while(numRedirects++ < max_redirects) {
						var target = this.get(to, this.$current);
						if(target.abstract && target.default) {
							if(target.default[0] == '.') {
								to += target.default;
							} else {
								to = target.default;
							}
						} else {
							break;
						}
					}
					if(numRedirects >= max_redirects) {
						throw new Error("Too many abstract state default redirects");
					}
					return transitionTo.call($delegate, to, toParams, options);
				};
				return $delegate;
			}])
		}]);
})(window.angular);