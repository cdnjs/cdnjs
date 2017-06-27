angular.module('cgBusy',['ajoslin.promise-tracker']);

angular.module('cgBusy').value('cgBusyTemplateName','angular-busy.html');

angular.module('cgBusy').directive('cgBusy',['promiseTracker','$compile','$templateCache','cgBusyTemplateName','$http','$animate',
	function(promiseTracker,$compile,$templateCache,cgBusyTemplateName,$http,$animate){
		return {
			restrict: 'A',
			link: function(scope, element, attrs, fn) {

				var options = scope.$eval(attrs.cgBusy);

				if (angular.isString(options) || angular.isArray(options)) {
					options = {tracker:options};
				}

				if (angular.isUndefined(options) || angular.isUndefined(options.tracker)){
					throw new Error('Options for cgBusy directive must be provided (tracker option is required).');
				}

				options.tracker = angular.isArray(options.tracker) ? options.tracker : [options.tracker];

				if (!scope.$cgBusyTracker){
					scope.$cgBusyTracker = {};
				}

				angular.forEach(options.tracker, function (tracker) {
					// Checking for a non-existent tracker throws an exception,
					// so we check for one first, then register it if it doesn't exist yet
					try {
						scope.$cgBusyTracker[tracker] = promiseTracker(tracker);
					} catch(error) {
						scope.$cgBusyTracker[tracker] = promiseTracker.register(tracker);
					}
				});

				//multiple cg-busy's can be active in the same scope so we have to be careful not to overwrite the
				//same isActive function.  So lets name it uniquely by the trackers its watching.
				var isActiveFnName = 'isActive_' + options.tracker.join('_');

				scope[isActiveFnName] = function() {
					var active = false;
					angular.forEach(options.tracker, function (tracker) {
						if (scope.$cgBusyTracker[tracker].active()) {
							active = true;
						}
					});
					return active;
				};

				var position = element.css('position');
				if (position === 'static' || position === '' || typeof position === 'undefined'){
					element.css('position','relative');
				}

				var indicatorTemplateName = options.template ? options.template : cgBusyTemplateName;

				$http.get(indicatorTemplateName,{cache: $templateCache}).success(function(indicatorTemplate){

					options.backdrop = typeof options.backdrop === 'undefined' ? true : options.backdrop;
					var backdrop = options.backdrop ? '<div class="cg-busy cg-busy-backdrop"></div>' : '';

					var template = '<div class="cg-busy cg-busy-animation ng-hide" ng-show="'+isActiveFnName+'()">'+ backdrop + indicatorTemplate+'</div>';
					var templateElement = $compile(template)(scope);

					angular.element(templateElement.children()[options.backdrop?1:0])
						.css('position','absolute')
						.css('top',0)
						.css('left',0)
						.css('right',0)
						.css('bottom',0);
					element.append(templateElement);

				}).error(function(data){
					throw new Error('Template specified for cgBusy ('+options.template+') could not be loaded. ' + data);
				});
			}
		};
	}
	]);


angular.module("cgBusy").run(["$templateCache", function($templateCache) {

  $templateCache.put("angular-busy.html",
    "<div class=\"cg-busy-default-wrapper\">\n" +
    "\n" +
    "   <div class=\"cg-busy-default-sign\">\n" +
    "\n" +
    "      <div class=\"cg-busy-default-spinner\">\n" +
    "         <div class=\"bar1\"></div>\n" +
    "         <div class=\"bar2\"></div>\n" +
    "         <div class=\"bar3\"></div>\n" +
    "         <div class=\"bar4\"></div>\n" +
    "         <div class=\"bar5\"></div>\n" +
    "         <div class=\"bar6\"></div>\n" +
    "         <div class=\"bar7\"></div>\n" +
    "         <div class=\"bar8\"></div>\n" +
    "         <div class=\"bar9\"></div>\n" +
    "         <div class=\"bar10\"></div>\n" +
    "         <div class=\"bar11\"></div>\n" +
    "         <div class=\"bar12\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cg-busy-default-text\">Please Wait...</div>\n" +
    "\n" +
    "   </div>\n" +
    "\n" +
    "</div>"
  );

}]);
