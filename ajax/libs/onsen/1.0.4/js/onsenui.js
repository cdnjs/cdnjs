/*! onsenui - v1.0.4 - 2014-04-04 */
angular.module('templates-main', ['templates/bottom_toolbar.tpl', 'templates/button.tpl', 'templates/checkbox.tpl', 'templates/column.tpl', 'templates/icon.tpl', 'templates/if_orientation.tpl', 'templates/if_platform.tpl', 'templates/list.tpl', 'templates/list_item.tpl', 'templates/navigator.tpl', 'templates/navigator_toolbar.tpl', 'templates/page.tpl', 'templates/radio_button.tpl', 'templates/row.tpl', 'templates/screen.tpl', 'templates/scroller.tpl', 'templates/search_input.tpl', 'templates/select.tpl', 'templates/sliding_menu.tpl', 'templates/split_view.tpl', 'templates/tab_bar.tpl', 'templates/tab_bar_item.tpl', 'templates/text_area.tpl', 'templates/text_input.tpl']);

angular.module("templates/bottom_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bottom_toolbar.tpl",
    "<div class=\"onsen_bottom-toolbar topcoat-navigation-bar topcoat-navigation-bar--bottom\" ng-transclude></div>\n" +
    "");
}]);

angular.module("templates/button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/button.tpl",
    "<button ng-class=\"'topcoat-button--{{type}}'\" class=\"{{item.animation}} effeckt-button topcoat-button no-select\">\n" +
    "	<span class=\"label\" ng-transclude></span>\n" +
    "	<span class=\"spinner topcoat-button__spinner\"></span>\n" +
    "</button>");
}]);

angular.module("templates/checkbox.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/checkbox.tpl",
    "<label class=\"topcoat-checkbox\">\n" +
    "  <input type=\"checkbox\" ng-model=\"ngModel\" ng-true-value=\"{{ngTrueValue || true}}\" ng-false-value=\"{{ngFalseValue || false}}\">\n" +
    "  <div class=\"topcoat-checkbox__checkmark\"></div>\n" +
    "  <span ng-transclude>\n" +
    "  	\n" +
    "  </span>\n" +
    "</label>");
}]);

angular.module("templates/column.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/column.tpl",
    "<div class=\"col col-{{align}} col-{{size}} col-{{offset}}\"></div>");
}]);

angular.module("templates/icon.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/icon.tpl",
    "<i class=\"fa fa-{{icon}} fa-{{size}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}\"></i>");
}]);

angular.module("templates/if_orientation.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/if_orientation.tpl",
    "<div ng-show=\"orientation == userOrientation\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/if_platform.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/if_platform.tpl",
    "<div ng-show=\"platform == userPlatform\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/list.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list.tpl",
    "<div class=\"scroller-wrapper full-screen page\" ons-scrollable>\n" +
    "	<div class=\"scroller\">\n" +
    "		<div class=\"topcoat-list__container\">\n" +
    "			<ul class=\"topcoat-list\" ng-transclude>\n" +
    "\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/list_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list_item.tpl",
    "<li class=\"topcoat-list__item\">\n" +
    "		    		\n" +
    "</li>");
}]);

angular.module("templates/navigator.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator.tpl",
    "<div class=\"navigator-container\">\n" +
    "	<div ng-hide=\"hideToolbar\" class=\"topcoat-navigation-bar no-select navigator-toolbar relative\">	 \n" +
    "		<div class=\"navigator-toolbar__content relative\">\n" +
    "			<div class=\"onsen_navigator-item topcoat-navigation-bar__bg onsen_navigator__left-button-container transition hide\">\n" +
    "				<span class=\"topcoat-icon-button--quiet left-section\">\n" +
    "					<i class=\"fa fa-angle-left fa-2x topcoat-navigation-bar__line-height\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div class=\"onsen_navigator__right-button onsen_navigator-item\">\n" +
    "				<span class=\"topcoat-icon-button--quiet right-section-icon\">\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"relative navigator-content topcoat-page__bg\">\n" +
    "	</div>    \n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/navigator_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator_toolbar.tpl",
    "<div class=\"onse_navigator-toolbar\"></div>");
}]);

angular.module("templates/page.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/page.tpl",
    "<div class=\"page\"></div>");
}]);

angular.module("templates/radio_button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/radio_button.tpl",
    "<label class=\"topcoat-radio-button\">\n" +
    "	{{leftLabel}}\n" +
    "	<input type=\"radio\" name=\"{{name}}\" ng-model=\"ngModel\" value=\"{{value}}\">\n" +
    "	<div class=\"topcoat-radio-button__checkmark\"></div>\n" +
    "	{{rightLabel}}\n" +
    "</label>");
}]);

angular.module("templates/row.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/row.tpl",
    "<div class=\"row row-{{align}}\"></div>");
}]);

angular.module("templates/screen.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/screen.tpl",
    "<div class=\"screen\">\n" +
    "</div>");
}]);

angular.module("templates/scroller.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"scroller-wrapper full-screen page\" ons-scrollable>\n" +
    "	<div class=\"scroller\">\n" +
    "		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/search_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search_input.tpl",
    "<input type=\"search\" class=\"topcoat-search-input\">");
}]);

angular.module("templates/select.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/select.tpl",
    "<select class=\"topcoat-text-input\" ng-transclude>\n" +
    "</select>");
}]);

angular.module("templates/sliding_menu.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<div ng-cloak class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"behind full-screen\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"above full-screen\">		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/split_view.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/split_view.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<div class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"secondary full-screen\">		\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"main full-screen\">		\n" +
    "	</div>\n" +
    "	\n" +
    "</div>");
}]);

angular.module("templates/tab_bar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar.tpl",
    "  <div style=\"margin-bottom: {{tabbarHeight}}\" class=\"tab-bar-content\">\n" +
    "    \n" +
    "  </div>\n" +
    "  <div ng-hide=\"hideTabs\" class=\"topcoat-tab-bar full footer\" ng-transclude>         \n" +
    "  </div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/tab_bar_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar_item.tpl",
    "<label class=\"topcoat-tab-bar__item no-select\">\n" +
    "	<input type=\"radio\" name=\"tab-bar-{{tabbarId}}\">\n" +
    "	<button class=\"topcoat-tab-bar__button full\" ng-click=\"setActive()\">\n" +
    "		<i ng-show=\"icon != undefined\" class=\"fa fa-2x fa-{{tabIcon}} {{tabIcon}}\"></i>\n" +
    "		<div class=\"onsen_tab-bar__label\" ng-class=\"{ big: icon === undefined }\">\n" +
    "			{{label}}\n" +
    "		</div>\n" +
    "	</button>\n" +
    "</label>\n" +
    "");
}]);

angular.module("templates/text_area.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_area.tpl",
    "<textarea class=\"topcoat-textarea\"></textarea>");
}]);

angular.module("templates/text_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_input.tpl",
    "<input class=\"topcoat-text-input\">");
}]);

/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	var directiveModules = angular.module('onsen.directives', ['templates-main']); // [] -> create new module

	directiveModules.run(function($rootScope, $window) {
		$rootScope.ons = $rootScope.ons || {};
		$rootScope.ons.$get = function(id) {
			id = id.replace('#', '');
			return angular.element(document.getElementById(id)).isolateScope();
		};

		// Find first ancestor of el with tagName
		// or undefined if not found
		$rootScope.ons.upTo = function(el, tagName) {
			tagName = tagName.toLowerCase();

			do {
				el = el.parentNode;
				if (el.tagName.toLowerCase() == tagName) {
					return el;
				}
			} while (el.parentNode)

			return null;
		};

		$rootScope.console = $window.console;
		$rootScope.alert = $window.alert;
	});

	directiveModules.service('debugLog', function() {
		return window.ONSEN_DEBUG ? function() {
			console.log.apply(window.console, arguments);
		} : function() { };
	});

	directiveModules.service('requestAnimationFrame', function() {
		var fn = window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			window.requestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60); // 60fps
			};

		return fn;
	});

	directiveModules.factory('ONSEN_CONSTANTS', function() {
		var CONSTANTS = {
			DIRECTIVE_TEMPLATE_URL: "templates"
		};

		return CONSTANTS;
	});
})();

/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsBottomToolbar', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/bottom_toolbar.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsButton', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				shouldSpin: '@',
				animation: '@',
				type: '@',
				disabled: '@'				
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
			link: function(scope, element, attrs){
				var effectButton = element;
				var TYPE_PREFIX = "topcoat-button--";
				scope.item = {};				

				// if animation is not specified -> default is slide-left
				if(scope.animation === undefined || scope.animation === ""){
					scope.item.animation = "slide-left";
				}
		
				scope.$watch('disabled', function(disabled){
					if(disabled === "true"){
						effectButton.attr('disabled', true);
					}else{
						effectButton.attr('disabled', false);
					}
				});

				scope.$watch('animation', function(newAnimation){
					if(newAnimation){
						scope.item.animation = newAnimation;
					}
				});

				scope.$watch('shouldSpin', function(shouldSpin){
					if(shouldSpin === "true"){
						effectButton.attr('data-loading', true);
					}else{
						effectButton.removeAttr('data-loading');
					}
				});
			}
		};
	});
})();

/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsCheckbox', function(ONSEN_CONSTANTS) {
		return {
			require: '?ngModel',
			restrict: 'E',
			replace: true,
			scope: {
				ngModel: '=',
				ngTrueValue: '@',
				ngFalseValue: '@'
			},
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/checkbox.tpl',
			link: function($scope, element, attrs, ngModel){
				var checkbox = element.find('input');				
				var checked = false;
				attrs.$observe('disabled', function(disabled){
					if(disabled === undefined){
						checkbox.attr('disabled', false);						
					}else{
						checkbox.attr('disabled', true);
					}
				});

				if(ngModel){					
					ngModel.$render = function() {						
						checked = ( ngModel.$viewValue == 'true' || ngModel.$viewValue == $scope.ngTrueValue );
						checkbox.attr('checked', checked);
					};

					checkbox.bind('change', function(){
						$scope.$apply(function(){
							ngModel.$setViewValue(checkbox[0].checked);
						});						
					});
				}
			}
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsCol', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				align: '@',
				size: '@',
				offst: '@'
			},			
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/column.tpl',
			compile: function(elt, attr, transclude) {				
				return function(scope, elt, attr) {
					transclude(scope.$parent, function(clone) {						
						elt.append(clone);
					});
				};
			}
		};
	});
})();


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIcon', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,			
			transclude: false,
			scope: {
				icon: '@',
				size: '@',
				rotate: '@',
				flip: '@'				
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/icon.tpl',
			link: function($scope, element, attrs){
				attrs.$observe('spin', function(spin){
					if(spin === "true"){
						$scope.spin = 'spin';
					}else{
						$scope.spin = '';
					}
				});	

				attrs.$observe('fixedWidth', function(fixedWidth){
					if(fixedWidth === "true"){
						$scope.fixedWidth = 'fw';
					}else{
						$scope.fixedWidth = '';						
					}
				});				
			}
		};
	});
})();


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIfOrientation', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'A',
			replace: false,
			transclude: true,
			scope: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/if_orientation.tpl',
			link: function($scope, element, attrs) {

				function getLandscapeOrPortraitFromInteger(orientation){
					if (orientation === undefined ) {
						return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
					}

					if (orientation == 90 || orientation == -90) {
						return 'landscape';
					}

					if (orientation == 0 || orientation == 180) {
						return 'portrait';
					}
				}

				$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);

				window.addEventListener("orientationchange", function() {
					$scope.$apply(function(){
						$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);
					});
				}, false);

				window.addEventListener("resize", function() {
					$scope.$apply(function(){
						$scope.orientation = getLandscapeOrPortraitFromInteger(window.orientation);
					});
				}, false);

				attrs.$observe('onsIfOrientation', function(userOrientation){
					if(userOrientation){
						$scope.userOrientation = userOrientation;
					}
				});
			}
		};
	});
})();


