/*
 * JCF directive for basic AngularJS 1.x integration
 */
angular.module('jcf', []).directive('jcf', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			jcf.replace(element);

			scope.$watch(attrs.ngModel, function(newValue) {
				jcf.refresh(element);
			});

			scope.$on('$destroy', function() {
				jcf.destroy(element);
			});
		}
	}
});