(function() {
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsIfPlatform', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'A',
			replace: false,
			transclude: true,
			scope: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/if_platform.tpl',
			link: function($scope, element, attrs) {

				var platform;				

				var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
				    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
				var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
				var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
				    // At least Safari 3+: "[object HTMLElementConstructor]"
				var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
				var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

				if(isOpera){
					platform = "opera";
				}

				if(isFirefox){
					platform = "firefox";
				}

				if(isSafari){
					platform = "safari";
				}

				if(isChrome){
					platform = "chrome";
				}

				if(isIE){
					platform = "ie";
				}

				if (navigator.userAgent.match(/Android/i)) {
					platform = "android";
				}

				if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
					platform = "blackberry";
				}

				if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
					platform = "ios";
				}

				if (navigator.userAgent.match(/IEMobile/i)) {
					platform = "window";
				}

				$scope.platform = platform;				


				attrs.$observe('onsIfPlatform', function(userPlatform) {
					if (userPlatform) {
						$scope.userPlatform = userPlatform.toLowerCase();
					}
				});				
			}
		};
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsList', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,			
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsListItem', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/list_item.tpl',
			compile: function(elem, attrs, transcludeFn) {
				return function(scope, element, attrs) {
					transcludeFn(scope, function(clone) {
						element.append(clone);
					});
				};
			}
		};
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
	'use strict';
	var directives = angular.module('onsen.directives');

	directives.service('Navigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack, requestAnimationFrame) {
		var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";

		var Navigator = Class.extend({
			/**
			 * @property {Array}
			 */
			navigatorItems: undefined,

			/**
			 * @property {DOMElement}
			 */
			container: undefined,

			/**
			 * @property {DOMElement}
			 */
			toolbar: undefined,

			/**
			 * @property {DOMElement}
			 */
			toolbarContent: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftSection: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftButtonContainer: undefined,

			/**
			 * @property {DOMElement}
			 */
			leftArrow: undefined,

			/**
			 * @property {DOMElement}
			 */
			rightSection: undefined,

			/**
			 * @property {DOMElement}
			 */
			rightSectionIcon: undefined,

			/**
			 * @property {Function}
			 */
			leftButtonClickFn: undefined,

			/**
			 * @property {DOMElement}
			 */
			element: undefined,

			/**
			 * @property {Object}
			 */
			attrs: undefined,

			/**
			 * @property {Object}
			 */
			scope: undefined,

			/**
			 * @param {Object} scope
			 * @param {Object} element
			 * @param {Object} attrs
			 */
			init: function(scope, element, attrs) {
				this.scope = scope;
				this.element = element;
				this.attrs = attrs;

				this.navigatorItems = [];

				this.container = angular.element(element[0].querySelector('.navigator-content'));
				this.toolbar = angular.element(element[0].querySelector('.topcoat-navigation-bar'));
				this.toolbarContent = angular.element(element[0].querySelector('.navigator-toolbar__content'));
				this.leftSection = angular.element(this.toolbarContent[0].querySelector('.left-section'));
				this.leftButtonContainer = angular.element(this.toolbarContent[0].querySelector('.onsen_navigator__left-button-container'));
				this.leftArrow = angular.element(this.leftButtonContainer[0].querySelector('i'));

				this.rightSection = angular.element(this.toolbarContent[0].querySelector('.onsen_navigator__right-button'));
				this.rightSectionIcon = angular.element(this.rightSection[0].querySelector('.right-section-icon'));

				this.leftButtonClickFn = $parse(scope.onLeftButtonClick);

				this.setReady(true);

				// fix android 2.3 click event not fired some times when used with sliding menu
				this.leftButtonContainer.bind('touchend', function() { });

				this.leftButtonContainer.bind('click', this.onLeftButtonClicked.bind(this));				
				this.rightSection.bind('click', this.onRightButtonClicked.bind(this));
				if (scope.page) {
					var options = {
						title: scope.title,
						leftButtonIcon: scope.initialLeftButtonIcon,
						rightButtonIcon: scope.rightButtonIcon,
						onLeftButtonClick: scope.onLeftButtonClick,
						onRightButtonClick: scope.onRightButtonClick
					};
					this.pushPage(scope.page, options);
				}
				this.checkiOS7();

				attrs.$observe('title', function(title) {
					if (title) {
						this.setTitle(title);
					}
				}.bind(this));

				this.attachScopeMethods();
			},

			attachScopeMethods: function(){
				this.scope.pushPage = this.pushPage.bind(this);
				this.scope.popPage = this.popPage.bind(this);
				this.scope.resetToPage = this.resetToPage.bind(this);
				this.scope.getCurrentNavigatorItem = this.getCurrentNavigatorItem.bind(this);
				this.scope.pages = this.navigatorItems;
			},

			attachFastClickEvent: function(el) {
				if (el && el.nodeType) {
					FastClick.attach(el);
				}
			},

			onTransitionEnded: function() {
				this.setReady(true);
			},

			setReady: function(ready) {
				this.ready = ready;
			},

			isReady: function() {
				return this.ready;
			},

			checkiOS7: function() {				
				if (window.device && window.device.platform) {
					if (window.device.platform === 'iOS' && parseFloat(window.device.version) >= 7) {
						setTimeout( this.adjustForiOS7.bind(this), 0);
					}
				} else {
					var self = this;
					document.addEventListener("deviceready", function(){
						if(window.device && window.device.platform){
							self.checkiOS7();
						}else{
							// cordova not suppoorted
						}
					}, false);
				}
			},

			adjustForiOS7: function() {
				this.toolbar[0].style.height = this.toolbar[0].clientHeight + 20 + 'px';
				this.toolbar[0].style.paddingTop = '20px';
			},

			animateBackLabelIn: function(inNavigatorItem, outNavigatorItem) {
				var title = outNavigatorItem.options.title;
				var inBackLabel = angular.element('<div></div>');
				inBackLabel.addClass('onsen_navigator-back-label onsen_navigator-item topcoat-navigation-bar__line-height topcoat-icon-button--quiet navigate_right');
				inBackLabel.bind('click', this.onLeftButtonClicked.bind(this));
				this.attachFastClickEvent(inBackLabel[0]);
				inNavigatorItem.backLabel = inBackLabel;
				if (inNavigatorItem.options.leftButtonIcon) {
					// no back label if user specify icon
					inBackLabel[0].style.display = 'none';
				}
				this.toolbarContent.prepend(inBackLabel);
				inBackLabel.text(title);

				this.toolbarContent[0].offsetWidth;
				setTimeout(function(){
					inBackLabel.removeClass('navigate_right');
					inBackLabel.addClass('transition navigate_center');
				}, 10);
				

				var outLabel = outNavigatorItem.backLabel;
				if (outLabel) {
					outLabel.bind(TRANSITION_END, function transitionEnded(e) {
						outLabel.remove();
						outLabel.unbind(transitionEnded);
					});
					outLabel.removeClass('navigate_center');
					outLabel.addClass('navigate_left');
				}
			},

			animateBackLabelOut: function(inNavigatorItem, outNavigatorItem) {
				var outLabel = outNavigatorItem.backLabel;
				var inLabel = inNavigatorItem.backLabel;
				this.toolbarContent.prepend(inLabel);

				if (outNavigatorItem.options.leftButtonIcon) {
					// no back label if user specify icon
					outLabel.remove();
				} else {
					outLabel.bind(TRANSITION_END, function transitionEnded(e) {
						outLabel.remove();
						outLabel.unbind(transitionEnded);
					});

					this.toolbarContent[0].offsetWidth;
					outLabel.removeClass('transition navigate_center');
					outLabel.addClass('transition navigate_right');
				}


				if (inLabel) {
					this.toolbarContent[0].offsetWidth;
					inLabel.removeClass('navigate_left');
					inLabel.addClass('transition navigate_center');
					inLabel.bind('click', this.onLeftButtonClicked.bind(this));
					this.attachFastClickEvent(inLabel[0]);
				}
			},

			getCurrentNavigatorItem: function() {
				return this.navigatorItems[this.navigatorItems.length - 1];
			},

			onLeftButtonClicked: function() {
				var onLeftButtonClick = this.getCurrentNavigatorItem().options.onLeftButtonClick;
				if (onLeftButtonClick) {
					var onLeftButtonClickFn = $parse(onLeftButtonClick);							
					onLeftButtonClickFn(this.scope.$parent);
				} else {
					if (this.canPopPage()) {
						this.popPage();
					}
				}
			},

			onRightButtonClicked: function() {
				var onRightButtonClick = this.getCurrentNavigatorItem().options.onRightButtonClick;
				if (onRightButtonClick) {
					var onRightButtonClickFn = $parse(onRightButtonClick);
					onRightButtonClickFn(this.scope.$parent);
				}
			},

			setTitle: function(title) { // no animation
				if (this.isEmpty()) {
					return;
				}
				var currentNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];
				currentNavigatorItem.options.title = title;
				if (currentNavigatorItem.titleElement) {
					currentNavigatorItem.titleElement.text(title);
				}
			},

			animateTitleIn: function(inNavigatorItem, outNavigatorItem) {
				var inTitle = inNavigatorItem.options.title || '';
				var inTitleElement = angular.element('<span>' + inTitle + '</span>');
				inTitleElement.attr('class', 'onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__title topcoat-navigation-bar__line-height center transition animate-right');
				var outTitleElement = outNavigatorItem.titleElement;
				outTitleElement.after(inTitleElement);
				outTitleElement.bind(TRANSITION_END, function transitionEnded(e) {
					outTitleElement.remove();
					outTitleElement.unbind(transitionEnded);
				});
				inNavigatorItem.titleElement = inTitleElement;
				setTimeout(function(){
					inTitleElement.removeClass('animate-right');
					inTitleElement.addClass('animate-center');
					outTitleElement.removeClass('animate-center');
					outTitleElement.addClass('transition animate-left');
				}, 10);
			},

			animateRightButtonIn: function(inNavigatorItem, outNavigatorItem) {
				if (inNavigatorItem.rightButtonIconElement || inNavigatorItem.options.rightButtonIcon) {
					var rightButtonIconElement;
					if (inNavigatorItem.rightButtonIconElement) {
						rightButtonIconElement = inNavigatorItem.rightButtonIconElement;
					} else {
						rightButtonIconElement = angular.element('<i></i>');
						rightButtonIconElement.addClass(inNavigatorItem.options.rightButtonIcon + ' topcoat-navigation-bar__line-height onsen_fade');
						this.rightSectionIcon.append(rightButtonIconElement); // fix bug on ios. strange that we cant use rightSectionIcon.append() here
						inNavigatorItem.rightButtonIconElement = rightButtonIconElement;
					}

					this.rightSection[0].offsetWidth;
					setTimeout(function(){
						rightButtonIconElement.removeClass('hide');
						rightButtonIconElement.addClass('transition show');
					}, 10);							
				}

				if (outNavigatorItem && outNavigatorItem.rightButtonIconElement) {
					var rightButton = outNavigatorItem.rightButtonIconElement;
					rightButton.removeClass('show');
					rightButton.addClass('transition hide');
					rightButton.bind(TRANSITION_END, function transitionEnded(e) {
						rightButton.remove();
						rightButton.unbind(transitionEnded);
					});
				}

			},

			animateRightButtonOut: function(inNavigatorItem, outNavigatorItem) {
				if (outNavigatorItem.rightButtonIconElement) {
					var outRightButton = outNavigatorItem.rightButtonIconElement;
					this.toolbarContent[0].offsetWidth;
					outRightButton.removeClass('show');
					outRightButton.addClass('transition hide');
					outRightButton.bind(TRANSITION_END, function transitionEnded(e) {
						outRightButton.remove();
						outRightButton.unbind(transitionEnded);
					});
				}
				if (inNavigatorItem.rightButtonIconElement) {
					var rightButton = inNavigatorItem.rightButtonIconElement;
					this.rightSectionIcon.append(rightButton);
					this.rightSection[0].offsetWidth;
					rightButton.removeClass('hide');
					rightButton.addClass('transition show');
				}
			},

			setLeftButton: function(navigatorItem) {
				var leftButtonIcon = navigatorItem.options.leftButtonIcon;
				if (leftButtonIcon) {
					this.setBackButtonIcon(leftButtonIcon);
					this.showBackButton();
				} else {
					// no icon
					if (this.canPopPage()) {
						this.showBackButton();
						this.setBackButtonIconAsLeftArrow();
					} else {
						// no icon and is root page
						this.hideBackButton();
					}
				}
			},

			setBackButtonIconAsLeftArrow: function() {
				this.leftArrow.attr('class', 'fa fa-angle-left fa-2x topcoat-navigation-bar__line-height');
			},

			setBackButtonIcon: function(iconClass) {
				this.leftArrow.attr('class', iconClass + ' topcoat-navigation-bar__line-height');
			},

			showBackButton: function() {
				this.toolbarContent[0].offsetWidth;
				var that = this;
				setTimeout(function(){
					that.leftButtonContainer.removeClass('hide');
					that.leftButtonContainer.addClass('transition show');
				}, 200);
				
			},

			hideBackButton: function() {
				this.leftButtonContainer.removeClass('show');
				this.leftButtonContainer.addClass('hide');
			},

			animateTitleOut: function(currentNavigatorItem, previousNavigatorItem) {

				var inTitleElement = previousNavigatorItem.titleElement;
				var outTitleElement = currentNavigatorItem.titleElement;
				outTitleElement.after(inTitleElement);
				this.element[0].offsetWidth;
				outTitleElement.bind(TRANSITION_END, function transitionEnded(e) {
					outTitleElement.remove();
					outTitleElement.unbind(transitionEnded);
				});
				outTitleElement.removeClass('animate-center');
				outTitleElement.addClass('transition animate-right');
				inTitleElement.removeClass('animate-left');
				inTitleElement.addClass('animate-center');
			},

			animatePageIn: function(inPage, outPage) {
				var that = this;
				inPage.bind(TRANSITION_END, function transitionEnded(e) {
					that.onTransitionEnded();
				});

				// wait 10ms fo reflow
				setTimeout(function(){
					inPage.attr("class", "onsen_navigator-pager transition navigator_center");
					outPage.attr("class", "onsen_navigator-pager transition navigate_left");
				}, 10);
				
			},

			animatePageOut: function(currentPage, previousPage) {
				previousPage.attr("class", "onsen_navigator-pager navigate_left");
				this.element[0].offsetWidth;
				previousPage.attr("class", "onsen_navigator-pager transition navigator_center");

				var that = this;
				currentPage.bind(TRANSITION_END, function transitionEnded(e) {
					var currentPageScope = currentPage.scope();
					if(currentPageScope){
						currentPageScope.$destroy();
					}
					currentPage.remove();
					currentPage.unbind(transitionEnded);
					that.onTransitionEnded();
				});

				currentPage.attr("class", "onsen_navigator-pager transition navigate_right");
			},

			isEmpty: function() {
				return this.navigatorItems.length < 1;
			},

			canPopPage: function() {
				return this.navigatorItems.length > 1;
			},
			
			resetToPage: function(page, options) {
				if (!this.isReady()) {
					return;
				}
				var navigatorItem;
				for (var i = 0; i < this.navigatorItems.length; i++) {
					navigatorItem = this.navigatorItems[i];
					if (navigatorItem.backLabel) {
						navigatorItem.backLabel.remove();
					}
					if (navigatorItem.titleElement) {
						navigatorItem.titleElement.remove();
					}
					if (navigatorItem.rightButtonIconElement) {
						navigatorItem.rightButtonIconElement.remove();
					}
				};

				this.container.empty();
				this.navigatorItems = [];
				this.pushPage(page, options);
			},

			generatePageEl: function(pageContent, options){
				var page = angular.element('<div></div>');
				page.addClass('onsen_navigator-pager');
				var blackMask = angular.element('<div></div>');
				blackMask.addClass('onsen_navigator-black-mask');
				page.append(blackMask);
				
				var navigatorPage = angular.element('<div></div>');				
				navigatorPage.addClass('navigator-page page');
				navigatorPage.append(pageContent);									

				page.append(navigatorPage);
				return page;
			},

			compilePageEl: function(pageEl, pageScope){
				var compiledPage = $compile(pageEl)(pageScope);
				return compiledPage;
			},

			createPageScope: function(){
				var pageScope = this.scope.$parent.$new();
				return pageScope;
			},

			_pushPageDOM: function(page, pageContent, compiledPage, pageScope, options) {

				var pager = compiledPage;
				this.container.append(pager);				

				if(pageContent.querySelector){
					var navigatorToolbar = pageContent.querySelector('ons-navigator-toolbar');
					if (navigatorToolbar) {
						if (options === undefined) {
							options = {};
						}

						var $navigatorToolbar = angular.element(navigatorToolbar);
						var title = $navigatorToolbar.attr('title');
						var leftButtonIcon = $navigatorToolbar.attr('left-button-icon');
						var rightButtonIcon = $navigatorToolbar.attr('right-button-icon');
						var onLeftButtonClick = $navigatorToolbar.attr('on-left-button-click');
						var onRightButtonClick = $navigatorToolbar.attr('on-right-button-click');
						options.title = options.title || title;
						options.leftButtonIcon = options.leftButtonIcon || leftButtonIcon;
						options.rightButtonIcon = options.rightButtonIcon || rightButtonIcon;
						options.onLeftButtonClick = options.onLeftButtonClick || onLeftButtonClick;
						options.onRightButtonClick = options.onRightButtonClick || onRightButtonClick;

						$navigatorToolbar.remove();
					}	
				}
					

				var navigatorItem = {
					page: pager,
					options: options || {},
					pageScope: pageScope
				};

				if (!this.isEmpty()) {
					var previousNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];
					var previousPage = previousNavigatorItem.page;
					pager.addClass('navigate_right');
					
					setTimeout(function(){
						this.animatePageIn(pager, previousPage);
						this.animateTitleIn(navigatorItem, previousNavigatorItem);

						this.animateBackLabelIn(navigatorItem, previousNavigatorItem);
						this.animateRightButtonIn(navigatorItem, previousNavigatorItem);
					}.bind(this), 0);
					
				} else {
					// root page
					var titleElement = angular.element('<div></div>');
					titleElement.addClass('onsen_navigator-item onsen_navigator-title topcoat-navigation-bar__title topcoat-navigation-bar__line-height center animate-center');
					if (options.title) {
						titleElement.text(options.title);
					}
					this.toolbarContent.append(titleElement);
					navigatorItem.titleElement = titleElement;
					this.animateRightButtonIn(navigatorItem, null);
					this.setReady(true);
				}
				this.navigatorItems.push(navigatorItem);
				this.setLeftButton(navigatorItem);

			},

			pushPage: function(page, options) {
				if (options && typeof options != "object") {
					throw new Error('options must be an objected. You supplied ' + options);
				}
				options = options || {};
				options["page"] = page;

				if (!this.isReady()) {
					return;
				}

				var that = this;

				this.setReady(false);

				$http({
					url: page,
					method: 'GET'
				}).error(function(e) {
					that.onTransitionEnded();
					console.error(e);
				}).success(function(data, status, headers, config) {
					var div = document.createElement('div');
					div.className = 'full-width full-height';
					div.innerHTML = data; 
					var pageContent = angular.element(div.cloneNode(true));
					var pageEl = this.generatePageEl(pageContent, options);
					var pageScope = this.createPageScope();
					var compiledPage = this.compilePageEl(pageEl, pageScope);
					this._pushPageDOM(page, div, compiledPage, pageScope, options);
				}.bind(this)).error(function(data, status, headers, config) {
					console.error('error', data, status);
				});
			},

			popPage: function() {
				if (this.navigatorItems.length < 2 || !this.isReady()) {
					return;
				}
				this.setReady(false);

				var currentNavigatorItem = this.navigatorItems.pop();
				var previousNavigatorItem = this.navigatorItems[this.navigatorItems.length - 1];

				var currentPage = currentNavigatorItem.page;
				var previousPage = previousNavigatorItem.page;
				this.animatePageOut(currentPage, previousPage);

				this.animateTitleOut(currentNavigatorItem, previousNavigatorItem);
				this.animateBackLabelOut(previousNavigatorItem, currentNavigatorItem);

				this.setLeftButton(previousNavigatorItem);
				this.animateRightButtonOut(previousNavigatorItem, currentNavigatorItem);
				currentNavigatorItem.pageScope.$destroy();
			}					
		});

		return Navigator;
	});

	directives.directive('onsNavigator', function(ONSEN_CONSTANTS, $http, $compile, $parse, NavigatorStack, Navigator, $templateCache) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,			
			scope: {
				title: '@',
				page: '@',
				hideToolbar: '@',
				initialLeftButtonIcon: '@leftButtonIcon',
				rightButtonIcon: '@',
				onLeftButtonClick: '@',
				onRightButtonClick: '@'
			},			

			compile: function(element, attrs, transclude) {
				var path = ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator.tpl';
				element.append(angular.element($templateCache.get(path))[0]);

				return{
					pre: function preLink(scope, iElement, iAttrs, controller){	
						// Without templateUrl, we must manually link the scope
						$compile(iElement.children())(scope);
					},

					post: function postLink(scope, iElement, attrs, controller){
						var navigator = new Navigator(scope, iElement, attrs);

						if (!attrs.page) {

							var pageScope = navigator.createPageScope();				
											
							transclude(pageScope, function(compiledPageContent) {
								var options = {
									title: scope.title,
									leftButtonIcon: scope.initialLeftButtonIcon,
									rightButtonIcon: scope.rightButtonIcon,
									onLeftButtonClick: scope.onLeftButtonClick,
									onRightButtonClick: scope.onRightButtonClick
								};
								var compiledPage = navigator.generatePageEl(angular.element(compiledPageContent), options);
								navigator._pushPageDOM('', compiledPageContent[0], compiledPage, pageScope, options);
							});
						}

						NavigatorStack.addNavigator(scope);
						scope.$on('$destroy', function(){
							NavigatorStack.removeNavigator(scope);
						});
					}
				};
			}

		}
	});
})();

(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('NavigatorStack', function($rootScope) {
		var NavigatorStack = Class.extend({
			navigators: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.navigator = {};
				$rootScope.ons.navigator.pushPage = this.pushPage.bind(this);
				$rootScope.ons.navigator.popPage = this.popPage.bind(this);
				$rootScope.ons.navigator.resetToPage = this.resetToPage.bind(this);
				$rootScope.ons.navigator.getCurrentPage = this.getCurrentPage.bind(this);
				$rootScope.ons.navigator.getPages = this.getPages.bind(this);
			},

			_findNavigator: function($event) {
				// finding the right navigator
				var navigator;
				if ($event) {
					var navigatorElement = $rootScope.ons.upTo($event.target, 'ons-navigator');
					navigator = angular.element(navigatorElement).isolateScope();
				} else {
					navigator = this.navigators[this.navigators.length - 1];
				}

				return navigator;
			},

			_checkExistence: function() {
				if (this.navigators.length == 0) {
					throw new Error('oops!! no navigator registerred');
				}
			},

			addNavigator: function(navigator) {
				this.navigators.push(navigator);
			},

			removeNavigator: function(navigator){
				for (var i = 0; i < this.navigators.length; i++) {
					if(this.navigators[i] == navigator){
						this.navigators.splice(i, 1);
					}
				};
			},

			pushPage: function(page, options, $event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.pushPage(page, options);
			},

			resetToPage: function(page, options, $event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.resetToPage(page, options);
			},

			popPage: function($event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.popPage();
			},

			getCurrentPage: function() {
			    this._checkExistence();

			    var navigator = this._findNavigator();
			    return navigator.getCurrentNavigatorItem();
			},

			getPages: function() {
			    this._checkExistence();

			    var navigator = this._findNavigator();
			    return navigator.pages;
			}
		});

		return new NavigatorStack();
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsNavigatorToolbar', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/navigator_toolbar.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsPage', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/page.tpl',
			compile: function(elt, attr, transclude) {				
				return function(scope, elt, attr) {
					transclude(scope, function(clone) {						
						elt.append(clone);
					});
				};
			}
		};
	});
})();
(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsRadioButton', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: false,
			scope: {
				value: '@',
				ngModel: '=',
				leftLabel: '@',
				rightLabel: '@',
				name: '@'
			},
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/radio_button.tpl',
			link: function($scope, element, attrs){
				var radioButton = element.find('input');
				var checked = false;
				attrs.$observe('disabled', function(disabled){
					if(disabled === undefined){
						radioButton.attr('disabled', false);						
					}else{
						radioButton.attr('disabled', true);
					}
				});				
			}
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsRow', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				align: '@'
			},			
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/row.tpl',
			compile: function(elt, attr, transclude) {				
				return function(scope, elt, attr) {
					transclude(scope.$parent, function(clone) {						
						elt.append(clone);
					});
				};
			}
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
	'use strict';
	var directives = angular.module('onsen.directives');

	directives.service('Screen', function(ONSEN_CONSTANTS, $http, $compile, ScreenStack, requestAnimationFrame, debugLog) {
		var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
		var TRANSITION_START = "webkitAnimationStart animationStart msAnimationStart oAnimationStart";

		var Screen = Class.extend({
			init: function(scope, element, attrs) {
				this.screenItems = [];
				this.scope = scope;
				this.element = element;
				this.attrs = attrs;

				this.isReady = true;
				this.attachMethods();

				if(scope.page){
					this.resetToPage(scope.page);
				}				
			},

			onTransitionEnded: function() {
				debugLog('onTransitionEnded: isReady = true');
				this.isReady = true;
			},

			animateInBehindPage: function() {
				var behindPage = this.screenItems[this.screenItems.length - 2].pageElement;
				try {
					behindPage.attr('class', 'screen-page transition modal-behind');
				} catch(e) {
					console.log(e);
				}
			},

			animateInCurrentPage: function(pager) {
				pager.attr("class", "screen-page unmodal");
				var that = this;
				pager.bind(TRANSITION_START, function transitionEnded() {
					that.isReady = false;
				});
				pager.bind(TRANSITION_END, function transitionEnded() {
					that.onTransitionEnded();
				});

				setTimeout(function() {
					requestAnimationFrame(function() {
						pager.attr("class", "screen-page transition screen-center");
						that.animateInBehindPage();
					});
				}, 10);
			},

			animateOutBehindPage: function() {
				var behindPage = this.screenItems[this.screenItems.length - 1].pageElement;
				behindPage.attr('class', 'screen-page transition');
			},

			isEmpty: function() {
				return this.screenItems.length < 1;
			},

			onPageAdded: function(page) {
				var blackMask = angular.element(page[0].querySelector('.onsen_screen-black-mask'));
				blackMask.removeClass('hide');
			},

			generatePageEl: function(pageContent){
				var pageEl = angular.element('<div></div>');
				pageEl.addClass('screen-page');

				var blackMask = angular.element('<div></div>');
				blackMask.addClass('onsen_screen-black-mask hide');
				pageEl.append(blackMask);

				var pageContainer = angular.element('<div></div>');
				pageContainer.addClass('screen-page__container');
				pageEl.append(pageContainer);

				pageContainer.append(pageContent);
				return pageEl;
			},

			compilePageEl: function(pageEl, pageScope){
				var compiledPage = $compile(pageEl)(pageScope);
				return compiledPage;
			},

			createPageScope: function(){
				var pageScope = this.scope.$parent.$new();
				return pageScope;
			},

			/**
			 * @param {String} pageUrl
			 * @param {DOMElement} element This element is must be ons-page element.
			 */
			_presentPageDOM: function(pageUrl, compiledPage, pageScope) {
				
				this.element.append(compiledPage);

				var isAnimate = this.screenItems.length >= 1;
				if (isAnimate) {
					this.animateInCurrentPage(compiledPage);
				} else {
					debugLog('_presentPageDOM: isReady = true');
					this.isReady = true;
				}

				var screenItem = {
					pageUrl: pageUrl,
					pageElement: compiledPage,
					pageScope: pageScope
				};

				this.screenItems.push(screenItem);

				setTimeout(function() {
					this.onPageAdded(compiledPage);
				}.bind(this), 400);
			},

			presentPage: function(page){
				if (!this.isReady) {
					return;
				}

				var that = this;

				$http({
					url: page,
					method: "GET"
				}).error(function(e) {
					that.onTransitionEnded();
					console.error(e);
				}).success(function(data, status, headers, config) {
					var pageContent = angular.element(data.trim());
					var pageEl = this.generatePageEl(pageContent);
					var pageScope = this.createPageScope();
					var compiledPage = this.compilePageEl(pageEl, pageScope);

					that._presentPageDOM(page, compiledPage, pageScope);
				}.bind(this)).error(function(data, status, headers, config) {
					console.log('error', data, status);
				});
			},

			dismissPage: function(){
				if (this.screenItems.length < 2 || !this.isReady) {
					debugLog('Can\'t dismiss anymore');
					debugLog(this.screenItems);
					return;
				}

				var screenItem = this.screenItems.pop();
				var currentPage = screenItem.pageElement;
				this.animateOutBehindPage();
				currentPage.attr("class", "screen-page transition unmodal");
				var that = this;

				currentPage.bind(TRANSITION_START, function transitionEnded() {
					that.isReady = false;
				});
				currentPage.bind(TRANSITION_END, function transitionEnded() {
					currentPage.remove();
					that.isReady = true;
					debugLog('dismissPage() transtion end: isReady = true');
					screenItem.pageScope.$destroy();
				});
			},

			resetToPage: function(page){
				this.scope.presentPage(page);
				for (var i = 0; i < this.screenItems.length - 1; i++) {
					this.screenItems[i].pageElement.remove();
				}
			},

			attachMethods: function() {
				this.scope.presentPage = this.presentPage.bind(this);
				this.scope.resetToPage = this.resetToPage.bind(this);
				this.scope.dismissPage = this.dismissPage.bind(this);
			}
		});

		return Screen;
	});

	directives.directive('onsScreen', function(ONSEN_CONSTANTS, $http, $compile, Screen, ScreenStack) {

		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				page: '@'
			},

			compile: function(element, attrs, transclude) {
				return function(scope, element, attrs) {
					var screen = new Screen(scope, element, attrs);
					if (!attrs.page) {
						
						var pageScope = screen.createPageScope();
				
						transclude(pageScope, function(pageContent) {
							var pageEl = screen.generatePageEl(pageContent);
							screen._presentPageDOM('', pageEl, pageScope);
						});
					}
					ScreenStack.addScreen(scope);
					scope.$on('$destroy', function(){
						ScreenStack.removeScreen(scope);
					});
				}
				
			}
		}
	});
})();

(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('ScreenStack', function($rootScope) {
		var ScreenStack = Class.extend({
			screens: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.screen = {};
				$rootScope.ons.screen.presentPage = this.presentPage.bind(this);
				$rootScope.ons.screen.dismissPage = this.dismissPage.bind(this);
				$rootScope.ons.screen.resetToPage = this.resetToPage.bind(this);
			},

			_findClosestScreen: function($event) {
				// finding the right navigator
				var screen;
				if ($event) {
					var screenElement = $rootScope.ons.upTo($event.target, 'ons-screen');
					screen = angular.element(screenElement).isolateScope();
				} else {
					screen = this.screens[this.screens.length - 1];
				}

				return screen;
			},

			_checkExistence: function() {
				if (this.screens.length == 0) {
					throw new Error('oops!! no navigator registerred');
				}
			},

			addScreen: function(screen) {
				this.screens.push(screen);
			},

			removeScreen: function(screen){
				for (var i = 0; i < this.screens.length; i++) {
					if(this.screens[i] == screen){
						this.screens.splice(i, 1);
					}
				};
			},

			presentPage: function(page, $event) {
				this._checkExistence();

				var screen = this._findClosestScreen($event);
				screen.presentPage(page);
			},

			resetToPage: function(page, $event) {
				this._checkExistence();

				var screen = this._findClosestScreen($event);
				screen.resetToPage(page);
			},

			dismissPage: function($event) {
				this._checkExistence();

				var screen = this._findClosestScreen($event);
				screen.dismissPage();
			}
		});

		return new ScreenStack();
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/



(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsScrollable', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'A',
			replace: false,
			transclude: false,
			link: function(scope, element, attrs) {
				// inifinte scroll

				var scrollWrapper;
				if (!element.hasClass('scroller-wrapper')) {
					console.error('missing .scroller-wrapper class for ons-scrollable');
					return;
				}

				

				scrollWrapper = element[0];
				var offset = parseInt(attrs.threshold) || 10;

				if(scope.onScrolled){
					scrollWrapper.addEventListener('scroll', function() {
						if (scope.infinitScrollEnable) {
							var scrollTopAndOffsetHeight = scrollWrapper.scrollTop + scrollWrapper.offsetHeight;
							var scrollHeightMinusOffset = scrollWrapper.scrollHeight - offset;

							if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
								scope.onScrolled();
							}
						}
					});	
				}
				

				// IScroll for Android
				if (!Modernizr.csstransforms3d) {
					$timeout(function() {
						var iScroll = new IScroll(scrollWrapper, {
							momentum: true,
							bounce: true,
							hScrollbar: false,
							vScrollbar: false,
							preventDefault: false
						});

						iScroll.on('scrollStart', function(e) {
							var scrolled = iScroll.y - offset;							
							if (scrolled < (iScroll.maxScrollY + 40) ) {
								// TODO: find a better way to know when content is upated so we can refresh
								iScroll.refresh();
							}
						});

						if(scope.onScrolled){
							iScroll.on('scrollEnd', function(e) {
								var scrolled = iScroll.y - offset;
								if (scrolled < iScroll.maxScrollY) {
									// console.log('we are there!');
									scope.onScrolled();
								}
							});	
						}
						
					}, 500);
				}
			}
		};
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsScroller', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,
			scope: {
				onScrolled: '&',
				infinitScrollEnable: '='
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/scroller.tpl',
			compile: function(elem, attrs, transcludeFn) {
				return function(scope, element, attrs) {
					var scroller = angular.element(element[0].querySelector('.scroller'));
					transcludeFn(scope.$parent, function(clone) {
						scroller.append(clone);
					});
				};
			}
		};
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSearchInput', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: false,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/search_input.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSelect', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/select.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSlidingMenu', function(ONSEN_CONSTANTS, $http, $compile, SlidingMenuStack) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				behindPage: '@',
				abovePage: '@',
				maxSlideDistance: '@',
				swipable: '@',
				swipeTargetWidth: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/sliding_menu.tpl',
			link: function(scope, element, attrs) {
				var MAIN_PAGE_RATIO = 0.9;
				var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
				var BROWSER_TRANSFORMS = [
					"webkitTransform",
					"mozTransform",
					"msTransform",
					"oTransform",
					"transform"
				];

				var Swiper = Class.extend({
					init: function(element) {
						this.isReady = false;
						this.$el = element;
						this.el = element[0];
						this.VERTICAL_THRESHOLD = 20;
						this.HORIZONTAL_THRESHOLD = 20;
						this.behindPage = element[0].querySelector('.behind');
						this.$behindPage = angular.element(this.behindPage);
						this.abovePage = element[0].querySelector('.above');
						this.$abovePage = angular.element(this.abovePage);
						this.blackMask = element[0].querySelector('.onsen_sliding-menu-black-mask');
						this.previousX = 0;
						this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;						

						scope.$watch('maxSlideDistance', this.onMaxSlideDistanceChanged.bind(this));
						scope.$watch('swipable', this.onSwipableChanged.bind(this));
						scope.$watch('swipeTargetWidth', this.onSwipeTargetWidthChanged.bind(this));
						window.addEventListener("resize", this.onWindowResize.bind(this));

						this.currentX = 0;
						this.startX = 0;

						this.boundHandleEvent = this.handleEvent.bind(this);

						this.attachMethods();
						this.bindEvents();

						if (scope.abovePage) {
							scope.setAbovePage(scope.abovePage);
						}

						if (scope.behindPage) {
							scope.setBehindPage(scope.behindPage);
						}

						window.setTimeout(function() {
							this.isReady = true;
							this.behindPage.style.opacity = 1;
							this.blackMask.style.opacity = 1;
						}.bind(this), 400);
					},

					onSwipableChanged: function(swipable){
						if(swipable == "" || swipable == undefined){
							swipable = true;
						}else{
							swipable = (swipable == "true");
						}

						if(swipable){
							this.activateHammer();
						}else{
							this.deactivateHammer();
						}
					},

					onSwipeTargetWidthChanged: function(targetWidth){
						if(typeof targetWidth == 'string'){
							targetWidth = targetWidth.replace('px', '');
						}
						var width = parseInt(targetWidth);
						if(width < 0 || !targetWidth){
							this.swipeTargetWidth = this.abovePage.clientWidth;
						}else{
							this.swipeTargetWidth = width;
						}
					},

					onWindowResize: function(){
						this.recalculateMAX();
					},

					onMaxSlideDistanceChanged: function(){						
						this.recalculateMAX();
					},

					recalculateMAX: function(){
						var maxDistance = scope.maxSlideDistance;
						if(typeof maxDistance == 'string'){
							if(maxDistance.indexOf('px') > 0){
								maxDistance = maxDistance.replace('px', '');
							}else if(maxDistance.indexOf('%') > 0){
								maxDistance = maxDistance.replace('%', '');
								maxDistance = parseFloat(maxDistance) / 100 * this.abovePage.clientWidth;
							}							
						}
						if (maxDistance) {
							this.MAX = parseInt(maxDistance, 10);
						}
					},

					activateHammer: function(){
						this.hammertime.on("touch dragleft dragright swipeleft swiperight release", this.boundHandleEvent);
					},

					deactivateHammer: function(){
						this.hammertime.off("touch dragleft dragright swipeleft swiperight release", this.boundHandleEvent);
					},

					bindEvents: function() {
						this.hammertime = new Hammer(this.el);						
						this.$abovePage.bind(TRANSITION_END, this.onTransitionEnd.bind(this));
					},

					attachMethods: function() {
						scope.setBehindPage = function(page) {
							if (page) {
								$http({
									url: page,
									method: "GET"
								}).error(function(e) {
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var page = angular.element('<div></div>');
									page.addClass('page');
									var pageScope = scope.$parent.$new();
									var pageContent = $compile(templateHTML)(pageScope);
									page.append(pageContent);
									this.$behindPage.append(page);

									if(this.currentBehindPageScope){
										this.currentBehindPageScope.$destroy();
										this.currentBehindPageElement.remove();
									}

									this.currentBehindPageElement = page;
									this.currentBehindPageScope = pageScope;

								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);

						scope.setAbovePage = function(pageUrl) {
							if (this.currentPageUrl === pageUrl) {
								// same page -> ignore
								return;
							}

							if (pageUrl) {
								$http({
									url: pageUrl,
									method: "GET"
								}).error(function(e) {
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var pageElement = angular.element('<div></div>');
									pageElement.addClass('page');
									pageElement[0].style.opacity = 0;
									var pageScope = scope.$parent.$new();
									var pageContent = $compile(templateHTML)(pageScope);
									pageElement.append(pageContent);
									this.$abovePage.append(pageElement);

									// prevent black flash
									setTimeout(function() {
										pageElement[0].style.opacity = 1;
										if (this.currentPageElement) {
											this.currentPageElement.remove();
											this.currentPageScope.$destroy();
										}
										this.currentPageElement = pageElement;
										this.currentPageScope = pageScope;
									}.bind(this), 0);

									this.currentPageUrl = pageUrl;
								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);
					},


					handleEvent: function(ev) {
						if (this.isInsideIgnoredElement(ev.target))
							ev.gesture.stopDetect();

						switch (ev.type) {

							case 'touch':
								if(this.isClosed()){
									if(!this.isInsideSwipeTargetArea(ev.gesture.center.pageX)){
										ev.gesture.stopDetect();
									}	
								}
								
								break;

							case 'dragleft':
							case 'dragright':
								ev.gesture.preventDefault();
								var deltaX = ev.gesture.deltaX;
								this.currentX = this.startX + deltaX;
								if (this.currentX >= 0) {
									this.translate(this.currentX);
								}
								break;

							case 'swipeleft':
								ev.gesture.preventDefault();
								this.close();
								break;

							case 'swiperight':
								ev.gesture.preventDefault();
								this.open();
								break;

							case 'release':
								if (this.currentX > this.MAX / 2) {
									this.open();
								} else {
									this.close();
								}
								break;
						}
					},

					isInsideIgnoredElement: function (el) {
					    do {
					        if (el.getAttribute && el.getAttribute("sliding-menu-ignore"))
					            return true;
					        el = el.parentNode;
					    } while (el);
					    return false;
					},

					isInsideSwipeTargetArea: function(x){
						return x < this.swipeTargetWidth;
					},

					onTransitionEnd: function() {
						this.$abovePage.removeClass('transition');
						this.$behindPage.removeClass('transition');
					},

					isClosed: function(){
						return this.startX == 0;
					},

					close: function() {
						this.startX = 0;
						if (this.currentX !== 0) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(0);
						}
					},

					open: function() {
						this.startX = this.MAX;
						if (this.currentX != this.MAX) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(this.MAX);
						}
					},

					toggle: function() {
						if (this.startX === 0) {
							this.open();
						} else {
							this.close();
						}
					},

					translate: function(x) {
						var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';
						
						var behind = (x - this.MAX) / this.MAX * 10;
						if(behind > 0){
							behind = 0;
						}
						var opacity = 1 + behind / 100;
						var behindTransform = 'translate3d(' + behind + '%, 0, 0)';

						var property;
						for (var i = 0; i < BROWSER_TRANSFORMS.length; i++) {
							property = BROWSER_TRANSFORMS[i];
							this.abovePage.style[property] = aboveTransform;
							this.behindPage.style[property] = behindTransform;
						};
						if(this.isReady){
							this.behindPage.style.opacity = opacity;
						}						
						this.currentX = x;
					}
				});

				var swiper = new Swiper(element);


				scope.openMenu = function() {
					swiper.open();
				};

				scope.closeMenu = function() {
					swiper.close();
				};

				scope.toggleMenu = function() {
					swiper.toggle();
				};


				SlidingMenuStack.addSlidingMenu(scope);
				scope.$on('$destroy', function(){
					SlidingMenuStack.removeSlidingMenu(scope);
				});
			}
		};
	});
})();
(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('SlidingMenuStack', function($rootScope) {
		var SlidingMenuStack = Class.extend({
			slidingMenus: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.slidingMenu = {};
				$rootScope.ons.slidingMenu.setAbovePage = this.setAbovePage.bind(this);
				$rootScope.ons.slidingMenu.setBehindPage = this.setBehindPage.bind(this);
				$rootScope.ons.slidingMenu.toggleMenu = this.toggleMenu.bind(this);
				$rootScope.ons.slidingMenu.openMenu = this.openMenu.bind(this);
				$rootScope.ons.slidingMenu.closeMenu = this.closeMenu.bind(this);
			},

			_findClosestSlidingMenu: function($event) {				
				var slidingMenu;
				if ($event) {
					var slidingMenuElement = $rootScope.ons.upTo($event.target, 'ons-sliding-menu');
					slidingMenu = angular.element(slidingMenuElement).isolateScope();
				} else {
					slidingMenu = this.slidingMenus[this.slidingMenus.length - 1];
				}

				return slidingMenu;
			},

			_checkExistence: function() {
				if (this.slidingMenus.length == 0) {
					throw new Error('oops!! no sliding-menu registerred');
				}
			},

			addSlidingMenu: function(slidingMenu) {
				this.slidingMenus.push(slidingMenu);
			},

			removeSlidingMenu: function(slidingMenu){
				for (var i = 0; i < this.slidingMenus.length; i++) {
					if(this.slidingMenus[i] == slidingMenu){
						this.slidingMenus.splice(i, 1);
					}
				};
			},

			setAbovePage: function(page, $event) {
				this._checkExistence();

				var slidingMenu = this._findClosestSlidingMenu($event);
				slidingMenu.setAbovePage(page);
			},

			setBehindPage: function(page, $event) {
				this._checkExistence();

				var slidingMenu = this._findClosestSlidingMenu($event);
				slidingMenu.setBehindPage(page);
			},

			toggleMenu: function($event) {
				this._checkExistence();

				var slidingMenu = this._findClosestSlidingMenu($event);
				slidingMenu.toggleMenu();
			},

			openMenu: function($event) {
				this._checkExistence();

				var slidingMenu = this._findClosestSlidingMenu($event);
				slidingMenu.openMenu();
			},

			closeMenu: function($event) {
				this._checkExistence();

				var slidingMenu = this._findClosestSlidingMenu($event);
				slidingMenu.closeMenu();
			}
		});

		return new SlidingMenuStack();
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsSplitView', function(ONSEN_CONSTANTS, $http, $compile, SplitViewStack) {
		return {
			restrict: 'E',
			replace: false,
			transclude: false,
			scope: {
				secondaryPage: '@',
				mainPage: '@',
				collapse: '@',
				mainPageWidth: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/split_view.tpl',
			link: function(scope, element, attrs) {
				var SPLIT_MODE = 0;
				var COLLAPSE_MODE = 1;
				var MAIN_PAGE_RATIO = 0.9;			

				var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
				var BROWSER_TRANSFORMS = [
					"webkitTransform",
					"mozTransform",
					"msTransform",
					"oTransform",
					"transform"
				];

				var Swiper = Class.extend({
					init: function(element) {
						this.$el = element;
						this.el = element[0];
						this.VERTICAL_THRESHOLD = 20;
						this.HORIZONTAL_THRESHOLD = 20;
						this.behindPage = element[0].querySelector('.secondary');
						this.$behindPage = angular.element(this.behindPage);
						this.abovePage = element[0].querySelector('.main');
						this.$abovePage = angular.element(this.abovePage);
						this.previousX = 0;
						this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;
						this.currentX = 0;
						this.startX = 0;
						this.mode = SPLIT_MODE;

						this.hammertime = new Hammer(this.el);
						this.boundHammerEvent = this.handleEvent.bind(this);
						this.bindEvents();

						window.addEventListener("orientationchange", this.onOrientationChange.bind(this));
						window.addEventListener('resize', this.onResize.bind(this));
						
						this.attachMethods();

						if(scope.mainPage){
							scope.setMainPage(scope.mainPage);
						}

						if(scope.secondaryPage){
							scope.setSecondaryPage(scope.secondaryPage);
						}

						window.setTimeout(function(){
							this.considerChangingCollapse();							
						}.bind(this), 100);
					},

					attachMethods: function(){
						scope.setSecondaryPage = function(page) {
							if (page) {
								$http({
									url: page,
									method: "GET"
								}).error(function(e){
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var page = angular.element('<div></div>');
									page.addClass('page');		
									var pageScope = scope.$parent.$new();
									var pageContent = $compile(templateHTML)(pageScope);
									page.append(pageContent);
									this.$behindPage.append(page);	


									if(this.currentBehindPageElement){
										this.currentBehindPageElement.remove();
										this.currentBehindPageScope.$destroy();
									}

									this.currentBehindPageElement = page;
									this.currentBehindPageScope = pageScope;

								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);

						scope.setMainPage = function(page) {
							if (page) {
								$http({
									url: page,
									method: "GET"
								}).error(function(e){
									console.error(e);
								}).success(function(data, status, headers, config) {
									var templateHTML = angular.element(data.trim());
									var page = angular.element('<div></div>');
									page.addClass('page');
									page[0].style.opacity = 0;
									var pageScope = scope.$parent.$new();
									var pageContent = $compile(templateHTML)(pageScope);
									page.append(pageContent);
									this.$abovePage.append(page);

									// prevent black flash
									setTimeout(function(){
										page[0].style.opacity = 1;
										if(this.currentPage){
											this.currentPage.remove();
											this.currentPageScope.$destroy();
										}
										this.currentPage = page;
										this.currentPageScope = pageScope;
									}.bind(this), 0);

								}.bind(this));
							} else {
								throw new Error('cannot set undefined page');
							}
						}.bind(this);
					},

					onOrientationChange: function() {
						this.considerChangingCollapse();
					},

					onResize: function() {
						this.considerChangingCollapse();
						this.MAX = this.abovePage.clientWidth * MAIN_PAGE_RATIO;
					},

					considerChangingCollapse: function() {
						if (this.shouldCollapse()) {
							this.activateCollapseMode();
						} else {
							this.deactivateCollapseMode();
						}
					},

					shouldCollapse: function() {
						var orientation = window.orientation;
						if(orientation === undefined ){
							orientation = window.innerWidth > window.innerHeight ? 90 : 0;
						}

						switch (scope.collapse) {
							case undefined:
							case "none":
								return false;

							case "portrait":
								if (orientation == 180 || orientation == 0) {
									return true;
								} else {
									return false;
								}
								break;

							case "landscape":
								if (orientation == 90 || orientation == -90) {
									return true;
								} else {
									return false;
								}
								break;

							default:
								// by width
								if (scope.collapse === undefined) {
									return false;
								} else {
									var widthToken;
									if (scope.collapse.indexOf('width') >= 0) {
										var tokens = scope.collapse.split(' ');
										widthToken = tokens[tokens.length - 1];
									}else{
										widthToken = scope.collapse;
									}

									if (widthToken.indexOf('px') > 0) {
										widthToken = widthToken.substr(0, widthToken.length - 2);
									}

									if (isNumber(widthToken)) {
										if (window.innerWidth < widthToken) {
											return true;
										} else {
											return false;
										}
									}

									return false;									
								}

								break;
						}

					},

					setSize: function() {						
						if(!scope.mainPageWidth){
							scope.mainPageWidth = "70";
						}
						var behindSize = 100 - scope.mainPageWidth.replace('%', '');
						this.behindPage.style.width = behindSize + '%';
						this.behindPage.style.opacity = 1;
						this.abovePage.style.width = scope.mainPageWidth + '%';
						var translate = this.behindPage.clientWidth;
						this.translateAboveOnly(translate);
					},

					activateCollapseMode: function() {
						this.behindPage.style.width =  '100%';
						this.abovePage.style.width = '100%';
						this.mode = COLLAPSE_MODE;
						this.activateHammer();
						this.translate(0);

						if (Modernizr.boxshadow) {
							this.$abovePage.addClass('onsen_split-view__shadow');
						}
					},

					deactivateCollapseMode: function() {
						this.setSize();
						this.deactivateHammer();
						this.mode = SPLIT_MODE;
						if (Modernizr.boxshadow) {
							this.$abovePage.removeClass('onsen_split-view__shadow');
						}
					},

					activateHammer: function() {
						this.hammertime.on("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
					},

					deactivateHammer: function() {
						this.hammertime.off("dragleft dragright swipeleft swiperight release", this.boundHammerEvent);
					},

					bindEvents: function() {
						this.$abovePage.bind(TRANSITION_END, this.onTransitionEnd.bind(this));
					},

					handleEvent: function(ev) {
						switch (ev.type) {

							case 'dragleft':
							case 'dragright':
								ev.gesture.preventDefault();
								var deltaX = ev.gesture.deltaX;
								this.currentX = this.startX + deltaX;
								if (this.currentX >= 0) {
									this.translate(this.currentX);
								}
								break;

							case 'swipeleft':
								ev.gesture.preventDefault();
								this.close();
								break;

							case 'swiperight':
								ev.gesture.preventDefault();
								this.open();
								break;

							case 'release':
								if (this.currentX > this.MAX / 2) {
									this.open();
								} else {
									this.close();
								}
								break;
						}
					},

					onTransitionEnd: function() {
						this.$abovePage.removeClass('transition');
						this.$behindPage.removeClass('transition');
					},

					close: function() {
						if (this.mode === SPLIT_MODE) {
							return;
						}
						this.startX = 0;
						if (this.currentX !== 0) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(0);
						}
					},

					open: function() {
						if (this.mode === SPLIT_MODE) {
							return;
						}
						this.startX = this.MAX;
						if (this.currentX != this.MAX) {
							this.$abovePage.addClass('transition');
							this.$behindPage.addClass('transition');
							this.translate(this.MAX);
						}
					},

					toggle: function() {
						if (this.startX === 0) {
							this.open();
						} else {
							this.close();
						}
					},

					translate: function(x) {
						var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';
						
						var behind = (x - this.MAX) / this.MAX * 10;
						var opacity = 1 + behind / 100;
						var behindTransform = 'translate3d(' + behind + '%, 0, 0)';

						var property;
						for (var i = 0; i < BROWSER_TRANSFORMS.length; i++) {
							property = BROWSER_TRANSFORMS[i];
							this.abovePage.style[property] = aboveTransform;
							this.behindPage.style[property] = behindTransform;
						};
						
						this.behindPage.style.opacity = opacity;
						this.currentX = x;
					},

					translateAboveOnly: function(x) {
						var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';
						var behindTransform = 'translate3d(0, 0, 0)';

						var property;
						for (var i = 0; i < BROWSER_TRANSFORMS.length; i++) {
							property = BROWSER_TRANSFORMS[i];
							this.abovePage.style[property] = aboveTransform;
							this.behindPage.style[property] = behindTransform;
						};
												
						this.currentX = x;
					}
				});

				function isNumber(n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				}

				var swiper = new Swiper(element);

				scope.pages = {
					behind: scope.secondaryPage					
				};

				scope.open = function() {
					swiper.open();
				};

				scope.close = function() {
					swiper.close();
				};

				scope.toggle = function() {
					swiper.toggle();
				};

				scope.setSecondaryPage = function(page) {
					if (page) {
						scope.pages.behind = page;
					} else {
						throw new Error('cannot set undefined page');
					}
				};	

				SplitViewStack.addSplitView(scope);		
				scope.$on('$destroy', function(){
					SplitViewStack.removeSplitView(scope);
				});	
			}
		};
	});
})();
(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('SplitViewStack', function($rootScope) {
		var SplitViewStack = Class.extend({
			splitViews: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.splitView = {};
				$rootScope.ons.splitView.setMainPage = this.setMainPage.bind(this);
				$rootScope.ons.splitView.setSecondaryPage = this.setSecondaryPage.bind(this);
				$rootScope.ons.splitView.toggle = this.toggle.bind(this);				
			},

			_findClosestSplitView: function($event) {				
				var splitView;
				if ($event) {
					var splitViewElement = $rootScope.ons.upTo($event.target, 'ons-split-view');
					splitView = angular.element(splitViewElement).isolateScope();
				} else {
					splitView = this.splitViews[this.splitViews.length - 1];
				}

				return splitView;
			},

			_checkExistence: function() {
				if (this.splitViews.length == 0) {
					throw new Error('oops!! no split-view registerred');
				}
			},

			addSplitView: function(splitView) {
				this.splitViews.push(splitView);
			},

			removeSplitView: function(splitView){
				for (var i = 0; i < this.splitViews.length; i++) {
					if(this.splitViews[i] == splitView){
						this.splitViews.splice(i, 1);
					}
				};
			},

			setMainPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setMainPage(page);
			},

			setSecondaryPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setSecondaryPage(page);
			},

			toggle: function($event) {
				this._checkExistence();

				var splitView = this._findClosestSplitView($event);
				splitView.toggle();
			}
		});

		return new SplitViewStack();
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTabbar', function(ONSEN_CONSTANTS, $timeout, $http, $compile, TabbarStack) {
		return {
			restrict: 'E',
			replace: false,
			transclude: true,			
			scope: {
				hide: '@',
				onActiveTabChanged: '&'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
			controller: function($scope, $element, $attrs) {
				var container = angular.element($element[0].querySelector('.tab-bar-content'));
				var footer = $element[0].querySelector('.footer');

				this.tabbarId = Date.now();

				$scope.selectedTabItem = {
					source: ''
				};

				$attrs.$observe('hideTabs', function(hide) {
					$scope.hideTabs = hide;
					onTabbarVisibilityChanged();
				});

				function triggerActiveTabChanged(index, tabItem){
					$scope.onActiveTabChanged({
						$index: index,
						$tabItem: tabItem
					});
				}				

				function onTabbarVisibilityChanged() {
					if ($scope.hideTabs) {
						$scope.tabbarHeight = 0;
					} else {
						$scope.tabbarHeight = footer.clientHeight + 'px';
					}
				}

				var tabItems = [];

				this.gotSelected = function(selectedTabItem) {
					if (selectedTabItem.page) {
						this.setPage(selectedTabItem.page);
					}

					for (var i = 0; i < tabItems.length; i++) {
						if (tabItems[i] != selectedTabItem) {
							tabItems[i].setInactive();
						}else{
							triggerActiveTabChanged(i, selectedTabItem);
						}
					}
				};

				this.setPage = function(page) {
					if (page) {
						$http({
							url: page,
							method: "GET"
						}).error(function(e) {
							console.error(e);
						}).success(function(data, status, headers, config) {
							var templateHTML = angular.element(data.trim());
							var pageScope = $scope.$parent.$new();
							var pageContent = $compile(templateHTML)(pageScope);
							container.append(pageContent);

							if(this.currentPageElement){
								this.currentPageElement.remove();
								this.currentPageScope.$destroy();
							}

							this.currentPageElement = pageContent;
							this.currentPageScope = pageScope;
						}.bind(this));
					} else {
						throw new Error('cannot set undefined page');
					}
				}

				this.addTabItem = function(tabItem) {
					tabItems.push(tabItem);
				};

				$scope.ons = $scope.ons || {};
				$scope.ons.tabbar = {};
				$scope.setTabbarVisibility = function(visible) {
					$scope.hideTabs = !visible;
					onTabbarVisibilityChanged();
				};

				$scope.setActiveTab = function(index){
					if(index < 0 || index >= tabItems.length){
						throw new Error('Cannot set tab with index ' + index + '. We have ' + tabItems.length + ' tabs.');
					}

					var tabItem = tabItems[index];
					tabItem.setActive();
				}

				TabbarStack.add($scope);
			}
		};
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTabbarItem', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '^onsTabbar',
			scope: {
				page: '@',
				active: '@',
				icon: '@',
				activeIcon: '@',
				label: '@'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/tab_bar_item.tpl',
			link: function(scope, element, attrs, tabbarController) {
				var radioButton = element[0].querySelector('input');

				scope.tabbarId = tabbarController.tabbarId;

				tabbarController.addTabItem(scope);
				scope.tabIcon = scope.icon;

				scope.setActive = function() {
					element.addClass('active');
					radioButton.checked = true;
					tabbarController.gotSelected(scope);
					if (scope.activeIcon) {
						scope.tabIcon = scope.activeIcon;
					}
				};

				scope.setInactive = function() {
					element.removeClass('active');
					scope.tabIcon = scope.icon;
				};

				if (scope.active) {
					scope.setActive();
				}

			}
		};
	});
})();
(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('TabbarStack', function($rootScope) {
		var TabbarStack = Class.extend({
			tabbars: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.tabbar = {};				
				$rootScope.ons.tabbar.setActiveTab = this.setActiveTab.bind(this);								
			},

			_findClosestTabbar: function($event) {
				
				var tabbar;
				if ($event) {
					var tabbarElement = $rootScope.ons.upTo($event.target, 'ons-tabbar');
					tabbar = angular.element(tabbarElement).isolateScope();
				} else {
					tabbar = this.tabbars[this.tabbars.length - 1];
				}

				return tabbar;
			},

			_checkExistence: function() {
				if (this.tabbars.length == 0) {
					throw new Error('oops!! no tabbar registerred');
				}
			},

			add: function(tabbar) {
				this.tabbars.push(tabbar);
			},

			remove: function(tabbar){
				for (var i = 0; i < this.tabbars.length; i++) {
					if(this.tabbars[i] == tabbar){
						this.tabbars.splice(i, 1);
					}
				};
			},

			setActiveTab: function(index, $event){
				this._checkExistence();

				var tabbar = this._findClosestTabbar($event);
				tabbar.setActiveTab(index);
			}	
		});

		return new TabbarStack();
	});
})();
/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTextArea', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/text_area.tpl'
		};
	});
})();


/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsTextInput', function(ONSEN_CONSTANTS, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: false,
			scope: {				
				disabled: '='
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/text_input.tpl',
			link: function($scope, element, attr){

			}
		};
	});
})();


/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}

	// Set up event handlers as required
	if (deviceIsAndroid) {
		layer.addEventListener('mouseover', bind(this.onMouse, this), true);
		layer.addEventListener('mousedown', bind(this.onMouse, this), true);
		layer.addEventListener('mouseup', bind(this.onMouse, this), true);
	}

	layer.addEventListener('click', bind(this.onClick, this), true);
	layer.addEventListener('touchstart', bind(this.onTouchStart, this), false);
	layer.addEventListener('touchmove', bind(this.onTouchMove, this), false);
	layer.addEventListener('touchend', bind(this.onTouchEnd, this), false);
	layer.addEventListener('touchcancel', bind(this.onTouchCancel, this), false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);
		this.sendClick(targetElement, event);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (deviceIsIOS && !deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}
/*! Hammer.JS - v1.0.6 - 2014-01-02
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
  return new Hammer.Instance(element, options || {});
};

// default settings
Hammer.defaults = {
  // add styles and attributes to the element to prevent the browser from doing
  // its native behavior. this doesnt prevent the scrolling, but cancels
  // the contextmenu, tap highlighting etc
  // set to false to disable this
  stop_browser_behavior: {
    // this also triggers onselectstart=false for IE
    userSelect       : 'none',
    // this makes the element blocking in IE10 >, you could experiment with the value
    // see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
    touchAction      : 'none',
    touchCallout     : 'none',
    contentZooming   : 'none',
    userDrag         : 'none',
    tapHighlightColor: 'rgba(0,0,0,0)'
  }

  //
  // more settings are defined per gesture at gestures.js
  //
};

// detect touchevents
Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Hammer.event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// direction defines
Hammer.DIRECTION_DOWN = 'down';
Hammer.DIRECTION_LEFT = 'left';
Hammer.DIRECTION_UP = 'up';
Hammer.DIRECTION_RIGHT = 'right';

// pointer type
Hammer.POINTER_MOUSE = 'mouse';
Hammer.POINTER_TOUCH = 'touch';
Hammer.POINTER_PEN = 'pen';

// touch event defines
Hammer.EVENT_START = 'start';
Hammer.EVENT_MOVE = 'move';
Hammer.EVENT_END = 'end';

// hammer document where the base events are added at
Hammer.DOCUMENT = window.document;

// plugins and gestures namespaces
Hammer.plugins = Hammer.plugins || {};
Hammer.gestures = Hammer.gestures || {};

// if the window events are set...
Hammer.READY = false;

/**
 * setup events to detect gestures on the document
 */
function setup() {
  if(Hammer.READY) {
    return;
  }

  // find what eventtypes we add listeners to
  Hammer.event.determineEventTypes();

  // Register all gestures inside Hammer.gestures
  Hammer.utils.each(Hammer.gestures, function(gesture){
    Hammer.detection.register(gesture);
  });

  // Add touch events on the document
  Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
  Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);

  // Hammer is ready...!
  Hammer.READY = true;
}

Hammer.utils = {
  /**
   * extend method,
   * also used for cloning when dest is an empty object
   * @param   {Object}    dest
   * @param   {Object}    src
   * @parm  {Boolean}  merge    do a merge
   * @returns {Object}    dest
   */
  extend: function extend(dest, src, merge) {
    for(var key in src) {
      if(dest[key] !== undefined && merge) {
        continue;
      }
      dest[key] = src[key];
    }
    return dest;
  },


  /**
   * for each
   * @param obj
   * @param iterator
   */
  each: function(obj, iterator, context) {
    var i, length;
    // native forEach on arrays
    if ('forEach' in obj) {
      obj.forEach(iterator, context);
    }
    // arrays
    else if(obj.length !== undefined) {
      for (i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
    }
    // objects
    else {
      for (i in obj) {
        if (obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
    }
  },

  /**
   * find if a node is in the given parent
   * used for event delegation tricks
   * @param   {HTMLElement}   node
   * @param   {HTMLElement}   parent
   * @returns {boolean}       has_parent
   */
  hasParent: function(node, parent) {
    while(node) {
      if(node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },


  /**
   * get the center of all the touches
   * @param   {Array}     touches
   * @returns {Object}    center
   */
  getCenter: function getCenter(touches) {
    var valuesX = [], valuesY = [];

    Hammer.utils.each(touches, function(touch) {
      // I prefer clientX because it ignore the scrolling position
      valuesX.push(typeof touch.clientX !== 'undefined' ? touch.clientX : touch.pageX );
      valuesY.push(typeof touch.clientY !== 'undefined' ? touch.clientY : touch.pageY );
    });

    return {
      pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
      pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
    };
  },


  /**
   * calculate the velocity between two points
   * @param   {Number}    delta_time
   * @param   {Number}    delta_x
   * @param   {Number}    delta_y
   * @returns {Object}    velocity
   */
  getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
    return {
      x: Math.abs(delta_x / delta_time) || 0,
      y: Math.abs(delta_y / delta_time) || 0
    };
  },


  /**
   * calculate the angle between two coordinates
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    angle
   */
  getAngle: function getAngle(touch1, touch2) {
    var y = touch2.pageY - touch1.pageY,
      x = touch2.pageX - touch1.pageX;
    return Math.atan2(y, x) * 180 / Math.PI;
  },


  /**
   * angle to direction define
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {String}    direction constant, like Hammer.DIRECTION_LEFT
   */
  getDirection: function getDirection(touch1, touch2) {
    var x = Math.abs(touch1.pageX - touch2.pageX),
      y = Math.abs(touch1.pageY - touch2.pageY);

    if(x >= y) {
      return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
    }
    else {
      return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
    }
  },


  /**
   * calculate the distance between two touches
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    distance
   */
  getDistance: function getDistance(touch1, touch2) {
    var x = touch2.pageX - touch1.pageX,
      y = touch2.pageY - touch1.pageY;
    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * calculate the scale factor between two touchLists (fingers)
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    scale
   */
  getScale: function getScale(start, end) {
    // need two fingers...
    if(start.length >= 2 && end.length >= 2) {
      return this.getDistance(end[0], end[1]) /
        this.getDistance(start[0], start[1]);
    }
    return 1;
  },


  /**
   * calculate the rotation degrees between two touchLists (fingers)
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    rotation
   */
  getRotation: function getRotation(start, end) {
    // need two fingers
    if(start.length >= 2 && end.length >= 2) {
      return this.getAngle(end[1], end[0]) -
        this.getAngle(start[1], start[0]);
    }
    return 0;
  },


  /**
   * boolean if the direction is vertical
   * @param    {String}    direction
   * @returns  {Boolean}   is_vertical
   */
  isVertical: function isVertical(direction) {
    return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN);
  },


  /**
   * stop browser default behavior with css props
   * @param   {HtmlElement}   element
   * @param   {Object}        css_props
   */
  stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
    if(!css_props || !element || !element.style) {
      return;
    }

    // with css properties for modern browsers
    Hammer.utils.each(['webkit', 'khtml', 'moz', 'Moz', 'ms', 'o', ''], function(vendor) {
      Hammer.utils.each(css_props, function(prop) {
          // vender prefix at the property
          if(vendor) {
            prop = vendor + prop.substring(0, 1).toUpperCase() + prop.substring(1);
          }
          // set the style
          if(prop in element.style) {
            element.style[prop] = prop;
          }
      });
    });

    // also the disable onselectstart
    if(css_props.userSelect == 'none') {
      element.onselectstart = function() {
        return false;
      };
    }

    // and disable ondragstart
    if(css_props.userDrag == 'none') {
      element.ondragstart = function() {
        return false;
      };
    }
  }
};


/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
  var self = this;

  // setup HammerJS window events and register all gestures
  // this also sets up the default options
  setup();

  this.element = element;

  // start/stop detection option
  this.enabled = true;

  // merge options
  this.options = Hammer.utils.extend(
    Hammer.utils.extend({}, Hammer.defaults),
    options || {});

  // add some css to the element to prevent the browser from doing its native behavoir
  if(this.options.stop_browser_behavior) {
    Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
  }

  // start detection on touchstart
  Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
    if(self.enabled) {
      Hammer.detection.startDetect(self, ev);
    }
  });

  // return instance
  return this;
};


Hammer.Instance.prototype = {
  /**
   * bind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  on: function onEvent(gesture, handler) {
    var gestures = gesture.split(' ');
    Hammer.utils.each(gestures, function(gesture) {
      this.element.addEventListener(gesture, handler, false);
    }, this);
    return this;
  },


  /**
   * unbind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  off: function offEvent(gesture, handler) {
    var gestures = gesture.split(' ');
    Hammer.utils.each(gestures, function(gesture) {
      this.element.removeEventListener(gesture, handler, false);
    }, this);
    return this;
  },


  /**
   * trigger gesture event
   * @param   {String}      gesture
   * @param   {Object}      [eventData]
   * @returns {Hammer.Instance}
   */
  trigger: function triggerEvent(gesture, eventData) {
    // optional
    if(!eventData) {
      eventData = {};
    }

    // create DOM event
    var event = Hammer.DOCUMENT.createEvent('Event');
    event.initEvent(gesture, true, true);
    event.gesture = eventData;

    // trigger on the target if it is in the instance element,
    // this is for event delegation tricks
    var element = this.element;
    if(Hammer.utils.hasParent(eventData.target, element)) {
      element = eventData.target;
    }

    element.dispatchEvent(event);
    return this;
  },


  /**
   * enable of disable hammer.js detection
   * @param   {Boolean}   state
   * @returns {Hammer.Instance}
   */
  enable: function enable(state) {
    this.enabled = state;
    return this;
  }
};


/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;


/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var enable_detect = false;


/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


Hammer.event = {
  /**
   * simple addEventListener
   * @param   {HTMLElement}   element
   * @param   {String}        type
   * @param   {Function}      handler
   */
  bindDom: function(element, type, handler) {
    var types = type.split(' ');
    Hammer.utils.each(types, function(type){
      element.addEventListener(type, handler, false);
    });
  },


  /**
   * touch events with mouse fallback
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like Hammer.EVENT_MOVE
   * @param   {Function}      handler
   */
  onTouch: function onTouch(element, eventType, handler) {
    var self = this;

    this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
      var sourceEventType = ev.type.toLowerCase();

      // onmouseup, but when touchend has been fired we do nothing.
      // this is for touchdevices which also fire a mouseup on touchend
      if(sourceEventType.match(/mouse/) && touch_triggered) {
        return;
      }

      // mousebutton must be down or a touch event
      else if(sourceEventType.match(/touch/) ||   // touch events are always on screen
        sourceEventType.match(/pointerdown/) || // pointerevents touch
        (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
        ) {
        enable_detect = true;
      }

      // mouse isn't pressed
      else if(sourceEventType.match(/mouse/) && !ev.which) {
        enable_detect = false;
      }


      // we are in a touch event, set the touch triggered bool to true,
      // this for the conflicts that may occur on ios and android
      if(sourceEventType.match(/touch|pointer/)) {
        touch_triggered = true;
      }

      // count the total touches on the screen
      var count_touches = 0;

      // when touch has been triggered in this detection session
      // and we are now handling a mouse event, we stop that to prevent conflicts
      if(enable_detect) {
        // update pointerevent
        if(Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
          count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
        }
        // touch
        else if(sourceEventType.match(/touch/)) {
          count_touches = ev.touches.length;
        }
        // mouse
        else if(!touch_triggered) {
          count_touches = sourceEventType.match(/up/) ? 0 : 1;
        }

        // if we are in a end event, but when we remove one touch and
        // we still have enough, set eventType to move
        if(count_touches > 0 && eventType == Hammer.EVENT_END) {
          eventType = Hammer.EVENT_MOVE;
        }
        // no touches, force the end event
        else if(!count_touches) {
          eventType = Hammer.EVENT_END;
        }

        // store the last move event
        if(count_touches || last_move_event === null) {
          last_move_event = ev;
        }

        // trigger the handler
        handler.call(Hammer.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev));

        // remove pointerevent from list
        if(Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
          count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
        }
      }

      // on the end we reset everything
      if(!count_touches) {
        last_move_event = null;
        enable_detect = false;
        touch_triggered = false;
        Hammer.PointerEvent.reset();
      }
    });
  },


  /**
   * we have different events for each device/browser
   * determine what we need and set them in the Hammer.EVENT_TYPES constant
   */
  determineEventTypes: function determineEventTypes() {
    // determine the eventtype we want to set
    var types;

    // pointerEvents magic
    if(Hammer.HAS_POINTEREVENTS) {
      types = Hammer.PointerEvent.getEvents();
    }
    // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
    else if(Hammer.NO_MOUSEEVENTS) {
      types = [
        'touchstart',
        'touchmove',
        'touchend touchcancel'];
    }
    // for non pointer events browsers and mixed browsers,
    // like chrome on windows8 touch laptop
    else {
      types = [
        'touchstart mousedown',
        'touchmove mousemove',
        'touchend touchcancel mouseup'];
    }

    Hammer.EVENT_TYPES[Hammer.EVENT_START] = types[0];
    Hammer.EVENT_TYPES[Hammer.EVENT_MOVE] = types[1];
    Hammer.EVENT_TYPES[Hammer.EVENT_END] = types[2];
  },


  /**
   * create touchlist depending on the event
   * @param   {Object}    ev
   * @param   {String}    eventType   used by the fakemultitouch plugin
   */
  getTouchList: function getTouchList(ev/*, eventType*/) {
    // get the fake pointerEvent touchlist
    if(Hammer.HAS_POINTEREVENTS) {
      return Hammer.PointerEvent.getTouchList();
    }
    // get the touchlist
    else if(ev.touches) {
      return ev.touches;
    }
    // make fake touchlist from mouse position
    else {
      ev.identifier = 1;
      return [ev];
    }
  },


  /**
   * collect event data for Hammer js
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like Hammer.EVENT_MOVE
   * @param   {Object}        eventData
   */
  collectEventData: function collectEventData(element, eventType, touches, ev) {
    // find out pointerType
    var pointerType = Hammer.POINTER_TOUCH;
    if(ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
      pointerType = Hammer.POINTER_MOUSE;
    }

    return {
      center     : Hammer.utils.getCenter(touches),
      timeStamp  : new Date().getTime(),
      target     : ev.target,
      touches    : touches,
      eventType  : eventType,
      pointerType: pointerType,
      srcEvent   : ev,

      /**
       * prevent the browser default actions
       * mostly used to disable scrolling of the browser
       */
      preventDefault: function() {
        if(this.srcEvent.preventManipulation) {
          this.srcEvent.preventManipulation();
        }

        if(this.srcEvent.preventDefault) {
          this.srcEvent.preventDefault();
        }
      },

      /**
       * stop bubbling the event up to its parents
       */
      stopPropagation: function() {
        this.srcEvent.stopPropagation();
      },

      /**
       * immediately stop gesture detection
       * might be useful after a swipe was detected
       * @return {*}
       */
      stopDetect: function() {
        return Hammer.detection.stopDetect();
      }
    };
  }
};

Hammer.PointerEvent = {
  /**
   * holds all pointers
   * @type {Object}
   */
  pointers: {},

  /**
   * get a list of pointers
   * @returns {Array}     touchlist
   */
  getTouchList: function() {
    var self = this;
    var touchlist = [];

    // we can use forEach since pointerEvents only is in IE10
    Hammer.utils.each(self.pointers, function(pointer){
      touchlist.push(pointer);
    });
    
    return touchlist;
  },

  /**
   * update the position of a pointer
   * @param   {String}   type             Hammer.EVENT_END
   * @param   {Object}   pointerEvent
   */
  updatePointer: function(type, pointerEvent) {
    if(type == Hammer.EVENT_END) {
      this.pointers = {};
    }
    else {
      pointerEvent.identifier = pointerEvent.pointerId;
      this.pointers[pointerEvent.pointerId] = pointerEvent;
    }

    return Object.keys(this.pointers).length;
  },

  /**
   * check if ev matches pointertype
   * @param   {String}        pointerType     Hammer.POINTER_MOUSE
   * @param   {PointerEvent}  ev
   */
  matchType: function(pointerType, ev) {
    if(!ev.pointerType) {
      return false;
    }

    var pt = ev.pointerType,
      types = {};
    types[Hammer.POINTER_MOUSE] = (pt === ev.MSPOINTER_TYPE_MOUSE || pt === Hammer.POINTER_MOUSE);
    types[Hammer.POINTER_TOUCH] = (pt === ev.MSPOINTER_TYPE_TOUCH || pt === Hammer.POINTER_TOUCH);
    types[Hammer.POINTER_PEN] = (pt === ev.MSPOINTER_TYPE_PEN || pt === Hammer.POINTER_PEN);
    return types[pointerType];
  },


  /**
   * get events
   */
  getEvents: function() {
    return [
      'pointerdown MSPointerDown',
      'pointermove MSPointerMove',
      'pointerup pointercancel MSPointerUp MSPointerCancel'
    ];
  },

  /**
   * reset the list
   */
  reset: function() {
    this.pointers = {};
  }
};


Hammer.detection = {
  // contains all registred Hammer.gestures in the correct order
  gestures: [],

  // data of the current Hammer.gesture detection session
  current : null,

  // the previous Hammer.gesture session data
  // is a full clone of the previous gesture.current object
  previous: null,

  // when this becomes true, no gestures are fired
  stopped : false,


  /**
   * start Hammer.gesture detection
   * @param   {Hammer.Instance}   inst
   * @param   {Object}            eventData
   */
  startDetect: function startDetect(inst, eventData) {
    // already busy with a Hammer.gesture detection on an element
    if(this.current) {
      return;
    }

    this.stopped = false;

    this.current = {
      inst      : inst, // reference to HammerInstance we're working for
      startEvent: Hammer.utils.extend({}, eventData), // start eventData for distances, timing etc
      lastEvent : false, // last eventData
      name      : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
    };

    this.detect(eventData);
  },


  /**
   * Hammer.gesture detection
   * @param   {Object}    eventData
   */
  detect: function detect(eventData) {
    if(!this.current || this.stopped) {
      return;
    }

    // extend event data with calculations about scale, distance etc
    eventData = this.extendEventData(eventData);

    // instance options
    var inst_options = this.current.inst.options;

    // call Hammer.gesture handlers
    Hammer.utils.each(this.gestures, function(gesture) {
      // only when the instance options have enabled this gesture
      if(!this.stopped && inst_options[gesture.name] !== false) {
        // if a handler returns false, we stop with the detection
        if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
          this.stopDetect();
          return false;
        }
      }
    }, this);

    // store as previous event event
    if(this.current) {
      this.current.lastEvent = eventData;
    }

    // endevent, but not the last touch, so dont stop
    if(eventData.eventType == Hammer.EVENT_END && !eventData.touches.length - 1) {
      this.stopDetect();
    }

    return eventData;
  },


  /**
   * clear the Hammer.gesture vars
   * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
   * to stop other Hammer.gestures from being fired
   */
  stopDetect: function stopDetect() {
    // clone current data to the store as the previous gesture
    // used for the double tap gesture, since this is an other gesture detect session
    this.previous = Hammer.utils.extend({}, this.current);

    // reset the current
    this.current = null;

    // stopped!
    this.stopped = true;
  },


  /**
   * extend eventData for Hammer.gestures
   * @param   {Object}   ev
   * @returns {Object}   ev
   */
  extendEventData: function extendEventData(ev) {
    var startEv = this.current.startEvent;

    // if the touches change, set the new touches over the startEvent touches
    // this because touchevents don't have all the touches on touchstart, or the
    // user must place his fingers at the EXACT same time on the screen, which is not realistic
    // but, sometimes it happens that both fingers are touching at the EXACT same time
    if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
      // extend 1 level deep to get the touchlist with the touch objects
      startEv.touches = [];
      Hammer.utils.each(ev.touches, function(touch) {
        startEv.touches.push(Hammer.utils.extend({}, touch));
      });
    }

    var delta_time = ev.timeStamp - startEv.timeStamp
      , delta_x = ev.center.pageX - startEv.center.pageX
      , delta_y = ev.center.pageY - startEv.center.pageY
      , velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y)
      , interimAngle
      , interimDirection;

    // end events (e.g. dragend) don't have useful values for interimDirection & interimAngle
    // because the previous event has exactly the same coordinates
    // so for end events, take the previous values of interimDirection & interimAngle
    // instead of recalculating them and getting a spurious '0'
    if(ev.eventType === 'end') {
      interimAngle = this.current.lastEvent && this.current.lastEvent.interimAngle;
      interimDirection = this.current.lastEvent && this.current.lastEvent.interimDirection;
    }
    else {
      interimAngle = this.current.lastEvent && Hammer.utils.getAngle(this.current.lastEvent.center, ev.center);
      interimDirection = this.current.lastEvent && Hammer.utils.getDirection(this.current.lastEvent.center, ev.center);
    }

    Hammer.utils.extend(ev, {
      deltaTime: delta_time,

      deltaX: delta_x,
      deltaY: delta_y,

      velocityX: velocity.x,
      velocityY: velocity.y,

      distance: Hammer.utils.getDistance(startEv.center, ev.center),

      angle: Hammer.utils.getAngle(startEv.center, ev.center),
      interimAngle: interimAngle,

      direction: Hammer.utils.getDirection(startEv.center, ev.center),
      interimDirection: interimDirection,

      scale: Hammer.utils.getScale(startEv.touches, ev.touches),
      rotation: Hammer.utils.getRotation(startEv.touches, ev.touches),

      startEvent: startEv
    });

    return ev;
  },


  /**
   * register new gesture
   * @param   {Object}    gesture object, see gestures.js for documentation
   * @returns {Array}     gestures
   */
  register: function register(gesture) {
    // add an enable gesture options if there is no given
    var options = gesture.defaults || {};
    if(options[gesture.name] === undefined) {
      options[gesture.name] = true;
    }

    // extend Hammer default options with the Hammer.gesture options
    Hammer.utils.extend(Hammer.defaults, options, true);

    // set its index
    gesture.index = gesture.index || 1000;

    // add Hammer.gesture to the list
    this.gestures.push(gesture);

    // sort the list by index
    this.gestures.sort(function(a, b) {
      if(a.index < b.index) { return -1; }
      if(a.index > b.index) { return 1; }
      return 0;
    });

    return this.gestures;
  }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
  name     : 'drag',
  index    : 50,
  defaults : {
    drag_min_distance            : 10,
    
    // Set correct_for_drag_min_distance to true to make the starting point of the drag
    // be calculated from where the drag was triggered, not from where the touch started.
    // Useful to avoid a jerk-starting drag, which can make fine-adjustments
    // through dragging difficult, and be visually unappealing.
    correct_for_drag_min_distance: true,
    
    // set 0 for unlimited, but this can conflict with transform
    drag_max_touches             : 1,
    
    // prevent default browser behavior when dragging occurs
    // be careful with it, it makes the element a blocking element
    // when you are using the drag gesture, it is a good practice to set this true
    drag_block_horizontal        : false,
    drag_block_vertical          : false,
    
    // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
    // It disallows vertical directions if the initial direction was horizontal, and vice versa.
    drag_lock_to_axis            : false,
    
    // drag lock only kicks in when distance > drag_lock_min_distance
    // This way, locking occurs only when the distance has become large enough to reliably determine the direction
    drag_lock_min_distance       : 25
  },
  
  triggered: false,
  handler  : function dragGesture(ev, inst) {
    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(Hammer.detection.current.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // max touches
    if(inst.options.drag_max_touches > 0 &&
      ev.touches.length > inst.options.drag_max_touches) {
      return;
    }

    switch(ev.eventType) {
      case Hammer.EVENT_START:
        this.triggered = false;
        break;

      case Hammer.EVENT_MOVE:
        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(ev.distance < inst.options.drag_min_distance &&
          Hammer.detection.current.name != this.name) {
          return;
        }

        // we are dragging!
        if(Hammer.detection.current.name != this.name) {
          Hammer.detection.current.name = this.name;
          if(inst.options.correct_for_drag_min_distance && ev.distance > 0) {
            // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
            // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
            // It might be useful to save the original start point somewhere
            var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
            Hammer.detection.current.startEvent.center.pageX += ev.deltaX * factor;
            Hammer.detection.current.startEvent.center.pageY += ev.deltaY * factor;

            // recalculate event data using new start point
            ev = Hammer.detection.extendEventData(ev);
          }
        }

        // lock drag to axis?
        if(Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance)) {
          ev.drag_locked_to_axis = true;
        }
        var last_direction = Hammer.detection.current.lastEvent.direction;
        if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
          // keep direction on the axis that the drag gesture started on
          if(Hammer.utils.isVertical(last_direction)) {
            ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
          }
          else {
            ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
          }
        }

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        // trigger normal event
        inst.trigger(this.name, ev);

        // direction event, like dragdown
        inst.trigger(this.name + ev.direction, ev);

        // block the browser events
        if((inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) ||
          (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
          ev.preventDefault();
        }
        break;

      case Hammer.EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
  name    : 'hold',
  index   : 10,
  defaults: {
    hold_timeout  : 500,
    hold_threshold: 1
  },
  timer   : null,
  handler : function holdGesture(ev, inst) {
    switch(ev.eventType) {
      case Hammer.EVENT_START:
        // clear any running timers
        clearTimeout(this.timer);

        // set the gesture so we can check in the timeout if it still is
        Hammer.detection.current.name = this.name;

        // set timer and if after the timeout it still is hold,
        // we trigger the hold event
        this.timer = setTimeout(function() {
          if(Hammer.detection.current.name == 'hold') {
            inst.trigger('hold', ev);
          }
        }, inst.options.hold_timeout);
        break;

      // when you move or end we clear the timer
      case Hammer.EVENT_MOVE:
        if(ev.distance > inst.options.hold_threshold) {
          clearTimeout(this.timer);
        }
        break;

      case Hammer.EVENT_END:
        clearTimeout(this.timer);
        break;
    }
  }
};

/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
  name   : 'release',
  index  : Infinity,
  handler: function releaseGesture(ev, inst) {
    if(ev.eventType == Hammer.EVENT_END) {
      inst.trigger(this.name, ev);
    }
  }
};

/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
  name    : 'swipe',
  index   : 40,
  defaults: {
    // set 0 for unlimited, but this can conflict with transform
    swipe_min_touches: 1,
    swipe_max_touches: 1,
    swipe_velocity   : 0.7
  },
  handler : function swipeGesture(ev, inst) {
    if(ev.eventType == Hammer.EVENT_END) {
      // max touches
      if(inst.options.swipe_max_touches > 0 &&
        ev.touches.length < inst.options.swipe_min_touches &&
        ev.touches.length > inst.options.swipe_max_touches) {
        return;
      }

      // when the distance we moved is too small we skip this gesture
      // or we can be already in dragging
      if(ev.velocityX > inst.options.swipe_velocity ||
        ev.velocityY > inst.options.swipe_velocity) {
        // trigger swipe events
        inst.trigger(this.name, ev);
        inst.trigger(this.name + ev.direction, ev);
      }
    }
  }
};

/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
  name    : 'tap',
  index   : 100,
  defaults: {
    tap_max_touchtime : 250,
    tap_max_distance  : 10,
    tap_always        : true,
    doubletap_distance: 20,
    doubletap_interval: 300
  },
  handler : function tapGesture(ev, inst) {
    if(ev.eventType == Hammer.EVENT_END && ev.srcEvent.type != 'touchcancel') {
      // previous gesture, for the double tap since these are two different gesture detections
      var prev = Hammer.detection.previous,
        did_doubletap = false;

      // when the touchtime is higher then the max touch time
      // or when the moving distance is too much
      if(ev.deltaTime > inst.options.tap_max_touchtime ||
        ev.distance > inst.options.tap_max_distance) {
        return;
      }

      // check if double tap
      if(prev && prev.name == 'tap' &&
        (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
        ev.distance < inst.options.doubletap_distance) {
        inst.trigger('doubletap', ev);
        did_doubletap = true;
      }

      // do a single tap
      if(!did_doubletap || inst.options.tap_always) {
        Hammer.detection.current.name = 'tap';
        inst.trigger(Hammer.detection.current.name, ev);
      }
    }
  }
};

/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
  name    : 'touch',
  index   : -Infinity,
  defaults: {
    // call preventDefault at touchstart, and makes the element blocking by
    // disabling the scrolling of the page, but it improves gestures like
    // transforming and dragging.
    // be careful with using this, it can be very annoying for users to be stuck
    // on the page
    prevent_default    : false,

    // disable mouse events, so only touch (or pen!) input triggers events
    prevent_mouseevents: false
  },
  handler : function touchGesture(ev, inst) {
    if(inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE) {
      ev.stopDetect();
      return;
    }

    if(inst.options.prevent_default) {
      ev.preventDefault();
    }

    if(ev.eventType == Hammer.EVENT_START) {
      inst.trigger(this.name, ev);
    }
  }
};

/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
  name     : 'transform',
  index    : 45,
  defaults : {
    // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
    transform_min_scale   : 0.01,
    // rotation in degrees
    transform_min_rotation: 1,
    // prevent default browser behavior when two touches are on the screen
    // but it makes the element a blocking element
    // when you are using the transform gesture, it is a good practice to set this true
    transform_always_block: false
  },
  triggered: false,
  handler  : function transformGesture(ev, inst) {
    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(Hammer.detection.current.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // atleast multitouch
    if(ev.touches.length < 2) {
      return;
    }

    // prevent default when two fingers are on the screen
    if(inst.options.transform_always_block) {
      ev.preventDefault();
    }

    switch(ev.eventType) {
      case Hammer.EVENT_START:
        this.triggered = false;
        break;

      case Hammer.EVENT_MOVE:
        var scale_threshold = Math.abs(1 - ev.scale);
        var rotation_threshold = Math.abs(ev.rotation);

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(scale_threshold < inst.options.transform_min_scale &&
          rotation_threshold < inst.options.transform_min_rotation) {
          return;
        }

        // we are transforming!
        Hammer.detection.current.name = this.name;

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        inst.trigger(this.name, ev); // basic transform event

        // trigger rotate event
        if(rotation_threshold > inst.options.transform_min_rotation) {
          inst.trigger('rotate', ev);
        }

        // trigger pinch event
        if(scale_threshold > inst.options.transform_min_scale) {
          inst.trigger('pinch', ev);
          inst.trigger('pinch' + ((ev.scale < 1) ? 'in' : 'out'), ev);
        }
        break;

      case Hammer.EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

  // Based off Lo-Dash's excellent UMD wrapper (slightly modified) - https://github.com/bestiejs/lodash/blob/master/lodash.js#L5515-L5543
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // define as an anonymous module
    define(function() {
      return Hammer;
    });
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
  }
  else if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Hammer;
  }
  else {
    window.Hammer = Hammer;
  }
})(this);
/*! iScroll v5.0.6 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
var IScroll = (function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration,
			deceleration = 0.0006;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: navigator.msPointerEnabled,
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	me.isAndroidBrowser = /Android/.test(window.navigator.appVersion) && /Version\/\d/.test(window.navigator.appVersion);

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();

function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

// INSERT POINT: OPTIONS 

		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

// INSERT POINT: NORMALIZATION

	// Some defaults	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.0.6',

	_init: function () {
		this._initEvents();

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);

		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller ) {
			return;
		}

		this._transitionTime(0);
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isAndroidBrowser && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();		// This seems to break default Android browser
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();

		this.isAnimating = false;
		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
			this.isInTransition = false;
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}

/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

/* REPLACE END: refresh */

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].call(this);
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		if ( !time || (this.options.useTransition && easing.style) ) {
			this._transitionTimingFunction(easing.style);
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;
		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;

// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, 'MSPointerDown', this);
			eventType(target, 'MSPointerMove', this);
			eventType(target, 'MSPointerCancel', this);
			eventType(target, 'MSPointerUp', this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d]/g, '');
			y = +matrix.top.replace(/[^-\d]/g, '');
		}

		return { x: x, y: y };
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
IScroll.ease = utils.ease;

return IScroll;

})(window, document, Math);
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-boxshadow-cssanimations-csstransforms-csstransforms3d-csstransitions-canvas-svg-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.2',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,


    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }



    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };
    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };



    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;

    ;(function(window, document) {
        var options = window.html5 || {};

        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        var supportsHtml5Styles;

        var expando = '_html5shiv';

        var expanID = 0;

        var expandoData = {};

        var supportsUnknownElements;

      (function() {
        try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
                    supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
                        (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
        } catch(e) {
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());        function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

        function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

          function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
        }
        return data;
      }

        function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
        }
        if (!data) {
            data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
            node = data.createElem(nodeName);
        }

                                    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
      }

        function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for(;i<l;i++){
            clone.createElement(elems[i]);
        }
        return clone;
      }

        function shivMethods(ownerDocument, data) {
        if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
              return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
          'var n=f.cloneNode(),c=n.createElement;' +
          'h.shivMethods&&(' +
                    getElements().join().replace(/\w+/g, function(nodeName) {
              data.createElem(nodeName);
              data.frag.createElement(nodeName);
              return 'c("' + nodeName + '")';
            }) +
          ');return n}'
        )(html5, data.frag);
      }        function shivDocument(ownerDocument) {
        if (!ownerDocument) {
            ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
                    'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
                    'mark{background:#FF0;color:#000}'
          );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }        var html5 = {

            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

            'shivCSS': (options.shivCSS !== false),

            'supportsUnknownElements': supportsUnknownElements,

            'shivMethods': (options.shivMethods !== false),

            'type': 'default',

            'shivDocument': shivDocument,

            createElement: createElement,

            createDocumentFragment: createDocumentFragment
      };        window.html5 = html5;

        shivDocument(document);

    }(this, document));

    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;



    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function() {
    function Viewport() {

        this.PRE_IOS7_VIEWPORT = "initial-scale=1, maximum-scale=1, user-scalable=no";
        this.IOS7_VIEWPORT = "width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no";
        this.DEFAULT_VIEWPORT = "initial-scale=1, maximum-scale=1, user-scalable=no";
        
        this.ensureViewportElement();
        this.platform = {};
        this.platform.name = this.getPlatformName();
        this.platform.version = this.getPlatformVersion();

        return this;
    };

    Viewport.prototype.ensureViewportElement = function(){
        this.viewportElement = document.querySelector('meta[name=viewport]');
        if(!this.viewportElement){
            this.viewportElement = document.createElement('meta');
            this.viewportElement.name = "viewport";
            document.head.appendChild(this.viewportElement);
        }        
    },

    Viewport.prototype.setup = function() {
        if (!this.viewportElement) {
            return;
        }

        if (this.viewportElement.getAttribute('data-no-adjust') == "true") {
            return;
        }

        if (this.platform.name == 'ios') {
            if (this.platform.version >= 7) {
                this.viewportElement.setAttribute('content', this.IOS7_VIEWPORT);
            } else {
                this.viewportElement.setAttribute('content', this.PRE_IOS7_VIEWPORT);
            }
        } else {
            this.viewportElement.setAttribute('content', this.DEFAULT_VIEWPORT);
        }
    };

    Viewport.prototype.getPlatformName = function() {
        if (navigator.userAgent.match(/Android/i)) {
            return "android";
        }

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return "ios";
        }

        // unknown
        return undefined;
    };

    Viewport.prototype.getPlatformVersion = function() {
        var start = window.navigator.userAgent.indexOf('OS ');
        return window.Number(window.navigator.userAgent.substr(start + 3, 3).replace('_', '.'));
    };

    window.Viewport = Viewport;
})();

(function() {
	'use strict';
	Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
		Modernizr.addTest(
			'overflowtouch',
			window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
	});

})();
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

new Viewport().setup();